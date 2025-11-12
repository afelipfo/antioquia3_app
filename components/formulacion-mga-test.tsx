"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, InfoIcon, XCircle } from "lucide-react"
import { useTestTimer } from "@/hooks/use-test-timer"
import { TestTimer } from "@/components/test-timer"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  points: number
  explanation: string
  topic: string
}

const questions: Question[] = [
  {
    id: 1,
    question:
      "Lectura: El Plan de Desarrollo municipal quiere aterrizar la meta de reducción de residuos en acciones ejecutables. ¿Cuál es la unidad operativa que permite materializar la meta?",
    options: ["Programa", "Proyecto", "Subprograma", "Línea estratégica"],
    correctAnswer: 1,
    points: 5,
    explanation: "La presentación indica que el proyecto es la unidad operativa concreta que aterriza las metas del plan.",
    topic: "Unidad operativa",
  },
  {
    id: 2,
    question:
      "Lectura: El equipo valida el orden jerárquico de la planeación. ¿Cuál es el encadenamiento correcto desde la estrategia hasta la ejecución?",
    options: [
      "Proyecto → Subprograma → Programa → Plan de Desarrollo",
      "Programa → Proyecto → Plan de Desarrollo → Subprograma",
      "Plan de Desarrollo → Programa → Subprograma → Proyecto",
      "Plan de Acción → Proyecto → Programa → Subprograma",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El orden expuesto es Plan de Desarrollo, Programa, Subprograma y Proyecto, asegurando coherencia descendente.",
    topic: "Encadenamiento",
  },
  {
    id: 3,
    question:
      "Lectura: El alcalde teme que el plan quede en el papel. ¿Qué garantiza resultados medibles?",
    options: ["Ampliar el plan plurianual", "Formular proyectos bien estructurados", "Centralizar todo en Hacienda", "Incrementar metas indicativas"],
    correctAnswer: 1,
    points: 5,
    explanation: "La MGA resalta que solo proyectos bien formulados traducen metas en resultados verificables.",
    topic: "Del plan al resultado",
  },
  {
    id: 4,
    question:
      "Lectura: La Secretaría debe asignar responsables y metas anuales que conecten el plan con la ejecución. ¿Qué instrumento operativiza esa conexión?",
    options: ["Estatuto Tributario", "Plan de Acción", "PAC trimestral", "POAI sin proyectos"],
    correctAnswer: 1,
    points: 5,
    explanation: "El Plan de Acción desagrega metas del Plan de Desarrollo hacia proyectos concretos y responsables.",
    topic: "Plan de Acción",
  },
  {
    id: 5,
    question:
      "Lectura: Un nuevo funcionario pregunta por la norma base del Sistema Nacional de Planeación. ¿Cuál es?",
    options: ["Ley 819 de 2003", "Decreto 1082 de 2015", "Ley 152 de 1994", "CONPES 4070 de 2022"],
    correctAnswer: 2,
    points: 5,
    explanation: "La Ley 152 de 1994 define el sistema de planeación y los instrumentos que lo integran.",
    topic: "Marco normativo",
  },
  {
    id: 6,
    question:
      "Lectura: Hacienda exige coherencia entre metas e impacto fiscal. ¿Qué norma guía la responsabilidad fiscal en la formulación?",
    options: ["Ley 819 de 2003", "Ley 152 de 1994", "Decreto 1082 de 2015", "CONPES 4070 de 2022"],
    correctAnswer: 0,
    points: 5,
    explanation: "La Ley 819 establece lineamientos de responsabilidad y sostenibilidad fiscales para proyectos.",
    topic: "Responsabilidad fiscal",
  },
  {
    id: 7,
    question:
      "Lectura: Jurídica solicita la norma que compila requisitos de proyectos de inversión pública. ¿Cuál deben consultar?",
    options: ["Decreto 1082 de 2015", "Decreto 1625 de 2016", "Decreto 092 de 2017", "Decreto 1510 de 2013"],
    correctAnswer: 0,
    points: 5,
    explanation: "El Decreto 1082 compila la reglamentación sobre proyectos de inversión y su alistamiento.",
    topic: "Requisitos de inversión",
  },
  {
    id: 8,
    question:
      "Lectura: El Comité de Inversión busca lineamientos para eficiencia del gasto. ¿Qué política deben revisar?",
    options: ["CONPES 3857 de 2016", "CONPES 4070 de 2022", "CONPES 3918 de 2018", "CONPES 3762 de 2013"],
    correctAnswer: 1,
    points: 5,
    explanation: "El CONPES 4070 fija lineamientos para mejorar calidad y eficiencia de la inversión pública.",
    topic: "Política de inversión",
  },
  {
    id: 9,
    question:
      "Lectura: La Alcaldía busca estandarizar decisiones de inversión. ¿Qué herramienta metodológica debe usar?",
    options: ["POAI", "Metodología General Ajustada (MGA)", "Tablero de control interno", "MIPG sin proyectos"],
    correctAnswer: 1,
    points: 5,
    explanation: "La MGA brinda el estándar nacional para formular, evaluar y priorizar proyectos.",
    topic: "Uso de la MGA",
  },
  {
    id: 10,
    question:
      "Lectura: El equipo necesita evaluar técnica y económicamente un proyecto antes de viabilizarlo. ¿Qué instrumento lo permite?",
    options: ["SECOP", "SIIF Nación", "MGA", "Cronograma contractual"],
    correctAnswer: 2,
    points: 5,
    explanation: "La MGA es la herramienta nacional para evaluar proyectos antes de su aprobación.",
    topic: "Evaluación",
  },
  {
    id: 11,
    question:
      "Lectura: El diagnóstico confunde causas y problemas. ¿Qué componente ayuda a distinguirlos correctamente?",
    options: ["Matriz de costos", "Árbol de problemas y objetivos", "Curva S", "Cronograma PAC"],
    correctAnswer: 1,
    points: 5,
    explanation: "El árbol de problemas identifica problema central, causas y efectos; su espejo es el árbol de objetivos.",
    topic: "Diagnóstico",
  },
  {
    id: 12,
    question:
      "Lectura: El equipo debe convertir ‘baja separación en la fuente’ en una meta clara. ¿Qué herramienta emplea?",
    options: ["EDT", "Árbol de objetivos", "Flujograma contractual", "Organigrama"],
    correctAnswer: 1,
    points: 5,
    explanation: "El árbol de objetivos traduce problemas en objetivos específicos con medios y fines.",
    topic: "Objetivos",
  },
  {
    id: 13,
    question:
      "Lectura: Se reporta ‘concientizar’ sin métricas. ¿Qué tipos de indicadores deben definirse para productos y cambios logrados?",
    options: ["Proceso e insumo", "Producto y resultado", "Impacto y financiero", "Percepción y satisfacción"],
    correctAnswer: 1,
    points: 5,
    explanation: "La MGA exige indicadores de producto (entregables) y de resultado (cambios generados).",
    topic: "Indicadores",
  },
  {
    id: 14,
    question:
      "Lectura: La entidad quiere concentrar objetivos, indicadores, medios de verificación y supuestos en una matriz. ¿Qué herramienta usa?",
    options: ["DOFA", "Matriz de Marco Lógico", "Árbol de problemas", "EDT"],
    correctAnswer: 1,
    points: 5,
    explanation: "La matriz de Marco Lógico articula todo el modelo de intervención del proyecto.",
    topic: "Marco lógico",
  },
  {
    id: 15,
    question:
      "Lectura: La planta de reciclaje requiere OPEX y acuerdos comunitarios posteriores. ¿Qué análisis garantiza permanencia de resultados?",
    options: ["Riesgo cambiario", "Análisis de sostenibilidad y riesgos", "Proyección de caja del contratista", "Plan anual de adquisiciones"],
    correctAnswer: 1,
    points: 5,
    explanation: "La MGA demanda revisar sostenibilidad y riesgos para asegurar resultados en el tiempo.",
    topic: "Sostenibilidad",
  },
  {
    id: 16,
    question:
      "Lectura: La ficha debe radicarse y gestionarse en la plataforma oficial. ¿Dónde se administra el proyecto?",
    options: ["SECOP II", "MGA Web", "SIIF Nación", "SGR-OCAD"],
    correctAnswer: 1,
    points: 5,
    explanation: "Los proyectos se gestionan en MGA Web para evaluación y seguimiento sectorial.",
    topic: "Gestión en plataforma",
  },
  {
    id: 17,
    question:
      "Lectura: Tras formular, preguntan quién declara la viabilidad. ¿Quién define la aprobación final del proyecto?",
    options: ["Concejo municipal", "DNP o sector competente", "Tesorería", "Comité de archivo"],
    correctAnswer: 1,
    points: 5,
    explanation: "El DNP o la entidad sectorial evalúan y declaran la viabilidad según el tipo de proyecto.",
    topic: "Viabilidad",
  },
  {
    id: 18,
    question:
      "Lectura: El diagnóstico se basa en encuestas de hace seis años. ¿Qué error se comete?",
    options: ["Costos subestimados", "Diagnóstico sin soporte estadístico actualizado", "Confusión problema-efecto", "Indicadores sin línea base"],
    correctAnswer: 1,
    points: 5,
    explanation: "El documento advierte sobre diagnósticos sin información vigente o verificable.",
    topic: "Errores comunes",
  },
  {
    id: 19,
    question:
      "Lectura: Se declara como problema la ‘falta de presupuesto’. ¿Qué error evidencia?",
    options: ["Falta de articulación con el PPI", "Problemas mal definidos o confundidos con causas", "Costos sin justificación", "Indicadores no medibles"],
    correctAnswer: 1,
    points: 5,
    explanation: "La MGA insiste en identificar problemas reales del territorio, no causas financieras.",
    topic: "Errores - Problema",
  },
  {
    id: 20,
    question:
      "Lectura: La meta indica ‘mejorar cultura ciudadana’ sin línea base. ¿Qué error se describe?",
    options: ["Georreferenciación deficiente", "Indicadores no medibles", "Falta de matriz de riesgos", "Costos indirectos"],
    correctAnswer: 1,
    points: 5,
    explanation: "Sin unidad, línea base ni meta cuantificada el indicador no es medible, error típico señalado en la charla.",
    topic: "Errores - Indicadores",
  },
  {
    id: 21,
    question:
      "Lectura: El costo estimado no muestra fuentes ni metodología. ¿Qué error comete el equipo?",
    options: ["Subvaloración de CAPEX", "Costos sin justificación o sin fuente de financiación", "Sobreestimación del OPEX", "Doble contabilidad"],
    correctAnswer: 1,
    points: 5,
    explanation: "La presentación recalca justificar costos con fuentes y método; de lo contrario, el proyecto no pasa evaluación.",
    topic: "Errores - Costos",
  },
  {
    id: 22,
    question:
      "Lectura: Para sustentar el árbol de problemas, el equipo actualiza datos base. ¿Qué buena práctica aplican?",
    options: ["Minimizar hallazgos", "Basar el diagnóstico en información actualizada", "Reemplazar datos con percepciones", "Ajustar metas sin línea base"],
    correctAnswer: 1,
    points: 5,
    explanation: "Actualizar y soportar datos es una buena práctica destacada para validar el diagnóstico.",
    topic: "Buenas prácticas - Evidencia",
  },
  {
    id: 23,
    question:
      "Lectura: La Secretaría convoca mesas con comunidades y actores. ¿Qué buena práctica representa?",
    options: ["Diseño cerrado", "Incluir participación ciudadana", "Tercerizar sin diálogo", "Decidir por mayoría interna"],
    correctAnswer: 1,
    points: 5,
    explanation: "La participación ciudadana valida los diseños y fortalece la legitimidad del proyecto.",
    topic: "Buenas prácticas - Participación",
  },
  {
    id: 24,
    question:
      "Lectura: Planeación verifica consistencia plurianual del proyecto. ¿Con qué debe articularlo?",
    options: ["Marco Fiscal de Mediano Plazo", "Plan Plurianual de Inversiones", "Banco de proyectos externo", "POAI de funcionamiento"],
    correctAnswer: 1,
    points: 5,
    explanation: "El Plan Plurianual de Inversiones garantiza la coherencia financiera multianual del proyecto.",
    topic: "Buenas prácticas - Coherencia",
  },
  {
    id: 25,
    question:
      "Lectura: Para evitar reprocesos se instala un comité interinstitucional. ¿Con qué áreas debe coordinar?",
    options: ["Jurídica y Archivo", "Planeación, Hacienda y Control Interno", "Talento Humano y Prensa", "Sistemas y Almacén"],
    correctAnswer: 1,
    points: 5,
    explanation: "El contenido resalta la coordinación entre Planeación, Hacienda y Control Interno para asegurar coherencia.",
    topic: "Buenas prácticas - Coordinación",
  },
  {
    id: 26,
    question:
      "Lectura: La administración quiere que los proyectos expresen valor público medible dentro del modelo de gestión. ¿Cómo se articula esto?",
    options: ["Proyectos aislados del MIPG", "MGA dentro del MIPG generando valor público", "Solo auditorías externas", "Tableros sin indicadores"],
    correctAnswer: 1,
    points: 5,
    explanation: "El documento explica que la MGA, integrada al MIPG, permite generar valor público medible.",
    topic: "MIPG y valor público",
  },
  {
    id: 27,
    question:
      "Lectura: El Concejo pregunta cómo la formulación aporta a la transparencia. ¿Qué responde la presentación?",
    options: ["La MGA no impacta", "La transparencia depende solo del control externo", "Los proyectos contribuyen a transparencia y eficiencia", "Debe centralizarse en Hacienda"],
    correctAnswer: 2,
    points: 5,
    explanation: "La formulación adecuada mejora transparencia y eficiencia institucional al documentar las decisiones.",
    topic: "Transparencia",
  },
  {
    id: 28,
    question:
      "Lectura: El alcalde exige eficiencia en la inversión desde la formulación. ¿Qué asegura esa eficiencia?",
    options: ["Registrar en cualquier plataforma", "Formular con la MGA", "Delegar a contratistas", "Unificar todo en el POAI"],
    correctAnswer: 1,
    points: 5,
    explanation: "El uso disciplinado de la MGA permite decisiones de inversión más eficientes y comparables.",
    topic: "Principio de eficiencia",
  },
  {
    id: 29,
    question:
      "Lectura: Una idea de economía circular requiere convertirse en cambios verificables. ¿Qué proceso permite esa traducción?",
    options: ["Convenio marco", "Formulación de proyectos", "Compra pública", "Encargo fiduciario"],
    correctAnswer: 1,
    points: 5,
    explanation: "La formulación de proyectos da estructura y trazabilidad a las ideas para que produzcan resultados.",
    topic: "De idea a resultados",
  },
  {
    id: 30,
    question:
      "Lectura: El equipo lista los componentes mínimos de la MGA. ¿Cuál es el conjunto que no puede faltar?",
    options: [
      "DOFA + EDT + Curva S",
      "Árbol de problemas y objetivos; indicadores de producto y resultado; matriz de marco lógico; análisis de sostenibilidad y riesgos",
      "POAI + PAC + cronograma contractual",
      "Plan de compras + especificaciones técnicas",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La MGA enfatiza ese paquete metodológico como requisito para formular con calidad.",
    topic: "Componentes MGA",
  },
]

export function FormulacionMgaTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const timer = useTestTimer({
    totalQuestions: questions.length,
    timePerQuestion: 120,
    onTimeUp: () => setShowResults(true),
    isActive: !showResults,
  })

  const handleAnswerChange = (questionId: number, optionIndex: number) => {
    if (showResults) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) return
    setShowResults(true)
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const score = questions.reduce(
    (acc, question) => {
      if (answers[question.id] === question.correctAnswer) {
        return {
          correct: acc.correct + 1,
          earnedPoints: acc.earnedPoints + question.points,
        }
      }
      return acc
    },
    { correct: 0, earnedPoints: 0 },
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="resumen">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="indicaciones">Indicaciones</TabsTrigger>
        </TabsList>
        <TabsContent value="resumen">
          <Card className="border bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle>Formulación de Proyectos con MGA</CardTitle>
              <CardDescription>
                Preguntas basadas en la presentación del facilitador Nicolás Vargas sobre formulación con la MGA.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Evalúa conceptos de planeación, diagnósticos, indicadores, Marco Lógico, sostenibilidad y buenas prácticas para proyectos de inversión
                pública.
              </p>
              <Alert>
                <AlertTitle className="flex items-center gap-2 text-sm font-semibold">
                  <InfoIcon className="h-4 w-4 text-primary" />
                  Puntaje
                </AlertTitle>
                <AlertDescription>Cada pregunta vale 5 puntos. Debes responder las 30 para enviar la prueba.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="indicaciones">
          <Card className="border bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle>Indicaciones de uso</CardTitle>
              <CardDescription>
                Lee el escenario y selecciona la opción coherente con la guía “Formulación de Proyectos de Inversión Pública con la MGA”.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc space-y-1 pl-5">
                <li>El temporizador asigna 2 minutos por pregunta.</li>
                <li>Puedes ver retroalimentación después de enviar las respuestas.</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {!showResults && (
        <TestTimer
          formattedTime={timer.formattedTime}
          timeColor={timer.timeColor}
          percentageRemaining={timer.percentageRemaining}
        />
      )}

      {questions.map((question, index) => {
        const selected = answers[question.id]
        const showState = showResults && showFeedback
        const isCorrect = selected === question.correctAnswer

        return (
          <Card
            key={question.id}
            className={`border transition-colors ${
              showState ? (isCorrect ? "border-green-500 bg-green-50" : "border-red-400 bg-red-50") : "border-border"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-start justify-between gap-4">
                <span>
                  Pregunta {index + 1} · {question.points} pts
                </span>
                {showResults && selected !== undefined && (
                  selected === question.correctAnswer ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )
                )}
              </CardTitle>
              <CardDescription>Tema: {question.topic}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium leading-relaxed">{question.question}</p>
              <RadioGroup
                value={selected?.toString()}
                onValueChange={(value) => handleAnswerChange(question.id, Number(value))}
                disabled={showResults}
              >
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-sm leading-relaxed transition ${
                      showResults
                        ? optionIndex === question.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : selected === optionIndex
                          ? "border-red-400 bg-red-50"
                          : "border-border"
                        : "border-border hover:bg-muted/70"
                    }`}
                  >
                    <RadioGroupItem value={optionIndex.toString()} id={`mga-q-${question.id}-opt-${optionIndex}`} className="mt-1" />
                    <Label htmlFor={`mga-q-${question.id}-opt-${optionIndex}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {showResults && showFeedback && (
                <Alert className={isCorrect ? "border-green-500 bg-green-50" : "border-orange-400 bg-orange-50"}>
                  <AlertTitle>{isCorrect ? "¡Correcto!" : "Respuesta incorrecta"}</AlertTitle>
                  <AlertDescription>{question.explanation}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )
      })}

      <div className="flex flex-wrap gap-4">
        {!showResults ? (
          <Button onClick={handleSubmit} disabled={Object.keys(answers).length !== questions.length} className="min-w-[200px]">
            Enviar respuestas
          </Button>
        ) : (
          <>
            <Button onClick={() => setShowFeedback((prev) => !prev)} variant="outline" className="min-w-[200px]">
              {showFeedback ? "Ocultar retroalimentación" : "Mostrar retroalimentación"}
            </Button>
            <Button onClick={handleReset} variant="secondary" className="min-w-[200px]">
              Reiniciar prueba
            </Button>
          </>
        )}
      </div>

      {showResults && (
        <Alert className="border-primary/40 bg-primary/10">
          <AlertTitle className="text-lg font-semibold">Resultado</AlertTitle>
          <AlertDescription>
            Respondiste correctamente {score.correct} de {questions.length} preguntas · {score.earnedPoints} / {questions.length * 5} puntos
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
