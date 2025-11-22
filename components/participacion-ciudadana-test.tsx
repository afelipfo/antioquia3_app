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

export const participacionCiudadanaQuestions: Question[] = [
  {
    id: 1,
    question:
      "Situacion\n\nUn colectivo barrial del municipio de Envigado desea incidir en la formulacion del plan de intervencion del parque principal. Organizan una asamblea comunitaria para definir su estrategia de participacion y presentar propuestas concretas ante la administracion municipal.\n\nPregunta\n\nCon base en la situacion descrita, ¿como se define esta accion segun la normativa de participacion ciudadana?",
    options: [
      "Lobby privado ante concejales",
      "Accion individual o colectiva que incide en programas y proyectos publicos",
      "Proselitismo partidista",
      "Accion judicial obligatoria",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el colectivo barrial realiza una accion colectiva para incidir en decisiones publicas sobre el parque. La participacion ciudadana se define precisamente como la accion individual o colectiva que busca incidir en programas y proyectos publicos.",
    topic: "Concepto",
  },
  {
    id: 2,
    question:
      "Situacion\n\nDurante un foro municipal sobre participacion democratica en el municipio de Rionegro, el moderador recuerda a los asistentes que el Estado colombiano tiene como fin esencial facilitar la participacion de todos en las decisiones que los afectan. Un asistente pregunta cual es el fundamento constitucional de esta afirmacion.\n\nPregunta\n\nSegun la situacion planteada, ¿que articulo constitucional soporta el deber del Estado de facilitar la participacion ciudadana?",
    options: ["Art. 258 C.P.", "Art. 2 C.P.", "Art. 34 C.P.", "Art. 95 C.P."],
    correctAnswer: 1,
    points: 5,
    explanation: "En el foro descrito, el fundamento constitucional correcto es el articulo 2 de la Constitucion Politica, que establece como fin esencial del Estado facilitar la participacion de todos en las decisiones que los afectan en la vida economica, politica, administrativa y cultural de la Nacion.",
    topic: "Fundamento constitucional",
  },
  {
    id: 3,
    question:
      "Situacion\n\nUna veeduria ciudadana del municipio de Bello solicita a la administracion municipal que se organicen formas efectivas para vigilar la gestion publica local. Durante la reunion con el secretario de gobierno, los veedores preguntan cual es el sustento constitucional de su solicitud.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que articulo constitucional invocan los veedores para sustentar su solicitud?",
    options: ["Art. 270 C.P.", "Art. 322 C.P.", "Art. 374 C.P.", "Art. 155 C.P."],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion planteada, los veedores deben invocar el articulo 270 de la Constitucion Politica, que ordena que la ley organice las formas y los sistemas de participacion ciudadana que permitan vigilar la gestion publica en los distintos niveles administrativos.",
    topic: "Fundamento constitucional",
  },
  {
    id: 4,
    question:
      "Situacion\n\nLa Secretaria de Gobierno de Medellin organiza una jornada de capacitacion para lideres comunitarios sobre los diferentes mecanismos de participacion democratica. Los capacitadores necesitan identificar la norma principal que compila estos mecanismos para estructurar el contenido del taller.\n\nPregunta\n\nSegun la situacion descrita, ¿que ley deben utilizar los capacitadores como referencia principal sobre mecanismos de participacion ciudadana?",
    options: ["Ley 850 de 2003", "Ley 134 de 1994", "Ley 393 de 1997", "Ley 472 de 1998"],
    correctAnswer: 1,
    points: 5,
    explanation: "Para la jornada de capacitacion descrita, los capacitadores deben utilizar la Ley 134 de 1994, que es la ley estatutaria de mecanismos de participacion ciudadana y compila los principales instrumentos de participacion democratica en Colombia.",
    topic: "Marco legal",
  },
  {
    id: 5,
    question:
      "Situacion\n\nUn colectivo juvenil de Itagui decide conformarse como veeduria ciudadana para hacer control social a un contrato de construccion de canchas deportivas en su comuna. Necesitan conocer la normativa especifica que regula la conformacion y funcionamiento de las veedurias.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que ley reglamenta las veedurias ciudadanas que el colectivo juvenil debe consultar?",
    options: ["Ley 134 de 1994", "Ley 850 de 2003", "Ley 472 de 1998", "Ley 1757 de 2015"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el colectivo juvenil debe consultar la Ley 850 de 2003, que regula la organizacion, funcionamiento y requisitos para la constitucion de veedurias ciudadanas como mecanismo de control social.",
    topic: "Veedurias",
  },
  {
    id: 6,
    question:
      "Situacion\n\nLos habitantes de un barrio cercano al rio Aburra deciden interponer una accion judicial por los danos ambientales colectivos causados por una empresa que vierte residuos industriales sin tratamiento. Un abogado comunitario los asesora sobre la normativa aplicable.\n\nPregunta\n\nSegun la situacion descrita, ¿que ley desarrolla las acciones populares y de grupo que los habitantes pueden utilizar?",
    options: ["Ley 472 de 1998", "Ley 393 de 1997", "Ley 850 de 2003", "Ley 1885 de 2018"],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion planteada, los habitantes deben fundamentar su accion en la Ley 472 de 1998, que regula las acciones populares para la proteccion de derechos e intereses colectivos, como el medio ambiente sano.",
    topic: "Acciones judiciales",
  },
  {
    id: 7,
    question:
      "Situacion\n\nUn ciudadano de Sabaneta descubre que la administracion municipal no esta cumpliendo con una ley vigente que obliga a destinar un porcentaje del presupuesto para programas de adultos mayores. Decide acudir a los mecanismos legales para exigir el cumplimiento de esta norma.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que ley regula el mecanismo que el ciudadano debe utilizar para exigir el cumplimiento de la norma omitida?",
    options: ["Ley 472 de 1998", "Ley 393 de 1997", "Ley 1757 de 2015", "Ley 134 de 1994"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el ciudadano debe utilizar la accion de cumplimiento regulada por la Ley 393 de 1997, que permite a cualquier persona exigir ante la autoridad judicial el cumplimiento de una ley o acto administrativo.",
    topic: "Accion de cumplimiento",
  },
  {
    id: 8,
    question:
      "Situacion\n\nLa Alcaldia de La Estrella lanza una estrategia institucional de promocion del derecho a participar en la vida politica y administrativa del municipio. El equipo juridico necesita identificar la ley que soporta esta politica publica de promocion de derechos.\n\nPregunta\n\nSegun la situacion planteada, ¿que ley soporta la estrategia de promocion del derecho a la participacion que implementa la alcaldia?",
    options: ["Ley 1885 de 2018", "Ley 134 de 1994", "Ley 1757 de 2015", "Ley 850 de 2003"],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, la alcaldia debe fundamentar su estrategia en la Ley 1757 de 2015, que es la ley estatutaria que desarrolla integralmente el derecho a la participacion democratica y establece mecanismos para su promocion.",
    topic: "Promocion de derechos",
  },
  {
    id: 9,
    question:
      "Situacion\n\nEl Consejo de Juventud del municipio de Copacabana desea ejercer control social al plan de desarrollo juvenil municipal. Los consejeros se reunen para identificar la norma que les reconoce esta funcion de veeduria sobre politicas de juventud.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que norma reconoce la funcion de control social que desean ejercer los miembros del Consejo de Juventud?",
    options: ["Ley 1885 de 2018", "Ley 472 de 1998", "Ley 393 de 1997", "Ley 850 de 2003"],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion planteada, el Consejo de Juventud debe invocar la Ley 1885 de 2018 (que modifica la Ley 1622), la cual otorga a los Consejos de Juventud facultades de veeduria y control social sobre las politicas publicas de juventud.",
    topic: "Juventud",
  },
  {
    id: 10,
    question:
      "Situacion\n\nUna organizacion comunitaria del oriente antioqueno descubre irregularidades en el manejo de los recursos publicos destinados a la construccion de un acueducto veredal. Los lideres se reunen para determinar ante cual organo de control deben presentar la denuncia.\n\nPregunta\n\nSegun la situacion descrita, ¿ante cual organo de control debe presentar la denuncia la organizacion comunitaria?",
    options: ["Personeria", "Contraloria", "Defensoria", "Registraduria"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, la organizacion debe presentar su denuncia ante la Contraloria, que es el organo encargado de ejercer el control fiscal sobre el manejo de los recursos publicos y detectar irregularidades en su ejecucion.",
    topic: "Organos de control",
  },
  {
    id: 11,
    question:
      "Situacion\n\nUn grupo de ciudadanos de Apartado reporta simultaneamente una falta disciplinaria de un funcionario publico y la vulneracion de derechos fundamentales de una comunidad indigena. Necesitan identificar las entidades competentes para cada tipo de queja.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que dupla de entidades es competente para tramitar la falta disciplinaria y la vulneracion de derechos respectivamente?",
    options: ["Contraloria y Registraduria", "Procuraduria y Defensoria", "Personeria y DANE", "Congreso y Corte"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, la Procuraduria es competente para investigar la falta disciplinaria del funcionario, mientras que la Defensoria del Pueblo es la entidad encargada de proteger los derechos humanos de la comunidad indigena afectada.",
    topic: "Organos de control",
  },
  {
    id: 12,
    question:
      "Situacion\n\nLa Registraduria municipal de Caldas lanza una campana institucional recordando a los ciudadanos que votar es tanto un derecho como un deber constitucional. Un estudiante de derecho pregunta cual es el fundamento constitucional de esta afirmacion.\n\nPregunta\n\nSegun la situacion descrita, ¿que articulo constitucional respalda la afirmacion de que votar es un derecho y un deber?",
    options: ["Art. 270 C.P.", "Art. 258 C.P.", "Art. 374 C.P.", "Art. 319 C.P."],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el fundamento constitucional es el articulo 258 de la Constitucion Politica, que consagra expresamente el voto como un derecho y un deber de todo ciudadano colombiano.",
    topic: "Voto",
  },
  {
    id: 13,
    question:
      "Situacion\n\nDurante una clase de educacion civica en un colegio de Turbo, la profesora explica que mediante el voto los ciudadanos eligen a sus autoridades publicas. Un estudiante pregunta cuales son todas las autoridades que se eligen por voto popular en Colombia.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cual listado incluye correctamente las autoridades elegidas mediante el voto?",
    options: [
      "Presidente, procurador, registrador",
      "Presidente, congresistas, gobernadores, diputados, alcaldes y concejales",
      "Magistrados y contralores",
      "Personeros y defensores",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, la respuesta correcta incluye todas las autoridades de eleccion popular: Presidente, congresistas (senadores y representantes), gobernadores, diputados, alcaldes y concejales, tanto a nivel nacional como territorial.",
    topic: "Voto",
  },
  {
    id: 14,
    question:
      "Situacion\n\nUn equipo de investigadores de la Universidad de Antioquia realiza un diagnostico sobre participacion electoral en el departamento. Los resultados muestran que la desconfianza en las instituciones es la principal causa de la alta abstencion en los comicios locales.\n\nPregunta\n\nSegun la situacion descrita, ¿que riesgo principal genera la desconfianza y abstencion masiva identificada en el diagnostico?",
    options: [
      "Fortalece legitimidad",
      "Afecta legitimidad electoral y representatividad",
      "Sin efectos",
      "Solo impacto presupuestal",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el diagnostico revela que la desconfianza y la abstencion masiva afectan directamente la legitimidad del proceso electoral y la representatividad de las autoridades elegidas, debilitando la democracia.",
    topic: "Participacion electoral",
  },
  {
    id: 15,
    question:
      "Situacion\n\nUn comite ciudadano del municipio de Girardota reune las firmas necesarias para presentar un proyecto de acuerdo ante el Concejo Municipal que busca crear un programa de subsidios de transporte para estudiantes de bajos recursos.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que mecanismo de participacion ciudadana activa el comite al presentar el proyecto de acuerdo?",
    options: ["Referendo", "Consulta popular", "Iniciativa popular", "Plebiscito"],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion planteada, el comite ciudadano activa la iniciativa popular legislativa o normativa, que es el mecanismo mediante el cual los ciudadanos presentan proyectos de ley o de acuerdo ante las corporaciones publicas.",
    topic: "Iniciativa popular",
  },
  {
    id: 16,
    question:
      "Situacion\n\nEl comite promotor de una iniciativa popular en el municipio de Barbosa planifica la estrategia de recoleccion de apoyos ciudadanos para su proyecto de acuerdo. Necesitan calcular cuantas firmas deben reunir segun el censo electoral del municipio.\n\nPregunta\n\nSegun la situacion descrita, ¿que porcentaje del censo electoral debe reunir el comite para respaldar la iniciativa popular?",
    options: ["2 %", "5 %", "10 %", "30 %"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el comite promotor debe reunir firmas equivalentes al menos al 5% del censo electoral del municipio para que la iniciativa popular cumpla con los requisitos legales de respaldo ciudadano.",
    topic: "Iniciativa popular",
  },
  {
    id: 17,
    question:
      "Situacion\n\nDespues de verificar que el comite promotor de Sonson recolecto los apoyos suficientes para su iniciativa popular, ahora necesitan obtener la certificacion oficial para poder radicar formalmente el proyecto ante el Concejo Municipal.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿quien expide la certificacion de cumplimiento de apoyos para la iniciativa popular?",
    options: ["Consejo Nacional Electoral", "Registrador Nacional", "Procuraduria", "Contraloria"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el comite debe solicitar la certificacion al Registrador Nacional del Estado Civil, quien es la autoridad competente para certificar el cumplimiento de los requisitos de apoyos en las iniciativas populares.",
    topic: "Iniciativa popular",
  },
  {
    id: 18,
    question:
      "Situacion\n\nLa administracion municipal de Carmen de Viboral pretende someter a decision de la ciudadania una pregunta sobre la prohibicion de vehiculos de carga pesada en el centro historico. El equipo juridico necesita determinar quien tiene la competencia para convocar esta votacion.\n\nPregunta\n\nSegun la situacion descrita, ¿quien tiene la competencia para convocar la consulta popular municipal?",
    options: ["Personero", "Congreso", "Presidente, gobernador o alcalde", "Registrador"],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion planteada, la consulta popular municipal debe ser convocada por el Alcalde, ya que segun el nivel territorial, la convocatoria corresponde al Presidente (nacional), al Gobernador (departamental) o al Alcalde (municipal).",
    topic: "Consulta popular",
  },
  {
    id: 19,
    question:
      "Situacion\n\nUn grupo de congresistas presenta un proyecto de ley para crear un nuevo departamento en la region del Pacifico colombiano a partir de varios municipios del Choco y Valle del Cauca. El ponente estudia los requisitos constitucionales para este tramite.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que mecanismo de participacion ciudadana es obligatorio para la creacion del nuevo departamento?",
    options: ["Plebiscito", "Referendo", "Consulta popular", "Cabildo abierto"],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion planteada, el articulo 297 de la Constitucion exige que la creacion de nuevos departamentos o la modificacion de limites departamentales sea sometida obligatoriamente a consulta popular en los territorios afectados.",
    topic: "Consulta popular",
  },
  {
    id: 20,
    question:
      "Situacion\n\nEl Concejo Municipal de Guarne estudia una propuesta para que el municipio se vincule al Area Metropolitana del Valle de Aburra. Los concejales revisan los requisitos constitucionales que deben cumplirse antes de aprobar la vinculacion.\n\nPregunta\n\nSegun la situacion descrita, ¿que mecanismo exige la Constitucion para que Guarne pueda vincularse al area metropolitana?",
    options: ["Cabildo abierto", "Consulta popular", "Plebiscito", "Iniciativa popular"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el articulo 319 de la Constitucion establece que la vinculacion de un municipio a un area metropolitana debe ser aprobada mediante consulta popular en el municipio que desea integrarse.",
    topic: "Consulta popular",
  },
  {
    id: 21,
    question:
      "Situacion\n\nUn movimiento ciudadano de Medellin propone que los habitantes de la ciudad aprueben o deroguen mediante votacion una norma municipal sobre el cobro de valorizacion. Los organizadores necesitan identificar el mecanismo adecuado para este proposito.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que mecanismo de participacion corresponde para aprobar o derogar la norma mediante voto popular?",
    options: ["Referendo", "Plebiscito", "Cabildo abierto", "Iniciativa popular"],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion planteada, el mecanismo adecuado es el referendo, que permite a los ciudadanos aprobar o derogar normas juridicas mediante votacion popular directa.",
    topic: "Referendo",
  },
  {
    id: 22,
    question:
      "Situacion\n\nEn el ano 2018, los ciudadanos colombianos fueron convocados a votar un paquete de siete medidas anticorrupcion que incluian propuestas como reducir salarios de congresistas y establecer pliegos tipo para contratacion publica.\n\nPregunta\n\nSegun la situacion descrita, ¿que mecanismo de participacion ciudadana se utilizo para someter a votacion las medidas anticorrupcion?",
    options: ["Plebiscito", "Referendo", "Consulta obligatoria", "Revocatoria"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el mecanismo utilizado fue el referendo aprobatorio, conocido popularmente como 'referendo anticorrupcion', mediante el cual los ciudadanos votaron para aprobar un conjunto de reformas normativas.",
    topic: "Referendo",
  },
  {
    id: 23,
    question:
      "Situacion\n\nEn octubre de 2016, los colombianos fueron convocados a las urnas para decidir si respaldaban o rechazaban el Acuerdo Final de Paz negociado entre el Gobierno Nacional y las FARC-EP en La Habana. El mecanismo fue convocado directamente por el Presidente de la Republica.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que rasgo define el mecanismo de participacion utilizado para la refrendacion del Acuerdo de Paz?",
    options: [
      "Lo convoca cualquier autoridad",
      "Lo convoca el Presidente para apoyar o rechazar una decision del Ejecutivo",
      "Es para derogar leyes",
      "Es para crear municipios",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el plebiscito es el mecanismo que se caracteriza porque es convocado exclusivamente por el Presidente de la Republica para que los ciudadanos apoyen o rechacen una decision del Ejecutivo.",
    topic: "Plebiscito",
  },
  {
    id: 24,
    question:
      "Situacion\n\nUn profesor de ciencias politicas analiza con sus estudiantes los resultados del plebiscito por la paz de 2016. Los datos muestran que hubo 12,7 millones de votos, el 'No' gano con el 50,21% frente al 49,79% del 'Si', y la abstencion fue del 62,57%.\n\nPregunta\n\nSegun la situacion descrita y los datos presentados, ¿cual afirmacion es correcta sobre los resultados del plebiscito?",
    options: [
      "Gano el 'Si'",
      "Votaron menos de 5 millones",
      "El 'No' gano por estrecho margen y hubo 62,57 % de abstencion",
      "La abstencion fue menor al 20 %",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion planteada, los datos confirman que el 'No' gano por un margen muy estrecho (0,42 puntos porcentuales) y que la abstencion fue muy alta, alcanzando el 62,57% del censo electoral.",
    topic: "Plebiscito",
  },
  {
    id: 25,
    question:
      "Situacion\n\nEl Concejo Municipal de Necocli convoca a los habitantes del municipio a una reunion publica para debatir la distribucion del presupuesto local y escuchar las prioridades de inversion de las diferentes comunidades antes de aprobar el plan de desarrollo.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que mecanismo de participacion ciudadana emplea el Concejo al convocar esta reunion publica?",
    options: ["Consulta popular", "Plebiscito", "Cabildo abierto", "Revocatoria"],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion planteada, el Concejo emplea el cabildo abierto, que es la reunion publica de los concejos municipales o distritales en la cual los habitantes pueden participar directamente para discutir asuntos de interes comunitario.",
    topic: "Cabildo abierto",
  },
  {
    id: 26,
    question:
      "Situacion\n\nUn comite ciudadano de Caucasia, insatisfecho con la gestion del mandatario local, evalua la posibilidad de activar un mecanismo para retirar del cargo a un funcionario elegido popularmente. Necesitan verificar a cuales autoridades aplica este mecanismo.\n\nPregunta\n\nSegun la situacion descrita, ¿a cuales autoridades elegidas popularmente se les puede aplicar la revocatoria del mandato?",
    options: ["Presidente y congresistas", "Diputados y concejales", "Alcaldes y gobernadores", "Magistrados"],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion planteada, el comite debe saber que la revocatoria del mandato en Colombia aplica unicamente a alcaldes y gobernadores, no a otras autoridades de eleccion popular como congresistas, diputados o concejales.",
    topic: "Revocatoria",
  },
  {
    id: 27,
    question:
      "Situacion\n\nUn grupo de ciudadanos de Puerto Berrio quiere iniciar el proceso de revocatoria del mandato del alcalde que se posesiono hace apenas tres meses. Consultan con un abogado sobre la viabilidad temporal de su solicitud.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cuando procede la revocatoria del mandato segun la normativa vigente?",
    options: ["Desde la posesion", "Luego de un ano", "Solo en el ultimo ano", "Solo si hay sancion penal"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion planteada, el abogado debe informar a los ciudadanos que la revocatoria no procede a los tres meses porque debe transcurrir al menos un ano desde la posesion del mandatario para poder activar este mecanismo.",
    topic: "Revocatoria",
  },
  {
    id: 28,
    question:
      "Situacion\n\nEl comite promotor de la revocatoria del gobernador de Antioquia se reune para planificar la recoleccion de apoyos. Necesitan conocer cuantos apoyos deben reunir y ante que entidad deben tramitar formalmente la solicitud de revocatoria.\n\nPregunta\n\nSegun la situacion descrita, ¿cual es la cantidad de apoyos requerida y ante que entidad se tramita la revocatoria del mandato?",
    options: [
      "10 % de votos validos; Personeria",
      "5 % del censo; Concejo",
      "30 % de los votos validos de la eleccion; Registraduria",
      "2 % del censo; Defensoria",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion planteada, el comite debe reunir apoyos equivalentes al 30% de los votos validos obtenidos en la eleccion del gobernador, y el tramite formal de la revocatoria se realiza ante la Registraduria Nacional del Estado Civil.",
    topic: "Revocatoria",
  },
]

export function ParticipacionCiudadanaTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = participacionCiudadanaQuestions

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
      <Tabs defaultValue="resumen">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="indicaciones">Indicaciones</TabsTrigger>
        </TabsList>
        <TabsContent value="resumen">
          <Card className="border bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle>Mecanismos de Participacion Ciudadana</CardTitle>
              <CardDescription>
                Cuestionario basado en el documento "Los mecanismos de participacion ciudadana 2025".
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Repasa fundamentos constitucionales, leyes, organos de control y mecanismos como iniciativa, consulta, referendo, cabildo y
                revocatoria.
              </p>
              <Alert>
                <AlertTitle className="flex items-center gap-2 text-sm font-semibold">
                  <InfoIcon className="h-4 w-4 text-primary" />
                  Puntaje
                </AlertTitle>
                <AlertDescription>Cada pregunta vale 5 puntos. Debes responder las 28 para enviar.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="indicaciones">
          <Card className="border bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle>Indicaciones de uso</CardTitle>
              <CardDescription>Lee la situacion, analiza el contexto y selecciona la opcion mas adecuada.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>Temporizador: 2 minutos por pregunta.</li>
                <li>Puedes revisar la retroalimentacion al finalizar.</li>
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
                    <RadioGroupItem value={optionIndex.toString()} id={`participacion-q-${question.id}-option-${optionIndex}`} className="mt-1" />
                    <Label htmlFor={`participacion-q-${question.id}-option-${optionIndex}`} className="flex-1 cursor-pointer">
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
