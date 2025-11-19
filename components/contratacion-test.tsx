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
    question: "Situacion\n\nLa Alcaldia de Medellin ha iniciado el proceso de licitacion para la modernizacion de la red vial del centro de la ciudad. El jefe de contratacion necesita asegurarse de cumplir con toda la normativa vigente para evitar nulidades o sanciones.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son las principales leyes que la entidad debe consultar para regir la contratacion estatal en Colombia?",
    options: [
      "Ley 80 de 1993, Ley 1150 de 2007 y Decreto 1082 de 2015",
      "Ley 100 de 1993, Ley 715 de 2001 y Decreto 2555 de 2010",
      "Ley 489 de 1998, Ley 734 de 2002 y Decreto 019 de 2012",
      "Ley 1437 de 2011, Ley 1474 de 2011 y Decreto 1510 de 2013"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, la Alcaldia de Medellin debe regirse por la Ley 80 de 1993 (Estatuto General de Contratacion), la Ley 1150 de 2007 (medidas para la eficiencia y transparencia) y el Decreto 1082 de 2015 (reglamentario del sector administrativo de planeacion). Estas tres normas constituyen el marco juridico principal de la contratacion estatal en Colombia.",
    topic: "Marco normativo y principios generales"
  },
  {
    id: 2,
    question: "Situacion\n\nEl municipio de Envigado publico los pliegos de condiciones para la construccion de un centro deportivo. Varios proponentes han solicitado aclaraciones y uno de ellos alega que no tuvo acceso oportuno a la informacion.\n\nPregunta\n\nCon base en la situacion descrita, ¿que exige el principio de transparencia en la contratacion estatal?",
    options: [
      "La administracion publique plenamente las bases de los procesos y garantice igualdad de oportunidades",
      "Los procesos sean reservados para proteger la informacion comercial",
      "Solo los grandes empresarios puedan acceder a la informacion",
      "Las decisiones de adjudicacion no requieran motivacion"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el municipio de Envigado debe aplicar el principio de transparencia que exige publicar plenamente las bases de los procesos de seleccion y garantizar que todos los participantes tengan igualdad de oportunidades. La actuacion oculta o arbitraria esta prohibida, y todos los proponentes deben tener acceso oportuno a la informacion.",
    topic: "Principio de transparencia"
  },
  {
    id: 3,
    question: "Situacion\n\nLa Gobernacion de Antioquia esta estructurando un proceso de seleccion abreviada para adquirir equipos de computo. El equipo juridico debate sobre la cantidad de etapas y requisitos que deben incluirse en el cronograma del proceso.\n\nPregunta\n\nSegun el principio de economia, ¿como deben estructurarse los procedimientos contractuales?",
    options: [
      "Realizarse con multiples aprobaciones administrativas para mayor control",
      "Limitarse a las etapas estrictamente necesarias con terminos preclusivos y perentorios",
      "Extenderse el mayor tiempo posible para garantizar calidad",
      "Incluir etapas adicionales de verificacion en todos los casos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Gobernacion debe aplicar el principio de economia que establece que los procedimientos deben limitarse a las etapas estrictamente necesarias y sus terminos son preclusivos y perentorios. La adquisicion de equipos de computo debe adelantarse con austeridad de tiempo, medios y gastos, evitando tramites innecesarios.",
    topic: "Principio de economia"
  },
  {
    id: 4,
    question: "Situacion\n\nDurante la ejecucion de un contrato de obra publica en Rionegro, se detectaron deficiencias en la calidad de los materiales utilizados que causaron danos en la infraestructura recien construida. La comunidad exige que se determinen responsabilidades.\n\nPregunta\n\nCon base en la situacion descrita, ¿que establece el principio de responsabilidad en la contratacion publica?",
    options: [
      "Solo el contratista responde por los danos ocasionados",
      "El Estado, los servidores y los contratistas responden por los danos ocasionados durante la actividad contractual",
      "Los servidores publicos estan exentos de responsabilidad penal",
      "Solo existe responsabilidad disciplinaria, no civil ni penal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el principio de responsabilidad hace que el Estado, los servidores publicos y los contratistas respondan por los danos ocasionados durante la actividad contractual. El articulo 26 de la Ley 80 establece responsabilidades civiles, penales y disciplinarias para quienes intervienen en la contratacion cuando hay danos como los detectados en Rionegro.",
    topic: "Principio de responsabilidad"
  },
  {
    id: 5,
    question: "Situacion\n\nLa Secretaria de Infraestructura del municipio de Bello recibio cinco propuestas para la pavimentacion de vias rurales. El comite evaluador debe determinar cual es la oferta mas favorable para la entidad aplicando criterios objetivos.\n\nPregunta\n\nCon base en la situacion descrita, ¿en que debe basarse la seleccion objetiva para escoger la oferta?",
    options: [
      "Preferencias personales del funcionario evaluador",
      "Factores subjetivos como relaciones comerciales previas",
      "Factores de evaluacion como cumplimiento, experiencia, organizacion, equipos, plazo y precio previamente definidos",
      "Unicamente el precio mas bajo sin considerar otros aspectos"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, la Secretaria de Infraestructura de Bello debe basar la seleccion objetiva en factores de evaluacion como cumplimiento, experiencia, organizacion, equipos, plazo y precio previamente definidos en los pliegos. Esto garantiza transparencia, imparcialidad e igualdad de oportunidades para las cinco propuestas recibidas.",
    topic: "Principio de seleccion objetiva"
  },
  {
    id: 6,
    question: "Situacion\n\nEl Area Metropolitana del Valle de Aburra esta elaborando su programacion para la vigencia 2025 y necesita informar a los proveedores sobre las contrataciones que realizara durante el ano para fomentar la participacion.\n\nPregunta\n\nCon base en la situacion descrita, ¿que es el Plan Anual de Adquisiciones (PAA)?",
    options: [
      "Un documento interno que no requiere publicacion",
      "El primer ejercicio de planeacion que las entidades deben publicar en el SECOP para informar a proveedores que, cuando y como pretenden comprar",
      "Un informe trimestral de compras realizadas",
      "Una lista de contratistas preferenciales de la entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el PAA que debe elaborar el Area Metropolitana es el primer ejercicio de planeacion que las entidades estatales deben publicar en el portal del SECOP. Sirve para informar a los proveedores que, cuando y como pretenden comprar durante la vigencia 2025, promoviendo la competencia y participacion.",
    topic: "Planeacion - Plan Anual de Adquisiciones"
  },
  {
    id: 7,
    question: "Situacion\n\nEl Hospital General de Medellin necesita contratar la adquisicion de equipos medicos especializados. El equipo de planeacion esta elaborando los documentos previos que sustentaran el proceso de seleccion.\n\nPregunta\n\nCon base en la situacion descrita, ¿que elementos deben contener los estudios previos?",
    options: [
      "Solo el valor estimado del contrato",
      "Descripcion de la necesidad, objeto, modalidad de seleccion, valor estimado, criterios de seleccion, analisis de riesgos y garantias",
      "Unicamente la justificacion del objeto",
      "Solo los requisitos tecnicos sin analisis economico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, segun el Decreto 1082 de 2015, los estudios previos del Hospital deben contener: descripcion de la necesidad de los equipos medicos, objeto, modalidad de seleccion y su justificacion, valor estimado, criterios de seleccion, analisis de riesgos, garantias, entre otros elementos que sustenten adecuadamente el proceso.",
    topic: "Planeacion - Estudios previos"
  },
  {
    id: 8,
    question: "Situacion\n\nLa Alcaldia de Itagui va a contratar servicios de mantenimiento de ascensores para los edificios publicos del municipio. El equipo de contratacion debe realizar un estudio del sector para conocer las condiciones del mercado.\n\nPregunta\n\nCon base en la situacion descrita, ¿que aspectos deben analizarse en los estudios de mercado o del sector?",
    options: [
      "Solo los precios actuales de los productos",
      "Aspectos economicos, tecnologicos, logisticos y regulatorios del sector",
      "Unicamente la oferta de proveedores locales",
      "Solo las perspectivas de crecimiento economico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para el servicio de mantenimiento de ascensores, la Alcaldia de Itagui debe analizar aspectos economicos del sector, soluciones tecnologicas disponibles, aspectos logisticos como tiempos de respuesta y cobertura, y la regulacion aplicable en materia de seguridad, de manera proporcional al valor y complejidad del proceso.",
    topic: "Planeacion - Estudios de mercado"
  },
  {
    id: 9,
    question: "Situacion\n\nLa Universidad de Antioquia inicio un proceso de licitacion publica para construir un nuevo edificio de laboratorios. El proceso se encuentra en la fase donde se reciben las propuestas de los interesados.\n\nPregunta\n\nCon base en la situacion descrita, ¿que actividades comprende la etapa precontractual?",
    options: [
      "Solo la firma del contrato",
      "Elaboracion de estudios previos, resolucion de apertura, publicacion de pliegos, evaluacion de ofertas y adjudicacion",
      "Unicamente la ejecucion del contrato",
      "Solo la liquidacion del contrato"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la etapa precontractual en la que se encuentra la Universidad comprende la elaboracion de estudios previos, la resolucion de apertura, la publicacion de pliegos, la recepcion y evaluacion de ofertas y la adjudicacion del contrato. La fase de recepcion de propuestas hace parte de esta etapa precontractual.",
    topic: "Etapas del proceso contractual"
  },
  {
    id: 10,
    question: "Situacion\n\nEl contrato de construccion de la biblioteca municipal de Copacabana finalizo su ejecucion hace dos meses. El supervisor y el contratista deben establecer el balance final de las obligaciones cumplidas.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuando debe realizarse la liquidacion del contrato?",
    options: [
      "Inmediatamente despues de la firma del contrato",
      "En el termino fijado en el pliego o pactado; si no se pacta, dentro de los cuatro meses siguientes al vencimiento o terminacion",
      "No es obligatoria la liquidacion de contratos estatales",
      "Dentro de los seis anos siguientes a la terminacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la liquidacion del contrato de la biblioteca de Copacabana debe realizarse en el termino fijado o pactado; si no se pacto, dentro de los cuatro meses siguientes al vencimiento del plazo o terminacion del contrato. Como ya pasaron dos meses, aun estan dentro del plazo para la liquidacion bilateral.",
    topic: "Etapa post-contractual (Liquidacion)"
  },
  {
    id: 11,
    question: "Situacion\n\nUna firma constructora de Caldas quiere participar en procesos de contratacion publica pero no conoce donde puede consultar las convocatorias abiertas y la documentacion de los procesos.\n\nPregunta\n\nCon base en la situacion descrita, ¿que es el SECOP?",
    options: [
      "Un sistema de control presupuestal interno",
      "El Sistema Electronico para la Contratacion Publica donde se publican todas las actuaciones de los procesos",
      "Un software de gestion documental",
      "Una plataforma de capacitacion para contratistas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la firma constructora debe consultar el SECOP, que es el Sistema Electronico para la Contratacion Publica. Es una plataforma digital donde se publican todas las actuaciones de los procesos de contratacion, permitiendo a los interesados conocer las convocatorias y documentos para cumplir los principios de transparencia y publicidad.",
    topic: "Sistemas - SECOP"
  },
  {
    id: 12,
    question: "Situacion\n\nLa Secretaria de Hacienda de Sabaneta necesita orientacion sobre las mejores practicas para estructurar los pliegos de condiciones de un proceso de seleccion abreviada. Buscan documentos estandarizados que faciliten el proceso.\n\nPregunta\n\nCon base en la situacion descrita, ¿de que se encarga Colombia Compra Eficiente (CCE)?",
    options: [
      "Ejecutar directamente todos los procesos de contratacion del Estado",
      "Definir lineamientos para los procesos de contratacion y elaborar pliegos tipo",
      "Fiscalizar los contratos despues de su ejecucion",
      "Administrar el presupuesto de contratacion de las entidades"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Secretaria de Hacienda de Sabaneta puede acudir a Colombia Compra Eficiente, que es la agencia nacional de contratacion publica encargada de definir lineamientos para los procesos de contratacion y elaborar pliegos tipo para unificar metodologias y lograr contratacion eficiente. Estos pliegos tipo facilitaran su proceso.",
    topic: "Entidades de apoyo - Colombia Compra Eficiente"
  },
  {
    id: 13,
    question: "Situacion\n\nEn un proceso de licitacion para la construccion de un acueducto veredal en Yarumal, el comite evaluador debe verificar si los proponentes cumplen con las condiciones minimas para participar.\n\nPregunta\n\nCon base en la situacion descrita, ¿que incluyen los requisitos habilitantes?",
    options: [
      "Solo la capacidad financiera del proponente",
      "Capacidad juridica, financiera, organizacional y tecnica",
      "Unicamente la experiencia previa en contratos similares",
      "Solo el cumplimiento de requisitos tributarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el comite evaluador del proceso de Yarumal debe verificar los requisitos habilitantes que incluyen: capacidad juridica (incluyendo experiencia), capacidad financiera (liquidez, endeudamiento), capacidad organizacional (rentabilidad, ingresos) y capacidad tecnica (profesionales vinculados) de cada proponente.",
    topic: "Requisitos habilitantes"
  },
  {
    id: 14,
    question: "Situacion\n\nLa Secretaria de Obras Publicas de Barbosa debe contratar la construccion de un coliseo deportivo por valor de 8.000 SMMLV. El equipo de contratacion debe definir cual es la modalidad de seleccion aplicable.\n\nPregunta\n\nCon base en la situacion descrita, ¿que es la licitacion publica?",
    options: [
      "Una modalidad excepcional que solo se usa en casos especiales",
      "La modalidad de seleccion que se usa por regla general",
      "Solo aplicable a contratos de menor cuantia",
      "Una modalidad exclusiva para servicios de salud"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, dado el alto valor del contrato (8.000 SMMLV), la Secretaria de Obras Publicas de Barbosa debe aplicar la licitacion publica, que es la modalidad de seleccion que se usa por regla general en la contratacion estatal. Otras modalidades como la seleccion abreviada o contratacion directa son excepcionales.",
    topic: "Modalidades de seleccion - Licitacion publica"
  },
  {
    id: 15,
    question: "Situacion\n\nEl Instituto de Deportes de Antioquia necesita contratar los estudios de factibilidad y diseno arquitectonico para un complejo deportivo regional. El equipo juridico debe determinar la modalidad de seleccion adecuada.\n\nPregunta\n\nCon base en la situacion descrita, ¿para que tipo de contratos se aplica el concurso de meritos?",
    options: [
      "Cualquier tipo de contrato sin restriccion",
      "Servicios de consultoria y proyectos de arquitectura",
      "Unicamente para contratos de obra publica",
      "Solo para suministro de bienes y equipos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Instituto de Deportes debe aplicar el concurso de meritos porque se trata de servicios de consultoria (estudios de factibilidad) y proyectos de arquitectura (diseno del complejo deportivo), conforme al articulo 32 numeral 2 de la Ley 80 y el Decreto 2326 de 1995.",
    topic: "Modalidades de seleccion - Concurso de meritos"
  },
  {
    id: 16,
    question: "Situacion\n\nDespues de una emergencia invernal que afecto la via que comunica a Girardota con el casco urbano, la Alcaldia necesita contratar urgentemente las obras de reparacion para restablecer la movilidad.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuando puede utilizarse la contratacion directa?",
    options: [
      "En cualquier momento que la entidad lo decida",
      "En casos taxativos como urgencia manifiesta, contratos interadministrativos, servicios profesionales, entre otros",
      "Solo para contratos de bajo valor",
      "Unicamente cuando hay un solo proveedor en el mercado mundial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Alcaldia de Girardota puede utilizar la contratacion directa porque se trata de una urgencia manifiesta por la emergencia invernal. La contratacion directa se utiliza en casos taxativos como: urgencia manifiesta, contratos interadministrativos, bienes de seguridad nacional, actividades cientificas, servicios profesionales, entre otros.",
    topic: "Modalidades de seleccion - Contratacion directa"
  },
  {
    id: 17,
    question: "Situacion\n\nLa ESE Hospital San Vicente de Paul de Caldas debe contratar el suministro de insumos de aseo por un valor de 200 SMMLV, que corresponde a la menor cuantia de la entidad. El equipo de contratacion debe estructurar el proceso.\n\nPregunta\n\nCon base en la situacion descrita, ¿que son los contratos de menor cuantia?",
    options: [
      "Contratos que no superan la menor cuantia de la entidad y requieren manifestacion de interes dentro de tres dias habiles",
      "Contratos que solo pueden hacerse con Mipymes",
      "Contratos que no requieren ningun tipo de publicacion",
      "Contratos que no estan sujetos a ninguna regulacion"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el contrato del Hospital es de menor cuantia porque no supera la menor cuantia de la entidad (200 SMMLV). Los interesados deben manifestar su intencion de participar dentro de los tres dias habiles siguientes a la apertura. Si hay mas de diez manifestaciones, puede hacerse sorteo.",
    topic: "Modalidades - Menor cuantia"
  },
  {
    id: 18,
    question: "Situacion\n\nLa Secretaria de Infraestructura de La Estrella esta elaborando los pliegos para la construccion de un puente peatonal. Deben determinar como manejar los posibles eventos adversos que puedan afectar la ejecucion del contrato.\n\nPregunta\n\nSegun la Ley 1150 de 2007, ¿que deben hacer las entidades respecto a los riesgos en la contratacion?",
    options: [
      "Evitar mencionar riesgos para no desalentar a los proponentes",
      "Identificar los riesgos en los pliegos y asignar su cobertura",
      "Trasladar todos los riesgos al contratista",
      "Solo identificar riesgos financieros"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Secretaria de Infraestructura de La Estrella debe, conforme a la Ley 1150 de 2007, identificar los riesgos en los pliegos de la construccion del puente peatonal y asignar su cobertura. Deben establecerse las acciones para mitigarlos y determinar quien asumira cada riesgo.",
    topic: "Riesgos en la contratacion"
  },
  {
    id: 19,
    question: "Situacion\n\nUna empresa de ingenieria quiere participar en un proceso de licitacion de la Gobernacion, pero su representante legal fue condenado por un delito contra la administracion publica hace tres anos.\n\nPregunta\n\nCon base en la situacion descrita, ¿que son las inhabilidades en la contratacion estatal?",
    options: [
      "Permisos especiales que se otorgan a ciertos contratistas",
      "Restricciones previstas en la Constitucion y la ley que impiden a una persona contratar con el Estado",
      "Impedimentos temporales que se pueden subsanar durante el proceso",
      "Requisitos adicionales solo para grandes empresas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la condena del representante legal por delito contra la administracion publica genera una inhabilidad. Las inhabilidades son restricciones previstas en la Constitucion y la ley que impiden a una persona acceder a cargos publicos o contratar con el Estado, por ejemplo, por haber sido condenada.",
    topic: "Regimen de inhabilidades"
  },
  {
    id: 20,
    question: "Situacion\n\nDurante la ejecucion de un contrato de interventoria en Caucasia, el representante legal del contratista fue inhabilitado por haber sido sancionado fiscalmente. El contrato aun tiene ocho meses de plazo.\n\nPregunta\n\nCon base en la situacion descrita, si durante la ejecucion del contrato sobreviene una inhabilidad, ¿que puede hacer el contratista?",
    options: [
      "Continuar ejecutando el contrato normalmente",
      "Ceder el contrato a un tercero con iguales condiciones tecnicas, financieras y de experiencia, previa aprobacion de la entidad",
      "Suspender temporalmente la ejecucion hasta subsanar la inhabilidad",
      "Delegar la ejecucion sin autorizacion de la entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, dado que sobrevino una inhabilidad durante la ejecucion, el contratista puede ceder el contrato a un tercero con iguales condiciones tecnicas, financieras y de experiencia, previa aprobacion de la entidad. De lo contrario, el contrato de interventoria debera terminarse y liquidarse.",
    topic: "Regimen de inhabilidades - Efectos"
  },
  {
    id: 21,
    question: "Situacion\n\nEl municipio de Apartado adjudico un contrato para la construccion de un centro de salud. El alcalde debe designar quien hara el seguimiento al cumplimiento de las obligaciones del contratista durante la ejecucion.\n\nPregunta\n\nSegun la Ley 1474 de 2011 (Estatuto Anticorrupcion), ¿en que consiste la supervision de contratos?",
    options: [
      "Es facultativa y depende de la voluntad de la entidad",
      "Consiste unicamente en la verificacion final del cumplimiento del contrato",
      "Consiste en el seguimiento tecnico, administrativo, financiero, contable y juridico sobre el cumplimiento del objeto contractual",
      "Solo aplica para contratos de obra publica"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el articulo 83 de la Ley 1474 establece que la supervision que debe designar el alcalde de Apartado consiste en el seguimiento tecnico, administrativo, financiero, contable y juridico que sobre el cumplimiento del objeto del contrato es ejercida por la entidad estatal cuando no se requiere conocimientos especializados.",
    topic: "Supervision de contratos"
  },
  {
    id: 22,
    question: "Situacion\n\nLa Gobernacion de Antioquia contrato la construccion de una via terciaria en el Bajo Cauca por valor de 15.000 SMMLV. Debe decidir si designa un funcionario interno para el seguimiento o si contrata a un externo especializado.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es la diferencia principal entre supervision e interventoria?",
    options: [
      "No existe diferencia, son terminos sinonimos",
      "La supervision la ejerce directamente un funcionario de la entidad, mientras que la interventoria la realiza un contratista externo con conocimientos especializados",
      "La interventoria solo aplica para contratos menores a 50 SMMLV",
      "La supervision solo se requiere en contratos de prestacion de servicios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, dado el alto valor y complejidad tecnica de la via, la Gobernacion podria optar por la interventoria. La supervision es ejercida directamente por un funcionario de la entidad cuando no se requieren conocimientos especializados, mientras que la interventoria se contrata cuando se necesitan conocimientos especializados para el seguimiento tecnico.",
    topic: "Supervision vs Interventoria"
  },
  {
    id: 23,
    question: "Situacion\n\nEl supervisor del contrato de construccion de la sede administrativa de Carepa debe realizar visitas periodicas a la obra para verificar que se esten cumpliendo las especificaciones tecnicas y el cronograma establecido.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son las funciones del supervisor de un contrato de obra?",
    options: [
      "Modificar unilateralmente el objeto contractual sin acta",
      "Verificar el cumplimiento de las especificaciones tecnicas, controlar el avance fisico y financiero, y revisar la calidad de materiales y procedimientos constructivos",
      "Sustituir al contratista en la ejecucion de la obra",
      "Autorizar pagos sin verificar requisitos previos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el supervisor en Carepa debe verificar el cumplimiento de las especificaciones tecnicas, controlar el avance fisico y financiero, revisar la calidad de materiales y procedimientos constructivos, y velar por el cumplimiento de normas de seguridad y ambientales durante la construccion.",
    topic: "Funciones del supervisor"
  },
  {
    id: 24,
    question: "Situacion\n\nEl supervisor del contrato de pavimentacion en Turbo detecto que el contratista esta utilizando materiales de menor calidad a los especificados y presenta un retraso de dos meses en el cronograma.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe hacer el supervisor o interventor que evidencie incumplimientos del contratista?",
    options: [
      "Informar de manera inmediata al ordenador del gasto para que adopte las medidas conducentes, como imposicion de multas o inicio de caducidad",
      "Esperar hasta la terminacion del contrato para reportar",
      "Negociar directamente con el contratista sin informar a la entidad",
      "Solo documentar las irregularidades sin tomar accion"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el supervisor en Turbo tiene la obligacion legal de informar de manera inmediata al ordenador del gasto sobre los incumplimientos detectados (materiales inadecuados y retrasos), para que la entidad adopte las medidas como imposicion de multas, declaratoria de incumplimiento o caducidad del contrato.",
    topic: "Obligaciones del supervisor ante incumplimientos"
  },
  {
    id: 25,
    question: "Situacion\n\nLa Contraloria Departamental inicio una investigacion contra el supervisor de un contrato de obra en Nechi porque no reporto sobrecostos evidentes y certifico pagos por obras no ejecutadas.\n\nPregunta\n\nCon base en la situacion descrita, ¿que tipo de responsabilidad puede tener el supervisor por el incumplimiento de sus obligaciones?",
    options: [
      "Unicamente administrativa, sin consecuencias adicionales",
      "Disciplinaria, fiscal, penal y civil, dependiendo de la naturaleza y gravedad de los hechos",
      "Solo disciplinaria, sin afectacion patrimonial",
      "Ninguna, ya que la responsabilidad es exclusiva del contratista"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el supervisor en Nechi puede incurrir en responsabilidad disciplinaria (Ley 734), fiscal (dano al patrimonio publico por los sobrecostos), penal (delitos como peculado por extension) y civil (reparacion de perjuicios), segun la naturaleza y gravedad de los hechos de no reportar y certificar indebidamente.",
    topic: "Responsabilidad del supervisor"
  },
  {
    id: 26,
    question: "Situacion\n\nEl municipio de Chigorodo va a contratar la interventoria para una obra de ampliacion del hospital local. El comite de contratacion debe definir el perfil requerido para quien ejercera esta funcion.\n\nPregunta\n\nCon base en la situacion descrita, ¿por quien debe ser ejercida la interventoria en contratos de obra publica?",
    options: [
      "Cualquier profesional sin restricciones",
      "Personas naturales o juridicas que cuenten con la capacidad tecnica, experiencia, organizacion y recursos especializados necesarios",
      "Unicamente por entidades publicas",
      "Solo por empleados de planta de la entidad contratante"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la interventoria para la ampliacion del hospital de Chigorodo debe ser ejercida por personas naturales o juridicas que cuenten con la capacidad tecnica idonea, experiencia en obras hospitalarias, organizacion y recursos especializados necesarios para el seguimiento del contrato segun su objeto, valor y complejidad.",
    topic: "Interventoria - Requisitos"
  },
  {
    id: 27,
    question: "Situacion\n\nEl interventor del contrato de construccion del palacio municipal de Andes debe entregar a la entidad la documentacion sobre el estado de avance de la obra para que se puedan tramitar los pagos al contratista.\n\nPregunta\n\nCon base en la situacion descrita, ¿que informes debe presentar el interventor de un contrato de obra a la entidad?",
    options: [
      "Solo un informe final al terminar el contrato",
      "Informes periodicos sobre el avance fisico y financiero, control de calidad, cumplimiento del cronograma y novedades relevantes",
      "Unicamente reportes cuando existan incumplimientos",
      "No esta obligado a presentar informes escritos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el interventor del palacio municipal de Andes debe presentar informes periodicos (segun se establezca en el contrato) sobre el avance fisico y financiero, control de calidad, cumplimiento del cronograma, gestion de riesgos y novedades relevantes para sustentar los pagos al contratista.",
    topic: "Obligaciones del interventor"
  },
  {
    id: 28,
    question: "Situacion\n\nEl contratista de obra del municipio de Segovia presento la cuenta de cobro del tercer pago parcial. El interventor debe verificar todos los requisitos antes de dar su visto bueno para que la entidad procese el pago.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe verificar el interventor antes de certificar para pago?",
    options: [
      "Aprobar pagos sin verificar el cumplimiento de requisitos contractuales",
      "Verificar el cumplimiento de obligaciones del contratista antes de certificar para pago, incluyendo aportes a seguridad social y parafiscales",
      "Solo verificar aspectos tecnicos sin revisar documentacion legal",
      "Autorizar cambios contractuales sin concepto previo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el interventor en Segovia debe verificar integralmente el cumplimiento de obligaciones del contratista antes de certificar el tercer pago, incluyendo aportes a seguridad social, parafiscales, polizas vigentes y cumplimiento de especificaciones tecnicas de la obra ejecutada.",
    topic: "Verificacion de pagos - Interventoria"
  },
  {
    id: 29,
    question: "Situacion\n\nDos anos despues de liquidado el contrato de construccion de un colegio en Taraza, aparecieron grietas estructurales en las columnas principales. La entidad esta evaluando si el interventor tiene alguna responsabilidad.\n\nPregunta\n\nCon base en la situacion descrita, cuando se detectan vicios ocultos en una obra despues de la liquidacion, ¿cuando puede ser responsable el interventor?",
    options: [
      "En ningun caso, pues su responsabilidad termina con la liquidacion del contrato",
      "Se demuestra que actuo con dolo, culpa grave o negligencia en la supervision tecnica durante la ejecucion de la obra",
      "Solo si el vicio aparece dentro del mes siguiente a la liquidacion",
      "La responsabilidad es exclusiva del constructor sin afectar al interventor"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el interventor del colegio de Taraza puede ser responsable por las grietas estructurales (vicios ocultos) si se demuestra que actuo con dolo, culpa grave o negligencia en la supervision tecnica, incumpliendo sus obligaciones de control de calidad durante la ejecucion de la obra.",
    topic: "Responsabilidad del interventor por vicios"
  },
  {
    id: 30,
    question: "Situacion\n\nUna firma de interventoria que fue contratada para supervisar la construccion de un acueducto en Caceres resulto ser proveedor de algunos materiales que utiliza el contratista de obra.\n\nPregunta\n\nCon base en la situacion descrita, ¿que tiene prohibido el interventor?",
    options: [
      "Solicitar informacion tecnica al contratista",
      "Tener interes directo o indirecto en el contrato principal, ser socio, proveedor o tener vinculos que generen conflicto de interes",
      "Presentar informes a la entidad contratante",
      "Asistir a las reuniones de obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el interventor del acueducto de Caceres incurre en una prohibicion grave al ser proveedor de materiales del contratista. El interventor tiene prohibido tener interes directo o indirecto en el contrato, ser socio del contratista, proveedor de materiales o cualquier vinculo que genere conflicto de interes.",
    topic: "Prohibiciones del interventor"
  },
  {
    id: 31,
    question: "Situacion\n\nEl municipio de El Bagre va a adjudicar un contrato de construccion de viviendas de interes social. El equipo de contratacion debe definir que mecanismos de proteccion se exigiran al contratista para respaldar sus obligaciones.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es la finalidad de las garantias en la contratacion estatal?",
    options: [
      "Generar ingresos adicionales para la entidad",
      "Respaldar el cumplimiento de las obligaciones del contratista y proteger a la entidad de perjuicios derivados del incumplimiento",
      "Sustituir la obligacion de pago del contratista",
      "Unicamente cubrir riesgos de fuerza mayor"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, las garantias que debe exigir el municipio de El Bagre tienen como finalidad respaldar el cumplimiento de las obligaciones del contratista y proteger a la entidad de perjuicios derivados del incumplimiento, mala calidad o eventos que afecten la correcta construccion de las viviendas.",
    topic: "Polizas y garantias - Finalidad"
  },
  {
    id: 32,
    question: "Situacion\n\nLa Secretaria de Infraestructura de Zaragoza va a contratar la construccion de un centro comunitario y debe establecer en los pliegos los amparos que debe contener la garantia de cumplimiento.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe cubrir la garantia de cumplimiento de un contrato de obra?",
    options: [
      "Unicamente el valor total del contrato",
      "El cumplimiento general del contrato, calidad y correcto funcionamiento de los bienes o servicios, pago de salarios, prestaciones e indemnizaciones laborales, y responsabilidad extracontractual",
      "Solo los materiales utilizados en la obra",
      "Exclusivamente los salarios del personal contratista"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la garantia de cumplimiento del centro comunitario de Zaragoza debe cubrir: cumplimiento general del contrato, calidad y correcto funcionamiento, pago de salarios y prestaciones sociales, y responsabilidad extracontractual. Los amparos y porcentajes se establecen segun el Decreto 1082 de 2015.",
    topic: "Garantia de cumplimiento - Amparos"
  },
  {
    id: 33,
    question: "Situacion\n\nEl contratista que construyo el parque central de Mutata va a entregar la obra terminada. La entidad debe verificar la vigencia del amparo de estabilidad que protege contra defectos de construccion.\n\nPregunta\n\nCon base en la situacion descrita, ¿que vigencia debe tener el amparo de calidad y correcto funcionamiento de la obra?",
    options: [
      "Solo hasta la terminacion del contrato",
      "La que se establezca en el contrato, que en ningun caso sera inferior a un (1) ano contado desde el recibo a satisfaccion",
      "Maximo 6 meses desde la entrega de la obra",
      "No es obligatorio para contratos de obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el amparo de calidad y correcto funcionamiento del parque de Mutata (tambien llamado garantia de estabilidad de la obra) debe tener la vigencia que se establezca en el contrato, que en ningun caso sera inferior a un (1) ano contado desde el recibo a satisfaccion, segun el Decreto 1082 de 2015.",
    topic: "Garantia de calidad - Vigencia"
  },
  {
    id: 34,
    question: "Situacion\n\nEl contratista de una obra vial en Vigia del Fuerte incumplio gravemente el contrato y la entidad decidio hacer efectiva la poliza de cumplimiento. El contratista alega que con el pago de la aseguradora queda liberado de toda responsabilidad.\n\nPregunta\n\nCon base en la situacion descrita, si la entidad hace efectiva la poliza de cumplimiento, ¿que sucede con la responsabilidad del contratista?",
    options: [
      "El contratista queda liberado de todas sus obligaciones",
      "La entidad recibe el valor asegurado de la poliza, pero el contratista sigue siendo responsable por perjuicios que excedan el valor garantizado",
      "Se termina automaticamente la responsabilidad civil del contratista",
      "La aseguradora asume la ejecucion del contrato"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, hacer efectiva la poliza no libera al contratista de Vigia del Fuerte de sus obligaciones. La entidad recibe el valor asegurado, pero el contratista sigue siendo responsable por los perjuicios que excedan el valor garantizado y por las demas obligaciones contractuales y legales.",
    topic: "Efectos de hacer efectiva la poliza"
  },
  {
    id: 35,
    question: "Situacion\n\nEl municipio de Urrao esta elaborando los pliegos para un contrato de construccion de escuelas rurales y debe establecer el valor y vigencia del amparo que proteja los derechos de los trabajadores del contratista.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual debe ser el valor y vigencia de la garantia de salarios, prestaciones sociales e indemnizaciones laborales?",
    options: [
      "5% del valor del contrato",
      "El equivalente a cinco (5%) por ciento del valor total del contrato y su vigencia debe ser el plazo del contrato y tres (3) anos mas",
      "10% del valor del contrato con vigencia de un ano",
      "No es obligatoria en contratos de obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la garantia de pago de salarios, prestaciones sociales e indemnizaciones para las escuelas de Urrao debe ser del cinco por ciento (5%) del valor total del contrato y su vigencia debe ser el plazo del contrato y tres (3) anos mas, segun el Decreto 1082 de 2015, articulo 2.2.1.2.3.1.2.",
    topic: "Garantia laboral - Valor y vigencia"
  },
  {
    id: 36,
    question: "Situacion\n\nEl contratista y el supervisor del municipio de Sonson firmaron el contrato de construccion del nuevo mercado municipal. Ahora deben formalizar el comienzo de la ejecucion y dejar constancia de las condiciones iniciales.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe contener el acta de inicio de un contrato de obra?",
    options: [
      "Solo la fecha de firma del contrato",
      "La fecha de inicio de ejecucion, designacion del supervisor o interventor, forma de pago acordada y obligaciones especificas del contratista",
      "Unicamente la identificacion de las partes",
      "No es obligatoria el acta de inicio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el acta de inicio del mercado de Sonson debe indicar la fecha de inicio de ejecucion, designacion del supervisor o interventor, forma de pago acordada, obligaciones especificas del contratista, cronograma de ejecucion y demas aspectos necesarios para la correcta ejecucion del contrato.",
    topic: "Acta de inicio"
  },
  {
    id: 37,
    question: "Situacion\n\nDurante la construccion del centro cultural de Amalfi, se identifico la necesidad de incluir obras adicionales no previstas inicialmente que incrementan el valor del contrato en un 25%.\n\nPregunta\n\nCon base en la situacion descrita, ¿que se requiere para realizar modificaciones al valor o al plazo durante la ejecucion del contrato?",
    options: [
      "Solo el acuerdo verbal entre las partes",
      "Modificacion mediante otrosi o adicion contractual, con justificacion tecnica, legal o financiera, y disponibilidad presupuestal previa",
      "Unicamente la aprobacion del contratista",
      "No es posible modificar contratos estatales una vez firmados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la adicion del 25% para las obras adicionales del centro cultural de Amalfi requiere modificacion contractual mediante otrosi, con justificacion tecnica documentada, disponibilidad presupuestal previa, y cumplimiento de los limites legales establecidos.",
    topic: "Modificaciones contractuales"
  },
  {
    id: 38,
    question: "Situacion\n\nEl contratista de la obra de alcantarillado de Angostura solicita una adicion presupuestal equivalente al 60% del valor inicial del contrato alegando mayores cantidades de obra. El equipo juridico debe verificar si es procedente.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es el limite legal para adicionar el valor de un contrato de obra?",
    options: [
      "Ilimitado, segun las necesidades de la obra",
      "Hasta el cincuenta por ciento (50%) del valor inicialmente pactado, expresado en el mismo",
      "Maximo el 30% del valor inicial",
      "No existe limite para contratos de obra publica"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la solicitud del contratista de Angostura del 60% excede el limite legal. El articulo 40 de la Ley 80 establece que los contratos pueden adicionarse hasta en un cincuenta por ciento (50%) de su valor inicial. La adicion solicitada no es procedente por superar este tope.",
    topic: "Limite de adiciones"
  },
  {
    id: 39,
    question: "Situacion\n\nEl contratista de la construccion del acueducto de Arboletes solicita autorizar la cesion del contrato a otra empresa porque enfrenta dificultades financieras que le impiden continuar con la ejecucion.\n\nPregunta\n\nCon base en la situacion descrita, ¿que se requiere para la cesion de un contrato estatal a un tercero?",
    options: [
      "Solo la voluntad del contratista cedente",
      "Autorizacion previa y expresa de la entidad, verificando que el cesionario cumple con los requisitos de capacidad, experiencia e idoneidad del cedente",
      "Unicamente notificar a la entidad despues de realizada",
      "No es posible ceder contratos estatales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la cesion del contrato de Arboletes requiere autorizacion previa y expresa de la entidad, quien debe verificar que el cesionario cumple con los requisitos habilitantes de capacidad, experiencia e idoneidad que tenia el contratista cedente al momento de contratar, segun el articulo 41 de la Ley 80.",
    topic: "Cesion de contratos"
  },
  {
    id: 40,
    question: "Situacion\n\nEl contrato de construccion del polideportivo de Betania finalizo hace dos meses y las partes no han logrado ponerse de acuerdo sobre el balance final debido a diferencias en la medicion de cantidades de obra ejecutadas.\n\nPregunta\n\nCon base en la situacion descrita, ¿como y cuando debe realizarse la liquidacion del contrato de obra?",
    options: [
      "Solo cuando existe acuerdo entre las partes, sin limite de tiempo",
      "De comun acuerdo dentro de los cuatro (4) meses siguientes a su terminacion, vencimiento o expedicion del acto que ordene la terminacion, o unilateralmente si no hay acuerdo",
      "Unicamente de manera unilateral por la entidad",
      "No es obligatorio liquidar contratos de obra publica"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el articulo 60 de la Ley 80 establece que la liquidacion del polideportivo de Betania debe realizarse de comun acuerdo dentro de los cuatro (4) meses siguientes a la terminacion. Como ya pasaron dos meses sin acuerdo, la entidad aun tiene tiempo para intentar el acuerdo o, en su defecto, liquidar unilateralmente dentro de los dos (2) meses siguientes.",
    topic: "Liquidacion de contratos"
  }
]

const questionsV2: Question[] = [
  {
    id: 1,
    question: "Situacion\n\nLa Empresa de Desarrollo Urbano de Medellin esta estructurando un megaproyecto de renovacion del centro de la ciudad. El director juridico debe asegurar que todos los procesos se fundamenten en los principios constitucionales aplicables.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son los principios constitucionales que fundamentan la contratacion estatal segun la Ley 80?",
    options: [
      "Solo transparencia y economia",
      "Transparencia, economia, responsabilidad y seleccion objetiva, garantizando legalidad, igualdad, debido proceso, buena fe, imparcialidad, eficacia, moralidad, celeridad y publicidad",
      "Unicamente eficiencia y eficacia",
      "Solo legalidad y moralidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Empresa de Desarrollo Urbano debe fundamentar su megaproyecto en los principios de transparencia, economia, responsabilidad y seleccion objetiva segun la Ley 80. Estos a su vez garantizan legalidad, igualdad, debido proceso, buena fe, imparcialidad, eficacia, moralidad, celeridad y publicidad en todos los procesos.",
    topic: "Marco normativo y principios generales"
  },
  {
    id: 2,
    question: "Situacion\n\nEPM, como empresa de servicios publicos con regimen especial, va a contratar la construccion de una planta de tratamiento de aguas. La gerencia cuestiona si debe someterse a los mismos principios y regimenes que aplican a las entidades del regimen general.\n\nPregunta\n\nCon base en la situacion descrita, ¿a que estan obligadas las entidades con regimen contractual especial?",
    options: [
      "Observar los principios de la funcion administrativa y de la gestion fiscal y estan sometidas al regimen de inhabilidades e incompatibilidades",
      "No estan sometidas a ningun principio ni regimen de inhabilidades",
      "Solo deben cumplir principios comerciales privados",
      "Unicamente deben observar el regimen de inhabilidades pero no los principios administrativos"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, aunque EPM tiene regimen contractual especial, debe observar los principios de la funcion administrativa y de la gestion fiscal y esta sometida al regimen de inhabilidades e incompatibilidades. Esto aplica para todos los contratos que celebre, incluyendo la planta de tratamiento.",
    topic: "Marco normativo - Regimen especial"
  },
  {
    id: 3,
    question: "Situacion\n\nEn el proceso de licitacion para el Metroplus de Envigado, varios proponentes presentaron observaciones al informe de evaluacion y solicitan que se realice una audiencia publica para conocer las razones de las calificaciones asignadas.\n\nPregunta\n\nCon base en la situacion descrita, ¿que exige el principio de transparencia respecto al conocimiento y contradiccion de las decisiones?",
    options: [
      "Solo conocer las decisiones finales",
      "Conocer y controvertir informes, conceptos y decisiones, por ejemplo, a traves de audiencias publicas de adjudicacion",
      "Unicamente consultar documentos despues de la adjudicacion",
      "Solo acceder a informacion basica sin posibilidad de controvertir"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el principio de transparencia aplicable al Metroplus de Envigado exige permitir a los proponentes conocer y controvertir informes, conceptos y decisiones; por ejemplo, a traves de audiencias publicas de adjudicacion y del acceso a las actuaciones y propuestas, como solicitan los participantes.",
    topic: "Principio de transparencia"
  },
  {
    id: 4,
    question: "Situacion\n\nLa Alcaldia de La Ceja quiere abrir urgentemente un proceso de licitacion para la construccion de un puente, pero aun no cuenta con la aprobacion del Concejo para la vigencia futura ni ha terminado los estudios de suelos.\n\nPregunta\n\nSegun el principio de economia y el deber de planeacion, ¿en que casos la entidad NO puede iniciar procesos de contratacion?",
    options: [
      "Tiene todos los recursos y autorizaciones disponibles",
      "No dispone de recursos o autorizaciones y no ha elaborado los estudios previos, disenos y pliegos antes de abrir la convocatoria",
      "Ya cuenta con estudios previos completos",
      "Tiene disponibilidad presupuestal aprobada"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Alcaldia de La Ceja no puede iniciar el proceso porque, en cumplimiento del deber de planeacion y de la buena fe precontractual, la entidad no puede abrir procesos si no dispone de recursos o autorizaciones (como la vigencia futura) y debe elaborar los estudios previos (como los de suelos), disenos y pliegos antes de abrir la convocatoria.",
    topic: "Principio de economia - Planeacion"
  },
  {
    id: 5,
    question: "Situacion\n\nEl secretario de obras publicas de Marinilla firmo varios contratos de obra durante su gestion pero nunca realizo seguimiento a su ejecucion ni protegio los intereses de la entidad cuando hubo incumplimientos.\n\nPregunta\n\nSegun el articulo 26 de la Ley 80, ¿cuales son las obligaciones de los servidores publicos que intervienen en la contratacion?",
    options: [
      "Solo adjudicar contratos sin responsabilidades posteriores",
      "Cumplir los fines de la contratacion, vigilar la correcta ejecucion y proteger los derechos de la entidad y del contratista",
      "Unicamente firmar contratos sin seguimiento",
      "Solo revisar documentacion inicial sin vigilancia posterior"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el secretario de Marinilla incumplio sus obligaciones porque el articulo 26 de la Ley 80 establece que los servidores publicos que intervienen en la contratacion deben cumplir los fines de la contratacion, vigilar la correcta ejecucion y proteger los derechos de la entidad y del contratista durante toda la vida del contrato.",
    topic: "Principio de responsabilidad"
  },
  {
    id: 6,
    question: "Situacion\n\nEl comite evaluador de la Secretaria de Educacion de Antioquia recibio tres propuestas para el suministro de mobiliario escolar. Deben determinar cual es la oferta mas favorable usando metodologias objetivas de comparacion.\n\nPregunta\n\nCon base en la situacion descrita, ¿como debe garantizar la administracion la seleccion objetiva?",
    options: [
      "Basarse en preferencias personales del evaluador",
      "Comparar las ofertas mediante el cotejo de propuestas, la consulta de precios del mercado y los estudios propios o de asesores",
      "Solo revisar el precio sin analisis tecnico",
      "Adjudicar sin necesidad de comparacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el comite evaluador de la Secretaria de Educacion debe comparar las tres ofertas de mobiliario mediante el cotejo de propuestas, la consulta de precios del mercado y los estudios propios o de asesores, para garantizar que la seleccion sea objetiva y se escoja la oferta mas favorable.",
    topic: "Principio de seleccion objetiva"
  },
  {
    id: 7,
    question: "Situacion\n\nEl Instituto para el Desarrollo de Antioquia (IDEA) esta elaborando su Plan Anual de Adquisiciones para la vigencia 2025 y debe asegurar que contenga toda la informacion requerida para su publicacion en el SECOP.\n\nPregunta\n\nCon base en la situacion descrita, ¿que debe contener el Plan Anual de Adquisiciones?",
    options: [
      "Solo una lista de bienes a comprar",
      "Declaracion estrategica con informacion general de la entidad, datos de contacto, valor total del PAA, limites de contratacion y fecha de actualizacion, ademas de bienes, obras y servicios identificados",
      "Unicamente el presupuesto total anual",
      "Solo los proveedores preseleccionados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el PAA del IDEA debe contener una declaracion estrategica con informacion general de la entidad, datos de contacto, valor total del PAA, limites de contratacion de menor y minima cuantia y fecha de actualizacion. Tambien debe detallar los bienes, obras o servicios identificados y necesidades para las cuales se desconoce el producto exacto.",
    topic: "Planeacion - Contenido del PAA"
  },
  {
    id: 8,
    question: "Situacion\n\nLa personeria de Guatape necesita contratar el arrendamiento de una fotocopiadora por valor de 15 SMMLV, que corresponde a la minima cuantia de la entidad. El asesor juridico debe elaborar los estudios previos simplificados.\n\nPregunta\n\nCon base en la situacion descrita, ¿que deben incluir los estudios previos para contratos de minima cuantia?",
    options: [
      "Descripcion sucinta de la necesidad, objeto identificado con el Clasificador, condiciones tecnicas, valor estimado y justificacion, plazo de ejecucion y certificado de disponibilidad presupuestal",
      "Solo el valor del contrato",
      "Unicamente el objeto contractual sin analisis economico",
      "Solo la disponibilidad presupuestal"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, los estudios previos de la Personeria de Guatape para la minima cuantia deben incluir una descripcion sucinta de la necesidad, el objeto identificado con el Clasificador de Bienes y Servicios, las condiciones tecnicas de la fotocopiadora, el valor estimado y su justificacion, el plazo de ejecucion y el certificado de disponibilidad presupuestal.",
    topic: "Planeacion - Estudios previos de minima cuantia"
  },
  {
    id: 9,
    question: "Situacion\n\nLa Secretaria de Salud de Medellin va a contratar servicios de ambulancias. El equipo de contratacion debe realizar un estudio del sector que analice todas las variables economicas relevantes del mercado de transporte asistencial.\n\nPregunta\n\nCon base en la situacion descrita, ¿que aspectos economicos del sector deben analizar los estudios de mercado?",
    options: [
      "Solo precios actuales de productos",
      "Productos, agentes, gremios, cifras de ventas, perspectivas de crecimiento, variables economicas, cadenas de produccion, materias primas y dinamica de comercio exterior",
      "Unicamente la competencia local",
      "Solo la inflacion del sector"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el estudio de mercado para los servicios de ambulancias debe analizar aspectos economicos del sector: productos (tipos de ambulancias), agentes (empresas prestadoras), gremios, cifras de ventas, perspectivas de crecimiento, variables economicas (combustibles, seguros), cadenas de produccion, materias primas y dinamica de comercio exterior.",
    topic: "Planeacion - Estudios de mercado"
  },
  {
    id: 10,
    question: "Situacion\n\nEl municipio de Don Matias publico el proyecto de pliego de condiciones para un contrato de obra. Varios proponentes presentaron observaciones y solicitan que se programe una audiencia para resolver dudas tecnicas complejas.\n\nPregunta\n\nCon base en la situacion descrita, ¿que deben incluir los pliegos en la etapa precontractual?",
    options: [
      "Solo requisitos minimos sin aclaraciones",
      "Reglas justas y claras, plazos razonables, respuestas motivadas a las observaciones, visitas voluntarias al sitio (no obligatorias) y audiencias de aclaracion cuando el objeto lo requiera",
      "Unicamente requisitos tecnicos sin plazos",
      "Solo criterios de evaluacion sin oportunidad de observaciones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, los pliegos del municipio de Don Matias deben incluir reglas justas y claras, plazos razonables, respuestas motivadas a las observaciones presentadas, visitas voluntarias al sitio (no obligatorias) y audiencias de aclaracion cuando el objeto lo requiera, como solicitan los proponentes para las dudas tecnicas.",
    topic: "Etapa precontractual - Pliegos"
  },
  {
    id: 11,
    question: "Situacion\n\nEl contrato de mantenimiento vial de Fredonia termino su ejecucion pero las partes tienen diferencias sobre el reconocimiento de obras adicionales no previstas en el contrato original. Deben establecer un balance final.\n\nPregunta\n\nSegun el Consejo de Estado, ¿que se debe establecer en la liquidacion del contrato?",
    options: [
      "Solo el pago final al contratista",
      "El estado de las obligaciones ejecutadas, los ajustes y reconocimientos que correspondan, las garantias inherentes al objeto contractual y, excepcionalmente, los acuerdos o conciliaciones para poner fin a divergencias",
      "Unicamente las multas aplicadas",
      "Solo la fecha de terminacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, segun el Consejo de Estado, la liquidacion del contrato de Fredonia debe establecer el estado de las obligaciones ejecutadas, los ajustes y reconocimientos que correspondan por las obras adicionales, las garantias inherentes al objeto contractual y, excepcionalmente, los acuerdos o conciliaciones para poner fin a las divergencias.",
    topic: "Etapa post-contractual - Liquidacion"
  },
  {
    id: 12,
    question: "Situacion\n\nEl contrato de suministro de alimentos escolares en Granada termino hace tres meses y las partes no han logrado acordar el balance final. La entidad debe determinar si aun esta dentro del plazo para liquidar.\n\nPregunta\n\nCon base en la situacion descrita, si no se pacta termino para la liquidacion, ¿dentro de que plazo debe realizarse?",
    options: [
      "Dentro de los seis meses siguientes",
      "Dentro de los cuatro meses siguientes al vencimiento del plazo o de la terminacion del contrato",
      "Dentro del ano siguiente",
      "No tiene plazo definido"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, si no se pacto termino, la liquidacion del contrato de Granada debe realizarse dentro de los cuatro meses siguientes al vencimiento del plazo o terminacion. Como ya pasaron tres meses, la entidad aun tiene un mes para la liquidacion bilateral o, en su defecto, hasta dos anos para liquidacion unilateral.",
    topic: "Liquidacion - Terminos"
  },
  {
    id: 13,
    question: "Situacion\n\nLa Gobernacion de Antioquia necesita adquirir 500 computadores portatiles con especificaciones estandar del mercado. El equipo de contratacion debe definir la modalidad de seleccion mas eficiente para este tipo de bienes.\n\nPregunta\n\nCon base en la situacion descrita, ¿para que se utiliza la seleccion abreviada?",
    options: [
      "Solo contratos de alto valor",
      "Adquisicion de bienes y servicios de caracteristicas uniformes mediante subasta inversa o acuerdos marco, bolsas de productos, servicios de salud, licitacion desierta, entre otros casos especificos",
      "Unicamente servicios de consultoria",
      "Solo contratos de urgencia manifiesta"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Gobernacion puede usar seleccion abreviada porque los computadores son bienes de caracteristicas tecnicas uniformes. Esta modalidad se usa para: adquisicion mediante subasta inversa o acuerdos marco de precios; adquisicion a traves de bolsas de productos; servicios de salud; derivada de licitacion desierta; entre otros.",
    topic: "Modalidades de seleccion - Seleccion abreviada"
  },
  {
    id: 14,
    question: "Situacion\n\nEl municipio de Jardin abrio un proceso de menor cuantia para construir andenes peatonales y recibio doce manifestaciones de interes de diferentes proponentes. El comite debe decidir como continuar con el proceso.\n\nPregunta\n\nEn la contratacion de menor cuantia, si la entidad recibe mas de diez manifestaciones de interes, ¿que puede hacer?",
    options: [
      "Debe rechazar todas y reiniciar el proceso",
      "Puede continuar con todos o realizar un sorteo para seleccionar maximo diez interesados",
      "Debe continuar obligatoriamente con todos",
      "Debe cancelar el proceso"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, con doce manifestaciones de interes, el municipio de Jardin puede continuar el proceso con todos los interesados o realizar un sorteo para seleccionar maximo diez de ellos. Esta decision debe tomarse considerando la eficiencia del proceso y garantizando la igualdad de oportunidades.",
    topic: "Menor cuantia - Procedimiento"
  },
  {
    id: 15,
    question: "Situacion\n\nLa Secretaria de Cultura de Jerico necesita contratar servicios de imprenta para la publicacion de un libro conmemorativo por valor de 8 SMMLV, que corresponde al 8% de la menor cuantia de la entidad.\n\nPregunta\n\nCon base en la situacion descrita, ¿que son los contratos de minima cuantia?",
    options: [
      "No excede el 10% de la menor cuantia de la entidad",
      "Supera la menor cuantia de la entidad",
      "Es igual a la menor cuantia",
      "No tiene limite establecido"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el contrato de la Secretaria de Cultura de Jerico es de minima cuantia porque su valor (8% de la menor cuantia) no excede el 10% de la menor cuantia de la entidad. Para este tipo de contratos, la invitacion se publica al menos por un dia habil, no se exige inscripcion en el RUP ni garantias.",
    topic: "Minima cuantia"
  },
  {
    id: 16,
    question: "Situacion\n\nEl Instituto de Cultura y Patrimonio de Antioquia abrio un concurso de meritos para contratar la restauracion del Teatro Lido. Se encuentra en la etapa donde debe verificar la experiencia y formacion de los interesados antes de recibir propuestas.\n\nPregunta\n\nCon base en la situacion descrita, ¿en que consiste el proceso de precalificacion en el concurso de meritos?",
    options: [
      "Se evalua directamente la propuesta economica",
      "Los interesados acreditan experiencia, formacion y capacidad; la entidad publica el informe de precalificacion y los interesados pueden hacer observaciones",
      "Solo se verifica la capacidad financiera",
      "No se requiere ningun tipo de acreditacion previa"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Instituto esta en el proceso de precalificacion donde los interesados en la restauracion del Teatro Lido acreditan experiencia, formacion y capacidad. La entidad publicara el informe de precalificacion y los interesados pueden hacer observaciones. Tras la precalificacion se evaluaran las propuestas tecnicas y economicas.",
    topic: "Concurso de meritos - Precalificacion"
  },
  {
    id: 17,
    question: "Situacion\n\nLa Contraloria General de Antioquia necesita contratar un abogado especializado en derecho administrativo para apoyar procesos de responsabilidad fiscal complejos. El contrato seria por prestacion de servicios profesionales.\n\nPregunta\n\nCon base en la situacion descrita, ¿como se caracterizan los servicios profesionales en contratacion directa?",
    options: [
      "Generan relacion laboral con la entidad",
      "Se contratan a personas naturales para labores relacionadas con funciones de la entidad y su vinculacion no genera relacion laboral",
      "Solo pueden ser contratados por empresas",
      "Requieren licitacion publica obligatoriamente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Contraloria puede contratar al abogado mediante contratacion directa de servicios profesionales. Se contrata a personas naturales para labores relacionadas con funciones de la entidad (procesos de responsabilidad fiscal) y su vinculacion no genera relacion laboral con la Contraloria.",
    topic: "Contratacion directa - Servicios profesionales"
  },
  {
    id: 18,
    question: "Situacion\n\nEl municipio de Liborina va a contratar la construccion de un parque infantil por valor de USD 80.000 y recibio solicitud de dos Mipymes locales con mas de un ano de existencia pidiendo que se limite la convocatoria a este tipo de empresas.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuando puede limitarse la convocatoria a Mipymes?",
    options: [
      "El valor del proceso es inferior a USD 125,000 y se reciban solicitudes de al menos dos Mipymes con al menos un ano de existencia",
      "En cualquier proceso sin restriccion de valor",
      "Solo en contratos de minima cuantia",
      "Nunca puede limitarse a Mipymes"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el municipio de Liborina puede limitar la convocatoria a Mipymes porque el valor (USD 80.000) es inferior a USD 125.000 y recibio solicitudes de al menos dos Mipymes nacionales con al menos un ano de existencia, conforme al Decreto 1082 de 2015.",
    topic: "Convocatoria limitada a Mipymes"
  },
  {
    id: 19,
    question: "Situacion\n\nUn funcionario de carrera de la Alcaldia de Penol quiere presentar propuesta para un contrato de consultoria que esta adelantando la misma entidad donde trabaja. El comite de contratacion debe verificar si puede participar.\n\nPregunta\n\nCon base en la situacion descrita, ¿a que se refieren las incompatibilidades en la contratacion estatal?",
    options: [
      "Restricciones permanentes para contratar con cualquier entidad del Estado",
      "La imposibilidad de contratar con una entidad especifica porque el contratista mantiene una relacion con ella",
      "Inhabilidades por condenas penales",
      "Requisitos de experiencia no cumplidos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, existe una incompatibilidad porque el funcionario de Penol mantiene una relacion laboral con la entidad que adelanta el proceso. Las incompatibilidades se refieren a la imposibilidad de contratar con una entidad especifica cuando existe una relacion con ella. Los servidores publicos no pueden simultaneamente ser contratistas de su propia entidad.",
    topic: "Regimen de incompatibilidades"
  },
  {
    id: 20,
    question: "Situacion\n\nDurante la verificacion de requisitos habilitantes de un proceso de licitacion en Puerto Berrio, se descubrio que uno de los proponentes presento certificaciones de experiencia falsificadas para acreditar contratos que nunca ejecuto.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son las consecuencias de presentar informacion falsa durante la contratacion?",
    options: [
      "No tiene consecuencias si el contrato se ejecuta bien",
      "Genera inhabilidad segun el articulo 5 de la Ley 190 de 1995 y se considera falta gravisima",
      "Solo genera una amonestacion administrativa",
      "Es permitido si mejora las posibilidades de adjudicacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el proponente que presento certificaciones falsificadas genera inhabilidad (articulo 5 Ley 190 de 1995) y se considera falta gravisima. Ademas, si llegara a adjudicarse y celebrarse el contrato, los funcionarios que intervengan conociendo la inhabilidad tambien incurren en falta gravisima.",
    topic: "Inhabilidades - Informacion falsa"
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
    // Reiniciar el estado cuando se cambia de version
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
          Esta prueba contiene {questions.length} preguntas sobre Contratacion Estatal.
          Total de puntos disponibles: {questions.reduce((sum, q) => sum + q.points, 0)} puntos.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selecciona la version de la prueba</CardTitle>
          <CardDescription>
            Ambas versiones contienen 20 preguntas diferentes basadas en el mismo contenido
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedVersion} onValueChange={handleVersionChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="v1" disabled={showResults}>
                Version 1
              </TabsTrigger>
              <TabsTrigger value="v2" disabled={showResults}>
                Version 2
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {showResults && (
            <p className="text-sm text-muted-foreground mt-3">
              Reinicia la prueba para cambiar de version
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
                  {answers[question.id] === question.correctAnswer ? "¡Correcto!" : "Respuesta incorrecta"}
                </AlertTitle>
                <AlertDescription className="mt-2 space-y-2">
                  <p><strong>Explicacion:</strong> {question.explanation}</p>
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
              {showFeedback ? "Ocultar" : "Mostrar"} Retroalimentacion
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
