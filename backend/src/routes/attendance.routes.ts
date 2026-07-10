import { Router } from 'express';
import { getAttendance, getAttendanceById, createAttendance, updateAttendance, getStudentAttendance } from '../controllers/attendance.controller';

const router = Router();

router.get('/', getAttendance);
router.get('/student/:student_id', getStudentAttendance);
router.get('/:id', getAttendanceById);
router.post('/', createAttendance);
router.put('/:id', updateAttendance);

export default router;