"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, HardHat } from "lucide-react"
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
  // PROCESOS CONSTRUCTIVOS (4 preguntas)
  {
    id: 1,
    question: "Situacion\n\nDurante la construccion de una via terciaria en el municipio de Rionegro, el ingeniero residente debe verificar la compactacion de la base granular antes de continuar con la siguiente capa del pavimento flexible. El laboratorio de suelos esta listo para realizar los ensayos correspondientes.\n\nPregunta\n\nCon base en la situacion descrita, la compactacion de la capa de base granular debe alcanzar como minimo:",
    options: [
      "85% del ensayo Proctor Modificado",
      "95% del ensayo Proctor Modificado",
      "100% del ensayo Proctor Estandar",
      "90% del ensayo CBR"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, segun las especificaciones INVIAS, la compactacion de la base granular debe alcanzar minimo el 95% de la densidad maxima obtenida en el ensayo Proctor Modificado (norma INV E-142). Este porcentaje garantiza que el ingeniero residente apruebe la capa y pueda continuar con la construccion, asegurando la resistencia y durabilidad del pavimento.",
    topic: "Compactacion de bases"
  },
  {
    id: 2,
    question: "Situacion\n\nEn la construccion de un puente vehicular sobre el rio Aburra, el contratista ha fundido las columnas principales utilizando concreto de 4000 PSI. El interventor solicita evidencia del control de calidad del concreto para aprobar el siguiente desembolso del anticipo.\n\nPregunta\n\nCon base en la situacion descrita, el control de calidad del concreto en obra se realiza mediante ensayos de:",
    options: [
      "Solo inspeccion visual",
      "Resistencia a la compresion en cilindros a 7, 14 y 28 dias",
      "Unicamente peso volumetrico",
      "Solo medicion de asentamiento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para que el interventor apruebe el desembolso, el contratista debe presentar los resultados de los ensayos de resistencia a la compresion en cilindros (norma NTC 673) tomados a 7, 14 y 28 dias. Adicionalmente se realizan pruebas de asentamiento (slump) segun NTC 396, temperatura y contenido de aire. La resistencia a 28 dias es el parametro de aceptacion principal que garantiza la calidad estructural de las columnas del puente.",
    topic: "Control de calidad del concreto"
  },
  {
    id: 3,
    question: "Situacion\n\nDurante una visita de supervision a la construccion de un centro deportivo en Medellin, el funcionario de la Secretaria de Infraestructura solicita revisar el documento donde se registran todas las actividades diarias, ordenes impartidas y novedades de la obra.\n\nPregunta\n\nCon base en la situacion descrita, el libro o bitacora de obra es un documento que:",
    options: [
      "Es opcional y solo se usa en proyectos grandes",
      "Registra cronologicamente todos los eventos relevantes de la obra: actividades, novedades, ordenes, cambios, condiciones climaticas y visitas",
      "Solo documenta los pagos realizados",
      "Unicamente registra accidentes laborales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la bitacora de obra es obligatoria en proyectos de infraestructura publica (Ley 400/1997, NSR-10) y es precisamente el documento que el funcionario de la Secretaria solicita. Debe registrar diariamente: actividades ejecutadas, personal y equipos, condiciones climaticas, ordenes del interventor/supervisor, novedades, cambios, visitas de entidades, y cualquier evento relevante. Tiene valor legal para cualquier reclamacion o auditoria.",
    topic: "Bitacora de obra"
  },
  {
    id: 4,
    question: "Situacion\n\nEn la planta de asfalto del municipio de Bello, el operador debe calibrar los equipos para la produccion de mezcla asfaltica en caliente que sera utilizada en la repavimentacion de la via que conecta con Copacabana. El ingeniero de produccion supervisa los parametros de temperatura.\n\nPregunta\n\nCon base en la situacion descrita, en el proceso de fabricacion de mezclas asfalticas en caliente, la temperatura de mezclado del asfalto debe estar entre:",
    options: [
      "50 C - 80 C",
      "140 C - 165 C",
      "200 C - 250 C",
      "100 C - 120 C"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para que la mezcla asfaltica que producira la planta de Bello cumpla con las especificaciones INVIAS (Articulo 450), el operador debe configurar los equipos para mantener temperaturas de mezclado entre 140 C y 165 C, y de compactacion entre 125 C y 145 C. Estas temperaturas aseguran la trabajabilidad del asfalto y la adherencia con los agregados para la repavimentacion.",
    topic: "Mezclas asfalticas"
  },

  // MANTENIMIENTO (4 preguntas)
  {
    id: 5,
    question: "Situacion\n\nLa Secretaria de Infraestructura del departamento de Antioquia esta elaborando el plan anual de mantenimiento para la red vial terciaria. El ingeniero encargado debe definir las actividades de mantenimiento rutinario que se ejecutaran mensualmente en los 125 municipios.\n\nPregunta\n\nCon base en la situacion descrita, el mantenimiento rutinario de vias comprende actividades como:",
    options: [
      "Reconstruccion total del pavimento",
      "Limpieza de cunetas, desmonte de vegetacion, bacheo menor, limpieza de alcantarillas y senalizacion",
      "Ampliacion de la calzada",
      "Construccion de nuevos puentes"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para el plan anual de mantenimiento rutinario que debe ejecutarse mensualmente en la red vial terciaria de Antioquia, el ingeniero debe incluir actividades frecuentes y de bajo costo segun INVIAS: limpieza de obras de drenaje, control de vegetacion, bacheo superficial menor, reparacion de senales, limpieza de derrumbes menores. Estas actividades preservan la transitabilidad de las vias.",
    topic: "Mantenimiento rutinario"
  },
  {
    id: 6,
    question: "Situacion\n\nEl coordinador de mantenimiento vial del municipio de Envigado ha identificado que varios tramos de la red vial urbana presentan fisuras incipientes que aun no afectan la estructura del pavimento. Debe programar intervenciones para evitar que estas fallas menores se conviertan en danos mayores.\n\nPregunta\n\nCon base en la situacion descrita, el mantenimiento preventivo de pavimentos incluye actividades como:",
    options: [
      "Esperar a que aparezcan fallas graves",
      "Sello de fisuras, tratamientos superficiales, micro-pavimentos y sobre-capas asfalticas delgadas",
      "Solo pintura de senalizacion",
      "Demolicion y reconstruccion total"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para atender las fisuras incipientes identificadas en Envigado antes de que se conviertan en fallas estructurales graves, el coordinador debe programar actividades de mantenimiento preventivo como: sello de fisuras y grietas, tratamientos superficiales (TSS), micro-pavimentos (slurry seal), y capas de refuerzo delgadas. Esto extiende significativamente la vida util del pavimento y evita intervenciones mas costosas.",
    topic: "Mantenimiento preventivo"
  },
  {
    id: 7,
    question: "Situacion\n\nEl director de infraestructura del municipio de Itagui debe sustentar ante el Concejo Municipal la priorizacion de los tramos viales que seran intervenidos el proximo ano. Los concejales solicitan que la programacion se base en criterios tecnicos y no solo en solicitudes de la comunidad.\n\nPregunta\n\nCon base en la situacion descrita, la programacion del mantenimiento vial debe basarse en:",
    options: [
      "Unicamente en el presupuesto disponible",
      "Inventarios viales, evaluacion del estado del pavimento (PCI, IRI), volumenes de trafico y analisis de costo-beneficio",
      "Solo en quejas de la comunidad",
      "Decisiones politicas sin criterios tecnicos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para sustentar tecnicamente la priorizacion ante el Concejo de Itagui, el director debe presentar: inventario actualizado de la red vial, evaluacion de condicion del pavimento (PCI - Pavement Condition Index, IRI - International Roughness Index), aforos de trafico (TPD), y analisis economico de costo-beneficio. Esta metodologia tecnica permite justificar objetivamente las intervenciones priorizadas.",
    topic: "Programacion de mantenimiento"
  },
  {
    id: 8,
    question: "Situacion\n\nUn equipo de inspectores viales de la Gobernacion de Antioquia esta realizando la evaluacion del estado de las vias secundarias del Oriente antioqueno. Utilizan una metodologia estandarizada para calificar la condicion superficial de cada tramo y priorizar las intervenciones de mantenimiento.\n\nPregunta\n\nCon base en la situacion descrita, el Indice de Condicion del Pavimento (PCI) es:",
    options: [
      "Una medida solo del color del pavimento",
      "Un indicador numerico (0-100) que califica el estado del pavimento segun tipo, severidad y cantidad de fallas",
      "Unicamente cuenta el numero de baches",
      "Solo mide el espesor del pavimento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, los inspectores utilizan el PCI (ASTM D6433) que es un indice numerico de 0 a 100 para calificar la condicion superficial del pavimento de las vias del Oriente antioqueno. Evalua 19 tipos de fallas (fisuras, deformaciones, perdida de material) segun severidad (baja, media, alta) y extension. PCI 100 = Excelente; PCI 0 = Fallado. Este indicador permite a la Gobernacion programar el mantenimiento de manera objetiva.",
    topic: "PCI - Indice de Condicion"
  },

  // HIDRAULICA Y DRENAJE (5 preguntas)
  {
    id: 9,
    question: "Situacion\n\nEl disenador hidraulico de una firma consultora esta calculando las dimensiones de las alcantarillas para un proyecto de mejoramiento vial en la zona rural de Santa Rosa de Osos, donde las lluvias son frecuentes e intensas. Debe garantizar que las estructuras evacuen adecuadamente el caudal de diseno.\n\nPregunta\n\nCon base en la situacion descrita, el diseno de alcantarillas en vias debe considerar:",
    options: [
      "Solo el ancho de la via",
      "Periodo de retorno (10-50 anos), area de cuenca, tiempo de concentracion, intensidad de lluvia, caudal de diseno y pendiente longitudinal",
      "Unicamente el costo de los materiales",
      "Solo la profundidad de instalacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para dimensionar correctamente las alcantarillas del proyecto en Santa Rosa de Osos, el disenador hidraulico debe aplicar el Manual de Drenaje INVIAS considerando: periodo de retorno segun importancia de la via (10-50 anos), delimitacion de cuenca de drenaje, calculo de tiempo de concentracion, determinacion de intensidad de lluvia con curvas IDF de la zona, calculo de caudal con metodo racional, y diseno de seccion hidraulica con ecuacion de Manning.",
    topic: "Diseno de alcantarillas"
  },
  {
    id: 10,
    question: "Situacion\n\nDurante la temporada de lluvias, el ingeniero residente de una obra vial en el municipio de Girardota observa que el agua de escorrentia de la calzada y los taludes superiores esta erosionando la subrasante e infiltrandose en las capas del pavimento recien construido.\n\nPregunta\n\nCon base en la situacion descrita, las cunetas en carreteras tienen como funcion principal:",
    options: [
      "Servir como estacionamiento",
      "Recolectar y conducir las aguas lluvias de la calzada y taludes hacia estructuras de desague, evitando erosion e infiltracion en el pavimento",
      "Solo decoracion de la via",
      "Almacenar materiales de construccion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el problema de erosion e infiltracion en la obra de Girardota se debe a la falta de cunetas adecuadas. Segun INVIAS, las cunetas captan y evacuan el agua lluvia de la superficie de rodadura y taludes superiores, evitando: erosion de la subrasante, infiltracion que debilite el pavimento, y encharcamientos. El ingeniero debe construir cunetas triangulares, trapezoidales o rectangulares, revestidas o sin revestir, segun caudal y velocidad calculados.",
    topic: "Cunetas de drenaje"
  },
  {
    id: 11,
    question: "Situacion\n\nUn ingeniero hidraulico debe calcular el caudal de escorrentia para disenar el sistema de drenaje de una via rural en el municipio de Barbosa. La cuenca de aportacion tiene un area de 3 hectareas y presenta cobertura mixta entre pastos y zonas urbanizadas.\n\nPregunta\n\nCon base en la situacion descrita, el metodo racional para calcular caudales de escorrentia se expresa como:",
    options: [
      "Q = A x V",
      "Q = C x I x A / 360 (donde Q en L/s, C coeficiente escorrentia, I intensidad mm/h, A area hectareas)",
      "Q = P x E",
      "Q = D / T"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para calcular el caudal de la cuenca de 3 hectareas en Barbosa, el ingeniero debe aplicar el metodo racional (Q = C*I*A/360) apropiado para cuencas pequenas (< 5 km2). Q = caudal en L/s; C = coeficiente de escorrentia ponderado para la cobertura mixta (pastos y zonas urbanizadas); I = intensidad de lluvia en mm/h para el tiempo de concentracion y periodo de retorno; A = area de cuenca en hectareas. El factor 360 convierte las unidades.",
    topic: "Metodo racional de caudal"
  },
  {
    id: 12,
    question: "Situacion\n\nAl finalizar la construccion de una alcantarilla de cajon en una via del municipio de La Ceja, el interventor observa que en la zona de descarga se esta formando un proceso de socavacion que amenaza la estabilidad del terraplen de la via.\n\nPregunta\n\nCon base en la situacion descrita, para evitar la erosion en descargas de alcantarillas se debe:",
    options: [
      "No hacer nada adicional",
      "Construir disipadores de energia, enrocados de proteccion, transiciones adecuadas, y revegetalizar zonas descubiertas",
      "Solo colocar senalizacion",
      "Unicamente pintar la estructura"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para corregir el problema de socavacion en la descarga de la alcantarilla de La Ceja, se requiere: diseno de disipadores de energia (escalones, pantallas), enrocado de proteccion en la descarga, transiciones graduales, control de velocidad de flujo, y revegetalizacion de taludes. Esto evita la erosion regresiva y protege la estabilidad del terraplen de la via.",
    topic: "Control de erosion"
  },
  {
    id: 13,
    question: "Situacion\n\nEl consultor encargado del diseno hidrologico para un proyecto vial en el municipio de Guatape necesita determinar la intensidad de lluvia de diseno. Para esto debe calcular primero el tiempo que tarda el agua en recorrer desde el punto mas alejado de la cuenca hasta el sitio de la alcantarilla.\n\nPregunta\n\nCon base en la situacion descrita, el tiempo de concentracion (Tc) de una cuenca hidrografica es:",
    options: [
      "El tiempo que tarda en llover",
      "El tiempo que tarda el agua en viajar desde el punto mas alejado de la cuenca hasta el punto de salida o desague",
      "La duracion total de la tormenta",
      "El tiempo de construccion de la obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el consultor necesita calcular el tiempo de concentracion para el proyecto en Guatape, que es el tiempo que tarda una gota de agua en recorrer desde el punto hidrologicamente mas alejado de la cuenca hasta el punto de salida. Se calcula con formulas como Kirpich, California Culverts Practice, o SCS. Es fundamental porque permite determinar la intensidad de lluvia en las curvas IDF para el diseno hidraulico de la alcantarilla.",
    topic: "Tiempo de concentracion"
  },

  // SEGURIDAD EN CONSTRUCCION (2 preguntas)
  {
    id: 14,
    question: "Situacion\n\nUna empresa contratista iniciara trabajos de repavimentacion en un tramo de 2 kilometros de la via que comunica a Rionegro con Marinilla, la cual permanecera en servicio durante la ejecucion de las obras. El interventor exige la implementacion de medidas de seguridad vial.\n\nPregunta\n\nCon base en la situacion descrita, durante la ejecucion de obras viales en vias en servicio, se debe implementar:",
    options: [
      "Ninguna medida especial",
      "Plan de Manejo de Trafico (PMT) con senalizacion preventiva, informativa y reglamentaria; dispositivos de canalizacion; personal de bandereo; y horarios restringidos si aplica",
      "Solo cerrar completamente la via",
      "Unicamente colocar una senal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para ejecutar la repavimentacion del tramo Rionegro-Marinilla manteniendo la via en servicio, el contratista debe implementar un Plan de Manejo de Trafico (Resolucion 1050/2004 Min Transporte, Manual de Senalizacion INVIAS). Este debe incluir: senalizacion temporal adecuada, desvios seguros, proteccion de trabajadores y usuarios, bandereros certificados, y coordinacion con autoridades de transito. Esto reduce la accidentalidad durante la obra.",
    topic: "Plan de Manejo de Trafico"
  },
  {
    id: 15,
    question: "Situacion\n\nEl coordinador de seguridad y salud en el trabajo de una empresa constructora debe verificar que todos los trabajadores de una obra de construccion de un intercambio vial en Bello cuenten con la dotacion de seguridad requerida antes de ingresar al frente de trabajo.\n\nPregunta\n\nCon base en la situacion descrita, los elementos de proteccion personal (EPP) minimos obligatorios en obras de construccion son:",
    options: [
      "Solo uniformes",
      "Casco, botas de seguridad, chaleco reflectivo, guantes, y proteccion especifica segun riesgo (gafas, proteccion auditiva, arnes)",
      "Unicamente el casco",
      "Solo ropa comoda"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el coordinador de seguridad de la obra del intercambio vial en Bello debe verificar que cada trabajador porte los EPP obligatorios segun Resolucion 0312/2019 y el SG-SST: casco clase G, botas con puntera de acero, chaleco reflectivo, guantes segun tarea. Adicionalmente, segun exposicion: gafas de seguridad, proteccion auditiva (>85 dB), proteccion respiratoria (polvo, quimicos), arnes (trabajo en alturas >1.5m). El empleador debe suministrar y capacitar en su uso.",
    topic: "EPP en construccion"
  }
]

const questionsV2: Question[] = [
  // PROCESOS CONSTRUCTIVOS (4 preguntas)
  {
    id: 16,
    question: "Situacion\n\nEl laboratorio de materiales de una empresa constructora esta realizando el diseno de la mezcla asfaltica que sera utilizada en la rehabilitacion de 15 kilometros de via en el suroeste antioqueno. El ingeniero de materiales debe determinar el contenido optimo de asfalto y verificar las propiedades mecanicas de la mezcla.\n\nPregunta\n\nCon base en la situacion descrita, el ensayo Marshall para mezclas asfalticas determina:",
    options: [
      "Solo el color de la mezcla",
      "La estabilidad, flujo, vacios en la mezcla, vacios en el agregado mineral (VMA), y contenido optimo de asfalto",
      "Unicamente la temperatura",
      "Solo el peso de la mezcla"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para disenar la mezcla asfaltica del proyecto del suroeste antioqueno, el laboratorio debe aplicar el metodo Marshall (norma INV E-748, ASTM D1559). Este ensayo determina: estabilidad (resistencia a deformacion), flujo (deformacion bajo carga), % vacios (2-5%), VMA (vacios en agregado mineral >13-15%), y contenido optimo de asfalto. Las briquetas se fabrican a temperatura controlada y se compactan con 50 o 75 golpes segun trafico.",
    topic: "Ensayo Marshall"
  },
  {
    id: 17,
    question: "Situacion\n\nDespues de fundir la losa de cimentacion de un puente peatonal en el municipio de Sabaneta, el ingeniero residente debe garantizar que el concreto alcance la resistencia de diseno. Las condiciones climaticas de la zona son calidas con baja humedad relativa.\n\nPregunta\n\nCon base en la situacion descrita, el curado del concreto debe realizarse durante al menos:",
    options: [
      "1 dia",
      "7 dias para concretos convencionales y 14 dias para elementos estructurales importantes",
      "Solo hasta que endurezca superficialmente",
      "No es necesario curar el concreto"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, dado que la losa de cimentacion del puente en Sabaneta es un elemento estructural importante y las condiciones climaticas son calidas con baja humedad, el curado segun NSR-10 C.5.11 y NTC 3318 debe mantener humedad y temperatura adecuada minimo 14 dias. Metodos recomendados: aspersion de agua, membranas de curado, o mantas humedas. Esto garantiza la hidratacion completa del cemento y la resistencia optima del elemento estructural.",
    topic: "Curado del concreto"
  },
  {
    id: 18,
    question: "Situacion\n\nDurante la construccion de un terraplen para una variante vial en el municipio de Caldas, el laboratorista debe realizar ensayos de campo para verificar que cada capa de material compactado cumpla con las especificaciones antes de colocar la siguiente.\n\nPregunta\n\nCon base en la situacion descrita, el control de compactacion en terraplenes se verifica mediante:",
    options: [
      "Solo observacion visual",
      "Ensayos de densidad en campo (cono de arena, densometro nuclear) comparados con densidad de laboratorio Proctor, buscando mayor o igual a 95% de compactacion",
      "Unicamente se pesa el material",
      "No requiere control"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para verificar la compactacion del terraplen de la variante en Caldas, el laboratorista debe realizar ensayos de densidad in-situ cada 250-500 m3 mediante cono de arena (INV E-161) o densometro nuclear (INV E-164), segun especificaciones INVIAS Art. 220. Los resultados se comparan con la densidad maxima Proctor Modificado de laboratorio, requiriendo mayor o igual a 95% de compactacion. Tambien se verifica humedad optima con tolerancia de mas o menos 2%.",
    topic: "Control de compactacion"
  },
  {
    id: 19,
    question: "Situacion\n\nEl laboratorio de materiales recibio muestras de agregados de una cantera del municipio de San Pedro de los Milagros para verificar si cumplen con las especificaciones requeridas para la fabricacion de concreto estructural de un proyecto de edificaciones publicas.\n\nPregunta\n\nCon base en la situacion descrita, la granulometria de agregados para concreto se determina mediante:",
    options: [
      "Solo medicion visual",
      "Analisis por tamizado en serie de tamices normalizados (ASTM) desde 3 pulgadas hasta tamiz No. 200, calculando porcentajes retenidos y pasantes",
      "Unicamente se pesa el material",
      "Solo se mide el tamano maximo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para verificar si los agregados de la cantera de San Pedro de los Milagros cumplen especificaciones, el laboratorio debe realizar analisis granulometrico (NTC 77, ASTM C136) usando serie de tamices: 3 pulgadas, 2 pulgadas, 1 y media pulgadas, 1 pulgada, 3/4, 1/2, 3/8, No.4, No.8, No.16, No.30, No.50, No.100, No.200. Se calcula % retenido, % retenido acumulado, % pasante, y modulo de finura. Los resultados deben cumplir los husos granulometricos especificados para concreto estructural.",
    topic: "Granulometria de agregados"
  },

  // MANTENIMIENTO (3 preguntas)
  {
    id: 20,
    question: "Situacion\n\nLa via que comunica a Carmen de Viboral con la autopista Medellin-Bogota presenta multiples baches profundos, fisuras severas tipo piel de cocodrilo y hundimientos que afectan la seguridad vial. El alcalde solicita una intervencion urgente para restablecer las condiciones de transitabilidad.\n\nPregunta\n\nCon base en la situacion descrita, el mantenimiento correctivo de pavimentos se aplica cuando:",
    options: [
      "El pavimento esta en perfecto estado",
      "Ya existen fallas evidentes (baches, fisuras severas, deformaciones) que requieren reparacion inmediata para evitar deterioro acelerado",
      "Solo para cumplir presupuesto",
      "Cada 10 anos automaticamente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, las fallas evidentes de la via Carmen de Viboral (baches profundos, fisuras severas, hundimientos) requieren mantenimiento correctivo urgente. Este tipo de mantenimiento atiende fallas ya manifestadas mediante: bacheo profundo, parcheo de areas deterioradas, reparacion de fisuras severas, correccion de deformaciones. Es reactivo y mas costoso que el preventivo, pero necesario cuando el deterioro ya compromete la seguridad vial como en este caso.",
    topic: "Mantenimiento correctivo"
  },
  {
    id: 21,
    question: "Situacion\n\nLa Secretaria de Movilidad de un municipio del Area Metropolitana esta actualizando su sistema de informacion geografica vial. El ingeniero encargado debe definir los datos que se recopilaran en campo para tener un registro completo del patrimonio vial del municipio.\n\nPregunta\n\nCon base en la situacion descrita, un inventario vial debe incluir:",
    options: [
      "Solo la longitud de las vias",
      "Longitud, ancho, tipo de superficie, estado del pavimento, obras de drenaje, senalizacion, puentes, tuneles, coordenadas GPS, TPD y clasificacion funcional",
      "Unicamente fotografias",
      "Solo el nombre de las vias"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para que el sistema de informacion geografica del municipio sea completo y util para la gestion vial, el ingeniero debe recopilar: caracteristicas geometricas (longitud, ancho, radios), tipo de pavimento y estado (PCI, IRI), inventario de senales y demarcacion, puentes y tuneles con estado, obras de drenaje, TPD y composicion vehicular, georreferenciacion, derecho de via, y priorizacion. Este inventario completo es la base para planificar mantenimiento y asignar recursos.",
    topic: "Inventario vial"
  },
  {
    id: 22,
    question: "Situacion\n\nUna via principal del municipio de La Estrella presenta deterioro estructural severo despues de 20 anos de servicio. Los estudios de deflectometria muestran que las capas del pavimento han perdido su capacidad portante y el mantenimiento superficial ya no es suficiente para recuperar el nivel de servicio.\n\nPregunta\n\nCon base en la situacion descrita, la rehabilitacion de un pavimento implica:",
    options: [
      "Solo pintar la superficie",
      "Intervencion mayor que restaura la capacidad estructural: puede incluir fresado, refuerzo estructural, reconstruccion de capas, nuevo diseno de pavimento",
      "Unicamente limpieza",
      "Solo reparacion de senales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, dado que la via de La Estrella ha alcanzado el final de su vida util despues de 20 anos y presenta danos estructurales severos confirmados por deflectometria, requiere rehabilitacion segun INVIAS. Esta intervencion mayor incluye: evaluacion estructural completa, fresado de capas deterioradas, reparacion de base/subbase si necesario, refuerzo estructural calculado, y nueva carpeta asfaltica. Esto restaurara el nivel de servicio por 10-20 anos adicionales.",
    topic: "Rehabilitacion de pavimento"
  },

  // HIDRAULICA Y DRENAJE (5 preguntas)
  {
    id: 23,
    question: "Situacion\n\nUn disenador hidraulico esta calculando el caudal de escorrentia para el sistema de drenaje de una urbanizacion en el municipio de Retiro. La zona presenta variedad de coberturas: un area boscosa en la parte alta, zonas de pastos en el centro, y la urbanizacion con calles pavimentadas en la parte baja.\n\nPregunta\n\nCon base en la situacion descrita, el coeficiente de escorrentia (C) en el metodo racional depende de:",
    options: [
      "Solo el tamano de la cuenca",
      "Tipo de cobertura del suelo, pendiente, tipo de suelo, uso del suelo (impermeabilizacion). Varia de 0.05 (bosque) a 0.95 (asfalto)",
      "Unicamente la temperatura",
      "Solo la altitud"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para calcular el caudal de la urbanizacion en Retiro con coberturas variadas, el disenador debe asignar diferentes coeficientes de escorrentia C segun cada zona: bosque denso 0.05-0.20; pastizales 0.10-0.35; zonas urbanizadas residenciales 0.30-0.70; calles pavimentadas 0.85-0.95. El coeficiente C representa la fraccion de lluvia que se convierte en escorrentia y depende de: permeabilidad del suelo, pendiente, cobertura vegetal, y grado de impermeabilizacion de cada area.",
    topic: "Coeficiente de escorrentia"
  },
  {
    id: 24,
    question: "Situacion\n\nEl ingeniero hidraulico de un proyecto vial en el municipio de San Vicente Ferrer necesita determinar la intensidad de lluvia para disenar las alcantarillas con un periodo de retorno de 25 anos y una duracion igual al tiempo de concentracion calculado de la cuenca.\n\nPregunta\n\nCon base en la situacion descrita, las curvas IDF (Intensidad-Duracion-Frecuencia) se utilizan para:",
    options: [
      "Disenar solamente puentes",
      "Determinar la intensidad de lluvia de diseno para un periodo de retorno y duracion especificos, esencial en diseno de drenajes",
      "Solo medir temperatura",
      "Calcular costos de obra"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para determinar la intensidad de lluvia del proyecto en San Vicente Ferrer, el ingeniero debe consultar las curvas IDF de la zona. Estas curvas relacionan la intensidad de precipitacion (mm/h) con la duracion del evento (tiempo de concentracion) y la frecuencia o periodo de retorno (25 anos). Son especificas de cada region geografica y el IDEAM publica IDF para Colombia. Con el Tc y el periodo de retorno, se obtiene la intensidad de diseno para dimensionar las alcantarillas.",
    topic: "Curvas IDF"
  },
  {
    id: 25,
    question: "Situacion\n\nEl disenador del sistema de drenaje pluvial para la renovacion urbana del centro de Caucasia debe ubicar estrategicamente los sumideros o tragantes para captar el agua de escorrentia de las calles y evitar encharcamientos que afecten el comercio y la movilidad peatonal.\n\nPregunta\n\nCon base en la situacion descrita, los sumideros o tragantes en vias urbanas deben ubicarse:",
    options: [
      "En cualquier lugar sin criterio",
      "En puntos bajos, antes de intersecciones, cambios de pendiente, y espaciados segun capacidad hidraulica y caudal de escorrentia (tipicamente cada 30-60m)",
      "Solo en las esquinas",
      "Unicamente cada 200 metros"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para evitar los encharcamientos en el centro de Caucasia, el disenador debe ubicar los sumideros estrategicamente: en puntos bajos, antes de cruces peatonales e intersecciones (evitar encharcamientos que afecten comercio y peatones), en cambios de pendiente, y con espaciamiento segun calculo hidraulico (30-60m tipico, menor en zonas comerciales como esta). Tipos recomendados: sumidero de ventana, de reja, o mixto. Requieren sedimentadores para mantenimiento.",
    topic: "Sumideros urbanos"
  },
  {
    id: 26,
    question: "Situacion\n\nEl ingeniero hidraulico esta disenando un canal trapezoidal revestido en concreto para conducir las aguas lluvias de una zona industrial en el municipio de Girardota. Debe calcular las dimensiones del canal para que transporte el caudal de diseno sin desbordarse.\n\nPregunta\n\nCon base en la situacion descrita, para el diseno de canales abiertos se utiliza la ecuacion de Manning:",
    options: [
      "Q = A x C",
      "Q = (1/n) x A x R elevado a (2/3) x S elevado a (1/2), donde n es coeficiente de rugosidad, A area, R radio hidraulico, S pendiente",
      "Q = V / T",
      "Q = P x L"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para dimensionar el canal trapezoidal de concreto en Girardota, el ingeniero debe aplicar la ecuacion de Manning que calcula velocidad y caudal en flujo a superficie libre: V = (1/n) x R elevado a (2/3) x S elevado a (1/2); Q = V x A. Donde: n = rugosidad de Manning (0.010-0.015 para concreto); R = A/P (radio hidraulico); S = pendiente longitudinal; A = area mojada; P = perimetro mojado. Con el caudal de diseno conocido, se calculan las dimensiones del canal.",
    topic: "Ecuacion de Manning"
  },
  {
    id: 27,
    question: "Situacion\n\nDurante la construccion de una autopista en una zona con nivel freatico alto cerca del municipio de Puerto Berrio, el ingeniero geotecnista recomienda instalar un sistema de drenaje subterraneo para evitar que el agua del subsuelo afecte las capas del pavimento.\n\nPregunta\n\nCon base en la situacion descrita, el drenaje subterraneo (subdrenaje) en carreteras tiene como objetivo:",
    options: [
      "Solo ahorrar costos",
      "Captar y evacuar agua del subsuelo y capas del pavimento para evitar saturacion, perdida de capacidad portante, y danos por bombeo",
      "Unicamente decoracion",
      "Almacenar agua"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, dado el nivel freatico alto en Puerto Berrio, el subdrenaje recomendado por el geotecnista es esencial para controlar el agua freatica y la infiltrada en el pavimento. Este sistema (filtros, drenes, capas drenantes) evita: saturacion de la subrasante (perdida de CBR), bombeo de finos bajo las cargas del trafico, y erosion interna. Se disena con geotextiles filtrantes, material granular drenante, y tuberias perforadas con pendiente de salida.",
    topic: "Subdrenaje en carreteras"
  },

  // SEGURIDAD EN CONSTRUCCION (3 preguntas)
  {
    id: 28,
    question: "Situacion\n\nUna empresa constructora que ejecutara un proyecto de puentes en varios municipios de Antioquia debe implementar un sistema que le permita identificar peligros, evaluar riesgos y establecer controles para proteger la seguridad y salud de sus trabajadores en todas las obras.\n\nPregunta\n\nCon base en la situacion descrita, el Sistema de Gestion de Seguridad y Salud en el Trabajo (SG-SST) es:",
    options: [
      "Opcional en obras pequenas",
      "Obligatorio para todos los empleadores (Ley 1562/2012, Decreto 1072/2015), requiere: politica SST, identificacion de peligros, controles, capacitacion, auditorias y mejora continua",
      "Solo para empresas extranjeras",
      "Unicamente un documento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la empresa constructora del proyecto de puentes en Antioquia esta obligada a implementar el SG-SST segun Ley 1562/2012 y Decreto 1072/2015. El sistema debe aplicar el ciclo PHVA: Planear (politica, objetivos, identificacion de peligros, evaluacion de riesgos), Hacer (controles, capacitacion, preparacion para emergencias), Verificar (medicion, auditorias), Actuar (mejora continua). La Resolucion 0312/2019 establece los estandares minimos que debe cumplir.",
    topic: "SG-SST"
  },
  {
    id: 29,
    question: "Situacion\n\nEl contratista de una obra de ampliacion vial en la via Medellin-Santa Fe de Antioquia debe instalar la senalizacion temporal para la zona de trabajo. La via tiene velocidad de operacion de 80 km/h y los trabajos se realizaran tanto en horario diurno como nocturno.\n\nPregunta\n\nCon base en la situacion descrita, la senalizacion temporal en zonas de trabajo debe incluir:",
    options: [
      "Solo una senal de 'Hombres trabajando'",
      "Senales preventivas (distancia 90-200m segun velocidad), informativas (30m), reglamentarias, dispositivos de canalizacion (conos, barreras, delineadores), y elementos luminosos en horario nocturno",
      "Unicamente pintura en el suelo",
      "No requiere senalizacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para la obra de ampliacion en la via Medellin-Santa Fe de Antioquia con velocidad de 80 km/h, el contratista debe instalar segun Manual de Senalizacion INVIAS y Resolucion 1050/2004: senales preventivas (SP-47 'Trabajos en la via') a distancia de 150-200m por la velocidad; senales informativas (30m antes); senales reglamentarias de velocidad maxima; dispositivos de canalizacion (conos H=71cm espaciados 3-6m, barreras tipo III); y dado el trabajo nocturno, elementos reflectivos y luces. Bandereros con paletas PARE-SIGA.",
    topic: "Senalizacion temporal"
  },
  {
    id: 30,
    question: "Situacion\n\nAl finalizar la demolicion de un antiguo puente vehicular en el municipio de Amaga, el contratista debe gestionar adecuadamente los residuos generados: escombros de concreto, varillas de acero, madera de formaletas y materiales contaminados. La autoridad ambiental realizara seguimiento al manejo de estos residuos.\n\nPregunta\n\nCon base en la situacion descrita, el Plan de Gestion Integral de Residuos de Construccion y Demolicion (PGIR-CD) debe contemplar:",
    options: [
      "Botar todo en cualquier lugar",
      "Reduccion en origen, separacion en sitio, reutilizacion, reciclaje, transporte adecuado, disposicion final autorizada, y documentacion de cantidades y destinos",
      "Solo barrer la obra al final",
      "Quemar todos los residuos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para cumplir con la Resolucion 0472/2017 del MADS y el seguimiento de la autoridad ambiental, el contratista de la demolicion del puente en Amaga debe implementar un PGIR-CD que incluya: estimacion de cantidades generadas, clasificacion (aprovechables: concreto, acero, madera; no aprovechables: contaminados), reduccion en origen, separacion en obra, acopio temporal adecuado, aprovechamiento/reciclaje del concreto y acero, transporte con vehiculos autorizados, disposicion solo en sitios licenciados, y registro documentado de cantidades y destinos.",
    topic: "Gestion de RCD"
  }
]

export function ObrasPublicasTest() {
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
        <HardHat className="h-8 w-8 text-orange-600" />
        <div>
          <h2 className="text-2xl font-bold">Obras Publicas e Hidraulica</h2>
          <p className="text-sm text-muted-foreground">
            Procesos constructivos, mantenimiento vial, hidraulica y drenaje, y seguridad en construccion
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value)
        handleReset()
      }}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="v1">Version 1 (15 preguntas)</TabsTrigger>
          <TabsTrigger value="v2">Version 2 (15 preguntas)</TabsTrigger>
        </TabsList>

        <TabsContent value="v1" className="space-y-6 mt-6">
          {questionsV1.map((q) => (
            <Card key={q.id} className="border-orange-200">
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
                      <strong>Explicacion:</strong> {q.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="v2" className="space-y-6 mt-6">
          {questionsV2.map((q) => (
            <Card key={q.id} className="border-orange-200">
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
                      <strong>Explicacion:</strong> {q.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 sticky bottom-4 bg-background p-4 border rounded-lg shadow-lg">
        <Button onClick={handleSubmit} disabled={showResults} className="flex-1 bg-orange-600 hover:bg-orange-700">
          Calificar
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1">
          Reiniciar
        </Button>
      </div>

      {showResults && (
        <Card className="border-orange-300 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-orange-600" />
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
                  ? "Excelente! Dominas los conceptos de obras publicas e hidraulica."
                  : score.percentage >= 60
                  ? "Buen trabajo. Refuerza algunos conceptos tecnicos."
                  : "Sigue estudiando. Revisa las normas INVIAS, NSR-10 y diseno hidraulico."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
