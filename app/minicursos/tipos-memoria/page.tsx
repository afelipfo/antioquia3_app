import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Brain, Target, Lightbulb, CheckCircle2, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TiposMemoriaPage() {
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
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">
                Tipos de Memoria para Adquirir Conocimientos
              </h1>
              <p className="text-muted-foreground text-base mt-1">
                Autor: James León Marín Betancur
              </p>
            </div>
          </div>
        </div>

        {/* Objetivo */}
        <Alert className="mb-6 border-indigo-200 bg-indigo-50">
          <Target className="h-5 w-5 text-indigo-600" />
          <AlertDescription className="text-indigo-900">
            <strong>Objetivo general:</strong> Comprender los tipos de memoria que intervienen en la adquisición del conocimiento y su aplicación práctica en los procesos de aprendizaje, toma de decisiones y desempeño en pruebas tipo juicio situacional de la CNSC.
          </AlertDescription>
        </Alert>

        {/* Módulo 1: Concepto */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-indigo-600" />
              Módulo 1: Concepto y Función de la Memoria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              La memoria es la capacidad del cerebro para <strong>codificar, almacenar y recuperar información</strong>. Su eficiencia determina la calidad del aprendizaje y la resolución de problemas.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Existen diferentes tipos de memoria, cada una con un papel específico en la adquisición del conocimiento.
            </p>
          </CardContent>
        </Card>

        {/* Módulo 2: Tipos de Memoria */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-purple-600" />
              Módulo 2: Tipos de Memoria Cognitiva
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 1. Memoria sensorial */}
            <div className="border-l-4 border-purple-500 pl-4 space-y-3">
              <h4 className="font-semibold text-lg text-foreground">1. Memoria Sensorial</h4>
              <div className="space-y-2">
                <p className="text-sm"><strong className="text-purple-700">Descripción:</strong> <span className="text-muted-foreground">Retiene información sensorial (visual, auditiva, táctil) por menos de un segundo.</span></p>
                <p className="text-sm"><strong className="text-purple-700">Función:</strong> <span className="text-muted-foreground">Actúa como filtro inicial, decidiendo qué información pasa a la memoria a corto plazo.</span></p>
                <p className="text-sm"><strong className="text-purple-700">Ejemplo:</strong> <span className="text-muted-foreground">Escuchar un sonido y recordarlo brevemente.</span></p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                <p className="text-sm font-medium text-purple-900 mb-2">Estrategias:</p>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Mindfulness: observar detalles sensoriales</li>
                  <li>• Ejercicios de observación: mirar una imagen y describirla</li>
                  <li>• Escucha activa: reconocer sonidos y tonos</li>
                </ul>
              </div>
            </div>

            {/* 2. Memoria a corto plazo */}
            <div className="border-l-4 border-blue-500 pl-4 space-y-3">
              <h4 className="font-semibold text-lg text-foreground">2. Memoria a Corto Plazo (MCP)</h4>
              <div className="space-y-2">
                <p className="text-sm"><strong className="text-blue-700">Descripción:</strong> <span className="text-muted-foreground">Retiene información por 20–30 segundos.</span></p>
                <p className="text-sm"><strong className="text-blue-700">Función:</strong> <span className="text-muted-foreground">Mantiene y manipula información temporalmente.</span></p>
                <p className="text-sm"><strong className="text-blue-700">Ejemplo:</strong> <span className="text-muted-foreground">Recordar un número telefónico antes de anotarlo.</span></p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-sm font-medium text-blue-900 mb-2">Estrategias:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Chunking: agrupar datos ("123-456-789")</li>
                  <li>• Repetición activa</li>
                  <li>• Listas visuales</li>
                </ul>
              </div>
            </div>

            {/* 3. Memoria de trabajo */}
            <div className="border-l-4 border-cyan-500 pl-4 space-y-3">
              <h4 className="font-semibold text-lg text-foreground">3. Memoria de Trabajo</h4>
              <div className="space-y-2">
                <p className="text-sm"><strong className="text-cyan-700">Descripción:</strong> <span className="text-muted-foreground">Extiende la MCP, permitiendo manipular información en uso.</span></p>
                <p className="text-sm"><strong className="text-cyan-700">Función:</strong> <span className="text-muted-foreground">Vital para razonamiento, cálculo y comprensión.</span></p>
                <p className="text-sm"><strong className="text-cyan-700">Ejemplo:</strong> <span className="text-muted-foreground">Resolver mentalmente un problema matemático.</span></p>
              </div>
              <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-100">
                <p className="text-sm font-medium text-cyan-900 mb-2">Estrategias:</p>
                <ul className="text-sm text-cyan-800 space-y-1">
                  <li>• Resolución de problemas sin herramientas</li>
                  <li>• Tareas duales</li>
                  <li>• Espaciado del aprendizaje</li>
                </ul>
              </div>
            </div>

            {/* 4. Memoria a largo plazo */}
            <div className="border-l-4 border-green-500 pl-4 space-y-3">
              <h4 className="font-semibold text-lg text-foreground">4. Memoria a Largo Plazo (MLP)</h4>
              <div className="space-y-2">
                <p className="text-sm"><strong className="text-green-700">Descripción:</strong> <span className="text-muted-foreground">Almacena información desde minutos hasta toda la vida.</span></p>
                <div className="ml-4 space-y-2">
                  <p className="text-sm"><strong className="text-green-700">Subtipos:</strong></p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• <strong>Declarativa (explícita):</strong> conocimiento consciente</p>
                    <p className="ml-4">- Episódica: experiencias personales</p>
                    <p className="ml-4">- Semántica: hechos y conceptos</p>
                    <p>• <strong>No declarativa (implícita):</strong> hábitos y habilidades motoras</p>
                    <p className="ml-4">- Procedimental: cómo realizar tareas</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <p className="text-sm font-medium text-green-900 mb-2">Estrategias:</p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Repaso espaciado</li>
                  <li>• Método de loci</li>
                  <li>• Mapas mentales</li>
                </ul>
              </div>
            </div>

            {/* 5. Memoria asociativa */}
            <div className="border-l-4 border-amber-500 pl-4 space-y-3">
              <h4 className="font-semibold text-lg text-foreground">5. Memoria Asociativa</h4>
              <div className="space-y-2">
                <p className="text-sm"><strong className="text-amber-700">Descripción:</strong> <span className="text-muted-foreground">Conecta ideas o estímulos.</span></p>
                <p className="text-sm"><strong className="text-amber-700">Función:</strong> <span className="text-muted-foreground">Facilita el aprendizaje conectando nueva información con conocimientos previos.</span></p>
                <p className="text-sm"><strong className="text-amber-700">Ejemplo:</strong> <span className="text-muted-foreground">Asociar un aroma con una experiencia pasada.</span></p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                <p className="text-sm font-medium text-amber-900 mb-2">Estrategias:</p>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Analogías</li>
                  <li>• Relatos y metáforas</li>
                  <li>• Juegos de asociación</li>
                </ul>
              </div>
            </div>

            {/* 6. Memoria emocional */}
            <div className="border-l-4 border-pink-500 pl-4 space-y-3">
              <h4 className="font-semibold text-lg text-foreground">6. Memoria Emocional</h4>
              <div className="space-y-2">
                <p className="text-sm"><strong className="text-pink-700">Descripción:</strong> <span className="text-muted-foreground">Vincula emociones con experiencias.</span></p>
                <p className="text-sm"><strong className="text-pink-700">Función:</strong> <span className="text-muted-foreground">Refuerza recuerdos de alto impacto emocional.</span></p>
                <p className="text-sm"><strong className="text-pink-700">Ejemplo:</strong> <span className="text-muted-foreground">Recordar un evento peligroso o emotivo.</span></p>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg border border-pink-100">
                <p className="text-sm font-medium text-pink-900 mb-2">Estrategias:</p>
                <ul className="text-sm text-pink-800 space-y-1">
                  <li>• Relacionar conceptos con emociones</li>
                  <li>• Usar música o aromas al estudiar</li>
                  <li>• Reflexionar sobre implicaciones personales</li>
                </ul>
              </div>
            </div>

            {/* 7. Memoria explícita e implícita */}
            <div className="border-l-4 border-violet-500 pl-4 space-y-3">
              <h4 className="font-semibold text-lg text-foreground">7. Memoria Explícita e Implícita</h4>
              <div className="space-y-2">
                <p className="text-sm"><strong className="text-violet-700">Explícita:</strong> <span className="text-muted-foreground">Requiere esfuerzo consciente para recordar (fechas, leyes).</span></p>
                <p className="text-sm"><strong className="text-violet-700">Implícita:</strong> <span className="text-muted-foreground">Inconsciente, automática (hábitos, reflejos).</span></p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-violet-900">Ejemplos:</p>
                <p className="text-sm text-muted-foreground">• Explícita: recordar un artículo de ley</p>
                <p className="text-sm text-muted-foreground">• Implícita: reconocer una melodía sin saber de dónde</p>
              </div>
              <div className="bg-violet-50 p-3 rounded-lg border border-violet-100">
                <p className="text-sm font-medium text-violet-900 mb-2">Estrategias:</p>
                <ul className="text-sm text-violet-800 space-y-1">
                  <li>• Explícita: resúmenes, pruebas frecuentes</li>
                  <li>• Implícita: simulaciones y práctica repetitiva</li>
                </ul>
              </div>
            </div>

            {/* 8. Memoria reconstructiva */}
            <div className="border-l-4 border-rose-500 pl-4 space-y-3">
              <h4 className="font-semibold text-lg text-foreground">8. Memoria Reconstructiva</h4>
              <div className="space-y-2">
                <p className="text-sm"><strong className="text-rose-700">Descripción:</strong> <span className="text-muted-foreground">Reconstruye recuerdos basados en fragmentos previos.</span></p>
                <p className="text-sm"><strong className="text-rose-700">Función:</strong> <span className="text-muted-foreground">Rellena vacíos de información, pero puede distorsionar.</span></p>
                <p className="text-sm"><strong className="text-rose-700">Ejemplo:</strong> <span className="text-muted-foreground">Recontar una conversación mezclando hechos y suposiciones.</span></p>
              </div>
              <div className="bg-rose-50 p-3 rounded-lg border border-rose-100">
                <p className="text-sm font-medium text-rose-900 mb-2">Estrategias:</p>
                <ul className="text-sm text-rose-800 space-y-1">
                  <li>• Narrar historias</li>
                  <li>• Comparar recuerdos con otros</li>
                  <li>• Revisiones periódicas</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Módulo 3: Aplicación en CNSC */}
        <Card className="mb-6 border-2 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-indigo-600" />
              Módulo 3: Aplicación en Procesos CNSC
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Las pruebas de juicio situacional de la CNSC utilizan varios tipos de memoria para medir tanto competencias cognitivas como comportamentales.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left p-3 bg-indigo-50 font-semibold text-indigo-900">Tipo de memoria</th>
                    <th className="text-left p-3 bg-indigo-50 font-semibold text-indigo-900">Uso en CNSC</th>
                    <th className="text-left p-3 bg-indigo-50 font-semibold text-indigo-900">Ejemplo de evaluación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Asociativa</td>
                    <td className="p-3 text-muted-foreground">Relacionar contextos con normas o principios</td>
                    <td className="p-3 text-muted-foreground">Identificar la respuesta legal a un conflicto laboral</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="p-3 font-medium">Semántica</td>
                    <td className="p-3 text-muted-foreground">Recordar conceptos y definiciones legales</td>
                    <td className="p-3 text-muted-foreground">Preguntas sobre Ley 909 o Decreto 1083</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">De trabajo</td>
                    <td className="p-3 text-muted-foreground">Analizar múltiples variables bajo presión</td>
                    <td className="p-3 text-muted-foreground">Resolver un dilema ético en poco tiempo</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="p-3 font-medium">Reconstructiva</td>
                    <td className="p-3 text-muted-foreground">Inferir soluciones a partir de conocimiento previo</td>
                    <td className="p-3 text-muted-foreground">Escenarios de evaluación del desempeño</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Emocional</td>
                    <td className="p-3 text-muted-foreground">Considerar factores humanos y sociales</td>
                    <td className="p-3 text-muted-foreground">Resolver casos de empatía y liderazgo</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="p-3 font-medium">Explícita</td>
                    <td className="p-3 text-muted-foreground">Aplicar conocimiento técnico o legal</td>
                    <td className="p-3 text-muted-foreground">Responder preguntas directas sobre normatividad</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-3 mt-6">
              <h4 className="font-semibold text-foreground">Competencias evaluadas (Decreto 815 de 2018)</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                  <span>Orientación al logro</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                  <span>Trabajo en equipo</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                  <span>Servicio al ciudadano</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                  <span>Manejo de conflictos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                  <span>Transparencia</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Módulo 4: Estrategias */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-amber-600" />
              Módulo 4: Estrategias de Entrenamiento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left p-3 bg-amber-50 font-semibold text-amber-900">Tipo de memoria</th>
                    <th className="text-left p-3 bg-amber-50 font-semibold text-amber-900">Estrategia recomendada</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Asociativa y semántica</td>
                    <td className="p-3 text-muted-foreground">Estudiar casos reales aplicando conceptos legales</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="p-3 font-medium">De trabajo</td>
                    <td className="p-3 text-muted-foreground">Resolver simulaciones con múltiples variables</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Reconstructiva</td>
                    <td className="p-3 text-muted-foreground">Participar en talleres de dilemas éticos</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="p-3 font-medium">Emocional</td>
                    <td className="p-3 text-muted-foreground">Desarrollar inteligencia emocional y autocontrol</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Alert className="border-amber-200 bg-amber-50 mt-6">
              <Lightbulb className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-900">
                <strong>Consejos generales:</strong>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• Combina repeticiones, asociaciones y estímulos emocionales</li>
                  <li>• Descansa adecuadamente y mantén una vida saludable</li>
                  <li>• Practica meditación, diario reflexivo y autoevaluaciones</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Conclusión */}
        <Card className="border-2 border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">Conclusión General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              El aprendizaje efectivo y el éxito en procesos de evaluación como los de la CNSC dependen de desarrollar todas las formas de memoria. Cada tipo contribuye a una dimensión del conocimiento:
            </p>
            <div className="space-y-3">
              <div className="flex gap-3 items-start p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-900"><strong>Sensorial y corta duración:</strong> captan y procesan información.</p>
              </div>
              <div className="flex gap-3 items-start p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-900"><strong>Largo plazo y asociativa:</strong> la consolidan y vinculan con la experiencia.</p>
              </div>
              <div className="flex gap-3 items-start p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-900"><strong>Emocional y reconstructiva:</strong> la aplican con sentido humano y ético.</p>
              </div>
            </div>
            <Alert className="border-primary/30 bg-primary/10 mt-6">
              <AlertDescription className="text-primary italic text-center">
                "Comprender cómo recordamos es el primer paso para aprender con propósito."<br />
                <span className="text-sm font-semibold">— James León Marín Betancur</span>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
