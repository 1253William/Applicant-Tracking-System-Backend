import express from "express";
const router = express.Router();
import { login, logout, signup, userData } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizedRoles } from "../middlewares/roles.middleware";

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign Up User
 *     description: Creates a new user account with a hashed password. If the email already exists and the account was deleted, it restores the account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass123!"
 *               role:
 *                 type: string
 *                 example: "Recruiter"
 *               isAccountDeleted:
 *                 type: boolean
 *                 example: false
 *               companyName:
 *                 type: string
 *                 example: "TechHive Ltd."
 *               companyEmail:
 *                 type: string
 *                 example: "careers@techhive.com"
 *     responses:
 *       201:
 *         description: User created successfully
 *       200:
 *         description: Account restored successfully
 *       400:
 *         description: Bad Request - missing fields or user already exists
 *       500:
 *         description: Internal Server Error
 */
//@route POST /api/v1/signup
//@desc Creates a new user
//@access public
router.post('/signup', signup);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Log In User
 *     description: Authenticates a user and returns a JWT access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass123!"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *                 data:
 *                   type: object
 *                   description: User profile (excluding password)
 *       400:
 *         description: Invalid credentials or missing fields
 *       404:
 *         description: Account has been deleted
 *       500:
 *         description: Internal Server Error
 */
//@route POST /api/v1/auth/login
//@desc Login a user
//@access public
router.post('/login', login);

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get logged-in user
 *     description: Returns the details of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "642fc5365ebf3ab83d7d501a"
 *                     fullName:
 *                       type: string
 *                       example: "Jane Doe"
 *                     email:
 *                       type: string
 *                       example: "jane@example.com"
 *                     role:
 *                       type: string
 *                       example: "Applicant"
 *                     isAccountDeleted:
 *                        type: boolean
 *                        example: false
 *       401:
 *         description: Unauthorized, missing or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal Server Error.
 */
//@route POST /api/v1/auth/me
//@desc Get Data/Profile/Details of Logged-in user
//@access public
router.post('/me', authMiddleware, authorizedRoles("Recruiter", "Applicant"), userData);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Log Out User
 *     description: Logs out the user by clearing the session or token on the client side (if applicable).
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Internal Server Error
 */
//@route POST /api/v1/auth/logout
//@desc Logout a user 
//@access public
router.post('/logout', authMiddleware, authorizedRoles("Recruiter"), logout)

export default router;