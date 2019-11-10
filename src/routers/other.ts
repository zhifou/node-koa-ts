/**
 * @file: other.ts
 */
import Router from 'koa-router';
import {otherGet, otherPost} from '../controllers/other';

const router = new Router();
router.post('/post', otherGet);
router.get('/get', otherPost);

export default router;