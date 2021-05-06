import express from 'express';
import appRouter from './appRouter';

const router = express.Router();

router.use('/app', appRouter);

export default router;