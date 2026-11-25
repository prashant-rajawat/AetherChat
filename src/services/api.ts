/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HealthStatus } from '../types/index.js';

export async function fetchHealthStatus(): Promise<HealthStatus | null> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch health status:', error);
    return null;
  }
}
