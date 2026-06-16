export type KnowledgeSourceType = 'notion' | 'site' | 'web';

export interface KnowledgeHit {
  title: string;
  excerpt: string;
  sourceUrl: string;
  sourceType: KnowledgeSourceType;
  score: number;
  publishedAt?: string;
}
