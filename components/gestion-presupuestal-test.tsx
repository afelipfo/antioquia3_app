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
  {
    id: 41,
    question:
      "Situación: Una alcaldía quiere financiar un programa social que no aparece en el presupuesto vigente. ¿Qué procede?",
    options: [
      "Ejecutarlo por decreto del alcalde",
      "No puede ejecutarse: todo gasto debe estar previsto en el presupuesto aprobado",
      "Cubrirlo con donaciones privadas sin trámite",
      "Trasladar cualquier crédito a ese objeto",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El artículo 345 de la Constitución prohíbe erogaciones que no estén decretadas en el presupuesto vigente ni traslados a objetos no previstos.",
    topic: "CN art. 345 – Gasto no previsto",
  },
  {
    id: 42,
    question:
      "Situación: Una asamblea pretende cobrar un nuevo impuesto sin incluirlo en el presupuesto de rentas. ¿Es viable?",
    options: [
      "Sí, si lo aprueba mayoría simple",
      "No, en tiempo de paz no se perciben impuestos que no figuren en el presupuesto de rentas",
      "Procede si se declara urgencia manifiesta",
      "Solo requiere decreto del gobernador",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El mismo artículo 345 dispone que en tiempos de paz no pueden cobrarse impuestos que no estén incorporados en el presupuesto de rentas.",
    topic: "CN art. 345 – Impuestos",
  },
  {
    id: 43,
    question:
      "Situación: ¿Quién da primer debate al Proyecto de Presupuesto de Rentas y Ley de Apropiaciones?",
    options: [
      "Comisiones Primera y Séptima",
      "Plenarias conjuntas",
      "Comisiones de asuntos económicos en forma conjunta",
      "Comisión de Ética",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El artículo 346 de la Constitución (modificado por el Acto Legislativo 03 de 2011) ordena que las comisiones económicas sesionen conjuntamente en el primer debate.",
    topic: "CN art. 346 – Trámite",
  },
  {
    id: 44,
    question:
      "Situación: Un ministerio desea incluir durante la vigencia un gasto que no estaba en el proyecto de ley de apropiaciones. ¿Puede hacerlo?",
    options: [
      "Sí, mediante circular interna",
      "Sí, con decreto reglamentario",
      "No: la ley de apropiaciones debe contener la totalidad de los gastos",
      "Basta con expedir un CDP posterior",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El artículo 347 establece que el proyecto de ley de apropiaciones comprende la totalidad de los gastos; lo no incluido no puede ejecutarse en la vigencia.",
    topic: "CN art. 347 – Totalidad del gasto",
  },
  {
    id: 45,
    question:
      "Situación: El PGN proyecta gastos superiores a los ingresos autorizados. ¿Cómo se financia la diferencia?",
    options: [
      "El Congreso reduce automáticamente el gasto",
      "Se cubre con vigencias futuras sin trámite",
      "El Gobierno debe proponer nuevas rentas o modificaciones en un proyecto separado",
      "Se aprueba y luego se recorta",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "Según el artículo 347, cuando el presupuesto proyecta gastos mayores a los ingresos, el Gobierno debe presentar un proyecto que instituya nuevas rentas o modifique las existentes.",
    topic: "CN art. 347 – Fuentes de financiación",
  },
  {
    id: 46,
    question:
      "Situación: Una ley ordinaria contradice disposiciones de la ley orgánica de presupuesto. ¿Cuál prevalece?",
    options: [
      "La ley ordinaria por ser posterior",
      "La ley orgánica, que fija reglas superiores para la actividad legislativa presupuestal",
      "Decide el ministerio del ramo",
      "Se aplican ambas",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El artículo 151 establece que las materias de la ley orgánica vinculan al legislador ordinario; cualquier ley en contrario se ajusta a ella.",
    topic: "Jerarquía normativa – Ley orgánica",
  },
  {
    id: 47,
    question:
      "Situación: Un secretario de planeación duda sobre la norma que respalda utilizar la ley anual del PGN como instrumento para ejecutar el Plan Nacional de Desarrollo. ¿Qué responde?",
    options: ["Ley 80 de 1993", "Acto Legislativo 01 de 2001", "Decreto 111 de 1996, artículo 10", "Decreto 1082 de 2015"],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El artículo 10 del Estatuto Orgánico del Presupuesto (Decreto 111 de 1996) señala que la ley anual del presupuesto es el instrumento para ejecutar los planes y programas de desarrollo.",
    topic: "EOP art. 10 – Instrumento",
  },
  {
    id: 48,
    question:
      "Situación: El alcalde estructura el presupuesto sin considerar el Plan Financiero ni el POAI. ¿Es correcto?",
    options: [
      "Sí, si el Concejo lo aprueba",
      "Sí, si hay superávit",
      "No: el sistema presupuestal coordina Plan Financiero, POAI y Presupuesto para armonizar política fiscal y ejecución",
      "Solo la Nación debe hacerlo",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El sistema presupuestal colombiano exige coherencia entre el Plan Financiero, el Plan Operativo Anual de Inversiones y el presupuesto para garantizar disciplina macrofiscal.",
    topic: "Sistema presupuestal – Coherencia",
  },
  {
    id: 49,
    question:
      "Situación: Un concejal afirma que el presupuesto es una meta de gasto sin límite. ¿Cuál es la naturaleza real?",
    options: [
      "Depende del recaudo efectivo",
      "Es una autorización máxima de gasto y un estimativo de ingresos",
      "Es un compromiso político sin implicaciones jurídicas",
      "Es un plan indicativo no vinculante",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "La cartilla Presupuesto lo explica describe el presupuesto como la autorización máxima de gasto y el estimativo de ingresos para una vigencia.",
    topic: "Naturaleza del presupuesto",
  },
  {
    id: 50,
    question:
      "Situación: Una entidad ignora los principios presupuestales al preparar el proyecto. ¿Qué ocurre?",
    options: [
      "No pasa nada",
      "Se vicia la validez del proceso porque los principios condicionan la legitimidad del presupuesto",
      "Se corrige con un CDP",
      "Se ajusta durante la ejecución",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El Estatuto Orgánico contempla nueve principios legales y tres jurisprudenciales que condicionan la validez del acto presupuestal.",
    topic: "Principios presupuestales",
  },
  {
    id: 51,
    question:
      "Situación: Un analista incorpora parafiscales como ingresos corrientes con gasto asociado. ¿Es correcto?",
    options: [
      "Sí, siempre",
      "Sí, si son SENA o ICBF",
      "No: los parafiscales se incluyen solo de forma informativa en capítulo separado y sin gasto asociado",
      "Depende de la tasa de recaudo",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El artículo 12 de la Ley 179 de 1994 (modificado por la Ley 225 de 1995) indica que los parafiscales se registran informativamente y no se mezclan con los ingresos corrientes.",
    topic: "Parafiscales – Presentación presupuestal",
  },
  {
    id: 52,
    question:
      "Situación: ¿Qué característica no corresponde a una contribución parafiscal?",
    options: [
      "Obligatoriedad",
      "Libre destinación para gasto general",
      "Singularidad dirigida a un grupo específico",
      "Destinación sectorial",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "Las contribuciones parafiscales son obligatorias, singulares y con destinación sectorial; no financian gasto general.",
    topic: "Parafiscales – Rasgos",
  },
  {
    id: 53,
    question:
      "Situación: Hacienda propone crear un \"fondo\" sin personería para administrar recursos específicos. ¿Qué figura es?",
    options: [
      "Un fondo-cuenta o fondo especial sin personería jurídica",
      "Un establecimiento público",
      "Una empresa social del Estado",
      "Una empresa industrial y comercial del Estado",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El documento define los fondos-cuenta como sistemas de manejo de recursos sin personería, que no constituyen secciones del presupuesto.",
    topic: "Fondos especiales – Fondo-cuenta",
  },
  {
    id: 54,
    question:
      "Situación: Se crea un fondo con personería jurídica como unidad ejecutora del PGN. ¿De qué tipo se trata?",
    options: [
      "Fondo-cuenta",
      "Fondo-entidad (asimilado a establecimiento público)",
      "Sociedad de economía mixta",
      "Tasa parafiscal",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "Los fondos-entidad tienen personería jurídica y se asimilan a establecimientos públicos, por lo que modifican la estructura administrativa.",
    topic: "Fondos especiales – Fondo-entidad",
  },
  {
    id: 55,
    question:
      "Situación: Un municipio cobra por uso del espacio electromagnético. ¿Cómo clasifica ese ingreso?",
    options: [
      "Tributo directo",
      "Renta contractual (ingreso no tributario)",
      "Regalía",
      "Transferencia del SGP",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "La cartilla clasifica los pagos por uso del espacio electromagnético como rentas contractuales dentro de los ingresos no tributarios.",
    topic: "Clasificación de ingresos",
  },
  {
    id: 56,
    question:
      "Situación: En comisión presupuestal surge la duda sobre si el alumbrado público es impuesto o tasa. ¿Qué señala el material?",
    options: [
      "Siempre es impuesto",
      "Siempre es tasa",
      "Es una discusión doctrinal y jurídica abierta",
      "Es contribución parafiscal",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El documento “Presupuesto lo explica” expone el debate sobre la naturaleza del alumbrado público sin cerrar la discusión.",
    topic: "Ingresos – Alumbrado público",
  },
  {
    id: 57,
    question:
      "Situación: Una secretaría desea registrar intereses de deuda como inversión. ¿Es correcto?",
    options: [
      "Sí, si financian proyectos",
      "No, los intereses se clasifican como servicio de la deuda",
      "Debe pasar por funcionamiento",
      "Puede hacerse con POAI",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "Los intereses hacen parte del servicio de la deuda, no de la inversión; su registro incorrecto distorsiona el gasto.",
    topic: "Clasificación del gasto – Servicio de deuda",
  },
  {
    id: 58,
    question:
      "Situación: Se pretende imputar la compra de papelería al POAI. ¿Es válido?",
    options: [
      "Siempre procede",
      "No: la inversión se ejecuta vía POAI, pero los gastos de funcionamiento (como papelería) deben imputarse a su rubro de funcionamiento",
      "Sí, si es menor cuantía",
      "Sí, con autorización del DNP",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El POAI respalda exclusivamente los proyectos de inversión; los gastos de funcionamiento no se cargan allí.",
    topic: "Funcionamiento vs inversión",
  },
  {
    id: 59,
    question:
      "Situación: La entidad recibe recursos de crédito y donaciones. ¿Dónde se clasifican?",
    options: [
      "Ingresos corrientes",
      "Recursos de capital",
      "Parafiscales",
      "Fondos especiales",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "Los recursos provenientes de crédito público y donaciones hacen parte de los recursos de capital.",
    topic: "Ingresos – Recursos de capital",
  },
  {
    id: 60,
    question:
      "Situación: Al liquidar la vigencia se reconocen exigibilidades de años anteriores. ¿Dónde se registran?",
    options: [
      "En inversión",
      "En funcionamiento",
      "En el presupuesto de gastos, discriminadas como déficit anterior y vigencias expiradas",
      "En ingresos de capital",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El documento señala que las obligaciones de vigencias anteriores se incluyen en el presupuesto de gastos, detallando déficit y vigencias expiradas.",
    topic: "Cierre de vigencia – Registro",
  },
  {
    id: 61,
    question:
      "Situación: La administración municipal presta directamente servicios de acueducto y aseo. ¿Cómo lo refleja el presupuesto?",
    options: [
      "Solo como tasa",
      "Como ingresos por venta de bienes y servicios (ingresos no tributarios) cuando corresponda",
      "Como regalías",
      "Como contribución parafiscal",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "Los ingresos generados por la prestación directa de servicios se clasifican como venta de bienes y servicios dentro de los ingresos no tributarios.",
    topic: "Ingresos – Prestación directa",
  },
  {
    id: 62,
    question:
      "Situación: El Gobierno presenta el PGN a mitad de la legislatura. ¿Es válido?",
    options: [
      "Sí, por autonomía del Ejecutivo",
      "Sí, si se envía con mensaje de urgencia",
      "No: debe presentarse dentro de los primeros diez días de cada legislatura",
      "Depende del CONFIS",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El artículo 346 exige que el Gobierno radique el proyecto de presupuesto dentro de los diez primeros días de cada legislatura.",
    topic: "Cronograma PGN",
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
              Responde las preguntas situacionales sobre gestión presupuestal, certificaciones y ciclo de gasto,
              incluidas las disposiciones constitucionales y del Estatuto Orgánico explicadas en “Presupuesto lo explica”.
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
                <li>Selecciona la opción que recoge la normativa explicada en la presentación y en “Presupuesto lo explica”.</li>
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
