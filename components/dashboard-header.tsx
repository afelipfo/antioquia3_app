"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Home } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href="/dashboard"
          className="relative flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Home className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline-flex flex-col leading-tight">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Centro Virtual</span>
            <span className="text-base font-semibold text-foreground">Pruebas Antioquia 3</span>
          </span>
          <span className="sm:hidden text-base font-semibold">Centro de Pruebas</span>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Cerrar Sesión</span>
        </Button>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </header>
  )
}
