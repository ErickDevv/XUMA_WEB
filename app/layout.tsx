import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Jarcería Xuma - Productos de Limpieza y Artículos del Hogar',
  description: 'Tu tienda de confianza para productos de limpieza a granel y artículos del hogar en Pachuca de Soto, Hidalgo. Calidad y precio en cada producto.',
  keywords: ['jarcería', 'productos de limpieza', 'limpieza a granel', 'cloro', 'detergente', 'artículos del hogar', 'Pachuca', 'Hidalgo', 'San Cayetano'],
  authors: [{ name: 'Jarcería Xuma' }],
  creator: 'Jarcería Xuma',
  publisher: 'Jarcería Xuma',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://www.xuma.live',
    siteName: 'Jarcería Xuma',
    title: 'Jarcería Xuma - Productos de Limpieza y Artículos del Hogar',
    description: 'Tu tienda de confianza para productos de limpieza a granel y artículos del hogar en Pachuca de Soto, Hidalgo.',
    images: [
      {
        url: '/xuma.png',
        width: 1200,
        height: 630,
        alt: 'Jarcería Xuma - Mascota Ajolote',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jarcería Xuma - Productos de Limpieza a Granel',
    description: 'Tu tienda de confianza para productos de limpieza a granel y artículos del hogar en Pachuca de Soto, Hidalgo.',
    images: ['/xuma.png'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
