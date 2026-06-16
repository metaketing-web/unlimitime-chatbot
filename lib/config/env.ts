import { z } from 'zod';

const envSchema = z.object({
  AUTH_ENFORCE: z.enum(['true', 'false']).default('false'),
  NEXT_PUBLIC_APP_NAME: z.string().default('Unlimitime Chatbot'),
  NOTION_TOKEN: z.string().optional(),
  NOTION_DATABASE_ID: z.string().optional(),
  SEARCH_PROVIDER: z.enum(['stub', 'exa', 'tavily']).default('stub'),
  SEARCH_API_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  TURNKEY_API_KEY: z.string().optional(),
  SCORE_API_KEY: z.string().optional(),
  WATCHCHARTS_API_KEY: z.string().optional(),
  SITE_CONTENT_URL: z.string().default('https://unlimitime.com')
});

export const env = envSchema.parse({
  AUTH_ENFORCE: process.env.AUTH_ENFORCE,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  SEARCH_PROVIDER: process.env.SEARCH_PROVIDER,
  SEARCH_API_KEY: process.env.SEARCH_API_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  TURNKEY_API_KEY: process.env.TURNKEY_API_KEY,
  SCORE_API_KEY: process.env.SCORE_API_KEY,
  WATCHCHARTS_API_KEY: process.env.WATCHCHARTS_API_KEY,
  SITE_CONTENT_URL: process.env.SITE_CONTENT_URL
});
