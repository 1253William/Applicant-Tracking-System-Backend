import express from "express";
const router = express.Router();
import { createJob } from "../controllers/jobs.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizedRoles } from "../middlewares/roles.middleware";


/**
 * @swagger
 * /api/v1/jobs:
 *   post:
 *     summary: Create a new job
 *     description: Allows an admin to create a new job with details like title, description, department, type, location, and application stages.
 *     tags:
 *       - Job Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - department
 *               - type
 *               - location
 *               - applicationStages
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Backend Developer"
 *               description:
 *                 type: string
 *                 example: "Build and maintain REST APIs and microservices."
 *               department:
 *                 type: string
 *                 example: "Engineering"
 *               type:
 *                 type: string
 *                 enum: [full-time, part-time]
 *                 example: "full-time"
 *               location:
 *                 type: string
 *                 example: "Remote"
 *               applicationStages:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Applied", "Phone Screen", "Technical Interview", "Offer"]
 *               status:
 *                 type: string
 *                 enum: [open, closed]
 *                 example: "open"
 *     responses:
 *       201:
 *         description: Job created successfully
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
 *                   example: Job created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "643cd9dbfab345b80e321b8e"
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     department:
 *                       type: string
 *                     type:
 *                       type: string
 *                     location:
 *                       type: string
 *                     applicationStages:
 *                       type: array
 *                       items:
 *                         type: string
 *                     status:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Missing required fields
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
 *                   example: All fields are required
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
//@route POST /api/v1/jobs
//@desc Create a new job by Admin
//@access Private
router.post('/jobs', authMiddleware, authorizedRoles("Recruiter"), createJob);

//@route GET /api/v1/jobs
//@desc  Get all jobs to Admin
//@access Private

//@route GET /api/v1/jobs/:id
//@desc  Get a job to Admin
//@access Private

//@route PUT /api/v1/jobs/:id
//@desc  Update a job by Admin
//@access Private

//@route DELETE /api/v1/jobs/:id
//@desc  Delete a job by Admin
//@access Private

//@route POST /api/v1/jobs/parse
//@desc  Parse resume/cv/documents submitted by applicant
//@access Public

//@route POST /api/v1/jobs/application
//@desc  Submit a job application on the job portal
//@access Public

export default router;