/* eslint-disable jsx-a11y/label-has-associated-control */
"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, Info, RefreshCw, ShieldCheck, XCircle } from "lucide-react"
import type { BehavioralSubject } from "@/lib/behavioral-competencies"
import { behavioralSubjects } from "@/lib/behavioral-competencies"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTestTimer } from "@/hooks/use-test-timer"
import { TestTimer } from "@/components/test-timer"

type BehavioralQuizProps = {
  subject: BehavioralSubject
}

export function BehavioralQuiz({ subject }: BehavioralQuizProps) {
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2">("v1")
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)

  // Obtener el subject correspondiente según la versión
  const currentSubject = selectedVersion === "v1"
    ? subject
    : behavioralSubjects.find(s => s.id === subject.id) || subject

  const totalScore = useMemo(
    () => currentSubject.questions.reduce((acc, question) => acc + question.score, 0),
    [currentSubject.questions],
  )

  const unanswered = currentSubject.questions.filter((question) => !answers[question.id])

  const submitQuiz = () => {
    if (unanswered.length > 0) return

    const obtainedScore = currentSubject.questions.reduce((total, question) => {
      const answer = answers[question.id]
      if (answer === question.correctOption) {
        return total + question.score
      }
      return total
    }, 0)

    setScore(obtainedScore)
    setSubmitted(true)
    setShowFeedback(false)
  }

  const timer = useTestTimer({
    totalQuestions: currentSubject.questions.length,
    timePerQuestion: 120,
    onTimeUp: submitQuiz,
    isActive: !submitted
  })

  const handleVersionChange = (value: string) => {
    setSelectedVersion(value as "v1" | "v2")
    // Reiniciar estado cuando se cambia de versión
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const handleChange = (questionId: string, optionValue: string) => {
    if (submitted) return
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitQuiz()
  }

  const resetQuiz = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const percentage = submitted && totalScore > 0 ? Math.round((score / totalScore) * 100) : 0

  const performanceMessage = (() => {
    if (!submitted) return ""
    if (percentage >= 90) {
      return "Excelente dominio del componente comportamental. Continúa aplicando estos criterios en tu práctica diaria."
    }
    if (percentage >= 70) {
      return "Buen nivel de dominio. Refuerza los conceptos señalados en la retroalimentación para perfeccionar tu desempeño."
    }
    return "Es necesario reforzar las definiciones y conductas clave descritas en el Decreto 815. Revisa la retroalimentación para ubicar los temas a fortalecer."
  })()

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!submitted && (
        <TestTimer
          formattedTime={timer.formattedTime}
          timeColor={timer.timeColor}
          percentageRemaining={timer.percentageRemaining}
        />
      )}

      <Card className="border-white/30 bg-white/80 shadow-lg shadow-primary/15 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-balance">{currentSubject.title}</CardTitle>
          <CardDescription className="text-balance leading-relaxed">{currentSubject.intro}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            {currentSubject.reference}
          </div>
          <p>
            Responde cada pregunta seleccionando la opción que mejor se ajusta a la descripción del decreto. Cada respuesta
            correcta suma el puntaje indicado; completa todas las preguntas para habilitar la calificación.
          </p>
          <p>
            Las preguntas están alineadas directamente con las competencias y conductas descritas en la síntesis del Decreto 815 de 2018,
            asegurando correspondencia entre la evaluación y la normativa.
          </p>
        </CardContent>
      </Card>

      <Card className="border-white/30 bg-white/80 shadow-lg shadow-primary/15 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">Selecciona la versión de la prueba</CardTitle>
          <CardDescription>
            Cada versión contiene preguntas diferentes basadas en el Decreto 815 de 2018
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedVersion} onValueChange={handleVersionChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="v1" disabled={submitted}>
                Versión 1 ({subject.questions.length} preguntas)
              </TabsTrigger>
              <TabsTrigger value="v2" disabled={submitted}>
                Versión 2 ({behavioralSubjects.find(s => s.id === subject.id)?.questions.length || 4} preguntas)
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {submitted && (
            <p className="text-sm text-muted-foreground mt-3">
              Reinicia la prueba para cambiar de versión
            </p>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        {currentSubject.questions.map((question, index) => {
          const selected = answers[question.id]
          const isCorrect = submitted && selected === question.correctOption
          const showState = submitted && showFeedback

          return (
            <Card
              key={question.id}
              className={`border transition-colors ${
                showState
                  ? isCorrect
                    ? "border-emerald-400/70 bg-emerald-50/70"
                    : selected
                      ? "border-rose-400/70 bg-rose-50/70"
                      : "border-white/20 bg-white/80"
                  : "border-white/20 bg-white/80"
              } shadow-md shadow-primary/10 backdrop-blur`}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-primary/80">Pregunta {index + 1}</p>
                  <span className="rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                    {question.score} pts
                  </span>
                </div>
                <CardTitle className="text-lg font-semibold leading-relaxed text-balance">{question.text}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Selecciona una de las opciones. Cada ítem está formulado con base en las conductas descritas por el decreto.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {question.options.map((option) => {
                  const isSelected = selected === option.value
                  const isOptionCorrect = question.correctOption === option.value
                  const showCorrect = showState && isOptionCorrect
                  const showIncorrect = showState && isSelected && !isOptionCorrect

                  return (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition-all ${
                        isSelected
                          ? "border-primary/60 bg-primary/10 text-primary"
                          : "border-white/40 bg-white/70 hover:border-primary/40 hover:bg-primary/5"
                      } ${submitted ? "pointer-events-none opacity-90" : ""}`}
                    >
                      <span className="flex-1 text-left leading-relaxed">{option.label}</span>
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={isSelected}
                        onChange={() => handleChange(question.id, option.value)}
                        disabled={submitted}
                        className="hidden"
                      />
                      {showCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />}
                      {showIncorrect && <XCircle className="h-5 w-5 text-rose-500" aria-hidden="true" />}
                    </label>
                  )
                })}

                {showState && (
                  <div className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2 text-foreground">
                      <Info className="h-4 w-4 text-primary" />
                      Respuesta correcta:&nbsp;
                      <span className="font-medium text-primary">
                        {
                          question.options.find((option) => option.value === question.correctOption)?.label ??
                          question.correctOption
                        }
                      </span>
                    </p>
                    <p className="mt-2 leading-relaxed">{question.explanation}</p>
                    {selected !== question.correctOption && (
                      <p className="mt-2 rounded-xl border border-amber-300/60 bg-amber-50/80 px-3 py-2 text-sm text-amber-700">
                        {question.review}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={submitted || unanswered.length > 0} className="gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Calcular puntaje
        </Button>
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          disabled={!submitted}
          onClick={() => setShowFeedback((prev) => !prev)}
        >
          <Info className="h-4 w-4" />
          Retroalimentación
        </Button>
        <Button type="button" variant="ghost" className="gap-2" onClick={resetQuiz}>
          <RefreshCw className="h-4 w-4" />
          Intentar nuevamente
        </Button>
      </div>

      {unanswered.length > 0 && !submitted && (
        <div className="rounded-2xl border border-amber-400/60 bg-amber-50/80 px-4 py-3 text-sm text-amber-700">
          Debes responder {unanswered.length} {unanswered.length === 1 ? "pregunta" : "preguntas"} para habilitar la
          calificación.
        </div>
      )}

      {submitted && (
        <div className="space-y-3 rounded-3xl border border-primary/25 bg-primary/10 p-6 text-primary shadow-inner shadow-primary/10">
          <div className="flex items-center gap-3 text-primary">
            <CheckCircle2 className="h-6 w-6" />
            <p className="text-base font-semibold">
              Puntaje obtenido: {score} / {totalScore} puntos ({percentage}%)
            </p>
          </div>
          <p className="text-sm text-primary/80 leading-relaxed">{performanceMessage}</p>
          <p className="text-xs uppercase tracking-wide text-primary/70">
            Consejo: Usa la retroalimentación para contrastar tus respuestas con el Decreto 815 de 2018.
          </p>
        </div>
      )}
    </form>
  )
}
