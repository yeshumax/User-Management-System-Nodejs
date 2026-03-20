
import { Router } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/userController';
import { auth } from '../middleware/auth';
const router = Router();

// Apply auth middleware to all routes below this line
router.use(auth);

// Protected routes
router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;