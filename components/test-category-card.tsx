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
    <Card className="group relative overflow-hidden border-white/20 bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20">
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br ${category.color}`}
      />
      <CardHeader className="relative space-y-4">
        <div className="flex items-center justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg shadow-black/10`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:border-white/60 group-hover:text-white/90">
            {category.subjectsCount} ejes
          </span>
        </div>
        <CardTitle className="text-xl font-semibold transition-colors duration-300 group-hover:text-white">
          {category.title}
        </CardTitle>
        <CardDescription className="text-balance leading-relaxed transition-colors duration-300 group-hover:text-white/85">
          {category.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-muted-foreground transition-colors duration-300 group-hover:text-white/80">
            Plan enfocado en resultados
          </span>
          <Button
            asChild
            size="sm"
            className="gap-2 rounded-full border border-white/30 bg-white/80 px-4 transition-all duration-300 group-hover:border-white/60 group-hover:bg-white/90"
            variant="ghost"
          >
            <Link href={category.href}>
              Ingresar
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
