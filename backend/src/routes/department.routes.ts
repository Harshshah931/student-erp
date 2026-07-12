import { Router } from 'express';
import { getDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } from '../controllers/department.controller';
import { verifyToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/roleGuard';

const router = Router();

router.get('/', verifyToken, requireRole('admin', 'faculty', 'student'), getDepartments);
router.get('/:id', verifyToken, requireRole('admin', 'faculty', 'student'), getDepartmentById);
router.post('/', verifyToken, requireRole('admin'), createDepartment);
router.put('/:id', verifyToken, requireRole('admin'), updateDepartment);
router.delete('/:id', verifyToken, requireRole('admin'), deleteDepartment);

export default router;