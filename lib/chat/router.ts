import type { ChatMode, ChatResponse } from './types';

const specificWatchModels = [
  'royal oak',
  'nautilus',
  'submariner',
  'daytona',
  'gmt-master',
  'datejust',
  'oak',
  'seamaster',
  'speedmaster',
  'aquanaut',
  'reverso',
  'portugieser',
  'tank',
  'royal oaks',
  'patek',
  'rolex',
  'audemars piguet',
  'vacheron',
  'cartier'
];

function buildResponse(
  answer: string,
  mode: ChatMode,
  sources: string[],
  confidence: ChatResponse['confidence'],
  requiresConfirmation = false
): ChatResponse {
  return { answer, mode, sources, confidence, requiresConfirmation };
}

export function routeChat(message: string): ChatResponse {
  const normalized = message.trim().toLowerCase();

  if (!normalized) {
    return buildResponse(
      'Pose-moi une question sur Unlimitime, l’horlogerie, un document interne ou un sujet nécessitant une recherche à jour.',
      'general',
      [],
      'low'
    );
  }

  if (normalized.includes('stripe') || normalized.includes('paiement') || normalized.includes('facture') || normalized.includes('abonnement')) {
    return buildResponse(
      'Module Stripe détecté. Je peux brancher une lecture sécurisée des paiements, factures et abonnements une fois l’intégration API mise en place.',
      'stripe',
      ['Stripe API'],
      'medium',
      true
    );
  }

  if (normalized.includes('agenda') || normalized.includes('calendrier') || normalized.includes('rendez-vous') || normalized.includes('meeting')) {
    return buildResponse(
      'Module agenda détecté. Je peux lire, proposer et créer des événements dès que le connecteur calendrier est branché.',
      'calendar',
      ['Agenda API'],
      'medium',
      true
    );
  }

  if (normalized.includes('turnkey') || normalized.includes('wallet')) {
    return buildResponse(
      'Module Turnkey détecté. Le chatbot pourra interroger le wallet et lancer des actions autorisées avec confirmation.',
      'turnkey',
      ['Turnkey API'],
      'medium',
      true
    );
  }

  if (normalized.includes('score')) {
    return buildResponse(
      'SCORE™ est prévu dans une phase ultérieure. L’architecture est prête pour brancher l’API dès qu’elle sera disponible.',
      'score',
      ['SCORE™'],
      'medium'
    );
  }

  if (
    normalized.includes('cote') ||
    normalized.includes('prix') ||
    normalized.includes('tendance') ||
    normalized.includes('marché') ||
    normalized.includes('market') ||
    normalized.includes('actualité') ||
    normalized.includes('actu') ||
    normalized.includes('récent') ||
    normalized.includes('recent') ||
    normalized.includes('spécification') ||
    normalized.includes('specification') ||
    specificWatchModels.some((model) => normalized.includes(model))
  ) {
    return buildResponse(
      'Recherche web requise : cette demande doit être traitée à partir de sources à jour pour les modèles précis, la technique, la cote ou les tendances.',
      'web',
      ['Web search'],
      'high'
    );
  }

  if (
    normalized.includes('montre') ||
    normalized.includes('horlog') ||
    normalized.includes('complication') ||
    normalized.includes('calibre') ||
    normalized.includes('mouvement') ||
    normalized.includes('tourbillon')
  ) {
    return buildResponse(
      'Question horlogère générale détectée. Le chatbot doit répondre à partir de la base de connaissance horlogère interne et des documents Unlimitime.',
      'documents',
      ['Notion', 'Unlimitime docs'],
      'medium'
    );
  }

  return buildResponse(
    'Question documentaire détectée. Le chatbot doit chercher dans la base interne Unlimitime avant de répondre.',
    'documents',
    ['Notion', 'Unlimitime docs'],
    'medium'
  );
}
