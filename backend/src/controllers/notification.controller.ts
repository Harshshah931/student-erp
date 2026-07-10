import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { createNotificationSchema } from '../validators/notification.schema';

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { target_role, department_id } = req.query;
    let query = supabase.from('notifications').select('*, users(full_name)').order('created_at', { ascending: false });
    if (target_role) query = query.eq('target_role', target_role);
    if (department_id) query = query.eq('department_id', department_id);
    const { data, error } = await query;
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createNotification = async (req: Request, res: Response) => {
  try {
    const parsed = createNotificationSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
    const { data, error } = await supabase.from('notifications').insert(parsed.data).select().single();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id).select().single();
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('notifications').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    return res.json({ message: 'Notification deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};