import express from 'express';
import { loginUser, SignUpUser, logoutUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',SignUpUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)

export default router;