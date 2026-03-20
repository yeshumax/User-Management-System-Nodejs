
import { Request, Response } from 'express';
import User from '../models/User';

// @desc    Get all users
// @route   GET /api/users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create user
// @route   POST /api/users
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, age } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ success: false, message: 'User already exists' });
      return;
    }
    
    const user = await User.create({ name, email, password, age });
    
    res.status(201).json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email, age: user.age }
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, age } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};