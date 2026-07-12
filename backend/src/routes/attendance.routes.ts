import { Router } from 'express';
import { getAttendance, getAttendanceById, createAttendance, updateAttendance, getStudentAttendance } from '../controllers/attendance.controller';
import { verifyToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/roleGuard';

const router = Router();

router.get('/', verifyToken, requireRole('admin', 'faculty'), getAttendance);
router.get('/student/:student_id', verifyToken, requireRole('admin', 'faculty', 'student'), getStudentAttendance);
router.get('/:id', verifyToken, requireRole('admin', 'faculty'), getAttendanceById);
router.post('/', verifyToken, requireRole('admin', 'faculty'), createAttendance);
router.put('/:id', verifyToken, requireRole('admin', 'faculty'), updateAttendance);

export default router;