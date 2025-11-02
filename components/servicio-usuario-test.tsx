"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, InfoIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    question: "¿Cuál es el objetivo central de la presentación “Protocolos de Atención al Ciudadano y aplicación de la NTC 6047”?",
    options: [
      "Enseñar técnicas de evaluación para concursos de mérito",
      "Introducir la importancia de la atención al ciudadano y los protocolos de la NTC 6047 para garantizar servicios de calidad",
      "Sustituir la normativa vigente sobre servicio al ciudadano",
      "Aplicar pruebas de certificación a los asistentes"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "El propósito es que los participantes comprendan los protocolos de atención al ciudadano, su importancia, estructura y aplicaciones prácticas según la NTC 6047.",
    topic: "Propósito de la capacitación"
  },
  {
    id: 2,
    question: "La presentación enfatiza que la atención al ciudadano es fundamental porque:",
    options: [
      "Permite delegar funciones públicas a particulares",
      "El ciudadano es pilar del Estado Social de Derecho, posibilita el control social y fortalece la confianza institucional",
      "Reduce la necesidad de transparencia y empatía en la gestión pública",
      "Aplica únicamente al sector privado"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "Se destaca que la atención al ciudadano sostiene el Estado Social de Derecho, habilita el control social y promueve transparencia, empatía y eficiencia.",
    topic: "Importancia de la atención al ciudadano"
  },
  {
    id: 3,
    question: "¿Cuál de los siguientes ítems hace parte del contenido abordado en la presentación?",
    options: [
      "Mecanismos de financiación de obras públicas",
      "Roles del servicio, canales de atención y Carta de Trato Digno",
      "Procedimientos disciplinarios para servidores públicos",
      "Modelos de evaluación fiscal"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "Los temas incluyen desarrollo normativo, deberes, derechos, ciclo del servicio, roles, canales, protocolos, atención a poblaciones vulnerables, manejo de situaciones difíciles, NTC 6047 y Carta de Trato Digno.",
    topic: "Contenido de la capacitación"
  },
  {
    id: 4,
    question: "De acuerdo con los deberes institucionales, las entidades deben:",
    options: [
      "Limitar el horario de atención a 20 horas semanales",
      "Contar con oficina de atención, ofrecer mínimo 40 horas semanales, implementar turnos y trato prioritario e incluir medios tecnológicos",
      "Excluir medios tecnológicos para priorizar la atención presencial",
      "Delegar la atención exclusivamente a call centers privados"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La presentación señala que las entidades deben disponer de oficina de atención, mínimo 40 horas semanales, turnos, trato prioritario y medios tecnológicos, además de gestionar PQRS.",
    topic: "Deberes de las entidades"
  },
  {
    id: 5,
    question: "Entre los derechos de los ciudadanos se encuentra:",
    options: [
      "Recibir atención digna, acceder a información clara, usar canales oficiales, obtener atención preferencial cuando aplique y presentar PQRSDF con respuesta oportuna",
      "Exigir atención solo en horario nocturno",
      "Elegir libremente a qué servidor público presentar su caso sin seguir turnos",
      "Solicitar la eliminación de la Carta de Trato Digno"
    ],
    correctAnswer: 0,
    points: 4,
    explanation:
      "Los derechos incluyen atención digna y respetuosa, información clara, uso de canales oficiales, atención preferencial en casos especiales y la posibilidad de presentar PQRSDF.",
    topic: "Derechos de los ciudadanos"
  },
  {
    id: 6,
    question: "El ciclo del servicio descrito en la presentación incluye las fases:",
    options: [
      "Planeación, ejecución, control, evaluación y archivo",
      "Identificación de la necesidad, contacto, atención, respuesta y percepción final del usuario",
      "Prospección, negociación, cierre y posventa",
      "Solicitud, aprobación y cierre"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "El ciclo del servicio se compone de cinco momentos: identificación de la necesidad, contacto, atención, respuesta y percepción final.",
    topic: "Ciclo del servicio"
  },
  {
    id: 7,
    question: "Los canales de atención mencionados en la presentación son:",
    options: [
      "Únicamente presencial y telefónico",
      "Presencial, telefónico, virtual, correo electrónico y redes sociales",
      "Solo plataformas digitales",
      "Exclusivamente redes sociales"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "Los canales incluyen atención presencial, telefónica, virtual, correo electrónico y redes sociales, cada uno con protocolos específicos.",
    topic: "Canales de atención"
  },
  {
    id: 8,
    question: "Respecto a la atención a poblaciones vulnerables, la presentación enfatiza que:",
    options: [
      "Debe evitarse para no afectar los tiempos de respuesta",
      "Es necesario adaptar protocolos y brindar trato prioritario a quienes lo requieran",
      "Se limita a la entrega de formularios especiales sin acompañamiento",
      "Solo aplica a entidades privadas"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "atención a poblaciones vulnerables demanda protocolos específicos que garanticen trato prioritario, accesibilidad y acompañamiento.",
    topic: "Atención a poblaciones vulnerables"
  },
  {
    id: 9,
    question: "La NTC 6047, según la presentación, se relaciona con:",
    options: [
      "Estándares financieros para contratación pública",
      "Requisitos de calidad y accesibilidad en la atención al ciudadano",
      "Regulación de trámites disciplinarios",
      "Normas tributarias para empresas de servicios"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La NTC 6047 fija estándares de calidad, accesibilidad, comunicación y seguimiento para la atención al ciudadano.",
    topic: "Norma Técnica Colombiana 6047"
  },
  {
    id: 10,
    question: "La Carta de Trato Digno, de acuerdo con la presentación, es:",
    options: [
      "Un documento opcional para entidades privadas sin efecto normativo",
      "El instrumento que sintetiza los compromisos de la entidad con la ciudadanía en materia de servicio",
      "Un formato interno para rotar personal",
      "Un manual de organización del talento humano"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La Carta de Trato Digno formaliza los compromisos de la entidad con los ciudadanos respecto al trato y la calidad del servicio.",
    topic: "Carta de Trato Digno"
  },
  {
    id: 11,
    question: "Sobre los protocolos de atención, la presentación resalta que:",
    options: [
      "Permiten estandarizar la prestación del servicio y asegurar calidad en todos los canales",
      "Aplican solo a la atención presencial",
      "Eliminan la necesidad de capacitar al personal",
      "Sustituyen la normativa vigente en cada entidad"
    ],
    correctAnswer: 0,
    points: 4,
    explanation:
      "Los protocolos son guías que estandarizan la atención para garantizar coherencia y calidad en todos los canales.",
    topic: "Protocolos de atención"
  },
  {
    id: 12,
    question: "El documento enfatiza que la presentación no contiene:",
    options: [
      "Referencias normativas sobre atención al ciudadano",
      "Ejemplos prácticos de situaciones difíciles",
      "Preguntas de examen o cuestionarios evaluativos; su foco es informativo y formativo",
      "Descripción de canales digitales"
    ],
    correctAnswer: 2,
    points: 4,
    explanation:
      "Se aclara que la presentación es material informativo para capacitación y no incluye preguntas de examen o cuestionarios.",
    topic: "Naturaleza del material"
  },
  {
    id: 13,
    question: "El control social que promueve la atención al ciudadano se traduce en:",
    options: [
      "Reducir la participación ciudadana para agilizar trámites",
      "Incrementar la confianza institucional y la transparencia",
      "Evitar la supervisión de organismos de control",
      "Evitar rendición de cuentas"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La atención al ciudadano fomenta el control social, fortaleciendo la confianza institucional y la transparencia.",
    topic: "Importancia de la atención al ciudadano"
  },
  {
    id: 14,
    question: "Según los deberes institucionales, la gestión de PQRSDF debe:",
    options: [
      "Realizarse solo de manera presencial",
      "Garantizar respuesta oportuna a peticiones, quejas, reclamos, solicitudes, denuncias y felicitaciones",
      "Limitarse a registros internos sin respuesta al ciudadano",
      "Delegarse en organismos de control externos"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "Los deberes incluyen gestionar oportunamente las PQRSDF para asegurar satisfacción y seguimiento.",
    topic: "Gestión de PQRSDF"
  },
  {
    id: 15,
    question: "El manejo de situaciones difíciles requiere:",
    options: [
      "Evitar el contacto con el ciudadano hasta que cese su inconformidad",
      "Contar con protocolos y habilidades para manejar conflictos con empatía y respeto",
      "Aplicar sanciones disciplinarias inmediatas al usuario",
      "Trasladar todos los casos a instancias judiciales"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La presentación resalta que es fundamental disponer de protocolos y habilidades para gestionar situaciones difíciles con respeto y empatía.",
    topic: "Manejo de situaciones difíciles"
  },
  {
    id: 16,
    question: "Cuando se menciona que los roles del servicio aparecen como “xxxx”, se sugiere que:",
    options: [
      "Los roles están claramente definidos y no requieren ajuste",
      "Es un tema que requiere ampliación o actualización en la presentación",
      "Los roles deben suprimirse para simplificar la atención",
      "El documento no aborda responsabilidades del servicio"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La notación “xxxx” indica que la sección de roles requiere complementar información, aunque forma parte del contenido base de la capacitación.",
    topic: "Roles del servicio"
  },
  {
    id: 17,
    question: "La presentación resalta que los principios de atención al ciudadano aplican:",
    options: [
      "Solo a entidades públicas de orden nacional",
      "Tanto a entidades públicas como privadas que prestan servicios al ciudadano",
      "Únicamente a empresas privadas con ánimo de lucro",
      "Exclusivamente a organismos de control"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "Se señala que la gestión orientada al ciudadano trasciende el sector público y aplica también a entidades privadas.",
    topic: "Alcance institucional"
  },
  {
    id: 18,
    question: "Una consecuencia de no actualizar la Carta de Trato Digno sería:",
    options: [
      "Mejorar la satisfacción ciudadana",
      "Desconocer compromisos de servicio vigentes y afectar la confianza de los usuarios",
      "Reducir el número de PQRS",
      "Eliminar la necesidad de protocolos de atención"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La Carta de Trato Digno debe mantenerse actualizada para reflejar compromisos de servicio; no hacerlo deteriora la confianza y claridad hacia el ciudadano.",
    topic: "Carta de Trato Digno"
  },
  {
    id: 19,
    question: "En términos de accesibilidad, la NTC 6047 orienta a que los servicios:",
    options: [
      "Estén disponibles únicamente en idioma español",
      "Cuenten con recursos y canales accesibles para población con discapacidad o requerimientos especiales",
      "Se concentren en atención telefónica",
      "Se ofrezcan solo de forma presencial para evitar brechas digitales"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La NTC 6047 establece estándares de accesibilidad, lo que implica adaptar canales y recursos para poblaciones con necesidades especiales.",
    topic: "Accesibilidad y calidad"
  },
  {
    id: 20,
    question: "La presentación busca mejorar la atención al ciudadano mediante:",
    options: [
      "La imposición de sanciones disciplinarias a los asistentes",
      "La comprensión de los protocolos, la sensibilización sobre derechos y deberes y la aplicación práctica de la NTC 6047",
      "El reemplazo del personal de atención por sistemas automatizados",
      "La eliminación de canales digitales para evitar quejas"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "El objetivo general es que los participantes comprendan los protocolos de atención, sus derechos y deberes, y apliquen la NTC 6047 para mejorar el servicio.",
    topic: "Propósito de la capacitación"
  }
]

const questionsV2: Question[] = [
  {
    id: 1,
    question: "Durante una inducción sobre la NTC 6047, un asistente pregunta si existen evaluaciones dentro de la presentación. La respuesta correcta es:",
    options: [
      "Sí, incluye cuestionarios de opción múltiple en cada módulo",
      "No, es material informativo para capacitación sin preguntas de examen",
      "Sí, contiene un examen final para certificar competencias",
      "No, pero se aplicará una prueba externa basada en el documento"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "El material es informativo y formativo, no incorpora cuestionarios ni evaluaciones.",
    topic: "Naturaleza del material"
  },
  {
    id: 2,
    question: "Si una entidad brinda atención al ciudadano con menos de 40 horas semanales, estaría incumpliendo porque:",
    options: [
      "La NTC 6047 elimina los horarios mínimos",
      "La presentación señala el deber de ofrecer mínimo 40 horas de atención semanales",
      "Las PQRS solo se reciben los fines de semana",
      "La Carta de Trato Digno exige atención 24/7"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "Los deberes institucionales descritos incluyen contar con un horario mínimo de 40 horas semanales.",
    topic: "Deberes de las entidades"
  },
  {
    id: 3,
    question: "Al diseñar un protocolo para atención telefónica coherente con la presentación, se debe garantizar:",
    options: [
      "Que las llamadas se atiendan únicamente de manera automática",
      "Que el canal cuente con personal capacitado, trato respetuoso, turnos y seguimiento a las solicitudes",
      "Que solo se brinde información general y nunca se gestionen solicitudes",
      "Que se redireccione siempre al canal presencial"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "Los protocolos deben cubrir cada canal con personal capacitado, trato respetuoso y mecanismos de seguimiento.",
    topic: "Protocolos por canal"
  },
  {
    id: 4,
    question: "Una situación difícil con un ciudadano inconforme debe manejarse:",
    options: [
      "Evadiendo la interacción hasta que el usuario se calme solo",
      "Con protocolos, habilidades de escucha y empatía para encauzar la situación",
      "Solicitando de inmediato la intervención policial",
      "Respondiendo en tono rígido para acelerar el trámite"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "El manejo de situaciones difíciles exige protocolos y habilidades de escucha, empatía y respeto.",
    topic: "Manejo de situaciones difíciles"
  },
  {
    id: 5,
    question: "En la fase de contacto del ciclo del servicio se hace énfasis en:",
    options: [
      "Registrar al usuario en bases de datos sin interacción",
      "Establecer la primera interacción con el ciudadano a través del canal seleccionado",
      "Archivar el caso sin intervención",
      "Emitir la respuesta final al ciudadano"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "Tras identificar la necesidad, el contacto es la primera interacción con el ciudadano en el canal escogido.",
    topic: "Ciclo del servicio"
  },
  {
    id: 6,
    question: "La fase de percepción final del usuario busca:",
    options: [
      "Cerrar el caso sin evaluar satisfacción",
      "Identificar cómo valora el servicio, factor clave para mejora continua",
      "Registrar únicamente tiempos de respuesta",
      "Solicitar nuevos documentos para archivar el caso"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La percepción final permite conocer la valoración del servicio y orientar la mejora continua.",
    topic: "Ciclo del servicio"
  },
  {
    id: 7,
    question: "Si una entidad no actualiza la Carta de Trato Digno, podría afectarse porque:",
    options: [
      "El documento pierda vigencia y no refleje los compromisos actuales con la ciudadanía",
      "Se elimine la obligación de atender PQRS",
      "La NTC 6047 deja de aplicar automáticamente",
      "Los usuarios no puedan acceder al canal telefónico"
    ],
    correctAnswer: 0,
    points: 4,
    explanation:
      "La Carta de Trato Digno debe mantenerse vigente para reflejar compromisos actuales; no actualizarla afecta la confianza y claridad hacia la ciudadanía.",
    topic: "Carta de Trato Digno"
  },
  {
    id: 8,
    question: "En la atención a poblaciones vulnerables, la entidad debe:",
    options: [
      "Remitirlos a otras entidades sin protocolos especiales",
      "Extender los tiempos de espera para revisar su documentación",
      "Aplicar protocolos que garanticen accesibilidad, trato prioritario y acompañamiento",
      "Limitar la atención a un canal único para simplificar la gestión"
    ],
    correctAnswer: 2,
    points: 4,
    explanation:
      "La presentación resalta adaptar protocolos para garantizar accesibilidad, prioridad y acompañamiento a poblaciones vulnerables.",
    topic: "Atención a poblaciones vulnerables"
  },
  {
    id: 9,
    question: "Una guía práctica de NTC 6047 sugiere:",
    options: [
      "Concentrar la atención al público en un solo canal para reducir costos",
      "Asegurar accesibilidad, comunicación clara, seguimiento y satisfacción ciudadana",
      "Evitar el seguimiento a solicitudes para no aumentar carga administrativa",
      "Focalizar el trato digno únicamente en usuarios frecuentes"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La NTC 6047 se enfoca en estándares de accesibilidad, comunicación clara, seguimiento y satisfacción del ciudadano.",
    topic: "Norma Técnica Colombiana 6047"
  },
  {
    id: 10,
    question: "Si al revisar los roles del servicio la entidad encuentra la anotación “xxxx”, debe:",
    options: [
      "Concluir que no se requiere definir roles",
      "Completar y actualizar la descripción de roles y responsabilidades para asegurar una atención coherente",
      "Eliminar la sección de roles por falta de información",
      "Delegar los roles en un proveedor externo"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La notación sugiere completar la información de roles para establecer responsabilidades claras y coherencia en la atención.",
    topic: "Roles del servicio"
  },
  {
    id: 11,
    question: "La gestión de canales como redes sociales requiere:",
    options: [
      "Responder únicamente con mensajes genéricos automáticos",
      "Personal capacitado, protocolos definidos y seguimiento a las solicitudes recibidas",
      "Redireccionar todas las solicitudes al canal presencial",
      "Cerrar los canales fuera de horario laboral sin informar al usuario"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "Cada canal debe contar con personal capacitado, protocolos y seguimiento para mantener la calidad del servicio.",
    topic: "Canales de atención"
  },
  {
    id: 12,
    question: "Si un ciudadano plantea una solicitud a través de correo electrónico, la entidad debe:",
    options: [
      "Responder solo si coincide con el horario de atención telefónica",
      "Gestionar la solicitud, brindar respuesta oportuna y mantener seguimiento, tal como lo señalan los deberes institucionales",
      "Remitir al ciudadano a presentar la solicitud de forma presencial sin explicación",
      "Ignorar el canal porque la Carta de Trato Digno menciona solo atención presencial"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "Los deberes institucionales comprenden atender solicitudes por los canales habilitados, con respuestas oportunas y seguimiento.",
    topic: "Gestión de PQRSDF"
  },
  {
    id: 13,
    question: "La presentación resalta que la atención al ciudadano también aplica a entidades privadas porque:",
    options: [
      "Se restringe a empresas con ánimo de lucro",
      "Los principios de servicio orientado al ciudadano trascienden el sector público",
      "Las empresas privadas reemplazan a las entidades públicas",
      "Las entidades privadas no tienen obligaciones de servicio"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "Se enfatiza que los principios de servicio orientado al ciudadano son aplicables también en entidades privadas.",
    topic: "Alcance institucional"
  },
  {
    id: 14,
    question: "Para fortalecer la transparencia, la entidad debe:",
    options: [
      "Restringir la información pública a los usuarios frecuentes",
      "Facilitar el control social, ofrecer información clara y promover empatía con los usuarios",
      "Eliminar los canales de quejas para evitar conflictos",
      "Publicar información solo cuando lo requieran los entes de control"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La importancia de la atención al ciudadano se asocia con facilitar control social, generar confianza y promover transparencia y empatía.",
    topic: "Importancia de la atención al ciudadano"
  },
  {
    id: 15,
    question: "El sistema de turnos y trato prioritario tiene como fin:",
    options: [
      "Aumentar el tiempo de espera",
      "Garantizar orden, equidad y priorización de ciudadanos que requieren atención preferencial",
      "Evitar la atención a personas con discapacidad",
      "Limitar el acceso a un canal exclusivo"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "El sistema de turnos y trato prioritario busca asegurar orden y priorizar a quienes requieren atención especial.",
    topic: "Deberes de las entidades"
  },
  {
    id: 16,
    question: "La percepción final del usuario debe registrarse para:",
    options: [
      "Cerrar la PQRS sin evidencias",
      "Alimentar procesos de mejora continua y medir la satisfacción",
      "Justificar retrasos en el servicio",
      "Reducir la transparencia de la entidad"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "Conocer la percepción final alimenta la mejora continua y permite medir satisfacción y calidad del servicio.",
    topic: "Ciclo del servicio"
  },
  {
    id: 17,
    question: "Una entidad que no ofrezca medios tecnológicos para la atención estaría incumpliendo porque:",
    options: [
      "Los deberes institucionales exigen incluir medios tecnológicos para atender solicitudes",
      "Los ciudadanos solo pueden comunicarse por redes sociales",
      "Las PQRS deben radicarse exclusivamente en línea",
      "La Carta de Trato Digno prohíbe la atención presencial"
    ],
    correctAnswer: 0,
    points: 4,
    explanation:
      "Los deberes de las entidades incluyen habilitar medios tecnológicos para gestionar las solicitudes ciudadanas.",
    topic: "Deberes de las entidades"
  },
  {
    id: 18,
    question: "Si un funcionario desconoce los derechos de los ciudadanos en la prestación del servicio, la capacitación sugiere:",
    options: [
      "Priorizar la resolución de trámites por encima del trato digno",
      "Reforzar la formación sobre derechos como la atención digna, información clara, uso de canales oficiales y atención preferencial cuando corresponda",
      "Restringir el acceso a la información para evitar quejas",
      "Delegar todos los casos complejos a supervisores"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La capacitación busca sensibilizar sobre derechos fundamentales de los ciudadanos durante la atención.",
    topic: "Derechos de los ciudadanos"
  },
  {
    id: 19,
    question: "Un ejemplo de seguimiento coherente con la NTC 6047 sería:",
    options: [
      "Cerrar casos sin informar al ciudadano",
      "Documentar la respuesta, verificar la satisfacción y ofrecer canales para retroalimentación",
      "Almacenar solicitudes sin respuesta por falta de personal",
      "Aceptar únicamente peticiones verbales"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La NTC 6047 sugiere seguimiento y satisfacción para garantizar calidad y accesibilidad.",
    topic: "Norma Técnica Colombiana 6047"
  },
  {
    id: 20,
    question: "Para reforzar la cultura de servicio tras la capacitación, la entidad debería:",
    options: [
      "Suspender sesiones de formación para enfocarse en indicadores",
      "Actualizar protocolos, socializar la Carta de Trato Digno y evaluar periódicamente el ciclo del servicio",
      "Eliminar canales virtuales para concentrarse en atención presencial",
      "Limitar la participación de la ciudadanía en el diagnóstico del servicio"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "La sensibilización se refuerza actualizando protocolos, socializando compromisos de trato digno y evaluando el ciclo del servicio.",
    topic: "Aplicación práctica"
  }
]

export function ServicioUsuarioTest() {
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2">("v1")
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = selectedVersion === "v1" ? questionsV1 : questionsV2

  const handleVersionChange = (value: string) => {
    setSelectedVersion(value as "v1" | "v2")
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
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

  const handleSubmit = () => {
    setShowResults(true)
    setShowFeedback(true)
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
  }

  const score = showResults ? calculateScore() : null

  return (
    <div className="space-y-6">
      <Alert className="border-primary/50 bg-primary/5">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Esta prueba contiene {questions.length} preguntas sobre protocolos de atención al ciudadano y la aplicación de la NTC 6047.
          Total de puntos disponibles: {questions.reduce((sum, q) => sum + q.points, 0)} puntos.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selecciona la versión de la prueba</CardTitle>
          <CardDescription>
            Cada versión incluye 20 preguntas basadas en la presentación de protocolos de atención al ciudadano y la NTC 6047.
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
                    id={`servicio-q${question.id}-opt${optionIndex}`}
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor={`servicio-q${question.id}-opt${optionIndex}`}
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
