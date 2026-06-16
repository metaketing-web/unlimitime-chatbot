# Unlimitime Chatbot

Chatbot privé pour [`app.unlimitime.com`](https://app.unlimitime.com), aligné sur le cahier des charges (juin 2026).

## Phase 1 — livrée (collecteur)

L’API chat **Phase 1** est intégrée dans la plateforme collecteur ([metaketing-web/App](https://github.com/metaketing-web/App)) :

| Élément | Détail |
|---------|--------|
| **Endpoint** | `POST /api/chat` (Bearer token obligatoire) |
| **UI** | Widget flottant (favicon Unlimitime, utilisateurs connectés) |
| **Sources** | FAQ Unlimitime, pages preuve (juridique, blockchain, marché), Notion optionnel |
| **IA** | Synthèse OpenAI si `OPENAI_API_KEY` configurée |
| **Web** | Recherche légère (preview Phase 2) pour cote / modèles |

## Phase 2 — livrée (collecteur)

Améliorations déployées dans **metaketing-web/App** (`server/chat/`, `server/web-research.js`, widget React) :

| Élément | Détail |
|---------|--------|
| **Intent routing** | Détection `deposit`, `kyc`, `score`, `horology`, etc. |
| **FAQ dépôt** | Étapes numérotées (parcours certification → Mes certifications → créneau) |
| **Sources** | Limitées à 1–3 sources réellement utilisées (ex. « Unlimitime — Dépôt » seul pour la réservation) |
| **Recherche web** | `researchChatWeb()` + fallback marché horloger ; timestamp de fraîcheur dans la réponse |
| **Modes** | `documents`, `web`, `horology` ; stubs Phase 3/4 pour Stripe, agenda, Turnkey, WatchCharts |
| **UI** | Affichage sources + horodatage web dans le widget |

### Test de validation

```bash
# Question type « comment réserver un dépôt »
# → intent: deposit
# → sources: ["Unlimitime — Dépôt"] (sans pages preuve juridique/blockchain)
```

Ce dépôt reste le **projet Next.js autonome** pour évolutions futures (déploiement séparé, connecteurs avancés).

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

## Intégration plateforme

```bash
curl -X POST https://app.unlimitime.com/api/chat \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"message":"Comment réserver un dépôt ?","lang":"fr"}'
```

Réponse attendue (Phase 2) :

```json
{
  "ok": true,
  "answer": "…",
  "mode": "documents",
  "sources": ["Unlimitime — Dépôt"],
  "confidence": "high",
  "freshness": { "docs": "static", "web": null }
}
```

## Roadmap

1. ~~Squelette web + chat~~
2. ~~Phase 1 documentaire (collecteur)~~
3. ~~Recherche web + routing intent + sources ciblées (Phase 2 collecteur)~~
4. Ingestion Notion complète + index sémantique
5. Connecteurs métier (Stripe, agenda, Turnkey) — Phase 3
6. SCORE™ et WatchCharts — Phase 4
