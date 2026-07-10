import { z } from 'zod';

export const createNotificationSchema = z.object({
  title: z.string().min(2),
  message: z.string().min(2),
  sender_id: z.string().uuid(),
  target_role: z.enum(['student', 'faculty']).optional(),
  department_id: z.string().uuid().optional(),
});