import express from "express";
const router = express.Router();
import { getAllCandidates, getCandidate } from "../controllers/candidates.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizedRoles } from "../middlewares/roles.middleware";

/**
 * @swagger
 * /api/v1/candidates:
 *   get:
 *     tags:
 *       - Candidates
 *     summary: Get all candidates
 *     description: Returns a list of all users who are not Recruiters (i.e., Candidates). Only accessible by users with the Recruiter role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all candidates.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "All candidates fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "642fc5365ebf3ab83d7d501a"
 *                       fullName:
 *                         type: string
 *                         example: "Jane Doe"
 *                       email:
 *                         type: string
 *                         example: "jane@example.com"
 *                       role:
 *                         type: string
 *                         example: "Candidate"
 *       403:
 *         description: Forbidden. Only users with the Recruiter role can access this route.
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
 *                   example: "Not authorized"
 *       404:
 *         description: No candidates found in the system.
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
 *                   example: "No candidates found"
 *       500:
 *         description: Internal Server Error.
 */
//@route GET /api/v1/candidates
//@desc Fetch/View all applicants
//@access Private
router.get('/candidates', authMiddleware, authorizedRoles("Recruiter"), getAllCandidates);


/**
 * @swagger
 * /api/v1/candidates/{id}:
 *   get:
 *     tags:
 *       - Candidates
 *     summary: Get a specific candidate's profile
 *     description: Retrieves the profile of a candidate using their ID. Only accessible by authorized users.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the candidate
 *     responses:
 *       200:
 *         description: Candidate profile successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Candidate profile fetched successfully"
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
 *                       example: "Candidate"
 *       400:
 *         description: Invalid candidate ID format.
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
 *                   example: "Invalid candidate ID format"
 *       404:
 *         description: Candidate not found.
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
 *                   example: "Candidate not found"
 *       500:
 *         description: Internal Server Error.
 */
//@route GET /api/v1/candidates/:id
//@desc Fetch/View candidate profile/details by id
//@access Private
router.get('/candidates/:id',authMiddleware, authorizedRoles("Recruiter"), getCandidate);


export default router;