import { Clock, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TestTimerProps {
  formattedTime: string
  timeColor: string
  percentageRemaining: number
}

export function TestTimer({ formattedTime, timeColor, percentageRemaining }: TestTimerProps) {
  const isLowTime = percentageRemaining <= 20

  return (
    <Alert className={`border ${
      isLowTime
        ? "border-red-500 bg-red-50"
        : percentageRemaining <= 50
        ? "border-yellow-500 bg-yellow-50"
        : "border-green-500 bg-green-50"
    }`}>
      <div className="flex items-center gap-3">
        {isLowTime ? (
          <AlertTriangle className="h-5 w-5 text-red-600 animate-pulse" />
        ) : (
          <Clock className="h-5 w-5" />
        )}
        <div className="flex-1">
          <AlertDescription className="flex items-center justify-between">
            <span className="font-medium">
              {isLowTime ? "⚠️ Tiempo casi agotado" : "Tiempo restante"}
            </span>
            <span className={`text-2xl font-bold ${timeColor}`}>
              {formattedTime}
            </span>
          </AlertDescription>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                isLowTime
                  ? "bg-red-500"
                  : percentageRemaining <= 50
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${percentageRemaining}%` }}
            />
          </div>
        </div>
      </div>
    </Alert>
  )
}
