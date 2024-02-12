import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/(ui)/globals.css'
import Navbar from './(ui)/navbar/navbar'
import Footer from './(ui)/footer'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Music Shop',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <header>
          <Navbar />
        </header>
        <Providers>
          {children}
        </Providers>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}