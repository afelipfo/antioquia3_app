import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Brain, Scale, Target, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const minicursos = [
  {
    id: "entender-vs-comprender",
    title: "Diferencias entre Entender y Comprender",
    description: "Aprende las diferencias conceptuales, lingüísticas y cognitivas entre estos dos procesos mentales fundamentales",
    icon: Brain,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "juicio-situacional",
    title: "Metodología del Juicio Situacional",
    description: "Domina la técnica de evaluación que mide cómo reaccionas ante situaciones reales del entorno laboral",
    icon: Scale,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "tres-dimensiones",
    title: "Las Tres Dimensiones — SER, SABER y HACER",
    description: "Comprende el modelo de competencias de la CNSC que garantiza la valoración integral de los aspirantes",
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "tipos-memoria",
    title: "Tipos de Memoria para Adquirir Conocimientos",
    description: "Descubre los tipos de memoria que intervienen en el aprendizaje y aplicación en pruebas de la CNSC",
    icon: Zap,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
]

export default function MinicursosPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Volver al Dashboard
          </Link>
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">
                Minicursos Educativos
              </h1>
              <p className="text-muted-foreground text-lg text-balance mt-1">
                Contenido formativo para fortalecer tus competencias
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {minicursos.map((curso) => {
            const Icon = curso.icon
            return (
              <Link key={curso.id} href={`/minicursos/${curso.id}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${curso.bgColor}`}>
                        <Icon className={`h-6 w-6 ${curso.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{curso.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {curso.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                      <span>Acceder al minicurso</span>
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg border">
          <h2 className="text-lg font-semibold mb-2">Sobre los Minicursos</h2>
          <p className="text-muted-foreground">
            Estos minicursos están diseñados para complementar tu preparación con contenido teórico
            fundamental. Cada uno aborda conceptos clave que te ayudarán a desarrollar un pensamiento
            más profundo y estructurado, esencial para el desempeño en los concursos públicos.
          </p>
        </div>
      </main>
    </div>
  )
}
