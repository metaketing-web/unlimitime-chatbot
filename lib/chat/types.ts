export type ChatMode =
  | 'documents'
  | 'web'
  | 'stripe'
  | 'calendar'
  | 'turnkey'
  | 'score'
  | 'general';

export type Confidence = 'low' | 'medium' | 'high';

export interface ChatResponse {
  answer: string;
  mode: ChatMode;
  sources: string[];
  confidence: Confidence;
  requiresConfirmation: boolean;
}

export interface ChatRequest {
  message: string;
}
