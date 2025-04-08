import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request { 
    user?: string | jwt.JwtPayload
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token);

        if (!token) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided"
            });
            return;
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
            if (error) {
                res.status(403).json({
                    success: false,
                    message: "Forbidden: Invalid or expired token "
                });
                return;
            }

            (req as any).user = user;
            console.log(user);

            next();
        });
        
    } catch (error) {
        res.status(400).json(
            {
                success: false,
                message: "Invalid or expired token",
                error: error
            }
        )
    }
}