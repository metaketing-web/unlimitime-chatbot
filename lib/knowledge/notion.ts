import { env } from '@/lib/config/env';
import type { KnowledgeHit } from './types';

export interface NotionSearchParams {
  query: string;
  limit?: number;
}

export async function searchNotionKnowledge(params: NotionSearchParams): Promise<KnowledgeHit[]> {
  if (!env.NOTION_TOKEN) {
    return [];
  }

  // TODO: brancher l’API Notion ou le connecteur interne pour retourner les pages pertinentes.
  // Cette fonction est volontairement structurée pour accueillir la recherche sémantique.
  void params;
  return [];
}

export async function ingestNotionKnowledge(): Promise<{ created: number; updated: number }> {
  if (!env.NOTION_TOKEN) {
    return { created: 0, updated: 0 };
  }

  // TODO: synchroniser les contenus Notion dans l’index interne.
  return { created: 0, updated: 0 };
}
