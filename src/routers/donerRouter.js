import express from 'express';
import {
    donerList,
} from '../controllers/donerController';
import authorizedUser from '../middlewares/authorizedUser';

const router = express.Router();

router.get('/list', authorizedUser, donerList);

export default router;
