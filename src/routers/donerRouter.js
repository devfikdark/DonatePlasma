import express from 'express';
import {
    getDoner,
    donerList,
} from '../controllers/donerController';
import authorizedUser from '../middlewares/authorizedUser';

const router = express.Router();

router.get('/:did', authorizedUser, getDoner);
router.get('/list', donerList);

export default router;
