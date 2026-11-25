/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import healthRouter from './routes/health.routes.js';
import authRouter from './routes/auth.routes.js';
import chatRouter from './routes/chat.routes.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';
import { connectDatabase } from './config/db.js';

// Attempt connecting database on boot
connectDatabase();

const router = Router();

router.use(cors({ origin: true, credentials: true }));
router.use(cookieParser());

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/chat', chatRouter);

router.use(errorHandler);

export default router;
