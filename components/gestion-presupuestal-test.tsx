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

export const gestionPresupuestalQuestions: Question[] = [
  {
    id: 1,
    question:
      "Situacion\n\nEn la Secretaria de Hacienda del municipio de Rionegro, el contador analiza los hechos economicos que soportan los ingresos del trimestre. Un contribuyente realizo un pago por concepto de impuesto predial, pero aun no se ha expedido el acto administrativo correspondiente.\n\nPregunta\n\nSegun la situacion descrita, ¿que se requiere para que proceda la causacion de un ingreso presupuestal?",
    options: [
      "Exista un acto administrativo que reconozca el derecho u obligacion derivado del hecho economico",
      "Se expida un simple recibo de caja por parte de Tesoreria",
      "La dependencia solicitante informe verbalmente el ingreso",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "En la situacion descrita, la causacion del ingreso presupuestal no puede registrarse hasta que exista un acto administrativo que formalice el hecho economico. Un simple recibo de caja o una comunicacion verbal no constituyen soportes validos para la causacion.",
    topic: "Ingresos - Causacion",
  },
  {
    id: 2,
    question:
      "Situacion\n\nLa tesorera del municipio de Marinilla esta configurando el modulo de recaudo en el sistema financiero para garantizar la trazabilidad de los ingresos. Su equipo de trabajo le pregunta cuales son los campos obligatorios que deben diligenciarse por cada operacion de recaudo.\n\nPregunta\n\nCon base en la situacion presentada, ¿que campos debe registrar obligatoriamente cada recaudo?",
    options: [
      "Fecha, concepto, tipo y documento soporte, tercero y valor del recaudo",
      "Unicamente fecha, valor y firma del recaudador",
      "Concepto general y rubro, sin identificar al tercero",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Para garantizar la trazabilidad que requiere la tesorera de Marinilla, el sistema debe registrar todos los datos clave: fecha, concepto, tipo, documento soporte, tercero y valor. Omitir cualquiera de estos campos compromete el control y seguimiento de los ingresos.",
    topic: "Ingresos - Registro de recaudo",
  },
  {
    id: 3,
    question:
      "Situacion\n\nUn contribuyente del municipio de La Ceja pago $2.500.000 por concepto de industria y comercio, pero el valor correcto era $1.800.000. El contribuyente presenta solicitud formal de devolucion del excedente de $700.000 ante la Secretaria de Hacienda.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿como se registra presupuestalmente esta devolucion?",
    options: [
      "Como menor ingreso, sin afectar el presupuesto de gastos",
      "Como gasto que reduce la apropiacion vigente",
      "Como anticipo a favor del contribuyente hasta que se reintegre",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La devolucion de los $700.000 al contribuyente de La Ceja debe registrarse como menor ingreso. Esta operacion no afecta el presupuesto de gastos porque corresponde a una correccion del recaudo, no a una erogacion programada.",
    topic: "Ingresos - Devoluciones",
  },
  {
    id: 4,
    question:
      "Situacion\n\nLa Alcaldia de El Retiro recibio $50.000.000 de una fundacion privada para ejecutar un programa de alimentacion escolar. Sin embargo, el gasto correspondiente aun no ha sido autorizado en el presupuesto municipal ni existe apropiacion disponible.\n\nPregunta\n\nSegun la situacion planteada, ¿como debe registrarse este flujo de recursos en caja?",
    options: [
      "No se reconoce como ingreso presupuestal porque no respalda un gasto",
      "Debe reconocerse como ingreso presupuestal por el solo hecho de entrar a caja",
      "Depende de la dependencia que reciba los fondos",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Los $50.000.000 recibidos por la Alcaldia de El Retiro no constituyen ingreso presupuestal mientras no exista un gasto autorizado que respalden. Las operaciones de caja sin destinacion presupuestal definida se registran por separado hasta que cumplan su proposito.",
    topic: "Ingresos - Operaciones de caja",
  },
  {
    id: 5,
    question:
      "Situacion\n\nDurante una capacitacion en la Direccion Financiera del municipio de Guarne, un funcionario nuevo pregunta sobre el principio que rige el reconocimiento de los ingresos presupuestales. La directora le explica que difiere del tratamiento contable.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual principio aplica al presupuesto de ingresos?",
    options: [
      "Principio de caja: se reconoce cuando ingresan efectivamente los recursos",
      "Principio de devengo, independientemente del flujo de caja",
      "Principio de oportunidad al programar el ingreso",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La directora de Guarne explica correctamente que el reconocimiento presupuestal de ingresos se fundamenta en el principio de caja: solo se registra cuando la entidad recibe efectivamente los recursos, a diferencia del tratamiento contable por devengo.",
    topic: "Ingresos - Principio de caja",
  },
  {
    id: 6,
    question:
      "Situacion\n\nEl municipio de Carmen de Viboral recibio una donacion de 10.000 dolares estadounidenses de una ONG internacional para un proyecto ambiental. El tesorero debe registrar este ingreso en el sistema presupuestal y tiene dudas sobre la moneda a utilizar.\n\nPregunta\n\nDe acuerdo con la situacion presentada, ¿en que moneda debe reconocerse el ingreso presupuestal?",
    options: [
      "En moneda nacional, registrando la afectacion de caja en pesos",
      "En la misma moneda del tercero para mantener la equivalencia",
      "En UVR para garantizar actualizacion",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El tesorero de Carmen de Viboral debe registrar los 10.000 dolares en pesos colombianos, aplicando la tasa de cambio del dia. Los ingresos presupuestales siempre se reconocen en moneda nacional porque afectan la caja en pesos.",
    topic: "Ingresos - Moneda de registro",
  },
  {
    id: 7,
    question:
      "Situacion\n\nAl realizar la conciliacion mensual en el municipio de San Vicente, el contador encuentra diferencias entre el saldo de caja y los ingresos presupuestales registrados. El tesorero le indica que existen operaciones pendientes de clasificar.\n\nPregunta\n\nSegun la situacion descrita, ¿que explica estas diferencias entre caja e ingresos presupuestales?",
    options: [
      "Los momentos distintos generados por anticipos, retenciones, cuotas, pago de papeles y devoluciones",
      "Unicamente errores de digitacion",
      "Variaciones de la tasa de cambio",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Las diferencias encontradas en San Vicente se deben a que operaciones como anticipos, retenciones, cuotas y devoluciones generan momentos distintos entre el flujo de caja y el reconocimiento presupuestal. No son necesariamente errores de digitacion.",
    topic: "Ingresos - Diferencias con contabilidad",
  },
  {
    id: 8,
    question:
      "Situacion\n\nLa oficina de planeacion del municipio de Santuario solicita a la Secretaria de Hacienda los soportes de ejecucion de ingresos del primer semestre para un informe de gestion. El jefe de presupuesto debe preparar la documentacion requerida.\n\nPregunta\n\nCon base en la situacion planteada, ¿que registros e informes son obligatorios para entregar?",
    options: [
      "Formularios definidos por resolucion, libro de registro de ingresos e informe mensual",
      "Una hoja de calculo interna con memorando mensual",
      "Solo un reporte trimestral consolidado",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El jefe de presupuesto de Santuario debe entregar los formularios oficiales definidos por resolucion, el libro de registro de ingresos y los informes mensuales. Estos documentos garantizan la trazabilidad del recaudo conforme a la normativa.",
    topic: "Ingresos - Soportes",
  },
  {
    id: 9,
    question:
      "Situacion\n\nEn una reunion de capacitacion en la Alcaldia de Cocorna, surge una discusion entre funcionarios sobre la diferencia entre recaudo y causacion de ingresos. El secretario de hacienda debe aclarar cuando procede registrar el recaudo presupuestal.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que condicion permite registrar el recaudo presupuestal?",
    options: [
      "Debe existir flujo de caja; sin este no procede el registro del recaudo",
      "Basta con la resolucion de reconocimiento",
      "Se registra como ingreso temporal de capital",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El secretario de Cocorna debe aclarar que el recaudo presupuestal solo se registra cuando se materializa el flujo de caja. La causacion (reconocimiento del derecho) puede existir previamente, pero sin entrada efectiva de recursos no hay recaudo.",
    topic: "Ingresos - Recaudo",
  },
  {
    id: 10,
    question:
      "Situacion\n\nLa tesoreria del municipio de Granada realiza una devolucion de $1.200.000 a un contribuyente por un ingreso mal aplicado al rubro de valorizacion cuando correspondia a otro concepto. El contador pregunta si debe afectar alguna apropiacion de gastos.\n\nPregunta\n\nSegun la situacion planteada, ¿que efecto tiene esta devolucion en el presupuesto de gastos?",
    options: [
      "Ninguno; es una operacion neta de tesoreria que solo afecta el ingreso",
      "Disminuye la apropiacion del gasto correspondiente",
      "Genera una cuenta por pagar adicional",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La devolucion realizada en Granada no impacta el presupuesto de gastos. Es una operacion neta de tesoreria que solo afecta el ingreso presupuestal, registrandose como menor recaudo en el rubro correspondiente.",
    topic: "Ingresos - Devoluciones y gastos",
  },
  {
    id: 11,
    question:
      "Situacion\n\nLa Oficina de Presupuesto de la Gobernacion de Antioquia esta capacitando a nuevos funcionarios sobre el ciclo del gasto publico. El instructor presenta un diagrama con las etapas que debe cumplir todo gasto desde su aprobacion hasta el pago final.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es el orden correcto de las seis etapas del gasto?",
    options: [
      "Apropiacion, CDP, RP del compromiso, registro de la obligacion y pago",
      "CDP, apropiacion, pago, RP, obligacion y nuevamente pago",
      "Apropiacion, RP, CDP, pago y obligacion",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El instructor de la Gobernacion debe presentar el orden correcto: 1) Apropiacion, 2) CDP, 3-4) Registro presupuestal del compromiso, 5) Registro de la obligacion y 6) Pago. Alterar esta secuencia genera irregularidades presupuestales.",
    topic: "Gasto - Etapas",
  },
  {
    id: 12,
    question:
      "Situacion\n\nEl Concejo Municipal de Envigado aprobo el presupuesto para la vigencia 2025. Un concejal nuevo pregunta que representa exactamente la apropiacion aprobada y cual es su naturaleza juridica.\n\nPregunta\n\nDe acuerdo con la situacion presentada, ¿que define la apropiacion?",
    options: [
      "Las autorizaciones maximas de gasto aprobadas por la corporacion competente",
      "Un certificado contable expedido por tesoreria",
      "Un PAC aprobado por planeacion",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La apropiacion aprobada por el Concejo de Envigado representa las autorizaciones maximas de gasto para la vigencia. No es un certificado ni un plan de caja, sino el limite legal que habilita a la administracion para ejecutar erogaciones.",
    topic: "Gasto - Apropiacion",
  },
  {
    id: 13,
    question:
      "Situacion\n\nUn supervisor de contratos del municipio de Itagui pregunta al jefe de presupuesto sobre la \"regla de oro\" establecida en el articulo 71 del Decreto 111 de 1996. Necesita saber que documentos son indispensables antes de comprometer recursos publicos.\n\nPregunta\n\nSegun la situacion descrita, ¿que exige la \"regla de oro\" antes de comprometer recursos?",
    options: [
      "Contar con CDP previo y un RP que indique valor y plazo",
      "Solo el CDP; el RP es opcional",
      "Omitir CDP cuando existan vigencias futuras",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El jefe de presupuesto de Itagui debe explicar que la regla de oro exige dos requisitos: un CDP previo que certifique la disponibilidad y un RP que registre el compromiso con valor y plazo definidos. Omitir cualquiera genera responsabilidad.",
    topic: "Gasto - Regla de oro",
  },
  {
    id: 14,
    question:
      "Situacion\n\nEl comite de contratacion del municipio de Bello evalua la legalidad de varios compromisos presupuestales. El asesor juridico debe identificar que situaciones estan expresamente prohibidas por la normativa presupuestal.\n\nPregunta\n\nCon base en la situacion planteada, ¿que situaciones estan prohibidas al comprometer recursos?",
    options: [
      "Comprometer apropiaciones inexistentes, exceder saldos o hacerlo sin autorizacion del CONFIS para vigencias futuras",
      "Comprometer sin saldo cuando hay urgencia",
      "Formalizar compromisos verbales",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El asesor juridico de Bello debe advertir que esta prohibido comprometer sin apropiacion, por encima del saldo disponible o sin autorizacion previa del CONFIS para vigencias futuras. Estas conductas generan responsabilidad disciplinaria y fiscal.",
    topic: "Gasto - Prohibiciones",
  },
  {
    id: 15,
    question:
      "Situacion\n\nUna entidad nacional adscrita al Ministerio de Educacion plantea modificar su planta de personal, creando 15 nuevos cargos administrativos. El director administrativo consulta sobre los requisitos presupuestales que debe cumplir.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que requisito presupuestal exige el PGN para esta modificacion?",
    options: [
      "Contar con certificado de viabilidad presupuestal previo de la Direccion General del Presupuesto Nacional",
      "Solo la firma del jefe de talento humano",
      "Autorizacion del alcalde",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La entidad nacional debe obtener el certificado de viabilidad presupuestal de la Direccion General del Presupuesto Nacional antes de modificar la planta. Este requisito garantiza que existen recursos para financiar los nuevos cargos en el PGN.",
    topic: "Gasto - Planta de personal",
  },
  {
    id: 16,
    question:
      "Situacion\n\nLa Secretaria de Infraestructura del municipio de Sabaneta solicita un CDP para iniciar el proceso de contratacion de una obra vial. Un funcionario nuevo pregunta quien expide este documento y que garantiza exactamente.\n\nPregunta\n\nSegun la situacion presentada, ¿que define el CDP y quien lo suscribe?",
    options: [
      "Es expedido por el jefe de presupuesto y garantiza que la apropiacion esta disponible y libre de afectacion",
      "Lo expide tesoreria para certificar disponibilidad de caja",
      "Lo emite el supervisor para autorizar gastos menores",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El CDP solicitado por Infraestructura de Sabaneta debe ser expedido por el jefe de presupuesto. Este documento certifica que existe apropiacion disponible y libre de afectacion para el proceso de contratacion, no la disponibilidad de caja.",
    topic: "CDP - Definicion",
  },
  {
    id: 17,
    question:
      "Situacion\n\nAl expedir un CDP por $80.000.000 para un contrato de consultoria en el municipio de Caldas, el auxiliar de presupuesto pregunta cual es el impacto inmediato de este documento sobre la apropiacion del rubro.\n\nPregunta\n\nCon base en la situacion descrita, ¿que efecto produce el CDP en la apropiacion?",
    options: [
      "Afecta preliminarmente la apropiacion",
      "Afecta definitivamente la apropiacion",
      "No tiene efectos sobre el presupuesto",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El CDP de $80.000.000 expedido en Caldas afecta preliminarmente la apropiacion, reservandola para el proceso. La afectacion definitiva ocurre cuando se expide el RP del compromiso, no con el CDP.",
    topic: "CDP - Efecto",
  },
  {
    id: 18,
    question:
      "Situacion\n\nLa oficina de planeacion del municipio de Copacabana radica un proyecto de inversion para construccion de parques. El jefe de presupuesto debe verificar los requisitos antes de expedir el CDP correspondiente.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿cuando se requiere certificacion BPIN para expedir el CDP?",
    options: [
      "Cuando es inversion; los rubros de funcionamiento y deuda no exigen BPIN",
      "Siempre, sin importar el tipo de gasto",
      "Nunca, porque el BPIN se obtiene despues del pago",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El proyecto de parques de Copacabana, al ser inversion, requiere certificacion BPIN antes de expedir el CDP. Los gastos de funcionamiento y servicio de la deuda no exigen este requisito porque no se registran en el banco de proyectos.",
    topic: "CDP - Requisitos",
  },
  {
    id: 19,
    question:
      "Situacion\n\nEn el municipio de La Estrella se expidio un CDP hace cuatro meses para un proceso de seleccion que aun no ha culminado. El ordenador del gasto pregunta si el CDP sigue vigente o debe solicitarse uno nuevo.\n\nPregunta\n\nSegun la situacion descrita, ¿cual es la vigencia del CDP?",
    options: [
      "La misma del proceso de asuncion del compromiso",
      "Hasta el cierre fiscal",
      "Indefinida mientras haya saldo",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El CDP expedido en La Estrella mantiene vigencia durante el proceso de asuncion del compromiso. Si el proceso se extiende razonablemente, el CDP sigue valido; si se vence o cancela el proceso, debe renovarse o anularse.",
    topic: "CDP - Vigencia",
  },
  {
    id: 20,
    question:
      "Situacion\n\nLa Secretaria de Salud del municipio de Girardota solicito un CDP por $120.000.000, pero al estructurar el proceso el valor real requerido es $135.000.000. La dependencia pregunta si puede modificarse el CDP existente.\n\nPregunta\n\nCon base en la situacion presentada, ¿es posible modificar un CDP?",
    options: [
      "Si, puede adicionar o reducir valores, dejando constancia del valor definitivo",
      "No, un CDP es inmutable",
      "Solo permite reducciones",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El CDP de Girardota puede adicionarse en $15.000.000 para alcanzar el valor requerido. El manual permite ajustar los CDP mediante adiciones o reducciones, siempre dejando constancia del valor definitivo en el sistema.",
    topic: "CDP - Ajustes",
  },
  {
    id: 21,
    question:
      "Situacion\n\nTras la adjudicacion de un contrato de suministro en el municipio de Barbosa, el jefe de presupuesto debe expedir el registro presupuestal (RP). El contratista pregunta que implica este documento para el compromiso adquirido.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que implica el RP?",
    options: [
      "Perfecciona el compromiso y afecta definitivamente la apropiacion",
      "Es una simple constancia sin efectos",
      "Es un documento de tesoreria para pagar",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El RP del contrato de Barbosa perfecciona el compromiso presupuestal y afecta definitivamente la apropiacion. A partir de este momento, los recursos quedan reservados exclusivamente para ese contrato.",
    topic: "RP - Definicion",
  },
  {
    id: 22,
    question:
      "Situacion\n\nAl elaborar el RP para un contrato de obra en el municipio de Sopetran, el funcionario de presupuesto tiene dudas sobre la informacion minima que debe incluirse en el documento para cumplir con la normativa.\n\nPregunta\n\nSegun la situacion planteada, ¿que debe indicarse en el RP?",
    options: [
      "El valor exacto y el plazo asociados al compromiso",
      "Solo el valor maximo del CDP",
      "No hace falta detallar el plazo",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El RP del contrato de obra en Sopetran debe indicar con claridad el valor exacto y el plazo del compromiso. La regla de oro exige estos datos para garantizar el control presupuestal adecuado.",
    topic: "RP - Informacion minima",
  },
  {
    id: 23,
    question:
      "Situacion\n\nUn abogado de la oficina juridica del municipio de Santa Fe de Antioquia pregunta si el RP es requisito para perfeccionar un contrato estatal. Necesita saber en que momento exacto el contrato adquiere validez juridica.\n\nPregunta\n\nCon base en la situacion descrita, ¿que establece la normativa sobre el RP y el perfeccionamiento?",
    options: [
      "El RP no es requisito de perfeccionamiento, pero si para ejecutar el contrato",
      "El RP siempre es requisito de perfeccionamiento",
      "El RP no aplica a contratos de servicios",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El abogado de Santa Fe de Antioquia debe saber que el contrato se perfecciona con la firma de las partes, sin necesidad del RP. Sin embargo, el articulo 41 de la Ley 80 exige el RP como requisito para iniciar la ejecucion contractual.",
    topic: "RP - Perfeccionamiento vs ejecucion",
  },
  {
    id: 24,
    question:
      "Situacion\n\nEn el municipio de Yarumal se firmo un contrato de prestacion de servicios, pero por demoras administrativas aun no se ha expedido el RP. El contratista pregunta si puede iniciar la ejecucion de las actividades pactadas.\n\nPregunta\n\nDe acuerdo con la situacion presentada, ¿es valido el contrato firmado sin RP?",
    options: [
      "Si, puede perfeccionarse sin RP, pero no ejecutarse hasta obtenerlo",
      "No, la firma sin RP es nula",
      "El RP solo se exige despues del primer pago",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El contrato firmado en Yarumal es valido juridicamente, pero el contratista no puede iniciar la ejecucion hasta que se expida el RP. Sin este documento, cualquier actividad realizada carece de respaldo presupuestal.",
    topic: "RP - Timing",
  },
  {
    id: 25,
    question:
      "Situacion\n\nRecursos Humanos de la Gobernacion de Antioquia emitio un CDP global por $500.000.000 para aportes patronales. El auxiliar de presupuesto pregunta si puede usar ese unico CDP para expedir multiples RP a distintos terceros como EPS, AFP, SENA e ICBF.\n\nPregunta\n\nSegun la situacion descrita, ¿puede un CDP global soportar varios RP a distintos terceros?",
    options: [
      "Si, un CDP global puede soportar varios RP a distintos terceros (ESAP, SENA, ICBF, EPS, AFP, etc.)",
      "No, cada RP exige un CDP independiente",
      "Depende de la autorizacion del supervisor",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El CDP global de la Gobernacion puede respaldar multiples RP para EPS, AFP, SENA, ICBF y demas terceros. La normativa permite este fraccionamiento cuando la obligacion se dispersa entre varios beneficiarios, siempre que no se exceda el valor total.",
    topic: "RP - Fraccionamiento",
  },
  {
    id: 26,
    question:
      "Situacion\n\nLa Secretaria de Educacion del municipio de Caucasia recibio 500 pupitres del proveedor contratado. El supervisor verifico que la entrega cumple las especificaciones tecnicas y ahora debe registrar la obligacion presupuestal.\n\nPregunta\n\nCon base en la situacion planteada, ¿cuando nace presupuestalmente la obligacion?",
    options: [
      "Cuando los bienes o servicios se reciben a satisfaccion y se adeuda el monto correspondiente (incluidos anticipos pactados no pagados)",
      "Con la expedicion del CDP",
      "Con la firma del contrato",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La obligacion presupuestal en Caucasia nace cuando los pupitres se reciben a satisfaccion y surge la exigibilidad del pago. El CDP y la firma del contrato son etapas previas que no generan obligacion hasta la entrega efectiva.",
    topic: "Obligacion - Nacimiento",
  },
  {
    id: 27,
    question:
      "Situacion\n\nLa tesoreria del municipio de Turbo pregunta como debe imputarse una obligacion por $25.000.000 correspondiente a un contrato de mantenimiento. Necesita saber a que se asocia y cual es su vigencia.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿como se imputa una obligacion?",
    options: [
      "Se imputa al compromiso del que proviene y se fija el plazo de pago, cuya vigencia coincide con el proceso de ejecucion de pagos",
      "Se imputa al rubro global sin especificar el compromiso",
      "Se imputa a tesoreria y caduca al mes",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La obligacion de Turbo debe imputarse al RP del contrato de mantenimiento del que proviene. Se fija el plazo de pago y su vigencia coincide con el proceso de ejecucion de pagos, no con plazos arbitrarios.",
    topic: "Obligacion - Imputacion",
  },
  {
    id: 28,
    question:
      "Situacion\n\nAntes de procesar un pago de $45.000.000 por servicios profesionales, la tesoreria del municipio de Apartado debe validar que se cumplan todos los requisitos legales. La pagadora elabora un listado de verificacion.\n\nPregunta\n\nSegun la situacion planteada, ¿cuales requisitos son indispensables antes del pago?",
    options: [
      "Recibo a satisfaccion, afectacion del articulo presupuestal, disponibilidad de PAC, cuenta de pago, RP, soporte y acto que ordene el gasto",
      "Solo PAC y factura",
      "Unicamente el certificado del supervisor",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La pagadora de Apartado debe verificar todos los requisitos: recibo a satisfaccion, afectacion presupuestal, PAC disponible, cuenta bancaria, RP vigente, soportes documentales y acto administrativo que ordene el gasto. Faltar alguno impide el pago.",
    topic: "Pago - Requisitos",
  },
  {
    id: 29,
    question:
      "Situacion\n\nEn el municipio de Chigorodo se han verificado todos los requisitos para pagar una obligacion de $18.000.000 por suministros. El ordenador del gasto pregunta cual es el rol especifico de la tesoreria en este momento.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es el rol de tesoreria una vez verificados los requisitos?",
    options: [
      "Efectuar el pago cuando la obligacion esta registrada y cumple todos los soportes",
      "Autorizar el RP y luego pagar",
      "Expedir el CDP",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La tesoreria de Chigorodo debe efectuar el pago una vez verificado que la obligacion esta registrada y cuenta con todos los soportes. Tesoreria no expide CDP ni autoriza RP; su funcion es ejecutar el giro con los requisitos cumplidos.",
    topic: "Pago - Rol de tesoreria",
  },
  {
    id: 30,
    question:
      "Situacion\n\nAl cierre de la vigencia, la oficina de presupuesto del municipio de Nechi debe presentar el informe de reservas presupuestales y cuentas por pagar. Un funcionario nuevo pregunta que representan exactamente estos conceptos.\n\nPregunta\n\nDe acuerdo con la situacion presentada, ¿que son las reservas y cuentas por pagar presupuestales?",
    options: [
      "Saldos de compromisos u obligaciones pendientes de autorizacion de pago por apropiacion",
      "Saldos de caja por recaudar",
      "Proyecciones del PAC",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Las reservas y cuentas por pagar que debe reportar Nechi son los saldos de compromisos u obligaciones que al cierre de la vigencia quedaron pendientes de pago. No son proyecciones ni saldos por recaudar.",
    topic: "Reservas - Definicion",
  },
  {
    id: 31,
    question:
      "Situacion\n\nLa Direccion Financiera del municipio de Segovia revisa los pendientes de pago al finalizar el ano. El contador debe clasificarlos correctamente para el cierre de la vigencia y la constitucion de reservas.\n\nPregunta\n\nSegun la situacion descrita, ¿a que corresponden los pendientes de pago?",
    options: [
      "A lo constituido como reservas o cuentas por pagar segun su naturaleza",
      "A gastos anulados",
      "A deudas con bancos",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Los pendientes de pago en Segovia se clasifican como reservas (compromisos sin obligacion) o cuentas por pagar (obligaciones sin pago), segun su estado. No son gastos anulados ni deudas bancarias.",
    topic: "Reservas - Pendientes",
  },
  {
    id: 32,
    question:
      "Situacion\n\nEl comite de gasto del municipio de Remedios analiza la definicion tecnica de compromiso presupuestal. Un concejal invitado solicita una explicacion clara sobre que significa comprometer el presupuesto.\n\nPregunta\n\nCon base en la situacion planteada, ¿que es un compromiso presupuestal?",
    options: [
      "El acto mediante el cual los organos competentes comprometen el presupuesto para ejecutar la apropiacion",
      "La decision de tesoreria de girar recursos",
      "Una simple solicitud interna",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El comite de Remedios debe explicar que el compromiso es el acto formal mediante el cual los organos competentes asumen obligaciones con cargo al presupuesto aprobado. No es una decision de tesoreria ni una solicitud informal.",
    topic: "Compromisos - Definicion",
  },
  {
    id: 33,
    question:
      "Situacion\n\nDurante una auditoria en el municipio de Zaragoza, el auditor solicita identificar los actos que generan compromisos presupuestales validos. El jefe de presupuesto debe presentar la documentacion correspondiente.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que actos generan compromisos presupuestales?",
    options: [
      "Actos administrativos, contratos, convenios y ordenes (suministro, pedido, trabajo)",
      "Invitaciones previas sin CDP",
      "Memorandos internos sin soporte",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El jefe de presupuesto de Zaragoza debe presentar actos administrativos, contratos, convenios y ordenes formales. Las invitaciones sin CDP o memorandos sin soporte no generan compromisos validos.",
    topic: "Compromisos - Actos generadores",
  },
  {
    id: 34,
    question:
      "Situacion\n\nLa Secretaria de Hacienda del municipio de Amalfi organiza una induccion para nuevos funcionarios sobre el ciclo presupuestal completo. El capacitador debe explicar la secuencia desde los ingresos hasta los pagos.\n\nPregunta\n\nSegun la situacion presentada, ¿cual es la ruta correcta del ciclo presupuestal?",
    options: [
      "Causacion con acto, recaudo registrado y luego las seis etapas del gasto: apropiacion, CDP, RP, obligacion y pago con requisitos",
      "Recaudo directo y pago inmediato",
      "CDP y pago, dejando el RP para el cierre",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El capacitador de Amalfi debe explicar que el ciclo inicia con la causacion mediante acto administrativo, continua con el recaudo y luego las etapas del gasto: apropiacion, CDP, RP, obligacion y pago. No hay atajos validos.",
    topic: "Integracion ingreso-gasto",
  },
  {
    id: 35,
    question:
      "Situacion\n\nLa oficina de proyectos del municipio de Andes solicita un CDP para un proyecto de inversion en infraestructura educativa, pero aun no cuenta con el registro BPIN. El jefe de presupuesto evalua si puede expedirlo.\n\nPregunta\n\nCon base en la situacion descrita, ¿es procedente expedir un CDP de inversion sin BPIN?",
    options: [
      "No, todo proyecto de inversion requiere viabilidad BPIN previa al CDP",
      "Si, el BPIN se obtiene luego del pago",
      "Depende del monto",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El jefe de presupuesto de Andes no puede expedir el CDP sin la certificacion BPIN. Todo proyecto de inversion requiere viabilidad en el banco de proyectos antes de comprometer recursos, independientemente del monto.",
    topic: "Inversion - BPIN",
  },
  {
    id: 36,
    question:
      "Situacion\n\nDurante una revision de control interno en el municipio de Ciudad Bolivar, se detectaron compromisos de vigencias futuras sin autorizacion previa del CONFIS. El contralor municipal pregunta por las consecuencias de esta irregularidad.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que consecuencias existen por comprometer vigencias futuras sin CONFIS?",
    options: [
      "Esta prohibido comprometer sin autorizacion del CONFIS; hay responsabilidad personal y pecuniaria",
      "Puede hacerse si hay caja",
      "Basta con el visto bueno del supervisor",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Los funcionarios de Ciudad Bolivar involucrados enfrentan responsabilidad disciplinaria y fiscal. Comprometer vigencias futuras sin autorizacion del CONFIS esta expresamente prohibido y genera responsabilidad personal y pecuniaria.",
    topic: "Vigencias futuras",
  },
  {
    id: 37,
    question:
      "Situacion\n\nAl conciliar los ingresos del municipio de Sonson, el contador encuentra diferencias entre los ingresos presupuestales y el saldo de caja debido a retenciones practicadas y devoluciones realizadas durante el mes.\n\nPregunta\n\nSegun la situacion descrita, ¿por que se presentan diferencias entre ingresos presupuestales y caja?",
    options: [
      "Porque el ingreso se registra con base caja y operaciones como anticipos, retenciones, cuotas, pago de papeles y devoluciones alteran los momentos",
      "Por falta de conciliaciones",
      "Por no usar el SIIF",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Las diferencias en Sonson se deben a que operaciones como retenciones y devoluciones modifican el momento del ingreso en caja respecto al registro presupuestal. No son falta de conciliacion ni problemas del sistema.",
    topic: "Ingresos - Conciliaciones",
  },
  {
    id: 38,
    question:
      "Situacion\n\nA la tesoreria del municipio de Tamesis llega una orden de pago por $8.500.000 correspondiente a un contrato de mantenimiento. Al revisar los documentos, la pagadora constata que no se anexo el acta de recibo a satisfaccion.\n\nPregunta\n\nCon base en la situacion planteada, ¿que procede ante la falta del recibo de conformidad?",
    options: [
      "No se paga; falta el recibo a satisfaccion exigido entre los requisitos previos",
      "Puede pagarse con garantia bancaria",
      "Basta con el RP",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La pagadora de Tamesis debe devolver la orden de pago. El recibo a satisfaccion es requisito indispensable para el pago; sin este documento no puede procesarse el giro aunque existan otros soportes.",
    topic: "Pago - Requisitos minimos",
  },
  {
    id: 39,
    question:
      "Situacion\n\nEl municipio de Venecia recibio $30.000.000 de un particular para financiar un evento cultural. Sin embargo, el gasto correspondiente aun no esta incluido en el presupuesto vigente ni existe apropiacion disponible.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿como se registran estos recursos que ingresan a caja?",
    options: [
      "No se reconocen como ingreso presupuestal hasta que respalden un gasto",
      "Se registran como ingreso de capital",
      "Se imputan al rubro de inversion",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "Los $30.000.000 recibidos en Venecia no constituyen ingreso presupuestal mientras no exista un gasto autorizado que respalden. Se mantienen como recursos de terceros hasta que se incorporen al presupuesto con su destinacion especifica.",
    topic: "Ingresos - Identificacion",
  },
  {
    id: 40,
    question:
      "Situacion\n\nLa oficina de nomina de la Gobernacion de Antioquia pregunta como manejar un CDP unico de $200.000.000 para aportes patronales. Necesita garantizar que pueda distribuirse entre EPS, AFP y cajas de compensacion sin inconvenientes.\n\nPregunta\n\nSegun la situacion planteada, ¿que debe garantizarse al usar un CDP global para aportes?",
    options: [
      "Que el CDP global respalde multiples RP sin exceder su valor y que cada RP tenga soporte completo para cada tercero",
      "Que se expida un CDP por cada AFP o EPS",
      "Que los RP se emitan sin control de saldo",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "La oficina de nomina debe garantizar que el CDP global de $200.000.000 respalde todos los RP sin exceder el valor total, y que cada RP cuente con documentacion completa para cada tercero (EPS, AFP, cajas, etc.).",
    topic: "CDP global - Control",
  },
  {
    id: 41,
    question:
      "Situacion\n\nLa Alcaldia de Puerto Berrio quiere financiar un programa social de atencion a adultos mayores que no aparece en el presupuesto vigente aprobado por el Concejo. El alcalde pregunta si puede ejecutarlo mediante decreto.\n\nPregunta\n\nCon base en la situacion descrita, ¿que procede respecto al gasto no previsto en el presupuesto?",
    options: [
      "Ejecutarlo por decreto del alcalde",
      "No puede ejecutarse: todo gasto debe estar previsto en el presupuesto aprobado",
      "Cubrirlo con donaciones privadas sin tramite",
      "Trasladar cualquier credito a ese objeto",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El programa de adultos mayores no puede ejecutarse en Puerto Berrio porque no esta previsto en el presupuesto aprobado. El articulo 345 de la Constitucion prohibe erogaciones no decretadas en el presupuesto vigente.",
    topic: "CN art. 345 – Gasto no previsto",
  },
  {
    id: 42,
    question:
      "Situacion\n\nLa Asamblea del departamento de Antioquia pretende aprobar el cobro de un nuevo impuesto al turismo sin haberlo incluido previamente en el presupuesto de rentas departamental.\n\nPregunta\n\nDe acuerdo con la situacion presentada, ¿es viable cobrar este nuevo impuesto?",
    options: [
      "Si, si lo aprueba mayoria simple",
      "No, en tiempo de paz no se perciben impuestos que no figuren en el presupuesto de rentas",
      "Procede si se declara urgencia manifiesta",
      "Solo requiere decreto del gobernador",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El nuevo impuesto al turismo no puede cobrarse porque no figura en el presupuesto de rentas. El articulo 345 de la Constitucion dispone que en tiempo de paz no pueden percibirse impuestos que no esten incorporados en el presupuesto.",
    topic: "CN art. 345 – Impuestos",
  },
  {
    id: 43,
    question:
      "Situacion\n\nEn el Congreso de la Republica se radico el Proyecto de Presupuesto de Rentas y Ley de Apropiaciones para la vigencia 2025. Un asesor legislativo nuevo pregunta cual comision da el primer debate a este proyecto.\n\nPregunta\n\nSegun la situacion descrita, ¿quien da primer debate al Proyecto de Presupuesto?",
    options: [
      "Comisiones Primera y Septima",
      "Plenarias conjuntas",
      "Comisiones de asuntos economicos en forma conjunta",
      "Comision de Etica",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El primer debate al Proyecto de Presupuesto lo dan las comisiones de asuntos economicos (terceras y cuartas) de Senado y Camara en forma conjunta, conforme al articulo 346 de la Constitucion modificado por el Acto Legislativo 03 de 2011.",
    topic: "CN art. 346 – Tramite",
  },
  {
    id: 44,
    question:
      "Situacion\n\nEl Ministerio de Transporte desea incluir durante la vigencia un gasto de $50.000.000.000 para un proyecto vial que no estaba en el proyecto de ley de apropiaciones original presentado al Congreso.\n\nPregunta\n\nCon base en la situacion planteada, ¿puede el ministerio incluir este gasto durante la vigencia?",
    options: [
      "Si, mediante circular interna",
      "Si, con decreto reglamentario",
      "No: la ley de apropiaciones debe contener la totalidad de los gastos",
      "Basta con expedir un CDP posterior",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El proyecto vial no puede incluirse porque la ley de apropiaciones debe contener la totalidad de los gastos. El articulo 347 establece que lo no incluido en el proyecto original no puede ejecutarse en la vigencia sin adicion presupuestal.",
    topic: "CN art. 347 – Totalidad del gasto",
  },
  {
    id: 45,
    question:
      "Situacion\n\nEl Ministerio de Hacienda proyecta el PGN 2025 con gastos por $500 billones, pero los ingresos autorizados solo alcanzan $450 billones. El director de presupuesto debe definir como financiar la diferencia de $50 billones.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿como se financia la diferencia entre gastos e ingresos?",
    options: [
      "El Congreso reduce automaticamente el gasto",
      "Se cubre con vigencias futuras sin tramite",
      "El Gobierno debe proponer nuevas rentas o modificaciones en un proyecto separado",
      "Se aprueba y luego se recorta",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "Para financiar los $50 billones de diferencia, el Gobierno debe presentar un proyecto separado que instituya nuevas rentas o modifique las existentes. El articulo 347 exige este procedimiento cuando los gastos superan los ingresos.",
    topic: "CN art. 347 – Fuentes de financiacion",
  },
  {
    id: 46,
    question:
      "Situacion\n\nUna ley ordinaria reciente sobre contratacion publica contradice varias disposiciones de la ley organica de presupuesto (Decreto 111 de 1996). El asesor juridico de una entidad debe determinar cual norma prevalece.\n\nPregunta\n\nSegun la situacion planteada, ¿cual ley prevalece en caso de contradiccion?",
    options: [
      "La ley ordinaria por ser posterior",
      "La ley organica, que fija reglas superiores para la actividad legislativa presupuestal",
      "Decide el ministerio del ramo",
      "Se aplican ambas",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "La ley organica de presupuesto prevalece porque el articulo 151 de la Constitucion establece que las leyes organicas vinculan al legislador ordinario. La ley posterior debe ajustarse a las reglas organicas, no al contrario.",
    topic: "Jerarquia normativa – Ley organica",
  },
  {
    id: 47,
    question:
      "Situacion\n\nUn secretario de planeacion municipal pregunta cual norma respalda el uso de la ley anual del PGN como instrumento para ejecutar el Plan Nacional de Desarrollo. Necesita fundamentar un concepto juridico.\n\nPregunta\n\nCon base en la situacion descrita, ¿que norma establece esta relacion entre presupuesto y Plan de Desarrollo?",
    options: ["Ley 80 de 1993", "Acto Legislativo 01 de 2001", "Decreto 111 de 1996, articulo 10", "Decreto 1082 de 2015"],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El secretario debe citar el articulo 10 del Decreto 111 de 1996 (Estatuto Organico del Presupuesto), que establece expresamente que la ley anual del presupuesto es el instrumento para ejecutar los planes y programas de desarrollo.",
    topic: "EOP art. 10 – Instrumento",
  },
  {
    id: 48,
    question:
      "Situacion\n\nEl alcalde de un municipio de sexta categoria estructura el presupuesto municipal sin considerar el Plan Financiero ni el Plan Operativo Anual de Inversiones (POAI). El secretario de hacienda le advierte sobre posibles inconsistencias.\n\nPregunta\n\nDe acuerdo con la situacion presentada, ¿es correcto estructurar el presupuesto sin Plan Financiero ni POAI?",
    options: [
      "Si, si el Concejo lo aprueba",
      "Si, si hay superavit",
      "No: el sistema presupuestal coordina Plan Financiero, POAI y Presupuesto para armonizar politica fiscal y ejecucion",
      "Solo la Nacion debe hacerlo",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El alcalde debe incluir el Plan Financiero y el POAI porque el sistema presupuestal colombiano exige coherencia entre estos instrumentos. Esta coordinacion garantiza disciplina macrofiscal y correcta ejecucion del gasto.",
    topic: "Sistema presupuestal – Coherencia",
  },
  {
    id: 49,
    question:
      "Situacion\n\nDurante una sesion del Concejo Municipal de Medellin, un concejal afirma que el presupuesto es simplemente una meta de gasto que puede superarse si hay necesidad. El secretario de hacienda debe aclarar la naturaleza real del presupuesto.\n\nPregunta\n\nSegun la situacion descrita, ¿cual es la naturaleza real del presupuesto?",
    options: [
      "Depende del recaudo efectivo",
      "Es una autorizacion maxima de gasto y un estimativo de ingresos",
      "Es un compromiso politico sin implicaciones juridicas",
      "Es un plan indicativo no vinculante",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El secretario de hacienda debe corregir al concejal: el presupuesto es una autorizacion maxima de gasto (no puede excederse) y un estimativo de ingresos para la vigencia. No es una meta flexible ni un plan indicativo.",
    topic: "Naturaleza del presupuesto",
  },
  {
    id: 50,
    question:
      "Situacion\n\nUna entidad territorial prepara su proyecto de presupuesto ignorando los principios presupuestales establecidos en la normativa. El contralor departamental advierte sobre las consecuencias de esta omision.\n\nPregunta\n\nCon base en la situacion planteada, ¿que ocurre si se ignoran los principios presupuestales?",
    options: [
      "No pasa nada",
      "Se vicia la validez del proceso porque los principios condicionan la legitimidad del presupuesto",
      "Se corrige con un CDP",
      "Se ajusta durante la ejecucion",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El contralor advierte correctamente que ignorar los principios presupuestales vicia la validez del proceso. El Estatuto Organico contempla nueve principios legales y tres jurisprudenciales que condicionan la legitimidad del acto presupuestal.",
    topic: "Principios presupuestales",
  },
  {
    id: 51,
    question:
      "Situacion\n\nUn analista de presupuesto del municipio de Entrerrios incorpora los aportes parafiscales del SENA e ICBF como ingresos corrientes con gasto asociado en el presupuesto municipal. El revisor fiscal objeta esta clasificacion.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿es correcto incorporar parafiscales como ingresos corrientes con gasto?",
    options: [
      "Si, siempre",
      "Si, si son SENA o ICBF",
      "No: los parafiscales se incluyen solo de forma informativa en capitulo separado y sin gasto asociado",
      "Depende de la tasa de recaudo",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "El revisor fiscal tiene razon: los aportes parafiscales deben registrarse solo informativamente en capitulo separado, sin mezclarlos con ingresos corrientes ni asociarles gasto. El articulo 12 de la Ley 179 de 1994 asi lo establece.",
    topic: "Parafiscales – Presentacion presupuestal",
  },
  {
    id: 52,
    question:
      "Situacion\n\nEn una capacitacion sobre ingresos publicos en la Gobernacion de Antioquia, el instructor presenta las caracteristicas de las contribuciones parafiscales. Un participante pregunta cual caracteristica no corresponde a este tipo de tributo.\n\nPregunta\n\nSegun la situacion presentada, ¿que caracteristica no corresponde a una contribucion parafiscal?",
    options: [
      "Obligatoriedad",
      "Libre destinacion para gasto general",
      "Singularidad dirigida a un grupo especifico",
      "Destinacion sectorial",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "La libre destinacion para gasto general no es caracteristica de los parafiscales. Estos tributos son obligatorios, singulares (dirigidos a un grupo especifico) y con destinacion sectorial exclusiva, nunca para gasto general.",
    topic: "Parafiscales – Rasgos",
  },
  {
    id: 53,
    question:
      "Situacion\n\nLa Secretaria de Hacienda del municipio de Titiribi propone crear un mecanismo sin personeria juridica para administrar los recursos del sistema de transporte publico. El alcalde pregunta que figura legal corresponde a esta estructura.\n\nPregunta\n\nCon base en la situacion descrita, ¿que figura es un mecanismo sin personeria para administrar recursos especificos?",
    options: [
      "Un fondo-cuenta o fondo especial sin personeria juridica",
      "Un establecimiento publico",
      "Una empresa social del Estado",
      "Una empresa industrial y comercial del Estado",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "El mecanismo propuesto en Titiribi corresponde a un fondo-cuenta o fondo especial sin personeria juridica. Esta figura permite administrar recursos especificos sin crear una nueva entidad con estructura administrativa propia.",
    topic: "Fondos especiales – Fondo-cuenta",
  },
  {
    id: 54,
    question:
      "Situacion\n\nEl Congreso aprueba la creacion de un fondo con personeria juridica propia para administrar recursos del sector agropecuario, que sera unidad ejecutora del PGN. El director juridico del DNP debe clasificar esta figura.\n\nPregunta\n\nDe acuerdo con la situacion presentada, ¿de que tipo es un fondo con personeria juridica como unidad ejecutora del PGN?",
    options: [
      "Fondo-cuenta",
      "Fondo-entidad (asimilado a establecimiento publico)",
      "Sociedad de economia mixta",
      "Tasa parafiscal",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El fondo creado es un fondo-entidad porque tiene personeria juridica y actua como unidad ejecutora del PGN. Se asimila a un establecimiento publico y modifica la estructura administrativa del Estado.",
    topic: "Fondos especiales – Fondo-entidad",
  },
  {
    id: 55,
    question:
      "Situacion\n\nEl municipio de Fredonia cobra a las empresas de telecomunicaciones por el uso del espacio electromagnetico para instalacion de antenas. El contador debe clasificar este ingreso correctamente en el presupuesto.\n\nPregunta\n\nSegun la situacion descrita, ¿como se clasifica el ingreso por uso del espacio electromagnetico?",
    options: [
      "Tributo directo",
      "Renta contractual (ingreso no tributario)",
      "Regalia",
      "Transferencia del SGP",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El cobro por uso del espacio electromagnetico en Fredonia se clasifica como renta contractual dentro de los ingresos no tributarios. No es un tributo directo porque surge de una relacion contractual por el uso del bien publico.",
    topic: "Clasificacion de ingresos",
  },
  {
    id: 56,
    question:
      "Situacion\n\nEn la comision presupuestal del municipio de Jardin surge un debate sobre si el alumbrado publico es un impuesto o una tasa. Los asesores tienen posiciones encontradas y solicitan orientacion tecnica.\n\nPregunta\n\nCon base en la situacion planteada, ¿cual es la naturaleza del alumbrado publico segun la doctrina?",
    options: [
      "Siempre es impuesto",
      "Siempre es tasa",
      "Es una discusion doctrinal y juridica abierta",
      "Es contribucion parafiscal",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "La naturaleza del alumbrado publico es una discusion doctrinal y juridica abierta. No hay consenso sobre si es impuesto o tasa, por lo que los asesores de Jardin deben revisar la jurisprudencia mas reciente del Consejo de Estado.",
    topic: "Ingresos – Alumbrado publico",
  },
  {
    id: 57,
    question:
      "Situacion\n\nLa Secretaria de Hacienda del municipio de Jerico desea registrar los intereses de un credito de emprestito como gasto de inversion, argumentando que financian un proyecto productivo. El jefe de presupuesto objeta.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿es correcto registrar intereses de deuda como inversion?",
    options: [
      "Si, si financian proyectos",
      "No, los intereses se clasifican como servicio de la deuda",
      "Debe pasar por funcionamiento",
      "Puede hacerse con POAI",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El jefe de presupuesto de Jerico tiene razon: los intereses de credito siempre se clasifican como servicio de la deuda, nunca como inversion. Registrarlos incorrectamente distorsiona la estructura del gasto y viola la normativa.",
    topic: "Clasificacion del gasto – Servicio de deuda",
  },
  {
    id: 58,
    question:
      "Situacion\n\nLa Secretaria de Educacion del municipio de Betania pretende imputar la compra de papeleria por $5.000.000 al Plan Operativo Anual de Inversiones (POAI) de un proyecto educativo. El revisor de cuentas objeta la imputacion.\n\nPregunta\n\nSegun la situacion planteada, ¿es valido imputar compra de papeleria al POAI?",
    options: [
      "Siempre procede",
      "No: la inversion se ejecuta via POAI, pero los gastos de funcionamiento (como papeleria) deben imputarse a su rubro de funcionamiento",
      "Si, si es menor cuantia",
      "Si, con autorizacion del DNP",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "El revisor de cuentas tiene razon: la papeleria es un gasto de funcionamiento que debe imputarse a su rubro correspondiente. El POAI respalda exclusivamente proyectos de inversion, no gastos operativos de la entidad.",
    topic: "Funcionamiento vs inversion",
  },
  {
    id: 59,
    question:
      "Situacion\n\nEl municipio de Hispania recibe $2.000.000.000 de un credito de la banca multilateral y $500.000.000 en donaciones de cooperacion internacional para un proyecto de agua potable. El tesorero debe clasificar estos ingresos.\n\nPregunta\n\nCon base en la situacion descrita, ¿donde se clasifican los recursos de credito y donaciones?",
    options: [
      "Ingresos corrientes",
      "Recursos de capital",
      "Parafiscales",
      "Fondos especiales",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "Los $2.500.000.000 que recibe Hispania (credito y donaciones) se clasifican como recursos de capital. Estos ingresos no son corrientes porque no provienen de la actividad ordinaria del municipio ni son recurrentes.",
    topic: "Ingresos – Recursos de capital",
  },
  {
    id: 60,
    question:
      "Situacion\n\nAl liquidar la vigencia 2024, el municipio de Pueblorrico reconoce exigibilidades de contratos de anos anteriores que quedaron pendientes de pago. El contador debe registrar estos saldos en el presupuesto 2025.\n\nPregunta\n\nDe acuerdo con la situacion presentada, ¿donde se registran las exigibilidades de anos anteriores?",
    options: [
      "En inversion",
      "En funcionamiento",
      "En el presupuesto de gastos, discriminadas como deficit anterior y vigencias expiradas",
      "En ingresos de capital",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "Las exigibilidades de Pueblorrico se registran en el presupuesto de gastos 2025, discriminadas como deficit anterior (si es deficit fiscal) y vigencias expiradas (obligaciones de vigencias anteriores). No son inversion ni funcionamiento regular.",
    topic: "Cierre de vigencia – Registro",
  },
  {
    id: 61,
    question:
      "Situacion\n\nEl municipio de Angostura presta directamente los servicios de acueducto y aseo a traves de una dependencia de la alcaldia. El tesorero debe clasificar los ingresos generados por el cobro de estas tarifas.\n\nPregunta\n\nSegun la situacion descrita, ¿como se reflejan en el presupuesto los ingresos por prestacion directa de servicios?",
    options: [
      "Solo como tasa",
      "Como ingresos por venta de bienes y servicios (ingresos no tributarios) cuando corresponda",
      "Como regalias",
      "Como contribucion parafiscal",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "Los ingresos por acueducto y aseo en Angostura se clasifican como venta de bienes y servicios dentro de los ingresos no tributarios. No son tasas porque corresponden a una actividad comercial prestada directamente por la entidad.",
    topic: "Ingresos – Prestacion directa",
  },
  {
    id: 62,
    question:
      "Situacion\n\nEl Gobierno Nacional presenta el proyecto de Presupuesto General de la Nacion al Congreso en agosto, a mitad de la legislatura. Un senador cuestiona si el tramite es valido por presentarse en esa fecha.\n\nPregunta\n\nCon base en la situacion descrita, ¿es valido presentar el PGN a mitad de la legislatura?",
    options: [
      "Si, por autonomia del Ejecutivo",
      "Si, si se envia con mensaje de urgencia",
      "No: debe presentarse dentro de los primeros diez dias de cada legislatura",
      "Depende del CONFIS",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "La presentacion en agosto es extemporanea. El articulo 346 de la Constitucion exige que el Gobierno radique el proyecto de presupuesto dentro de los diez primeros dias de cada legislatura (que inicia el 20 de julio).",
    topic: "Cronograma PGN",
  },
]

export function GestionPresupuestalTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = gestionPresupuestalQuestions

  const timer = useTestTimer({
    totalQuestions: questions.length,
    timePerQuestion: 120,
    onTimeUp: () => setShowResults(true),
    isActive: !showResults,
  })

  const handleAnswerChange = (questionId: number, optionIndex: number) => {
    if (answeredQuestions.has(questionId)) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
    setAnsweredQuestions((prev) => new Set(prev).add(questionId))
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) return
    setShowResults(true)
  }

  const handleReset = () => {
    setAnswers({})
    setAnsweredQuestions(new Set())

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
              Responde las preguntas situacionales sobre gestion presupuestal, certificaciones y ciclo de gasto,
              incluidas las disposiciones constitucionales y del Estatuto Organico explicadas en "Presupuesto lo explica".
              Cada item vale <strong>5 puntos</strong>; obtendras retroalimentacion al finalizar.
            </p>
            <Alert>
              <AlertTitle className="flex items-center gap-2 text-base font-semibold">
                <InfoIcon className="h-4 w-4 text-primary" />
                Recuerda
              </AlertTitle>
              <AlertDescription className="mt-1 text-sm">
                El cronometro asigna 2 minutos por pregunta. Debes responder todas para habilitar el envio.
              </AlertDescription>
            </Alert>
          </TabsContent>
          <TabsContent value="questions">
            <div className="rounded-xl border bg-background/60 p-4 text-sm text-muted-foreground shadow-sm">
              <ul className="list-disc space-y-2 pl-5">
                <li>Las preguntas plantean escenarios tipicos de ingreso y gasto.</li>
                <li>Selecciona la opcion que recoge la normativa explicada en la presentacion y en "Presupuesto lo explica".</li>
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
        const isAnswered = answeredQuestions.has(question.id)
        const isCorrect = selected === question.correctAnswer

        return (
          <Card
            key={question.id}
            className={`border transition-colors ${
              isAnswered ? (isCorrect ? "border-green-500 bg-green-50/60" : "border-red-400 bg-red-50/60") : "border-border"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-start justify-between gap-4">
                <span>
                  Pregunta {index + 1} · {question.points} puntos
                </span>
                {isAnswered && selected !== undefined && (
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
              <p className="font-medium leading-relaxed whitespace-pre-line">{question.question}</p>
              <RadioGroup
                value={selected?.toString()}
                onValueChange={(value) => handleAnswerChange(question.id, Number(value))}
                disabled={isAnswered}
              >
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-sm leading-relaxed transition ${
                      isAnswered
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

              {isAnswered && (
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
              {showFeedback ? "Ocultar retroalimentacion" : "Mostrar retroalimentacion"}
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
