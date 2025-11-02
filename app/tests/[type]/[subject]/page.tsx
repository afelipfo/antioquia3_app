import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface TestPageProps {
  params: Promise<{
    type: string
    subject: string
  }>
}

export default async function TestPage({ params }: TestPageProps) {
  const { type, subject } = await params

  const subjectTitle = subject
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
          <Link href={`/tests/${type}`}>
            <ArrowLeft className="h-4 w-4" />
            Volver a la categoría
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">{subjectTitle}</h1>
          <p className="text-muted-foreground text-balance">Prueba de evaluación</p>
        </div>

        <Alert className="mb-6 border-primary/50 bg-primary/5">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Esta sección está lista para que agregues el contenido de las preguntas manualmente.
          </AlertDescription>
        </Alert>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Instrucciones</CardTitle>
            <CardDescription>Lee cuidadosamente cada pregunta antes de responder</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Pregunta 1</h3>
              <p className="text-muted-foreground leading-relaxed">
                [Aquí irá el contenido de la pregunta que agregarás manualmente]
              </p>
              <div className="space-y-2 pl-4">
                <div className="flex items-start gap-3">
                  <input type="radio" name="q1" id="q1a" className="mt-1" />
                  <label htmlFor="q1a" className="cursor-pointer">
                    Opción A - [Contenido a agregar]
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input type="radio" name="q1" id="q1b" className="mt-1" />
                  <label htmlFor="q1b" className="cursor-pointer">
                    Opción B - [Contenido a agregar]
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input type="radio" name="q1" id="q1c" className="mt-1" />
                  <label htmlFor="q1c" className="cursor-pointer">
                    Opción C - [Contenido a agregar]
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input type="radio" name="q1" id="q1d" className="mt-1" />
                  <label htmlFor="q1d" className="cursor-pointer">
                    Opción D - [Contenido a agregar]
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <Button className="w-full sm:w-auto">Enviar Respuestas</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
