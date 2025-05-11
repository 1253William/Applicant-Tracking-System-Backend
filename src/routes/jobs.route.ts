import express from "express";
const router = express.Router();
import {createJob, getJobs, getJob, filterJobs, updateJob} from "../controllers/jobs.controllers";
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
 *                         example: "Onsite"
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
//@desc Get all jobs to Admin
//@access Private
router.get('/jobs', authMiddleware, authorizedRoles("Recruiter"), getJobs);

/**
 * @swagger
 * /api/v1/jobs/filter:
 *   get:
 *     summary: Get all jobs with filtering and pagination
 *     description: Admin can search and filter jobs by application stages/status, job role/title, location, and paginate results.
 *     tags:
 *       - Job Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by job title (role)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [open, closed]
 *         description: Filter by job status
 *       - in: query
 *         name: stage
 *         schema:
 *           type: string
 *         description: Filter by application stage (e.g. Interview)
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *           enum: [remote, onsite, hybrid]
 *         description: Filter by location
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Jobs fetched successfully
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
 *                   example: Jobs fetched successfully
 *                 total:
 *                   type: integer
 *                   example: 42
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *       500:
 *         description: Internal Server Error
 */
//@route GET /api/v1/jobs/filter
// @desc Get all jobs with filters and pagination (Admin)
// @access Private
router.get('/jobs/filter', authMiddleware, authorizedRoles("Recruiter"), filterJobs);

/**
 * @swagger
 * /api/v1/jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *     description: Retrieves a single job post using its unique ID
 *     tags:
 *       - Job Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *           example: 66218bdf263489ec7f94c71a
 *     responses:
 *       200:
 *         description: Job fetched successfully
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
 *                   example: Job fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
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
 *                   example: Job not found
 *       500:
 *         description: Internal Server Error
 */
//@route GET /api/v1/jobs/:id
//@desc Get a job to Admin
//@access Private
router.get('/jobs/:id', authMiddleware, authorizedRoles("Recruiter"), getJob);

/**
 * @swagger
 * /api/v1/jobs/{id}:
 *   put:
 *     tags:
 *       - Job Management
 *     summary: Update a job posting
 *     description: Allows admin to update an existing job by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the job to update
 *         schema:
 *           type: string
 *           example: "661658fcd78d8f7f6a3e3c4a"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Frontend Developer"
 *               description:
 *                 type: string
 *                 example: "We are looking for a skilled frontend developer..."
 *               department:
 *                 type: string
 *                 example: "Engineering"
 *               type:
 *                 type: string
 *                 enum: [full-time, part-time, contract]
 *                 example: "full-time"
 *               status:
 *                 type: string
 *                 enum: [open, closed]
 *                 example: "open"
 *               location:
 *                 type: string
 *                 enum: [remote, onsite, hybrid]
 *                 example: "remote"
 *     responses:
 *       200:
 *         description: Job updated successfully.
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
 *                   example: "Job updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Job'
 *       400:
 *         description: Job ID is required or invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Job not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error.
 */
//@route PUT /api/v1/jobs/:id
//@desc Update a job by Admin
//@access Private
router.put('/jobs/:id', authMiddleware, authorizedRoles("Recruiter"), updateJob);

//@route DELETE /api/v1/jobs/:id
//@desc  Delete a job by Admin
//@access Private

//@route POST /api/v1/jobs/parse
//@desc  Parse resume/cv/documents submitted by applicant
//@access Public

//@route POST /api/v1/jobs/application
//@desc Submit a job application on the job portal
//@access Public

export default router;