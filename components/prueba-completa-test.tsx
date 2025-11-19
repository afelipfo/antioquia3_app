"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

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

  // Lista de componentes y sus preguntas
  const components = [
    { name: "Razonamiento Lógico", questions: Array(24).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Razonamiento" })) },
    { name: "Participación Ciudadana", questions: Array(28).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Participación" })) },
    { name: "Obras Públicas", questions: Array(30).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Obras" })) },
    { name: "Formulación MGA", questions: Array(30).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "MGA" })) },
    { name: "Constitucionalidad", questions: Array(38).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Constitucional" })) },
    { name: "MIPG", questions: Array(40).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "MIPG" })) },
    { name: "Servicio Usuario", questions: Array(40).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Servicio" })) },
    { name: "Proceso Disciplinario", questions: Array(40).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Disciplinario" })) },
    { name: "Infraestructura", questions: Array(50).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Infraestructura" })) },
    { name: "Gestión Proyectos", questions: Array(50).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Gestión" })) },
    { name: "Planes Mejoramiento", questions: Array(50).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Planes" })) },
    { name: "Formulación", questions: Array(50).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Formulación" })) },
    { name: "PQRSD", questions: Array(50).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "PQRSD" })) },
    { name: "Normatividad", questions: Array(56).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Normatividad" })) },
    { name: "Contratación", questions: Array(60).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Contratación" })) },
    { name: "Gestión Presupuestal", questions: Array(62).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Presupuestal" })) },
    { name: "Juicio Situacional", questions: Array(55).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Juicio" })) },
    { name: "Razonamiento", questions: Array(100).fill(null).map((_, i) => ({ question: `Pregunta ${i+1}`, options: ["A", "B", "C", "D"], correctAnswer: 0, points: 5, explanation: "Explicación", topic: "Razonamiento" })) },
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
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
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
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  selectedAnswers[currentQuestion] === idx
                    ? "border-primary bg-primary/10"
                    : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                }`}
              >
                <p>{option}</p>
              </button>
            ))}
          </div>

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
              <Button onClick={handleSubmit} className="flex-1" disabled={selectedAnswers[currentQuestion] === null}>
                Finalizar Prueba
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="flex-1"
                disabled={selectedAnswers[currentQuestion] === null}
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
