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
      "Lectura: La Secretaría de Hacienda analiza los hechos económicos que soportan sus ingresos. La causación de un ingreso presupuestal exige que:",
    options: [
      "Exista un acto administrativo que reconozca el derecho u obligación derivado del hecho económico",
      "Se expida un simple recibo de caja por parte de Tesorería",
      "La dependencia solicitante informe verbalmente el ingreso",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La presentación enfatiza que la causación está sujeta a la existencia de un acto administrativo que formalice el hecho económico, no basta con soportes informales o de caja.",
    topic: "Ingresos - Causación",
  },
  {
    id: 2,
    question:
      "Lectura: Tesorería configura el módulo de recaudo para reportar ingresos. ¿Qué campos debe registrar obligatoriamente cada recaudo?",
    options: [
      "Fecha, concepto, tipo y documento soporte, tercero y valor del recaudo",
      "Únicamente fecha, valor y firma del recaudador",
      "Concepto general y rubro, sin identificar al tercero",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El instructivo de ingresos señala que el recaudo debe registrar todos los datos clave (fecha, concepto, tipo, documento, tercero y valor) para mantener la trazabilidad exigida.",
    topic: "Ingresos - Registro de recaudo",
  },
  {
    id: 3,
    question:
      "Lectura: Un contribuyente pagó en exceso y solicita devolución. ¿Cómo se registra presupuestalmente esta operación?",
    options: [
      "Como menor ingreso, sin afectar el presupuesto de gastos",
      "Como gasto que reduce la apropiación vigente",
      "Como anticipo a favor del contribuyente hasta que se reintegre",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La guía indica que las devoluciones por pagos en exceso se reconocen como menor ingreso, por lo que no modifican el presupuesto de gastos.",
    topic: "Ingresos - Devoluciones",
  },
  {
    id: 4,
    question:
      "Lectura: La entidad recibió recursos de un tercero para ejecutar un gasto aún no autorizado. ¿Cómo debe registrarse ese flujo en caja?",
    options: [
      "No se reconoce como ingreso presupuestal porque no respalda un gasto",
      "Debe reconocerse como ingreso presupuestal por el solo hecho de entrar a caja",
      "Depende de la dependencia que reciba los fondos",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El lineamiento precisa que las operaciones de caja sin respaldo de gasto no constituyen ingreso presupuestal; solo se registran cuando cumplen la destinación.",
    topic: "Ingresos - Operaciones de caja",
  },
  {
    id: 5,
    question:
      "Lectura: La Dirección Financiera repasa el principio para reconocer ingresos. ¿Cuál aplica al presupuesto de ingresos?",
    options: [
      "Principio de caja: se reconoce cuando ingresan efectivamente los recursos",
      "Principio de devengo, independientemente del flujo de caja",
      "Principio de oportunidad al programar el ingreso",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El material aclara que el reconocimiento presupuestal de los ingresos se fundamenta en el principio de caja: solo se registra cuando la entidad recibe los recursos.",
    topic: "Ingresos - Principio de caja",
  },
  {
    id: 6,
    question:
      "Lectura: Ingresan recursos en moneda extranjera. ¿En qué moneda debe reconocerse el ingreso presupuestal?",
    options: [
      "En moneda nacional, registrando la afectación de caja en pesos",
      "En la misma moneda del tercero para mantener la equivalencia",
      "En UVR para garantizar actualización",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La presentación recalca que los ingresos presupuestales se reconocen en moneda nacional, pues afectan la caja en pesos aun cuando el pago se reciba en otra divisa.",
    topic: "Ingresos - Moneda de registro",
  },
  {
    id: 7,
    question:
      "Lectura: Contabilidad detecta diferencias entre caja e ingresos presupuestales. ¿Qué explica estas diferencias?",
    options: [
      "Los momentos distintos generados por anticipos, retenciones, cuotas, pago de papeles y devoluciones",
      "Únicamente errores de digitación",
      "Variaciones de la tasa de cambio",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El material ilustra que la base caja del ingreso presupuestal puede diferir de la contabilidad por operaciones como anticipos y retenciones, generando momentos distintos.",
    topic: "Ingresos - Diferencias con contabilidad",
  },
  {
    id: 8,
    question:
      "Lectura: La oficina de planeación solicita soportes de ejecución de ingresos. ¿Qué registros e informes son obligatorios?",
    options: [
      "Formularios definidos por resolución, libro de registro de ingresos e informe mensual",
      "Una hoja de cálculo interna con memorando mensual",
      "Solo un reporte trimestral consolidado",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La guía de ingresos exige mantener formularios oficiales, libro de registro e informe mensual para asegurar la trazabilidad del recaudo.",
    topic: "Ingresos - Soportes",
  },
  {
    id: 9,
    question:
      "Lectura: Se discute la diferencia entre recaudo y causación. ¿Qué condición permite registrar el recaudo presupuestal?",
    options: [
      "Debe existir flujo de caja; sin este no procede el registro del recaudo",
      "Basta con la resolución de reconocimiento",
      "Se registra como ingreso temporal de capital",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El documento precisa que el recaudo presupuestal solo se reviste cuando se materializa el flujo de caja, independientemente de la causación.",
    topic: "Ingresos - Recaudo",
  },
  {
    id: 10,
    question:
      "Lectura: Tesorería realiza una devolución en caja por un ingreso mal aplicado. ¿Qué efecto tiene en el presupuesto de gastos?",
    options: [
      "Ninguno; es una operación neta de tesorería que solo afecta el ingreso",
      "Disminuye la apropiación del gasto correspondiente",
      "Genera una cuenta por pagar adicional",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La presentación establece que las devoluciones en ingresos no impactan el presupuesto de gastos porque son operaciones propias de la tesorería.",
    topic: "Ingresos - Devoluciones y gastos",
  },
  {
    id: 11,
    question:
      "Lectura: La Oficina de Presupuesto repasa las etapas del gasto. ¿Cuál es el orden correcto de las seis etapas?",
    options: [
      "Apropiación, CDP, RP del compromiso, registro de la obligación y pago",
      "CDP, apropiación, pago, RP, obligación y nuevamente pago",
      "Apropiación, RP, CDP, pago y obligación",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El mapa de gasto detalla el orden: 1) Apropiación, 2) CDP, 3-4) Registro presupuestal del compromiso, 5) Registro de la obligación y 6) Pago.",
    topic: "Gasto - Etapas",
  },
  {
    id: 12,
    question:
      "Lectura: El concejo municipal aprueba el presupuesto. ¿Qué define la apropiación?",
    options: [
      "Las autorizaciones máximas de gasto aprobadas por la corporación competente",
      "Un certificado contable expedido por tesorería",
      "Un PAC aprobado por planeación",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La apropiación corresponde a las autorizaciones máximas de gasto conferidas por el congreso, asamblea o concejo, según la entidad.",
    topic: "Gasto - Apropiación",
  },
  {
    id: 13,
    question:
      "Lectura: Un supervisor pregunta por la \"regla de oro\" del artículo 71 del Decreto 111 de 1996. ¿Qué exige antes de comprometer recursos?",
    options: [
      "Contar con CDP previo y un RP que indique valor y plazo",
      "Solo el CDP; el RP es opcional",
      "Omitir CDP cuando existan vigencias futuras",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El artículo 71 establece que todo compromiso requiere un CDP previo y el registro presupuestal con valor y plazo definidos.",
    topic: "Gasto - Regla de oro",
  },
  {
    id: 14,
    question:
      "Lectura: Se evalúa la legalidad de un compromiso. ¿Qué situaciones están prohibidas?",
    options: [
      "Comprometer apropiaciones inexistentes, exceder saldos o hacerlo sin autorización del CONFIS para vigencias futuras",
      "Comprometer sin saldo cuando hay urgencia",
      "Formalizar compromisos verbales",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La normativa prohíbe comprometer sin apropiación, por encima del saldo o sin autorización previa del CONFIS cuando se trata de vigencias futuras.",
    topic: "Gasto - Prohibiciones",
  },
  {
    id: 15,
    question:
      "Lectura: Una entidad nacional plantea modificar la planta de personal. ¿Qué requisito presupuestal exige el PGN?",
    options: [
      "Contar con certificado de viabilidad presupuestal previo de la Dirección General del Presupuesto Nacional",
      "Solo la firma del jefe de talento humano",
      "Autorización del alcalde",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Toda modificación de planta financiada con el PGN requiere la certificación de viabilidad de la Dirección General del Presupuesto Nacional.",
    topic: "Gasto - Planta de personal",
  },
  {
    id: 16,
    question:
      "Lectura: La entidad expide un CDP. ¿Qué define este documento y quién lo suscribe?",
    options: [
      "Es expedido por el jefe de presupuesto y garantiza que la apropiación está disponible y libre de afectación",
      "Lo expide tesorería para certificar disponibilidad de caja",
      "Lo emite el supervisor para autorizar gastos menores",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El CDP es competencia del jefe de presupuesto y certifica la existencia y disponibilidad de la apropiación antes de comprometerla.",
    topic: "CDP - Definición",
  },
  {
    id: 17,
    question:
      "Lectura: Se analiza el impacto del CDP en la apropiación. ¿Qué efecto produce?",
    options: [
      "Afecta preliminarmente la apropiación",
      "Afecta definitivamente la apropiación",
      "No tiene efectos sobre el presupuesto",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El CDP es una afectación preliminar que reserva la apropiación, pero el registro definitivo ocurre con el RP.",
    topic: "CDP - Efecto",
  },
  {
    id: 18,
    question:
      "Lectura: Planeación radica un proyecto de inversión. ¿Cuándo requiere certificación BPIN para expedir el CDP?",
    options: [
      "Cuando es inversión; los rubros de funcionamiento y deuda no exigen BPIN",
      "Siempre, sin importar el tipo de gasto",
      "Nunca, porque el BPIN se obtiene después del pago",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La guía distingue que solo los proyectos de inversión requieren certificación BPIN para el CDP; funcionamiento y deuda no la demandan.",
    topic: "CDP - Requisitos",
  },
  {
    id: 19,
    question:
      "Lectura: Se verifica un CDP expedido meses atrás. ¿Cuál es su vigencia?",
    options: [
      "La misma del proceso de asunción del compromiso",
      "Hasta el cierre fiscal",
      "Indefinida mientras haya saldo",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El CDP mantiene vigencia durante el proceso que conduce a la asunción del compromiso; si se vence, debe renovarse.",
    topic: "CDP - Vigencia",
  },
  {
    id: 20,
    question:
      "Lectura: Una dependencia solicita modificar un CDP. ¿Es posible?",
    options: [
      "Sí, puede adicionar o reducir valores, dejando constancia del valor definitivo",
      "No, un CDP es inmutable",
      "Solo permite reducciones",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El manual permite ajustar los CDP mediante adiciones o reducciones, siempre dejando el valor definitivo registrado.",
    topic: "CDP - Ajustes",
  },
  {
    id: 21,
    question:
      "Lectura: Tras el CDP, se registra el compromiso. ¿Qué implica el RP?",
    options: [
      "Perfecciona el compromiso y afecta definitivamente la apropiación",
      "Es una simple constancia sin efectos",
      "Es un documento de tesorería para pagar",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El RP es el momento en el que la apropiación queda afectada definitivamente porque el compromiso se perfecciona.",
    topic: "RP - Definición",
  },
  {
    id: 22,
    question:
      "Lectura: Se elabora un RP para un contrato. ¿Qué debe indicarse?",
    options: [
      "El valor exacto y el plazo asociados al compromiso",
      "Solo el valor máximo del CDP",
      "No hace falta detallar el plazo",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La \"regla de oro\" exige que el RP indique con claridad el valor y el plazo del compromiso para garantizar su control.",
    topic: "RP - Información mínima",
  },
  {
    id: 23,
    question:
      "Lectura: Un abogado pregunta si el RP es requisito para perfeccionar un contrato. ¿Qué establece la normativa?",
    options: [
      "El RP no es requisito de perfeccionamiento, pero sí para ejecutar el contrato",
      "El RP siempre es requisito de perfeccionamiento",
      "El RP no aplica a contratos de servicios",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El artículo 41 de la Ley 80 indica que el contrato se perfecciona sin necesidad del RP; este se exige para iniciar la ejecución.",
    topic: "RP - Perfeccionamiento vs ejecución",
  },
  {
    id: 24,
    question:
      "Lectura: Se firmó un contrato sin RP. ¿Es válido?",
    options: [
      "Sí, puede perfeccionarse sin RP, pero no ejecutarse hasta obtenerlo",
      "No, la firma sin RP es nula",
      "El RP solo se exige después del primer pago",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El manual aclara que la firma es válida; lo que se restringe sin RP es la ejecución y los pagos.",
    topic: "RP - Timing",
  },
  {
    id: 25,
    question:
      "Lectura: Recursos Humanos emite un CDP global para aportes patronales. ¿Puede usarlo para varios terceros?",
    options: [
      "Sí, un CDP global puede soportar varios RP a distintos terceros (ESAP, SENA, ICBF, EPS, AFP, etc.)",
      "No, cada RP exige un CDP independiente",
      "Depende de la autorización del supervisor",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Las cartillas financieras permiten que un mismo CDP respaldé múltiples RP cuando la obligación se dispersa entre varios terceros.",
    topic: "RP - Fraccionamiento",
  },
  {
    id: 26,
    question:
      "Lectura: Se reciben mercancías y se requiere registrar la obligación. ¿Cuándo nace presupuestalmente?",
    options: [
      "Cuando los bienes o servicios se reciben a satisfacción y se adeuda el monto correspondiente (incluidos anticipos pactados no pagados)",
      "Con la expedición del CDP",
      "Con la firma del contrato",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La obligación surge una vez los bienes/servicios se entregan y existe exigibilidad del pago, de acuerdo con la presentación.",
    topic: "Obligación - Nacimiento",
  },
  {
    id: 27,
    question:
      "Lectura: Tesorería pregunta cómo se imputa una obligación. ¿Cuál es la respuesta correcta?",
    options: [
      "Se imputa al compromiso del que proviene y se fija el plazo de pago, cuya vigencia coincide con el proceso de ejecución de pagos",
      "Se imputa al rubro global sin especificar el compromiso",
      "Se imputa a tesorería y caduca al mes",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El lineamiento establece que cada obligación se liga al compromiso registrado y define el plazo para atender el pago.",
    topic: "Obligación - Imputación",
  },
  {
    id: 28,
    question:
      "Lectura: Antes de extender un pago, Tesorería valida requisitos. ¿Cuáles son indispensables?",
    options: [
      "Recibo a satisfacción, afectación del artículo presupuestal, disponibilidad de PAC, cuenta de pago, RP, soporte y acto que ordene el gasto",
      "Solo PAC y factura",
      "Únicamente el certificado del supervisor",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El check list de pagos incluye todos esos requisitos previos antes de ordenar el giro.",
    topic: "Pago - Requisitos",
  },
  {
    id: 29,
    question:
      "Lectura: ¿Cuál es el rol de tesorería una vez se verifican los requisitos?",
    options: [
      "Efectuar el pago cuando la obligación está registrada y cumple todos los soportes",
      "Autorizar el RP y luego pagar",
      "Expedir el CDP",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Tesorería solo paga cuando la obligación está registrada y se acreditan requisitos; no crea CDP ni RP.",
    topic: "Pago - Rol de tesorería",
  },
  {
    id: 30,
    question:
      "Lectura: Presupuesto presenta el informe de reservas. ¿Qué son las reservas y cuentas por pagar presupuestales?",
    options: [
      "Saldos de compromisos u obligaciones pendientes de autorización de pago por apropiación",
      "Saldos de caja por recaudar",
      "Proyecciones del PAC",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El documento describe las reservas y cuentas por pagar como los saldos de compromisos y obligaciones pendientes de pago.",
    topic: "Reservas - Definición",
  },
  {
    id: 31,
    question:
      "Lectura: Finanzas revisa los pendientes de pago. ¿A qué corresponden?",
    options: [
      "A lo constituido como reservas o cuentas por pagar según su naturaleza",
      "A gastos anulados",
      "A deudas con bancos",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El material aclara que los pendientes se clasifican como reservas o cuentas por pagar dependiendo si son compromisos u obligaciones.",
    topic: "Reservas - Pendientes",
  },
  {
    id: 32,
    question:
      "Lectura: El comité de gasto define qué es un compromiso. ¿Cuál es la respuesta correcta?",
    options: [
      "El acto mediante el cual los órganos competentes comprometen el presupuesto para ejecutar la apropiación",
      "La decisión de tesorería de girar recursos",
      "Una simple solicitud interna",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Comprometer implica que los órganos autorizados asumen obligaciones con cargo al presupuesto aprobado.",
    topic: "Compromisos - Definición",
  },
  {
    id: 33,
    question:
      "Lectura: ¿Qué actos generan compromisos presupuestales?",
    options: [
      "Actos administrativos, contratos, convenios y órdenes (suministro, pedido, trabajo)",
      "Invitaciones previas sin CDP",
      "Memorandos internos sin soporte",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Los compromisos se originan en actos formales como contratos, convenios u órdenes con soporte presupuestal.",
    topic: "Compromisos - Actos generadores",
  },
  {
    id: 34,
    question:
      "Lectura: La entidad desea explicar a nuevos funcionarios la secuencia completa desde ingresos hasta pagos. ¿Cuál es la ruta correcta?",
    options: [
      "Causación con acto, recaudo registrado y luego las seis etapas del gasto: apropiación, CDP, RP, obligación y pago con requisitos",
      "Recaudo directo y pago inmediato",
      "CDP y pago, dejando el RP para el cierre",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El documento integra la cadena ingresos-gastos destacando la necesidad de acto de causación, recaudo y las seis etapas presupuestales antes del pago.",
    topic: "Integración ingreso-gasto",
  },
  {
    id: 35,
    question:
      "Lectura: Se pretende expedir un CDP de inversión sin BPIN. ¿Es procedente?",
    options: [
      "No, todo proyecto de inversión requiere viabilidad BPIN previa al CDP",
      "Sí, el BPIN se obtiene luego del pago",
      "Depende del monto",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Para expedir CDP sobre inversión se exige la certificación BPIN; de lo contrario, la operación no es válida.",
    topic: "Inversión - BPIN",
  },
  {
    id: 36,
    question:
      "Lectura: Se detectaron vigencias futuras sin CONFIS. ¿Qué consecuencias existen?",
    options: [
      "Está prohibido comprometer sin autorización del CONFIS; hay responsabilidad personal y pecuniaria",
      "Puede hacerse si hay caja",
      "Basta con el visto bueno del supervisor",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El material advierte que comprometer vigencias futuras sin CONFIS genera responsabilidad disciplinaria y fiscal.",
    topic: "Vigencias futuras",
  },
  {
    id: 37,
    question:
      "Lectura: ¿Por qué se presentan diferencias entre ingresos presupuestales y caja por retenciones o devoluciones?",
    options: [
      "Porque el ingreso se registra con base caja y operaciones como anticipos, retenciones, cuotas, pago de papeles y devoluciones alteran los momentos",
      "Por falta de conciliaciones",
      "Por no usar el SIIF",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La presentación explica que esas operaciones modifican el momento de ingreso en caja, generando diferencias temporales.",
    topic: "Ingresos - Conciliaciones",
  },
  {
    id: 38,
    question:
      "Lectura: Llega a Tesorería una orden de pago sin recibo de conformidad. ¿Qué procede?",
    options: [
      "No se paga; falta el recibo a satisfacción exigido entre los requisitos previos",
      "Puede pagarse con garantía bancaria",
      "Basta con el RP",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El listado de requisitos previos al pago incluye el recibo o acta de conformidad; sin este no puede procesarse el giro.",
    topic: "Pago - Requisitos mínimos",
  },
  {
    id: 39,
    question:
      "Lectura: Ingresan recursos en caja provenientes de particulares para futuros gastos. ¿Cómo se registran?",
    options: [
      "No se reconocen como ingreso presupuestal hasta que respalden un gasto",
      "Se registran como ingreso de capital",
      "Se imputan al rubro de inversión",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El instructivo señala que las entradas de caja sin respaldo de gasto no constituyen ingreso presupuestal; se tratan aparte hasta que respalden un gasto.",
    topic: "Ingresos - Identificación",
  },
  {
    id: 40,
    question:
      "Lectura: La oficina de nómina pregunta cómo manejar un CDP único para aportes. ¿Qué debe garantizar?",
    options: [
      "Que el CDP global respalde múltiples RP sin exceder su valor y que cada RP tenga soporte completo para cada tercero",
      "Que se expida un CDP por cada AFP o EPS",
      "Que los RP se emitan sin control de saldo",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El procedimiento admite dividir el CDP en varios RP siempre que no se supere el valor inicial y se documenten todos los soportes.",
    topic: "CDP global - Control",
  },
]

export function GestionPresupuestalTest() {
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
        return { correct: acc.correct + 1, earnedPoints: acc.earnedPoints + question.points }
      }
      return acc
    },
    { correct: 0, earnedPoints: 0 },
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="questions" className="w-full">
        <div className="flex flex-col gap-4 rounded-2xl border bg-card/70 p-4 shadow-sm backdrop-blur">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="questions">Preguntas</TabsTrigger>
            <TabsTrigger value="instrucciones">Instrucciones</TabsTrigger>
          </TabsList>
          <TabsContent value="instrucciones" className="space-y-4 text-sm text-muted-foreground">
            <p>
              Responde las preguntas situacionales sobre gestión presupuestal, certificaciones y ciclo de gasto.
              Cada ítem vale <strong>5 puntos</strong>; obtendrás retroalimentación al finalizar.
            </p>
            <Alert>
              <AlertTitle className="flex items-center gap-2 text-base font-semibold">
                <InfoIcon className="h-4 w-4 text-primary" />
                Recuerda
              </AlertTitle>
              <AlertDescription className="mt-1 text-sm">
                El cronómetro asigna 2 minutos por pregunta. Debes responder todas para habilitar el envío.
              </AlertDescription>
            </Alert>
          </TabsContent>
          <TabsContent value="questions">
            <div className="rounded-xl border bg-background/60 p-4 text-sm text-muted-foreground shadow-sm">
              <ul className="list-disc space-y-2 pl-5">
                <li>Las preguntas plantean escenarios típicos de ingreso y gasto.</li>
                <li>Selecciona la opción que refleja la normativa aplicada en la presentación.</li>
                <li>Puedes reiniciar la prueba cuando quieras.</li>
              </ul>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {!showResults && (
        <TestTimer formattedTime={timer.formattedTime} timeColor={timer.timeColor} percentageRemaining={timer.percentageRemaining} />
      )}

      {questions.map((question, index) => {
        const selected = answers[question.id]
        const isCorrect = selected === question.correctAnswer
        const showState = showResults && showFeedback

        return (
          <Card
            key={question.id}
            className={`border transition-colors ${
              showState ? (isCorrect ? "border-green-500 bg-green-50/60" : "border-red-400 bg-red-50/60") : "border-border"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-start justify-between gap-4">
                <span>
                  Pregunta {index + 1} · {question.points} puntos
                </span>
                {showResults && selected !== undefined && (
                  selected === question.correctAnswer ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )
                )}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">Tema: {question.topic}</CardDescription>
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
                        : "border-border hover:bg-muted/70"
                    }`}
                  >
                    <RadioGroupItem value={optionIndex.toString()} id={`question-${question.id}-option-${optionIndex}`} className="mt-1" />
                    <Label htmlFor={`question-${question.id}-option-${optionIndex}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {showResults && showFeedback && (
                <Alert className={isCorrect ? "border-green-500 bg-green-50" : "border-orange-400 bg-orange-50"}>
                  <AlertTitle>{isCorrect ? "¡Correcto!" : "Respuesta incorrecta"}</AlertTitle>
                  <AlertDescription className="mt-2 space-y-1 text-sm">
                    <p>{question.explanation}</p>
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
            disabled={Object.keys(answers).length !== questions.length}
            className="min-w-[200px]"
          >
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
          <AlertDescription className="mt-2">
            Respondiste correctamente {score.correct} de {questions.length} preguntas · {score.earnedPoints} / {questions.length * 5} puntos
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
