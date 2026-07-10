import { z } from 'zod';

export const createStudentSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().min(2),
  phone: z.string().optional(),
  enrollment_number: z.string().min(2),
  department_id: z.string().uuid(),
  semester: z.number().min(1).max(8),
  batch_year: z.number(),
  dob: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  address: z.string().optional(),
  guardian_name: z.string().optional(),
  guardian_phone: z.string().optional(),
});

export const updateStudentSchema = z.object({
  full_name: z.string().min(2).optional(),
  phone: z.string().optional(),
  semester: z.number().min(1).max(8).optional(),
  dob: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  address: z.string().optional(),
  guardian_name: z.string().optional(),
  guardian_phone: z.string().optional(),
});