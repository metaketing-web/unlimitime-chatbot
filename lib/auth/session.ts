import { env } from '@/lib/config/env';

export type SessionRole = 'member' | 'admin' | 'support' | 'guest';

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: SessionRole;
  connected: boolean;
}

export function getSessionUserFromRequest(request: Request): SessionUser | null {
  const email = request.headers.get('x-unlimitime-user-email')?.trim();
  const nameHeader = request.headers.get('x-unlimitime-user-name')?.trim();
  const roleHeader = request.headers.get('x-unlimitime-user-role')?.trim() as SessionRole | undefined;

  if (!email) {
    if (env.AUTH_ENFORCE === 'true') {
      return null;
    }

    return {
      id: 'dev-user',
      email: 'demo@unlimitime.local',
      name: 'Demo User',
      role: 'guest',
      connected: false
    };
  }

  return {
    id: email,
    email,
    name: nameHeader || email.split('@')[0] || 'Utilisateur',
    role: roleHeader || 'member',
    connected: true
  };
}
