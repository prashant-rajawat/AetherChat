/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  role: 'user' | 'model' | 'system';
  content: string;
  tokensCount?: number;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true, index: true },
    role: { type: String, enum: ['user', 'model', 'system'], required: true },
    content: { type: String, required: true },
    tokensCount: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
