import express from "express";
import { login, register, resetPassword, sendPasswordResetEmail, } from "../controllers/auth.controller.js";



const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/send-email', sendPasswordResetEmail);
router.post('/reset-password', resetPassword);



export default router;