import { Request, Response } from 'express';
import JobModel from '../models/jobRole.model';
import {AuthRequest} from "../types/authRequest";

// @route POST /api/v1/jobs
// @desc Create a new job by Admin
// @access Private
export const createJob = async ( req: Request, res: Response): Promise<void> => {
    try {
         const { title, description, department, location, type} = req.body;
         if (!title || !description || !department || !location || !type) {
             res.status(400).json({
                 success: false,
                 message: "All fields are required"
             });
             return;
         }

        const newJob = await JobModel.create({
            title,
            description,
            department,
            location,
            type
        })

        res.status(200).json({
            success: true,
            message: "Job created successfully",
            data: newJob
        });
         return;

    } catch (error: any) {
        console.log({message: "Error creating new job post:", error: error.message});
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}

//@route GET /api/v1/jobs
//@desc  Get all jobs (Admin)
//@access Private
export const getJobs = async(req: Request, res: Response): Promise<void> => {
    try {
        const jobs = await JobModel.find().sort({createdAt: -1});
        if(!jobs || jobs.length === 0) {
            res.status(404).json({
                success: false,
                message: "No jobs available at this time"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "All Jobs fetched successfully",
            totalJobs: jobs.length,
            data: jobs
        });
        return;

    }catch (error: any) {
        console.log({message: "Error fetching all jobs:", error: error.message});
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}

//@route   GET /api/v1/jobs/:id
//@desc    Get a single job by ID
//@access  Private
export const getJob = async(req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params;
        const job = await JobModel.findById(id);
        if (!job) {
            res.status(404).json({
                success: false,
                message: "No job found at this time"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Job fetched successfully",
            data: job
        });
        return;

    }catch (error: any) {
        console.log({message: "Error fetching job by ID:", error: error.message});
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}

//@route GET /api/v1/jobs/filter
//@desc    Get all jobs with filters and pagination (Admin)
//@access  Private
export  const filterJobs = async (req: AuthRequest, res: Response): Promise<void> => {
    try{
        const { title, status, applicationStages, location, page=1, limit=10 } = req.query;
        const query: any = {};
            if (status) query.status = status;
            if (applicationStages) query.applicationStages  = {$in: [applicationStages]};
            if (title) query.title = { $regex: title, $options: "i" };
            if (location) query.location  = {$in: [location]};

        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const skip = (pageNumber - 1) * limitNumber;

        const [jobs, total] = await Promise.all([
            JobModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNumber),
            JobModel.countDocuments(query)
        ]);

        if (total === 0) {
            res.status(404).json({
                success: false,
                message: "No jobs match the provided filters."
            });
            return;
        }


        res.status(200).json({
            success: true,
            message: "Jobs filtered successfully",
            total,
            pagination: {
                page: pageNumber,
                totalPages: Math.ceil(total/ limitNumber),
            },
            data: jobs
        });
        return;

    }catch (error: any) {
        console.log({message: "Error filtering jobs:", error: error.message});
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}