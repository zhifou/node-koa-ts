/**
 * @file: other.ts
 */
import Router from 'koa-router';
import {otherGet, otherPost} from '../controllers/other';

const router = new Router();
router.post('/post', otherPost);
router.get('/get', otherGet);

export default router;