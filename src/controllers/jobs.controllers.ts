import { Request, Response } from 'express';
import JobModel from '../models/jobRole.model';

// @route POST /api/v1/jobs
// @description Create a new job by Admin
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
        console.log({message: "Error fetching jobs:", error: error.message});
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}