import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/(ui)/globals.css'
import Navbar from './(ui)/navbar/navbar'
import Footer from './(ui)/footer'
import { CartProvider } from './providers/cartProvider'
import ToastProvider from './providers/toastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Music Shop',
  description: 'Generated by create next app',
}

type Props = {
  children: React.ReactNode,
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-darkcyan-900`}>
        <header>
          <Navbar />
        </header>
        <ToastProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ToastProvider>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}