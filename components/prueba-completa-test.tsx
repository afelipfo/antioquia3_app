"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

// Importar todas las preguntas de cada componente
import { razonamientoLogicoQuestions } from "./razonamiento-logico-test"
import { participacionCiudadanaQuestions } from "./participacion-ciudadana-test"
import { questionsV1 as obrasPublicasQuestions } from "./obras-publicas-test"
import { formulacionMgaQuestions } from "./formulacion-mga-test"
import { bloqueConstitucionalidadQuestions } from "./bloque-constitucionalidad-test"
import { questionsV1 as mipgQuestions } from "./mipg-test"
import { questionsV1 as servicioUsuarioQuestions } from "./servicio-usuario-test"
import { questionsV1 as procesoDisciplinarioQuestions } from "./proceso-disciplinario-test"
import { questionsV1 as infraestructuraQuestions } from "./infraestructura-test"
import { questionsV1 as gestionProyectosQuestions } from "./gestion-proyectos-test"
import { questionsV1 as planesMejoramientoQuestions } from "./planes-mejoramiento-test"
import { questionsV1 as formulacionQuestions } from "./formulacion-test"
import { questionsV1 as pqrsdQuestions } from "./pqrsd-test"
import { questionsV1 as normatividadQuestions } from "./normatividad-test"
import { questionsV1 as contratacionQuestions } from "./contratacion-test"
import { gestionPresupuestalQuestions } from "./gestion-presupuestal-test"
import { questionsV1 as juicioSituacionalQuestions } from "./juicio-situacional-test"
import { razonamientoQuestionsV1, RazonamientoQuestion } from "./razonamiento-test"

// Función para convertir preguntas de razonamiento al formato estándar
const convertRazonamientoQuestions = (questions: RazonamientoQuestion[]) => {
  return questions.map(q => ({
    id: q.id,
    question: q.context ? `${q.context}\n\n${q.question}` : q.question,
    options: q.options.map(opt => opt.text),
    correctAnswer: q.options.findIndex(opt => opt.id === q.correct),
    points: q.points,
    explanation: q.explanation,
    topic: q.category
  }))
}

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  points: number
  explanation: string
  topic: string
  component: string
}

// Función para obtener 15 preguntas aleatorias de un array
const getRandomQuestions = (questions: any[], count: number, componentName: string): Question[] => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, questions.length)).map((q, idx) => ({
    id: `${componentName}-${idx}`,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    points: q.points || 5,
    explanation: q.explanation,
    topic: q.topic || componentName,
    component: componentName
  }))
}

// Importar todas las preguntas de todos los componentes
const getAllQuestions = (): Question[] => {
  const allQuestions: Question[] = []

  // Lista de componentes y sus preguntas reales
  const components = [
    { name: "Razonamiento Lógico", questions: razonamientoLogicoQuestions },
    { name: "Participación Ciudadana", questions: participacionCiudadanaQuestions },
    { name: "Obras Públicas", questions: obrasPublicasQuestions },
    { name: "Formulación MGA", questions: formulacionMgaQuestions },
    { name: "Bloque Constitucionalidad", questions: bloqueConstitucionalidadQuestions },
    { name: "MIPG", questions: mipgQuestions },
    { name: "Servicio Usuario", questions: servicioUsuarioQuestions },
    { name: "Proceso Disciplinario", questions: procesoDisciplinarioQuestions },
    { name: "Infraestructura", questions: infraestructuraQuestions },
    { name: "Gestión Proyectos", questions: gestionProyectosQuestions },
    { name: "Planes Mejoramiento", questions: planesMejoramientoQuestions },
    { name: "Formulación", questions: formulacionQuestions },
    { name: "PQRSD", questions: pqrsdQuestions },
    { name: "Normatividad", questions: normatividadQuestions },
    { name: "Contratación", questions: contratacionQuestions },
    { name: "Gestión Presupuestal", questions: gestionPresupuestalQuestions },
    { name: "Juicio Situacional", questions: juicioSituacionalQuestions },
    { name: "Razonamiento", questions: convertRazonamientoQuestions(razonamientoQuestionsV1) },
  ]

  components.forEach(component => {
    allQuestions.push(...getRandomQuestions(component.questions, 15, component.name))
  })

  return allQuestions
}

export function PruebaCompletaTest() {
  const [questions] = useState<Question[]>(() => getAllQuestions())
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(405 * 60) // 405 minutos en segundos

  useEffect(() => {
    if (showResults) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowResults(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showResults])

  const handleAnswer = (answerIndex: number) => {
    // No permitir cambiar la respuesta si ya fue respondida
    if (answeredQuestions.has(currentQuestion)) return

    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)

    // Marcar esta pregunta como respondida
    setAnsweredQuestions(prev => new Set(prev).add(currentQuestion))
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    let totalPoints = 0
    let earnedPoints = 0

    questions.forEach((q, idx) => {
      totalPoints += q.points
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++
        earnedPoints += q.points
      }
    })

    return { correct, total: questions.length, percentage: (earnedPoints / totalPoints) * 100, earnedPoints, totalPoints }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-4">
          <Link href="/dashboard">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              Resultados - Prueba Completa
            </CardTitle>
            <CardDescription>Has completado la evaluación integral</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Respuestas Correctas</p>
                    <p className="text-3xl font-bold text-green-600">{score.correct}/{score.total}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Porcentaje</p>
                    <p className="text-3xl font-bold text-blue-600">{score.percentage.toFixed(1)}%</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Puntos</p>
                    <p className="text-3xl font-bold text-purple-600">{score.earnedPoints}/{score.totalPoints}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Revisión Detallada</h3>
              {questions.map((q, idx) => {
                const userAnswer = selectedAnswers[idx]
                const isCorrect = userAnswer === q.correctAnswer

                return (
                  <Card key={q.id} className={isCorrect ? "border-green-200" : "border-red-200"}>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="font-medium whitespace-pre-line">{q.question}</p>
                            <p className="text-sm text-muted-foreground mt-1">Componente: {q.component}</p>
                          </div>
                          {isCorrect ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                          )}
                        </div>

                        <div className="space-y-2">
                          {q.options.map((option, optIdx) => {
                            const isUserAnswer = userAnswer === optIdx
                            const isCorrectAnswer = q.correctAnswer === optIdx

                            return (
                              <div
                                key={optIdx}
                                className={`rounded-lg border p-3 ${
                                  isCorrectAnswer
                                    ? "border-green-500 bg-green-50"
                                    : isUserAnswer
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-200"
                                }`}
                              >
                                <p className="text-sm">{option}</p>
                              </div>
                            )
                          })}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-900 whitespace-pre-line">
                            <strong>Explicación:</strong> {q.explanation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="flex gap-4">
              <Button asChild className="flex-1">
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al Dashboard
                </Link>
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => window.location.reload()}>
                Reintentar Prueba
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-4">
        <Link href="/dashboard">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Dashboard
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Prueba Completa - Pregunta {currentQuestion + 1} de {questions.length}</CardTitle>
              <CardDescription>Componente: {currentQ.component}</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-6">
            <p className="text-lg font-medium leading-relaxed whitespace-pre-line">{currentQ.question}</p>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestion] === idx
              const isCorrect = idx === currentQ.correctAnswer
              const isAnswered = answeredQuestions.has(currentQuestion)

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                    isAnswered
                      ? isCorrect
                        ? "border-green-500 bg-green-50"
                        : isSelected
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                      : isSelected
                      ? "border-primary bg-primary/10"
                      : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                  } ${isAnswered ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <p>{option}</p>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 ml-2" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {answeredQuestions.has(currentQuestion) && (
            <div className={`rounded-lg border-2 p-4 ${
              selectedAnswers[currentQuestion] === currentQ.correctAnswer
                ? "border-green-500 bg-green-50"
                : "border-blue-500 bg-blue-50"
            }`}>
              <div className="flex items-start gap-3">
                {selectedAnswers[currentQuestion] === currentQ.correctAnswer ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <p className={`font-bold mb-2 ${
                    selectedAnswers[currentQuestion] === currentQ.correctAnswer
                      ? "text-green-900"
                      : "text-blue-900"
                  }`}>
                    {selectedAnswers[currentQuestion] === currentQ.correctAnswer
                      ? "¡Respuesta correcta!"
                      : "Respuesta incorrecta"}
                  </p>
                  <p className={`text-sm whitespace-pre-line ${
                    selectedAnswers[currentQuestion] === currentQ.correctAnswer
                      ? "text-green-900"
                      : "text-blue-900"
                  }`}>
                    <strong>Explicación:</strong> {currentQ.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              variant="outline"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="flex-1"
            >
              Anterior
            </Button>

            {currentQuestion === questions.length - 1 ? (
              <Button onClick={handleSubmit} className="flex-1" disabled={!answeredQuestions.has(currentQuestion)}>
                Finalizar Prueba
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="flex-1"
                disabled={!answeredQuestions.has(currentQuestion)}
              >
                Siguiente
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <p>Puntos de esta pregunta: {currentQ.points}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
