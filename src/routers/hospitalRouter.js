import express from 'express';
import {
    hospitalList,
} from '../controllers/hospitalController';
import authorizedUser from '../middlewares/authorizedUser';

const router = express.Router();

router.get('/list', authorizedUser, hospitalList);

export default router;
