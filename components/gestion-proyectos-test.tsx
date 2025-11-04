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

const questionsV1: Question[] = [
  // Ejecución de proyectos
  {
    id: 1,
    question: "El Plan de Ejecución del Proyecto (PEP) es un documento que:",
    options: [
      "Solo contiene el presupuesto aprobado",
      "Integra y coordina todos los planes subsidiarios del proyecto: alcance, tiempo, costos, calidad, recursos humanos, comunicaciones, riesgos y adquisiciones",
      "Únicamente describe el cronograma de actividades",
      "Solo lista los responsables del proyecto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El PEP integra todos los planes subsidiarios del proyecto definiendo cómo se ejecutará, monitoreará y controlará el proyecto. Incluye: gestión del alcance, cronograma, costos, calidad, recursos, comunicaciones, riesgos, adquisiciones y participación de interesados.",
    topic: "Plan de Ejecución"
  },
  {
    id: 2,
    question: "El cronograma de un proyecto debe identificar:",
    options: [
      "Solo la fecha de inicio",
      "La secuencia de actividades, sus duraciones, dependencias, hitos críticos, ruta crítica y fechas de inicio y fin de cada actividad",
      "Únicamente el presupuesto mensual",
      "Solo las reuniones del equipo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El cronograma detalla la secuencia lógica de actividades, duraciones estimadas, dependencias entre actividades (precedencias), hitos críticos del proyecto, identificación de la ruta crítica y fechas programadas de inicio y finalización de cada actividad.",
    topic: "Cronograma del proyecto"
  },
  {
    id: 3,
    question: "La ruta crítica de un proyecto es:",
    options: [
      "La ruta más corta entre actividades",
      "La secuencia de actividades que determina la duración total del proyecto; cualquier retraso en actividades de la ruta crítica retrasa todo el proyecto",
      "Solo las actividades más costosas",
      "Únicamente las actividades del contratista"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La ruta crítica es la secuencia más larga de actividades dependientes que determina la duración mínima del proyecto. Las actividades en la ruta crítica tienen holgura cero; cualquier retraso en ellas retrasa la fecha de terminación del proyecto.",
    topic: "Ruta crítica"
  },
  {
    id: 4,
    question: "Los hitos (milestones) de un proyecto son:",
    options: [
      "Cualquier actividad del proyecto",
      "Eventos significativos de duración cero que marcan la finalización de entregables importantes o fases del proyecto",
      "Solo las reuniones de seguimiento",
      "Únicamente los pagos realizados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los hitos son puntos de referencia que marcan eventos significativos o la finalización de entregables importantes en el proyecto (ej: aprobación de diseños, terminación de una fase, entrega de obra). Tienen duración cero y facilitan el seguimiento y control.",
    topic: "Hitos del proyecto"
  },
  {
    id: 5,
    question: "La gestión de riesgos en un proyecto incluye:",
    options: [
      "Ignorar los problemas potenciales",
      "Identificar, analizar, evaluar, planificar respuestas, implementar acciones y monitorear continuamente los riesgos que pueden afectar los objetivos del proyecto",
      "Solo reportar problemas cuando ocurren",
      "Únicamente asegurar el proyecto con pólizas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La gestión de riesgos es un proceso continuo que incluye: identificación de riesgos, análisis cualitativo y cuantitativo, evaluación de probabilidad e impacto, planificación de respuestas (evitar, mitigar, transferir, aceptar), implementación de acciones y monitoreo permanente.",
    topic: "Gestión de riesgos"
  },
  {
    id: 6,
    question: "Cuando se presenta una solicitud de cambio en el proyecto, se debe:",
    options: [
      "Aprobarla automáticamente sin análisis",
      "Evaluar el impacto en alcance, tiempo, costo y calidad; documentar formalmente la solicitud; y someter a aprobación del comité de control de cambios",
      "Rechazarla sin consideración",
      "Solo informar verbalmente al contratista"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las solicitudes de cambio deben seguir un proceso formal: documentación de la solicitud, evaluación de impactos en alcance, tiempo, costo, calidad y riesgos, análisis de alternativas, aprobación o rechazo por el comité de control de cambios, y actualización de documentos del proyecto.",
    topic: "Control de cambios"
  },
  {
    id: 7,
    question: "El acta de lecciones aprendidas de un proyecto debe registrar:",
    options: [
      "Solo los éxitos del proyecto",
      "Experiencias positivas y negativas, buenas prácticas identificadas, problemas enfrentados y soluciones implementadas, para mejorar proyectos futuros",
      "Únicamente las quejas del equipo",
      "Solo los costos finales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las lecciones aprendidas documentan conocimiento adquirido durante el proyecto: experiencias positivas y negativas, buenas prácticas, problemas enfrentados, soluciones implementadas, recomendaciones para proyectos futuros. Es una herramienta de mejora continua organizacional.",
    topic: "Lecciones aprendidas"
  },
  // Indicadores de gestión
  {
    id: 8,
    question: "Un indicador de gestión debe cumplir las siguientes características:",
    options: [
      "Ser complejo y difícil de entender",
      "Ser específico, medible, alcanzable, relevante, con tiempo definido (SMART), y tener una ficha técnica clara",
      "Solo existir en papel sin medición real",
      "Ser subjetivo y general"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los indicadores deben ser SMART: Específicos (claros y precisos), Medibles (cuantificables), Alcanzables (realistas), Relevantes (relacionados con objetivos) y con Tiempo definido. Además requieren ficha técnica que defina nombre, fórmula, fuente, frecuencia y responsable.",
    topic: "Características de indicadores"
  },
  {
    id: 9,
    question: "La fórmula del indicador de cumplimiento de cronograma es:",
    options: [
      "Solo contar los días transcurridos",
      "(Actividades completadas a tiempo / Total de actividades programadas) x 100",
      "Únicamente sumar costos",
      "Dividir el presupuesto entre el tiempo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El indicador de cumplimiento de cronograma mide el porcentaje de actividades completadas dentro del plazo programado: (Actividades completadas a tiempo / Total actividades programadas) x 100. Valores cercanos al 100% indican buen desempeño en gestión del tiempo.",
    topic: "Indicador de cumplimiento de cronograma"
  },
  {
    id: 10,
    question: "El indicador de ejecución presupuestal se calcula como:",
    options: [
      "Solo el presupuesto aprobado",
      "(Presupuesto ejecutado / Presupuesto programado) x 100",
      "Únicamente el saldo disponible",
      "Solo los gastos de personal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El indicador de ejecución presupuestal mide el porcentaje del presupuesto programado que se ha ejecutado: (Presupuesto ejecutado / Presupuesto programado) x 100. Permite evaluar la eficiencia en el uso de recursos financieros y detectar sub-ejecución o sobre-ejecución.",
    topic: "Indicador de ejecución presupuestal"
  },
  {
    id: 11,
    question: "Un indicador de eficacia mide:",
    options: [
      "Solo los recursos utilizados",
      "El grado de cumplimiento de los objetivos y metas establecidos, sin considerar los recursos empleados",
      "Únicamente el tiempo transcurrido",
      "Solo la satisfacción del personal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los indicadores de eficacia miden el grado en que se alcanzan los objetivos y metas establecidos, independientemente de los recursos utilizados. Ejemplo: % de cobertura alcanzada, % de metas cumplidas, número de beneficiarios atendidos vs. planeados.",
    topic: "Indicadores de eficacia"
  },
  {
    id: 12,
    question: "Un indicador de eficiencia mide:",
    options: [
      "Solo los resultados finales",
      "La relación entre los resultados obtenidos y los recursos utilizados (tiempo, dinero, personal), optimizando el uso de recursos",
      "Únicamente la satisfacción del usuario",
      "Solo el número de actividades realizadas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los indicadores de eficiencia miden la relación entre productos/resultados obtenidos y los recursos empleados, buscando optimizar el uso de recursos. Ejemplo: costo por kilómetro pavimentado, beneficiarios atendidos por funcionario, tiempo promedio de trámite.",
    topic: "Indicadores de eficiencia"
  },
  {
    id: 13,
    question: "Un indicador de impacto mide:",
    options: [
      "Solo el gasto realizado",
      "Los cambios o efectos de largo plazo generados por el proyecto en la población, la sociedad o el entorno, más allá de los resultados inmediatos",
      "Únicamente las actividades ejecutadas",
      "Solo la duración del proyecto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los indicadores de impacto miden los cambios o efectos de mediano y largo plazo atribuibles al proyecto en la población objetivo, la sociedad o el entorno. Ejemplo: reducción de mortalidad infantil, mejora en calidad de vida, disminución de tiempos de desplazamiento.",
    topic: "Indicadores de impacto"
  },
  {
    id: 14,
    question: "La ficha técnica de un indicador debe contener:",
    options: [
      "Solo el nombre del indicador",
      "Nombre, definición, fórmula de cálculo, unidad de medida, fuente de datos, frecuencia de medición, responsable, meta y línea base",
      "Únicamente la fórmula matemática",
      "Solo el responsable de medición"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La ficha técnica documenta: nombre del indicador, definición clara, fórmula de cálculo, unidad de medida (%, número, índice), fuente de datos, frecuencia de medición (mensual, trimestral), responsable de la medición, meta establecida y línea base (valor inicial).",
    topic: "Ficha técnica de indicador"
  },
  {
    id: 15,
    question: "La línea base de un indicador es:",
    options: [
      "La meta final del proyecto",
      "El valor inicial del indicador antes de ejecutar el proyecto, que sirve como punto de referencia para medir cambios y avances",
      "Solo el presupuesto asignado",
      "Únicamente el cronograma inicial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La línea base es la medición inicial del indicador antes de la intervención del proyecto (situación sin proyecto). Sirve como punto de referencia para comparar y medir los cambios, avances y resultados logrados durante y después de la ejecución del proyecto.",
    topic: "Línea base de indicadores"
  },
  // Seguimiento y monitoreo
  {
    id: 16,
    question: "El seguimiento del proyecto debe realizarse:",
    options: [
      "Solo al finalizar el proyecto",
      "De manera continua y periódica durante toda la ejecución, comparando lo ejecutado con lo planeado, identificando desviaciones y tomando acciones correctivas",
      "Únicamente cuando hay problemas",
      "Solo una vez al año"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El seguimiento es un proceso continuo y sistemático durante toda la ejecución del proyecto, que compara el avance real (físico, financiero, de gestión) con lo planeado, identifica desviaciones, analiza causas y toma acciones correctivas oportunas.",
    topic: "Seguimiento continuo"
  },
  {
    id: 17,
    question: "Los informes de avance del proyecto deben incluir:",
    options: [
      "Solo el estado financiero",
      "Avance físico de actividades y componentes, ejecución presupuestal, cumplimiento de cronograma, estado de indicadores, riesgos materializados, cambios aprobados y recomendaciones",
      "Únicamente quejas y reclamos",
      "Solo fotografías de la obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los informes de avance deben contener: progreso físico de actividades y entregables, ejecución presupuestal, cumplimiento del cronograma, estado de indicadores, riesgos identificados y materializados, problemas y soluciones, cambios aprobados, y recomendaciones para el siguiente periodo.",
    topic: "Informes de avance"
  },
  {
    id: 18,
    question: "El análisis de valor ganado (Earned Value Management - EVM) permite:",
    options: [
      "Solo conocer los gastos realizados",
      "Integrar mediciones de alcance, tiempo y costo para evaluar el desempeño del proyecto y pronosticar su finalización",
      "Únicamente premiar al equipo de trabajo",
      "Solo calcular el presupuesto inicial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El EVM integra alcance, cronograma y costos para medir el desempeño del proyecto. Compara el Valor Planificado (PV), Valor Ganado (EV) y Costo Real (AC) para calcular variaciones de costo y cronograma, e índices de desempeño que permiten pronosticar la finalización.",
    topic: "Valor ganado (EVM)"
  },
  {
    id: 19,
    question: "Un sistema de alertas tempranas en proyectos busca:",
    options: [
      "Solo documentar problemas después de que ocurren",
      "Identificar de manera anticipada señales de riesgo o desviaciones significativas que puedan comprometer el cumplimiento de objetivos, para tomar acciones preventivas",
      "Únicamente generar alarmas sin acciones",
      "Solo cumplir requisitos formales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El sistema de alertas tempranas identifica de manera anticipada señales de riesgo, desviaciones significativas en cronograma, presupuesto o alcance, o problemas emergentes que puedan comprometer los objetivos, permitiendo tomar acciones preventivas o correctivas oportunas.",
    topic: "Alertas tempranas"
  },
  {
    id: 20,
    question: "La Oficina de Gestión de Proyectos (PMO) tiene como función:",
    options: [
      "Solo archivar documentos del proyecto",
      "Establecer y mantener estándares de gestión de proyectos, brindar soporte metodológico, consolidar información, monitorear portafolios y promover mejores prácticas",
      "Únicamente aprobar presupuestos",
      "Solo contratar personal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La PMO (Project Management Office) establece estándares y metodologías de gestión, brinda soporte y capacitación al equipo, consolida información de proyectos, monitorea portafolios, gestiona recursos compartidos, promueve lecciones aprendidas y mejores prácticas organizacionales.",
    topic: "PMO - Oficina de proyectos"
  },
  // Evaluación
  {
    id: 21,
    question: "La evaluación intermedia (mid-term evaluation) de un proyecto se realiza:",
    options: [
      "Solo al inicio del proyecto",
      "Durante la fase de ejecución, aproximadamente a la mitad del proyecto, para verificar avances, identificar problemas y realizar ajustes necesarios",
      "Únicamente al finalizar el proyecto",
      "Solo cuando hay quejas de la comunidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La evaluación intermedia se realiza durante la ejecución (típicamente al 50% de avance) para verificar el progreso hacia los objetivos, identificar problemas emergentes, evaluar la pertinencia de la estrategia, y realizar ajustes o correcciones de rumbo si es necesario.",
    topic: "Evaluación intermedia"
  },
  {
    id: 22,
    question: "La evaluación de cierre de un proyecto debe incluir:",
    options: [
      "Solo el acta de liquidación financiera",
      "Verificación del cumplimiento de objetivos, análisis de resultados vs. metas, evaluación de eficiencia y eficacia, identificación de lecciones aprendidas y recomendaciones",
      "Únicamente fotografías de entrega",
      "Solo la firma del acta final"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La evaluación de cierre verifica el cumplimiento de objetivos y metas, analiza resultados alcanzados, evalúa eficiencia (recursos) y eficacia (objetivos), identifica factores de éxito y fracaso, documenta lecciones aprendidas, y formula recomendaciones para sostenibilidad.",
    topic: "Evaluación de cierre"
  },
  {
    id: 23,
    question: "La evaluación de impacto de un proyecto busca:",
    options: [
      "Solo contar cuántas actividades se realizaron",
      "Medir los cambios o efectos de largo plazo atribuibles al proyecto en la población beneficiaria, estableciendo relaciones causales entre la intervención y los resultados observados",
      "Únicamente verificar el gasto ejecutado",
      "Solo revisar documentos administrativos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La evaluación de impacto mide los cambios de largo plazo atribuibles al proyecto en la población, sociedad o entorno, estableciendo relaciones causales entre la intervención y los resultados. Utiliza métodos rigurosos (cuasi-experimentales, experimentales) y grupo de control para aislar el efecto del proyecto.",
    topic: "Evaluación de impacto"
  },
  {
    id: 24,
    question: "La sostenibilidad de un proyecto en la fase de operación implica:",
    options: [
      "Solo la durabilidad de las obras físicas",
      "La capacidad de mantener los beneficios y servicios del proyecto en el largo plazo, considerando aspectos financieros, institucionales, técnicos, sociales y ambientales",
      "Únicamente contar con recursos financieros",
      "Solo tener personal capacitado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La sostenibilidad requiere: viabilidad financiera para operación y mantenimiento, capacidad institucional para gestionar, disponibilidad técnica para operar, apropiación social y participación de beneficiarios, y sostenibilidad ambiental de los recursos utilizados.",
    topic: "Sostenibilidad del proyecto"
  },
  {
    id: 25,
    question: "El plan de transición o cierre de un proyecto debe incluir:",
    options: [
      "Solo la entrega de llaves de las instalaciones",
      "Transferencia formal de entregables, traspaso de conocimiento y documentación, entrega de responsabilidades operativas, liberación de recursos y cierre administrativo completo",
      "Únicamente la última factura pagada",
      "Solo el acta de terminación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El plan de transición incluye: entrega formal de productos y documentación técnica, transferencia de conocimiento al equipo operativo, traspaso de responsabilidades de operación y mantenimiento, liberación ordenada de recursos (personal, equipos), cierre contractual, administrativo y financiero completo.",
    topic: "Plan de transición y cierre"
  }
]

const questionsV2: Question[] = [
  // Ejecución de proyectos
  {
    id: 1,
    question: "La gestión de la calidad en un proyecto de infraestructura incluye:",
    options: [
      "Solo inspeccionar al final de la obra",
      "Planificar la calidad, asegurar la calidad mediante procesos preventivos, y controlar la calidad mediante inspecciones y ensayos, cumpliendo normas técnicas aplicables",
      "Únicamente tomar fotografías de la obra",
      "Solo firmar actas sin verificación real"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La gestión de calidad comprende: planificación (definir estándares y normas técnicas), aseguramiento (procesos preventivos y auditorías de calidad), y control (inspecciones, ensayos de laboratorio, pruebas de materiales) para garantizar cumplimiento de especificaciones técnicas.",
    topic: "Gestión de calidad"
  },
  {
    id: 2,
    question: "El registro de stakeholders (partes interesadas) de un proyecto debe identificar:",
    options: [
      "Solo al contratista y la entidad",
      "Todas las personas, grupos u organizaciones que afectan o son afectados por el proyecto, su nivel de interés, poder, expectativas y estrategia de relacionamiento",
      "Únicamente a los funcionarios públicos",
      "Solo a los proveedores de materiales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El registro de stakeholders identifica todas las partes interesadas (beneficiarios, comunidad, autoridades, proveedores, contratistas, opositores), analiza su nivel de interés e influencia, documenta expectativas y posibles conflictos, y define estrategias de comunicación y relacionamiento.",
    topic: "Gestión de stakeholders"
  },
  {
    id: 3,
    question: "El cuaderno de obra o bitácora del proyecto sirve para:",
    options: [
      "Solo anotar asistencia del personal",
      "Registrar cronológicamente eventos relevantes, decisiones técnicas, cambios, problemas, soluciones, visitas, ensayos y novedades significativas del proyecto",
      "Únicamente hacer dibujos de la obra",
      "Solo copiar el contrato"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El cuaderno de obra es el registro cronológico oficial del proyecto que documenta: eventos relevantes, decisiones técnicas tomadas, cambios autorizados, problemas presentados y soluciones, condiciones climáticas, visitas de autoridades, resultados de ensayos, y cualquier novedad significativa.",
    topic: "Cuaderno de obra"
  },
  {
    id: 4,
    question: "La gestión de comunicaciones del proyecto debe establecer:",
    options: [
      "Solo reuniones esporádicas sin planeación",
      "Quién necesita información, qué información, cuándo, en qué formato, mediante qué canal y quién es responsable de suministrarla",
      "Únicamente enviar correos masivos sin destinatario específico",
      "Solo hablar informalmente sin documentar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El plan de comunicaciones define: stakeholders y sus necesidades de información, tipo de información requerida (técnica, financiera, de avance), frecuencia y formato de comunicación, canales a utilizar (reuniones, informes, correo), y responsables de generar y distribuir cada comunicación.",
    topic: "Gestión de comunicaciones"
  },
  {
    id: 5,
    question: "El método de la cadena crítica (Critical Chain) mejora la gestión del proyecto mediante:",
    options: [
      "Ignorar los recursos disponibles",
      "Considerar las restricciones de recursos además de las dependencias de actividades, agregando buffers estratégicos para proteger el cronograma",
      "Solo duplicar todas las duraciones",
      "Únicamente eliminar actividades"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La cadena crítica considera no solo dependencias lógicas sino también restricciones de recursos (personal, equipos). Agrega buffers estratégicos (de proyecto, de alimentación) para proteger la ruta crítica de incertidumbres, mejorando la probabilidad de cumplir plazos.",
    topic: "Cadena crítica"
  },
  {
    id: 6,
    question: "La reunión de inicio (kick-off meeting) del proyecto debe:",
    options: [
      "Solo presentar a los asistentes",
      "Alinear expectativas, presentar objetivos, alcance, cronograma, roles y responsabilidades, reglas de trabajo, y establecer compromisos del equipo",
      "Únicamente servir refrigerio",
      "Solo tomar fotos para redes sociales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La reunión de inicio formaliza el arranque del proyecto, alinea expectativas de todas las partes, presenta objetivos y alcance, revisa cronograma y presupuesto, define roles y responsabilidades, establece reglas de comunicación y trabajo, y genera compromiso del equipo.",
    topic: "Reunión de inicio (kick-off)"
  },
  {
    id: 7,
    question: "El registro de riesgos del proyecto debe contener:",
    options: [
      "Solo una lista de problemas generales",
      "Identificación de cada riesgo, probabilidad de ocurrencia, impacto potencial, categoría, causas, estrategia de respuesta, responsable y estado de seguimiento",
      "Únicamente quejas de la comunidad",
      "Solo riesgos financieros"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El registro de riesgos documenta cada riesgo identificado con: descripción clara, probabilidad de ocurrencia (alta/media/baja), impacto potencial (alto/medio/bajo), categoría (técnico, financiero, social, ambiental), causas raíces, estrategia de respuesta, responsable de gestión y estado de monitoreo.",
    topic: "Registro de riesgos"
  },
  // Indicadores de gestión
  {
    id: 8,
    question: "El indicador de variación del costo (CV - Cost Variance) se calcula como:",
    options: [
      "Solo el costo total gastado",
      "CV = Valor Ganado (EV) - Costo Real (AC); un CV positivo indica que el proyecto está por debajo del presupuesto",
      "Únicamente el presupuesto inicial",
      "Solo los ahorros realizados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La variación del costo (CV) se calcula: CV = EV (Earned Value) - AC (Actual Cost). Un CV positivo indica que el proyecto gasta menos de lo presupuestado para el trabajo realizado (favorable). Un CV negativo indica sobre-costos (desfavorable).",
    topic: "Variación del costo (CV)"
  },
  {
    id: 9,
    question: "El Índice de Desempeño del Costo (CPI - Cost Performance Index) se calcula como:",
    options: [
      "Solo dividir el costo total entre el tiempo",
      "CPI = Valor Ganado (EV) / Costo Real (AC); un CPI mayor a 1 indica eficiencia en el uso de recursos",
      "Únicamente sumar todos los gastos",
      "Solo contar las actividades completadas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El CPI se calcula: CPI = EV / AC. Un CPI > 1 indica que se obtiene más valor del esperado por cada unidad monetaria gastada (eficiente). Un CPI < 1 indica ineficiencia en el uso de recursos financieros. CPI = 1 indica desempeño según lo planeado.",
    topic: "Índice de Desempeño del Costo (CPI)"
  },
  {
    id: 10,
    question: "El Índice de Desempeño del Cronograma (SPI - Schedule Performance Index) se calcula como:",
    options: [
      "Solo contar los días transcurridos",
      "SPI = Valor Ganado (EV) / Valor Planificado (PV); un SPI mayor a 1 indica que el proyecto va adelantado respecto al cronograma",
      "Únicamente listar actividades atrasadas",
      "Solo el porcentaje de avance físico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El SPI se calcula: SPI = EV / PV (Planned Value). Un SPI > 1 indica que el proyecto avanza más rápido que lo planeado (adelantado). Un SPI < 1 indica atrasos. SPI = 1 indica que el avance está según lo programado.",
    topic: "Índice de Desempeño del Cronograma (SPI)"
  },
  {
    id: 11,
    question: "La Estimación a la Terminación (EAC - Estimate at Completion) permite:",
    options: [
      "Solo conocer el costo inicial",
      "Pronosticar el costo total final del proyecto basándose en el desempeño actual (CPI), ayudando a anticipar sobre-costos o ahorros",
      "Únicamente calcular el presupuesto gastado",
      "Solo estimar el tiempo restante"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El EAC pronostica el costo total al completar el proyecto considerando el desempeño actual. Se calcula: EAC = BAC (Budget at Completion) / CPI. Permite anticipar el costo final y tomar decisiones sobre el presupuesto restante del proyecto.",
    topic: "Estimación a la Terminación (EAC)"
  },
  {
    id: 12,
    question: "Un indicador de calidad en proyectos de obra mide:",
    options: [
      "Solo el costo de materiales",
      "El cumplimiento de especificaciones técnicas, normas de construcción y estándares de calidad: % de ensayos aprobados, defectos por unidad, re-trabajos necesarios",
      "Únicamente la satisfacción del contratista",
      "Solo el tiempo de ejecución"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los indicadores de calidad miden el cumplimiento de especificaciones técnicas y normas: porcentaje de ensayos de materiales aprobados vs. realizados, número de defectos detectados por unidad de obra, porcentaje de re-trabajos necesarios, cumplimiento de tolerancias dimensionales.",
    topic: "Indicadores de calidad"
  },
  {
    id: 13,
    question: "El indicador de productividad de mano de obra se calcula como:",
    options: [
      "Solo el salario pagado",
      "Unidades de producto generadas (m3, m2, ml) / Horas-hombre empleadas",
      "Únicamente el número de trabajadores",
      "Solo los días trabajados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La productividad de mano de obra mide la eficiencia del recurso humano: Unidades de producto generadas (m3 de concreto, m2 de piso, ml de tubería) / Horas-hombre empleadas. Permite comparar rendimientos reales vs. planeados e identificar oportunidades de mejora.",
    topic: "Indicador de productividad"
  },
  {
    id: 14,
    question: "Un indicador de satisfacción de beneficiarios mide:",
    options: [
      "Solo el número de quejas recibidas",
      "El grado de satisfacción de la población beneficiaria con los servicios o productos entregados por el proyecto, mediante encuestas o instrumentos validados",
      "Únicamente la opinión de los funcionarios",
      "Solo el presupuesto ejecutado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los indicadores de satisfacción miden la percepción y conformidad de los beneficiarios con los resultados del proyecto, mediante encuestas, grupos focales o instrumentos validados. Ejemplo: % de beneficiarios satisfechos, índice de satisfacción promedio, Net Promoter Score (NPS).",
    topic: "Indicador de satisfacción"
  },
  {
    id: 15,
    question: "La periodicidad de medición de un indicador debe definirse según:",
    options: [
      "El ánimo del medidor",
      "La naturaleza del indicador, disponibilidad de datos, necesidades de toma de decisiones y recursos disponibles para la medición",
      "Solo medir una vez al año",
      "Únicamente cuando haya presupuesto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La frecuencia de medición depende de: naturaleza del indicador (estratégico, táctico, operativo), disponibilidad y costo de recolección de datos, necesidad de información para toma de decisiones oportuna, y recursos disponibles. Puede ser diaria, semanal, mensual, trimestral o anual.",
    topic: "Periodicidad de indicadores"
  },
  // Seguimiento y monitoreo
  {
    id: 16,
    question: "El tablero de control (dashboard) del proyecto debe mostrar:",
    options: [
      "Solo información textual sin gráficos",
      "Indicadores clave de desempeño (KPIs) en formato visual, mediante gráficos, semáforos y alertas, permitiendo monitoreo rápido del estado del proyecto",
      "Únicamente datos históricos sin análisis",
      "Solo fotografías de la obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El dashboard presenta los KPIs del proyecto en formato visual (gráficos de tendencia, medidores, semáforos rojo-amarillo-verde), permitiendo monitoreo rápido del avance físico, financiero, cronograma, calidad y riesgos. Facilita la toma de decisiones al mostrar estado actual y tendencias.",
    topic: "Tablero de control (dashboard)"
  },
  {
    id: 17,
    question: "El ciclo PHVA (Planear-Hacer-Verificar-Actuar) aplicado al seguimiento de proyectos implica:",
    options: [
      "Solo planear sin ejecutar",
      "Planear acciones, Hacer (ejecutar), Verificar resultados comparando con lo planeado, y Actuar corrigiendo desviaciones o mejorando procesos",
      "Únicamente hacer sin planear",
      "Solo verificar sin actuar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El ciclo PHVA (Deming) aplicado al proyecto: Planear (establecer objetivos y procesos), Hacer (ejecutar lo planeado), Verificar (medir y comparar resultados con lo planeado), Actuar (corregir desviaciones y mejorar continuamente). Es la base de la gestión de calidad y mejora continua.",
    topic: "Ciclo PHVA"
  },
  {
    id: 18,
    question: "Las reuniones de seguimiento del proyecto deben tener:",
    options: [
      "Duración indefinida sin agenda",
      "Agenda definida, participantes clave, presentación de avances, identificación de problemas, toma de decisiones, asignación de responsables y acta documentada",
      "Solo asistencia sin objetivos claros",
      "Únicamente quejas sin soluciones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las reuniones efectivas de seguimiento requieren: agenda previa definida, participantes clave convocados, presentación de avances vs. planeado, identificación de problemas y riesgos, análisis de causas, toma de decisiones, asignación de acciones con responsables y plazos, y acta documentada con compromisos.",
    topic: "Reuniones de seguimiento"
  },
  {
    id: 19,
    question: "El concepto de aseguramiento de la calidad en proyectos se refiere a:",
    options: [
      "Solo inspeccionar productos finales",
      "Actividades sistemáticas y planificadas para garantizar que el proyecto emplea los procesos correctos y cumple estándares establecidos, previniendo problemas",
      "Únicamente corregir defectos encontrados",
      "Solo llenar formatos sin verificación real"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El aseguramiento de calidad son actividades preventivas que garantizan el uso de procesos adecuados y cumplimiento de estándares: auditorías de calidad, revisiones de procesos, verificación de cumplimiento de normas, capacitación del equipo. Se enfoca en prevenir problemas, no solo detectarlos.",
    topic: "Aseguramiento de calidad"
  },
  {
    id: 20,
    question: "La trazabilidad en proyectos de infraestructura implica:",
    options: [
      "Solo archivar documentos desordenadamente",
      "La capacidad de rastrear el origen, ubicación y trayectoria de materiales, componentes, actividades y decisiones del proyecto mediante registros documentados",
      "Únicamente tomar fotografías aleatorias",
      "Solo hacer listas sin verificación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La trazabilidad permite rastrear mediante registros documentados: origen y calidad de materiales (certificados, ensayos), ubicación de componentes instalados, secuencia de actividades ejecutadas, decisiones técnicas tomadas, cambios autorizados. Es fundamental para control de calidad y gestión de garantías.",
    topic: "Trazabilidad"
  },
  // Evaluación
  {
    id: 21,
    question: "La evaluación de procesos de un proyecto analiza:",
    options: [
      "Solo los resultados finales",
      "La eficiencia y efectividad de los procesos de implementación del proyecto: estrategias utilizadas, calidad de ejecución, uso de recursos y factores que facilitaron u obstaculizaron",
      "Únicamente el presupuesto gastado",
      "Solo la satisfacción del contratista"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La evaluación de procesos examina cómo se implementó el proyecto: estrategias y metodologías utilizadas, calidad de la ejecución, eficiencia en el uso de recursos, pertinencia de las actividades, coordinación entre actores, factores facilitadores y obstáculos, para identificar mejoras en futuros proyectos.",
    topic: "Evaluación de procesos"
  },
  {
    id: 22,
    question: "Un estudio de caso en la evaluación de proyectos sirve para:",
    options: [
      "Solo cumplir requisitos formales",
      "Analizar en profundidad un proyecto específico, documentando su contexto, implementación, resultados y lecciones, para generar conocimiento transferible",
      "Únicamente criticar negativamente",
      "Solo comparar costos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El estudio de caso analiza en profundidad un proyecto: contexto y problemática, diseño e implementación, resultados y efectos, factores de éxito y fracaso, lecciones aprendidas. Genera conocimiento detallado y transferible que puede aplicarse a proyectos similares. Utiliza múltiples fuentes de evidencia.",
    topic: "Estudio de caso"
  },
  {
    id: 23,
    question: "La teoría del cambio de un proyecto establece:",
    options: [
      "Solo una lista de actividades",
      "La secuencia causal de cómo las actividades e insumos del proyecto generarán productos, resultados e impactos, identificando supuestos críticos en cada eslabón",
      "Únicamente el presupuesto requerido",
      "Solo el cronograma de ejecución"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La teoría del cambio describe la lógica causal del proyecto: cómo los insumos y actividades generan productos (outputs), cómo estos productos conducen a resultados (outcomes), y cómo los resultados contribuyen al impacto (impact) de largo plazo. Identifica supuestos críticos en cada eslabón causal.",
    topic: "Teoría del cambio"
  },
  {
    id: 24,
    question: "El análisis de brechas en la evaluación de proyectos compara:",
    options: [
      "Solo los costos iniciales vs finales",
      "La situación actual alcanzada vs la situación deseada o planeada, identificando las diferencias (brechas) y sus causas",
      "Únicamente el tiempo programado vs ejecutado",
      "Solo el número de beneficiarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El análisis de brechas (gap analysis) compara la situación actual lograda por el proyecto con la situación meta o deseada, identificando las diferencias (brechas) en términos de cobertura, calidad, acceso, equidad. Analiza las causas de las brechas y define acciones para cerrarlas.",
    topic: "Análisis de brechas"
  },
  {
    id: 25,
    question: "La capitalización de experiencias en proyectos consiste en:",
    options: [
      "Solo archivar documentos del proyecto",
      "Sistematizar, analizar y documentar la experiencia del proyecto de manera ordenada, extrayendo aprendizajes, buenas prácticas y recomendaciones para compartir el conocimiento",
      "Únicamente contar anécdotas informales",
      "Solo hacer una presentación final"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La capitalización de experiencias sistematiza y documenta de manera ordenada: lo vivido en el proyecto, factores de contexto, estrategias implementadas, resultados alcanzados, lecciones aprendidas, buenas prácticas identificadas, recomendaciones. Convierte la experiencia en conocimiento explícito compartible para mejorar futuros proyectos.",
    topic: "Capitalización de experiencias"
  }
]

export function GestionProyectosTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
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
    setAnswers({ ...answers, [questionId]: answerIndex })
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
          <TabsTrigger value="v1">Versión 1</TabsTrigger>
          <TabsTrigger value="v2">Versión 2</TabsTrigger>
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
                  <p className="text-sm text-muted-foreground">Puntuación</p>
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
                    ? "¡Excelente! Dominas la gestión de proyectos públicos."
                    : percentage >= 60
                    ? "Buen trabajo. Continúa estudiando indicadores y seguimiento."
                    : "Sigue practicando. Revisa PMBOK y guías del DAFP."}
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
                <p className="font-medium leading-relaxed">{question.question}</p>

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
                      {answers[question.id] === question.correctAnswer ? "¡Correcto!" : "Incorrecto"}
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
