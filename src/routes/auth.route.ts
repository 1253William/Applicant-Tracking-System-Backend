import express from "express";
const router = express.Router();
import { login, logout, signup } from "../controllers/auth.controller";

//@route
//@desc
//@access
router.post('/signup', signup);

//@route
//@desc
//@access
router.post('/login', login);

//@route
//@desc
//@access
router.post('/logout', logout)

export default router;