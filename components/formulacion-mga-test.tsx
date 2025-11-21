"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, InfoIcon, XCircle } from "lucide-react"
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

export const formulacionMgaQuestions: Question[] = [
  {
    id: 1,
    question:
      "Situacion\n\nEl municipio de Envigado ha incluido en su Plan de Desarrollo la meta de reducir en un 30% los residuos solidos dispuestos en relleno sanitario para el ano 2027. La Secretaria de Medio Ambiente necesita traducir esta meta en acciones concretas y ejecutables que puedan ser monitoreadas y evaluadas.\n\nPregunta\n\nSegun la situacion descrita, ¿cual es la unidad operativa que permite materializar esta meta del Plan de Desarrollo?",
    options: ["Programa", "Proyecto", "Subprograma", "Linea estrategica"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el proyecto es la unidad operativa concreta que permite aterrizar la meta de reduccion de residuos del Plan de Desarrollo en acciones ejecutables y monitoreables.",
    topic: "Unidad operativa",
  },
  {
    id: 2,
    question:
      "Situacion\n\nUn equipo de formuladores del municipio de Rionegro esta preparando un proyecto de infraestructura educativa para presentar al Sistema General de Regalias. Durante la revision tecnica, el coordinador solicita validar que el proyecto respete el orden jerarquico de la planeacion para asegurar coherencia con los instrumentos superiores.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es el encadenamiento correcto desde la estrategia hasta la ejecucion?",
    options: [
      "Proyecto → Subprograma → Programa → Plan de Desarrollo",
      "Programa → Proyecto → Plan de Desarrollo → Subprograma",
      "Plan de Desarrollo → Programa → Subprograma → Proyecto",
      "Plan de Accion → Proyecto → Programa → Subprograma",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "En el escenario presentado, el equipo debe seguir el orden Plan de Desarrollo, Programa, Subprograma y Proyecto, asegurando coherencia descendente desde la estrategia hasta la ejecucion.",
    topic: "Encadenamiento",
  },
  {
    id: 3,
    question:
      "Situacion\n\nEl alcalde de un municipio del oriente antioqueno ha expresado preocupacion en el Comite de Gobierno porque observa que muchas metas del Plan de Desarrollo quedan sin ejecutarse al final del periodo. Solicita a su equipo identificar que factor garantiza que las metas se conviertan en resultados medibles y verificables.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que garantiza que las metas del Plan de Desarrollo se traduzcan en resultados medibles?",
    options: ["Ampliar el plan plurianual", "Formular proyectos bien estructurados", "Centralizar todo en Hacienda", "Incrementar metas indicativas"],
    correctAnswer: 1,
    points: 5,
    explanation: "En esta situacion, la MGA resalta que solo los proyectos bien formulados traducen las metas del plan en resultados verificables, evitando que queden en el papel.",
    topic: "Del plan al resultado",
  },
  {
    id: 4,
    question:
      "Situacion\n\nLa Secretaria de Planeacion de Medellin debe asignar responsables especificos y definir metas anuales para cada dependencia, de manera que el Plan de Desarrollo cuatrienal se conecte efectivamente con la ejecucion presupuestal de cada vigencia. El secretario necesita identificar el instrumento adecuado para esta operativizacion.\n\nPregunta\n\nSegun el escenario descrito, ¿que instrumento permite operativizar la conexion entre el Plan de Desarrollo y la ejecucion anual?",
    options: ["Estatuto Tributario", "Plan de Accion", "PAC trimestral", "POAI sin proyectos"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el Plan de Accion es el instrumento que desagrega las metas del Plan de Desarrollo hacia proyectos concretos, responsables y vigencias especificas.",
    topic: "Plan de Accion",
  },
  {
    id: 5,
    question:
      "Situacion\n\nUn profesional recien vinculado a la Oficina de Planeacion de Bello tiene la tarea de capacitarse en el marco normativo del Sistema Nacional de Planeacion. Su jefe inmediato le solicita que primero estudie la norma base que define este sistema antes de revisar la reglamentacion complementaria.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es la norma base del Sistema Nacional de Planeacion que debe consultar el funcionario?",
    options: ["Ley 819 de 2003", "Decreto 1082 de 2015", "Ley 152 de 1994", "CONPES 4070 de 2022"],
    correctAnswer: 2,
    points: 5,
    explanation: "En este escenario, el funcionario debe consultar la Ley 152 de 1994, que define el Sistema Nacional de Planeacion y los instrumentos que lo integran.",
    topic: "Marco normativo",
  },
  {
    id: 6,
    question:
      "Situacion\n\nLa Secretaria de Hacienda de Itagui esta revisando un proyecto de ampliacion de la red de acueducto y exige al equipo formulador demostrar coherencia entre las metas fisicas y el impacto fiscal del proyecto. El equipo necesita identificar la norma que guia los principios de responsabilidad fiscal aplicables a la formulacion.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que norma guia la responsabilidad fiscal en la formulacion de proyectos de inversion?",
    options: ["Ley 819 de 2003", "Ley 152 de 1994", "Decreto 1082 de 2015", "CONPES 4070 de 2022"],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, la Ley 819 de 2003 es la norma que establece los lineamientos de responsabilidad y sostenibilidad fiscal que deben aplicarse en la formulacion de proyectos.",
    topic: "Responsabilidad fiscal",
  },
  {
    id: 7,
    question:
      "Situacion\n\nLa Oficina Juridica de Sabaneta debe emitir un concepto sobre los requisitos normativos para la formulacion de un proyecto de inversion publica. El abogado encargado necesita consultar la norma que compila toda la reglamentacion vigente sobre proyectos de inversion y su alistamiento.\n\nPregunta\n\nSegun el escenario descrito, ¿cual norma debe consultar el abogado para encontrar los requisitos compilados de proyectos de inversion publica?",
    options: ["Decreto 1082 de 2015", "Decreto 1625 de 2016", "Decreto 092 de 2017", "Decreto 1510 de 2013"],
    correctAnswer: 0,
    points: 5,
    explanation: "En esta situacion, el Decreto 1082 de 2015 es la norma que compila la reglamentacion sobre proyectos de inversion y su alistamiento, siendo la fuente adecuada para el concepto juridico.",
    topic: "Requisitos de inversion",
  },
  {
    id: 8,
    question:
      "Situacion\n\nEl Comite de Inversion del departamento de Antioquia esta evaluando su portafolio de proyectos y busca alinear sus criterios de priorizacion con los lineamientos nacionales para mejorar la eficiencia del gasto publico. Los miembros del comite necesitan identificar la politica vigente que orienta estas decisiones.\n\nPregunta\n\nCon base en la situacion planteada, ¿que politica deben revisar los miembros del Comite de Inversion para alinear sus criterios de eficiencia?",
    options: ["CONPES 3857 de 2016", "CONPES 4070 de 2022", "CONPES 3918 de 2018", "CONPES 3762 de 2013"],
    correctAnswer: 1,
    points: 5,
    explanation: "En el escenario descrito, el CONPES 4070 de 2022 fija los lineamientos para mejorar la calidad y eficiencia de la inversion publica, siendo la politica que el comite debe revisar.",
    topic: "Politica de inversion",
  },
  {
    id: 9,
    question:
      "Situacion\n\nLa Alcaldia de La Ceja quiere estandarizar el proceso de toma de decisiones sobre inversion publica en todas sus dependencias. El secretario de planeacion busca una herramienta metodologica que permita formular, evaluar y priorizar proyectos bajo criterios unificados y comparables.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que herramienta metodologica debe implementar la Alcaldia para estandarizar las decisiones de inversion?",
    options: ["POAI", "Metodologia General Ajustada (MGA)", "Tablero de control interno", "MIPG sin proyectos"],
    correctAnswer: 1,
    points: 5,
    explanation: "En esta situacion, la Metodologia General Ajustada (MGA) brinda el estandar nacional para formular, evaluar y priorizar proyectos, permitiendo la estandarizacion que busca la alcaldia.",
    topic: "Uso de la MGA",
  },
  {
    id: 10,
    question:
      "Situacion\n\nEl equipo tecnico del municipio de Marinilla ha preparado un proyecto de construccion de un centro de acopio agricola. Antes de solicitar la viabilidad, deben realizar una evaluacion tecnica y economica completa del proyecto. El coordinador necesita identificar el instrumento oficial para realizar esta evaluacion.\n\nPregunta\n\nSegun el escenario planteado, ¿que instrumento permite al equipo evaluar tecnica y economicamente el proyecto antes de viabilizarlo?",
    options: ["SECOP", "SIIF Nacion", "MGA", "Cronograma contractual"],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, la MGA es la herramienta nacional que permite evaluar proyectos tecnica y economicamente antes de su aprobacion y viabilizacion.",
    topic: "Evaluacion",
  },
  {
    id: 11,
    question:
      "Situacion\n\nEl equipo de formulacion de Girardota esta elaborando el diagnostico de un proyecto de seguridad alimentaria. Durante la sesion de trabajo, los participantes mezclan repetidamente las causas del problema con el problema mismo, generando confusion en el analisis. El facilitador necesita una herramienta que ayude a distinguir claramente estos elementos.\n\nPregunta\n\nCon base en la situacion descrita, ¿que componente de la MGA ayuda a distinguir correctamente entre causas, problema central y efectos?",
    options: ["Matriz de costos", "Arbol de problemas y objetivos", "Curva S", "Cronograma PAC"],
    correctAnswer: 1,
    points: 5,
    explanation: "En el escenario planteado, el arbol de problemas permite identificar claramente el problema central, sus causas y efectos, ayudando al equipo a superar la confusion en el diagnostico.",
    topic: "Diagnostico",
  },
  {
    id: 12,
    question:
      "Situacion\n\nEl equipo de la Secretaria de Ambiente de Copacabana ha identificado como problema central la baja separacion en la fuente de residuos solidos. Ahora necesitan convertir este problema en una meta clara y positiva que oriente la solucion, definiendo los medios para lograrlo y los fines esperados.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que herramienta debe emplear el equipo para convertir el problema en una meta clara con medios y fines?",
    options: ["EDT", "Arbol de objetivos", "Flujograma contractual", "Organigrama"],
    correctAnswer: 1,
    points: 5,
    explanation: "En esta situacion, el arbol de objetivos es la herramienta que traduce problemas en objetivos especificos, definiendo claramente los medios para alcanzarlos y los fines esperados.",
    topic: "Objetivos",
  },
  {
    id: 13,
    question:
      "Situacion\n\nLa Secretaria de Educacion de Caldas esta formulando un proyecto de cultura ciudadana y ha definido como objetivo concientizar a la poblacion sobre el cuidado del patrimonio. Sin embargo, el revisor del proyecto observa que no hay metricas asociadas y solicita definir indicadores apropiados.\n\nPregunta\n\nSegun el escenario descrito, ¿que tipos de indicadores deben definirse para medir los productos entregados y los cambios logrados por el proyecto?",
    options: ["Proceso e insumo", "Producto y resultado", "Impacto y financiero", "Percepcion y satisfaccion"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, la MGA exige indicadores de producto (entregables concretos) y de resultado (cambios generados en la poblacion), permitiendo medir el alcance del objetivo de concientizacion.",
    topic: "Indicadores",
  },
  {
    id: 14,
    question:
      "Situacion\n\nLa oficina de proyectos del municipio de El Retiro necesita presentar de manera sintetica toda la logica de intervencion de un proyecto de saneamiento basico, incluyendo objetivos, indicadores, medios de verificacion y supuestos criticos. El director busca una herramienta que concentre toda esta informacion en un solo formato.\n\nPregunta\n\nCon base en la situacion descrita, ¿que herramienta permite concentrar objetivos, indicadores, medios de verificacion y supuestos en una sola matriz?",
    options: ["DOFA", "Matriz de Marco Logico", "Arbol de problemas", "EDT"],
    correctAnswer: 1,
    points: 5,
    explanation: "En el escenario planteado, la Matriz de Marco Logico es la herramienta que articula todo el modelo de intervencion del proyecto en un formato sintetico y coherente.",
    topic: "Marco logico",
  },
  {
    id: 15,
    question:
      "Situacion\n\nEl municipio de Guarne esta formulando un proyecto para construir una planta de reciclaje. El equipo tecnico identifica que despues de la construccion se requeriran costos de operacion y mantenimiento (OPEX) y acuerdos con la comunidad para asegurar el suministro de materiales. El evaluador solicita un analisis que garantice la permanencia de los resultados.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que analisis debe incluir el equipo para garantizar la permanencia de los resultados del proyecto en el tiempo?",
    options: ["Riesgo cambiario", "Analisis de sostenibilidad y riesgos", "Proyeccion de caja del contratista", "Plan anual de adquisiciones"],
    correctAnswer: 1,
    points: 5,
    explanation: "En esta situacion, la MGA demanda un analisis de sostenibilidad y riesgos que aborde tanto los costos de operacion como los acuerdos institucionales necesarios para asegurar resultados duraderos.",
    topic: "Sostenibilidad",
  },
  {
    id: 16,
    question:
      "Situacion\n\nEl equipo formulador del municipio de Carmen de Viboral ha completado la ficha tecnica de un proyecto de conectividad rural y necesita radicarlo en la plataforma oficial para su evaluacion y seguimiento por parte del sector competente. El coordinador pregunta donde debe gestionarse el proyecto.\n\nPregunta\n\nSegun el escenario descrito, ¿en que plataforma oficial se administra y gestiona el proyecto para su evaluacion y seguimiento?",
    options: ["SECOP II", "MGA Web", "SIIF Nacion", "SGR-OCAD"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, los proyectos se gestionan en MGA Web, que es la plataforma oficial para radicacion, evaluacion y seguimiento sectorial de proyectos de inversion publica.",
    topic: "Gestion en plataforma",
  },
  {
    id: 17,
    question:
      "Situacion\n\nEl municipio de Barbosa ha completado la formulacion de un proyecto de mejoramiento vial y lo ha cargado en la plataforma correspondiente. El equipo pregunta quien tiene la competencia para evaluar el proyecto y declarar su viabilidad antes de que pueda incluirse en el banco de proyectos.\n\nPregunta\n\nCon base en la situacion descrita, ¿quien define la aprobacion final y declara la viabilidad del proyecto?",
    options: ["Concejo municipal", "DNP o sector competente", "Tesoreria", "Comite de archivo"],
    correctAnswer: 1,
    points: 5,
    explanation: "En el escenario planteado, el DNP o la entidad sectorial competente son quienes evaluan y declaran la viabilidad del proyecto segun su tipo y fuente de financiacion.",
    topic: "Viabilidad",
  },
  {
    id: 18,
    question:
      "Situacion\n\nEl equipo formulador del municipio de Sonson presenta un proyecto de reforestacion cuyo diagnostico se basa exclusivamente en una encuesta de percepcion ciudadana realizada hace seis anos. El evaluador rechaza el documento senalando deficiencias metodologicas.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que error cometio el equipo formulador en la elaboracion del diagnostico?",
    options: ["Costos subestimados", "Diagnostico sin soporte estadistico actualizado", "Confusion problema-efecto", "Indicadores sin linea base"],
    correctAnswer: 1,
    points: 5,
    explanation: "En esta situacion, el error es que el diagnostico carece de informacion vigente y verificable, utilizando datos de seis anos atras que no reflejan la situacion actual.",
    topic: "Errores comunes",
  },
  {
    id: 19,
    question:
      "Situacion\n\nUn equipo de la Secretaria de Infraestructura de Andes esta formulando un proyecto de pavimentacion y ha definido como problema central la falta de presupuesto para vias terciarias. El revisor del DNP observa la ficha y senala un error fundamental en la identificacion del problema.\n\nPregunta\n\nSegun el escenario planteado, ¿que error evidencia la definicion del problema como falta de presupuesto?",
    options: ["Falta de articulacion con el PPI", "Problemas mal definidos o confundidos con causas", "Costos sin justificacion", "Indicadores no medibles"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el error es confundir una causa (falta de presupuesto) con el problema real del territorio. La MGA insiste en identificar problemas reales de la poblacion, no causas financieras o institucionales.",
    topic: "Errores - Problema",
  },
  {
    id: 20,
    question:
      "Situacion\n\nLa Secretaria de Cultura de Jardin ha formulado un proyecto con la meta de mejorar la cultura ciudadana del municipio. Sin embargo, la ficha no incluye una linea base, ni unidad de medida, ni una meta cuantificada. El evaluador devuelve el proyecto por deficiencias en los indicadores.\n\nPregunta\n\nCon base en la situacion descrita, ¿que error se evidencia en la formulacion de los indicadores del proyecto?",
    options: ["Georreferenciacion deficiente", "Indicadores no medibles", "Falta de matriz de riesgos", "Costos indirectos"],
    correctAnswer: 1,
    points: 5,
    explanation: "En el escenario planteado, el error es formular indicadores no medibles. Sin unidad de medida, linea base ni meta cuantificada, es imposible verificar el cumplimiento del objetivo.",
    topic: "Errores - Indicadores",
  },
  {
    id: 21,
    question:
      "Situacion\n\nEl equipo de proyectos de Amaga ha estimado un presupuesto de 800 millones de pesos para un centro de salud, pero la ficha tecnica no muestra las fuentes consultadas para determinar los costos ni la metodologia de estimacion utilizada. El evaluador rechaza el proyecto por inconsistencias.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que error cometio el equipo en la estimacion de costos del proyecto?",
    options: ["Subvaloracion de CAPEX", "Costos sin justificacion o sin fuente de financiacion", "Sobreestimacion del OPEX", "Doble contabilidad"],
    correctAnswer: 1,
    points: 5,
    explanation: "En esta situacion, el error es presentar costos sin justificacion ni metodologia clara. La presentacion recalca que los costos deben estar justificados con fuentes y metodo para pasar la evaluacion.",
    topic: "Errores - Costos",
  },
  {
    id: 22,
    question:
      "Situacion\n\nEl equipo formulador del municipio de Santa Rosa de Osos detecta que los datos del diagnostico de su proyecto de agua potable estan desactualizados. Antes de construir el arbol de problemas, deciden actualizar la informacion con cifras recientes del DANE y de la empresa de servicios publicos.\n\nPregunta\n\nSegun el escenario descrito, ¿que buena practica de formulacion esta aplicando el equipo?",
    options: ["Minimizar hallazgos", "Basar el diagnostico en informacion actualizada", "Reemplazar datos con percepciones", "Ajustar metas sin linea base"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el equipo aplica la buena practica de actualizar y soportar datos con fuentes vigentes, lo cual fortalece la validez del diagnostico.",
    topic: "Buenas practicas - Evidencia",
  },
  {
    id: 23,
    question:
      "Situacion\n\nLa Secretaria de Desarrollo Social de Yarumal convoca mesas de trabajo con lideres comunitarios, organizaciones de base y beneficiarios potenciales para validar el diseno de un proyecto de seguridad alimentaria. Los aportes recogidos se incorporan en la formulacion final.\n\nPregunta\n\nCon base en la situacion descrita, ¿que buena practica de formulacion de proyectos esta aplicando la Secretaria?",
    options: ["Diseno cerrado", "Incluir participacion ciudadana", "Tercerizar sin dialogo", "Decidir por mayoria interna"],
    correctAnswer: 1,
    points: 5,
    explanation: "En el escenario planteado, la Secretaria aplica la buena practica de participacion ciudadana, que valida los disenos y fortalece la legitimidad del proyecto al incorporar la voz de los beneficiarios.",
    topic: "Buenas practicas - Participacion",
  },
  {
    id: 24,
    question:
      "Situacion\n\nLa Secretaria de Planeacion de Caucasia esta revisando un proyecto de infraestructura deportiva que tiene ejecucion prevista para tres anos. El secretario solicita verificar que el proyecto sea consistente con la programacion financiera plurianual para asegurar los recursos en cada vigencia.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿con que instrumento debe articularse el proyecto para garantizar coherencia financiera plurianual?",
    options: ["Marco Fiscal de Mediano Plazo", "Plan Plurianual de Inversiones", "Banco de proyectos externo", "POAI de funcionamiento"],
    correctAnswer: 1,
    points: 5,
    explanation: "En esta situacion, el Plan Plurianual de Inversiones es el instrumento que garantiza la coherencia financiera multianual del proyecto, asegurando la disponibilidad de recursos en cada vigencia.",
    topic: "Buenas practicas - Coherencia",
  },
  {
    id: 25,
    question:
      "Situacion\n\nEl municipio de Turbo ha experimentado multiples reprocesos en la formulacion de proyectos por falta de coordinacion entre dependencias. Para solucionar esto, la alcaldesa decide instalar un comite interinstitucional permanente. El secretario de gobierno pregunta que areas deben integrarlo.\n\nPregunta\n\nSegun el escenario descrito, ¿con que areas clave debe coordinar el comite interinstitucional para evitar reprocesos en la formulacion?",
    options: ["Juridica y Archivo", "Planeacion, Hacienda y Control Interno", "Talento Humano y Prensa", "Sistemas y Almacen"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el contenido resalta la importancia de coordinar entre Planeacion, Hacienda y Control Interno para asegurar coherencia tecnica, financiera y de control en la formulacion.",
    topic: "Buenas practicas - Coordinacion",
  },
  {
    id: 26,
    question:
      "Situacion\n\nLa Gobernacion de Antioquia quiere que todos los proyectos de inversion expresen claramente el valor publico que generan y se integren al modelo de gestion institucional. El director de planeacion busca entender como articular la formulacion MGA con este enfoque de gestion por resultados.\n\nPregunta\n\nCon base en la situacion descrita, ¿como se articula la formulacion de proyectos para expresar valor publico medible dentro del modelo de gestion?",
    options: ["Proyectos aislados del MIPG", "MGA dentro del MIPG generando valor publico", "Solo auditorias externas", "Tableros sin indicadores"],
    correctAnswer: 1,
    points: 5,
    explanation: "En el escenario planteado, la MGA integrada al Modelo Integrado de Planeacion y Gestion (MIPG) permite generar y demostrar valor publico medible a traves de los proyectos.",
    topic: "MIPG y valor publico",
  },
  {
    id: 27,
    question:
      "Situacion\n\nDurante una sesion del Concejo Municipal de Apartado, varios concejales cuestionan como la formulacion de proyectos con MGA contribuye a mejorar la transparencia en el uso de los recursos publicos. El secretario de planeacion debe explicar esta relacion.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿como contribuye la formulacion adecuada de proyectos a la transparencia institucional?",
    options: ["La MGA no impacta", "La transparencia depende solo del control externo", "Los proyectos contribuyen a transparencia y eficiencia", "Debe centralizarse en Hacienda"],
    correctAnswer: 2,
    points: 5,
    explanation: "En esta situacion, la formulacion adecuada mejora la transparencia y eficiencia institucional al documentar las decisiones de inversion de manera trazable y verificable.",
    topic: "Transparencia",
  },
  {
    id: 28,
    question:
      "Situacion\n\nEl alcalde de Puerto Berrio ha establecido como prioridad de su gobierno la eficiencia en la inversion publica desde la etapa de formulacion. Solicita a su equipo identificar que practica asegura decisiones de inversion mas eficientes y comparables entre proyectos.\n\nPregunta\n\nSegun el escenario descrito, ¿que asegura la eficiencia en las decisiones de inversion desde la formulacion?",
    options: ["Registrar en cualquier plataforma", "Formular con la MGA", "Delegar a contratistas", "Unificar todo en el POAI"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el uso disciplinado de la MGA permite decisiones de inversion mas eficientes y comparables entre proyectos, respondiendo a la prioridad del alcalde.",
    topic: "Principio de eficiencia",
  },
  {
    id: 29,
    question:
      "Situacion\n\nUn grupo de emprendedores del municipio de Nechi ha presentado a la alcaldia una idea innovadora de economia circular para aprovechar residuos agricolas. La Secretaria de Desarrollo Economico necesita convertir esta idea en un proyecto con estructura, trazabilidad y resultados verificables.\n\nPregunta\n\nCon base en la situacion descrita, ¿que proceso permite traducir la idea de economia circular en cambios verificables?",
    options: ["Convenio marco", "Formulacion de proyectos", "Compra publica", "Encargo fiduciario"],
    correctAnswer: 1,
    points: 5,
    explanation: "En el escenario planteado, la formulacion de proyectos es el proceso que da estructura y trazabilidad a las ideas para que produzcan resultados verificables.",
    topic: "De idea a resultados",
  },
  {
    id: 30,
    question:
      "Situacion\n\nEl equipo de la Secretaria de Planeacion de Segovia esta preparando una capacitacion interna sobre la MGA y necesita listar los componentes metodologicos minimos que no pueden faltar en ningun proyecto bien formulado. El coordinador solicita identificar el conjunto esencial.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿cual es el conjunto de componentes minimos que no pueden faltar en la formulacion MGA?",
    options: [
      "DOFA + EDT + Curva S",
      "Arbol de problemas y objetivos; indicadores de producto y resultado; matriz de marco logico; analisis de sostenibilidad y riesgos",
      "POAI + PAC + cronograma contractual",
      "Plan de compras + especificaciones tecnicas",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En esta situacion, la MGA enfatiza que el arbol de problemas y objetivos, indicadores de producto y resultado, matriz de marco logico y analisis de sostenibilidad y riesgos son los componentes minimos para formular con calidad.",
    topic: "Componentes MGA",
  },
]

export function FormulacionMgaTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [showResults, setShowResults] = useState(false)

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
    setShowResults(false)
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
      <Tabs defaultValue="resumen">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="indicaciones">Indicaciones</TabsTrigger>
        </TabsList>
        <TabsContent value="resumen">
          <Card className="border bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle>Formulacion de Proyectos con MGA</CardTitle>
              <CardDescription>
                Preguntas situacionales basadas en la presentacion del facilitador Nicolas Vargas sobre formulacion con la MGA.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Evalua conceptos de planeacion, diagnosticos, indicadores, Marco Logico, sostenibilidad y buenas practicas para proyectos de inversion
                publica a traves de escenarios realistas.
              </p>
              <Alert>
                <AlertTitle className="flex items-center gap-2 text-sm font-semibold">
                  <InfoIcon className="h-4 w-4 text-primary" />
                  Puntaje
                </AlertTitle>
                <AlertDescription>Cada pregunta vale 5 puntos. Debes responder las 30 para enviar la prueba.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="indicaciones">
          <Card className="border bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle>Indicaciones de uso</CardTitle>
              <CardDescription>
                Lee la situacion planteada y selecciona la opcion coherente con la guia "Formulacion de Proyectos de Inversion Publica con la MGA".
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc space-y-1 pl-5">
                <li>El temporizador asigna 2 minutos por pregunta.</li>
                <li>Puedes ver retroalimentacion despues de enviar las respuestas.</li>
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
        const isAnswered = answeredQuestions.has(question.id)
        const isCorrect = selected === question.correctAnswer

        return (
          <Card
            key={question.id}
            className={`border transition-colors ${
              isAnswered ? (isCorrect ? "border-green-500 bg-green-50" : "border-red-400 bg-red-50") : "border-border"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-start justify-between gap-4">
                <span>
                  Pregunta {index + 1} · {question.points} pts
                </span>
                {isAnswered && selected !== undefined && (
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
                    <RadioGroupItem value={optionIndex.toString()} id={`mga-q-${question.id}-opt-${optionIndex}`} className="mt-1" />
                    <Label htmlFor={`mga-q-${question.id}-opt-${optionIndex}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {isAnswered && (
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
            Finalizar y ver resultados
          </Button>
        ) : (
          <Button onClick={handleReset} variant="secondary" className="min-w-[200px]">
            Reiniciar prueba
          </Button>
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
