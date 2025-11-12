import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BookOpenCheck, InfoIcon } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { ContratacionTest } from "@/components/contratacion-test"
import { NormatividadTest } from "@/components/normatividad-test"
import { ProcesoDisciplinarioTest } from "@/components/proceso-disciplinario-test"
import { MipgTest } from "@/components/mipg-test"
import { ServicioUsuarioTest } from "@/components/servicio-usuario-test"
import { RazonamientoTest } from "@/components/razonamiento-test"
import { JuicioSituacionalTest } from "@/components/juicio-situacional-test"
import { FormulacionTest } from "@/components/formulacion-test"
import { FormulacionMgaTest } from "@/components/formulacion-mga-test"
import { GestionProyectosTest } from "@/components/gestion-proyectos-test"
import { InfraestructuraTest } from "@/components/infraestructura-test"
import { ObrasPublicasTest } from "@/components/obras-publicas-test"
import { PqrsdTest } from "@/components/pqrsd-test"
import { PlanesMejoramientoTest } from "@/components/planes-mejoramiento-test"
import { BloqueConstitucionalidadTest } from "@/components/bloque-constitucionalidad-test"
import { GestionPresupuestalTest } from "@/components/gestion-presupuestal-test"
import { RazonamientoLogicoTest } from "@/components/razonamiento-logico-test"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BehavioralQuiz } from "@/components/behavioral-quiz"
import { behavioralSubjects } from "@/lib/behavioral-competencies"

interface TestPageProps {
  params: Promise<{
    type: string
    subject: string
  }>
}

export default async function TestPage({ params }: TestPageProps) {
  const { type, subject } = await params

  if (!type || !subject) {
    notFound()
  }

  if (type === "behavioral") {
    const behavioralSubject = behavioralSubjects.find((item) => item.id === subject)

    if (!behavioralSubject) {
      notFound()
    }

    const totalQuestions = behavioralSubject.questions.length
    const totalScore = behavioralSubject.questions.reduce((acc, question) => acc + question.score, 0)

    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-5xl px-4 py-8">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link href="/tests/behavioral">
                <ArrowLeft className="h-4 w-4" />
                Volver a Prueba Comportamental
              </Link>
            </Button>
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground">
              <BookOpenCheck className="h-3.5 w-3.5 text-primary" />
              {totalQuestions} preguntas · {totalScore} puntos
            </div>
          </div>

          <BehavioralQuiz subject={behavioralSubject} />
        </main>
      </div>
    )
  }

  const subjectTitle = subject
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  if (type === "specific" && subject === "contratacion") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Contratación Pública</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación sobre procesos y normativa de contratación estatal
            </p>
          </div>

          <ContratacionTest />
        </main>
      </div>
    )
  }

  if (type === "general" && subject === "gestion-publica") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Gestión Pública Territorial</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación sobre normativa, principios y procedimiento disciplinario aplicable a servidores públicos en entidades territoriales
            </p>
          </div>

          <ProcesoDisciplinarioTest />
        </main>
      </div>
    )
  }

  if (type === "general" && subject === "normatividad") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Normatividad de las Entidades Territoriales</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación sobre principios y procedimientos del derecho administrativo aplicable a entidades territoriales
            </p>
          </div>

          <NormatividadTest />
        </main>
      </div>
    )
  }

  if (type === "general" && subject === "bloque-constitucionalidad") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Bloque de Constitucionalidad</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación sobre fuentes, clasificación, efectos y casos relevantes del bloque de constitucionalidad en Colombia
            </p>
          </div>

          <BloqueConstitucionalidadTest />
        </main>
      </div>
    )
  }

  if (type === "general" && subject === "mipg") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Modelo Integrado de Planeación y Gestión</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación sobre fundamentos, principios, dimensiones, políticas y medición del MIPG
            </p>
          </div>

          <MipgTest />
        </main>
      </div>
    )
  }

  if (type === "general" && subject === "razonamiento") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Competencia Verbal</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación sobre comprensión lectora, análisis de gráficos, estrategias de lectura, idea central, ordenamiento, sinonimia, antonimia, analogías, completación y conectores
            </p>
          </div>

          <RazonamientoTest />
        </main>
      </div>
    )
  }

  if (type === "general" && subject === "razonamiento-logico") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Razonamiento Lógico Aplicado</h1>
            <p className="text-muted-foreground text-balance">
              Deducción, inducción, ejes analítico–categorial y lógica proposicional con casos de PQRSD, salud y emergencias
            </p>
          </div>

          <RazonamientoLogicoTest />
        </main>
      </div>
    )
  }

  if (type === "specific" && subject === "servicio-usuario") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Servicio y Atención al Ciudadano</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación sobre protocolos de atención al ciudadano y aplicación de la NTC 6047
            </p>
          </div>

          <ServicioUsuarioTest />
        </main>
      </div>
    )
  }

  if (type === "specific" && subject === "juicio-situacional") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Juicio Situacional</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación de la capacidad para tomar decisiones efectivas ante situaciones laborales complejas
            </p>
          </div>

          <JuicioSituacionalTest />
        </main>
      </div>
    )
  }

  if (type === "specific" && subject === "formulacion") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Formulación de Planes, Programas y Proyectos</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación sobre MGA, ciclo de proyectos, marco lógico y presupuestación
            </p>
          </div>

          <FormulacionTest />
        </main>
      </div>
    )
  }

  if (type === "specific" && subject === "formulacion-mga") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Formulación MGA – Nicolás Vargas</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación situacional sobre la Metodología General Ajustada y buenas prácticas de formulación
            </p>
          </div>

          <FormulacionMgaTest />
        </main>
      </div>
    )
  }

  if (type === "specific" && subject === "gestion-proyectos") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Gestión de Proyectos</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación sobre ejecución, indicadores, seguimiento y evaluación de proyectos
            </p>
          </div>

          <GestionProyectosTest />
        </main>
      </div>
    )
  }

  if (type === "specific" && subject === "infraestructura") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Infraestructura Física</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación sobre NSR-10, normas INVIAS, diseño vial, accesibilidad y presupuestos de obra
            </p>
          </div>

          <InfraestructuraTest />
        </main>
      </div>
    )
  }

  if (type === "specific" && subject === "obras-publicas") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Obras Públicas e Hidráulica</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación sobre procesos constructivos, mantenimiento vial, hidráulica y seguridad en obra
            </p>
          </div>

          <ObrasPublicasTest />
        </main>
      </div>
    )
  }

  if (type === "specific" && subject === "atencion-pqrs") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Atención de Solicitudes PQRSD</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación sobre Ley 1755/2015, Ley 1712/2014, transparencia y gestión documental
            </p>
          </div>

          <PqrsdTest />
        </main>
      </div>
    )
  }

  if (type === "specific" && subject === "planes-mejoramiento") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Planes de Mejoramiento</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación sobre control interno, auditoría, planes de mejoramiento y MIPG
            </p>
          </div>

          <PlanesMejoramientoTest />
        </main>
      </div>
    )
  }

  if (type === "specific" && subject === "gestion-presupuestal") {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
            <Link href={`/tests/${type}`}>
              <ArrowLeft className="h-4 w-4" />
              Volver a la categoría
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance md:text-4xl">Gestión Presupuestal y Tesorería</h1>
            <p className="text-muted-foreground text-balance">
              Evaluación situacional sobre ingresos, CDP, RP, obligaciones y pago de la ejecución presupuestal
            </p>
          </div>

          <GestionPresupuestalTest />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
          <Link href={`/tests/${type}`}>
            <ArrowLeft className="h-4 w-4" />
            Volver a la categoría
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance md:text-4xl">{subjectTitle}</h1>
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
              <h3 className="text-lg font-semibold">Pregunta 1</h3>
              <p className="leading-relaxed text-muted-foreground">
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

            <div className="border-border pt-6">
              <Button className="w-full sm:w-auto">Enviar Respuestas</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
