import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import WhatsAppButton from './components/WhatsAppButton';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'MacBook Repair London | Ealing & Hanwell | Fast Service',
  description:
    'Expert MacBook repair in London. Fast screen replacement, battery, and liquid damage service in Ealing & Hanwell. Get an instant quote now!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} !scroll-smooth`}>
      <body className="bg-white text-dark-text">
        <main>
          {children}
        </main>
        <WhatsAppButton />
      </body>
    </html>
  );
}
