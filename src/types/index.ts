/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatarUrl?: string;
  preferences?: {
    theme: 'light' | 'dark' | 'system';
    defaultModel: string;
    temperature: number;
  };
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'model' | 'system';
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  model: string;
  systemPrompt?: string;
  isPinned: boolean;
  updatedAt: string;
}

export interface HealthStatus {
  success: boolean;
  status: string;
  timestamp: string;
  database: string;
  uptime: number;
}
