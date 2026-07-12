import { Router } from 'express';
import { getExams, createExam, uploadMarks, getMarksByExam, getMarksByStudent } from '../controllers/marks.controller';
import { verifyToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/roleGuard';

const router = Router();

router.get('/exams', verifyToken, requireRole('admin', 'faculty', 'student'), getExams);
router.post('/exams', verifyToken, requireRole('admin', 'faculty'), createExam);
router.post('/exams/:exam_id/marks', verifyToken, requireRole('admin', 'faculty'), uploadMarks);
router.get('/exams/:exam_id/marks', verifyToken, requireRole('admin', 'faculty'), getMarksByExam);
router.get('/student/:student_id', verifyToken, requireRole('admin', 'faculty', 'student'), getMarksByStudent);

export default router;