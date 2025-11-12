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
    question: "Lectura: 'Todos los mamíferos son animales. El perro es mamífero'. ¿Qué conclusión deductiva es válida?",
    options: [
      "Algunos perros son animales",
      "El perro es un animal",
      "El perro no es vertebrado",
      "Todos los animales son perros",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El silogismo clásico permite concluir que el perro es un animal.",
    topic: "Deducción",
  },
  {
    id: 2,
    question: "Lectura: 'Si un número es par, entonces es divisible entre 2. 18 es par'. ¿Conclusión correcta?",
    options: ["18 no es divisible entre 2", "18 es primo", "18 es divisible entre 2", "18 es impar"],
    correctAnswer: 2,
    points: 5,
    explanation: "Aplicar la regla general implica que 18 es divisible entre 2.",
    topic: "Deducción",
  },
  {
    id: 3,
    question:
      "Lectura: 'Todas las frutas contienen vitaminas. La naranja es una fruta'. ¿Qué conclusión se sigue?",
    options: ["La naranja contiene vitaminas", "La naranja no contiene agua", "Todas las vitaminas son naranjas", "La naranja no es comestible"],
    correctAnswer: 0,
    points: 5,
    explanation: "La conclusión necesaria es que la naranja contiene vitaminas.",
    topic: "Deducción",
  },
  {
    id: 4,
    question:
      "Lectura: Reglamento: redistribuir cargas priorizando urgentes en excepciones. Lluvia impide salida de técnicos; hay postquirúrgicos diarios. ¿Qué acción deduce la norma?",
    options: [
      "Cancelar todas las visitas",
      "Exigir salida de todo el personal",
      "Redistribuir entre disponibles priorizando postquirúrgicos y reprogramar lo no urgente",
      "Atender solo pacientes nuevos",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "La regla ordena priorizar urgencias y redistribuir cuando hay personal reducido.",
    topic: "Deducción aplicada",
  },
  {
    id: 5,
    question:
      "Lectura: Norma emergencias: todo incidente se informa de inmediato y por escrito aunque ya se retiró. Se retiró carro que obstruía pasillo. ¿Qué procede?",
    options: [
      "No reportar porque no pasó nada",
      "Esperar al final del turno",
      "Informar de inmediato y radicar informe escrito",
      "Llamar a archivo para decidir",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "La norma exige reporte inmediato y documentación escrita aun sin daños.",
    topic: "Deducción aplicada",
  },
  {
    id: 6,
    question:
      "Lectura: 'En excepciones se redistribuye priorizando urgentes; hoy hay técnicos ausentes y postquirúrgicos'. ¿Cuáles son premisa mayor y menor?",
    options: [
      "Mayor: hoy llueve; Menor: hay postquirúrgicos",
      "Mayor: hay técnicos disponibles; Menor: no hay urgencias",
      "Mayor: norma de redistribución; Menor: situación concreta (ausentes + postquirúrgicos)",
      "Mayor: postquirúrgicos son leves; Menor: se atienden últimos",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "La premisa mayor es la norma y la menor la situación actual descrita.",
    topic: "Estructura deducción",
  },
  {
    id: 7,
    question:
      "Lectura: El equipo separa el proceso en pasos (turno, verificación, radicación) para entender demoras. ¿Qué eje aplica?",
    options: ["Categorial", "Analítico", "Intuitivo", "Retórico"],
    correctAnswer: 1,
    points: 5,
    explanation: "Analítico implica descomponer el proceso en sus partes.",
    topic: "Ejes de pensamiento",
  },
  {
    id: 8,
    question:
      "Lectura: En PQRSD se separan peticiones, quejas, reclamos, sugerencias y denuncias. ¿Qué eje se usa?",
    options: ["Analítico", "Categorial", "Hipotético", "Axiológico"],
    correctAnswer: 1,
    points: 5,
    explanation: "Categorial significa clasificar en categorías definidas.",
    topic: "Ejes de pensamiento",
  },
  {
    id: 9,
    question:
      "Lectura: La mayoría de usuarios que se quejan por demora no trae documentos completos. ¿Qué conclusión inductiva es razonable?",
    options: [
      "Toda queja es por falta de documentos",
      "No se puede concluir nada",
      "En la mayoría de casos, la documentación incompleta retrasa la atención",
      "Las demoras solo ocurren los lunes",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "Inducción sugiere que, generalmente, la falta de documentos retrasa el trámite.",
    topic: "Inducción",
  },
  {
    id: 10,
    question:
      "Lectura: 'Calentar agua a 100 °C produce ebullición' (depende de presión). ¿Qué caracteriza esta inferencia?",
    options: [
      "Es cierta sin excepción",
      "Generaliza observaciones y es probable (depende de condiciones)",
      "Es un silogismo categórico",
      "Es una definición",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La inducción depende de condiciones como la presión atmosférica.",
    topic: "Inducción",
  },
  {
    id: 11,
    question:
      "Lectura: Tras observar 10 cisnes blancos luego conoces que existen negros. ¿Qué enseña sobre la inducción?",
    options: [
      "Toda inducción es falsa",
      "La conclusión es probable, puede haber contraejemplos",
      "Ver 10 casos prueba una ley universal",
      "Inducción equivale a deducción",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las generalizaciones inductivas no son necesarias; pueden existir casos contrarios.",
    topic: "Inducción",
  },
  {
    id: 12,
    question:
      "Lectura: Cinco trámites con información completa se resolvieron más rápido. ¿Qué conclusión inductiva favorece la gestión?",
    options: [
      "La información no influye",
      "Dar información clara generalmente agiliza la resolución",
      "Solo importan recursos humanos",
      "La conclusión es cierta siempre",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La inducción respalda que información completa tiende a agilizar trámites.",
    topic: "Inducción",
  },
  {
    id: 13,
    question:
      "Lectura: Oraciones: i) 'Bogotá es la capital de Colombia'; ii) '2+2=5'; iii) '¿Qué hora es?'. ¿Cuáles son proposiciones?",
    options: ["Solo i", "i y ii", "i y ii; iii no lo es", "Todas"],
    correctAnswer: 2,
    points: 5,
    explanation: "Las proposiciones son enunciados con valor de verdad; una pregunta no es proposición.",
    topic: "Proposiciones",
  },
  {
    id: 14,
    question:
      "Lectura: 'Bogotá es la capital' (V); '2+2=5' (F). ¿Qué emparejamiento es correcto?",
    options: ["V,V", "F,V", "V,F", "F,F"],
    correctAnswer: 2,
    points: 5,
    explanation: "La primera es verdadera, la segunda falsa.",
    topic: "Valores de verdad",
  },
  {
    id: 15,
    question:
      "Lectura: Protocolo PQRSD: verificar identidad ∧ registrar. ¿Qué opción cumple V ∧ V?",
    options: [
      "Verificar identidad y registrar",
      "Exigir recibo y remitir",
      "Verificar y pedir regresar",
      "Registrar sin verificar",
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la conjunción ambas acciones deben cumplirse.",
    topic: "Conjunción",
  },
  {
    id: 16,
    question:
      "Lectura: 'Adultos mayores o con discapacidad tienen atención preferente'. Llega usuario con ambas condiciones. ¿Qué opción respeta la disyunción?",
    options: [
      "Otorgar atención preferente o remitir si falta info",
      "Leer en voz alta sus datos",
      "Negar prioridad",
      "Exigir documentos no requeridos",
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "La disyunción indica que basta una condición para otorgar prioridad y brindar apoyo.",
    topic: "Disyunción",
  },
  {
    id: 17,
    question:
      "Lectura: 'Debes proteger datos personales (¬ leer información sensible en voz alta)'. ¿Qué conducta respeta la negación?",
    options: [
      "Orientar sin verbalizar datos",
      "Leer el documento en voz alta",
      "Repetir dirección frente a todos",
      "Mostrar datos en pantalla pública",
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "La negación ordena no divulgar; orientar sin verbalizar protege la información.",
    topic: "Negación",
  },
  {
    id: 18,
    question:
      "Lectura: 'Si no tienes toda la información, remite al área competente'. ¿Qué acción cumple p → q?",
    options: [
      "Falta info y no remites",
      "Falta info y remites",
      "Hay info completa y remites igual",
      "Nunca remites",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El condicional se satisface cuando la antecedente ocurre y se ejecuta la consecuente.",
    topic: "Condicional",
  },
  {
    id: 19,
    question:
      "Lectura: p ↔ q es verdadero cuando p y q tienen mismo valor. ¿Cuál ejemplo es correcto?",
    options: [
      "p V, q F",
      "p F, q V",
      "p V, q V",
      "p F, q V y falso a la vez",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "El bicondicional requiere igualdad de valor de verdad para ser verdadero.",
    topic: "Bicondicional",
  },
  {
    id: 20,
    question:
      "Lectura: 'Todos los mamíferos son animales; todos los animales son perros; luego todas las naranjas son mamíferos'. ¿Qué ocurre?",
    options: [
      "Silogismo válido",
      "Conclusión no se sigue de las premisas",
      "Inducción correcta",
      "Equivalencia lógica",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El razonamiento es inválido; las premisas no conducen a la conclusión.",
    topic: "Falacias",
  },
  {
    id: 21,
    question:
      "Lectura: Ciudadano llega con cédula (ok) y sin recibo (no requisito). ¿Qué acción cumple la conjunción exigida?",
    options: [
      "Verificar y registrar",
      "Exigir recibo y remitir",
      "Verificar y pedir volver",
      "Remitir sin registrar",
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "La norma exige verificar identidad y registrar en el sistema.",
    topic: "PQRSD",
  },
  {
    id: 22,
    question:
      "Lectura: Adulto mayor con discapacidad leve solicita ayuda para formato. ¿Qué actuación respeta el protocolo?",
    options: [
      "Dar prioridad y apoyar el diligenciamiento",
      "Leer datos en voz alta",
      "Registrar y negar prioridad",
      "Negar ayuda",
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "El protocolo combina atención preferente y apoyo en diligenciamiento.",
    topic: "PQRSD",
  },
  {
    id: 23,
    question:
      "Lectura: Obstrucción retirada en emergencias sin daños. ¿Qué conducta exige la norma?",
    options: [
      "No reportar",
      "Informar de inmediato y elaborar informe",
      "Solo informe mensual",
      "Esperar otro incidente",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Siempre se reporta e informa por escrito, aunque el riesgo se haya mitigado.",
    topic: "Emergencias",
  },
  {
    id: 24,
    question:
      "Lectura: Falta personal por lluvia; hay postquirúrgicos urgentes. ¿Qué decisión alinea norma y lógica?",
    options: [
      "Suspender agenda",
      "Redistribuir disponibles priorizando urgentes y optimizando rutas",
      "Forzar salida de todos",
      "Atender primero controles de rutina",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La norma manda redistribuir priorizando urgencias y reorganizar rutas.",
    topic: "Salud domiciliaria",
  },
]

export function RazonamientoLogicoTest() {
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
              <CardTitle>Razonamiento deductivo e inductivo</CardTitle>
              <CardDescription>
                Banco basado en la presentación de razonamiento lógico y casos de PQRSD, salud y emergencias.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Practica silogismos, ejes analítico/categorial, inducción, lógica proposicional y aplicaciones institucionales con 24 preguntas
                situacionales.
              </p>
              <Alert>
                <AlertTitle className="flex items-center gap-2 text-sm font-semibold">
                  <InfoIcon className="h-4 w-4 text-primary" />
                  Puntaje
                </AlertTitle>
                <AlertDescription>Cada pregunta vale 5 puntos. Debes responder las 24 para enviar.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="indicaciones">
          <Card className="border bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle>Indicaciones</CardTitle>
              <CardDescription>Lee la lectura, identifica el tipo de razonamiento y elige la opción coherente.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>Temporizador: 2 minutos por pregunta.</li>
                <li>Puedes reiniciar la prueba cuando desees.</li>
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
                    <RadioGroupItem value={optionIndex.toString()} id={`logic-q-${question.id}-opt-${optionIndex}`} className="mt-1" />
                    <Label htmlFor={`logic-q-${question.id}-opt-${optionIndex}`} className="flex-1 cursor-pointer">
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
