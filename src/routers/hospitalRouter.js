import express from 'express';
import {
    hospitalList,
    getHospital,
    activeHospital,
} from '../controllers/hospitalController';
import authorizedUser from '../middlewares/authorizedUser';

const router = express.Router();

router.get('/list', authorizedUser, hospitalList);
router.get('/profile/:hid', authorizedUser, getHospital);
router.patch('/profile/:hid/active', authorizedUser, activeHospital);

export default router;
