import { z } from 'zod';

export const createExamSchema = z.object({
  name: z.string().min(2),
  subject_id: z.string().uuid(),
  faculty_id: z.string().uuid(),
  exam_date: z.string(),
  total_marks: z.number().min(1),
  semester: z.number().min(1).max(8),
});

export const uploadMarksSchema = z.object({
  marks: z.array(z.object({
    student_id: z.string().uuid(),
    marks_obtained: z.number().min(0),
    remarks: z.string().optional(),
  })),
});