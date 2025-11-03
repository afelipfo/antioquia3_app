/* eslint-disable jsx-a11y/label-has-associated-control */
"use client"

import { useState, useMemo } from "react"
import { CheckCircle2, Info, RefreshCw, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Question = {
  id: number
  scenario?: string
  question: string
  options: { id: string; text: string }[]
  correct: string
  explanation: string
  points: number
}

const questionsV1: Question[] = [
  // Ejemplo inicial
  {
    id: 1,
    scenario: "Un funcionario de atención al público en una oficina gubernamental recibe a un ciudadano muy molesto porque su trámite ha sido rechazado varias veces y exige hablar con un superior.",
    question: "¿Qué debería hacer el funcionario?",
    options: [
      { id: "a", text: "Ignorar al ciudadano y continuar con su trabajo." },
      { id: "b", text: "Llamar inmediatamente a un superior para que se encargue de la situación." },
      { id: "c", text: "Escuchar al ciudadano con calma, explicarle las razones del rechazo y ofrecerle ayuda para resolver el problema." },
      { id: "d", text: "Pedirle al ciudadano que se calme y que vuelva otro día cuando esté más tranquilo." },
    ],
    correct: "c",
    explanation: "La mejor práctica en atención al ciudadano es escuchar con calma, explicar las razones y ofrecer ayuda para resolver el problema. Esto demuestra empatía, profesionalismo y orientación al servicio.",
    points: 5,
  },
  // Ejemplo 2
  {
    id: 2,
    scenario: "Eres supervisor en una oficina de registro civil. Uno de tus empleados llega tarde repetidamente y su rendimiento ha disminuido; otros empleados empiezan a quejarse.",
    question: "¿Cómo abordarías esta situación?",
    options: [
      { id: "a", text: "Ignorar el problema y esperar que se resuelva solo." },
      { id: "b", text: "Regañar al empleado frente a sus compañeros para que sirva de ejemplo." },
      { id: "c", text: "Hablar en privado con el empleado para entender las razones de su comportamiento y buscar una solución conjunta." },
      { id: "d", text: "Informar al departamento de recursos humanos para que tomen medidas disciplinarias." },
    ],
    correct: "c",
    explanation: "Hablar en privado con el empleado demuestra respeto, permite entender las causas del problema y buscar soluciones constructivas. Es la mejor práctica de gestión de personas.",
    points: 5,
  },
  // Ejemplo 3
  {
    id: 3,
    scenario: "Estás a cargo de un proyecto con plazo ajustado. Un miembro clave del equipo solicita una semana de licencia por motivos personales.",
    question: "¿Qué harías en esta situación?",
    options: [
      { id: "a", text: "Negar la solicitud de licencia y exigir que el miembro se quede para cumplir con el plazo." },
      { id: "b", text: "Aceptar la solicitud de licencia sin ajustar el plan del proyecto." },
      { id: "c", text: "Aceptar la solicitud de licencia y redistribuir las tareas entre los demás miembros para asegurar que el proyecto se complete a tiempo." },
      { id: "d", text: "Pedir al miembro del equipo que trabaje desde casa durante su licencia." },
    ],
    correct: "c",
    explanation: "Aceptar la licencia y redistribuir tareas demuestra flexibilidad, respeto por el bienestar del equipo y capacidad de adaptación para cumplir objetivos.",
    points: 5,
  },
  // Ejemplo 4
  {
    id: 4,
    scenario: "Eres responsable de implementar un nuevo sistema de gestión. Algunos empleados se resisten al cambio y continúan utilizando el sistema antiguo.",
    question: "¿Cómo manejarías esta resistencia al cambio?",
    options: [
      { id: "a", text: "Ignorar a los empleados que se resisten y seguir adelante con la implementación." },
      { id: "b", text: "Forzar a los empleados a usar el nuevo sistema bajo amenaza de sanciones." },
      { id: "c", text: "Organizar sesiones de capacitación adicionales y explicar los beneficios del nuevo sistema para obtener su aceptación." },
      { id: "d", text: "Permitir que los empleados elijan qué sistema quieren usar." },
    ],
    correct: "c",
    explanation: "Organizar capacitaciones y explicar beneficios es la mejor estrategia para gestionar la resistencia al cambio, generando comprensión y aceptación.",
    points: 5,
  },
  // Ejemplo 5
  {
    id: 5,
    scenario: "Un ciudadano presenta una queja formal sobre el comportamiento de un colega, alegando trato irrespetuoso y discriminatorio.",
    question: "¿Cuál sería tu curso de acción?",
    options: [
      { id: "a", text: "Ignorar la queja y continuar con tus tareas." },
      { id: "b", text: "Informar inmediatamente a tu superior y solicitar una investigación interna." },
      { id: "c", text: "Hablar directamente con el colega acusado para escuchar su versión de los hechos." },
      { id: "d", text: "Pedir al ciudadano que retire la queja para evitar problemas." },
    ],
    correct: "b",
    explanation: "Ante una queja formal por trato irrespetuoso o discriminatorio, el protocolo correcto es informar al superior y solicitar investigación formal para garantizar imparcialidad.",
    points: 5,
  },
  // Actividad 1 - Desarrollo sostenible
  {
    id: 6,
    question: "¿Cuál es el objetivo principal del desarrollo sostenible?",
    options: [
      { id: "a", text: "Incrementar el crecimiento económico." },
      { id: "b", text: "Satisfacer las necesidades del presente sin comprometer el futuro." },
      { id: "c", text: "Proteger el medio ambiente a cualquier costo." },
      { id: "d", text: "Aumentar la inclusión social." },
    ],
    correct: "b",
    explanation: "El desarrollo sostenible busca satisfacer las necesidades del presente sin comprometer la capacidad de las futuras generaciones, equilibrando economía, inclusión social y medio ambiente.",
    points: 5,
  },
  {
    id: 7,
    scenario: "Eres asesor de políticas públicas y debes explicar la importancia del desarrollo sostenible a un grupo de empresarios preocupados por los costos.",
    question: "¿Cómo lo explicarías?",
    options: [
      { id: "a", text: "Enfatizando solo los beneficios económicos." },
      { id: "b", text: "Mostrando cómo la sostenibilidad puede mejorar la reputación y atraer inversiones." },
      { id: "c", text: "Ignorando las preocupaciones ambientales." },
      { id: "d", text: "Focalizándote únicamente en la inclusión social." },
    ],
    correct: "b",
    explanation: "Mostrar cómo la sostenibilidad mejora la reputación y atrae inversiones conecta los valores ambientales con los intereses empresariales de forma estratégica.",
    points: 5,
  },
  // Actividad 2 - Tecnología y redes sociales
  {
    id: 8,
    question: "Según los avances del siglo XXI, ¿qué ha permitido la tecnología?",
    options: [
      { id: "a", text: "Una desconexión global." },
      { id: "b", text: "Una conexión instantánea y global." },
      { id: "c", text: "Una mejora en la privacidad." },
      { id: "d", text: "Una reducción en la seguridad." },
    ],
    correct: "b",
    explanation: "La tecnología ha permitido una conexión instantánea y global, transformando la forma en que nos comunicamos, aunque presenta desafíos de privacidad y seguridad.",
    points: 5,
  },
  {
    id: 9,
    scenario: "Eres experto en ciberseguridad y das una charla a estudiantes sobre redes sociales.",
    question: "¿Cómo abordarías los desafíos de privacidad y seguridad?",
    options: [
      { id: "a", text: "Minimizando los riesgos." },
      { id: "b", text: "Enfatizando la importancia de la privacidad y ofreciendo consejos prácticos." },
      { id: "c", text: "Ignorando los problemas de seguridad." },
      { id: "d", text: "Focalizándote solo en los aspectos positivos de las redes sociales." },
    ],
    correct: "b",
    explanation: "Enfatizar la importancia de la privacidad y ofrecer consejos prácticos es la mejor forma de educar sobre ciberseguridad de manera efectiva y útil.",
    points: 5,
  },
  // Actividad 3 - Cambio climático
  {
    id: 10,
    question: "¿Cuál es uno de los efectos del cambio climático?",
    options: [
      { id: "a", text: "La reducción de las temperaturas globales." },
      { id: "b", text: "El aumento de las temperaturas globales." },
      { id: "c", text: "La estabilidad de los glaciares." },
      { id: "d", text: "La disminución de fenómenos meteorológicos extremos." },
    ],
    correct: "b",
    explanation: "El cambio climático causa el aumento de las temperaturas globales, el derretimiento de glaciares y mayor frecuencia de fenómenos meteorológicos extremos.",
    points: 5,
  },
  {
    id: 11,
    scenario: "Eres científico ambiental y debes presentar un informe a políticos sobre el cambio climático.",
    question: "¿Cómo destacarías la urgencia de abordar el cambio climático?",
    options: [
      { id: "a", text: "Presentando datos alarmantes sin soluciones." },
      { id: "b", text: "Ofreciendo datos claros y proponiendo medidas concretas." },
      { id: "c", text: "Ignorando las evidencias científicas." },
      { id: "d", text: "Focalizándote solo en los aspectos económicos." },
    ],
    correct: "b",
    explanation: "Ofrecer datos claros y proponer medidas concretas es la forma más efectiva de comunicar la urgencia del cambio climático a tomadores de decisiones.",
    points: 5,
  },
  // Actividad 4 - Biodiversidad
  {
    id: 12,
    question: "¿Por qué es esencial la biodiversidad?",
    options: [
      { id: "a", text: "Para el desarrollo tecnológico." },
      { id: "b", text: "Para el equilibrio de los ecosistemas." },
      { id: "c", text: "Para la urbanización." },
      { id: "d", text: "Para la globalización." },
    ],
    correct: "b",
    explanation: "La biodiversidad es esencial para el equilibrio de los ecosistemas. La pérdida de especies puede afectar negativamente el medio ambiente, la economía y la salud humana.",
    points: 5,
  },
  {
    id: 13,
    scenario: "Eres biólogo y debes explicar la importancia de la biodiversidad a un público general.",
    question: "¿Qué enfoque usarías?",
    options: [
      { id: "a", text: "Usar términos técnicos sin explicación." },
      { id: "b", text: "Utilizar ejemplos concretos y accesibles." },
      { id: "c", text: "Ignorar la relación con la economía y la salud." },
      { id: "d", text: "Focalizarse solo en los aspectos científicos." },
    ],
    correct: "b",
    explanation: "Utilizar ejemplos concretos y accesibles es la mejor forma de comunicar conceptos científicos complejos a un público general.",
    points: 5,
  },
  // Actividad 5 - Derecho a la educación
  {
    id: 14,
    question: "¿Qué se afirma sobre la educación?",
    options: [
      { id: "a", text: "Es un privilegio." },
      { id: "b", text: "Es un derecho fundamental." },
      { id: "c", text: "Es un lujo." },
      { id: "d", text: "Es una opción." },
    ],
    correct: "b",
    explanation: "La educación es un derecho fundamental que debe ser accesible para todos, aunque millones de niños en el mundo no tienen acceso a una educación de calidad.",
    points: 5,
  },
  {
    id: 15,
    scenario: "Como activista por la educación, debes convencer a donantes para financiar programas educativos.",
    question: "¿Qué enfoque tomarías?",
    options: [
      { id: "a", text: "Enfatizar solo las necesidades sin mostrar resultados." },
      { id: "b", text: "Mostrar el impacto positivo de la educación y los beneficios a largo plazo." },
      { id: "c", text: "Ignorar las estadísticas." },
      { id: "d", text: "Focalizarse solo en los problemas." },
    ],
    correct: "b",
    explanation: "Mostrar el impacto positivo y los beneficios a largo plazo es la estrategia más efectiva para obtener apoyo financiero para programas educativos.",
    points: 5,
  },
  // Actividad 6 - Globalización
  {
    id: 16,
    question: "¿Qué ha permitido la globalización?",
    options: [
      { id: "a", text: "Una menor interconexión entre los países." },
      { id: "b", text: "Una mayor interconexión entre los países." },
      { id: "c", text: "Una reducción del comercio." },
      { id: "d", text: "Una disminución del intercambio cultural." },
    ],
    correct: "b",
    explanation: "La globalización ha permitido una mayor interconexión entre los países, facilitando el comercio y el intercambio cultural, aunque también ha generado desigualdades.",
    points: 5,
  },
  {
    id: 17,
    scenario: "Eres economista y presentas un informe sobre globalización.",
    question: "¿Cómo abordarías las desigualdades generadas?",
    options: [
      { id: "a", text: "Ignorar los aspectos negativos." },
      { id: "b", text: "Proponer políticas para mitigar las desigualdades." },
      { id: "c", text: "Enfatizar solo los beneficios económicos." },
      { id: "d", text: "Focalizarse solo en los intercambios culturales." },
    ],
    correct: "b",
    explanation: "Proponer políticas para mitigar las desigualdades es la forma más responsable y efectiva de abordar los efectos negativos de la globalización.",
    points: 5,
  },
  // Actividad 7 - Inteligencia artificial
  {
    id: 18,
    question: "¿Qué está revolucionando la inteligencia artificial?",
    options: [
      { id: "a", text: "Solo la industria de la medicina." },
      { id: "b", text: "Diversas industrias." },
      { id: "c", text: "Solo la agricultura." },
      { id: "d", text: "Solo la industria tecnológica." },
    ],
    correct: "b",
    explanation: "La inteligencia artificial está revolucionando diversas industrias, desde la medicina hasta la agricultura, aunque plantea desafíos éticos y de privacidad.",
    points: 5,
  },
  {
    id: 19,
    scenario: "Como experto en IA, vas a hablar sobre los desafíos éticos en una conferencia.",
    question: "¿Qué enfoque tomarías?",
    options: [
      { id: "a", text: "Ignorar los desafíos éticos." },
      { id: "b", text: "Abordar los desafíos éticos y proponer soluciones." },
      { id: "c", text: "Enfatizar solo los beneficios tecnológicos." },
      { id: "d", text: "Focalizarse solo en la privacidad." },
    ],
    correct: "b",
    explanation: "Abordar los desafíos éticos y proponer soluciones es esencial para el desarrollo responsable de la inteligencia artificial.",
    points: 5,
  },
  // Actividad 8 - Turismo sostenible
  {
    id: 20,
    question: "¿Qué busca el turismo sostenible?",
    options: [
      { id: "a", text: "Maximizar el impacto negativo en el medio ambiente." },
      { id: "b", text: "Minimizar el impacto negativo en el medio ambiente." },
      { id: "c", text: "Ignorar las comunidades locales." },
      { id: "d", text: "Promover prácticas irresponsables." },
    ],
    correct: "b",
    explanation: "El turismo sostenible busca minimizar el impacto negativo en el medio ambiente y las comunidades locales, promoviendo prácticas responsables y beneficiosas.",
    points: 5,
  },
  {
    id: 21,
    question: "¿Cuál es el propósito principal de las pruebas de juicio situacional en procesos de selección?",
    options: [
      { id: "a", text: "Evaluar únicamente conocimientos teóricos mediante preguntas memorísticas." },
      { id: "b", text: "Medir competencias como toma de decisiones, ética y resolución de problemas en contextos laborales." },
      { id: "c", text: "Determinar la velocidad de respuesta ante cualquier pregunta." },
      { id: "d", text: "Reemplazar completamente las entrevistas personales con pruebas automatizadas." },
    ],
    correct: "b",
    explanation: "Las pruebas de juicio situacional evalúan competencias clave como toma de decisiones, ética profesional y resolución de problemas a través de escenarios laborales realistas que reflejan situaciones del puesto.",
    points: 5,
  },
  {
    id: 22,
    scenario: "Al responder una pregunta de juicio situacional, te encuentras con dos opciones que parecen igualmente correctas.",
    question: "¿Qué estrategia deberías aplicar para seleccionar la mejor respuesta?",
    options: [
      { id: "a", text: "Elegir al azar entre ambas opciones sin analizar más." },
      { id: "b", text: "Analizar cuál opción refleja mejor los valores del servicio público, la ética profesional y el mayor beneficio para todos los involucrados." },
      { id: "c", text: "Seleccionar la opción más breve para ahorrar tiempo de lectura." },
      { id: "d", text: "Buscar la opción que favorezca únicamente tus intereses personales." },
    ],
    correct: "b",
    explanation: "La mejor estrategia es analizar cuál opción refleja mejor los principios del servicio público, la ética profesional y genera el mayor beneficio para la organización, los ciudadanos y los involucrados.",
    points: 5,
  },
  {
    id: 23,
    question: "¿Qué competencias se evalúan principalmente en las pruebas de juicio situacional del sector público?",
    options: [
      { id: "a", text: "Solo habilidades técnicas específicas del cargo." },
      { id: "b", text: "Orientación al servicio, ética, trabajo en equipo, toma de decisiones y resolución de conflictos." },
      { id: "c", text: "Únicamente capacidad de memorización de normativas." },
      { id: "d", text: "Habilidades artísticas y deportivas." },
    ],
    correct: "b",
    explanation: "Las pruebas de juicio situacional en el sector público evalúan competencias comportamentales como orientación al servicio, ética profesional, trabajo en equipo, toma de decisiones y resolución de conflictos, no solo conocimientos técnicos.",
    points: 5,
  },
  {
    id: 24,
    scenario: "Recibes una solicitud de un ciudadano que requiere tramitar un documento urgente, pero falta un requisito menor que podría resolverse en pocos minutos con una llamada telefónica a otra dependencia.",
    question: "¿Cuál acción refleja mejor las competencias del servicio público?",
    options: [
      { id: "a", text: "Rechazar la solicitud estrictamente porque falta el requisito, sin ofrecer alternativas." },
      { id: "b", text: "Realizar la llamada para verificar el requisito y ayudar al ciudadano a completar el trámite de manera ágil." },
      { id: "c", text: "Ignorar el requisito faltante y procesar el documento sin verificación." },
      { id: "d", text: "Pedirle al ciudadano que regrese otro día con el requisito completo sin más orientación." },
    ],
    correct: "b",
    explanation: "La orientación al servicio implica facilitar la gestión del ciudadano dentro del marco normativo. Realizar la verificación telefónica demuestra proactividad, eficiencia y compromiso con el servicio, sin comprometer el cumplimiento de requisitos.",
    points: 5,
  },
  {
    id: 25,
    question: "¿Qué caracteriza una respuesta efectiva en una pregunta de juicio situacional?",
    options: [
      { id: "a", text: "La opción más larga y detallada siempre es la correcta." },
      { id: "b", text: "Aquella que equilibra el cumplimiento normativo, la ética profesional y el impacto positivo en los involucrados." },
      { id: "c", text: "La primera opción que mencione alguna normativa específica." },
      { id: "d", text: "Cualquier respuesta que evite tomar una decisión concreta." },
    ],
    correct: "b",
    explanation: "Una respuesta efectiva equilibra el cumplimiento de normas, los principios éticos del servicio público y genera el mayor impacto positivo para la organización y los ciudadanos, demostrando competencias integrales.",
    points: 5,
  },
]

const questionsV2: Question[] = [
  {
    id: 21,
    scenario: "Eres consultor de turismo sostenible y buscas convencer a una empresa turística para que adopte prácticas sostenibles.",
    question: "¿Qué enfoque usarías?",
    options: [
      { id: "a", text: "Enfatizar solo los costos." },
      { id: "b", text: "Mostrar los beneficios a largo plazo y el impacto positivo en la comunidad." },
      { id: "c", text: "Ignorar los beneficios ambientales." },
      { id: "d", text: "Focalizarse solo en las ganancias inmediatas." },
    ],
    correct: "b",
    explanation: "Mostrar beneficios a largo plazo y el impacto positivo en la comunidad es la estrategia más efectiva para promover prácticas sostenibles.",
    points: 5,
  },
  // Actividad 9 - Salud mental
  {
    id: 22,
    question: "¿Qué se afirma sobre la salud mental?",
    options: [
      { id: "a", text: "Es menos importante que la salud física." },
      { id: "b", text: "Es tan importante como la salud física." },
      { id: "c", text: "No es importante." },
      { id: "d", text: "Es un lujo." },
    ],
    correct: "b",
    explanation: "La salud mental es tan importante como la salud física, aunque muchas personas no buscan ayuda debido al estigma asociado a los trastornos mentales.",
    points: 5,
  },
  {
    id: 23,
    scenario: "Trabajas en recursos humanos y notas que varios empleados muestran signos de estrés y agotamiento.",
    question: "¿Qué acción tomarías para abordar la salud mental en el equipo?",
    options: [
      { id: "a", text: "Ignorar la situación esperando que mejore por sí sola." },
      { id: "b", text: "Implementar programas de bienestar y ofrecer acceso a servicios de apoyo psicológico." },
      { id: "c", text: "Aumentar la carga laboral para mantener la productividad." },
      { id: "d", text: "Sancionar a los empleados que muestren bajo rendimiento." },
    ],
    correct: "b",
    explanation: "Implementar programas de bienestar y ofrecer apoyo psicológico demuestra compromiso con la salud integral de los empleados y previene problemas mayores.",
    points: 5,
  },
  // Escenarios adicionales de juicio situacional
  {
    id: 24,
    scenario: "En tu oficina se ha detectado un error en un documento oficial que ya fue publicado. El error podría generar confusión en los ciudadanos.",
    question: "¿Cuál es la mejor acción a tomar?",
    options: [
      { id: "a", text: "Esperar a que alguien más note el error y lo reporte." },
      { id: "b", text: "Emitir inmediatamente una corrección oficial y comunicar el error de manera transparente." },
      { id: "c", text: "Ocultar el error para evitar problemas con los superiores." },
      { id: "d", text: "Culpar a otro departamento del error." },
    ],
    correct: "b",
    explanation: "La transparencia y la corrección inmediata son fundamentales en el servicio público para mantener la confianza ciudadana y corregir información errónea.",
    points: 5,
  },
  {
    id: 25,
    scenario: "Un colega te pide que apruebes un trámite que no cumple con todos los requisitos, argumentando que es urgente y que 'siempre se ha hecho así'.",
    question: "¿Cómo deberías responder?",
    options: [
      { id: "a", text: "Aprobar el trámite para mantener buenas relaciones con el colega." },
      { id: "b", text: "Rechazar el trámite explicando los requisitos faltantes y ofreciendo orientación para completarlos correctamente." },
      { id: "c", text: "Aprobar el trámite esta vez pero advertir que no se repetirá." },
      { id: "d", text: "Transferir la responsabilidad a un supervisor." },
    ],
    correct: "b",
    explanation: "Mantener la integridad del proceso es esencial. Rechazar el trámite y ofrecer orientación asegura el cumplimiento normativo y ayuda a corregir malas prácticas.",
    points: 5,
  },
  {
    id: 26,
    scenario: "Durante una reunión de equipo, surge un desacuerdo fuerte entre dos colegas sobre cómo abordar un proyecto.",
    question: "¿Cuál sería tu rol más constructivo?",
    options: [
      { id: "a", text: "Tomar partido por la persona con más antigüedad." },
      { id: "b", text: "Facilitar un diálogo constructivo para que ambas partes expongan sus argumentos y buscar un consenso." },
      { id: "c", text: "Dejar que resuelvan el conflicto solos sin intervenir." },
      { id: "d", text: "Proponer tu propia solución sin escuchar las opiniones de los demás." },
    ],
    correct: "b",
    explanation: "Facilitar el diálogo constructivo y buscar consenso demuestra habilidades de mediación y trabajo en equipo, aprovechando diferentes perspectivas.",
    points: 5,
  },
  {
    id: 27,
    scenario: "Te asignan liderar un proyecto en un área en la que tienes poca experiencia, pero el plazo es corto.",
    question: "¿Qué estrategia seguirías?",
    options: [
      { id: "a", text: "Rechazar el proyecto por falta de experiencia." },
      { id: "b", text: "Aceptar el reto, buscar asesoría de expertos y capacitarte rápidamente en el tema." },
      { id: "c", text: "Aceptar pero delegar toda la responsabilidad a otros miembros del equipo." },
      { id: "d", text: "Procrastinar esperando recibir más orientación." },
    ],
    correct: "b",
    explanation: "Aceptar el reto, buscar asesoría y capacitarse demuestra aprendizaje continuo, adaptabilidad y compromiso con el desarrollo profesional.",
    points: 5,
  },
  {
    id: 28,
    scenario: "Un ciudadano solicita información que es pública, pero entregarla requeriría varias horas de trabajo de búsqueda y compilación.",
    question: "¿Cómo manejarías esta solicitud?",
    options: [
      { id: "a", text: "Negar la solicitud porque requiere mucho tiempo." },
      { id: "b", text: "Aceptar la solicitud, establecer un plazo razonable y cumplir con la entrega de la información." },
      { id: "c", text: "Dar información incompleta para ahorrar tiempo." },
      { id: "d", text: "Sugerir al ciudadano que busque la información por su cuenta." },
    ],
    correct: "b",
    explanation: "El derecho de acceso a la información pública debe respetarse. Establecer un plazo razonable permite cumplir con la obligación legal de manera organizada.",
    points: 5,
  },
  {
    id: 29,
    scenario: "Observas que un proceso administrativo en tu área es ineficiente y causa demoras constantes.",
    question: "¿Qué deberías hacer?",
    options: [
      { id: "a", text: "Continuar con el proceso tal como está porque 'así se ha hecho siempre'." },
      { id: "b", text: "Analizar el proceso, identificar mejoras y proponer cambios a tu supervisor." },
      { id: "c", text: "Quejarte del proceso con tus colegas pero no tomar acción." },
      { id: "d", text: "Cambiar el proceso por tu cuenta sin consultar." },
    ],
    correct: "b",
    explanation: "Analizar procesos y proponer mejoras demuestra iniciativa, orientación a resultados y compromiso con la eficiencia institucional.",
    points: 5,
  },
  {
    id: 30,
    scenario: "Durante un evento público, un ciudadano hace comentarios negativos sobre la gestión de la entidad en redes sociales.",
    question: "Como funcionario presente, ¿cómo deberías responder?",
    options: [
      { id: "a", text: "Ignorar los comentarios completamente." },
      { id: "b", text: "Responder profesionalmente, ofreciendo información objetiva y canales formales para presentar inquietudes." },
      { id: "c", text: "Entrar en una discusión defendiendo agresivamente a la entidad." },
      { id: "d", text: "Bloquear al ciudadano en redes sociales." },
    ],
    correct: "b",
    explanation: "Responder profesionalmente con información objetiva y canales formales mantiene la imagen institucional y orienta al ciudadano hacia mecanismos constructivos.",
    points: 5,
  },
  {
    id: 31,
    scenario: "Te ofrecen una capacitación en horario laboral que mejoraría tus habilidades, pero tienes tareas pendientes con plazos cercanos.",
    question: "¿Qué decisión tomarías?",
    options: [
      { id: "a", text: "Rechazar la capacitación para cumplir con las tareas pendientes." },
      { id: "b", text: "Asistir a la capacitación y reorganizar tus tareas o solicitar apoyo para cumplir con los plazos." },
      { id: "c", text: "Asistir a la capacitación ignorando las tareas pendientes." },
      { id: "d", text: "Pedir a un colega que asista en tu lugar." },
    ],
    correct: "b",
    explanation: "El aprendizaje continuo es valioso. Asistir a la capacitación y reorganizar tareas demuestra gestión del tiempo y compromiso con el desarrollo profesional.",
    points: 5,
  },
  {
    id: 32,
    scenario: "Un proveedor externo te ofrece un regalo de considerable valor después de adjudicarse un contrato con la entidad.",
    question: "¿Cuál es la acción correcta?",
    options: [
      { id: "a", text: "Aceptar el regalo ya que el contrato ya está adjudicado." },
      { id: "b", text: "Rechazar cortésmente el regalo y reportar la situación según los protocolos de ética institucional." },
      { id: "c", text: "Aceptar el regalo pero no contárselo a nadie." },
      { id: "d", text: "Aceptar el regalo y compartirlo con todo el equipo." },
    ],
    correct: "b",
    explanation: "Rechazar regalos de valor y reportar la situación protege la integridad, evita conflictos de interés y cumple con los códigos de ética del servicio público.",
    points: 5,
  },
  {
    id: 33,
    scenario:
      "La metodología de juicio situacional utiliza escenarios vinculados al trabajo para evaluar competencias como toma de decisiones, resolución de problemas, ética profesional y manejo de conflictos, analizando cómo las respuestas inciden en el entorno laboral.",
    question: "¿Qué enunciado resume el objetivo de esta metodología?",
    options: [
      { id: "a", text: "Medir únicamente conocimientos normativos mediante preguntas cerradas." },
      {
        id: "b",
        text: "Valorar competencias clave a partir de escenarios laborales simulados, observando el impacto de las decisiones en el contexto institucional.",
      },
      { id: "c", text: "Reemplazar entrevistas individuales por pruebas psicométricas automatizadas." },
      { id: "d", text: "Calificar solo la rapidez con la que se elige una alternativa." },
    ],
    correct: "b",
    explanation:
      "El juicio situacional busca evaluar cómo las personas aplican competencias en situaciones laborales simuladas y cómo sus decisiones afectan al entorno y a los involucrados.",
    points: 5,
  },
  {
    id: 34,
    question: "¿Qué distingue las pruebas de juicio situacional de otros tipos de evaluación en selección de personal?",
    options: [
      { id: "a", text: "Se enfocan exclusivamente en conocimientos técnicos memorizados." },
      { id: "b", text: "Presentan escenarios realistas del contexto laboral para evaluar competencias aplicadas en situaciones prácticas." },
      { id: "c", text: "Evalúan únicamente la capacidad de lectura rápida del candidato." },
      { id: "d", text: "Miden solamente habilidades matemáticas básicas." },
    ],
    correct: "b",
    explanation: "Las pruebas de juicio situacional se distinguen por presentar escenarios realistas del contexto laboral que permiten evaluar cómo los candidatos aplican sus competencias en situaciones prácticas similares a las que enfrentarán en el puesto.",
    points: 5,
  },
  {
    id: 35,
    scenario: "Estás tomando una prueba de juicio situacional y encuentras un escenario donde todas las opciones tienen aspectos positivos y negativos.",
    question: "¿Cómo deberías proceder para seleccionar la mejor respuesta?",
    options: [
      { id: "a", text: "Seleccionar al azar sin analizar las consecuencias de cada opción." },
      { id: "b", text: "Identificar cuál opción minimiza riesgos, maximiza beneficios y se alinea mejor con los valores institucionales." },
      { id: "c", text: "Elegir siempre la opción más conservadora que implique no tomar ninguna acción." },
      { id: "d", text: "Buscar la opción que beneficie únicamente tus metas personales." },
    ],
    correct: "b",
    explanation: "La mejor estrategia es analizar las consecuencias de cada opción, identificando cuál minimiza riesgos, maximiza beneficios para todos los involucrados y se alinea mejor con los valores y objetivos de la institución pública.",
    points: 5,
  },
  {
    id: 36,
    question: "En el contexto de las pruebas de juicio situacional, ¿qué significa demostrar competencia en toma de decisiones?",
    options: [
      { id: "a", text: "Tomar decisiones rápidas sin considerar las consecuencias." },
      { id: "b", text: "Analizar el contexto, evaluar alternativas, considerar impactos y elegir la opción más adecuada según principios éticos y organizacionales." },
      { id: "c", text: "Delegar todas las decisiones a otras personas para evitar responsabilidad." },
      { id: "d", text: "Elegir siempre la opción más popular sin análisis crítico." },
    ],
    correct: "b",
    explanation: "La competencia en toma de decisiones implica analizar el contexto, evaluar alternativas considerando sus impactos, y elegir la opción más adecuada basándose en principios éticos, normativos y objetivos organizacionales.",
    points: 5,
  },
  {
    id: 37,
    scenario: "Durante un proceso de selección, enfrentas una pregunta de juicio situacional sobre manejo de conflictos entre compañeros de trabajo.",
    question: "¿Qué enfoque refleja mejor las competencias esperadas en el servicio público?",
    options: [
      { id: "a", text: "Ignorar el conflicto esperando que se resuelva solo con el tiempo." },
      { id: "b", text: "Facilitar el diálogo entre las partes, buscar puntos comunes y promover una solución constructiva que beneficie el ambiente laboral." },
      { id: "c", text: "Tomar partido por uno de los compañeros según preferencias personales." },
      { id: "d", text: "Reportar inmediatamente a ambos empleados sin intentar mediar primero." },
    ],
    correct: "b",
    explanation: "El manejo efectivo de conflictos en el servicio público implica facilitar el diálogo, buscar puntos comunes y promover soluciones constructivas que beneficien el ambiente laboral y la productividad organizacional.",
    points: 5,
  },
  {
    id: 38,
    question: "¿Qué elementos se deben considerar al analizar un escenario de juicio situacional en el contexto público?",
    options: [
      { id: "a", text: "Solo el beneficio personal que se puede obtener de la situación." },
      { id: "b", text: "El marco normativo aplicable, los principios éticos del servicio público, el impacto en ciudadanos y la misión institucional." },
      { id: "c", text: "Únicamente la opinión personal sin considerar normas ni consecuencias." },
      { id: "d", text: "Solo el tiempo que tomará resolver la situación." },
    ],
    correct: "b",
    explanation: "Al analizar escenarios en el contexto público se debe considerar el marco normativo, los principios éticos (honestidad, respeto, diligencia, justicia, compromiso), el impacto en los ciudadanos y la alineación con la misión institucional.",
    points: 5,
  },
]

export function JuicioSituacionalTest() {
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2">("v1")
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = selectedVersion === "v1" ? questionsV1 : questionsV2

  const totalScore = useMemo(() => questions.reduce((sum, q) => sum + q.points, 0), [questions])

  const handleVersionChange = (value: string) => {
    setSelectedVersion(value as "v1" | "v2")
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
  }

  const handleAnswerChange = (questionId: number, answerId: string) => {
    if (showResults) return
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.keys(answers).length < questions.length) return

    setShowResults(true)
    setShowFeedback(false)
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
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
      return "Excelente capacidad de juicio situacional. Demuestras toma de decisiones acertadas y orientación a buenas prácticas."
    }
    if (percentage >= 70) {
      return "Buen nivel de juicio situacional. Revisa la retroalimentación para fortalecer áreas específicas."
    }
    return "Es necesario reforzar las competencias de juicio situacional. Revisa cuidadosamente la retroalimentación y practica con más escenarios."
  })()

  const unansweredCount = questions.length - Object.keys(answers).length

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-white/30 bg-white/80 shadow-lg shadow-primary/15 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-balance">Juicio Situacional</CardTitle>
          <CardDescription className="text-balance leading-relaxed">
            Evalúa tu capacidad para tomar decisiones efectivas ante situaciones laborales complejas en el contexto
            del servicio público.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <Alert className="border-primary/30 bg-primary/10">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertDescription>
              Esta prueba presenta escenarios reales del ámbito público. Selecciona la respuesta que mejor refleje las
              buenas prácticas de gestión pública, ética profesional y orientación al servicio.
            </AlertDescription>
          </Alert>
          <p>
            Cada pregunta presenta una situación y varias opciones de respuesta. Analiza cuidadosamente cada escenario
            y selecciona la opción que consideres más apropiada según los principios del servicio público.
          </p>
        </CardContent>
      </Card>

      <Card className="border-white/30 bg-white/80 shadow-lg shadow-primary/15 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">Selecciona la versión de la prueba</CardTitle>
          <CardDescription>
            Cada versión contiene diferentes escenarios y preguntas de juicio situacional
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedVersion} onValueChange={handleVersionChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="v1" disabled={showResults}>
                Versión 1 ({questionsV1.length} preguntas)
              </TabsTrigger>
              <TabsTrigger value="v2" disabled={showResults}>
                Versión 2 ({questionsV2.length} preguntas)
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {showResults && (
            <p className="text-sm text-muted-foreground mt-3">Reinicia la prueba para cambiar de versión</p>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        {questions.map((question, index) => {
          const selectedAnswer = answers[question.id]
          const isCorrect = showResults && selectedAnswer === question.correct
          const showState = showResults && showFeedback

          return (
            <Card
              key={question.id}
              className={`border transition-colors ${
                showState
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
                {question.scenario && (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                    <p className="text-sm leading-relaxed text-foreground">
                      <span className="font-semibold text-primary">Escenario:</span> {question.scenario}
                    </p>
                  </div>
                )}
                <CardTitle className="text-lg font-semibold leading-relaxed text-balance">
                  {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {question.options.map((option) => {
                  const isSelected = selectedAnswer === option.id
                  const isOptionCorrect = question.correct === option.id
                  const showCorrect = showState && isOptionCorrect
                  const showIncorrect = showState && isSelected && !isOptionCorrect

                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition-all ${
                        isSelected
                          ? "border-primary/60 bg-primary/10 text-primary"
                          : "border-white/40 bg-white/70 hover:border-primary/40 hover:bg-primary/5"
                      } ${showResults ? "pointer-events-none opacity-90" : ""}`}
                    >
                      <span className="flex-1 text-left leading-relaxed">{option.text}</span>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.id}
                        checked={isSelected}
                        onChange={() => handleAnswerChange(question.id, option.id)}
                        disabled={showResults}
                        className="hidden"
                      />
                      {showCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />}
                      {showIncorrect && <AlertCircle className="h-5 w-5 text-rose-500" aria-hidden="true" />}
                    </label>
                  )
                })}

                {showState && (
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
          {showFeedback ? "Ocultar" : "Ver"} Retroalimentación
        </Button>
        <Button type="button" variant="ghost" className="gap-2" onClick={handleReset}>
          <RefreshCw className="h-4 w-4" />
          Intentar nuevamente
        </Button>
      </div>

      {unansweredCount > 0 && !showResults && (
        <div className="rounded-2xl border border-amber-400/60 bg-amber-50/80 px-4 py-3 text-sm text-amber-700">
          Debes responder {unansweredCount} {unansweredCount === 1 ? "pregunta" : "preguntas"} para habilitar la
          calificación.
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
            Usa la retroalimentación para comprender las mejores prácticas en cada situación.
          </p>
        </div>
      )}
    </form>
  )
}
