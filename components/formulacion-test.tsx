"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, InfoIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
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
  // Ciclo del proyecto
  {
    id: 1,
    question: "El ciclo de vida de un proyecto público en Colombia comprende las siguientes fases:",
    options: [
      "Solo formulación y ejecución",
      "Pre-inversión, inversión y operación",
      "Identificación, diseño y construcción",
      "Planeación, contratación y entrega"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El ciclo de vida de un proyecto público comprende: Pre-inversión (identificación, formulación y evaluación ex-ante), Inversión (ejecución y seguimiento) y Operación (funcionamiento, evaluación ex-post y sostenibilidad).",
    topic: "Ciclo del proyecto"
  },
  {
    id: 2,
    question: "La fase de pre-inversión de un proyecto incluye:",
    options: [
      "Solo la ejecución de obras",
      "La identificación del problema, formulación de alternativas, evaluación ex-ante y estructuración técnica, legal y financiera",
      "Únicamente la consecución de recursos financieros",
      "Solo la contratación de consultores"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La fase de pre-inversión comprende la identificación del problema o necesidad, formulación de alternativas de solución, evaluación ex-ante de viabilidad técnica, económica, social y ambiental, y la estructuración del proyecto.",
    topic: "Fase de pre-inversión"
  },
  {
    id: 3,
    question: "El diagnóstico del problema en la formulación de un proyecto debe incluir:",
    options: [
      "Solo la descripción general de la situación",
      "La identificación del problema central, sus causas directas e indirectas, efectos, población afectada, magnitud y localización geográfica",
      "Únicamente las quejas de la comunidad",
      "Solo estadísticas generales del sector"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El diagnóstico debe identificar el problema central (situación negativa), sus causas directas e indirectas (árbol de causas), efectos, población y área afectada, magnitud cuantitativa y cualitativa, y localización geográfica precisa.",
    topic: "Diagnóstico del problema"
  },
  {
    id: 4,
    question: "Las alternativas de solución en un proyecto deben:",
    options: [
      "Presentar solo una única opción predefinida",
      "Considerar mínimo dos alternativas viables, comparándolas técnica, económica y ambientalmente para seleccionar la óptima",
      "Elegirse al azar sin análisis previo",
      "Basarse únicamente en el menor costo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Se deben formular y evaluar mínimo dos alternativas de solución técnicamente viables, comparándolas en aspectos técnicos, económicos, sociales, ambientales e institucionales, para seleccionar la alternativa óptima mediante criterios objetivos.",
    topic: "Formulación de alternativas"
  },
  {
    id: 5,
    question: "Los estudios de pre-factibilidad de un proyecto de infraestructura deben incluir:",
    options: [
      "Solo el presupuesto estimado",
      "Estudios topográficos, geotécnicos, hidrológicos, ambientales, de demanda, técnicos y financieros que sustenten la viabilidad del proyecto",
      "Únicamente el cronograma de ejecución",
      "Solo la aprobación de la comunidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los estudios de pre-factibilidad deben incluir: levantamientos topográficos, estudios geotécnicos y de suelos, análisis hidrológicos, estudios de impacto ambiental, análisis de demanda, diseños preliminares, costos estimados y evaluación financiera.",
    topic: "Estudios de pre-factibilidad"
  },
  {
    id: 6,
    question: "La evaluación ex-ante de un proyecto busca:",
    options: [
      "Solo cumplir un requisito formal",
      "Determinar la viabilidad técnica, económica, social, ambiental e institucional del proyecto antes de su ejecución, y comparar los beneficios con los costos",
      "Únicamente justificar el gasto público",
      "Aprobar automáticamente todos los proyectos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La evaluación ex-ante determina si el proyecto es viable técnica, económica, social, ambiental e institucionalmente, compara beneficios esperados con costos, y establece si el proyecto merece ser ejecutado con recursos públicos.",
    topic: "Evaluación ex-ante"
  },
  // MGA - Metodología General Ajustada
  {
    id: 7,
    question: "La Metodología General Ajustada (MGA) es:",
    options: [
      "Una guía opcional para formular proyectos privados",
      "La herramienta oficial del DNP para formular, registrar y evaluar proyectos de inversión pública en Colombia",
      "Un software de contabilidad gubernamental",
      "Una metodología exclusiva para proyectos internacionales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La MGA es la herramienta metodológica del Departamento Nacional de Planeación (DNP) para identificar, formular, registrar y evaluar proyectos de inversión pública en Colombia. Es de uso obligatorio para proyectos financiados con recursos públicos.",
    topic: "MGA - Concepto"
  },
  {
    id: 8,
    question: "El Banco de Programas y Proyectos de Inversión Nacional (BPIN) es:",
    options: [
      "Un banco comercial que financia proyectos",
      "El sistema de información donde se registran, clasifican y reportan los proyectos de inversión pública que son financiados con recursos del Presupuesto General de la Nación",
      "Una base de datos de contratistas del Estado",
      "Un archivo de normas sobre inversión pública"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El BPIN es el sistema de información donde se registran, clasifican, programan y reportan los proyectos de inversión pública financiados con recursos del Presupuesto General de la Nación. Todo proyecto de inversión nacional debe estar registrado en el BPIN.",
    topic: "BPIN"
  },
  {
    id: 9,
    question: "Los módulos principales de la MGA Web son:",
    options: [
      "Solo identificación y presupuesto",
      "Identificación, preparación (componentes técnicos, localización, costos), programación y seguimiento",
      "Únicamente diagnóstico y conclusiones",
      "Solo cronograma y presupuesto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La MGA Web comprende los módulos de: Identificación (problema, objetivos, alternativas, población), Preparación (componentes técnicos, localización, costos, ingresos, fuentes de financiación, indicadores), Programación y Seguimiento de la ejecución.",
    topic: "Módulos de la MGA"
  },
  {
    id: 10,
    question: "En el módulo de identificación de la MGA, se debe:",
    options: [
      "Solo nombrar el proyecto",
      "Describir el problema central, sus causas y efectos, definir el objetivo general y específicos, identificar la población afectada y beneficiaria, y plantear alternativas de solución",
      "Únicamente estimar costos generales",
      "Solo definir el cronograma"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El módulo de identificación requiere: descripción del problema central con sus causas y efectos (árbol de problemas), definición del objetivo general y específicos (árbol de objetivos), identificación de población afectada y beneficiaria, y planteamiento de alternativas de solución.",
    topic: "Módulo de identificación - MGA"
  },
  {
    id: 11,
    question: "Al registrar un proyecto en la MGA, la clasificación sectorial se refiere a:",
    options: [
      "El tipo de contrato a utilizar",
      "El sector económico o social al que pertenece el proyecto: educación, salud, transporte, agua potable, vivienda, etc.",
      "Solo el presupuesto asignado",
      "La región geográfica del proyecto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La clasificación sectorial identifica el sector económico o social al que pertenece el proyecto según el Sistema General de Regalías: educación, salud, transporte, agua potable y saneamiento básico, vivienda, agricultura, etc.",
    topic: "Clasificación sectorial - MGA"
  },
  {
    id: 12,
    question: "La definición de componentes y actividades en la MGA implica:",
    options: [
      "Listar tareas sin estructura",
      "Desagregar el proyecto en componentes (productos), cada uno con sus actividades específicas, responsables, cronograma y costos",
      "Solo mencionar el objetivo final",
      "Copiar componentes de otros proyectos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los componentes son los productos o resultados específicos del proyecto. Cada componente se desagrega en actividades con sus respectivos responsables, cronograma de ejecución, costos detallados y metas cuantificables.",
    topic: "Componentes y actividades - MGA"
  },
  {
    id: 13,
    question: "La localización geográfica en la MGA debe especificar:",
    options: [
      "Solo el nombre del municipio",
      "El departamento, municipio, zona urbana o rural, coordenadas geográficas y dirección específica donde se ejecutará el proyecto",
      "Únicamente la región del país",
      "Solo la dirección postal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La localización geográfica debe ser precisa: departamento, municipio, área urbana o rural, coordenadas geográficas (latitud y longitud), dirección específica o descripción del sitio de intervención, para facilitar el seguimiento y evaluación.",
    topic: "Localización geográfica - MGA"
  },
  {
    id: 14,
    question: "Las fuentes de financiación de un proyecto en la MGA pueden incluir:",
    options: [
      "Solo recursos del presupuesto nacional",
      "Presupuesto nacional, regalías, SGP (Sistema General de Participaciones), recursos propios, crédito, cooperación internacional y cofinanciación",
      "Únicamente donaciones",
      "Solo créditos bancarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las fuentes de financiación pueden ser: recursos del Presupuesto General de la Nación, regalías, SGP, recursos propios de la entidad territorial, crédito interno o externo, cooperación internacional, cofinanciación con otras entidades, entre otras.",
    topic: "Fuentes de financiación - MGA"
  },
  // Marco lógico
  {
    id: 15,
    question: "La Matriz de Marco Lógico (MML) es una herramienta que:",
    options: [
      "Solo sirve para elaborar presupuestos",
      "Presenta de forma sistemática y lógica los objetivos, resultados, actividades, indicadores, medios de verificación y supuestos del proyecto",
      "Únicamente lista las actividades del proyecto",
      "Solo se usa en proyectos internacionales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La MML es una herramienta de planificación que presenta de manera sistemática y lógica: los objetivos del proyecto (fin, propósito), los resultados esperados (componentes), las actividades, indicadores verificables, medios de verificación y supuestos críticos.",
    topic: "Matriz de Marco Lógico"
  },
  {
    id: 16,
    question: "En la Matriz de Marco Lógico, el 'Fin' se refiere a:",
    options: [
      "La terminación del proyecto",
      "El objetivo de desarrollo de largo plazo al cual contribuye el proyecto, es decir, el impacto esperado en la sociedad o sector",
      "El presupuesto final del proyecto",
      "La fecha de entrega del proyecto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El 'Fin' es el objetivo de desarrollo de largo plazo al cual el proyecto contribuye. Representa el impacto esperado en términos de desarrollo económico, social o ambiental. El proyecto por sí solo no alcanza el Fin, sino que contribuye a él.",
    topic: "Fin - Marco Lógico"
  },
  {
    id: 17,
    question: "El 'Propósito' en la Matriz de Marco Lógico representa:",
    options: [
      "Las actividades del proyecto",
      "El efecto directo esperado al finalizar el proyecto, es decir, el cambio que se logrará en la población objetivo",
      "Los recursos disponibles",
      "El nombre del proyecto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El 'Propósito' es el efecto directo o cambio esperado como resultado de utilizar los componentes (productos) del proyecto. Describe el beneficio que recibirá la población objetivo una vez concluido el proyecto exitosamente.",
    topic: "Propósito - Marco Lógico"
  },
  {
    id: 18,
    question: "Los 'Componentes' en la Matriz de Marco Lógico son:",
    options: [
      "Los problemas identificados",
      "Los productos, obras, servicios o resultados específicos que debe generar el proyecto durante su ejecución",
      "Los obstáculos del proyecto",
      "Las fuentes de financiación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los 'Componentes' son los productos, obras, bienes, servicios o resultados específicos que el proyecto debe generar y entregar durante su ejecución. Son necesarios y suficientes para lograr el Propósito del proyecto.",
    topic: "Componentes - Marco Lógico"
  },
  {
    id: 19,
    question: "El árbol de problemas sirve para:",
    options: [
      "Decorar la oficina de proyectos",
      "Identificar y analizar el problema central, sus causas (raíces) y sus efectos (ramas), estableciendo relaciones de causalidad",
      "Solo listar problemas sin relación",
      "Copiar problemas de otros proyectos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El árbol de problemas es una técnica que permite identificar y analizar el problema central (tronco), sus causas directas e indirectas (raíces) y sus efectos directos e indirectos (ramas), estableciendo relaciones causa-efecto para comprender la problemática.",
    topic: "Árbol de problemas"
  },
  {
    id: 20,
    question: "El árbol de objetivos se construye:",
    options: [
      "De forma independiente al árbol de problemas",
      "Convirtiendo los problemas (situaciones negativas) del árbol de problemas en objetivos (situaciones positivas deseadas)",
      "Solo con metas financieras",
      "Listando deseos sin fundamento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El árbol de objetivos se construye transformando las situaciones negativas del árbol de problemas en situaciones positivas deseadas. El problema central se convierte en el objetivo central, las causas en medios y los efectos en fines.",
    topic: "Árbol de objetivos"
  },
  // Presupuesto y financiación
  {
    id: 21,
    question: "La estructura presupuestal de un proyecto debe incluir:",
    options: [
      "Solo el costo total estimado",
      "Costos desagregados por componentes y actividades, inversión y operación, fuentes de financiación, cronograma de desembolsos y flujo de caja",
      "Únicamente los salarios del personal",
      "Solo los costos de materiales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La estructura presupuestal debe detallar: costos por componentes y actividades, costos de inversión y operación, fuentes de financiación identificadas, cronograma de desembolsos anual o mensual, y flujo de caja del proyecto.",
    topic: "Estructura presupuestal"
  },
  {
    id: 22,
    question: "El cronograma de inversión de un proyecto indica:",
    options: [
      "Solo la fecha de inicio",
      "La programación temporal de los recursos financieros necesarios, especificando montos y periodos de desembolso para cada actividad o componente",
      "Únicamente el presupuesto total",
      "Solo las fechas de reuniones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El cronograma de inversión programa temporalmente los recursos financieros, especificando montos requeridos y periodos de desembolso para cada actividad o componente, permitiendo planificar la ejecución presupuestal del proyecto.",
    topic: "Cronograma de inversión"
  },
  {
    id: 23,
    question: "El análisis costo-beneficio de un proyecto busca:",
    options: [
      "Solo sumar los costos",
      "Comparar los beneficios sociales y económicos esperados del proyecto con sus costos, calculando indicadores como VPN, TIR y relación beneficio/costo",
      "Únicamente estimar gastos administrativos",
      "Solo calcular el costo de construcción"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El análisis costo-beneficio compara los beneficios sociales y económicos del proyecto con sus costos de inversión y operación, calculando indicadores como Valor Presente Neto (VPN), Tasa Interna de Retorno (TIR) y relación beneficio/costo para determinar la viabilidad económica.",
    topic: "Análisis costo-beneficio"
  },
  {
    id: 24,
    question: "La línea base de un proyecto es:",
    options: [
      "El diseño arquitectónico de las obras",
      "La medición inicial de los indicadores del proyecto antes de su ejecución, que sirve de punto de comparación para evaluar los cambios o impactos generados",
      "Solo el presupuesto inicial",
      "El cronograma de actividades"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La línea base es la medición inicial (situación sin proyecto) de los indicadores relevantes antes de ejecutar el proyecto. Sirve como punto de referencia o comparación para medir los cambios, resultados e impactos del proyecto durante y después de su ejecución.",
    topic: "Línea base"
  },
  {
    id: 25,
    question: "Las metas de un proyecto deben ser:",
    options: [
      "Generales y ambiguas",
      "Específicas, Medibles, Alcanzables, Relevantes y con Tiempo definido (criterio SMART)",
      "Imposibles de lograr para exigir más esfuerzo",
      "Copiadas de otros proyectos sin adaptación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las metas del proyecto deben cumplir el criterio SMART: Específicas (claras y precisas), Medibles (cuantificables), Alcanzables (realistas), Relevantes (alineadas con los objetivos) y con Tiempo definido (plazo establecido para su cumplimiento).",
    topic: "Metas del proyecto"
  }
]

const questionsV2: Question[] = [
  // Ciclo del proyecto
  {
    id: 1,
    question: "La evaluación ex-post de un proyecto se realiza:",
    options: [
      "Antes de iniciar el proyecto",
      "Durante la fase de operación, después de finalizada la ejecución, para medir los resultados e impactos reales alcanzados",
      "Solo en la fase de formulación",
      "Únicamente durante la construcción"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La evaluación ex-post se realiza durante la fase de operación, una vez finalizada la ejecución del proyecto, para verificar si se alcanzaron los objetivos, medir los resultados e impactos reales, identificar lecciones aprendidas y determinar la sostenibilidad.",
    topic: "Evaluación ex-post"
  },
  {
    id: 2,
    question: "La sostenibilidad de un proyecto se refiere a:",
    options: [
      "Solo su duración física",
      "La capacidad del proyecto para mantener sus beneficios en el tiempo después de finalizar la inversión inicial, considerando aspectos financieros, institucionales, técnicos, sociales y ambientales",
      "Únicamente su rentabilidad financiera",
      "Solo la resistencia de las obras construidas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La sostenibilidad es la capacidad del proyecto para mantener y continuar generando los beneficios esperados después de finalizar la inversión, considerando sostenibilidad financiera, institucional, técnica, social y ambiental a largo plazo.",
    topic: "Sostenibilidad del proyecto"
  },
  {
    id: 3,
    question: "En la fase de inversión, el seguimiento del proyecto incluye:",
    options: [
      "Solo revisar el presupuesto una vez al año",
      "Monitoreo continuo del avance físico, financiero y de gestión, comparando lo ejecutado con lo planeado, identificando desviaciones y tomando acciones correctivas",
      "Únicamente esperar la terminación del proyecto",
      "Solo verificar la asistencia del personal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El seguimiento en la fase de inversión implica monitoreo continuo del avance físico (obras y actividades), financiero (ejecución presupuestal) y de gestión (cumplimiento de cronogramas e indicadores), identificando desviaciones y tomando acciones correctivas oportunas.",
    topic: "Seguimiento en fase de inversión"
  },
  {
    id: 4,
    question: "El análisis de riesgos en la formulación de un proyecto busca:",
    options: [
      "Ignorar los problemas potenciales",
      "Identificar, evaluar y establecer estrategias de mitigación para los eventos que podrían afectar negativamente el cumplimiento de los objetivos del proyecto",
      "Solo listar obstáculos sin soluciones",
      "Cancelar el proyecto ante cualquier riesgo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El análisis de riesgos busca identificar eventos potenciales que podrían afectar el proyecto (técnicos, financieros, sociales, ambientales, institucionales), evaluar su probabilidad e impacto, y establecer estrategias de prevención, mitigación o contingencia.",
    topic: "Análisis de riesgos"
  },
  {
    id: 5,
    question: "Los estudios de impacto ambiental de un proyecto de infraestructura deben:",
    options: [
      "Presentarse solo si la comunidad lo solicita",
      "Identificar, predecir y evaluar los impactos ambientales del proyecto, y proponer medidas de prevención, mitigación, corrección y compensación",
      "Únicamente mencionar que el proyecto es ambientalmente viable",
      "Solo cumplir un trámite formal sin análisis real"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los estudios de impacto ambiental deben identificar, predecir, valorar y comunicar los efectos del proyecto sobre el medio ambiente (físico, biótico y social), y proponer el Plan de Manejo Ambiental con medidas de prevención, mitigación, corrección y compensación.",
    topic: "Impacto ambiental"
  },
  {
    id: 6,
    question: "La población objetivo de un proyecto es:",
    options: [
      "Toda la población del país",
      "El grupo poblacional afectado por el problema y que será beneficiado directamente con la ejecución del proyecto",
      "Solo los funcionarios públicos",
      "Únicamente los políticos de la región"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La población objetivo es el grupo específico de personas, hogares o entidades afectadas por el problema identificado y que recibirán los beneficios directos del proyecto una vez ejecutado. Debe ser cuantificada y caracterizada con precisión.",
    topic: "Población objetivo"
  },
  // MGA
  {
    id: 7,
    question: "La ficha de Estadísticas Básicas de Inversión (EBI) en el BPIN contiene:",
    options: [
      "Solo el nombre del proyecto",
      "Información resumida del proyecto: nombre, objetivo, localización, población beneficiada, costo total, fuentes de financiación, plazo de ejecución y clasificación sectorial",
      "Únicamente el presupuesto",
      "Solo la fecha de registro"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La ficha EBI contiene información resumida del proyecto registrado en el BPIN: identificación, objetivo general, localización, población beneficiada, costo total, fuentes de financiación, plazo de ejecución, sector, clasificación presupuestal y estado del proyecto.",
    topic: "Ficha EBI - BPIN"
  },
  {
    id: 8,
    question: "Para registrar un proyecto en el Banco de Proyectos de Inversión Municipal o Departamental, se requiere:",
    options: [
      "Solo la aprobación verbal del alcalde",
      "Formulación completa según la MGA, concepto favorable de viabilidad técnica de la oficina de planeación, y disponibilidad presupuestal",
      "Únicamente el acta de reunión comunitaria",
      "Solo el nombre y costo estimado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El registro requiere: formulación completa del proyecto según la MGA territorial, concepto de viabilidad técnica, financiera y socioambiental de la oficina de planeación, certificado de disponibilidad presupuestal, y cumplimiento de requisitos normativos específicos.",
    topic: "Registro en bancos territoriales"
  },
  {
    id: 9,
    question: "El costo de oportunidad en la evaluación de proyectos representa:",
    options: [
      "El precio de mercado de los materiales",
      "El valor de la mejor alternativa a la que se renuncia al destinar recursos a un proyecto en lugar de otro",
      "Solo el costo financiero del proyecto",
      "Únicamente los gastos administrativos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El costo de oportunidad representa el valor de la mejor alternativa de inversión a la que se renuncia al asignar recursos escasos a un proyecto determinado. Es fundamental en la evaluación económica para tomar decisiones de inversión pública eficientes.",
    topic: "Costo de oportunidad"
  },
  {
    id: 10,
    question: "Los indicadores de producto en la MGA miden:",
    options: [
      "Solo el presupuesto gastado",
      "Los bienes, servicios u obras entregadas por el proyecto durante su ejecución (kilómetros de vía construidos, escuelas dotadas, personas capacitadas, etc.)",
      "Únicamente el tiempo transcurrido",
      "Solo la satisfacción de los funcionarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los indicadores de producto miden los bienes, servicios u obras que entrega directamente el proyecto durante su ejecución (outputs). Ejemplos: km de vía pavimentados, número de viviendas construidas, personas capacitadas, equipos instalados.",
    topic: "Indicadores de producto - MGA"
  },
  {
    id: 11,
    question: "La tasa de descuento en la evaluación económica de proyectos públicos en Colombia es definida por:",
    options: [
      "Cada alcalde libremente",
      "El Departamento Nacional de Planeación (DNP), actualmente establecida en el 9% para proyectos sociales",
      "Los bancos comerciales",
      "El contratista del proyecto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El DNP establece la tasa social de descuento oficial para la evaluación de proyectos públicos en Colombia, que actualmente es del 9% para proyectos de inversión social. Esta tasa se utiliza para calcular el VPN y evaluar la rentabilidad social del proyecto.",
    topic: "Tasa de descuento"
  },
  {
    id: 12,
    question: "La participación comunitaria en la formulación de proyectos implica:",
    options: [
      "Solo informar al final del proyecto",
      "Involucrar a la comunidad desde el diagnóstico, priorización de necesidades, diseño de alternativas y validación de soluciones, garantizando pertinencia y apropiación",
      "Únicamente recolectar firmas de apoyo",
      "Solo convocar a una reunión informativa"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La participación comunitaria efectiva implica involucrar a la comunidad desde la identificación del problema, priorización de necesidades, diseño de alternativas de solución, toma de decisiones y validación, garantizando pertinencia, apropiación y sostenibilidad del proyecto.",
    topic: "Participación comunitaria"
  },
  {
    id: 13,
    question: "El enfoque diferencial en proyectos públicos busca:",
    options: [
      "Tratar a todos exactamente igual sin distinción",
      "Reconocer y atender las necesidades específicas de grupos poblacionales vulnerables o con características particulares (niños, adultos mayores, discapacidad, género, etnia)",
      "Solo cumplir requisitos legales sin impacto real",
      "Excluir grupos minoritarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El enfoque diferencial reconoce que existen grupos poblacionales con necesidades, condiciones y características particulares (niños, adultos mayores, personas con discapacidad, grupos étnicos, género), y diseña intervenciones específicas para garantizar equidad y no discriminación.",
    topic: "Enfoque diferencial"
  },
  {
    id: 14,
    question: "Los términos de referencia de los estudios técnicos de un proyecto deben especificar:",
    options: [
      "Solo el presupuesto disponible",
      "El objeto del estudio, alcance, productos esperados, metodología, plazo de ejecución, requisitos del contratista y criterios de evaluación",
      "Únicamente el nombre del consultor",
      "Solo la fecha de entrega"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los términos de referencia deben especificar: objeto y justificación del estudio, alcance técnico y geográfico, productos y entregables esperados, metodología a aplicar, plazo de ejecución, requisitos del consultor (experiencia, equipo), y criterios de evaluación de las propuestas.",
    topic: "Términos de referencia"
  },
  // Marco lógico
  {
    id: 15,
    question: "Los indicadores de la Matriz de Marco Lógico deben ser:",
    options: [
      "Generales y subjetivos",
      "Específicos, Medibles, Alcanzables, Relevantes y con Tiempo definido (SMART), permitiendo verificar objetivamente el logro de objetivos",
      "Imposibles de medir",
      "Copiados de otros proyectos sin adaptación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los indicadores deben cumplir el criterio SMART: Específicos (claros y precisos), Medibles (cuantificables), Alcanzables (realistas), Relevantes (relacionados con los objetivos) y con Tiempo definido (plazo de medición), para verificar objetivamente el logro de resultados.",
    topic: "Indicadores - Marco Lógico"
  },
  {
    id: 16,
    question: "Los medios de verificación en la Matriz de Marco Lógico son:",
    options: [
      "Opiniones personales sin respaldo",
      "Las fuentes de información donde se puede obtener los datos para calcular y verificar los indicadores (encuestas, registros, informes, estudios, estadísticas)",
      "Solo rumores de la comunidad",
      "Únicamente las actas de reunión"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los medios de verificación identifican las fuentes de información donde se obtendrán los datos necesarios para calcular y verificar los indicadores: encuestas, registros administrativos, informes técnicos, estudios, bases de datos, estadísticas oficiales, documentos de proyecto.",
    topic: "Medios de verificación - Marco Lógico"
  },
  {
    id: 17,
    question: "Los supuestos en la Matriz de Marco Lógico representan:",
    options: [
      "Garantías absolutas de éxito",
      "Condiciones o factores externos importantes que están fuera del control del proyecto, pero que son necesarios para el logro de los objetivos",
      "Obstáculos insuperables",
      "Solo especulaciones sin fundamento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los supuestos son condiciones o factores externos (políticos, sociales, ambientales, económicos) que están fuera del control directo del proyecto, pero cuyo cumplimiento es necesario para alcanzar los objetivos. Si los supuestos no se cumplen, el proyecto puede fallar.",
    topic: "Supuestos - Marco Lógico"
  },
  {
    id: 18,
    question: "La relación lógica vertical en la Matriz de Marco Lógico establece que:",
    options: [
      "No existe relación entre los niveles",
      "Si se realizan las Actividades se logran los Componentes; si se logran los Componentes se alcanza el Propósito; si se alcanza el Propósito se contribuye al Fin",
      "Solo importa el presupuesto",
      "Los niveles son independientes entre sí"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La lógica vertical establece la relación causa-efecto: Actividades → Componentes → Propósito → Fin. Si se ejecutan las actividades, se logran los componentes (productos); si se entregan los componentes, se alcanza el propósito (objetivo); si se logra el propósito, se contribuye al fin (impacto).",
    topic: "Lógica vertical - Marco Lógico"
  },
  {
    id: 19,
    question: "Un indicador de gestión (proceso) mide:",
    options: [
      "Solo el impacto final del proyecto",
      "La eficiencia en el uso de recursos y la ejecución de actividades durante la implementación del proyecto (% ejecución presupuestal, cumplimiento cronograma)",
      "Únicamente la satisfacción del contratista",
      "Solo los resultados de largo plazo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los indicadores de gestión o proceso miden la eficiencia y eficacia en la ejecución del proyecto: porcentaje de ejecución presupuestal, cumplimiento del cronograma, personal contratado vs. planeado, actividades ejecutadas, uso de recursos.",
    topic: "Indicadores de gestión"
  },
  {
    id: 20,
    question: "Un indicador de resultado mide:",
    options: [
      "Solo los gastos realizados",
      "Los cambios o efectos directos logrados en la población objetivo al finalizar el proyecto (cobertura alcanzada, beneficiarios atendidos, mejoras en servicios)",
      "Únicamente el número de reuniones realizadas",
      "Solo la cantidad de documentos producidos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los indicadores de resultado miden los cambios o efectos directos logrados en la población objetivo al concluir el proyecto: cobertura de servicios alcanzada, beneficiarios directos atendidos, mejoras en calidad, acceso o disponibilidad de servicios.",
    topic: "Indicadores de resultado"
  },
  // Presupuesto y financiación
  {
    id: 21,
    question: "El Valor Presente Neto (VPN) de un proyecto es:",
    options: [
      "El costo total del proyecto",
      "El valor actual de los flujos futuros de beneficios netos del proyecto, descontados a una tasa específica; un VPN positivo indica viabilidad económica",
      "Solo el presupuesto inicial",
      "Únicamente los ingresos esperados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El VPN es el valor presente de los flujos de beneficios netos futuros (beneficios menos costos) del proyecto, descontados con la tasa social de descuento. Un VPN > 0 indica que el proyecto es económicamente viable y genera valor social neto positivo.",
    topic: "Valor Presente Neto (VPN)"
  },
  {
    id: 22,
    question: "La Tasa Interna de Retorno (TIR) de un proyecto es:",
    options: [
      "La tasa de interés bancaria",
      "La tasa de descuento que hace que el VPN del proyecto sea igual a cero; si la TIR supera la tasa de descuento social, el proyecto es viable",
      "Solo la inflación anual",
      "Únicamente el costo de oportunidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La TIR es la tasa de descuento que hace que el VPN del proyecto sea igual a cero. Si la TIR es mayor que la tasa social de descuento (9%), el proyecto es económicamente viable. La TIR representa la rentabilidad social del proyecto.",
    topic: "Tasa Interna de Retorno (TIR)"
  },
  {
    id: 23,
    question: "La relación Beneficio/Costo (B/C) indica:",
    options: [
      "Solo los gastos del proyecto",
      "El valor presente de los beneficios dividido por el valor presente de los costos; una relación B/C mayor a 1 indica que los beneficios superan los costos",
      "Únicamente el tiempo de ejecución",
      "Solo el número de beneficiarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La relación B/C es el cociente entre el valor presente de los beneficios y el valor presente de los costos del proyecto. Una relación B/C > 1 indica que los beneficios superan los costos, por lo tanto el proyecto es económicamente conveniente.",
    topic: "Relación Beneficio/Costo"
  },
  {
    id: 24,
    question: "El flujo de caja de un proyecto muestra:",
    options: [
      "Solo los ingresos iniciales",
      "Los ingresos, egresos y saldo neto de efectivo del proyecto en cada periodo de tiempo (mensual o anual), permitiendo evaluar la liquidez y viabilidad financiera",
      "Únicamente los gastos de personal",
      "Solo el presupuesto aprobado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El flujo de caja proyecta los ingresos, egresos y saldo neto de efectivo del proyecto en cada periodo (mensual o anual), permitiendo evaluar la liquidez, identificar necesidades de financiamiento, y calcular indicadores de viabilidad financiera como VPN y TIR.",
    topic: "Flujo de caja"
  },
  {
    id: 25,
    question: "El análisis de sensibilidad en la evaluación de proyectos consiste en:",
    options: [
      "Solo presentar el escenario optimista",
      "Evaluar cómo cambian los indicadores de viabilidad (VPN, TIR, B/C) ante variaciones en variables críticas como costos, beneficios, demanda o tasa de descuento",
      "Únicamente calcular el costo total",
      "Solo duplicar el presupuesto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El análisis de sensibilidad evalúa cómo varían los indicadores de viabilidad (VPN, TIR, B/C) cuando cambian variables críticas del proyecto (costos de inversión, beneficios esperados, demanda, tasa de descuento), identificando riesgos y robustez de la decisión de inversión.",
    topic: "Análisis de sensibilidad"
  }
]

export function FormulacionTest() {
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
    setShowFeedback(false)
  }

  const calculateScore = () => {
    let score = 0
    currentQuestions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        score += question.points
      }
    })
    return score
  }

  const totalPoints = currentQuestions.reduce((sum, q) => sum + q.points, 0)

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const score = calculateScore()
  const percentage = totalPoints > 0 ? (score / totalPoints) * 100 : 0

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="v1">Versión 1</TabsTrigger>
          <TabsTrigger value="v2">Versión 2</TabsTrigger>
        </TabsList>

        <TabsContent value="v1" className="space-y-6 mt-6">
          {renderQuestions()}
        </TabsContent>

        <TabsContent value="v2" className="space-y-6 mt-6">
          {renderQuestions()}
        </TabsContent>
      </Tabs>
    </div>
  )

  function renderQuestions() {
    return (
      <>
        {!showResults && (
          <TestTimer
            formattedTime={timer.formattedTime}
            timeColor={timer.timeColor}
            percentageRemaining={timer.percentageRemaining}
          />
        )}

        {showResults && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Resultados de la Prueba
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Puntuación</p>
                  <p className="text-3xl font-bold text-primary">
                    {score} / {totalPoints}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Porcentaje</p>
                  <p className="text-3xl font-bold text-primary">{percentage.toFixed(1)}%</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  {percentage >= 80
                    ? "¡Excelente! Dominas la formulación de proyectos públicos."
                    : percentage >= 60
                    ? "Buen trabajo. Continúa estudiando la metodología MGA."
                    : "Sigue practicando. Revisa el DNP y la normativa de proyectos."}
                </p>
              </div>
              <Button onClick={handleReset} className="w-full">
                Reiniciar Prueba
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {currentQuestions.map((question, index) => (
            <Card
              key={question.id}
              className={
                showFeedback && answers[question.id] !== undefined
                  ? answers[question.id] === question.correctAnswer
                    ? "border-green-500"
                    : "border-red-500"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-base">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="flex-1">Pregunta {index + 1}</span>
                  {showFeedback && answers[question.id] !== undefined && (
                    answers[question.id] === question.correctAnswer ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    )
                  )}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Tema: {question.topic}
                </CardDescription>
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
                      className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors ${
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
                        id={`q${question.id}-opt${optionIndex}`}
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor={`q${question.id}-opt${optionIndex}`}
                        className="flex-1 cursor-pointer leading-relaxed"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {showFeedback && answers[question.id] !== undefined && (
                  <Alert className={answers[question.id] === question.correctAnswer ? "border-green-500 bg-green-50" : "border-orange-500 bg-orange-50"}>
                    <AlertTitle className="font-semibold">
                      {answers[question.id] === question.correctAnswer ? "¡Correcto!" : "Incorrecto"}
                    </AlertTitle>
                    <AlertDescription className="text-sm mt-2 leading-relaxed">
                      {question.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {!showResults && (
          <div className="flex justify-center pt-6">
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={Object.keys(answers).length !== currentQuestions.length}
              className="min-w-[200px]"
            >
              {Object.keys(answers).length === currentQuestions.length
                ? "Ver Resultados"
                : `Responde todas las preguntas (${Object.keys(answers).length}/${currentQuestions.length})`}
            </Button>
          </div>
        )}
      </>
    )
  }
}
