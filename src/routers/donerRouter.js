import express from 'express';
import {
    donerList,
} from '../controllers/donerController';
import authorizedUser from '../middlewares/authorizedUser';

const router = express.Router();

router.get('/list', donerList);

export default router;
