import { DashboardHeader } from "@/components/dashboard-header"
import { SubjectCard } from "@/components/subject-card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const subjects = [
  {
    id: "atencion-pqrs",
    title: "Atención de Solicitudes PQRS",
    description: "Gestión de peticiones, quejas, reclamos y sugerencias",
    questionsCount: 0,
  },
  {
    id: "contratacion",
    title: "Contratación Pública",
    description: "Procesos y normativa de contratación estatal",
    questionsCount: 0,
  },
  {
    id: "formulacion",
    title: "Formulación de Planes, Programas y Proyectos",
    description: "Diseño y estructuración de iniciativas públicas",
    questionsCount: 0,
  },
  {
    id: "gestion-proyectos",
    title: "Gestión de Proyectos",
    description: "Administración y seguimiento de proyectos",
    questionsCount: 0,
  },
  {
    id: "infraestructura",
    title: "Infraestructura Física",
    description: "Gestión de infraestructura y activos físicos",
    questionsCount: 0,
  },
  {
    id: "obras-publicas",
    title: "Obras Públicas de Construcción y Mantenimiento",
    description: "Ejecución y mantenimiento de obras públicas",
    questionsCount: 0,
  },
  {
    id: "planes-mejoramiento",
    title: "Planes de Mejoramiento",
    description: "Diseño e implementación de planes de mejora",
    questionsCount: 0,
  },
  {
    id: "servicio-usuario",
    title: "Servicio y Atención al Usuario",
    description: "Calidad en la atención y servicio al ciudadano",
    questionsCount: 0,
  },
]

export default function SpecificTestPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">Prueba Específica</h1>
          <p className="text-muted-foreground text-lg text-balance">
            Selecciona un eje temático para comenzar la prueba
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} testType="specific" />
          ))}
        </div>
      </main>
    </div>
  )
}
