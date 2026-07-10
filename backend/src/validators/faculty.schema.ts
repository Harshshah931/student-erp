import { z } from 'zod';

export const createFacultySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().min(2),
  phone: z.string().optional(),
  employee_code: z.string().min(2),
  department_id: z.string().uuid(),
  designation: z.string().optional(),
  joining_date: z.string().optional(),
});

export const updateFacultySchema = z.object({
  full_name: z.string().min(2).optional(),
  phone: z.string().optional(),
  department_id: z.string().uuid().optional(),
  designation: z.string().optional(),
  joining_date: z.string().optional(),
});