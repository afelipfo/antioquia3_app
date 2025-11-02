import { DashboardHeader } from "@/components/dashboard-header"
import { SubjectCard } from "@/components/subject-card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const subjects = [
  {
    id: "adaptacion-cambio",
    title: "Adaptación al Cambio",
    description: "Flexibilidad y capacidad de adaptación a nuevas situaciones",
    questionsCount: 0,
  },
  {
    id: "aporte-tecnico",
    title: "Aporte Técnico - Profesional",
    description: "Contribución técnica y profesional al equipo",
    questionsCount: 0,
  },
  {
    id: "aprendizaje-continuo",
    title: "Aprendizaje Continuo",
    description: "Disposición para el desarrollo y aprendizaje constante",
    questionsCount: 0,
  },
  {
    id: "compromiso-organizacion",
    title: "Compromiso con la Organización",
    description: "Identificación y compromiso con los objetivos institucionales",
    questionsCount: 0,
  },
  {
    id: "comunicacion-efectiva",
    title: "Comunicación Efectiva",
    description: "Habilidades de comunicación clara y asertiva",
    questionsCount: 0,
  },
  {
    id: "gestion-procedimientos",
    title: "Gestión de Procedimientos",
    description: "Manejo eficiente de procesos y procedimientos",
    questionsCount: 0,
  },
  {
    id: "instrumentacion-decisiones",
    title: "Instrumentación de Decisiones",
    description: "Capacidad para implementar decisiones efectivamente",
    questionsCount: 0,
  },
  {
    id: "orientacion-resultado",
    title: "Orientación al Resultado",
    description: "Enfoque en el logro de objetivos y metas",
    questionsCount: 0,
  },
  {
    id: "orientacion-usuario",
    title: "Orientación al Usuario y el Ciudadano",
    description: "Enfoque en la satisfacción del usuario y ciudadano",
    questionsCount: 0,
  },
  {
    id: "trabajo-equipo",
    title: "Trabajo en Equipo",
    description: "Colaboración efectiva con otros miembros del equipo",
    questionsCount: 0,
  },
]

export default function BehavioralTestPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">Prueba Comportamental</h1>
          <p className="text-muted-foreground text-lg text-balance">
            Selecciona un eje temático para comenzar la prueba
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} testType="behavioral" />
          ))}
        </div>
      </main>
    </div>
  )
}
