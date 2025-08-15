import type { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: {
    template: 'Edmonton Painters | Roll On Painting - Residential & Commercial Painting Services',
    default: 'Edmonton Commercial & Residential Painters | Roll On Painting Contractors',
  },
  description:
    "Roll On Painting - Edmonton's trusted residential & commercial painters with 15 years experience. Interior, exterior, cabinet refinishing, eco-friendly paints. Serving Edmonton, Sherwood Park, St Albert. Free estimates 780-722-5544",
  keywords: [
    'Edmonton painters, residential painting Edmonton, commercial painting Edmonton, interior painting, exterior painting, cabinet refinishing, drywall repair, eco friendly paint, painting contractors Edmonton',
  ],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg' }],
  },
  authors: [{ name: 'James Foley' }],
  creator: 'James Foley',
  openGraph: {
    type: 'website',
    title: 'Edmonton Painters | Roll On Painting - Professional Residential & Commercial',
    locale: 'en_CA',
    url: 'https://www.rollonpaintingedmonton.com',
    siteName: 'Roll On Painting Edmonton',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MyApp Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourhandle',
  },
  robots: {
    index: true,
    follow: true,
  },
};
