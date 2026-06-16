import { NextResponse } from 'next/server';
import { z } from 'zod';
import { routeChat } from '@/lib/chat/router';

const schema = z.object({
  message: z.string().min(1)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Message manquant ou invalide.' }, { status: 400 });
  }

  const response = routeChat(parsed.data.message);
  return NextResponse.json(response);
}
