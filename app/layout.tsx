import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const museoSans = localFont({
  src: [
    { path: '../public/Tipografía/MuseoSans-100.otf', weight: '100', style: 'normal' },
    { path: '../public/Tipografía/MuseoSans-100Italic.otf', weight: '100', style: 'italic' },
    { path: '../public/Tipografía/MuseoSans-300.otf', weight: '300', style: 'normal' },
    { path: '../public/Tipografía/MuseoSans-300Italic.otf', weight: '300', style: 'italic' },
    { path: '../public/Tipografía/MuseoSans_500.otf', weight: '500', style: 'normal' },
    { path: '../public/Tipografía/MuseoSans_500_Italic.otf', weight: '500', style: 'italic' },
    { path: '../public/Tipografía/MuseoSans_700.otf', weight: '700', style: 'normal' },
    { path: '../public/Tipografía/MuseoSans-700Italic.otf', weight: '700', style: 'italic' },
    { path: '../public/Tipografía/MuseoSans_900.otf', weight: '900', style: 'normal' },
    { path: '../public/Tipografía/MuseoSans-900Italic.otf', weight: '900', style: 'italic' },
  ],
  variable: '--font-museo-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Simon Movilidad',
  description: 'Optimiza tu movilidad - Gestión de vehículos',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-CO" className={museoSans.variable}>
      <body className="font-sans antialiased" style={{ fontFamily: 'var(--font-museo-sans), sans-serif' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
