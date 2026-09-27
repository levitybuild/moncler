import type {Metadata} from 'next';
import { Montserrat, Cinzel } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Moncler Official Online Store | Luxury Down Jackets & Outerwear',
  description:
    'Discover luxury outerwear, down jackets, knitwear, and accessories from Moncler Collection, Grenoble, and Genius.',
  openGraph: {
    title: 'Moncler Official Online Store | Luxury Down Jackets & Outerwear',
    description:
      'Discover luxury outerwear, down jackets, knitwear, and accessories from Moncler Collection, Grenoble, and Genius.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moncler Official Online Store | Luxury Down Jackets & Outerwear',
    description:
      'Discover luxury outerwear, down jackets, knitwear, and accessories from Moncler Collection, Grenoble, and Genius.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`scroll-smooth ${montserrat.variable} ${cinzel.variable}`}>
      <body className="bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


