import { Router } from 'express';
import { getFees, getFeeById, createFee, createPayment, getStudentFees } from '../controllers/fee.controller';
import { verifyToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/roleGuard';

const router = Router();

router.get('/', verifyToken, requireRole('admin'), getFees);
router.get('/student/:student_id', verifyToken, requireRole('admin', 'student'), getStudentFees);
router.get('/:id', verifyToken, requireRole('admin', 'student'), getFeeById);
router.post('/', verifyToken, requireRole('admin'), createFee);
router.post('/:fee_id/payments', verifyToken, requireRole('admin'), createPayment);

export default router;