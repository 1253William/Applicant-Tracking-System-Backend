import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel, { User } from '../models/user.model'
import { AuthRequest } from '../types/authRequest'
require('dotenv').config();

//JWT
const { ACCESS_TOKEN_SECRET } = process.env;

if (!ACCESS_TOKEN_SECRET) {
  throw new Error('ACCESS_TOKEN_SECRET is not defined in .env');
}


// @route POST /api/auth/signup
// @description Sign Up User (Create User and Hashed Password)
// @access Public
export const signup = async ( req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, email, password, role, isAccountDeleted, companyName, companyEmail } = req.body;
        //Validation
        if (!fullName || !email || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            });
            return 
        }

        //Check for existing user
        const existingUser = await UserModel.findOne({ email }) as User;;
        // if (existingUser) { 
        //     res.status(400).json({
        //         success: false,
        //         message: "Email already exists"
        //     });
        //     return
        // }

        if (existingUser) {
      // Restore account if it was deleted
      if (existingUser.isAccountDeleted) {
        existingUser.isAccountDeleted = false;
        await existingUser.save();

        res.status(200).json({
          success: true,
          message: 'Account restored successfully. Please log in.',
        });
        return;
      }

      res.status(400).json({
        success: false,
        message: 'User already exists',
      });
      return;
    }
 
           //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

           //Create New User
        const newUser: User = await UserModel.create({
            fullName,
            email,
            password: hashedPassword,
            role,
            companyName,
            companyEmail,
            isAccountDeleted
        });

        // Remove password before sending response
        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: userWithoutPassword
        });

    } catch (error: unknown) {
        console.log({message: "Error signing up user", error: error});
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return 
    }
 }


// @route POST /api/auth/login
// @description Login User (JWT authentication with access token )
// @access Public
export const login = async (req: Request, res: Response): Promise<void> => { 
    try {
        const { email, password } = req.body;

        //Validation
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            });
            return
        }

        //Check for existing user
        const existingUser = await UserModel.findOne({ email }).select('+password');   
        if (!existingUser) {
            res.status(400).json({
                success: false,
                message: "User not found, Please sign up"
            });
            return
        }

        if (existingUser.isAccountDeleted) { 
            res.status(404).json({
                success: false,
                message: "Account has been deleted, please sign up again.",
                data: existingUser
            });
            return;
         }  

        //Check Password
        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
            return
        }

        //Create JWT Token
        const accessToken = jwt.sign({ userId: existingUser._id, email: existingUser.email, role: existingUser.role }, ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
    
         // Remove password before sending response
        const userWithoutPassword = existingUser.toObject() as any;
        delete userWithoutPassword.password;

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            accessToken,
            data: userWithoutPassword
        });

    } catch (error: unknown) {
        console.log({ message: "Error logging in user", error: error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return
    }
}

//@route POST /api/v1/auth/me
//@desc Get Data/Profile/Details of Logged-in user
//@access public
export const userData = async (req: AuthRequest, res: Response, ): Promise<void> => {
    try {

        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({success: false, message: "Unauthorized"})
        }

        const user = await UserModel.findById(userId).select('-password');
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            data: user
        })

       
    } catch (error) {
        console.log({ message: "Error fetching user data", error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
   }
}

// @route POST /api/auth/logout 
// @description Logout User (Clear refresh token)
// @access Public
export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({success:true, message: "User logged out successfully"})
        
    } catch (error) {
        console.error({ message: "Error logging out user", error: error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

