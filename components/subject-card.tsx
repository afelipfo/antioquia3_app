import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"

interface SubjectCardProps {
  subject: {
    id: string
    title: string
    description: string
    questionsCount: number
  }
  testType: "general" | "specific" | "behavioral"
}

export function SubjectCard({ subject, testType }: SubjectCardProps) {
  return (
    <Card className="border-border hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg text-balance">{subject.title}</CardTitle>
        <CardDescription className="text-balance leading-relaxed">{subject.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {subject.questionsCount > 0 ? `${subject.questionsCount} preguntas` : "Contenido pendiente"}
          </span>
          <Button asChild size="sm" className="gap-2">
            <Link href={`/tests/${testType}/${subject.id}`}>
              <PlayCircle className="h-4 w-4" />
              Iniciar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
