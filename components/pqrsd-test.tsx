"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, FileText } from "lucide-react"
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

export const pqrsdQuestions: Question[] = [
  // DERECHO DE PETICIÓN (8 preguntas)
  {
    id: 1,
    question: "Situacion\n\nUn ciudadano acude a la Alcaldia de Medellin y presenta una peticion escrita solicitando informacion sobre los requisitos para obtener una licencia de construccion. El funcionario de ventanilla debe orientarlo sobre el marco legal que regula este tipo de solicitudes y los plazos aplicables.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es la norma principal que regula el derecho de peticion en Colombia?",
    options: [
      "Únicamente la Constitución Política",
      "El Código Civil",
      "La Ley 1755 de 2015 (Código de Procedimiento Administrativo y de lo Contencioso Administrativo - CPACA)",
      "Solo normas internas de cada entidad"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el funcionario debe informar al ciudadano que la Ley 1755 de 2015 regula el derecho de peticion ante autoridades. Esta ley se fundamenta en el articulo 23 de la Constitucion Politica y desarrolla procedimientos, plazos, requisitos y consecuencias del silencio administrativo. Aplica a entidades publicas y particulares que prestan servicios publicos o ejercen funciones publicas.",
    topic: "Marco normativo del derecho de petición"
  },
  {
    id: 2,
    question: "Situacion\n\nEn la oficina de atencion al ciudadano de la Gobernacion de Antioquia, una persona solicita orientacion porque desea presentar una peticion relacionada con el estado de las vias de su vereda, que afectan a toda la comunidad. El funcionario debe explicarle quien tiene derecho a presentar peticiones.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿quienes pueden presentar peticiones respetuosas a las autoridades y por que motivos?",
    options: [
      "Solo interés general",
      "Interés general o particular, y a obtener pronta resolución",
      "Únicamente interés comercial",
      "Solo si es funcionario público"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el funcionario debe informar al ciudadano que el articulo 23 de la Constitucion Politica garantiza que toda persona puede presentar peticiones respetuosas por motivos de interes general o particular, y a obtener pronta resolucion. No requiere condicion especial, es un derecho fundamental de todos los habitantes del territorio nacional.",
    topic: "Naturaleza del derecho de petición"
  },
  {
    id: 3,
    question: "Situacion\n\nUn ciudadano radica en la Secretaria de Planeacion Municipal una peticion solicitando informacion sobre el Plan de Ordenamiento Territorial y sus restricciones de uso de suelo para un predio especifico. El funcionario responsable debe determinar el plazo legal para responder.\n\nPregunta\n\nSegun la situacion descrita, ¿en cuanto tiempo debe la entidad resolver esta peticion de informacion?",
    options: [
      "30 días hábiles",
      "10 días hábiles",
      "15 días hábiles",
      "5 días hábiles"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, segun el articulo 14 de la Ley 1755/2015, las peticiones de informacion como la del ciudadano sobre el POT deben resolverse en 10 dias habiles contados desde su recibo. Este es uno de los plazos mas breves. Si la informacion esta en otra dependencia, el termino se amplia a 10 dias adicionales.",
    topic: "Plazos para responder peticiones"
  },
  {
    id: 4,
    question: "Situacion\n\nUna organizacion comunitaria presenta ante la Alcaldia una peticion solicitando informacion sobre el presupuesto destinado a programas de alimentacion escolar en todo el municipio y su ejecucion. Esta peticion beneficia a toda la comunidad educativa.\n\nPregunta\n\nCon base en la situacion planteada, ¿en cuanto tiempo debe resolverse esta peticion de interes general?",
    options: [
      "5 días hábiles",
      "10 días hábiles",
      "15 días hábiles",
      "20 días hábiles"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el articulo 14 de la Ley 1755/2015 establece que las peticiones de interes general, como la solicitud de la organizacion comunitaria sobre presupuesto de alimentacion escolar que beneficia a toda la comunidad, se resuelven en 15 dias habiles. Esto incluye peticiones sobre politicas publicas, rendicion de cuentas colectiva, o que benefician a una comunidad o grupo amplio de personas.",
    topic: "Plazos para interés general"
  },
  {
    id: 5,
    question: "Situacion\n\nUn abogado presenta ante la Secretaria Juridica del Departamento una peticion de consulta solicitando un concepto sobre la interpretacion de una norma departamental relacionada con tasas de valorizacion y su aplicacion a predios rurales. El funcionario debe determinar el plazo aplicable.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cual es el termino para resolver esta peticion de consulta?",
    options: [
      "30 días hábiles prorrogables por otros 30",
      "10 días hábiles",
      "5 días hábiles",
      "60 días calendario"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, la peticion del abogado solicitando concepto sobre interpretacion normativa es una peticion de consulta segun el articulo 14 Ley 1755/2015, que requiere concepto, interpretacion juridica o aplicacion de normas a casos especificos. El plazo es de 30 dias habiles, prorrogables por 30 dias mas cuando se requiere consulta a otras dependencias o analisis complejo. La prorroga debe informarse antes del vencimiento.",
    topic: "Peticiones de consulta"
  },
  {
    id: 6,
    question: "Situacion\n\nUn ciudadano radica una peticion ante la Secretaria de Movilidad solicitando informacion sobre comparendos a su nombre, pero no adjunta copia de su documento de identidad ni especifica el periodo de tiempo que desea consultar. El funcionario revisa la peticion y detecta que esta incompleta.\n\nPregunta\n\nSegun la situacion planteada, ¿como debe proceder la autoridad ante esta peticion incompleta?",
    options: [
      "Rechazarla inmediatamente sin más trámite",
      "Requerir al peticionario dentro de los 10 días siguientes para que la complete en el término de un mes",
      "Archivarla sin respuesta",
      "Remitirla a otra entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el articulo 17 de la Ley 1755/2015 obliga a la entidad a formular el requerimiento de informacion faltante al ciudadano dentro de los 10 dias siguientes al recibo. El peticionario tiene un mes para completarla con la copia del documento y especificar el periodo. Si no lo hace, se archiva la peticion. La entidad no puede rechazar de plano sin dar oportunidad de completar.",
    topic: "Peticiones incompletas"
  },
  {
    id: 7,
    question: "Situacion\n\nUna empresa constructora presento ante Curaduria Urbana una solicitud de licencia de construccion hace 45 dias habiles y no ha recibido respuesta. El representante legal consulta con su abogado sobre las consecuencias juridicas de este silencio por parte de la autoridad.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuando opera el silencio administrativo positivo?",
    options: [
      "En cualquier petición no contestada",
      "La petición no se resuelve en los términos legales y la ley expresamente lo establece (ej: licencias, autorizaciones)",
      "Nunca aplica en Colombia",
      "Solo en peticiones laborales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el silencio administrativo positivo (articulo 40 CPACA) significa que la solicitud de licencia de construccion de la empresa se entiende aprobada si la autoridad no responde en el plazo legal. Solo opera cuando una norma especifica lo establece (como en licencias de construccion y algunas autorizaciones). No aplica a todas las peticiones automaticamente. El negativo es mas comun.",
    topic: "Silencio administrativo positivo"
  },
  {
    id: 8,
    question: "Situacion\n\nEn la ventanilla de correspondencia de la Alcaldia, un funcionario recibe una peticion escrita de un ciudadano que contiene el nombre completo, numero de cedula y la solicitud de expedicion de un certificado de estratificacion, pero no incluye direccion de notificacion ni firma. El funcionario debe verificar si cumple los requisitos.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿cuales son los requisitos minimos de una peticion escrita?",
    options: [
      "Solo el nombre del peticionario",
      "Designación de la autoridad, nombres del peticionario, objeto de la petición, razones, dirección para notificaciones, y firma si es escrita",
      "Únicamente el objeto de la petición",
      "Solo la identificación y fecha"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la peticion del ciudadano esta incompleta. El articulo 16 de la Ley 1755/2015 exige: 1) Designacion de la autoridad a quien va dirigida; 2) Nombres y apellidos completos del peticionario e identificacion; 3) Objeto de la peticion; 4) Razones en que se apoya; 5) Relacion de documentos anexos; 6) Firma (escrita o electronica si aplica). Las peticiones verbales son posibles en algunos casos.",
    topic: "Requisitos de la petición"
  },

  // TIPOS DE PETICIONES (5 preguntas)
  {
    id: 9,
    question: "Situacion\n\nUna ciudadana se acerca a la oficina de PQRSD de la Secretaria de Salud para manifestar su inconformidad porque un funcionario del hospital publico la atendio de manera grosera y negligente durante una cita medica, generandole angustia y demora innecesaria.\n\nPregunta\n\nSegun la situacion descrita, ¿como debe clasificarse esta manifestacion de la ciudadana?",
    options: [
      "Una solicitud de información",
      "La manifestación de protesta, censura, inconformidad o descontento del peticionario respecto de una presunta irregularidad en la prestación del servicio o conducta de un servidor",
      "Una solicitud de compensación económica",
      "Un recurso judicial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la manifestacion de la ciudadana es una queja porque expresa inconformidad por presuntas irregularidades, mal servicio, o conducta indebida del funcionario del hospital. No busca una prestacion especifica sino senalar una situacion irregular. La autoridad debe investigar y tomar medidas correctivas. Se diferencia del reclamo que si busca una prestacion insatisfecha.",
    topic: "Queja"
  },
  {
    id: 10,
    question: "Situacion\n\nUn pensionado acude a la oficina de atencion al ciudadano del fondo de pensiones publico para exigir el pago de tres mesadas pensionales que no le han sido consignadas a pesar de tener resolucion de reconocimiento de pension en firme desde hace cuatro meses.\n\nPregunta\n\nCon base en la situacion planteada, ¿como debe clasificarse esta solicitud del pensionado?",
    options: [
      "Una petición de información general",
      "La manifestación con la cual el peticionario exige a la entidad el reconocimiento de un derecho o el cumplimiento de una obligación legal o contractual incumplida",
      "Una sugerencia de mejora",
      "Una denuncia penal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la solicitud del pensionado es un reclamo porque busca que la entidad cumpla una obligacion legal que ha incumplido: el pago de las mesadas pensionales reconocidas. Requiere respuesta de fondo sobre la procedencia de lo reclamado y las acciones para cumplir con el pago adeudado.",
    topic: "Reclamo"
  },
  {
    id: 11,
    question: "Situacion\n\nUn usuario frecuente del Centro de Atencion al Ciudadano envia un correo electronico proponiendo que se implemente un sistema de turnos digital con notificacion por mensaje de texto, para evitar que los ciudadanos tengan que esperar largas horas en la fila fisica.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿como debe clasificarse esta comunicacion del usuario?",
    options: [
      "Una obligación que debe acatar la entidad inmediatamente",
      "Una propuesta, recomendación o idea presentada por el peticionario para mejorar el servicio o la gestión de la entidad",
      "Una denuncia de corrupción",
      "Una petición de información confidencial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la comunicacion del usuario es una sugerencia porque es una manifestacion constructiva orientada a mejorar el proceso de atencion al ciudadano. No exige una prestacion especifica sino que aporta ideas de mejora. La entidad debe analizarla, responder sobre su viabilidad, y considerarla en la mejora continua de sus servicios.",
    topic: "Sugerencia"
  },
  {
    id: 12,
    question: "Situacion\n\nUn contratista que trabaja en una obra publica municipal envia un correo anonimo a la oficina de control interno informando que el supervisor de la obra esta solicitando dinero a los proveedores a cambio de aprobar las actas de pago, aunque el denunciante no tiene interes personal en el asunto.\n\nPregunta\n\nSegun la situacion planteada, ¿como debe clasificarse esta comunicacion anonima?",
    options: [
      "Una petición de información",
      "La puesta en conocimiento de la autoridad de hechos que podrían constituir una posible conducta irregular, delictiva, o de corrupción, sin que el denunciante tenga interés directo",
      "Una solicitud de empleo",
      "Una queja de servicio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la comunicacion del contratista es una denuncia porque pone en conocimiento de la autoridad competente hechos irregulares y posiblemente delictivos de corrupcion, sin que el denunciante tenga un interes personal o particular en el asunto. Puede ser anonima. Genera obligacion de investigar por parte de la entidad (control interno, disciplinaria, o penal segun el caso).",
    topic: "Denuncia"
  },
  {
    id: 13,
    question: "Situacion\n\nUn investigador universitario presenta una solicitud ante el Instituto de Desarrollo Urbano requiriendo datos estadisticos sobre el numero de licencias de construccion aprobadas en los ultimos cinco anos. El funcionario debe determinar si esta es una peticion de informacion o una solicitud de acceso a documentos publicos.\n\nPregunta\n\nCon base en la situacion descrita, ¿de que deben distinguirse las peticiones de informacion?",
    options: [
      "No tienen diferencia con otros tipos",
      "Las solicitudes de acceso a documentos públicos (Ley 1712/2014 de Transparencia), que tienen procedimiento específico",
      "Las quejas y reclamos",
      "Las tutelas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la solicitud del investigador es una peticion de informacion (Ley 1755) porque solicita datos e informes a la entidad (plazo: 10 dias). Se distingue del acceso a documentos publicos (Ley 1712/2014) que solicita copia de documentos especificos existentes (plazo: 10 dias habiles, maximo 20 si requiere busqueda). La Ley 1712 tiene causales de reserva y clasificacion especiales.",
    topic: "Petición de información vs acceso a documentos"
  },

  // TRANSPARENCIA Y ACCESO A LA INFORMACIÓN (7 preguntas)
  {
    id: 14,
    question: "Situacion\n\nUn periodista solicita ante la oficina juridica de la Gobernacion acceso a los contratos de consultoria suscritos en el ultimo ano, invocando su derecho a acceder a informacion publica. El funcionario debe determinar cual norma regula este tipo de solicitudes.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que regula la Ley 1712 de 2014?",
    options: [
      "Solo el derecho de petición",
      "El derecho de acceso a la información pública, transparencia activa y pasiva, y excepciones de acceso",
      "Únicamente los salarios de funcionarios",
      "Solo la contratación pública"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la solicitud del periodista se tramita segun la Ley 1712 de 2014 (Ley de Transparencia y Acceso a la Informacion Publica) que desarrolla el articulo 20 constitucional. Regula: derecho de acceso a informacion y documentos publicos, obligaciones de transparencia activa (publicar proactivamente), procedimiento de acceso (transparencia pasiva - a solicitud), excepciones y reserva legal, y mecanismos de control.",
    topic: "Ley 1712 de 2014"
  },
  {
    id: 15,
    question: "Situacion\n\nUn ciudadano solicita a la Secretaria de Educacion copia de los estudios previos de un contrato de suministro de refrigerios escolares. El funcionario debe determinar si estos documentos son informacion publica y pueden ser entregados al solicitante.\n\nPregunta\n\nSegun la situacion descrita, ¿que se considera informacion publica?",
    options: [
      "Solo la que está en internet",
      "Toda información en posesión, bajo control o custodia de un sujeto obligado (entidades públicas y ciertos particulares)",
      "Únicamente información impresa",
      "Solo información financiera"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, los estudios previos solicitados por el ciudadano son informacion publica segun el articulo 6 Ley 1712: informacion publica es toda la que genera, obtiene, adquiere, transforma o controla un sujeto obligado. Incluye cualquier formato: escrito, digital, audiovisual. La regla es maxima publicidad; la reserva es excepcional y taxativa.",
    topic: "Concepto de información pública"
  },
  {
    id: 16,
    question: "Situacion\n\nUn solicitante pide a la Fiscalia General copia del expediente de una investigacion penal en curso contra un funcionario publico por presuntos actos de corrupcion. El fiscal a cargo debe evaluar si puede entregar esta informacion o si aplica alguna excepcion.\n\nPregunta\n\nCon base en la situacion planteada, ¿por que razones puede exceptuarse la informacion clasificada y reservada del acceso publico?",
    options: [
      "Cualquier decisión discrecional del funcionario",
      "Defensa y seguridad nacional, relaciones internacionales, protección de datos personales (Ley 1581/2012), secretos comerciales/industriales, orden público, debido proceso, o cuando la ley lo establezca",
      "Comodidad administrativa",
      "Solo si el jefe lo decide sin justificación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el expediente de la investigacion penal en curso puede ser reservado por el fiscal invocando proteccion del debido proceso en etapa de indagacion. El articulo 18 de la Ley 1712 establece las excepciones: informacion que afecte defensa y seguridad, relaciones internacionales, datos personales (Habeas Data), secreto comercial, debido proceso, o que ponga en riesgo derechos. Debe motivarse la reserva; es temporal y revisable.",
    topic: "Excepciones al acceso"
  },
  {
    id: 17,
    question: "Situacion\n\nUn ciudadano ingresa al sitio web de la Alcaldia buscando informacion sobre la estructura organizacional, el presupuesto vigente y los contratos celebrados, pero no encuentra estos datos publicados. Presenta una queja por falta de transparencia.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿a que se refiere la transparencia activa?",
    options: [
      "Responder peticiones de acceso",
      "La obligación de las entidades de publicar proactivamente información mínima obligatoria sin esperar solicitud (estructura, funciones, contratación, presupuesto, instrumentos de gestión)",
      "Solo publicar noticias",
      "Únicamente redes sociales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la queja del ciudadano es procedente porque la Alcaldia esta incumpliendo la transparencia activa (art. 9-11 Ley 1712): obligacion de publicar de oficio, sin que medie solicitud, informacion minima como: estructura organica, funciones, normas, directorio, escalas salariales, presupuesto, contratacion, planeacion, control, tramites, informes de gestion, datos abiertos. Debe estar en sitios web accesibles y actualizados.",
    topic: "Transparencia activa"
  },
  {
    id: 18,
    question: "Situacion\n\nUn estudiante de derecho solicita a la Personeria Municipal copia de todas las actas de las visitas administrativas realizadas a establecimientos comerciales durante el semestre anterior. El funcionario debe informarle el plazo para entregar esta informacion.\n\nPregunta\n\nSegun la situacion planteada, ¿cual es el termino para entregar informacion publica solicitada?",
    options: [
      "5 días calendario",
      "10 días hábiles, prorrogables hasta 10 días más si la búsqueda es compleja",
      "30 días hábiles",
      "15 días calendario"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, segun el articulo 13 Ley 1712, las actas solicitadas por el estudiante deben entregarse en 10 dias habiles desde la solicitud. Si es necesaria busqueda en diferentes dependencias, analisis de volumen considerable, o requiere recoleccion en lugares distintos, se puede prorrogar hasta 10 dias adicionales, informando al solicitante antes del vencimiento del plazo inicial.",
    topic: "Plazo de entrega de información pública"
  },
  {
    id: 19,
    question: "Situacion\n\nUna veeduria ciudadana solicita acceso a los informes de interventoria de un contrato de obra publica. La entidad niega el acceso argumentando que contienen informacion reservada, pero solo envia un oficio diciendo \"se niega por ser reservada\" sin mayor explicacion.\n\nPregunta\n\nCon base en la situacion descrita, ¿como debe proceder la entidad si niega el acceso a informacion publica?",
    options: [
      "Solo decir 'no' sin justificación",
      "Motivar la negativa indicando la causal de reserva legal, normatividad aplicable, y advertir sobre recursos disponibles",
      "Ignorar la solicitud",
      "Remitir a otra entidad sin responder"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la entidad actuo incorrectamente. Toda negativa de acceso (art. 15 Ley 1712) debe ser expresa, escrita y motivada, indicando: 1) Causal legal de reserva que aplica; 2) Norma que la sustenta; 3) Razones de aplicacion al caso; 4) Recursos disponibles (reposicion y apelacion). La carga de probar que la informacion es reservada es de la entidad, aplicando test de dano y principio de proporcionalidad.",
    topic: "Negativa de acceso a información"
  },
  {
    id: 20,
    question: "Situacion\n\nDurante una auditoria, la Contraloria Departamental solicita a una entidad el listado de toda la informacion que ha sido clasificada como reservada, con sus justificaciones y plazos. El jefe de archivo debe ubicar este registro.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿que es el Indice de Informacion Clasificada y Reservada?",
    options: [
      "Un documento secreto que nadie puede ver",
      "Un registro público que deben llevar las entidades con la información clasificada, justificación, plazo de reserva y responsable",
      "Solo un listado interno sin publicidad",
      "No es obligatorio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la entidad debe entregar el Indice de Informacion Clasificada y Reservada segun el articulo 21 Ley 1712: toda entidad debe elaborar y actualizar semestralmente este registro, publicandolo en su sitio web. Debe contener: informacion clasificada, causal de reserva, fundamento legal, plazo de reserva (maximo 15 anos, prorrogables en casos excepcionales), y funcionario responsable. Permite control ciudadano.",
    topic: "Índice de Información Reservada"
  },

  // GESTIÓN DOCUMENTAL (5 preguntas)
  {
    id: 21,
    question: "Situacion\n\nLa nueva directora de la oficina de PQRSD de un municipio desea organizar el archivo de peticiones de los ultimos 10 anos y necesita conocer el marco normativo aplicable para la gestion de documentos en entidades publicas.\n\nPregunta\n\nSegun la situacion descrita, ¿cual es la normativa que regula la gestion documental en entidades publicas?",
    options: [
      "No hay regulación específica",
      "La Ley 594 de 2000 (Ley General de Archivos) y normatividad del Archivo General de la Nación",
      "Solo normas internas de cada entidad",
      "Únicamente el código de comercio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la directora debe aplicar la Ley 594 de 2000 (Ley General de Archivos) que regula la funcion archivistica, administracion de documentos publicos, conservacion del patrimonio documental, y gestion de archivos. El Archivo General de la Nacion (AGN) emite directrices tecnicas mediante acuerdos: tablas de retencion documental (TRD), organizacion de archivos, transferencias, digitalizacion.",
    topic: "Normatividad de gestión documental"
  },
  {
    id: 22,
    question: "Situacion\n\nEl coordinador de archivo de una Secretaria Departamental debe determinar cuanto tiempo conservar los expedientes de PQRSD cerrados y si deben transferirse al archivo central o eliminarse. Consulta las Tablas de Retencion Documental de la entidad.\n\nPregunta\n\nCon base en la situacion planteada, ¿que determinan las Tablas de Retencion Documental (TRD)?",
    options: [
      "Solo quién puede acceder a archivos",
      "Los documentos que produce cada área, tiempo de permanencia en cada archivo (gestión, central, histórico), y disposición final (conservación total, eliminación, selección)",
      "Únicamente el color de las carpetas",
      "Solo los nombres de los empleados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el coordinador encontrara en las TRD (Acuerdo AGN 004/2019) la informacion que necesita: las TRD son instrumento archivistico que identifica series documentales por dependencia, tiempos de retencion en archivo de gestion (oficina), tiempos en archivo central (entidad), disposicion final (CT=conservacion total, E=eliminacion, S=seleccion, M=microfilmacion/digitalizacion). Fundamenta transferencias documentales y depuracion de archivos.",
    topic: "Tablas de Retención Documental"
  },
  {
    id: 23,
    question: "Situacion\n\nUn ciudadano entrega personalmente una peticion en la ventanilla de correspondencia de la Alcaldia a las 3:45 pm del viernes. El funcionario debe asignarle un numero de radicado y entregarle copia como constancia de recibido.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que caracteristicas debe tener el radicado de documentos en entidades publicas?",
    options: [
      "Ser aleatorio sin control",
      "Asignar número consecutivo único, fecha y hora de recibo, garantizando trazabilidad y control de documentos entrantes, salientes e internos",
      "Solo numerar algunos documentos",
      "No es necesario radicar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el funcionario debe aplicar el radicado segun el Decreto 2609/2012: asignar numero consecutivo unico e irrepetible a la peticion del ciudadano. Incluye: fecha y hora exacta de recibo (3:45 pm del viernes), origen/destino, nombre del remitente/destinatario, asunto, numero de folios, anexos. Permite trazabilidad completa. Se clasifican en: entrada, salida, internos. Facilita consulta y respuesta oportuna.",
    topic: "Radicación de documentos"
  },
  {
    id: 24,
    question: "Situacion\n\nLa oficina de PQRSD inicia un proyecto para digitalizar todos los expedientes de peticiones de los ultimos 5 anos y eliminar los documentos fisicos para liberar espacio. El jefe de archivo debe verificar que se cumplan los requisitos tecnicos.\n\nPregunta\n\nSegun la situacion planteada, ¿que requisitos debe cumplir la digitalizacion de documentos publicos?",
    options: [
      "Cualquier método sin requisitos",
      "Lineamientos técnicos del AGN (Acuerdo 006/2014): resolución adecuada, formato estándar, metadatos, firma electrónica, hash, y garantizar autenticidad, integridad y accesibilidad",
      "Solo escanear sin más requisitos",
      "No se puede digitalizar documentos públicos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la digitalizacion de los expedientes debe cumplir el Acuerdo AGN 006/2014: resolucion minima (200-300 dpi segun tipo), formatos estandar (PDF/A, TIFF), metadatos descriptivos, tecnicos y administrativos, almacenamiento seguro con copias de respaldo, firma electronica y hash para autenticidad, y cumplir protocolo de digitalizacion certificada. Los documentos digitalizados tienen validez probatoria.",
    topic: "Digitalización de documentos"
  },
  {
    id: 25,
    question: "Situacion\n\nDurante la organizacion del archivo historico municipal, un auxiliar propone mezclar los documentos de la antigua Secretaria de Obras con los de la nueva Secretaria de Infraestructura para facilitar la consulta tematica. El archivista debe explicarle por que esto viola los principios archivisticos.\n\nPregunta\n\nCon base en la situacion planteada, ¿que significa el principio de procedencia archivistica?",
    options: [
      "Los documentos pueden mezclarse de cualquier entidad",
      "Los documentos deben conservarse agrupados en el fondo de la entidad que los produjo, sin mezclar con fondos de otras entidades",
      "Solo importa el año de creación",
      "Los documentos deben ordenarse alfabéticamente sin importar origen"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la propuesta del auxiliar es incorrecta porque viola el principio de procedencia o respeto de los fondos: los documentos generados por una institucion (la antigua Secretaria de Obras) deben mantenerse agrupados en su fondo documental, sin mezclarlos con documentos de otras entidades (la nueva Secretaria de Infraestructura). Preserva el contexto de produccion. Se complementa con el principio de orden original.",
    topic: "Principios archivísticos"
  }
]

const questionsV2: Question[] = [
  // DERECHO DE PETICIÓN - AVANZADO (6 preguntas)
  {
    id: 26,
    question: "Situacion\n\nUn ciudadano presento hace 20 dias habiles una peticion ante la Secretaria de Hacienda solicitando la devolucion de un pago en exceso por impuesto predial. No ha recibido respuesta y consulta con un abogado sobre sus opciones legales ante este silencio de la administracion.\n\nPregunta\n\nSegun la situacion descrita, ¿que permite al peticionario el silencio administrativo negativo?",
    options: [
      "No tener ninguna consecuencia",
      "Interponer acciones judiciales (nulidad, nulidad y restablecimiento, tutela subsidiaria) como si hubiera respuesta negativa expresa",
      "Solo esperar indefinidamente",
      "Únicamente insistir verbalmente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el silencio administrativo negativo (articulo 83 CPACA) opera porque vencio el plazo legal de 15 dias sin respuesta. Se presume negativa la peticion de devolucion, permitiendo al ciudadano acudir a la jurisdiccion (accion de nulidad y restablecimiento del derecho, tutela si hay vulneracion de derechos fundamentales). No exime a la autoridad de responder.",
    topic: "Silencio administrativo negativo"
  },
  {
    id: 27,
    question: "Situacion\n\nUn ciudadano presenta ante la Alcaldia Municipal una peticion solicitando informacion sobre una obra de la Gobernacion Departamental que se ejecuta en su barrio. El funcionario determina que la Alcaldia no es competente para responder sobre obras departamentales.\n\nPregunta\n\nCon base en la situacion planteada, ¿como debe proceder la autoridad cuando una peticion se dirige a entidad incompetente?",
    options: [
      "Rechazarla inmediatamente",
      "Remitirla de oficio a la entidad competente dentro de los 5 días siguientes, informando al peticionario, sin que este deba presentarla nuevamente",
      "Archivarla sin más",
      "Devolver al peticionario para que la presente nuevamente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, segun el articulo 15 Ley 1755/2015, la Alcaldia debe remitir la peticion de oficio a la Gobernacion dentro de los 5 dias siguientes e informar al ciudadano. El termino para resolver empieza a correr desde el recibo en la entidad competente. Facilita acceso al ciudadano sin exigirle conocimiento tecnico de competencias.",
    topic: "Remisión por incompetencia"
  },
  {
    id: 28,
    question: "Situacion\n\nUn usuario presenta una peticion ante la empresa de acueducto y alcantarillado (empresa de servicios publicos domiciliarios) solicitando revision de su factura por cobro excesivo. Han pasado 18 dias habiles sin respuesta y el usuario quiere saber si aplican los mismos plazos que para entidades publicas.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿en cuanto tiempo deben resolverse las peticiones ante particulares que prestan servicios publicos?",
    options: [
      "No tienen obligación de responder",
      "15 días hábiles, aplicando las mismas reglas que las entidades públicas",
      "1 mes calendario",
      "No hay plazo definido"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el articulo 14 Ley 1755/2015 establece 15 dias habiles para peticiones ante particulares que ejercen funciones administrativas o prestan servicios publicos, como la empresa de acueducto. La empresa ya incumplio el plazo legal. Aplican los mismos derechos y garantias que ante entidades estatales.",
    topic: "Peticiones ante particulares"
  },
  {
    id: 29,
    question: "Situacion\n\nUn abogado necesita obtener copias autenticas del expediente de un proceso disciplinario ya archivado contra un funcionario publico. Presenta la solicitud ante la Procuraduria Provincial y necesita saber el plazo para obtener las copias.\n\nPregunta\n\nSegun la situacion planteada, ¿en cuanto tiempo debe resolverse la peticion de copias de documentos publicos?",
    options: [
      "30 días hábiles",
      "10 días hábiles",
      "5 días hábiles",
      "No hay plazo específico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, segun el articulo 14 de la Ley 1755/2015, las peticiones de copias del expediente disciplinario se resuelven en 10 dias habiles. El abogado debe asumir el costo de las copias autenticas (no puede ser superior al comercial). Si los documentos estan clasificados o reservados (Ley 1712/2014), aplica el procedimiento de acceso con causales de restriccion.",
    topic: "Peticiones de copias"
  },
  {
    id: 30,
    question: "Situacion\n\nLa Secretaria de Educacion resuelve negativamente la peticion de un docente que solicitaba reconocimiento de tiempo de servicio para efectos de ascenso en el escalafon. La respuesta simplemente dice \"No procede\" sin mayor explicacion. El docente quiere impugnar esta decision.\n\nPregunta\n\nCon base en la situacion descrita, ¿como debe proceder la entidad si la respuesta a una peticion es desfavorable?",
    options: [
      "Solo decir 'se niega'",
      "Expresar los motivos de hecho y de derecho, citar las normas aplicadas, y advertir sobre los recursos procedentes (reposición y apelación)",
      "No dar explicaciones",
      "Únicamente remitir a otra entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la respuesta de la Secretaria es incorrecta. Segun el articulo 31 CPACA, toda decision que resuelva una peticion debe motivarse indicando razones de hecho y de derecho. La negativa al docente debe fundamentarse, citar normatividad aplicable sobre escalafon docente, e informar sobre recursos (reposicion y apelacion). La falta de motivacion vicia el acto administrativo.",
    topic: "Motivación de decisiones"
  },
  {
    id: 31,
    question: "Situacion\n\nUn ciudadano recibe notificacion de una resolucion que le niega una solicitud de subsidio de vivienda. Considera que la decision es injusta y quiere impugnarla ante la misma entidad. Necesita saber cuanto tiempo tiene para interponer el recurso.\n\nPregunta\n\nDe acuerdo con la situacion planteada, ¿cual es el termino para interponer el recurso de reposicion contra un acto administrativo?",
    options: [
      "30 días hábiles",
      "10 días hábiles siguientes a su notificación",
      "5 días hábiles",
      "1 mes calendario"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ciudadano tiene 10 dias habiles siguientes a la notificacion de la resolucion para interponer los recursos de reposicion (ante quien profirio el acto) y apelacion (ante el superior jerarquico), segun el articulo 76 CPACA. Pueden interponerse simultaneamente (subsidiariedad). La entidad tiene 15 dias para resolverlos. Agotan la via gubernativa.",
    topic: "Recursos contra actos administrativos"
  },

  // TIPOS DE PETICIONES - CASOS ESPECIALES (4 preguntas)
  {
    id: 32,
    question: "Situacion\n\nLa Secretaria de Planeacion Municipal envia una comunicacion a la Corporacion Autonoma Regional solicitando un concepto tecnico ambiental urgente para resolver una solicitud de licencia urbanistica de un ciudadano. El termino de respuesta al ciudadano esta proximo a vencerse.\n\nPregunta\n\nSegun la situacion descrita, ¿como deben atenderse las peticiones entre autoridades?",
    options: [
      "Los mismos plazos que al ciudadano",
      "Prelación y diligencia especial, facilitando la coordinación interinstitucional",
      "No hay obligación de responder",
      "Solo cuando haya convenio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el articulo 19 Ley 1755/2015 dispone que la solicitud de concepto de la Secretaria de Planeacion a la CAR debe atenderse con especial diligencia y prelacion. Esto facilita la coordinacion administrativa y eficiencia del Estado para responder oportunamente al ciudadano. Los plazos aplican pero debe priorizarse.",
    topic: "Peticiones entre autoridades"
  },
  {
    id: 33,
    question: "Situacion\n\nLa linea anticorrupcion de la Contraloria recibe una llamada anonima denunciando que el alcalde de un municipio esta adjudicando contratos a familiares. El denunciante no quiere identificarse por temor a represalias. El funcionario debe determinar si puede tramitar esta denuncia.\n\nPregunta\n\nCon base en la situacion planteada, ¿como debe tratarse una peticion anonima?",
    options: [
      "Nunca debe ser atendida",
      "Puede ser atendida si involucra interés general, denuncia de corrupción, o afecta derechos de terceros, aunque no genera obligación de respuesta personal",
      "Siempre debe responderse personalmente",
      "Solo se atiende si es judicial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la denuncia anonima sobre posible corrupcion del alcalde debe tramitarse. Las peticiones anonimas no generan obligacion de respuesta personal (no hay direccion de notificacion), pero si contienen denuncias de corrupcion como esta, la entidad debe darles tramite investigativo. La denuncia anonima de irregularidades es valida y debe investigarse.",
    topic: "Peticiones anónimas"
  },
  {
    id: 34,
    question: "Situacion\n\nUn adulto mayor que no sabe leer ni escribir acude a la oficina de atencion al ciudadano para solicitar informacion sobre los requisitos para acceder al programa Colombia Mayor. El funcionario debe determinar como atender esta solicitud.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿en que casos procede la peticion verbal?",
    options: [
      "Nunca, todas deben ser escritas",
      "Asuntos de trámite sencillo que puedan resolverse de inmediato, o cuando el peticionario no sepa o no pueda escribir",
      "Solo para funcionarios",
      "Únicamente en zonas rurales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el articulo 16 Ley 1755/2015 permite que el adulto mayor presente su peticion verbalmente porque no sabe escribir. Tambien procede cuando el asunto sea de tramite inmediato (como informacion simple sobre requisitos). La entidad debe dejar constancia escrita del tramite y la respuesta brindada.",
    topic: "Peticiones verbales"
  },
  {
    id: 35,
    question: "Situacion\n\nUn ciudadano presenta un escrito ante la Secretaria de Gobierno que contiene insultos contra el alcalde y amenazas contra el funcionario que firmo una resolucion que lo afecto. El funcionario receptor debe determinar como proceder.\n\nPregunta\n\nSegun la situacion planteada, ¿como debe manejarse una peticion irrespetuosa?",
    options: [
      "Se rechaza sin más trámite",
      "La autoridad debe invitar al peticionario a reformularla respetuosamente; si insiste en términos irrespetuosos, puede abstenerse de responder pero debe explicar el motivo",
      "Se responde con los mismos términos",
      "Se archiva sin informar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, dado que el escrito contiene insultos y amenazas, la autoridad debe requerir al ciudadano para que lo reformule respetuosamente (articulo 18 Ley 1755). El derecho de peticion es para peticiones 'respetuosas' (art. 23 Constitucion). Si persiste, puede no responder de fondo pero debe motivar la decision. El lenguaje respetuoso significa ausencia de insultos y amenazas.",
    topic: "Peticiones irrespetuosas"
  },

  // TRANSPARENCIA - CASOS ESPECIALES (8 preguntas)
  {
    id: 36,
    question: "Situacion\n\nUn ciudadano solicita a la Registraduria Nacional copia de la base de datos completa del censo electoral con nombres, cedulas y direcciones de todos los votantes de su municipio. El funcionario debe evaluar si esta informacion puede entregarse.\n\nPregunta\n\nCon base en la situacion planteada, ¿que establece la Ley 1581 de 2012 sobre proteccion de datos personales?",
    options: [
      "Que todos los datos son públicos",
      "Principios de finalidad, libertad, veracidad, transparencia, acceso, seguridad; y derechos de conocer, actualizar, rectificar y suprimir datos personales",
      "Solo protección de datos financieros",
      "Que no se puede recolectar ningún dato"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la solicitud del ciudadano no puede atenderse porque la base de datos del censo electoral contiene datos personales protegidos por la Ley 1581/2012 (Habeas Data). Esta ley establece principios como finalidad (uso para el fin autorizado) y derechos ARCO (Acceso, Rectificacion, Cancelacion, Oposicion). Las direcciones y datos de contacto de los votantes son datos personales.",
    topic: "Ley de Habeas Data"
  },
  {
    id: 37,
    question: "Situacion\n\nUn periodista solicita a la DIAN copia de las declaraciones de renta de los ultimos cinco anos de un candidato a la alcaldia, argumentando interes publico por tratarse de un aspirante a cargo de eleccion popular.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cual es el tratamiento de la informacion publica de naturaleza tributaria de las personas?",
    options: [
      "Siempre disponible para cualquiera",
      "Sujeta a reserva legal, salvo cuando sea solicitada por autoridad competente o cuando la ley expresamente autorice su divulgación",
      "Totalmente prohibida sin excepción",
      "Solo disponible para periodistas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la DIAN debe negar la solicitud porque el articulo 24 de la Ley 1712 establece que la informacion tributaria esta reservada (Estatuto Tributario art. 583: reserva tributaria). Solo pueden acceder: el contribuyente, autoridades fiscales y de control, jueces en procesos, o cuando el titular autorice. El interes periodistico no levanta la reserva tributaria.",
    topic: "Reserva de información financiera"
  },
  {
    id: 38,
    question: "Situacion\n\nLa Policia Nacional niega a un periodista el acceso a un informe de inteligencia sobre operaciones contra el narcotrafico, argumentando que su divulgacion pondria en riesgo la seguridad nacional. El periodista impugna la decision solicitando que se aplique el test de dano.\n\nPregunta\n\nSegun la situacion planteada, ¿que debe demostrar la entidad al aplicar el test de dano para clasificar informacion reservada?",
    options: [
      "Simplemente es incómoda para el funcionario",
      "Causa daño real, concreto y específico a los intereses protegidos por la ley (seguridad, debido proceso, etc.), y que el daño es mayor que el interés público en conocer",
      "No requiere justificación",
      "Solo debe alegarse sin prueba"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Policia debe aplicar el test de dano (art. 19 Ley 1712, Decreto 103/2015) probando que divulgar el informe causaria: 1) Dano a un interes legalmente protegido (seguridad nacional); 2) El dano debe ser especifico, concreto y cierto (identificar operaciones, agentes en riesgo); 3) El dano es mayor que el beneficio de divulgar. Invierte la carga de la prueba.",
    topic: "Test de daño"
  },
  {
    id: 39,
    question: "Situacion\n\nUn emprendedor tecnologico solicita al DANE acceso a los microdatos del ultimo censo nacional en formato que pueda procesar con sus algoritmos para desarrollar una aplicacion de analisis demografico. El funcionario debe determinar como entregar esta informacion.\n\nPregunta\n\nCon base en la situacion planteada, ¿que son los datos abiertos?",
    options: [
      "Solo información en PDF",
      "Datos públicos primarios u originales en formatos reutilizables (CSV, JSON, XML), de libre acceso sin restricciones, que pueden ser usados, reutilizados y redistribuidos",
      "Únicamente estadísticas generales",
      "Solo información del DANE"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el emprendedor tiene derecho a recibir los microdatos en formatos de datos abiertos (art. 7 Ley 1712). Los datos abiertos son datos publicos en formatos abiertos, estructurados, procesables por maquinas (CSV, JSON, XML, no solo PDF), sin restricciones legales, tecnicas o financieras para su uso. Deben publicarse en www.datos.gov.co. Principios: completos, primarios, oportunos, accesibles, procesables.",
    topic: "Datos abiertos"
  },
  {
    id: 40,
    question: "Situacion\n\nUna entidad clasifico como reservada cierta informacion sobre un proceso de negociacion internacional hace 14 anos. Se acerca el vencimiento del plazo de reserva y el jefe juridico debe determinar si puede prorrogarse o debe desclasificarse.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cual es el plazo maximo de reserva de informacion clasificada?",
    options: [
      "Indefinido",
      "15 años, prorrogables excepcionalmente por periodos adicionales cuando persistan las causas de reserva",
      "5 años sin prórroga",
      "50 años automáticamente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el articulo 20 de la Ley 1712 establece plazo maximo de 15 anos para la reserva. Como la informacion lleva 14 anos, si persisten las razones de la negociacion internacional, puede prorrogarse por periodos adicionales mediante acto motivado. La reserva no es perpetua. Vencido el plazo sin prorroga, la informacion debe desclasificarse y publicarse.",
    topic: "Plazo de reserva"
  },
  {
    id: 41,
    question: "Situacion\n\nUna veeduria ciudadana quiere hacer seguimiento a un contrato de obra publica desde su planeacion hasta su liquidacion. Solicita acceso a todos los documentos del proceso contractual. El funcionario debe informarle donde puede encontrar esta informacion.\n\nPregunta\n\nSegun la situacion planteada, ¿como debe manejarse la informacion sobre contratacion publica?",
    options: [
      "Mantenerse reservada hasta finalizar el contrato",
      "Publicarse durante todas las etapas del proceso contractual en SECOP y sitio web de la entidad (principio de publicidad)",
      "Solo publicarse si hay denuncia",
      "Únicamente para contratos mayores de 1.000 millones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la veeduria puede acceder a toda la informacion contractual segun los articulos 9 y 11 de la Ley 1712 y el Estatuto de Contratacion: estudios previos, pliegos, adendas, ofertas, informes de evaluacion, contratos, modificaciones, pagos, informes de supervision/interventoria, actas de liquidacion. Se publica en SECOP (www.colombiacompra.gov.co) y sitio web de la entidad. Principio de transparencia contractual.",
    topic: "Publicidad en contratación"
  },
  {
    id: 42,
    question: "Situacion\n\nUn grupo de ciudadanos quiere asistir a la sesion del Concejo Municipal donde se discutira el presupuesto del proximo ano. El presidente del Concejo les informa que la sesion sera a puerta cerrada por decision de la mesa directiva.\n\nPregunta\n\nCon base en la situacion planteada, ¿cual es la regla sobre las sesiones de corporaciones publicas?",
    options: [
      "Siempre secretas",
      "Públicas por regla general, salvo casos excepcionales de reserva expresamente establecidos en la ley",
      "Solo públicas para periodistas acreditados",
      "Discrecionales según el presidente de la corporación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la decision del presidente del Concejo es incorrecta. El articulo 133 de la Constitucion establece que las sesiones de corporaciones publicas son publicas. Los ciudadanos pueden asistir a la sesion sobre presupuesto. Solo pueden ser reservadas por motivos expresamente senalados en reglamentos (ej: sesiones de seguridad, evaluacion de funcionarios). La discusion presupuestal no es causal de reserva.",
    topic: "Publicidad de sesiones"
  },
  {
    id: 43,
    question: "Situacion\n\nLa Procuraduria Regional adelanta una investigacion contra una Alcaldia por presunto incumplimiento sistematico de la Ley 1712, al no publicar informacion obligatoria ni responder solicitudes de acceso. El alcalde alega que ninguna entidad lo vigila en este tema.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿quien realiza el monitoreo y evaluacion del cumplimiento de la Ley 1712?",
    options: [
      "Cada entidad autónomamente sin control",
      "El Ministerio Público (Procuraduría), órganos de control (Contraloría, Auditoría General), y la ciudadanía mediante seguimiento y denuncias",
      "No hay seguimiento",
      "Solo el Presidente de la República"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el alcalde esta equivocado. El articulo 30 de la Ley 1712 establece el monitoreo por: Procuraduria General de la Nacion (vigila cumplimiento), Ministerio Publico (investiga violaciones), organos de control fiscal, y ciudadania (denuncias). Ademas, se aplican indicadores de transparencia (ITA). El incumplimiento genera faltas disciplinarias que la Procuraduria puede sancionar.",
    topic: "Control de cumplimiento"
  },

  // GESTIÓN DOCUMENTAL - AVANZADO (7 preguntas)
  {
    id: 44,
    question: "Situacion\n\nEl Archivo General de la Nacion realiza una visita de inspeccion a un municipio y solicita el Programa de Gestion Documental. El secretario general desconoce que debe contener este documento y necesita orientacion urgente.\n\nPregunta\n\nSegun la situacion planteada, ¿que debe contener el Programa de Gestion Documental (PGD)?",
    options: [
      "Solo las TRD",
      "Planeación estratégica archivística, procesos de gestión documental, TRD, plan institucional de archivos (PINAR), políticas, recursos y responsables",
      "Únicamente el nombre del archivo",
      "Solo la lista de cajas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el secretario debe saber que el PGD (Acuerdo AGN 002/2014, Decreto 1080/2015) es el instrumento que formula y documenta la funcion archivistica. Incluye: politica archivistica institucional, planeacion estrategica, procesos de gestion documental (produccion, recepcion, distribucion, tramite, organizacion, consulta, conservacion, disposicion final), TRD aprobadas, plan institucional de archivos (PINAR), recursos, responsables, y cronograma.",
    topic: "Programa de Gestión Documental"
  },
  {
    id: 45,
    question: "Situacion\n\nEl jefe de archivo de una entidad debe organizar las transferencias documentales del ano y explicar a los funcionarios de las oficinas productoras el ciclo de vida de los documentos y por que deben transferir sus expedientes cerrados al archivo central.\n\nPregunta\n\nCon base en la situacion planteada, ¿cuales son las fases que contempla el ciclo vital del documento?",
    options: [
      "Solo creación y archivo",
      "Archivo de gestión (trámite y consulta frecuente), archivo central (consulta esporádica, precautoria y jurídica), y archivo histórico (conservación permanente por valor cultural)",
      "Únicamente digital y físico",
      "Solo actual y antiguo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el jefe de archivo debe explicar el ciclo vital del documento (teoria de las tres edades): 1) Archivo de Gestion (oficina productora, documentos activos, consulta frecuente); 2) Archivo Central (documentos semi-activos, consulta ocasional, conservacion precautoria); 3) Archivo Historico (documentos inactivos con valor historico, cultural, cientifico, conservacion permanente). Las TRD establecen tiempos en cada fase.",
    topic: "Ciclo vital del documento"
  },
  {
    id: 46,
    question: "Situacion\n\nLa coordinadora del archivo de gestion de la Secretaria de Salud debe preparar la transferencia de los expedientes de PQRSD del ano 2020 al archivo central, ya que cumplieron el tiempo de retencion establecido en las TRD. Necesita saber el procedimiento correcto.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que son las transferencias documentales primarias?",
    options: [
      "Cualquier movimiento de documentos",
      "El traslado de documentos del archivo de gestión al archivo central, una vez cumplido el tiempo de retención en gestión establecido en las TRD",
      "Solo envío de copias",
      "Eliminación de documentos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la coordinadora debe realizar una transferencia primaria (Acuerdo AGN 004/2019): traslado de los expedientes de PQRSD 2020 del archivo de gestion al archivo central, segun tiempos de retencion en TRD. Debe elaborar inventarios documentales (formato unico de inventario - FUI), verificar organizacion, y documentar la entrega.",
    topic: "Transferencias documentales"
  },
  {
    id: 47,
    question: "Situacion\n\nEl comite de archivo de una entidad debe revisar las Tablas de Retencion Documental para determinar cuales series documentales deben conservarse permanentemente y cuales pueden eliminarse una vez cumplan sus tiempos de retencion. Necesitan aplicar criterios de valoracion documental.\n\nPregunta\n\nSegun la situacion planteada, ¿que determina la valoracion documental?",
    options: [
      "Solo el precio de los documentos",
      "Los valores primarios (administrativo, legal, fiscal, contable) y secundarios (histórico, cultural, científico) para establecer tiempos de retención y disposición final",
      "Únicamente el tamaño de las cajas",
      "Solo el año de creación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el comite debe aplicar la valoracion documental que identifica valores: Primarios (administrativo, juridico-legal, fiscal-contable, tecnico) que justifican retencion durante tramite y precaucion; Secundarios (historico, cientifico, cultural) que justifican conservacion permanente. Documentos con solo valores primarios se eliminan tras cumplir plazos; documentos con valores secundarios se conservan.",
    topic: "Valoración documental"
  },
  {
    id: 48,
    question: "Situacion\n\nUn auxiliar de archivo esta organizando un expediente de PQRSD que contiene 45 documentos en diferentes formatos. El coordinador de archivo le indica que debe foliar correctamente el expediente antes de transferirlo. El auxiliar necesita conocer la tecnica correcta.\n\nPregunta\n\nCon base en la situacion planteada, ¿en que consiste el foliado de documentos?",
    options: [
      "Solo contar las hojas",
      "Numerar secuencialmente los folios (hojas) de un expediente en la esquina superior derecha del recto, con numeración única por expediente",
      "Únicamente grapar",
      "Solo poner la fecha"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el auxiliar debe aplicar el foliado segun el Acuerdo AGN 027/2006: numerar consecutivamente cada folio (hoja) del expediente de PQRSD. Se escribe con lapiz (permite correccion) en la esquina superior derecha del recto (cara frontal), de manera legible, sin enmendaduras. No se numera el verso. Los anexos (CD, planos) van en sobre identificado e inventariado. Garantiza integridad y orden del expediente.",
    topic: "Foliado"
  },
  {
    id: 49,
    question: "Situacion\n\nEl jefe de archivo debe eliminar 500 cajas de documentos que cumplieron su tiempo de retencion y tienen disposicion final \"E\" (eliminacion) en las TRD. Un funcionario sugiere simplemente botarlas en la basura para ahorrar tiempo y costos.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿como debe realizarse la eliminacion de documentos?",
    options: [
      "Hacerse discrecionalmente por cualquier funcionario",
      "Estar autorizada en TRD aprobadas, previa selección por comité evaluador de documentos, con acta que registre la eliminación y métodos que garanticen destrucción irreversible",
      "Solo botarse a la basura",
      "No requiere ningún control"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la sugerencia del funcionario es incorrecta. La eliminacion (Acuerdo AGN 004/2019) solo procede para documentos que: 1) Tienen disposicion final 'E' en TRD aprobada; 2) Cumplieron tiempos de retencion; 3) Fueron evaluados por comite. Requiere acta de eliminacion firmada (responsable, fechas, series, cantidad). Metodos: trituracion, incineracion controlada, o reciclaje con destruccion previa garantizada.",
    topic: "Eliminación documental"
  },
  {
    id: 50,
    question: "Situacion\n\nLa entidad implementara un nuevo sistema de gestion documental electronica para tramitar todas las PQRSD de manera digital. El comite de archivo debe definir los requisitos tecnicos que debe cumplir el sistema para garantizar la validez de los documentos electronicos.\n\nPregunta\n\nSegun la situacion planteada, ¿que debe garantizar el sistema de gestion de documentos electronicos de archivo (SGDEA)?",
    options: [
      "Solo almacenar archivos en computador",
      "Autenticidad, integridad, fiabilidad, disponibilidad y trazabilidad de documentos electrónicos durante todo su ciclo de vida, cumpliendo estándares como ISO 15489 y normas AGN",
      "Únicamente respaldo en USB",
      "Solo correos electrónicos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el SGDEA para PQRSD debe cumplir (Acuerdo AGN 003/2015, ISO 15489, MoReq): Autenticidad (garantia de que el documento es lo que dice ser), Integridad (completo sin alteraciones), Fiabilidad (representacion fiel de transacciones), Disponibilidad (localizable y accesible), y Trazabilidad (registro de operaciones). Incluye: metadatos, firma electronica, timestamping, logs de auditoria, preservacion digital a largo plazo.",
    topic: "Gestión documental electrónica"
  }
]

export function PqrsdTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
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
    if (answeredQuestions.has(questionId)) return
    setAnswers({ ...answers, [questionId]: answerIndex })
    setAnsweredQuestions((prev) => new Set(prev).add(questionId))
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
    setAnsweredQuestions(new Set())
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
        <FileText className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold">Atención de PQRSD y Transparencia</h2>
          <p className="text-sm text-muted-foreground">
            Derecho de petición, tipos de peticiones, transparencia, acceso a información y gestión documental
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
            <Card key={q.id} className="border-blue-200">
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
            <Card key={q.id} className="border-blue-200">
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
        <Button onClick={handleSubmit} disabled={showResults} className="flex-1 bg-blue-600 hover:bg-blue-700">
          Calificar
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1">
          Reiniciar
        </Button>
      </div>

      {showResults && (
        <Card className="border-blue-300 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
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
                  ? "¡Excelente! Dominas las normas de PQRSD y transparencia."
                  : score.percentage >= 60
                  ? "Buen trabajo. Refuerza algunos aspectos de la Ley 1755 y Ley 1712."
                  : "Sigue estudiando. Revisa la Ley 1755/2015 y Ley 1712/2014."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
