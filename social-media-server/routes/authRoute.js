import express from 'express';
import { register, otpVerify, signin, forgotPassword, resetPassword } from "../controllers/authController.js"
import { sendOtp } from "../utils/userUtils.js"

const router = express.Router();

router.post('/register', register, sendOtp)
router.post('/verify-OTP', otpVerify)
router.post('/signin', signin)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router