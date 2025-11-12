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
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. El principio de transparencia en la contratación estatal exige que:",
    options: [
      "La administración publique plenamente las bases de los procesos y garantice igualdad de oportunidades",
      "Los procesos sean reservados para proteger la información comercial",
      "Solo los grandes empresarios puedan acceder a la información",
      "Las decisiones de adjudicación no requieran motivación"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, el principio de transparencia exige que la administración publique plenamente las bases de los procesos de selección y garantice que todos los participantes tengan igualdad de oportunidades. Se prohíbe la actuación oculta o arbitraria.",
    topic: "Principio de transparencia"
  },
  {
    id: 3,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Según el principio de economía, los procedimientos contractuales deben:",
    options: [
      "Realizarse con múltiples aprobaciones administrativas para mayor control",
      "Limitarse a las etapas estrictamente necesarias con términos preclusivos y perentorios",
      "Extenderse el mayor tiempo posible para garantizar calidad",
      "Incluir etapas adicionales de verificación en todos los casos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el principio de economía establece que los procedimientos deben limitarse a las etapas estrictamente necesarias y sus términos son preclusivos y perentorios. Los trámites deben adelantarse con austeridad de tiempo, medios y gastos.",
    topic: "Principio de economía"
  },
  {
    id: 4,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. ¿Qué establece el principio de responsabilidad en la contratación pública?",
    options: [
      "Solo el contratista responde por los daños ocasionados",
      "El Estado, los servidores y los contratistas responden por los daños ocasionados durante la actividad contractual",
      "Los servidores públicos están exentos de responsabilidad penal",
      "Solo existe responsabilidad disciplinaria, no civil ni penal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el principio de responsabilidad hace que el Estado, los servidores y los contratistas respondan por los daños ocasionados durante la actividad contractual. El artículo 26 de la Ley 80 establece responsabilidades civiles, penales y disciplinarias.",
    topic: "Principio de responsabilidad"
  },
  {
    id: 5,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. La selección objetiva implica escoger la oferta basándose en:",
    options: [
      "Preferencias personales del funcionario evaluador",
      "Factores subjetivos como relaciones comerciales previas",
      "Factores de evaluación como cumplimiento, experiencia, organización, equipos, plazo y precio previamente definidos",
      "Únicamente el precio más bajo sin considerar otros aspectos"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, la selección objetiva debe basarse en factores de evaluación como cumplimiento, experiencia, organización, equipos, plazo y precio previamente definidos en los pliegos, garantizando transparencia, imparcialidad e igualdad de oportunidades.",
    topic: "Principio de selección objetiva"
  },
  {
    id: 6,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. ¿Qué es el Plan Anual de Adquisiciones (PAA)?",
    options: [
      "Un documento interno que no requiere publicación",
      "El primer ejercicio de planeación que las entidades deben publicar en el SECOP para informar a proveedores qué, cuándo y cómo pretenden comprar",
      "Un informe trimestral de compras realizadas",
      "Una lista de contratistas preferenciales de la entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el PAA es el primer ejercicio de planeación; las entidades estatales deben publicarlo en el portal del SECOP. Sirve para informar a los proveedores qué, cuándo y cómo pretenden comprar, promoviendo la competencia.",
    topic: "Planeación - Plan Anual de Adquisiciones"
  },
  {
    id: 7,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Los estudios previos deben contener, entre otros elementos:",
    options: [
      "Solo el valor estimado del contrato",
      "Descripción de la necesidad, objeto, modalidad de selección, valor estimado, criterios de selección, análisis de riesgos y garantías",
      "Únicamente la justificación del objeto",
      "Solo los requisitos técnicos sin análisis económico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, según el Decreto 1082 de 2015, los estudios previos deben contener: descripción de la necesidad, objeto, modalidad de selección y su justificación, valor estimado, criterios de selección, análisis de riesgos, garantías, entre otros.",
    topic: "Planeación - Estudios previos"
  },
  {
    id: 8,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. ¿Qué aspectos deben analizarse en los estudios de mercado o del sector?",
    options: [
      "Solo los precios actuales de los productos",
      "Aspectos económicos, tecnológicos, logísticos y regulatorios del sector",
      "Únicamente la oferta de proveedores locales",
      "Solo las perspectivas de crecimiento económico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, los estudios de mercado deben analizar aspectos económicos del sector, soluciones tecnológicas, aspectos logísticos y la regulación aplicable de manera proporcional al valor y complejidad del proceso.",
    topic: "Planeación - Estudios de mercado"
  },
  {
    id: 9,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. La etapa precontractual comprende:",
    options: [
      "Solo la firma del contrato",
      "Elaboración de estudios previos, resolución de apertura, publicación de pliegos, evaluación de ofertas y adjudicación",
      "Únicamente la ejecución del contrato",
      "Solo la liquidación del contrato"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la etapa precontractual comprende la elaboración de estudios previos, la resolución de apertura, la publicación de pliegos, la recepción y evaluación de ofertas y la adjudicación del contrato.",
    topic: "Etapas del proceso contractual"
  },
  {
    id: 10,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. ¿Cuándo debe realizarse la liquidación del contrato?",
    options: [
      "Inmediatamente después de la firma del contrato",
      "En el término fijado en el pliego o pactado; si no se pacta, dentro de los cuatro meses siguientes al vencimiento o terminación",
      "No es obligatoria la liquidación de contratos estatales",
      "Dentro de los seis años siguientes a la terminación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la liquidación debe realizarse en el término fijado o pactado; si no se pacta, dentro de los cuatro meses siguientes al vencimiento del plazo o terminación del contrato. Existe un plazo de hasta dos años para liquidación unilateral o de mutuo acuerdo.",
    topic: "Etapa post-contractual (Liquidación)"
  },
  {
    id: 11,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. ¿Qué es el SECOP?",
    options: [
      "Un sistema de control presupuestal interno",
      "El Sistema Electrónico para la Contratación Pública donde se publican todas las actuaciones de los procesos",
      "Un software de gestión documental",
      "Una plataforma de capacitación para contratistas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el SECOP es el Sistema Electrónico para la Contratación Pública, una plataforma digital en la que se publican todas las actuaciones de los procesos de contratación para cumplir los principios de transparencia, eficacia, eficiencia y economía.",
    topic: "Sistemas - SECOP"
  },
  {
    id: 12,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Colombia Compra Eficiente (CCE) se encarga de:",
    options: [
      "Ejecutar directamente todos los procesos de contratación del Estado",
      "Definir lineamientos para los procesos de contratación y elaborar pliegos tipo",
      "Fiscalizar los contratos después de su ejecución",
      "Administrar el presupuesto de contratación de las entidades"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, CCE es la agencia nacional de contratación pública encargada de definir lineamientos para los procesos de contratación y elaborar pliegos tipo para unificar metodologías y lograr contratación eficiente.",
    topic: "Entidades de apoyo - Colombia Compra Eficiente"
  },
  {
    id: 13,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Los requisitos habilitantes incluyen:",
    options: [
      "Solo la capacidad financiera del proponente",
      "Capacidad jurídica, financiera, organizacional y técnica",
      "Únicamente la experiencia previa en contratos similares",
      "Solo el cumplimiento de requisitos tributarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, los requisitos habilitantes incluyen: capacidad jurídica (incluyendo experiencia), capacidad financiera (liquidez, endeudamiento), capacidad organizacional (rentabilidad, ingresos) y capacidad técnica (profesionales vinculados).",
    topic: "Requisitos habilitantes"
  },
  {
    id: 14,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. La licitación pública es:",
    options: [
      "Una modalidad excepcional que solo se usa en casos especiales",
      "La modalidad de selección que se usa por regla general",
      "Solo aplicable a contratos de menor cuantía",
      "Una modalidad exclusiva para servicios de salud"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la licitación pública se usa por regla general en la contratación estatal. Otras modalidades como la selección abreviada, concurso de méritos o contratación directa son excepcionales.",
    topic: "Modalidades de selección - Licitación pública"
  },
  {
    id: 15,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. El concurso de méritos se aplica para:",
    options: [
      "Cualquier tipo de contrato sin restricción",
      "Servicios de consultoría y proyectos de arquitectura",
      "Únicamente para contratos de obra pública",
      "Solo para suministro de bienes y equipos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el concurso de méritos se aplica a servicios de consultoría (artículo 32 numeral 2 de la Ley 80) y proyectos de arquitectura (Decreto 2326 de 1995).",
    topic: "Modalidades de selección - Concurso de méritos"
  },
  {
    id: 16,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. ¿Cuándo puede utilizarse la contratación directa?",
    options: [
      "En cualquier momento que la entidad lo decida",
      "En casos taxativos como urgencia manifiesta, contratos interadministrativos, servicios profesionales, entre otros",
      "Solo para contratos de bajo valor",
      "Únicamente cuando hay un solo proveedor en el mercado mundial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la contratación directa se utiliza en casos taxativos, entre ellos: urgencia manifiesta, contratos interadministrativos, bienes de seguridad nacional, actividades científicas, servicios profesionales, inmuebles y cuando no hay pluralidad de oferentes.",
    topic: "Modalidades de selección - Contratación directa"
  },
  {
    id: 17,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. ¿Qué son los contratos de menor cuantía?",
    options: [
      "Contratos que no superan la menor cuantía de la entidad y requieren manifestación de interés dentro de tres días hábiles",
      "Contratos que solo pueden hacerse con Mipymes",
      "Contratos que no requieren ningún tipo de publicación",
      "Contratos que no están sujetos a ninguna regulación"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, los contratos de menor cuantía no superan la menor cuantía de la entidad. Los interesados deben manifestar su intención de participar dentro de los tres días hábiles siguientes a la apertura. Si hay más de diez, puede hacerse sorteo.",
    topic: "Modalidades - Menor cuantía"
  },
  {
    id: 18,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Según la Ley 1150 de 2007, las entidades deben:",
    options: [
      "Evitar mencionar riesgos para no desalentar a los proponentes",
      "Identificar los riesgos en los pliegos y asignar su cobertura",
      "Trasladar todos los riesgos al contratista",
      "Solo identificar riesgos financieros"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la Ley 1150 de 2007 obliga a las entidades públicas a identificar los riesgos en los pliegos y a asignar su cobertura. Deben establecerse las acciones para mitigarlos y determinar quién asumirá cada riesgo.",
    topic: "Riesgos en la contratación"
  },
  {
    id: 19,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. ¿Qué son las inhabilidades en la contratación estatal?",
    options: [
      "Permisos especiales que se otorgan a ciertos contratistas",
      "Restricciones previstas en la Constitución y la ley que impiden a una persona contratar con el Estado",
      "Impedimentos temporales que se pueden subsanar durante el proceso",
      "Requisitos adicionales solo para grandes empresas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, las inhabilidades son restricciones previstas en la Constitución y la ley que impiden a una persona acceder a cargos públicos o contratar con el Estado. Por ejemplo, haber sido condenada o haber dado información falsa.",
    topic: "Régimen de inhabilidades"
  },
  {
    id: 20,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Si durante la ejecución del contrato sobreviene una inhabilidad, el contratista puede:",
    options: [
      "Continuar ejecutando el contrato normalmente",
      "Ceder el contrato a un tercero con iguales condiciones técnicas, financieras y de experiencia, previa aprobación de la entidad",
      "Suspender temporalmente la ejecución hasta subsanar la inhabilidad",
      "Delegar la ejecución sin autorización de la entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, si sobreviene una inhabilidad durante la ejecución, el contratista puede ceder el contrato a un tercero con iguales condiciones técnicas, financieras y de experiencia, previa aprobación de la entidad; de lo contrario, el contrato se termina y liquida.",
    topic: "Régimen de inhabilidades - Efectos"
  },
  // Supervisión de contratos
  {
    id: 21,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Según la Ley 1474 de 2011 (Estatuto Anticorrupción), la supervisión de contratos:",
    options: [
      "Es facultativa y depende de la voluntad de la entidad",
      "Consiste únicamente en la verificación final del cumplimiento del contrato",
      "Consiste en el seguimiento técnico, administrativo, financiero, contable y jurídico sobre el cumplimiento del objeto contractual",
      "Solo aplica para contratos de obra pública"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, el artículo 83 de la Ley 1474 establece que la supervisión consiste en el seguimiento técnico, administrativo, financiero, contable y jurídico que sobre el cumplimiento del objeto del contrato es ejercida por la entidad estatal cuando no se requiere conocimientos especializados.",
    topic: "Supervisión de contratos"
  },
  {
    id: 22,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. La diferencia principal entre supervisión e interventoría es que:",
    options: [
      "No existe diferencia, son términos sinónimos",
      "La supervisión la ejerce directamente un funcionario de la entidad, mientras que la interventoría la realiza un contratista externo con conocimientos especializados",
      "La interventoría solo aplica para contratos menores a 50 SMMLV",
      "La supervisión solo se requiere en contratos de prestación de servicios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la supervisión es ejercida directamente por un funcionario de la entidad estatal cuando no se requieren conocimientos especializados. La interventoría se contrata cuando se necesitan conocimientos especializados para el seguimiento técnico del contrato.",
    topic: "Supervisión vs Interventoría"
  },
  {
    id: 23,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Entre las funciones del supervisor de un contrato de obra se encuentra:",
    options: [
      "Modificar unilateralmente el objeto contractual sin acta",
      "Verificar el cumplimiento de las especificaciones técnicas, controlar el avance físico y financiero, y revisar la calidad de materiales y procedimientos constructivos",
      "Sustituir al contratista en la ejecución de la obra",
      "Autorizar pagos sin verificar requisitos previos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el supervisor debe verificar el cumplimiento de las especificaciones técnicas, controlar el avance físico y financiero, revisar la calidad de materiales y procedimientos constructivos, y velar por el cumplimiento de normas de seguridad y ambientales.",
    topic: "Funciones del supervisor"
  },
  {
    id: 24,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. El supervisor o interventor que evidencie incumplimientos del contratista debe:",
    options: [
      "Informar de manera inmediata al ordenador del gasto para que adopte las medidas conducentes, como imposición de multas o inicio de caducidad",
      "Esperar hasta la terminación del contrato para reportar",
      "Negociar directamente con el contratista sin informar a la entidad",
      "Solo documentar las irregularidades sin tomar acción"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, el supervisor o interventor tiene la obligación legal de informar de manera inmediata al ordenador del gasto sobre los incumplimientos del contratista, para que la entidad adopte las medidas como imposición de multas, declaratoria de incumplimiento o caducidad.",
    topic: "Obligaciones del supervisor ante incumplimientos"
  },
  {
    id: 25,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. La responsabilidad del supervisor por el incumplimiento de sus obligaciones puede ser:",
    options: [
      "Únicamente administrativa, sin consecuencias adicionales",
      "Disciplinaria, fiscal, penal y civil, dependiendo de la naturaleza y gravedad de los hechos",
      "Solo disciplinaria, sin afectación patrimonial",
      "Ninguna, ya que la responsabilidad es exclusiva del contratista"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el supervisor puede incurrir en responsabilidad disciplinaria (Ley 734), fiscal (daño al patrimonio público), penal (delitos como peculado por extensión) y civil (reparación de perjuicios), según la naturaleza y gravedad de los hechos.",
    topic: "Responsabilidad del supervisor"
  },
  // Interventoría
  {
    id: 26,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. La interventoría en contratos de obra pública debe ser ejercida por:",
    options: [
      "Cualquier profesional sin restricciones",
      "Personas naturales o jurídicas que cuenten con la capacidad técnica, experiencia, organización y recursos especializados necesarios",
      "Únicamente por entidades públicas",
      "Solo por empleados de planta de la entidad contratante"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la interventoría debe ser ejercida por personas naturales o jurídicas que cuenten con la capacidad técnica idónea, experiencia, organización y recursos especializados necesarios para el seguimiento del contrato según su objeto, valor y complejidad.",
    topic: "Interventoría - Requisitos"
  },
  {
    id: 27,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. El interventor de un contrato de obra debe presentar a la entidad:",
    options: [
      "Solo un informe final al terminar el contrato",
      "Informes periódicos sobre el avance físico y financiero, control de calidad, cumplimiento del cronograma y novedades relevantes",
      "Únicamente reportes cuando existan incumplimientos",
      "No está obligado a presentar informes escritos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el interventor debe presentar informes periódicos (según se establezca en el contrato) sobre el avance físico y financiero, control de calidad, cumplimiento del cronograma, gestión de riesgos y novedades relevantes del contrato.",
    topic: "Obligaciones del interventor"
  },
  {
    id: 28,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. En un contrato de interventoría, el interventor debe:",
    options: [
      "Aprobar pagos sin verificar el cumplimiento de requisitos contractuales",
      "Verificar el cumplimiento de obligaciones del contratista antes de certificar para pago, incluyendo aportes a seguridad social y parafiscales",
      "Solo verificar aspectos técnicos sin revisar documentación legal",
      "Autorizar cambios contractuales sin concepto previo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el interventor debe verificar integralmente el cumplimiento de obligaciones del contratista antes de certificar para pago, incluyendo aportes a seguridad social, parafiscales, pólizas vigentes y cumplimiento de especificaciones técnicas.",
    topic: "Verificación de pagos - Interventoría"
  },
  {
    id: 29,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Cuando se detectan vicios ocultos en una obra después de la liquidación, el interventor puede ser responsable si:",
    options: [
      "En ningún caso, pues su responsabilidad termina con la liquidación del contrato",
      "Se demuestra que actuó con dolo, culpa grave o negligencia en la supervisión técnica durante la ejecución de la obra",
      "Solo si el vicio aparece dentro del mes siguiente a la liquidación",
      "La responsabilidad es exclusiva del constructor sin afectar al interventor"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el interventor puede ser responsable por vicios ocultos si se demuestra que actuó con dolo, culpa grave o negligencia en la supervisión técnica, incumpliendo sus obligaciones de control de calidad durante la ejecución de la obra.",
    topic: "Responsabilidad del interventor por vicios"
  },
  {
    id: 30,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. El interventor tiene prohibido:",
    options: [
      "Solicitar información técnica al contratista",
      "Tener interés directo o indirecto en el contrato principal, ser socio, proveedor o tener vínculos que generen conflicto de interés",
      "Presentar informes a la entidad contratante",
      "Asistir a las reuniones de obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el interventor tiene prohibido tener interés directo o indirecto en el contrato objeto de interventoría, ser socio del contratista, proveedor de materiales o tener cualquier vínculo que genere conflicto de interés, según el régimen de inhabilidades e incompatibilidades.",
    topic: "Prohibiciones del interventor"
  },
  // Pólizas y garantías
  {
    id: 31,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Las garantías en la contratación estatal tienen como finalidad:",
    options: [
      "Generar ingresos adicionales para la entidad",
      "Respaldar el cumplimiento de las obligaciones del contratista y proteger a la entidad de perjuicios derivados del incumplimiento",
      "Sustituir la obligación de pago del contratista",
      "Únicamente cubrir riesgos de fuerza mayor"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, las garantías tienen como finalidad respaldar el cumplimiento de las obligaciones del contratista y proteger a la entidad estatal de perjuicios derivados del incumplimiento, mala calidad o eventos que afecten la correcta ejecución contractual.",
    topic: "Pólizas y garantías - Finalidad"
  },
  {
    id: 32,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. La garantía de cumplimiento de un contrato de obra debe cubrir:",
    options: [
      "Únicamente el valor total del contrato",
      "El cumplimiento general del contrato, calidad y correcto funcionamiento de los bienes o servicios, pago de salarios, prestaciones e indemnizaciones laborales, y responsabilidad extracontractual",
      "Solo los materiales utilizados en la obra",
      "Exclusivamente los salarios del personal contratista"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la garantía de cumplimiento debe cubrir: cumplimiento general del contrato, calidad y correcto funcionamiento, pago de salarios y prestaciones sociales, y responsabilidad extracontractual. Los amparos y porcentajes se establecen según el Decreto 1082 de 2015.",
    topic: "Garantía de cumplimiento - Amparos"
  },
  {
    id: 33,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. El amparo de calidad y correcto funcionamiento de la obra debe tener una vigencia de:",
    options: [
      "Solo hasta la terminación del contrato",
      "La que se establezca en el contrato, que en ningún caso será inferior a un (1) año contado desde el recibo a satisfacción",
      "Máximo 6 meses desde la entrega de la obra",
      "No es obligatorio para contratos de obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el amparo de calidad y correcto funcionamiento (también llamado garantía de estabilidad de la obra) debe tener la vigencia que se establezca en el contrato, que en ningún caso será inferior a un (1) año contado desde el recibo a satisfacción, según el Decreto 1082 de 2015.",
    topic: "Garantía de calidad - Vigencia"
  },
  {
    id: 34,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Si el contratista incumple el contrato y la entidad hace efectiva la póliza de cumplimiento:",
    options: [
      "El contratista queda liberado de todas sus obligaciones",
      "La entidad recibe el valor asegurado de la póliza, pero el contratista sigue siendo responsable por perjuicios que excedan el valor garantizado",
      "Se termina automáticamente la responsabilidad civil del contratista",
      "La aseguradora asume la ejecución del contrato"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, hacer efectiva la póliza no libera al contratista de sus obligaciones. La entidad recibe el valor asegurado, pero el contratista sigue siendo responsable por los perjuicios que excedan el valor garantizado y por las demás obligaciones contractuales y legales.",
    topic: "Efectos de hacer efectiva la póliza"
  },
  {
    id: 35,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. La garantía de salarios, prestaciones sociales e indemnizaciones laborales debe ser del:",
    options: [
      "5% del valor del contrato",
      "El equivalente a cinco (5%) por ciento del valor total del contrato y su vigencia debe ser el plazo del contrato y tres (3) años más",
      "10% del valor del contrato con vigencia de un año",
      "No es obligatoria en contratos de obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la garantía de pago de salarios, prestaciones sociales e indemnizaciones debe ser del cinco por ciento (5%) del valor total del contrato y su vigencia debe ser el plazo del contrato y tres (3) años más, según el Decreto 1082 de 2015, artículo 2.2.1.2.3.1.2.",
    topic: "Garantía laboral - Valor y vigencia"
  },
  // Ejecución contractual
  {
    id: 36,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. El acta de inicio de un contrato de obra debe contener:",
    options: [
      "Solo la fecha de firma del contrato",
      "La fecha de inicio de ejecución, designación del supervisor o interventor, forma de pago acordada y obligaciones específicas del contratista",
      "Únicamente la identificación de las partes",
      "No es obligatoria el acta de inicio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el acta de inicio debe indicar la fecha de inicio de ejecución, designación del supervisor o interventor, forma de pago acordada, obligaciones específicas del contratista, cronograma de ejecución y demás aspectos necesarios para la correcta ejecución del contrato.",
    topic: "Acta de inicio"
  },
  {
    id: 37,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Durante la ejecución del contrato, las modificaciones al valor o al plazo requieren:",
    options: [
      "Solo el acuerdo verbal entre las partes",
      "Modificación mediante otrosí o adición contractual, con justificación técnica, legal o financiera, y disponibilidad presupuestal previa",
      "Únicamente la aprobación del contratista",
      "No es posible modificar contratos estatales una vez firmados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, las modificaciones al valor (adición) o al plazo (prórroga) requieren modificación contractual mediante otrosí, con justificación técnica, legal o financiera documentada, disponibilidad presupuestal previa, y cumplimiento de los límites legales establecidos.",
    topic: "Modificaciones contractuales"
  },
  {
    id: 38,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. El límite legal para adicionar el valor de un contrato de obra es:",
    options: [
      "Ilimitado, según las necesidades de la obra",
      "Hasta el cincuenta por ciento (50%) del valor inicialmente pactado, expresado en el mismo",
      "Máximo el 30% del valor inicial",
      "No existe límite para contratos de obra pública"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el artículo 40 de la Ley 80 establece que los contratos pueden adicionarse hasta en un cincuenta por ciento (50%) de su valor inicial, expresado en el mismo, siempre que exista justificación, disponibilidad presupuestal y se mantenga el equilibrio económico.",
    topic: "Límite de adiciones"
  },
  {
    id: 39,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. La cesión de un contrato estatal a un tercero requiere:",
    options: [
      "Solo la voluntad del contratista cedente",
      "Autorización previa y expresa de la entidad, verificando que el cesionario cumple con los requisitos de capacidad, experiencia e idoneidad del cedente",
      "Únicamente notificar a la entidad después de realizada",
      "No es posible ceder contratos estatales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la cesión del contrato requiere autorización previa y expresa de la entidad estatal, quien debe verificar que el cesionario cumple con los requisitos habilitantes de capacidad, experiencia e idoneidad que tenía el cedente al momento de contratar, según el artículo 41 de la Ley 80.",
    topic: "Cesión de contratos"
  },
  {
    id: 40,
    question: "La liquidación del contrato de obra debe realizarse:",
    options: [
      "Solo cuando existe acuerdo entre las partes, sin límite de tiempo",
      "De común acuerdo dentro de los cuatro (4) meses siguientes a su terminación, vencimiento o expedición del acto que ordene la terminación, o unilateralmente si no hay acuerdo",
      "Únicamente de manera unilateral por la entidad",
      "No es obligatorio liquidar contratos de obra pública"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 60 de la Ley 80 establece que la liquidación debe realizarse de común acuerdo dentro de los cuatro (4) meses siguientes a la terminación, vencimiento o expedición del acto que ordene la terminación. Si no hay acuerdo, la entidad puede liquidar unilateralmente dentro de los dos (2) meses siguientes.",
    topic: "Liquidación de contratos"
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
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Las entidades con régimen contractual especial deben:",
    options: [
      "Observar los principios de la función administrativa y de la gestión fiscal y están sometidas al régimen de inhabilidades e incompatibilidades",
      "No están sometidas a ningún principio ni régimen de inhabilidades",
      "Solo deben cumplir principios comerciales privados",
      "Únicamente deben observar el régimen de inhabilidades pero no los principios administrativos"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, las entidades con régimen contractual especial deben observar los principios de la función administrativa y de la gestión fiscal y están sometidas al régimen de inhabilidades e incompatibilidades.",
    topic: "Marco normativo - Régimen especial"
  },
  {
    id: 3,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. El principio de transparencia exige que se permita:",
    options: [
      "Solo conocer las decisiones finales",
      "Conocer y controvertir informes, conceptos y decisiones, por ejemplo, a través de audiencias públicas de adjudicación",
      "Únicamente consultar documentos después de la adjudicación",
      "Solo acceder a información básica sin posibilidad de controvertir"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el principio de transparencia debe permitir conocer y controvertir informes, conceptos y decisiones; por ejemplo, a través de audiencias públicas de adjudicación y del acceso a las actuaciones y propuestas.",
    topic: "Principio de transparencia"
  },
  {
    id: 4,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Según el principio de economía y el deber de planeación, la entidad NO puede iniciar procesos si:",
    options: [
      "Tiene todos los recursos y autorizaciones disponibles",
      "No dispone de recursos o autorizaciones y no ha elaborado los estudios previos, diseños y pliegos antes de abrir la convocatoria",
      "Ya cuenta con estudios previos completos",
      "Tiene disponibilidad presupuestal aprobada"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, en cumplimiento del deber de planeación y de la buena fe precontractual, la entidad no puede iniciar procesos si no dispone de recursos o autorizaciones y debe elaborar los estudios previos, diseños y pliegos antes de abrir la convocatoria.",
    topic: "Principio de economía - Planeación"
  },
  {
    id: 5,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Según el artículo 26 de la Ley 80, los servidores públicos que intervienen en la contratación deben:",
    options: [
      "Solo adjudicar contratos sin responsabilidades posteriores",
      "Cumplir los fines de la contratación, vigilar la correcta ejecución y proteger los derechos de la entidad y del contratista",
      "Únicamente firmar contratos sin seguimiento",
      "Solo revisar documentación inicial sin vigilancia posterior"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el artículo 26 de la Ley 80 establece que los servidores públicos que intervienen en la contratación deben cumplir los fines de la contratación, vigilar la correcta ejecución y proteger los derechos de la entidad y del contratista.",
    topic: "Principio de responsabilidad"
  },
  {
    id: 6,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Para garantizar la selección objetiva, la administración debe:",
    options: [
      "Basarse en preferencias personales del evaluador",
      "Comparar las ofertas mediante el cotejo de propuestas, la consulta de precios del mercado y los estudios propios o de asesores",
      "Solo revisar el precio sin análisis técnico",
      "Adjudicar sin necesidad de comparación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, para ser objetiva, la administración debe comparar las ofertas mediante el cotejo de propuestas, la consulta de precios del mercado y los estudios propios o de asesores.",
    topic: "Principio de selección objetiva"
  },
  {
    id: 7,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. El Plan Anual de Adquisiciones debe contener:",
    options: [
      "Solo una lista de bienes a comprar",
      "Declaración estratégica con información general de la entidad, datos de contacto, valor total del PAA, límites de contratación y fecha de actualización, además de bienes, obras y servicios identificados",
      "Únicamente el presupuesto total anual",
      "Solo los proveedores preseleccionados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el PAA contiene una declaración estratégica con información general de la entidad, datos de contacto, valor total del PAA, límites de contratación de menor y mínima cuantía y fecha de actualización. También detalla bienes, obras o servicios identificados y necesidades para las cuales se desconoce el producto exacto.",
    topic: "Planeación - Contenido del PAA"
  },
  {
    id: 8,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Los estudios previos para contratos de mínima cuantía deben incluir:",
    options: [
      "Descripción sucinta de la necesidad, objeto identificado con el Clasificador, condiciones técnicas, valor estimado y justificación, plazo de ejecución y certificado de disponibilidad presupuestal",
      "Solo el valor del contrato",
      "Únicamente el objeto contractual sin análisis económico",
      "Solo la disponibilidad presupuestal"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, para contratos de mínima cuantía los estudios incluyen una descripción sucinta de la necesidad, el objeto identificado con el Clasificador de Bienes y Servicios, las condiciones técnicas, el valor estimado y su justificación, el plazo de ejecución y el certificado de disponibilidad presupuestal.",
    topic: "Planeación - Estudios previos de mínima cuantía"
  },
  {
    id: 9,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Los estudios de mercado deben analizar aspectos económicos del sector que incluyen:",
    options: [
      "Solo precios actuales de productos",
      "Productos, agentes, gremios, cifras de ventas, perspectivas de crecimiento, variables económicas, cadenas de producción, materias primas y dinámica de comercio exterior",
      "Únicamente la competencia local",
      "Solo la inflación del sector"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, los estudios de mercado deben analizar aspectos económicos del sector: productos, agentes, gremios, cifras de ventas, perspectivas de crecimiento, variables económicas, cadenas de producción, materias primas y dinámica de comercio exterior.",
    topic: "Planeación - Estudios de mercado"
  },
  {
    id: 10,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. En la etapa precontractual, los pliegos deben incluir:",
    options: [
      "Solo requisitos mínimos sin aclaraciones",
      "Reglas justas y claras, plazos razonables, respuestas motivadas a las observaciones, visitas voluntarias al sitio (no obligatorias) y audiencias de aclaración cuando el objeto lo requiera",
      "Únicamente requisitos técnicos sin plazos",
      "Solo criterios de evaluación sin oportunidad de observaciones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, los pliegos deben incluir reglas justas y claras, plazos razonables, respuestas motivadas a las observaciones, visitas voluntarias al sitio (no obligatorias) y audiencias de aclaración cuando el objeto lo requiera.",
    topic: "Etapa precontractual - Pliegos"
  },
  {
    id: 11,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. En la liquidación del contrato, según el Consejo de Estado, se debe establecer:",
    options: [
      "Solo el pago final al contratista",
      "El estado de las obligaciones ejecutadas, los ajustes y reconocimientos que correspondan, las garantías inherentes al objeto contractual y, excepcionalmente, los acuerdos o conciliaciones para poner fin a divergencias",
      "Únicamente las multas aplicadas",
      "Solo la fecha de terminación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, según el Consejo de Estado, en la liquidación se establece el estado de las obligaciones ejecutadas, los ajustes y reconocimientos que correspondan, las garantías inherentes al objeto contractual y, excepcionalmente, los acuerdos o conciliaciones para poner fin a divergencias.",
    topic: "Etapa post-contractual - Liquidación"
  },
  {
    id: 12,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Si no se pacta término para la liquidación, esta debe realizarse:",
    options: [
      "Dentro de los seis meses siguientes",
      "Dentro de los cuatro meses siguientes al vencimiento del plazo o de la terminación del contrato",
      "Dentro del año siguiente",
      "No tiene plazo definido"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, si no se pacta término, la liquidación debe realizarse dentro de los cuatro meses siguientes al vencimiento del plazo o de la terminación del contrato, y existe un plazo de hasta dos años para liquidación unilateral o de mutuo acuerdo.",
    topic: "Liquidación - Términos"
  },
  {
    id: 13,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. La selección abreviada se utiliza para:",
    options: [
      "Solo contratos de alto valor",
      "Adquisición de bienes y servicios de características uniformes mediante subasta inversa o acuerdos marco, bolsas de productos, servicios de salud, licitación desierta, entre otros casos específicos",
      "Únicamente servicios de consultoría",
      "Solo contratos de urgencia manifiesta"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la selección abreviada se usa para: adquisición de bienes y servicios de características técnicas uniformes mediante subasta inversa o acuerdos marco de precios; adquisición a través de bolsas de productos; servicios de salud; derivada de licitación desierta; entre otros casos específicos.",
    topic: "Modalidades de selección - Selección abreviada"
  },
  {
    id: 14,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. En la contratación de menor cuantía, si la entidad recibe más de diez manifestaciones de interés:",
    options: [
      "Debe rechazar todas y reiniciar el proceso",
      "Puede continuar con todos o realizar un sorteo para seleccionar máximo diez interesados",
      "Debe continuar obligatoriamente con todos",
      "Debe cancelar el proceso"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, si la entidad recibe más de diez manifestaciones de interés, puede continuar con todos o realizar un sorteo para seleccionar máximo diez interesados.",
    topic: "Menor cuantía - Procedimiento"
  },
  {
    id: 15,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Los contratos de mínima cuantía son aquellos cuyo valor:",
    options: [
      "No excede el 10% de la menor cuantía de la entidad",
      "Supera la menor cuantía de la entidad",
      "Es igual a la menor cuantía",
      "No tiene límite establecido"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, los contratos de mínima cuantía son aquellos cuyo valor no excede el 10% de la menor cuantía de la entidad; para ellos la invitación se publica al menos por un día hábil, no se exige inscripción en el RUP ni garantías.",
    topic: "Mínima cuantía"
  },
  {
    id: 16,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. En el concurso de méritos existe un proceso de precalificación en el cual:",
    options: [
      "Se evalúa directamente la propuesta económica",
      "Los interesados acreditan experiencia, formación y capacidad; la entidad publica el informe de precalificación y los interesados pueden hacer observaciones",
      "Solo se verifica la capacidad financiera",
      "No se requiere ningún tipo de acreditación previa"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, existe un proceso de precalificación en el concurso de méritos: los interesados acreditan experiencia, formación y capacidad; la entidad publica el informe de precalificación y los interesados pueden hacer observaciones. Tras la precalificación se evalúan las propuestas técnicas y económicas.",
    topic: "Concurso de méritos - Precalificación"
  },
  {
    id: 17,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Los servicios profesionales en contratación directa se caracterizan porque:",
    options: [
      "Generan relación laboral con la entidad",
      "Se contratan a personas naturales para labores relacionadas con funciones de la entidad y su vinculación no genera relación laboral",
      "Solo pueden ser contratados por empresas",
      "Requieren licitación pública obligatoriamente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, para servicios profesionales en contratación directa se contrata a personas naturales para labores relacionadas con funciones de la entidad; su vinculación no genera relación laboral.",
    topic: "Contratación directa - Servicios profesionales"
  },
  {
    id: 18,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. La convocatoria puede limitarse a Mipymes cuando:",
    options: [
      "El valor del proceso es inferior a USD 125,000 y se reciban solicitudes de al menos dos Mipymes con al menos un año de existencia",
      "En cualquier proceso sin restricción de valor",
      "Solo en contratos de mínima cuantía",
      "Nunca puede limitarse a Mipymes"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, el Decreto 1082 de 2015 permite que, cuando el valor del proceso es inferior a USD 125,000 (liquidados según tasa del Ministerio de Comercio, Industria y Turismo), la convocatoria pueda limitarse a Mipymes nacionales con al menos un año de existencia, siempre que se reciban solicitudes de al menos dos Mipymes.",
    topic: "Convocatoria limitada a Mipymes"
  },
  {
    id: 19,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Las incompatibilidades se refieren a:",
    options: [
      "Restricciones permanentes para contratar con cualquier entidad del Estado",
      "La imposibilidad de contratar con una entidad específica porque el contratista mantiene una relación con ella",
      "Inhabilidades por condenas penales",
      "Requisitos de experiencia no cumplidos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, las incompatibilidades se refieren a la imposibilidad de contratar con una entidad específica porque el contratista mantiene una relación con ella; por ejemplo, los servidores públicos no pueden simultáneamente ser contratistas de su propia entidad, salvo excepciones taxativas.",
    topic: "Régimen de incompatibilidades"
  },
  {
    id: 20,
    question: "Lectura: La Alcaldía abrió una licitación para modernizar la infraestructura vial y debe garantizar transparencia en cada etapa del proceso. Presentar información falsa durante la contratación:",
    options: [
      "No tiene consecuencias si el contrato se ejecuta bien",
      "Genera inhabilidad según el artículo 5 de la Ley 190 de 1995 y se considera falta gravísima",
      "Solo genera una amonestación administrativa",
      "Es permitido si mejora las posibilidades de adjudicación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, presentar información falsa genera inhabilidad (artículo 5 Ley 190 de 1995) y se considera falta gravísima intervenir en la celebración o ejecución de un contrato con una persona incursa en inhabilidad o incompatibilidad.",
    topic: "Inhabilidades - Información falsa"
  }
]

export function ContratacionTest() {
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2">("v1")
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = selectedVersion === "v1" ? questionsV1 : questionsV2

  const handleSubmit = () => {
    setShowResults(true)
    setShowFeedback(true)
  }

  const timer = useTestTimer({
    totalQuestions: questions.length,
    timePerQuestion: 120,
    onTimeUp: handleSubmit,
    isActive: !showResults
  })

  const handleVersionChange = (value: string) => {
    setSelectedVersion(value as "v1" | "v2")
    // Reiniciar el estado cuando se cambia de versión
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
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

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const score = showResults ? calculateScore() : null

  return (
    <div className="space-y-6">
      {!showResults && (
        <TestTimer
          formattedTime={timer.formattedTime}
          timeColor={timer.timeColor}
          percentageRemaining={timer.percentageRemaining}
        />
      )}

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
