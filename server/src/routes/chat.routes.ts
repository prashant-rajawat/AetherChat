/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { getConversations, createConversation, sendMessage } from '../controllers/chat.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticateJWT, getConversations);
router.post('/', authenticateJWT, createConversation);
router.post('/message', authenticateJWT, sendMessage);

export default router;
