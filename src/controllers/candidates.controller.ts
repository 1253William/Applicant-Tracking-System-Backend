import {Request, Response} from 'express';
// import bcrypt from 'bcryptjs';
import UserModel, { User } from '../models/user.model'
import { AuthRequest } from '../types/authRequest'
require('dotenv').config();


// @route GET /api/v1/candidates
// @description Fetch/View all applicants
// @access Private
export const getAllCandidates = async ( req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = req.user?.role;

        if (user !== 'Recruiter') {
            res.status(403).json({
                success: false,
                message: "Not authorized"
            });
            return;
        }

        const candidates = await UserModel.find({role: { $ne: "Recruiter" }});
        if (!candidates || candidates.length === 0) {
            res.status(404).json({
                success: false,
                message: "No candidates found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "All candidates fetched successfully",
            data: candidates
        });
        return;

    } catch (error: unknown) {
        console.log({message: "Error fetching all candidates:", error: error});
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}
 

// @route GET /api/v1/candidates/:id
// @description Fetch/View applicant profile by id
// @access Private
export const getCandidate = async(req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Invalid or Null candidate ID provided"
            });
            return;
        }

        const candidate = await UserModel.findById(id );
        if (!candidate) {
            res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
            return
        }

        res.status(200).json({
            success: true,
            message: "Candidate profile fetched successfully",
            data: candidate
        });
        return;
        
    } catch (error: unknown) {
        console.log({ message: "Error fetching candidate profile:", error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}

// @route DELETE /api/v1/candidates/:id
// @description Delete applicant's profile by id
// @access Private
export const deleteCandidate = async (req: AuthRequest, res: Response): Promise<void> =>{
    try {
        const { id } = req.params
          if (!id) {
            res.status(400).json({
                success: false,
                message: "Invalid or Null candidate ID provided"
            });
            return
          }
        
        const deletedCandidate = await UserModel.findByIdAndDelete(id );
        if (!deletedCandidate) {
            res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
            return
        }

        res.status(200).json({
            success: true,
            message: "Candidate profile deleted successfully",
            data: deletedCandidate
        });
        return;
        
    } catch (error: unknown) {
          console.log({ message: "Error deleting candidate profile:", error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}