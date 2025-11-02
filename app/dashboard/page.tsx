import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { TestCategoryCard } from "@/components/test-category-card"
import { FileText, Users, Brain, Clock, Sparkles, Target } from "lucide-react"

const testCategories = [
  {
    id: "general",
    title: "Prueba General",
    description: "Evaluación de conocimientos generales en gestión pública territorial",
    icon: FileText,
    subjectsCount: 3,
    color: "from-blue-500 to-blue-600",
    href: "/tests/general",
  },
  {
    id: "specific",
    title: "Prueba Específica",
    description: "Evaluación de competencias técnicas y profesionales específicas",
    icon: Brain,
    subjectsCount: 8,
    color: "from-emerald-500 to-emerald-600",
    href: "/tests/specific",
  },
  {
    id: "behavioral",
    title: "Prueba Comportamental",
    description: "Evaluación de competencias comportamentales y habilidades blandas",
    icon: Users,
    subjectsCount: 10,
    color: "from-violet-500 to-violet-600",
    href: "/tests/behavioral",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10">
        <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/80 p-8 shadow-[0_35px_90px_-40px_rgba(15,25,40,0.55)] backdrop-blur">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsla(217,92%,62%,0.22),transparent_60%),radial-gradient(circle_at_bottom_left,hsla(202,84%,68%,0.18),transparent_55%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                <Sparkles className="h-4 w-4" />
                Bienvenida, Angela
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight text-balance sm:text-5xl">
                  Avanza con seguridad en el proceso Antioquia 3
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-balance">
                  Selecciona la categoría que necesitas reforzar y trabaja sobre los ejes temáticos clave. Cada prueba
                  contiene recursos guiados para consolidar tu preparación territorial.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {testCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={category.href}
                    className={`rounded-full border border-white/20 bg-gradient-to-r ${category.color} px-4 py-1.5 text-sm font-medium text-white/90 shadow-sm shadow-black/10 transition-all duration-300 hover:-translate-y-[1px] hover:text-white hover:shadow-lg hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-white/20 bg-white/80 p-6 shadow-inner shadow-primary/10">
                <div className="flex items-center gap-3 text-primary">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Sesión sugerida</span>
                </div>
                <div className="space-y-2 pt-6">
                  <p className="text-3xl font-semibold text-foreground">40 min</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Dedica intervalos concentrados y registra los hallazgos clave de cada ejercicio.
                  </p>
                </div>
              </div>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-primary/30 bg-primary/10 p-6 shadow-inner shadow-primary/10">
                <div className="flex items-center gap-3 text-primary">
                  <Target className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Próximo paso</span>
                </div>
                <div className="space-y-2 pt-6">
                  <p className="text-lg font-medium text-primary">
                    Inicia con la Prueba General para obtener una visión integral antes de especializarte.
                  </p>
                  <p className="text-sm text-primary/80">Continúa con los módulos específicos y refuerza con la prueba comportamental.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Perfil a Aspirar Section */}
        <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/75 p-8 shadow-lg shadow-primary/15 backdrop-blur">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(215,90%,70%,0.16),transparent_60%)]" />
          <div className="relative space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Perfil a Aspirar</h2>
              <p className="text-sm text-muted-foreground">OPEC 201834</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Identificación del empleo */}
              <div className="space-y-3 rounded-2xl border border-white/20 bg-white/80 p-6 shadow-inner shadow-primary/10">
                <h3 className="text-lg font-semibold text-foreground">Identificación del Empleo</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Código interno:</span>
                    <span className="font-medium">21902924</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nivel:</span>
                    <span className="font-medium">Profesional</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Denominación:</span>
                    <span className="font-medium">Profesional Universitario</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Código y grado:</span>
                    <span className="font-medium">219 – grado 02</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Número de plazas:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Naturaleza:</span>
                    <span className="font-medium">Carrera administrativa</span>
                  </div>
                </div>
              </div>

              {/* Área funcional */}
              <div className="space-y-3 rounded-2xl border border-primary/25 bg-primary/10 p-6 shadow-inner shadow-primary/10">
                <h3 className="text-lg font-semibold text-foreground">Área Funcional y Propósito</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-primary">Área funcional:</span>
                    <p className="text-muted-foreground mt-1">Secretaría de Infraestructura Física</p>
                  </div>
                  <div>
                    <span className="font-medium text-primary">Propósito principal:</span>
                    <p className="text-muted-foreground mt-1">
                      Contribuir al desarrollo de los planes, programas y proyectos de la Secretaría, aplicando
                      conocimientos profesionales que permitan mejorar continuamente los procesos y objetivos
                      misionales, estratégicos y de apoyo, conforme a la normativa vigente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Funciones esenciales */}
            <div className="space-y-3 rounded-2xl border border-white/20 bg-white/80 p-6 shadow-inner shadow-primary/10">
              <h3 className="text-lg font-semibold text-foreground">Funciones Esenciales</h3>
              <div className="grid gap-3 text-sm md:grid-cols-2">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Analizar información de procesos relacionados con políticas de infraestructura física de uso público.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Analizar y responder requerimientos sobre estudios, diseños, construcción y mantenimiento de equipamientos colectivos.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Desarrollar estudios y elaborar instrumentos para diseño, construcción y mantenimiento de infraestructura física.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Diseñar indicadores de gestión utilizando bases de datos y aplicativos de la dependencia.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Emitir conceptos y brindar orientación técnica en trámites y elaboración de estudios y proyectos.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Elaborar diseños de pequeñas soluciones hidráulicas o sanitarias para la malla vial.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Elaborar y analizar estudios hidrológicos como insumo para diseños hidráulicos.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Preparar conceptos técnicos sobre diseños hidrológicos e hidráulicos para obras de vías y espacio público.</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Ejecutar y evaluar planes, programas y proyectos de infraestructura física de uso público.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Proponer soluciones a problemas causados por aguas de escorrentía superficial o subsuperficial.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Participar en procesos de contratación y supervisar contratos asignados.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Dar respuesta a derechos de petición, PQRSD y requerimientos de entes de control.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Coordinar con dependencias internas y externas la definición del diseño de infraestructura física.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Contribuir a la implementación del Sistema Integral de Gestión y de Seguridad y Salud en el Trabajo.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Adoptar los valores de la función pública y seguir el Código de Integridad.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Ejecutar las demás funciones asignadas de acuerdo con el nivel y naturaleza del cargo.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Conocimientos esenciales */}
              <div className="space-y-3 rounded-2xl border border-white/20 bg-white/80 p-6 shadow-inner shadow-primary/10">
                <h3 className="text-lg font-semibold text-foreground">Conocimientos Básicos o Esenciales</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Supervisión de obras públicas</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Programación y control de obras de mantenimiento</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Elaboración de presupuestos de proyectos</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Criterios de diseño y construcción de infraestructura pública</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Atención al usuario</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Código Disciplinario Único</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Contratación estatal</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Formulación de proyectos</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Herramientas tecnológicas computacionales</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Sistema Integrado de Gestión de Calidad</span>
                  </li>
                </ul>
              </div>

              {/* Competencias comportamentales */}
              <div className="space-y-3 rounded-2xl border border-primary/25 bg-primary/10 p-6 shadow-inner shadow-primary/10">
                <h3 className="text-lg font-semibold text-foreground">Competencias Comportamentales</h3>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Aprendizaje continuo</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Aporte técnico-profesional</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Orientación a resultados</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Orientación al usuario</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Compromiso organizacional</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Trabajo en equipo</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Adaptación al cambio</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Responsabilidad social</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Promoción de ciudadanía</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Comunicación efectiva</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Gestión de procedimientos</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Instrumentación de decisiones</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Experticia profesional</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Aprendizaje autónomo</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Creatividad e innovación</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Trabajo colaborativo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Requisitos */}
            <div className="space-y-3 rounded-2xl border border-white/20 bg-white/80 p-6 shadow-inner shadow-primary/10">
              <h3 className="text-lg font-semibold text-foreground">Requisitos de Formación Académica y Experiencia</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="font-medium text-foreground">Formación académica:</span>
                  <p className="text-muted-foreground mt-1">
                    Título profesional en disciplinas del Núcleo Básico del Conocimiento en <strong>Arquitectura</strong> o{" "}
                    <strong>Ingeniería Civil y afines</strong>; título de formación profesional en Arquitectura, Construcción,
                    Construcción en Arquitectura e Ingeniería, Ingeniería Civil o Construcciones Civiles; y tarjeta profesional
                    cuando la ley así lo exija.
                  </p>
                </div>
                <div>
                  <span className="font-medium text-foreground">Experiencia:</span>
                  <p className="text-muted-foreground mt-1">
                    Mínimo <strong>catorce (14) meses</strong> de experiencia profesional relacionada.
                  </p>
                </div>
                <div>
                  <span className="font-medium text-foreground">Equivalencias:</span>
                  <p className="text-muted-foreground mt-1">
                    Se acepta título de <strong>posgrado</strong> en cualquier modalidad en áreas relacionadas con las funciones del cargo,
                    y en este caso no se exige experiencia.
                  </p>
                </div>
              </div>
            </div>

            {/* Base legal */}
            <div className="rounded-2xl border border-primary/25 bg-primary/10 px-6 py-4">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Base legal:</span> Resolución 202250086636 del 27 de julio de 2022
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testCategories.map((category, index) => (
            <div
              key={category.id}
              className="animate-in fade-in slide-in-from-bottom-6"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <TestCategoryCard category={category} />
            </div>
          ))}
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/75 p-8 shadow-lg shadow-primary/15 backdrop-blur">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(215,90%,70%,0.16),transparent_60%)]" />
          <div className="relative grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Información del Proceso</h2>
              <p className="text-muted-foreground text-balance leading-relaxed">
                Este centro virtual te permite practicar y prepararte para el Proceso de Selección Antioquia 3. Recorre
                cada categoría, revisa los ejes temáticos y registra tus avances al finalizar cada sesión para mantener
                una ruta clara de progreso.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/20 bg-white/80 p-5 shadow-inner shadow-primary/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recomendaciones</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>Ordena las sesiones por prioridad institucional.</li>
                  <li>Identifica fortalezas y oportunidades por eje.</li>
                  <li>Solicita retroalimentación con tu equipo.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/25 bg-primary/10 p-5 shadow-inner shadow-primary/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">Recuerda</p>
                <p className="mt-2 text-sm text-primary/80">
                  Mantén una bitácora de prácticas y resume aprendizajes clave al finalizar cada bloque de preguntas.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
