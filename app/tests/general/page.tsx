import { DashboardHeader } from "@/components/dashboard-header"
import { SubjectCard } from "@/components/subject-card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const subjects = [
  {
    id: "gestion-publica",
    title: "Gestión Pública Territorial",
    description: "Principios y prácticas de la gestión pública en entidades territoriales",
    questionsCount: 0,
  },
  {
    id: "normatividad",
    title: "Normatividad de las Entidades Territoriales",
    description: "Marco legal y normativo que rige las entidades territoriales",
    questionsCount: 0,
  },
  {
    id: "razonamiento",
    title: "Razonamiento Analítico",
    description: "Capacidad de análisis lógico y resolución de problemas",
    questionsCount: 0,
  },
]

export default function GeneralTestPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">Prueba General</h1>
          <p className="text-muted-foreground text-lg text-balance">
            Selecciona un eje temático para comenzar la prueba
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} testType="general" />
          ))}
        </div>
      </main>
    </div>
  )
}
