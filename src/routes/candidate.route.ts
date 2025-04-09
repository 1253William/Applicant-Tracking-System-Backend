import express from "express";
const router = express.Router();
import { getAllCandidates } from "../controllers/candidates.controller";
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
router.get('/candidates',authMiddleware, authorizedRoles("Recruiter"), getAllCandidates);


export default router;