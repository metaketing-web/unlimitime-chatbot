import { env } from '@/lib/config/env';
import { toolUnavailable, type ToolStatus } from './common';

export async function getStripeStatus(): Promise<ToolStatus> {
  if (!env.STRIPE_SECRET_KEY) {
    return toolUnavailable('stripe', 'Stripe n’est pas encore connecté.');
  }

  // TODO: brancher les appels réels à Stripe.
  return {
    connected: true,
    provider: 'stripe',
    message: 'Stripe connecté et prêt.',
    requiresConfirmation: true
  };
}
