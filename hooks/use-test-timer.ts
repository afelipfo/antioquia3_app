import { useState, useEffect, useCallback } from "react"

interface UseTestTimerProps {
  totalQuestions: number
  timePerQuestion?: number // en segundos, default 120 (2 minutos)
  onTimeUp: () => void
  isActive: boolean
}

export function useTestTimer({
  totalQuestions,
  timePerQuestion = 120,
  onTimeUp,
  isActive
}: UseTestTimerProps) {
  const totalTime = totalQuestions * timePerQuestion
  const [timeRemaining, setTimeRemaining] = useState(totalTime)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, onTimeUp])

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  const getTimeColor = useCallback((): string => {
    const percentageRemaining = (timeRemaining / totalTime) * 100
    if (percentageRemaining > 50) return "text-green-600"
    if (percentageRemaining > 20) return "text-yellow-600"
    return "text-red-600"
  }, [timeRemaining, totalTime])

  const resetTimer = useCallback(() => {
    setTimeRemaining(totalTime)
  }, [totalTime])

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    timeColor: getTimeColor(),
    resetTimer,
    percentageRemaining: (timeRemaining / totalTime) * 100
  }
}
