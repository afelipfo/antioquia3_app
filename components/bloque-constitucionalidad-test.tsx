"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, InfoIcon, XCircle } from "lucide-react"
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

export const bloqueConstitucionalidadQuestions: Question[] = [
  {
    id: 1,
    question:
      "Situacion\n\nUn juez de Medellin revisa un caso donde un ciudadano reclama proteccion de un derecho que no aparece expresamente en la Constitucion, pero que esta consagrado en un tratado de derechos humanos ratificado por Colombia. El abogado defensor argumenta que este derecho debe ser protegido.\n\nPregunta\n\nSegun la situacion descrita, ¿que herramienta juridica debe utilizar el juez para integrar este derecho al ordenamiento constitucional?",
    options: [
      "El principio de legalidad estricta para aplicar solo la ley",
      "El bloque de constitucionalidad como complemento interpretativo de la Carta",
      "Una doctrina interna de la rama ejecutiva",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En la situacion planteada, el juez debe utilizar el bloque de constitucionalidad, el cual permite integrar tratados de derechos humanos como parametro de interpretacion y complementacion de la Constitucion, garantizando asi la proteccion del derecho reclamado.",
    topic: "Concepto general",
  },
  {
    id: 2,
    question:
      "Situacion\n\nDurante una audiencia publica en el Concejo de Envigado, un concejal afirma que la supremacia constitucional se limita exclusivamente al texto literal de los 380 articulos de la Constitucion. Un asesor juridico le corrige publicamente.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es el enfoque correcto sobre la supremacia constitucional segun el estudio del bloque?",
    options: [
      "La Constitucion no admite normas complementarias",
      "La Constitucion solo se interpreta con leyes ordinarias",
      "La Constitucion se integra con normas y principios que la desarrollan para garantizar su supremacia",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "En esta situacion, el asesor juridico tiene razon porque la Carta no se reduce a su texto, pues se complementa con normas y principios del bloque que aseguran su supremacia, incluyendo tratados de derechos humanos y otras fuentes.",
    topic: "Naturaleza del bloque",
  },
  {
    id: 3,
    question:
      "Situacion\n\nUn tribunal administrativo de Antioquia debe resolver un caso donde una ley departamental entra en conflicto con un tratado de derechos humanos prevalente que Colombia ratifico. Las partes presentan argumentos contradictorios sobre cual norma debe aplicarse.\n\nPregunta\n\nSegun el articulo 4 constitucional complementado con el bloque, ¿que debe ordenar el tribunal en esta situacion?",
    options: [
      "Aplicar la ley por ser mas reciente",
      "Privilegiar la Constitucion y las normas del bloque que garantizan su supremacia",
      "Remitir la controversia a un ministerio",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En el caso descrito, el tribunal debe privilegiar la Constitucion y las normas del bloque. El articulo 4, interpretado con el bloque, establece la prevalencia de la Constitucion y de las normas que la integran frente a leyes contrarias.",
    topic: "Supremacia (art. 4)",
  },
  {
    id: 4,
    question:
      "Situacion\n\nLa Gobernacion de Antioquia consulta a su oficina juridica sobre la aplicabilidad interna de un tratado de derechos humanos ratificado por Colombia que limita las medidas que pueden tomarse durante estados de excepcion. Algunos funcionarios dudan si este tratado es vinculante.\n\nPregunta\n\nDe acuerdo con el articulo 93 de la Constitucion, ¿que indica este sobre la vinculatoriedad del tratado en la situacion descrita?",
    options: [
      "No es vinculante si no existe ley estatutaria",
      "Solo vincula al ejecutivo",
      "Prevalece en el orden interno y obliga a todas las autoridades",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "En esta situacion, la oficina juridica debe informar que el articulo 93 establece que los tratados y convenios de derechos humanos ratificados prevalecen en el orden interno, integrando el bloque y vinculando a todas las autoridades, incluida la Gobernacion.",
    topic: "Tratados de DD. HH. (art. 93)",
  },
  {
    id: 5,
    question:
      "Situacion\n\nUn ciudadano de Rionegro presenta una accion de tutela reclamando proteccion de un derecho que considera inherente a la persona humana, pero que no esta expresamente enumerado en el catalogo de derechos de la Constitucion. El juez debe decidir si puede protegerlo.\n\nPregunta\n\nSegun el articulo 94 de la Constitucion, ¿que debe determinar el juez respecto al derecho reclamado en esta situacion?",
    options: [
      "No puede protegerse por falta de consagracion expresa",
      "Debe regularse unicamente por ley",
      "Puede reconocerse, pues la Carta ampara derechos no enunciados de manera expresa",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "En la situacion planteada, el juez puede reconocer el derecho porque el articulo 94 senala que el reconocimiento de los derechos no debe entenderse como negacion de otros inherentes, por lo que el bloque cubre derechos no enunciados expresamente.",
    topic: "Derechos no escritos (art. 94)",
  },
  {
    id: 6,
    question:
      "Situacion\n\nDurante un estado de excepcion declarado en una region de Antioquia, el comandante militar propone suspender la aplicacion de ciertas normas del Derecho Internacional Humanitario para facilitar operaciones de seguridad. El gobernador consulta la legalidad de esta medida.\n\nPregunta\n\nSegun el articulo 214.2 de la Constitucion, ¿que debe recordarse en esta situacion sobre el DIH?",
    options: [
      "Las autoridades pueden restringir cualquier derecho",
      "Debe respetarse el Derecho Internacional Humanitario",
      "Se suspenden los tratados internacionales",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En esta situacion, el gobernador debe recordar que el articulo 214.2, incorporado al bloque, impone el respeto al DIH aun durante estados de excepcion. La propuesta del comandante es inconstitucional.",
    topic: "Estados de excepcion",
  },
  {
    id: 7,
    question:
      "Situacion\n\nUn profesor de derecho constitucional en la Universidad de Antioquia explica a sus estudiantes que cierta norma internacional tiene jerarquia constitucional y sirve como parametro directo de control de constitucionalidad. Un estudiante pregunta a que categoria pertenece.\n\nPregunta\n\nSegun la clasificacion del bloque de constitucionalidad, ¿a que categoria pertenece la norma descrita en esta situacion?",
    options: [
      "Bloque de constitucionalidad en sentido estricto",
      "Bloque en sentido lato con jerarquia supralegal",
      "Derecho administrativo ordinario",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "En la situacion descrita, la norma pertenece al bloque en sentido estricto, que agrupa normas con jerarquia constitucional que actuan como parametro directo del control de constitucionalidad.",
    topic: "Bloque en sentido estricto",
  },
  {
    id: 8,
    question:
      "Situacion\n\nUn juez laboral de Itagui debe resolver un litigio sobre libertad sindical. Para fundamentar su decision, invoca convenios de la OIT ratificados por Colombia, explicando que tienen valor supralegal aunque no jerarquia constitucional plena.\n\nPregunta\n\nDe acuerdo con la clasificacion del bloque, ¿en que sentido se ubican los convenios OIT utilizados en esta situacion?",
    options: [
      "Sentido estricto",
      "Sentido lato o supralegal",
      "Norma organica",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En el caso descrito, los convenios de la OIT ratificados se ubican en el bloque en sentido lato como fuentes supralegales y criterios de interpretacion, lo cual el juez aplica correctamente.",
    topic: "Bloque en sentido lato",
  },
  {
    id: 9,
    question:
      "Situacion\n\nDurante un seminario sobre fuentes del derecho constitucional en la Asamblea Departamental de Antioquia, un expositor presenta ejemplos de normas que pertenecen al bloque en sentido lato. Los asistentes deben identificar cuales son correctas.\n\nPregunta\n\nSegun el documento de estudio, ¿cual de las siguientes normas pertenece al bloque en sentido lato como se menciona en la situacion?",
    options: [
      "Codigos de policia",
      "Leyes estatutarias y normas del DIH como criterios interpretativos",
      "Planes de desarrollo economico",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En esta situacion, la respuesta correcta son las leyes estatutarias y normas del DIH, ya que el texto menciona que estas operan como herramientas supralegales en el bloque lato.",
    topic: "Ejemplos lato",
  },
  {
    id: 10,
    question:
      "Situacion\n\nUn grupo de ciudadanos de Bello demanda una ley ante la Corte Constitucional argumentando que contradice un tratado de derechos humanos ratificado por Colombia. El magistrado ponente debe determinar el efecto del bloque en este control.\n\nPregunta\n\nEn la situacion descrita, ¿cual es el efecto del bloque de constitucionalidad en el control de la ley demandada?",
    options: [
      "No aplica al control",
      "Es parametro de control y puede llevar a la inexequibilidad",
      "Solo sirve como orientacion politica",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En este caso, el bloque integra el parametro de control constitucional, por lo que si la ley contradice el tratado de derechos humanos, puede ser declarada inexequible por la Corte.",
    topic: "Efectos - Control constitucional",
  },
  {
    id: 11,
    question:
      "Situacion\n\nDurante una capacitacion a funcionarios publicos en Apartado, el alcalde afirma que el bloque de constitucionalidad solo obliga a los jueces y que las autoridades administrativas no estan vinculadas por el. Un abogado del municipio le contradice.\n\nPregunta\n\nCon base en la situacion descrita, ¿que ensena el documento sobre la vinculacion del bloque?",
    options: [
      "Es cierto por reserva judicial",
      "Solo vincula al Congreso",
      "Vincula a todas las autoridades en ejercicio de sus funciones",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "En esta situacion, el abogado tiene razon porque la Corte ha reiterado que el bloque vincula a todas las ramas y niveles de la administracion publica, incluyendo alcaldias y demas autoridades administrativas.",
    topic: "Efectos - Vinculacion",
  },
  {
    id: 12,
    question:
      "Situacion\n\nEl Estado colombiano, a traves de una de sus entidades, expide un acto administrativo que desconoce abiertamente un tratado de derechos humanos prevalente. Una ONG internacional advierte sobre las posibles consecuencias de esta accion.\n\nPregunta\n\nSegun el documento, ¿que consecuencias puede generar la situacion descrita?",
    options: [
      "Nulidad automatica de toda la Constitucion",
      "No hay consecuencias internas",
      "Se pueden anular actos normativos y generarse sanciones internacionales",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "En la situacion planteada, el bloque preve tanto la nulidad de normas internas contrarias como la eventual responsabilidad internacional del Estado, por lo que la ONG advierte correctamente sobre ambas consecuencias.",
    topic: "Efectos - Sanciones",
  },
  {
    id: 13,
    question:
      "Situacion\n\nLa Asamblea Departamental de Antioquia aprueba una ordenanza que establece restricciones a la actividad sindical de los empleados publicos departamentales. Un sindicato la demanda ante la Corte Constitucional alegando violacion de derechos laborales.\n\nPregunta\n\nEn la situacion descrita, ¿como debe proceder la Corte Constitucional al analizar la ordenanza?",
    options: [
      "Solo confronta la ley con la Carta",
      "Confronta tambien los Convenios 87 y 98 de la OIT y puede declarar inexequible",
      "Remite el caso al Ministerio del Trabajo",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En este caso, la Corte debe confrontar la ordenanza no solo con la Constitucion sino tambien con los convenios 87 y 98 de la OIT, que como parte del bloque se usan para el control de normas que afecten la libertad sindical.",
    topic: "Caso - Libertad sindical",
  },
  {
    id: 14,
    question:
      "Situacion\n\nDurante un debate academico en la Facultad de Derecho de la Universidad de Medellin, se analiza el Acto Legislativo 01 de 2020 que establecia la prision perpetua revisable para ciertos delitos contra menores. Los estudiantes discuten el fallo de la Corte Constitucional.\n\nPregunta\n\nSegun la situacion descrita, ¿que concluyo la Corte Constitucional sobre el Acto Legislativo 01 de 2020?",
    options: [
      "Lo declaro exequible por proteger menores",
      "Lo declaro inexequible por desconocer la dignidad humana, la resocializacion y tratados internacionales",
      "Difirio su decision para reglamentacion",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En el debate academico descrito, debe reconocerse que el fallo concluyo que la pena perpetua violaba el articulo 34 C.P. y tratados como el PIDCP y la CADH, integrados al bloque, por lo que fue declarada inexequible.",
    topic: "Caso - Pena perpetua",
  },
  {
    id: 15,
    question:
      "Situacion\n\nUn fiscal de Medellin prepara un concepto sobre politica criminal y debe explicar por que la Corte Constitucional declaro inexequible la pena perpetua revisable. Necesita identificar el fundamento en derechos humanos de la decision.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual fue el fundamento en derechos humanos para declarar inexequible la pena perpetua revisable?",
    options: [
      "Los tratados no son pertinentes en materia penal",
      "El bloque impide medidas que desconozcan tratados de DD. HH.; la pena perpetua es inhumana y desproporcionada",
      "El Congreso puede exceptuar tratados por mayoria simple",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En el concepto que prepara el fiscal, debe explicarse que la ratio decidendi resalto que los compromisos internacionales en derechos humanos prohiben sanciones inhumanas, por lo que el bloque impedia la pena perpetua por ser desproporcionada.",
    topic: "Caso - Fundamento DD. HH.",
  },
  {
    id: 16,
    question:
      "Situacion\n\nEn una clase de derecho administrativo en Medellin, el profesor explica el caso de la destitucion e inhabilidad de Gustavo Petro cuando era Alcalde de Bogota. Los estudiantes preguntan que ocurrio a nivel internacional tras la sancion disciplinaria.\n\nPregunta\n\nSegun el documento y la situacion descrita, ¿que ocurrio a nivel internacional tras la destitucion de Petro?",
    options: [
      "No hubo reclamacion internacional",
      "Se presento demanda ante la CIDH y el proceso termino con su reintegro",
      "La Corte IDH impuso sancion penal",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En la situacion de clase descrita, el profesor debe explicar que se acudio al sistema interamericano de derechos humanos, lo que desemboco en la restitucion del cargo a Petro, demostrando la efectividad del bloque de convencionalidad.",
    topic: "Caso Petro - Sistema interamericano",
  },
  {
    id: 17,
    question:
      "Situacion\n\nUn procurador regional de Antioquia consulta a su equipo juridico sobre los limites de sus facultades sancionatorias despues de la Sentencia C-030 de 2023, especialmente respecto a funcionarios elegidos por voto popular.\n\nPregunta\n\nSegun la situacion descrita, ¿que decidio la Corte Constitucional en la Sentencia C-030 de 2023 respecto a las facultades de la Procuraduria?",
    options: [
      "Ratifico que la Procuraduria ejerce funciones jurisdiccionales plenas",
      "Declaro inexequibles las expresiones 'jurisdiccionales' y condiciono que las sanciones de destitucion/suspension/inhabilidad a elegidos por voto popular corresponden al juez contencioso administrativo",
      "Traslado todas las investigaciones disciplinarias a la Fiscalia",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En esta consulta, el equipo juridico debe informar que la sentencia limito las facultades sancionatorias de la Procuraduria cuando afectan a funcionarios elegidos popularmente, trasladando la competencia final al juez contencioso administrativo, siguiendo el estandar del bloque.",
    topic: "Caso Petro - C-030/23",
  },
  {
    id: 18,
    question:
      "Situacion\n\nUn defensor de derechos humanos en Antioquia asesora a un concejal que fue sancionado disciplinariamente con inhabilidad por la Procuraduria. El defensor cita el articulo 23 de la Convencion Americana sobre Derechos Humanos para sustentar la defensa.\n\nPregunta\n\nSegun el articulo 23 de la CADH citado en la situacion, ¿quien puede restringir derechos politicos?",
    options: [
      "Cualquier autoridad disciplinaria",
      "Un juez competente mediante condena en proceso penal",
      "Un organo administrativo con funcion sancionatoria",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En el caso del concejal, el defensor tiene razon porque el articulo 23.2 de la CADH establece que solo una sentencia penal dictada por juez competente puede restringir derechos politicos, estandar integrado al bloque de constitucionalidad.",
    topic: "CADH - Derechos politicos",
  },
  {
    id: 19,
    question:
      "Situacion\n\nEl Consejo de Estado revisa un caso de control de convencionalidad donde un funcionario elegido popularmente fue sancionado con inhabilidad sin que existiera condena penal previa. Los magistrados debaten si debe mantenerse la sancion.\n\nPregunta\n\nEn la situacion descrita, ¿por que el Consejo de Estado advirtio que no puede mantenerse una sancion que restrinja derechos politicos sin condena penal?",
    options: [
      "Porque basta con autoridad nacional",
      "Porque lo contrario violaria el art. 23.2 CADH y el principio pacta sunt servanda",
      "Porque una confirmacion administrativa es suficiente",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En este caso, el Consejo de Estado sostuvo que sin condena penal mantener la sancion desconoceria el pacto internacional (art. 23.2 CADH) y el principio de buena fe en el cumplimiento de tratados (pacta sunt servanda).",
    topic: "Control de convencionalidad",
  },
  {
    id: 20,
    question:
      "Situacion\n\nDurante un foro sobre democracia y derechos humanos en la Universidad EAFIT, un magistrado del Consejo de Estado explica la importancia del articulo 23.2 de la CADH mas alla de la proteccion individual del sancionado. Los asistentes preguntan por que es tan relevante.\n\nPregunta\n\nSegun la situacion descrita, ¿por que el Consejo de Estado resalto la importancia democratica del articulo 23.2 CADH?",
    options: [
      "Solo protege al sancionado",
      "Preserva el principio democratico y los derechos de los electores ademas del elegido",
      "Evita acciones de tutela",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En el foro descrito, el magistrado explica que proteger los derechos politicos tambien resguarda la voluntad popular de los electores, siendo este un eje democratico fundamental del bloque de constitucionalidad.",
    topic: "CADH - Democracia",
  },
  {
    id: 21,
    question:
      "Situacion\n\nUn grupo de congresistas demanda ante la Corte Constitucional una ley que regula estados de excepcion, argumentando que desconoce normas del Derecho Internacional Humanitario. La Corte debe decidir si procede el control.\n\nPregunta\n\nEn la situacion descrita, ¿como opera el bloque de constitucionalidad para el control de la ley demandada?",
    options: [
      "No procede control por reserva legislativa",
      "Se ejerce control con base en el bloque (art. 214.2 y normas del DIH) y puede declararse inexequible",
      "Se aplica preferentemente la ley por especialidad",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En este caso, el bloque incluye el DIH como parametro de control en estados de excepcion (art. 214.2), permitiendo a la Corte declarar inexequibles normas contrarias al Derecho Internacional Humanitario.",
    topic: "Aplicacion practica",
  },
  {
    id: 22,
    question:
      "Situacion\n\nLa Alcaldia de Turbo expide un decreto que regula el acceso a servicios publicos de manera contraria a un tratado de derechos humanos prevalente ratificado por Colombia. Un ciudadano afectado demanda el decreto ante la jurisdiccion contencioso administrativa.\n\nPregunta\n\nEn la situacion descrita, ¿que debe hacer el juez contencioso administrativo respecto al decreto demandado?",
    options: [
      "Inaplicar el tratado por no ser ley",
      "Aplicar el bloque como parametro y anular el acto si es contrario",
      "Remitir el caso a conciliacion",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En este caso, el bloque vincula a todas las autoridades, por tanto el juez contencioso debe aplicar el tratado integrado al bloque y puede anular el decreto si es incompatible con las obligaciones internacionales de derechos humanos.",
    topic: "Autoridades vinculadas",
  },
  {
    id: 23,
    question:
      "Situacion\n\nUn juez laboral de Caucasia conoce una demanda por violacion al derecho de asociacion sindical en una empresa privada. El trabajador demandante solicita que se apliquen fuentes internacionales ademas de la Constitucion.\n\nPregunta\n\nSegun el documento y la situacion descrita, ¿que fuente complementa la Constitucion en controversias sobre asociacion sindical?",
    options: [
      "Unicamente el Codigo Sustantivo del Trabajo",
      "Los convenios OIT 87 y 98, como parte del bloque",
      "Un reglamento interno de empresa",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En la situacion del trabajador, el juez debe aplicar los convenios OIT 87 y 98 como referentes del bloque para proteger la libertad sindical, complementando las normas constitucionales y legales nacionales.",
    topic: "Convenios OIT",
  },
  {
    id: 24,
    question:
      "Situacion\n\nEl Congreso debate un proyecto de ley de politica criminal que establece penas que desconocen la dignidad humana y eliminan posibilidades de resocializacion. Un grupo de senadores advierte sobre su posible inconstitucionalidad.\n\nPregunta\n\nEn la situacion descrita, ¿que tipo de control procede contra el proyecto de ley si es aprobado?",
    options: [
      "Solo control politico",
      "Control de constitucionalidad soportado en el bloque y las obligaciones internacionales",
      "Consulta no vinculante a la academia",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En este caso, los senadores advierten correctamente porque el bloque opera como parametro para invalidar normas penales incompatibles con obligaciones internacionales y principios constitucionales como la dignidad humana y la resocializacion.",
    topic: "Politica criminal y bloque",
  },
  {
    id: 25,
    question:
      "Situacion\n\nMaria, una paciente de 45 anos en Medellin, requiere urgentemente un procedimiento quirurgico para salvar su vida. Su EPS le niega la autorizacion argumentando que el procedimiento no esta incluido en el plan de beneficios. Maria no tiene recursos para pagar de forma particular.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual mecanismo judicial procede para obtener proteccion rapida del derecho a la salud de Maria?",
    options: [
      "Accion popular",
      "Accion de cumplimiento",
      "Accion de tutela",
      "Accion de grupo",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "En la situacion de Maria, la accion de tutela es el mecanismo preferente y sumario para proteger de inmediato su derecho fundamental a la salud y a la vida, dado que no existe otro medio judicial eficaz ante la urgencia de su condicion medica.",
    topic: "Tutela en salud urgente",
  },
  {
    id: 26,
    question:
      "Situacion\n\nUn juez del circuito de Medellin conoce un caso donde un periodista demanda al Estado por censura previa de sus publicaciones. Al revisar la normativa aplicable, encuentra que una ley colombiana permite ciertas restricciones, pero la Convencion Americana sobre Derechos Humanos las prohibe expresamente.\n\nPregunta\n\nEn la situacion descrita, ante el conflicto entre la ley y la Convencion Americana, ¿que norma debe aplicar el juez?",
    options: [
      "La ley ordinaria",
      "El tratado de derechos humanos como parte del bloque de constitucionalidad",
      "Ninguno, por falta de reglamentacion",
      "Una directiva administrativa",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En el caso del periodista, el juez debe aplicar la Convencion Americana sobre Derechos Humanos porque los tratados de derechos humanos integran el bloque de constitucionalidad y deben aplicarse con prevalencia frente a leyes contrarias.",
    topic: "Tratado internacional vs. ley",
  },
  {
    id: 27,
    question:
      "Situacion\n\nEl Congreso de la Republica aprueba una ley ordinaria que establece requisitos restrictivos para ejercer el derecho de reunion pacifica y manifestacion publica. Un grupo de ciudadanos la demanda ante la Corte Constitucional.\n\nPregunta\n\nSegun la situacion descrita, ¿cual es el principal problema constitucional de la ley demandada?",
    options: [
      "Falta de consulta previa",
      "Desconocer la reserva de ley estatutaria para derechos fundamentales",
      "Inexistencia de decreto reglamentario",
      "Vicio de forma en la ponencia",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En esta situacion, el problema principal es que la regulacion de derechos fundamentales como reunion y protesta esta sometida a ley estatutaria. Hacerlo por ley ordinaria viola esa reserva constitucional.",
    topic: "Reserva de ley estatutaria",
  },
  {
    id: 28,
    question:
      "Situacion\n\nEl Gobierno Nacional declara estado de emergencia economica y social. Mediante decreto legislativo, suspende temporalmente varios derechos fundamentales argumentando la gravedad de la crisis. Un ciudadano cuestiona la constitucionalidad de esta medida.\n\nPregunta\n\nSegun el bloque de constitucionalidad, ¿es procedente la suspension de derechos fundamentales decretada en esta situacion?",
    options: [
      "Valido por tres meses",
      "Valido si lo avala un juez",
      "Improcedente: los derechos fundamentales no pueden suspenderse en estados de excepcion",
      "Procede solo para derechos de segunda generacion",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "En la situacion descrita, la suspension es improcedente porque incluso en estados de excepcion debe respetarse el bloque de constitucionalidad, que prohibe la suspension de los derechos fundamentales conforme a tratados internacionales.",
    topic: "Estados de excepcion",
  },
  {
    id: 29,
    question:
      "Situacion\n\nUn ciudadano de Bello solicita a una plataforma digital que elimine informacion personal antigua y perjudicial que aparece en los resultados de busqueda. La plataforma se niega argumentando que el derecho al olvido digital no existe en la Constitucion colombiana.\n\nPregunta\n\nCon base en la situacion descrita, ¿como podria reconocerse el derecho al olvido digital como derecho fundamental?",
    options: [
      "Solo mediante reforma constitucional",
      "Por ser innominado o por conexidad con privacidad y dignidad",
      "Por costumbre mercantil",
      "Por decreto presidencial",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En el caso del ciudadano de Bello, el derecho al olvido digital puede reconocerse como fundamental por ser un derecho innominado o por su conexidad con derechos expresos como la privacidad y la dignidad humana, segun lo ha admitido la Corte Constitucional.",
    topic: "Derechos innominados",
  },
  {
    id: 30,
    question:
      "Situacion\n\nUna comunidad de pescadores del Uraba antioqueno demanda a una empresa minera que realiza vertimientos contaminantes al rio del cual dependen para su sustento y consumo de agua. La contaminacion afecta a mas de 500 familias de la zona.\n\nPregunta\n\nEn la situacion descrita, ¿que generacion de derechos se activa principalmente con la demanda de la comunidad?",
    options: [
      "Primera",
      "Segunda",
      "Tercera (colectivos/solidaridad, ambiente)",
      "Cuarta",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "En el caso de la comunidad de pescadores, se activan los derechos de tercera generacion o de solidaridad, que incluyen la proteccion del ambiente sano y los intereses colectivos de la comunidad afectada.",
    topic: "Derechos de tercera generacion",
  },
  {
    id: 31,
    question:
      "Situacion\n\nUna empresa de tecnologia en Medellin implementa un sistema de control de acceso que capta y almacena huellas dactilares y reconocimiento facial de todos los visitantes sin informarles ni obtener su consentimiento previo.\n\nPregunta\n\nCon base en la situacion descrita, ¿que derecho fundamental resulta principalmente vulnerado?",
    options: [
      "Libre asociacion",
      "Sufragio",
      "Privacidad y datos personales (cuarta generacion)",
      "Trabajo",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "En la situacion de la empresa de tecnologia, la recopilacion de datos biometricos sin autorizacion vulnera principalmente el derecho a la privacidad y la proteccion de datos personales, ubicados en la cuarta generacion de derechos.",
    topic: "Proteccion de datos biometricos",
  },
  {
    id: 32,
    question:
      "Situacion\n\nUna autoridad municipal en una zona rural de Antioquia emite un decreto que exige a las mujeres usar determinada vestimenta en espacios publicos, fundamentando la medida en tradiciones religiosas de la comunidad. Un grupo de mujeres protesta contra la norma.\n\nPregunta\n\nSegun el documento, ¿que tension ilustra la situacion descrita?",
    options: [
      "Entre derecho penal y civil",
      "Entre enfoques culturales o religiosos y estandares de derechos humanos y dignidad",
      "Entre dos leyes ordinarias",
      "Entre municipios",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En la situacion de las mujeres afectadas, se ilustra la tension entre visiones culturales o religiosas y los estandares universales de dignidad y libertades individuales, que deben prevalecer segun el bloque de constitucionalidad.",
    topic: "Libertad religiosa y dignidad",
  },
  {
    id: 33,
    question:
      "Situacion\n\nEl alcalde de un municipio del oriente antioqueno decreta toque de queda permanente de 6:00 p.m. a 6:00 a.m. alegando problemas de orden publico. La medida restringe severamente la locomocion y el derecho de reunion de los habitantes durante doce horas diarias.\n\nPregunta\n\nEn la situacion descrita, ¿que limite constitucional debe respetar el toque de queda decretado por el alcalde?",
    options: [
      "Ninguno si hay alteracion del orden publico",
      "El nucleo esencial de los derechos limitados",
      "Solo aplicarlo en horario nocturno",
      "Prohibicion de multas",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En el caso del toque de queda, el alcalde debe respetar el nucleo esencial de los derechos de locomocion y reunion. Cualquier limitacion que anule este nucleo esencial se torna inconstitucional, sin importar la justificacion de orden publico.",
    topic: "Limites al poder de policia",
  },
  {
    id: 34,
    question:
      "Situacion\n\nUn juez de Rionegro debe resolver un caso sobre un derecho que no tiene desarrollo legal pero que la Corte Constitucional ha desarrollado ampliamente en su jurisprudencia. El demandado argumenta que sin ley no hay derecho exigible.\n\nPregunta\n\nCon base en la situacion descrita, ¿el precedente de la Corte Constitucional sobre el derecho integra el bloque de constitucionalidad?",
    options: [
      "No, solo cuenta el texto constitucional",
      "Si, la jurisprudencia de la Corte integra el bloque",
      "Solo si la aprueba el Congreso",
      "Solo en materia penal",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En el caso que resuelve el juez, la jurisprudencia de la Corte Constitucional si integra el bloque y sirve como parametro obligatorio de interpretacion y control, por lo que el derecho es exigible aunque no tenga desarrollo legal.",
    topic: "Precedente constitucional",
  },
  {
    id: 35,
    question:
      "Situacion\n\nUna estudiante de una universidad privada en Medellin publica en redes sociales criticas a las directivas de la institucion. La universidad la sanciona con suspension academica argumentando dano a la imagen institucional. La estudiante no encuentra ley que regule especificamente esta situacion.\n\nPregunta\n\nEn la situacion descrita, ¿que caracteristica de los derechos fundamentales permite a la estudiante obtener proteccion sin esperar reglamentacion legal?",
    options: [
      "Principio de oportunidad",
      "Aplicacion inmediata",
      "Legalidad estricta",
      "Cosa juzgada",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En el caso de la estudiante, puede exigir proteccion de su libertad de expresion gracias a la aplicacion inmediata de los derechos fundamentales (art. 85 C.P.), que permite su exigibilidad aun sin desarrollo legal especifico.",
    topic: "Aplicacion inmediata",
  },
  {
    id: 36,
    question:
      "Situacion\n\nUn joven de 14 anos del municipio de La Ceja es rechazado para matricula en un colegio publico porque su familia tiene deudas pendientes de anos anteriores. El rector condiciona el acceso a educacion al pago de la deuda.\n\nPregunta\n\nCon base en la situacion descrita, ¿que generacion de derechos se invoca principalmente al reclamar el acceso a educacion del joven?",
    options: [
      "Segunda (educacion)",
      "Primera",
      "Tercera",
      "Cuarta",
    ],
    correctAnswer: 0,
    points: 5,
    explanation:
      "En la situacion del joven de La Ceja, se invoca el derecho a la educacion como derecho social de segunda generacion, que obliga al Estado a garantizar acceso efectivo, especialmente en educacion basica, sin condicionarlo a pagos.",
    topic: "Derechos sociales",
  },
  {
    id: 37,
    question:
      "Situacion\n\nEl alcalde de un municipio del suroeste antioqueno ordena el cierre inmediato de una emisora comunitaria sin orden judicial previa, argumentando que sus programas son criticos de la administracion municipal y generan malestar en la comunidad.\n\nPregunta\n\nEn la situacion descrita, ¿que derecho fundamental y de que generacion resulta afectado con el cierre de la emisora?",
    options: [
      "Trabajo – segunda",
      "Libertad de expresion – primera",
      "Ambiente – tercera",
      "Datos personales – cuarta",
    ],
    correctAnswer: 1,
    points: 5,
    explanation:
      "En el caso de la emisora comunitaria, el cierre arbitrario sin orden judicial afecta la libertad de expresion, que es un derecho civil y politico propio de la primera generacion, protegido contra la censura oficial.",
    topic: "Libertad de expresion",
  },
  {
    id: 38,
    question:
      "Situacion\n\nUn grupo de congresistas propone una reforma constitucional para reducir el plazo de la accion de tutela de diez a tres dias y eliminar la posibilidad de tutela contra particulares. Organizaciones de derechos humanos advierten sobre los riesgos de esta propuesta.\n\nPregunta\n\nSegun el documento y la situacion descrita, ¿que advierte sobre modificar las garantias de derechos fundamentales como la tutela?",
    options: [
      "Pueden cambiarse por mayoria simple",
      "Basta un decreto legislativo",
      "Requieren procedimientos mas estrictos, con un plus de proteccion",
      "Solo necesita referendo municipal",
    ],
    correctAnswer: 2,
    points: 5,
    explanation:
      "En la situacion planteada, las organizaciones advierten correctamente que los derechos fundamentales y sus garantias como la tutela gozan de especial rigidez constitucional, por lo que su modificacion demanda procedimientos reforzados y un control estricto.",
    topic: "Rigidez constitucional",
  },
]

export function BloqueConstitucionalidadTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const timer = useTestTimer({
    totalQuestions: questions.length,
    timePerQuestion: 120,
    onTimeUp: () => setShowResults(true),
    isActive: !showResults,
  })

  const handleAnswerChange = (questionId: number, optionIndex: number) => {
    if (showResults) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) return
    setShowResults(true)
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
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
      <Tabs defaultValue="resumen" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="indicaciones">Indicaciones</TabsTrigger>
        </TabsList>
        <TabsContent value="resumen">
          <Card className="border bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Bloque de Constitucionalidad en Colombia</CardTitle>
              <CardDescription>
                Preguntas situacionales basadas en los documentos "Nocion de Derechos Fundamentales" y "El Bloque de Constitucionalidad en Colombia".
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Evalua nociones de derechos fundamentales (tutela, generaciones, bloque de convencionalidad, limites a la autoridad) y los fundamentos, clasificacion,
                efectos y casos emblematicos del bloque (convenios OIT, pena perpetua, caso Petro).
              </p>
              <Alert>
                <AlertTitle className="flex items-center gap-2 font-semibold text-sm">
                  <InfoIcon className="h-4 w-4 text-primary" />
                  Puntaje
                </AlertTitle>
                <AlertDescription>
                  Cada pregunta vale 5 puntos. Para enviar debes responder las 38 preguntas.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="indicaciones">
          <Card className="border bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle>Indicaciones</CardTitle>
              <CardDescription>
                Lee el escenario y selecciona la opcion que reproduzca la posicion institucional descrita en el documento.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>El cronometro asigna dos minutos por pregunta.</li>
                <li>Podras revisar la retroalimentacion al finalizar.</li>
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
        const isCorrect = selected === question.correctAnswer
        const showState = showResults && showFeedback

        return (
          <Card
            key={question.id}
            className={`border transition-colors ${
              showState ? (isCorrect ? "border-green-500 bg-green-50/70" : "border-red-400 bg-red-50/70") : "border-border"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-start justify-between gap-4">
                <span>
                  Pregunta {index + 1} · {question.points} pts
                </span>
                {showResults && selected !== undefined && (
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
                disabled={showResults}
              >
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-sm leading-relaxed transition ${
                      showResults
                        ? optionIndex === question.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : selected === optionIndex
                          ? "border-red-400 bg-red-50"
                          : "border-border"
                        : "border-border hover:bg-muted/60"
                    }`}
                  >
                    <RadioGroupItem value={optionIndex.toString()} id={`bloque-q-${question.id}-opt-${optionIndex}`} className="mt-1" />
                    <Label htmlFor={`bloque-q-${question.id}-opt-${optionIndex}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {showResults && showFeedback && (
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
            Enviar respuestas
          </Button>
        ) : (
          <>
            <Button onClick={() => setShowFeedback((prev) => !prev)} variant="outline" className="min-w-[200px]">
              {showFeedback ? "Ocultar retroalimentacion" : "Mostrar retroalimentacion"}
            </Button>
            <Button onClick={handleReset} variant="secondary" className="min-w-[200px]">
              Reiniciar prueba
            </Button>
          </>
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
