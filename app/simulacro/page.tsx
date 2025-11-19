import Link from "next/link"
import { ArrowLeft, ExternalLink, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ejesOPEC = [
  {
    nombre: "GESTIÓN PÚBLICA TERRITORIAL",
    url: "https://gemini.google.com/share/ba4fb3c46b08"
  },
  {
    nombre: "NORMATIVIDAD DE LAS ENTIDADES TERRITORIALES",
    url: "https://gemini.google.com/share/62d5e6948dd8"
  },
  {
    nombre: "RAZONAMIENTO ANALÍTICO",
    url: "https://gemini.google.com/share/7f585c612930"
  },
  {
    nombre: "ATENCIÓN DE SOLICITUDES PQRS",
    url: "https://gemini.google.com/share/43bdc7ce40a7"
  },
  {
    nombre: "CONTRATACIÓN PÚBLICA",
    url: "https://gemini.google.com/share/c23790fb9ac0"
  },
  {
    nombre: "FORMULACIÓN DE PLANES, PROGRAMAS Y PROYECTOS",
    url: "https://gemini.google.com/share/3517e8abe938"
  },
  {
    nombre: "GESTIÓN DE PROYECTOS",
    url: "https://gemini.google.com/share/65efaf399efe"
  },
  {
    nombre: "INFRAESTRUCTURA FÍSICA",
    url: "https://gemini.google.com/share/b49b92e92220"
  },
  {
    nombre: "OBRAS PÚBLICAS DE CONSTRUCCIÓN Y MANTENIMIENTO",
    url: "https://gemini.google.com/share/c9f5de732fb0"
  },
  {
    nombre: "PLANES DE MEJORAMIENTO",
    url: "https://gemini.google.com/share/f0b794c0c208"
  },
  {
    nombre: "SERVICIO Y ATENCIÓN AL USUARIO",
    url: "https://gemini.google.com/share/83d009287a4a"
  }
]

export default function SimulacroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Button>
          </Link>
        </div>

        <Card className="border-2 border-primary/20 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Simulacro 2025</CardTitle>
                <CardDescription className="text-base">
                  EJES OPEC 201834 - EXAMEN OPEC 201834
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {ejesOPEC.map((eje, index) => (
                <a
                  key={index}
                  href={eje.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 hover:bg-primary/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {eje.nombre}
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Nota:</strong> Cada enlace te llevará a un simulacro interactivo en Gemini con preguntas específicas del eje temático seleccionado.
          </p>
        </div>
      </div>
    </div>
  )
}
