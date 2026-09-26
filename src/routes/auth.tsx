import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { firebaseAuth, googleProvider } from '@/integrations/firebase/client';
import { signInWithPopup, onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';
import { checkAdminSession } from '@/functions/auth';
import { YDS_CONFIG } from '@/config/yds';
import logo from '@/assets/nss-logo.png';

export const Route = createFileRoute('/auth')({
  head: () => ({
    meta: [
      { title: 'Organiser Sign In — YDS 2026' },
      { name: 'description', content: 'Sign in to manage Youth Democratic Summit registrations.' },
    ],
  }),
  component: AuthPage,
});

async function isAuthorisedAdmin(idToken: string): Promise<boolean> {
  try {
    const result = await checkAdminSession({ data: { idToken } });
    return result.authorized === true;
  } catch {
    return false;
  }
}

/** Ashoka Chakra — 24-spoke dharma wheel watermark */
function AshokaChakra({ size = 480 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.43;
  const hubR = size * 0.055;
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 24;
    return (
      <line
        key={i}
        x1={cx + hubR * Math.cos(angle)}
        y1={cy + hubR * Math.sin(angle)}
        x2={cx + outerR * Math.cos(angle)}
        y2={cy + outerR * Math.sin(angle)}
        stroke="currentColor"
        strokeWidth={size * 0.016}
        strokeLinecap="round"
      />
    );
  });
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx={cx} cy={cy} r={outerR + size * 0.03} fill="none" stroke="currentColor" strokeWidth={size * 0.03} />
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="currentColor" strokeWidth={size * 0.012} />
      <circle cx={cx} cy={cy} r={hubR} fill="currentColor" />
      {spokes}
    </svg>
  );
}

const GOOGLE_BTN: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.6rem',
  width: '100%',
  padding: '0.65rem 1.25rem',
  background: '#fff',
  border: '1.5px solid #dadce0',
  borderRadius: '6px',
  fontSize: '0.875rem',
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: 500,
  color: '#3c4043',
  cursor: 'pointer',
  transition: 'box-shadow 0.15s, background 0.15s',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
};

const ORANGE_BTN: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.6rem',
  width: '100%',
  padding: '0.7rem 1.25rem',
  background: '#FF9933',
  border: 'none',
  borderRadius: '6px',
  fontSize: '0.875rem',
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: 600,
  color: '#fff',
  cursor: 'pointer',
  transition: 'opacity 0.15s',
};

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function AuthPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [denied, setDenied] = useState(false);
  const [deniedEmail, setDeniedEmail] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          const ok = await isAuthorisedAdmin(idToken);
          if (ok) navigate({ to: '/admin', replace: true });
        } catch {
          // Not authorized — stay on auth page
        }
      }
    });
    return () => unsub();
  }, [navigate]);

  const doSignIn = async () => {
    setBusy(true);
    setDenied(false);
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const idToken = await result.user.getIdToken();
      const ok = await isAuthorisedAdmin(idToken);
      if (ok) {
        navigate({ to: '/admin', replace: true });
      } else {
        await fbSignOut(firebaseAuth);
        setDeniedEmail(result.user.email ?? '');
        setDenied(true);
      }
    } catch (err: any) {
      if (!['auth/popup-closed-by-user', 'auth/cancelled-popup-request'].includes(err?.code)) {
        console.error('Google sign-in error:', err);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#f5f5f0',
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      {/* ── Indian tricolor watercolor background ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg, rgba(255,153,51,0.55) 0%, rgba(255,200,120,0.25) 30%, rgba(255,255,255,0) 50%, rgba(160,220,160,0.25) 70%, rgba(19,136,8,0.45) 100%)',
        }}
      />

      {/* ── Ashoka Chakra watermark ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'rgba(0,0,100,0.055)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <AshokaChakra size={520} />
      </div>

      {/* ── Card ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          background: '#fff',
          borderRadius: '14px',
          width: '100%',
          maxWidth: '400px',
          margin: '1.5rem',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        }}
      >
        {/* Indian flag stripe */}
        <div style={{ display: 'flex', height: '5px' }}>
          <div style={{ flex: 1, background: '#FF9933' }} />
          <div style={{ flex: 1, background: '#138808' }} />
        </div>

        {/* Card body */}
        <div style={{ padding: '2rem 2rem 1.75rem' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <img
              src={logo}
              alt="NSS MJCET"
              width={64}
              height={64}
              style={{ borderRadius: '50%', objectFit: 'contain' }}
            />
          </div>

          {denied ? (
            /* ── Access Denied State ── */
            <>
              {/* Red badge */}
              <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: '#fff0f0',
                    border: '1px solid #fca5a5',
                    borderRadius: '999px',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#dc2626',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: '#dc2626',
                      display: 'inline-block',
                    }}
                  />
                  Access Restricted
                </span>
              </div>

              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#111',
                  margin: '0 0 0.5rem',
                  fontFamily: 'Cormorant Garamond, serif',
                }}
              >
                Access Restricted
              </h1>

              {/* Denied email pill */}
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    padding: '0.2rem 0.6rem',
                    fontSize: '0.72rem',
                    color: '#4b5563',
                    fontFamily: 'monospace',
                  }}
                >
                  {deniedEmail}
                </span>
              </div>

              <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#4b5563', lineHeight: 1.5, margin: '0 0 0.5rem' }}>
                Your Google account is not authorized to access the{' '}
                <strong>NSS MJCET Admin Portal</strong>.
              </p>
              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#4b5563', lineHeight: 1.5, margin: '0 0 1.5rem' }}>
                Access is restricted. Contact <span style={{ color: '#FF9933', fontWeight: 600 }}>GB</span> if you need admin rights.
              </p>

              <button
                style={{ ...ORANGE_BTN, marginBottom: '0.75rem', opacity: busy ? 0.7 : 1 }}
                disabled={busy}
                onClick={doSignIn}
              >
                <GoogleG />
                {busy ? 'Redirecting…' : 'Sign in with another account'}
              </button>

              <a
                href="/"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.65rem',
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  color: '#374151',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Back to NSS MJCET
              </a>
            </>
          ) : (
            /* ── Normal Sign-In State ── */
            <>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#FF9933',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  margin: '0 0 0.35rem',
                }}
              >
                NSS MJCET
              </p>
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  color: '#111',
                  margin: '0 0 0.6rem',
                  fontFamily: 'DM Sans, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Admin Portal
              </h1>
              <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#4b5563', lineHeight: 1.5, margin: '0 0 1.5rem' }}>
                Sign in with an authorized Google account to manage the YDS 2026 website.
              </p>

              <button
                style={{ ...GOOGLE_BTN, opacity: busy ? 0.7 : 1, marginBottom: '1rem' }}
                disabled={busy}
                onClick={doSignIn}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; }}
              >
                <GoogleG />
                {busy ? 'Signing in…' : 'Sign in with Google'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#9ca3af', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
                Access is restricted to authorized NSS MJCET organizers only.
              </p>

              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1rem', textAlign: 'center' }}>
                <a
                  href="/"
                  style={{ fontSize: '0.78rem', color: '#6b7280', textDecoration: 'none' }}
                >
                  ← Back to YDS 2026
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
