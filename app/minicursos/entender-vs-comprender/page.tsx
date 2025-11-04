import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Brain, CheckCircle2, BookOpen, Lightbulb } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EntenderVsComprenderPage() {
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
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">
                Diferencias entre Entender y Comprender
              </h1>
              <p className="text-muted-foreground text-lg mt-1">
                Procesos mentales distintos en profundidad y conciencia
              </p>
            </div>
          </div>
        </div>

        {/* 1. Introducción */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              1. Introducción
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <p>
              El propósito de este minicurso es clarificar la diferencia conceptual, lingüística y
              cognitiva entre <strong>entender</strong> y <strong>comprender</strong>, dos verbos que
              suelen usarse como sinónimos, pero que implican procesos mentales distintos en niveles
              de profundidad y conciencia.
            </p>
          </CardContent>
        </Card>

        {/* 2. Definiciones básicas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              2. Definiciones Básicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left p-3 bg-muted font-semibold">Verbo</th>
                    <th className="text-left p-3 bg-muted font-semibold">Definición general</th>
                    <th className="text-left p-3 bg-muted font-semibold">Nivel cognitivo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium text-blue-600">Entender</td>
                    <td className="p-3">Captar o interpretar el significado literal de algo.</td>
                    <td className="p-3">Nivel superficial o funcional</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium text-indigo-600">Comprender</td>
                    <td className="p-3">
                      Asimilar el sentido profundo, integrar e interpretar la información en un
                      contexto.
                    </td>
                    <td className="p-3">Nivel profundo o reflexivo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Alert className="mt-4 border-blue-200 bg-blue-50">
              <AlertDescription className="space-y-2">
                <p className="font-semibold text-blue-900">Ejemplo:</p>
                <ul className="space-y-1 ml-4">
                  <li>
                    <strong>Entender:</strong> "Entiendo que 2+2=4".
                  </li>
                  <li>
                    <strong>Comprender:</strong> "Comprendo por qué 2+2=4, porque conozco el
                    principio matemático que lo sustenta".
                  </li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* 3. Dimensión lingüística */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Dimensión Lingüística</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Entender</strong> se asocia con la decodificación de signos y
                  significados inmediatos.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Comprender</strong> va más allá: implica interpretar intenciones,
                  emociones y contextos.
                </span>
              </li>
            </ul>

            <div className="bg-slate-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="font-semibold mb-2 text-slate-900">Ejemplo lingüístico:</p>
              <ul className="space-y-2 text-slate-700">
                <li>"<em>Entiendo lo que me dices</em>" (he captado las palabras).</li>
                <li>
                  "<em>Comprendo cómo te sientes</em>" (he interpretado el sentido emocional y
                  contextual).
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 4. Dimensión cognitiva */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Dimensión Cognitiva</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left p-3 bg-muted font-semibold">Aspecto</th>
                    <th className="text-left p-3 bg-muted font-semibold">Entender</th>
                    <th className="text-left p-3 bg-muted font-semibold">Comprender</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Procesamiento</td>
                    <td className="p-3">Receptivo</td>
                    <td className="p-3">Integrativo</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Resultado mental</td>
                    <td className="p-3">Información retenida</td>
                    <td className="p-3">Conocimiento significativo</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Implicación emocional</td>
                    <td className="p-3">Baja</td>
                    <td className="p-3">Alta</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Capacidad reflexiva</td>
                    <td className="p-3">Limitada</td>
                    <td className="p-3">Profunda</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Alert className="mt-4 border-indigo-200 bg-indigo-50">
              <AlertDescription>
                <p className="font-semibold text-indigo-900 mb-2">Conclusión:</p>
                <p className="text-indigo-800">
                  Comprender implica construir sentido a partir de lo entendido; no basta con captar
                  datos, hay que relacionarlos con experiencias previas.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* 5. Dimensión pedagógica */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Dimensión Pedagógica</CardTitle>
            <CardDescription>
              En educación, esta distinción es clave para el aprendizaje significativo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Entender:</strong> el estudiante repite o responde correctamente una
                  pregunta factual.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Comprender:</strong> el estudiante puede aplicar, transferir o explicar el
                  conocimiento en nuevas situaciones.
                </span>
              </li>
            </ul>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <p className="font-semibold mb-2 text-amber-900">Ejemplo educativo:</p>
              <ul className="space-y-1 text-amber-800">
                <li>
                  <strong>Entiende</strong> la fórmula del área de un triángulo.
                </li>
                <li>
                  <strong>Comprende</strong> cómo usarla para resolver un problema del mundo real.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 6. Dimensión filosófica */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. Dimensión Filosófica</CardTitle>
            <CardDescription>En filosofía y epistemología</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Entender</strong> se vincula con la <em>razón instrumental</em>: captar
                  cómo funciona algo.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Comprender</strong> se relaciona con la <em>razón hermenéutica</em>:
                  captar el sentido profundo de la realidad o de las acciones humanas.
                </span>
              </li>
            </ul>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
              <p className="font-semibold mb-2 text-purple-900">Ejemplo:</p>
              <ul className="space-y-1 text-purple-800">
                <li>"<em>Entender el lenguaje</em>" es conocer su estructura gramatical;</li>
                <li>
                  "<em>Comprender el lenguaje</em>" es captar su poder simbólico y social.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 7. Dimensión psicológica */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. Dimensión Psicológica</CardTitle>
            <CardDescription>Desde la psicología cognitiva</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Entender</strong> implica procesos mentales de tipo atencional y
                  perceptivo.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Comprender</strong> involucra procesos inferenciales, emocionales y
                  metacognitivos (pensar sobre lo que se piensa).
                </span>
              </li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="font-semibold mb-2 text-green-900">Ejemplo psicológico:</p>
              <p className="text-green-800">
                Una persona puede <strong>entender</strong> una instrucción ("No corras"), pero{" "}
                <strong>comprender</strong> implica interiorizar el motivo ("podrías caerte y
                lastimarte").
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 8. Aplicaciones prácticas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>8. Aplicaciones Prácticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left p-3 bg-muted font-semibold">Contexto</th>
                    <th className="text-left p-3 bg-muted font-semibold">Entender</th>
                    <th className="text-left p-3 bg-muted font-semibold">Comprender</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Comunicación interpersonal</td>
                    <td className="p-3">Escuchar lo que el otro dice</td>
                    <td className="p-3">Escuchar y captar la emoción detrás del mensaje</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Lectura</td>
                    <td className="p-3">Decodificar palabras</td>
                    <td className="p-3">Interpretar ideas, tono, intención del autor</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Educación</td>
                    <td className="p-3">Reproducir información</td>
                    <td className="p-3">Construir conocimiento y aplicarlo</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Trabajo</td>
                    <td className="p-3">Seguir instrucciones</td>
                    <td className="p-3">Anticiparse, analizar causas y consecuencias</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 9. Ejercicios de autoevaluación */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>9. Ejercicios de Autoevaluación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">Ejercicio 1: Diferencia</p>
                <p className="text-blue-800 mb-2">
                  Explica con tus palabras la diferencia entre entender y comprender.
                </p>
                <p className="text-sm text-blue-700 italic">
                  Ejemplo de respuesta: Entender es captar el significado literal; comprender es
                  interiorizar y relacionar con la experiencia.
                </p>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="font-semibold text-indigo-900 mb-2">Ejercicio 2: Práctica</p>
                <p className="text-indigo-800">
                  Piensa en una situación donde alguien "te entendió pero no te comprendió". ¿Qué
                  cambió entre una y otra?
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="font-semibold text-purple-900 mb-2">Ejercicio 3: Lectura crítica</p>
                <p className="text-purple-800">
                  Lee un texto breve (por ejemplo, un poema o una noticia) y distingue qué parte
                  entiendes y qué parte comprendes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 10. Conclusión */}
        <Card className="mb-6 border-2 border-primary">
          <CardHeader>
            <CardTitle>10. Conclusión General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="font-medium">
                  La comprensión es una evolución del entendimiento.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="font-medium">
                  Se puede entender sin comprender, pero no se puede comprender sin haber entendido
                  primero.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="font-medium">
                  El verdadero aprendizaje, la empatía y la comunicación efectiva requieren
                  comprensión profunda, que es la capacidad de conectar ideas, emociones y contextos
                  para generar significado.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button asChild size="lg">
            <Link href="/minicursos">Volver a Minicursos</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
