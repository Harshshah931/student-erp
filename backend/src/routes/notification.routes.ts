import { Router } from 'express';
import { getNotifications, createNotification, markAsRead, deleteNotification } from '../controllers/notification.controller';
import { verifyToken } from '../middlewares/auth';
import { requireRole } from '../middlewares/roleGuard';

const router = Router();

router.get('/', verifyToken, requireRole('admin', 'faculty', 'student'), getNotifications);
router.post('/', verifyToken, requireRole('admin', 'faculty'), createNotification);
router.put('/:id/read', verifyToken, requireRole('admin', 'faculty', 'student'), markAsRead);
router.delete('/:id', verifyToken, requireRole('admin'), deleteNotification);

export default router;