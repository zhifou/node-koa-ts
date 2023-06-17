/**
 * @file: other.ts
 */
import Router from 'koa-router';
import other from '../controllers/other';

const router = new Router();
router.get('/get', other.getOther);
// router.post('/post', other.otherPost);

export default router;