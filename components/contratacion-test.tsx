"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, InfoIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  {
    id: 1,
    question: "¿Cuáles son las principales leyes que rigen la contratación estatal en Colombia?",
    options: [
      "Ley 80 de 1993, Ley 1150 de 2007 y Decreto 1082 de 2015",
      "Ley 100 de 1993, Ley 715 de 2001 y Decreto 2555 de 2010",
      "Ley 489 de 1998, Ley 734 de 2002 y Decreto 019 de 2012",
      "Ley 1437 de 2011, Ley 1474 de 2011 y Decreto 1510 de 2013"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "La contratación estatal se rige por la Ley 80 de 1993, la Ley 1150 de 2007 y el Decreto 1082 de 2015.",
    topic: "Marco normativo y principios generales"
  },
  {
    id: 2,
    question: "El principio de transparencia en la contratación estatal exige que:",
    options: [
      "La administración publique plenamente las bases de los procesos y garantice igualdad de oportunidades",
      "Los procesos sean reservados para proteger la información comercial",
      "Solo los grandes empresarios puedan acceder a la información",
      "Las decisiones de adjudicación no requieran motivación"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "El principio de transparencia exige que la administración publique plenamente las bases de los procesos de selección y garantice que todos los participantes tengan igualdad de oportunidades. Se prohíbe la actuación oculta o arbitraria.",
    topic: "Principio de transparencia"
  },
  {
    id: 3,
    question: "Según el principio de economía, los procedimientos contractuales deben:",
    options: [
      "Realizarse con múltiples aprobaciones administrativas para mayor control",
      "Limitarse a las etapas estrictamente necesarias con términos preclusivos y perentorios",
      "Extenderse el mayor tiempo posible para garantizar calidad",
      "Incluir etapas adicionales de verificación en todos los casos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El principio de economía establece que los procedimientos deben limitarse a las etapas estrictamente necesarias y sus términos son preclusivos y perentorios. Los trámites deben adelantarse con austeridad de tiempo, medios y gastos.",
    topic: "Principio de economía"
  },
  {
    id: 4,
    question: "¿Qué establece el principio de responsabilidad en la contratación pública?",
    options: [
      "Solo el contratista responde por los daños ocasionados",
      "El Estado, los servidores y los contratistas responden por los daños ocasionados durante la actividad contractual",
      "Los servidores públicos están exentos de responsabilidad penal",
      "Solo existe responsabilidad disciplinaria, no civil ni penal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El principio de responsabilidad hace que el Estado, los servidores y los contratistas respondan por los daños ocasionados durante la actividad contractual. El artículo 26 de la Ley 80 establece responsabilidades civiles, penales y disciplinarias.",
    topic: "Principio de responsabilidad"
  },
  {
    id: 5,
    question: "La selección objetiva implica escoger la oferta basándose en:",
    options: [
      "Preferencias personales del funcionario evaluador",
      "Factores subjetivos como relaciones comerciales previas",
      "Factores de evaluación como cumplimiento, experiencia, organización, equipos, plazo y precio previamente definidos",
      "Únicamente el precio más bajo sin considerar otros aspectos"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "La selección objetiva debe basarse en factores de evaluación como cumplimiento, experiencia, organización, equipos, plazo y precio previamente definidos en los pliegos, garantizando transparencia, imparcialidad e igualdad de oportunidades.",
    topic: "Principio de selección objetiva"
  },
  {
    id: 6,
    question: "¿Qué es el Plan Anual de Adquisiciones (PAA)?",
    options: [
      "Un documento interno que no requiere publicación",
      "El primer ejercicio de planeación que las entidades deben publicar en el SECOP para informar a proveedores qué, cuándo y cómo pretenden comprar",
      "Un informe trimestral de compras realizadas",
      "Una lista de contratistas preferenciales de la entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El PAA es el primer ejercicio de planeación; las entidades estatales deben publicarlo en el portal del SECOP. Sirve para informar a los proveedores qué, cuándo y cómo pretenden comprar, promoviendo la competencia.",
    topic: "Planeación - Plan Anual de Adquisiciones"
  },
  {
    id: 7,
    question: "Los estudios previos deben contener, entre otros elementos:",
    options: [
      "Solo el valor estimado del contrato",
      "Descripción de la necesidad, objeto, modalidad de selección, valor estimado, criterios de selección, análisis de riesgos y garantías",
      "Únicamente la justificación del objeto",
      "Solo los requisitos técnicos sin análisis económico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Según el Decreto 1082 de 2015, los estudios previos deben contener: descripción de la necesidad, objeto, modalidad de selección y su justificación, valor estimado, criterios de selección, análisis de riesgos, garantías, entre otros.",
    topic: "Planeación - Estudios previos"
  },
  {
    id: 8,
    question: "¿Qué aspectos deben analizarse en los estudios de mercado o del sector?",
    options: [
      "Solo los precios actuales de los productos",
      "Aspectos económicos, tecnológicos, logísticos y regulatorios del sector",
      "Únicamente la oferta de proveedores locales",
      "Solo las perspectivas de crecimiento económico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los estudios de mercado deben analizar aspectos económicos del sector, soluciones tecnológicas, aspectos logísticos y la regulación aplicable de manera proporcional al valor y complejidad del proceso.",
    topic: "Planeación - Estudios de mercado"
  },
  {
    id: 9,
    question: "La etapa precontractual comprende:",
    options: [
      "Solo la firma del contrato",
      "Elaboración de estudios previos, resolución de apertura, publicación de pliegos, evaluación de ofertas y adjudicación",
      "Únicamente la ejecución del contrato",
      "Solo la liquidación del contrato"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La etapa precontractual comprende la elaboración de estudios previos, la resolución de apertura, la publicación de pliegos, la recepción y evaluación de ofertas y la adjudicación del contrato.",
    topic: "Etapas del proceso contractual"
  },
  {
    id: 10,
    question: "¿Cuándo debe realizarse la liquidación del contrato?",
    options: [
      "Inmediatamente después de la firma del contrato",
      "En el término fijado en el pliego o pactado; si no se pacta, dentro de los cuatro meses siguientes al vencimiento o terminación",
      "No es obligatoria la liquidación de contratos estatales",
      "Dentro de los seis años siguientes a la terminación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La liquidación debe realizarse en el término fijado o pactado; si no se pacta, dentro de los cuatro meses siguientes al vencimiento del plazo o terminación del contrato. Existe un plazo de hasta dos años para liquidación unilateral o de mutuo acuerdo.",
    topic: "Etapa post-contractual (Liquidación)"
  },
  {
    id: 11,
    question: "¿Qué es el SECOP?",
    options: [
      "Un sistema de control presupuestal interno",
      "El Sistema Electrónico para la Contratación Pública donde se publican todas las actuaciones de los procesos",
      "Un software de gestión documental",
      "Una plataforma de capacitación para contratistas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El SECOP es el Sistema Electrónico para la Contratación Pública, una plataforma digital en la que se publican todas las actuaciones de los procesos de contratación para cumplir los principios de transparencia, eficacia, eficiencia y economía.",
    topic: "Sistemas - SECOP"
  },
  {
    id: 12,
    question: "Colombia Compra Eficiente (CCE) se encarga de:",
    options: [
      "Ejecutar directamente todos los procesos de contratación del Estado",
      "Definir lineamientos para los procesos de contratación y elaborar pliegos tipo",
      "Fiscalizar los contratos después de su ejecución",
      "Administrar el presupuesto de contratación de las entidades"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "CCE es la agencia nacional de contratación pública encargada de definir lineamientos para los procesos de contratación y elaborar pliegos tipo para unificar metodologías y lograr contratación eficiente.",
    topic: "Entidades de apoyo - Colombia Compra Eficiente"
  },
  {
    id: 13,
    question: "Los requisitos habilitantes incluyen:",
    options: [
      "Solo la capacidad financiera del proponente",
      "Capacidad jurídica, financiera, organizacional y técnica",
      "Únicamente la experiencia previa en contratos similares",
      "Solo el cumplimiento de requisitos tributarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los requisitos habilitantes incluyen: capacidad jurídica (incluyendo experiencia), capacidad financiera (liquidez, endeudamiento), capacidad organizacional (rentabilidad, ingresos) y capacidad técnica (profesionales vinculados).",
    topic: "Requisitos habilitantes"
  },
  {
    id: 14,
    question: "La licitación pública es:",
    options: [
      "Una modalidad excepcional que solo se usa en casos especiales",
      "La modalidad de selección que se usa por regla general",
      "Solo aplicable a contratos de menor cuantía",
      "Una modalidad exclusiva para servicios de salud"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La licitación pública se usa por regla general en la contratación estatal. Otras modalidades como la selección abreviada, concurso de méritos o contratación directa son excepcionales.",
    topic: "Modalidades de selección - Licitación pública"
  },
  {
    id: 15,
    question: "El concurso de méritos se aplica para:",
    options: [
      "Cualquier tipo de contrato sin restricción",
      "Servicios de consultoría y proyectos de arquitectura",
      "Únicamente para contratos de obra pública",
      "Solo para suministro de bienes y equipos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El concurso de méritos se aplica a servicios de consultoría (artículo 32 numeral 2 de la Ley 80) y proyectos de arquitectura (Decreto 2326 de 1995).",
    topic: "Modalidades de selección - Concurso de méritos"
  },
  {
    id: 16,
    question: "¿Cuándo puede utilizarse la contratación directa?",
    options: [
      "En cualquier momento que la entidad lo decida",
      "En casos taxativos como urgencia manifiesta, contratos interadministrativos, servicios profesionales, entre otros",
      "Solo para contratos de bajo valor",
      "Únicamente cuando hay un solo proveedor en el mercado mundial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La contratación directa se utiliza en casos taxativos, entre ellos: urgencia manifiesta, contratos interadministrativos, bienes de seguridad nacional, actividades científicas, servicios profesionales, inmuebles y cuando no hay pluralidad de oferentes.",
    topic: "Modalidades de selección - Contratación directa"
  },
  {
    id: 17,
    question: "¿Qué son los contratos de menor cuantía?",
    options: [
      "Contratos que no superan la menor cuantía de la entidad y requieren manifestación de interés dentro de tres días hábiles",
      "Contratos que solo pueden hacerse con Mipymes",
      "Contratos que no requieren ningún tipo de publicación",
      "Contratos que no están sujetos a ninguna regulación"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "Los contratos de menor cuantía no superan la menor cuantía de la entidad. Los interesados deben manifestar su intención de participar dentro de los tres días hábiles siguientes a la apertura. Si hay más de diez, puede hacerse sorteo.",
    topic: "Modalidades - Menor cuantía"
  },
  {
    id: 18,
    question: "Según la Ley 1150 de 2007, las entidades deben:",
    options: [
      "Evitar mencionar riesgos para no desalentar a los proponentes",
      "Identificar los riesgos en los pliegos y asignar su cobertura",
      "Trasladar todos los riesgos al contratista",
      "Solo identificar riesgos financieros"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La Ley 1150 de 2007 obliga a las entidades públicas a identificar los riesgos en los pliegos y a asignar su cobertura. Deben establecerse las acciones para mitigarlos y determinar quién asumirá cada riesgo.",
    topic: "Riesgos en la contratación"
  },
  {
    id: 19,
    question: "¿Qué son las inhabilidades en la contratación estatal?",
    options: [
      "Permisos especiales que se otorgan a ciertos contratistas",
      "Restricciones previstas en la Constitución y la ley que impiden a una persona contratar con el Estado",
      "Impedimentos temporales que se pueden subsanar durante el proceso",
      "Requisitos adicionales solo para grandes empresas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las inhabilidades son restricciones previstas en la Constitución y la ley que impiden a una persona acceder a cargos públicos o contratar con el Estado. Por ejemplo, haber sido condenada o haber dado información falsa.",
    topic: "Régimen de inhabilidades"
  },
  {
    id: 20,
    question: "Si durante la ejecución del contrato sobreviene una inhabilidad, el contratista puede:",
    options: [
      "Continuar ejecutando el contrato normalmente",
      "Ceder el contrato a un tercero con iguales condiciones técnicas, financieras y de experiencia, previa aprobación de la entidad",
      "Suspender temporalmente la ejecución hasta subsanar la inhabilidad",
      "Delegar la ejecución sin autorización de la entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Si sobreviene una inhabilidad durante la ejecución, el contratista puede ceder el contrato a un tercero con iguales condiciones técnicas, financieras y de experiencia, previa aprobación de la entidad; de lo contrario, el contrato se termina y liquida.",
    topic: "Régimen de inhabilidades - Efectos"
  }
]

const questionsV2: Question[] = [
  {
    id: 1,
    question: "Los principios constitucionales que fundamentan la contratación estatal según la Ley 80 incluyen:",
    options: [
      "Solo transparencia y economía",
      "Transparencia, economía, responsabilidad y selección objetiva, garantizando legalidad, igualdad, debido proceso, buena fe, imparcialidad, eficacia, moralidad, celeridad y publicidad",
      "Únicamente eficiencia y eficacia",
      "Solo legalidad y moralidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La Ley 80 ordena que la contratación se fundamente en principios constitucionales de transparencia, economía, responsabilidad y selección objetiva; estos a su vez garantizan legalidad, igualdad, debido proceso, buena fe, imparcialidad, eficacia, moralidad, celeridad y publicidad.",
    topic: "Marco normativo y principios generales"
  },
  {
    id: 2,
    question: "Las entidades con régimen contractual especial deben:",
    options: [
      "Observar los principios de la función administrativa y de la gestión fiscal y están sometidas al régimen de inhabilidades e incompatibilidades",
      "No están sometidas a ningún principio ni régimen de inhabilidades",
      "Solo deben cumplir principios comerciales privados",
      "Únicamente deben observar el régimen de inhabilidades pero no los principios administrativos"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "Las entidades con régimen contractual especial deben observar los principios de la función administrativa y de la gestión fiscal y están sometidas al régimen de inhabilidades e incompatibilidades.",
    topic: "Marco normativo - Régimen especial"
  },
  {
    id: 3,
    question: "El principio de transparencia exige que se permita:",
    options: [
      "Solo conocer las decisiones finales",
      "Conocer y controvertir informes, conceptos y decisiones, por ejemplo, a través de audiencias públicas de adjudicación",
      "Únicamente consultar documentos después de la adjudicación",
      "Solo acceder a información básica sin posibilidad de controvertir"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El principio de transparencia debe permitir conocer y controvertir informes, conceptos y decisiones; por ejemplo, a través de audiencias públicas de adjudicación y del acceso a las actuaciones y propuestas.",
    topic: "Principio de transparencia"
  },
  {
    id: 4,
    question: "Según el principio de economía y el deber de planeación, la entidad NO puede iniciar procesos si:",
    options: [
      "Tiene todos los recursos y autorizaciones disponibles",
      "No dispone de recursos o autorizaciones y no ha elaborado los estudios previos, diseños y pliegos antes de abrir la convocatoria",
      "Ya cuenta con estudios previos completos",
      "Tiene disponibilidad presupuestal aprobada"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En cumplimiento del deber de planeación y de la buena fe precontractual, la entidad no puede iniciar procesos si no dispone de recursos o autorizaciones y debe elaborar los estudios previos, diseños y pliegos antes de abrir la convocatoria.",
    topic: "Principio de economía - Planeación"
  },
  {
    id: 5,
    question: "Según el artículo 26 de la Ley 80, los servidores públicos que intervienen en la contratación deben:",
    options: [
      "Solo adjudicar contratos sin responsabilidades posteriores",
      "Cumplir los fines de la contratación, vigilar la correcta ejecución y proteger los derechos de la entidad y del contratista",
      "Únicamente firmar contratos sin seguimiento",
      "Solo revisar documentación inicial sin vigilancia posterior"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 26 de la Ley 80 establece que los servidores públicos que intervienen en la contratación deben cumplir los fines de la contratación, vigilar la correcta ejecución y proteger los derechos de la entidad y del contratista.",
    topic: "Principio de responsabilidad"
  },
  {
    id: 6,
    question: "Para garantizar la selección objetiva, la administración debe:",
    options: [
      "Basarse en preferencias personales del evaluador",
      "Comparar las ofertas mediante el cotejo de propuestas, la consulta de precios del mercado y los estudios propios o de asesores",
      "Solo revisar el precio sin análisis técnico",
      "Adjudicar sin necesidad de comparación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Para ser objetiva, la administración debe comparar las ofertas mediante el cotejo de propuestas, la consulta de precios del mercado y los estudios propios o de asesores.",
    topic: "Principio de selección objetiva"
  },
  {
    id: 7,
    question: "El Plan Anual de Adquisiciones debe contener:",
    options: [
      "Solo una lista de bienes a comprar",
      "Declaración estratégica con información general de la entidad, datos de contacto, valor total del PAA, límites de contratación y fecha de actualización, además de bienes, obras y servicios identificados",
      "Únicamente el presupuesto total anual",
      "Solo los proveedores preseleccionados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El PAA contiene una declaración estratégica con información general de la entidad, datos de contacto, valor total del PAA, límites de contratación de menor y mínima cuantía y fecha de actualización. También detalla bienes, obras o servicios identificados y necesidades para las cuales se desconoce el producto exacto.",
    topic: "Planeación - Contenido del PAA"
  },
  {
    id: 8,
    question: "Los estudios previos para contratos de mínima cuantía deben incluir:",
    options: [
      "Descripción sucinta de la necesidad, objeto identificado con el Clasificador, condiciones técnicas, valor estimado y justificación, plazo de ejecución y certificado de disponibilidad presupuestal",
      "Solo el valor del contrato",
      "Únicamente el objeto contractual sin análisis económico",
      "Solo la disponibilidad presupuestal"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "Para contratos de mínima cuantía los estudios incluyen una descripción sucinta de la necesidad, el objeto identificado con el Clasificador de Bienes y Servicios, las condiciones técnicas, el valor estimado y su justificación, el plazo de ejecución y el certificado de disponibilidad presupuestal.",
    topic: "Planeación - Estudios previos de mínima cuantía"
  },
  {
    id: 9,
    question: "Los estudios de mercado deben analizar aspectos económicos del sector que incluyen:",
    options: [
      "Solo precios actuales de productos",
      "Productos, agentes, gremios, cifras de ventas, perspectivas de crecimiento, variables económicas, cadenas de producción, materias primas y dinámica de comercio exterior",
      "Únicamente la competencia local",
      "Solo la inflación del sector"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los estudios de mercado deben analizar aspectos económicos del sector: productos, agentes, gremios, cifras de ventas, perspectivas de crecimiento, variables económicas, cadenas de producción, materias primas y dinámica de comercio exterior.",
    topic: "Planeación - Estudios de mercado"
  },
  {
    id: 10,
    question: "En la etapa precontractual, los pliegos deben incluir:",
    options: [
      "Solo requisitos mínimos sin aclaraciones",
      "Reglas justas y claras, plazos razonables, respuestas motivadas a las observaciones, visitas voluntarias al sitio (no obligatorias) y audiencias de aclaración cuando el objeto lo requiera",
      "Únicamente requisitos técnicos sin plazos",
      "Solo criterios de evaluación sin oportunidad de observaciones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los pliegos deben incluir reglas justas y claras, plazos razonables, respuestas motivadas a las observaciones, visitas voluntarias al sitio (no obligatorias) y audiencias de aclaración cuando el objeto lo requiera.",
    topic: "Etapa precontractual - Pliegos"
  },
  {
    id: 11,
    question: "En la liquidación del contrato, según el Consejo de Estado, se debe establecer:",
    options: [
      "Solo el pago final al contratista",
      "El estado de las obligaciones ejecutadas, los ajustes y reconocimientos que correspondan, las garantías inherentes al objeto contractual y, excepcionalmente, los acuerdos o conciliaciones para poner fin a divergencias",
      "Únicamente las multas aplicadas",
      "Solo la fecha de terminación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Según el Consejo de Estado, en la liquidación se establece el estado de las obligaciones ejecutadas, los ajustes y reconocimientos que correspondan, las garantías inherentes al objeto contractual y, excepcionalmente, los acuerdos o conciliaciones para poner fin a divergencias.",
    topic: "Etapa post-contractual - Liquidación"
  },
  {
    id: 12,
    question: "Si no se pacta término para la liquidación, esta debe realizarse:",
    options: [
      "Dentro de los seis meses siguientes",
      "Dentro de los cuatro meses siguientes al vencimiento del plazo o de la terminación del contrato",
      "Dentro del año siguiente",
      "No tiene plazo definido"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Si no se pacta término, la liquidación debe realizarse dentro de los cuatro meses siguientes al vencimiento del plazo o de la terminación del contrato, y existe un plazo de hasta dos años para liquidación unilateral o de mutuo acuerdo.",
    topic: "Liquidación - Términos"
  },
  {
    id: 13,
    question: "La selección abreviada se utiliza para:",
    options: [
      "Solo contratos de alto valor",
      "Adquisición de bienes y servicios de características uniformes mediante subasta inversa o acuerdos marco, bolsas de productos, servicios de salud, licitación desierta, entre otros casos específicos",
      "Únicamente servicios de consultoría",
      "Solo contratos de urgencia manifiesta"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La selección abreviada se usa para: adquisición de bienes y servicios de características técnicas uniformes mediante subasta inversa o acuerdos marco de precios; adquisición a través de bolsas de productos; servicios de salud; derivada de licitación desierta; entre otros casos específicos.",
    topic: "Modalidades de selección - Selección abreviada"
  },
  {
    id: 14,
    question: "En la contratación de menor cuantía, si la entidad recibe más de diez manifestaciones de interés:",
    options: [
      "Debe rechazar todas y reiniciar el proceso",
      "Puede continuar con todos o realizar un sorteo para seleccionar máximo diez interesados",
      "Debe continuar obligatoriamente con todos",
      "Debe cancelar el proceso"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Si la entidad recibe más de diez manifestaciones de interés, puede continuar con todos o realizar un sorteo para seleccionar máximo diez interesados.",
    topic: "Menor cuantía - Procedimiento"
  },
  {
    id: 15,
    question: "Los contratos de mínima cuantía son aquellos cuyo valor:",
    options: [
      "No excede el 10% de la menor cuantía de la entidad",
      "Supera la menor cuantía de la entidad",
      "Es igual a la menor cuantía",
      "No tiene límite establecido"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "Los contratos de mínima cuantía son aquellos cuyo valor no excede el 10% de la menor cuantía de la entidad; para ellos la invitación se publica al menos por un día hábil, no se exige inscripción en el RUP ni garantías.",
    topic: "Mínima cuantía"
  },
  {
    id: 16,
    question: "En el concurso de méritos existe un proceso de precalificación en el cual:",
    options: [
      "Se evalúa directamente la propuesta económica",
      "Los interesados acreditan experiencia, formación y capacidad; la entidad publica el informe de precalificación y los interesados pueden hacer observaciones",
      "Solo se verifica la capacidad financiera",
      "No se requiere ningún tipo de acreditación previa"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Existe un proceso de precalificación en el concurso de méritos: los interesados acreditan experiencia, formación y capacidad; la entidad publica el informe de precalificación y los interesados pueden hacer observaciones. Tras la precalificación se evalúan las propuestas técnicas y económicas.",
    topic: "Concurso de méritos - Precalificación"
  },
  {
    id: 17,
    question: "Los servicios profesionales en contratación directa se caracterizan porque:",
    options: [
      "Generan relación laboral con la entidad",
      "Se contratan a personas naturales para labores relacionadas con funciones de la entidad y su vinculación no genera relación laboral",
      "Solo pueden ser contratados por empresas",
      "Requieren licitación pública obligatoriamente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Para servicios profesionales en contratación directa se contrata a personas naturales para labores relacionadas con funciones de la entidad; su vinculación no genera relación laboral.",
    topic: "Contratación directa - Servicios profesionales"
  },
  {
    id: 18,
    question: "La convocatoria puede limitarse a Mipymes cuando:",
    options: [
      "El valor del proceso es inferior a USD 125,000 y se reciban solicitudes de al menos dos Mipymes con al menos un año de existencia",
      "En cualquier proceso sin restricción de valor",
      "Solo en contratos de mínima cuantía",
      "Nunca puede limitarse a Mipymes"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "El Decreto 1082 de 2015 permite que, cuando el valor del proceso es inferior a USD 125,000 (liquidados según tasa del Ministerio de Comercio, Industria y Turismo), la convocatoria pueda limitarse a Mipymes nacionales con al menos un año de existencia, siempre que se reciban solicitudes de al menos dos Mipymes.",
    topic: "Convocatoria limitada a Mipymes"
  },
  {
    id: 19,
    question: "Las incompatibilidades se refieren a:",
    options: [
      "Restricciones permanentes para contratar con cualquier entidad del Estado",
      "La imposibilidad de contratar con una entidad específica porque el contratista mantiene una relación con ella",
      "Inhabilidades por condenas penales",
      "Requisitos de experiencia no cumplidos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las incompatibilidades se refieren a la imposibilidad de contratar con una entidad específica porque el contratista mantiene una relación con ella; por ejemplo, los servidores públicos no pueden simultáneamente ser contratistas de su propia entidad, salvo excepciones taxativas.",
    topic: "Régimen de incompatibilidades"
  },
  {
    id: 20,
    question: "Presentar información falsa durante la contratación:",
    options: [
      "No tiene consecuencias si el contrato se ejecuta bien",
      "Genera inhabilidad según el artículo 5 de la Ley 190 de 1995 y se considera falta gravísima",
      "Solo genera una amonestación administrativa",
      "Es permitido si mejora las posibilidades de adjudicación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Presentar información falsa genera inhabilidad (artículo 5 Ley 190 de 1995) y se considera falta gravísima intervenir en la celebración o ejecución de un contrato con una persona incursa en inhabilidad o incompatibilidad.",
    topic: "Inhabilidades - Información falsa"
  }
]

export function ContratacionTest() {
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2">("v1")
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = selectedVersion === "v1" ? questionsV1 : questionsV2

  const handleVersionChange = (value: string) => {
    setSelectedVersion(value as "v1" | "v2")
    // Reiniciar el estado cuando se cambia de versión
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
  }

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const calculateScore = () => {
    let correct = 0
    let totalPoints = 0
    let earnedPoints = 0

    questions.forEach(q => {
      totalPoints += q.points
      if (answers[q.id] === q.correctAnswer) {
        correct++
        earnedPoints += q.points
      }
    })

    return { correct, total: questions.length, earnedPoints, totalPoints }
  }

  const handleSubmit = () => {
    setShowResults(true)
    setShowFeedback(true)
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
  }

  const score = showResults ? calculateScore() : null

  return (
    <div className="space-y-6">
      <Alert className="border-primary/50 bg-primary/5">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Esta prueba contiene {questions.length} preguntas sobre Contratación Estatal.
          Total de puntos disponibles: {questions.reduce((sum, q) => sum + q.points, 0)} puntos.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selecciona la versión de la prueba</CardTitle>
          <CardDescription>
            Ambas versiones contienen 20 preguntas diferentes basadas en el mismo contenido
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedVersion} onValueChange={handleVersionChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="v1" disabled={showResults}>
                Versión 1
              </TabsTrigger>
              <TabsTrigger value="v2" disabled={showResults}>
                Versión 2
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {showResults && (
            <p className="text-sm text-muted-foreground mt-3">
              Reinicia la prueba para cambiar de versión
            </p>
          )}
        </CardContent>
      </Card>

      {showResults && score && (
        <Alert className={score.earnedPoints >= score.totalPoints * 0.7 ? "border-green-500 bg-green-50" : "border-orange-500 bg-orange-50"}>
          <AlertTitle className="text-lg font-semibold">
            Resultado: {score.earnedPoints} / {score.totalPoints} puntos
          </AlertTitle>
          <AlertDescription>
            Respondiste correctamente {score.correct} de {score.total} preguntas
            ({Math.round((score.earnedPoints / score.totalPoints) * 100)}%)
          </AlertDescription>
        </Alert>
      )}

      {questions.map((question, index) => (
        <Card key={question.id} className={`border ${
          showFeedback && answers[question.id] !== undefined
            ? answers[question.id] === question.correctAnswer
              ? "border-green-500 bg-green-50/50"
              : "border-red-500 bg-red-50/50"
            : "border-border"
        }`}>
          <CardHeader>
            <CardTitle className="text-lg flex items-start justify-between gap-4">
              <span>Pregunta {index + 1} ({question.points} puntos)</span>
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
                  {answers[question.id] === question.correctAnswer ? "¡Correcto!" : "Respuesta incorrecta"}
                </AlertTitle>
                <AlertDescription className="mt-2 space-y-2">
                  <p><strong>Explicación:</strong> {question.explanation}</p>
                  {answers[question.id] !== question.correctAnswer && (
                    <p className="text-sm">
                      <strong>Debes revisar:</strong> {question.topic}
                    </p>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ))}

      <div className="flex flex-wrap gap-4">
        {!showResults ? (
          <Button
            onClick={handleSubmit}
            size="lg"
            disabled={Object.keys(answers).length !== questions.length}
            className="min-w-[200px]"
          >
            Enviar Respuestas
          </Button>
        ) : (
          <>
            <Button
              onClick={() => setShowFeedback(!showFeedback)}
              variant="outline"
              size="lg"
              className="min-w-[200px]"
            >
              {showFeedback ? "Ocultar" : "Mostrar"} Retroalimentación
            </Button>
            <Button
              onClick={handleReset}
              variant="secondary"
              size="lg"
              className="min-w-[200px]"
            >
              Reiniciar Prueba
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
