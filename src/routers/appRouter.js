import express from 'express';
import {
  welcome,
} from '../controllers/appController';

const router = express.Router();

router.get('/', welcome);

export default router;