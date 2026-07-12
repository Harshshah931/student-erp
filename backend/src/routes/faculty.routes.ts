import { Router } from 'express';
import { getFaculty, getFacultyById, createFaculty, updateFaculty, deleteFaculty } from '../controllers/faculty.controller';
import { verifyToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/roleGuard';

const router = Router();

router.get('/', verifyToken, requireRole('admin'), getFaculty);
router.get('/:id', verifyToken, requireRole('admin', 'faculty'), getFacultyById);
router.post('/', verifyToken, requireRole('admin'), createFaculty);
router.put('/:id', verifyToken, requireRole('admin'), updateFaculty);
router.delete('/:id', verifyToken, requireRole('admin'), deleteFaculty);

export default router;