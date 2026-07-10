import { Router } from 'express';
import { getExams, createExam, uploadMarks, getMarksByExam, getMarksByStudent } from '../controllers/marks.controller';

const router = Router();

router.get('/exams', getExams);
router.post('/exams', createExam);
router.post('/exams/:exam_id/marks', uploadMarks);
router.get('/exams/:exam_id/marks', getMarksByExam);
router.get('/student/:student_id', getMarksByStudent);

export default router;