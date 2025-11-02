import { DashboardHeader } from "@/components/dashboard-header"
import { TestCategoryCard } from "@/components/test-category-card"
import { FileText, Users, Brain } from "lucide-react"

const testCategories = [
  {
    id: "general",
    title: "Prueba General",
    description: "Evaluación de conocimientos generales en gestión pública territorial",
    icon: FileText,
    subjectsCount: 3,
    color: "from-blue-500 to-blue-600",
    href: "/tests/general",
  },
  {
    id: "specific",
    title: "Prueba Específica",
    description: "Evaluación de competencias técnicas y profesionales específicas",
    icon: Brain,
    subjectsCount: 8,
    color: "from-emerald-500 to-emerald-600",
    href: "/tests/specific",
  },
  {
    id: "behavioral",
    title: "Prueba Comportamental",
    description: "Evaluación de competencias comportamentales y habilidades blandas",
    icon: Users,
    subjectsCount: 10,
    color: "from-violet-500 to-violet-600",
    href: "/tests/behavioral",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">Bienvenida, Angela</h1>
          <p className="text-muted-foreground text-lg text-balance">
            Selecciona una categoría de prueba para comenzar tu preparación
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testCategories.map((category) => (
            <TestCategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="mt-12 p-6 bg-card rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-2">Información del Proceso</h2>
          <p className="text-muted-foreground text-balance leading-relaxed">
            Este centro virtual te permite practicar y prepararte para el Proceso de Selección Antioquia 3. Cada
            categoría contiene múltiples ejes temáticos que debes dominar. Tómate tu tiempo para revisar cada sección y
            practicar con las pruebas disponibles.
          </p>
        </div>
      </main>
    </div>
  )
}
