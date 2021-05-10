import express from 'express';
import {
    hospitalList,
    getHospital,
} from '../controllers/hospitalController';
import authorizedUser from '../middlewares/authorizedUser';

const router = express.Router();

router.get('/list', authorizedUser, hospitalList);
router.get('/profile/:hid', authorizedUser, getHospital);

export default router;
