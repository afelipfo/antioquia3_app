import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: false,
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: "Centro Virtual de Pruebas Antioquia 3",
  description:
    "Plataforma de preparación para el proceso de selección Antioquia 3 con acceso a pruebas generales, específicas y comportamentales.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[480px] w-[880px] rounded-full bg-primary/25 blur-[160px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsla(217,92%,62%,0.35),transparent_55%),radial-gradient(circle_at_bottom_right,hsla(183,75%,60%,0.28),transparent_45%)]" />
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
