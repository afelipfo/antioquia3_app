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
    question: "Situacion\n\nLa Contraloria General de Antioquia realizo una auditoria a la Secretaria de Educacion Departamental y encontro hallazgos relacionados con la gestion contractual. El Secretario de Despacho solicita al equipo juridico identificar el marco normativo aplicable para formular el plan de mejoramiento.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es el marco normativo que regula el Sistema de Control Interno en Colombia?",
    options: [
      "Solo normas internas de cada entidad",
      "La Ley 87 de 1993 y el Decreto 1499 de 2017 (ahora Decreto 1083 de 2015 actualizado)",
      "Unicamente el Codigo Civil",
      "Solo la Constitucion Politica"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Secretaria de Educacion debe fundamentar su plan de mejoramiento en la Ley 87 de 1993 que establece normas para el ejercicio del control interno en entidades del Estado, y el Decreto 1083 de 2015 (actualizado) que compila y reglamenta el Sistema de Control Interno. Tambien aplica el Modelo Estandar de Control Interno (MECI) adoptado mediante decreto.",
    topic: "Marco normativo de control interno"
  },
  {
    id: 2,
    question: "Situacion\n\nEl Hospital San Juan de Dios esta implementando un nuevo Sistema de Control Interno tras detectar irregularidades en el manejo de inventarios de medicamentos. El Gerente convoca una reunion con los directivos para definir los objetivos que debe perseguir este sistema.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son los objetivos que debe cumplir el Sistema de Control Interno del hospital?",
    options: [
      "Solo cuidar los activos",
      "Proteger recursos, garantizar eficacia, eficiencia y economia de operaciones, velar por el cumplimiento de normas, y garantizar confiabilidad de la informacion",
      "Unicamente auditar a los empleados",
      "Solo hacer informes"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Hospital San Juan de Dios debe orientar su Sistema de Control Interno segun el articulo 2 de la Ley 87/1993 que establece que debe: proteger los recursos de la organizacion (como los medicamentos), garantizar eficacia, eficiencia y economia en todas las operaciones, velar por cumplimiento de normas, garantizar confiabilidad de informacion y oportunidad de la misma, y fomentar practica de valores organizacionales.",
    topic: "Objetivos del control interno"
  },
  {
    id: 3,
    question: "Situacion\n\nLa Alcaldia de Medellin esta actualizando su Modelo Estandar de Control Interno para alinearlo con las nuevas directrices del Departamento Administrativo de la Funcion Publica. El Jefe de Control Interno debe capacitar a los lideres de proceso sobre los componentes del modelo.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son los componentes del MECI que debe explicar el Jefe de Control Interno?",
    options: [
      "Solo control de gestion",
      "Ambiente de control, evaluacion del riesgo, actividades de control, informacion y comunicacion, y actividades de monitoreo y mejora",
      "Unicamente auditoria",
      "Solo planes y programas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Jefe de Control Interno de la Alcaldia debe explicar que el MECI adopta el enfoque COSO e incluye 5 componentes: 1) Ambiente de control (integridad, valores, estructura); 2) Evaluacion de riesgos (identificacion y analisis); 3) Actividades de control (politicas y procedimientos); 4) Informacion y comunicacion (sistemas de informacion); 5) Actividades de monitoreo y mejora (seguimiento continuo y evaluaciones).",
    topic: "Componentes MECI"
  },
  {
    id: 4,
    question: "Situacion\n\nLa Gobernacion de Antioquia esta reestructurando su Oficina de Control Interno debido a que el actual Jefe se pensiono. El Secretario General necesita clarificar ante el Gobernador cuales son las funciones principales que debe desempenar esta dependencia.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es la funcion principal de la Oficina de Control Interno de la Gobernacion?",
    options: [
      "Tomar decisiones administrativas",
      "Evaluar y hacer seguimiento al Sistema de Control Interno, verificar cumplimiento de politicas, y promover la cultura del autocontrol",
      "Ejecutar contratos",
      "Solo sancionar funcionarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Oficina de Control Interno de la Gobernacion segun la Ley 87/1993 art. 10-12 es independiente de las areas operativas y sus funciones son: evaluar eficacia del Sistema de Control Interno, verificar cumplimiento de politicas y procedimientos, realizar auditorias internas, promover cultura del autocontrol, presentar informes a la alta direccion y organismos de control. Depende del nivel directivo.",
    topic: "Oficina de Control Interno"
  },
  {
    id: 5,
    question: "Situacion\n\nEl Instituto de Cultura y Patrimonio de Antioquia esta elaborando su mapa de riesgos institucional para el ano 2024. El equipo de planeacion ha identificado varios riesgos pero no tiene claridad sobre como debe estructurarse el documento final.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe incluir el mapa de riesgos institucional del Instituto?",
    options: [
      "Solo listar riesgos sin analisis",
      "Identificar, valorar, priorizar y establecer controles para los riesgos que pueden afectar el cumplimiento de objetivos institucionales",
      "Unicamente enumerar sanciones",
      "Solo mencionar riesgos financieros"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el mapa de riesgos del Instituto (Decreto 1083/2015, Guia DAFP) debe identificar riesgos por proceso y objetivo estrategico, valorarlos segun probabilidad e impacto, priorizarlos (zona de riesgo), definir controles existentes, calcular riesgo residual, y establecer planes de tratamiento (evitar, reducir, compartir, asumir). Se actualiza periodicamente.",
    topic: "Mapa de riesgos"
  },
  {
    id: 6,
    question: "Situacion\n\nEn la Secretaria de Hacienda del Municipio de Envigado se detecto que un funcionario del area de tesoreria cometio errores recurrentes en la liquidacion de impuestos. El Secretario desea implementar mecanismos para que cada servidor evalue su propio trabajo.\n\nPregunta\n\nCon base en la situacion descrita, ¿que mecanismo de control debe promover el Secretario para que los funcionarios evaluen su propio trabajo?",
    options: [
      "Control externo de la Contraloria",
      "La capacidad de cada servidor publico para evaluar su trabajo, detectar deficiencias, efectuar correctivos, y mejorar continuamente su gestion",
      "Solo reportes a superiores",
      "Unicamente auditoria interna"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Secretario de Hacienda debe promover el autocontrol (Ley 87/1993) que es la capacidad del servidor de controlar su propio trabajo, conocer y aplicar normas, procedimientos y metodos, identificar errores y corregirlos oportunamente, y buscar mejora continua. Es el primer nivel de control. Requiere cultura organizacional, capacitacion, y compromiso individual.",
    topic: "Autocontrol"
  },
  {
    id: 7,
    question: "Situacion\n\nLa Universidad de Antioquia esta diseñando su nuevo Sistema de Control Interno y el Rector ha solicitado que se fundamente en los principios constitucionales. El equipo asesor debe identificar cuales son estos principios aplicables.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son los principios en los que debe fundamentarse el Sistema de Control Interno de la Universidad?",
    options: [
      "Solo el control numerico",
      "Igualdad, moralidad, eficiencia, economia, celeridad, imparcialidad, publicidad y valoracion de costos ambientales",
      "Unicamente la rentabilidad",
      "Solo el secreto profesional"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Sistema de Control Interno de la Universidad debe fundamentarse segun el articulo 3 de la Ley 87/1993 en los principios constitucionales de la funcion administrativa (art. 209 CP): igualdad, moralidad, eficacia, economia, celeridad, imparcialidad, publicidad. Adicionalmente, valoracion de costos ambientales. Guian el diseño y operacion del sistema.",
    topic: "Principios del control interno"
  },
  {
    id: 8,
    question: "Situacion\n\nEl Jefe de Control Interno de la E.S.E. Hospital La Maria debe elaborar el Informe Anual de Evaluacion del Sistema de Control Interno para presentar ante la Junta Directiva y los organismos de control. Tiene dudas sobre que contenido debe incluir.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe contener el Informe Anual de Evaluacion del Sistema de Control Interno del Hospital?",
    options: [
      "Solo mencionar logros sin debilidades",
      "Evaluar gestion y resultados del control interno, identificar debilidades, presentar planes de mejoramiento, y remitirse a organismos de control",
      "Unicamente listar actividades realizadas",
      "Solo reportar sanciones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Jefe de Control Interno del Hospital debe elaborar anualmente (Decreto 1083/2015) un informe sobre el estado del control interno que: evalua funcionamiento del sistema, identifica fortalezas y debilidades, consolida planes de mejoramiento, verifica implementacion de acciones correctivas. Se envia a alta direccion, Contraloria, y DAFP. Base para mejora continua.",
    topic: "Informe anual de control interno"
  },

  // AUDITORIA (7 preguntas)
  {
    id: 9,
    question: "Situacion\n\nLa Empresa de Desarrollo Urbano de Medellin (EDU) fue auditada tanto por su Oficina de Control Interno como por la Contraloria General de Medellin. El Director Administrativo necesita explicar a los colaboradores la diferencia entre ambos tipos de auditoria.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es la diferencia entre la auditoria interna y la auditoria externa que recibio la EDU?",
    options: [
      "No hay diferencia",
      "La interna es realizada por la Oficina de Control Interno de la misma entidad (evaluacion preventiva), mientras la externa la realizan organismos de control externos como Contraloria o Auditoria General (fiscalizacion)",
      "La interna solo revisa caja menor",
      "La externa solo audita personal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la EDU recibio dos tipos de auditoria: la interna realizada por su Oficina de Control Interno con enfoque preventivo y de mejora, asesora a la administracion, independiente pero dentro de la organizacion; y la externa realizada por la Contraloria de Medellin con enfoque fiscalizador, totalmente independiente de la entidad auditada, puede derivar en responsabilidad fiscal.",
    topic: "Auditoria interna vs externa"
  },
  {
    id: 10,
    question: "Situacion\n\nLa Contraloria General de Antioquia esta realizando una auditoria a la Secretaria de Infraestructura y se enfocara en verificar el cumplimiento de las normas de contratacion estatal en los proyectos viales. El equipo auditor debe definir el tipo de auditoria que realizara.\n\nPregunta\n\nCon base en la situacion descrita, ¿que tipo de auditoria realizara la Contraloria que se enfoca en verificar cumplimiento normativo?",
    options: [
      "Solo los estados financieros",
      "El cumplimiento de normas legales, reglamentarias, politicas, procedimientos, planes, programas y contratos aplicables a la entidad",
      "Unicamente metas fisicas",
      "Solo opinion publica"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Contraloria realizara una auditoria de cumplimiento (compliance audit) que examina si la Secretaria de Infraestructura cumple con: leyes y regulaciones aplicables (Ley 80/1993), politicas institucionales, manuales de procedimientos, plan de desarrollo, contratos, compromisos adquiridos. Identifica incumplimientos que pueden generar sanciones, responsabilidades, o ineficiencias.",
    topic: "Auditoria de cumplimiento"
  },
  {
    id: 11,
    question: "Situacion\n\nLa Auditoria General de la Republica realizara una auditoria a IDEA (Instituto para el Desarrollo de Antioquia) para evaluar si los recursos invertidos en proyectos de infraestructura generaron los resultados esperados con el mejor uso posible de los recursos.\n\nPregunta\n\nCon base en la situacion descrita, ¿que evaluara la Auditoria General de la Republica en este tipo de auditoria?",
    options: [
      "Solo la contabilidad",
      "La eficacia, eficiencia y economia en el uso de recursos, el logro de metas y objetivos institucionales, y el impacto de la gestion",
      "Unicamente la legalidad",
      "Solo el presupuesto inicial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Auditoria General de la Republica realizara una auditoria de gestion y resultados (performance audit) a IDEA que evalua las '3 E': Economia (adquisicion de recursos al menor costo y calidad adecuada), Eficiencia (relacion producto/insumo), Eficacia (logro de objetivos y metas). Tambien mide impacto y valor publico generado.",
    topic: "Auditoria de gestion"
  },
  {
    id: 12,
    question: "Situacion\n\nEl equipo auditor de la Contraloria de Antioquia encontro irregularidades en la ejecucion de un contrato de obra en el Municipio de Bello. Deben documentar el hallazgo de forma completa para incluirlo en el informe final de auditoria.\n\nPregunta\n\nCon base en la situacion descrita, ¿que elementos debe contener el hallazgo de auditoria que documentara el equipo?",
    options: [
      "Solo opiniones subjetivas",
      "Condicion (situacion encontrada), criterio (norma o estandar), causa (razon de la desviacion), efecto (consecuencia), y recomendacion",
      "Unicamente quejas",
      "Solo nombres de responsables"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el hallazgo sobre el contrato en Bello debe tener 5 atributos: 1) Condicion: que se encontro (hecho); 2) Criterio: que deberia ser (norma, politica, procedimiento); 3) Causa: por que ocurrio la desviacion; 4) Efecto: consecuencias o impacto; 5) Recomendacion: acciones correctivas sugeridas. Debe estar soportado con evidencia suficiente, competente y relevante.",
    topic: "Hallazgos de auditoria"
  },
  {
    id: 13,
    question: "Situacion\n\nLa Oficina de Control Interno de Metro de Medellin va a realizar una auditoria al proceso de contratacion. El Jefe de Control Interno debe elaborar el documento que guiara al equipo auditor en la ejecucion del trabajo.\n\nPregunta\n\nCon base en la situacion descrita, ¿que documento debe elaborar el Jefe de Control Interno para guiar la auditoria?",
    options: [
      "El presupuesto de la entidad",
      "El plan detallado de procedimientos y tecnicas que se aplicaran durante la auditoria, incluyendo objetivos, alcance, metodologia y cronograma",
      "Solo la lista de auditores",
      "Unicamente el informe final"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Jefe de Control Interno debe elaborar el programa de auditoria que detalla: objetivos especificos por area a auditar, procedimientos y tecnicas a aplicar (inspeccion, observacion, confirmacion, recalculo, analisis), alcance y limitaciones, cronograma de actividades, recursos necesarios, y responsables. Guia el trabajo del auditor y garantiza cobertura sistematica.",
    topic: "Programa de auditoria"
  },
  {
    id: 14,
    question: "Situacion\n\nUn auditor recien vinculado a la Contraloria General de Antioquia esta participando en su primera auditoria. El coordinador del equipo le explica que debe aplicar las normas de auditoria generalmente aceptadas en todo su trabajo.\n\nPregunta\n\nCon base en la situacion descrita, ¿que incluyen las normas de auditoria generalmente aceptadas (NAGA) que debe aplicar el auditor?",
    options: [
      "Solo opinion del auditor",
      "Normas personales (capacidad, independencia), normas de ejecucion del trabajo (planeacion, estudio y evaluacion, evidencia suficiente), y normas de preparacion del informe",
      "Unicamente procedimientos contables",
      "Solo fechas de auditoria"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el auditor debe aplicar las NAGA que se clasifican en 3 grupos: 1) Normas personales: competencia profesional, independencia mental, debido cuidado profesional; 2) Normas de ejecucion: planeacion adecuada, estudio y evaluacion del control interno, evidencia suficiente y competente; 3) Normas de informe: expresar si los estados estan conforme a principios de contabilidad, consistencia, revelacion adecuada, opinion del auditor.",
    topic: "NAGA"
  },
  {
    id: 15,
    question: "Situacion\n\nAl finalizar una auditoria a la Secretaria de Salud de Antioquia, el equipo auditor ha recopilado una gran cantidad de documentos que soportan sus hallazgos y conclusiones. El coordinador debe organizar esta documentacion de manera apropiada.\n\nPregunta\n\nCon base en la situacion descrita, ¿que son los papeles de trabajo que debe organizar el coordinador del equipo auditor?",
    options: [
      "Solo borradores sin importancia",
      "Documentos que evidencian la planeacion, ejecucion y conclusiones de la auditoria: programas, analisis, confirmaciones, calculos, resumenes",
      "Unicamente informes finales",
      "Solo quejas recibidas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, los papeles de trabajo (working papers) de la auditoria a la Secretaria de Salud documentan todo el proceso: plan de auditoria, programas, evaluacion de control interno, pruebas realizadas, evidencia recopilada, analisis, conclusiones, y supervision. Soportan el informe final, permiten revision de calidad, y sirven como evidencia del trabajo profesional. Deben ser completos, organizados y conservarse segun normativa.",
    topic: "Papeles de trabajo"
  },

  // PLANES DE MEJORAMIENTO (6 preguntas)
  {
    id: 16,
    question: "Situacion\n\nLa Contraloria Departamental de Antioquia realizo una auditoria a la Secretaria de Educacion y encontro 15 hallazgos relacionados con la ejecucion del PAE (Programa de Alimentacion Escolar). La Secretaria debe responder a estos hallazgos.\n\nPregunta\n\nCon base en la situacion descrita, ¿como respuesta a que se elabora el Plan de Mejoramiento que debe presentar la Secretaria de Educacion?",
    options: [
      "Solo por decision voluntaria",
      "Hallazgos de auditorias (internas, externas, Contraloria, entes de control), observaciones de supervision, o debilidades identificadas en autoevaluacion",
      "Unicamente para cumplir requisitos formales",
      "Solo cuando hay escandalo publico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Secretaria de Educacion debe formular su Plan de Mejoramiento en respuesta a los hallazgos de la auditoria de la Contraloria. Los planes se formulan por: hallazgos de auditoria interna, informes de Control Interno, auditorias de Contraloria (CGR), Auditoria General de la Republica (AGR), Procuraduria, observaciones de supervision/interventoria, autoevaluacion del control interno (MECI), o evaluacion de gestion institucional.",
    topic: "Origen de planes de mejoramiento"
  },
  {
    id: 17,
    question: "Situacion\n\nEn el plan de mejoramiento del Instituto de Deportes de Antioquia (INDEPORTES) se han incluido diferentes tipos de acciones. El Coordinador de Calidad debe explicar a los lideres de proceso la diferencia entre acciones correctivas, preventivas y de mejora.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es la diferencia entre las acciones correctivas, preventivas y de mejora que debe explicar el Coordinador?",
    options: [
      "Son todas iguales",
      "Correctivas eliminan causas de no conformidades existentes, preventivas evitan que ocurran no conformidades potenciales, y de mejora optimizan procesos sin no conformidad previa",
      "Solo las correctivas son importantes",
      "No hay diferencia real"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Coordinador de Calidad de INDEPORTES debe explicar que: accion correctiva elimina causa raiz de una no conformidad o problema ya ocurrido (reactiva); accion preventiva elimina causa de una no conformidad potencial identificada (proactiva); accion de mejora optimiza o incrementa eficacia/eficiencia de un proceso sin que exista no conformidad. Todas requieren analisis de causa y verificacion de eficacia.",
    topic: "Tipos de acciones"
  },
  {
    id: 18,
    question: "Situacion\n\nLa Oficina de Control Interno de la Contraloria General de Antioquia realizo una auditoria interna y encontro debilidades en el proceso de gestion documental. El Jefe de Gestion Documental debe elaborar el plan de mejoramiento pero no tiene claro que elementos debe incluir.\n\nPregunta\n\nCon base en la situacion descrita, ¿que elementos minimos debe contener el Plan de Mejoramiento que elaborara el Jefe de Gestion Documental?",
    options: [
      "Solo la descripcion del problema",
      "Hallazgo o debilidad identificada, analisis de causas, acciones a implementar, responsables, cronograma, recursos, indicadores de seguimiento",
      "Unicamente nombres de funcionarios",
      "Solo la fecha de elaboracion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Plan de Mejoramiento para gestion documental debe contener: 1) Descripcion del hallazgo/debilidad; 2) Analisis de causas raiz; 3) Acciones de mejoramiento especificas; 4) Responsable de cada accion; 5) Cronograma de implementacion; 6) Recursos necesarios; 7) Indicadores de cumplimiento y eficacia; 8) Estado de avance; 9) Evidencias de implementacion. Debe ser SMART.",
    topic: "Contenido del plan de mejoramiento"
  },
  {
    id: 19,
    question: "Situacion\n\nEl Municipio de Itagui suscribio un plan de mejoramiento con la Contraloria General de Antioquia hace seis meses. El Alcalde pregunta al Secretario de Planeacion con que frecuencia deben hacer seguimiento a las acciones comprometidas.\n\nPregunta\n\nCon base en la situacion descrita, ¿con que frecuencia debe realizarse el seguimiento al Plan de Mejoramiento del Municipio?",
    options: [
      "Solo al final del año",
      "Periodicamente segun cronograma (mensual, trimestral), verificando cumplimiento de acciones, avances, dificultades, y eficacia de las medidas implementadas",
      "Unicamente cuando la Contraloria lo exija",
      "No requiere seguimiento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el seguimiento al Plan de Mejoramiento del Municipio de Itagui es obligatorio y continuo. Frecuencia: mensual o trimestral segun criticidad. Verifica: cumplimiento del cronograma, ejecucion efectiva de acciones, evidencias de implementacion, resultados obtenidos, eficacia (si corrigio la debilidad), y actualizacion de estado. Responsables: lider del proceso, Control Interno, y alta direccion.",
    topic: "Seguimiento de planes"
  },
  {
    id: 20,
    question: "Situacion\n\nLa Secretaria de Movilidad de Medellin encontro que recurrentemente se presentan errores en la expedicion de licencias de conduccion. Al formular el plan de mejoramiento, el equipo debe identificar las causas profundas del problema.\n\nPregunta\n\nCon base en la situacion descrita, ¿que busca el analisis de causa raiz que debe realizar la Secretaria de Movilidad?",
    options: [
      "Solo culpar a las personas",
      "Identificar las causas fundamentales y profundas del problema (no solo sintomas), para diseñar acciones que realmente solucionen la situacion de fondo",
      "Unicamente describir el problema",
      "Solo cumplir un requisito formal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Secretaria de Movilidad debe realizar un analisis de causa raiz para identificar las causas fundamentales (por que ocurren los errores), no solo sintomas o efectos. Tecnicas: 5 porques, diagrama de Ishikawa (espina de pescado), arbol de causas. Categorias comunes: metodos, personas, materiales, equipos, medio ambiente, gestion. Permite diseñar acciones efectivas que eliminen la raiz del problema.",
    topic: "Analisis de causa raiz"
  },
  {
    id: 21,
    question: "Situacion\n\nLa E.S.E. Metrosalud suscribio un plan de mejoramiento con la Contraloria General de la Republica tras una auditoria que encontro hallazgos con incidencia fiscal. El Gerente pregunta sobre las consecuencias de no cumplir con este plan.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son las caracteristicas y consecuencias de los Planes de Mejoramiento suscritos con la CGR?",
    options: [
      "Opcionales y sin consecuencias",
      "Obligatorios, con seguimiento trimestral en plataforma SIRECI, y su incumplimiento puede generar responsabilidad fiscal y disciplinaria",
      "Solo informativos",
      "Unicamente recomendaciones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Plan de Mejoramiento de Metrosalud derivado de la auditoria de la CGR se suscribe formalmente, se registra en el sistema SIRECI (Sistema de Rendicion Electronica de la Cuenta e Informes), requiere seguimiento trimestral con cargue de evidencias, y su incumplimiento puede derivar en: proceso de responsabilidad fiscal, investigaciones disciplinarias, y afectacion del Indice de Desempeño Institucional.",
    topic: "Planes de Mejoramiento con CGR"
  },

  // MIPG (4 preguntas)
  {
    id: 22,
    question: "Situacion\n\nLa Secretaria de Gobierno de Antioquia esta implementando el Modelo Integrado de Planeacion y Gestion para mejorar su desempeño institucional. El Secretario necesita conocer el marco normativo que sustenta este modelo.\n\nPregunta\n\nCon base en la situacion descrita, ¿mediante que norma fue adoptado el MIPG que debe implementar la Secretaria?",
    options: [
      "Solo circular interna",
      "Decreto 1499 de 2017 (ahora incorporado en Decreto 1083 de 2015 actualizado)",
      "Unicamente acuerdo municipal",
      "No esta reglamentado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Secretaria de Gobierno debe implementar el MIPG adoptado por el Decreto 1499 de 2017 (ahora compilado en Decreto 1083 de 2015 Sector Funcion Publica, actualizado). Integra sistemas de gestion de calidad, desarrollo administrativo, control interno (MECI), y gestion ambiental en un modelo unico para todas las entidades del Estado.",
    topic: "Marco normativo MIPG"
  },
  {
    id: 23,
    question: "Situacion\n\nEl Departamento Administrativo de Planeacion de Antioquia esta capacitando a las entidades descentralizadas sobre las dimensiones del MIPG. Los asistentes preguntan cuales son estas dimensiones que deben implementar.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son las dimensiones del MIPG que deben conocer las entidades descentralizadas?",
    options: [
      "Solo talento humano y presupuesto",
      "Talento Humano, Direccionamiento Estrategico y Planeacion, Gestion con Valores para Resultados, Evaluacion para la Gestion y Resultados, Informacion y Comunicacion, Gestion del Conocimiento e Innovacion, Control Interno",
      "Unicamente control y auditoria",
      "Solo planificacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, las entidades descentralizadas deben conocer que el MIPG tiene 7 dimensiones interrelacionadas: 1) Talento Humano; 2) Direccionamiento Estrategico y Planeacion; 3) Gestion con Valores para Resultados (incluye 16 politicas de gestion); 4) Evaluacion para la Gestion y Resultados; 5) Informacion y Comunicacion; 6) Gestion del Conocimiento e Innovacion; 7) Control Interno.",
    topic: "Dimensiones del MIPG"
  },
  {
    id: 24,
    question: "Situacion\n\nLa Fabrica de Licores de Antioquia debe diligenciar el FURAG para reportar los avances en la implementacion del MIPG. El Jefe de Planeacion tiene dudas sobre que es exactamente este instrumento y cual es su proposito.\n\nPregunta\n\nCon base en la situacion descrita, ¿que es el FURAG que debe diligenciar la Fabrica de Licores?",
    options: [
      "Un tramite opcional",
      "El instrumento de autoevaluacion anual del MIPG que todas las entidades deben diligenciar, reportando avances en politicas de gestion y desempeño",
      "Solo para entidades nacionales",
      "Unicamente reporte financiero"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el FURAG es el instrumento oficial que la Fabrica de Licores debe diligenciar para autoevaluar anualmente la implementacion del MIPG. Se diligencia en plataforma del DAFP, califica el nivel de madurez en cada politica de gestion (0-100%), genera el Indice de Desempeño Institucional (IDI), identifica brechas, y orienta planes de mejora. Obligatorio para todas las entidades del Estado.",
    topic: "FURAG"
  },
  {
    id: 25,
    question: "Situacion\n\nLa Contraloria General de Antioquia esta fortaleciendo su implementacion del MIPG y necesita identificar todas las politicas de gestion y desempeño que debe abordar. El Jefe de Planeacion debe presentar un inventario completo.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son las politicas de gestion y desempeño del MIPG que debe implementar la Contraloria?",
    options: [
      "Solo gestion presupuestal",
      "Gestion estrategica del talento humano, integridad, transparencia, servicio al ciudadano, participacion ciudadana, racionalizacion de tramites, gestion documental, seguridad digital, defensa juridica, entre otras (16 politicas)",
      "Unicamente contratacion",
      "Solo control disciplinario"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Contraloria debe implementar las 16 politicas de gestion y desempeño institucional del MIPG: 1) Gestion estrategica del talento humano; 2) Integridad; 3) Planeacion institucional; 4) Gestion presupuestal; 5) Fortalecimiento organizacional; 6) Transparencia; 7) Servicio al ciudadano; 8) Participacion ciudadana; 9) Racionalizacion de tramites; 10) Gestion documental; 11) Seguridad digital; 12) Defensa juridica; 13) Gestion del conocimiento; 14) Control interno; 15) Seguimiento y evaluacion; 16) Gestion territorial.",
    topic: "Politicas MIPG"
  }
]

const questionsV2: Question[] = [
  // CONTROL INTERNO AVANZADO (6 preguntas)
  {
    id: 26,
    question: "Situacion\n\nLa Empresa de Vivienda de Antioquia (VIVA) esta actualizando su Sistema de Control Interno y el consultor contratado propone adoptar el modelo COSO como marco de referencia internacional. Los directivos preguntan en que se enfoca este modelo.\n\nPregunta\n\nCon base en la situacion descrita, ¿que enfatiza el modelo COSO que se propone adoptar en VIVA?",
    options: [
      "Solo el control financiero",
      "Un enfoque integral de control interno con 5 componentes interrelacionados: ambiente de control, evaluacion de riesgos, actividades de control, informacion y comunicacion, y monitoreo",
      "Unicamente auditoria externa",
      "Solo sanciones disciplinarias"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, VIVA adoptara COSO que es el marco de referencia internacional de control interno mas aceptado. COSO I (1992, actualizado 2013) define control interno con 5 componentes integrados. COSO ERM (2004, actualizado 2017) amplia a gestion de riesgos empresariales. Colombia adopto COSO como base del MECI. Enfatiza la interrelacion de componentes y que el control es responsabilidad de todos.",
    topic: "Modelo COSO"
  },
  {
    id: 27,
    question: "Situacion\n\nEn la Tesoreria de la Gobernacion de Antioquia se detecto que un solo funcionario autorizaba, ejecutaba y registraba los pagos. El Jefe de Control Interno recomienda implementar segregacion de funciones como control critico.\n\nPregunta\n\nCon base en la situacion descrita, ¿que busca la segregacion de funciones que recomienda implementar el Jefe de Control Interno?",
    options: [
      "Aumentar el numero de empleados",
      "Separar responsabilidades de autorizacion, ejecucion, registro y custodia de una misma operacion para reducir riesgo de error o fraude",
      "Solo distribuir trabajo",
      "Unicamente reducir costos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la segregacion de funciones en Tesoreria (separation of duties) es un control clave: ninguna persona debe controlar todas las fases de una operacion. Quien autoriza un pago no debe ejecutarlo ni registrarlo contablemente. Si no es posible segregar (entidades pequeñas), se implementan controles compensatorios (supervision reforzada, conciliaciones frecuentes). Previene errores y fraudes.",
    topic: "Segregacion de funciones"
  },
  {
    id: 28,
    question: "Situacion\n\nEl Instituto Tecnologico Metropolitano (ITM) esta diseñando sus actividades de control para el proceso de matriculas. El Coordinador de Calidad debe clasificar los controles segun su momento de aplicacion: antes, durante o despues de los errores.\n\nPregunta\n\nCon base en la situacion descrita, ¿como se clasifican los controles preventivos, detectivos y correctivos que debe diseñar el ITM?",
    options: [
      "Son lo mismo",
      "Preventivos evitan que ocurran errores/fraudes, detectivos identifican errores ya ocurridos, y correctivos remedian errores detectados",
      "Solo los preventivos son importantes",
      "No tienen diferencia practica"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ITM debe diseñar: controles preventivos que evitan que ocurra el error o fraude (ej: segregacion de funciones, autorizaciones, capacitacion); controles detectivos que identifican errores o fraudes ya ocurridos (ej: conciliaciones, revisiones, auditorias); controles correctivos que corrigen y recuperan de errores detectados (ej: reversiones, ajustes, planes de mejora). El sistema debe combinar los tres tipos.",
    topic: "Tipos de controles"
  },
  {
    id: 29,
    question: "Situacion\n\nEl Gobernador de Antioquia va a instalar el Comite de Coordinacion de Control Interno y necesita explicar a los directivos convocados cual es la funcion principal de esta instancia.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es la funcion del Comite de Coordinacion de Control Interno que instalara el Gobernador?",
    options: [
      "Ejecutar operaciones administrativas",
      "Servir como instancia asesora del representante legal para coordinar, implementar y evaluar el Sistema de Control Interno y MIPG",
      "Solo sancionar funcionarios",
      "Unicamente elaborar presupuesto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Comite de Coordinacion de Control Interno de la Gobernacion (Decreto 1083/2015) es asesor del Gobernador en temas de control interno. Funciones: evaluar estado del sistema, proponer politicas y mejoras, hacer seguimiento a planes de mejoramiento, analizar mapas de riesgos, coordinar implementacion de MIPG. Integrado por: representante legal (presidente), jefe de control interno, directivos de areas estrategicas.",
    topic: "Comite de Control Interno"
  },
  {
    id: 30,
    question: "Situacion\n\nEl equipo auditor de la Contraloria de Medellin esta planificando una auditoria al presupuesto de la Alcaldia que supera los 5 billones de pesos. Deben definir el nivel de materialidad para enfocar las pruebas de auditoria.\n\nPregunta\n\nCon base en la situacion descrita, ¿a que se refiere la materialidad que debe definir el equipo auditor?",
    options: [
      "Solo bienes muebles",
      "El nivel de error o irregularidad que podria influir en las decisiones de los usuarios de la informacion; guia el alcance y profundidad de las pruebas de auditoria",
      "Unicamente activos fisicos",
      "Solo documentos en papel"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la materialidad (materiality) para la auditoria de la Alcaldia es el umbral por encima del cual errores u omisiones podrian afectar decisiones de usuarios de la informacion. El auditor establece materialidad global (ej: 1-5% del presupuesto) y especifica por rubro. Determina naturaleza, oportunidad y alcance de pruebas. Errores inmateriales no requieren ajuste; materiales si.",
    topic: "Materialidad en auditoria"
  },
  {
    id: 31,
    question: "Situacion\n\nUn auditor senior de la Contraloria General de Antioquia esta capacitando a auditores nuevos sobre como evaluar el riesgo de auditoria. Les explica que este riesgo tiene tres componentes que deben analizar.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son los componentes del riesgo de auditoria que debe explicar el auditor senior?",
    options: [
      "Solo riesgo de fraude",
      "Riesgo inherente (susceptibilidad del area a errores), riesgo de control (que controles no prevengan/detecten), y riesgo de deteccion (que auditor no detecte)",
      "Unicamente errores contables",
      "Solo riesgos externos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el auditor senior debe explicar que riesgo de auditoria = Riesgo Inherente x Riesgo de Control x Riesgo de Deteccion. Riesgo Inherente: susceptibilidad de un area a errores significativos sin considerar controles. Riesgo de Control: que los controles no prevengan/detecten errores materiales. Riesgo de Deteccion: que los procedimientos del auditor no detecten errores existentes.",
    topic: "Riesgo de auditoria"
  },

  // AUDITORIA AVANZADA (6 preguntas)
  {
    id: 32,
    question: "Situacion\n\nEl equipo auditor de la Contraloria de Antioquia encontro irregularidades en un contrato de la Secretaria de Infraestructura. El coordinador solicita al equipo recopilar evidencia que cumpla con los requisitos tecnicos para soportar el hallazgo.\n\nPregunta\n\nCon base en la situacion descrita, ¿que caracteristicas debe tener la evidencia de auditoria que recopilara el equipo?",
    options: [
      "Solo testimonios verbales",
      "Suficiente (cantidad adecuada), competente (calidad, confiable y relevante), y pertinente (relacionada con el hallazgo)",
      "Unicamente documentos internos",
      "Solo copias sin verificar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la evidencia de auditoria debe cumplir: Suficiencia (cantidad necesaria para soportar hallazgos y conclusiones), Competencia (confiable, obtenida de fuentes independientes, documentos originales > copias, observacion directa > terceros), y Pertinencia (relevante y relacionada con el objetivo de auditoria). Tipos: fisica, testimonial, documental, analitica.",
    topic: "Evidencia de auditoria"
  },
  {
    id: 33,
    question: "Situacion\n\nLa Oficina de Control Interno de EPM debe auditar 50,000 ordenes de compra generadas en el ultimo año. Como es imposible revisarlas todas, el equipo propone aplicar muestreo estadistico para seleccionar una muestra representativa.\n\nPregunta\n\nCon base en la situacion descrita, ¿que permite el muestreo estadistico que propone aplicar el equipo de EPM?",
    options: [
      "Revisar solo algunos casos sin justificacion",
      "Seleccionar una muestra representativa usando metodos estadisticos, permitiendo inferir conclusiones sobre la poblacion con un nivel de confianza y riesgo medibles",
      "Unicamente revisar lo mas facil",
      "Solo auditar casos denunciados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el muestreo estadistico para auditar las ordenes de compra de EPM usa teoria de probabilidades para: determinar tamaño de muestra (basado en nivel de confianza 90-95%, error tolerable, error esperado), seleccionar muestra aleatoria, evaluar resultados, y proyectar hallazgos a la poblacion con precision cuantificable. Ventajas: objetividad, menor tamaño de muestra que juicio, cuantificacion de riesgo.",
    topic: "Muestreo estadistico"
  },
  {
    id: 34,
    question: "Situacion\n\nLa Fiscalia General de la Nacion solicito a la Contraloria General de la Republica apoyo para investigar un presunto caso de corrupcion en una entidad del Departamento. Se requiere recopilar evidencia con validez legal para el proceso judicial.\n\nPregunta\n\nCon base en la situacion descrita, ¿que tipo de auditoria especializada se enfoca en investigar fraudes y recopilar evidencia con validez legal?",
    options: [
      "Solo auditoria financiera rutinaria",
      "Investigar fraudes, malversacion, corrupcion, recopilando y analizando evidencia con validez legal para procesos judiciales",
      "Unicamente opinion sobre estados financieros",
      "Solo evaluacion de gestion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, se requiere auditoria forense que combina tecnicas de auditoria, contabilidad e investigacion para detectar y documentar fraudes, corrupcion, lavado de activos, malversacion. Caracteristicas: recopilacion de evidencia con cadena de custodia, analisis financiero forense, entrevistas especializadas, informes periciales con validez judicial. Apoya procesos penales, fiscales, disciplinarios.",
    topic: "Auditoria forense"
  },
  {
    id: 35,
    question: "Situacion\n\nLa Oficina de Control Interno de la Gobernacion de Antioquia va a realizar una auditoria al sistema de informacion financiera SIIF. El equipo auditor debe evaluar los controles especificos de tecnologia de informacion.\n\nPregunta\n\nCon base en la situacion descrita, ¿que evalua la auditoria de sistemas de informacion que realizara el equipo al SIIF?",
    options: [
      "Solo si hay computadores",
      "Controles sobre TI: seguridad logica y fisica, integridad de datos, desarrollo y mantenimiento de sistemas, operaciones, contingencia, cumplimiento normativo de TI",
      "Unicamente si hay virus",
      "Solo el sitio web"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la auditoria de SI (IT audit) al SIIF evalua: controles generales de TI (accesos logicos, segregacion, cambios a programas, operaciones, respaldo, plan de contingencia) y controles de aplicacion (entrada, procesamiento, salida de datos). Utiliza frameworks como COBIT, ISO 27001, NIST. Tecnicas: revision de logs, software de auditoria (ACL, IDEA), pruebas de penetracion, analisis de datos.",
    topic: "Auditoria de sistemas"
  },
  {
    id: 36,
    question: "Situacion\n\nEl equipo auditor de la Contraloria General de Antioquia esta redactando el informe final de auditoria al Municipio de Rionegro. El coordinador debe asegurar que el informe contenga todos los elementos requeridos por las normas de auditoria.\n\nPregunta\n\nCon base en la situacion descrita, ¿que elementos debe contener el informe de auditoria que esta redactando el equipo?",
    options: [
      "Solo opiniones sin soporte",
      "Objetivo y alcance, metodologia, hallazgos (con atributos completos), conclusiones, recomendaciones, respuesta del auditado, y concepto u opinion del auditor",
      "Unicamente listado de errores",
      "Solo elogios a la administracion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el informe de auditoria al Municipio de Rionegro debe contener: 1) Objetivo, alcance y limitaciones; 2) Metodologia y normas aplicadas; 3) Descripcion de la entidad/area auditada; 4) Hallazgos detallados (condicion, criterio, causa, efecto, recomendacion); 5) Conclusiones generales; 6) Opinion o concepto del auditor; 7) Respuesta y Plan de Mejoramiento del auditado; 8) Anexos.",
    topic: "Informe de auditoria"
  },
  {
    id: 37,
    question: "Situacion\n\nEPM esta implementando un sistema de auditoria continua que utiliza software especializado para monitorear transacciones en tiempo real y generar alertas automaticas cuando detecta anomalias en los pagos a proveedores.\n\nPregunta\n\nCon base en la situacion descrita, ¿que caracteriza la auditoria continua que esta implementando EPM?",
    options: [
      "Auditar una vez al año",
      "Uso de tecnologia para realizar pruebas de auditoria automaticas y continuas sobre transacciones y controles, generando alertas en tiempo real",
      "Solo revision manual periodica",
      "Unicamente auditoria de cierre de año"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, EPM esta implementando auditoria continua que utiliza herramientas tecnologicas (software de analisis de datos, scripts, sistemas GRC) para monitorear transacciones y controles de forma automatizada y continua. Beneficios: deteccion temprana de anomalias, alertas en tiempo real, cobertura del 100% de transacciones (no muestra), intervencion oportuna.",
    topic: "Auditoria continua"
  },

  // PLANES DE MEJORAMIENTO AVANZADO (7 preguntas)
  {
    id: 38,
    question: "Situacion\n\nLa Secretaria de Salud de Antioquia esta implementando acciones de mejoramiento para corregir debilidades detectadas en la gestion de historias clinicas. El Coordinador de Calidad propone aplicar el ciclo PHVA para asegurar la mejora continua.\n\nPregunta\n\nCon base en la situacion descrita, ¿que implica aplicar el ciclo PHVA al plan de mejoramiento de la Secretaria?",
    options: [
      "Solo hacer actividades sin planear",
      "Planear acciones, Hacerlas/ejecutarlas, Verificar resultados y eficacia, y Actuar para ajustar o estandarizar mejoras",
      "Unicamente verificar",
      "Solo actuar sin verificar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ciclo PHVA (Deming) para el plan de mejoramiento de historias clinicas implica: Planear (identificar problema, analizar causas, planificar acciones), Hacer (implementar acciones piloto o definitivas), Verificar (medir resultados, comparar con objetivo, evaluar eficacia), Actuar (si funciona: estandarizar y documentar; si no: ajustar y repetir ciclo). Garantiza mejora sistematica y sostenible.",
    topic: "Ciclo PHVA"
  },
  {
    id: 39,
    question: "Situacion\n\nEl Municipio de Sabaneta esta formulando indicadores para medir el avance de su plan de mejoramiento derivado de una auditoria de la Contraloria. El Jefe de Planeacion debe asegurar que los indicadores cumplan con criterios tecnicos.\n\nPregunta\n\nCon base en la situacion descrita, ¿que criterios deben cumplir los indicadores del plan de mejoramiento del Municipio?",
    options: [
      "Genericos y vagos",
      "SMART: Especificos, Medibles, Alcanzables, Relevantes, y con Tiempo definido para su logro",
      "Solo descriptivos sin medicion",
      "Unicamente cualitativos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, los indicadores del plan de mejoramiento del Municipio de Sabaneta deben cumplir criterios SMART: Specific (especifico, claro que se mide), Measurable (medible cuantitativamente), Achievable (alcanzable con recursos disponibles), Relevant (relevante para el objetivo), Time-bound (con plazo definido). Ejemplo: 'Reducir tiempo de respuesta a peticiones de 15 a 10 dias en 6 meses'.",
    topic: "Indicadores SMART"
  },
  {
    id: 40,
    question: "Situacion\n\nLa Oficina de Control Interno de la Universidad de Antioquia solicito a los lideres de proceso actualizar la matriz de seguimiento de los planes de mejoramiento. Algunos lideres no tienen claro que informacion deben registrar en esta herramienta.\n\nPregunta\n\nCon base en la situacion descrita, ¿que informacion debe registrar la matriz de seguimiento de planes de mejoramiento?",
    options: [
      "Solo el nombre del plan",
      "Hallazgo, accion, responsable, fecha compromiso, fecha real, % avance, estado (abierto/en proceso/cerrado), evidencias, y observaciones",
      "Unicamente fechas",
      "Solo nombres de auditores"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la matriz de seguimiento de la Universidad de Antioquia es la herramienta de gestion del plan. Columnas esenciales: Hallazgo/debilidad, Accion de mejora, Responsable, Fecha compromiso, Fecha ejecucion real, % avance, Estado (abierto/en proceso/cerrado con evidencia/cerrado ineficaz), Evidencias adjuntas, Observaciones del seguimiento. Permite control visual, identificar retrasos, y generar reportes.",
    topic: "Matriz de seguimiento"
  },
  {
    id: 41,
    question: "Situacion\n\nLa Secretaria de Educacion de Medellin implemento una accion correctiva para resolver problemas de demora en el pago a maestros. Al verificar la eficacia, encontraron que las demoras continuan presentandose. El Secretario pregunta que hacer.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe hacer la Secretaria cuando una accion del plan de mejoramiento se implemento pero no fue eficaz?",
    options: [
      "Cerrar el hallazgo sin mas",
      "Reformular la accion, realizar nuevo analisis de causas, definir accion diferente, y mantener el hallazgo abierto hasta lograr eficacia",
      "Solo informar al auditor",
      "Ignorar y seguir adelante"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Secretaria de Educacion no debe cerrar el hallazgo porque la implementacion de una accion no garantiza el cierre; se requiere verificar EFICACIA (que realmente corrigio la debilidad). Si la accion fue ineficaz: no cerrar el hallazgo, replantear el analisis de causas (quizas no se identifico la causa raiz), formular accion diferente, implementar, y verificar nuevamente.",
    topic: "Verificacion de eficacia"
  },
  {
    id: 42,
    question: "Situacion\n\nLa E.S.E. Hospital General de Medellin completo exitosamente un plan de mejoramiento que resolvio problemas criticos en el area de urgencias. El Gerente quiere asegurar que el conocimiento adquirido beneficie a toda la organizacion.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe hacerse con las lecciones aprendidas de la implementacion del plan de mejoramiento?",
    options: [
      "Guardarse en secreto",
      "Documentarse y difundirse en la organizacion para evitar repetir errores, replicar buenas practicas, y fortalecer la cultura de mejora continua",
      "Solo comentarse informalmente",
      "Olvidarse al terminar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Hospital debe gestionar el conocimiento del plan de mejoramiento: documentar lecciones aprendidas (exitos y fracasos), identificar mejores practicas replicables, compartirlas en la organizacion (talleres, repositorio, intranet), capacitar basado en lecciones, y actualizar procedimientos y controles. Esto transforma experiencias individuales en aprendizaje organizacional.",
    topic: "Lecciones aprendidas"
  },
  {
    id: 43,
    question: "Situacion\n\nLa Contraloria General de Antioquia detecto que varios planes de mejoramiento suscritos con municipios del departamento no se han cumplido porque los alcaldes no les dan prioridad. El Contralor Auxiliar analiza como debe demostrarse el compromiso de la alta direccion.\n\nPregunta\n\nCon base en la situacion descrita, ¿como debe demostrarse el compromiso de la alta direccion en los planes de mejoramiento?",
    options: [
      "Solo firmar documentos",
      "Asignar recursos, designar responsables de alto nivel, hacer seguimiento periodico en comites, comunicar importancia, y remover obstaculos",
      "Unicamente delegar a subordinados",
      "Solo recibir informes sin acciones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el liderazgo de los alcaldes es critico para el exito de planes de mejoramiento. Se evidencia en: asignacion de recursos (presupuesto, personal, tiempo), designacion de responsables con autoridad suficiente, seguimiento en comites directivos, comunicacion del compromiso, eliminacion de barreras organizacionales, reconocimiento de avances, y rendicion de cuentas. Sin liderazgo visible, los planes fracasan.",
    topic: "Compromiso de alta direccion"
  },
  {
    id: 44,
    question: "Situacion\n\nEl Departamento Administrativo de Planeacion de Antioquia esta asesorando a las secretarias para que integren los planes de mejoramiento en su planeacion estrategica anual, en lugar de manejarlos como documentos aislados.\n\nPregunta\n\nCon base en la situacion descrita, ¿que permite la integracion de los planes de mejoramiento en la planeacion estrategica institucional?",
    options: [
      "Mantenerlos separados sin relacion",
      "Alinear acciones correctivas con objetivos estrategicos, priorizar recursos, y convertir debilidades en oportunidades de mejora organizacional",
      "Solo cumplir requisitos formales",
      "Unicamente para reporte externo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, los planes de mejoramiento no deben verse como carga aislada sino integrados a la planeacion estrategica: vincular acciones de mejora a objetivos institucionales, incorporar en planes de accion anuales, asignar recursos en presupuesto, alinear con politicas MIPG, y aprovechar para fortalecer capacidades organizacionales. Esto garantiza sostenibilidad y priorizacion adecuada.",
    topic: "Integracion con planeacion estrategica"
  },

  // MIPG Y CALIDAD AVANZADO (6 preguntas)
  {
    id: 45,
    question: "Situacion\n\nLa Contraloria General de Antioquia esta evaluando implementar un Sistema de Gestion de la Calidad bajo norma ISO 9001. El Contralor solicita al equipo de planeacion explicar los principios fundamentales de esta norma.\n\nPregunta\n\nCon base en la situacion descrita, ¿que principios enfatiza el Sistema de Gestion de la Calidad bajo norma ISO 9001?",
    options: [
      "Solo procedimientos documentados",
      "Enfoque al cliente, liderazgo, participacion del personal, enfoque basado en procesos, mejora continua, toma de decisiones basada en evidencia, y gestion de relaciones",
      "Unicamente certificacion",
      "Solo control de documentos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, ISO 9001:2015 se basa en 7 principios de gestion de calidad: 1) Enfoque al cliente (satisfacer necesidades); 2) Liderazgo (direccion unificada); 3) Compromiso de las personas; 4) Enfoque basado en procesos; 5) Mejora continua; 6) Toma de decisiones basada en evidencia; 7) Gestion de las relaciones. Requiere: identificar procesos, establecer indicadores, implementar PHVA.",
    topic: "ISO 9001 y SGC"
  },
  {
    id: 46,
    question: "Situacion\n\nLa Secretaria de Hacienda de Antioquia esta documentando sus procesos bajo el enfoque de MIPG. El lider del proceso de recaudo tributario debe elaborar la caracterizacion de su proceso pero no tiene claro que elementos incluir.\n\nPregunta\n\nCon base en la situacion descrita, ¿que elementos debe incluir la caracterizacion del proceso de recaudo tributario?",
    options: [
      "Solo el nombre del proceso",
      "Objetivo, alcance, responsable, proveedores, entradas, actividades, salidas, clientes, recursos, indicadores, controles, y normatividad aplicable",
      "Unicamente el diagrama de flujo",
      "Solo los cargos involucrados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la caracterizacion del proceso de recaudo debe documentar: Identificacion (nombre, codigo, tipo, responsable), Objetivo y alcance, Proveedores (quien suministra insumos), Entradas (insumos requeridos), Actividades (secuencia de pasos), Salidas (productos/servicios), Clientes (quien recibe), Recursos (humanos, tecnologicos, fisicos, financieros), Indicadores de desempeño, Controles y riesgos, Documentos y registros, Normatividad aplicable.",
    topic: "Caracterizacion de procesos"
  },
  {
    id: 47,
    question: "Situacion\n\nLa Contraloria General de Antioquia esta actualizando su mapa de procesos institucional. El Jefe de Planeacion debe clasificar los procesos segun su naturaleza: estrategicos, misionales, de apoyo y de evaluacion.\n\nPregunta\n\nCon base en la situacion descrita, ¿como se diferencian los procesos estrategicos, misionales, de apoyo y de evaluacion?",
    options: [
      "Son todos iguales",
      "Estrategicos definen direccionamiento, misionales generan valor al cliente/ciudadano, apoyo dan soporte a misionales, y evaluacion miden y mejoran",
      "Solo los misionales importan",
      "No hay diferencia real"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el mapa de procesos de la Contraloria debe clasificar: Estrategicos (planeacion, direccionamiento, politicas), Misionales (generan valor directo al ciudadano: control fiscal, auditoria, responsabilidad fiscal), Apoyo/Soporte (talento humano, financiera, juridica, TIC, gestion documental - soportan a misionales), Evaluacion/Control (control interno, medicion de gestion). MIPG requiere identificar y caracterizar todos.",
    topic: "Tipos de procesos"
  },
  {
    id: 48,
    question: "Situacion\n\nLa Secretaria de Participacion Ciudadana de Medellin debe medir la satisfaccion de los usuarios con los servicios que presta. El Coordinador de Calidad propone aplicar encuestas periodicas para identificar oportunidades de mejora.\n\nPregunta\n\nCon base en la situacion descrita, ¿como debe aplicarse la encuesta de satisfaccion del ciudadano/usuario?",
    options: [
      "Hacerse solo cuando hay quejas",
      "Aplicarse periodicamente, medir atributos del servicio (oportunidad, acceso, calidad, trato), analizar resultados, y generar acciones de mejora",
      "Solo para cumplir requisito",
      "Unicamente si es obligacion legal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la medicion de satisfaccion de la Secretaria (politica de servicio al ciudadano del MIPG, ISO 9001) requiere: diseño de encuesta validada, aplicacion periodica (presencial, telefonica, web), muestra representativa, medir dimensiones: oportunidad, accesibilidad, calidad tecnica, trato, informacion. Analizar resultados (tabulacion, tendencias), identificar brechas, y diseñar acciones de mejora.",
    topic: "Satisfaccion del ciudadano"
  },
  {
    id: 49,
    question: "Situacion\n\nLa Oficina de Control Interno de la Gobernacion de Antioquia quiere mejorar su proceso de auditoria interna comparandolo con el de otras contralorias territoriales reconocidas por sus buenas practicas. Proponen realizar un ejercicio de benchmarking.\n\nPregunta\n\nCon base en la situacion descrita, ¿en que consiste el benchmarking que propone realizar la Oficina de Control Interno?",
    options: [
      "Solo copiar lo que hacen otros",
      "Comparar procesos, practicas y resultados con otras entidades lideres, identificar brechas, aprender mejores practicas, y adaptarlas al contexto propio",
      "Unicamente competir",
      "Solo hacer informes comparativos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, benchmarking es aprendizaje de mejores practicas: 1) Identificar proceso a mejorar (auditoria interna); 2) Seleccionar entidades referentes (contralorias lideres); 3) Recopilar informacion (visitas, encuestas, bases de datos); 4) Comparar desempeño (brechas en indicadores); 5) Identificar mejores practicas; 6) Adaptar e implementar en la propia entidad; 7) Monitorear mejora. Acelera mejora al no 'reinventar la rueda'.",
    topic: "Benchmarking"
  },
  {
    id: 50,
    question: "Situacion\n\nEl Contralor General de Antioquia quiere que la entidad desarrolle una verdadera cultura de calidad y mejora continua, no solo cumplimiento formal de requisitos. Pregunta al equipo directivo como se construye esta cultura organizacional.\n\nPregunta\n\nCon base en la situacion descrita, ¿como se construye la cultura de calidad y mejora continua en una organizacion?",
    options: [
      "Solo ordenes desde la direccion",
      "Capacitacion, comunicacion constante, reconocimiento de logros, participacion del personal, liderazgo visible, e integracion de la calidad en valores y quehacer diario",
      "Unicamente certificaciones",
      "Solo sanciones por errores"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la cultura de calidad (elemento critico en MIPG e ISO 9001) requiere: capacitacion permanente en calidad y mejora, comunicacion de politica y objetivos de calidad, participacion activa del personal (equipos de mejora, sugerencias), liderazgo visible de directivos (modelar comportamiento), reconocimiento de aportes a calidad, integrar calidad en valores institucionales, y paciencia (cambio cultural toma años).",
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
            Control interno, auditoria, planes de mejoramiento, y MIPG
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value)
        handleReset()
      }}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="v1">Version 1 (25 preguntas)</TabsTrigger>
          <TabsTrigger value="v2">Version 2 (25 preguntas)</TabsTrigger>
        </TabsList>

        <TabsContent value="v1" className="space-y-6 mt-6">
          {questionsV1.map((q) => (
            <Card key={q.id} className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-start justify-between">
                  <span className="flex-1 whitespace-pre-line">
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
                      <strong>Explicacion:</strong> {q.explanation}
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
                  <span className="flex-1 whitespace-pre-line">
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
                      <strong>Explicacion:</strong> {q.explanation}
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
