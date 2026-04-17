'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  // Hardcoded simple authentication logic - adjust as needed
  if (username === 'admin' && password === 'password123') {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', 'authenticated', {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 // 1 day
    });
  } else {
    return { error: 'Invalid username or password!' };
  }
  
  // Notice: redirect must be called outside try-catch to work correctly in server actions
  redirect('/admin/seo');
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_token');
    redirect('/admin/login');
}
