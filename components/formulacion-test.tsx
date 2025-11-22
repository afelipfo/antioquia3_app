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

export const questionsV1: Question[] = [
  // Ciclo del proyecto
  {
    id: 1,
    question: "Situacion\n\nEl equipo de planeacion del municipio de Envigado esta iniciando la estructuracion de un proyecto de infraestructura vial. El director de planeacion solicita al equipo que identifique claramente las fases que atravesara el proyecto desde su concepcion hasta su operacion.\n\nPregunta\n\nSegun la situacion descrita, ¿cuales son las fases que comprende el ciclo de vida de un proyecto publico en Colombia?",
    options: [
      "Solo formulacion y ejecucion",
      "Pre-inversion, inversion y operacion",
      "Identificacion, diseno y construccion",
      "Planeacion, contratacion y entrega"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del municipio de Envigado, el ciclo de vida del proyecto de infraestructura vial comprende: Pre-inversion (identificacion, formulacion y evaluacion ex-ante), Inversion (ejecucion y seguimiento) y Operacion (funcionamiento, evaluacion ex-post y sostenibilidad). Esta estructura permite al equipo planificar cada etapa adecuadamente.",
    topic: "Ciclo del proyecto"
  },
  {
    id: 2,
    question: "Situacion\n\nLa Secretaria de Planeacion de Medellin esta evaluando un proyecto de mejoramiento de parques urbanos. Antes de solicitar recursos al Concejo Municipal, necesitan completar todos los estudios y analisis previos que sustenten la viabilidad del proyecto.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que incluye la fase de pre-inversion del proyecto?",
    options: [
      "Solo la ejecucion de obras",
      "La identificacion del problema, formulacion de alternativas, evaluacion ex-ante y estructuracion tecnica, legal y financiera",
      "Unicamente la consecucion de recursos financieros",
      "Solo la contratacion de consultores"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la Secretaria de Planeacion de Medellin, la fase de pre-inversion comprende la identificacion del problema o necesidad de mejoramiento de parques, formulacion de alternativas de solucion, evaluacion ex-ante de viabilidad tecnica, economica, social y ambiental, y la estructuracion del proyecto antes de presentarlo al Concejo.",
    topic: "Fase de pre-inversion"
  },
  {
    id: 3,
    question: "Situacion\n\nUn equipo tecnico del municipio de Rionegro esta formulando un proyecto para mejorar el acueducto rural de la vereda El Tablazo. El coordinador del proyecto indica que primero deben realizar un diagnostico completo de la problematica antes de proponer soluciones.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe incluir el diagnostico del problema?",
    options: [
      "Solo la descripcion general de la situacion",
      "La identificacion del problema central, sus causas directas e indirectas, efectos, poblacion afectada, magnitud y localizacion geografica",
      "Unicamente las quejas de la comunidad",
      "Solo estadisticas generales del sector"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del acueducto rural de El Tablazo, el diagnostico debe identificar el problema central (deficiencia en el servicio de agua), sus causas directas e indirectas (infraestructura obsoleta, fugas, baja presion), efectos (enfermedades, escasez), poblacion afectada (habitantes de la vereda), magnitud cuantitativa y localizacion geografica precisa.",
    topic: "Diagnostico del problema"
  },
  {
    id: 4,
    question: "Situacion\n\nLa Gobernacion de Antioquia esta formulando un proyecto de construccion de un centro de salud en el municipio de Sonson. El equipo tecnico ha identificado el problema y ahora debe proponer diferentes formas de solucionarlo para seleccionar la mas adecuada.\n\nPregunta\n\nSegun la situacion planteada, ¿como deben manejarse las alternativas de solucion en el proyecto?",
    options: [
      "Presentar solo una unica opcion predefinida",
      "Considerar minimo dos alternativas viables, comparandolas tecnica, economica y ambientalmente para seleccionar la optima",
      "Elegirse al azar sin analisis previo",
      "Basarse unicamente en el menor costo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del centro de salud de Sonson, se deben formular y evaluar minimo dos alternativas de solucion tecnicamente viables (por ejemplo, construir nuevo vs. ampliar existente), comparandolas en aspectos tecnicos, economicos, sociales, ambientales e institucionales, para seleccionar la alternativa optima mediante criterios objetivos.",
    topic: "Formulacion de alternativas"
  },
  {
    id: 5,
    question: "Situacion\n\nEl municipio de Bello esta desarrollando un proyecto de construccion de un puente vehicular sobre la quebrada La Garcia. El ingeniero lider del proyecto necesita sustentar tecnicamente la viabilidad antes de avanzar a la fase de factibilidad.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que deben incluir los estudios de pre-factibilidad del proyecto?",
    options: [
      "Solo el presupuesto estimado",
      "Estudios topograficos, geotecnicos, hidrologicos, ambientales, de demanda, tecnicos y financieros que sustenten la viabilidad del proyecto",
      "Unicamente el cronograma de ejecucion",
      "Solo la aprobacion de la comunidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del puente sobre la quebrada La Garcia, los estudios de pre-factibilidad deben incluir: levantamientos topograficos del sitio, estudios geotecnicos y de suelos, analisis hidrologicos de la quebrada, estudios de impacto ambiental, analisis de demanda vehicular, disenos preliminares, costos estimados y evaluacion financiera.",
    topic: "Estudios de pre-factibilidad"
  },
  {
    id: 6,
    question: "Situacion\n\nLa Secretaria de Educacion de Itagui ha formulado un proyecto para construir una nueva institucion educativa en el barrio Santa Maria. Antes de incluirlo en el presupuesto, el Comite de Proyectos debe verificar si el proyecto merece ser ejecutado con recursos publicos.\n\nPregunta\n\nCon base en la situacion planteada, ¿que busca la evaluacion ex-ante del proyecto?",
    options: [
      "Solo cumplir un requisito formal",
      "Determinar la viabilidad tecnica, economica, social, ambiental e institucional del proyecto antes de su ejecucion, y comparar los beneficios con los costos",
      "Unicamente justificar el gasto publico",
      "Aprobar automaticamente todos los proyectos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la institucion educativa de Santa Maria, la evaluacion ex-ante determina si el proyecto es viable tecnica, economica, social, ambiental e institucionalmente, compara los beneficios esperados (cobertura educativa, calidad) con los costos de construccion y operacion, estableciendo si merece ser ejecutado con recursos publicos.",
    topic: "Evaluacion ex-ante"
  },
  // MGA - Metodologia General Ajustada
  {
    id: 7,
    question: "Situacion\n\nUn funcionario recien contratado en la oficina de planeacion del municipio de Caldas debe registrar un proyecto de alcantarillado en el sistema oficial. Su jefe le indica que debe utilizar la herramienta establecida por el DNP para la formulacion de proyectos publicos.\n\nPregunta\n\nSegun la situacion descrita, ¿que es la Metodologia General Ajustada (MGA)?",
    options: [
      "Una guia opcional para formular proyectos privados",
      "La herramienta oficial del DNP para formular, registrar y evaluar proyectos de inversion publica en Colombia",
      "Un software de contabilidad gubernamental",
      "Una metodologia exclusiva para proyectos internacionales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del municipio de Caldas, la MGA es la herramienta metodologica del Departamento Nacional de Planeacion (DNP) para identificar, formular, registrar y evaluar proyectos de inversion publica en Colombia. Es de uso obligatorio para el proyecto de alcantarillado ya que sera financiado con recursos publicos.",
    topic: "MGA - Concepto"
  },
  {
    id: 8,
    question: "Situacion\n\nEl Departamento de Antioquia ha aprobado un proyecto de mejoramiento de vias terciarias financiado con recursos del Presupuesto General de la Nacion. El coordinador del proyecto debe asegurarse de que este debidamente registrado en el sistema de informacion correspondiente.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que es el Banco de Programas y Proyectos de Inversion Nacional (BPIN)?",
    options: [
      "Un banco comercial que financia proyectos",
      "El sistema de informacion donde se registran, clasifican y reportan los proyectos de inversion publica que son financiados con recursos del Presupuesto General de la Nacion",
      "Una base de datos de contratistas del Estado",
      "Un archivo de normas sobre inversion publica"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de vias terciarias de Antioquia, el BPIN es el sistema de informacion donde se registran, clasifican, programan y reportan los proyectos de inversion publica financiados con recursos del Presupuesto General de la Nacion. El proyecto de vias debe estar registrado obligatoriamente en el BPIN.",
    topic: "BPIN"
  },
  {
    id: 9,
    question: "Situacion\n\nUna profesional de la oficina de proyectos del municipio de La Estrella esta capacitando a su equipo en el uso de la MGA Web. Necesita explicarles la estructura general de la herramienta y los modulos que deben diligenciar para formular correctamente un proyecto.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son los modulos principales de la MGA Web?",
    options: [
      "Solo identificacion y presupuesto",
      "Identificacion, preparacion (componentes tecnicos, localizacion, costos), programacion y seguimiento",
      "Unicamente diagnostico y conclusiones",
      "Solo cronograma y presupuesto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la capacitacion en La Estrella, la MGA Web comprende los modulos de: Identificacion (problema, objetivos, alternativas, poblacion), Preparacion (componentes tecnicos, localizacion, costos, ingresos, fuentes de financiacion, indicadores), Programacion y Seguimiento de la ejecucion. Estos modulos guian la formulacion completa del proyecto.",
    topic: "Modulos de la MGA"
  },
  {
    id: 10,
    question: "Situacion\n\nEl equipo de planeacion de Copacabana esta iniciando el registro de un proyecto de vivienda de interes social en la MGA. El profesional a cargo debe completar el primer modulo de la herramienta con toda la informacion relacionada con la identificacion del problema y la solucion propuesta.\n\nPregunta\n\nSegun la situacion planteada, ¿que se debe incluir en el modulo de identificacion de la MGA?",
    options: [
      "Solo nombrar el proyecto",
      "Describir el problema central, sus causas y efectos, definir el objetivo general y especificos, identificar la poblacion afectada y beneficiaria, y plantear alternativas de solucion",
      "Unicamente estimar costos generales",
      "Solo definir el cronograma"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de vivienda en Copacabana, el modulo de identificacion requiere: descripcion del problema central de deficit habitacional con sus causas y efectos (arbol de problemas), definicion del objetivo general y especificos (arbol de objetivos), identificacion de familias afectadas y beneficiarias, y planteamiento de alternativas de solucion.",
    topic: "Modulo de identificacion - MGA"
  },
  {
    id: 11,
    question: "Situacion\n\nUn profesional del municipio de Girardota esta registrando un proyecto de ampliacion de la planta de tratamiento de aguas residuales en la MGA. Al momento de clasificar el proyecto, debe indicar a que sector pertenece para efectos de seguimiento y reporte.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿a que se refiere la clasificacion sectorial en la MGA?",
    options: [
      "El tipo de contrato a utilizar",
      "El sector economico o social al que pertenece el proyecto: educacion, salud, transporte, agua potable, vivienda, etc.",
      "Solo el presupuesto asignado",
      "La region geografica del proyecto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de la planta de tratamiento en Girardota, la clasificacion sectorial identifica que el proyecto pertenece al sector de agua potable y saneamiento basico. Esta clasificacion es importante para el seguimiento, reporte estadistico y asignacion de recursos segun el Sistema General de Regalias.",
    topic: "Clasificacion sectorial - MGA"
  },
  {
    id: 12,
    question: "Situacion\n\nLa Secretaria de Obras Publicas de Sabaneta esta formulando un proyecto de construccion de escenarios deportivos. El ingeniero encargado debe estructurar el proyecto desagregando las obras principales y las tareas necesarias para ejecutar cada una de ellas.\n\nPregunta\n\nCon base en la situacion planteada, ¿que implica la definicion de componentes y actividades en la MGA?",
    options: [
      "Listar tareas sin estructura",
      "Desagregar el proyecto en componentes (productos), cada uno con sus actividades especificas, responsables, cronograma y costos",
      "Solo mencionar el objetivo final",
      "Copiar componentes de otros proyectos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de escenarios deportivos en Sabaneta, los componentes son los productos especificos (cancha de futbol, pista atletica, graderia). Cada componente se desagrega en actividades (excavacion, cimentacion, estructura) con sus respectivos responsables, cronograma de ejecucion, costos detallados y metas cuantificables.",
    topic: "Componentes y actividades - MGA"
  },
  {
    id: 13,
    question: "Situacion\n\nEl municipio de Barbosa esta formulando un proyecto de construccion de un centro de acopio agricola. Al diligenciar la MGA, el profesional debe indicar con precision el sitio exacto donde se ejecutara la obra para facilitar el seguimiento y la evaluacion.\n\nPregunta\n\nSegun la situacion descrita, ¿que debe especificar la localizacion geografica en la MGA?",
    options: [
      "Solo el nombre del municipio",
      "El departamento, municipio, zona urbana o rural, coordenadas geograficas y direccion especifica donde se ejecutara el proyecto",
      "Unicamente la region del pais",
      "Solo la direccion postal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del centro de acopio en Barbosa, la localizacion geografica debe ser precisa: departamento (Antioquia), municipio (Barbosa), area rural, coordenadas geograficas (latitud y longitud del predio), direccion especifica o descripcion del sitio de intervencion, para facilitar el seguimiento y evaluacion del proyecto.",
    topic: "Localizacion geografica - MGA"
  },
  {
    id: 14,
    question: "Situacion\n\nEl municipio de Guarne esta formulando un proyecto de mejoramiento de instituciones educativas rurales. El proyecto sera financiado con diferentes fuentes de recursos, por lo que el profesional debe identificar claramente cada una de ellas en la MGA.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿cuales pueden ser las fuentes de financiacion de un proyecto en la MGA?",
    options: [
      "Solo recursos del presupuesto nacional",
      "Presupuesto nacional, regalias, SGP (Sistema General de Participaciones), recursos propios, credito, cooperacion internacional y cofinanciacion",
      "Unicamente donaciones",
      "Solo creditos bancarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto educativo en Guarne, las fuentes de financiacion pueden ser: recursos del Presupuesto General de la Nacion, regalias, SGP (componente educacion), recursos propios del municipio, credito interno o externo, cooperacion internacional, cofinanciacion con el Departamento o la Nacion, entre otras.",
    topic: "Fuentes de financiacion - MGA"
  },
  // Marco logico
  {
    id: 15,
    question: "Situacion\n\nEl equipo de formulacion de proyectos del municipio de El Carmen de Viboral necesita presentar de manera estructurada un proyecto de fortalecimiento de cadenas productivas. El director solicita utilizar una herramienta que muestre claramente la logica del proyecto y como se medira su exito.\n\nPregunta\n\nCon base en la situacion descrita, ¿que es la Matriz de Marco Logico (MML)?",
    options: [
      "Solo sirve para elaborar presupuestos",
      "Presenta de forma sistematica y logica los objetivos, resultados, actividades, indicadores, medios de verificacion y supuestos del proyecto",
      "Unicamente lista las actividades del proyecto",
      "Solo se usa en proyectos internacionales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de cadenas productivas en El Carmen de Viboral, la MML es una herramienta de planificacion que presenta de manera sistematica y logica: los objetivos del proyecto (fin, proposito), los resultados esperados (componentes), las actividades, indicadores verificables, medios de verificacion y supuestos criticos.",
    topic: "Matriz de Marco Logico"
  },
  {
    id: 16,
    question: "Situacion\n\nLa oficina de planeacion del municipio de Marinilla esta elaborando la Matriz de Marco Logico para un proyecto de agua potable rural. Al definir el primer nivel de la matriz, deben establecer el objetivo de desarrollo de largo plazo al cual contribuira el proyecto.\n\nPregunta\n\nSegun la situacion planteada, ¿a que se refiere el 'Fin' en la Matriz de Marco Logico?",
    options: [
      "La terminacion del proyecto",
      "El objetivo de desarrollo de largo plazo al cual contribuye el proyecto, es decir, el impacto esperado en la sociedad o sector",
      "El presupuesto final del proyecto",
      "La fecha de entrega del proyecto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de agua potable en Marinilla, el 'Fin' es el objetivo de desarrollo de largo plazo: 'Mejorar la calidad de vida y la salud de la poblacion rural del municipio'. El proyecto por si solo no alcanza el Fin, pero contribuye a el junto con otras intervenciones en salud, saneamiento y educacion.",
    topic: "Fin - Marco Logico"
  },
  {
    id: 17,
    question: "Situacion\n\nEl equipo tecnico del municipio de El Retiro esta construyendo la Matriz de Marco Logico para un proyecto de pavimentacion de vias urbanas. Necesitan definir el cambio directo que se espera lograr en los beneficiarios una vez finalice el proyecto.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que representa el 'Proposito' en la Matriz de Marco Logico?",
    options: [
      "Las actividades del proyecto",
      "El efecto directo esperado al finalizar el proyecto, es decir, el cambio que se lograra en la poblacion objetivo",
      "Los recursos disponibles",
      "El nombre del proyecto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de pavimentacion en El Retiro, el 'Proposito' es el efecto directo esperado: 'Los habitantes del sector cuentan con vias urbanas en buen estado que mejoran su movilidad y acceso a servicios'. Describe el beneficio que recibira la poblacion objetivo una vez concluido el proyecto.",
    topic: "Proposito - Marco Logico"
  },
  {
    id: 18,
    question: "Situacion\n\nLa Secretaria de Desarrollo Economico del municipio de La Ceja esta formulando un proyecto de apoyo al emprendimiento local. Al elaborar la Matriz de Marco Logico, deben identificar los productos concretos que entregara el proyecto durante su ejecucion.\n\nPregunta\n\nCon base en la situacion planteada, ¿que son los 'Componentes' en la Matriz de Marco Logico?",
    options: [
      "Los problemas identificados",
      "Los productos, obras, servicios o resultados especificos que debe generar el proyecto durante su ejecucion",
      "Los obstaculos del proyecto",
      "Las fuentes de financiacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de emprendimiento en La Ceja, los 'Componentes' son los productos especificos que se entregaran: 'Emprendedores capacitados', 'Capital semilla entregado', 'Asesoria tecnica brindada'. Son los bienes, servicios o resultados necesarios y suficientes para lograr el Proposito del proyecto.",
    topic: "Componentes - Marco Logico"
  },
  {
    id: 19,
    question: "Situacion\n\nUn equipo de la oficina de planeacion del municipio de San Vicente Ferrer esta iniciando la formulacion de un proyecto de seguridad alimentaria. El coordinador les indica que primero deben construir el arbol de problemas para entender la problematica y sus relaciones causales.\n\nPregunta\n\nSegun la situacion descrita, ¿para que sirve el arbol de problemas?",
    options: [
      "Decorar la oficina de proyectos",
      "Identificar y analizar el problema central, sus causas (raices) y sus efectos (ramas), estableciendo relaciones de causalidad",
      "Solo listar problemas sin relacion",
      "Copiar problemas de otros proyectos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de seguridad alimentaria en San Vicente Ferrer, el arbol de problemas permite identificar y analizar el problema central 'Inseguridad alimentaria en familias vulnerables' (tronco), sus causas directas e indirectas como 'baja produccion agricola' y 'escaso acceso a credito' (raices), y sus efectos como 'desnutricion infantil' (ramas).",
    topic: "Arbol de problemas"
  },
  {
    id: 20,
    question: "Situacion\n\nDespues de construir el arbol de problemas para un proyecto de primera infancia, el equipo tecnico del municipio de Concepcion debe transformar los problemas identificados en objetivos positivos para definir la solucion del proyecto.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿como se construye el arbol de objetivos?",
    options: [
      "De forma independiente al arbol de problemas",
      "Convirtiendo los problemas (situaciones negativas) del arbol de problemas en objetivos (situaciones positivas deseadas)",
      "Solo con metas financieras",
      "Listando deseos sin fundamento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de primera infancia en Concepcion, el arbol de objetivos se construye transformando las situaciones negativas en positivas: el problema central 'Bajo desarrollo integral de la primera infancia' se convierte en el objetivo 'Mejorar el desarrollo integral de la primera infancia', las causas se transforman en medios y los efectos en fines.",
    topic: "Arbol de objetivos"
  },
  // Presupuesto y financiacion
  {
    id: 21,
    question: "Situacion\n\nEl municipio de Tamesis esta formulando un proyecto de construccion de un centro cultural. El profesional financiero debe estructurar el presupuesto del proyecto de manera detallada para presentarlo ante el Banco de Proyectos y solicitar la aprobacion de recursos.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe incluir la estructura presupuestal de un proyecto?",
    options: [
      "Solo el costo total estimado",
      "Costos desagregados por componentes y actividades, inversion y operacion, fuentes de financiacion, cronograma de desembolsos y flujo de caja",
      "Unicamente los salarios del personal",
      "Solo los costos de materiales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del centro cultural de Tamesis, la estructura presupuestal debe detallar: costos por componentes (obra civil, dotacion) y actividades, costos de inversion y operacion futura, fuentes de financiacion identificadas (recursos propios, SGP cultura, cofinanciacion departamental), cronograma de desembolsos y flujo de caja del proyecto.",
    topic: "Estructura presupuestal"
  },
  {
    id: 22,
    question: "Situacion\n\nLa Secretaria de Hacienda del municipio de Jardin necesita programar los recursos financieros para un proyecto de restauracion del patrimonio arquitectonico. El tesorero solicita un documento que indique cuando se requieren los recursos y en que montos para cada etapa.\n\nPregunta\n\nSegun la situacion planteada, ¿que indica el cronograma de inversion de un proyecto?",
    options: [
      "Solo la fecha de inicio",
      "La programacion temporal de los recursos financieros necesarios, especificando montos y periodos de desembolso para cada actividad o componente",
      "Unicamente el presupuesto total",
      "Solo las fechas de reuniones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de patrimonio en Jardin, el cronograma de inversion programa temporalmente los recursos financieros, especificando que en el primer trimestre se requieren recursos para estudios y disenos, en el segundo para inicio de obras, y asi sucesivamente, permitiendo planificar la ejecucion presupuestal.",
    topic: "Cronograma de inversion"
  },
  {
    id: 23,
    question: "Situacion\n\nEl Comite de Proyectos del municipio de Andes esta evaluando la viabilidad economica de un proyecto de electrificacion rural. El evaluador debe determinar si los beneficios que genera el proyecto justifican la inversion de recursos publicos.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que busca el analisis costo-beneficio del proyecto?",
    options: [
      "Solo sumar los costos",
      "Comparar los beneficios sociales y economicos esperados del proyecto con sus costos, calculando indicadores como VPN, TIR y relacion beneficio/costo",
      "Unicamente estimar gastos administrativos",
      "Solo calcular el costo de construccion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de electrificacion en Andes, el analisis costo-beneficio compara los beneficios sociales y economicos (mayor productividad, calidad de vida, acceso a servicios) con los costos de inversion y operacion, calculando indicadores como Valor Presente Neto (VPN), Tasa Interna de Retorno (TIR) y relacion beneficio/costo.",
    topic: "Analisis costo-beneficio"
  },
  {
    id: 24,
    question: "Situacion\n\nAntes de iniciar un proyecto de mejoramiento de la red de alcantarillado, el municipio de Ciudad Bolivar necesita medir la situacion actual del servicio para poder comparar despues de la intervencion y evaluar los cambios generados por el proyecto.\n\nPregunta\n\nCon base en la situacion planteada, ¿que es la linea base de un proyecto?",
    options: [
      "El diseno arquitectonico de las obras",
      "La medicion inicial de los indicadores del proyecto antes de su ejecucion, que sirve de punto de comparacion para evaluar los cambios o impactos generados",
      "Solo el presupuesto inicial",
      "El cronograma de actividades"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del alcantarillado de Ciudad Bolivar, la linea base es la medicion inicial de indicadores como cobertura actual del servicio (70%), frecuencia de desbordamientos (5 al mes), hogares conectados (800). Estos datos sirven de referencia para medir los cambios e impactos del proyecto despues de su ejecucion.",
    topic: "Linea base"
  },
  {
    id: 25,
    question: "Situacion\n\nEl equipo de planeacion del municipio de Turbo esta formulando un proyecto de fortalecimiento de la pesca artesanal. Al definir las metas del proyecto, el coordinador indica que deben ser claras y medibles para poder verificar su cumplimiento.\n\nPregunta\n\nSegun la situacion descrita, ¿como deben ser las metas de un proyecto?",
    options: [
      "Generales y ambiguas",
      "Especificas, Medibles, Alcanzables, Relevantes y con Tiempo definido (criterio SMART)",
      "Imposibles de lograr para exigir mas esfuerzo",
      "Copiadas de otros proyectos sin adaptacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de pesca en Turbo, las metas deben cumplir el criterio SMART: Especificas ('Capacitar a 150 pescadores artesanales'), Medibles (numero de pescadores), Alcanzables (recursos y tiempo disponibles), Relevantes (contribuyen al objetivo) y con Tiempo definido ('durante los primeros 6 meses del proyecto').",
    topic: "Metas del proyecto"
  }
]

const questionsV2: Question[] = [
  // Ciclo del proyecto
  {
    id: 1,
    question: "Situacion\n\nHace dos anos, el municipio de Apartado construyo un centro de desarrollo infantil con recursos del SGP. El director de planeacion solicita realizar una evaluacion para medir si se alcanzaron los objetivos propuestos y cuales fueron los impactos reales en la poblacion beneficiaria.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cuando se realiza la evaluacion ex-post de un proyecto?",
    options: [
      "Antes de iniciar el proyecto",
      "Durante la fase de operacion, despues de finalizada la ejecucion, para medir los resultados e impactos reales alcanzados",
      "Solo en la fase de formulacion",
      "Unicamente durante la construccion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del centro de desarrollo infantil de Apartado, la evaluacion ex-post se realiza durante la fase de operacion, una vez finalizada la construccion, para verificar si se alcanzaron los objetivos de cobertura y calidad, medir los impactos reales en los ninos y familias, identificar lecciones aprendidas y determinar la sostenibilidad.",
    topic: "Evaluacion ex-post"
  },
  {
    id: 2,
    question: "Situacion\n\nEl municipio de Chigorodo construyo una planta de tratamiento de agua potable. El Concejo Municipal esta preocupado por garantizar que los beneficios del proyecto se mantengan en el tiempo despues de que termine la inversion inicial.\n\nPregunta\n\nCon base en la situacion planteada, ¿a que se refiere la sostenibilidad de un proyecto?",
    options: [
      "Solo su duracion fisica",
      "La capacidad del proyecto para mantener sus beneficios en el tiempo despues de finalizar la inversion inicial, considerando aspectos financieros, institucionales, tecnicos, sociales y ambientales",
      "Unicamente su rentabilidad financiera",
      "Solo la resistencia de las obras construidas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la planta de tratamiento en Chigorodo, la sostenibilidad se refiere a la capacidad de mantener el suministro de agua potable despues de finalizar la inversion, considerando: sostenibilidad financiera (tarifas adecuadas), institucional (empresa operadora), tecnica (mantenimiento), social (aceptacion comunitaria) y ambiental (proteccion de fuentes).",
    topic: "Sostenibilidad del proyecto"
  },
  {
    id: 3,
    question: "Situacion\n\nEl municipio de Necocli esta ejecutando un proyecto de construccion de un hospital de segundo nivel. El supervisor del contrato debe realizar el monitoreo continuo del avance de las obras y la ejecucion presupuestal para detectar posibles desviaciones.\n\nPregunta\n\nSegun la situacion descrita, ¿que incluye el seguimiento del proyecto en la fase de inversion?",
    options: [
      "Solo revisar el presupuesto una vez al ano",
      "Monitoreo continuo del avance fisico, financiero y de gestion, comparando lo ejecutado con lo planeado, identificando desviaciones y tomando acciones correctivas",
      "Unicamente esperar la terminacion del proyecto",
      "Solo verificar la asistencia del personal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del hospital de Necocli, el seguimiento en la fase de inversion implica monitoreo continuo del avance fisico (metros cuadrados construidos, acabados instalados), financiero (recursos ejecutados vs. programados) y de gestion (cumplimiento de cronogramas), identificando desviaciones y tomando acciones correctivas oportunas.",
    topic: "Seguimiento en fase de inversion"
  },
  {
    id: 4,
    question: "Situacion\n\nLa Secretaria de Infraestructura de Carepa esta formulando un proyecto de construccion de un puente sobre el rio Leon. El ingeniero lider indica que deben identificar los eventos que podrian afectar la ejecucion del proyecto y establecer estrategias para manejarlos.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que busca el analisis de riesgos en la formulacion de un proyecto?",
    options: [
      "Ignorar los problemas potenciales",
      "Identificar, evaluar y establecer estrategias de mitigacion para los eventos que podrian afectar negativamente el cumplimiento de los objetivos del proyecto",
      "Solo listar obstaculos sin soluciones",
      "Cancelar el proyecto ante cualquier riesgo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del puente sobre el rio Leon en Carepa, el analisis de riesgos busca identificar eventos potenciales como crecientes del rio, retrasos en permisos ambientales, variaciones de precios, evaluar su probabilidad e impacto, y establecer estrategias de prevencion (estudios hidrologicos completos), mitigacion (seguros) o contingencia (presupuesto adicional).",
    topic: "Analisis de riesgos"
  },
  {
    id: 5,
    question: "Situacion\n\nEl municipio de Mutata esta formulando un proyecto de construccion de una via que atravesara una zona de reserva natural. El profesional ambiental debe elaborar los estudios que permitan identificar y manejar los impactos del proyecto sobre el medio ambiente.\n\nPregunta\n\nCon base en la situacion descrita, ¿que deben hacer los estudios de impacto ambiental del proyecto?",
    options: [
      "Presentarse solo si la comunidad lo solicita",
      "Identificar, predecir y evaluar los impactos ambientales del proyecto, y proponer medidas de prevencion, mitigacion, correccion y compensacion",
      "Unicamente mencionar que el proyecto es ambientalmente viable",
      "Solo cumplir un tramite formal sin analisis real"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la via en Mutata que atraviesa zona de reserva, los estudios de impacto ambiental deben identificar efectos sobre fauna, flora, fuentes hidricas y comunidades, predecir su magnitud, valorar su importancia, y proponer el Plan de Manejo Ambiental con medidas de prevencion, mitigacion, correccion y compensacion.",
    topic: "Impacto ambiental"
  },
  {
    id: 6,
    question: "Situacion\n\nEl municipio de San Pedro de Uraba esta formulando un proyecto de mejoramiento nutricional infantil. El equipo tecnico debe identificar con precision el grupo de personas que sera beneficiado directamente con la ejecucion del proyecto.\n\nPregunta\n\nSegun la situacion planteada, ¿que es la poblacion objetivo de un proyecto?",
    options: [
      "Toda la poblacion del pais",
      "El grupo poblacional afectado por el problema y que sera beneficiado directamente con la ejecucion del proyecto",
      "Solo los funcionarios publicos",
      "Unicamente los politicos de la region"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto nutricional en San Pedro de Uraba, la poblacion objetivo son los ninos menores de 5 anos con desnutricion o riesgo nutricional del municipio. Este grupo especifico sera cuantificado (350 ninos) y caracterizado (edad, grado de desnutricion, zona de residencia) para recibir los beneficios directos del proyecto.",
    topic: "Poblacion objetivo"
  },
  // MGA
  {
    id: 7,
    question: "Situacion\n\nEl coordinador de proyectos del municipio de Arboletes necesita consultar la informacion resumida de un proyecto de vivienda que fue registrado en el BPIN. Requiere un documento que contenga los datos principales del proyecto para presentarlo en una reunion con el Ministerio.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que contiene la ficha de Estadisticas Basicas de Inversion (EBI) en el BPIN?",
    options: [
      "Solo el nombre del proyecto",
      "Informacion resumida del proyecto: nombre, objetivo, localizacion, poblacion beneficiada, costo total, fuentes de financiacion, plazo de ejecucion y clasificacion sectorial",
      "Unicamente el presupuesto",
      "Solo la fecha de registro"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de vivienda de Arboletes, la ficha EBI contiene informacion resumida: nombre del proyecto, objetivo general de construccion de viviendas, localizacion en el municipio, 200 familias beneficiadas, costo total de $5.000 millones, fuentes (regalias 60%, nacion 40%), 18 meses de ejecucion y sector vivienda.",
    topic: "Ficha EBI - BPIN"
  },
  {
    id: 8,
    question: "Situacion\n\nEl alcalde del municipio de San Juan de Uraba quiere registrar un proyecto de electrificacion rural en el Banco de Proyectos Municipal para solicitar recursos de cofinanciacion departamental. El secretario de planeacion le explica los requisitos necesarios.\n\nPregunta\n\nCon base en la situacion planteada, ¿que se requiere para registrar un proyecto en el Banco de Proyectos de Inversion Municipal o Departamental?",
    options: [
      "Solo la aprobacion verbal del alcalde",
      "Formulacion completa segun la MGA, concepto favorable de viabilidad tecnica de la oficina de planeacion, y disponibilidad presupuestal",
      "Unicamente el acta de reunion comunitaria",
      "Solo el nombre y costo estimado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de electrificacion en San Juan de Uraba, el registro requiere: formulacion completa del proyecto segun la MGA territorial con todos los modulos diligenciados, concepto de viabilidad tecnica, financiera y socioambiental de la oficina de planeacion, certificado de disponibilidad presupuestal para contrapartida, y cumplimiento de requisitos normativos.",
    topic: "Registro en bancos territoriales"
  },
  {
    id: 9,
    question: "Situacion\n\nEl Comite de Inversiones del municipio de Vigia del Fuerte debe decidir entre financiar un proyecto de mejoramiento de escuelas o uno de pavimentacion de vias. El evaluador debe analizar el valor de la alternativa a la que se renuncia al elegir uno de los proyectos.\n\nPregunta\n\nSegun la situacion descrita, ¿que representa el costo de oportunidad en la evaluacion de proyectos?",
    options: [
      "El precio de mercado de los materiales",
      "El valor de la mejor alternativa a la que se renuncia al destinar recursos a un proyecto en lugar de otro",
      "Solo el costo financiero del proyecto",
      "Unicamente los gastos administrativos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de Vigia del Fuerte, el costo de oportunidad representa el valor del proyecto de pavimentacion (beneficios de mejor movilidad y comercio) si se elige el proyecto educativo, o viceversa. Es fundamental en la evaluacion economica para tomar decisiones de inversion publica eficientes con recursos escasos.",
    topic: "Costo de oportunidad"
  },
  {
    id: 10,
    question: "Situacion\n\nEl municipio de Murindo esta ejecutando un proyecto de construccion de un centro de salud. El interventor debe verificar el cumplimiento de las metas fisicas del proyecto midiendo los productos concretos que se estan entregando.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que miden los indicadores de producto en la MGA?",
    options: [
      "Solo el presupuesto gastado",
      "Los bienes, servicios u obras entregadas por el proyecto durante su ejecucion (kilometros de via construidos, escuelas dotadas, personas capacitadas, etc.)",
      "Unicamente el tiempo transcurrido",
      "Solo la satisfaccion de los funcionarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del centro de salud en Murindo, los indicadores de producto miden los bienes y obras que entrega directamente el proyecto: metros cuadrados construidos (1.200 m2), consultorios habilitados (8), camas hospitalarias instaladas (20), equipos medicos adquiridos (25). Son los outputs directos de la ejecucion.",
    topic: "Indicadores de producto - MGA"
  },
  {
    id: 11,
    question: "Situacion\n\nEl equipo de evaluacion del municipio de Frontino esta calculando el Valor Presente Neto de un proyecto de mejoramiento de acueducto. Necesitan conocer la tasa oficial establecida por el gobierno nacional para descontar los flujos futuros del proyecto.\n\nPregunta\n\nCon base en la situacion descrita, ¿quien define la tasa de descuento en la evaluacion economica de proyectos publicos en Colombia?",
    options: [
      "Cada alcalde libremente",
      "El Departamento Nacional de Planeacion (DNP), actualmente establecida en el 9% para proyectos sociales",
      "Los bancos comerciales",
      "El contratista del proyecto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del acueducto de Frontino, el DNP establece la tasa social de descuento oficial del 9% para la evaluacion de proyectos publicos en Colombia. Esta tasa se utiliza para calcular el VPN y evaluar la rentabilidad social del proyecto, permitiendo comparar beneficios y costos en diferentes momentos del tiempo.",
    topic: "Tasa de descuento"
  },
  {
    id: 12,
    question: "Situacion\n\nEl municipio de Caicedo esta formulando un proyecto de construccion de un parque recreativo. El equipo social indica que la comunidad debe participar activamente en las diferentes etapas del proyecto para garantizar que responda a sus necesidades reales.\n\nPregunta\n\nSegun la situacion planteada, ¿que implica la participacion comunitaria en la formulacion de proyectos?",
    options: [
      "Solo informar al final del proyecto",
      "Involucrar a la comunidad desde el diagnostico, priorizacion de necesidades, diseno de alternativas y validacion de soluciones, garantizando pertinencia y apropiacion",
      "Unicamente recolectar firmas de apoyo",
      "Solo convocar a una reunion informativa"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del parque en Caicedo, la participacion comunitaria efectiva implica involucrar a la comunidad desde la identificacion del problema (que espacios recreativos necesitan), priorizacion (que zona, que edades), diseno de alternativas (juegos infantiles, canchas, zonas verdes) y validacion, garantizando pertinencia y apropiacion del proyecto.",
    topic: "Participacion comunitaria"
  },
  {
    id: 13,
    question: "Situacion\n\nEl municipio de Urrao esta formulando un proyecto de fortalecimiento de productores agricolas. El profesional social indica que el proyecto debe reconocer las necesidades especificas de los diferentes grupos poblacionales como mujeres cabeza de hogar, adultos mayores y comunidades indigenas.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que busca el enfoque diferencial en proyectos publicos?",
    options: [
      "Tratar a todos exactamente igual sin distincion",
      "Reconocer y atender las necesidades especificas de grupos poblacionales vulnerables o con caracteristicas particulares (ninos, adultos mayores, discapacidad, genero, etnia)",
      "Solo cumplir requisitos legales sin impacto real",
      "Excluir grupos minoritarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto agricola en Urrao, el enfoque diferencial reconoce que las mujeres cabeza de hogar necesitan horarios flexibles de capacitacion, los adultos mayores requieren asistencia tecnica personalizada, y las comunidades indigenas tienen conocimientos tradicionales que deben integrarse, disenando intervenciones especificas para garantizar equidad.",
    topic: "Enfoque diferencial"
  },
  {
    id: 14,
    question: "Situacion\n\nEl municipio de Betania necesita contratar los estudios y disenos de un proyecto de construccion de una planta de sacrificio animal. El profesional de contratacion debe elaborar el documento que especifique claramente que debe entregar el consultor.\n\nPregunta\n\nCon base en la situacion planteada, ¿que deben especificar los terminos de referencia de los estudios tecnicos de un proyecto?",
    options: [
      "Solo el presupuesto disponible",
      "El objeto del estudio, alcance, productos esperados, metodologia, plazo de ejecucion, requisitos del contratista y criterios de evaluacion",
      "Unicamente el nombre del consultor",
      "Solo la fecha de entrega"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la planta de sacrificio en Betania, los terminos de referencia deben especificar: objeto (estudios y disenos de planta de sacrificio), alcance tecnico (diseno arquitectonico, estructural, sanitario), productos (planos, memorias, presupuesto), metodologia, plazo (90 dias), requisitos del consultor (experiencia en plantas similares) y criterios de evaluacion.",
    topic: "Terminos de referencia"
  },
  // Marco logico
  {
    id: 15,
    question: "Situacion\n\nEl equipo de monitoreo del municipio de Hispania esta revisando la Matriz de Marco Logico de un proyecto de mejoramiento educativo. Necesitan verificar que los indicadores establecidos permitan medir objetivamente el logro de los objetivos.\n\nPregunta\n\nSegun la situacion descrita, ¿como deben ser los indicadores de la Matriz de Marco Logico?",
    options: [
      "Generales y subjetivos",
      "Especificos, Medibles, Alcanzables, Relevantes y con Tiempo definido (SMART), permitiendo verificar objetivamente el logro de objetivos",
      "Imposibles de medir",
      "Copiados de otros proyectos sin adaptacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto educativo en Hispania, los indicadores deben cumplir el criterio SMART: 'Porcentaje de estudiantes que mejoran sus competencias en matematicas' es Especifico (competencias en matematicas), Medible (porcentaje), Alcanzable (con las intervenciones planteadas), Relevante (relacionado con el objetivo) y con Tiempo definido (al finalizar el ano escolar).",
    topic: "Indicadores - Marco Logico"
  },
  {
    id: 16,
    question: "Situacion\n\nEl evaluador de proyectos del municipio de Pueblo Rico esta verificando la Matriz de Marco Logico de un proyecto de seguridad alimentaria. Necesita identificar de donde se obtendran los datos para calcular y verificar los indicadores del proyecto.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que son los medios de verificacion en la Matriz de Marco Logico?",
    options: [
      "Opiniones personales sin respaldo",
      "Las fuentes de informacion donde se puede obtener los datos para calcular y verificar los indicadores (encuestas, registros, informes, estudios, estadisticas)",
      "Solo rumores de la comunidad",
      "Unicamente las actas de reunion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de seguridad alimentaria en Pueblo Rico, los medios de verificacion identifican las fuentes: encuestas nutricionales del ICBF para medir desnutricion infantil, registros de entrega de complementos alimentarios, informes mensuales del operador, estadisticas del SISBEN sobre poblacion vulnerable, bases de datos de beneficiarios.",
    topic: "Medios de verificacion - Marco Logico"
  },
  {
    id: 17,
    question: "Situacion\n\nEl equipo de formulacion del municipio de Santafe de Antioquia esta elaborando la Matriz de Marco Logico para un proyecto de turismo sostenible. Deben identificar los factores externos que estan fuera del control del proyecto pero que son necesarios para su exito.\n\nPregunta\n\nCon base en la situacion planteada, ¿que representan los supuestos en la Matriz de Marco Logico?",
    options: [
      "Garantias absolutas de exito",
      "Condiciones o factores externos importantes que estan fuera del control del proyecto, pero que son necesarios para el logro de los objetivos",
      "Obstaculos insuperables",
      "Solo especulaciones sin fundamento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de turismo en Santafe de Antioquia, los supuestos son factores externos como: 'Se mantiene la seguridad en la region', 'No ocurren desastres naturales que afecten los atractivos turisticos', 'Las politicas departamentales de turismo continuan'. Si estos supuestos no se cumplen, el proyecto puede no alcanzar sus objetivos.",
    topic: "Supuestos - Marco Logico"
  },
  {
    id: 18,
    question: "Situacion\n\nEl profesional de proyectos del municipio de Yolombo esta explicando a su equipo la logica interna de la Matriz de Marco Logico de un proyecto de emprendimiento. Necesita mostrar como las actividades conducen a los componentes, estos al proposito y finalmente al fin.\n\nPregunta\n\nSegun la situacion descrita, ¿que establece la relacion logica vertical en la Matriz de Marco Logico?",
    options: [
      "No existe relacion entre los niveles",
      "Si se realizan las Actividades se logran los Componentes; si se logran los Componentes se alcanza el Proposito; si se alcanza el Proposito se contribuye al Fin",
      "Solo importa el presupuesto",
      "Los niveles son independientes entre si"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de emprendimiento en Yolombo, la logica vertical establece: si se ejecutan las actividades (capacitaciones, asesorias), se logran los componentes (emprendedores capacitados, planes de negocio elaborados); si se entregan los componentes, se alcanza el proposito (emprendimientos funcionando); si se logra el proposito, se contribuye al fin (desarrollo economico local).",
    topic: "Logica vertical - Marco Logico"
  },
  {
    id: 19,
    question: "Situacion\n\nEl interventor del municipio de Amaga esta realizando el seguimiento a un proyecto de construccion de un centro de integracion ciudadana. Necesita medir la eficiencia en el uso de los recursos y el cumplimiento del cronograma durante la ejecucion.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que mide un indicador de gestion (proceso)?",
    options: [
      "Solo el impacto final del proyecto",
      "La eficiencia en el uso de recursos y la ejecucion de actividades durante la implementacion del proyecto (% ejecucion presupuestal, cumplimiento cronograma)",
      "Unicamente la satisfaccion del contratista",
      "Solo los resultados de largo plazo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del centro de integracion en Amaga, los indicadores de gestion miden la eficiencia y eficacia en la ejecucion: porcentaje de ejecucion presupuestal (75% ejecutado de lo programado), cumplimiento del cronograma (2 semanas de atraso), personal contratado vs. planeado (8 de 10), actividades ejecutadas (12 de 15).",
    topic: "Indicadores de gestion"
  },
  {
    id: 20,
    question: "Situacion\n\nEl municipio de Angelopolis finalizo un proyecto de mejoramiento de vias terciarias. El equipo de evaluacion necesita medir los cambios directos logrados en la poblacion beneficiaria como resultado de la intervencion.\n\nPregunta\n\nCon base en la situacion planteada, ¿que mide un indicador de resultado?",
    options: [
      "Solo los gastos realizados",
      "Los cambios o efectos directos logrados en la poblacion objetivo al finalizar el proyecto (cobertura alcanzada, beneficiarios atendidos, mejoras en servicios)",
      "Unicamente el numero de reuniones realizadas",
      "Solo la cantidad de documentos producidos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de las vias terciarias en Angelopolis, los indicadores de resultado miden los cambios directos: reduccion del tiempo de desplazamiento de productores al casco urbano (de 2 horas a 45 minutos), aumento de vehiculos que transitan la via (de 20 a 80 diarios), disminucion del costo de transporte de productos agricolas (30% menos).",
    topic: "Indicadores de resultado"
  },
  // Presupuesto y financiacion
  {
    id: 21,
    question: "Situacion\n\nEl profesional financiero del municipio de Tarso esta evaluando un proyecto de construccion de infraestructura deportiva. Necesita calcular si los beneficios futuros del proyecto, traidos a valor presente, superan los costos de inversion.\n\nPregunta\n\nSegun la situacion descrita, ¿que es el Valor Presente Neto (VPN) de un proyecto?",
    options: [
      "El costo total del proyecto",
      "El valor actual de los flujos futuros de beneficios netos del proyecto, descontados a una tasa especifica; un VPN positivo indica viabilidad economica",
      "Solo el presupuesto inicial",
      "Unicamente los ingresos esperados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto deportivo de Tarso, el VPN es el valor presente de los flujos de beneficios netos futuros (beneficios sociales como mejor salud, recreacion, cohesion social, menos costos de inversion y operacion) descontados con la tasa del 9%. Un VPN > 0 indica que el proyecto genera valor social neto positivo y es economicamente viable.",
    topic: "Valor Presente Neto (VPN)"
  },
  {
    id: 22,
    question: "Situacion\n\nEl Comite de Proyectos del municipio de Venecia esta evaluando la rentabilidad social de un proyecto de ampliacion del acueducto urbano. Necesitan calcular la tasa de rendimiento del proyecto para compararla con la tasa social de descuento.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que es la Tasa Interna de Retorno (TIR) de un proyecto?",
    options: [
      "La tasa de interes bancaria",
      "La tasa de descuento que hace que el VPN del proyecto sea igual a cero; si la TIR supera la tasa de descuento social, el proyecto es viable",
      "Solo la inflacion anual",
      "Unicamente el costo de oportunidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del acueducto de Venecia, la TIR es la tasa de descuento que hace que el VPN del proyecto sea igual a cero. Si la TIR calculada (por ejemplo 12%) es mayor que la tasa social de descuento (9%), el proyecto es economicamente viable. La TIR representa la rentabilidad social del proyecto de ampliacion.",
    topic: "Tasa Interna de Retorno (TIR)"
  },
  {
    id: 23,
    question: "Situacion\n\nEl evaluador de proyectos del municipio de Titiribi esta analizando la viabilidad economica de un proyecto de construccion de un centro de acopio. Necesita determinar cuantas unidades de beneficio genera el proyecto por cada unidad de costo invertida.\n\nPregunta\n\nCon base en la situacion planteada, ¿que indica la relacion Beneficio/Costo (B/C)?",
    options: [
      "Solo los gastos del proyecto",
      "El valor presente de los beneficios dividido por el valor presente de los costos; una relacion B/C mayor a 1 indica que los beneficios superan los costos",
      "Unicamente el tiempo de ejecucion",
      "Solo el numero de beneficiarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del centro de acopio en Titiribi, la relacion B/C es el cociente entre el valor presente de los beneficios (mejores precios para productores, reduccion de perdidas postcosecha) y el valor presente de los costos (construccion, operacion). Una relacion B/C de 1.5 indica que por cada peso invertido se generan 1.5 pesos de beneficio social.",
    topic: "Relacion Beneficio/Costo"
  },
  {
    id: 24,
    question: "Situacion\n\nEl profesional financiero del municipio de Valparaiso esta elaborando el estudio de factibilidad de un proyecto de construccion de una plaza de mercado. Necesita proyectar los ingresos y egresos del proyecto en el tiempo para evaluar su liquidez.\n\nPregunta\n\nSegun la situacion descrita, ¿que muestra el flujo de caja de un proyecto?",
    options: [
      "Solo los ingresos iniciales",
      "Los ingresos, egresos y saldo neto de efectivo del proyecto en cada periodo de tiempo (mensual o anual), permitiendo evaluar la liquidez y viabilidad financiera",
      "Unicamente los gastos de personal",
      "Solo el presupuesto aprobado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la plaza de mercado en Valparaiso, el flujo de caja proyecta los ingresos (arriendos de locales, tarifas de parqueadero), egresos (construccion, mantenimiento, servicios publicos, personal) y saldo neto en cada periodo, permitiendo evaluar la liquidez, identificar necesidades de financiamiento y calcular VPN y TIR.",
    topic: "Flujo de caja"
  },
  {
    id: 25,
    question: "Situacion\n\nEl evaluador del municipio de Abriaqui esta analizando un proyecto de mejoramiento de infraestructura escolar. Debido a la incertidumbre en los costos de materiales, necesita evaluar como cambiaria la viabilidad del proyecto si los costos aumentan un 10% o 20%.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿en que consiste el analisis de sensibilidad en la evaluacion de proyectos?",
    options: [
      "Solo presentar el escenario optimista",
      "Evaluar como cambian los indicadores de viabilidad (VPN, TIR, B/C) ante variaciones en variables criticas como costos, beneficios, demanda o tasa de descuento",
      "Unicamente calcular el costo total",
      "Solo duplicar el presupuesto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto escolar en Abriaqui, el analisis de sensibilidad evalua como cambian el VPN y la TIR si los costos de materiales aumentan 10% o 20%, si la tasa de descuento cambia, o si los beneficios son menores. Esto permite identificar riesgos financieros y la robustez de la decision de inversion.",
    topic: "Analisis de sensibilidad"
  }
]

export function FormulacionTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
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
    if (answeredQuestions.has(questionId)) return
    setAnswers({ ...answers, [questionId]: answerIndex })
    setAnsweredQuestions((prev) => new Set(prev).add(questionId))
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
    setAnsweredQuestions(new Set())
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
          <TabsTrigger value="v1">Version 1</TabsTrigger>
          <TabsTrigger value="v2">Version 2</TabsTrigger>
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
                  <p className="text-sm text-muted-foreground">Puntuacion</p>
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
                    ? "Excelente! Dominas la formulacion de proyectos publicos."
                    : percentage >= 60
                    ? "Buen trabajo. Continua estudiando la metodologia MGA."
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
                <p className="font-medium leading-relaxed whitespace-pre-line">{question.question}</p>

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
                      {answers[question.id] === question.correctAnswer ? "Correcto!" : "Incorrecto"}
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
