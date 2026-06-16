import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Unlimitime Chatbot',
  description: 'Assistant privé Unlimitime pour les documents internes, l’horlogerie et la recherche web temps réel.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
