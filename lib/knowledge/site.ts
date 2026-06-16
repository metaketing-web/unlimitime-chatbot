import { env } from '@/lib/config/env';
import type { KnowledgeHit } from './types';

export interface SiteSearchParams {
  query: string;
  limit?: number;
}

export async function searchSiteKnowledge(params: SiteSearchParams): Promise<KnowledgeHit[]> {
  void params;

  // TODO: connecter le crawl / l’index du site Unlimitime.
  // La structure est prête pour brancher soit un crawler, soit un index pré-calculé.
  if (!env.SITE_CONTENT_URL) {
    return [];
  }

  return [];
}
