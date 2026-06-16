import { env } from '@/lib/config/env';
import { toolUnavailable, type ToolStatus } from './common';

export async function getTurnkeyStatus(): Promise<ToolStatus> {
  if (!env.TURNKEY_API_KEY) {
    return toolUnavailable('turnkey', 'Turnkey n’est pas encore connecté.', true);
  }

  return {
    connected: true,
    provider: 'turnkey',
    message: 'Turnkey connecté et prêt.',
    requiresConfirmation: true
  };
}
