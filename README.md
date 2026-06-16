# Unlimitime Chatbot

Chatbot privé pour [`app.unlimitime.com`](https://app.unlimitime.com), aligné sur le [cahier des charges](https://github.com/metaketing-web/unlimitime-chatbot) (juin 2026).

## Phase 1 — livrée (collecteur)

L’API chat **Phase 1** est intégrée dans la plateforme collecteur ([metaketing-web/App](https://github.com/metaketing-web/App)) :

| Élément | Détail |
|---------|--------|
| **Endpoint** | `POST /api/chat` (Bearer token obligatoire) |
| **UI** | Widget flottant « U » (utilisateurs connectés) |
| **Sources** | FAQ Unlimitime, pages preuve (juridique, blockchain, marché), Notion optionnel |
| **IA** | Synthèse OpenAI si `OPENAI_API_KEY` configurée |
| **Web** | Recherche légère (Phase 2 preview) pour cote / modèles |

Ce dépôt reste le **projet Next.js autonome** pour Phase 2+ (déploiement séparé, connecteurs avancés).

## Objectifs long terme

- Réponses depuis Notion et le site Unlimitime
- Questions horlogères générales et techniques
- Recherche web temps réel (cote, tendances)
- Connecteurs : Stripe, agenda, Turnkey
- SCORE™ et WatchCharts

## Stack

- Next.js 14 + TypeScript
- Route `/api/chat` (squelette routage d’intention)
- UI `components/ChatApp.tsx`

## Démarrage local (squelette)

```bash
npm install
npm run dev
```

## Variables d’environnement

```env
NOTION_TOKEN=
PLATFORM_API_URL=https://app.unlimitime.com
CHATBOT_BRIDGE_SECRET=   # futur pont signé
OPENAI_API_KEY=
```

## Intégration plateforme (Phase 1)

```bash
curl -X POST https://app.unlimitime.com/api/chat \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"message":"Comment réserver un dépôt ?","lang":"fr"}'
```

## Roadmap

1. ~~Squelette web + chat~~
2. ~~Phase 1 documentaire (collecteur)~~
3. Ingestion Notion complète + index sémantique
4. Recherche web temps réel (Phase 2)
5. Connecteurs métier (Stripe, agenda, Turnkey)
6. SCORE™ et WatchCharts
