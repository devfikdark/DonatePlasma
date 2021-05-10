import express from 'express';
import {
    getDoner,
    donerList,
    modifyDoner,
} from '../controllers/donerController';
import authorizedUser from '../middlewares/authorizedUser';

const router = express.Router();

router.get('/list', donerList);
router.get('/:did', authorizedUser, getDoner);
router.patch('/:did/modify', authorizedUser, modifyDoner);

export default router;
