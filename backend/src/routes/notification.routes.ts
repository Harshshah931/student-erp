import { Router } from 'express';
import { getNotifications, createNotification, markAsRead, deleteNotification } from '../controllers/notification.controller';

const router = Router();

router.get('/', getNotifications);
router.post('/', createNotification);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

export default router;