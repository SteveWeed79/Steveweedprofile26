import type { Metadata, Viewport } from 'next';
import { Syne, DM_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

const SITE_URL = 'https://www.swbuild.dev';
const DESCRIPTION =
  'Steve Weed — builder and full-stack developer. Founder of KTXZ Enterprises and creator of Forespec, an engine that forces domain foresight before you build, then verifies what got built against it.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Steve Weed — Builder / Developer',
    template: '%s — Steve Weed',
  },
  description: DESCRIPTION,
  keywords: [
    'Steve Weed',
    'full-stack developer',
    'KTXZ Enterprises',
    'Forespec',
    'Next.js',
    'TypeScript',
    'AI tooling',
  ],
  authors: [{ name: 'Steve Weed', url: 'https://github.com/steveweed79' }],
  creator: 'Steve Weed',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Steve Weed',
    title: 'Steve Weed — Builder / Developer',
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steve Weed — Builder / Developer',
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
    { media: '(prefers-color-scheme: light)', color: '#fbfbfc' },
  ],
  colorScheme: 'dark light',
};

// Runs before paint to set the theme with no flash of the wrong colors.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Steve Weed',
  url: SITE_URL,
  jobTitle: 'Builder / Full-Stack Developer',
  sameAs: ['https://github.com/steveweed79', 'https://ktxzenterprises.com'],
  worksFor: { '@type': 'Organization', name: 'KTXZ Enterprises' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a href="#content" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
