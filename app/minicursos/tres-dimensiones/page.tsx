import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Target, Heart, BookOpen, Wrench, Lightbulb, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TresDimensionesPage() {
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

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">
                Las Tres Dimensiones — SER, SABER y HACER
              </h1>
              <p className="text-muted-foreground text-base mt-1">
                Autor: James León Marín Betancur
              </p>
            </div>
          </div>
        </div>

        {/* Propósito */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <Target className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-900">
            <strong>Propósito del curso:</strong> Comprender y aplicar las tres dimensiones de evaluación del modelo de competencias de la CNSC: SER, SABER y HACER, que garantizan la valoración integral de los aspirantes en sus aspectos comportamentales, cognitivos y prácticos.
          </AlertDescription>
        </Alert>

        {/* Módulo 1: Dimensión SER */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-600" />
              Módulo 1: Dimensión SER
            </CardTitle>
            <p className="text-sm text-muted-foreground">(Competencias Personales y Comportamentales)</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Evalúa los valores, actitudes y principios éticos que definen la conducta del servidor público. Se centra en cómo actúa la persona ante dilemas éticos, retos institucionales y trabajo colaborativo.
            </p>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Competencias Clave</h4>
              <div className="grid gap-3">
                <div className="flex gap-3 p-3 bg-pink-50 rounded-lg border border-pink-100">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-pink-900">Aprendizaje continuo</p>
                    <p className="text-sm text-pink-800">Disposición a mejorar procesos y adquirir nuevos conocimientos.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-pink-50 rounded-lg border border-pink-100">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-pink-900">Orientación a resultados</p>
                    <p className="text-sm text-pink-800">Cumplir metas con eficiencia y eficacia.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-pink-50 rounded-lg border border-pink-100">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-pink-900">Orientación al usuario y al ciudadano</p>
                    <p className="text-sm text-pink-800">Servicio con enfoque en la satisfacción social.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-pink-50 rounded-lg border border-pink-100">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-pink-900">Compromiso con la organización</p>
                    <p className="text-sm text-pink-800">Alineación con misión y valores institucionales.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-pink-50 rounded-lg border border-pink-100">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-pink-900">Trabajo en equipo</p>
                    <p className="text-sm text-pink-800">Cooperación y comunicación para metas comunes.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-pink-50 rounded-lg border border-pink-100">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-pink-900">Adaptación al cambio</p>
                    <p className="text-sm text-pink-800">Flexibilidad y resiliencia ante nuevas circunstancias.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Estrategias de Preparación</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-pink-600">•</span>
                  <span>Realizar autoevaluaciones de competencias blandas</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-600">•</span>
                  <span>Participar en simulacros de pruebas comportamentales</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-600">•</span>
                  <span>Reflexionar sobre dilemas éticos y escenarios reales de decisión pública</span>
                </li>
              </ul>
            </div>

            <Alert className="border-pink-200 bg-pink-50">
              <Lightbulb className="h-4 w-4 text-pink-600" />
              <AlertDescription className="text-pink-900">
                <strong>Ejemplo práctico:</strong> Un candidato debe decidir entre seguir una orden jerárquica o preservar la ética pública. La respuesta correcta demuestra integridad y respeto por la norma.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Módulo 2: Dimensión SABER */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              Módulo 2: Dimensión SABER
            </CardTitle>
            <p className="text-sm text-muted-foreground">(Conocimientos Técnicos y Normativos)</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Evalúa el conocimiento conceptual y legal necesario para desempeñar un cargo público. Esta dimensión verifica qué tanto sabe el aspirante sobre las leyes, reglamentos y procedimientos administrativos que sustentan su labor.
            </p>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Ejes Temáticos Principales</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-blue-900"><strong>Carrera Administrativa y Empleo Público:</strong> Ley 909 de 2004 y Decreto 1083 de 2015</span>
                </div>
                <div className="flex gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-blue-900"><strong>Código Único Disciplinario:</strong> Ley 1952 de 2019</span>
                </div>
                <div className="flex gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-blue-900"><strong>Contratación Estatal:</strong> Ley 80 de 1993, Ley 1150 de 2007 y Decreto 1082 de 2015</span>
                </div>
                <div className="flex gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-blue-900"><strong>Derecho Administrativo</strong> y Principios de la Función Pública</span>
                </div>
                <div className="flex gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-blue-900"><strong>Seguridad y Salud en el Trabajo (SG-SST)</strong></span>
                </div>
                <div className="flex gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-blue-900"><strong>Metodología General Ajustada (MGA):</strong> formulación y evaluación de proyectos</span>
                </div>
                <div className="flex gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-blue-900"><strong>Gestión del Talento Humano:</strong> desarrollo de planes, nómina y bienestar institucional</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Estrategias de Preparación</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Lectura sistemática y análisis de normatividad vigente</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Resolución de casos prácticos basados en leyes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Creación de mapas conceptuales o esquemas de memoria</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Ejecución de simulacros tipo CNSC para evaluar dominio temático</span>
                </li>
              </ul>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <Lightbulb className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-900">
                <strong>Ejemplo:</strong> Caso sobre aplicación de la Ley 909: identificar los principios de mérito y transparencia en un proceso de selección pública.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Módulo 3: Dimensión HACER */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-6 w-6 text-orange-600" />
              Módulo 3: Dimensión HACER
            </CardTitle>
            <p className="text-sm text-muted-foreground">(Habilidades Prácticas y Aplicación del Conocimiento)</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Esta dimensión mide cómo el aspirante aplica lo que sabe en situaciones reales o simuladas, demostrando su capacidad de análisis, juicio y acción. Se evalúa a través de pruebas situacionales y ejercicios de juicio complejo.
            </p>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Ejemplos de Evaluación</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-orange-600">•</span>
                  <span>Resolver casos sobre contratación pública con enfoque ético y normativo</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600">•</span>
                  <span>Aplicar normas del Código Disciplinario a contextos laborales</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600">•</span>
                  <span>Diseñar planes de trabajo y gestión institucional</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600">•</span>
                  <span>Evaluar riesgos laborales y proponer estrategias en SG-SST</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Estrategias de Preparación</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-orange-600">•</span>
                  <span>Analizar casos reales del sector público</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600">•</span>
                  <span>Realizar simulaciones de gestión administrativa</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600">•</span>
                  <span>Practicar juicios situacionales similares a los de la CNSC</span>
                </li>
              </ul>
            </div>

            <Alert className="border-orange-200 bg-orange-50">
              <Lightbulb className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-900">
                <strong>Ejemplo:</strong> Simulación: "Una contratista incumple los plazos de entrega". El candidato debe decidir entre sancionar, renegociar o apoyar correctivos, demostrando análisis integral y ética.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Módulo 4: Recomendaciones Finales */}
        <Card className="mb-6 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-green-600" />
              Módulo 4: Recomendaciones Finales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Integra teoría y práctica</p>
                  <p className="text-sm text-green-800">Alterna el estudio normativo con resolución de casos.</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Autoevalúa constantemente</p>
                  <p className="text-sm text-green-800">Identifica tus puntos débiles en cada dimensión.</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Participa en talleres CNSC</p>
                  <p className="text-sm text-green-800">Práctica guiada mejora la velocidad y precisión.</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Actualízate</p>
                  <p className="text-sm text-green-800">Sigue las reformas legales y jurisprudenciales recientes.</p>
                </div>
              </div>
            </div>

            <Alert className="border-green-300 bg-green-100">
              <Target className="h-4 w-4 text-green-700" />
              <AlertDescription className="text-green-900">
                <strong>Beneficio esperado:</strong> Una preparación equilibrada en Ser, Saber y Hacer multiplica tus posibilidades de éxito y consolida un perfil ético, técnico y operativo adecuado para el servicio público colombiano.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Conclusión */}
        <Card className="border-2 border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">Conclusión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              El modelo <strong>SER – SABER – HACER</strong> promueve una visión integral del servidor público:
            </p>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <Heart className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground"><strong className="text-foreground">SER:</strong> define su ética y compromiso social.</p>
              </div>
              <div className="flex gap-3 items-start">
                <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground"><strong className="text-foreground">SABER:</strong> respalda su conocimiento normativo y técnico.</p>
              </div>
              <div className="flex gap-3 items-start">
                <Wrench className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground"><strong className="text-foreground">HACER:</strong> demuestra su capacidad de aplicar, liderar y resolver.</p>
              </div>
            </div>
            <Alert className="border-primary/30 bg-primary/10 mt-6">
              <AlertDescription className="text-primary italic text-center">
                "Un candidato exitoso no solo debe saber, sino también ser y hacer con sentido ético y propósito público."<br />
                <span className="text-sm font-semibold">— James León Marín Betancur</span>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
