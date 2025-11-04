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

const questionsV1: Question[] = [
  // DERECHO DE PETICIÓN (8 preguntas)
  {
    id: 1,
    question: "El derecho de petición en Colombia está regulado principalmente por:",
    options: [
      "Únicamente la Constitución Política",
      "El Código Civil",
      "La Ley 1755 de 2015 (Código de Procedimiento Administrativo y de lo Contencioso Administrativo - CPACA)",
      "Solo normas internas de cada entidad"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "La Ley 1755 de 2015 regula el derecho de petición ante autoridades. Se fundamenta en el artículo 23 de la Constitución Política y desarrolla procedimientos, plazos, requisitos y consecuencias del silencio administrativo. Aplica a entidades públicas y particulares que prestan servicios públicos o ejercen funciones públicas.",
    topic: "Marco normativo del derecho de petición"
  },
  {
    id: 2,
    question: "Toda persona tiene derecho a presentar peticiones respetuosas a las autoridades por motivos de:",
    options: [
      "Solo interés general",
      "Interés general o particular, y a obtener pronta resolución",
      "Únicamente interés comercial",
      "Solo si es funcionario público"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 23 de la Constitución Política garantiza que toda persona puede presentar peticiones respetuosas por motivos de interés general o particular, y a obtener pronta resolución. No requiere condición especial, es un derecho fundamental de todos los habitantes del territorio nacional.",
    topic: "Naturaleza del derecho de petición"
  },
  {
    id: 3,
    question: "El término general para resolver una petición de información es de:",
    options: [
      "30 días hábiles",
      "10 días hábiles",
      "15 días hábiles",
      "5 días hábiles"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Según el artículo 14 de la Ley 1755/2015, las peticiones de información deben resolverse en 10 días hábiles contados desde su recibo. Este es uno de los plazos más breves. Si la información está en otra dependencia, el término se amplía a 10 días adicionales.",
    topic: "Plazos para responder peticiones"
  },
  {
    id: 4,
    question: "Las peticiones en interés general deben resolverse dentro de:",
    options: [
      "5 días hábiles",
      "10 días hábiles",
      "15 días hábiles",
      "20 días hábiles"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "El artículo 14 de la Ley 1755/2015 establece que las peticiones de interés general se resuelven en 15 días hábiles. Esto incluye peticiones sobre políticas públicas, rendición de cuentas colectiva, o que benefician a una comunidad o grupo amplio de personas.",
    topic: "Plazos para interés general"
  },
  {
    id: 5,
    question: "Una petición de consulta debe resolverse en:",
    options: [
      "30 días hábiles prorrogables por otros 30",
      "10 días hábiles",
      "5 días hábiles",
      "60 días calendario"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "Las peticiones de consulta (artículo 14 Ley 1755/2015) requieren concepto, interpretación jurídica o aplicación de normas a casos específicos. El plazo es de 30 días hábiles, prorrogables por 30 días más cuando se requiere consulta a otras dependencias o análisis complejo. La prórroga debe informarse antes del vencimiento.",
    topic: "Peticiones de consulta"
  },
  {
    id: 6,
    question: "Si una petición está incompleta, la autoridad debe:",
    options: [
      "Rechazarla inmediatamente sin más trámite",
      "Requerir al peticionario dentro de los 10 días siguientes para que la complete en el término de un mes",
      "Archivarla sin respuesta",
      "Remitirla a otra entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 17 de la Ley 1755/2015 obliga a la entidad a formular el requerimiento de información faltante dentro de los 10 días siguientes al recibo. El peticionario tiene un mes para completarla. Si no lo hace, se archiva la petición. La entidad no puede rechazar de plano sin dar oportunidad de completar.",
    topic: "Peticiones incompletas"
  },
  {
    id: 7,
    question: "El silencio administrativo positivo opera cuando:",
    options: [
      "En cualquier petición no contestada",
      "La petición no se resuelve en los términos legales y la ley expresamente lo establece (ej: licencias, autorizaciones)",
      "Nunca aplica en Colombia",
      "Solo en peticiones laborales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El silencio administrativo positivo (artículo 40 CPACA) significa que la petición se entiende aprobada si la autoridad no responde en el plazo legal. Solo opera cuando una norma específica lo establece (ej: licencias de construcción, algunas autorizaciones). No aplica a todas las peticiones automáticamente. El negativo es más común.",
    topic: "Silencio administrativo positivo"
  },
  {
    id: 8,
    question: "Los requisitos mínimos de una petición escrita son:",
    options: [
      "Solo el nombre del peticionario",
      "Designación de la autoridad, nombres del peticionario, objeto de la petición, razones, dirección para notificaciones, y firma si es escrita",
      "Únicamente el objeto de la petición",
      "Solo la identificación y fecha"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 16 de la Ley 1755/2015 exige: 1) Designación de la autoridad a quien va dirigida; 2) Nombres y apellidos completos del peticionario e identificación; 3) Objeto de la petición; 4) Razones en que se apoya; 5) Relación de documentos anexos; 6) Firma (escrita o electrónica si aplica). Las peticiones verbales son posibles en algunos casos.",
    topic: "Requisitos de la petición"
  },

  // TIPOS DE PETICIONES (5 preguntas)
  {
    id: 9,
    question: "Una Queja es:",
    options: [
      "Una solicitud de información",
      "La manifestación de protesta, censura, inconformidad o descontento del peticionario respecto de una presunta irregularidad en la prestación del servicio o conducta de un servidor",
      "Una solicitud de compensación económica",
      "Un recurso judicial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La queja expresa inconformidad por presuntas irregularidades, mal servicio, o conducta indebida de servidores públicos. No busca una prestación específica sino señalar una situación irregular. La autoridad debe investigar y tomar medidas correctivas. Se diferencia del reclamo que sí busca una prestación insatisfecha.",
    topic: "Queja"
  },
  {
    id: 10,
    question: "Un Reclamo es:",
    options: [
      "Una petición de información general",
      "La manifestación con la cual el peticionario exige a la entidad el reconocimiento de un derecho o el cumplimiento de una obligación legal o contractual incumplida",
      "Una sugerencia de mejora",
      "Una denuncia penal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El reclamo busca que la entidad cumpla una obligación legal, reglamentaria o contractual que ha incumplido, o que reconozca un derecho del peticionario. Ejemplo: reclamo por pago no realizado, servicio no prestado, prestación debida. Requiere respuesta de fondo sobre la procedencia de lo reclamado.",
    topic: "Reclamo"
  },
  {
    id: 11,
    question: "Una Sugerencia es:",
    options: [
      "Una obligación que debe acatar la entidad inmediatamente",
      "Una propuesta, recomendación o idea presentada por el peticionario para mejorar el servicio o la gestión de la entidad",
      "Una denuncia de corrupción",
      "Una petición de información confidencial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La sugerencia es una manifestación constructiva del ciudadano orientada a mejorar procesos, servicios, atención, o gestión institucional. No exige una prestación específica sino que aporta ideas de mejora. La entidad debe analizarla, responder sobre su viabilidad, y considerarla en la mejora continua.",
    topic: "Sugerencia"
  },
  {
    id: 12,
    question: "Una Denuncia es:",
    options: [
      "Una petición de información",
      "La puesta en conocimiento de la autoridad de hechos que podrían constituir una posible conducta irregular, delictiva, o de corrupción, sin que el denunciante tenga interés directo",
      "Una solicitud de empleo",
      "Una queja de servicio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La denuncia pone en conocimiento de la autoridad competente hechos irregulares, posiblemente delictivos o de corrupción, sin que el denunciante tenga un interés personal o particular en el asunto (a diferencia de la queja o reclamo). Puede ser anónima. Genera obligación de investigar por parte de la entidad (control interno, disciplinaria, o penal según el caso).",
    topic: "Denuncia"
  },
  {
    id: 13,
    question: "Las peticiones de información deben distinguirse de:",
    options: [
      "No tienen diferencia con otros tipos",
      "Las solicitudes de acceso a documentos públicos (Ley 1712/2014 de Transparencia), que tienen procedimiento específico",
      "Las quejas y reclamos",
      "Las tutelas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La petición de información (Ley 1755) solicita datos o informes a la entidad (plazo: 10 días). El acceso a documentos públicos (Ley 1712/2014) solicita copia de documentos específicos existentes (plazo: 10 días hábiles, máximo 20 si requiere búsqueda). La Ley 1712 tiene causales de reserva y clasificación especiales.",
    topic: "Petición de información vs acceso a documentos"
  },

  // TRANSPARENCIA Y ACCESO A LA INFORMACIÓN (7 preguntas)
  {
    id: 14,
    question: "La Ley 1712 de 2014 regula:",
    options: [
      "Solo el derecho de petición",
      "El derecho de acceso a la información pública, transparencia activa y pasiva, y excepciones de acceso",
      "Únicamente los salarios de funcionarios",
      "Solo la contratación pública"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La Ley 1712 de 2014 (Ley de Transparencia y Acceso a la Información Pública) desarrolla el artículo 20 constitucional. Regula: derecho de acceso a información y documentos públicos, obligaciones de transparencia activa (publicar proactivamente), procedimiento de acceso (transparencia pasiva - a solicitud), excepciones y reserva legal, y mecanismos de control.",
    topic: "Ley 1712 de 2014"
  },
  {
    id: 15,
    question: "La información pública es:",
    options: [
      "Solo la que está en internet",
      "Toda información en posesión, bajo control o custodia de un sujeto obligado (entidades públicas y ciertos particulares)",
      "Únicamente información impresa",
      "Solo información financiera"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Artículo 6 Ley 1712: información pública es toda la que genera, obtiene, adquiere, transforma o controla un sujeto obligado. Incluye cualquier formato: escrito, digital, audiovisual, etc. Abarca documentos, bases de datos, comunicaciones, estudios. La regla es máxima publicidad; la reserva es excepcional y taxativa.",
    topic: "Concepto de información pública"
  },
  {
    id: 16,
    question: "La información clasificada y reservada puede exceptuarse del acceso público por razones de:",
    options: [
      "Cualquier decisión discrecional del funcionario",
      "Defensa y seguridad nacional, relaciones internacionales, protección de datos personales (Ley 1581/2012), secretos comerciales/industriales, orden público, debido proceso, o cuando la ley lo establezca",
      "Comodidad administrativa",
      "Solo si el jefe lo decide sin justificación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 18 de la Ley 1712 establece las excepciones al derecho de acceso: información que afecte defensa y seguridad, relaciones internacionales, datos personales (Habeas Data - Ley 1581/2012), secreto comercial de terceros, debido proceso en etapa de indagación, o que ponga en riesgo derechos. Debe motivarse la reserva; es temporal y revisable.",
    topic: "Excepciones al acceso"
  },
  {
    id: 17,
    question: "La transparencia activa se refiere a:",
    options: [
      "Responder peticiones de acceso",
      "La obligación de las entidades de publicar proactivamente información mínima obligatoria sin esperar solicitud (estructura, funciones, contratación, presupuesto, instrumentos de gestión)",
      "Solo publicar noticias",
      "Únicamente redes sociales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Transparencia activa (art. 9-11 Ley 1712): obligación de publicar de oficio, sin que medie solicitud, información mínima como: estructura orgánica, funciones, normas, directorio, escalas salariales, presupuesto, contratación, planeación, control, trámites, informes de gestión, datos abiertos. Debe estar en sitios web accesibles y actualizados.",
    topic: "Transparencia activa"
  },
  {
    id: 18,
    question: "El término para entregar información pública solicitada es de:",
    options: [
      "5 días calendario",
      "10 días hábiles, prorrogables hasta 10 días más si la búsqueda es compleja",
      "30 días hábiles",
      "15 días calendario"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Artículo 13 Ley 1712: la información solicitada debe entregarse en 10 días hábiles desde la solicitud. Si es necesaria búsqueda en diferentes dependencias, análisis de volumen considerable, o requiere recolección en lugares distintos, se puede prorrogar hasta 10 días adicionales, informando al solicitante antes del vencimiento del plazo inicial.",
    topic: "Plazo de entrega de información pública"
  },
  {
    id: 19,
    question: "Si la entidad niega el acceso a información pública, debe:",
    options: [
      "Solo decir 'no' sin justificación",
      "Motivar la negativa indicando la causal de reserva legal, normatividad aplicable, y advertir sobre recursos disponibles",
      "Ignorar la solicitud",
      "Remitir a otra entidad sin responder"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Toda negativa de acceso (art. 15 Ley 1712) debe ser expresa, escrita y motivada, indicando: 1) Causal legal de reserva que aplica; 2) Norma que la sustenta; 3) Razones de aplicación al caso; 4) Recursos disponibles (reposición y apelación). La carga de probar que la información es reservada es de la entidad, aplicando test de daño y principio de proporcionalidad.",
    topic: "Negativa de acceso a información"
  },
  {
    id: 20,
    question: "El Índice de Información Clasificada y Reservada es:",
    options: [
      "Un documento secreto que nadie puede ver",
      "Un registro público que deben llevar las entidades con la información clasificada, justificación, plazo de reserva y responsable",
      "Solo un listado interno sin publicidad",
      "No es obligatorio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Artículo 21 Ley 1712: toda entidad debe elaborar y actualizar semestralmente el Índice de Información Clasificada y Reservada, publicándolo en su sitio web. Debe contener: información clasificada, causal de reserva, fundamento legal, plazo de reserva (máximo 15 años, prorrogables en casos excepcionales), y funcionario responsable. Permite control ciudadano.",
    topic: "Índice de Información Reservada"
  },

  // GESTIÓN DOCUMENTAL (5 preguntas)
  {
    id: 21,
    question: "La gestión documental en entidades públicas está regulada por:",
    options: [
      "No hay regulación específica",
      "La Ley 594 de 2000 (Ley General de Archivos) y normatividad del Archivo General de la Nación",
      "Solo normas internas de cada entidad",
      "Únicamente el código de comercio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La Ley 594 de 2000 (Ley General de Archivos) regula la función archivística, administración de documentos públicos, conservación del patrimonio documental, y gestión de archivos. El Archivo General de la Nación (AGN) emite directrices técnicas mediante acuerdos: tablas de retención documental (TRD), organización de archivos, transferencias, digitalización.",
    topic: "Normatividad de gestión documental"
  },
  {
    id: 22,
    question: "Las Tablas de Retención Documental (TRD) determinan:",
    options: [
      "Solo quién puede acceder a archivos",
      "Los documentos que produce cada área, tiempo de permanencia en cada archivo (gestión, central, histórico), y disposición final (conservación total, eliminación, selección)",
      "Únicamente el color de las carpetas",
      "Solo los nombres de los empleados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las TRD (Acuerdo AGN 004/2019) son instrumento archivístico que identifica: series documentales por dependencia, tiempos de retención en archivo de gestión (oficina), tiempos en archivo central (entidad), disposición final (CT=conservación total, E=eliminación, S=selección, M=microfilmación/digitalización). Fundamenta transferencias documentales y depuración de archivos.",
    topic: "Tablas de Retención Documental"
  },
  {
    id: 23,
    question: "El radicado de documentos en entidades públicas debe:",
    options: [
      "Ser aleatorio sin control",
      "Asignar número consecutivo único, fecha y hora de recibo, garantizando trazabilidad y control de documentos entrantes, salientes e internos",
      "Solo numerar algunos documentos",
      "No es necesario radicar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El radicado (Decreto 2609/2012, antes 2150/1995) asigna número consecutivo único e irrepetible a comunicaciones oficiales. Incluye: fecha y hora exacta de recibo/envío, origen/destino, nombre del remitente/destinatario, asunto, número de folios, anexos. Permite trazabilidad completa. Se clasifican en: entrada, salida, internos. Facilita consulta y respuesta oportuna.",
    topic: "Radicación de documentos"
  },
  {
    id: 24,
    question: "La digitalización de documentos públicos debe cumplir:",
    options: [
      "Cualquier método sin requisitos",
      "Lineamientos técnicos del AGN (Acuerdo 006/2014): resolución adecuada, formato estándar, metadatos, firma electrónica, hash, y garantizar autenticidad, integridad y accesibilidad",
      "Solo escanear sin más requisitos",
      "No se puede digitalizar documentos públicos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La digitalización con fines de conservación y consulta (Acuerdo AGN 006/2014) requiere: resolución mínima (200-300 dpi según tipo), formatos estándar (PDF/A, TIFF), metadatos descriptivos, técnicos y administrativos, almacenamiento seguro con copias de respaldo, firma electrónica y hash para autenticidad, y cumplir protocolo de digitalización certificada. Los documentos digitalizados tienen validez probatoria.",
    topic: "Digitalización de documentos"
  },
  {
    id: 25,
    question: "El principio de procedencia archivística significa que:",
    options: [
      "Los documentos pueden mezclarse de cualquier entidad",
      "Los documentos deben conservarse agrupados en el fondo de la entidad que los produjo, sin mezclar con fondos de otras entidades",
      "Solo importa el año de creación",
      "Los documentos deben ordenarse alfabéticamente sin importar origen"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El principio de procedencia o respeto de los fondos establece que los documentos generados por una institución deben mantenerse agrupados en su fondo documental, sin mezclarlos con documentos de otras entidades. Preserva el contexto de producción. Se complementa con el principio de orden original (mantener la organización original dada por la entidad productora).",
    topic: "Principios archivísticos"
  }
]

const questionsV2: Question[] = [
  // DERECHO DE PETICIÓN - AVANZADO (6 preguntas)
  {
    id: 26,
    question: "El silencio administrativo negativo permite al peticionario:",
    options: [
      "No tener ninguna consecuencia",
      "Interponer acciones judiciales (nulidad, nulidad y restablecimiento, tutela subsidiaria) como si hubiera respuesta negativa expresa",
      "Solo esperar indefinidamente",
      "Únicamente insistir verbalmente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El silencio administrativo negativo (artículo 83 CPACA) opera cuando vencido el plazo legal no hay respuesta. Se presume negativa la petición, permitiendo al interesado acudir a la jurisdicción (acción de nulidad y restablecimiento del derecho, tutela si hay vulneración de derechos fundamentales). No exime a la autoridad de responder.",
    topic: "Silencio administrativo negativo"
  },
  {
    id: 27,
    question: "Cuando una petición se dirige a entidad incompetente, esta debe:",
    options: [
      "Rechazarla inmediatamente",
      "Remitirla de oficio a la entidad competente dentro de los 5 días siguientes, informando al peticionario, sin que este deba presentarla nuevamente",
      "Archivarla sin más",
      "Devolver al peticionario para que la presente nuevamente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Artículo 15 Ley 1755/2015: si la petición se dirige a entidad incompetente, esta debe remitirla de oficio a la competente dentro de los 5 días siguientes e informar al peticionario. El término para resolver empieza a correr desde el recibo en la entidad competente. Facilita acceso al ciudadano sin exigirle conocimiento técnico de competencias.",
    topic: "Remisión por incompetencia"
  },
  {
    id: 28,
    question: "Las peticiones respetuosas ante particulares que prestan servicios públicos o ejercen funciones públicas deben resolverse en:",
    options: [
      "No tienen obligación de responder",
      "15 días hábiles, aplicando las mismas reglas que las entidades públicas",
      "1 mes calendario",
      "No hay plazo definido"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 14 Ley 1755/2015 establece 15 días hábiles para peticiones ante particulares que ejercen funciones administrativas, prestan servicios públicos, o están sometidos a régimen de servicios públicos domiciliarios (empresas de servicios públicos, concesionarios, etc.). Aplican los mismos derechos y garantías que ante entidades estatales.",
    topic: "Peticiones ante particulares"
  },
  {
    id: 29,
    question: "La petición de copias de documentos públicos debe resolverse en:",
    options: [
      "30 días hábiles",
      "10 días hábiles",
      "5 días hábiles",
      "No hay plazo específico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Según el artículo 14 de la Ley 1755/2015, las peticiones de copias de documentos se resuelven en 10 días hábiles. El peticionario debe asumir el costo de las copias (no puede ser superior al comercial). Si los documentos están clasificados o reservados (Ley 1712/2014), aplica el procedimiento de acceso con causales de restricción.",
    topic: "Peticiones de copias"
  },
  {
    id: 30,
    question: "Si la respuesta a una petición es desfavorable, la entidad debe:",
    options: [
      "Solo decir 'se niega'",
      "Expresar los motivos de hecho y de derecho, citar las normas aplicadas, y advertir sobre los recursos procedentes (reposición y apelación)",
      "No dar explicaciones",
      "Únicamente remitir a otra entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Artículo 31 CPACA: toda decisión que resuelva una petición debe motivarse indicando razones de hecho y de derecho. Las negativas deben fundamentarse, citar normatividad aplicable, e informar sobre recursos (reposición ante quien profirió el acto, apelación ante superior jerárquico). La falta de motivación vicia el acto administrativo.",
    topic: "Motivación de decisiones"
  },
  {
    id: 31,
    question: "El término para interponer el recurso de reposición contra un acto administrativo es de:",
    options: [
      "30 días hábiles",
      "10 días hábiles siguientes a su notificación",
      "5 días hábiles",
      "1 mes calendario"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los recursos de reposición (ante quien profirió el acto) y apelación (ante el superior jerárquico) se interponen dentro de los 10 días hábiles siguientes a la notificación del acto (artículo 76 CPACA). Pueden interponerse simultáneamente (subsidiariedad). La entidad tiene 15 días para resolverlos. Agotan la vía gubernativa.",
    topic: "Recursos contra actos administrativos"
  },

  // TIPOS DE PETICIONES - CASOS ESPECIALES (4 preguntas)
  {
    id: 32,
    question: "Las peticiones entre autoridades (entidades públicas entre sí) deben atenderse con:",
    options: [
      "Los mismos plazos que al ciudadano",
      "Prelación y diligencia especial, facilitando la coordinación interinstitucional",
      "No hay obligación de responder",
      "Solo cuando haya convenio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 19 Ley 1755/2015 dispone que las peticiones entre autoridades deben atenderse con especial diligencia y prelación. Esto facilita la coordinación administrativa y eficiencia del Estado. Los plazos aplican pero debe priorizarse. Incluye solicitudes de informes, conceptos, documentos, o apoyo interinstitucional.",
    topic: "Peticiones entre autoridades"
  },
  {
    id: 33,
    question: "Una petición anónima (sin identificar al peticionario):",
    options: [
      "Nunca debe ser atendida",
      "Puede ser atendida si involucra interés general, denuncia de corrupción, o afecta derechos de terceros, aunque no genera obligación de respuesta personal",
      "Siempre debe responderse personalmente",
      "Solo se atiende si es judicial"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las peticiones anónimas no generan obligación de respuesta personal al peticionario (no hay dirección de notificación). Sin embargo, si contienen denuncias de corrupción, riesgos para la comunidad, o información de interés general, la entidad debe darles trámite investigativo o correctivo. La denuncia anónima de irregularidades es válida y debe investigarse.",
    topic: "Peticiones anónimas"
  },
  {
    id: 34,
    question: "La petición verbal procede en:",
    options: [
      "Nunca, todas deben ser escritas",
      "Asuntos de trámite sencillo que puedan resolverse de inmediato, o cuando el peticionario no sepa o no pueda escribir",
      "Solo para funcionarios",
      "Únicamente en zonas rurales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 16 Ley 1755/2015 permite peticiones verbales cuando: 1) el asunto sea de trámite inmediato (información simple, orientación); 2) el peticionario no sepa o no pueda escribir. La entidad debe dejar constancia escrita del trámite. Para asuntos complejos o que requieren decisión, debe constar por escrito.",
    topic: "Peticiones verbales"
  },
  {
    id: 35,
    question: "Cuando un ciudadano presenta una petición irrespetuosa (con insultos o amenazas):",
    options: [
      "Se rechaza sin más trámite",
      "La autoridad debe invitar al peticionario a reformularla respetuosamente; si insiste en términos irrespetuosos, puede abstenerse de responder pero debe explicar el motivo",
      "Se responde con los mismos términos",
      "Se archiva sin informar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El derecho de petición es para peticiones 'respetuosas' (art. 23 Constitución). Si contiene injurias, amenazas o términos irrespetuosos, la autoridad debe requerir al peticionario para que la reformule (artículo 18 Ley 1755). Si persiste, puede no responder de fondo pero debe motivar la decisión. El lenguaje respetuoso no significa subordinación, sino ausencia de insultos/amenazas.",
    topic: "Peticiones irrespetuosas"
  },

  // TRANSPARENCIA - CASOS ESPECIALES (8 preguntas)
  {
    id: 36,
    question: "Los datos personales están protegidos por la Ley 1581 de 2012 (Habeas Data), que establece:",
    options: [
      "Que todos los datos son públicos",
      "Principios de finalidad, libertad, veracidad, transparencia, acceso, seguridad; y derechos de conocer, actualizar, rectificar y suprimir datos personales",
      "Solo protección de datos financieros",
      "Que no se puede recolectar ningún dato"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La Ley 1581/2012 (Habeas Data) desarrolla el artículo 15 constitucional. Principios: finalidad (uso para el fin autorizado), libertad (consentimiento), veracidad (datos completos y actualizados), transparencia (información al titular), acceso (consulta), seguridad (protección contra acceso no autorizado). Derechos ARCO: Acceso, Rectificación, Cancelación, Oposición.",
    topic: "Ley de Habeas Data"
  },
  {
    id: 37,
    question: "La información pública de naturaleza tributaria, aduanera o financiera de las personas está:",
    options: [
      "Siempre disponible para cualquiera",
      "Sujeta a reserva legal, salvo cuando sea solicitada por autoridad competente o cuando la ley expresamente autorice su divulgación",
      "Totalmente prohibida sin excepción",
      "Solo disponible para periodistas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 24 de la Ley 1712 establece que la información tributaria, aduanera y financiera de las personas está reservada (Estatuto Tributario art. 583: reserva tributaria). Solo pueden acceder: el contribuyente, autoridades fiscales y de control, jueces en procesos, o cuando el titular autorice. Las sanciones tributarias firmes pueden publicarse.",
    topic: "Reserva de información financiera"
  },
  {
    id: 38,
    question: "El test de daño para clasificar información reservada requiere demostrar que la divulgación:",
    options: [
      "Simplemente es incómoda para el funcionario",
      "Causa daño real, concreto y específico a los intereses protegidos por la ley (seguridad, debido proceso, etc.), y que el daño es mayor que el interés público en conocer",
      "No requiere justificación",
      "Solo debe alegarse sin prueba"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El test de daño (art. 19 Ley 1712, Decreto 103/2015) exige que la entidad pruebe que divulgar la información causaría: 1) Daño a un interés legalmente protegido; 2) El daño debe ser específico, concreto y cierto (no hipotético); 3) El daño es mayor que el beneficio de divulgar. Invierte la carga de la prueba: quien niega debe justificar y probar.",
    topic: "Test de daño"
  },
  {
    id: 39,
    question: "Los datos abiertos son:",
    options: [
      "Solo información en PDF",
      "Datos públicos primarios u originales en formatos reutilizables (CSV, JSON, XML), de libre acceso sin restricciones, que pueden ser usados, reutilizados y redistribuidos",
      "Únicamente estadísticas generales",
      "Solo información del DANE"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los datos abiertos (art. 7 Ley 1712, Directiva Presidencial 02/2012) son datos públicos en formatos abiertos, estructurados, procesables por máquinas (CSV, JSON, XML, no solo PDF), sin restricciones legales, técnicas o financieras para su uso. Deben publicarse en www.datos.gov.co. Principios: completos, primarios, oportunos, accesibles, procesables, no discriminatorios, sin licencia, permanentes.",
    topic: "Datos abiertos"
  },
  {
    id: 40,
    question: "El plazo máximo de reserva de información clasificada es de:",
    options: [
      "Indefinido",
      "15 años, prorrogables excepcionalmente por periodos adicionales cuando persistan las causas de reserva",
      "5 años sin prórroga",
      "50 años automáticamente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 20 de la Ley 1712 establece plazo máximo de 15 años para la reserva. Puede prorrogarse por periodos adicionales si persisten las razones que justifican la clasificación, mediante acto motivado. La reserva no es perpetua. Vencido el plazo sin prórroga, la información debe desclasificarse y publicarse. Excepción: información del sistema de inteligencia (Ley 1621/2013) puede tener reserva mayor.",
    topic: "Plazo de reserva"
  },
  {
    id: 41,
    question: "La información sobre contratación pública debe:",
    options: [
      "Mantenerse reservada hasta finalizar el contrato",
      "Publicarse durante todas las etapas del proceso contractual en SECOP y sitio web de la entidad (principio de publicidad)",
      "Solo publicarse si hay denuncia",
      "Únicamente para contratos mayores de 1.000 millones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los artículos 9 y 11 de la Ley 1712 y el Estatuto de Contratación obligan a publicar toda la información contractual: estudios previos, pliegos, adendas, ofertas, informes de evaluación, contratos, modificaciones, pagos, informes de supervisión/interventoría, actas de liquidación. Se publica en SECOP (www.colombiacompra.gov.co) y sitio web de la entidad. Principio de transparencia contractual.",
    topic: "Publicidad en contratación"
  },
  {
    id: 42,
    question: "Las sesiones de corporaciones públicas (concejos, asambleas, congreso) son:",
    options: [
      "Siempre secretas",
      "Públicas por regla general, salvo casos excepcionales de reserva expresamente establecidos en la ley",
      "Solo públicas para periodistas acreditados",
      "Discrecionales según el presidente de la corporación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 133 de la Constitución establece que las sesiones de corporaciones públicas son públicas. Los ciudadanos pueden asistir. Solo pueden ser reservadas por motivos expresamente señalados en reglamentos (ej: sesiones de seguridad, evaluación de funcionarios). Las actas y votaciones deben ser públicas (transparencia legislativa).",
    topic: "Publicidad de sesiones"
  },
  {
    id: 43,
    question: "El monitoreo y evaluación del cumplimiento de la Ley 1712 lo realiza:",
    options: [
      "Cada entidad autónomamente sin control",
      "El Ministerio Público (Procuraduría), órganos de control (Contraloría, Auditoría General), y la ciudadanía mediante seguimiento y denuncias",
      "No hay seguimiento",
      "Solo el Presidente de la República"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El artículo 30 de la Ley 1712 establece el monitoreo por: Procuraduría General de la Nación (vigila cumplimiento), Ministerio Público (investiga violaciones), órganos de control fiscal, y ciudadanía (denuncias). Además, se aplican indicadores de transparencia (ITA - Índice de Transparencia y Acceso a la Información de Transparencia por Colombia). El incumplimiento genera faltas disciplinarias.",
    topic: "Control de cumplimiento"
  },

  // GESTIÓN DOCUMENTAL - AVANZADO (7 preguntas)
  {
    id: 44,
    question: "El Programa de Gestión Documental (PGD) debe contener:",
    options: [
      "Solo las TRD",
      "Planeación estratégica archivística, procesos de gestión documental, TRD, plan institucional de archivos (PINAR), políticas, recursos y responsables",
      "Únicamente el nombre del archivo",
      "Solo la lista de cajas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El PGD (Acuerdo AGN 002/2014, Decreto 1080/2015) es el instrumento que formula y documenta la función archivística. Incluye: política archivística institucional, planeación estratégica, procesos de gestión documental (producción, recepción, distribución, trámite, organización, consulta, conservación, disposición final), TRD aprobadas, plan institucional de archivos (PINAR), recursos, responsables, y cronograma.",
    topic: "Programa de Gestión Documental"
  },
  {
    id: 45,
    question: "El ciclo vital del documento contempla las fases:",
    options: [
      "Solo creación y archivo",
      "Archivo de gestión (trámite y consulta frecuente), archivo central (consulta esporádica, precautoria y jurídica), y archivo histórico (conservación permanente por valor cultural)",
      "Únicamente digital y físico",
      "Solo actual y antiguo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El ciclo vital del documento (teoría de las tres edades) comprende: 1) Archivo de Gestión (oficina productora, documentos activos, consulta frecuente); 2) Archivo Central (documentos semi-activos, consulta ocasional, conservación precautoria); 3) Archivo Histórico (documentos inactivos con valor histórico, cultural, científico, conservación permanente). Las TRD establecen tiempos en cada fase.",
    topic: "Ciclo vital del documento"
  },
  {
    id: 46,
    question: "Las transferencias documentales primarias son:",
    options: [
      "Cualquier movimiento de documentos",
      "El traslado de documentos del archivo de gestión al archivo central, una vez cumplido el tiempo de retención en gestión establecido en las TRD",
      "Solo envío de copias",
      "Eliminación de documentos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las transferencias primarias (Acuerdo AGN 004/2019) trasladan documentos de archivo de gestión (oficinas) a archivo central (entidad), según tiempos de retención en TRD. Las transferencias secundarias son de archivo central a archivo histórico. Deben elaborarse inventarios documentales (formato único de inventario - FUI), verificar organización, y documentar la entrega.",
    topic: "Transferencias documentales"
  },
  {
    id: 47,
    question: "La valoración documental determina:",
    options: [
      "Solo el precio de los documentos",
      "Los valores primarios (administrativo, legal, fiscal, contable) y secundarios (histórico, cultural, científico) para establecer tiempos de retención y disposición final",
      "Únicamente el tamaño de las cajas",
      "Solo el año de creación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La valoración documental identifica valores: Primarios (administrativo, jurídico-legal, fiscal-contable, técnico) que justifican retención durante trámite y precaución; Secundarios (histórico, científico, cultural) que justifican conservación permanente. La valoración fundamenta las TRD: documentos con solo valores primarios se eliminan tras cumplir plazos; documentos con valores secundarios se conservan.",
    topic: "Valoración documental"
  },
  {
    id: 48,
    question: "El foliado de documentos consiste en:",
    options: [
      "Solo contar las hojas",
      "Numerar secuencialmente los folios (hojas) de un expediente en la esquina superior derecha del recto, con numeración única por expediente",
      "Únicamente grapar",
      "Solo poner la fecha"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El foliado (Acuerdo AGN 027/2006) numera consecutivamente cada folio (hoja) del expediente. Se escribe con lápiz (permite corrección) en la esquina superior derecha del recto (cara frontal), de manera legible, sin enmendaduras. No se numera el verso. Los anexos (CD, planos) van en sobre identificado e inventariado. Garantiza integridad y orden del expediente.",
    topic: "Foliado"
  },
  {
    id: 49,
    question: "La eliminación de documentos debe:",
    options: [
      "Hacerse discrecionalmente por cualquier funcionario",
      "Estar autorizada en TRD aprobadas, previa selección por comité evaluador de documentos, con acta que registre la eliminación y métodos que garanticen destrucción irreversible",
      "Solo botarse a la basura",
      "No requiere ningún control"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La eliminación (Acuerdo AGN 004/2019) solo procede para documentos que: 1) Tienen disposición final 'E' en TRD aprobada; 2) Cumplieron tiempos de retención; 3) No tienen valores secundarios; 4) Fueron evaluados por comité. Requiere acta de eliminación firmada (responsable, fechas, series, cantidad). Métodos: trituración, incineración controlada, o reciclaje con destrucción previa garantizada.",
    topic: "Eliminación documental"
  },
  {
    id: 50,
    question: "El sistema de gestión de documentos electrónicos de archivo (SGDEA) debe garantizar:",
    options: [
      "Solo almacenar archivos en computador",
      "Autenticidad, integridad, fiabilidad, disponibilidad y trazabilidad de documentos electrónicos durante todo su ciclo de vida, cumpliendo estándares como ISO 15489 y normas AGN",
      "Únicamente respaldo en USB",
      "Solo correos electrónicos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El SGDEA debe cumplir (Acuerdo AGN 003/2015, ISO 15489, MoReq): Autenticidad (garantía de que el documento es lo que dice ser), Integridad (completo sin alteraciones), Fiabilidad (representación fiel de transacciones), Disponibilidad (localizable y accesible), y Trazabilidad (registro de operaciones). Incluye: metadatos, firma electrónica, timestamping, logs de auditoría, preservación digital a largo plazo.",
    topic: "Gestión documental electrónica"
  }
]

export function PqrsdTest() {
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
                  <span className="flex-1">
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
                  <span className="flex-1">
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
