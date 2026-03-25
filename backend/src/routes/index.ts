import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './userRoutes';
import juryRoutes from './juryRoutes';


const router = Router();

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/jury', juryRoutes);

// Default API response
router.get('/', (req, res) => {
  res.json({
    message: 'BiovaHack API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      jury: '/api/jury',
      health: '/health'
    }
  });
});

export default router;
