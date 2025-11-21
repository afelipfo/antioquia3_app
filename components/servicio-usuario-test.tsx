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

export const servicioUsuarioQuestions: Question[] = [
  {
    id: 1,
    question: "Situacion\n\nEl Centro Integrado de Atencion de la Gobernacion de Antioquia organiza una jornada de capacitacion para servidores publicos sobre protocolos de atencion. El coordinador presenta el material basado en la NTC 6047 y explica que el proposito es mejorar la experiencia ciudadana.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es el objetivo central de la presentacion 'Protocolos de Atencion al Ciudadano y aplicacion de la NTC 6047'?",
    options: [
      "Enseñar técnicas de evaluación para concursos de mérito",
      "Introducir la importancia de la atención al ciudadano y los protocolos de la NTC 6047 para garantizar servicios de calidad",
      "Sustituir la normativa vigente sobre servicio al ciudadano",
      "Aplicar pruebas de certificación a los asistentes"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el proposito de la capacitacion es que los participantes comprendan los protocolos de atencion al ciudadano, su importancia, estructura y aplicaciones practicas segun la NTC 6047, tal como lo presenta el coordinador.",
    topic: "Propósito de la capacitación"
  },
  {
    id: 2,
    question: "Situacion\n\nUna funcionaria de la Secretaria de Gobierno atiende a un ciudadano que solicita informacion sobre un subsidio. Durante la atencion, ella reflexiona sobre por que es tan importante brindar un buen servicio al ciudadano en el contexto del Estado Social de Derecho.\n\nPregunta\n\nCon base en la situacion descrita, ¿por que la atencion al ciudadano es fundamental segun los protocolos?",
    options: [
      "Permite delegar funciones públicas a particulares",
      "El ciudadano es pilar del Estado Social de Derecho, posibilita el control social y fortalece la confianza institucional",
      "Reduce la necesidad de transparencia y empatía en la gestión pública",
      "Aplica únicamente al sector privado"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, la funcionaria comprende que la atencion al ciudadano sostiene el Estado Social de Derecho, habilita el control social y promueve transparencia, empatia y eficiencia en la gestion publica.",
    topic: "Importancia de la atención al ciudadano"
  },
  {
    id: 3,
    question: "Situacion\n\nUn nuevo servidor publico revisa el material de induccion sobre atencion al ciudadano para familiarizarse con los temas que debe dominar. El documento incluye multiples secciones con contenido normativo y practico.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual de los siguientes items hace parte del contenido abordado en la presentacion?",
    options: [
      "Mecanismos de financiación de obras públicas",
      "Roles del servicio, canales de atención y Carta de Trato Digno",
      "Procedimientos disciplinarios para servidores públicos",
      "Modelos de evaluación fiscal"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el servidor publico encuentra que los temas incluyen desarrollo normativo, deberes, derechos, ciclo del servicio, roles, canales, protocolos, atencion a poblaciones vulnerables, manejo de situaciones dificiles, NTC 6047 y Carta de Trato Digno.",
    topic: "Contenido de la capacitación"
  },
  {
    id: 4,
    question: "Situacion\n\nEl director de una entidad municipal evalua si su oficina de atencion al ciudadano cumple con los requisitos establecidos en la normatividad. Revisa los deberes institucionales para verificar horarios, turnos y medios tecnologicos disponibles.\n\nPregunta\n\nCon base en la situacion descrita, ¿que deben garantizar las entidades segun los deberes institucionales?",
    options: [
      "Limitar el horario de atención a 20 horas semanales",
      "Contar con oficina de atención, ofrecer mínimo 40 horas semanales, implementar turnos y trato prioritario e incluir medios tecnológicos",
      "Excluir medios tecnológicos para priorizar la atención presencial",
      "Delegar la atención exclusivamente a call centers privados"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el director verifica que las entidades deben disponer de oficina de atencion, minimo 40 horas semanales, turnos, trato prioritario y medios tecnologicos, ademas de gestionar PQRS.",
    topic: "Deberes de las entidades"
  },
  {
    id: 5,
    question: "Situacion\n\nUna ciudadana adulta mayor acude a la Alcaldia para solicitar informacion sobre un tramite. Ella desea saber cuales son sus derechos como usuaria del servicio publico para asegurarse de recibir un trato adecuado.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son los derechos de los ciudadanos en la atencion al publico?",
    options: [
      "Recibir atención digna, acceder a información clara, usar canales oficiales, obtener atención preferencial cuando aplique y presentar PQRSDF con respuesta oportuna",
      "Exigir atención solo en horario nocturno",
      "Elegir libremente a qué servidor público presentar su caso sin seguir turnos",
      "Solicitar la eliminación de la Carta de Trato Digno"
    ],
    correctAnswer: 0,
    points: 4,
    explanation:
      "En la situacion descrita, la ciudadana tiene derecho a atencion digna y respetuosa, informacion clara, uso de canales oficiales, atencion preferencial por ser adulta mayor y la posibilidad de presentar PQRSDF con respuesta oportuna.",
    topic: "Derechos de los ciudadanos"
  },
  {
    id: 6,
    question: "Situacion\n\nUn funcionario del area de servicio al ciudadano analiza el recorrido completo que hace un usuario desde que identifica una necesidad hasta que percibe la calidad del servicio recibido. Desea mejorar cada etapa del proceso.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son las fases del ciclo del servicio?",
    options: [
      "Planeación, ejecución, control, evaluación y archivo",
      "Identificación de la necesidad, contacto, atención, respuesta y percepción final del usuario",
      "Prospección, negociación, cierre y posventa",
      "Solicitud, aprobación y cierre"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el funcionario identifica que el ciclo del servicio se compone de cinco momentos: identificacion de la necesidad, contacto, atencion, respuesta y percepcion final del usuario.",
    topic: "Ciclo del servicio"
  },
  {
    id: 7,
    question: "Situacion\n\nLa coordinadora de atencion al ciudadano de una secretaria departamental realiza un inventario de todos los medios disponibles para que los usuarios puedan comunicarse con la entidad y presentar sus solicitudes.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son los canales de atencion que debe considerar?",
    options: [
      "Únicamente presencial y telefónico",
      "Presencial, telefónico, virtual, correo electrónico y redes sociales",
      "Solo plataformas digitales",
      "Exclusivamente redes sociales"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, la coordinadora debe contemplar canales presencial, telefonico, virtual, correo electronico y redes sociales, cada uno con protocolos especificos.",
    topic: "Canales de atención"
  },
  {
    id: 8,
    question: "Situacion\n\nUn servidor publico atiende a una persona con discapacidad auditiva que solicita informacion sobre un programa social. El funcionario debe aplicar protocolos especiales para garantizar una atencion efectiva.\n\nPregunta\n\nCon base en la situacion descrita, ¿que enfatiza la presentacion sobre la atencion a poblaciones vulnerables?",
    options: [
      "Debe evitarse para no afectar los tiempos de respuesta",
      "Es necesario adaptar protocolos y brindar trato prioritario a quienes lo requieran",
      "Se limita a la entrega de formularios especiales sin acompañamiento",
      "Solo aplica a entidades privadas"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, la atencion a la persona con discapacidad auditiva demanda protocolos especificos que garanticen trato prioritario, accesibilidad y acompanamiento adecuado.",
    topic: "Atención a poblaciones vulnerables"
  },
  {
    id: 9,
    question: "Situacion\n\nDurante una reunion de planeacion, el equipo de calidad de una entidad revisa la NTC 6047 para identificar los requisitos que deben cumplir en la atencion al ciudadano. Necesitan entender el alcance de esta norma tecnica.\n\nPregunta\n\nCon base en la situacion descrita, ¿con que se relaciona la NTC 6047?",
    options: [
      "Estándares financieros para contratación pública",
      "Requisitos de calidad y accesibilidad en la atención al ciudadano",
      "Regulación de trámites disciplinarios",
      "Normas tributarias para empresas de servicios"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el equipo de calidad determina que la NTC 6047 fija estandares de calidad, accesibilidad, comunicacion y seguimiento para la atencion al ciudadano.",
    topic: "Norma Técnica Colombiana 6047"
  },
  {
    id: 10,
    question: "Situacion\n\nUna entidad territorial actualiza su documentacion institucional y debe revisar la Carta de Trato Digno. El responsable necesita comprender que es este documento y cual es su proposito.\n\nPregunta\n\nCon base en la situacion descrita, ¿que es la Carta de Trato Digno?",
    options: [
      "Un documento opcional para entidades privadas sin efecto normativo",
      "El instrumento que sintetiza los compromisos de la entidad con la ciudadanía en materia de servicio",
      "Un formato interno para rotar personal",
      "Un manual de organización del talento humano"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el responsable determina que la Carta de Trato Digno formaliza los compromisos de la entidad con los ciudadanos respecto al trato y la calidad del servicio.",
    topic: "Carta de Trato Digno"
  },
  {
    id: 11,
    question: "Situacion\n\nEl jefe de atencion al ciudadano de una alcaldia implementa protocolos unificados para todos los canales de servicio. Busca que la experiencia del usuario sea consistente sin importar como se comunique con la entidad.\n\nPregunta\n\nCon base en la situacion descrita, ¿que resalta la presentacion sobre los protocolos de atencion?",
    options: [
      "Permiten estandarizar la prestación del servicio y asegurar calidad en todos los canales",
      "Aplican solo a la atención presencial",
      "Eliminan la necesidad de capacitar al personal",
      "Sustituyen la normativa vigente en cada entidad"
    ],
    correctAnswer: 0,
    points: 4,
    explanation:
      "En la situacion descrita, el jefe comprende que los protocolos son guias que estandarizan la atencion para garantizar coherencia y calidad en todos los canales.",
    topic: "Protocolos de atención"
  },
  {
    id: 12,
    question: "Situacion\n\nUn participante de la capacitacion pregunta si el material incluye examenes o cuestionarios para evaluar lo aprendido. El facilitador debe aclarar la naturaleza del documento.\n\nPregunta\n\nCon base en la situacion descrita, ¿que enfatiza el documento sobre su contenido?",
    options: [
      "Referencias normativas sobre atención al ciudadano",
      "Ejemplos prácticos de situaciones difíciles",
      "Preguntas de examen o cuestionarios evaluativos; su foco es informativo y formativo",
      "Descripción de canales digitales"
    ],
    correctAnswer: 2,
    points: 4,
    explanation:
      "En la situacion descrita, el facilitador aclara que la presentacion es material informativo para capacitacion y no incluye preguntas de examen o cuestionarios evaluativos.",
    topic: "Naturaleza del material"
  },
  {
    id: 13,
    question: "Situacion\n\nUna veeduria ciudadana visita una entidad para verificar la calidad de la atencion al publico. El coordinador explica como la buena atencion promueve el control social y la transparencia institucional.\n\nPregunta\n\nCon base en la situacion descrita, ¿en que se traduce el control social que promueve la atencion al ciudadano?",
    options: [
      "Reducir la participación ciudadana para agilizar trámites",
      "Incrementar la confianza institucional y la transparencia",
      "Evitar la supervisión de organismos de control",
      "Evitar rendición de cuentas"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el coordinador explica a la veeduria que la atencion al ciudadano fomenta el control social, fortaleciendo la confianza institucional y la transparencia.",
    topic: "Importancia de la atención al ciudadano"
  },
  {
    id: 14,
    question: "Situacion\n\nUn ciudadano presenta una queja formal sobre un servicio deficiente. El funcionario encargado debe gestionar esta PQRSDF siguiendo los deberes institucionales establecidos en los protocolos.\n\nPregunta\n\nCon base en la situacion descrita, ¿como debe realizarse la gestion de PQRSDF segun los deberes institucionales?",
    options: [
      "Realizarse solo de manera presencial",
      "Garantizar respuesta oportuna a peticiones, quejas, reclamos, solicitudes, denuncias y felicitaciones",
      "Limitarse a registros internos sin respuesta al ciudadano",
      "Delegarse en organismos de control externos"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el funcionario debe gestionar la queja oportunamente, garantizando respuesta al ciudadano para asegurar su satisfaccion y el seguimiento adecuado.",
    topic: "Gestión de PQRSDF"
  },
  {
    id: 15,
    question: "Situacion\n\nUn ciudadano llega muy alterado a la ventanilla de atencion porque lleva semanas esperando respuesta a su solicitud. El funcionario debe manejar esta situacion dificil de manera profesional.\n\nPregunta\n\nCon base en la situacion descrita, ¿que requiere el manejo de situaciones dificiles?",
    options: [
      "Evitar el contacto con el ciudadano hasta que cese su inconformidad",
      "Contar con protocolos y habilidades para manejar conflictos con empatía y respeto",
      "Aplicar sanciones disciplinarias inmediatas al usuario",
      "Trasladar todos los casos a instancias judiciales"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el funcionario debe aplicar protocolos y habilidades de escucha, empatia y respeto para gestionar la situacion dificil con el ciudadano alterado.",
    topic: "Manejo de situaciones difíciles"
  },
  {
    id: 16,
    question: "Situacion\n\nAl revisar el material de capacitacion, un funcionario encuentra que la seccion de roles del servicio aparece con la anotacion 'xxxx'. Debe interpretar que significa esto para el documento.\n\nPregunta\n\nCon base en la situacion descrita, ¿que se sugiere cuando se menciona que los roles del servicio aparecen como 'xxxx'?",
    options: [
      "Los roles están claramente definidos y no requieren ajuste",
      "Es un tema que requiere ampliación o actualización en la presentación",
      "Los roles deben suprimirse para simplificar la atención",
      "El documento no aborda responsabilidades del servicio"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, la notacion 'xxxx' indica al funcionario que la seccion de roles requiere complementar informacion, aunque forma parte del contenido base de la capacitacion.",
    topic: "Roles del servicio"
  },
  {
    id: 17,
    question: "Situacion\n\nUna empresa de servicios publicos privada busca mejorar su atencion al usuario y consulta si los principios de la presentacion aplican a su sector. Necesitan saber el alcance institucional de estos lineamientos.\n\nPregunta\n\nCon base en la situacion descrita, ¿a que tipo de entidades aplican los principios de atencion al ciudadano?",
    options: [
      "Solo a entidades públicas de orden nacional",
      "Tanto a entidades públicas como privadas que prestan servicios al ciudadano",
      "Únicamente a empresas privadas con ánimo de lucro",
      "Exclusivamente a organismos de control"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, la empresa privada encuentra que la gestion orientada al ciudadano trasciende el sector publico y aplica tambien a entidades privadas que prestan servicios.",
    topic: "Alcance institucional"
  },
  {
    id: 18,
    question: "Situacion\n\nUna entidad no ha actualizado su Carta de Trato Digno en varios anos y algunos compromisos ya no reflejan los servicios actuales. Los ciudadanos se quejan de inconsistencias entre lo prometido y lo recibido.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual seria una consecuencia de no actualizar la Carta de Trato Digno?",
    options: [
      "Mejorar la satisfacción ciudadana",
      "Desconocer compromisos de servicio vigentes y afectar la confianza de los usuarios",
      "Reducir el número de PQRS",
      "Eliminar la necesidad de protocolos de atención"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, la falta de actualizacion de la Carta de Trato Digno genera que los compromisos no reflejen los servicios vigentes, deteriorando la confianza y claridad hacia los ciudadanos.",
    topic: "Carta de Trato Digno"
  },
  {
    id: 19,
    question: "Situacion\n\nUna persona con discapacidad visual requiere informacion sobre un tramite y la entidad debe adaptar sus recursos para atenderla adecuadamente. El funcionario consulta la NTC 6047 para conocer los requisitos de accesibilidad.\n\nPregunta\n\nCon base en la situacion descrita, ¿que orienta la NTC 6047 en terminos de accesibilidad?",
    options: [
      "Estén disponibles únicamente en idioma español",
      "Cuenten con recursos y canales accesibles para población con discapacidad o requerimientos especiales",
      "Se concentren en atención telefónica",
      "Se ofrezcan solo de forma presencial para evitar brechas digitales"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el funcionario encuentra que la NTC 6047 establece estandares de accesibilidad, lo que implica adaptar canales y recursos para atender adecuadamente a la persona con discapacidad visual.",
    topic: "Accesibilidad y calidad"
  },
  {
    id: 20,
    question: "Situacion\n\nAl finalizar la capacitacion sobre protocolos de atencion, el facilitador resume los logros esperados de los participantes. Enfatiza como deben aplicar lo aprendido para mejorar la experiencia ciudadana.\n\nPregunta\n\nCon base en la situacion descrita, ¿como busca la presentacion mejorar la atencion al ciudadano?",
    options: [
      "La imposición de sanciones disciplinarias a los asistentes",
      "La comprensión de los protocolos, la sensibilización sobre derechos y deberes y la aplicación práctica de la NTC 6047",
      "El reemplazo del personal de atención por sistemas automatizados",
      "La eliminación de canales digitales para evitar quejas"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el facilitador resume que el objetivo general es que los participantes comprendan los protocolos de atencion, sus derechos y deberes, y apliquen la NTC 6047 para mejorar el servicio.",
    topic: "Propósito de la capacitación"
  }
]

const questionsV2: Question[] = [
  {
    id: 1,
    question: "Situacion\n\nDurante una sesion de induccion sobre la NTC 6047, un nuevo funcionario pregunta al capacitador si el material que estan revisando incluye evaluaciones o cuestionarios para medir el aprendizaje.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es la respuesta correcta sobre el contenido del material?",
    options: [
      "Sí, incluye cuestionarios de opción múltiple en cada módulo",
      "No, es material informativo para capacitación sin preguntas de examen",
      "Sí, contiene un examen final para certificar competencias",
      "No, pero se aplicará una prueba externa basada en el documento"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el capacitador aclara al nuevo funcionario que el material es informativo y formativo, no incorpora cuestionarios ni evaluaciones.",
    topic: "Naturaleza del material"
  },
  {
    id: 2,
    question: "Situacion\n\nUn auditor revisa el horario de atencion de una entidad municipal y encuentra que solo ofrecen 30 horas semanales de servicio al ciudadano. El jefe de la oficina justifica que es suficiente para la demanda actual.\n\nPregunta\n\nCon base en la situacion descrita, ¿por que la entidad estaria incumpliendo?",
    options: [
      "La NTC 6047 elimina los horarios mínimos",
      "La presentación señala el deber de ofrecer mínimo 40 horas de atención semanales",
      "Las PQRS solo se reciben los fines de semana",
      "La Carta de Trato Digno exige atención 24/7"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el auditor identifica el incumplimiento porque los deberes institucionales establecen que las entidades deben ofrecer minimo 40 horas semanales de atencion.",
    topic: "Deberes de las entidades"
  },
  {
    id: 3,
    question: "Situacion\n\nEl equipo de calidad de una gobernacion diseña un nuevo protocolo para mejorar la atencion telefonica. Deben asegurar que cumpla con los lineamientos de la presentacion sobre protocolos de atencion.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe garantizar el protocolo para atencion telefonica?",
    options: [
      "Que las llamadas se atiendan únicamente de manera automática",
      "Que el canal cuente con personal capacitado, trato respetuoso, turnos y seguimiento a las solicitudes",
      "Que solo se brinde información general y nunca se gestionen solicitudes",
      "Que se redireccione siempre al canal presencial"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el equipo de calidad debe asegurar que el protocolo incluya personal capacitado, trato respetuoso y mecanismos de seguimiento para las solicitudes telefonicas.",
    topic: "Protocolos por canal"
  },
  {
    id: 4,
    question: "Situacion\n\nUna ciudadana llega muy molesta a la oficina de atencion porque su solicitud de subsidio fue negada sin explicacion clara. Eleva la voz y se muestra muy inconforme con el servicio recibido.\n\nPregunta\n\nCon base en la situacion descrita, ¿como debe manejarse esta situacion dificil?",
    options: [
      "Evadiendo la interacción hasta que el usuario se calme solo",
      "Con protocolos, habilidades de escucha y empatía para encauzar la situación",
      "Solicitando de inmediato la intervención policial",
      "Respondiendo en tono rígido para acelerar el trámite"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el funcionario debe aplicar protocolos y habilidades de escucha, empatia y respeto para encauzar la situacion con la ciudadana inconforme.",
    topic: "Manejo de situaciones difíciles"
  },
  {
    id: 5,
    question: "Situacion\n\nUn funcionario de atencion al ciudadano analiza el momento en que un usuario se comunica por primera vez con la entidad a traves del canal telefonico para solicitar informacion sobre un tramite.\n\nPregunta\n\nCon base en la situacion descrita, ¿en que se hace enfasis durante la fase de contacto del ciclo del servicio?",
    options: [
      "Registrar al usuario en bases de datos sin interacción",
      "Establecer la primera interacción con el ciudadano a través del canal seleccionado",
      "Archivar el caso sin intervención",
      "Emitir la respuesta final al ciudadano"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el funcionario identifica que tras identificar la necesidad, el contacto es la primera interaccion con el ciudadano en el canal escogido.",
    topic: "Ciclo del servicio"
  },
  {
    id: 6,
    question: "Situacion\n\nDespues de resolver una solicitud, el funcionario aplica una encuesta breve para conocer como el ciudadano valora el servicio recibido. Esta informacion sera usada para identificar oportunidades de mejora.\n\nPregunta\n\nCon base en la situacion descrita, ¿que busca la fase de percepcion final del usuario?",
    options: [
      "Cerrar el caso sin evaluar satisfacción",
      "Identificar cómo valora el servicio, factor clave para mejora continua",
      "Registrar únicamente tiempos de respuesta",
      "Solicitar nuevos documentos para archivar el caso"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, la encuesta aplicada por el funcionario permite conocer la percepcion final del usuario y orientar la mejora continua del servicio.",
    topic: "Ciclo del servicio"
  },
  {
    id: 7,
    question: "Situacion\n\nUna secretaria departamental tiene una Carta de Trato Digno que no ha sido modificada en cinco anos. Los servicios han cambiado y varios compromisos ya no corresponden a la realidad actual.\n\nPregunta\n\nCon base en la situacion descrita, ¿por que podria afectarse la entidad si no actualiza la Carta de Trato Digno?",
    options: [
      "El documento pierda vigencia y no refleje los compromisos actuales con la ciudadanía",
      "Se elimine la obligación de atender PQRS",
      "La NTC 6047 deja de aplicar automáticamente",
      "Los usuarios no puedan acceder al canal telefónico"
    ],
    correctAnswer: 0,
    points: 4,
    explanation:
      "En la situacion descrita, si la entidad no actualiza la Carta de Trato Digno, el documento pierde vigencia y no refleja los compromisos actuales, afectando la confianza y claridad hacia la ciudadania.",
    topic: "Carta de Trato Digno"
  },
  {
    id: 8,
    question: "Situacion\n\nUna mujer embarazada llega a la oficina de atencion al ciudadano y debe esperar junto con los demas usuarios. El funcionario debe determinar como aplicar los protocolos de atencion a poblaciones vulnerables.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe hacer la entidad en la atencion a poblaciones vulnerables?",
    options: [
      "Remitirlos a otras entidades sin protocolos especiales",
      "Extender los tiempos de espera para revisar su documentación",
      "Aplicar protocolos que garanticen accesibilidad, trato prioritario y acompañamiento",
      "Limitar la atención a un canal único para simplificar la gestión"
    ],
    correctAnswer: 2,
    points: 4,
    explanation:
      "En la situacion descrita, la mujer embarazada debe recibir trato prioritario segun los protocolos que garantizan accesibilidad, prioridad y acompanamiento a poblaciones vulnerables.",
    topic: "Atención a poblaciones vulnerables"
  },
  {
    id: 9,
    question: "Situacion\n\nEl equipo de planeacion de una alcaldia desarrolla una guia practica basada en la NTC 6047 para estandarizar la atencion en todos sus puntos de servicio. Necesitan identificar los elementos clave de la norma.\n\nPregunta\n\nCon base en la situacion descrita, ¿que sugiere una guia practica de NTC 6047?",
    options: [
      "Concentrar la atención al público en un solo canal para reducir costos",
      "Asegurar accesibilidad, comunicación clara, seguimiento y satisfacción ciudadana",
      "Evitar el seguimiento a solicitudes para no aumentar carga administrativa",
      "Focalizar el trato digno únicamente en usuarios frecuentes"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el equipo de planeacion identifica que la NTC 6047 se enfoca en estandares de accesibilidad, comunicacion clara, seguimiento y satisfaccion del ciudadano.",
    topic: "Norma Técnica Colombiana 6047"
  },
  {
    id: 10,
    question: "Situacion\n\nAl revisar el documento de protocolos, el coordinador de servicio encuentra que la seccion de roles aparece con la anotacion 'xxxx'. Debe decidir que accion tomar para completar el documento.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe hacer la entidad cuando encuentra la anotacion 'xxxx' en los roles del servicio?",
    options: [
      "Concluir que no se requiere definir roles",
      "Completar y actualizar la descripción de roles y responsabilidades para asegurar una atención coherente",
      "Eliminar la sección de roles por falta de información",
      "Delegar los roles en un proveedor externo"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el coordinador debe completar y actualizar la descripcion de roles para establecer responsabilidades claras y asegurar coherencia en la atencion.",
    topic: "Roles del servicio"
  },
  {
    id: 11,
    question: "Situacion\n\nLa oficina de comunicaciones de una entidad administra las redes sociales y recibe multiples solicitudes de informacion por este canal. El equipo debe establecer como gestionar estas interacciones.\n\nPregunta\n\nCon base en la situacion descrita, ¿que requiere la gestion de canales como redes sociales?",
    options: [
      "Responder únicamente con mensajes genéricos automáticos",
      "Personal capacitado, protocolos definidos y seguimiento a las solicitudes recibidas",
      "Redireccionar todas las solicitudes al canal presencial",
      "Cerrar los canales fuera de horario laboral sin informar al usuario"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el equipo de comunicaciones debe contar con personal capacitado, protocolos definidos y seguimiento para mantener la calidad del servicio en redes sociales.",
    topic: "Canales de atención"
  },
  {
    id: 12,
    question: "Situacion\n\nUn ciudadano envia un correo electronico solicitando informacion sobre los requisitos para obtener un certificado. El funcionario encargado de la bandeja de entrada debe determinar como gestionar esta solicitud.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe hacer la entidad cuando un ciudadano plantea una solicitud a traves de correo electronico?",
    options: [
      "Responder solo si coincide con el horario de atención telefónica",
      "Gestionar la solicitud, brindar respuesta oportuna y mantener seguimiento, tal como lo señalan los deberes institucionales",
      "Remitir al ciudadano a presentar la solicitud de forma presencial sin explicación",
      "Ignorar el canal porque la Carta de Trato Digno menciona solo atención presencial"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el funcionario debe gestionar la solicitud por correo electronico con respuesta oportuna y seguimiento, cumpliendo los deberes institucionales.",
    topic: "Gestión de PQRSDF"
  },
  {
    id: 13,
    question: "Situacion\n\nUna empresa privada de servicios publicos domiciliarios consulta si debe aplicar los principios de atencion al ciudadano descritos en la presentacion, a pesar de no ser una entidad estatal.\n\nPregunta\n\nCon base en la situacion descrita, ¿por que la presentacion resalta que la atencion al ciudadano tambien aplica a entidades privadas?",
    options: [
      "Se restringe a empresas con ánimo de lucro",
      "Los principios de servicio orientado al ciudadano trascienden el sector público",
      "Las empresas privadas reemplazan a las entidades públicas",
      "Las entidades privadas no tienen obligaciones de servicio"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, la empresa privada encuentra que los principios de servicio orientado al ciudadano son aplicables tambien en su sector, ya que trascienden lo publico.",
    topic: "Alcance institucional"
  },
  {
    id: 14,
    question: "Situacion\n\nUna veeduria ciudadana solicita a una entidad informacion sobre como fortalece la transparencia en su gestion. El director debe explicar las acciones que realizan para este fin.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe hacer la entidad para fortalecer la transparencia?",
    options: [
      "Restringir la información pública a los usuarios frecuentes",
      "Facilitar el control social, ofrecer información clara y promover empatía con los usuarios",
      "Eliminar los canales de quejas para evitar conflictos",
      "Publicar información solo cuando lo requieran los entes de control"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el director explica a la veeduria que la entidad facilita el control social, ofrece informacion clara y promueve empatia para fortalecer la transparencia.",
    topic: "Importancia de la atención al ciudadano"
  },
  {
    id: 15,
    question: "Situacion\n\nEn el punto de atencion de una secretaria, se ha implementado un sistema de turnos digitales que prioriza automaticamente a personas de la tercera edad, mujeres embarazadas y personas con discapacidad.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es la finalidad del sistema de turnos y trato prioritario?",
    options: [
      "Aumentar el tiempo de espera",
      "Garantizar orden, equidad y priorización de ciudadanos que requieren atención preferencial",
      "Evitar la atención a personas con discapacidad",
      "Limitar el acceso a un canal exclusivo"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el sistema de turnos digitales busca garantizar orden, equidad y priorizacion de los ciudadanos que requieren atencion preferencial como adultos mayores y mujeres embarazadas.",
    topic: "Deberes de las entidades"
  },
  {
    id: 16,
    question: "Situacion\n\nDespues de atender a un ciudadano, el funcionario registra en el sistema la calificacion que el usuario dio al servicio. Esta informacion alimentara los indicadores de gestion del area.\n\nPregunta\n\nCon base en la situacion descrita, ¿para que debe registrarse la percepcion final del usuario?",
    options: [
      "Cerrar la PQRS sin evidencias",
      "Alimentar procesos de mejora continua y medir la satisfacción",
      "Justificar retrasos en el servicio",
      "Reducir la transparencia de la entidad"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el registro de la percepcion final por parte del funcionario alimenta los procesos de mejora continua y permite medir la satisfaccion y calidad del servicio.",
    topic: "Ciclo del servicio"
  },
  {
    id: 17,
    question: "Situacion\n\nUn auditor verifica que una entidad territorial solo ofrece atencion presencial y no cuenta con medios tecnologicos como correo electronico o plataforma virtual para gestionar solicitudes.\n\nPregunta\n\nCon base en la situacion descrita, ¿por que la entidad estaria incumpliendo al no ofrecer medios tecnologicos para la atencion?",
    options: [
      "Los deberes institucionales exigen incluir medios tecnológicos para atender solicitudes",
      "Los ciudadanos solo pueden comunicarse por redes sociales",
      "Las PQRS deben radicarse exclusivamente en línea",
      "La Carta de Trato Digno prohíbe la atención presencial"
    ],
    correctAnswer: 0,
    points: 4,
    explanation:
      "En la situacion descrita, el auditor identifica el incumplimiento porque los deberes de las entidades incluyen habilitar medios tecnologicos para gestionar las solicitudes ciudadanas.",
    topic: "Deberes de las entidades"
  },
  {
    id: 18,
    question: "Situacion\n\nUn supervisor detecta que un funcionario nuevo desconoce los derechos de los ciudadanos y por ello no brinda atencion preferencial a quienes la requieren. Debe tomar acciones correctivas.\n\nPregunta\n\nCon base en la situacion descrita, ¿que sugiere la capacitacion si un funcionario desconoce los derechos de los ciudadanos?",
    options: [
      "Priorizar la resolución de trámites por encima del trato digno",
      "Reforzar la formación sobre derechos como la atención digna, información clara, uso de canales oficiales y atención preferencial cuando corresponda",
      "Restringir el acceso a la información para evitar quejas",
      "Delegar todos los casos complejos a supervisores"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el supervisor debe reforzar la formacion del funcionario nuevo sobre los derechos fundamentales de los ciudadanos durante la atencion, incluyendo la atencion preferencial.",
    topic: "Derechos de los ciudadanos"
  },
  {
    id: 19,
    question: "Situacion\n\nUn funcionario resuelve una solicitud y debe aplicar seguimiento segun la NTC 6047. Documenta la respuesta, verifica la satisfaccion del ciudadano y le ofrece canales para retroalimentacion adicional.\n\nPregunta\n\nCon base en la situacion descrita, ¿que constituye un ejemplo de seguimiento coherente con la NTC 6047?",
    options: [
      "Cerrar casos sin informar al ciudadano",
      "Documentar la respuesta, verificar la satisfacción y ofrecer canales para retroalimentación",
      "Almacenar solicitudes sin respuesta por falta de personal",
      "Aceptar únicamente peticiones verbales"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, las acciones del funcionario constituyen un ejemplo de seguimiento coherente con la NTC 6047: documentar, verificar satisfaccion y ofrecer canales de retroalimentacion.",
    topic: "Norma Técnica Colombiana 6047"
  },
  {
    id: 20,
    question: "Situacion\n\nAl finalizar la capacitacion sobre protocolos de atencion, el coordinador del Centro de Atencion al Ciudadano elabora un plan para reforzar la cultura de servicio en su equipo de trabajo.\n\nPregunta\n\nCon base en la situacion descrita, ¿que deberia hacer la entidad para reforzar la cultura de servicio tras la capacitacion?",
    options: [
      "Suspender sesiones de formación para enfocarse en indicadores",
      "Actualizar protocolos, socializar la Carta de Trato Digno y evaluar periódicamente el ciclo del servicio",
      "Eliminar canales virtuales para concentrarse en atención presencial",
      "Limitar la participación de la ciudadanía en el diagnóstico del servicio"
    ],
    correctAnswer: 1,
    points: 4,
    explanation:
      "En la situacion descrita, el plan del coordinador debe incluir la actualizacion de protocolos, socializacion de la Carta de Trato Digno y evaluacion periodica del ciclo del servicio para reforzar la cultura de servicio.",
    topic: "Aplicación práctica"
  }
]

export function ServicioUsuarioTest() {
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
            <p className="font-medium leading-relaxed whitespace-pre-line">{question.question}</p>

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
