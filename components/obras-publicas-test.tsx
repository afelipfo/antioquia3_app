"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, HardHat } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTestTimer } from "@/hooks/use-test-timer"
import { TestTimer } from "@/components/test-timer"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  points: number
  explanation: string
  topic: string
}

const questionsV1: Question[] = [
  // PROCESOS CONSTRUCTIVOS (4 preguntas)
  {
    id: 1,
    question: "En la construcción de pavimentos flexibles, la compactación de la capa de base granular debe alcanzar como mínimo:",
    options: [
      "85% del ensayo Proctor Modificado",
      "95% del ensayo Proctor Modificado",
      "100% del ensayo Proctor Estándar",
      "90% del ensayo CBR"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Según las especificaciones INVIAS, la compactación de la base granular debe alcanzar mínimo el 95% de la densidad máxima obtenida en el ensayo Proctor Modificado (norma INV E-142). Esto garantiza la resistencia y durabilidad del pavimento.",
    topic: "Compactación de bases"
  },
  {
    id: 2,
    question: "El control de calidad del concreto en obra se realiza mediante ensayos de:",
    options: [
      "Solo inspección visual",
      "Resistencia a la compresión en cilindros a 7, 14 y 28 días",
      "Únicamente peso volumétrico",
      "Solo medición de asentamiento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El control de calidad del concreto incluye: ensayos de resistencia a la compresión en cilindros (norma NTC 673) tomados a 7, 14 y 28 días; asentamiento (slump) según NTC 396; temperatura; y contenido de aire. La resistencia a 28 días es el parámetro de aceptación principal.",
    topic: "Control de calidad del concreto"
  },
  {
    id: 3,
    question: "El libro o bitácora de obra es un documento que:",
    options: [
      "Es opcional y solo se usa en proyectos grandes",
      "Registra cronológicamente todos los eventos relevantes de la obra: actividades, novedades, órdenes, cambios, condiciones climáticas y visitas",
      "Solo documenta los pagos realizados",
      "Únicamente registra accidentes laborales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La bitácora de obra es obligatoria en proyectos de infraestructura pública (Ley 400/1997, NSR-10). Debe registrar diariamente: actividades ejecutadas, personal y equipos, condiciones climáticas, órdenes del interventor/supervisor, novedades, cambios, visitas de entidades, y cualquier evento relevante. Tiene valor legal.",
    topic: "Bitácora de obra"
  },
  {
    id: 4,
    question: "En el proceso de fabricación de mezclas asfálticas en caliente, la temperatura de mezclado del asfalto debe estar entre:",
    options: [
      "50°C - 80°C",
      "140°C - 165°C",
      "200°C - 250°C",
      "100°C - 120°C"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Según especificaciones INVIAS (Artículo 450), las mezclas asfálticas en caliente requieren temperaturas de mezclado entre 140°C y 165°C, y de compactación entre 125°C y 145°C. Estas temperaturas aseguran la trabajabilidad del asfalto y la adherencia con los agregados.",
    topic: "Mezclas asfálticas"
  },

  // MANTENIMIENTO (4 preguntas)
  {
    id: 5,
    question: "El mantenimiento rutinario de vías comprende actividades como:",
    options: [
      "Reconstrucción total del pavimento",
      "Limpieza de cunetas, desmonte de vegetación, bacheo menor, limpieza de alcantarillas y señalización",
      "Ampliación de la calzada",
      "Construcción de nuevos puentes"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El mantenimiento rutinario (INVIAS) incluye actividades frecuentes y de bajo costo para preservar la vía: limpieza de obras de drenaje, control de vegetación, bacheo superficial menor, reparación de señales, limpieza de derrumbes menores. Se ejecuta periódicamente (mensual, trimestral).",
    topic: "Mantenimiento rutinario"
  },
  {
    id: 6,
    question: "El mantenimiento preventivo de pavimentos incluye actividades como:",
    options: [
      "Esperar a que aparezcan fallas graves",
      "Sello de fisuras, tratamientos superficiales, micro-pavimentos y sobre-capas asfálticas delgadas",
      "Solo pintura de señalización",
      "Demolición y reconstrucción total"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El mantenimiento preventivo se aplica antes de que aparezcan fallas estructurales graves. Incluye: sello de fisuras y grietas, tratamientos superficiales (TSS), micro-pavimentos (slurry seal), capas de refuerzo delgadas, y rejuvenecedores de asfalto. Extiende significativamente la vida útil del pavimento.",
    topic: "Mantenimiento preventivo"
  },
  {
    id: 7,
    question: "La programación del mantenimiento vial debe basarse en:",
    options: [
      "Únicamente en el presupuesto disponible",
      "Inventarios viales, evaluación del estado del pavimento (PCI, IRI), volúmenes de tráfico y análisis de costo-beneficio",
      "Solo en quejas de la comunidad",
      "Decisiones políticas sin criterios técnicos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La programación técnica de mantenimiento vial requiere: inventario actualizado de la red vial, evaluación de condición del pavimento (PCI - Pavement Condition Index, IRI - International Roughness Index), aforos de tráfico (TPD), análisis económico (costo-beneficio), y priorización según estado y importancia de las vías.",
    topic: "Programación de mantenimiento"
  },
  {
    id: 8,
    question: "El Índice de Condición del Pavimento (PCI) es:",
    options: [
      "Una medida solo del color del pavimento",
      "Un indicador numérico (0-100) que califica el estado del pavimento según tipo, severidad y cantidad de fallas",
      "Únicamente cuenta el número de baches",
      "Solo mide el espesor del pavimento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El PCI (ASTM D6433) es un índice numérico de 0 a 100 que califica la condición superficial del pavimento. Evalúa 19 tipos de fallas (fisuras, deformaciones, pérdida de material) según severidad (baja, media, alta) y extensión. PCI 100 = Excelente; PCI 0 = Fallado. Sirve para programar mantenimiento.",
    topic: "PCI - Índice de Condición"
  },

  // HIDRÁULICA Y DRENAJE (5 preguntas)
  {
    id: 9,
    question: "El diseño de alcantarillas en vías debe considerar:",
    options: [
      "Solo el ancho de la vía",
      "Periodo de retorno (10-50 años), área de cuenca, tiempo de concentración, intensidad de lluvia, caudal de diseño y pendiente longitudinal",
      "Únicamente el costo de los materiales",
      "Solo la profundidad de instalación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El diseño hidráulico de alcantarillas (Manual de Drenaje INVIAS) requiere: definir periodo de retorno según importancia de la vía (10-50 años), delimitar cuenca de drenaje, calcular tiempo de concentración, determinar intensidad de lluvia con curvas IDF, calcular caudal con método racional, y diseñar sección hidráulica con ecuación de Manning.",
    topic: "Diseño de alcantarillas"
  },
  {
    id: 10,
    question: "Las cunetas en carreteras tienen como función principal:",
    options: [
      "Servir como estacionamiento",
      "Recolectar y conducir las aguas lluvias de la calzada y taludes hacia estructuras de desagüe, evitando erosión e infiltración en el pavimento",
      "Solo decoración de la vía",
      "Almacenar materiales de construcción"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las cunetas (INVIAS) captan y evacúan el agua lluvia de la superficie de rodadura y taludes superiores, evitando: erosión de la subrasante, infiltración que debilite el pavimento, y encharcamientos. Pueden ser triangulares, trapezoidales o rectangulares, revestidas o sin revestir, según caudal y velocidad.",
    topic: "Cunetas de drenaje"
  },
  {
    id: 11,
    question: "El método racional para calcular caudales de escorrentía se expresa como:",
    options: [
      "Q = A × V",
      "Q = C × I × A / 360 (donde Q en L/s, C coeficiente escorrentía, I intensidad mm/h, A área hectáreas)",
      "Q = P × E",
      "Q = D / T"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El método racional (Q = C·I·A/360) es usado para cuencas pequeñas (< 5 km²). Q = caudal en L/s; C = coeficiente de escorrentía (0.05-0.95 según cobertura); I = intensidad de lluvia en mm/h para el tiempo de concentración y periodo de retorno; A = área de cuenca en hectáreas. Factor 360 convierte unidades.",
    topic: "Método racional de caudal"
  },
  {
    id: 12,
    question: "Para evitar la erosión en descargas de alcantarillas se debe:",
    options: [
      "No hacer nada adicional",
      "Construir disipadores de energía, enrocados de protección, transiciones adecuadas, y revegetalizar zonas descubiertas",
      "Solo colocar señalización",
      "Únicamente pintar la estructura"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La protección contra erosión en salidas de alcantarillas requiere: diseño de disipadores de energía (escalones, pantallas), enrocado de protección en la descarga, transiciones graduales, control de velocidad de flujo, y revegetalización de taludes. Esto evita socavación, erosión regresiva y daños al terraplén.",
    topic: "Control de erosión"
  },
  {
    id: 13,
    question: "El tiempo de concentración (Tc) de una cuenca hidrográfica es:",
    options: [
      "El tiempo que tarda en llover",
      "El tiempo que tarda el agua en viajar desde el punto más alejado de la cuenca hasta el punto de salida o desagüe",
      "La duración total de la tormenta",
      "El tiempo de construcción de la obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El tiempo de concentración es el tiempo que tarda una gota de agua en recorrer desde el punto hidrológicamente más alejado de la cuenca hasta el punto de salida. Se calcula con fórmulas como Kirpich, California Culverts Practice, o SCS. Es fundamental para determinar la intensidad de lluvia en el diseño hidrológico.",
    topic: "Tiempo de concentración"
  },

  // SEGURIDAD EN CONSTRUCCIÓN (2 preguntas)
  {
    id: 14,
    question: "Durante la ejecución de obras viales en vías en servicio, se debe implementar:",
    options: [
      "Ninguna medida especial",
      "Plan de Manejo de Tráfico (PMT) con señalización preventiva, informativa y reglamentaria; dispositivos de canalización; personal de bandereo; y horarios restringidos si aplica",
      "Solo cerrar completamente la vía",
      "Únicamente colocar una señal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El Plan de Manejo de Tráfico (Resolución 1050/2004 Min Transporte, Manual de Señalización INVIAS) es obligatorio en obras viales. Debe incluir: señalización temporal adecuada, desvíos seguros, protección de trabajadores y usuarios, bandereros certificados, y coordinación con autoridades de tránsito. Reduce accidentalidad.",
    topic: "Plan de Manejo de Tráfico"
  },
  {
    id: 15,
    question: "Los elementos de protección personal (EPP) mínimos obligatorios en obras de construcción son:",
    options: [
      "Solo uniformes",
      "Casco, botas de seguridad, chaleco reflectivo, guantes, y protección específica según riesgo (gafas, protección auditiva, arnés)",
      "Únicamente el casco",
      "Solo ropa cómoda"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La Resolución 0312/2019 y el SG-SST obligan el uso de EPP: casco clase G, botas con puntera de acero, chaleco reflectivo, guantes según tarea. Adicional según exposición: gafas de seguridad, protección auditiva (>85 dB), protección respiratoria (polvo, químicos), arnés (trabajo en alturas >1.5m). El empleador debe suministrar y capacitar en uso.",
    topic: "EPP en construcción"
  }
]

const questionsV2: Question[] = [
  // PROCESOS CONSTRUCTIVOS (4 preguntas)
  {
    id: 16,
    question: "El ensayo Marshall para mezclas asfálticas determina:",
    options: [
      "Solo el color de la mezcla",
      "La estabilidad, flujo, vacíos en la mezcla, vacíos en el agregado mineral (VMA), y contenido óptimo de asfalto",
      "Únicamente la temperatura",
      "Solo el peso de la mezcla"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El método Marshall (norma INV E-748, ASTM D1559) es el ensayo estándar para diseño de mezclas asfálticas. Determina: estabilidad (resistencia a deformación), flujo (deformación bajo carga), % vacíos (2-5%), VMA (vacíos en agregado mineral >13-15%), y contenido óptimo de asfalto. Se fabrica a temperatura controlada y se compacta con 50 o 75 golpes.",
    topic: "Ensayo Marshall"
  },
  {
    id: 17,
    question: "El curado del concreto debe realizarse durante al menos:",
    options: [
      "1 día",
      "7 días para concretos convencionales y 14 días para elementos estructurales importantes",
      "Solo hasta que endurezca superficialmente",
      "No es necesario curar el concreto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El curado (NSR-10 C.5.11, NTC 3318) debe mantener humedad y temperatura adecuada mínimo 7 días para concretos normales, 14 días para estructuras críticas, y hasta 21 días para concretos de baja relación agua/cemento. Métodos: aspersión de agua, membranas de curado, o mantas húmedas. Garantiza hidratación completa del cemento y resistencia óptima.",
    topic: "Curado del concreto"
  },
  {
    id: 18,
    question: "El control de compactación en terraplenes se verifica mediante:",
    options: [
      "Solo observación visual",
      "Ensayos de densidad en campo (cono de arena, densómetro nuclear) comparados con densidad de laboratorio Proctor, buscando ≥95% de compactación",
      "Únicamente se pesa el material",
      "No requiere control"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El control de compactación (INVIAS Art. 220) requiere: ensayos de densidad in-situ cada 250-500 m³ mediante cono de arena (INV E-161) o densómetro nuclear (INV E-164), comparados con densidad máxima Proctor Modificado de laboratorio. Se requiere ≥95% de compactación. También se verifica humedad óptima ±2%.",
    topic: "Control de compactación"
  },
  {
    id: 19,
    question: "La granulometría de agregados para concreto se determina mediante:",
    options: [
      "Solo medición visual",
      "Análisis por tamizado en serie de tamices normalizados (ASTM) desde 3\" hasta tamiz No. 200, calculando porcentajes retenidos y pasantes",
      "Únicamente se pesa el material",
      "Solo se mide el tamaño máximo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El análisis granulométrico (NTC 77, ASTM C136) usa serie de tamices: 3\", 2\", 1½\", 1\", ¾\", ½\", 3/8\", No.4, No.8, No.16, No.30, No.50, No.100, No.200. Se calcula % retenido, % retenido acumulado, % pasante, y módulo de finura. Debe cumplir husos granulométricos según aplicación.",
    topic: "Granulometría de agregados"
  },

  // MANTENIMIENTO (3 preguntas)
  {
    id: 20,
    question: "El mantenimiento correctivo de pavimentos se aplica cuando:",
    options: [
      "El pavimento está en perfecto estado",
      "Ya existen fallas evidentes (baches, fisuras severas, deformaciones) que requieren reparación inmediata para evitar deterioro acelerado",
      "Solo para cumplir presupuesto",
      "Cada 10 años automáticamente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El mantenimiento correctivo atiende fallas ya manifestadas: bacheo profundo, parcheo de áreas deterioradas, reparación de fisuras severas, corrección de deformaciones, reconstrucción de bermas. Es reactivo y más costoso que el preventivo. Se programa según inspecciones y reportes de daños.",
    topic: "Mantenimiento correctivo"
  },
  {
    id: 21,
    question: "Un inventario vial debe incluir:",
    options: [
      "Solo la longitud de las vías",
      "Longitud, ancho, tipo de superficie, estado del pavimento, obras de drenaje, señalización, puentes, túneles, coordenadas GPS, TPD y clasificación funcional",
      "Únicamente fotografías",
      "Solo el nombre de las vías"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El inventario vial registra: características geométricas (longitud, ancho, radios), tipo de pavimento y estado (PCI, IRI), inventario de señales y demarcación, puentes y túneles con estado, obras de drenaje, TPD y composición vehicular, georreferenciación, derecho de vía, y priorización. Es la base para planificar mantenimiento.",
    topic: "Inventario vial"
  },
  {
    id: 22,
    question: "La rehabilitación de un pavimento implica:",
    options: [
      "Solo pintar la superficie",
      "Intervención mayor que restaura la capacidad estructural: puede incluir fresado, refuerzo estructural, reconstrucción de capas, nuevo diseño de pavimento",
      "Únicamente limpieza",
      "Solo reparación de señales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La rehabilitación (INVIAS) es una intervención mayor cuando el pavimento ha alcanzado el final de su vida útil o presenta daños estructurales severos. Incluye: evaluación estructural (deflectometría), fresado de capas deterioradas, reparación de base/subbase si necesario, refuerzo estructural, y nueva carpeta asfáltica. Restaura nivel de servicio por 10-20 años más.",
    topic: "Rehabilitación de pavimento"
  },

  // HIDRÁULICA Y DRENAJE (5 preguntas)
  {
    id: 23,
    question: "El coeficiente de escorrentía (C) en el método racional depende de:",
    options: [
      "Solo el tamaño de la cuenca",
      "Tipo de cobertura del suelo, pendiente, tipo de suelo, uso del suelo (impermeabilización). Varía de 0.05 (bosque) a 0.95 (asfalto)",
      "Únicamente la temperatura",
      "Solo la altitud"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El coeficiente de escorrentía C representa la fracción de lluvia que se convierte en escorrentía superficial. Valores típicos: bosque denso 0.05-0.20; pastizales 0.10-0.35; cultivos 0.20-0.50; áreas urbanas residenciales 0.30-0.70; zonas comerciales 0.70-0.95; asfalto/concreto 0.85-0.95. Depende de: permeabilidad del suelo, pendiente, cobertura vegetal, y grado de impermeabilización.",
    topic: "Coeficiente de escorrentía"
  },
  {
    id: 24,
    question: "Las curvas IDF (Intensidad-Duración-Frecuencia) se utilizan para:",
    options: [
      "Diseñar solamente puentes",
      "Determinar la intensidad de lluvia de diseño para un periodo de retorno y duración específicos, esencial en diseño de drenajes",
      "Solo medir temperatura",
      "Calcular costos de obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las curvas IDF relacionan la intensidad de precipitación (mm/h) con la duración del evento (minutos u horas) y la frecuencia o periodo de retorno (años). Son específicas de cada región geográfica. Se usan para encontrar la intensidad de diseño conociendo el Tc y el periodo de retorno requerido. IDEAM publica IDF para Colombia.",
    topic: "Curvas IDF"
  },
  {
    id: 25,
    question: "Los sumideros o tragantes en vías urbanas deben ubicarse:",
    options: [
      "En cualquier lugar sin criterio",
      "En puntos bajos, antes de intersecciones, cambios de pendiente, y espaciados según capacidad hidráulica y caudal de escorrentía (típicamente cada 30-60m)",
      "Solo en las esquinas",
      "Únicamente cada 200 metros"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los sumideros captan agua lluvia superficial de calzadas. Ubicación estratégica: puntos bajos, antes de cruces peatonales e intersecciones (evitar encharcamientos), cambios de pendiente, y espaciamiento según cálculo hidráulico (30-60m típico, menor en zonas comerciales). Tipos: sumidero de ventana, de reja, o mixto. Requieren sedimentadores.",
    topic: "Sumideros urbanos"
  },
  {
    id: 26,
    question: "Para el diseño de canales abiertos se utiliza la ecuación de Manning:",
    options: [
      "Q = A × C",
      "Q = (1/n) × A × R^(2/3) × S^(1/2), donde n es coeficiente de rugosidad, A área, R radio hidráulico, S pendiente",
      "Q = V / T",
      "Q = P × L"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La ecuación de Manning calcula la velocidad y caudal en flujo a superficie libre: V = (1/n) × R^(2/3) × S^(1/2); Q = V × A. Donde: n = rugosidad de Manning (0.010-0.035 para concreto, 0.025-0.15 para canales naturales); R = A/P (radio hidráulico); S = pendiente longitudinal; A = área mojada; P = perímetro mojado.",
    topic: "Ecuación de Manning"
  },
  {
    id: 27,
    question: "El drenaje subterráneo (subdrenaje) en carreteras tiene como objetivo:",
    options: [
      "Solo ahorrar costos",
      "Captar y evacuar agua del subsuelo y capas del pavimento para evitar saturación, pérdida de capacidad portante, y daños por bombeo",
      "Únicamente decoración",
      "Almacenar agua"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El subdrenaje (filtros, drenes, capas drenantes) controla el agua freática y la infiltrada en el pavimento. Evita: saturación de la subrasante (pérdida de CBR), bombeo de finos, erosión interna, y daños por congelamiento en climas fríos. Se diseña con geotextiles filtrantes, material granular drenante, y tuberías perforadas con pendiente de salida.",
    topic: "Subdrenaje en carreteras"
  },

  // SEGURIDAD EN CONSTRUCCIÓN (3 preguntas)
  {
    id: 28,
    question: "El Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST) es:",
    options: [
      "Opcional en obras pequeñas",
      "Obligatorio para todos los empleadores (Ley 1562/2012, Decreto 1072/2015), requiere: política SST, identificación de peligros, controles, capacitación, auditorías y mejora continua",
      "Solo para empresas extranjeras",
      "Únicamente un documento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El SG-SST es obligatorio para todas las empresas en Colombia. Debe implementar el ciclo PHVA: Planear (política, objetivos, identificación de peligros, evaluación de riesgos), Hacer (controles, capacitación, preparación para emergencias), Verificar (medición, auditorías), Actuar (mejora continua). Resolución 0312/2019 establece estándares mínimos.",
    topic: "SG-SST"
  },
  {
    id: 29,
    question: "La señalización temporal en zonas de trabajo debe incluir:",
    options: [
      "Solo una señal de 'Hombres trabajando'",
      "Señales preventivas (distancia 90-200m según velocidad), informativas (30m), reglamentarias, dispositivos de canalización (conos, barreras, delineadores), y elementos luminosos en horario nocturno",
      "Únicamente pintura en el suelo",
      "No requiere señalización"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Manual de Señalización INVIAS y Resolución 1050/2004 establecen: señales preventivas (SP-47 'Trabajos en la vía') a distancia según velocidad (90-200m); señales informativas (30m antes); señales reglamentarias de velocidad máxima; dispositivos de canalización (conos H=71cm espaciados 3-6m, barreras tipo III); elementos reflectivos y luces en horario nocturno; bandereros con paletas PARE-SIGA.",
    topic: "Señalización temporal"
  },
  {
    id: 30,
    question: "El Plan de Gestión Integral de Residuos de Construcción y Demolición (PGIR-CD) debe contemplar:",
    options: [
      "Botar todo en cualquier lugar",
      "Reducción en origen, separación en sitio, reutilización, reciclaje, transporte adecuado, disposición final autorizada, y documentación de cantidades y destinos",
      "Solo barrer la obra al final",
      "Quemar todos los residuos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La Resolución 0472/2017 del MADS regula la gestión de RCD. El plan debe incluir: estimación de cantidades, clasificación (aprovechables: concreto, asfalto, metales, madera; no aprovechables), reducción en origen, separación en obra, acopio temporal adecuado, aprovechamiento/reciclaje, transporte con vehículos autorizados, disposición solo en sitios licenciados, y registro de cantidades (PGIR-CD certificado).",
    topic: "Gestión de RCD"
  }
]

export function ObrasPublicasTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [activeTab, setActiveTab] = useState("v1")

  const currentQuestions = activeTab === "v1" ? questionsV1 : questionsV2

  const handleSubmit = () => {
    setShowResults(true)
    setShowFeedback(true)
  }

  const timer = useTestTimer({
    totalQuestions: currentQuestions.length,
    timePerQuestion: 120,
    onTimeUp: handleSubmit,
    isActive: !showResults
  })

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex })
  }

  const calculateScore = () => {
    let totalPoints = 0
    let earnedPoints = 0

    currentQuestions.forEach((q) => {
      totalPoints += q.points
      if (answers[q.id] === q.correctAnswer) {
        earnedPoints += q.points
      }
    })

    return { earnedPoints, totalPoints, percentage: (earnedPoints / totalPoints) * 100 }
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const score = showResults ? calculateScore() : { earnedPoints: 0, totalPoints: 0, percentage: 0 }

  return (
    <div className="space-y-6">
      {!showResults && (
        <TestTimer
          formattedTime={timer.formattedTime}
          timeColor={timer.timeColor}
          percentageRemaining={timer.percentageRemaining}
        />
      )}

      <div className="flex items-center gap-3">
        <HardHat className="h-8 w-8 text-orange-600" />
        <div>
          <h2 className="text-2xl font-bold">Obras Públicas e Hidráulica</h2>
          <p className="text-sm text-muted-foreground">
            Procesos constructivos, mantenimiento vial, hidráulica y drenaje, y seguridad en construcción
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value)
        handleReset()
      }}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="v1">Versión 1 (15 preguntas)</TabsTrigger>
          <TabsTrigger value="v2">Versión 2 (15 preguntas)</TabsTrigger>
        </TabsList>

        <TabsContent value="v1" className="space-y-6 mt-6">
          {questionsV1.map((q) => (
            <Card key={q.id} className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-start justify-between">
                  <span className="flex-1">
                    {q.id}. {q.question}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({q.points} puntos)
                  </span>
                </CardTitle>
                <CardDescription className="text-xs italic">{q.topic}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={answers[q.id]?.toString()}
                  onValueChange={(value) => handleAnswerChange(q.id, parseInt(value))}
                  disabled={showResults}
                >
                  {q.options.map((option, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <RadioGroupItem value={index.toString()} id={`q${q.id}-${index}`} />
                      <Label
                        htmlFor={`q${q.id}-${index}`}
                        className={`flex-1 cursor-pointer ${
                          showResults
                            ? index === q.correctAnswer
                              ? "text-green-700 font-semibold"
                              : answers[q.id] === index
                              ? "text-red-700 line-through"
                              : ""
                            : ""
                        }`}
                      >
                        {option}
                        {showResults && index === q.correctAnswer && (
                          <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-600" />
                        )}
                        {showResults && answers[q.id] === index && index !== q.correctAnswer && (
                          <XCircle className="inline ml-2 h-4 w-4 text-red-600" />
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {showFeedback && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertDescription className="text-sm">
                      <strong>Explicación:</strong> {q.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="v2" className="space-y-6 mt-6">
          {questionsV2.map((q) => (
            <Card key={q.id} className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-start justify-between">
                  <span className="flex-1">
                    {q.id}. {q.question}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({q.points} puntos)
                  </span>
                </CardTitle>
                <CardDescription className="text-xs italic">{q.topic}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={answers[q.id]?.toString()}
                  onValueChange={(value) => handleAnswerChange(q.id, parseInt(value))}
                  disabled={showResults}
                >
                  {q.options.map((option, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <RadioGroupItem value={index.toString()} id={`q${q.id}-${index}`} />
                      <Label
                        htmlFor={`q${q.id}-${index}`}
                        className={`flex-1 cursor-pointer ${
                          showResults
                            ? index === q.correctAnswer
                              ? "text-green-700 font-semibold"
                              : answers[q.id] === index
                              ? "text-red-700 line-through"
                              : ""
                            : ""
                        }`}
                      >
                        {option}
                        {showResults && index === q.correctAnswer && (
                          <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-600" />
                        )}
                        {showResults && answers[q.id] === index && index !== q.correctAnswer && (
                          <XCircle className="inline ml-2 h-4 w-4 text-red-600" />
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {showFeedback && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertDescription className="text-sm">
                      <strong>Explicación:</strong> {q.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 sticky bottom-4 bg-background p-4 border rounded-lg shadow-lg">
        <Button onClick={handleSubmit} disabled={showResults} className="flex-1 bg-orange-600 hover:bg-orange-700">
          Calificar
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1">
          Reiniciar
        </Button>
      </div>

      {showResults && (
        <Card className="border-orange-300 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-orange-600" />
              Resultados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg">
                <strong>Puntaje:</strong> {score.earnedPoints} / {score.totalPoints}
              </p>
              <p className="text-lg">
                <strong>Porcentaje:</strong> {score.percentage.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">
                {score.percentage >= 80
                  ? "¡Excelente! Dominas los conceptos de obras públicas e hidráulica."
                  : score.percentage >= 60
                  ? "Buen trabajo. Refuerza algunos conceptos técnicos."
                  : "Sigue estudiando. Revisa las normas INVIAS, NSR-10 y diseño hidráulico."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
