import { Request, Response } from 'express';
import JobModel from '../models/jobRole.model';
import UserModel, { User } from '../models/user.model'
import ApplicationModel from "../models/application.model";
import {AuthRequest} from "../types/authRequest";


//@route GET /api/v1/metrics/dashboard
//@desc Get dashboard metrics (Total jobs posted
        // Total candidates applied
        // Total positions filled
        // Total employment
        // Weekly application stats (grouped by month and year)
        // Daily application per tool/platform
        // Application trends per design tool (for line chart)
//@access Private
export const getMetrics = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const totalJobs = await JobModel.countDocuments();
        const totalCandidates = await UserModel.countDocuments();
        const totalPositionsFilled = await JobModel.countDocuments({ status: 'filled' });
        const totalEmployment = totalPositionsFilled; // assuming 1:1 job-to-employment mapping

        // Weekly Applications by Month-Year (Bar Chart)
        const barChartData = await ApplicationModel.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]);

        // Daily Application per Tool (Donut Chart)
        const dailyByTool = await ApplicationModel.aggregate([
            {
                $group: {
                    _id: "$toolUsed", // assuming toolUsed is stored
                    count: { $sum: 1 }
                }
            }
        ]);

        // Application Trends per Tool over Time (Line Chart)
        const lineChart = await ApplicationModel.aggregate([
            {
                $group: {
                    _id: {
                        tool: "$toolUsed",
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "Dashboard metrics fetched successfully",
            data: {
                totalJobsPosted: totalJobs,
                totalCandidatesApplied: totalCandidates,
                totalPositionsFilled,
                totalEmployment,
                barChartData,
                dailyByTool,
                lineChart
            }
        });
        return;

    } catch (error: any) {
        console.error("Dashboard metrics error:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
};

