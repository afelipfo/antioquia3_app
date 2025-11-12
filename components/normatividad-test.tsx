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
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Según Libardo Rodríguez, el derecho administrativo es:",
    options: [
      "Una rama del derecho privado que regula los contratos entre particulares",
      "Una rama del derecho público que regula la organización, actividad y control de la administración pública y la relación Estado-ciudadano por fuera del ámbito contractual o penal",
      "Un conjunto de normas penales aplicables a los servidores públicos",
      "Una disciplina económica encargada de distribuir los recursos estatales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Libardo Rodríguez define el derecho administrativo como una rama del derecho público que regula organización, actividad y control de la administración pública y la relación Estado-ciudadano fuera del ámbito contractual o penal.",
    topic: "Concepto del derecho administrativo"
  },
  {
    id: 2,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. ¿Cuál de las siguientes es una función del derecho administrativo?",
    options: [
      "Regular la relación entre administrados y la administración",
      "Definir la política monetaria del país",
      "Celebrar tratados internacionales",
      "Legislar en materia penal"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, entre las funciones del derecho administrativo está regular la relación entre la administración y los administrados, además de organizar internamente la administración y poner límites al ejercicio del poder.",
    topic: "Funciones del derecho administrativo"
  },
  {
    id: 3,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. El principio de igualdad exige que las autoridades:",
    options: [
      "Favorezcan a grupos específicos para acelerar los trámites",
      "Seleccionen discrecionalmente a los usuarios que deben atender",
      "Traten de forma rigurosamente imparcial a todos los administrados sin favorecer a individuos ni grupos",
      "Otorguen beneficios automáticos a quienes presenten mayores recursos"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, el principio de igualdad obliga a las autoridades a tratar de forma imparcial a todos los administrados, evitando favoritismos o discriminaciones.",
    topic: "Principios del artículo 209 - Igualdad"
  },
  {
    id: 4,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. El principio de moralidad implica que los servidores públicos deben:",
    options: [
      "Actuar con honestidad y desinterés, respetando incompatibilidades y prohibiciones",
      "Priorizar decisiones que favorezcan a sus superiores jerárquicos",
      "Delegar sus funciones en particulares sin controles",
      "Tomar decisiones basadas únicamente en criterios políticos"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, la moralidad exige que los servidores actúen con honestidad, desinterés y respeto por las normas que regulan sus obligaciones, incompatibilidades y prohibiciones.",
    topic: "Principios del artículo 209 - Moralidad"
  },
  {
    id: 5,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. La primacía del interés general significa que:",
    options: [
      "Los intereses individuales prevalecen sobre las decisiones administrativas",
      "Cualquier particular puede suspender un acto administrativo",
      "Las actuaciones administrativas deben orientarse al bienestar común, privilegiando el interés colectivo sobre los individuales",
      "El interés general se determina por votación de los administrados"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, el principio de primacía del interés general establece que la actividad administrativa debe buscar el bienestar común, la supremacía del interés colectivo y la consecución del bien común.",
    topic: "Principios del artículo 209 - Interés general"
  },
  {
    id: 6,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. El principio de legalidad impone que la administración:",
    options: [
      "Actúe únicamente de acuerdo con las órdenes verbales del superior",
      "Ejerza sus funciones al margen de la Constitución",
      "Se ciña al ordenamiento jurídico jerarquizado y responda por infracciones, extralimitaciones u omisiones",
      "Actúe sin controles para garantizar eficiencia"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, el principio de legalidad obliga a que la actividad administrativa se ajuste a la Constitución y la ley, haciendo responsables a los funcionarios por infracciones o extralimitaciones.",
    topic: "Principios del artículo 209 - Legalidad"
  },
  {
    id: 7,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. El principio de eficacia y economía exige que los procedimientos:",
    options: [
      "Se prolonguen para asegurar un mayor número de controles",
      "Eviten decisiones inhibitorias y logren su finalidad con el menor tiempo, trámites y gastos posibles",
      "Incluyan etapas adicionales aunque no sean necesarias",
      "Exijan toda la documentación disponible sin excepción"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la eficacia y economía implican que los procedimientos deben alcanzar su finalidad con celeridad, evitando trámites innecesarios, decisiones inhibitorias y gastos injustificados.",
    topic: "Principios del artículo 209 - Eficacia y economía"
  },
  {
    id: 8,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. El principio de celeridad se refleja en:",
    options: [
      "Detener los procedimientos hasta analizar nuevos requisitos",
      "Impulsar oficiosamente los trámites, eliminar formalidades innecesarias y usar formularios para actuaciones en serie sin descuidar las pruebas",
      "Impedir que los administrados aporten pruebas extemporáneas",
      "Conceder términos indefinidos para responder"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la celeridad implica el impulso oficioso del procedimiento, la supresión de trámites innecesarios y el uso de formularios sin sacrificar el análisis completo de los argumentos.",
    topic: "Principios del artículo 209 - Celeridad"
  },
  {
    id: 9,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. El principio de imparcialidad obliga a la administración a:",
    options: [
      "Priorizar a quienes tengan preferencia política",
      "Garantizar los derechos de todas las personas sin discriminación, respetando el orden de actuación",
      "Resolver primero las solicitudes de mayor cuantía",
      "Atender exclusivamente a los ciudadanos de la capital"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la imparcialidad implica asegurar los derechos de todas las personas sin discriminación y dar idéntico tratamiento a quienes actúan, respetando el orden de llegada.",
    topic: "Principios del artículo 209 - Imparcialidad"
  },
  {
    id: 10,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. El principio de publicidad obliga a las autoridades a:",
    options: [
      "Reservar toda la información contractual",
      "Comunicar, notificar o publicar sus decisiones conforme lo ordene la ley para garantizar su conocimiento",
      "Publicar únicamente los actos favorables",
      "Informar decisiones solo al superior jerárquico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la publicidad exige dar a conocer las decisiones administrativas mediante comunicaciones, notificaciones o publicaciones que ordene la ley.",
    topic: "Principios del artículo 209 - Publicidad"
  },
  {
    id: 11,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Según el artículo 5 de la Ley 489 de 1998, la competencia administrativa debe ejercerse:",
    options: [
      "De forma compartida con cualquier otra entidad",
      "Solo cuando medie autorización judicial",
      "Con exclusividad, de manera directa e inmediata sobre los asuntos asignados expresamente",
      "Por delegación automática en cualquier servidor"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, la norma establece que los organismos y entidades ejercen sus competencias de manera directa, inmediata y exclusiva respecto de los asuntos asignados expresamente por la ley o reglamento.",
    topic: "Actuación administrativa - Competencia"
  },
  {
    id: 12,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. El principio de coordinación del artículo 6 de la Ley 489 de 1998 exige que las autoridades:",
    options: [
      "Actúen de forma aislada y autónoma frente a otras entidades",
      "Eviten compartir información para proteger la discrecionalidad",
      "Garanticen armonía, colaboren y no obstaculicen el cumplimiento de funciones de otras entidades",
      "Trasladen sus responsabilidades a particulares"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, el principio de coordinación ordena a las autoridades colaborar y armonizar sus actuaciones, absteniéndose de impedir o entorpecer las funciones de otras entidades.",
    topic: "Actuación administrativa - Coordinación"
  },
  {
    id: 13,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Una característica de la desconcentración es que:",
    options: [
      "Se otorga mediante acto administrativo particular del titular",
      "Transfiere competencias a órganos subordinados sin personería jurídica ni presupuesto propio mediante normas legales o reglamentarias",
      "Genera nuevas personas jurídicas autónomas",
      "El superior jerárquico puede reasumir la competencia en cualquier momento sin norma que lo autorice"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la desconcentración transfiere competencias a órganos inferiores dentro de la misma entidad, sin crear nuevas personas jurídicas, y se establece por ley o decreto.",
    topic: "Organización administrativa - Desconcentración"
  },
  {
    id: 14,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Un elemento constitutivo de la delegación es:",
    options: [
      "La creación de una entidad con autonomía presupuestal",
      "La transferencia de funciones mediante acto administrativo expedido por el titular, con autorización legal y posibilidad de reasumir la competencia",
      "La asignación automática por la Constitución sin necesidad de acto",
      "La imposibilidad de revocar la decisión una vez delegada"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la delegación supone que el órgano titular transfiere funciones mediante acto administrativo, requiere autorización legal y puede ser revocada por el delegante.",
    topic: "Organización administrativa - Delegación"
  },
  {
    id: 15,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. La diferencia fundamental entre desconcentración y delegación es que:",
    options: [
      "La desconcentración se otorga por acto administrativo particular y la delegación por ley",
      "La desconcentración crea nuevas personas jurídicas mientras la delegación mantiene la misma entidad",
      "La desconcentración se establece y revoca por normas generales, mientras la delegación se concede y revoca por actos administrativos particulares del titular",
      "La delegación impide al superior ejercer supervisión sobre el delegado"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, la desconcentración nace de normas generales (ley o decreto) y asigna competencias de forma permanente, mientras la delegación se otorga y revoca mediante actos del titular.",
    topic: "Organización administrativa - Desconcentración vs delegación"
  },
  {
    id: 16,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Una característica esencial de la descentralización administrativa es:",
    options: [
      "La ausencia de autonomía presupuestal",
      "La creación de una nueva persona jurídico-pública con autonomía y traslado de competencias no recuperable",
      "La reasunción automática de competencias por parte del nivel central",
      "La inexistencia de patrimonio propio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la descentralización distribuye funciones entre el nivel central y entidades autónomas con personería jurídica y autonomía presupuestal; las competencias trasladadas no se recuperan automáticamente.",
    topic: "Organización administrativa - Descentralización"
  },
  {
    id: 17,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. ¿Cuál de las siguientes entidades hace parte del sector descentralizado territorialmente?",
    options: [
      "Los ministerios y departamentos administrativos",
      "Las entidades territoriales como departamentos, distritos y municipios",
      "La Presidencia de la República",
      "Las unidades administrativas especiales sin personería jurídica"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el sector descentralizado territorial incluye entidades territoriales como departamentos, distritos y municipios, además de entidades administrativas especiales de orden territorial.",
    topic: "Estructura de la administración pública"
  },
  {
    id: 18,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. ¿Cuál de los siguientes organismos se clasifica como órgano de control?",
    options: [
      "Banco de la República",
      "Procuraduría General de la Nación",
      "Agencias estatales especializadas",
      "Comisión Nacional del Servicio Civil"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, los órganos de control incluyen la Procuraduría, la Contraloría, la Personería y la Defensoría del Pueblo.",
    topic: "Estructura de la administración pública - Órganos de control"
  },
  {
    id: 19,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Los trabajadores oficiales se vinculan a la administración mediante:",
    options: [
      "Elección popular",
      "Nombramiento en carrera administrativa",
      "Contrato laboral",
      "Acto administrativo de periodo fijo"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, los trabajadores oficiales se vinculan mediante contrato laboral, a diferencia de los empleados públicos que se vinculan por nombramiento.",
    topic: "Servidores públicos - Formas de vinculación"
  },
  {
    id: 20,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Según la Corte Constitucional, un acto administrativo es:",
    options: [
      "Cualquier contrato celebrado por la administración",
      "Una declaración de voluntad, juicio, conocimiento o deseo de la administración en ejercicio de potestad administrativa distinta de la reglamentaria",
      "Un simple hecho material que produce efectos jurídicos sin voluntad previa",
      "Una operación destinada únicamente a ejecutar decisiones previas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Siguiendo a García de Enterría, el acto administrativo es la declaración de voluntad, juicio, conocimiento o deseo de la administración en ejercicio de potestad administrativa distinta de la reglamentaria.",
    topic: "Acto administrativo - Concepto"
  }
]

const questionsV2: Question[] = [
  {
    id: 1,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. ¿Cuál de las siguientes actuaciones NO constituye un acto administrativo?",
    options: [
      "Una resolución que impone una sanción",
      "Una operación administrativa que ejecuta una decisión previa",
      "Un acto que otorga una licencia",
      "Una resolución que declara un derecho"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las operaciones administrativas son actos de ejecución que materializan decisiones previamente adoptadas y, por sí mismas, no constituyen actos administrativos.",
    topic: "Acto administrativo - Actuaciones excluidas"
  },
  {
    id: 2,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. El acto ficto o presunto se entiende configurado cuando:",
    options: [
      "La administración resuelve favorablemente antes del vencimiento del término",
      "La administración guarda silencio y, por regla general, se presume la negativa a la solicitud después de tres meses",
      "La autoridad dicta una resolución expresa dentro del término legal",
      "Cualquier ciudadano interpone un recurso contra un acto general"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, por regla general, el silencio administrativo negativo se configura si la administración no responde en tres meses; excepcionalmente la ley puede otorgarle efectos positivos.",
    topic: "Acto administrativo - Acto ficto o presunto"
  },
  {
    id: 3,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. El elemento competencia de un acto administrativo se refiere a:",
    options: [
      "La conveniencia política de la decisión",
      "El poder jurídico de una autoridad para emitir un acto respecto de materia, territorio o tiempo determinados",
      "La motivación económica del acto",
      "La opinión de los particulares sobre la decisión"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la competencia es el poder jurídico asignado a una autoridad para actuar en materias, territorios o tiempos específicos; es irrenunciable e indelegable salvo autorización legal.",
    topic: "Acto administrativo - Elementos"
  },
  {
    id: 4,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. El vicio de competencia se configura cuando:",
    options: [
      "La autoridad motiva ampliamente su decisión",
      "La autoridad actúa fuera del ámbito que le fue conferido legalmente",
      "Se publica el acto en el Diario Oficial",
      "Se notifica oportunamente la decisión"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, existe vicio de competencia cuando la autoridad actúa sin estar habilitada para ello, por ejemplo, cuando decide sobre asuntos fuera de su jurisdicción territorial o material.",
    topic: "Acto administrativo - Vicios"
  },
  {
    id: 5,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Respecto del objeto del acto administrativo es correcto afirmar que:",
    options: [
      "Puede ser imposible o ilícito si beneficia al administrado",
      "Debe ser cierto, posible y lícito",
      "Solo importa la forma del acto y no su contenido",
      "Puede consistir en obligaciones no previstas por la ley"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el objeto es el contenido del acto y debe ser cierto, posible y conforme al ordenamiento jurídico; un objeto ilícito o imposible vicia el acto.",
    topic: "Acto administrativo - Elementos"
  },
  {
    id: 6,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. La finalidad del acto administrativo está relacionada con:",
    options: [
      "El interés particular del funcionario que firma el acto",
      "El objetivo de interés general que la ley asigna a la competencia ejercida",
      "La conveniencia fiscal del administrado",
      "La cantidad de recursos presupuestales ejecutados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la finalidad se orienta al interés general previsto por la ley para cada competencia; su desviación configura desviación de poder.",
    topic: "Acto administrativo - Finalidad"
  },
  {
    id: 7,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. La causa y el motivo del acto administrativo se entienden como:",
    options: [
      "La norma habilitante y las circunstancias de hecho que sustentan la decisión",
      "La opinión pública y la motivación política del acto",
      "La conveniencia fiscal y la aprobación del superior",
      "El aval del Ministerio Público y la firma del contratista"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, la causa corresponde a la razón jurídica o norma habilitante, mientras que el motivo atiende a las circunstancias fácticas que justifican la decisión adoptada.",
    topic: "Acto administrativo - Elementos"
  },
  {
    id: 8,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Una finalidad del procedimiento administrativo, según la Ley 1437 de 2011, es:",
    options: [
      "Concentrar el poder en una sola autoridad sin controles",
      "Proteger derechos y libertades, defender el interés general y sujetar a las autoridades a la Constitución y la ley",
      "Evitar la participación ciudadana en las actuaciones administrativas",
      "Otorgar discrecionalidad absoluta a los servidores públicos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el procedimiento administrativo busca proteger derechos, defender los intereses generales, someter a las autoridades al ordenamiento y cumplir los fines del Estado.",
    topic: "Procedimiento administrativo - Finalidades"
  },
  {
    id: 9,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. ¿Cuál de las siguientes es una forma de iniciación del procedimiento administrativo?",
    options: [
      "Solo por orden judicial",
      "Derecho de petición en interés general o particular, cumplimiento de obligación legal o iniciativa oficiosa de la autoridad",
      "Únicamente a solicitud verbal del interesado",
      "Exclusivamente mediante recursos administrativos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el procedimiento puede iniciarse por derecho de petición, en cumplimiento de un deber legal o por oficio cuando la autoridad actúa de manera oficiosa.",
    topic: "Procedimiento administrativo - Iniciación"
  },
  {
    id: 10,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Cuando una petición está incompleta, la autoridad debe:",
    options: [
      "Rechazarla de inmediato sin explicación",
      "Requerir al interesado dentro de los diez días para que complete la solicitud, otorgándole hasta un mes para hacerlo por una sola vez",
      "Resolverla con la información disponible",
      "Archivarla definitivamente sin notificar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la autoridad requiere al interesado dentro de los diez días siguientes para completar la petición y le concede hasta un mes para subsanar una única vez.",
    topic: "Procedimiento administrativo - Peticiones incompletas"
  },
  {
    id: 11,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Los términos para resolver peticiones son, respectivamente, para peticiones en general, de información y consultas:",
    options: [
      "10, 15 y 30 días hábiles",
      "15, 10 y 30 días hábiles",
      "30, 15 y 10 días hábiles",
      "5, 10 y 15 días hábiles"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la Ley 1437 fija 15 días hábiles para peticiones en general, 10 para información y documentos, y 30 para consultas.",
    topic: "Procedimiento administrativo - Términos"
  },
  {
    id: 12,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. La autoridad puede otorgar plazos adicionales para resolver peticiones siempre que:",
    options: [
      "Se informe antes del vencimiento del término y el nuevo plazo no exceda el doble del inicial",
      "Exista autorización del interesado por escrito",
      "El plazo adicional sea indefinido",
      "No se justifique la demora"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, la autoridad puede ampliar el término informando antes de su vencimiento y sin exceder el doble del plazo inicial.",
    topic: "Procedimiento administrativo - Prórrogas"
  },
  {
    id: 13,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. ¿Cuál de los siguientes documentos se considera reservado según el artículo 24 de la Ley 1437 de 2011?",
    options: [
      "Las peticiones de información pública",
      "Documentos relacionados con la defensa o seguridad nacionales",
      "Los actos administrativos de carácter general",
      "Los informes de gestión publicados en la web"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la reserva cobija, entre otros, documentos sobre defensa o seguridad nacionales, secretos comerciales, información protegida por secreto profesional y datos sobre privacidad.",
    topic: "Procedimiento administrativo - Reserva de información"
  },
  {
    id: 14,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Los terceros pueden intervenir en una actuación administrativa cuando:",
    options: [
      "La actuación se inicia en interés general, sus derechos puedan verse afectados o hayan sido denunciantes o afectados",
      "Así lo solicite cualquier ciudadano sin relación con el asunto",
      "El funcionario lo considere para dilatar el trámite",
      "Se trate de actuaciones reservadas de seguridad nacional"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, los terceros intervienen cuando la actuación afecta sus derechos, fue iniciada en interés general o pueden aportar pruebas por su rol de denunciantes o afectados.",
    topic: "Procedimiento administrativo - Intervención de terceros"
  },
  {
    id: 15,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Los gastos de práctica de pruebas en el procedimiento administrativo:",
    options: [
      "Los asume siempre la autoridad",
      "Se distribuyen proporcionalmente entre los interesados y recaen en quien las solicite",
      "Se cargan a quien resulte vencido en la actuación",
      "Son asumidos por el Ministerio Público"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, los gastos de pruebas corren por cuenta de quien las solicita; si hay varios interesados se distribuyen en cuotas iguales.",
    topic: "Procedimiento administrativo - Pruebas"
  },
  {
    id: 16,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Para notificar un acto administrativo particular, la autoridad primero debe:",
    options: [
      "Publicarlo en el Diario Oficial",
      "Citar al interesado para que comparezca dentro de cinco días hábiles y realizar notificación personal",
      "Enviar un correo electrónico a cualquier dirección",
      "Expedir un edicto de manera inmediata"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la notificación personal inicia con la citación para comparecer dentro de cinco días hábiles; si el interesado acude, se realiza la notificación personal.",
    topic: "Notificaciones - Actos particulares"
  },
  {
    id: 17,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Si el interesado no comparece tras la citación para notificación personal, la autoridad debe:",
    options: [
      "Archivar el expediente",
      "Notificar por aviso enviando copia íntegra del acto",
      "Repetir indefinidamente la citación",
      "Solicitar autorización judicial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, si no hay comparecencia, la autoridad notifica por aviso y envía copia del acto, cumpliendo con el procedimiento previsto.",
    topic: "Notificaciones - Actos particulares"
  },
  {
    id: 18,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. La revocatoria directa procede cuando:",
    options: [
      "El acto es ajustado a la ley y produce efectos favorables",
      "El acto es contrario a la Constitución o la ley, no se ajusta al bienestar común o atenta injustificadamente contra bienes o integridad de una persona",
      "El interesado desea cambiar de opinión sin fundamento",
      "Han transcurrido más de diez años desde la expedición del acto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la Ley 1437 permite revocar directamente actos que sean contrarios a la Constitución o ley, afecten el bienestar común o atenten injustificadamente contra bienes o integridad de una persona.",
    topic: "Procedimiento administrativo - Revocatoria directa"
  },
  {
    id: 19,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. ¿Cuáles son los recursos principales que proceden contra actos administrativos definitivos?",
    options: [
      "Reposición, apelación y queja",
      "Reposición, casación y revisión",
      "Apelación, tutela y revisión",
      "Reposición, reconsideración y súplica"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, los recursos administrativos principales son reposición, apelación y queja; la apelación suele ser necesaria para acudir a la jurisdicción contencioso-administrativa.",
    topic: "Procedimiento administrativo - Recursos"
  },
  {
    id: 20,
    question: "Lectura: En la Alcaldía Municipal se revisan las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. El término para interponer los recursos de reposición y apelación es:",
    options: [
      "Cinco días hábiles contados desde la ejecutoria",
      "Diez días hábiles siguientes a la notificación o al acto presunto, pudiendo interponerse en cualquier tiempo contra actos presuntos",
      "Treinta días calendario contados desde la comunicación",
      "Un mes contado desde la publicación en la página web"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La reposición y la apelación se interponen al momento de la notificación o dentro de los diez días hábiles siguientes; contra actos presuntos pueden presentarse en cualquier tiempo.",
    topic: "Procedimiento administrativo - Recursos y términos"
  },
  {
    id: 21,
    question: "Situación: El Presidente entra en incapacidad temporal durante una visita oficial. ¿Quién debe asumir el despacho?",
    options: [
      "El Presidente del Congreso",
      "El Vicepresidente",
      "El Ministro del Interior",
      "El Procurador General"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La Constitución dispone que el Vicepresidente es el primer llamado a reemplazar temporal o definitivamente al Presidente cuando se presenta una falta.",
    topic: "Organización del Estado - Reemplazo presidencial"
  },
  {
    id: 22,
    question: "Situación: Se debe formular una nueva política nacional de salud preventiva. ¿Qué entidad lidera su diseño?",
    options: [
      "La Superintendencia Nacional de Salud",
      "El Ministerio de Salud y Protección Social",
      "El Instituto Nacional de Metrología",
      "La UGPP"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los ministerios dirigen el sector administrativo correspondiente y tienen a su cargo la formulación de políticas, planes y programas en su área.",
    topic: "Organización del Estado - Ministerios"
  },
  {
    id: 23,
    question: "Situación: Se nombrará un nuevo director del DANE, que es un departamento administrativo. ¿Quién realiza la designación?",
    options: [
      "El Senado de la República",
      "La Corte Constitucional",
      "El Presidente de la República",
      "Los alcaldes de capitales departamentales"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "Los departamentos administrativos dependen directamente del Presidente, quien nombra a sus directores mediante decreto.",
    topic: "Organización del Estado - Departamentos administrativos"
  },
  {
    id: 24,
    question: "Situación: Una entidad financiera incumple normas prudenciales. ¿Qué tipo de organismo aplica control y supervisión?",
    options: [
      "Un ministerio del sector",
      "Una superintendencia",
      "Una empresa industrial y comercial del Estado",
      "Un establecimiento público"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las superintendencias ejercen inspección, vigilancia y control sobre actores de sectores económicos específicos para garantizar el cumplimiento regulatorio.",
    topic: "Organización del Estado - Superintendencias"
  },
  {
    id: 25,
    question: "Situación: El Gobierno requiere una figura con autonomía administrativa para gestionar pensiones y parafiscales con agilidad. ¿Cuál encaja mejor?",
    options: [
      "Establecimiento público",
      "Unidad Administrativa Especial (UAE)",
      "Sociedad pública",
      "Empresa industrial y comercial del Estado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las unidades administrativas especiales cuentan con autonomía técnica y operativa para misiones estratégicas, como la gestión de aportes parafiscales.",
    topic: "Organización del Estado - Unidades administrativas especiales"
  },
  {
    id: 26,
    question: "Situación: Se ejecutará un plan vial municipal. ¿Quién es la cabeza del Ejecutivo local que debe liderar la actuación?",
    options: [
      "El Gobernador",
      "El Alcalde",
      "El Ministro de Transporte",
      "El Director de INVÍAS"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En cada municipio, el alcalde es el jefe de la administración y dirige la ejecución del plan de desarrollo y las obras públicas locales.",
    topic: "Gobierno territorial - Alcaldías"
  },
  {
    id: 27,
    question: "Situación: Un barrio quiere priorizar intervenciones de espacio público ante la Alcaldía. ¿Qué instancia lo representa ante la administración local?",
    options: [
      "El concejo departamental",
      "Una asamblea ciudadana nacional",
      "La Junta Administradora Local (JAL)",
      "La Defensoría Regional"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "Las Juntas Administradoras Locales, integradas por ediles, representan a las comunidades ante la alcaldía local y promueven la participación en la definición de inversiones.",
    topic: "Participación territorial - JAL"
  },
  {
    id: 28,
    question: "Situación: Cinco municipios conurbados necesitan coordinar la planeación de transporte y vivienda. ¿Qué figura facilita esa articulación?",
    options: [
      "Provincia administrativa",
      "Región geográfica",
      "Área metropolitana",
      "Distrito especial"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "Las áreas metropolitanas articulan la planeación y la prestación de servicios entre municipios integrados alrededor de una ciudad núcleo.",
    topic: "Organización regional - Áreas metropolitanas"
  },
  {
    id: 29,
    question: "Situación: Una ciudad con funciones capitales requiere mayor autonomía que un municipio ordinario. ¿Cuál categoría es la indicada?",
    options: [
      "Municipio certificado",
      "Distrito especial",
      "Departamento",
      "Región Andina"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los distritos especiales cuentan con régimen político y fiscal reforzado para atender funciones estratégicas, como sucede con capitales departamentales y portuarias.",
    topic: "Organización territorial - Distritos especiales"
  },
  {
    id: 30,
    question: "Situación: Una comunidad indígena define el uso de su territorio y recursos. ¿Qué reconoce el ordenamiento?",
    options: [
      "Su pertenencia al Ministerio del Interior",
      "Un régimen idéntico al de los municipios",
      "Territorios indígenas con reconocimiento legal y autonomía decisoria",
      "Que debe convertirse en área metropolitana"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "La Constitución reconoce los territorios indígenas con autonomía para decidir sobre sus recursos y formas de gobierno, respetando sus culturas.",
    topic: "Organización territorial - Territorios indígenas"
  },
  {
    id: 31,
    question: "Situación: Un municipio debe operar servicios hospitalarios públicos y fortalecer la atención primaria. ¿Qué figura estatal presta estos servicios?",
    options: [
      "Empresa industrial y comercial del Estado (EICE)",
      "Empresa Social del Estado (ESE)",
      "Sociedad de economía mixta",
      "Superintendencia de Salud"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las Empresas Sociales del Estado integran la red pública hospitalaria y prestan servicios de salud bajo el sistema general de seguridad social.",
    topic: "Sector salud - ESE"
  },
  {
    id: 32,
    question: "Situación: El Estado quiere participar en el sector energético con enfoque empresarial y generación de utilidades. ¿Qué figura corresponde?",
    options: [
      "Establecimiento público",
      "Empresa Industrial y Comercial del Estado (EICE)",
      "Empresa Social del Estado",
      "Junta Administradora Local"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las EICE se constituyen para desarrollar actividades industriales o comerciales en competencia, con patrimonio propio y autonomía administrativa y financiera.",
    topic: "Empresas estatales - EICE"
  },
  {
    id: 33,
    question: "Situación: Una empresa de acueducto requiere aprobación tarifaria y control de calidad. ¿Quién ejerce la regulación sectorial?",
    options: [
      "El Ministerio de Vivienda",
      "Las comisiones de regulación (por ejemplo, CRA o CREG)",
      "Una Empresa Social del Estado",
      "El Departamento Nacional de Planeación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las comisiones de regulación fijan reglas técnicas, tarifas y estándares de calidad para los servicios públicos domiciliarios y vigilan su cumplimiento.",
    topic: "Servicios públicos - Regulación"
  },
  {
    id: 34,
    question: "Situación: El Estado mantiene control mayoritario de una empresa pero vincula capital privado para apalancar inversiones. ¿Qué figura jurídica es?",
    options: [
      "Sociedad pública",
      "Sociedad de economía mixta",
      "Establecimiento público",
      "Unidad Administrativa Especial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En las sociedades de economía mixta el Estado conserva participación mayoritaria, pero admite accionistas privados para financiar proyectos estratégicos.",
    topic: "Empresas estatales - Sociedades de economía mixta"
  },
  {
    id: 35,
    question: "Situación: Un ministerio quiere desarrollar tecnología para monitoreo costero con apoyo académico. ¿Qué tipo de entidad pública puede liderar el I+D?",
    options: [
      "Una superintendencia",
      "Un instituto de investigación científica y tecnológica",
      "Una Junta Administradora Local",
      "Una empresa industrial y comercial del Estado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los institutos de investigación científica y tecnológica son entidades estatales especializadas que coordinan proyectos de I+D y trabajan con la academia y la industria.",
    topic: "Organización del Estado - Institutos científicos"
  },
  {
    id: 36,
    question: "Situación: Debe formularse un plan de ordenamiento territorial a escala departamental. ¿Quién lidera políticamente el proceso?",
    options: [
      "El Alcalde",
      "El Gobernador",
      "El Ministro de Ambiente",
      "El Director de una unidad administrativa especial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En el nivel departamental, el gobernador es el jefe del Ejecutivo y coordina la planificación territorial conforme al plan de desarrollo y a las competencias del departamento.",
    topic: "Gobierno territorial - Gobernaciones"
  }
]

export function NormatividadTest() {
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
          Esta prueba contiene {questions.length} preguntas sobre normatividad de las entidades territoriales y derecho administrativo.
          Total de puntos disponibles: {questions.reduce((sum, q) => sum + q.points, 0)} puntos.
          Basada en el compendio de derecho administrativo y en “Organización del Estado: estructura y competencias”.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selecciona la versión de la prueba</CardTitle>
          <CardDescription>
            La Versión 1 reúne {questionsV1.length} preguntas sobre organización del Estado y derecho administrativo; la Versión 2 conserva {questionsV2.length} preguntas centradas en acto y procedimiento administrativo.
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
                    id={`norm-q${question.id}-opt${optionIndex}`}
                    className="mt-0.5"
                  />
                  <Label htmlFor={`norm-q${question.id}-opt${optionIndex}`} className="flex-1 cursor-pointer leading-relaxed">
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
