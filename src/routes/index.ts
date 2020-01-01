/**
 * @file: index.ts
 */

import Router from 'koa-router';
import {health} from '../controllers/health';
import other from './other';

const router = new Router();

// Nested router for /render/other
router.use('/other', other.routes());

// Health check
router.get('/health', health);

export default router;