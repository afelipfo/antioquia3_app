"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, InfoIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  {
    id: 1,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. ¿Cuál es el propósito central del Modelo Integrado de Planeación y Gestión (MIPG)?",
    options: [
      "Unificar únicamente los manuales de funciones de las entidades públicas",
      "Dirigir, planear, ejecutar, hacer seguimiento, evaluar y controlar la gestión pública para obtener resultados alineados con los planes de desarrollo y resolver necesidades ciudadanas con integridad y calidad",
      "Sustituir los sistemas de control fiscal y disciplinario existentes",
      "Establecer un manual único de trámites para todas las entidades"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El MIPG actúa como marco de referencia para todo el ciclo de gestión pública con el fin de generar resultados alineados con los planes de desarrollo y responder a las necesidades ciudadanas con integridad y calidad.",
    topic: "Propósito del MIPG"
  },
  {
    id: 2,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. ¿Qué establece la Ley 489 de 1998 en relación con el MIPG?",
    options: [
      "Obliga a las entidades territoriales a adoptar el Modelo Estándar de Control Interno (MECI)",
      "Articula el Sistema de Desarrollo Administrativo como conjunto de políticas, estrategias y mecanismos para fortalecer la capacidad administrativa y el desempeño institucional",
      "Crea el Sistema de Gestión de la Calidad en el Estado",
      "Define los indicadores del Índice de Desempeño Institucional"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la Ley 489 de 1998 articuló el Sistema de Desarrollo Administrativo, base del MIPG al fortalecer la gestión y desempeño institucional.",
    topic: "Marco legal del MIPG"
  },
  {
    id: 3,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. El artículo 133 de la Ley 1753 de 2015 ordenó:",
    options: [
      "Crear un sistema independiente para el control disciplinario de los servidores",
      "Integrar en un único Sistema de Gestión los Sistemas de Gestión de la Calidad y de Desarrollo Administrativo",
      "Eliminar el Sistema de Gestión de la Calidad de las entidades públicas",
      "Trasladar la planeación institucional al Departamento Nacional de Planeación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la Ley 1753 de 2015 mandató integrar los sistemas de Gestión de la Calidad y de Desarrollo Administrativo, antecedente directo del MIPG.",
    topic: "Marco legal del MIPG"
  },
  {
    id: 4,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. ¿Cuál decreto formalizó el MIPG como modelo único de gestión pública?",
    options: [
      "Decreto 1083 de 2015",
      "Decreto 1499 de 2017",
      "Decreto 1599 de 2005",
      "Decreto 943 de 2014"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el Decreto 1499 de 2017 modificó el Decreto 1083 de 2015 y formalizó al MIPG como modelo único de gestión pública.",
    topic: "Marco legal del MIPG"
  },
  {
    id: 5,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. De acuerdo con el artículo 2.2.22.3.4 del Decreto 1083 de 2015, el MIPG aplica:",
    options: [
      "Solo a las entidades del orden nacional de la Rama Ejecutiva",
      "A los organismos y entidades de los órdenes nacional y territorial de la Rama Ejecutiva y a entidades descentralizadas con 90 % o más de capital público",
      "Exclusivamente a entidades sometidas al régimen de empresa industrial y comercial",
      "Únicamente a las entidades del orden territorial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el alcance del MIPG cubre organismos y entidades de la Rama Ejecutiva en los niveles nacional y territorial, así como entidades descentralizadas con participación estatal igual o superior al 90 %. Los regímenes especiales aplican control interno y otras políticas según proceda.",
    topic: "Alcance institucional"
  },
  {
    id: 6,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. ¿Cuál de los siguientes NO es un principio del MIPG?",
    options: [
      "Aprendizaje e innovación",
      "Excelencia y calidad",
      "Integridad y confianza",
      "Competencia desleal entre entidades"
    ],
    correctAnswer: 3,
    points: 5,
    explanation: "En la situación descrita, los principios del MIPG son aprendizaje e innovación, orientación a resultados, integridad y confianza, articulación interinstitucional, decisiones basadas en evidencias y excelencia y calidad.",
    topic: "Principios del MIPG"
  },
  {
    id: 7,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. El principio de toma de decisiones basadas en evidencias implica:",
    options: [
      "Utilizar información confiable para soportar las decisiones públicas",
      "Priorizar la intuición del directivo sobre la información disponible",
      "Tomar decisiones únicamente con base en solicitudes ciudadanas",
      "Evitar el uso de datos para acelerar la gestión"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, una de las bases del MIPG es decidir con evidencia, es decir, con información confiable que respalde la gestión.",
    topic: "Principios del MIPG"
  },
  {
    id: 8,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. El MIPG está conformado por:",
    options: [
      "Siete dimensiones de gestión y diecinueve políticas de gestión y desempeño",
      "Cuatro componentes y diez políticas de transparencia",
      "Nueve líneas estratégicas sin políticas asociadas",
      "Dos dimensiones y seis principios operativos"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, el modelo se estructura en siete dimensiones de gestión y diecinueve políticas de gestión y desempeño.",
    topic: "Estructura del MIPG"
  },
  {
    id: 9,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La política de Gestión Estratégica del Talento Humano dentro del MIPG exige:",
    options: [
      "Elaborar exclusivamente un plan anual de capacitación",
      "Disponer de información, diagnosticar la gestión de talento, diseñar acciones y evaluar el Plan Estratégico de Talento Humano (PETH)",
      "Externalizar la administración del talento humano en una firma privada",
      "Focalizar la gestión en la reducción de planta sin evaluación previa"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la política orienta a contar con información, realizar diagnósticos, diseñar acciones y evaluar el PETH de la entidad.",
    topic: "Dimensión Talento Humano"
  },
  {
    id: 10,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. En la política de integridad, el Manual Operativo del MIPG plantea:",
    options: [
      "Eliminar cualquier diagnóstico de integridad para agilizar la gestión",
      "Formular estrategias sin evaluar resultados para no distraerse de la operación",
      "Elaborar diagnósticos, formular estrategias y evaluar su implementación; además, la Ley 2195 de 2022 fija plazos para adoptar Programas de Transparencia y Ética Pública",
      "Delegar la integridad en la oficina de control interno sin participación del talento humano"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, la política de integridad exige diagnosticar, formular y evaluar estrategias, y la Ley 2195 fija plazos para adoptar Programas de Transparencia y Ética Pública.",
    topic: "Dimensión Talento Humano"
  },
  {
    id: 11,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La planeación institucional dentro del MIPG se basa en:",
    options: [
      "Definir el propósito de la entidad, a quién sirve, prioridades alineadas con los planes de desarrollo y evaluar las capacidades estratégicas y funcionales",
      "Adoptar planes de acción solamente cuando cambie la administración",
      "Priorizar el gasto sobre la coherencia con los planes de desarrollo",
      "Repetir el plan del periodo anterior sin ajustes"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, la planeación institucional parte del propósito, el público al que sirve, la definición de prioridades alineadas con el plan de desarrollo y la evaluación de capacidades.",
    topic: "Dirección estratégica y planeación"
  },
  {
    id: 12,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La política de Gestión Presupuestal y Eficiencia del Gasto incluye:",
    options: [
      "Elaborar exclusivamente el anteproyecto de presupuesto",
      "Programar el presupuesto, desagregarlo y formular el Plan Anual Mensualizado de Caja (PAC) para alinear ingresos y egresos",
      "Publicar estados financieros sin seguimiento al presupuesto",
      "Reducir el presupuesto sin atender prioridades institucionales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la política comprende la programación, desagregación y formulación del PAC para asegurar correspondencia entre recursos y gasto.",
    topic: "Dirección estratégica y planeación"
  },
  {
    id: 13,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. En compras y contratación pública, el MIPG promueve:",
    options: [
      "Evitar la planificación de adquisiciones para actuar con flexibilidad",
      "Centrar la contratación en acuerdos verbales con proveedores",
      "Estructurar el Plan Anual de Adquisiciones, usar SECOP II, incorporar análisis de datos y emplear la Tienda Virtual del Estado",
      "Restringir la competencia para mantener proveedores habituales"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, la política de compras incluye el PAA, el uso de SECOP II, abastecimiento estratégico y herramientas como la Tienda Virtual del Estado.",
    topic: "Dirección estratégica y planeación"
  },
  {
    id: 14,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. Dentro de la dimensión Gestión con valores para resultados, el esquema operativo interno incluye:",
    options: [
      "Únicamente la adquisición de nuevos bienes muebles",
      "Comprender la situación, rediseñar procesos, trabajar por procesos, gestionar recursos físicos, servicios internos y la gestión ambiental",
      "Reducir la gestión a la supervisión contractual",
      "Delegar procesos internos a entes de control"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el esquema operativo interno busca simplificar y fortalecer procesos internos, gestionar recursos y considerar la dimensión ambiental.",
    topic: "Gestión con valores para resultados"
  },
  {
    id: 15,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La política de Servicio al Ciudadano implica:",
    options: [
      "Atender únicamente a los usuarios que presenten reclamos formales",
      "Diagnosticar el estado del servicio, formular estrategias articuladas con la planeación institucional, ejecutarlas y evaluarlas",
      "Crear canales digitales sin medir su efectividad",
      "Centralizar la atención en oficinas de control interno"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la política promueve un ciclo de diagnóstico, formulación, ejecución y evaluación para asegurar servicios de calidad.",
    topic: "Relación Estado-ciudadano"
  },
  {
    id: 16,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La simplificación y racionalización de trámites busca:",
    options: [
      "Aumentar los requisitos para garantizar mayor control",
      "Reducir costos, tiempos y requisitos para facilitar el acceso a derechos",
      "Suspender la prestación de servicios presenciales",
      "Reemplazar todos los trámites por declaraciones juramentadas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la política de trámites pretende facilitar el acceso a derechos mediante la reducción de costos, tiempos y requisitos.",
    topic: "Relación Estado-ciudadano"
  },
  {
    id: 17,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La participación ciudadana en la gestión pública dentro del MIPG requiere:",
    options: [
      "Limitar la incidencia ciudadana a la etapa de evaluación de proyectos",
      "Garantizar la incidencia efectiva de la ciudadanía en diagnóstico, planeación, ejecución y evaluación mediante diagnósticos, estrategias y acciones en cada fase",
      "Sustituir los mecanismos de control social existentes",
      "Reducir los espacios de participación a encuestas anónimas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la política pide diseñar diagnósticos, estrategias y acciones que permitan incidencia ciudadana en todas las fases de la gestión pública.",
    topic: "Relación Estado-ciudadano"
  },
  {
    id: 18,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La política de Transparencia, Acceso a la Información y Lucha contra la Corrupción se soporta en:",
    options: [
      "Las leyes 1474 de 2011, 1712 de 2014 y 2195 de 2022",
      "Únicamente en la Ley 489 de 1998",
      "La Ley 80 de 1993 y sus decretos reglamentarios",
      "El Código de Comercio"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, las leyes 1474 de 2011, 1712 de 2014 y 2195 de 2022 fundamentan la política de transparencia y acceso a la información.",
    topic: "Gestión de recursos y transparencia"
  },
  {
    id: 19,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La política de Seguridad Digital busca:",
    options: [
      "Delegar el manejo de riesgos digitales a proveedores externos",
      "Fortalecer capacidades para identificar y mitigar riesgos de seguridad digital, promover resiliencia y cooperación",
      "Limitar el uso de herramientas digitales en la gestión pública",
      "Suspender el intercambio de información entre entidades"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, seguridad digital pretende fortalecer capacidades, mitigar riesgos y promover resiliencia y cooperación frente a amenazas digitales.",
    topic: "Gestión de recursos y transparencia"
  },
  {
    id: 20,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La política de Defensa Jurídica abarca:",
    options: [
      "Únicamente la firma de contratos con abogados externos",
      "Las etapas de prevención del daño antijurídico, defensa judicial, cumplimiento de sentencias y acciones de repetición para recuperar recursos públicos",
      "El registro de bienes muebles de la entidad",
      "La supervisión de auditorías internas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La defensa jurídica articula prevención del daño, defensa judicial, cumplimiento de sentencias y acciones de repetición.",
    topic: "Gestión de recursos y transparencia"
  }
]

const questionsV2: Question[] = [
  {
    id: 1,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. El artículo 2.2.22.1.1 del Decreto 1083 de 2015 define el Sistema de Gestión como:",
    options: [
      "Un manual de procedimientos para trámites ciudadanos",
      "El conjunto de entidades, organismos, políticas y recursos que orientan la gestión pública hacia un mejor desempeño institucional y la satisfacción de necesidades ciudadanas",
      "Una lista de indicadores financieros para el sector público",
      "Un sistema de control fiscal para las entidades territoriales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El decreto define el Sistema de Gestión como el conjunto de actores, políticas y recursos que orientan la gestión pública hacia el buen desempeño y la satisfacción de los ciudadanos.",
    topic: "Definición del Sistema de Gestión"
  },
  {
    id: 2,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. Las entidades con régimen especial (Ramas Legislativa y Judicial, organismos de control, Organización Electoral e institutos científicos) deben:",
    options: [
      "Aplicar la totalidad de las políticas del MIPG sin excepción",
      "Aplicar la política de control interno de la Ley 87 de 1993 y las demás políticas de gestión en la medida en que sean aplicables",
      "Excluirse completamente del MIPG",
      "Someterse únicamente al Modelo Estándar de Control Interno sin políticas complementarias"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, estas entidades aplican la política de control interno prevista en la Ley 87 de 1993 y las demás políticas de gestión en la medida en que las puedan adoptar.",
    topic: "Alcance institucional"
  },
  {
    id: 3,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. El principio de integridad y confianza del MIPG implica:",
    options: [
      "Reducir la participación ciudadana para evitar riesgos reputacionales",
      "Conducir la gestión pública de manera ética y fortalecer la confianza ciudadana",
      "Delegar la ética exclusivamente en los organismos de control",
      "Priorizar resultados a cualquier costo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la integridad y la confianza promueven una gestión ética capaz de fortalecer la confianza ciudadana.",
    topic: "Principios del MIPG"
  },
  {
    id: 4,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La dimensión Evaluación de Resultados exige, entre otros aspectos:",
    options: [
      "Preparar únicamente informes financieros trimestrales",
      "Definir responsables, revisar indicadores, evaluar resultados y riesgos, medir la percepción de los grupos de valor, documentar hallazgos y aplicar mejora continua",
      "Suspender los indicadores cuando se cumplan las metas iniciales",
      "Limitar la evaluación a encuestas de satisfacción ciudadana"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la evaluación de resultados incluye asignar responsabilidades, actualizar indicadores, evaluar resultados y riesgos, medir percepciones y documentar mejoras.",
    topic: "Evaluación de resultados"
  },
  {
    id: 5,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La política de seguimiento y evaluación del desempeño institucional incorpora la clasificación de indicadores de la CEPAL, que comprende:",
    options: [
      "Eficiencia, eficacia, calidad y economía",
      "Impacto social, impacto ambiental y cobertura",
      "Producción, distribución y consumo",
      "Satisfacción, competitividad y rentabilidad"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, el MIPG adopta la clasificación de indicadores de eficiencia, eficacia, calidad y economía propuesta por la CEPAL.",
    topic: "Evaluación de resultados"
  },
  {
    id: 6,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. ¿Qué tipo de indicador se usa para medir los cambios en las condiciones objetivas tras la intervención de la entidad?",
    options: [
      "Indicador de productividad",
      "Indicador de impacto",
      "Indicador de eficacia",
      "Indicador de economía"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, los indicadores de impacto permiten valorar los cambios obtenidos en las condiciones objeto de intervención.",
    topic: "Evaluación de resultados"
  },
  {
    id: 7,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La gestión documental en el MIPG se organiza en:",
    options: [
      "Aspectos estratégicos, administración de archivos, procesos de gestión documental, dimensión tecnológica y cultura organizacional",
      "Compra de equipos y contratación de bodegas externas",
      "Digitalización de documentos en formato PDF sin control",
      "Publicación inmediata de todos los archivos sin clasificación"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, la gestión documental contempla esas cinco áreas para garantizar la preservación y uso de la memoria institucional.",
    topic: "Información y comunicación"
  },
  {
    id: 8,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La gestión de la información estadística dentro del MIPG incluye:",
    options: [
      "Únicamente la elaboración de boletines informativos",
      "Planificación estadística, fortalecimiento de registros administrativos y calidad estadística",
      "Tercerizar la producción estadística sin supervisión",
      "Limitarse a recopilar datos financieros"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la política estadística contempla la planificación, el fortalecimiento de los registros administrativos y la garantía de calidad.",
    topic: "Información y comunicación"
  },
  {
    id: 9,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. La dimensión Gestión del Conocimiento e Innovación busca:",
    options: [
      "Almacenar información sin compartirla para garantizar exclusividad",
      "Generar y producir conocimiento, contar con herramientas de uso y apropiación, analítica institucional y cultura de compartirlo",
      "Eliminar la documentación de buenas prácticas para evitar duplicidades",
      "Subcontratar los procesos de innovación sin participación interna"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la dimensión promueve generar, usar, analizar y compartir conocimiento para mejorar la gestión.",
    topic: "Gestión del conocimiento e innovación"
  },
  {
    id: 10,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. El Sistema de Control Interno del MIPG se soporta, entre otras normas, en:",
    options: [
      "La Constitución, la Ley 87 de 1993, la Ley 489 de 1998, la Ley 1474 de 2011 y decretos como 1599/2005, 943/2014, 1083/2015, 648/2017 y 1499/2017",
      "La Ley 80 de 1993 y la Ley 1150 de 2007",
      "Únicamente el Código de Comercio",
      "La Ley 734 de 2002 y sus decretos reglamentarios"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, el SCI se sustenta en la Constitución, la Ley 87 y otras normas que consolidan el modelo de control interno.",
    topic: "Control interno"
  },
  {
    id: 11,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. Entre los objetivos del Sistema de Control Interno se encuentran:",
    options: [
      "Garantizar información oportuna y confiable, gestionar riesgos, aplicar mecanismos de verificación y evaluación y asegurar eficiencia, eficacia y economía",
      "Solo custodiar los bienes muebles de la entidad",
      "Definir el presupuesto anual de inversión",
      "Aplicar sanciones disciplinarias a servidores públicos"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, los objetivos del SCI abarcan la confiabilidad de la información, la gestión de riesgos, la verificación, la evaluación y la eficiencia operativa.",
    topic: "Control interno"
  },
  {
    id: 12,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. Los entes reguladores del Sistema de Control Interno son:",
    options: [
      "Presidente de la República, Departamento Administrativo de la Función Pública, Congreso, Contaduría General y Contraloría General",
      "Ministerio de Hacienda y Corte Suprema",
      "Gobernaciones y alcaldías",
      "Organizaciones sindicales del sector público"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, estos entes regulan y orientan el Sistema de Control Interno a nivel nacional.",
    topic: "Control interno"
  },
  {
    id: 13,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. Los principios del Sistema de Control Interno son:",
    options: [
      "Autogestión, autorregulación y autocontrol",
      "Centralización, jerarquía y supervisión externa",
      "Competitividad, rentabilidad y cobertura",
      "Flexibilidad, confidencialidad y reserva"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, el SCI descansa en la autogestión, la autorregulación y el autocontrol como principios fundamentales.",
    topic: "Control interno"
  },
  {
    id: 14,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. El Modelo Estándar de Control Interno (MECI) se estructura en:",
    options: [
      "Cinco componentes: ambiente de control, evaluación de riesgos, actividades de control, información y comunicación, y monitoreo",
      "Tres componentes: planificación, ejecución y cierre",
      "Siete componentes: dirección, talento, procesos, finanzas, control, tecnología y cultura",
      "Dos componentes: auditoría interna y auditoría externa"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, el MECI tiene cinco componentes articulados con 17 principios para fortalecer la gestión y el control.",
    topic: "Control interno"
  },
  {
    id: 15,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. Las cuatro líneas de defensa dentro del MIPG están orientadas a:",
    options: [
      "Segregar funciones entre oficinas técnicas para evitar duplicidades",
      "Gestionar el riesgo institucional asegurando control en la operación, supervisión, control interno independiente y control externo",
      "Sustituir los comités de coordinación de control interno",
      "Garantizar la confidencialidad de la información financiera"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, las líneas de defensa refuerzan la gestión del riesgo desde la operación, la supervisión, el control interno independiente y el control externo.",
    topic: "Control interno"
  },
  {
    id: 16,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. El Índice de Desempeño Institucional (MDI) mide:",
    options: [
      "La ejecución presupuestal acumulada del último año",
      "La capacidad de las entidades para orientar sus procesos a producir bienes y servicios que solucionen necesidades ciudadanas con calidad e integridad",
      "La satisfacción de los servidores públicos con el clima laboral",
      "El nivel de cumplimiento normativo en materia disciplinaria"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el MDI evalúa la capacidad institucional de producir bienes y servicios que resuelvan necesidades ciudadanas con calidad e integridad.",
    topic: "Medición del desempeño"
  },
  {
    id: 17,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. El Índice de Control Interno permite:",
    options: [
      "Medir la capacidad de aplicar lineamientos que orienten procesos de control y gestión de riesgos en las entidades",
      "Determinar la satisfacción de los usuarios con los canales digitales",
      "Clasificar a las entidades según su nivel de endeudamiento",
      "Evaluar el cumplimiento de los planes de compras"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, el Índice de Control Interno mide la capacidad de aplicar lineamientos de control y gestión de riesgos.",
    topic: "Medición del desempeño"
  },
  {
    id: 18,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. ¿Qué entidades lideran las políticas de Gestión del Talento Humano, Integridad, Fortalecimiento organizacional, Simplificación de procesos, Racionalización de trámites, Participación ciudadana, Gestión del conocimiento e innovación y Control interno?",
    options: [
      "Departamento Administrativo de la Función Pública (DAFP)",
      "Ministerio de Hacienda y Crédito Público",
      "Departamento Nacional de Planeación",
      "Procuraduría General de la Nación"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, el DAFP lidera esas políticas dentro del MIPG.",
    topic: "Gobernanza de las políticas"
  },
  {
    id: 19,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. El Departamento Nacional de Planeación (DNP) lidera principalmente las políticas de:",
    options: [
      "Gestión del talento humano y control interno",
      "Planeación institucional y evaluación de resultados",
      "Gobierno digital y seguridad digital",
      "Defensa jurídica y mejora normativa"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el DNP lidera la planeación institucional y la evaluación de resultados en el marco del MIPG.",
    topic: "Gobernanza de las políticas"
  },
  {
    id: 20,
    question: "Lectura: Una entidad pública busca fortalecer su Modelo Integrado de Planeación y Gestión para cumplir metas institucionales y responder al ciudadano. ¿Cuál entidad lidera la política de Compras y Contratación Pública dentro del MIPG?",
    options: [
      "Agencia Nacional de Contratación Pública – Colombia Compra Eficiente",
      "Departamento Administrativo Nacional de Estadística (DANE)",
      "Archivo General de la Nación",
      "Ministerio de Justicia y del Derecho"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "Colombia Compra Eficiente lidera la política de compras y contratación pública.",
    topic: "Gobernanza de las políticas"
  }
]

export function MipgTest() {
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2">("v1")
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = selectedVersion === "v1" ? questionsV1 : questionsV2

  const handleSubmit = () => {
    setShowResults(true)
    setShowFeedback(true)
  }

  const timer = useTestTimer({
    totalQuestions: questions.length,
    timePerQuestion: 120,
    onTimeUp: handleSubmit,
    isActive: !showResults
  })

  const handleVersionChange = (value: string) => {
    setSelectedVersion(value as "v1" | "v2")
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const calculateScore = () => {
    let correct = 0
    let totalPoints = 0
    let earnedPoints = 0

    questions.forEach((q) => {
      totalPoints += q.points
      if (answers[q.id] === q.correctAnswer) {
        correct++
        earnedPoints += q.points
      }
    })

    return { correct, total: questions.length, earnedPoints, totalPoints }
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const score = showResults ? calculateScore() : null

  return (
    <div className="space-y-6">
      {!showResults && (
        <TestTimer
          formattedTime={timer.formattedTime}
          timeColor={timer.timeColor}
          percentageRemaining={timer.percentageRemaining}
        />
      )}

      <Alert className="border-primary/50 bg-primary/5">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Esta prueba contiene {questions.length} preguntas sobre el Modelo Integrado de Planeación y Gestión (MIPG).
          Total de puntos disponibles: {questions.reduce((sum, q) => sum + q.points, 0)} puntos.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selecciona la versión de la prueba</CardTitle>
          <CardDescription>
            Cada versión incluye 20 preguntas diferentes sobre las dimensiones, políticas, principios e instrumentos del MIPG.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedVersion} onValueChange={handleVersionChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="v1" disabled={showResults}>
                Versión 1
              </TabsTrigger>
              <TabsTrigger value="v2" disabled={showResults}>
                Versión 2
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {showResults && (
            <p className="mt-3 text-sm text-muted-foreground">Reinicia la prueba para cambiar de versión.</p>
          )}
        </CardContent>
      </Card>

      {showResults && score && (
        <Alert
          className={
            score.earnedPoints >= score.totalPoints * 0.7
              ? "border-green-500 bg-green-50"
              : "border-orange-500 bg-orange-50"
          }
        >
          <AlertTitle className="text-lg font-semibold">
            Resultado: {score.earnedPoints} / {score.totalPoints} puntos
          </AlertTitle>
          <AlertDescription>
            Respondiste correctamente {score.correct} de {score.total} preguntas (
            {Math.round((score.earnedPoints / score.totalPoints) * 100)}%)
          </AlertDescription>
        </Alert>
      )}

      {questions.map((question, index) => (
        <Card
          key={question.id}
          className={`border ${
            showFeedback && answers[question.id] !== undefined
              ? answers[question.id] === question.correctAnswer
                ? "border-green-500 bg-green-50/50"
                : "border-red-500 bg-red-50/50"
              : "border-border"
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-start justify-between gap-4 text-lg">
              <span>
                Pregunta {index + 1} ({question.points} puntos)
              </span>
              {showFeedback && answers[question.id] !== undefined && (
                answers[question.id] === question.correctAnswer ? (
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                )
              )}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Tema: {question.topic}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium leading-relaxed">{question.question}</p>

            <RadioGroup
              value={answers[question.id]?.toString()}
              onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
              disabled={showResults}
            >
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`flex items-start space-x-3 rounded-lg border p-3 transition-colors ${
                    showFeedback && answers[question.id] !== undefined
                      ? optionIndex === question.correctAnswer
                        ? "border-green-500 bg-green-50"
                        : answers[question.id] === optionIndex
                        ? "border-red-500 bg-red-50"
                        : "border-border"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem
                    value={optionIndex.toString()}
                    id={`mipg-q${question.id}-opt${optionIndex}`}
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor={`mipg-q${question.id}-opt${optionIndex}`}
                    className="flex-1 cursor-pointer leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {showFeedback && answers[question.id] !== undefined && (
              <Alert
                className={
                  answers[question.id] === question.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : "border-orange-500 bg-orange-50"
                }
              >
                <AlertTitle className="font-semibold">
                  {answers[question.id] === question.correctAnswer ? "¡Correcto!" : "Respuesta incorrecta"}
                </AlertTitle>
                <AlertDescription className="mt-2 space-y-2">
                  <p>
                    <strong>Explicación:</strong> {question.explanation}
                  </p>
                  {answers[question.id] !== question.correctAnswer && (
                    <p className="text-sm">
                      <strong>Debes revisar:</strong> {question.topic}
                    </p>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ))}

      <div className="flex flex-wrap gap-4">
        {!showResults ? (
          <Button
            onClick={handleSubmit}
            size="lg"
            disabled={Object.keys(answers).length !== questions.length}
            className="min-w-[200px]"
          >
            Enviar Respuestas
          </Button>
        ) : (
          <>
            <Button
              onClick={() => setShowFeedback(!showFeedback)}
              variant="outline"
              size="lg"
              className="min-w-[200px]"
            >
              {showFeedback ? "Ocultar" : "Mostrar"} Retroalimentación
            </Button>
            <Button onClick={handleReset} variant="secondary" size="lg" className="min-w-[200px]">
              Reiniciar Prueba
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
