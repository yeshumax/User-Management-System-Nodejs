
import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { auth } from '../middleware/auth';
const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route example
router.get('/me', auth, (req, res) => {
  res.json({ 
    success: true, 
    user: req.user 
  });
});

export default router;