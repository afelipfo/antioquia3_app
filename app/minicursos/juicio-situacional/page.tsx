import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Scale,
  Target,
  Users,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Trophy,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function JuicioSituacionalPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Button asChild variant="ghost" size="sm" className="mb-6 gap-2">
          <Link href="/minicursos">
            <ArrowLeft className="h-4 w-4" />
            Volver a Minicursos
          </Link>
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">
                Metodología del Juicio Situacional
              </h1>
              <p className="text-muted-foreground text-lg mt-1">
                Técnica de evaluación para situaciones reales del entorno laboral
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Autor base: James León Marín Betancur — Sociólogo UNAULA, Especialista UPB en Gerencia
            Pública y de Proyectos
          </p>
        </div>

        {/* Módulo 1: Concepto y Propósito */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Módulo 1: Concepto y Propósito
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Definición</h3>
              <p className="text-muted-foreground">
                El juicio situacional es una técnica de evaluación que mide cómo un candidato
                reacciona ante situaciones reales o simuladas relacionadas con el entorno laboral.
                Se centra en decisiones, resolución de problemas y comportamientos éticos y
                profesionales ante dilemas típicos del cargo.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Propósito</h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Evaluar competencias aplicadas.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Observar el comportamiento ante retos reales.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Analizar la capacidad para priorizar y actuar con criterio.</span>
                </li>
              </ul>
            </div>

            <Alert className="border-purple-200 bg-purple-50">
              <AlertDescription className="text-purple-900">
                <strong>Aplicación:</strong> Utilizada en concursos de la CNSC y en procesos de
                selección pública y privada.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Módulo 2: Características Principales */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Módulo 2: Características Principales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Enfoque en competencias</h3>
              <p className="text-muted-foreground mb-2">
                Evalúa dimensiones fundamentales del desempeño laboral:
              </p>
              <ul className="grid md:grid-cols-2 gap-2">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Toma de decisiones</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Resolución de problemas</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Pensamiento crítico</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Habilidades interpersonales</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Capacidad de análisis</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Escenarios realistas</h3>
              <p className="text-muted-foreground">
                Los casos reflejan desafíos comunes de la gestión pública o del trabajo en equipo,
                simulando decisiones laborales auténticas.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Respuestas abiertas o estructuradas</h3>
              <p className="text-muted-foreground mb-2">Pueden ser:</p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Escritas</strong> (en pruebas tipo CNSC).
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Verbales</strong> (en entrevistas o simulaciones).
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Módulo 3: Aplicación en Concursos CNSC */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Módulo 3: Aplicación en Concursos CNSC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              El juicio situacional se usa en varias fases del proceso de selección:
            </p>

            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Pruebas escritas</h4>
                <p className="text-blue-800">
                  Se presentan casos con opciones múltiples donde el aspirante debe escoger la mejor
                  alternativa.
                </p>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-2">Entrevistas</h4>
                <p className="text-indigo-800">
                  Se analiza la forma en que el candidato aborda un problema planteado.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">Ejercicios prácticos</h4>
                <p className="text-purple-800">
                  Simulaciones que permiten observar el desempeño en tiempo real.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Módulo 4: Ejemplo Práctico */}
        <Card className="mb-6 border-2 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Módulo 4: Ejemplo Práctico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2">Situación:</h4>
              <p className="text-amber-800">
                Eres líder de un equipo y uno de tus colaboradores no cumple con sus tareas,
                afectando el proyecto.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Opciones:</h4>
              <ul className="space-y-2">
                <li className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <strong className="text-green-900">A)</strong>{" "}
                  <span className="text-green-800">
                    Lo llamas a una reunión privada para indagar causas.
                  </span>
                </li>
                <li className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>B)</strong> Lo reportas al jefe.
                </li>
                <li className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>C)</strong> Le asignas menos tareas.
                </li>
                <li className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong>D)</strong> Ignoras el problema.
                </li>
              </ul>
            </div>

            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-900">
                <strong>Evaluación:</strong> La respuesta A refleja liderazgo, empatía y gestión del
                conflicto. Este tipo de ejercicio permite medir madurez emocional y toma de
                decisiones éticas.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Módulo 5: Ventajas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Módulo 5: Ventajas del Juicio Situacional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left p-3 bg-muted font-semibold">Ventaja</th>
                    <th className="text-left p-3 bg-muted font-semibold">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Predictivo del desempeño</td>
                    <td className="p-3">
                      Permite anticipar el comportamiento del candidato en el trabajo real.
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Objetividad</td>
                    <td className="p-3">Disminuye sesgos personales en la evaluación.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Enfoque práctico</td>
                    <td className="p-3">
                      Mide competencias blandas difíciles de observar en pruebas de conocimiento.
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Adaptabilidad</td>
                    <td className="p-3">Aplica a diversos cargos y niveles jerárquicos.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Módulo 6: Recomendaciones */}
        <Card className="mb-6 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              Módulo 6: Recomendaciones para los Aspirantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-900 mb-1">1. Analiza la situación</h4>
                <p className="text-blue-800 text-sm">
                  Lee con atención el contexto del caso antes de responder.
                </p>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-900 mb-1">
                  2. Identifica el problema principal
                </h4>
                <p className="text-indigo-800 text-sm">
                  Distingue la raíz del conflicto, no solo los síntomas.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-900 mb-1">3. Evalúa las opciones</h4>
                <p className="text-purple-800 text-sm">
                  Piensa en las consecuencias éticas y funcionales de cada decisión.
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-900 mb-1">4. Mantén un enfoque ético</h4>
                <p className="text-green-800 text-sm">
                  Responde de acuerdo con los valores del servicio público (honestidad, respeto,
                  responsabilidad).
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <h4 className="font-semibold text-amber-900 mb-1">5. Practica previamente</h4>
                <p className="text-amber-800 text-sm">
                  Familiarízate con preguntas situacionales y simula decisiones razonadas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Módulo 7: Aplicaciones y Usos */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Módulo 7: Aplicaciones y Usos en Formación Laboral</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">El juicio situacional es aplicable en:</p>

            <ul className="space-y-2">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Capacitación de líderes y servidores públicos.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  Evaluación de competencias blandas (comunicación, liderazgo, trabajo en equipo).
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Procesos de promoción interna y formación organizacional.</span>
              </li>
            </ul>

            <Alert className="border-purple-200 bg-purple-50">
              <AlertDescription className="text-purple-900">
                <strong>Objetivo:</strong> Formar funcionarios con criterio ético, análisis reflexivo
                y orientación a resultados, no solo con conocimiento técnico.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Conclusión */}
        <Card className="mb-6 border-2 border-primary">
          <CardHeader>
            <CardTitle>Conclusión General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="font-medium text-lg">
              La metodología del juicio situacional combina teoría y práctica para evaluar el{" "}
              <span className="text-primary">saber hacer</span> y el{" "}
              <span className="text-primary">saber ser</span> del aspirante.
            </p>

            <p className="text-muted-foreground">
              Es un instrumento clave en la meritocracia pública, porque mide lo que realmente
              define la idoneidad:{" "}
              <strong>cómo se actúa ante un problema real</strong>.
            </p>

            <Alert className="border-primary/50">
              <AlertDescription>
                <strong>Prepararte implica desarrollar:</strong> juicio ético, pensamiento crítico y
                liderazgo en acción.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4 mt-8">
          <Button asChild variant="outline">
            <Link href="/tests/specific/juicio-situacional">Ver Test de Juicio Situacional</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/minicursos">Volver a Minicursos</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
