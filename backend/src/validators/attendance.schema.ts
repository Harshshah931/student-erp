import { z } from 'zod';

export const createAttendanceSchema = z.object({
  subject_id: z.string().uuid(),
  faculty_id: z.string().uuid(),
  date: z.string(),
  semester: z.number().min(1).max(8),
  attendance_details: z.array(z.object({
    student_id: z.string().uuid(),
    status: z.enum(['present', 'absent', 'late']),
  })),
});

export const updateAttendanceSchema = z.object({
  attendance_details: z.array(z.object({
    student_id: z.string().uuid(),
    status: z.enum(['present', 'absent', 'late']),
  })),
});