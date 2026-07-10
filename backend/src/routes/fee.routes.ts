import { Router } from 'express';
import { getFees, getFeeById, createFee, createPayment, getStudentFees } from '../controllers/fee.controller';

const router = Router();

router.get('/', getFees);
router.get('/student/:student_id', getStudentFees);
router.get('/:id', getFeeById);
router.post('/', createFee);
router.post('/:fee_id/payments', createPayment);

export default router;