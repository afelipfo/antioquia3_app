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

export const questionsV1: Question[] = [
  {
    id: 1,
    question: "Situacion\n\nLa Gobernacion de Antioquia esta revisando su marco de gestion institucional para mejorar el cumplimiento de metas y la respuesta al ciudadano. El equipo directivo necesita clarificar cual es la finalidad principal del modelo que deben implementar.\n\nPregunta\n\nSegun la situacion descrita, ¿cual es el proposito central del Modelo Integrado de Planeacion y Gestion (MIPG)?",
    options: [
      "Unificar unicamente los manuales de funciones de las entidades publicas",
      "Dirigir, planear, ejecutar, hacer seguimiento, evaluar y controlar la gestion publica para obtener resultados alineados con los planes de desarrollo y resolver necesidades ciudadanas con integridad y calidad",
      "Sustituir los sistemas de control fiscal y disciplinario existentes",
      "Establecer un manual unico de tramites para todas las entidades"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Gobernacion debe entender que el MIPG actua como marco de referencia para todo el ciclo de gestion publica con el fin de generar resultados alineados con los planes de desarrollo y responder a las necesidades ciudadanas con integridad y calidad.",
    topic: "Proposito del MIPG"
  },
  {
    id: 2,
    question: "Situacion\n\nEl asesor juridico de una alcaldia municipal esta preparando un informe sobre el marco legal que sustenta el MIPG. Necesita identificar que establece la normatividad base del modelo para presentarlo al Concejo Municipal.\n\nPregunta\n\nCon base en la situacion descrita, ¿que establece la Ley 489 de 1998 en relacion con el MIPG?",
    options: [
      "Obliga a las entidades territoriales a adoptar el Modelo Estandar de Control Interno (MECI)",
      "Articula el Sistema de Desarrollo Administrativo como conjunto de politicas, estrategias y mecanismos para fortalecer la capacidad administrativa y el desempeno institucional",
      "Crea el Sistema de Gestion de la Calidad en el Estado",
      "Define los indicadores del Indice de Desempeno Institucional"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el asesor juridico debe explicar al Concejo que la Ley 489 de 1998 articulo el Sistema de Desarrollo Administrativo, que constituye la base del MIPG al fortalecer la gestion y desempeno institucional.",
    topic: "Marco legal del MIPG"
  },
  {
    id: 3,
    question: "Situacion\n\nUna entidad del orden nacional esta actualizando su marco normativo interno y necesita comprender como evoluciono la integracion de sistemas de gestion. El equipo de planeacion debe identificar que ordeno la Ley del Plan Nacional de Desarrollo 2014-2018.\n\nPregunta\n\nSegun la situacion planteada, ¿que ordeno el articulo 133 de la Ley 1753 de 2015?",
    options: [
      "Crear un sistema independiente para el control disciplinario de los servidores",
      "Integrar en un unico Sistema de Gestion los Sistemas de Gestion de la Calidad y de Desarrollo Administrativo",
      "Eliminar el Sistema de Gestion de la Calidad de las entidades publicas",
      "Trasladar la planeacion institucional al Departamento Nacional de Planeacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el equipo de planeacion debe conocer que la Ley 1753 de 2015 mandato integrar los sistemas de Gestion de la Calidad y de Desarrollo Administrativo, siendo este el antecedente directo del MIPG.",
    topic: "Marco legal del MIPG"
  },
  {
    id: 4,
    question: "Situacion\n\nEl jefe de control interno de una entidad descentralizada esta capacitando a los nuevos funcionarios sobre la reglamentacion del MIPG. Debe explicarles cual decreto formalizo el modelo como marco unico de gestion publica.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cual decreto formalizo el MIPG como modelo unico de gestion publica?",
    options: [
      "Decreto 1083 de 2015",
      "Decreto 1499 de 2017",
      "Decreto 1599 de 2005",
      "Decreto 943 de 2014"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el jefe de control interno debe explicar a los funcionarios que el Decreto 1499 de 2017 modifico el Decreto 1083 de 2015 y formalizo al MIPG como modelo unico de gestion publica.",
    topic: "Marco legal del MIPG"
  },
  {
    id: 5,
    question: "Situacion\n\nUna empresa industrial y comercial del Estado con 95% de capital publico esta evaluando si debe implementar el MIPG. El gerente ha solicitado al equipo juridico un concepto sobre el alcance de aplicacion del modelo.\n\nPregunta\n\nSegun la situacion descrita y el articulo 2.2.22.3.4 del Decreto 1083 de 2015, ¿a que entidades aplica el MIPG?",
    options: [
      "Solo a las entidades del orden nacional de la Rama Ejecutiva",
      "A los organismos y entidades de los ordenes nacional y territorial de la Rama Ejecutiva y a entidades descentralizadas con 90 % o mas de capital publico",
      "Exclusivamente a entidades sometidas al regimen de empresa industrial y comercial",
      "Unicamente a las entidades del orden territorial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la empresa con 95% de capital publico debe implementar el MIPG, ya que el alcance del modelo cubre organismos y entidades de la Rama Ejecutiva en los niveles nacional y territorial, asi como entidades descentralizadas con participacion estatal igual o superior al 90%.",
    topic: "Alcance institucional"
  },
  {
    id: 6,
    question: "Situacion\n\nDurante una jornada de induccion, un facilitador esta explicando los principios que orientan el MIPG. Un funcionario nuevo pregunta cuales son los principios del modelo para poder identificar practicas contrarias a estos.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual de los siguientes NO es un principio del MIPG?",
    options: [
      "Aprendizaje e innovacion",
      "Excelencia y calidad",
      "Integridad y confianza",
      "Competencia desleal entre entidades"
    ],
    correctAnswer: 3,
    points: 5,
    explanation: "En la situacion descrita, el facilitador debe aclarar que los principios del MIPG son aprendizaje e innovacion, orientacion a resultados, integridad y confianza, articulacion interinstitucional, decisiones basadas en evidencias y excelencia y calidad. La competencia desleal no es un principio del modelo.",
    topic: "Principios del MIPG"
  },
  {
    id: 7,
    question: "Situacion\n\nUna secretaria de despacho esta tomando una decision sobre la priorizacion de proyectos de inversion. Un asesor le sugiere basarse en el principio de toma de decisiones basadas en evidencias del MIPG.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que implica el principio de toma de decisiones basadas en evidencias?",
    options: [
      "Utilizar informacion confiable para soportar las decisiones publicas",
      "Priorizar la intuicion del directivo sobre la informacion disponible",
      "Tomar decisiones unicamente con base en solicitudes ciudadanas",
      "Evitar el uso de datos para acelerar la gestion"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, la secretaria debe aplicar este principio utilizando informacion confiable que respalde la decision sobre priorizacion de proyectos, ya que una de las bases del MIPG es decidir con evidencia.",
    topic: "Principios del MIPG"
  },
  {
    id: 8,
    question: "Situacion\n\nEl director de planeacion de un departamento esta preparando una presentacion sobre la estructura del MIPG para el comite directivo. Necesita explicar claramente como esta organizado el modelo.\n\nPregunta\n\nSegun la situacion descrita, ¿como esta conformado el MIPG?",
    options: [
      "Siete dimensiones de gestion y diecinueve politicas de gestion y desempeno",
      "Cuatro componentes y diez politicas de transparencia",
      "Nueve lineas estrategicas sin politicas asociadas",
      "Dos dimensiones y seis principios operativos"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el director de planeacion debe explicar al comite directivo que el modelo se estructura en siete dimensiones de gestion y diecinueve politicas de gestion y desempeno.",
    topic: "Estructura del MIPG"
  },
  {
    id: 9,
    question: "Situacion\n\nLa oficina de talento humano de una entidad territorial esta formulando su Plan Estrategico de Talento Humano (PETH). El jefe de la oficina necesita clarificar que exige la politica de Gestion Estrategica del Talento Humano del MIPG.\n\nPregunta\n\nCon base en la situacion descrita, ¿que exige la politica de Gestion Estrategica del Talento Humano dentro del MIPG?",
    options: [
      "Elaborar exclusivamente un plan anual de capacitacion",
      "Disponer de informacion, diagnosticar la gestion de talento, disenar acciones y evaluar el Plan Estrategico de Talento Humano (PETH)",
      "Externalizar la administracion del talento humano en una firma privada",
      "Focalizar la gestion en la reduccion de planta sin evaluacion previa"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la oficina de talento humano debe seguir la politica que orienta a contar con informacion, realizar diagnosticos, disenar acciones y evaluar el PETH de la entidad.",
    topic: "Dimension Talento Humano"
  },
  {
    id: 10,
    question: "Situacion\n\nUna entidad publica debe implementar su Programa de Transparencia y Etica Publica conforme a la Ley 2195 de 2022. El comite de etica necesita conocer que plantea el Manual Operativo del MIPG sobre la politica de integridad.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que plantea el Manual Operativo del MIPG sobre la politica de integridad?",
    options: [
      "Eliminar cualquier diagnostico de integridad para agilizar la gestion",
      "Formular estrategias sin evaluar resultados para no distraerse de la operacion",
      "Elaborar diagnosticos, formular estrategias y evaluar su implementacion; ademas, la Ley 2195 de 2022 fija plazos para adoptar Programas de Transparencia y Etica Publica",
      "Delegar la integridad en la oficina de control interno sin participacion del talento humano"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el comite de etica debe saber que la politica de integridad exige diagnosticar, formular y evaluar estrategias, y la Ley 2195 fija plazos para adoptar Programas de Transparencia y Etica Publica.",
    topic: "Dimension Talento Humano"
  },
  {
    id: 11,
    question: "Situacion\n\nEl equipo de planeacion de una secretaria departamental esta formulando su plan institucional para el nuevo periodo de gobierno. Necesitan alinear su planeacion con lo que establece el MIPG.\n\nPregunta\n\nSegun la situacion descrita, ¿en que se basa la planeacion institucional dentro del MIPG?",
    options: [
      "Definir el proposito de la entidad, a quien sirve, prioridades alineadas con los planes de desarrollo y evaluar las capacidades estrategicas y funcionales",
      "Adoptar planes de accion solamente cuando cambie la administracion",
      "Priorizar el gasto sobre la coherencia con los planes de desarrollo",
      "Repetir el plan del periodo anterior sin ajustes"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el equipo de planeacion debe partir del proposito de la entidad, el publico al que sirve, la definicion de prioridades alineadas con el plan de desarrollo y la evaluacion de capacidades estrategicas y funcionales.",
    topic: "Direccion estrategica y planeacion"
  },
  {
    id: 12,
    question: "Situacion\n\nEl area financiera de una alcaldia esta iniciando el proceso presupuestal del proximo ano. El tesorero necesita conocer que incluye la politica de Gestion Presupuestal y Eficiencia del Gasto del MIPG.\n\nPregunta\n\nCon base en la situacion descrita, ¿que incluye la politica de Gestion Presupuestal y Eficiencia del Gasto?",
    options: [
      "Elaborar exclusivamente el anteproyecto de presupuesto",
      "Programar el presupuesto, desagregarlo y formular el Plan Anual Mensualizado de Caja (PAC) para alinear ingresos y egresos",
      "Publicar estados financieros sin seguimiento al presupuesto",
      "Reducir el presupuesto sin atender prioridades institucionales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el tesorero debe aplicar la politica que comprende la programacion, desagregacion y formulacion del PAC para asegurar correspondencia entre recursos y gasto.",
    topic: "Direccion estrategica y planeacion"
  },
  {
    id: 13,
    question: "Situacion\n\nLa oficina de contratacion de una entidad nacional esta estructurando su Plan Anual de Adquisiciones. El jefe de contratacion necesita conocer que promueve el MIPG en materia de compras y contratacion publica.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que promueve el MIPG en compras y contratacion publica?",
    options: [
      "Evitar la planificacion de adquisiciones para actuar con flexibilidad",
      "Centrar la contratacion en acuerdos verbales con proveedores",
      "Estructurar el Plan Anual de Adquisiciones, usar SECOP II, incorporar analisis de datos y emplear la Tienda Virtual del Estado",
      "Restringir la competencia para mantener proveedores habituales"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, la oficina de contratacion debe aplicar la politica de compras que incluye el PAA, el uso de SECOP II, abastecimiento estrategico y herramientas como la Tienda Virtual del Estado.",
    topic: "Direccion estrategica y planeacion"
  },
  {
    id: 14,
    question: "Situacion\n\nUna entidad territorial esta rediseando sus procesos internos para mejorar la eficiencia operativa. El equipo de mejora continua necesita conocer que incluye el esquema operativo interno dentro de la dimension Gestion con valores para resultados.\n\nPregunta\n\nSegun la situacion descrita, ¿que incluye el esquema operativo interno dentro de la dimension Gestion con valores para resultados?",
    options: [
      "Unicamente la adquisicion de nuevos bienes muebles",
      "Comprender la situacion, redisenar procesos, trabajar por procesos, gestionar recursos fisicos, servicios internos y la gestion ambiental",
      "Reducir la gestion a la supervision contractual",
      "Delegar procesos internos a entes de control"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el equipo de mejora continua debe aplicar el esquema operativo interno que busca simplificar y fortalecer procesos internos, gestionar recursos y considerar la dimension ambiental.",
    topic: "Gestion con valores para resultados"
  },
  {
    id: 15,
    question: "Situacion\n\nLa oficina de atencion al ciudadano de una gobernacion esta formulando su estrategia de servicio. El coordinador necesita conocer que implica la politica de Servicio al Ciudadano del MIPG.\n\nPregunta\n\nCon base en la situacion descrita, ¿que implica la politica de Servicio al Ciudadano?",
    options: [
      "Atender unicamente a los usuarios que presenten reclamos formales",
      "Diagnosticar el estado del servicio, formular estrategias articuladas con la planeacion institucional, ejecutarlas y evaluarlas",
      "Crear canales digitales sin medir su efectividad",
      "Centralizar la atencion en oficinas de control interno"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el coordinador debe aplicar la politica que promueve un ciclo de diagnostico, formulacion, ejecucion y evaluacion para asegurar servicios de calidad al ciudadano.",
    topic: "Relacion Estado-ciudadano"
  },
  {
    id: 16,
    question: "Situacion\n\nUna entidad publica esta revisando sus tramites para facilitar el acceso de los ciudadanos a servicios como licencias y certificados. El equipo de racionalizacion necesita conocer que busca la politica de simplificacion de tramites.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que busca la simplificacion y racionalizacion de tramites?",
    options: [
      "Aumentar los requisitos para garantizar mayor control",
      "Reducir costos, tiempos y requisitos para facilitar el acceso a derechos",
      "Suspender la prestacion de servicios presenciales",
      "Reemplazar todos los tramites por declaraciones juramentadas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el equipo de racionalizacion debe aplicar la politica de tramites que pretende facilitar el acceso a derechos mediante la reduccion de costos, tiempos y requisitos.",
    topic: "Relacion Estado-ciudadano"
  },
  {
    id: 17,
    question: "Situacion\n\nUna alcaldia esta disenando espacios de participacion ciudadana para incluir a la comunidad en la formulacion del plan de desarrollo. El equipo de participacion necesita conocer que requiere la politica del MIPG sobre este tema.\n\nPregunta\n\nSegun la situacion descrita, ¿que requiere la participacion ciudadana en la gestion publica dentro del MIPG?",
    options: [
      "Limitar la incidencia ciudadana a la etapa de evaluacion de proyectos",
      "Garantizar la incidencia efectiva de la ciudadania en diagnostico, planeacion, ejecucion y evaluacion mediante diagnosticos, estrategias y acciones en cada fase",
      "Sustituir los mecanismos de control social existentes",
      "Reducir los espacios de participacion a encuestas anonimas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el equipo de participacion debe disenar diagnosticos, estrategias y acciones que permitan la incidencia ciudadana efectiva en todas las fases de la gestion publica, incluyendo la formulacion del plan de desarrollo.",
    topic: "Relacion Estado-ciudadano"
  },
  {
    id: 18,
    question: "Situacion\n\nEl comite de transparencia de una entidad esta actualizando su plan anticorrupcion. El secretario tecnico necesita identificar en que leyes se soporta la politica de Transparencia, Acceso a la Informacion y Lucha contra la Corrupcion.\n\nPregunta\n\nCon base en la situacion descrita, ¿en que se soporta la politica de Transparencia, Acceso a la Informacion y Lucha contra la Corrupcion?",
    options: [
      "Las leyes 1474 de 2011, 1712 de 2014 y 2195 de 2022",
      "Unicamente en la Ley 489 de 1998",
      "La Ley 80 de 1993 y sus decretos reglamentarios",
      "El Codigo de Comercio"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el secretario tecnico debe saber que las leyes 1474 de 2011, 1712 de 2014 y 2195 de 2022 fundamentan la politica de transparencia y acceso a la informacion que debe incluirse en el plan anticorrupcion.",
    topic: "Gestion de recursos y transparencia"
  },
  {
    id: 19,
    question: "Situacion\n\nEl oficial de seguridad de la informacion de una entidad esta elaborando el plan de seguridad digital. Necesita conocer que busca la politica de Seguridad Digital del MIPG para orientar sus acciones.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que busca la politica de Seguridad Digital?",
    options: [
      "Delegar el manejo de riesgos digitales a proveedores externos",
      "Fortalecer capacidades para identificar y mitigar riesgos de seguridad digital, promover resiliencia y cooperacion",
      "Limitar el uso de herramientas digitales en la gestion publica",
      "Suspender el intercambio de informacion entre entidades"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el oficial de seguridad debe orientar su plan hacia el fortalecimiento de capacidades, mitigacion de riesgos y promocion de resiliencia y cooperacion frente a amenazas digitales.",
    topic: "Gestion de recursos y transparencia"
  },
  {
    id: 20,
    question: "Situacion\n\nLa oficina juridica de una entidad esta estructurando su estrategia de defensa judicial para prevenir condenas. El jefe juridico necesita conocer que abarca la politica de Defensa Juridica del MIPG.\n\nPregunta\n\nSegun la situacion descrita, ¿que abarca la politica de Defensa Juridica?",
    options: [
      "Unicamente la firma de contratos con abogados externos",
      "Las etapas de prevencion del dano antijuridico, defensa judicial, cumplimiento de sentencias y acciones de repeticion para recuperar recursos publicos",
      "El registro de bienes muebles de la entidad",
      "La supervision de auditorias internas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el jefe juridico debe estructurar su estrategia considerando que la defensa juridica articula prevencion del dano, defensa judicial, cumplimiento de sentencias y acciones de repeticion para recuperar recursos publicos.",
    topic: "Gestion de recursos y transparencia"
  }
]

const questionsV2: Question[] = [
  {
    id: 1,
    question: "Situacion\n\nEl Departamento Administrativo de la Funcion Publica esta capacitando a servidores de diferentes entidades sobre los conceptos basicos del MIPG. Un participante pregunta como define el decreto reglamentario al Sistema de Gestion.\n\nPregunta\n\nCon base en la situacion descrita, ¿como define el articulo 2.2.22.1.1 del Decreto 1083 de 2015 al Sistema de Gestion?",
    options: [
      "Un manual de procedimientos para tramites ciudadanos",
      "El conjunto de entidades, organismos, politicas y recursos que orientan la gestion publica hacia un mejor desempeno institucional y la satisfaccion de necesidades ciudadanas",
      "Una lista de indicadores financieros para el sector publico",
      "Un sistema de control fiscal para las entidades territoriales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el capacitador debe explicar que el decreto define el Sistema de Gestion como el conjunto de actores, politicas y recursos que orientan la gestion publica hacia el buen desempeno y la satisfaccion de los ciudadanos.",
    topic: "Definicion del Sistema de Gestion"
  },
  {
    id: 2,
    question: "Situacion\n\nUn instituto cientifico adscrito al Ministerio de Ciencia esta evaluando como debe aplicar el MIPG considerando su regimen especial. El director necesita clarificar las obligaciones de las entidades con regimen especial.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que deben hacer las entidades con regimen especial (Ramas Legislativa y Judicial, organismos de control, Organizacion Electoral e institutos cientificos)?",
    options: [
      "Aplicar la totalidad de las politicas del MIPG sin excepcion",
      "Aplicar la politica de control interno de la Ley 87 de 1993 y las demas politicas de gestion en la medida en que sean aplicables",
      "Excluirse completamente del MIPG",
      "Someterse unicamente al Modelo Estandar de Control Interno sin politicas complementarias"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el instituto cientifico debe aplicar la politica de control interno prevista en la Ley 87 de 1993 y las demas politicas de gestion en la medida en que las pueda adoptar segun su naturaleza.",
    topic: "Alcance institucional"
  },
  {
    id: 3,
    question: "Situacion\n\nUna entidad publica esta formulando su codigo de integridad y necesita alinearlo con los principios del MIPG. El comite de etica debe comprender que implica el principio de integridad y confianza.\n\nPregunta\n\nSegun la situacion descrita, ¿que implica el principio de integridad y confianza del MIPG?",
    options: [
      "Reducir la participacion ciudadana para evitar riesgos reputacionales",
      "Conducir la gestion publica de manera etica y fortalecer la confianza ciudadana",
      "Delegar la etica exclusivamente en los organismos de control",
      "Priorizar resultados a cualquier costo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el comite de etica debe comprender que la integridad y la confianza promueven una gestion etica capaz de fortalecer la confianza ciudadana, lo cual debe reflejarse en el codigo de integridad.",
    topic: "Principios del MIPG"
  },
  {
    id: 4,
    question: "Situacion\n\nLa oficina de planeacion de una entidad esta estructurando su sistema de evaluacion de resultados. El jefe de planeacion necesita conocer que exige la dimension de Evaluacion de Resultados del MIPG.\n\nPregunta\n\nCon base en la situacion descrita, ¿que exige la dimension Evaluacion de Resultados?",
    options: [
      "Preparar unicamente informes financieros trimestrales",
      "Definir responsables, revisar indicadores, evaluar resultados y riesgos, medir la percepcion de los grupos de valor, documentar hallazgos y aplicar mejora continua",
      "Suspender los indicadores cuando se cumplan las metas iniciales",
      "Limitar la evaluacion a encuestas de satisfaccion ciudadana"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la oficina de planeacion debe estructurar un sistema que incluya asignacion de responsabilidades, actualizacion de indicadores, evaluacion de resultados y riesgos, medicion de percepciones y documentacion de mejoras.",
    topic: "Evaluacion de resultados"
  },
  {
    id: 5,
    question: "Situacion\n\nUn equipo de seguimiento y evaluacion esta disenando el tablero de indicadores de una entidad publica. Necesitan aplicar la clasificacion de indicadores que el MIPG adopta de la CEPAL.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cual es la clasificacion de indicadores de la CEPAL que incorpora la politica de seguimiento y evaluacion del desempeno institucional?",
    options: [
      "Eficiencia, eficacia, calidad y economia",
      "Impacto social, impacto ambiental y cobertura",
      "Produccion, distribucion y consumo",
      "Satisfaccion, competitividad y rentabilidad"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el equipo debe disenar el tablero de indicadores utilizando la clasificacion de eficiencia, eficacia, calidad y economia propuesta por la CEPAL y adoptada por el MIPG.",
    topic: "Evaluacion de resultados"
  },
  {
    id: 6,
    question: "Situacion\n\nUna secretaria de salud esta evaluando el efecto de un programa de vacunacion en la reduccion de enfermedades prevenibles. El equipo de epidemiologia necesita identificar que tipo de indicador usar para medir estos cambios.\n\nPregunta\n\nSegun la situacion descrita, ¿que tipo de indicador se usa para medir los cambios en las condiciones objetivas tras la intervencion de la entidad?",
    options: [
      "Indicador de productividad",
      "Indicador de impacto",
      "Indicador de eficacia",
      "Indicador de economia"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el equipo de epidemiologia debe usar indicadores de impacto que permiten valorar los cambios obtenidos en las condiciones de salud como resultado de la intervencion del programa de vacunacion.",
    topic: "Evaluacion de resultados"
  },
  {
    id: 7,
    question: "Situacion\n\nEl archivo central de una entidad territorial esta implementando el Programa de Gestion Documental. El archivista necesita conocer como se organiza la gestion documental en el MIPG.\n\nPregunta\n\nCon base en la situacion descrita, ¿como se organiza la gestion documental en el MIPG?",
    options: [
      "Aspectos estrategicos, administracion de archivos, procesos de gestion documental, dimension tecnologica y cultura organizacional",
      "Compra de equipos y contratacion de bodegas externas",
      "Digitalizacion de documentos en formato PDF sin control",
      "Publicacion inmediata de todos los archivos sin clasificacion"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el archivista debe organizar el Programa de Gestion Documental contemplando esas cinco areas para garantizar la preservacion y uso de la memoria institucional.",
    topic: "Informacion y comunicacion"
  },
  {
    id: 8,
    question: "Situacion\n\nUna entidad territorial esta fortaleciendo su produccion estadistica para mejorar la toma de decisiones. El coordinador de sistemas de informacion necesita conocer que incluye la gestion de la informacion estadistica del MIPG.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que incluye la gestion de la informacion estadistica dentro del MIPG?",
    options: [
      "Unicamente la elaboracion de boletines informativos",
      "Planificacion estadistica, fortalecimiento de registros administrativos y calidad estadistica",
      "Tercerizar la produccion estadistica sin supervision",
      "Limitarse a recopilar datos financieros"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el coordinador debe aplicar la politica estadistica que contempla la planificacion, el fortalecimiento de los registros administrativos y la garantia de calidad para mejorar la produccion estadistica.",
    topic: "Informacion y comunicacion"
  },
  {
    id: 9,
    question: "Situacion\n\nUna entidad publica esta creando su repositorio de buenas practicas y lecciones aprendidas. El lider de innovacion necesita conocer que busca la dimension de Gestion del Conocimiento e Innovacion del MIPG.\n\nPregunta\n\nSegun la situacion descrita, ¿que busca la dimension Gestion del Conocimiento e Innovacion?",
    options: [
      "Almacenar informacion sin compartirla para garantizar exclusividad",
      "Generar y producir conocimiento, contar con herramientas de uso y apropiacion, analitica institucional y cultura de compartirlo",
      "Eliminar la documentacion de buenas practicas para evitar duplicidades",
      "Subcontratar los procesos de innovacion sin participacion interna"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el lider de innovacion debe orientar el repositorio hacia la generacion, uso, analisis y cultura de compartir conocimiento para mejorar la gestion institucional.",
    topic: "Gestion del conocimiento e innovacion"
  },
  {
    id: 10,
    question: "Situacion\n\nEl jefe de control interno de una entidad esta actualizando el marco normativo del sistema de control interno. Necesita identificar las normas principales que lo soportan segun el MIPG.\n\nPregunta\n\nCon base en la situacion descrita, ¿en que normas se soporta el Sistema de Control Interno del MIPG?",
    options: [
      "La Constitucion, la Ley 87 de 1993, la Ley 489 de 1998, la Ley 1474 de 2011 y decretos como 1599/2005, 943/2014, 1083/2015, 648/2017 y 1499/2017",
      "La Ley 80 de 1993 y la Ley 1150 de 2007",
      "Unicamente el Codigo de Comercio",
      "La Ley 734 de 2002 y sus decretos reglamentarios"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el jefe de control interno debe conocer que el SCI se sustenta en la Constitucion, la Ley 87 y otras normas que consolidan el modelo de control interno.",
    topic: "Control interno"
  },
  {
    id: 11,
    question: "Situacion\n\nEl comite de coordinacion del sistema de control interno esta revisando los objetivos del sistema para alinearlos con el plan de accion de la entidad. El presidente del comite necesita clarificar cuales son los objetivos del SCI.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cuales son los objetivos del Sistema de Control Interno?",
    options: [
      "Garantizar informacion oportuna y confiable, gestionar riesgos, aplicar mecanismos de verificacion y evaluacion y asegurar eficiencia, eficacia y economia",
      "Solo custodiar los bienes muebles de la entidad",
      "Definir el presupuesto anual de inversion",
      "Aplicar sanciones disciplinarias a servidores publicos"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el presidente del comite debe explicar que los objetivos del SCI abarcan la confiabilidad de la informacion, la gestion de riesgos, la verificacion, la evaluacion y la eficiencia operativa.",
    topic: "Control interno"
  },
  {
    id: 12,
    question: "Situacion\n\nUna entidad esta preparando un informe sobre la gobernanza del Sistema de Control Interno para presentar al Consejo Directivo. El jefe de control interno necesita identificar quienes son los entes reguladores del sistema.\n\nPregunta\n\nSegun la situacion descrita, ¿cuales son los entes reguladores del Sistema de Control Interno?",
    options: [
      "Presidente de la Republica, Departamento Administrativo de la Funcion Publica, Congreso, Contaduria General y Contraloria General",
      "Ministerio de Hacienda y Corte Suprema",
      "Gobernaciones y alcaldias",
      "Organizaciones sindicales del sector publico"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el jefe de control interno debe informar al Consejo que estos entes regulan y orientan el Sistema de Control Interno a nivel nacional.",
    topic: "Control interno"
  },
  {
    id: 13,
    question: "Situacion\n\nDurante una capacitacion sobre control interno, un facilitador esta explicando los principios fundamentales del sistema. Un funcionario pregunta cuales son los principios que rigen el SCI segun el MIPG.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son los principios del Sistema de Control Interno?",
    options: [
      "Autogestion, autorregulacion y autocontrol",
      "Centralizacion, jerarquia y supervision externa",
      "Competitividad, rentabilidad y cobertura",
      "Flexibilidad, confidencialidad y reserva"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el facilitador debe explicar que el SCI descansa en la autogestion, la autorregulacion y el autocontrol como principios fundamentales.",
    topic: "Control interno"
  },
  {
    id: 14,
    question: "Situacion\n\nEl equipo de control interno esta actualizando la documentacion del Modelo Estandar de Control Interno (MECI). Necesitan revisar como se estructura el modelo para alinearlo con el MIPG.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿como se estructura el Modelo Estandar de Control Interno (MECI)?",
    options: [
      "Cinco componentes: ambiente de control, evaluacion de riesgos, actividades de control, informacion y comunicacion, y monitoreo",
      "Tres componentes: planificacion, ejecucion y cierre",
      "Siete componentes: direccion, talento, procesos, finanzas, control, tecnologia y cultura",
      "Dos componentes: auditoria interna y auditoria externa"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el equipo debe documentar que el MECI tiene cinco componentes articulados con 17 principios para fortalecer la gestion y el control.",
    topic: "Control interno"
  },
  {
    id: 15,
    question: "Situacion\n\nUna entidad esta implementando el modelo de lineas de defensa para fortalecer la gestion del riesgo institucional. El comite de riesgos necesita conocer la orientacion de las cuatro lineas de defensa del MIPG.\n\nPregunta\n\nSegun la situacion descrita, ¿a que estan orientadas las cuatro lineas de defensa dentro del MIPG?",
    options: [
      "Segregar funciones entre oficinas tecnicas para evitar duplicidades",
      "Gestionar el riesgo institucional asegurando control en la operacion, supervision, control interno independiente y control externo",
      "Sustituir los comites de coordinacion de control interno",
      "Garantizar la confidencialidad de la informacion financiera"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el comite de riesgos debe implementar las lineas de defensa para reforzar la gestion del riesgo desde la operacion, la supervision, el control interno independiente y el control externo.",
    topic: "Control interno"
  },
  {
    id: 16,
    question: "Situacion\n\nEl comite directivo de una entidad esta analizando los resultados del ultimo reporte del FURAG. El director de planeacion necesita explicar que mide el Indice de Desempeno Institucional (MDI).\n\nPregunta\n\nCon base en la situacion descrita, ¿que mide el Indice de Desempeno Institucional (MDI)?",
    options: [
      "La ejecucion presupuestal acumulada del ultimo ano",
      "La capacidad de las entidades para orientar sus procesos a producir bienes y servicios que solucionen necesidades ciudadanas con calidad e integridad",
      "La satisfaccion de los servidores publicos con el clima laboral",
      "El nivel de cumplimiento normativo en materia disciplinaria"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el director de planeacion debe explicar al comite que el MDI evalua la capacidad institucional de producir bienes y servicios que resuelvan necesidades ciudadanas con calidad e integridad.",
    topic: "Medicion del desempeno"
  },
  {
    id: 17,
    question: "Situacion\n\nEl jefe de control interno esta preparando el informe anual de evaluacion del sistema de control interno. Necesita conocer que permite medir el Indice de Control Interno para incluirlo en el informe.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que permite medir el Indice de Control Interno?",
    options: [
      "Medir la capacidad de aplicar lineamientos que orienten procesos de control y gestion de riesgos en las entidades",
      "Determinar la satisfaccion de los usuarios con los canales digitales",
      "Clasificar a las entidades segun su nivel de endeudamiento",
      "Evaluar el cumplimiento de los planes de compras"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el jefe de control interno debe incluir en su informe que el Indice de Control Interno mide la capacidad de aplicar lineamientos de control y gestion de riesgos.",
    topic: "Medicion del desempeno"
  },
  {
    id: 18,
    question: "Situacion\n\nUna entidad esta identificando que instancia lidera cada politica del MIPG para gestionar la articulacion interinstitucional. El enlace MIPG necesita conocer que entidad lidera las politicas de Gestion del Talento Humano, Integridad, Fortalecimiento organizacional, entre otras.\n\nPregunta\n\nSegun la situacion descrita, ¿que entidades lideran las politicas de Gestion del Talento Humano, Integridad, Fortalecimiento organizacional, Simplificacion de procesos, Racionalizacion de tramites, Participacion ciudadana, Gestion del conocimiento e innovacion y Control interno?",
    options: [
      "Departamento Administrativo de la Funcion Publica (DAFP)",
      "Ministerio de Hacienda y Credito Publico",
      "Departamento Nacional de Planeacion",
      "Procuraduria General de la Nacion"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el enlace MIPG debe saber que el DAFP lidera esas politicas dentro del MIPG para gestionar adecuadamente la articulacion interinstitucional.",
    topic: "Gobernanza de las politicas"
  },
  {
    id: 19,
    question: "Situacion\n\nUna entidad esta formulando su plan de accion anual y necesita articularse con la entidad lider de las politicas de planeacion y evaluacion. El jefe de planeacion necesita identificar que entidad lidera estas politicas.\n\nPregunta\n\nCon base en la situacion descrita, ¿que politicas lidera principalmente el Departamento Nacional de Planeacion (DNP)?",
    options: [
      "Gestion del talento humano y control interno",
      "Planeacion institucional y evaluacion de resultados",
      "Gobierno digital y seguridad digital",
      "Defensa juridica y mejora normativa"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el jefe de planeacion debe articularse con el DNP que lidera la planeacion institucional y la evaluacion de resultados en el marco del MIPG.",
    topic: "Gobernanza de las politicas"
  },
  {
    id: 20,
    question: "Situacion\n\nLa oficina de contratacion de una entidad territorial necesita articularse con la entidad lider de la politica de Compras y Contratacion Publica para recibir lineamientos. El jefe de contratacion necesita identificar quien lidera esta politica.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cual entidad lidera la politica de Compras y Contratacion Publica dentro del MIPG?",
    options: [
      "Agencia Nacional de Contratacion Publica - Colombia Compra Eficiente",
      "Departamento Administrativo Nacional de Estadistica (DANE)",
      "Archivo General de la Nacion",
      "Ministerio de Justicia y del Derecho"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el jefe de contratacion debe articularse con Colombia Compra Eficiente, que lidera la politica de compras y contratacion publica en el marco del MIPG.",
    topic: "Gobernanza de las politicas"
  }
]

export function MipgTest() {
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2">("v1")
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
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
    setAnsweredQuestions(new Set())
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    if (answeredQuestions.has(questionId)) return
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex
    }))
    setAnsweredQuestions((prev) => new Set(prev).add(questionId))
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
    setAnsweredQuestions(new Set())
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
          Esta prueba contiene {questions.length} preguntas sobre el Modelo Integrado de Planeacion y Gestion (MIPG).
          Total de puntos disponibles: {questions.reduce((sum, q) => sum + q.points, 0)} puntos.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selecciona la version de la prueba</CardTitle>
          <CardDescription>
            Cada version incluye 20 preguntas diferentes sobre las dimensiones, politicas, principios e instrumentos del MIPG.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedVersion} onValueChange={handleVersionChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="v1" disabled={showResults}>
                Version 1
              </TabsTrigger>
              <TabsTrigger value="v2" disabled={showResults}>
                Version 2
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {showResults && (
            <p className="mt-3 text-sm text-muted-foreground">Reinicia la prueba para cambiar de version.</p>
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

      {questions.map((question, index) => {
        const isAnswered = answeredQuestions.has(question.id)
        return (
          <Card
            key={question.id}
            className={`border ${
              isAnswered && answers[question.id] !== undefined
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
                {isAnswered && answers[question.id] !== undefined && (
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
              <p className="font-medium leading-relaxed whitespace-pre-line">{question.question}</p>

              <RadioGroup
                value={answers[question.id]?.toString()}
                onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                disabled={isAnswered}
              >
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`flex items-start space-x-3 rounded-lg border p-3 transition-colors ${
                      isAnswered && answers[question.id] !== undefined
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

              {isAnswered && answers[question.id] !== undefined && (
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
                      <strong>Explicacion:</strong> {question.explanation}
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
        )
      })}

      <div className="flex flex-wrap gap-4">
        {!showResults ? (
          <Button
            onClick={handleSubmit}
            size="lg"
            disabled={Object.keys(answers).length !== questions.length}
            className="min-w-[200px]"
          >
            Finalizar y ver resultados
          </Button>
        ) : (
          <Button onClick={handleReset} variant="secondary" size="lg" className="min-w-[200px]">
            Reiniciar Prueba
          </Button>
        )}
      </div>
    </div>
  )
}
