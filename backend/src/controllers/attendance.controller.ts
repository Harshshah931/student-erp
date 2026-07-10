import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { createAttendanceSchema, updateAttendanceSchema } from '../validators/attendance.schema';

export const getAttendance = async (req: Request, res: Response) => {
  try {
    const { subject_id, faculty_id, date, semester } = req.query;

    let query = supabase
      .from('attendance')
      .select('*, subjects(name), faculty(*, users(full_name)), attendance_details(*, students(*, users(full_name)))');

    if (subject_id) query = query.eq('subject_id', subject_id);
    if (faculty_id) query = query.eq('faculty_id', faculty_id);
    if (date) query = query.eq('date', date);
    if (semester) query = query.eq('semester', semester);

    const { data, error } = await query;
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('attendance')
      .select('*, subjects(name), attendance_details(*, students(*, users(full_name)))')
      .eq('id', id)
      .single();
    if (error) return res.status(404).json({ error: 'Attendance not found' });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createAttendance = async (req: Request, res: Response) => {
  try {
    const parsed = createAttendanceSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

    const { subject_id, faculty_id, date, semester, attendance_details } = parsed.data;

    const { data: attendance, error } = await supabase
      .from('attendance')
      .insert({ subject_id, faculty_id, date, semester })
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    const details = attendance_details.map(d => ({
      attendance_id: attendance.id,
      student_id: d.student_id,
      status: d.status,
    }));

    const { error: detailsError } = await supabase.from('attendance_details').insert(details);
    if (detailsError) return res.status(400).json({ error: detailsError.message });

    return res.status(201).json({ ...attendance, attendance_details: details });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = updateAttendanceSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

    const { attendance_details } = parsed.data;

    for (const detail of attendance_details) {
      await supabase
        .from('attendance_details')
        .update({ status: detail.status })
        .eq('attendance_id', id)
        .eq('student_id', detail.student_id);
    }

    return res.json({ message: 'Attendance updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getStudentAttendance = async (req: Request, res: Response) => {
  try {
    const { student_id } = req.params;
    const { data, error } = await supabase
      .from('attendance_details')
      .select('*, attendance(date, semester, subjects(name))')
      .eq('student_id', student_id);

    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};