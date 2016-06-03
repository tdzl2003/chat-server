/**
 * Created by tdzl2003 on 3/7/16.
 */

import Router from 'koa-router';

import userRouter from './routers/user';
import { upload } from './modules/stores';

const router = new Router();

router.use('/user', userRouter.routes());
router.post('/upload', upload);

export default router;

