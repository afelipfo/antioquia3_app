import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">Centro Virtual de Pruebas</h1>
          <p className="text-muted-foreground text-balance">Proceso de Selección Antioquia 3</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
