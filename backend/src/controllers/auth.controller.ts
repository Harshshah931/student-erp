import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { loginSchema, registerSchema } from '../validators/auth.schema';

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }

    const { email, password } = parsed.data;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(401).json({ error: error.message });

    const { data: userData } = await supabase
      .from('users')
      .select('*, roles(name)')
      .eq('id', data.user.id)
      .single();

    return res.json({
      token: data.session.access_token,
      user: userData,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }

    const { email, password, full_name, role, phone } = parsed.data;

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) return res.status(400).json({ error: authError.message });

    const { data: roleData } = await supabase
      .from('roles')
      .select('id')
      .eq('name', role)
      .single();

    await supabase.from('users').insert({
      id: authData.user.id,
      email,
      full_name,
      phone,
      role_id: roleData?.id,
    });

    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  await supabase.auth.signOut();
  return res.json({ message: 'Logged out successfully' });
};