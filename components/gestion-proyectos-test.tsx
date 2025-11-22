"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"
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
  // Ejecucion de proyectos
  {
    id: 1,
    question: "Situacion\n\nLa Gerencia de Infraestructura del Departamento de Antioquia acaba de iniciar un proyecto de construccion de un hospital de tercer nivel en el municipio de Rionegro. El proyecto tiene un cronograma de 24 meses, involucra multiples contratistas, requiere coordinacion con el Ministerio de Salud, y cuenta con financiacion mixta de regalias y presupuesto departamental.\n\nPregunta\n\nPara garantizar la correcta ejecucion de este proyecto, el gerente debe elaborar un Plan de Ejecucion del Proyecto (PEP). Este documento es:",
    options: [
      "Solo contiene el presupuesto aprobado",
      "Integra y coordina todos los planes subsidiarios del proyecto: alcance, tiempo, costos, calidad, recursos humanos, comunicaciones, riesgos y adquisiciones",
      "Unicamente describe el cronograma de actividades",
      "Solo lista los responsables del proyecto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del hospital de Rionegro, el PEP es fundamental porque integra todos los planes subsidiarios del proyecto. Dado que hay multiples contratistas y financiacion mixta, el PEP define como se ejecutara, monitoreara y controlara el proyecto, incluyendo gestion del alcance, cronograma, costos, calidad, recursos, comunicaciones, riesgos, adquisiciones y participacion de interesados.",
    topic: "Plan de Ejecucion"
  },
  {
    id: 2,
    question: "Situacion\n\nEl proyecto de construccion de la via Caucasia-Nechi presenta retrasos significativos debido a la temporada de lluvias. El director del proyecto debe presentar un informe al gobernador explicando el estado actual del cronograma y las actividades que determinan la fecha de entrega final.\n\nPregunta\n\nPara elaborar este informe de manera completa, el cronograma del proyecto debe identificar:",
    options: [
      "Solo la fecha de inicio",
      "La secuencia de actividades, sus duraciones, dependencias, hitos criticos, ruta critica y fechas de inicio y fin de cada actividad",
      "Unicamente el presupuesto mensual",
      "Solo las reuniones del equipo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la via Caucasia-Nechi, el director necesita un cronograma completo que detalle la secuencia logica de actividades, duraciones estimadas, dependencias entre actividades (precedencias), hitos criticos del proyecto, identificacion de la ruta critica y fechas programadas de inicio y finalizacion. Solo asi podra explicar como las lluvias afectan la fecha de entrega final.",
    topic: "Cronograma del proyecto"
  },
  {
    id: 3,
    question: "Situacion\n\nEn el proyecto de construccion del puente sobre el rio Magdalena en Puerto Berrio, el interventor identifica que la actividad de cimentacion esta retrasada 15 dias. Esta actividad forma parte de una secuencia donde cualquier demora afecta directamente la fecha de terminacion total del proyecto.\n\nPregunta\n\nLa actividad de cimentacion hace parte de lo que en gestion de proyectos se conoce como ruta critica, la cual es:",
    options: [
      "La ruta mas corta entre actividades",
      "La secuencia de actividades que determina la duracion total del proyecto; cualquier retraso en actividades de la ruta critica retrasa todo el proyecto",
      "Solo las actividades mas costosas",
      "Unicamente las actividades del contratista"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del puente en Puerto Berrio, el retraso de 15 dias en la cimentacion afectara la fecha final porque esta actividad esta en la ruta critica. Esta es la secuencia mas larga de actividades dependientes que determina la duracion minima del proyecto. Las actividades en la ruta critica tienen holgura cero; cualquier retraso en ellas retrasa la fecha de terminacion del proyecto.",
    topic: "Ruta critica"
  },
  {
    id: 4,
    question: "Situacion\n\nEl proyecto de modernizacion del Aeropuerto Olaya Herrera tiene programados eventos clave como: aprobacion de planos arquitectonicos, terminacion de la fase de demolicion, finalizacion de la estructura metalica del nuevo terminal, e inauguracion. Estos eventos no tienen duracion pero marcan puntos de referencia importantes.\n\nPregunta\n\nEstos eventos significativos del proyecto se denominan hitos (milestones), los cuales son:",
    options: [
      "Cualquier actividad del proyecto",
      "Eventos significativos de duracion cero que marcan la finalizacion de entregables importantes o fases del proyecto",
      "Solo las reuniones de seguimiento",
      "Unicamente los pagos realizados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del Aeropuerto Olaya Herrera, los eventos mencionados (aprobacion de planos, terminacion de demolicion, finalizacion de estructura, inauguracion) son hitos. Estos son puntos de referencia que marcan eventos significativos o la finalizacion de entregables importantes. Tienen duracion cero y facilitan el seguimiento y control del avance del proyecto.",
    topic: "Hitos del proyecto"
  },
  {
    id: 5,
    question: "Situacion\n\nEl proyecto de ampliacion de la Planta de Tratamiento de Aguas Residuales de Envigado enfrenta posibles riesgos: hallazgos arqueologicos durante excavaciones, demoras en importacion de equipos especializados, protestas de comunidades vecinas por olores, y posibles fallas en pruebas de laboratorio. El gerente debe establecer un proceso para manejar estas incertidumbres.\n\nPregunta\n\nEl proceso que debe implementar el gerente para manejar estas situaciones se denomina gestion de riesgos, la cual incluye:",
    options: [
      "Ignorar los problemas potenciales",
      "Identificar, analizar, evaluar, planificar respuestas, implementar acciones y monitorear continuamente los riesgos que pueden afectar los objetivos del proyecto",
      "Solo reportar problemas cuando ocurren",
      "Unicamente asegurar el proyecto con polizas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la Planta de Tratamiento de Envigado, el gerente debe implementar gestion de riesgos como proceso continuo. Esto incluye: identificacion de riesgos (arqueologicos, importacion, sociales, tecnicos), analisis cualitativo y cuantitativo, evaluacion de probabilidad e impacto, planificacion de respuestas (evitar, mitigar, transferir, aceptar), implementacion de acciones y monitoreo permanente.",
    topic: "Gestion de riesgos"
  },
  {
    id: 6,
    question: "Situacion\n\nDurante la construccion del nuevo edificio de la Gobernacion de Antioquia, el contratista solicita cambiar las especificaciones del sistema de aire acondicionado por uno de mayor capacidad, argumentando mejoras en eficiencia energetica. Esto implica un aumento de costo del 8% y una extension de 20 dias en el cronograma.\n\nPregunta\n\nAnte esta solicitud de cambio, el procedimiento correcto a seguir es:",
    options: [
      "Aprobarla automaticamente sin analisis",
      "Evaluar el impacto en alcance, tiempo, costo y calidad; documentar formalmente la solicitud; y someter a aprobacion del comite de control de cambios",
      "Rechazarla sin consideracion",
      "Solo informar verbalmente al contratista"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del edificio de la Gobernacion, las solicitudes de cambio deben seguir un proceso formal: documentacion de la solicitud, evaluacion de impactos en alcance, tiempo (20 dias adicionales), costo (8% de aumento), calidad y riesgos, analisis de alternativas, aprobacion o rechazo por el comite de control de cambios, y actualizacion de documentos del proyecto.",
    topic: "Control de cambios"
  },
  {
    id: 7,
    question: "Situacion\n\nAl finalizar el proyecto de construccion de 50 aulas escolares en el municipio de Turbo, el equipo de gestion debe documentar todo lo aprendido durante los 18 meses de ejecucion: los problemas con proveedores locales, las soluciones innovadoras para trabajar en epoca de lluvias, los exitos en participacion comunitaria y las dificultades con tramites ambientales.\n\nPregunta\n\nEsta documentacion se consolida en el acta de lecciones aprendidas, la cual debe registrar:",
    options: [
      "Solo los exitos del proyecto",
      "Experiencias positivas y negativas, buenas practicas identificadas, problemas enfrentados y soluciones implementadas, para mejorar proyectos futuros",
      "Unicamente las quejas del equipo",
      "Solo los costos finales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de aulas en Turbo, las lecciones aprendidas deben documentar el conocimiento adquirido: experiencias positivas (participacion comunitaria) y negativas (proveedores locales, tramites ambientales), buenas practicas (soluciones para lluvias), problemas enfrentados, soluciones implementadas, y recomendaciones para proyectos futuros. Es una herramienta de mejora continua organizacional.",
    topic: "Lecciones aprendidas"
  },
  // Indicadores de gestion
  {
    id: 8,
    question: "Situacion\n\nLa Secretaria de Planeacion de Antioquia esta disenando el sistema de indicadores para el proyecto de conectividad digital rural. El coordinador propone un indicador llamado 'Mejora de conectividad' pero no define como medirlo, que fuente de datos usar, ni cual es la meta especifica.\n\nPregunta\n\nPara que este indicador sea util, debe cumplir las siguientes caracteristicas:",
    options: [
      "Ser complejo y dificil de entender",
      "Ser especifico, medible, alcanzable, relevante, con tiempo definido (SMART), y tener una ficha tecnica clara",
      "Solo existir en papel sin medicion real",
      "Ser subjetivo y general"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del proyecto de conectividad digital, el indicador 'Mejora de conectividad' no cumple los criterios SMART. Debe ser: Especifico (ej: hogares conectados), Medible (numero o porcentaje), Alcanzable (meta realista), Relevante (relacionado con el objetivo) y con Tiempo definido (fecha limite). Ademas requiere ficha tecnica que defina formula, fuente, frecuencia y responsable.",
    topic: "Caracteristicas de indicadores"
  },
  {
    id: 9,
    question: "Situacion\n\nEl proyecto de pavimentacion de 80 km de vias terciarias en el Suroeste Antioqueno programo completar 32 km en el primer trimestre. Al cierre del trimestre, se han completado 28 km dentro del plazo establecido y 4 km presentan retrasos. El interventor debe calcular el indicador de cumplimiento de cronograma.\n\nPregunta\n\nLa formula correcta para calcular el indicador de cumplimiento de cronograma es:",
    options: [
      "Solo contar los dias transcurridos",
      "(Actividades completadas a tiempo / Total de actividades programadas) x 100",
      "Unicamente sumar costos",
      "Dividir el presupuesto entre el tiempo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de las vias terciarias del Suroeste, el indicador de cumplimiento de cronograma mide el porcentaje de actividades completadas dentro del plazo: (28 km completados a tiempo / 32 km programados) x 100 = 87.5%. Esto indica un buen desempeno pero con oportunidad de mejora en la gestion del tiempo para el proximo trimestre.",
    topic: "Indicador de cumplimiento de cronograma"
  },
  {
    id: 10,
    question: "Situacion\n\nEl proyecto de construccion del centro deportivo de Itagui tiene un presupuesto programado para el semestre de $5.000 millones. Al cierre del periodo, se han ejecutado $4.200 millones. La directora financiera debe reportar el indicador de ejecucion presupuestal al comite directivo.\n\nPregunta\n\nEl indicador de ejecucion presupuestal se calcula como:",
    options: [
      "Solo el presupuesto aprobado",
      "(Presupuesto ejecutado / Presupuesto programado) x 100",
      "Unicamente el saldo disponible",
      "Solo los gastos de personal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del centro deportivo de Itagui, el indicador de ejecucion presupuestal es: ($4.200 millones ejecutados / $5.000 millones programados) x 100 = 84%. Esto permite evaluar la eficiencia en el uso de recursos financieros y detectar la sub-ejecucion del 16% para tomar acciones correctivas en el siguiente periodo.",
    topic: "Indicador de ejecucion presupuestal"
  },
  {
    id: 11,
    question: "Situacion\n\nEl programa de vivienda gratuita en el municipio de Apartado tenia como meta entregar 200 viviendas a familias vulnerables en el ano. Al finalizar diciembre, se entregaron 185 viviendas. El gerente del programa debe evaluar si se cumplio el objetivo independientemente de los recursos utilizados.\n\nPregunta\n\nPara esta evaluacion, el gerente debe usar un indicador de eficacia, el cual mide:",
    options: [
      "Solo los recursos utilizados",
      "El grado de cumplimiento de los objetivos y metas establecidos, sin considerar los recursos empleados",
      "Unicamente el tiempo transcurrido",
      "Solo la satisfaccion del personal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del programa de vivienda en Apartado, el indicador de eficacia mide: (185 viviendas entregadas / 200 viviendas meta) x 100 = 92.5% de cumplimiento. Este indicador evalua el grado en que se alcanzan los objetivos establecidos (familias beneficiadas), independientemente de los recursos utilizados para lograrlo.",
    topic: "Indicadores de eficacia"
  },
  {
    id: 12,
    question: "Situacion\n\nDos municipios ejecutaron proyectos de construccion de acueductos veredales. El municipio A beneficio a 500 familias con un presupuesto de $1.000 millones. El municipio B beneficio a 450 familias con $750 millones. La Secretaria de Infraestructura debe comparar la eficiencia de ambos proyectos.\n\nPregunta\n\nPara esta comparacion, debe utilizar un indicador de eficiencia, el cual mide:",
    options: [
      "Solo los resultados finales",
      "La relacion entre los resultados obtenidos y los recursos utilizados (tiempo, dinero, personal), optimizando el uso de recursos",
      "Unicamente la satisfaccion del usuario",
      "Solo el numero de actividades realizadas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de los acueductos, el indicador de eficiencia seria el costo por familia beneficiada. Municipio A: $2 millones/familia ($1.000M/500). Municipio B: $1.67 millones/familia ($750M/450). El municipio B fue mas eficiente al lograr mayor resultado con menos recursos. Este indicador mide la relacion entre productos obtenidos y recursos empleados.",
    topic: "Indicadores de eficiencia"
  },
  {
    id: 13,
    question: "Situacion\n\nHace tres anos se construyo un centro de salud en el corregimiento de San Jose de la Montana. La Secretaria de Salud quiere evaluar si esta infraestructura ha generado cambios reales en la poblacion: reduccion de mortalidad infantil, disminucion de enfermedades prevenibles y mejora en la esperanza de vida de los habitantes.\n\nPregunta\n\nPara medir estos cambios de largo plazo, debe utilizar un indicador de impacto, el cual mide:",
    options: [
      "Solo el gasto realizado",
      "Los cambios o efectos de largo plazo generados por el proyecto en la poblacion, la sociedad o el entorno, mas alla de los resultados inmediatos",
      "Unicamente las actividades ejecutadas",
      "Solo la duracion del proyecto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del centro de salud de San Jose de la Montana, los indicadores de impacto miden los cambios de largo plazo en la poblacion: reduccion de mortalidad infantil (de 15 a 8 por mil), disminucion de enfermedades prevenibles, mejora en esperanza de vida. Estos efectos van mas alla de los resultados inmediatos (construccion del centro) y miden la transformacion real en la comunidad.",
    topic: "Indicadores de impacto"
  },
  {
    id: 14,
    question: "Situacion\n\nLa PMO de la Gobernacion de Antioquia esta estandarizando el formato de fichas tecnicas para todos los indicadores de los proyectos departamentales. El coordinador debe definir los campos obligatorios que debe contener cada ficha para garantizar claridad y consistencia en la medicion.\n\nPregunta\n\nLa ficha tecnica de un indicador debe contener:",
    options: [
      "Solo el nombre del indicador",
      "Nombre, definicion, formula de calculo, unidad de medida, fuente de datos, frecuencia de medicion, responsable, meta y linea base",
      "Unicamente la formula matematica",
      "Solo el responsable de medicion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de estandarizacion de la PMO de Antioquia, la ficha tecnica debe documentar: nombre del indicador, definicion clara, formula de calculo, unidad de medida (%, numero, indice), fuente de datos, frecuencia de medicion (mensual, trimestral), responsable de la medicion, meta establecida y linea base (valor inicial). Esto garantiza consistencia y claridad en todos los proyectos.",
    topic: "Ficha tecnica de indicador"
  },
  {
    id: 15,
    question: "Situacion\n\nAntes de iniciar el programa de alfabetizacion digital para adultos mayores en Medellin, el equipo tecnico realizo un diagnostico que mostro que solo el 12% de esta poblacion sabia usar herramientas digitales basicas. Este dato servira como punto de comparacion para medir el avance del programa.\n\nPregunta\n\nEste valor inicial del 12% constituye la linea base del indicador, la cual es:",
    options: [
      "La meta final del proyecto",
      "El valor inicial del indicador antes de ejecutar el proyecto, que sirve como punto de referencia para medir cambios y avances",
      "Solo el presupuesto asignado",
      "Unicamente el cronograma inicial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del programa de alfabetizacion digital, el 12% de adultos mayores con competencias digitales es la linea base. Esta medicion inicial antes de la intervencion sirve como punto de referencia para comparar y medir los cambios. Si al finalizar el programa el 45% tiene competencias digitales, se puede calcular el avance real: incremento de 33 puntos porcentuales.",
    topic: "Linea base de indicadores"
  },
  // Seguimiento y monitoreo
  {
    id: 16,
    question: "Situacion\n\nEl proyecto de restauracion del Palacio de la Cultura Rafael Uribe Uribe tiene una duracion de 30 meses. El director del proyecto propone hacer una unica revision de avance al finalizar. La interventoria rechaza esta propuesta argumentando que el seguimiento debe tener otra dinamica.\n\nPregunta\n\nLa interventoria tiene razon porque el seguimiento del proyecto debe realizarse:",
    options: [
      "Solo al finalizar el proyecto",
      "De manera continua y periodica durante toda la ejecucion, comparando lo ejecutado con lo planeado, identificando desviaciones y tomando acciones correctivas",
      "Unicamente cuando hay problemas",
      "Solo una vez al ano"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del Palacio de la Cultura, la interventoria tiene razon. El seguimiento es un proceso continuo y sistematico durante toda la ejecucion (30 meses), que compara el avance real (fisico, financiero, de gestion) con lo planeado, identifica desviaciones, analiza causas y toma acciones correctivas oportunas. Esperar hasta el final impediria corregir problemas a tiempo.",
    topic: "Seguimiento continuo"
  },
  {
    id: 17,
    question: "Situacion\n\nEl gerente del proyecto de construccion del intercambio vial de la calle 80 con la Autopista Norte debe presentar el informe mensual de avance al comite directivo. Algunos miembros del comite solo quieren ver el estado financiero, pero el gerente insiste en presentar informacion mas completa.\n\nPregunta\n\nEl gerente tiene razon porque los informes de avance del proyecto deben incluir:",
    options: [
      "Solo el estado financiero",
      "Avance fisico de actividades y componentes, ejecucion presupuestal, cumplimiento de cronograma, estado de indicadores, riesgos materializados, cambios aprobados y recomendaciones",
      "Unicamente quejas y reclamos",
      "Solo fotografias de la obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del intercambio vial de la calle 80, los informes de avance deben ser completos: progreso fisico de actividades y entregables, ejecucion presupuestal, cumplimiento del cronograma, estado de indicadores, riesgos identificados y materializados, problemas y soluciones, cambios aprobados, y recomendaciones. Solo ver el estado financiero daria una vision parcial del proyecto.",
    topic: "Informes de avance"
  },
  {
    id: 18,
    question: "Situacion\n\nEl proyecto de construccion del tunel de Oriente presenta un avance fisico del 60%, pero ha gastado el 75% del presupuesto. El gerente necesita una herramienta que integre la medicion de alcance, tiempo y costo para evaluar objetivamente el desempeno y pronosticar el costo final del proyecto.\n\nPregunta\n\nLa herramienta adecuada para esta evaluacion es el analisis de valor ganado (Earned Value Management - EVM), el cual permite:",
    options: [
      "Solo conocer los gastos realizados",
      "Integrar mediciones de alcance, tiempo y costo para evaluar el desempeno del proyecto y pronosticar su finalizacion",
      "Unicamente premiar al equipo de trabajo",
      "Solo calcular el presupuesto inicial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del tunel de Oriente, el EVM integra alcance (60% avance), cronograma y costos (75% gastado) para medir el desempeno. Compara el Valor Planificado (PV), Valor Ganado (EV) y Costo Real (AC) para calcular variaciones. En este caso, el CPI seria menor a 1, indicando ineficiencia en el uso de recursos y permitiendo pronosticar sobre-costos al finalizar.",
    topic: "Valor ganado (EVM)"
  },
  {
    id: 19,
    question: "Situacion\n\nEl proyecto de construccion de la ciudadela educativa de Bello tiene multiples indicadores de alerta: el proveedor principal de acero tiene dificultades financieras, hay retrasos en la aprobacion de licencias ambientales, y se pronostican lluvias intensas para el proximo mes. El gerente necesita un mecanismo para identificar y actuar ante estas senales antes de que se conviertan en problemas graves.\n\nPregunta\n\nEste mecanismo se denomina sistema de alertas tempranas, el cual busca:",
    options: [
      "Solo documentar problemas despues de que ocurren",
      "Identificar de manera anticipada senales de riesgo o desviaciones significativas que puedan comprometer el cumplimiento de objetivos, para tomar acciones preventivas",
      "Unicamente generar alarmas sin acciones",
      "Solo cumplir requisitos formales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la ciudadela educativa de Bello, el sistema de alertas tempranas identifica anticipadamente las senales de riesgo (dificultades del proveedor, demoras en licencias, pronostico de lluvias) antes de que se materialicen. Esto permite tomar acciones preventivas: buscar proveedores alternativos, gestionar las licencias con urgencia, y planificar protecciones para la lluvia.",
    topic: "Alertas tempranas"
  },
  {
    id: 20,
    question: "Situacion\n\nLa Gobernacion de Antioquia ha creado una oficina centralizada para apoyar la gestion de todos los proyectos departamentales. Esta oficina establece metodologias estandar, brinda capacitacion a los gerentes de proyecto, consolida la informacion de avance de todos los proyectos y promueve el intercambio de lecciones aprendidas.\n\nPregunta\n\nEsta oficina se denomina PMO (Project Management Office), la cual tiene como funcion:",
    options: [
      "Solo archivar documentos del proyecto",
      "Establecer y mantener estandares de gestion de proyectos, brindar soporte metodologico, consolidar informacion, monitorear portafolios y promover mejores practicas",
      "Unicamente aprobar presupuestos",
      "Solo contratar personal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la Gobernacion de Antioquia, la PMO centraliza y estandariza la gestion de proyectos departamentales. Sus funciones incluyen: establecer metodologias y estandares, brindar soporte y capacitacion a gerentes, consolidar informacion de todos los proyectos, monitorear el portafolio, gestionar recursos compartidos, y promover lecciones aprendidas y mejores practicas organizacionales.",
    topic: "PMO - Oficina de proyectos"
  },
  // Evaluacion
  {
    id: 21,
    question: "Situacion\n\nEl proyecto de ampliacion de la red de ciclorrutas del Valle de Aburra tiene una duracion de 36 meses y ya ha transcurrido la mitad del tiempo. La Secretaria de Movilidad decide realizar una evaluacion para verificar si el proyecto va por buen camino y si es necesario realizar ajustes en la estrategia o en la asignacion de recursos.\n\nPregunta\n\nEste tipo de evaluacion se denomina evaluacion intermedia (mid-term evaluation), la cual se realiza:",
    options: [
      "Solo al inicio del proyecto",
      "Durante la fase de ejecucion, aproximadamente a la mitad del proyecto, para verificar avances, identificar problemas y realizar ajustes necesarios",
      "Unicamente al finalizar el proyecto",
      "Solo cuando hay quejas de la comunidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de las ciclorrutas del Valle de Aburra, la evaluacion intermedia a los 18 meses (mitad del proyecto) es apropiada. Se realiza durante la ejecucion para verificar el progreso hacia los objetivos, identificar problemas emergentes, evaluar la pertinencia de la estrategia, y realizar ajustes o correcciones de rumbo si es necesario.",
    topic: "Evaluacion intermedia"
  },
  {
    id: 22,
    question: "Situacion\n\nEl proyecto de construccion de 15 puestos de salud rurales en el Uraba Antioqueno ha finalizado. El director de la Secretaria de Salud solicita una evaluacion completa que verifique si se cumplieron los objetivos, analice los resultados alcanzados, identifique que funciono bien y que no, y genere recomendaciones para proyectos futuros similares.\n\nPregunta\n\nEsta evaluacion de cierre de un proyecto debe incluir:",
    options: [
      "Solo el acta de liquidacion financiera",
      "Verificacion del cumplimiento de objetivos, analisis de resultados vs. metas, evaluacion de eficiencia y eficacia, identificacion de lecciones aprendidas y recomendaciones",
      "Unicamente fotografias de entrega",
      "Solo la firma del acta final"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de los puestos de salud del Uraba, la evaluacion de cierre debe verificar el cumplimiento de objetivos (15 puestos construidos), analizar resultados vs. metas, evaluar eficiencia (recursos) y eficacia (objetivos), identificar factores de exito y fracaso, documentar lecciones aprendidas, y formular recomendaciones para sostenibilidad y proyectos futuros similares.",
    topic: "Evaluacion de cierre"
  },
  {
    id: 23,
    question: "Situacion\n\nHace cinco anos se ejecuto un programa de nutricion escolar en los municipios del Norte de Antioquia. El DNP quiere evaluar si el programa realmente genero cambios sostenidos en la poblacion beneficiaria: mejoras en el estado nutricional de los ninos, reduccion de desercion escolar y mejor rendimiento academico, estableciendo la relacion causal entre el programa y estos cambios.\n\nPregunta\n\nEste tipo de estudio se denomina evaluacion de impacto, la cual busca:",
    options: [
      "Solo contar cuantas actividades se realizaron",
      "Medir los cambios o efectos de largo plazo atribuibles al proyecto en la poblacion beneficiaria, estableciendo relaciones causales entre la intervencion y los resultados observados",
      "Unicamente verificar el gasto ejecutado",
      "Solo revisar documentos administrativos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del programa de nutricion del Norte de Antioquia, la evaluacion de impacto mide los cambios de largo plazo atribuibles al programa: mejora nutricional, reduccion de desercion, mejor rendimiento. Utiliza metodos rigurosos (cuasi-experimentales, experimentales) y grupos de control para establecer relaciones causales y aislar el efecto especifico del programa.",
    topic: "Evaluacion de impacto"
  },
  {
    id: 24,
    question: "Situacion\n\nSe ha completado la construccion de una planta de tratamiento de agua potable en el municipio de Yarumal. El alcalde esta preocupado porque quiere asegurar que los beneficios del proyecto (agua potable de calidad) se mantengan en el largo plazo. Debe considerar aspectos financieros, tecnicos, institucionales y sociales para la operacion futura.\n\nPregunta\n\nLa capacidad de mantener estos beneficios en el largo plazo se denomina sostenibilidad del proyecto, la cual implica:",
    options: [
      "Solo la durabilidad de las obras fisicas",
      "La capacidad de mantener los beneficios y servicios del proyecto en el largo plazo, considerando aspectos financieros, institucionales, tecnicos, sociales y ambientales",
      "Unicamente contar con recursos financieros",
      "Solo tener personal capacitado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la planta de Yarumal, la sostenibilidad requiere: viabilidad financiera (tarifas que cubran operacion y mantenimiento), capacidad institucional (empresa de servicios fortalecida), disponibilidad tecnica (operarios capacitados, repuestos disponibles), apropiacion social (comunidad que valore y pague el servicio), y sostenibilidad ambiental (proteccion de fuentes hidricas).",
    topic: "Sostenibilidad del proyecto"
  },
  {
    id: 25,
    question: "Situacion\n\nEl proyecto de construccion de un centro de convenciones en Rionegro esta por finalizar. El gerente debe planificar el cierre formal del proyecto, incluyendo la entrega de la edificacion a la entidad operadora, la transferencia del conocimiento sobre los sistemas tecnicos instalados, la liberacion ordenada del equipo de trabajo y el cierre de todos los contratos.\n\nPregunta\n\nEste plan de transicion o cierre de un proyecto debe incluir:",
    options: [
      "Solo la entrega de llaves de las instalaciones",
      "Transferencia formal de entregables, traspaso de conocimiento y documentacion, entrega de responsabilidades operativas, liberacion de recursos y cierre administrativo completo",
      "Unicamente la ultima factura pagada",
      "Solo el acta de terminacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del centro de convenciones de Rionegro, el plan de transicion incluye: entrega formal del edificio y documentacion tecnica (planos as-built, manuales), transferencia de conocimiento sobre sistemas instalados al equipo operador, traspaso de responsabilidades de operacion y mantenimiento, liberacion ordenada del personal del proyecto, cierre de contratos con proveedores, y cierre administrativo y financiero completo.",
    topic: "Plan de transicion y cierre"
  }
]

const questionsV2: Question[] = [
  // Ejecucion de proyectos
  {
    id: 1,
    question: "Situacion\n\nLa Secretaria de Infraestructura de Antioquia ejecuta un proyecto de construccion de un puente vehicular sobre el rio Porce. El interventor realiza visitas de obra y encuentra que algunos elementos de concreto no cumplen con la resistencia especificada de 4000 PSI, las soldaduras de la estructura metalica presentan porosidades, y los materiales de relleno no coinciden con las especificaciones del diseno.\n\nPregunta\n\nPara evitar estos problemas, la gestion de la calidad en un proyecto de infraestructura incluye:",
    options: [
      "Solo inspeccionar al final de la obra",
      "Planificar la calidad, asegurar la calidad mediante procesos preventivos, y controlar la calidad mediante inspecciones y ensayos, cumpliendo normas tecnicas aplicables",
      "Unicamente tomar fotografias de la obra",
      "Solo firmar actas sin verificacion real"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del puente sobre el rio Porce, los problemas detectados (concreto, soldaduras, materiales) se habrian prevenido con una gestion de calidad integral: planificacion (definir normas tecnicas y especificaciones), aseguramiento (procesos preventivos, auditorias durante la ejecucion), y control (ensayos de laboratorio a concretos, inspecciones de soldadura, verificacion de materiales).",
    topic: "Gestion de calidad"
  },
  {
    id: 2,
    question: "Situacion\n\nEl proyecto de construccion del nuevo terminal de transporte de Caucasia involucra multiples actores: la alcaldia municipal, las empresas de transporte, los comerciantes del sector, las comunidades vecinas que temen afectaciones, los ambientalistas preocupados por un humedal cercano, y los conductores de taxi que veran modificadas sus rutas. Cada grupo tiene diferentes intereses y expectativas.\n\nPregunta\n\nPara manejar adecuadamente estas relaciones, el registro de stakeholders (partes interesadas) del proyecto debe identificar:",
    options: [
      "Solo al contratista y la entidad",
      "Todas las personas, grupos u organizaciones que afectan o son afectados por el proyecto, su nivel de interes, poder, expectativas y estrategia de relacionamiento",
      "Unicamente a los funcionarios publicos",
      "Solo a los proveedores de materiales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del terminal de Caucasia, el registro de stakeholders debe identificar todos los actores mencionados (alcaldia, empresas de transporte, comerciantes, comunidades, ambientalistas, taxistas), analizar su nivel de interes e influencia, documentar sus expectativas y posibles conflictos, y definir estrategias de comunicacion y relacionamiento diferenciadas para cada grupo.",
    topic: "Gestion de stakeholders"
  },
  {
    id: 3,
    question: "Situacion\n\nDurante la construccion de la variante del municipio de La Pintada, el director de obra debe mantener un registro cronologico de todos los eventos importantes: las decisiones tecnicas tomadas en campo sobre cambios de diseno por condiciones del terreno, los resultados de los ensayos de densidad de la subbase, las suspensiones por lluvias, las visitas de la CAR para verificacion ambiental, y las reclamaciones del contratista.\n\nPregunta\n\nEste registro se denomina cuaderno de obra o bitacora del proyecto, el cual sirve para:",
    options: [
      "Solo anotar asistencia del personal",
      "Registrar cronologicamente eventos relevantes, decisiones tecnicas, cambios, problemas, soluciones, visitas, ensayos y novedades significativas del proyecto",
      "Unicamente hacer dibujos de la obra",
      "Solo copiar el contrato"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la variante de La Pintada, el cuaderno de obra es el registro cronologico oficial que documenta: eventos relevantes (suspensiones por lluvia), decisiones tecnicas (cambios por condiciones del terreno), resultados de ensayos (densidad de subbase), visitas de autoridades (CAR), y reclamaciones. Es evidencia legal fundamental para resolver controversias y sustentar decisiones.",
    topic: "Cuaderno de obra"
  },
  {
    id: 4,
    question: "Situacion\n\nEl proyecto de modernizacion del sistema de semaforizacion de Medellin involucra a la Secretaria de Movilidad, la empresa contratista, el operador tecnologico, las empresas de transporte publico, los medios de comunicacion y la ciudadania. Cada actor necesita diferente tipo de informacion, con distinta frecuencia y por diferentes canales.\n\nPregunta\n\nPara asegurar que todos reciban la informacion adecuada, la gestion de comunicaciones del proyecto debe establecer:",
    options: [
      "Solo reuniones esporadicas sin planeacion",
      "Quien necesita informacion, que informacion, cuando, en que formato, mediante que canal y quien es responsable de suministrarla",
      "Unicamente enviar correos masivos sin destinatario especifico",
      "Solo hablar informalmente sin documentar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del sistema de semaforizacion, el plan de comunicaciones debe definir: cada stakeholder y sus necesidades (Secretaria: reportes ejecutivos; medios: boletines de prensa; ciudadania: avisos de cierres), tipo de informacion, frecuencia, formato (informe tecnico, nota de prensa, aviso), canal (correo, redes sociales, radio) y responsables de cada comunicacion.",
    topic: "Gestion de comunicaciones"
  },
  {
    id: 5,
    question: "Situacion\n\nEl proyecto de construccion del acueducto regional del Oriente Antioqueno tiene un equipo especializado de ingenieros hidraulicos que debe trabajar simultaneamente en varias frentes de obra. El cronograma basado solo en dependencias logicas muestra una duracion de 18 meses, pero al considerar que estos ingenieros no pueden estar en dos lugares al mismo tiempo, la duracion real podria extenderse.\n\nPregunta\n\nPara manejar esta situacion, el metodo de la cadena critica (Critical Chain) mejora la gestion del proyecto mediante:",
    options: [
      "Ignorar los recursos disponibles",
      "Considerar las restricciones de recursos ademas de las dependencias de actividades, agregando buffers estrategicos para proteger el cronograma",
      "Solo duplicar todas las duraciones",
      "Unicamente eliminar actividades"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del acueducto del Oriente, la cadena critica considera no solo las dependencias logicas sino tambien la restriccion del equipo de ingenieros hidraulicos. El metodo identifica la secuencia critica considerando recursos limitados y agrega buffers estrategicos (de proyecto, de alimentacion) para proteger el cronograma de incertidumbres y mejorar la probabilidad de cumplir plazos.",
    topic: "Cadena critica"
  },
  {
    id: 6,
    question: "Situacion\n\nLa Gobernacion de Antioquia acaba de firmar el contrato para el proyecto de construccion de un centro de innovacion tecnologica en Rionegro. El gerente del proyecto convoca a una primera reunion formal donde asistiran representantes de la Gobernacion, el contratista, la interventoria, la alcaldia municipal, y el equipo tecnico. Es la primera vez que todos los actores se reunen.\n\nPregunta\n\nEsta reunion de inicio (kick-off meeting) del proyecto debe:",
    options: [
      "Solo presentar a los asistentes",
      "Alinear expectativas, presentar objetivos, alcance, cronograma, roles y responsabilidades, reglas de trabajo, y establecer compromisos del equipo",
      "Unicamente servir refrigerio",
      "Solo tomar fotos para redes sociales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del centro de innovacion de Rionegro, la reunion de inicio formaliza el arranque del proyecto. Debe alinear expectativas de Gobernacion, contratista e interventoria, presentar objetivos y alcance del centro, revisar cronograma y presupuesto, definir roles (quien aprueba cambios, quien autoriza pagos), establecer reglas de comunicacion (frecuencia de comites), y generar compromiso del equipo.",
    topic: "Reunion de inicio (kick-off)"
  },
  {
    id: 7,
    question: "Situacion\n\nEl proyecto de construccion de viviendas de interes social en el municipio de Chigorodo ha identificado varios riesgos: posible incremento en el precio del acero por situacion internacional, demoras en la titulacion de predios por problemas juridicos, conflictos con grupos al margen de la ley en la zona, y posibles inundaciones durante la temporada de lluvias. El gerente necesita documentar estos riesgos de manera estructurada.\n\nPregunta\n\nPara esta documentacion, el registro de riesgos del proyecto debe contener:",
    options: [
      "Solo una lista de problemas generales",
      "Identificacion de cada riesgo, probabilidad de ocurrencia, impacto potencial, categoria, causas, estrategia de respuesta, responsable y estado de seguimiento",
      "Unicamente quejas de la comunidad",
      "Solo riesgos financieros"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de Chigorodo, el registro de riesgos debe documentar cada riesgo: descripcion clara (incremento de acero, titulacion, seguridad, inundaciones), probabilidad (alta/media/baja), impacto potencial, categoria (financiero, legal, seguridad, climatico), causas raices, estrategia de respuesta (ej: contratos con precio fijo, gestiones juridicas anticipadas), responsable de gestion y estado de monitoreo.",
    topic: "Registro de riesgos"
  },
  // Indicadores de gestion
  {
    id: 8,
    question: "Situacion\n\nEl proyecto de mejoramiento de vias terciarias del Bajo Cauca presenta los siguientes datos: valor planificado para la fecha de corte $800 millones, valor ganado (trabajo completado) $720 millones, costo real gastado $850 millones. El gerente necesita calcular la variacion del costo para reportar al comite directivo.\n\nPregunta\n\nEl indicador de variacion del costo (CV - Cost Variance) se calcula como:",
    options: [
      "Solo el costo total gastado",
      "CV = Valor Ganado (EV) - Costo Real (AC); un CV positivo indica que el proyecto esta por debajo del presupuesto",
      "Unicamente el presupuesto inicial",
      "Solo los ahorros realizados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del Bajo Cauca, la variacion del costo se calcula: CV = EV - AC = $720M - $850M = -$130 millones. Este CV negativo indica que el proyecto esta gastando $130 millones mas de lo que deberia para el trabajo realizado, senalando ineficiencia en el uso de recursos y necesidad de acciones correctivas.",
    topic: "Variacion del costo (CV)"
  },
  {
    id: 9,
    question: "Situacion\n\nContinuando con el proyecto de vias terciarias del Bajo Cauca, el gerente necesita calcular el Indice de Desempeno del Costo para determinar que tan eficientemente se estan utilizando los recursos financieros. Los datos son: valor ganado $720 millones, costo real $850 millones.\n\nPregunta\n\nEl Indice de Desempeno del Costo (CPI - Cost Performance Index) se calcula como:",
    options: [
      "Solo dividir el costo total entre el tiempo",
      "CPI = Valor Ganado (EV) / Costo Real (AC); un CPI mayor a 1 indica eficiencia en el uso de recursos",
      "Unicamente sumar todos los gastos",
      "Solo contar las actividades completadas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del Bajo Cauca, el CPI se calcula: CPI = EV / AC = $720M / $850M = 0.85. Este CPI menor a 1 indica que por cada peso gastado solo se obtiene 85 centavos de valor, senalando ineficiencia del 15%. El proyecto esta sobre-ejecutando el presupuesto y requiere acciones correctivas urgentes.",
    topic: "Indice de Desempeno del Costo (CPI)"
  },
  {
    id: 10,
    question: "Situacion\n\nEl proyecto de construccion de la planta de compostaje de residuos organicos del Valle de Aburra muestra los siguientes datos a la fecha de corte: valor planificado $500 millones (lo que deberia haberse completado), valor ganado $600 millones (lo que realmente se ha completado). El gerente quiere calcular si el proyecto va adelantado o atrasado respecto al cronograma.\n\nPregunta\n\nEl Indice de Desempeno del Cronograma (SPI - Schedule Performance Index) se calcula como:",
    options: [
      "Solo contar los dias transcurridos",
      "SPI = Valor Ganado (EV) / Valor Planificado (PV); un SPI mayor a 1 indica que el proyecto va adelantado respecto al cronograma",
      "Unicamente listar actividades atrasadas",
      "Solo el porcentaje de avance fisico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la planta de compostaje, el SPI se calcula: SPI = EV / PV = $600M / $500M = 1.2. Este SPI mayor a 1 indica que el proyecto avanza un 20% mas rapido que lo planeado (adelantado). El equipo ha completado mas trabajo del programado para esta fecha, lo cual es favorable para el cumplimiento del cronograma.",
    topic: "Indice de Desempeno del Cronograma (SPI)"
  },
  {
    id: 11,
    question: "Situacion\n\nEl proyecto de ampliacion del relleno sanitario regional tiene un presupuesto total aprobado (BAC) de $10.000 millones. Con un CPI actual de 0.85 debido a sobrecostos en movimiento de tierras y sistemas de impermeabilizacion, el gerente necesita pronosticar cuanto costara realmente el proyecto al finalizar.\n\nPregunta\n\nPara hacer este pronostico, la Estimacion a la Terminacion (EAC - Estimate at Completion) permite:",
    options: [
      "Solo conocer el costo inicial",
      "Pronosticar el costo total final del proyecto basandose en el desempeno actual (CPI), ayudando a anticipar sobre-costos o ahorros",
      "Unicamente calcular el presupuesto gastado",
      "Solo estimar el tiempo restante"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del relleno sanitario, el EAC pronostica: EAC = BAC / CPI = $10.000M / 0.85 = $11.765 millones. Esto indica un sobre-costo proyectado de $1.765 millones (17.6% adicional) si continua el desempeno actual. Esta informacion permite solicitar adicion presupuestal o implementar medidas de ahorro urgentes.",
    topic: "Estimacion a la Terminacion (EAC)"
  },
  {
    id: 12,
    question: "Situacion\n\nEl proyecto de construccion del puente sobre el rio Nechi tiene especificaciones tecnicas rigurosas: concreto de 5000 PSI, acero de refuerzo grado 60, y tolerancias dimensionales estrictas. El interventor debe establecer indicadores para monitorear que la obra cumpla estos estandares de calidad durante toda la construccion.\n\nPregunta\n\nUn indicador de calidad en proyectos de obra mide:",
    options: [
      "Solo el costo de materiales",
      "El cumplimiento de especificaciones tecnicas, normas de construccion y estandares de calidad: % de ensayos aprobados, defectos por unidad, re-trabajos necesarios",
      "Unicamente la satisfaccion del contratista",
      "Solo el tiempo de ejecucion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del puente sobre el rio Nechi, los indicadores de calidad deben medir: porcentaje de ensayos de concreto aprobados (resistencia 5000 PSI), porcentaje de ensayos de acero grado 60 conformes, cumplimiento de tolerancias dimensionales, numero de elementos rechazados por defectos, porcentaje de re-trabajos necesarios. Estos indicadores garantizan el cumplimiento de especificaciones.",
    topic: "Indicadores de calidad"
  },
  {
    id: 13,
    question: "Situacion\n\nEn el proyecto de pavimentacion de la via Marinilla-El Penol, el interventor quiere comparar el rendimiento de los frentes de trabajo. El frente A completo 150 metros cubicos de concreto hidraulico con 320 horas-hombre. El frente B completo 120 metros cubicos con 280 horas-hombre. Necesita calcular la productividad de cada frente.\n\nPregunta\n\nEl indicador de productividad de mano de obra se calcula como:",
    options: [
      "Solo el salario pagado",
      "Unidades de producto generadas (m3, m2, ml) / Horas-hombre empleadas",
      "Unicamente el numero de trabajadores",
      "Solo los dias trabajados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la via Marinilla-El Penol, la productividad se calcula: Frente A = 150 m3 / 320 HH = 0.47 m3/HH. Frente B = 120 m3 / 280 HH = 0.43 m3/HH. El Frente A es mas productivo (10% superior). Este indicador permite identificar mejores practicas y oportunidades de mejora entre frentes de trabajo.",
    topic: "Indicador de productividad"
  },
  {
    id: 14,
    question: "Situacion\n\nEl programa de parques educativos construyo 10 instalaciones en municipios del Suroeste Antioqueno. La Secretaria de Educacion quiere medir el grado de satisfaccion de los usuarios (estudiantes, docentes, comunidad) con estas nuevas infraestructuras educativas, para evaluar si realmente responden a sus necesidades y expectativas.\n\nPregunta\n\nPara esta medicion, un indicador de satisfaccion de beneficiarios mide:",
    options: [
      "Solo el numero de quejas recibidas",
      "El grado de satisfaccion de la poblacion beneficiaria con los servicios o productos entregados por el proyecto, mediante encuestas o instrumentos validados",
      "Unicamente la opinion de los funcionarios",
      "Solo el presupuesto ejecutado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de los parques educativos del Suroeste, los indicadores de satisfaccion miden la percepcion de estudiantes, docentes y comunidad mediante encuestas estructuradas. Se evaluan aspectos como funcionalidad de espacios, accesibilidad, calidad de acabados, suficiencia del mobiliario. Los resultados (ej: 85% satisfechos) indican si la infraestructura responde a las necesidades reales de los usuarios.",
    topic: "Indicador de satisfaccion"
  },
  {
    id: 15,
    question: "Situacion\n\nLa PMO de la Gobernacion debe definir la frecuencia de medicion para diferentes indicadores del programa de agua potable rural: avance fisico de obras, ejecucion presupuestal, calidad del agua tratada, y cobertura del servicio en la poblacion. Cada indicador tiene diferentes caracteristicas y necesidades de seguimiento.\n\nPregunta\n\nLa periodicidad de medicion de un indicador debe definirse segun:",
    options: [
      "El animo del medidor",
      "La naturaleza del indicador, disponibilidad de datos, necesidades de toma de decisiones y recursos disponibles para la medicion",
      "Solo medir una vez al ano",
      "Unicamente cuando haya presupuesto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del programa de agua potable, las frecuencias varian: avance fisico (semanal, para tomar correctivos oportunos), ejecucion presupuestal (mensual, para pagos y compromisos), calidad del agua (diaria o semanal, por salud publica), cobertura del servicio (trimestral o semestral, indicador de resultado). La periodicidad depende de la naturaleza, disponibilidad de datos y necesidades de decision.",
    topic: "Periodicidad de indicadores"
  },
  // Seguimiento y monitoreo
  {
    id: 16,
    question: "Situacion\n\nLa Secretaria de Infraestructura de Antioquia maneja simultaneamente 45 proyectos de inversion. El secretario necesita un instrumento visual que le permita ver rapidamente el estado de todos los proyectos: cuales van en verde (a tiempo y en presupuesto), cuales en amarillo (con alertas menores), y cuales en rojo (con problemas criticos que requieren atencion inmediata).\n\nPregunta\n\nEste instrumento se denomina tablero de control (dashboard), el cual debe mostrar:",
    options: [
      "Solo informacion textual sin graficos",
      "Indicadores clave de desempeno (KPIs) en formato visual, mediante graficos, semaforos y alertas, permitiendo monitoreo rapido del estado del proyecto",
      "Unicamente datos historicos sin analisis",
      "Solo fotografias de la obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de los 45 proyectos de la Secretaria, el dashboard presenta los KPIs en formato visual (graficos de tendencia, medidores, semaforos rojo-amarillo-verde), permitiendo que el secretario identifique rapidamente que proyectos requieren atencion. Muestra avance fisico, financiero, cronograma, calidad y riesgos, facilitando la toma de decisiones sobre donde priorizar recursos y atencion.",
    topic: "Tablero de control (dashboard)"
  },
  {
    id: 17,
    question: "Situacion\n\nEl proyecto de construccion del hospital de segundo nivel de Carmen de Viboral implementa un sistema de mejora continua. El equipo planea las actividades de la semana, las ejecuta, verifica los resultados comparando con lo planeado, identifica desviaciones, y toma acciones para corregirlas y mejorar en el siguiente ciclo.\n\nPregunta\n\nEste sistema se basa en el ciclo PHVA (Planear-Hacer-Verificar-Actuar), el cual aplicado al seguimiento de proyectos implica:",
    options: [
      "Solo planear sin ejecutar",
      "Planear acciones, Hacer (ejecutar), Verificar resultados comparando con lo planeado, y Actuar corrigiendo desviaciones o mejorando procesos",
      "Unicamente hacer sin planear",
      "Solo verificar sin actuar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del hospital de Carmen de Viboral, el ciclo PHVA se aplica sistematicamente: Planear (programar actividades de la semana), Hacer (ejecutar lo planeado), Verificar (medir avances y comparar con el plan), Actuar (implementar correctivos y mejoras para el siguiente ciclo). Este enfoque de mejora continua optimiza el desempeno del proyecto semana a semana.",
    topic: "Ciclo PHVA"
  },
  {
    id: 18,
    question: "Situacion\n\nEl proyecto de construccion del parque lineal de la quebrada La Iguana tiene comites semanales de seguimiento. Sin embargo, las reuniones se extienden mas de 3 horas sin resultados concretos: no hay agenda previa, los participantes llegan sin informacion actualizada, se discuten temas sin llegar a decisiones, y no se asignan responsables de las acciones acordadas.\n\nPregunta\n\nPara corregir estas deficiencias, las reuniones de seguimiento del proyecto deben tener:",
    options: [
      "Duracion indefinida sin agenda",
      "Agenda definida, participantes clave, presentacion de avances, identificacion de problemas, toma de decisiones, asignacion de responsables y acta documentada",
      "Solo asistencia sin objetivos claros",
      "Unicamente quejas sin soluciones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del parque lineal de La Iguana, las reuniones efectivas requieren: agenda previa definida y distribuida, participantes clave con informacion actualizada, presentacion de avances vs. planeado, identificacion de problemas y riesgos, analisis de causas, toma de decisiones (no solo discusion), asignacion de acciones con responsables y plazos concretos, y acta documentada con compromisos para seguimiento.",
    topic: "Reuniones de seguimiento"
  },
  {
    id: 19,
    question: "Situacion\n\nEl proyecto de construccion de la planta de beneficio animal regional ha definido procesos estandarizados para la ejecucion: procedimientos para recibo de materiales, protocolos para vaciado de concreto, listas de verificacion para instalaciones electricas, y formatos para control de soldaduras. El interventor debe verificar sistematicamente que estos procesos se cumplan.\n\nPregunta\n\nEsta verificacion sistematica corresponde al concepto de aseguramiento de la calidad en proyectos, el cual se refiere a:",
    options: [
      "Solo inspeccionar productos finales",
      "Actividades sistematicas y planificadas para garantizar que el proyecto emplea los procesos correctos y cumple estandares establecidos, previniendo problemas",
      "Unicamente corregir defectos encontrados",
      "Solo llenar formatos sin verificacion real"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion de la planta de beneficio animal, el aseguramiento de calidad son actividades preventivas para garantizar el uso de procesos adecuados: auditorias al cumplimiento de procedimientos de recibo de materiales, verificacion de aplicacion de protocolos de vaciado, revision de listas de verificacion. El enfoque preventivo evita que los problemas lleguen al producto final.",
    topic: "Aseguramiento de calidad"
  },
  {
    id: 20,
    question: "Situacion\n\nEl proyecto de construccion del edificio inteligente de la Gobernacion requiere documentar el origen y caracteristicas de todos los materiales y equipos instalados: certificados de calidad del acero, fichas tecnicas de los equipos de aire acondicionado, lote de fabricacion de los cables electricos, y registro de cada instalador que intervino en cada sistema.\n\nPregunta\n\nEsta documentacion sistematica corresponde al concepto de trazabilidad en proyectos de infraestructura, la cual implica:",
    options: [
      "Solo archivar documentos desordenadamente",
      "La capacidad de rastrear el origen, ubicacion y trayectoria de materiales, componentes, actividades y decisiones del proyecto mediante registros documentados",
      "Unicamente tomar fotografias aleatorias",
      "Solo hacer listas sin verificacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del edificio inteligente, la trazabilidad permite rastrear: origen y calidad del acero (certificados del proveedor), caracteristicas de equipos de aire (fichas tecnicas), lote de cables (para recalls si hay defectos), instaladores de cada sistema (para garantias y responsabilidades). Esta documentacion es fundamental para control de calidad, gestion de garantias y resolucion de problemas futuros.",
    topic: "Trazabilidad"
  },
  // Evaluacion
  {
    id: 21,
    question: "Situacion\n\nEl programa de sustitucion de cultivos ilicitos en el Bajo Cauca Antioqueno ha ejecutado dos anos de sus cuatro anos programados. La Agencia de Renovacion del Territorio quiere evaluar si la estrategia de intervencion esta funcionando: si los beneficiarios estan cumpliendo los acuerdos, si los proyectos productivos son viables, y si es necesario ajustar el enfoque en los dos anos restantes.\n\nPregunta\n\nEste tipo de estudio corresponde a una evaluacion de procesos, la cual analiza:",
    options: [
      "Solo los resultados finales",
      "La eficiencia y efectividad de los procesos de implementacion del proyecto: estrategias utilizadas, calidad de ejecucion, uso de recursos y factores que facilitaron u obstaculizaron",
      "Unicamente el presupuesto gastado",
      "Solo la satisfaccion del contratista"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del programa de sustitucion del Bajo Cauca, la evaluacion de procesos examina como se esta implementando: si la estrategia de seleccion de beneficiarios es efectiva, si el acompanamiento tecnico es suficiente, si los tiempos de desembolso son adecuados, que factores facilitan u obstaculizan el cumplimiento de acuerdos. Los hallazgos permiten ajustar el enfoque para los dos anos restantes.",
    topic: "Evaluacion de procesos"
  },
  {
    id: 22,
    question: "Situacion\n\nEl proyecto de construccion del Parque Educativo de Jardin fue reconocido como un modelo exitoso de infraestructura educativa en Colombia. El Ministerio de Educacion quiere documentar en detalle este caso: el contexto municipal, como se diseno participativamente, como se ejecuto, los resultados de uso por la comunidad, y las lecciones que pueden aplicarse en otros municipios.\n\nPregunta\n\nEste tipo de documentacion corresponde a un estudio de caso en la evaluacion de proyectos, el cual sirve para:",
    options: [
      "Solo cumplir requisitos formales",
      "Analizar en profundidad un proyecto especifico, documentando su contexto, implementacion, resultados y lecciones, para generar conocimiento transferible",
      "Unicamente criticar negativamente",
      "Solo comparar costos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del Parque Educativo de Jardin, el estudio de caso analiza en profundidad: contexto municipal (tamano, necesidades educativas), proceso de diseno participativo con la comunidad, detalles de implementacion, resultados de apropiacion y uso, factores de exito (liderazgo local, diseno contextual). Este conocimiento detallado es transferible a los otros 79 parques educativos del programa.",
    topic: "Estudio de caso"
  },
  {
    id: 23,
    question: "Situacion\n\nEl programa de mejoramiento de vivienda rural en el Nordeste Antioqueno plantea la siguiente logica: si se entregan materiales de construccion y asistencia tecnica (insumos), las familias mejoraran sus viviendas (producto), esto reducira el hacinamiento y mejorara la salud familiar (resultado), lo cual contribuira a mejor calidad de vida y reduccion de pobreza multidimensional (impacto).\n\nPregunta\n\nEsta secuencia logica corresponde a la teoria del cambio del proyecto, la cual establece:",
    options: [
      "Solo una lista de actividades",
      "La secuencia causal de como las actividades e insumos del proyecto generaran productos, resultados e impactos, identificando supuestos criticos en cada eslabon",
      "Unicamente el presupuesto requerido",
      "Solo el cronograma de ejecucion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del programa de vivienda del Nordeste, la teoria del cambio describe la logica causal: insumos (materiales, asistencia) producen outputs (viviendas mejoradas), estos generan outcomes (reduccion hacinamiento, mejor salud), que contribuyen al impacto (calidad de vida, reduccion pobreza). Los supuestos criticos incluyen: familias aplicaran conocimientos, materiales seran de calidad, condiciones de seguridad permitiran construccion.",
    topic: "Teoria del cambio"
  },
  {
    id: 24,
    question: "Situacion\n\nEl programa de conectividad digital rural tenia como meta conectar a internet a 10.000 hogares campesinos del Oriente Antioqueno. Al cierre del programa se conectaron 7.500 hogares. El evaluador debe analizar por que no se alcanzo la meta: identificar donde estan los 2.500 hogares no conectados y las razones de la brecha.\n\nPregunta\n\nEste tipo de analisis se denomina analisis de brechas, el cual compara:",
    options: [
      "Solo los costos iniciales vs finales",
      "La situacion actual alcanzada vs la situacion deseada o planeada, identificando las diferencias (brechas) y sus causas",
      "Unicamente el tiempo programado vs ejecutado",
      "Solo el numero de beneficiarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del programa de conectividad, el analisis de brechas compara: meta (10.000 hogares) vs logro (7.500 hogares), identificando una brecha de 2.500 hogares (25%). El analisis de causas puede revelar: hogares muy dispersos con altos costos de conexion, familias que rechazaron el servicio por costos de operacion, zonas sin cobertura de energia electrica. Las causas orientan acciones para cerrar la brecha.",
    topic: "Analisis de brechas"
  },
  {
    id: 25,
    question: "Situacion\n\nEl programa de mejoramiento de caminos veredales del Suroeste Antioqueno finalizo despues de tres anos. La Secretaria de Infraestructura quiere sistematizar todo lo aprendido: las tecnicas constructivas que mejor funcionaron, los errores en la priorizacion inicial de tramos, las innovaciones en participacion comunitaria, y las recomendaciones para el proximo programa similar.\n\nPregunta\n\nEste proceso de sistematizacion corresponde a la capitalizacion de experiencias en proyectos, la cual consiste en:",
    options: [
      "Solo archivar documentos del proyecto",
      "Sistematizar, analizar y documentar la experiencia del proyecto de manera ordenada, extrayendo aprendizajes, buenas practicas y recomendaciones para compartir el conocimiento",
      "Unicamente contar anecdotas informales",
      "Solo hacer una presentacion final"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion del programa de caminos del Suroeste, la capitalizacion de experiencias sistematiza: tecnicas constructivas exitosas (placa huella vs. pavimento), errores en priorizacion (criterios que no funcionaron), innovaciones en participacion (comites veredales de seguimiento), recomendaciones (mejorar estudios previos, involucrar juntas de accion comunal desde el inicio). Este conocimiento explicito mejora el proximo programa de caminos veredales.",
    topic: "Capitalizacion de experiencias"
  }
]

export function GestionProyectosTest() {
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
                    ? "Excelente! Dominas la gestion de proyectos publicos."
                    : percentage >= 60
                    ? "Buen trabajo. Continua estudiando indicadores y seguimiento."
                    : "Sigue practicando. Revisa PMBOK y guias del DAFP."}
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
