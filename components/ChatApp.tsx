'use client';

import { FormEvent, useMemo, useState } from 'react';
import type { ChatResponse } from '@/lib/chat/types';

type Message = {
  role: 'user' | 'assistant';
  text: string;
  meta?: ChatResponse;
};

const starterMessages: Message[] = [
  {
    role: 'assistant',
    text: 'Bonjour. Pose-moi une question sur Unlimitime, l’horlogerie, un document interne ou un sujet nécessitant une recherche à jour.'
  }
];

export function ChatApp() {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const placeholders = useMemo(
    () => [
      'Quelle est la différence entre une Royal Oak et une Nautilus ?',
      'Quelle est la cote actuelle de cette montre ?',
      'Quel est le statut de mon paiement Stripe ?',
      'Ajoute un rendez-vous jeudi à 15h'
    ],
    []
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = input.trim();
    if (!message || loading) return;

    setMessages((current) => [...current, { role: 'user', text: message }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error('Erreur de chat');
      }

      const data = (await response.json()) as ChatResponse;
      setMessages((current) => [...current, { role: 'assistant', text: data.answer, meta: data }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: 'Le service de chat n’est pas encore complètement branché. Le squelette est en place, mais il faut encore connecter les sources et les outils.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Unlimitime • chatbot privé</p>
          <h1>Assistant horloger & métier</h1>
          <p className="lead">Base documentaire, recherche web temps réel et connecteurs métier dans une seule interface.</p>
        </div>
        <div className="chips">
          {['Notion', 'Web search', 'Stripe', 'Agenda', 'Turnkey', 'SCORE™'].map((chip) => (
            <span key={chip} className="chip">
              {chip}
            </span>
          ))}
        </div>
      </section>

      <section className="chat-card">
        <div className="messages" aria-live="polite">
          {messages.map((message, index) => (
            <article key={index} className={`bubble ${message.role}`}>
              <div className="bubble-header">
                <span>{message.role === 'user' ? 'Vous' : 'Assistant'}</span>
                {message.meta ? <span className="mode">{message.meta.mode}</span> : null}
              </div>
              <p>{message.text}</p>
              {message.meta ? (
                <div className="bubble-meta">
                  <span>Confiance : {message.meta.confidence}</span>
                  <span>Confirmation : {message.meta.requiresConfirmation ? 'oui' : 'non'}</span>
                  {message.meta.sources.length ? <span>Sources : {message.meta.sources.join(', ')}</span> : null}
                </div>
              ) : null}
            </article>
          ))}
          {loading ? <div className="loading">Analyse en cours…</div> : null}
        </div>

        <form className="composer" onSubmit={onSubmit}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={placeholders[Math.floor(Math.random() * placeholders.length)]}
            aria-label="Votre message"
          />
          <button type="submit" disabled={loading}>
            Envoyer
          </button>
        </form>
      </section>
    </main>
  );
}
