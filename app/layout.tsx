import type {Metadata} from 'next';
import {Playfair_Display, Plus_Jakarta_Sans} from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bella_encant | Decoração Express: Monte Sua Festa em 1 Minuto',
  description:
    'Simulador e roteiro cenográfico interativo para montar decorações, aplicar a regra 60-30-10, estruturar a mesa e gerar orçamentos express em 1 minuto.',
  openGraph: {
    title: 'Bella_encant | Decoração Express: Monte Sua Festa em 1 Minuto',
    description:
      'Simulador e roteiro cenográfico interativo para montar decorações, aplicar a regra 60-30-10, estruturar a mesa e gerar orçamentos express em 1 minuto.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bella_encant | Decoração Express: Monte Sua Festa em 1 Minuto',
    description:
      'Simulador e roteiro cenográfico interativo para montar decorações, aplicar a regra 60-30-10, estruturar a mesa e gerar orçamentos express em 1 minuto.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="bg-background text-on-surface antialiased font-sans selection:bg-primary-fixed selection:text-on-primary-fixed" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

