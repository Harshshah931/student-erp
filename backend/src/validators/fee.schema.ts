import { z } from 'zod';

export const createFeeSchema = z.object({
  student_id: z.string().uuid(),
  amount: z.number().min(0),
  due_date: z.string(),
  fee_type: z.string().min(2),
  semester: z.number().min(1).max(8),
});

export const createPaymentSchema = z.object({
  amount_paid: z.number().min(0),
  payment_mode: z.enum(['cash', 'online', 'cheque']),
  transaction_id: z.string().optional(),
  receipt_number: z.string().optional(),
});