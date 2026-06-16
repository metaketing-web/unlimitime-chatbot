# Unlimitime Chatbot

Chatbot privé pour `app.unlimitime.com`, conçu pour répondre à partir des documents internes, de la base horlogère, et pour interroger des sources externes à jour quand c’est nécessaire.

## Objectifs

- Réponses depuis Notion et le site Unlimitime
- Questions horlogères générales et techniques
- Recherche web temps réel pour les modèles précis, la cote, les tendances et l’actualité
- Connexions métier : Stripe, agenda, Turnkey
- Préparation pour SCORE™ et WatchCharts

## Stack de départ

- Next.js
- TypeScript
- API route `/api/chat`
- UI de chat intégrée

## Structure

- `app/` — interface et route API
- `components/` — composants UI
- `lib/chat/` — logique de routage et d’intention
- `.env.example` — variables d’environnement

## Démarrage local

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Variables d’environnement

À définir plus tard selon les connecteurs :

- `NOTION_TOKEN`
- `SLACK_BOT_TOKEN`
- `GITHUB_TOKEN`
- `STRIPE_SECRET_KEY`
- `TURNKEY_API_KEY`
- `WATCHCHARTS_API_KEY`
- `SEARCH_API_KEY`

## Roadmap

1. Squelette web + chat
2. Ingestion Notion / site
3. Recherche web temps réel
4. Connecteurs métier
5. SCORE™ et WatchCharts
