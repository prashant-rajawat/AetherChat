/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SharedUserDto {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export interface SharedMessageDto {
  id: string;
  conversationId: string;
  role: 'user' | 'model' | 'system';
  content: string;
  createdAt: string;
}

export interface SharedConversationDto {
  id: string;
  title: string;
  aiModel: string;
  isPinned: boolean;
  updatedAt: string;
}
