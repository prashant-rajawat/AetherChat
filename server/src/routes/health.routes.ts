/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from 'express';
import { getDatabaseStatus } from '../config/db.js';

const router = Router();

router.get('/', (_req, res) => {
  const dbConnected = getDatabaseStatus();
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'connected' : 'disconnected (foundation mode)',
    uptime: process.uptime(),
  });
});

export default router;
