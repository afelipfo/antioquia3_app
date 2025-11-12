"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, InfoIcon, XCircle } from "lucide-react"
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

const questions: Question[] = [
  {
    id: 1,
    question:
      "Lectura: Un juez analiza un derecho no desarrollado explícitamente en la Constitución pero respaldado por un tratado de DD. HH. ratificado por Colombia. ¿Qué herramienta utiliza para integrarlo?",
    options: [
      "El principio de legalidad estricta para aplicar solo la ley",
      "El bloque de constitucionalidad como complemento interpretativo de la Carta",
      "Una doctrina interna de la rama ejecutiva",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El documento resalta que el bloque de constitucionalidad permite integrar tratados de DD. HH. como parámetro de interpretación y complementación de la Constitución.",
    topic: "Concepto general",
  },
  {
    id: 2,
    question:
      "Lectura: Una autoridad sostiene que la supremacía se agota en el texto literal de la Constitución. Según el estudio del bloque, ¿cuál es el enfoque correcto?",
    options: [
      "La Constitución no admite normas complementarias",
      "La Constitución solo se interpreta con leyes ordinarias",
      "La Constitución se integra con normas y principios que la desarrollan para garantizar su supremacía",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El material explica que la Carta no se reduce a su texto, pues se complementa con normas y principios del bloque que aseguran su supremacía.",
    topic: "Naturaleza del bloque",
  },
  {
    id: 3,
    question:
      "Lectura: Se presenta un conflicto entre una ley y un tratado de DD. HH. prevalente. ¿Qué ordena el artículo 4 constitucional complementado con el bloque?",
    options: [
      "Aplicar la ley por ser más reciente",
      "Privilegiar la Constitución y las normas del bloque que garantizan su supremacía",
      "Remitir la controversia a un ministerio",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El artículo 4, interpretado con el bloque, establece la prevalencia de la Constitución y de las normas que la integran frente a leyes contrarias.",
    topic: "Supremacía (art. 4)",
  },
  {
    id: 4,
    question:
      "Lectura: Una entidad consulta si un tratado de DD. HH. ratificado que limita medidas en estados de excepción es vinculante internamente. ¿Qué indica el artículo 93?",
    options: [
      "No es vinculante si no existe ley estatutaria",
      "Solo vincula al ejecutivo",
      "Prevalece en el orden interno y obliga a todas las autoridades",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El artículo 93 menciona que los tratados y convenios de DD. HH. ratificados prevalecen en el orden interno, integrando el bloque y vinculando a todas las autoridades.",
    topic: "Tratados de DD. HH. (art. 93)",
  },
  {
    id: 5,
    question:
      "Lectura: Se reclama protección de un derecho inherente no enunciado en la Carta. ¿Qué dispone el artículo 94?",
    options: [
      "No puede protegerse por falta de consagración expresa",
      "Debe regularse únicamente por ley",
      "Puede reconocerse, pues la Carta ampara derechos no enunciados de manera expresa",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El artículo 94 señala que el reconocimiento de los derechos no debe entenderse como negación de otros inherentes, por lo que el bloque cubre derechos no enunciados.",
    topic: "Derechos no escritos (art. 94)",
  },
  {
    id: 6,
    question:
      "Lectura: Durante un estado de excepción se pretende suspender normas de Derecho Internacional Humanitario. ¿Qué recuerda el artículo 214.2?",
    options: [
      "Las autoridades pueden restringir cualquier derecho",
      "Debe respetarse el Derecho Internacional Humanitario",
      "Se suspenden los tratados internacionales",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El artículo 214.2, incorporado al bloque, impone el respeto al DIH aun durante estados de excepción.",
    topic: "Estados de excepción",
  },
  {
    id: 7,
    question:
      "Lectura: Una norma se erige como parámetro directo de control constitucional con jerarquía constitucional. ¿A qué categoría pertenece?",
    options: [
      "Bloque de constitucionalidad en sentido estricto",
      "Bloque en sentido lato con jerarquía supralegal",
      "Derecho administrativo ordinario",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El bloque en sentido estricto agrupa normas con jerarquía constitucional que actúan como parámetro directo del control.",
    topic: "Bloque en sentido estricto",
  },
  {
    id: 8,
    question:
      "Lectura: Para resolver un litigio laboral, el juez invoca convenios OIT ratificados con valor supralegal. ¿En qué sentido del bloque se ubican?",
    options: [
      "Sentido estricto",
      "Sentido lato o supralegal",
      "Norma orgánica",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "Los convenios de la OIT ratificados suelen ubicarse en el bloque en sentido lato como fuentes supralegales y criterios de interpretación.",
    topic: "Bloque en sentido lato",
  },
  {
    id: 9,
    question:
      "Lectura: ¿Cuál de las siguientes normas se cita en el documento como perteneciente al bloque en sentido lato?",
    options: [
      "Códigos de policía",
      "Leyes estatutarias y normas del DIH como criterios interpretativos",
      "Planes de desarrollo económico",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El texto menciona que leyes estatutarias y normas del DIH operan como herramientas supralegales en el bloque lato.",
    topic: "Ejemplos lato",
  },
  {
    id: 10,
    question:
      "Lectura: Una ley es demandada por contrariar un tratado de DD. HH. ¿Cuál es el efecto del bloque en el control de constitucionalidad?",
    options: [
      "No aplica al control",
      "Es parámetro de control y puede llevar a la inexequibilidad",
      "Solo sirve como orientación política",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El bloque integra el parámetro de control constitucional, por lo que una ley contraria puede ser declarada inexequible.",
    topic: "Efectos - Control constitucional",
  },
  {
    id: 11,
    question:
      "Lectura: Un alcalde afirma que el bloque solo obliga a jueces. ¿Qué enseña el documento?",
    options: [
      "Es cierto por reserva judicial",
      "Solo vincula al Congreso",
      "Vincula a todas las autoridades en ejercicio de sus funciones",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "La Corte ha reiterado que el bloque vincula a todas las ramas y niveles de la administración pública.",
    topic: "Efectos - Vinculación",
  },
  {
    id: 12,
    question:
      "Lectura: El Estado desconoce un tratado de DD. HH. prevalente. ¿Qué consecuencias describe el documento?",
    options: [
      "Nulidad automática de toda la Constitución",
      "No hay consecuencias internas",
      "Se pueden anular actos normativos y generarse sanciones internacionales",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El bloque prevé tanto la nulidad de normas internas contrarias como la eventual responsabilidad internacional del Estado.",
    topic: "Efectos - Sanciones",
  },
  {
    id: 13,
    question:
      "Lectura: Una ley limita la libertad sindical. ¿Cómo procede la Corte Constitucional?",
    options: [
      "Solo confronta la ley con la Carta",
      "Confronta también los Convenios 87 y 98 de la OIT y puede declarar inexequible",
      "Remite el caso al Ministerio del Trabajo",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El documento cita que los convenios 87 y 98 de la OIT, como parte del bloque, se usan para el control de normas que afecten libertad sindical.",
    topic: "Caso - Libertad sindical",
  },
  {
    id: 14,
    question:
      "Lectura: Se analiza el Acto Legislativo 01 de 2020 sobre prisión perpetua revisable. ¿Qué concluyó la Corte?",
    options: [
      "Lo declaró exequible por proteger menores",
      "Lo declaró inexequible por desconocer la dignidad humana, la resocialización y tratados internacionales",
      "Difirió su decisión para reglamentación",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El fallo concluyó que la pena perpetua violaba el artículo 34 C.P. y tratados como el PIDCP y la CADH, integrados al bloque.",
    topic: "Caso - Pena perpetua",
  },
  {
    id: 15,
    question:
      "Lectura: ¿Cuál fue el fundamento en DD. HH. para declarar inexequible la pena perpetua revisable?",
    options: [
      "Los tratados no son pertinentes en materia penal",
      "El bloque impide medidas que desconozcan tratados de DD. HH.; la pena perpetua es inhumana y desproporcionada",
      "El Congreso puede exceptuar tratados por mayoría simple",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "La ratio decidendi resaltó que los compromisos internacionales en DD. HH. prohíben sanciones inhumanas, por lo que el bloque impedía la medida.",
    topic: "Caso - Fundamento DD. HH.",
  },
  {
    id: 16,
    question:
      "Lectura: Tras la destitución e inhabilidad de Gustavo Petro, ¿qué ocurrió a nivel internacional según el documento?",
    options: [
      "No hubo reclamación internacional",
      "Se presentó demanda ante la CIDH y el proceso terminó con su reintegro",
      "La Corte IDH impuso sanción penal",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El texto recuerda que se acudió al sistema interamericano, lo que desembocó en la restitución del cargo a Petro.",
    topic: "Caso Petro - Sistema interamericano",
  },
  {
    id: 17,
    question:
      "Lectura: ¿Qué decidió la Corte Constitucional en la Sentencia C-030 de 2023 respecto a las facultades de la Procuraduría (Ley 1952 de 2019, art. 1)?",
    options: [
      "Ratificó que la Procuraduría ejerce funciones jurisdiccionales plenas",
      "Declaró inexequibles las expresiones “jurisdiccionales” y condicionó que las sanciones de destitución/suspensión/inhabilidad a elegidos por voto popular corresponden al juez contencioso administrativo",
      "Trasladó todas las investigaciones disciplinarias a la Fiscalía",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "La sentencia limitó las facultades sancionatorias de la Procuraduría cuando afectan a funcionarios elegidos popularmente, siguiendo el estándar del bloque.",
    topic: "Caso Petro - C-030/23",
  },
  {
    id: 18,
    question:
      "Lectura: Según el artículo 23 de la CADH citado en el documento, ¿quién puede restringir derechos políticos?",
    options: [
      "Cualquier autoridad disciplinaria",
      "Un juez competente mediante condena en proceso penal",
      "Un órgano administrativo con función sancionatoria",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El art. 23.2 CADH establece que solo una sentencia penal dictada por juez competente puede restringir derechos políticos, estándar integrado al bloque.",
    topic: "CADH - Derechos políticos",
  },
  {
    id: 19,
    question:
      "Lectura: En el control de convencionalidad del Consejo de Estado se advirtió que sin condena penal no puede mantenerse una sanción que restrinja derechos políticos. ¿Por qué?",
    options: [
      "Porque basta con autoridad nacional",
      "Porque lo contrario violaría el art. 23.2 CADH y el principio pacta sunt servanda",
      "Porque una confirmación administrativa es suficiente",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El Consejo de Estado sostuvo que sin condena penal mantener la sanción desconocería el pacto internacional y el principio de buena fe en el cumplimiento de tratados.",
    topic: "Control de convencionalidad",
  },
  {
    id: 20,
    question:
      "Lectura: ¿Por qué el Consejo de Estado resaltó la importancia democrática del artículo 23.2 CADH?",
    options: [
      "Solo protege al sancionado",
      "Preserva el principio democrático y los derechos de los electores además del elegido",
      "Evita acciones de tutela",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El fallo indicó que proteger los derechos políticos también resguarda la voluntad popular de los electores, eje democrático del bloque.",
    topic: "CADH - Democracia",
  },
  {
    id: 21,
    question:
      "Lectura: Se demanda una ley que regula estados de excepción desconociendo el DIH. ¿Cómo opera el bloque?",
    options: [
      "No procede control por reserva legislativa",
      "Se ejerce control con base en el bloque (art. 214.2 y normas del DIH) y puede declararse inexequible",
      "Se aplica preferentemente la ley por especialidad",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El bloque incluye el DIH como parámetro de control en estados de excepción, permitiendo declarar inexequibles normas contrarias.",
    topic: "Aplicación práctica",
  },
  {
    id: 22,
    question:
      "Lectura: Una entidad territorial expide un decreto contrario a un tratado de DD. HH. prevalente. ¿Qué debe hacer el juez contencioso?",
    options: [
      "Inaplicar el tratado por no ser ley",
      "Aplicar el bloque como parámetro y anular el acto si es contrario",
      "Remitir el caso a conciliación",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El bloque vincula a todas las autoridades; por tanto, el juez contencioso aplica el tratado integrado al bloque y puede anular el acto incompatible.",
    topic: "Autoridades vinculadas",
  },
  {
    id: 23,
    question:
      "Lectura: En una controversia laboral sobre asociación sindical, ¿qué fuente complementa la Constitución según el documento?",
    options: [
      "Únicamente el Código Sustantivo del Trabajo",
      "Los convenios OIT 87 y 98, como parte del bloque",
      "Un reglamento interno de empresa",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El texto cita los convenios OIT 87 y 98 como referentes del bloque para proteger la libertad sindical en Colombia.",
    topic: "Convenios OIT",
  },
  {
    id: 24,
    question:
      "Lectura: El legislador diseña una política criminal que desconoce la dignidad humana y la resocialización. ¿Qué control procede?",
    options: [
      "Solo control político",
      "Control de constitucionalidad soportado en el bloque y las obligaciones internacionales",
      "Consulta no vinculante a la academia",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El bloque opera como parámetro para invalidar normas penales incompatibles con obligaciones internacionales y principios constitucionales.",
    topic: "Política criminal y bloque",
  },
  {
    id: 25,
    question:
      "Situación: A María le niegan un procedimiento médico vital. ¿Cuál mecanismo procede para protección rápida?",
    options: [
      "Acción popular",
      "Acción de cumplimiento",
      "Acción de tutela",
      "Acción de grupo",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "En la situación descrita, la acción de tutela es el mecanismo preferente y sumario para proteger de inmediato derechos fundamentales cuando no existe otro medio eficaz.",
    topic: "Tutela en salud urgente",
  },
  {
    id: 26,
    question:
      "Situación: Un juez encuentra conflicto entre una ley y la Convención Americana sobre DD. HH. en un caso de libertad de expresión. ¿Qué debe aplicar?",
    options: [
      "La ley ordinaria",
      "El tratado de derechos humanos como parte del bloque de constitucionalidad",
      "Ninguno, por falta de reglamentación",
      "Una directiva administrativa",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El documento destaca que los tratados de derechos humanos integran el bloque de constitucionalidad, por lo que deben aplicarse con prevalencia frente a leyes contrarias.",
    topic: "Tratado internacional vs. ley",
  },
  {
    id: 27,
    question:
      "Situación: El Congreso limita el derecho de reunión mediante ley ordinaria. ¿Qué problema principal se configura?",
    options: [
      "Falta de consulta previa",
      "Desconocer la reserva de ley estatutaria para derechos fundamentales",
      "Inexistencia de decreto reglamentario",
      "Vicio de forma en la ponencia",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "La regulación de derechos fundamentales como reunión y protesta está sometida a ley estatutaria; hacerlo por ley ordinaria viola esa reserva.",
    topic: "Reserva de ley estatutaria",
  },
  {
    id: 28,
    question:
      "Situación: El Gobierno decreta emergencia y suspende derechos fundamentales. Según el documento, esto es:",
    options: [
      "Válido por tres meses",
      "Válido si lo avala un juez",
      "Improcedente: los derechos fundamentales no pueden suspenderse en estados de excepción",
      "Procede solo para derechos de segunda generación",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "Incluso en estados de excepción debe respetarse el bloque de constitucionalidad, que prohíbe la suspensión de los derechos fundamentales.",
    topic: "Estados de excepción",
  },
  {
    id: 29,
    question:
      "Situación: Una persona invoca el derecho al olvido digital. ¿Cómo podría reconocerse como fundamental?",
    options: [
      "Solo mediante reforma constitucional",
      "Por ser innominado o por conexidad con privacidad y dignidad",
      "Por costumbre mercantil",
      "Por decreto presidencial",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "La Corte ha admitido derechos innominados y aquellos conectados con otros expresos —como privacidad y dignidad— dentro del catálogo fundamental.",
    topic: "Derechos innominados",
  },
  {
    id: 30,
    question:
      "Situación: Una comunidad demanda por vertimientos que contaminan su río. ¿Qué generación de derechos se activa principalmente?",
    options: [
      "Primera",
      "Segunda",
      "Tercera (colectivos/solidaridad, ambiente)",
      "Cuarta",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "La protección del ambiente y los intereses colectivos corresponde a los derechos de tercera generación o de solidaridad.",
    topic: "Derechos de tercera generación",
  },
  {
    id: 31,
    question:
      "Situación: Una plataforma capta huellas y rostros sin consentimiento. ¿Qué derecho resulta central?",
    options: [
      "Libre asociación",
      "Sufragio",
      "Privacidad y datos personales (cuarta generación)",
      "Trabajo",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "La recopilación de datos biométricos sin autorización vulnera el derecho a la privacidad y la protección de datos personales, ubicados en la cuarta generación.",
    topic: "Protección de datos biométricos",
  },
  {
    id: 32,
    question:
      "Situación: Una autoridad exige a mujeres usar determinada vestimenta por normas religiosas. ¿Qué tensión ilustra el documento?",
    options: [
      "Entre derecho penal y civil",
      "Entre enfoques culturales o religiosos y estándares de derechos humanos y dignidad",
      "Entre dos leyes ordinarias",
      "Entre municipios",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El texto subraya la tensión entre visiones culturales o religiosas y los estándares universales de dignidad y libertades individuales.",
    topic: "Libertad religiosa y dignidad",
  },
  {
    id: 33,
    question:
      "Situación: Una alcaldía impone toque de queda que restringe locomoción y reunión. ¿Qué límite debe respetar?",
    options: [
      "Ninguno si hay alteración del orden público",
      "El núcleo esencial de los derechos limitados",
      "Solo aplicarlo en horario nocturno",
      "Prohibición de multas",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "Cualquier limitación debe salvaguardar el núcleo esencial de los derechos; de lo contrario, se torna inconstitucional.",
    topic: "Límites al poder de policía",
  },
  {
    id: 34,
    question:
      "Situación: Existe un vacío legal sobre un derecho y hay una sentencia de la Corte Constitucional que lo desarrolla. ¿Ese precedente integra el bloque?",
    options: [
      "No, solo cuenta el texto constitucional",
      "Sí, la jurisprudencia de la Corte integra el bloque",
      "Solo si la aprueba el Congreso",
      "Solo en materia penal",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "La doctrina constitucional hace parte del bloque y sirve como parámetro obligatorio de interpretación y control.",
    topic: "Precedente constitucional",
  },
  {
    id: 35,
    question:
      "Situación: Una estudiante ve vulnerada su libertad de expresión por la universidad. ¿Qué rasgo de los derechos permite un remedio sin esperar reglamentación?",
    options: [
      "Principio de oportunidad",
      "Aplicación inmediata",
      "Legalidad estricta",
      "Cosa juzgada",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "Los derechos fundamentales tienen aplicación inmediata (art. 85 C.P.), por lo que pueden exigirse aun sin desarrollo legal.",
    topic: "Aplicación inmediata",
  },
  {
    id: 36,
    question:
      "Situación: A un joven le niegan matrícula en educación básica por falta de pago. ¿Qué generación de derechos se invoca en primer plano?",
    options: [
      "Segunda (educación)",
      "Primera",
      "Tercera",
      "Cuarta",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La educación es un derecho social de segunda generación que obliga al Estado a garantizar acceso efectivo, especialmente en básica.",
    topic: "Derechos sociales",
  },
  {
    id: 37,
    question:
      "Situación: Una autoridad clausura una emisora comunitaria sin orden judicial por críticas al alcalde. ¿Qué derecho y generación se afecta?",
    options: [
      "Trabajo – segunda",
      "Libertad de expresión – primera",
      "Ambiente – tercera",
      "Datos personales – cuarta",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El cierre arbitrario limita la libertad de expresión, derecho civil y político propio de la primera generación.",
    topic: "Libertad de expresión",
  },
  {
    id: 38,
    question:
      "Situación: Se propone una reforma constitucional para reducir las garantías de la tutela. ¿Qué advierte el documento sobre modificar estos derechos?",
    options: [
      "Pueden cambiarse por mayoría simple",
      "Basta un decreto legislativo",
      "Requieren procedimientos más estrictos, con un plus de protección",
      "Solo necesita referendo municipal",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "Los derechos fundamentales gozan de especial rigidez; su modificación demanda procedimientos reforzados y un control estricto.",
    topic: "Rigidez constitucional",
  },
]

export function BloqueConstitucionalidadTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const timer = useTestTimer({
    totalQuestions: questions.length,
    timePerQuestion: 120,
    onTimeUp: () => setShowResults(true),
    isActive: !showResults,
  })

  const handleAnswerChange = (questionId: number, optionIndex: number) => {
    if (showResults) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) return
    setShowResults(true)
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const score = questions.reduce(
    (acc, question) => {
      if (answers[question.id] === question.correctAnswer) {
        return {
          correct: acc.correct + 1,
          earnedPoints: acc.earnedPoints + question.points,
        }
      }
      return acc
    },
    { correct: 0, earnedPoints: 0 },
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="resumen" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="indicaciones">Indicaciones</TabsTrigger>
        </TabsList>
        <TabsContent value="resumen">
          <Card className="border bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Bloque de Constitucionalidad en Colombia</CardTitle>
              <CardDescription>
                Preguntas situacionales basadas en los documentos “Noción de Derechos Fundamentales” y “El Bloque de Constitucionalidad en Colombia”.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Evalúa nociones de derechos fundamentales (tutela, generaciones, bloque de convencionalidad, límites a la autoridad) y los fundamentos, clasificación,
                efectos y casos emblemáticos del bloque (convenios OIT, pena perpetua, caso Petro).
              </p>
              <Alert>
                <AlertTitle className="flex items-center gap-2 font-semibold text-sm">
                  <InfoIcon className="h-4 w-4 text-primary" />
                  Puntaje
                </AlertTitle>
                <AlertDescription>
                  Cada pregunta vale 5 puntos. Para enviar debes responder las 38 preguntas.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="indicaciones">
          <Card className="border bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle>Indicaciones</CardTitle>
              <CardDescription>
                Lee el escenario y selecciona la opción que reproduzca la posición institucional descrita en el documento.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>El cronómetro asigna dos minutos por pregunta.</li>
                <li>Podrás revisar la retroalimentación al finalizar.</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {!showResults && (
        <TestTimer
          formattedTime={timer.formattedTime}
          timeColor={timer.timeColor}
          percentageRemaining={timer.percentageRemaining}
        />
      )}

      {questions.map((question, index) => {
        const selected = answers[question.id]
        const isCorrect = selected === question.correctAnswer
        const showState = showResults && showFeedback

        return (
          <Card
            key={question.id}
            className={`border transition-colors ${
              showState ? (isCorrect ? "border-green-500 bg-green-50/70" : "border-red-400 bg-red-50/70") : "border-border"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-start justify-between gap-4">
                <span>
                  Pregunta {index + 1} · {question.points} pts
                </span>
                {showResults && selected !== undefined && (
                  selected === question.correctAnswer ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )
                )}
              </CardTitle>
              <CardDescription>Tema: {question.topic}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium leading-relaxed">{question.question}</p>
              <RadioGroup
                value={selected?.toString()}
                onValueChange={(value) => handleAnswerChange(question.id, Number(value))}
                disabled={showResults}
              >
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-sm leading-relaxed transition ${
                      showResults
                        ? optionIndex === question.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : selected === optionIndex
                          ? "border-red-400 bg-red-50"
                          : "border-border"
                        : "border-border hover:bg-muted/60"
                    }`}
                  >
                    <RadioGroupItem value={optionIndex.toString()} id={`bloque-q-${question.id}-opt-${optionIndex}`} className="mt-1" />
                    <Label htmlFor={`bloque-q-${question.id}-opt-${optionIndex}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {showResults && showFeedback && (
                <Alert className={isCorrect ? "border-green-500 bg-green-50" : "border-orange-400 bg-orange-50"}>
                  <AlertTitle>{isCorrect ? "¡Correcto!" : "Respuesta incorrecta"}</AlertTitle>
                  <AlertDescription>{question.explanation}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )
      })}

      <div className="flex flex-wrap gap-4">
        {!showResults ? (
          <Button onClick={handleSubmit} disabled={Object.keys(answers).length !== questions.length} className="min-w-[200px]">
            Enviar respuestas
          </Button>
        ) : (
          <>
            <Button onClick={() => setShowFeedback((prev) => !prev)} variant="outline" className="min-w-[200px]">
              {showFeedback ? "Ocultar retroalimentación" : "Mostrar retroalimentación"}
            </Button>
            <Button onClick={handleReset} variant="secondary" className="min-w-[200px]">
              Reiniciar prueba
            </Button>
          </>
        )}
      </div>

      {showResults && (
        <Alert className="border-primary/40 bg-primary/10">
          <AlertTitle className="text-lg font-semibold">Resultado</AlertTitle>
          <AlertDescription>
            Respondiste correctamente {score.correct} de {questions.length} preguntas · {score.earnedPoints} / {questions.length * 5} puntos
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
