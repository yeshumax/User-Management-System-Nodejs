import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Single auth function that handles both token verification and user attachment
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    // Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    
    // Find user
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      throw new Error();
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Please authenticate' 
    });
  }
};

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}