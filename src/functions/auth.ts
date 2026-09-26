import { createServerFn } from '@tanstack/react-start';

export const verifyAdminSession = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { requireAdminByToken } = await import('@/services/auth');
    const admin = await requireAdminByToken(data.idToken);
    return {
      email: admin.email,
      role: admin.role,
      isSuperAdmin: admin.isSuperAdmin,
    };
  });

export const checkAdminSession = createServerFn({ method: 'POST' })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    try {
      const { requireAdminByToken } = await import('@/services/auth');
      const admin = await requireAdminByToken(data.idToken);
      return { authorized: true, email: admin.email, role: admin.role, isSuperAdmin: admin.isSuperAdmin };
    } catch (err) {
      console.error('[checkAdminSession] error:', err);
      return { authorized: false, email: null, role: null, isSuperAdmin: false };
    }
  });
