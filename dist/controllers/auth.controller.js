"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
require('dotenv').config();
//JWT
const { ACCESS_TOKEN_SECRET } = process.env;
if (!ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined in .env');
}
// @route POST /api/auth/signup
// @description Sign Up User (Create User and Hashed Password)
// @access Public
const signup = async (req, res) => {
    try {
        const { fullName, email, password, role, isAccountDeleted, companyName, companyEmail } = req.body;
        //Validation
        if (!fullName || !email || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            });
            return;
        }
        //Check for existing user
        const existingUser = await user_model_1.default.findOne({ email });
        ;
        // if (existingUser) { 
        //     res.status(400).json({
        //         success: false,
        //         message: "Email already exists"
        //     });
        //     return
        // }
        if (existingUser) {
            // Restore account if it was deleted
            if (existingUser.isAccountDeleted) {
                existingUser.isAccountDeleted = false;
                await existingUser.save();
                res.status(200).json({
                    success: true,
                    message: 'Account restored successfully. Please log in.',
                });
                return;
            }
            res.status(400).json({
                success: false,
                message: 'User already exists',
            });
            return;
        }
        //Hash Password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        //Create New User
        const newUser = await user_model_1.default.create({
            fullName,
            email,
            password: hashedPassword,
            role,
            companyName,
            companyEmail,
            isAccountDeleted
        });
        // Remove password before sending response
        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: userWithoutPassword
        });
    }
    catch (error) {
        console.log({ message: "Error signing up user", error: error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
};
exports.signup = signup;
// @route POST /api/auth/login
// @description Login User (JWT authentication with access token )
// @access Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Validation
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            });
            return;
        }
        //Check for existing user
        const existingUser = await user_model_1.default.findOne({ email }).select('+password');
        if (!existingUser) {
            res.status(400).json({
                success: false,
                message: "User not found, Please sign up"
            });
            return;
        }
        if (existingUser.isAccountDeleted) {
            res.status(404).json({
                success: false,
                message: "Account has been deleted, please sign up again.",
                data: existingUser
            });
            return;
        }
        //Check Password
        const validPassword = await bcryptjs_1.default.compare(password, existingUser.password);
        if (!validPassword) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
            return;
        }
        //Create JWT Token
        const accessToken = jsonwebtoken_1.default.sign({ userId: existingUser._id, email: existingUser.email, role: existingUser.role }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        // Remove password before sending response
        const userWithoutPassword = existingUser.toObject();
        delete userWithoutPassword.password;
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            accessToken,
            data: userWithoutPassword
        });
    }
    catch (error) {
        console.log({ message: "Error logging in user", error: error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
};
exports.login = login;
// @route POST /api/auth/logout 
// @description Logout User (Clear refresh token)
// @access Public
const logout = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "User logged out successfully" });
    }
    catch (error) {
        console.error({ message: "Error logging out user", error: error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};
exports.logout = logout;
