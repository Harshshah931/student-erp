import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { createExamSchema, uploadMarksSchema } from '../validators/marks.schema';

export const getExams = async (req: Request, res: Response) => {
  try {
    const { subject_id, semester, faculty_id } = req.query;
    let query = supabase.from('exams').select('*, subjects(name), faculty(*, users(full_name))');
    if (subject_id) query = query.eq('subject_id', subject_id);
    if (semester) query = query.eq('semester', semester);
    if (faculty_id) query = query.eq('faculty_id', faculty_id);
    const { data, error } = await query;
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createExam = async (req: Request, res: Response) => {
  try {
    const parsed = createExamSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
    const { data, error } = await supabase.from('exams').insert(parsed.data).select().single();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const uploadMarks = async (req: Request, res: Response) => {
  try {
    const { exam_id } = req.params;
    const parsed = uploadMarksSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

    const marksData = parsed.data.marks.map(m => ({
      exam_id,
      student_id: m.student_id,
      marks_obtained: m.marks_obtained,
      remarks: m.remarks,
    }));

    const { data, error } = await supabase
      .from('marks')
      .upsert(marksData, { onConflict: 'exam_id,student_id' })
      .select();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMarksByExam = async (req: Request, res: Response) => {
  try {
    const { exam_id } = req.params;
    const { data, error } = await supabase
      .from('marks')
      .select('*, students(*, users(full_name)), exams(name, total_marks)')
      .eq('exam_id', exam_id);
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMarksByStudent = async (req: Request, res: Response) => {
  try {
    const { student_id } = req.params;
    const { data, error } = await supabase
      .from('marks')
      .select('*, exams(name, total_marks, exam_date, subjects(name))')
      .eq('student_id', student_id);
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};