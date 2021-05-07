import express from 'express';
import {
  signUpUser,
  signUpHospital,
  signIn,
  logOut,
} from '../controllers/authController';

const router = express.Router();

router.post('/signup-user', signUpUser);
router.post('/signup-hospital', signUpHospital);
router.post('/signin', signIn);
router.get('/logout', logOut);

export default router;
