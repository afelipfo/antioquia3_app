import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center px-6 py-12">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 rounded-[32px] border border-white/10 bg-background/80 p-8 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary shadow-sm shadow-primary/20">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Preparación Oficial Antioquia 3
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
              Centro Virtual de Pruebas
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-balance">
              Practica con las pruebas General, Específica y Comportamental en un entorno diseñado para acelerar tu
              avance dentro del proceso de selección territorial. Accede a recursos guiados y seguimiento inmediato.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/60 p-5 shadow-lg shadow-primary/10 backdrop-blur">
              <p className="text-sm text-muted-foreground">Categorías disponibles</p>
              <p className="mt-2 text-3xl font-semibold">3</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Prueba General
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Prueba Específica
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Prueba Comportamental
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-5 shadow-lg shadow-primary/10 backdrop-blur">
              <p className="text-sm text-primary/80">Progreso sugerido</p>
              <p className="mt-2 text-xl font-semibold text-primary">Planifica sesiones de 40 minutos</p>
              <p className="mt-4 text-sm text-primary/80">
                Alterna entre ejes temáticos y registra tus avances diarios para mantener un ritmo sostenible.
              </p>
            </div>
          </div>
        </div>

        <LoginForm />
      </div>
      <div className="pointer-events-none absolute inset-x-4 inset-y-20 rounded-[40px] border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-primary/10" />
    </div>
  )
}
