"use client"

import { useState, useMemo } from "react"
import { CheckCircle2, Info, RefreshCw, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTestTimer } from "@/hooks/use-test-timer"
import { TestTimer } from "@/components/test-timer"

type Question = {
  id: number
  scenario?: string
  question: string
  options: { id: string; text: string }[]
  correct: string
  explanation: string
  points: number
}

export const questionsV1: Question[] = [
  // Pregunta 1
  {
    id: 1,
    question: "Situacion\n\nUn funcionario de atencion al publico en una oficina gubernamental recibe a un ciudadano muy molesto porque su tramite ha sido rechazado varias veces. El ciudadano levanta la voz y exige hablar con un superior inmediatamente.\n\nPregunta\n\nCon base en la situacion descrita, ¿que deberia hacer el funcionario?",
    options: [
      { id: "a", text: "Ignorar al ciudadano y continuar con su trabajo." },
      { id: "b", text: "Llamar inmediatamente a un superior para que se encargue de la situacion." },
      { id: "c", text: "Escuchar al ciudadano con calma, explicarle las razones del rechazo y ofrecerle ayuda para resolver el problema." },
      { id: "d", text: "Pedirle al ciudadano que se calme y que vuelva otro dia cuando este mas tranquilo." },
    ],
    correct: "c",
    explanation: "En la situacion descrita, la mejor practica en atencion al ciudadano es escuchar con calma, explicar las razones del rechazo y ofrecer ayuda para resolver el problema. Esto demuestra empatia, profesionalismo y orientacion al servicio, permitiendo calmar al ciudadano molesto mientras se busca una solucion efectiva.",
    points: 5,
  },
  // Pregunta 2
  {
    id: 2,
    question: "Situacion\n\nEres supervisor en una oficina de registro civil. Uno de tus empleados ha llegado tarde repetidamente durante las ultimas dos semanas y su rendimiento ha disminuido notablemente. Otros empleados del equipo han comenzado a quejarse de la situacion.\n\nPregunta\n\nCon base en la situacion descrita, ¿como abordarias esta situacion con el empleado?",
    options: [
      { id: "a", text: "Ignorar el problema y esperar que se resuelva solo." },
      { id: "b", text: "Reganar al empleado frente a sus companeros para que sirva de ejemplo." },
      { id: "c", text: "Hablar en privado con el empleado para entender las razones de su comportamiento y buscar una solucion conjunta." },
      { id: "d", text: "Informar al departamento de recursos humanos para que tomen medidas disciplinarias." },
    ],
    correct: "c",
    explanation: "En la situacion descrita, hablar en privado con el empleado demuestra respeto por su dignidad, permite entender las causas del problema (que podrian ser personales o laborales) y buscar soluciones constructivas. Es la mejor practica de gestion de personas antes de escalar a medidas disciplinarias.",
    points: 5,
  },
  // Pregunta 3
  {
    id: 3,
    question: "Situacion\n\nEstas a cargo de un proyecto importante con plazo de entrega en dos semanas. Un miembro clave del equipo solicita una semana de licencia por motivos personales urgentes, lo cual podria comprometer el cronograma establecido.\n\nPregunta\n\nCon base en la situacion descrita, ¿que harias para manejar esta solicitud?",
    options: [
      { id: "a", text: "Negar la solicitud de licencia y exigir que el miembro se quede para cumplir con el plazo." },
      { id: "b", text: "Aceptar la solicitud de licencia sin ajustar el plan del proyecto." },
      { id: "c", text: "Aceptar la solicitud de licencia y redistribuir las tareas entre los demas miembros para asegurar que el proyecto se complete a tiempo." },
      { id: "d", text: "Pedir al miembro del equipo que trabaje desde casa durante su licencia." },
    ],
    correct: "c",
    explanation: "En la situacion descrita, aceptar la licencia y redistribuir tareas demuestra flexibilidad, respeto por el bienestar del equipo y capacidad de adaptacion para cumplir objetivos. Equilibra las necesidades personales del empleado con las responsabilidades del proyecto.",
    points: 5,
  },
  // Pregunta 4
  {
    id: 4,
    question: "Situacion\n\nEres responsable de implementar un nuevo sistema de gestion documental en tu dependencia. Despues de la capacitacion inicial, observas que varios empleados se resisten al cambio y continuan utilizando el sistema antiguo, alegando que es mas facil de usar.\n\nPregunta\n\nCon base en la situacion descrita, ¿como manejarias esta resistencia al cambio?",
    options: [
      { id: "a", text: "Ignorar a los empleados que se resisten y seguir adelante con la implementacion." },
      { id: "b", text: "Forzar a los empleados a usar el nuevo sistema bajo amenaza de sanciones." },
      { id: "c", text: "Organizar sesiones de capacitacion adicionales y explicar los beneficios del nuevo sistema para obtener su aceptacion." },
      { id: "d", text: "Permitir que los empleados elijan que sistema quieren usar." },
    ],
    correct: "c",
    explanation: "En la situacion descrita, organizar capacitaciones adicionales y explicar beneficios es la mejor estrategia para gestionar la resistencia al cambio. Esto genera comprension del valor del nuevo sistema y facilita la aceptacion gradual por parte de los empleados.",
    points: 5,
  },
  // Pregunta 5
  {
    id: 5,
    question: "Situacion\n\nUn ciudadano presenta una queja formal en tu oficina sobre el comportamiento de uno de tus colegas, alegando que recibio trato irrespetuoso y comentarios discriminatorios durante la atencion de su tramite la semana pasada.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual seria tu curso de accion mas apropiado?",
    options: [
      { id: "a", text: "Ignorar la queja y continuar con tus tareas." },
      { id: "b", text: "Informar inmediatamente a tu superior y solicitar una investigacion interna." },
      { id: "c", text: "Hablar directamente con el colega acusado para escuchar su version de los hechos." },
      { id: "d", text: "Pedir al ciudadano que retire la queja para evitar problemas." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, ante una queja formal por trato irrespetuoso o discriminatorio, el protocolo correcto es informar al superior y solicitar una investigacion formal. Esto garantiza imparcialidad en el proceso y protege tanto al ciudadano como a la institucion.",
    points: 5,
  },
  // Pregunta 6 - Desarrollo sostenible
  {
    id: 6,
    question: "Situacion\n\nTe encuentras en una reunion de planeacion donde se discute la asignacion de recursos para el proximo ano. Varios funcionarios proponen proyectos que priorizan el crecimiento economico inmediato, mientras otros insisten en la proteccion ambiental estricta.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es el objetivo principal que deberia guiar las decisiones de desarrollo sostenible?",
    options: [
      { id: "a", text: "Incrementar el crecimiento economico." },
      { id: "b", text: "Satisfacer las necesidades del presente sin comprometer el futuro." },
      { id: "c", text: "Proteger el medio ambiente a cualquier costo." },
      { id: "d", text: "Aumentar la inclusion social." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, el desarrollo sostenible busca satisfacer las necesidades del presente sin comprometer la capacidad de las futuras generaciones. Esto requiere equilibrar crecimiento economico, inclusion social y proteccion ambiental en la toma de decisiones.",
    points: 5,
  },
  // Pregunta 7
  {
    id: 7,
    question: "Situacion\n\nEres asesor de politicas publicas y debes presentar la importancia del desarrollo sostenible a un grupo de empresarios que estan preocupados por los costos adicionales que implican las practicas sostenibles para sus negocios.\n\nPregunta\n\nCon base en la situacion descrita, ¿como explicarias la relevancia del desarrollo sostenible a este grupo?",
    options: [
      { id: "a", text: "Enfatizando solo los beneficios economicos." },
      { id: "b", text: "Mostrando como la sostenibilidad puede mejorar la reputacion y atraer inversiones." },
      { id: "c", text: "Ignorando las preocupaciones ambientales." },
      { id: "d", text: "Focalizandote unicamente en la inclusion social." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, mostrar como la sostenibilidad mejora la reputacion corporativa y atrae inversiones responsables conecta los valores ambientales con los intereses empresariales de forma estrategica y convincente.",
    points: 5,
  },
  // Pregunta 8 - Tecnologia y redes sociales
  {
    id: 8,
    question: "Situacion\n\nEn una capacitacion sobre transformacion digital para funcionarios publicos, surge un debate sobre los efectos de la tecnologia en la sociedad actual. Algunos participantes cuestionan si realmente ha generado beneficios significativos.\n\nPregunta\n\nCon base en la situacion descrita, segun los avances del siglo XXI, ¿que ha permitido principalmente la tecnologia?",
    options: [
      { id: "a", text: "Una desconexion global." },
      { id: "b", text: "Una conexion instantanea y global." },
      { id: "c", text: "Una mejora en la privacidad." },
      { id: "d", text: "Una reduccion en la seguridad." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, es importante reconocer que la tecnologia ha permitido una conexion instantanea y global, transformando la forma en que nos comunicamos y accedemos a informacion, aunque presenta desafios de privacidad y seguridad que deben gestionarse.",
    points: 5,
  },
  // Pregunta 9
  {
    id: 9,
    question: "Situacion\n\nEres experto en ciberseguridad y has sido invitado a dar una charla a estudiantes de secundaria sobre el uso seguro de redes sociales. Los jovenes son usuarios activos pero desconocen los riesgos asociados.\n\nPregunta\n\nCon base en la situacion descrita, ¿como abordarias los desafios de privacidad y seguridad en tu presentacion?",
    options: [
      { id: "a", text: "Minimizando los riesgos." },
      { id: "b", text: "Enfatizando la importancia de la privacidad y ofreciendo consejos practicos." },
      { id: "c", text: "Ignorando los problemas de seguridad." },
      { id: "d", text: "Focalizandote solo en los aspectos positivos de las redes sociales." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, enfatizar la importancia de la privacidad y ofrecer consejos practicos es la mejor forma de educar a los jovenes sobre ciberseguridad de manera efectiva y util, empoderándolos para protegerse.",
    points: 5,
  },
  // Pregunta 10 - Cambio climatico
  {
    id: 10,
    question: "Situacion\n\nDurante una reunion de planeacion territorial, se discuten los riesgos ambientales que enfrenta la region. Algunos funcionarios minimizan los efectos del cambio climatico argumentando que son exagerados por los medios.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es uno de los efectos documentados del cambio climatico que deberia considerarse?",
    options: [
      { id: "a", text: "La reduccion de las temperaturas globales." },
      { id: "b", text: "El aumento de las temperaturas globales." },
      { id: "c", text: "La estabilidad de los glaciares." },
      { id: "d", text: "La disminucion de fenomenos meteorologicos extremos." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, es fundamental reconocer que el cambio climatico causa el aumento de las temperaturas globales, el derretimiento de glaciares y mayor frecuencia de fenomenos meteorologicos extremos. Esta evidencia cientifica debe guiar la planeacion territorial.",
    points: 5,
  },
  // Pregunta 11
  {
    id: 11,
    question: "Situacion\n\nEres cientifico ambiental y debes presentar un informe sobre cambio climatico a un grupo de politicos que tienen agendas diversas. Algunos son escepticos sobre la urgencia del tema y otros lo consideran prioritario.\n\nPregunta\n\nCon base en la situacion descrita, ¿como destacarias la urgencia de abordar el cambio climatico de manera efectiva?",
    options: [
      { id: "a", text: "Presentando datos alarmantes sin soluciones." },
      { id: "b", text: "Ofreciendo datos claros y proponiendo medidas concretas." },
      { id: "c", text: "Ignorando las evidencias cientificas." },
      { id: "d", text: "Focalizandote solo en los aspectos economicos." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, ofrecer datos claros respaldados cientificamente y proponer medidas concretas y viables es la forma mas efectiva de comunicar la urgencia del cambio climatico a tomadores de decisiones con diferentes perspectivas.",
    points: 5,
  },
  // Pregunta 12 - Biodiversidad
  {
    id: 12,
    question: "Situacion\n\nEn una mesa de trabajo sobre ordenamiento territorial, un contratista propone un proyecto de desarrollo que afectaria un ecosistema local con especies endemicas. Argumenta que el progreso economico es mas importante.\n\nPregunta\n\nCon base en la situacion descrita, ¿por que es esencial considerar la biodiversidad en estas decisiones?",
    options: [
      { id: "a", text: "Para el desarrollo tecnologico." },
      { id: "b", text: "Para el equilibrio de los ecosistemas." },
      { id: "c", text: "Para la urbanizacion." },
      { id: "d", text: "Para la globalizacion." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, la biodiversidad es esencial para el equilibrio de los ecosistemas. La perdida de especies puede afectar negativamente el medio ambiente, la economia local y la salud humana, por lo que debe considerarse en proyectos de desarrollo.",
    points: 5,
  },
  // Pregunta 13
  {
    id: 13,
    question: "Situacion\n\nEres biologo y has sido invitado a explicar la importancia de la biodiversidad a un publico general en un evento comunitario. Los asistentes no tienen formacion cientifica pero estan interesados en temas ambientales.\n\nPregunta\n\nCon base en la situacion descrita, ¿que enfoque usarias para comunicar este tema efectivamente?",
    options: [
      { id: "a", text: "Usar terminos tecnicos sin explicacion." },
      { id: "b", text: "Utilizar ejemplos concretos y accesibles." },
      { id: "c", text: "Ignorar la relacion con la economia y la salud." },
      { id: "d", text: "Focalizarse solo en los aspectos cientificos." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, utilizar ejemplos concretos y accesibles, como servicios ecosistemicos locales o especies conocidas, es la mejor forma de comunicar conceptos cientificos complejos a un publico general sin formacion tecnica.",
    points: 5,
  },
  // Pregunta 14 - Derecho a la educacion
  {
    id: 14,
    question: "Situacion\n\nEn una reunion sobre politicas educativas, algunos participantes sugieren que la educacion deberia priorizarse solo para quienes puedan pagarla, argumentando que los recursos publicos son limitados.\n\nPregunta\n\nCon base en la situacion descrita, ¿que se afirma sobre la naturaleza de la educacion en el marco de derechos?",
    options: [
      { id: "a", text: "Es un privilegio." },
      { id: "b", text: "Es un derecho fundamental." },
      { id: "c", text: "Es un lujo." },
      { id: "d", text: "Es una opcion." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, es fundamental recordar que la educacion es un derecho fundamental que debe ser accesible para todos, independientemente de su capacidad economica. Este principio debe guiar las politicas educativas.",
    points: 5,
  },
  // Pregunta 15
  {
    id: 15,
    question: "Situacion\n\nComo activista por la educacion, tienes una reunion con potenciales donantes para solicitar financiamiento para programas educativos en comunidades vulnerables. Los donantes quieren ver resultados tangibles antes de comprometer recursos.\n\nPregunta\n\nCon base en la situacion descrita, ¿que enfoque tomarias para convencer a los donantes?",
    options: [
      { id: "a", text: "Enfatizar solo las necesidades sin mostrar resultados." },
      { id: "b", text: "Mostrar el impacto positivo de la educacion y los beneficios a largo plazo." },
      { id: "c", text: "Ignorar las estadisticas." },
      { id: "d", text: "Focalizarse solo en los problemas." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, mostrar el impacto positivo documentado de programas similares y los beneficios a largo plazo para las comunidades es la estrategia mas efectiva para obtener apoyo financiero de donantes orientados a resultados.",
    points: 5,
  },
  // Pregunta 16 - Globalizacion
  {
    id: 16,
    question: "Situacion\n\nDurante un foro sobre desarrollo economico regional, surge un debate sobre los efectos de la globalizacion. Algunos participantes la ven como una amenaza a la industria local, mientras otros destacan oportunidades de expansion.\n\nPregunta\n\nCon base en la situacion descrita, ¿que ha permitido principalmente la globalizacion segun la evidencia?",
    options: [
      { id: "a", text: "Una menor interconexion entre los paises." },
      { id: "b", text: "Una mayor interconexion entre los paises." },
      { id: "c", text: "Una reduccion del comercio." },
      { id: "d", text: "Una disminucion del intercambio cultural." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, es importante reconocer que la globalizacion ha permitido una mayor interconexion entre los paises, facilitando el comercio y el intercambio cultural. Sin embargo, tambien ha generado desigualdades que requieren politicas de mitigacion.",
    points: 5,
  },
  // Pregunta 17
  {
    id: 17,
    question: "Situacion\n\nEres economista y debes presentar un informe sobre globalizacion a funcionarios de desarrollo economico. El informe debe abordar tanto los beneficios como las preocupaciones sobre desigualdad que han expresado comunidades locales.\n\nPregunta\n\nCon base en la situacion descrita, ¿como abordarias las desigualdades generadas por la globalizacion en tu informe?",
    options: [
      { id: "a", text: "Ignorar los aspectos negativos." },
      { id: "b", text: "Proponer politicas para mitigar las desigualdades." },
      { id: "c", text: "Enfatizar solo los beneficios economicos." },
      { id: "d", text: "Focalizarse solo en los intercambios culturales." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, proponer politicas especificas para mitigar las desigualdades es la forma mas responsable y efectiva de abordar los efectos negativos de la globalizacion, respondiendo a las preocupaciones de las comunidades afectadas.",
    points: 5,
  },
  // Pregunta 18 - Inteligencia artificial
  {
    id: 18,
    question: "Situacion\n\nEn una jornada de actualizacion tecnologica para funcionarios publicos, se discute el potencial de la inteligencia artificial. Algunos temen que solo beneficie al sector tecnologico, mientras otros ven aplicaciones mas amplias.\n\nPregunta\n\nCon base en la situacion descrita, ¿que esta revolucionando la inteligencia artificial segun las tendencias actuales?",
    options: [
      { id: "a", text: "Solo la industria de la medicina." },
      { id: "b", text: "Diversas industrias." },
      { id: "c", text: "Solo la agricultura." },
      { id: "d", text: "Solo la industria tecnologica." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, es importante entender que la inteligencia artificial esta revolucionando diversas industrias, desde la medicina hasta la agricultura y el servicio publico, aunque plantea desafios eticos y de privacidad que deben abordarse.",
    points: 5,
  },
  // Pregunta 19
  {
    id: 19,
    question: "Situacion\n\nComo experto en inteligencia artificial, has sido invitado a hablar sobre los desafios eticos de la IA en una conferencia internacional. El publico incluye desarrolladores, reguladores y ciudadanos preocupados por el impacto social.\n\nPregunta\n\nCon base en la situacion descrita, ¿que enfoque tomarias para abordar este tema ante una audiencia tan diversa?",
    options: [
      { id: "a", text: "Ignorar los desafios eticos." },
      { id: "b", text: "Abordar los desafios eticos y proponer soluciones." },
      { id: "c", text: "Enfatizar solo los beneficios tecnologicos." },
      { id: "d", text: "Focalizarse solo en la privacidad." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, abordar los desafios eticos de manera integral y proponer soluciones colaborativas es esencial para el desarrollo responsable de la inteligencia artificial y para responder a las preocupaciones de los diferentes grupos presentes.",
    points: 5,
  },
  // Pregunta 20 - Turismo sostenible
  {
    id: 20,
    question: "Situacion\n\nDurante la formulacion del plan de desarrollo turistico regional, surge tension entre operadores que quieren maximizar visitantes y comunidades locales preocupadas por el impacto ambiental y cultural de un turismo masivo.\n\nPregunta\n\nCon base en la situacion descrita, ¿que busca principalmente el enfoque de turismo sostenible?",
    options: [
      { id: "a", text: "Maximizar el impacto negativo en el medio ambiente." },
      { id: "b", text: "Minimizar el impacto negativo en el medio ambiente." },
      { id: "c", text: "Ignorar las comunidades locales." },
      { id: "d", text: "Promover practicas irresponsables." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, el turismo sostenible busca minimizar el impacto negativo en el medio ambiente y las comunidades locales, promoviendo practicas responsables que generen beneficios economicos sin comprometer los recursos naturales y culturales.",
    points: 5,
  },
  // Pregunta 21 - Proposito de pruebas de juicio situacional
  {
    id: 21,
    question: "Situacion\n\nEres candidato a un cargo publico y te informan que parte del proceso de seleccion incluye una prueba de juicio situacional. Algunos companeros candidatos cuestionan la utilidad de este tipo de evaluaciones.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es el proposito principal de las pruebas de juicio situacional en procesos de seleccion?",
    options: [
      { id: "a", text: "Evaluar unicamente conocimientos teoricos mediante preguntas memoristicas." },
      { id: "b", text: "Medir competencias como toma de decisiones, etica y resolucion de problemas en contextos laborales." },
      { id: "c", text: "Determinar la velocidad de respuesta ante cualquier pregunta." },
      { id: "d", text: "Reemplazar completamente las entrevistas personales con pruebas automatizadas." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, las pruebas de juicio situacional evaluan competencias clave como toma de decisiones, etica profesional y resolucion de problemas a traves de escenarios laborales realistas que reflejan situaciones del puesto al que se aspira.",
    points: 5,
  },
  // Pregunta 22
  {
    id: 22,
    question: "Situacion\n\nAl responder una pregunta de juicio situacional durante tu evaluacion, te encuentras con dos opciones que parecen igualmente correctas y razonables. El tiempo avanza y debes tomar una decision.\n\nPregunta\n\nCon base en la situacion descrita, ¿que estrategia deberias aplicar para seleccionar la mejor respuesta?",
    options: [
      { id: "a", text: "Elegir al azar entre ambas opciones sin analizar mas." },
      { id: "b", text: "Analizar cual opcion refleja mejor los valores del servicio publico, la etica profesional y el mayor beneficio para todos los involucrados." },
      { id: "c", text: "Seleccionar la opcion mas breve para ahorrar tiempo de lectura." },
      { id: "d", text: "Buscar la opcion que favorezca unicamente tus intereses personales." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, la mejor estrategia es analizar cual opcion refleja mejor los principios del servicio publico, la etica profesional y genera el mayor beneficio para la organizacion, los ciudadanos y todos los involucrados en el escenario.",
    points: 5,
  },
  // Pregunta 23 - Competencias evaluadas
  {
    id: 23,
    question: "Situacion\n\nUn aspirante a funcionario publico te pregunta sobre que tipo de habilidades evaluan las pruebas de juicio situacional del sector publico, ya que quiere prepararse adecuadamente para el proceso de seleccion.\n\nPregunta\n\nCon base en la situacion descrita, ¿que competencias se evaluan principalmente en estas pruebas?",
    options: [
      { id: "a", text: "Solo habilidades tecnicas especificas del cargo." },
      { id: "b", text: "Orientacion al servicio, etica, trabajo en equipo, toma de decisiones y resolucion de conflictos." },
      { id: "c", text: "Unicamente capacidad de memorizacion de normativas." },
      { id: "d", text: "Habilidades artisticas y deportivas." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, es importante informar que las pruebas de juicio situacional evaluan competencias comportamentales como orientacion al servicio, etica profesional, trabajo en equipo, toma de decisiones y resolucion de conflictos, no solo conocimientos tecnicos.",
    points: 5,
  },
  // Pregunta 24
  {
    id: 24,
    question: "Situacion\n\nRecibes una solicitud de un ciudadano que requiere tramitar un documento urgente para una cita medica el dia siguiente. Al revisar, notas que falta un requisito menor que podria verificarse en pocos minutos con una llamada a otra dependencia.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual accion refleja mejor las competencias del servicio publico?",
    options: [
      { id: "a", text: "Rechazar la solicitud estrictamente porque falta el requisito, sin ofrecer alternativas." },
      { id: "b", text: "Realizar la llamada para verificar el requisito y ayudar al ciudadano a completar el tramite de manera agil." },
      { id: "c", text: "Ignorar el requisito faltante y procesar el documento sin verificacion." },
      { id: "d", text: "Pedirle al ciudadano que regrese otro dia con el requisito completo sin mas orientacion." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, la orientacion al servicio implica facilitar la gestion del ciudadano dentro del marco normativo. Realizar la verificacion telefonica demuestra proactividad, eficiencia y compromiso con el servicio, atendiendo la urgencia sin comprometer el cumplimiento de requisitos.",
    points: 5,
  },
  // Pregunta 25 - Respuesta efectiva
  {
    id: 25,
    question: "Situacion\n\nDurante la preparacion para una prueba de juicio situacional, un companero te pregunta como identificar la respuesta correcta entre varias opciones que parecen razonables.\n\nPregunta\n\nCon base en la situacion descrita, ¿que caracteriza una respuesta efectiva en una pregunta de juicio situacional?",
    options: [
      { id: "a", text: "La opcion mas larga y detallada siempre es la correcta." },
      { id: "b", text: "Aquella que equilibra el cumplimiento normativo, la etica profesional y el impacto positivo en los involucrados." },
      { id: "c", text: "La primera opcion que mencione alguna normativa especifica." },
      { id: "d", text: "Cualquier respuesta que evite tomar una decision concreta." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, una respuesta efectiva equilibra el cumplimiento de normas, los principios eticos del servicio publico y genera el mayor impacto positivo para la organizacion y los ciudadanos, demostrando competencias integrales de gestion publica.",
    points: 5,
  },
]

const questionsV2: Question[] = [
  // Pregunta 21 - Turismo sostenible
  {
    id: 21,
    question: "Situacion\n\nEres consultor de turismo sostenible y tienes una reunion con el gerente de una empresa turistica que opera en una zona de alto valor ecologico. La empresa busca aumentar sus ganancias pero tu detectas practicas que podrian danar el entorno.\n\nPregunta\n\nCon base en la situacion descrita, ¿que enfoque usarias para convencer a la empresa de adoptar practicas sostenibles?",
    options: [
      { id: "a", text: "Enfatizar solo los costos." },
      { id: "b", text: "Mostrar los beneficios a largo plazo y el impacto positivo en la comunidad." },
      { id: "c", text: "Ignorar los beneficios ambientales." },
      { id: "d", text: "Focalizarse solo en las ganancias inmediatas." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, mostrar los beneficios economicos a largo plazo y el impacto positivo en la comunidad local es la estrategia mas efectiva para promover practicas sostenibles, alineando los intereses empresariales con la responsabilidad ambiental.",
    points: 5,
  },
  // Pregunta 22 - Salud mental
  {
    id: 22,
    question: "Situacion\n\nEn una reunion de bienestar laboral, algunos funcionarios argumentan que los problemas de salud mental son personales y no deberian ser responsabilidad de la entidad. Otros piden mas apoyo institucional.\n\nPregunta\n\nCon base en la situacion descrita, ¿que se afirma sobre la importancia de la salud mental en el ambito laboral?",
    options: [
      { id: "a", text: "Es menos importante que la salud fisica." },
      { id: "b", text: "Es tan importante como la salud fisica." },
      { id: "c", text: "No es importante." },
      { id: "d", text: "Es un lujo." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, es fundamental reconocer que la salud mental es tan importante como la salud fisica. Las organizaciones tienen responsabilidad en crear entornos que promuevan el bienestar integral de sus colaboradores.",
    points: 5,
  },
  // Pregunta 23
  {
    id: 23,
    question: "Situacion\n\nTrabajas en recursos humanos de una entidad publica y durante las ultimas semanas has notado que varios empleados muestran signos de estres y agotamiento: llegan tarde, tienen conflictos frecuentes y su productividad ha bajado significativamente.\n\nPregunta\n\nCon base en la situacion descrita, ¿que accion tomarias para abordar la salud mental en el equipo?",
    options: [
      { id: "a", text: "Ignorar la situacion esperando que mejore por si sola." },
      { id: "b", text: "Implementar programas de bienestar y ofrecer acceso a servicios de apoyo psicologico." },
      { id: "c", text: "Aumentar la carga laboral para mantener la productividad." },
      { id: "d", text: "Sancionar a los empleados que muestren bajo rendimiento." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, implementar programas de bienestar y ofrecer acceso a servicios de apoyo psicologico demuestra compromiso institucional con la salud integral de los empleados y previene problemas mayores de clima laboral y productividad.",
    points: 5,
  },
  // Pregunta 24 - Error en documento oficial
  {
    id: 24,
    question: "Situacion\n\nEn tu oficina se ha detectado un error significativo en un documento oficial que ya fue publicado y distribuido a los ciudadanos. El error en las fechas podria generar confusion sobre plazos importantes de un programa social.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es la mejor accion a tomar?",
    options: [
      { id: "a", text: "Esperar a que alguien mas note el error y lo reporte." },
      { id: "b", text: "Emitir inmediatamente una correccion oficial y comunicar el error de manera transparente." },
      { id: "c", text: "Ocultar el error para evitar problemas con los superiores." },
      { id: "d", text: "Culpar a otro departamento del error." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, la transparencia y la correccion inmediata son fundamentales en el servicio publico. Emitir una correccion oficial y comunicar el error mantiene la confianza ciudadana y previene que las personas tomen decisiones erroneas basadas en informacion incorrecta.",
    points: 5,
  },
  // Pregunta 25 - Tramite irregular
  {
    id: 25,
    question: "Situacion\n\nUn colega de tu dependencia te pide que apruebes un tramite que no cumple con todos los requisitos documentales, argumentando que es para un familiar que lo necesita urgentemente y que 'siempre se ha hecho asi' en casos especiales.\n\nPregunta\n\nCon base en la situacion descrita, ¿como deberias responder a esta solicitud?",
    options: [
      { id: "a", text: "Aprobar el tramite para mantener buenas relaciones con el colega." },
      { id: "b", text: "Rechazar el tramite explicando los requisitos faltantes y ofreciendo orientacion para completarlos correctamente." },
      { id: "c", text: "Aprobar el tramite esta vez pero advertir que no se repetira." },
      { id: "d", text: "Transferir la responsabilidad a un supervisor." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, mantener la integridad del proceso es esencial para la funcion publica. Rechazar el tramite y ofrecer orientacion clara asegura el cumplimiento normativo, evita conflictos de interes y ayuda a corregir malas practicas institucionales.",
    points: 5,
  },
  // Pregunta 26 - Conflicto entre colegas
  {
    id: 26,
    question: "Situacion\n\nDurante una reunion de equipo para planificar un proyecto importante, surge un desacuerdo fuerte entre dos colegas sobre la metodologia a utilizar. La discusion se vuelve tensa y el resto del equipo se siente incomodo.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual seria tu rol mas constructivo para manejar esta situacion?",
    options: [
      { id: "a", text: "Tomar partido por la persona con mas antiguedad." },
      { id: "b", text: "Facilitar un dialogo constructivo para que ambas partes expongan sus argumentos y buscar un consenso." },
      { id: "c", text: "Dejar que resuelvan el conflicto solos sin intervenir." },
      { id: "d", text: "Proponer tu propia solucion sin escuchar las opiniones de los demas." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, facilitar el dialogo constructivo y buscar consenso demuestra habilidades de mediacion y trabajo en equipo. Esto permite aprovechar las diferentes perspectivas para encontrar la mejor solucion y restablecer un ambiente de trabajo positivo.",
    points: 5,
  },
  // Pregunta 27 - Proyecto nuevo
  {
    id: 27,
    question: "Situacion\n\nTe asignan liderar un proyecto de implementacion tecnologica en un area en la que tienes poca experiencia tecnica. El plazo de entrega es de un mes y la alta direccion tiene altas expectativas sobre los resultados.\n\nPregunta\n\nCon base en la situacion descrita, ¿que estrategia seguirias para abordar este desafio?",
    options: [
      { id: "a", text: "Rechazar el proyecto por falta de experiencia." },
      { id: "b", text: "Aceptar el reto, buscar asesoria de expertos y capacitarte rapidamente en el tema." },
      { id: "c", text: "Aceptar pero delegar toda la responsabilidad a otros miembros del equipo." },
      { id: "d", text: "Procrastinar esperando recibir mas orientacion." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, aceptar el reto, buscar asesoria de expertos y capacitarte demuestra aprendizaje continuo, adaptabilidad y compromiso con el desarrollo profesional. Estas competencias son valoradas en el servicio publico y permiten crecer profesionalmente.",
    points: 5,
  },
  // Pregunta 28 - Solicitud de informacion
  {
    id: 28,
    question: "Situacion\n\nUn ciudadano presenta una solicitud de acceso a informacion publica sobre contratos de los ultimos cinco anos. La informacion existe pero esta dispersa en varios archivos y compilarla requeriria varias horas de trabajo de tu equipo.\n\nPregunta\n\nCon base en la situacion descrita, ¿como manejarias esta solicitud?",
    options: [
      { id: "a", text: "Negar la solicitud porque requiere mucho tiempo." },
      { id: "b", text: "Aceptar la solicitud, establecer un plazo razonable y cumplir con la entrega de la informacion." },
      { id: "c", text: "Dar informacion incompleta para ahorrar tiempo." },
      { id: "d", text: "Sugerir al ciudadano que busque la informacion por su cuenta." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, el derecho de acceso a la informacion publica es fundamental y debe respetarse. Aceptar la solicitud y establecer un plazo razonable permite cumplir con la obligacion legal de manera organizada sin comprometer otras responsabilidades.",
    points: 5,
  },
  // Pregunta 29 - Proceso ineficiente
  {
    id: 29,
    question: "Situacion\n\nObservas que un proceso administrativo de atencion al ciudadano en tu area es ineficiente: requiere multiples firmas innecesarias, genera demoras de hasta dos semanas y causa quejas frecuentes. Tu jefe parece no estar al tanto del problema.\n\nPregunta\n\nCon base en la situacion descrita, ¿que deberias hacer ante esta situacion?",
    options: [
      { id: "a", text: "Continuar con el proceso tal como esta porque 'asi se ha hecho siempre'." },
      { id: "b", text: "Analizar el proceso, identificar mejoras y proponer cambios a tu supervisor." },
      { id: "c", text: "Quejarte del proceso con tus colegas pero no tomar accion." },
      { id: "d", text: "Cambiar el proceso por tu cuenta sin consultar." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, analizar procesos y proponer mejoras formalmente demuestra iniciativa, orientacion a resultados y compromiso con la eficiencia institucional. Presentar la propuesta al supervisor sigue los canales apropiados para implementar cambios.",
    points: 5,
  },
  // Pregunta 30 - Critica en redes sociales
  {
    id: 30,
    question: "Situacion\n\nDurante un evento publico de rendicion de cuentas, un ciudadano hace comentarios criticos sobre la gestion de tu entidad en redes sociales, incluyendo informacion inexacta. Los comentarios se estan viralizando rapidamente.\n\nPregunta\n\nCon base en la situacion descrita, como funcionario presente, ¿como deberias responder a esta situacion?",
    options: [
      { id: "a", text: "Ignorar los comentarios completamente." },
      { id: "b", text: "Responder profesionalmente, ofreciendo informacion objetiva y canales formales para presentar inquietudes." },
      { id: "c", text: "Entrar en una discusion defendiendo agresivamente a la entidad." },
      { id: "d", text: "Bloquear al ciudadano en redes sociales." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, responder profesionalmente con informacion objetiva y orientar hacia canales formales mantiene la imagen institucional, corrige la desinformacion y demuestra apertura al dialogo constructivo con la ciudadania.",
    points: 5,
  },
  // Pregunta 31 - Capacitacion vs tareas
  {
    id: 31,
    question: "Situacion\n\nTe ofrecen participar en una capacitacion especializada en horario laboral que mejoraria significativamente tus habilidades para el cargo. Sin embargo, tienes varias tareas pendientes con plazos cercanos esta semana.\n\nPregunta\n\nCon base en la situacion descrita, ¿que decision tomarias para manejar esta situacion?",
    options: [
      { id: "a", text: "Rechazar la capacitacion para cumplir con las tareas pendientes." },
      { id: "b", text: "Asistir a la capacitacion y reorganizar tus tareas o solicitar apoyo para cumplir con los plazos." },
      { id: "c", text: "Asistir a la capacitacion ignorando las tareas pendientes." },
      { id: "d", text: "Pedir a un colega que asista en tu lugar." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, el aprendizaje continuo es valioso para el desarrollo profesional. Asistir a la capacitacion y reorganizar tareas o pedir apoyo demuestra gestion del tiempo, priorizacion y compromiso tanto con las responsabilidades actuales como con el crecimiento profesional.",
    points: 5,
  },
  // Pregunta 32 - Regalo de proveedor
  {
    id: 32,
    question: "Situacion\n\nUn proveedor externo que acaba de ganar un contrato importante con tu entidad te visita en tu oficina y te ofrece un regalo de considerable valor como 'agradecimiento por la buena colaboracion durante el proceso'.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es la accion correcta que debes tomar?",
    options: [
      { id: "a", text: "Aceptar el regalo ya que el contrato ya esta adjudicado." },
      { id: "b", text: "Rechazar cortesmente el regalo y reportar la situacion segun los protocolos de etica institucional." },
      { id: "c", text: "Aceptar el regalo pero no contarselo a nadie." },
      { id: "d", text: "Aceptar el regalo y compartirlo con todo el equipo." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, rechazar regalos de valor de proveedores y reportar la situacion protege tu integridad profesional, evita conflictos de interes reales o percibidos, y cumple con los codigos de etica del servicio publico.",
    points: 5,
  },
  // Pregunta 33 - Objetivo del juicio situacional
  {
    id: 33,
    question: "Situacion\n\nUn compañero de trabajo que se prepara para un concurso de meritos te pregunta sobre el proposito de las pruebas de juicio situacional. Quiere entender que buscan evaluar los examinadores con este tipo de metodologia.\n\nPregunta\n\nCon base en la situacion descrita, ¿que enunciado resume mejor el objetivo de esta metodologia de evaluacion?",
    options: [
      { id: "a", text: "Medir unicamente conocimientos normativos mediante preguntas cerradas." },
      {
        id: "b",
        text: "Valorar competencias clave a partir de escenarios laborales simulados, observando el impacto de las decisiones en el contexto institucional.",
      },
      { id: "c", text: "Reemplazar entrevistas individuales por pruebas psicometricas automatizadas." },
      { id: "d", text: "Calificar solo la rapidez con la que se elige una alternativa." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, debes explicar que el juicio situacional busca evaluar como las personas aplican competencias en situaciones laborales simuladas y como sus decisiones afectan al entorno institucional y a los ciudadanos.",
    points: 5,
  },
  // Pregunta 34 - Distincion de las pruebas
  {
    id: 34,
    question: "Situacion\n\nDurante una sesion informativa sobre procesos de seleccion, un aspirante pregunta que diferencia a las pruebas de juicio situacional de otros tipos de evaluacion como los examenes de conocimientos tecnicos.\n\nPregunta\n\nCon base en la situacion descrita, ¿que distingue las pruebas de juicio situacional de otros tipos de evaluacion?",
    options: [
      { id: "a", text: "Se enfocan exclusivamente en conocimientos tecnicos memorizados." },
      { id: "b", text: "Presentan escenarios realistas del contexto laboral para evaluar competencias aplicadas en situaciones practicas." },
      { id: "c", text: "Evaluan unicamente la capacidad de lectura rapida del candidato." },
      { id: "d", text: "Miden solamente habilidades matematicas basicas." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, es importante aclarar que las pruebas de juicio situacional se distinguen por presentar escenarios realistas del contexto laboral que permiten evaluar como los candidatos aplican sus competencias en situaciones practicas similares a las del puesto.",
    points: 5,
  },
  // Pregunta 35 - Opciones ambiguas
  {
    id: 35,
    question: "Situacion\n\nEstas tomando una prueba de juicio situacional y encuentras un escenario complejo donde todas las opciones tienen aspectos positivos y negativos. No hay una respuesta claramente perfecta y el tiempo de la prueba avanza.\n\nPregunta\n\nCon base en la situacion descrita, ¿como deberias proceder para seleccionar la mejor respuesta?",
    options: [
      { id: "a", text: "Seleccionar al azar sin analizar las consecuencias de cada opcion." },
      { id: "b", text: "Identificar cual opcion minimiza riesgos, maximiza beneficios y se alinea mejor con los valores institucionales." },
      { id: "c", text: "Elegir siempre la opcion mas conservadora que implique no tomar ninguna accion." },
      { id: "d", text: "Buscar la opcion que beneficie unicamente tus metas personales." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, la mejor estrategia es analizar las consecuencias de cada opcion, identificando cual minimiza riesgos, maximiza beneficios para todos los involucrados y se alinea mejor con los valores y objetivos de la institucion publica.",
    points: 5,
  },
  // Pregunta 36 - Toma de decisiones
  {
    id: 36,
    question: "Situacion\n\nDurante una evaluacion de desempeno, tu supervisor te indica que debes mejorar tu competencia de toma de decisiones. Te pide que reflexiones sobre que significa demostrar esta competencia en el contexto del servicio publico.\n\nPregunta\n\nCon base en la situacion descrita, ¿que significa demostrar competencia en toma de decisiones en el sector publico?",
    options: [
      { id: "a", text: "Tomar decisiones rapidas sin considerar las consecuencias." },
      { id: "b", text: "Analizar el contexto, evaluar alternativas, considerar impactos y elegir la opcion mas adecuada segun principios eticos y organizacionales." },
      { id: "c", text: "Delegar todas las decisiones a otras personas para evitar responsabilidad." },
      { id: "d", text: "Elegir siempre la opcion mas popular sin analisis critico." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, la competencia en toma de decisiones implica analizar el contexto completo, evaluar alternativas considerando sus impactos en diferentes actores, y elegir la opcion mas adecuada basandose en principios eticos, normativos y objetivos organizacionales.",
    points: 5,
  },
  // Pregunta 37 - Manejo de conflictos
  {
    id: 37,
    question: "Situacion\n\nDurante un proceso de seleccion, enfrentas una pregunta de juicio situacional sobre manejo de conflictos entre dos compañeros de trabajo que no se hablan desde hace una semana por un malentendido sobre responsabilidades.\n\nPregunta\n\nCon base en la situacion descrita, ¿que enfoque refleja mejor las competencias esperadas en el servicio publico para resolver este conflicto?",
    options: [
      { id: "a", text: "Ignorar el conflicto esperando que se resuelva solo con el tiempo." },
      { id: "b", text: "Facilitar el dialogo entre las partes, buscar puntos comunes y promover una solucion constructiva que beneficie el ambiente laboral." },
      { id: "c", text: "Tomar partido por uno de los companeros segun preferencias personales." },
      { id: "d", text: "Reportar inmediatamente a ambos empleados sin intentar mediar primero." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, el manejo efectivo de conflictos en el servicio publico implica facilitar el dialogo entre las partes, buscar puntos comunes y promover soluciones constructivas que beneficien el ambiente laboral y la productividad del equipo.",
    points: 5,
  },
  // Pregunta 38 - Elementos del analisis
  {
    id: 38,
    question: "Situacion\n\nUn mentor te esta preparando para pruebas de juicio situacional y te pregunta que elementos consideras importantes al analizar un escenario presentado en el contexto del servicio publico.\n\nPregunta\n\nCon base en la situacion descrita, ¿que elementos se deben considerar al analizar un escenario de juicio situacional?",
    options: [
      { id: "a", text: "Solo el beneficio personal que se puede obtener de la situacion." },
      { id: "b", text: "El marco normativo aplicable, los principios eticos del servicio publico, el impacto en ciudadanos y la mision institucional." },
      { id: "c", text: "Unicamente la opinion personal sin considerar normas ni consecuencias." },
      { id: "d", text: "Solo el tiempo que tomara resolver la situacion." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, al analizar escenarios en el contexto publico se debe considerar el marco normativo vigente, los principios eticos (honestidad, respeto, diligencia, justicia, compromiso), el impacto en los ciudadanos y la alineacion con la mision institucional.",
    points: 5,
  },
  // Pregunta 39 - Accesibilidad
  {
    id: 39,
    question: "Situacion\n\nUn ciudadano con discapacidad visual llega a la ventanilla de radicacion y solicita presentar su peticion de manera verbal porque no puede leer ni firmar el formato escrito. Tu dependencia normalmente exige formularios impresos con firma.\n\nPregunta\n\nCon base en la situacion descrita, ¿que procede segun el enfoque de accesibilidad en el servicio publico?",
    options: [
      { id: "a", text: "Recibirla por el medio mas accesible para el peticionario y registrar la radicacion verbal." },
      { id: "b", text: "Mantener el formato escrito y ofrecer ayuda posterior." },
      { id: "c", text: "Rechazarla hasta que cumpla las reglas internas." },
      { id: "d", text: "Sugerir que vuelva con un acompanante que firme por el." },
    ],
    correct: "a",
    explanation: "En la situacion descrita, el derecho de peticion admite medios verbales, telefonicos o audiovisuales. Exigir un unico formato escrito desconoce los ajustes razonables y constituye una barrera injustificada para la poblacion con discapacidad, vulnerando sus derechos.",
    points: 5,
  },
  // Pregunta 40 - Igualdad material
  {
    id: 40,
    question: "Situacion\n\nEn una reunion de estandarizacion de procesos, un funcionario argumenta que 'tratar a todos por igual' significa exigir el mismo formato escrito a todos los ciudadanos, incluyendo aquellos con discapacidad, para mantener la uniformidad de procedimientos.\n\nPregunta\n\nCon base en la situacion descrita, ¿es valido este argumento desde el enfoque de igualdad material?",
    options: [
      { id: "a", text: "Si, porque garantiza uniformidad." },
      { id: "b", text: "No; la igualdad real exige ajustes razonables y atencion diferencial para garantizar el acceso efectivo." },
      { id: "c", text: "Solo se aceptan medios digitales certificados." },
      { id: "d", text: "Depende del volumen de solicitudes." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, la igualdad material implica adaptar los canales a las condiciones del ciudadano para garantizar acceso efectivo. Rechazar ajustes razonables vulnera el enfoque diferencial establecido en la Ley 1755 de 2015 y los principios de inclusion.",
    points: 5,
  },
  // Pregunta 41 - Terminos de respuesta
  {
    id: 41,
    question: "Situacion\n\nHan pasado veinte dias habiles sin que tu oficina responda una peticion ciudadana ni comunique una prorroga. Cuando el ciudadano reclama, el jefe de la dependencia alega que hay 'altisima carga operativa' y que eso justifica la demora.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es la lectura correcta de esta situacion?",
    options: [
      { id: "a", text: "Se vulnera el derecho de peticion porque la prorroga debia motivarse y comunicarse antes del vencimiento." },
      { id: "b", text: "La carga operativa es causal automatica para extender el termino." },
      { id: "c", text: "Si la peticion no es urgente, la entidad gestiona libremente los tiempos." },
      { id: "d", text: "El silencio administrativo es valido siempre que se informe despues." },
    ],
    correct: "a",
    explanation: "En la situacion descrita, los 15 dias habiles establecidos por ley solo pueden ampliarse mediante prorroga motivada y notificada al ciudadano antes del vencimiento. La carga operativa interna no excusa el incumplimiento del termino legal.",
    points: 5,
  },
  // Pregunta 42 - Respuesta parcial
  {
    id: 42,
    question: "Situacion\n\nTu dependencia envia una respuesta parcial a una peticion ciudadana, incluyendo solo parte de la informacion solicitada, con la promesa de completarla 'cuando haya tiempo disponible' sin establecer una fecha concreta.\n\nPregunta\n\nCon base en la situacion descrita, ¿que nucleo del derecho de peticion se ve afectado por esta practica?",
    options: [
      { id: "a", text: "El incumplimiento del deber de respuesta oportuna, clara y de fondo." },
      { id: "b", text: "Ninguno, porque ya hubo respuesta." },
      { id: "c", text: "Solo afecta la imagen institucional." },
      { id: "d", text: "Se cumple el nucleo esencial si hay intencion de contestar." },
    ],
    correct: "a",
    explanation: "En la situacion descrita, el nucleo del derecho de peticion exige respuestas completas, congruentes con lo solicitado y oportunas. Fragmentar las respuestas sin justificacion ni plazos claros vulnera la confianza legitima del ciudadano y su derecho a obtener informacion completa.",
    points: 5,
  },
  // Pregunta 43 - Respuesta insuficiente
  {
    id: 43,
    question: "Situacion\n\nUna ciudadana recibe una contestacion oficial a su peticion, pero al revisarla encuentra que no resuelve lo que solicito: la respuesta trata temas diferentes y omite la informacion especifica que requeria.\n\nPregunta\n\nCon base en la situacion descrita, antes de acudir a la tutela, ¿que camino institucional corresponde seguir?",
    options: [
      { id: "a", text: "Solicitar a la Procuraduria que rehaga la respuesta." },
      { id: "b", text: "Presentar accion de tutela inmediata." },
      { id: "c", text: "Interponer los recursos administrativos procedentes (insistencia, reposicion o apelacion) para agotar la via gubernativa." },
      { id: "d", text: "Esperar una respuesta espontanea." },
    ],
    correct: "c",
    explanation: "En la situacion descrita, la tutela es subsidiaria y debe usarse como ultimo recurso. Primero deben agotarse los recursos administrativos previstos (insistencia, reposicion o apelacion) para corregir la respuesta insuficiente a traves de la via gubernativa.",
    points: 5,
  },
  // Pregunta 44 - Prorroga valida
  {
    id: 44,
    question: "Situacion\n\nTu dependencia recibe una peticion de informacion que requiere compilar datos de multiples fuentes. El jefe considera necesario solicitar mas tiempo pero no esta seguro de cuando ni como comunicar la prorroga al ciudadano.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuando es valida la prorroga del termino para responder una peticion de informacion general?",
    options: [
      { id: "a", text: "En cualquier momento, por carga operativa." },
      { id: "b", text: "Antes del vencimiento, con motivacion y comunicacion expresa al peticionario." },
      { id: "c", text: "Solo si el tema no es urgente." },
      { id: "d", text: "Cuando se registra en el sistema, sin informar al ciudadano." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, la Ley 1755 establece que la prorroga debe motivarse explicando las razones y comunicarse expresamente al ciudadano antes de que venza el termino legal. Una prorroga despues del vencimiento no es valida.",
    points: 5,
  },
  // Pregunta 45 - Libertad de expresion
  {
    id: 45,
    question: "Situacion\n\nDurante un evento institucional de participacion ciudadana, funcionarios de seguridad restringen a un grupo de jovenes que portaban consignas politicas criticas. Posteriormente, la entidad publica un comunicado que cuestiona el comportamiento de los jovenes.\n\nPregunta\n\nCon base en la situacion descrita, ¿que nucleo de derechos fundamentales se afecta principalmente?",
    options: [
      { id: "a", text: "La intimidad u honor personal." },
      { id: "b", text: "El pluralismo democratico y la libertad de expresion politica." },
      { id: "c", text: "El debido proceso sancionatorio." },
      { id: "d", text: "La libertad economica." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, la censura de manifestaciones politicas en espacios institucionales de participacion ciudadana vulnera la libertad de expresion y el pluralismo democratico, aun cuando no se impongan sanciones formales a los participantes.",
    points: 5,
  },
  // Pregunta 46 - Delegacion de funciones
  {
    id: 46,
    question: "Situacion\n\nEl alcalde de tu municipio quiere delegar algunas funciones administrativas en secretarios de despacho para agilizar la gestion y reducir cuellos de botella en la toma de decisiones. Te consulta sobre los requisitos legales.\n\nPregunta\n\nCon base en la situacion descrita, ¿que requisitos minimos debe cumplir la delegacion de funciones?",
    options: [
      { id: "a", text: "Basta un lineamiento interno sin formalidad." },
      { id: "b", text: "Expedir acto administrativo expreso, identificar funciones delegables, verificar la competencia del delegado y asegurar trazabilidad y control." },
      { id: "c", text: "Solicitar concepto de la gobernacion y acta de gabinete." },
      { id: "d", text: "Enviar un correo informal anunciando la delegacion." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, el articulo 211 de la Constitucion y la Ley 489/1998 exigen acto administrativo formal, claridad sobre las funciones delegadas, verificacion de la competencia del delegado y establecimiento de mecanismos de seguimiento y control.",
    points: 5,
  },
  // Pregunta 47 - Funciones indelegables
  {
    id: 47,
    question: "Situacion\n\nEl alcalde elabora una lista de funciones que quiere delegar para mejorar la eficiencia administrativa. Te pide que revises la lista para identificar cuales funciones pueden delegarse legalmente y cuales no.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual de las siguientes funciones no puede delegarse?",
    options: [
      { id: "a", text: "Tramite de certificaciones tecnicas." },
      { id: "b", text: "Direccion politica y representacion legal de la entidad." },
      { id: "c", text: "Firma de oficios de mero tramite." },
      { id: "d", text: "Coordinacion operativa de un proyecto." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, debes indicar al alcalde que las funciones de direccion politica y representacion legal son indelegables por su naturaleza estrategica y por recaer directamente en la autoridad electa por voto popular.",
    points: 5,
  },
  // Pregunta 48 - POT y Plan de Desarrollo
  {
    id: 48,
    question: "Situacion\n\nLa oficina de Planeacion propone simplificar la documentacion del nuevo Plan Departamental de Desarrollo tratando el Plan de Ordenamiento Territorial (POT) como un simple anexo informativo, sin integracion tecnica detallada.\n\nPregunta\n\nCon base en la situacion descrita, ¿es correcta esta propuesta de simplificacion?",
    options: [
      { id: "a", text: "Si, porque simplifica el documento." },
      { id: "b", text: "No; la articulacion exige coordinacion tecnica y normativa, participacion y coherencia territorial." },
      { id: "c", text: "Depende del tamano del municipio." },
      { id: "d", text: "Solo cuando ya existe un POT adoptado." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, el POT no puede tratarse como un simple anexo. Requiere articulacion tecnica real con los planes de desarrollo para garantizar coherencia territorial en la gestion del suelo, los recursos y el desarrollo sostenible.",
    points: 5,
  },
  // Pregunta 49 - Canal telefonico
  {
    id: 49,
    question: "Situacion\n\nUna persona mayor con limitaciones tecnologicas y de movilidad llama a tu entidad solicitando radicar una peticion por telefono. El sistema actual solo acepta radicaciones presenciales o por plataforma web.\n\nPregunta\n\nCon base en la situacion descrita, ¿corresponde habilitar el canal telefonico para esta radicacion?",
    options: [
      { id: "a", text: "No, solo radicaciones presenciales o web." },
      { id: "b", text: "Si, el medio debe adaptarse a las condiciones del peticionario para garantizar accesibilidad." },
      { id: "c", text: "Solo si ya estaba registrado en el sistema." },
      { id: "d", text: "Depende del tipo de asunto." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, el principio de accesibilidad permite y exige habilitar canales telefonicos o audiovisuales cuando facilitan el ejercicio del derecho de peticion, especialmente para poblacion vulnerable con limitaciones tecnologicas o de movilidad.",
    points: 5,
  },
  // Pregunta 50 - Nucleo del derecho de peticion
  {
    id: 50,
    question: "Situacion\n\nTu dependencia esta revisando sus protocolos de atencion al ciudadano y te piden identificar cual practica mejor preserva el nucleo del derecho de peticion y mantiene la confianza de los ciudadanos en la institucion.\n\nPregunta\n\nCon base en la situacion descrita, ¿que practica preserva mejor el nucleo del derecho de peticion y la confianza ciudadana?",
    options: [
      { id: "a", text: "Responder parcialmente y anunciar que se completara despues." },
      { id: "b", text: "Emitir respuesta de fondo, clara, congruente y dentro del termino legal." },
      { id: "c", text: "Posponer la respuesta cuando hay carga operativa." },
      { id: "d", text: "Enviar un acuse de recibo y responder en la siguiente vigencia." },
    ],
    correct: "b",
    explanation: "En la situacion descrita, el nucleo esencial del derecho de peticion exige respuestas completas, claras, congruentes con lo solicitado y dentro de los terminos legales. Cualquier practica que dilate, fragmente o desvie la respuesta vulnera la confianza legitima del ciudadano.",
    points: 5,
  },
]

export function JuicioSituacionalTest() {
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2">("v1")
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = selectedVersion === "v1" ? questionsV1 : questionsV2

  const totalScore = useMemo(() => questions.reduce((sum, q) => sum + q.points, 0), [questions])

  const submitTest = () => {
    setShowResults(true)
    setShowFeedback(false)
  }

  const timer = useTestTimer({
    totalQuestions: questions.length,
    timePerQuestion: 120,
    onTimeUp: submitTest,
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

  const handleAnswerChange = (questionId: number, answerId: string) => {
    if (answeredQuestions.has(questionId)) return
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }))
    setAnsweredQuestions((prev) => new Set(prev).add(questionId))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.keys(answers).length < questions.length) return
    submitTest()
  }

  const handleReset = () => {
    setAnswers({})
    setAnsweredQuestions(new Set())
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const score = useMemo(() => {
    if (!showResults) return 0
    return questions.reduce((total, question) => {
      if (answers[question.id] === question.correct) {
        return total + question.points
      }
      return total
    }, 0)
  }, [showResults, questions, answers])

  const percentage = showResults && totalScore > 0 ? Math.round((score / totalScore) * 100) : 0

  const performanceMessage = (() => {
    if (!showResults) return ""
    if (percentage >= 90) {
      return "Excelente capacidad de juicio situacional. Demuestras toma de decisiones acertadas y orientacion a buenas practicas."
    }
    if (percentage >= 70) {
      return "Buen nivel de juicio situacional. Revisa la retroalimentacion para fortalecer areas especificas."
    }
    return "Es necesario reforzar las competencias de juicio situacional. Revisa cuidadosamente la retroalimentacion y practica con mas escenarios."
  })()

  const unansweredCount = questions.length - Object.keys(answers).length

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!showResults && (
        <TestTimer
          formattedTime={timer.formattedTime}
          timeColor={timer.timeColor}
          percentageRemaining={timer.percentageRemaining}
        />
      )}

      <Card className="border-white/30 bg-white/80 shadow-lg shadow-primary/15 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-balance">Juicio Situacional</CardTitle>
          <CardDescription className="text-balance leading-relaxed">
            Evalua tu capacidad para tomar decisiones efectivas ante situaciones laborales complejas en el contexto
            del servicio publico.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <Alert className="border-primary/30 bg-primary/10">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertDescription>
              Esta prueba presenta escenarios reales del ambito publico. Selecciona la respuesta que mejor refleje las
              buenas practicas de gestion publica, etica profesional y orientacion al servicio.
            </AlertDescription>
          </Alert>
          <p>
            Cada pregunta presenta una situacion y varias opciones de respuesta. Analiza cuidadosamente cada escenario
            y selecciona la opcion que consideres mas apropiada segun los principios del servicio publico.
          </p>
        </CardContent>
      </Card>

      <Card className="border-white/30 bg-white/80 shadow-lg shadow-primary/15 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">Selecciona la version de la prueba</CardTitle>
          <CardDescription>
            Cada version contiene diferentes escenarios y preguntas de juicio situacional
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedVersion} onValueChange={handleVersionChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="v1" disabled={showResults}>
                Version 1 ({questionsV1.length} preguntas)
              </TabsTrigger>
              <TabsTrigger value="v2" disabled={showResults}>
                Version 2 ({questionsV2.length} preguntas)
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {showResults && (
            <p className="text-sm text-muted-foreground mt-3">Reinicia la prueba para cambiar de version</p>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        {questions.map((question, index) => {
          const selectedAnswer = answers[question.id]
          const isAnswered = answeredQuestions.has(question.id)
          const isCorrect = isAnswered && selectedAnswer === question.correct

          return (
            <Card
              key={question.id}
              className={`border transition-colors ${
                isAnswered
                  ? isCorrect
                    ? "border-emerald-400/70 bg-emerald-50/70"
                    : selectedAnswer
                      ? "border-rose-400/70 bg-rose-50/70"
                      : "border-white/20 bg-white/80"
                  : "border-white/20 bg-white/80"
              } shadow-md shadow-primary/10 backdrop-blur`}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-primary/80">Pregunta {index + 1}</p>
                  <span className="rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                    {question.points} pts
                  </span>
                </div>
                <CardTitle className="text-lg font-semibold leading-relaxed text-balance whitespace-pre-line">
                  {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {question.options.map((option) => {
                  const isSelected = selectedAnswer === option.id
                  const isOptionCorrect = question.correct === option.id
                  const showCorrect = isAnswered && isOptionCorrect
                  const showIncorrect = isAnswered && isSelected && !isOptionCorrect

                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition-all ${
                        isSelected
                          ? "border-primary/60 bg-primary/10 text-primary"
                          : "border-white/40 bg-white/70 hover:border-primary/40 hover:bg-primary/5"
                      } ${isAnswered ? "pointer-events-none opacity-90" : ""}`}
                    >
                      <span className="flex-1 text-left leading-relaxed">{option.text}</span>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.id}
                        checked={isSelected}
                        onChange={() => handleAnswerChange(question.id, option.id)}
                        disabled={isAnswered}
                        className="hidden"
                      />
                      {showCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />}
                      {showIncorrect && <AlertCircle className="h-5 w-5 text-rose-500" aria-hidden="true" />}
                    </label>
                  )
                })}

                {isAnswered && (
                  <div className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2 text-foreground">
                      <Info className="h-4 w-4 text-primary" />
                      Respuesta correcta:&nbsp;
                      <span className="font-medium text-primary">
                        {question.options.find((opt) => opt.id === question.correct)?.id.toUpperCase()}
                      </span>
                    </p>
                    <p className="mt-2 leading-relaxed">{question.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={showResults || unansweredCount > 0} className="gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Calcular puntaje
        </Button>
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          disabled={!showResults}
          onClick={() => setShowFeedback((prev) => !prev)}
        >
          <Info className="h-4 w-4" />
          {showFeedback ? "Ocultar" : "Ver"} Retroalimentacion
        </Button>
        <Button type="button" variant="ghost" className="gap-2" onClick={handleReset}>
          <RefreshCw className="h-4 w-4" />
          Intentar nuevamente
        </Button>
      </div>

      {unansweredCount > 0 && !showResults && (
        <div className="rounded-2xl border border-amber-400/60 bg-amber-50/80 px-4 py-3 text-sm text-amber-700">
          Debes responder {unansweredCount} {unansweredCount === 1 ? "pregunta" : "preguntas"} para habilitar la
          calificacion.
        </div>
      )}

      {showResults && (
        <div className="space-y-3 rounded-3xl border border-primary/25 bg-primary/10 p-6 text-primary shadow-inner shadow-primary/10">
          <div className="flex items-center gap-3 text-primary">
            <CheckCircle2 className="h-6 w-6" />
            <p className="text-base font-semibold">
              Puntaje obtenido: {score} / {totalScore} puntos ({percentage}%)
            </p>
          </div>
          <p className="text-sm text-primary/80 leading-relaxed">{performanceMessage}</p>
          <p className="text-xs uppercase tracking-wide text-primary/70">
            Usa la retroalimentacion para comprender las mejores practicas en cada situacion.
          </p>
        </div>
      )}
    </form>
  )
}
