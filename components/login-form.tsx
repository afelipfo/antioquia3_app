"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, LogIn } from "lucide-react"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/dashboard")
        router.refresh()
      } else {
        setError(data.error || "Error al iniciar sesión")
      }
    } catch (err) {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="relative overflow-hidden border-white/30 bg-white/80 shadow-xl shadow-primary/15 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(215,90%,70%,0.18),transparent_55%)]" />
      <CardHeader className="relative space-y-3">
        <CardTitle className="text-2xl font-semibold">Iniciar Sesión</CardTitle>
        <CardDescription className="leading-relaxed">
          Ingresa tus credenciales institucionales para acceder al centro de pruebas y continuar tu preparación.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border-border bg-secondary/80 focus-visible:ring-2 focus-visible:ring-primary/60"
              placeholder="Ingresa tu usuario"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-border bg-secondary/80 focus-visible:ring-2 focus-visible:ring-primary/60"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          {error && <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>}
          <Button type="submit" className="w-full gap-2" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Validando acceso...
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Ingresar al Dashboard
              </>
            )}
          </Button>
        </form>
        <p className="mt-6 text-xs text-muted-foreground">
          El acceso está limitado al personal designado para el proceso de selección Antioquia 3.
        </p>
      </CardContent>
    </Card>
  )
}
