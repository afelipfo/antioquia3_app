import { DashboardHeader } from "@/components/dashboard-header"
import { SubjectCard } from "@/components/subject-card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { behavioralSubjectsV2 } from "@/lib/behavioral-competencies-v2"

const subjects = behavioralSubjectsV2.map((subject) => ({
  id: subject.id,
  title: subject.title,
  description: subject.description,
  questionsCount: subject.questions.length,
}))

export default function BehavioralTestPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Volver al Dashboard
          </Link>
        </Button>

        <section className="mb-10 space-y-6 rounded-3xl border border-white/20 bg-white/75 p-6 shadow-lg shadow-primary/10 backdrop-blur">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-balance md:text-4xl">Prueba Comportamental</h1>
            <p className="text-lg text-muted-foreground text-balance">
              Cada evaluación se construye sobre la síntesis del Decreto 815 de 2018, que define las competencias laborales
              generales y específicas del nivel profesional para las entidades regidas por los Decretos Ley 770 y 785 de 2005.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-primary shadow-inner shadow-primary/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">Síntesis normativa</p>
              <p className="mt-2 text-sm text-primary/80">
                El decreto establece competencias funcionales y comportamentales que cubren aprendizaje, orientación al
                ciudadano, trabajo en equipo, toma de decisiones y dirección del talento. Vincula requisitos de estudio,
                experiencia, contenido funcional del empleo y valoración integral del desempeño.
              </p>
            </div>
            <div className="rounded-2xl border border-white/30 bg-white/70 p-4 shadow-inner shadow-primary/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Cómo usar estas pruebas</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Selecciona un eje temático, responde las preguntas y obtén tu puntaje acumulado. Al terminar, el botón{" "}
                <span className="font-medium text-primary">Retroalimentación</span> revela la respuesta correcta y, si fallas,
                te orienta sobre la sección normativa que debes revisar.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} testType="behavioral" />
          ))}
        </div>
      </main>
    </div>
  )
}
