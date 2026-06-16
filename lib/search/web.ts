import { env } from '@/lib/config/env';
import type { WebSearchResult } from './types';

export interface WebSearchParams {
  query: string;
  limit?: number;
}

export async function searchWeb(params: WebSearchParams): Promise<WebSearchResult[]> {
  void params;

  if (env.SEARCH_PROVIDER === 'stub' || !env.SEARCH_API_KEY) {
    return [];
  }

  // TODO: brancher le provider retenu (Exa / Tavily / autre) avec son API key.
  return [];
}
