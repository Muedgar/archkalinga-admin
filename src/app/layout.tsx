import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { NavigationListener } from '@/components/redirect/navigation-listener'
import { ThemeProvider } from '@/components/wrapers/theme-provider'
import { ReduxProvider } from '@/components/wrapers/redux-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Arch-Kalinga | Materials Scheduling',
  description: 'Arch-Kalinga Team.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider>
            <NavigationListener />
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
