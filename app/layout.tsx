import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/(ui)/globals.css'
import Navbar from './(ui)/navbar/navbar'
import Footer from './(ui)/footer'

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
      <body className={`${inter.className} bg-slate-50`}>
        <header>
          <Navbar />
        </header>
        {children}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
