import { NextResponse } from 'next/server';
import { z } from 'zod';
import { routeChat } from '@/lib/chat/router';

/**
 * Phase 1 : l’API de production est sur app.unlimitime.com/api/chat (collecteur).
 * Cette route reste un stub local pour développement du squelette Next.js.
 */
const schema = z.object({
  message: z.string().min(1),
  lang: z.string().optional(),
});

const PLATFORM_URL = process.env.PLATFORM_API_URL?.replace(/\/$/, '');

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Message manquant ou invalide.' }, { status: 400 });
  }

  const auth = request.headers.get('authorization');
  if (PLATFORM_URL && auth) {
    try {
      const upstream = await fetch(`${PLATFORM_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
        body: JSON.stringify({
          message: parsed.data.message,
          lang: parsed.data.lang || 'fr',
        }),
      });
      const data = await upstream.json().catch(() => ({}));
      if (upstream.ok) return NextResponse.json(data);
    } catch {
      /* fallback stub */
    }
  }

  const response = routeChat(parsed.data.message);
  return NextResponse.json({
    ...response,
    note: 'Stub local — configurez PLATFORM_API_URL + Authorization pour proxy Phase 1 prod.',
  });
}
