import express from 'express';
import authRouter from './authRouter';
import donerRouter from './donerRouter';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/doner', donerRouter);

export default router;