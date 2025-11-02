import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, type LucideIcon } from "lucide-react"

interface TestCategoryCardProps {
  category: {
    id: string
    title: string
    description: string
    icon: LucideIcon
    subjectsCount: number
    color: string
    href: string
  }
}

export function TestCategoryCard({ category }: TestCategoryCardProps) {
  const Icon = category.icon

  return (
    <Card className="border-border hover:border-primary/50 transition-colors group">
      <CardHeader>
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-xl">{category.title}</CardTitle>
        <CardDescription className="text-balance leading-relaxed">{category.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{category.subjectsCount} ejes temáticos</span>
          <Button asChild variant="ghost" size="sm" className="gap-2 group-hover:gap-3 transition-all">
            <Link href={category.href}>
              Ingresar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
