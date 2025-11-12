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
      "Lectura: Un colectivo barrial quiere incidir en el plan de intervención del parque. ¿Cómo define el documento esta acción?",
    options: [
      "Lobby privado ante concejales",
      "Acción individual o colectiva que incide en programas y proyectos públicos",
      "Proselitismo partidista",
      "Acción judicial obligatoria",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Participación ciudadana implica incidir individual o colectivamente en las decisiones públicas.",
    topic: "Concepto",
  },
  {
    id: 2,
    question:
      "Lectura: En foro municipal se recuerda que el Estado debe facilitar la participación de todos. ¿Qué soporte constitucional se cita?",
    options: ["Art. 258 C.P.", "Art. 2 C.P.", "Art. 34 C.P.", "Art. 95 C.P."],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 2 señala como fin esencial del Estado facilitar la participación ciudadana.",
    topic: "Fundamento constitucional",
  },
  {
    id: 3,
    question:
      "Lectura: Una veeduría solicita organizar formas para vigilar la gestión pública. ¿Qué artículo invocan?",
    options: ["Art. 270 C.P.", "Art. 322 C.P.", "Art. 374 C.P.", "Art. 155 C.P."],
    correctAnswer: 0,
    points: 5,
    explanation: "El artículo 270 ordena que la ley organice sistemas de participación para vigilar la gestión pública.",
    topic: "Fundamento constitucional",
  },
  {
    id: 4,
    question:
      "Lectura: La Secretaría de Gobierno capacita sobre mecanismos de participación. ¿Qué ley compila estos mecanismos?",
    options: ["Ley 850 de 2003", "Ley 134 de 1994", "Ley 393 de 1997", "Ley 472 de 1998"],
    correctAnswer: 1,
    points: 5,
    explanation: "La Ley 134 de 1994 es la ley general de mecanismos de participación ciudadana.",
    topic: "Marco legal",
  },
  {
    id: 5,
    question:
      "Lectura: Un colectivo juvenil quiere hacer control social a un contrato. ¿Qué ley reglamenta las veedurías ciudadanas?",
    options: ["Ley 134 de 1994", "Ley 850 de 2003", "Ley 472 de 1998", "Ley 1757 de 2015"],
    correctAnswer: 1,
    points: 5,
    explanation: "La Ley 850 de 2003 regula la organización y funcionamiento de las veedurías.",
    topic: "Veedurías",
  },
  {
    id: 6,
    question:
      "Lectura: Habitantes interponen una acción por daños ambientales colectivos. ¿Qué ley desarrolla acciones populares y de grupo?",
    options: ["Ley 472 de 1998", "Ley 393 de 1997", "Ley 850 de 2003", "Ley 1885 de 2018"],
    correctAnswer: 0,
    points: 5,
    explanation: "La Ley 472 de 1998 regula las acciones populares y de grupo.",
    topic: "Acciones judiciales",
  },
  {
    id: 7,
    question:
      "Lectura: Un ciudadano exige que se cumpla una norma vigente omitida por la administración. ¿Qué ley aplica?",
    options: ["Ley 472 de 1998", "Ley 393 de 1997", "Ley 1757 de 2015", "Ley 134 de 1994"],
    correctAnswer: 1,
    points: 5,
    explanation: "La Ley 393 de 1997 regula la acción de cumplimiento.",
    topic: "Acción de cumplimiento",
  },
  {
    id: 8,
    question:
      "Lectura: Alcaldía lanza estrategia de promoción del derecho a participar. ¿Qué ley soporta esa política?",
    options: ["Ley 1885 de 2018", "Ley 134 de 1994", "Ley 1757 de 2015", "Ley 850 de 2003"],
    correctAnswer: 2,
    points: 5,
    explanation: "La Ley 1757 de 2015 desarrolla el derecho a la participación ciudadana.",
    topic: "Promoción de derechos",
  },
  {
    id: 9,
    question:
      "Lectura: Consejo de Juventud desea ejercer control social al plan juvenil. ¿Qué norma reconoce esa función?",
    options: ["Ley 1885 de 2018", "Ley 472 de 1998", "Ley 393 de 1997", "Ley 850 de 2003"],
    correctAnswer: 0,
    points: 5,
    explanation: "La Ley 1885 de 2018 (que modifica la Ley 1622) les otorga facultades de veeduría.",
    topic: "Juventud",
  },
  {
    id: 10,
    question:
      "Lectura: Una organización denuncia manejo irregular de recursos públicos. ¿Qué órgano de control corresponde?",
    options: ["Personería", "Contraloría", "Defensoría", "Registraduría"],
    correctAnswer: 1,
    points: 5,
    explanation: "El control fiscal sobre recursos públicos lo ejerce la Contraloría.",
    topic: "Órganos de control",
  },
  {
    id: 11,
    question:
      "Lectura: Se reporta falta disciplinaria y vulneración de derechos. ¿Qué dupla de entidades es competente?",
    options: ["Contraloría y Registraduría", "Procuraduría y Defensoría", "Personería y DANE", "Congreso y Corte"],
    correctAnswer: 1,
    points: 5,
    explanation: "La Procuraduría ejerce control disciplinario y la Defensoría protege derechos humanos.",
    topic: "Órganos de control",
  },
  {
    id: 12,
    question:
      "Lectura: Campaña institucional recuerda que votar es derecho y deber. ¿Qué artículo respalda la afirmación?",
    options: ["Art. 270 C.P.", "Art. 258 C.P.", "Art. 374 C.P.", "Art. 319 C.P."],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 258 consagra el voto como derecho y deber ciudadano.",
    topic: "Voto",
  },
  {
    id: 13,
    question:
      "Lectura: Se explica que el voto elige autoridades públicas. ¿Cuál listado coincide con el documento?",
    options: [
      "Presidente, procurador, registrador",
      "Presidente, congresistas, gobernadores, diputados, alcaldes y concejales",
      "Magistrados y contralores",
      "Personeros y defensores",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El documento destaca que mediante el voto se eligen todas esas autoridades territoriales y nacionales.",
    topic: "Voto",
  },
  {
    id: 14,
    question:
      "Lectura: Diagnóstico atribuye abstención a desconfianza. ¿Qué riesgo señala el documento?",
    options: [
      "Fortalece legitimidad",
      "Afecta legitimidad electoral y representatividad",
      "Sin efectos",
      "Solo impacto presupuestal",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La desconfianza y abstención masiva debilitan la legitimidad del proceso electoral.",
    topic: "Participación electoral",
  },
  {
    id: 15,
    question:
      "Lectura: Un comité ciudadano presenta un proyecto de acuerdo. ¿Qué mecanismo activan?",
    options: ["Referendo", "Consulta popular", "Iniciativa popular", "Plebiscito"],
    correctAnswer: 2,
    points: 5,
    explanation: "Presentar proyectos normativos es iniciativa popular legislativa o normativa.",
    topic: "Iniciativa popular",
  },
  {
    id: 16,
    question:
      "Lectura: El comité planifica la recolección de apoyos. ¿Qué porcentaje del censo electoral requiere?",
    options: ["2 %", "5 %", "10 %", "30 %"],
    correctAnswer: 1,
    points: 5,
    explanation: "La iniciativa popular necesita respaldarse con al menos el 5 % del censo.",
    topic: "Iniciativa popular",
  },
  {
    id: 17,
    question:
      "Lectura: Tras verificar apoyos falta la certificación para radicar. ¿Quién expide la certificación?",
    options: ["Consejo Nacional Electoral", "Registrador Nacional", "Procuraduría", "Contraloría"],
    correctAnswer: 1,
    points: 5,
    explanation: "El Registrador Nacional certifica el cumplimiento de apoyos para iniciativa popular.",
    topic: "Iniciativa popular",
  },
  {
    id: 18,
    question:
      "Lectura: Se pretende someter una pregunta local a la ciudadanía. ¿Quién convoca la consulta popular?",
    options: ["Personero", "Congreso", "Presidente, gobernador o alcalde", "Registrador"],
    correctAnswer: 2,
    points: 5,
    explanation: "Según el nivel territorial convoca el Presidente, el Gobernador o el Alcalde.",
    topic: "Consulta popular",
  },
  {
    id: 19,
    question:
      "Lectura: Se estudia crear un nuevo departamento. ¿Qué mecanismo es obligatorio?",
    options: ["Plebiscito", "Referendo", "Consulta popular", "Cabildo abierto"],
    correctAnswer: 2,
    points: 5,
    explanation: "El artículo 297 exige consulta popular para crear departamentos o modificar límites.",
    topic: "Consulta popular",
  },
  {
    id: 20,
    question:
      "Lectura: Un municipio busca vincularse a un área metropolitana. ¿Qué mecanismo exige la Constitución?",
    options: ["Cabildo abierto", "Consulta popular", "Plebiscito", "Iniciativa popular"],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 319 establece consulta popular para la integración a áreas metropolitanas.",
    topic: "Consulta popular",
  },
  {
    id: 21,
    question:
      "Lectura: Se propone que la ciudadanía apruebe o derogue una norma. ¿Qué mecanismo corresponde?",
    options: ["Referendo", "Plebiscito", "Cabildo abierto", "Iniciativa popular"],
    correctAnswer: 0,
    points: 5,
    explanation: "El referendo permite aprobar o derogar normas mediante voto popular.",
    topic: "Referendo",
  },
  {
    id: 22,
    question:
      "Lectura: En 2018 se votó un paquete de medidas anticorrupción. ¿Qué mecanismo fue?",
    options: ["Plebiscito", "Referendo", "Consulta obligatoria", "Revocatoria"],
    correctAnswer: 1,
    points: 5,
    explanation: "El llamado 'referendo anticorrupción' fue un referendo aprobatorio.",
    topic: "Referendo",
  },
  {
    id: 23,
    question:
      "Lectura: En 2016 la ciudadanía decidió si respaldaba el Acuerdo Final de Paz del Ejecutivo. ¿Qué rasgo define el mecanismo usado?",
    options: [
      "Lo convoca cualquier autoridad",
      "Lo convoca el Presidente para apoyar o rechazar una decisión del Ejecutivo",
      "Es para derogar leyes",
      "Es para crear municipios",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El plebiscito se convoca por el Presidente para refrendar decisiones del Gobierno.",
    topic: "Plebiscito",
  },
  {
    id: 24,
    question:
      "Lectura: En el plebiscito por la paz hubo 12,7 millones de votos y ganó el 'No' por 0,42 %. ¿Cuál afirmación es correcta?",
    options: [
      "Ganó el 'Sí'",
      "Votaron menos de 5 millones",
      "El 'No' ganó por estrecho margen y hubo 62,57 % de abstención",
      "La abstención fue menor al 20 %",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "El documento destaca la victoria ajustada del 'No' y la alta abstención.",
    topic: "Plebiscito",
  },
  {
    id: 25,
    question:
      "Lectura: El Concejo convoca a habitantes para debatir el presupuesto local. ¿Qué mecanismo emplean?",
    options: ["Consulta popular", "Plebiscito", "Cabildo abierto", "Revocatoria"],
    correctAnswer: 2,
    points: 5,
    explanation: "El cabildo abierto es la reunión pública del Concejo para tratar asuntos de interés comunitario.",
    topic: "Cabildo abierto",
  },
  {
    id: 26,
    question:
      "Lectura: Un comité ciudadano evalúa retirar del cargo a un elegido popularmente. ¿A quiénes aplica la revocatoria?",
    options: ["Presidente y congresistas", "Diputados y concejales", "Alcaldes y gobernadores", "Magistrados"],
    correctAnswer: 2,
    points: 5,
    explanation: "La revocatoria del mandato se dirige únicamente a alcaldes y gobernadores.",
    topic: "Revocatoria",
  },
  {
    id: 27,
    question:
      "Lectura: Quieren iniciar revocatoria al tercer mes de posesión del alcalde. ¿Cuándo procede según el documento?",
    options: ["Desde la posesión", "Luego de un año", "Solo en el último año", "Solo si hay sanción penal"],
    correctAnswer: 1,
    points: 5,
    explanation: "Debe transcurrir al menos un año desde la posesión para activar la revocatoria.",
    topic: "Revocatoria",
  },
  {
    id: 28,
    question:
      "Lectura: El comité pregunta cuántos apoyos necesita y ante qué entidad tramita la revocatoria. ¿Cuál es la respuesta correcta?",
    options: [
      "10 % de votos válidos; Personería",
      "5 % del censo; Concejo",
      "30 % de los votos válidos de la elección; Registraduría",
      "2 % del censo; Defensoría",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "Se requieren apoyos equivalentes al 30 % de los votos válidos y se tramita ante la Registraduría Nacional.",
    topic: "Revocatoria",
  },
]

export function ParticipacionCiudadanaTest() {
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
              <CardTitle>Mecanismos de Participación Ciudadana</CardTitle>
              <CardDescription>
                Cuestionario basado en el documento “Los mecanismos de participación ciudadana 2025”.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Repasa fundamentos constitucionales, leyes, órganos de control y mecanismos como iniciativa, consulta, referendo, cabildo y
                revocatoria.
              </p>
              <Alert>
                <AlertTitle className="flex items-center gap-2 text-sm font-semibold">
                  <InfoIcon className="h-4 w-4 text-primary" />
                  Puntaje
                </AlertTitle>
                <AlertDescription>Cada pregunta vale 5 puntos. Debes responder las 28 para enviar.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="indicaciones">
          <Card className="border bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle>Indicaciones de uso</CardTitle>
              <CardDescription>Lee la lectura, identifica el mecanismo descrito y selecciona la opción coherente.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>Temporizador: 2 minutos por pregunta.</li>
                <li>Puedes revisar la retroalimentación al finalizar.</li>
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
                    <RadioGroupItem value={optionIndex.toString()} id={`participacion-q-${question.id}-option-${optionIndex}`} className="mt-1" />
                    <Label htmlFor={`participacion-q-${question.id}-option-${optionIndex}`} className="flex-1 cursor-pointer">
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
