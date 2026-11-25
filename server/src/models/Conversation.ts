/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  aiModel: string;
  systemPrompt?: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, default: 'New Conversation' },
    aiModel: { type: String, default: 'gemini-2.5-flash' },
    systemPrompt: { type: String },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Conversation =
  mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', ConversationSchema);
