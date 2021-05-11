import express from 'express';
import authRouter from './authRouter';
import donerRouter from './donerRouter';
import hospitalRouter from './hospitalRouter';
import notificationRouter from './notificationRouter';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/doner', donerRouter);
router.use('/hospital', hospitalRouter);
router.use('/notification', notificationRouter);

export default router;