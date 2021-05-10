import express from 'express';
import authRouter from './authRouter';
import donerRouter from './donerRouter';
import hospitalRouter from './hospitalRouter';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/doner', donerRouter);
router.use('/hospital', hospitalRouter);

export default router;