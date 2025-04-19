import express from "express";
const router = express.Router();
import { createJob, getJobs } from "../controllers/jobs.controllers";
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

/**
 * @swagger
 * /api/v1/jobs:
 *   get:
 *     summary: Get all job listings
 *     description: Admin can fetch all job listings with details including title, department, location, JobType(full-time/part-time), status(open/closed), and application stages.
 *     tags:
 *       - Job Management
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All Jobs fetched successfully
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
 *                   example: All Jobs fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "661680f7700c580aa33f64e9"
 *                       title:
 *                         type: string
 *                         example: "Product Designer"
 *                       description:
 *                         type: string
 *                         example: "Design seamless UX/UI for web platforms."
 *                       department:
 *                         type: string
 *                         example: "Design"
 *                       type:
 *                         type: string
 *                         enum: [full-time, part-time]
 *                         example: "full-time"
 *                       location:
 *                         type: string
 *                         example: "Remote"
 *                       applicationStages:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Applied", "Screening", "Interview", "Offer"]
 *                       status:
 *                         type: string
 *                         enum: [open, closed]
 *                         example: "open"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
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
//@route GET /api/v1/jobs
//@desc  Get all jobs to Admin
//@access Private
router.get('/jobs', authMiddleware, authorizedRoles("Recruiter"), getJobs);

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