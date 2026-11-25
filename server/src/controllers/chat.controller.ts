/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { Conversation } from '../models/Conversation.js';
import { Message } from '../models/Message.js';
import { getDatabaseStatus } from '../config/db.js';
import { GoogleGenAI } from '@google/genai';
import { config } from '../config/env.js';

export async function getConversations(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!getDatabaseStatus()) {
      res.status(200).json({ success: true, conversations: [] });
      return;
    }

    const conversations = await Conversation.find({ userId: req.user?.userId }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, conversations });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching conversations' });
  }
}

export async function createConversation(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!getDatabaseStatus()) {
      res.status(503).json({ success: false, message: 'Database not connected (Foundation Mode)' });
      return;
    }

    const { title, aiModel, systemPrompt } = req.body;
    const conversation = await Conversation.create({
      userId: req.user?.userId,
      title: title || 'New Conversation',
      aiModel: aiModel || 'gemini-2.5-flash',
      systemPrompt,
    });

    res.status(201).json({ success: true, conversation });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error creating conversation' });
  }
}

export async function sendMessage(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { conversationId, content, aiModel = 'gemini-2.5-flash' } = req.body;

    if (!content) {
      res.status(400).json({ success: false, message: 'Message content is required' });
      return;
    }

    if (!getDatabaseStatus()) {
      // Fallback response for foundation mode without DB
      res.status(200).json({
        success: true,
        reply: 'Hello! AetherChat foundation server is running successfully. Connect MongoDB to persist chat history.',
      });
      return;
    }

    let convId = conversationId;
    if (!convId) {
      const newConv = await Conversation.create({
        userId: req.user?.userId,
        title: content.slice(0, 30) + '...',
        aiModel,
      });
      convId = newConv._id;
    }

    // Save user message
    await Message.create({
      conversationId: convId,
      role: 'user',
      content,
    });

    // Call Gemini API server-side if API key is present
    let aiResponseText = 'AI response simulated (configure GEMINI_API_KEY for live responses).';
    if (config.geminiApiKey) {
      const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });
      const response = await ai.models.generateContent({
        model: aiModel,
        contents: content,
      });
      aiResponseText = response.text || 'No response generated.';
    }

    // Save model message
    const modelMessage = await Message.create({
      conversationId: convId,
      role: 'model',
      content: aiResponseText,
    });

    res.status(200).json({
      success: true,
      conversationId: convId,
      message: modelMessage,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error generating AI response' });
  }
}
