import express from "express";
const router = express.Router();
import { getMetrics } from "../controllers/metrics.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizedRoles } from "../middlewares/roles.middleware";

/**
 * @swagger
 * /api/v1/metrics/dashboard:
 *   get:
 *     tags:
 *       - Analytics
 *     summary: Get dashboard metrics
 *     description: Retrieves aggregated metrics for jobs, candidates, filled positions, tool usage, and application trends.
 *     responses:
 *       200:
 *         description: Dashboard metrics fetched successfully.
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
 *                     totalJobsPosted:
 *                       type: integer
 *                       example: 1256
 *                     totalCandidatesApplied:
 *                       type: integer
 *                       example: 2500
 *                     totalPositionsFilled:
 *                       type: integer
 *                       example: 2500
 *                     totalEmployment:
 *                       type: integer
 *                       example: 2500
 *                     barChartData:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: object
 *                             properties:
 *                               month:
 *                                 type: integer
 *                                 example: 3
 *                               year:
 *                                 type: integer
 *                                 example: 2025
 *                           count:
 *                             type: integer
 *                             example: 65
 *                     dailyByTool:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "Figma"
 *                           count:
 *                             type: integer
 *                             example: 200
 *                     lineChart:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: object
 *                             properties:
 *                               tool:
 *                                 type: string
 *                                 example: "AI"
 *                               year:
 *                                 type: integer
 *                                 example: 2025
 *                               month:
 *                                 type: integer
 *                                 example: 2
 *                           count:
 *                             type: integer
 *                             example: 30
 *       500:
 *         description: Internal server error.
 */
//@route GET /api/v1/metrics/dashboard
//@desc Get dashboard metrics
//@access Private
router.get('/metrics/dashboard', authMiddleware, authorizedRoles("Recruiter"), getMetrics);

export default  router;