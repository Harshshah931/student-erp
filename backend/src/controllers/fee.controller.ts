import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { createFeeSchema, createPaymentSchema } from '../validators/fee.schema';

export const getFees = async (req: Request, res: Response) => {
  try {
    const { student_id, semester, status } = req.query;
    let query = supabase.from('fees').select('*, students(*, users(full_name, email))');
    if (student_id) query = query.eq('student_id', student_id);
    if (semester) query = query.eq('semester', semester);
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('fees')
      .select('*, students(*, users(full_name, email)), payments(*)')
      .eq('id', id)
      .single();
    if (error) return res.status(404).json({ error: 'Fee not found' });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createFee = async (req: Request, res: Response) => {
  try {
    const parsed = createFeeSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
    const { data, error } = await supabase.from('fees').insert(parsed.data).select().single();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { fee_id } = req.params;
    const parsed = createPaymentSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

    const { data: payment, error } = await supabase
      .from('payments')
      .insert({ fee_id, ...parsed.data })
      .select()
      .single();
    if (error) return res.status(400).json({ error: error.message });

    // Check total paid and update fee status
    const { data: allPayments } = await supabase
      .from('payments')
      .select('amount_paid')
      .eq('fee_id', fee_id);

    const { data: fee } = await supabase.from('fees').select('amount').eq('id', fee_id).single();

    const totalPaid = allPayments?.reduce((sum, p) => sum + p.amount_paid, 0) || 0;
    const status = totalPaid >= (fee?.amount || 0) ? 'paid' : 'partial';

    await supabase.from('fees').update({ status }).eq('id', fee_id);

    return res.status(201).json(payment);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getStudentFees = async (req: Request, res: Response) => {
  try {
    const { student_id } = req.params;
    const { data, error } = await supabase
      .from('fees')
      .select('*, payments(*)')
      .eq('student_id', student_id);
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};