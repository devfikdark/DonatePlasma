import express from 'express';
import {
    getDoner,
    donerList,
    modifyDoner,
} from '../controllers/donerController';
import authorizedUser from '../middlewares/authorizedUser';

const router = express.Router();

router.get('/:did', authorizedUser, getDoner);
router.patch('/:did/modify', authorizedUser, modifyDoner);
router.get('/list', donerList);

export default router;
