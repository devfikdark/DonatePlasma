import express from 'express';
import {
    sendNotification,
    getNotification,
} from '../controllers/notificationController';
import authorizedUser from '../middlewares/authorizedUser';

const router = express.Router();

router.post('/', sendNotification);
router.get('/:did', authorizedUser, getNotification);

export default router;
