/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from 'mongoose';
import { config } from './env.js';

let isConnected = false;

export async function connectDatabase(): Promise<void> {
  if (isConnected) {
    return;
  }

  try {
    if (!process.env.MONGO_URI) {
      console.warn('⚠️ MONGO_URI not provided. Database connection skipped (Phase 0 foundation mode).');
      return;
    }

    const conn = await mongoose.connect(config.mongoUri);
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    // Do not crash server in Phase 0 if DB is not running locally
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

export function getDatabaseStatus(): boolean {
  return isConnected || mongoose.connection.readyState === 1;
}
