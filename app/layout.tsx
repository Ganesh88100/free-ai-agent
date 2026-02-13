import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Deterministic UI Generator',
  description: 'Deterministic multi-agent UI generator.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
