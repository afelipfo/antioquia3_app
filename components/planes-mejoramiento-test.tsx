"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Target } from "lucide-react"
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
  // CONTROL INTERNO (8 preguntas)
  {
    id: 1,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El Sistema de Control Interno en Colombia está regulado por:",
    options: [
      "Solo normas internas de cada entidad",
      "La Ley 87 de 1993 y el Decreto 1499 de 2017 (ahora Decreto 1083 de 2015 actualizado)",
      "Únicamente el Código Civil",
      "Solo la Constitución Política"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La Ley 87 de 1993 establece normas para el ejercicio del control interno en entidades y organismos del Estado. El Decreto 1083 de 2015 (actualizado) compila y reglamenta el Sistema de Control Interno. También aplica el Modelo Estándar de Control Interno (MECI) adoptado mediante decreto.",
    topic: "Marco normativo de control interno"
  },
  {
    id: 2,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Los objetivos del Sistema de Control Interno incluyen:",
    options: [
      "Solo cuidar los activos",
      "Proteger recursos, garantizar eficacia, eficiencia y economía de operaciones, velar por el cumplimiento de normas, y garantizar confiabilidad de la información",
      "Únicamente auditar a los empleados",
      "Solo hacer informes"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el artículo 2 de la Ley 87/1993 establece que el control interno debe: proteger los recursos de la organización, garantizar eficacia, eficiencia y economía en todas las operaciones, velar por cumplimiento de normas, garantizar confiabilidad de información y oportunidad de la misma, y fomentar práctica de valores organizacionales.",
    topic: "Objetivos del control interno"
  },
  {
    id: 3,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Los componentes del Modelo Estándar de Control Interno (MECI) son:",
    options: [
      "Solo control de gestión",
      "Ambiente de control, evaluación del riesgo, actividades de control, información y comunicación, y actividades de monitoreo y mejora",
      "Únicamente auditoría",
      "Solo planes y programas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el MECI adopta el enfoque COSO e incluye 5 componentes: 1) Ambiente de control (integridad, valores, estructura); 2) Evaluación de riesgos (identificación y análisis); 3) Actividades de control (políticas y procedimientos); 4) Información y comunicación (sistemas de información); 5) Actividades de monitoreo y mejora (seguimiento continuo y evaluaciones).",
    topic: "Componentes MECI"
  },
  {
    id: 4,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La Oficina de Control Interno tiene como función principal:",
    options: [
      "Tomar decisiones administrativas",
      "Evaluar y hacer seguimiento al Sistema de Control Interno, verificar cumplimiento de políticas, y promover la cultura del autocontrol",
      "Ejecutar contratos",
      "Solo sancionar funcionarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la Oficina de Control Interno (Ley 87/1993 art. 10-12) es independiente de las áreas operativas. Funciones: evaluar eficacia del Sistema de Control Interno, verificar cumplimiento de políticas y procedimientos, realizar auditorías internas, promover cultura del autocontrol, presentar informes a la alta dirección y organismos de control. Depende del nivel directivo.",
    topic: "Oficina de Control Interno"
  },
  {
    id: 5,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El mapa de riesgos institucional debe:",
    options: [
      "Solo listar riesgos sin análisis",
      "Identificar, valorar, priorizar y establecer controles para los riesgos que pueden afectar el cumplimiento de objetivos institucionales",
      "Únicamente enumerar sanciones",
      "Solo mencionar riesgos financieros"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el mapa de riesgos (Decreto 1083/2015, Guía DAFP) identifica riesgos por proceso y objetivo estratégico, los valora según probabilidad e impacto, los prioriza (zona de riesgo), define controles existentes, calcula riesgo residual, y establece planes de tratamiento (evitar, reducir, compartir, asumir). Se actualiza periódicamente.",
    topic: "Mapa de riesgos"
  },
  {
    id: 6,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El autocontrol se refiere a:",
    options: [
      "Control externo de la Contraloría",
      "La capacidad de cada servidor público para evaluar su trabajo, detectar deficiencias, efectuar correctivos, y mejorar continuamente su gestión",
      "Solo reportes a superiores",
      "Únicamente auditoría interna"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el autocontrol (Ley 87/1993) es la capacidad del servidor de controlar su propio trabajo, conocer y aplicar normas, procedimientos y métodos, identificar errores y corregirlos oportunamente, y buscar mejora continua. Es el primer nivel de control. Requiere cultura organizacional, capacitación, y compromiso individual.",
    topic: "Autocontrol"
  },
  {
    id: 7,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Los principios del control interno incluyen:",
    options: [
      "Solo el control numérico",
      "Igualdad, moralidad, eficiencia, economía, celeridad, imparcialidad, publicidad y valoración de costos ambientales",
      "Únicamente la rentabilidad",
      "Solo el secreto profesional"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el artículo 3 de la Ley 87/1993 establece que el control interno se fundamenta en los principios constitucionales de la función administrativa (art. 209 CP): igualdad, moralidad, eficacia, economía, celeridad, imparcialidad, publicidad. Adicionalmente, valoración de costos ambientales. Guían el diseño y operación del sistema.",
    topic: "Principios del control interno"
  },
  {
    id: 8,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El Informe Anual de Evaluación del Sistema de Control Interno debe:",
    options: [
      "Solo mencionar logros sin debilidades",
      "Evaluar gestión y resultados del control interno, identificar debilidades, presentar planes de mejoramiento, y remitirse a organismos de control",
      "Únicamente listar actividades realizadas",
      "Solo reportar sanciones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el Jefe de Control Interno debe elaborar anualmente (Decreto 1083/2015) informe sobre estado del control interno: evalúa funcionamiento del sistema, identifica fortalezas y debilidades, consolida planes de mejoramiento, verifica implementación de acciones correctivas. Se envía a alta dirección, Contraloría, y DAFP. Base para mejora continua.",
    topic: "Informe anual de control interno"
  },

  // AUDITORÍA (7 preguntas)
  {
    id: 9,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La auditoría interna se diferencia de la externa en que:",
    options: [
      "No hay diferencia",
      "La interna es realizada por la Oficina de Control Interno de la misma entidad (evaluación preventiva), mientras la externa la realizan organismos de control externos como Contraloría o Auditoría General (fiscalización)",
      "La interna solo revisa caja menor",
      "La externa solo audita personal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, auditoría interna: realizada por la Oficina de Control Interno, enfoque preventivo y de mejora, asesora a la administración, independiente pero dentro de la organización. Auditoría externa: realizada por Contraloría (fiscal), Auditoría General de la República (gestión y resultados), o revisores externos, enfoque fiscalizador, totalmente independiente de la entidad auditada.",
    topic: "Auditoría interna vs externa"
  },
  {
    id: 10,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La auditoría de cumplimiento verifica:",
    options: [
      "Solo los estados financieros",
      "El cumplimiento de normas legales, reglamentarias, políticas, procedimientos, planes, programas y contratos aplicables a la entidad",
      "Únicamente metas físicas",
      "Solo opinión pública"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la auditoría de cumplimiento (compliance audit) examina si la entidad cumple con: leyes y regulaciones aplicables, políticas institucionales, manuales de procedimientos, plan de desarrollo, contratos, compromisos adquiridos. Identifica incumplimientos que pueden generar sanciones, responsabilidades, o ineficiencias. Es parte de las auditorías integrales.",
    topic: "Auditoría de cumplimiento"
  },
  {
    id: 11,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La auditoría de gestión y resultados evalúa:",
    options: [
      "Solo la contabilidad",
      "La eficacia, eficiencia y economía en el uso de recursos, el logro de metas y objetivos institucionales, y el impacto de la gestión",
      "Únicamente la legalidad",
      "Solo el presupuesto inicial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la auditoría de gestión y resultados (performance audit) evalúa las '3 E': Economía (adquisición de recursos al menor costo y calidad adecuada), Eficiencia (relación producto/insumo), Eficacia (logro de objetivos y metas). También mide impacto y valor público generado. Va más allá del cumplimiento formal, evalúa desempeño real.",
    topic: "Auditoría de gestión"
  },
  {
    id: 12,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Los hallazgos de auditoría deben contener:",
    options: [
      "Solo opiniones subjetivas",
      "Condición (situación encontrada), criterio (norma o estándar), causa (razón de la desviación), efecto (consecuencia), y recomendación",
      "Únicamente quejas",
      "Solo nombres de responsables"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, un hallazgo de auditoría completo tiene 5 atributos: 1) Condición: qué se encontró (hecho); 2) Criterio: qué debería ser (norma, política, procedimiento); 3) Causa: por qué ocurrió la desviación; 4) Efecto: consecuencias o impacto; 5) Recomendación: acciones correctivas sugeridas. Debe estar soportado con evidencia suficiente, competente y relevante.",
    topic: "Hallazgos de auditoría"
  },
  {
    id: 13,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El programa de auditoría es:",
    options: [
      "El presupuesto de la entidad",
      "El plan detallado de procedimientos y técnicas que se aplicarán durante la auditoría, incluyendo objetivos, alcance, metodología y cronograma",
      "Solo la lista de auditores",
      "Únicamente el informe final"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el programa de auditoría detalla: objetivos específicos por área a auditar, procedimientos y técnicas a aplicar (inspección, observación, confirmación, recálculo, análisis), alcance y limitaciones, cronograma de actividades, recursos necesarios, y responsables. Guía el trabajo del auditor y garantiza cobertura sistemática. Se basa en evaluación de riesgos.",
    topic: "Programa de auditoría"
  },
  {
    id: 14,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Las normas de auditoría generalmente aceptadas (NAGA) incluyen:",
    options: [
      "Solo opinión del auditor",
      "Normas personales (capacidad, independencia), normas de ejecución del trabajo (planeación, estudio y evaluación, evidencia suficiente), y normas de preparación del informe",
      "Únicamente procedimientos contables",
      "Solo fechas de auditoría"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, las NAGA se clasifican en 3 grupos: 1) Normas personales: competencia profesional, independencia mental, debido cuidado profesional; 2) Normas de ejecución: planeación adecuada, estudio y evaluación del control interno, evidencia suficiente y competente; 3) Normas de informe: expresar si los estados están conforme a principios de contabilidad, consistencia, revelación adecuada, opinión del auditor.",
    topic: "NAGA"
  },
  {
    id: 15,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El papeles de trabajo en auditoría son:",
    options: [
      "Solo borradores sin importancia",
      "Documentos que evidencian la planeación, ejecución y conclusiones de la auditoría: programas, análisis, confirmaciones, cálculos, resúmenes",
      "Únicamente informes finales",
      "Solo quejas recibidas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, los papeles de trabajo (working papers) documentan todo el proceso de auditoría: plan de auditoría, programas, evaluación de control interno, pruebas realizadas, evidencia recopilada, análisis, conclusiones, y supervisión. Soportan el informe final, permiten revisión de calidad, y sirven como evidencia del trabajo profesional. Deben ser completos, organizados y conservarse según normativa.",
    topic: "Papeles de trabajo"
  },

  // PLANES DE MEJORAMIENTO (6 preguntas)
  {
    id: 16,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Un Plan de Mejoramiento se elabora como respuesta a:",
    options: [
      "Solo por decisión voluntaria",
      "Hallazgos de auditorías (internas, externas, Contraloría, entes de control), observaciones de supervisión, o debilidades identificadas en autoevaluación",
      "Únicamente para cumplir requisitos formales",
      "Solo cuando hay escándalo público"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, los Planes de Mejoramiento se formulan en respuesta a: hallazgos de auditoría interna, informes de Control Interno, auditorías de Contraloría (CGR), Auditoría General de la República (AGR), Procuraduría, observaciones de supervisión/interventoría, autoevaluación del control interno (MECI), o evaluación de gestión institucional. Es obligatorio y con seguimiento periódico.",
    topic: "Origen de planes de mejoramiento"
  },
  {
    id: 17,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Las acciones correctivas, preventivas y de mejora se diferencian en que:",
    options: [
      "Son todas iguales",
      "Correctivas eliminan causas de no conformidades existentes, preventivas evitan que ocurran no conformidades potenciales, y de mejora optimizan procesos sin no conformidad previa",
      "Solo las correctivas son importantes",
      "No hay diferencia real"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, acción correctiva: elimina causa raíz de una no conformidad o problema ya ocurrido (reactiva). Acción preventiva: elimina causa de una no conformidad potencial identificada (proactiva). Acción de mejora: optimiza o incrementa eficacia/eficiencia de un proceso sin que exista no conformidad. Todas requieren análisis de causa y verificación de eficacia.",
    topic: "Tipos de acciones"
  },
  {
    id: 18,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Un Plan de Mejoramiento debe contener mínimo:",
    options: [
      "Solo la descripción del problema",
      "Hallazgo o debilidad identificada, análisis de causas, acciones a implementar, responsables, cronograma, recursos, indicadores de seguimiento",
      "Únicamente nombres de funcionarios",
      "Solo la fecha de elaboración"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, elementos del Plan de Mejoramiento: 1) Descripción del hallazgo/debilidad; 2) Análisis de causas raíz; 3) Acciones de mejoramiento específicas; 4) Responsable de cada acción; 5) Cronograma de implementación; 6) Recursos necesarios; 7) Indicadores de cumplimiento y eficacia; 8) Estado de avance; 9) Evidencias de implementación. Debe ser SMART (específico, medible, alcanzable, relevante, con tiempo definido).",
    topic: "Contenido del plan de mejoramiento"
  },
  {
    id: 19,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El seguimiento a Planes de Mejoramiento debe realizarse:",
    options: [
      "Solo al final del año",
      "Periódicamente según cronograma (mensual, trimestral), verificando cumplimiento de acciones, avances, dificultades, y eficacia de las medidas implementadas",
      "Únicamente cuando la Contraloría lo exija",
      "No requiere seguimiento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el seguimiento a Planes de Mejoramiento es obligatorio y continuo. Frecuencia: mensual o trimestral según criticidad. Verifica: cumplimiento del cronograma, ejecución efectiva de acciones, evidencias de implementación, resultados obtenidos, eficacia (si corrigió la debilidad), y actualización de estado. Responsables: líder del proceso, Control Interno, y alta dirección. Se reporta a organismos de control.",
    topic: "Seguimiento de planes"
  },
  {
    id: 20,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El análisis de causa raíz en planes de mejoramiento busca:",
    options: [
      "Solo culpar a las personas",
      "Identificar las causas fundamentales y profundas del problema (no solo síntomas), para diseñar acciones que realmente solucionen la situación de fondo",
      "Únicamente describir el problema",
      "Solo cumplir un requisito formal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el análisis de causa raíz identifica las causas fundamentales (por qué ocurrió), no solo síntomas o efectos. Técnicas: 5 porqués, diagrama de Ishikawa (espina de pescado), árbol de causas. Categorías comunes: métodos, personas, materiales, equipos, medio ambiente, gestión. Permite diseñar acciones efectivas que eliminen la raíz del problema, no solo correcciones superficiales temporales.",
    topic: "Análisis de causa raíz"
  },
  {
    id: 21,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Los Planes de Mejoramiento suscritos con la Contraloría General de la República son:",
    options: [
      "Opcionales y sin consecuencias",
      "Obligatorios, con seguimiento trimestral en plataforma SIRECI, y su incumplimiento puede generar responsabilidad fiscal y disciplinaria",
      "Solo informativos",
      "Únicamente recomendaciones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, los Planes de Mejoramiento derivados de auditorías de la CGR se suscriben formalmente, se registran en el sistema SIRECI (Sistema de Rendición Electrónica de la Cuenta e Informes), requieren seguimiento trimestral con cargue de evidencias, y su incumplimiento puede derivar en: proceso de responsabilidad fiscal, investigaciones disciplinarias, y afectación del Índice de Desempeño Institucional. Son de obligatorio cumplimiento.",
    topic: "Planes de Mejoramiento con CGR"
  },

  // MIPG (4 preguntas)
  {
    id: 22,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El Modelo Integrado de Planeación y Gestión (MIPG) fue adoptado mediante:",
    options: [
      "Solo circular interna",
      "Decreto 1499 de 2017 (ahora incorporado en Decreto 1083 de 2015 actualizado)",
      "Únicamente acuerdo municipal",
      "No está reglamentado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el MIPG fue adoptado por el Decreto 1499 de 2017 (ahora compilado en Decreto 1083 de 2015 Sector Función Pública, actualizado). Integra sistemas de gestión de calidad, desarrollo administrativo, control interno (MECI), y gestión ambiental en un modelo único para todas las entidades del Estado. Busca generar resultados que atiendan necesidades y resuelvan problemas de los ciudadanos.",
    topic: "Marco normativo MIPG"
  },
  {
    id: 23,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Las dimensiones del MIPG son:",
    options: [
      "Solo talento humano y presupuesto",
      "Talento Humano, Direccionamiento Estratégico y Planeación, Gestión con Valores para Resultados, Evaluación para la Gestión y Resultados, Información y Comunicación, Gestión del Conocimiento e Innovación, Control Interno",
      "Únicamente control y auditoría",
      "Solo planificación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el MIPG tiene 7 dimensiones interrelacionadas: 1) Talento Humano; 2) Direccionamiento Estratégico y Planeación; 3) Gestión con Valores para Resultados (incluye 16 políticas de gestión); 4) Evaluación para la Gestión y Resultados; 5) Información y Comunicación; 6) Gestión del Conocimiento e Innovación; 7) Control Interno. Cada dimensión tiene políticas y habilitadores transversales (información, TIC, comunicación).",
    topic: "Dimensiones del MIPG"
  },
  {
    id: 24,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El FURAG (Formulario Único de Reporte de Avances de Gestión) es:",
    options: [
      "Un trámite opcional",
      "El instrumento de autoevaluación anual del MIPG que todas las entidades deben diligenciar, reportando avances en políticas de gestión y desempeño",
      "Solo para entidades nacionales",
      "Únicamente reporte financiero"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el FURAG es el instrumento oficial para que las entidades públicas autoevalúen anualmente la implementación del MIPG. Se diligencia en plataforma del DAFP, califica el nivel de madurez en cada política de gestión (0-100%), genera el Índice de Desempeño Institucional (IDI), identifica brechas, y orienta planes de mejora. Obligatorio para todas las entidades del Estado.",
    topic: "FURAG"
  },
  {
    id: 25,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Las políticas de gestión y desempeño del MIPG incluyen:",
    options: [
      "Solo gestión presupuestal",
      "Gestión estratégica del talento humano, integridad, transparencia, servicio al ciudadano, participación ciudadana, racionalización de trámites, gestión documental, seguridad digital, defensa jurídica, entre otras (16 políticas)",
      "Únicamente contratación",
      "Solo control disciplinario"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el MIPG incluye 16 políticas de gestión y desempeño institucional: 1) Gestión estratégica del talento humano; 2) Integridad; 3) Planeación institucional; 4) Gestión presupuestal y eficiencia del gasto; 5) Fortalecimiento organizacional; 6) Transparencia y acceso a información; 7) Servicio al ciudadano; 8) Participación ciudadana; 9) Racionalización de trámites; 10) Gestión documental; 11) Seguridad digital; 12) Defensa jurídica; 13) Gestión del conocimiento; 14) Control interno; 15) Seguimiento y evaluación; 16) Gestión territorial (solo para territoriales).",
    topic: "Políticas MIPG"
  }
]

const questionsV2: Question[] = [
  // CONTROL INTERNO AVANZADO (6 preguntas)
  {
    id: 26,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El modelo COSO (Committee of Sponsoring Organizations) enfatiza:",
    options: [
      "Solo el control financiero",
      "Un enfoque integral de control interno con 5 componentes interrelacionados: ambiente de control, evaluación de riesgos, actividades de control, información y comunicación, y monitoreo",
      "Únicamente auditoría externa",
      "Solo sanciones disciplinarias"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, COSO es el marco de referencia internacional de control interno más aceptado. COSO I (1992, actualizado 2013) define control interno con 5 componentes integrados. COSO ERM (2004, actualizado 2017) amplía a gestión de riesgos empresariales. Colombia adoptó COSO como base del MECI. Enfatiza la interrelación de componentes y que el control es responsabilidad de todos.",
    topic: "Modelo COSO"
  },
  {
    id: 27,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La segregación de funciones como actividad de control busca:",
    options: [
      "Aumentar el número de empleados",
      "Separar responsabilidades de autorización, ejecución, registro y custodia de una misma operación para reducir riesgo de error o fraude",
      "Solo distribuir trabajo",
      "Únicamente reducir costos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la segregación de funciones (separation of duties) es un control clave: ninguna persona debe controlar todas las fases de una operación. Ejemplo: quien autoriza un pago no debe ejecutarlo ni registrarlo contablemente. Si no es posible segregar (entidades pequeñas), se implementan controles compensatorios (supervisión reforzada, conciliaciones frecuentes). Previene errores y fraudes.",
    topic: "Segregación de funciones"
  },
  {
    id: 28,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Los controles preventivos, detectivos y correctivos se diferencian en que:",
    options: [
      "Son lo mismo",
      "Preventivos evitan que ocurran errores/fraudes, detectivos identifican errores ya ocurridos, y correctivos remedian errores detectados",
      "Solo los preventivos son importantes",
      "No tienen diferencia práctica"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, controles preventivos: evitan que ocurra el error o fraude (ej: segregación de funciones, autorizaciones, capacitación). Controles detectivos: identifican errores o fraudes ya ocurridos (ej: conciliaciones, revisiones, auditorías). Controles correctivos: corrigen y recuperan de errores detectados (ej: reversiones, ajustes, planes de mejora). El sistema debe combinar los tres tipos balanceadamente.",
    topic: "Tipos de controles"
  },
  {
    id: 29,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El Comité de Coordinación de Control Interno tiene como función:",
    options: [
      "Ejecutar operaciones administrativas",
      "Servir como instancia asesora del representante legal para coordinar, implementar y evaluar el Sistema de Control Interno y MIPG",
      "Solo sancionar funcionarios",
      "Únicamente elaborar presupuesto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el Comité de Coordinación de Control Interno (Decreto 1083/2015) es asesor del jefe de la entidad en temas de control interno. Funciones: evaluar estado del sistema, proponer políticas y mejoras, hacer seguimiento a planes de mejoramiento, analizar mapas de riesgos, coordinar implementación de MIPG. Integrado por: representante legal (presidente), jefe de control interno, directivos de áreas estratégicas.",
    topic: "Comité de Control Interno"
  },
  {
    id: 30,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La materialidad en auditoría se refiere a:",
    options: [
      "Solo bienes muebles",
      "El nivel de error o irregularidad que podría influir en las decisiones de los usuarios de la información; guía el alcance y profundidad de las pruebas de auditoría",
      "Únicamente activos físicos",
      "Solo documentos en papel"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la materialidad (materiality) es el umbral por encima del cual errores u omisiones podrían afectar decisiones de usuarios de la información. El auditor establece materialidad global (ej: 1-5% del presupuesto, activos o ingresos) y específica por rubro. Determina naturaleza, oportunidad y alcance de pruebas. Errores inmateriales no requieren ajuste; materiales sí. Concepto fundamental en planeación de auditoría.",
    topic: "Materialidad en auditoría"
  },
  {
    id: 31,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El riesgo de auditoría se compone de:",
    options: [
      "Solo riesgo de fraude",
      "Riesgo inherente (susceptibilidad del área a errores), riesgo de control (que controles no prevengan/detecten), y riesgo de detección (que auditor no detecte)",
      "Únicamente errores contables",
      "Solo riesgos externos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, riesgo de auditoría = Riesgo Inherente × Riesgo de Control × Riesgo de Detección. Riesgo Inherente: susceptibilidad de un área a errores significativos sin considerar controles. Riesgo de Control: que los controles no prevengan/detecten errores materiales. Riesgo de Detección: que los procedimientos del auditor no detecten errores existentes. El auditor evalúa los dos primeros para diseñar el tercero (naturaleza y alcance de pruebas).",
    topic: "Riesgo de auditoría"
  },

  // AUDITORÍA AVANZADA (6 preguntas)
  {
    id: 32,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La evidencia de auditoría debe ser:",
    options: [
      "Solo testimonios verbales",
      "Suficiente (cantidad adecuada), competente (calidad, confiable y relevante), y pertinente (relacionada con el hallazgo)",
      "Únicamente documentos internos",
      "Solo copias sin verificar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la evidencia de auditoría debe cumplir: Suficiencia (cantidad necesaria para soportar hallazgos y conclusiones), Competencia (confiable, obtenida de fuentes independientes, generada internamente con buen control, documentos originales > copias, observación directa > terceros), y Pertinencia (relevante y relacionada con el objetivo de auditoría). Tipos: física, testimonial, documental, analítica.",
    topic: "Evidencia de auditoría"
  },
  {
    id: 33,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El muestreo estadístico en auditoría permite:",
    options: [
      "Revisar solo algunos casos sin justificación",
      "Seleccionar una muestra representativa usando métodos estadísticos, permitiendo inferir conclusiones sobre la población con un nivel de confianza y riesgo medibles",
      "Únicamente revisar lo más fácil",
      "Solo auditar casos denunciados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el muestreo estadístico usa teoría de probabilidades para: determinar tamaño de muestra (basado en nivel de confianza 90-95%, error tolerable, error esperado), seleccionar muestra aleatoria (aleatoria simple, sistemática, estratificada), evaluar resultados, y proyectar hallazgos a la población con precisión cuantificable. Ventajas: objetividad, menor tamaño de muestra que juicio, cuantificación de riesgo. Requiere población homogénea.",
    topic: "Muestreo estadístico"
  },
  {
    id: 34,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La auditoría forense se enfoca en:",
    options: [
      "Solo auditoría financiera rutinaria",
      "Investigar fraudes, malversación, corrupción, recopilando y analizando evidencia con validez legal para procesos judiciales",
      "Únicamente opinión sobre estados financieros",
      "Solo evaluación de gestión"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la auditoría forense combina técnicas de auditoría, contabilidad e investigación para detectar y documentar fraudes, corrupción, lavado de activos, malversación. Características: recopilación de evidencia con cadena de custodia, análisis financiero forense, entrevistas especializadas, informes periciales con validez judicial. Apoya procesos penales, fiscales, disciplinarios. Requiere especialización y conocimiento de procedimiento penal.",
    topic: "Auditoría forense"
  },
  {
    id: 35,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La auditoría de sistemas de información evalúa:",
    options: [
      "Solo si hay computadores",
      "Controles sobre TI: seguridad lógica y física, integridad de datos, desarrollo y mantenimiento de sistemas, operaciones, contingencia, cumplimiento normativo de TI",
      "Únicamente si hay virus",
      "Solo el sitio web"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la auditoría de SI (IT audit) evalúa: controles generales de TI (accesos lógicos, segregación, cambios a programas, operaciones, respaldo, plan de contingencia) y controles de aplicación (entrada, procesamiento, salida de datos). Utiliza frameworks como COBIT, ISO 27001, NIST. Técnicas: revisión de logs, software de auditoría (ACL, IDEA), pruebas de penetración, análisis de datos. Crítica en entidades con procesos informatizados.",
    topic: "Auditoría de sistemas"
  },
  {
    id: 36,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El informe de auditoría debe contener:",
    options: [
      "Solo opiniones sin soporte",
      "Objetivo y alcance, metodología, hallazgos (con atributos completos), conclusiones, recomendaciones, respuesta del auditado, y concepto u opinión del auditor",
      "Únicamente listado de errores",
      "Solo elogios a la administración"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, estructura del informe de auditoría: 1) Objetivo, alcance y limitaciones; 2) Metodología y normas aplicadas; 3) Descripción de la entidad/área auditada; 4) Hallazgos detallados (condición, criterio, causa, efecto, recomendación); 5) Conclusiones generales; 6) Opinión o concepto del auditor; 7) Respuesta y Plan de Mejoramiento del auditado; 8) Anexos (papeles de trabajo relevantes). Debe ser claro, oportuno, constructivo.",
    topic: "Informe de auditoría"
  },
  {
    id: 37,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La auditoría continua (continuous auditing) se caracteriza por:",
    options: [
      "Auditar una vez al año",
      "Uso de tecnología para realizar pruebas de auditoría automáticas y continuas sobre transacciones y controles, generando alertas en tiempo real",
      "Solo revisión manual periódica",
      "Únicamente auditoría de cierre de año"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la auditoría continua utiliza herramientas tecnológicas (software de análisis de datos, scripts, sistemas GRC) para monitorear transacciones y controles de forma automatizada y continua. Beneficios: detección temprana de anomalías, alertas en tiempo real, cobertura del 100% de transacciones (no muestra), intervención oportuna. Requiere: datos en formato electrónico, definición de reglas de negocio, integración con sistemas transaccionales.",
    topic: "Auditoría continua"
  },

  // PLANES DE MEJORAMIENTO AVANZADO (7 preguntas)
  {
    id: 38,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El ciclo PHVA (Planear-Hacer-Verificar-Actuar) aplicado a planes de mejoramiento implica:",
    options: [
      "Solo hacer actividades sin planear",
      "Planear acciones, Hacerlas/ejecutarlas, Verificar resultados y eficacia, y Actuar para ajustar o estandarizar mejoras",
      "Únicamente verificar",
      "Solo actuar sin verificar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el ciclo PHVA (Deming) de mejora continua: Planear (identificar problema, analizar causas, planificar acciones), Hacer (implementar acciones piloto o definitivas), Verificar (medir resultados, comparar con objetivo, evaluar eficacia), Actuar (si funciona: estandarizar y documentar; si no: ajustar y repetir ciclo). Garantiza mejora sistemática y sostenible. Base de sistemas de calidad ISO 9001 y MIPG.",
    topic: "Ciclo PHVA"
  },
  {
    id: 39,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Los indicadores en planes de mejoramiento deben ser:",
    options: [
      "Genéricos y vagos",
      "SMART: Específicos, Medibles, Alcanzables, Relevantes, y con Tiempo definido para su logro",
      "Solo descriptivos sin medición",
      "Únicamente cualitativos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, los indicadores de seguimiento a planes de mejoramiento deben cumplir criterios SMART: Specific (específico, claro qué se mide), Measurable (medible cuantitativamente), Achievable (alcanzable con recursos disponibles), Relevant (relevante para el objetivo), Time-bound (con plazo definido). Ejemplo: 'Reducir tiempo de respuesta a peticiones de 15 a 10 días en 6 meses' vs vago 'mejorar atención'.",
    topic: "Indicadores SMART"
  },
  {
    id: 40,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La matriz de seguimiento a planes de mejoramiento debe registrar:",
    options: [
      "Solo el nombre del plan",
      "Hallazgo, acción, responsable, fecha compromiso, fecha real, % avance, estado (abierto/en proceso/cerrado), evidencias, y observaciones",
      "Únicamente fechas",
      "Solo nombres de auditores"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la matriz de seguimiento es la herramienta de gestión del plan. Columnas esenciales: Hallazgo/debilidad, Acción de mejora, Responsable, Fecha compromiso, Fecha ejecución real, % avance, Estado (abierto/en proceso/cerrado con evidencia/cerrado ineficaz), Evidencias adjuntas, Observaciones del seguimiento. Permite control visual, identificar retrasos, y generar reportes a dirección y organismos de control.",
    topic: "Matriz de seguimiento"
  },
  {
    id: 41,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Cuando una acción del plan de mejoramiento se implementó pero no fue eficaz (no corrigió la debilidad), se debe:",
    options: [
      "Cerrar el hallazgo sin más",
      "Reformular la acción, realizar nuevo análisis de causas, definir acción diferente, y mantener el hallazgo abierto hasta lograr eficacia",
      "Solo informar al auditor",
      "Ignorar y seguir adelante"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la implementación de una acción no garantiza el cierre del hallazgo; se requiere verificar EFICACIA (que realmente corrigió la debilidad). Si la acción fue ineficaz: no cerrar el hallazgo, replantear el análisis de causas (quizás no se identificó la causa raíz), formular acción diferente, implementar, y verificar nuevamente. El ciclo continúa hasta lograr eficacia demostrada con evidencias.",
    topic: "Verificación de eficacia"
  },
  {
    id: 42,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Las lecciones aprendidas de la implementación de planes de mejoramiento deben:",
    options: [
      "Guardarse en secreto",
      "Documentarse y difundirse en la organización para evitar repetir errores, replicar buenas prácticas, y fortalecer la cultura de mejora continua",
      "Solo comentarse informalmente",
      "Olvidarse al terminar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la gestión del conocimiento de planes de mejoramiento requiere: documentar lecciones aprendidas (éxitos y fracasos), identificar mejores prácticas replicables, compartirlas en la organización (talleres, repositorio, intranet), capacitar basado en lecciones, y actualizar procedimientos y controles. Esto transforma experiencias individuales en aprendizaje organizacional, evita repetir errores, y acelera mejora en toda la entidad.",
    topic: "Lecciones aprendidas"
  },
  {
    id: 43,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El compromiso de la alta dirección en planes de mejoramiento se demuestra mediante:",
    options: [
      "Solo firmar documentos",
      "Asignar recursos, designar responsables de alto nivel, hacer seguimiento periódico en comités, comunicar importancia, y remover obstáculos",
      "Únicamente delegar a subordinados",
      "Solo recibir informes sin acciones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el liderazgo de la alta dirección es crítico para el éxito de planes de mejoramiento. Se evidencia en: asignación de recursos (presupuesto, personal, tiempo), designación de responsables con autoridad suficiente, seguimiento en comités directivos, comunicación del compromiso, eliminación de barreras organizacionales, reconocimiento de avances, y rendición de cuentas. Sin liderazgo visible, los planes fracasan por falta de prioridad real.",
    topic: "Compromiso de alta dirección"
  },
  {
    id: 44,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La integración de planes de mejoramiento en la planeación estratégica institucional permite:",
    options: [
      "Mantenerlos separados sin relación",
      "Alinear acciones correctivas con objetivos estratégicos, priorizar recursos, y convertir debilidades en oportunidades de mejora organizacional",
      "Solo cumplir requisitos formales",
      "Únicamente para reporte externo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, los planes de mejoramiento no deben verse como carga aislada sino integrados a la planeación estratégica: vincular acciones de mejora a objetivos institucionales, incorporar en planes de acción anuales, asignar recursos en presupuesto, alinear con políticas MIPG, y aprovechar para fortalecer capacidades organizacionales. Esto garantiza sostenibilidad, priorización adecuada, y que las mejoras realmente aporten a resultados institucionales.",
    topic: "Integración con planeación estratégica"
  },

  // MIPG Y CALIDAD AVANZADO (6 preguntas)
  {
    id: 45,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El Sistema de Gestión de la Calidad (SGC) bajo norma ISO 9001 enfatiza:",
    options: [
      "Solo procedimientos documentados",
      "Enfoque al cliente, liderazgo, participación del personal, enfoque basado en procesos, mejora continua, toma de decisiones basada en evidencia, y gestión de relaciones",
      "Únicamente certificación",
      "Solo control de documentos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, ISO 9001:2015 se basa en 7 principios de gestión de calidad: 1) Enfoque al cliente (satisfacer necesidades); 2) Liderazgo (dirección unificada); 3) Compromiso de las personas; 4) Enfoque basado en procesos; 5) Mejora continua; 6) Toma de decisiones basada en evidencia; 7) Gestión de las relaciones. Requiere: identificar procesos, establecer indicadores, implementar PHVA, auditorías internas, revisión por la dirección, y mejora continua.",
    topic: "ISO 9001 y SGC"
  },
  {
    id: 46,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La caracterización de procesos debe incluir:",
    options: [
      "Solo el nombre del proceso",
      "Objetivo, alcance, responsable, proveedores, entradas, actividades, salidas, clientes, recursos, indicadores, controles, y normatividad aplicable",
      "Únicamente el diagrama de flujo",
      "Solo los cargos involucrados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la caracterización de procesos documenta: Identificación (nombre, código, tipo, responsable), Objetivo y alcance, Proveedores (quién suministra insumos), Entradas (insumos requeridos), Actividades (secuencia de pasos), Salidas (productos/servicios), Clientes (quién recibe), Recursos (humanos, tecnológicos, físicos, financieros), Indicadores de desempeño, Controles y riesgos, Documentos y registros, Normatividad aplicable. Es el ADN del proceso.",
    topic: "Caracterización de procesos"
  },
  {
    id: 47,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. Los procesos estratégicos, misionales, de apoyo y evaluación se diferencian en que:",
    options: [
      "Son todos iguales",
      "Estratégicos definen direccionamiento, misionales generan valor al cliente/ciudadano, apoyo dan soporte a misionales, y evaluación miden y mejoran",
      "Solo los misionales importan",
      "No hay diferencia real"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, mapa de procesos del sector público: Estratégicos (planeación, direccionamiento, políticas), Misionales (generan valor directo al ciudadano: educación, salud, seguridad, etc.), Apoyo/Soporte (talento humano, financiera, jurídica, TIC, gestión documental - soportan a misionales), Evaluación/Control (control interno, auditoría, medición de gestión). MIPG requiere identificar y caracterizar todos.",
    topic: "Tipos de procesos"
  },
  {
    id: 48,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La encuesta de satisfacción del ciudadano/usuario debe:",
    options: [
      "Hacerse solo cuando hay quejas",
      "Aplicarse periódicamente, medir atributos del servicio (oportunidad, acceso, calidad, trato), analizar resultados, y generar acciones de mejora",
      "Solo para cumplir requisito",
      "Únicamente si es obligación legal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la medición de satisfacción (política de servicio al ciudadano del MIPG, ISO 9001) requiere: diseño de encuesta validada, aplicación periódica (presencial, telefónica, web), muestra representativa, medir dimensiones: oportunidad, accesibilidad, calidad técnica, trato, información. Analizar resultados (tabulación, tendencias), identificar brechas, y diseñar acciones de mejora en plan de servicio al ciudadano. Retroalimenta PHVA.",
    topic: "Satisfacción del ciudadano"
  },
  {
    id: 49,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. El benchmarking en el sector público consiste en:",
    options: [
      "Solo copiar lo que hacen otros",
      "Comparar procesos, prácticas y resultados con otras entidades líderes, identificar brechas, aprender mejores prácticas, y adaptarlas al contexto propio",
      "Únicamente competir",
      "Solo hacer informes comparativos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, benchmarking es aprendizaje de mejores prácticas: 1) Identificar proceso a mejorar; 2) Seleccionar entidades referentes (líderes en ese proceso); 3) Recopilar información (visitas, encuestas, bases de datos); 4) Comparar desempeño (brechas en indicadores); 5) Identificar mejores prácticas; 6) Adaptar e implementar en la propia entidad; 7) Monitorear mejora. Acelera mejora al no 'reinventar la rueda'. Común en MIPG.",
    topic: "Benchmarking"
  },
  {
    id: 50,
    question: "Lectura: Tras una auditoría, la entidad debe formular y hacer seguimiento a un plan de mejoramiento con responsables claros. La cultura de la calidad y mejora continua se construye mediante:",
    options: [
      "Solo órdenes desde la dirección",
      "Capacitación, comunicación constante, reconocimiento de logros, participación del personal, liderazgo visible, y integración de la calidad en valores y quehacer diario",
      "Únicamente certificaciones",
      "Solo sanciones por errores"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La cultura de calidad (elemento crítico en MIPG e ISO 9001) requiere: capacitación permanente en calidad y mejora, comunicación de política y objetivos de calidad, participación activa del personal (equipos de mejora, sugerencias), liderazgo visible de directivos (modelar comportamiento), reconocimiento de aportes a calidad, integrar calidad en valores institucionales, rendición de cuentas por resultados de calidad, y paciencia (cambio cultural toma años).",
    topic: "Cultura de calidad"
  }
]

export function PlanesMejoramientoTest() {
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
  }

  const calculateScore = () => {
    let totalPoints = 0
    let earnedPoints = 0

    currentQuestions.forEach((q) => {
      totalPoints += q.points
      if (answers[q.id] === q.correctAnswer) {
        earnedPoints += q.points
      }
    })

    return { earnedPoints, totalPoints, percentage: (earnedPoints / totalPoints) * 100 }
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const score = showResults ? calculateScore() : { earnedPoints: 0, totalPoints: 0, percentage: 0 }

  return (
    <div className="space-y-6">
      {!showResults && (
        <TestTimer
          formattedTime={timer.formattedTime}
          timeColor={timer.timeColor}
          percentageRemaining={timer.percentageRemaining}
        />
      )}

      <div className="flex items-center gap-3">
        <Target className="h-8 w-8 text-purple-600" />
        <div>
          <h2 className="text-2xl font-bold">Planes de Mejoramiento y Control</h2>
          <p className="text-sm text-muted-foreground">
            Control interno, auditoría, planes de mejoramiento, y MIPG
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value)
        handleReset()
      }}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="v1">Versión 1 (25 preguntas)</TabsTrigger>
          <TabsTrigger value="v2">Versión 2 (25 preguntas)</TabsTrigger>
        </TabsList>

        <TabsContent value="v1" className="space-y-6 mt-6">
          {questionsV1.map((q) => (
            <Card key={q.id} className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-start justify-between">
                  <span className="flex-1">
                    {q.id}. {q.question}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({q.points} puntos)
                  </span>
                </CardTitle>
                <CardDescription className="text-xs italic">{q.topic}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={answers[q.id]?.toString()}
                  onValueChange={(value) => handleAnswerChange(q.id, parseInt(value))}
                  disabled={showResults}
                >
                  {q.options.map((option, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <RadioGroupItem value={index.toString()} id={`q${q.id}-${index}`} />
                      <Label
                        htmlFor={`q${q.id}-${index}`}
                        className={`flex-1 cursor-pointer ${
                          showResults
                            ? index === q.correctAnswer
                              ? "text-green-700 font-semibold"
                              : answers[q.id] === index
                              ? "text-red-700 line-through"
                              : ""
                            : ""
                        }`}
                      >
                        {option}
                        {showResults && index === q.correctAnswer && (
                          <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-600" />
                        )}
                        {showResults && answers[q.id] === index && index !== q.correctAnswer && (
                          <XCircle className="inline ml-2 h-4 w-4 text-red-600" />
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {showFeedback && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertDescription className="text-sm">
                      <strong>Explicación:</strong> {q.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="v2" className="space-y-6 mt-6">
          {questionsV2.map((q) => (
            <Card key={q.id} className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-start justify-between">
                  <span className="flex-1">
                    {q.id}. {q.question}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({q.points} puntos)
                  </span>
                </CardTitle>
                <CardDescription className="text-xs italic">{q.topic}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={answers[q.id]?.toString()}
                  onValueChange={(value) => handleAnswerChange(q.id, parseInt(value))}
                  disabled={showResults}
                >
                  {q.options.map((option, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <RadioGroupItem value={index.toString()} id={`q${q.id}-${index}`} />
                      <Label
                        htmlFor={`q${q.id}-${index}`}
                        className={`flex-1 cursor-pointer ${
                          showResults
                            ? index === q.correctAnswer
                              ? "text-green-700 font-semibold"
                              : answers[q.id] === index
                              ? "text-red-700 line-through"
                              : ""
                            : ""
                        }`}
                      >
                        {option}
                        {showResults && index === q.correctAnswer && (
                          <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-600" />
                        )}
                        {showResults && answers[q.id] === index && index !== q.correctAnswer && (
                          <XCircle className="inline ml-2 h-4 w-4 text-red-600" />
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {showFeedback && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertDescription className="text-sm">
                      <strong>Explicación:</strong> {q.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 sticky bottom-4 bg-background p-4 border rounded-lg shadow-lg">
        <Button onClick={handleSubmit} disabled={showResults} className="flex-1 bg-purple-600 hover:bg-purple-700">
          Calificar
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1">
          Reiniciar
        </Button>
      </div>

      {showResults && (
        <Card className="border-purple-300 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600" />
              Resultados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg">
                <strong>Puntaje:</strong> {score.earnedPoints} / {score.totalPoints}
              </p>
              <p className="text-lg">
                <strong>Porcentaje:</strong> {score.percentage.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">
                {score.percentage >= 80
                  ? "¡Excelente! Dominas los conceptos de control interno y mejora continua."
                  : score.percentage >= 60
                  ? "Buen trabajo. Refuerza algunos aspectos del MECI y MIPG."
                  : "Sigue estudiando. Revisa la Ley 87/1993, MECI y MIPG."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
