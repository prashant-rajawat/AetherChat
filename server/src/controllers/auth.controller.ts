/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { config } from '../config/env.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import { getDatabaseStatus } from '../config/db.js';

export async function register(req: Request, res: Response): Promise<void> {
  try {
    if (!getDatabaseStatus()) {
      res.status(503).json({ success: false, message: 'Database not connected (Foundation Mode)' });
      return;
    }

    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ success: false, errors: validation.error.format() });
      return;
    }

    const { username, email, password } = validation.success ? validation.data : (req.body as any);

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(409).json({ success: false, message: 'Username or email already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      passwordHash,
    });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn as any }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error during registration' });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    if (!getDatabaseStatus()) {
      res.status(503).json({ success: false, message: 'Database not connected (Foundation Mode)' });
      return;
    }

    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ success: false, errors: validation.error.format() });
      return;
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn as any }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error during login' });
  }
}

export async function logout(_req: Request, res: Response): Promise<void> {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
}

export async function getMe(req: any, res: Response): Promise<void> {
  try {
    if (!getDatabaseStatus()) {
      res.status(503).json({ success: false, message: 'Database not connected (Foundation Mode)' });
      return;
    }

    const user = await User.findById(req.user.userId).select('-passwordHash');
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error fetching user profile' });
  }
}
