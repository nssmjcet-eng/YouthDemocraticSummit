import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { firebaseAuth } from '@/integrations/firebase/client';
import { checkAdminSession } from '@/functions/auth';

export const Route = createFileRoute('/_authenticated')({
  ssr: false,
  beforeLoad: async () => {
    // Wait for Firebase auth state to resolve
    let user = firebaseAuth.currentUser;
    if (!user) {
      await new Promise<void>((resolve) => {
        const unsub = firebaseAuth.onAuthStateChanged((u) => {
          user = u;
          unsub();
          resolve();
        });
        setTimeout(resolve, 1500);
      });
    }

    if (user) {
      try {
        const idToken = await user.getIdToken();
        const result = await checkAdminSession({ data: { idToken } });
        if (result.authorized) {
          return {
            user: { id: user.uid, email: user.email },
            idToken,
            isSuperAdmin: result.isSuperAdmin,
            adminRole: result.role,
          };
        }
      } catch (err) {
        console.warn('Admin session check failed:', err);
      }
    }

    throw redirect({ to: '/auth' });
  },
  component: () => <Outlet />,
});
