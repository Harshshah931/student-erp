import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // Verify the Supabase access token
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }

  // Fetch role from users table
  const { data: userData } = await supabase
    .from('users')
    .select('*, roles(name)')
    .eq('id', data.user.id)
    .single();

  // Attach user + role to request
  (req as any).user = {
    id: data.user.id,
    role: userData?.roles?.name // 'admin', 'faculty', or 'student'
  };

  next();
};