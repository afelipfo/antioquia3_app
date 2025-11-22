"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, InfoIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export const normatividadQuestions: Question[] = [
  {
    id: 1,
    question: "Situacion\n\nEn la Alcaldia Municipal de Rionegro, el equipo juridico revisa las normas que rigen las entidades territoriales antes de expedir nuevos actos administrativos. Un pasante pregunta por la definicion del derecho administrativo segun la doctrina colombiana.\n\nPregunta\n\nCon base en la situacion descrita, segun Libardo Rodriguez, el derecho administrativo es:",
    options: [
      "Una rama del derecho privado que regula los contratos entre particulares",
      "Una rama del derecho publico que regula la organizacion, actividad y control de la administracion publica y la relacion Estado-ciudadano por fuera del ambito contractual o penal",
      "Un conjunto de normas penales aplicables a los servidores publicos",
      "Una disciplina economica encargada de distribuir los recursos estatales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el pasante debe entender que Libardo Rodriguez define el derecho administrativo como una rama del derecho publico que regula organizacion, actividad y control de la administracion publica y la relacion Estado-ciudadano fuera del ambito contractual o penal.",
    topic: "Concepto del derecho administrativo"
  },
  {
    id: 2,
    question: "Situacion\n\nDurante una capacitacion en la Gobernacion de Antioquia, un funcionario de carrera administrativa explica a los nuevos contratistas las funciones basicas del derecho administrativo en el contexto de las entidades territoriales.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual de las siguientes es una funcion del derecho administrativo?",
    options: [
      "Regular la relacion entre administrados y la administracion",
      "Definir la politica monetaria del pais",
      "Celebrar tratados internacionales",
      "Legislar en materia penal"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el funcionario debe explicar que entre las funciones del derecho administrativo esta regular la relacion entre la administracion y los administrados, ademas de organizar internamente la administracion y poner limites al ejercicio del poder.",
    topic: "Funciones del derecho administrativo"
  },
  {
    id: 3,
    question: "Situacion\n\nEn la oficina de atencion al ciudadano del municipio de Envigado, se presenta una queja porque un funcionario atendio primero a un conocido personal en lugar de respetar el orden de llegada. El jefe de la dependencia debe resolver la situacion aplicando los principios constitucionales.\n\nPregunta\n\nCon base en la situacion descrita, el principio de igualdad exige que las autoridades:",
    options: [
      "Favorezcan a grupos especificos para acelerar los tramites",
      "Seleccionen discrecionalmente a los usuarios que deben atender",
      "Traten de forma rigurosamente imparcial a todos los administrados sin favorecer a individuos ni grupos",
      "Otorguen beneficios automaticos a quienes presenten mayores recursos"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el jefe de dependencia debe recordar que el principio de igualdad obliga a las autoridades a tratar de forma imparcial a todos los administrados, evitando favoritismos o discriminaciones como la que se presento.",
    topic: "Principios del articulo 209 - Igualdad"
  },
  {
    id: 4,
    question: "Situacion\n\nUn servidor publico de la Secretaria de Hacienda del departamento de Antioquia recibe una oferta de un contratista para agilizar un tramite a cambio de una comision. El servidor consulta con su superior sobre como debe actuar conforme a los principios de la funcion administrativa.\n\nPregunta\n\nCon base en la situacion descrita, el principio de moralidad implica que los servidores publicos deben:",
    options: [
      "Actuar con honestidad y desinteres, respetando incompatibilidades y prohibiciones",
      "Priorizar decisiones que favorezcan a sus superiores jerarquicos",
      "Delegar sus funciones en particulares sin controles",
      "Tomar decisiones basadas unicamente en criterios politicos"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el servidor debe rechazar la oferta porque la moralidad exige que los servidores actuen con honestidad, desinteres y respeto por las normas que regulan sus obligaciones, incompatibilidades y prohibiciones.",
    topic: "Principios del articulo 209 - Moralidad"
  },
  {
    id: 5,
    question: "Situacion\n\nEl Concejo Municipal de Medellin debate un proyecto de acuerdo que beneficiaria a un grupo empresarial especifico pero afectaria negativamente a la mayoria de los ciudadanos. Un concejal argumenta que debe prevalecer el interes de la comunidad.\n\nPregunta\n\nCon base en la situacion descrita, la primacia del interes general significa que:",
    options: [
      "Los intereses individuales prevalecen sobre las decisiones administrativas",
      "Cualquier particular puede suspender un acto administrativo",
      "Las actuaciones administrativas deben orientarse al bienestar comun, privilegiando el interes colectivo sobre los individuales",
      "El interes general se determina por votacion de los administrados"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el concejal tiene razon porque el principio de primacia del interes general establece que la actividad administrativa debe buscar el bienestar comun, la supremacia del interes colectivo y la consecucion del bien comun.",
    topic: "Principios del articulo 209 - Interes general"
  },
  {
    id: 6,
    question: "Situacion\n\nEl secretario de planeacion de un municipio de Antioquia recibe instrucciones verbales de su superior para expedir un permiso sin cumplir todos los requisitos legales. El funcionario duda sobre como proceder conforme al ordenamiento juridico.\n\nPregunta\n\nCon base en la situacion descrita, el principio de legalidad impone que la administracion:",
    options: [
      "Actue unicamente de acuerdo con las ordenes verbales del superior",
      "Ejerza sus funciones al margen de la Constitucion",
      "Se cina al ordenamiento juridico jerarquizado y responda por infracciones, extralimitaciones u omisiones",
      "Actue sin controles para garantizar eficiencia"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el secretario debe negarse a la instruccion ilegal porque el principio de legalidad obliga a que la actividad administrativa se ajuste a la Constitucion y la ley, haciendo responsables a los funcionarios por infracciones o extralimitaciones.",
    topic: "Principios del articulo 209 - Legalidad"
  },
  {
    id: 7,
    question: "Situacion\n\nEn la Alcaldia de Itagui, un ciudadano se queja porque su solicitud de licencia de construccion lleva seis meses en tramite debido a multiples requisitos adicionales que le han exigido. El alcalde ordena revisar el procedimiento aplicando los principios de la funcion administrativa.\n\nPregunta\n\nCon base en la situacion descrita, el principio de eficacia y economia exige que los procedimientos:",
    options: [
      "Se prolonguen para asegurar un mayor numero de controles",
      "Eviten decisiones inhibitorias y logren su finalidad con el menor tiempo, tramites y gastos posibles",
      "Incluyan etapas adicionales aunque no sean necesarias",
      "Exijan toda la documentacion disponible sin excepcion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el alcalde debe corregir el procedimiento porque la eficacia y economia implican que los procedimientos deben alcanzar su finalidad con celeridad, evitando tramites innecesarios, decisiones inhibitorias y gastos injustificados.",
    topic: "Principios del articulo 209 - Eficacia y economia"
  },
  {
    id: 8,
    question: "Situacion\n\nLa oficina de catastro municipal recibe diariamente cientos de solicitudes de certificados. El jefe de la dependencia implementa un sistema de formularios estandarizados y elimina requisitos redundantes para agilizar la atencion sin descuidar la calidad del servicio.\n\nPregunta\n\nCon base en la situacion descrita, el principio de celeridad se refleja en:",
    options: [
      "Detener los procedimientos hasta analizar nuevos requisitos",
      "Impulsar oficiosamente los tramites, eliminar formalidades innecesarias y usar formularios para actuaciones en serie sin descuidar las pruebas",
      "Impedir que los administrados aporten pruebas extemporaneas",
      "Conceder terminos indefinidos para responder"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la medida implementada por el jefe de dependencia es correcta porque la celeridad implica el impulso oficioso del procedimiento, la supresion de tramites innecesarios y el uso de formularios sin sacrificar el analisis completo de los argumentos.",
    topic: "Principios del articulo 209 - Celeridad"
  },
  {
    id: 9,
    question: "Situacion\n\nEn la ventanilla de la Secretaria de Gobierno departamental, un ciudadano denuncia que un funcionario resolvio primero la solicitud de un politico local que llego despues que el. El secretario debe aplicar correctamente los principios de la funcion administrativa.\n\nPregunta\n\nCon base en la situacion descrita, el principio de imparcialidad obliga a la administracion a:",
    options: [
      "Priorizar a quienes tengan preferencia politica",
      "Garantizar los derechos de todas las personas sin discriminacion, respetando el orden de actuacion",
      "Resolver primero las solicitudes de mayor cuantia",
      "Atender exclusivamente a los ciudadanos de la capital"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el funcionario violo el principio de imparcialidad que implica asegurar los derechos de todas las personas sin discriminacion y dar identico tratamiento a quienes actuan, respetando el orden de llegada.",
    topic: "Principios del articulo 209 - Imparcialidad"
  },
  {
    id: 10,
    question: "Situacion\n\nLa alcaldia municipal expidio una resolucion que afecta los derechos de varios comerciantes del sector, pero no la publico ni notifico a los interesados. Los comerciantes se enteraron por comentarios de terceros y acuden a reclamar.\n\nPregunta\n\nCon base en la situacion descrita, el principio de publicidad obliga a las autoridades a:",
    options: [
      "Reservar toda la informacion contractual",
      "Comunicar, notificar o publicar sus decisiones conforme lo ordene la ley para garantizar su conocimiento",
      "Publicar unicamente los actos favorables",
      "Informar decisiones solo al superior jerarquico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la alcaldia incumplio el principio de publicidad que exige dar a conocer las decisiones administrativas mediante comunicaciones, notificaciones o publicaciones que ordene la ley.",
    topic: "Principios del articulo 209 - Publicidad"
  },
  {
    id: 11,
    question: "Situacion\n\nEn la Secretaria de Educacion departamental, un funcionario nuevo consulta si puede compartir sus funciones con otra dependencia o si debe esperar autorizacion judicial para ejercer su competencia. Su jefe le explica el alcance de la competencia administrativa.\n\nPregunta\n\nCon base en la situacion descrita, segun el articulo 5 de la Ley 489 de 1998, la competencia administrativa debe ejercerse:",
    options: [
      "De forma compartida con cualquier otra entidad",
      "Solo cuando medie autorizacion judicial",
      "Con exclusividad, de manera directa e inmediata sobre los asuntos asignados expresamente",
      "Por delegacion automatica en cualquier servidor"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el jefe debe explicar que la norma establece que los organismos y entidades ejercen sus competencias de manera directa, inmediata y exclusiva respecto de los asuntos asignados expresamente por la ley o reglamento.",
    topic: "Actuacion administrativa - Competencia"
  },
  {
    id: 12,
    question: "Situacion\n\nDos secretarias de la Gobernacion de Antioquia trabajan en proyectos similares pero no comparten informacion, lo que genera duplicidad de esfuerzos y contradicciones en las politicas publicas. El gobernador convoca una reunion para resolver el problema.\n\nPregunta\n\nCon base en la situacion descrita, el principio de coordinacion del articulo 6 de la Ley 489 de 1998 exige que las autoridades:",
    options: [
      "Actuen de forma aislada y autonoma frente a otras entidades",
      "Eviten compartir informacion para proteger la discrecionalidad",
      "Garanticen armonia, colaboren y no obstaculicen el cumplimiento de funciones de otras entidades",
      "Trasladen sus responsabilidades a particulares"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el gobernador debe recordar que el principio de coordinacion ordena a las autoridades colaborar y armonizar sus actuaciones, absteniendose de impedir o entorpecer las funciones de otras entidades.",
    topic: "Actuacion administrativa - Coordinacion"
  },
  {
    id: 13,
    question: "Situacion\n\nEl Ministerio del Interior asigna mediante decreto a sus direcciones regionales la funcion de expedir pasaportes, sin crear nuevas entidades ni otorgarles personeria juridica propia. Un ciudadano pregunta que tipo de organizacion administrativa es esta.\n\nPregunta\n\nCon base en la situacion descrita, una caracteristica de la desconcentracion es que:",
    options: [
      "Se otorga mediante acto administrativo particular del titular",
      "Transfiere competencias a organos subordinados sin personeria juridica ni presupuesto propio mediante normas legales o reglamentarias",
      "Genera nuevas personas juridicas autonomas",
      "El superior jerarquico puede reasumir la competencia en cualquier momento sin norma que lo autorice"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, se trata de desconcentracion porque esta figura transfiere competencias a organos inferiores dentro de la misma entidad, sin crear nuevas personas juridicas, y se establece por ley o decreto.",
    topic: "Organizacion administrativa - Desconcentracion"
  },
  {
    id: 14,
    question: "Situacion\n\nEl alcalde de Bello decide mediante resolucion delegar en el secretario de gobierno la funcion de firmar contratos menores. Posteriormente, el alcalde considera revocar esa delegacion porque necesita retomar el control directo de la contratacion.\n\nPregunta\n\nCon base en la situacion descrita, un elemento constitutivo de la delegacion es:",
    options: [
      "La creacion de una entidad con autonomia presupuestal",
      "La transferencia de funciones mediante acto administrativo expedido por el titular, con autorizacion legal y posibilidad de reasumir la competencia",
      "La asignacion automatica por la Constitucion sin necesidad de acto",
      "La imposibilidad de revocar la decision una vez delegada"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el alcalde puede revocar la delegacion porque esta supone que el organo titular transfiere funciones mediante acto administrativo, requiere autorizacion legal y puede ser revocada por el delegante.",
    topic: "Organizacion administrativa - Delegacion"
  },
  {
    id: 15,
    question: "Situacion\n\nEn un seminario de derecho administrativo, un estudiante pregunta cual es la diferencia fundamental entre la desconcentracion (que se hace por decreto) y la delegacion (que hace el alcalde por resolucion). El profesor explica los criterios distintivos.\n\nPregunta\n\nCon base en la situacion descrita, la diferencia fundamental entre desconcentracion y delegacion es que:",
    options: [
      "La desconcentracion se otorga por acto administrativo particular y la delegacion por ley",
      "La desconcentracion crea nuevas personas juridicas mientras la delegacion mantiene la misma entidad",
      "La desconcentracion se establece y revoca por normas generales, mientras la delegacion se concede y revoca por actos administrativos particulares del titular",
      "La delegacion impide al superior ejercer supervision sobre el delegado"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el profesor debe explicar que la desconcentracion nace de normas generales (ley o decreto) y asigna competencias de forma permanente, mientras la delegacion se otorga y revoca mediante actos del titular.",
    topic: "Organizacion administrativa - Desconcentracion vs delegacion"
  },
  {
    id: 16,
    question: "Situacion\n\nEl Congreso aprueba una ley que crea el Instituto Departamental de Deportes como entidad con personeria juridica propia, patrimonio independiente y autonomia administrativa. La Asamblea Departamental discute las implicaciones de esta figura.\n\nPregunta\n\nCon base en la situacion descrita, una caracteristica esencial de la descentralizacion administrativa es:",
    options: [
      "La ausencia de autonomia presupuestal",
      "La creacion de una nueva persona juridico-publica con autonomia y traslado de competencias no recuperable",
      "La reasuncion automatica de competencias por parte del nivel central",
      "La inexistencia de patrimonio propio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Instituto corresponde a la descentralizacion porque esta distribuye funciones entre el nivel central y entidades autonomas con personeria juridica y autonomia presupuestal; las competencias trasladadas no se recuperan automaticamente.",
    topic: "Organizacion administrativa - Descentralizacion"
  },
  {
    id: 17,
    question: "Situacion\n\nUn estudiante de administracion publica realiza su practica en la Gobernacion de Antioquia y debe clasificar las diferentes entidades del Estado colombiano. Su tutor le pide identificar cuales hacen parte del sector descentralizado territorialmente.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual de las siguientes entidades hace parte del sector descentralizado territorialmente?",
    options: [
      "Los ministerios y departamentos administrativos",
      "Las entidades territoriales como departamentos, distritos y municipios",
      "La Presidencia de la Republica",
      "Las unidades administrativas especiales sin personeria juridica"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el estudiante debe identificar que el sector descentralizado territorial incluye entidades territoriales como departamentos, distritos y municipios, ademas de entidades administrativas especiales de orden territorial.",
    topic: "Estructura de la administracion publica"
  },
  {
    id: 18,
    question: "Situacion\n\nEn una clase de derecho constitucional, el profesor explica la estructura del Estado y menciona los diferentes tipos de organismos. Un estudiante pregunta especificamente cuales son los organos de control en Colombia.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual de los siguientes organismos se clasifica como organo de control?",
    options: [
      "Banco de la Republica",
      "Procuraduria General de la Nacion",
      "Agencias estatales especializadas",
      "Comision Nacional del Servicio Civil"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el profesor debe explicar que los organos de control incluyen la Procuraduria, la Contraloria, la Personeria y la Defensoria del Pueblo.",
    topic: "Estructura de la administracion publica - Organos de control"
  },
  {
    id: 19,
    question: "Situacion\n\nLa oficina de talento humano de un municipio antioqueno debe vincular personal para el area de mantenimiento y servicios generales. El jefe de personal consulta cual es la forma de vinculacion apropiada para trabajadores oficiales.\n\nPregunta\n\nCon base en la situacion descrita, los trabajadores oficiales se vinculan a la administracion mediante:",
    options: [
      "Eleccion popular",
      "Nombramiento en carrera administrativa",
      "Contrato laboral",
      "Acto administrativo de periodo fijo"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el jefe de personal debe saber que los trabajadores oficiales se vinculan mediante contrato laboral, a diferencia de los empleados publicos que se vinculan por nombramiento.",
    topic: "Servidores publicos - Formas de vinculacion"
  },
  {
    id: 20,
    question: "Situacion\n\nDurante una audiencia en el Tribunal Administrativo de Antioquia, un abogado cita jurisprudencia de la Corte Constitucional para definir que es un acto administrativo. El magistrado le pide precisar el concepto segun la doctrina reconocida.\n\nPregunta\n\nCon base en la situacion descrita, segun la Corte Constitucional, un acto administrativo es:",
    options: [
      "Cualquier contrato celebrado por la administracion",
      "Una declaracion de voluntad, juicio, conocimiento o deseo de la administracion en ejercicio de potestad administrativa distinta de la reglamentaria",
      "Un simple hecho material que produce efectos juridicos sin voluntad previa",
      "Una operacion destinada unicamente a ejecutar decisiones previas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el abogado debe precisar que siguiendo a Garcia de Enterria, el acto administrativo es la declaracion de voluntad, juicio, conocimiento o deseo de la administracion en ejercicio de potestad administrativa distinta de la reglamentaria.",
    topic: "Acto administrativo - Concepto"
  }
]

const questionsV2: Question[] = [
  {
    id: 1,
    question: "Situacion\n\nEn la oficina juridica de la Alcaldia de Sabaneta, un funcionario revisa diferentes actuaciones administrativas para determinar cuales pueden ser demandadas ante la jurisdiccion contencioso administrativa. Encuentra una orden de demolicion ya ejecutada.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual de las siguientes actuaciones NO constituye un acto administrativo?",
    options: [
      "Una resolucion que impone una sancion",
      "Una operacion administrativa que ejecuta una decision previa",
      "Un acto que otorga una licencia",
      "Una resolucion que declara un derecho"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la demolicion ya ejecutada es una operacion administrativa. Las operaciones administrativas son actos de ejecucion que materializan decisiones previamente adoptadas y, por si mismas, no constituyen actos administrativos.",
    topic: "Acto administrativo - Actuaciones excluidas"
  },
  {
    id: 2,
    question: "Situacion\n\nUn ciudadano presento una peticion ante la Secretaria de Movilidad hace cuatro meses solicitando un permiso especial de parqueo. No ha recibido ninguna respuesta y consulta con un abogado sobre sus opciones legales.\n\nPregunta\n\nCon base en la situacion descrita, el acto ficto o presunto se entiende configurado cuando:",
    options: [
      "La administracion resuelve favorablemente antes del vencimiento del termino",
      "La administracion guarda silencio y, por regla general, se presume la negativa a la solicitud despues de tres meses",
      "La autoridad dicta una resolucion expresa dentro del termino legal",
      "Cualquier ciudadano interpone un recurso contra un acto general"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, dado que han transcurrido mas de tres meses sin respuesta, por regla general el silencio administrativo negativo se configura si la administracion no responde en tres meses; excepcionalmente la ley puede otorgarle efectos positivos.",
    topic: "Acto administrativo - Acto ficto o presunto"
  },
  {
    id: 3,
    question: "Situacion\n\nEl inspector de policia de un municipio del oriente antioqueno sanciona a un establecimiento comercial ubicado en otro municipio, argumentando que su actuacion tiene cobertura departamental. El sancionado impugna la decision.\n\nPregunta\n\nCon base en la situacion descrita, el elemento competencia de un acto administrativo se refiere a:",
    options: [
      "La conveniencia politica de la decision",
      "El poder juridico de una autoridad para emitir un acto respecto de materia, territorio o tiempo determinados",
      "La motivacion economica del acto",
      "La opinion de los particulares sobre la decision"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el inspector carece de competencia territorial. La competencia es el poder juridico asignado a una autoridad para actuar en materias, territorios o tiempos especificos; es irrenunciable e indelegable salvo autorizacion legal.",
    topic: "Acto administrativo - Elementos"
  },
  {
    id: 4,
    question: "Situacion\n\nUna autoridad ambiental de Antioquia expide una resolucion sancionatoria contra una empresa por contaminacion, pero la empresa esta ubicada en jurisdiccion de otra corporacion autonoma regional. La empresa demanda el acto.\n\nPregunta\n\nCon base en la situacion descrita, el vicio de competencia se configura cuando:",
    options: [
      "La autoridad motiva ampliamente su decision",
      "La autoridad actua fuera del ambito que le fue conferido legalmente",
      "Se publica el acto en el Diario Oficial",
      "Se notifica oportunamente la decision"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, existe vicio de competencia porque la autoridad ambiental actuo sin estar habilitada para ello, decidiendo sobre asuntos fuera de su jurisdiccion territorial.",
    topic: "Acto administrativo - Vicios"
  },
  {
    id: 5,
    question: "Situacion\n\nLa Secretaria de Planeacion municipal expide una licencia de construccion que autoriza edificar en una zona declarada de alto riesgo no mitigable donde esta prohibido construir. El propietario del predio vecino impugna la decision.\n\nPregunta\n\nCon base en la situacion descrita, respecto del objeto del acto administrativo es correcto afirmar que:",
    options: [
      "Puede ser imposible o ilicito si beneficia al administrado",
      "Debe ser cierto, posible y licito",
      "Solo importa la forma del acto y no su contenido",
      "Puede consistir en obligaciones no previstas por la ley"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la licencia tiene un objeto ilicito porque autoriza lo prohibido. El objeto es el contenido del acto y debe ser cierto, posible y conforme al ordenamiento juridico; un objeto ilicito o imposible vicia el acto.",
    topic: "Acto administrativo - Elementos"
  },
  {
    id: 6,
    question: "Situacion\n\nEl alcalde de un municipio expide un acto administrativo que formalmente busca proteger el medio ambiente, pero en realidad su proposito es perjudicar economicamente a un opositor politico que tiene negocios en la zona afectada.\n\nPregunta\n\nCon base en la situacion descrita, la finalidad del acto administrativo esta relacionada con:",
    options: [
      "El interes particular del funcionario que firma el acto",
      "El objetivo de interes general que la ley asigna a la competencia ejercida",
      "La conveniencia fiscal del administrado",
      "La cantidad de recursos presupuestales ejecutados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, hay desviacion de poder porque la finalidad real difiere de la legal. La finalidad se orienta al interes general previsto por la ley para cada competencia; su desviacion configura desviacion de poder.",
    topic: "Acto administrativo - Finalidad"
  },
  {
    id: 7,
    question: "Situacion\n\nUn funcionario de control interno revisa un acto administrativo sancionatorio y encuentra que menciona la norma que habilita la sancion pero no describe los hechos que la justifican. Debe evaluar si el acto esta debidamente motivado.\n\nPregunta\n\nCon base en la situacion descrita, la causa y el motivo del acto administrativo se entienden como:",
    options: [
      "La norma habilitante y las circunstancias de hecho que sustentan la decision",
      "La opinion publica y la motivacion politica del acto",
      "La conveniencia fiscal y la aprobacion del superior",
      "El aval del Ministerio Publico y la firma del contratista"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el acto esta incompleto porque falta el motivo. La causa corresponde a la razon juridica o norma habilitante, mientras que el motivo atiende a las circunstancias facticas que justifican la decision adoptada.",
    topic: "Acto administrativo - Elementos"
  },
  {
    id: 8,
    question: "Situacion\n\nDurante una jornada de capacitacion sobre la Ley 1437 de 2011 en la Personeria Municipal, un funcionario pregunta cuales son los propositos fundamentales que persigue el procedimiento administrativo en Colombia.\n\nPregunta\n\nCon base en la situacion descrita, una finalidad del procedimiento administrativo, segun la Ley 1437 de 2011, es:",
    options: [
      "Concentrar el poder en una sola autoridad sin controles",
      "Proteger derechos y libertades, defender el interes general y sujetar a las autoridades a la Constitucion y la ley",
      "Evitar la participacion ciudadana en las actuaciones administrativas",
      "Otorgar discrecionalidad absoluta a los servidores publicos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el funcionario debe entender que el procedimiento administrativo busca proteger derechos, defender los intereses generales, someter a las autoridades al ordenamiento y cumplir los fines del Estado.",
    topic: "Procedimiento administrativo - Finalidades"
  },
  {
    id: 9,
    question: "Situacion\n\nUn grupo de vecinos quiere que la administracion municipal adelante una actuacion para controlar el ruido excesivo de un establecimiento nocturno. Consultan como pueden iniciar el procedimiento administrativo correspondiente.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual de las siguientes es una forma de iniciacion del procedimiento administrativo?",
    options: [
      "Solo por orden judicial",
      "Derecho de peticion en interes general o particular, cumplimiento de obligacion legal o iniciativa oficiosa de la autoridad",
      "Unicamente a solicitud verbal del interesado",
      "Exclusivamente mediante recursos administrativos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, los vecinos pueden presentar un derecho de peticion en interes general. El procedimiento puede iniciarse por derecho de peticion, en cumplimiento de un deber legal o por oficio cuando la autoridad actua de manera oficiosa.",
    topic: "Procedimiento administrativo - Iniciacion"
  },
  {
    id: 10,
    question: "Situacion\n\nUn ciudadano radica una solicitud de subsidio de vivienda en la Secretaria de Desarrollo Social pero no adjunta todos los documentos requeridos. El funcionario receptor debe decidir como proceder con la peticion incompleta.\n\nPregunta\n\nCon base en la situacion descrita, cuando una peticion esta incompleta, la autoridad debe:",
    options: [
      "Rechazarla de inmediato sin explicacion",
      "Requerir al interesado dentro de los diez dias para que complete la solicitud, otorgandole hasta un mes para hacerlo por una sola vez",
      "Resolverla con la informacion disponible",
      "Archivarla definitivamente sin notificar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el funcionario debe requerir al ciudadano dentro de los diez dias siguientes para completar la peticion y le concede hasta un mes para subsanar una unica vez.",
    topic: "Procedimiento administrativo - Peticiones incompletas"
  },
  {
    id: 11,
    question: "Situacion\n\nUn abogado asesora a un cliente que presento tres tipos diferentes de peticiones a la misma entidad: una solicitud general, una peticion de copias de documentos y una consulta tecnica. El cliente pregunta cuanto tiempo tiene la entidad para responder cada una.\n\nPregunta\n\nCon base en la situacion descrita, los terminos para resolver peticiones son, respectivamente, para peticiones en general, de informacion y consultas:",
    options: [
      "10, 15 y 30 dias habiles",
      "15, 10 y 30 dias habiles",
      "30, 15 y 10 dias habiles",
      "5, 10 y 15 dias habiles"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el abogado debe informar que la Ley 1437 fija 15 dias habiles para peticiones en general, 10 para informacion y documentos, y 30 para consultas.",
    topic: "Procedimiento administrativo - Terminos"
  },
  {
    id: 12,
    question: "Situacion\n\nLa Secretaria de Educacion debe resolver una peticion compleja que requiere estudios tecnicos adicionales. Faltan tres dias para vencer el termino legal y el funcionario encargado evalua si puede solicitar una prorroga.\n\nPregunta\n\nCon base en la situacion descrita, la autoridad puede otorgar plazos adicionales para resolver peticiones siempre que:",
    options: [
      "Se informe antes del vencimiento del termino y el nuevo plazo no exceda el doble del inicial",
      "Exista autorizacion del interesado por escrito",
      "El plazo adicional sea indefinido",
      "No se justifique la demora"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, la autoridad puede ampliar el termino informando antes de su vencimiento y sin exceder el doble del plazo inicial.",
    topic: "Procedimiento administrativo - Prorrogas"
  },
  {
    id: 13,
    question: "Situacion\n\nUn periodista solicita a la Gobernacion de Antioquia acceso a documentos relacionados con operaciones de inteligencia militar en la region. La oficina de atencion al ciudadano debe determinar si puede entregar esa informacion.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual de los siguientes documentos se considera reservado segun el articulo 24 de la Ley 1437 de 2011?",
    options: [
      "Las peticiones de informacion publica",
      "Documentos relacionados con la defensa o seguridad nacionales",
      "Los actos administrativos de caracter general",
      "Los informes de gestion publicados en la web"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, los documentos sobre operaciones de inteligencia militar estan protegidos porque la reserva cobija, entre otros, documentos sobre defensa o seguridad nacionales, secretos comerciales, informacion protegida por secreto profesional y datos sobre privacidad.",
    topic: "Procedimiento administrativo - Reserva de informacion"
  },
  {
    id: 14,
    question: "Situacion\n\nLa alcaldia inicia una actuacion administrativa para revocar una licencia ambiental. El vecino del predio afectado, quien habia denunciado la contaminacion, solicita ser admitido como parte en el procedimiento para aportar pruebas adicionales.\n\nPregunta\n\nCon base en la situacion descrita, los terceros pueden intervenir en una actuacion administrativa cuando:",
    options: [
      "La actuacion se inicia en interes general, sus derechos puedan verse afectados o hayan sido denunciantes o afectados",
      "Asi lo solicite cualquier ciudadano sin relacion con el asunto",
      "El funcionario lo considere para dilatar el tramite",
      "Se trate de actuaciones reservadas de seguridad nacional"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el vecino puede intervenir como denunciante. Los terceros intervienen cuando la actuacion afecta sus derechos, fue iniciada en interes general o pueden aportar pruebas por su rol de denunciantes o afectados.",
    topic: "Procedimiento administrativo - Intervencion de terceros"
  },
  {
    id: 15,
    question: "Situacion\n\nEn un procedimiento administrativo sancionatorio, tres comerciantes afectados solicitan conjuntamente la practica de un peritaje tecnico costoso. El funcionario instructor debe determinar quien asume los gastos de la prueba.\n\nPregunta\n\nCon base en la situacion descrita, los gastos de practica de pruebas en el procedimiento administrativo:",
    options: [
      "Los asume siempre la autoridad",
      "Se distribuyen proporcionalmente entre los interesados y recaen en quien las solicite",
      "Se cargan a quien resulte vencido en la actuacion",
      "Son asumidos por el Ministerio Publico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, los tres comerciantes deben asumir los gastos en partes iguales. Los gastos de pruebas corren por cuenta de quien las solicita; si hay varios interesados se distribuyen en cuotas iguales.",
    topic: "Procedimiento administrativo - Pruebas"
  },
  {
    id: 16,
    question: "Situacion\n\nLa Secretaria de Hacienda expide una resolucion que liquida un impuesto adicional a un contribuyente. El funcionario encargado de las notificaciones debe realizar el procedimiento correcto para que el acto sea oponible.\n\nPregunta\n\nCon base en la situacion descrita, para notificar un acto administrativo particular, la autoridad primero debe:",
    options: [
      "Publicarlo en el Diario Oficial",
      "Citar al interesado para que comparezca dentro de cinco dias habiles y realizar notificacion personal",
      "Enviar un correo electronico a cualquier direccion",
      "Expedir un edicto de manera inmediata"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el funcionario debe primero citar al contribuyente. La notificacion personal inicia con la citacion para comparecer dentro de cinco dias habiles; si el interesado acude, se realiza la notificacion personal.",
    topic: "Notificaciones - Actos particulares"
  },
  {
    id: 17,
    question: "Situacion\n\nLa alcaldia envio citacion para notificacion personal a un ciudadano sancionado, pero este no se presento dentro del termino de cinco dias habiles. El funcionario debe continuar con el procedimiento de notificacion.\n\nPregunta\n\nCon base en la situacion descrita, si el interesado no comparece tras la citacion para notificacion personal, la autoridad debe:",
    options: [
      "Archivar el expediente",
      "Notificar por aviso enviando copia integra del acto",
      "Repetir indefinidamente la citacion",
      "Solicitar autorizacion judicial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el funcionario debe notificar por aviso. Si no hay comparecencia, la autoridad notifica por aviso y envia copia del acto, cumpliendo con el procedimiento previsto.",
    topic: "Notificaciones - Actos particulares"
  },
  {
    id: 18,
    question: "Situacion\n\nUna resolucion que otorgo una pension de invalidez fue expedida con base en documentos falsos. La entidad descubre el fraude y evalua la posibilidad de revocar directamente el acto sin acudir a la jurisdiccion.\n\nPregunta\n\nCon base en la situacion descrita, la revocatoria directa procede cuando:",
    options: [
      "El acto es ajustado a la ley y produce efectos favorables",
      "El acto es contrario a la Constitucion o la ley, no se ajusta al bienestar comun o atenta injustificadamente contra bienes o integridad de una persona",
      "El interesado desea cambiar de opinion sin fundamento",
      "Han transcurrido mas de diez anos desde la expedicion del acto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, procede la revocatoria porque el acto fue expedido contrario a la ley. La Ley 1437 permite revocar directamente actos que sean contrarios a la Constitucion o ley, afecten el bienestar comun o atenten injustificadamente contra bienes o integridad de una persona.",
    topic: "Procedimiento administrativo - Revocatoria directa"
  },
  {
    id: 19,
    question: "Situacion\n\nUn ciudadano recibe una resolucion que niega su solicitud de pension y quiere impugnarla en sede administrativa antes de acudir a la jurisdiccion. Consulta con un abogado sobre los recursos disponibles.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuales son los recursos principales que proceden contra actos administrativos definitivos?",
    options: [
      "Reposicion, apelacion y queja",
      "Reposicion, casacion y revision",
      "Apelacion, tutela y revision",
      "Reposicion, reconsideracion y suplica"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el abogado debe informar que los recursos administrativos principales son reposicion, apelacion y queja; la apelacion suele ser necesaria para acudir a la jurisdiccion contencioso-administrativa.",
    topic: "Procedimiento administrativo - Recursos"
  },
  {
    id: 20,
    question: "Situacion\n\nUn servidor publico fue sancionado disciplinariamente y quiere interponer recursos contra la decision. Fue notificado personalmente hace ocho dias habiles y pregunta si todavia esta a tiempo.\n\nPregunta\n\nCon base en la situacion descrita, el termino para interponer los recursos de reposicion y apelacion es:",
    options: [
      "Cinco dias habiles contados desde la ejecutoria",
      "Diez dias habiles siguientes a la notificacion o al acto presunto, pudiendo interponerse en cualquier tiempo contra actos presuntos",
      "Treinta dias calendario contados desde la comunicacion",
      "Un mes contado desde la publicacion en la pagina web"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el servidor todavia tiene tiempo porque la reposicion y la apelacion se interponen al momento de la notificacion o dentro de los diez dias habiles siguientes; contra actos presuntos pueden presentarse en cualquier tiempo.",
    topic: "Procedimiento administrativo - Recursos y terminos"
  },
  {
    id: 21,
    question: "Situacion\n\nEl Presidente de la Republica viaja a una cumbre internacional y durante el vuelo sufre una emergencia medica que lo incapacita temporalmente. El equipo de gobierno debe determinar quien asume las funciones presidenciales.\n\nPregunta\n\nCon base en la situacion descrita, ¿quien debe asumir el despacho presidencial?",
    options: [
      "El Presidente del Congreso",
      "El Vicepresidente",
      "El Ministro del Interior",
      "El Procurador General"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Constitucion dispone que el Vicepresidente es el primer llamado a reemplazar temporal o definitivamente al Presidente cuando se presenta una falta.",
    topic: "Organizacion del Estado - Reemplazo presidencial"
  },
  {
    id: 22,
    question: "Situacion\n\nEl Gobierno Nacional decide implementar un programa masivo de vacunacion contra una nueva enfermedad. Se requiere definir la politica publica, los protocolos y la coordinacion del sector. Se discute que entidad debe liderar el proceso.\n\nPregunta\n\nCon base en la situacion descrita, ¿que entidad lidera el diseno de la politica nacional de salud?",
    options: [
      "La Superintendencia Nacional de Salud",
      "El Ministerio de Salud y Proteccion Social",
      "El Instituto Nacional de Metrologia",
      "La UGPP"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Ministerio de Salud y Proteccion Social debe liderar porque los ministerios dirigen el sector administrativo correspondiente y tienen a su cargo la formulacion de politicas, planes y programas en su area.",
    topic: "Organizacion del Estado - Ministerios"
  },
  {
    id: 23,
    question: "Situacion\n\nEl director del DANE presenta su renuncia y debe nombrarse un reemplazo. El equipo de transicion consulta sobre la autoridad competente para realizar esta designacion, considerando que el DANE es un departamento administrativo.\n\nPregunta\n\nCon base en la situacion descrita, ¿quien realiza la designacion del nuevo director?",
    options: [
      "El Senado de la Republica",
      "La Corte Constitucional",
      "El Presidente de la Republica",
      "Los alcaldes de capitales departamentales"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el Presidente de la Republica debe nombrar al nuevo director porque los departamentos administrativos dependen directamente del Presidente, quien nombra a sus directores mediante decreto.",
    topic: "Organizacion del Estado - Departamentos administrativos"
  },
  {
    id: 24,
    question: "Situacion\n\nUn banco comercial esta presentando problemas de liquidez y hay quejas de los ahorradores porque no pueden retirar sus depositos. Se requiere una intervencion estatal para proteger a los usuarios del sistema financiero.\n\nPregunta\n\nCon base en la situacion descrita, ¿que tipo de organismo aplica control y supervision sobre la entidad financiera?",
    options: [
      "Un ministerio del sector",
      "Una superintendencia",
      "Una empresa industrial y comercial del Estado",
      "Un establecimiento publico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, debe intervenir la Superintendencia Financiera porque las superintendencias ejercen inspeccion, vigilancia y control sobre actores de sectores economicos especificos para garantizar el cumplimiento regulatorio.",
    topic: "Organizacion del Estado - Superintendencias"
  },
  {
    id: 25,
    question: "Situacion\n\nEl Gobierno necesita crear una entidad que gestione de manera agil y especializada el recaudo de aportes a la seguridad social y parafiscales, con autonomia tecnica pero sin crear una empresa con animo de lucro.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual figura juridica encaja mejor para esta necesidad?",
    options: [
      "Establecimiento publico",
      "Unidad Administrativa Especial (UAE)",
      "Sociedad publica",
      "Empresa industrial y comercial del Estado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, una UAE es la figura adecuada porque las unidades administrativas especiales cuentan con autonomia tecnica y operativa para misiones estrategicas, como la gestion de aportes parafiscales.",
    topic: "Organizacion del Estado - Unidades administrativas especiales"
  },
  {
    id: 26,
    question: "Situacion\n\nEl municipio de Copacabana va a ejecutar un ambicioso plan de mejoramiento vial que incluye pavimentacion de vias secundarias y construccion de ciclorrutas. Se debate quien debe liderar politicamente la actuacion.\n\nPregunta\n\nCon base en la situacion descrita, ¿quien es la cabeza del Ejecutivo local que debe liderar la actuacion?",
    options: [
      "El Gobernador",
      "El Alcalde",
      "El Ministro de Transporte",
      "El Director de INVIAS"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Alcalde de Copacabana debe liderar porque en cada municipio, el alcalde es el jefe de la administracion y dirige la ejecucion del plan de desarrollo y las obras publicas locales.",
    topic: "Gobierno territorial - Alcaldias"
  },
  {
    id: 27,
    question: "Situacion\n\nLos habitantes de un barrio de la comuna 13 de Medellin quieren que la administracion priorice la construccion de un parque y el mejoramiento del alumbrado publico en su sector. Necesitan una instancia que los represente formalmente.\n\nPregunta\n\nCon base en la situacion descrita, ¿que instancia representa al barrio ante la administracion local?",
    options: [
      "El concejo departamental",
      "Una asamblea ciudadana nacional",
      "La Junta Administradora Local (JAL)",
      "La Defensoria Regional"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, la JAL es la instancia apropiada porque las Juntas Administradoras Locales, integradas por ediles, representan a las comunidades ante la alcaldia local y promueven la participacion en la definicion de inversiones.",
    topic: "Participacion territorial - JAL"
  },
  {
    id: 28,
    question: "Situacion\n\nLos municipios de Medellin, Bello, Envigado, Itagui y Sabaneta necesitan coordinar la planeacion del sistema de transporte masivo y las politicas de vivienda debido a su conurbacion y problemas comunes de movilidad.\n\nPregunta\n\nCon base en la situacion descrita, ¿que figura administrativa facilita esa articulacion entre municipios?",
    options: [
      "Provincia administrativa",
      "Region geografica",
      "Area metropolitana",
      "Distrito especial"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, estos municipios conforman el Area Metropolitana del Valle de Aburra. Las areas metropolitanas articulan la planeacion y la prestacion de servicios entre municipios integrados alrededor de una ciudad nucleo.",
    topic: "Organizacion regional - Areas metropolitanas"
  },
  {
    id: 29,
    question: "Situacion\n\nBarranquilla, como ciudad portuaria y capital departamental, requiere un regimen especial con mayor autonomia fiscal y administrativa para atender sus funciones estrategicas de comercio exterior y desarrollo regional.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual categoria territorial es la indicada para esta ciudad?",
    options: [
      "Municipio certificado",
      "Distrito especial",
      "Departamento",
      "Region Andina"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, Barranquilla es un Distrito Especial porque los distritos especiales cuentan con regimen politico y fiscal reforzado para atender funciones estrategicas, como sucede con capitales departamentales y portuarias.",
    topic: "Organizacion territorial - Distritos especiales"
  },
  {
    id: 30,
    question: "Situacion\n\nUna comunidad indigena del Choco ejerce gobierno propio sobre su resguardo y toma decisiones autonomas sobre el uso del territorio y los recursos naturales segun sus tradiciones ancestrales.\n\nPregunta\n\nCon base en la situacion descrita, ¿que reconoce el ordenamiento juridico colombiano respecto a esta situacion?",
    options: [
      "Su pertenencia al Ministerio del Interior",
      "Un regimen identico al de los municipios",
      "Territorios indigenas con reconocimiento legal y autonomia decisoria",
      "Que debe convertirse en area metropolitana"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, la Constitucion reconoce los territorios indigenas con autonomia para decidir sobre sus recursos y formas de gobierno, respetando sus culturas.",
    topic: "Organizacion territorial - Territorios indigenas"
  },
  {
    id: 31,
    question: "Situacion\n\nEl municipio de La Ceja necesita operar el hospital local para prestar servicios de salud de primer nivel a la poblacion. Debe crear una entidad publica que preste estos servicios dentro del sistema de seguridad social.\n\nPregunta\n\nCon base en la situacion descrita, ¿que figura estatal es la apropiada para prestar estos servicios hospitalarios?",
    options: [
      "Empresa industrial y comercial del Estado (EICE)",
      "Empresa Social del Estado (ESE)",
      "Sociedad de economia mixta",
      "Superintendencia de Salud"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, debe crearse una ESE porque las Empresas Sociales del Estado integran la red publica hospitalaria y prestan servicios de salud bajo el sistema general de seguridad social.",
    topic: "Sector salud - ESE"
  },
  {
    id: 32,
    question: "Situacion\n\nEl Estado colombiano decide participar directamente en la generacion y comercializacion de energia electrica, compitiendo en el mercado con empresas privadas y buscando generar utilidades para financiar proyectos sociales.\n\nPregunta\n\nCon base en la situacion descrita, ¿que figura juridica corresponde para esta actividad empresarial del Estado?",
    options: [
      "Establecimiento publico",
      "Empresa Industrial y Comercial del Estado (EICE)",
      "Empresa Social del Estado",
      "Junta Administradora Local"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, corresponde una EICE porque las Empresas Industriales y Comerciales del Estado se constituyen para desarrollar actividades industriales o comerciales en competencia, con patrimonio propio y autonomia administrativa y financiera.",
    topic: "Empresas estatales - EICE"
  },
  {
    id: 33,
    question: "Situacion\n\nUna empresa de acueducto y alcantarillado presenta una propuesta de aumento tarifario. Antes de aplicar las nuevas tarifas, requiere la aprobacion de la entidad que regula los servicios publicos domiciliarios.\n\nPregunta\n\nCon base en la situacion descrita, ¿quien ejerce la regulacion sectorial y aprueba las tarifas?",
    options: [
      "El Ministerio de Vivienda",
      "Las comisiones de regulacion (por ejemplo, CRA o CREG)",
      "Una Empresa Social del Estado",
      "El Departamento Nacional de Planeacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Comision de Regulacion de Agua Potable (CRA) debe aprobar las tarifas porque las comisiones de regulacion fijan reglas tecnicas, tarifas y estandares de calidad para los servicios publicos domiciliarios y vigilan su cumplimiento.",
    topic: "Servicios publicos - Regulacion"
  },
  {
    id: 34,
    question: "Situacion\n\nEl departamento de Antioquia quiere desarrollar un proyecto de infraestructura portuaria. Para financiarlo, decide mantener el control mayoritario pero permitir la participacion de inversionistas privados como accionistas minoritarios.\n\nPregunta\n\nCon base en la situacion descrita, ¿que figura juridica permite esta combinacion de capital publico y privado?",
    options: [
      "Sociedad publica",
      "Sociedad de economia mixta",
      "Establecimiento publico",
      "Unidad Administrativa Especial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, corresponde una sociedad de economia mixta porque en estas el Estado conserva participacion mayoritaria, pero admite accionistas privados para financiar proyectos estrategicos.",
    topic: "Empresas estatales - Sociedades de economia mixta"
  },
  {
    id: 35,
    question: "Situacion\n\nEl Ministerio de Ambiente necesita desarrollar tecnologia para el monitoreo de ecosistemas marinos y costeros. Requiere una entidad publica especializada que pueda realizar investigacion cientifica con apoyo de universidades.\n\nPregunta\n\nCon base en la situacion descrita, ¿que tipo de entidad publica puede liderar el desarrollo de I+D?",
    options: [
      "Una superintendencia",
      "Un instituto de investigacion cientifica y tecnologica",
      "Una Junta Administradora Local",
      "Una empresa industrial y comercial del Estado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, se requiere un instituto de investigacion cientifica y tecnologica porque son entidades estatales especializadas que coordinan proyectos de I+D y trabajan con la academia y la industria.",
    topic: "Organizacion del Estado - Institutos cientificos"
  },
  {
    id: 36,
    question: "Situacion\n\nEl departamento de Antioquia debe formular un nuevo plan de ordenamiento territorial que articule los 125 municipios. Se requiere definir quien lidera politicamente este proceso de planeacion a escala departamental.\n\nPregunta\n\nCon base en la situacion descrita, ¿quien lidera politicamente el proceso de ordenamiento territorial departamental?",
    options: [
      "El Alcalde",
      "El Gobernador",
      "El Ministro de Ambiente",
      "El Director de una unidad administrativa especial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Gobernador de Antioquia lidera el proceso porque en el nivel departamental, el gobernador es el jefe del Ejecutivo y coordina la planificacion territorial conforme al plan de desarrollo y a las competencias del departamento.",
    topic: "Gobierno territorial - Gobernaciones"
  }
]

export function NormatividadTest() {
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2">("v1")
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
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
    setAnswers({})
    setAnsweredQuestions(new Set())
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    if (answeredQuestions.has(questionId)) return
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex
    }))
    setAnsweredQuestions((prev) => new Set(prev).add(questionId))
  }

  const calculateScore = () => {
    let correct = 0
    let totalPoints = 0
    let earnedPoints = 0

    questions.forEach((q) => {
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
    setAnsweredQuestions(new Set())
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
          Esta prueba contiene {questions.length} preguntas sobre normatividad de las entidades territoriales y derecho administrativo.
          Total de puntos disponibles: {questions.reduce((sum, q) => sum + q.points, 0)} puntos.
          Basada en el compendio de derecho administrativo y en "Organizacion del Estado: estructura y competencias".
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selecciona la version de la prueba</CardTitle>
          <CardDescription>
            La Version 1 reune {questionsV1.length} preguntas sobre organizacion del Estado y derecho administrativo; la Version 2 conserva {questionsV2.length} preguntas centradas en acto y procedimiento administrativo.
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
            <p className="mt-3 text-sm text-muted-foreground">Reinicia la prueba para cambiar de version.</p>
          )}
        </CardContent>
      </Card>

      {showResults && score && (
        <Alert
          className={
            score.earnedPoints >= score.totalPoints * 0.7
              ? "border-green-500 bg-green-50"
              : "border-orange-500 bg-orange-50"
          }
        >
          <AlertTitle className="text-lg font-semibold">
            Resultado: {score.earnedPoints} / {score.totalPoints} puntos
          </AlertTitle>
          <AlertDescription>
            Respondiste correctamente {score.correct} de {score.total} preguntas (
            {Math.round((score.earnedPoints / score.totalPoints) * 100)}%)
          </AlertDescription>
        </Alert>
      )}

      {questions.map((question, index) => (
        <Card
          key={question.id}
          className={`border ${
            showFeedback && answers[question.id] !== undefined
              ? answers[question.id] === question.correctAnswer
                ? "border-green-500 bg-green-50/50"
                : "border-red-500 bg-red-50/50"
              : "border-border"
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-start justify-between gap-4 text-lg">
              <span>
                Pregunta {index + 1} ({question.points} puntos)
              </span>
              {showFeedback && answers[question.id] !== undefined && (
                answers[question.id] === question.correctAnswer ? (
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                )
              )}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Tema: {question.topic}</CardDescription>
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
                  className={`flex items-start space-x-3 rounded-lg border p-3 transition-colors ${
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
                    id={`norm-q${question.id}-opt${optionIndex}`}
                    className="mt-0.5"
                  />
                  <Label htmlFor={`norm-q${question.id}-opt${optionIndex}`} className="flex-1 cursor-pointer leading-relaxed">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {showFeedback && answers[question.id] !== undefined && (
              <Alert
                className={
                  answers[question.id] === question.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : "border-orange-500 bg-orange-50"
                }
              >
                <AlertTitle className="font-semibold">
                  {answers[question.id] === question.correctAnswer ? "¡Correcto!" : "Respuesta incorrecta"}
                </AlertTitle>
                <AlertDescription className="mt-2 space-y-2">
                  <p>
                    <strong>Explicacion:</strong> {question.explanation}
                  </p>
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
            <Button onClick={handleReset} variant="secondary" size="lg" className="min-w-[200px]">
              Reiniciar Prueba
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
