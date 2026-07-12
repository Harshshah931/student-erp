import { Router } from 'express';
import { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } from '../controllers/student.controller';
import { verifyToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/roleGuard';

const router = Router();

router.get('/', verifyToken, requireRole('admin', 'faculty'), getStudents);
router.get('/:id', verifyToken, requireRole('admin', 'faculty', 'student'), getStudentById);
router.post('/', verifyToken, requireRole('admin'), createStudent);
router.put('/:id', verifyToken, requireRole('admin'), updateStudent);
router.delete('/:id', verifyToken, requireRole('admin'), deleteStudent);

export default router;