"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"
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

export const infraestructuraQuestions: Question[] = [
  // Clasificacion de infraestructura
  {
    id: 1,
    question: "Situacion\n\nLa Secretaria de Movilidad de Medellin esta elaborando el Plan Maestro de Movilidad y necesita clasificar todas las vias urbanas del municipio para determinar prioridades de intervencion y asignacion de recursos. El equipo tecnico debe aplicar la clasificacion oficial del sistema vial urbano.\n\nPregunta\n\nSegun la normativa colombiana, ¿como se clasifica correctamente la jerarquizacion del sistema vial urbano?",
    options: [
      "Solo vias principales y secundarias",
      "Vias arterias (V-0, V-1), vias principales (V-2, V-3), vias secundarias (V-4, V-5), vias terciarias (V-6, V-7), vias peatonales (V-8) y ciclorutas (V-9)",
      "Unicamente autopistas y calles",
      "Solo vias vehiculares sin clasificacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Secretaria de Movilidad debe aplicar la clasificacion oficial del sistema vial urbano segun el POT y manuales de diseno: arterias (V-0, V-1), principales (V-2, V-3), secundarias (V-4, V-5), terciarias (V-6, V-7), peatonales (V-8) y ciclorutas (V-9), segun su funcion, capacidad y velocidad de diseno.",
    topic: "Jerarquizacion vial"
  },
  {
    id: 2,
    question: "Situacion\n\nEl municipio de Envigado esta actualizando su Plan de Ordenamiento Territorial y requiere hacer un inventario completo de los equipamientos colectivos existentes. La Secretaria de Planeacion necesita definir claramente que tipos de infraestructura deben incluirse en este inventario.\n\nPregunta\n\nSegun la normativa urbanistica, ¿cuales infraestructuras conforman los equipamientos colectivos de una ciudad?",
    options: [
      "Solo viviendas privadas",
      "Infraestructuras de educacion, salud, cultura, recreacion, deporte, seguridad, servicios publicos y administracion publica",
      "Unicamente centros comerciales",
      "Solo oficinas privadas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, los equipamientos colectivos que debe inventariar Envigado son infraestructuras de uso publico que prestan servicios sociales: educacion (colegios), salud (hospitales), cultura (bibliotecas, teatros), recreacion (parques), deporte (polideportivos), seguridad (CAI), servicios (mercados) y administracion.",
    topic: "Equipamientos colectivos"
  },
  {
    id: 3,
    question: "Situacion\n\nLa Alcaldia de Itagui esta desarrollando un proyecto de recuperacion del espacio publico en el centro urbano. El equipo de diseno urbano necesita identificar todos los elementos que legalmente conforman el espacio publico para garantizar una intervencion integral.\n\nPregunta\n\nDe acuerdo con la normativa vigente, ¿que elementos comprende el espacio publico en areas urbanas?",
    options: [
      "Solo parques y jardines",
      "Vias peatonales, andenes, separadores, parques, plazas, plazoletas, zonas verdes, mobiliario urbano y elementos naturales como rios y quebradas",
      "Unicamente zonas privadas",
      "Solo estacionamientos publicos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el proyecto de Itagui debe considerar que el espacio publico incluye: vias y areas peatonales, andenes, separadores viales, parques, plazas, plazoletas, zonas verdes, mobiliario urbano (bancas, luminarias), y elementos naturales del paisaje como cuerpos de agua y zonas de proteccion ambiental.",
    topic: "Espacio publico"
  },
  {
    id: 4,
    question: "Situacion\n\nEl INVIAS esta estructurando un proyecto para mejorar la conectividad vial del departamento de Antioquia. Los ingenieros de la entidad deben clasificar funcionalmente las carreteras existentes para priorizar las intervenciones segun su importancia estrategica.\n\nPregunta\n\nSegun el Manual de Diseno Geometrico del INVIAS, ¿cual es la clasificacion funcional correcta de las carreteras en Colombia?",
    options: [
      "Solo autopistas",
      "Primarias o troncales (conectan principales centros), secundarias o interregionales (conectan cabeceras municipales) y terciarias o veredales (penetracion rural)",
      "Unicamente carreteras pavimentadas",
      "Solo vias de alta velocidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el INVIAS debe aplicar la clasificacion funcional: Primarias o troncales (conectan principales centros de produccion y consumo), secundarias o interregionales (conectan cabeceras municipales), y terciarias o veredales (acceso a veredas y zonas rurales de produccion).",
    topic: "Clasificacion de carreteras"
  },
  {
    id: 5,
    question: "Situacion\n\nLa Gobernacion de Antioquia esta elaborando el Plan Departamental de Infraestructura y requiere categorizar todos los tipos de infraestructura publica existentes en los 125 municipios. El equipo tecnico necesita establecer una clasificacion clara para el diagnostico.\n\nPregunta\n\nTecnicamente, ¿cuales son los diferentes tipos de infraestructura publica que deben considerarse?",
    options: [
      "Solo infraestructura vial",
      "Infraestructura vial (vias, puentes), hidraulica (acueducto, alcantarillado), social (educacion, salud), recreativa (parques, escenarios deportivos) y de servicios (mercados, cementerios)",
      "Unicamente edificaciones",
      "Solo redes electricas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la Gobernacion debe clasificar la infraestructura publica en: vial (vias, puentes, ciclorutas), hidraulica y sanitaria (acueducto, alcantarillado, drenaje), social (equipamientos de educacion, salud), recreativa y deportiva (parques, polideportivos), y de servicios publicos (mercados, plazas de mercado, cementerios).",
    topic: "Tipos de infraestructura"
  },
  // Diseno de infraestructura
  {
    id: 6,
    question: "Situacion\n\nEl municipio de Rionegro contrato una firma de topografia para realizar los estudios previos de un proyecto de construccion de un centro deportivo. El supervisor del contrato debe verificar que los productos entregados cumplan con todos los requisitos tecnicos exigidos.\n\nPregunta\n\nSegun las normas tecnicas, ¿que elementos deben incluir los estudios topograficos para proyectos de infraestructura?",
    options: [
      "Solo mediciones aproximadas",
      "Levantamiento planimetrico y altimetrico, localizacion de redes existentes, linderos, curvas de nivel, perfiles longitudinales y transversales, y georreferenciacion en sistema de coordenadas oficial",
      "Unicamente fotografias del terreno",
      "Solo descripcion escrita del sitio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el supervisor de Rionegro debe verificar que los estudios topograficos incluyan: levantamiento planimetrico (coordenadas X,Y) y altimetrico (cotas Z), localizacion de redes de servicios publicos existentes, linderos y construcciones, curvas de nivel, perfiles longitudinales y transversales del terreno, y georreferenciacion en sistema Magna-Sirgas.",
    topic: "Estudios topograficos"
  },
  {
    id: 7,
    question: "Situacion\n\nLa empresa constructora adjudicataria del proyecto de una nueva institucion educativa en Bello recibio el estudio geotecnico elaborado por el consultor de disenos. El ingeniero residente debe verificar que el estudio contenga toda la informacion necesaria para la cimentacion.\n\nPregunta\n\nTecnicamente, ¿que aspectos debe determinar un estudio geotecnico y de suelos para un proyecto de infraestructura?",
    options: [
      "Solo el color del suelo",
      "Estratigrafia del subsuelo, propiedades mecanicas del suelo (capacidad portante, compresibilidad, expansividad), nivel freatico, recomendaciones de cimentacion y estabilidad de taludes",
      "Unicamente la presencia de rocas",
      "Solo la vegetacion existente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero residente debe verificar que el estudio geotecnico determine: estratigrafia (capas del subsuelo), propiedades fisicas y mecanicas (granulometria, plasticidad, resistencia, compresibilidad, expansividad), capacidad portante, nivel freatico, estabilidad de taludes, y recomendaciones para tipo de cimentacion y movimiento de tierras.",
    topic: "Estudio geotecnico"
  },
  {
    id: 8,
    question: "Situacion\n\nLa Secretaria de Infraestructura de Sabaneta esta revisando los disenos de una nueva via urbana que conectara dos sectores residenciales. El ingeniero revisor debe verificar que el diseno geometrico cumpla con todos los parametros tecnicos requeridos.\n\nPregunta\n\nSegun las normas de diseno vial, ¿que parametros debe considerar el diseno geometrico de una via urbana?",
    options: [
      "Solo el ancho de la calzada",
      "Velocidad de diseno, radio de curvatura horizontal y vertical, peralte, pendientes longitudinales, distancia de visibilidad, ancho de carriles, bermas y obras de drenaje",
      "Unicamente el pavimento a utilizar",
      "Solo el numero de carriles"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero revisor de Sabaneta debe verificar que el diseno geometrico considere: velocidad de diseno, alineamiento horizontal (radios de curvatura, peralte, transiciones), alineamiento vertical (pendientes, curvas verticales), distancia de visibilidad de parada y adelantamiento, seccion transversal (ancho de carriles, bermas, andenes), y obras de drenaje.",
    topic: "Diseno geometrico vial"
  },
  {
    id: 9,
    question: "Situacion\n\nEl interventor de un proyecto de construccion de un puente peatonal en La Estrella esta revisando los documentos tecnicos entregados por el contratista antes del inicio de obra. Debe verificar que las especificaciones tecnicas esten completas.\n\nPregunta\n\nDe acuerdo con la buena practica de ingenieria, ¿que aspectos deben definir las especificaciones tecnicas de un proyecto de infraestructura?",
    options: [
      "Solo el presupuesto del proyecto",
      "Los requisitos de calidad de materiales, procedimientos constructivos, equipos a utilizar, tolerancias dimensionales, controles de calidad y ensayos requeridos para cada actividad",
      "Unicamente el cronograma de obra",
      "Solo el personal necesario"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el interventor de La Estrella debe verificar que las especificaciones tecnicas detallen para cada actividad: requisitos de calidad de materiales (normas ICONTEC, ASTM), procedimientos constructivos paso a paso, equipos y herramientas, tolerancias dimensionales, controles de calidad, ensayos y pruebas requeridos, y criterios de aceptacion.",
    topic: "Especificaciones tecnicas"
  },
  {
    id: 10,
    question: "Situacion\n\nLa oficina de proyectos de Copacabana esta recibiendo los entregables de diseno de un centro de salud municipal. El arquitecto revisor debe verificar que el conjunto de planos este completo segun los terminos de referencia del contrato.\n\nPregunta\n\nSegun los estandares de presentacion de proyectos, ¿que planos deben incluirse en un proyecto de infraestructura?",
    options: [
      "Solo el plano de localizacion",
      "Planos arquitectonicos, estructurales, hidraulicos, sanitarios, electricos, de detalles constructivos, cortes, secciones, especificaciones y notas tecnicas",
      "Unicamente fotografias del sitio",
      "Solo dibujos a mano alzada"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el arquitecto revisor de Copacabana debe verificar que los planos incluyan: localizacion general, arquitectonicos (plantas, fachadas), estructurales (cimentacion, estructura), instalaciones hidraulicas y sanitarias, instalaciones electricas, detalles constructivos ampliados, cortes y secciones, especificaciones tecnicas, notas y convenciones, y cuadro de areas.",
    topic: "Planos del proyecto"
  },
  {
    id: 11,
    question: "Situacion\n\nEl curador urbano de Caldas esta revisando la solicitud de licencia de construccion de un edificio de apartamentos de 8 pisos. Debe verificar que las memorias de calculo estructural contengan toda la informacion requerida por la norma.\n\nPregunta\n\nSegun la NSR-10, ¿que contenido deben tener las memorias de calculo de un proyecto estructural?",
    options: [
      "Solo el resultado final sin justificacion",
      "Criterios de diseno, cargas consideradas (muertas, vivas, sismicas), combinaciones de carga, analisis estructural, diseno de elementos (cimentacion, columnas, vigas, losas), cumplimiento de norma NSR-10",
      "Unicamente el costo de la estructura",
      "Solo listado de materiales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el curador de Caldas debe verificar que las memorias de calculo documenten: criterios y normas de diseno (NSR-10), caracterizacion de materiales, cargas (muertas, vivas, sismo), combinaciones de carga, modelo y analisis estructural, diseno y verificacion de cada elemento (cimentacion, columnas, vigas, muros, losas, conexiones), y cumplimiento de requisitos normativos.",
    topic: "Memorias de calculo"
  },
  {
    id: 12,
    question: "Situacion\n\nLa Secretaria de Obras Publicas de Barbosa esta estructurando un proyecto de pavimentacion de una via rural. El ingeniero disenador necesita definir la metodologia y los insumos requeridos para el diseno del pavimento flexible.\n\nPregunta\n\nTecnicamente, ¿que elementos se requieren para el diseno de un pavimento flexible de una via?",
    options: [
      "Solo estimar espesores al azar",
      "Estudio de transito (numero de ejes equivalentes), caracterizacion de subrasante (CBR), diseno de estructura de pavimento (subbase, base, rodadura) segun metodo AASHTO o INVIAS, y drenaje",
      "Unicamente colocar concreto asfaltico",
      "Solo nivelar el terreno"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero disenador de Barbosa debe realizar: estudio de transito para determinar ejes equivalentes (ESAL), caracterizacion de subrasante mediante ensayo CBR, diseno de estructura (espesores de subbase, base granular, capa asfaltica) segun metodologia AASHTO o Manual INVIAS, y diseno de obras de drenaje.",
    topic: "Diseno de pavimento"
  },
  {
    id: 13,
    question: "Situacion\n\nLa autoridad ambiental CORANTIOQUIA esta evaluando la solicitud de licencia ambiental para un proyecto de construccion de una via terciaria en zona rural de Girardota. El evaluador debe verificar que el estudio de impacto ambiental este completo.\n\nPregunta\n\nSegun la normativa ambiental, ¿que componentes deben incluir los estudios de impacto ambiental de proyectos de infraestructura?",
    options: [
      "Solo una carta de intencion",
      "Linea base ambiental, identificacion y evaluacion de impactos, Plan de Manejo Ambiental (PMA), Plan de Gestion Social (PGS), y Plan de Compensacion y Restauracion",
      "Unicamente permisos basicos",
      "Solo listado de arboles a talar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el evaluador de CORANTIOQUIA debe verificar que el estudio de impacto ambiental incluya: linea base (medio fisico, biotico, social), identificacion y evaluacion de impactos (matrices, metodologia), Plan de Manejo Ambiental (prevencion, mitigacion, correccion, compensacion), Plan de Gestion Social, permisos ambientales requeridos y plan de seguimiento.",
    topic: "Impacto ambiental de infraestructura"
  },
  // Normas tecnicas
  {
    id: 14,
    question: "Situacion\n\nUn ingeniero estructural recien graduado ingreso a trabajar en una firma de diseno en Medellin. Su jefe le asigno el diseno de una edificacion y le solicito estudiar la NSR-10 para entender el alcance de esta norma en el diseno.\n\nPregunta\n\nSegun la legislacion colombiana, ¿que aspectos regula la NSR-10 (Reglamento Colombiano de Construccion Sismo Resistente)?",
    options: [
      "Solo edificios de gran altura",
      "Diseno y construccion sismo resistente de edificaciones, incluyendo cargas, analisis estructural, diseno de elementos, supervision tecnica y requisitos de calidad de materiales",
      "Unicamente obras hidraulicas",
      "Solo puentes vehiculares"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero debe comprender que la NSR-10 (Ley 400 de 1997, Decreto 926 de 2010) regula el diseno y construccion sismo resistente de edificaciones nuevas en Colombia, estableciendo: requisitos de estudios de suelos, analisis y diseno estructural, calidad de materiales, supervision tecnica, y aspectos arquitectonicos y de instalaciones.",
    topic: "NSR-10"
  },
  {
    id: 15,
    question: "Situacion\n\nUna estudiante de ingenieria civil en practicas en la Alcaldia de Bello debe apoyar la revision de proyectos estructurales. Su supervisor le solicita que se familiarice con la estructura completa de la NSR-10 para entender como esta organizada la norma.\n\nPregunta\n\nEn terminos de organizacion, ¿cuales son los Titulos que conforman la NSR-10?",
    options: [
      "Solo diseno de concreto",
      "Titulo A (requisitos generales), B (cargas), C (concreto), D (mamposteria), E (casas de uno y dos pisos), F (estructuras metalicas), G (madera), H (estudios geotecnicos), I (cubiertas), J (requisitos de proteccion contra incendios), K (requisitos complementarios)",
      "Unicamente normas de acero",
      "Solo especificaciones de acabados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la estudiante debe conocer que la NSR-10 comprende: Titulo A (requisitos generales, licencias, supervision), B (cargas), C (concreto reforzado), D (mamposteria estructural), E (casas de uno y dos pisos), F (estructuras metalicas), G (madera), H (estudios geotecnicos, cimentaciones), I (cubiertas), J (proteccion contra incendios), K (complementarios).",
    topic: "Estructura NSR-10"
  },
  {
    id: 16,
    question: "Situacion\n\nEl INVIAS contrato a una firma consultora para el diseno de una carretera secundaria en el oriente antioqueno. El ingeniero lider del proyecto debe aplicar los criterios del Manual de Diseno Geometrico de Carreteras para garantizar un diseno seguro.\n\nPregunta\n\nSegun el Manual de Diseno Geometrico de Carreteras del INVIAS, ¿que criterios establece esta norma?",
    options: [
      "Solo el color de senalizacion",
      "Clasificacion de carreteras, velocidad de diseno, alineamiento horizontal y vertical, seccion transversal, distancias de visibilidad, intersecciones y obras de drenaje",
      "Unicamente el paisajismo vial",
      "Solo tarifas de peajes"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero lider debe aplicar los criterios del Manual INVIAS que define: clasificacion funcional de vias, velocidades de diseno segun categoria, diseno de alineamiento horizontal (radios, peralte, transicion), alineamiento vertical (pendientes, curvas), seccion transversal (carriles, bermas, cunetas), visibilidad, intersecciones y drenaje vial.",
    topic: "Manual INVIAS"
  },
  {
    id: 17,
    question: "Situacion\n\nLa Secretaria de Inclusion Social de Medellin esta disenando un nuevo centro de atencion integral para poblacion con discapacidad. El arquitecto del proyecto debe garantizar que el diseno cumpla con todos los requisitos de accesibilidad universal.\n\nPregunta\n\nSegun la Resolucion 0549 de 2015 del MinVivienda, ¿que parametros establece esta norma para accesibilidad?",
    options: [
      "Solo rampas de acceso",
      "Accesibilidad universal en edificaciones y espacios urbanos para personas con movilidad reducida: rampas, pasamanos, banos accesibles, senalizacion, circulaciones y mobiliario urbano",
      "Unicamente ascensores",
      "Solo estacionamientos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el arquitecto debe aplicar la Resolucion 0549/2015 que regula la accesibilidad universal estableciendo parametros tecnicos para: rampas (pendientes, descansos), pasamanos, puertas, banos accesibles, ascensores, rutas accesibles, circulaciones, senalizacion tactil y visual, y mobiliario urbano accesible en edificaciones y espacio publico.",
    topic: "Accesibilidad - Resolucion 0549"
  },
  {
    id: 18,
    question: "Situacion\n\nEl disenador de un proyecto de remodelacion de la alcaldia de Girardota debe incluir una rampa de acceso que salve un desnivel de 1.20 metros entre el nivel de la calle y el acceso principal del edificio. Necesita calcular la pendiente maxima permitida.\n\nPregunta\n\nSegun la Resolucion 0549/2015, ¿cuales son las pendientes maximas permitidas en rampas de acceso segun el desnivel a salvar?",
    options: [
      "30% sin restriccion",
      "Hasta 12% para desniveles hasta 15cm; hasta 10% para desniveles entre 15cm y 75cm; hasta 8% para desniveles entre 75cm y 150cm; y hasta 6% para desniveles mayores",
      "Solo 5% sin importar desnivel",
      "20% en todos los casos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, para el desnivel de 1.20m (entre 75cm y 150cm), el disenador debe aplicar una pendiente maxima del 8%. La Resolucion 0549 establece pendientes maximas segun desnivel: hasta 12% (≤15cm), hasta 10% (15-75cm), hasta 8% (75-150cm), y hasta 6% (>150cm). Ademas requiere descansos cada 9 metros y pasamanos continuos.",
    topic: "Pendientes en rampas"
  },
  {
    id: 19,
    question: "Situacion\n\nEl interventor de un proyecto de construccion de una via terciaria en Amaga debe verificar que el contratista cumpla con todas las especificaciones tecnicas del INVIAS. Necesita conocer el alcance de estas especificaciones para su labor de control.\n\nPregunta\n\nSegun las especificaciones generales de construccion de carreteras del INVIAS, ¿que aspectos regulan estas especificaciones?",
    options: [
      "Solo el transporte de materiales",
      "Movimiento de tierras, obras de drenaje, pavimentos (subbases, bases, carpetas asfalticas, concreto), puentes, senalizacion, seguridad vial y proteccion ambiental",
      "Unicamente pintura de senalizacion",
      "Solo cerramientos temporales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el interventor de Amaga debe verificar el cumplimiento de las Especificaciones INVIAS que definen requisitos para: movimiento de tierras (excavacion, terraplenes, compactacion), obras de drenaje (alcantarillas, cunetas, filtros), pavimentos (subbases, bases, mezclas asfalticas, concreto hidraulico), estructuras (puentes), senalizacion, seguridad vial, proteccion ambiental, y ensayos de control de calidad.",
    topic: "Especificaciones INVIAS"
  },
  {
    id: 20,
    question: "Situacion\n\nEl laboratorio de materiales contratado para el control de calidad de un proyecto de construccion en Marinilla debe realizar ensayos segun normas ICONTEC. El director del laboratorio necesita explicar al contratista el alcance de estas normas.\n\nPregunta\n\nEn el contexto de la construccion, ¿que aspectos regulan las normas tecnicas ICONTEC?",
    options: [
      "Solo exportaciones",
      "Requisitos de calidad, especificaciones tecnicas, metodos de ensayo y certificacion para materiales de construccion, productos, procesos y servicios utilizados en infraestructura",
      "Unicamente importaciones",
      "Solo diseno grafico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el director del laboratorio de Marinilla debe explicar que las NTC (Normas Tecnicas Colombianas) establecen: requisitos de calidad y especificaciones para materiales de construccion (cemento, acero, agregados), metodos de ensayo y muestreo, procedimientos de certificacion, y requisitos para productos, procesos y servicios. Son referencia en contratos y especificaciones tecnicas.",
    topic: "Normas ICONTEC"
  },
  // Presupuestos de obra
  {
    id: 21,
    question: "Situacion\n\nEl area de presupuestos de una firma constructora de Medellin esta elaborando la propuesta economica para una licitacion de construccion de un parque. El ingeniero de costos debe estructurar los Analisis de Precios Unitarios (APU) de cada actividad.\n\nPregunta\n\nTecnicamente, ¿que componentes debe incluir un Analisis de Precios Unitarios (APU) de una actividad de construccion?",
    options: [
      "Solo el costo total sin detallar",
      "Costos de materiales (cantidades y precios), mano de obra (rendimientos y salarios), equipos y herramientas (rendimientos y tarifas), transporte, y porcentajes de administracion, imprevistos y utilidad",
      "Unicamente el precio de venta",
      "Solo el costo de materiales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero de costos debe elaborar APUs que desglose todos los costos directos e indirectos de una unidad de obra: materiales (cantidades, desperdicios, precios), mano de obra (cuadrilla, rendimiento, salarios, prestaciones), equipos (rendimiento, tarifas), transporte, mas porcentajes de administracion, imprevistos y utilidad. Se expresa en $/unidad (m3, m2, ml, UN).",
    topic: "Analisis de Precios Unitarios (APU)"
  },
  {
    id: 22,
    question: "Situacion\n\nEl presupuestista de un proyecto de ampliacion de una institucion educativa en Caucasia debe calcular las cantidades de obra a partir de los planos entregados por el disenador. El supervisor le solicita que documente claramente la metodologia de calculo.\n\nPregunta\n\nSegun la practica profesional, ¿a partir de que documentos y como se calculan las cantidades de obra de un presupuesto?",
    options: [
      "Estimaciones sin sustento tecnico",
      "Los planos y especificaciones tecnicas del proyecto, mediante levantamiento o cuantificacion detallada de cada actividad (volumenes, areas, longitudes, unidades)",
      "Solo experiencia en proyectos anteriores",
      "Unicamente el presupuesto disponible"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el presupuestista de Caucasia debe cuantificar rigurosamente las cantidades de obra a partir de los planos (plantas, cortes, detalles) y especificaciones tecnicas del proyecto, calculando volumenes de excavacion, areas de pavimento, longitudes de tuberia, unidades de elementos, considerando desperdicios normales. Cada cantidad debe sustentarse con memorias de calculo.",
    topic: "Cantidades de obra"
  },
  {
    id: 23,
    question: "Situacion\n\nLa oficina de planeacion financiera del municipio de Turbo necesita programar los desembolsos para un proyecto de construccion de un centro de acopio. El contratista debe entregar un cronograma valorado que permita esta programacion.\n\nPregunta\n\nTecnicamente, ¿que informacion relaciona un cronograma valorado de un proyecto?",
    options: [
      "Solo fechas de actividades",
      "El cronograma de ejecucion de actividades con los costos asociados a cada periodo (mensual o semanal), permitiendo la programacion de flujo de caja del proyecto",
      "Unicamente los recursos humanos",
      "Solo el costo total final"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el cronograma valorado que debe entregar el contratista integra la programacion temporal de actividades con sus costos, indicando cuanto se debe invertir en cada periodo (semana o mes). Permite: programar flujo de caja, establecer cronograma de desembolsos, determinar avance financiero esperado, y controlar la ejecucion presupuestal del proyecto.",
    topic: "Cronograma valorado"
  },
  {
    id: 24,
    question: "Situacion\n\nUn contrato de obra publica para la construccion de un centro de salud en Apartado tiene una duracion de 18 meses. Debido al largo plazo, el contrato incluye formulas de reajuste de precios. El contratista necesita entender como funcionan estos ajustes.\n\nPregunta\n\nEn contratos de obra publica, ¿cual es el proposito de las formulas de reajuste de precios?",
    options: [
      "Modificar arbitrariamente los precios",
      "Ajustar el valor del contrato cuando varian los costos de insumos (materiales, mano de obra, equipos) durante la ejecucion, segun indices oficiales (DANE, Banco de la Republica)",
      "Solo incrementar las utilidades del contratista",
      "Unicamente reducir el valor del contrato"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, las formulas de reajuste (polinomicas o monomiales) permiten ajustar el valor del contrato de Apartado cuando varian los indices de precios de insumos durante la ejecucion, protegiendo el equilibrio economico. Utilizan indices oficiales del DANE o Banco de la Republica para materiales, mano de obra y equipos, segun participacion porcentual en el presupuesto.",
    topic: "Formulas de reajuste"
  },
  {
    id: 25,
    question: "Situacion\n\nLa Secretaria de Hacienda de Nechi esta estructurando el presupuesto para un proyecto de construccion de vivienda de interes social. El secretario necesita conocer todos los componentes que debe incluir el presupuesto oficial del proyecto.\n\nPregunta\n\nSegun la normativa de inversion publica, ¿que componentes debe incluir el presupuesto oficial de un proyecto de inversion publica?",
    options: [
      "Solo el costo de construccion",
      "Estudios y disenos, adquisicion de predios, construccion, interventoria, gestion ambiental, gestion social, gestion predial, imprevistos, y costos indirectos de la entidad",
      "Unicamente materiales y mano de obra",
      "Solo el valor del contrato principal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el presupuesto oficial que debe estructurar Nechi incluye: estudios y disenos previos, adquisicion de predios y servidumbres, construccion u obra fisica, interventoria o supervision, gestion ambiental (permisos, PMA), gestion social (socializacion, reasentamientos), gestion predial, imprevistos (tipicamente 5-10%), y costos indirectos de la entidad contratante.",
    topic: "Presupuesto oficial del proyecto"
  }
]

const questionsV2: Question[] = [
  // Clasificacion de infraestructura
  {
    id: 1,
    question: "Situacion\n\nLa Secretaria de Planeacion de Envigado esta revisando las especificaciones de diseno de los andenes en un proyecto de renovacion urbana del centro. El arquitecto urbanista debe verificar que los disenos cumplan con los requisitos minimos de accesibilidad y funcionalidad.\n\nPregunta\n\nSegun la normativa de espacio publico, ¿que caracteristicas deben tener los andenes peatonales en zonas urbanas?",
    options: [
      "Cualquier ancho sin restriccion",
      "Ancho minimo de 1.20m en zonas residenciales y 2.00m en zonas comerciales, superficie antideslizante, pendiente transversal maxima 2%, y estar libres de obstaculos",
      "Solo 50cm de ancho",
      "Unicamente grama sin pavimento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el arquitecto urbanista de Envigado debe verificar que los andenes tengan ancho minimo de 1.20m libre de obstaculos (zona residencial) o 2.00m (zona comercial), superficie firme, estable y antideslizante, pendiente transversal maxima 2% para drenaje, sin escalones ni resaltos, y franja tactil guia para personas con discapacidad visual.",
    topic: "Diseno de andenes"
  },
  {
    id: 2,
    question: "Situacion\n\nEl Area Metropolitana del Valle de Aburra esta disenando una red de ciclorutas que conectara varios municipios. El equipo tecnico debe establecer los parametros de diseno para garantizar la seguridad y funcionalidad de la infraestructura ciclista.\n\nPregunta\n\nSegun las normas tecnicas, ¿con que parametros deben disenarse las ciclorutas o infraestructura para bicicletas?",
    options: [
      "Solo pintura en la via vehicular",
      "Ancho minimo de 1.20m por sentido, separacion fisica o visual de vehiculos motorizados, pendientes controladas, radios de curvatura adecuados, senalizacion especifica y conexion con red de transporte",
      "Unicamente senalizacion vertical",
      "Solo en vias de baja velocidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el Area Metropolitana debe disenar las ciclorutas con: ancho minimo 1.20m unidireccional o 2.50m bidireccional, separacion de trafico motorizado (fisica o demarcacion), pendientes maximas 6-8%, radios de curvatura minimos, pavimento antideslizante, senalizacion horizontal y vertical especifica, iluminacion, y conexion con sistema de transporte publico.",
    topic: "Diseno de ciclorutas"
  },
  {
    id: 3,
    question: "Situacion\n\nEl laboratorio de suelos contratado para un proyecto vial en Uraba entrego los resultados de los ensayos CBR de la subrasante. El ingeniero disenador del pavimento debe interpretar estos resultados para clasificar la calidad del suelo de fundacion.\n\nPregunta\n\nSegun la clasificacion tecnica, ¿como se clasifica el suelo segun su capacidad portante (CBR)?",
    options: [
      "Solo suelo bueno o malo",
      "Inadecuado (CBR<3%), pobre (3%≤CBR<5%), regular (5%≤CBR<10%), bueno (10%≤CBR<20%), muy bueno (20%≤CBR<30%), excelente (CBR≥30%)",
      "Unicamente suelo duro o blando",
      "Solo arcilla o arena"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero disenador debe interpretar los resultados CBR segun la clasificacion tecnica: Inadecuado (CBR<3%), Pobre (3-5%), Regular (5-10%), Bueno (10-20%), Muy bueno (20-30%), Excelente (≥30%). El CBR es fundamental para diseno de pavimentos y determina el espesor de las capas estructurales.",
    topic: "Clasificacion de suelos por CBR"
  },
  {
    id: 4,
    question: "Situacion\n\nUna firma de diseno estructural de Medellin esta elaborando los calculos de un puente vehicular de dos carriles sobre el rio Porce. El ingeniero calculista debe definir las cargas vivas de diseno segun la normativa colombiana.\n\nPregunta\n\nSegun la NSR-10 y el CCP-14, ¿cual es la carga viva vehicular de diseno para puentes en Colombia?",
    options: [
      "Solo vehiculos livianos",
      "Camion C40-95 o HS20-44 y sistema de cargas alternativo (carril mas tandem), considerando factor de carga y reduccion por numero de carriles",
      "Unicamente motos y bicicletas",
      "Solo buses urbanos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero calculista debe utilizar para el diseno del puente: Camion de diseno C40-95 (equivalente HS20-44), Sistema alternativo de carga (carril uniforme + tandem), con factores de carga segun LRFD y reduccion por multiples carriles cargados. Se considera tambien carga peatonal, sismica, viento, temperatura y fuerzas de frenado.",
    topic: "Cargas de diseno en puentes"
  },
  {
    id: 5,
    question: "Situacion\n\nLa Secretaria de Medio Ambiente de Bello esta elaborando el inventario de espacio publico del municipio. El equipo tecnico debe identificar cuales elementos naturales forman parte del espacio publico y requieren proteccion especial.\n\nPregunta\n\nSegun la normativa urbanistica, ¿cuales son los elementos constitutivos naturales del espacio publico?",
    options: [
      "Solo construcciones urbanas",
      "Areas de proteccion de rios, quebradas, nacimientos de agua, humedales, zonas de reserva forestal, parques naturales y elementos del paisaje natural",
      "Unicamente andenes y calles",
      "Solo monumentos historicos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el equipo tecnico de Bello debe identificar que los elementos naturales del espacio publico comprenden: areas de proteccion y rondas de rios, quebradas y cuerpos de agua, zonas de nacimientos de agua, humedales, zonas de reserva forestal protectora, parques naturales, cerros tutelares y elementos naturales del paisaje que hacen parte del patrimonio ambiental.",
    topic: "Elementos naturales del espacio publico"
  },
  // Diseno de infraestructura
  {
    id: 6,
    question: "Situacion\n\nEl disenador vial de un proyecto de construccion de una carretera en el suroeste antioqueno esta definiendo el peralte de las curvas horizontales. El ingeniero revisor del municipio le solicita justificar tecnicamente la funcion de este elemento.\n\nPregunta\n\nDesde el punto de vista tecnico, ¿para que sirve el peralte en curvas horizontales de una via?",
    options: [
      "Solo estetica vial",
      "Contrarrestar la fuerza centrifuga que actua sobre los vehiculos en curvas, mejorando la seguridad y comodidad, mediante inclinacion transversal de la calzada",
      "Unicamente drenar agua lluvia",
      "Solo senalizacion de curvas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el disenador debe justificar que el peralte es la inclinacion transversal de la calzada en curvas horizontales que contrarresta la fuerza centrifuga, permitiendo que los vehiculos circulen con seguridad a la velocidad de diseno. Se calcula segun radio de curvatura y velocidad. Los valores tipicos varian entre 2% (minimo) y 8-10% (maximo en zonas urbanas).",
    topic: "Peralte en curvas"
  },
  {
    id: 7,
    question: "Situacion\n\nEl interventor de un proyecto vial en el nordeste antioqueno esta verificando los calculos de visibilidad del diseno geometrico. Necesita confirmar que el disenador haya calculado correctamente la distancia de visibilidad de parada en todos los tramos.\n\nPregunta\n\nTecnicamente, ¿que es la distancia de visibilidad de parada en una via?",
    options: [
      "Cualquier distancia al azar",
      "La longitud de via requerida para que un conductor pueda detener su vehiculo antes de alcanzar un obstaculo visible, considerando tiempo de reaccion y distancia de frenado",
      "Solo 10 metros en todos los casos",
      "Unicamente la distancia entre senales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el interventor debe verificar que la distancia de visibilidad de parada calculada sea la suma de: distancia recorrida durante el tiempo de percepcion-reaccion del conductor (tipicamente 2.5 segundos), mas la distancia de frenado considerando la velocidad de diseno, pendiente y coeficiente de friccion. Es fundamental para el diseno seguro de alineamientos horizontal y vertical.",
    topic: "Distancia de visibilidad"
  },
  {
    id: 8,
    question: "Situacion\n\nEl constructor de una via urbana en Itagui esta ejecutando la conformacion de la subrasante antes de colocar las capas de pavimento. El residente de obra le consulta al interventor sobre el valor del bombeo que debe aplicar en los tramos rectos.\n\nPregunta\n\nTecnicamente, ¿que es el bombeo de una via en tramos rectos y cual es su funcion?",
    options: [
      "La profundidad de excavacion",
      "La inclinacion transversal de la calzada desde el eje hacia los bordes para evacuar el agua lluvia, tipicamente entre 1.5% y 2.5%",
      "Solo el ancho de la via",
      "Unicamente la pendiente longitudinal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el interventor debe indicar al constructor que el bombeo es la inclinacion transversal de la calzada en tramos rectos que facilita el drenaje superficial del agua lluvia desde el centro hacia las cunetas laterales. Los valores tipicos son: 1.5-2% para pavimentos asfalticos o concreto, 2-3% para pavimentos en adoquin o grava.",
    topic: "Bombeo de vias"
  },
  {
    id: 9,
    question: "Situacion\n\nEl disenador de una carretera secundaria en el oriente antioqueno esta definiendo la seccion transversal tipica de la via. El coordinador del proyecto le solicita justificar la inclusion y el ancho de las bermas en el diseno.\n\nPregunta\n\nTecnicamente, ¿que son las bermas o espaldones de una carretera y cual es su funcion?",
    options: [
      "Solo vegetacion lateral",
      "Franjas longitudinales contiguas a la calzada, de ancho variable segun categoria de via, que sirven como zona de escape, soporte lateral del pavimento y zona de trabajo en mantenimiento",
      "Unicamente senalizacion vertical",
      "Solo cunetas de drenaje"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el disenador debe justificar que las bermas son franjas longitudinales paralelas a la calzada que proporcionan: zona de escape para vehiculos en emergencia, soporte lateral para la estructura del pavimento, espacio para maniobras de mantenimiento, ubicacion de senalizacion, y mejora en seguridad vial. El ancho varia entre 0.50m y 3.00m segun categoria de via.",
    topic: "Bermas en carreteras"
  },
  {
    id: 10,
    question: "Situacion\n\nEl ingeniero disenador de un proyecto de pavimento rigido para una via urbana en Rionegro debe especificar la resistencia del concreto. El laboratorio le solicita confirmar si requiere especificacion por resistencia a compresion (f'c) o por modulo de rotura (Mr).\n\nPregunta\n\nTecnicamente, ¿para que se utiliza el modulo de rotura del concreto (Mr) en infraestructura vial?",
    options: [
      "Solo estimar costos",
      "Disenar pavimentos rigidos de concreto hidraulico, expresado en MPa, y representa la resistencia a la flexion del concreto",
      "Unicamente calcular tiempos de fraguado",
      "Solo dosificar mezclas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero debe especificar el Modulo de Rotura (Mr) que es la resistencia a la flexion del concreto utilizada en diseno de pavimentos rigidos, expresada en MPa. Valores tipicos: 3.8-4.5 MPa para vias de bajo trafico, 4.0-4.5 MPa para trafico medio, 4.5-5.0 MPa para trafico alto. Se determina mediante ensayo de viga simple a los 28 dias.",
    topic: "Modulo de rotura del concreto"
  },
  {
    id: 11,
    question: "Situacion\n\nEl contratista de un proyecto de pavimentacion rigida en La Ceja esta consultando con el interventor sobre la ubicacion y tipo de juntas que debe construir en el pavimento. El interventor debe explicar la funcion tecnica de estas juntas.\n\nPregunta\n\nTecnicamente, ¿para que sirven las juntas de construccion en pavimentos de concreto?",
    options: [
      "Solo decoracion",
      "Controlar el agrietamiento por retraccion del concreto, permitir movimientos termicos, delimitar areas de vaciado y facilitar el proceso constructivo",
      "Unicamente separar colores",
      "Solo ahorrar material"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el interventor debe explicar que las juntas en pavimentos rigidos son: Juntas transversales de contraccion (controlan fisuras, cada 3-5m), juntas longitudinales (entre carriles), juntas de construccion (limite de jornadas de vaciado), y juntas de expansion (permiten dilatacion termica). Requieren sellado y diseno de transferencia de carga con pasajuntas o dovelas.",
    topic: "Juntas en pavimentos de concreto"
  },
  {
    id: 12,
    question: "Situacion\n\nEl laboratorio de suelos contratado para el control de calidad de un terraplen vial en Puerto Berrio debe realizar ensayos Proctor para establecer los parametros de compactacion. El ingeniero residente necesita entender que informacion proporcionan estos ensayos.\n\nPregunta\n\nTecnicamente, ¿que parametros determina el ensayo Proctor de compactacion de suelos?",
    options: [
      "Solo el color del suelo",
      "La densidad seca maxima que puede alcanzar un suelo y la humedad optima de compactacion, fundamentales para el control de calidad de terraplenes y capas de pavimento",
      "Unicamente la granulometria",
      "Solo la plasticidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero residente debe entender que el ensayo Proctor (estandar o modificado) determina: la densidad seca maxima (gd max) que puede alcanzar el suelo y el contenido de humedad optimo (w opt) para lograrla. Es fundamental para: especificar grados de compactacion (90%, 95%, 100% del Proctor), controlar calidad de terraplenes, subbases y bases granulares.",
    topic: "Ensayo Proctor"
  },
  {
    id: 13,
    question: "Situacion\n\nLa Secretaria de Transito de Medellin contrato el diseno de una interseccion vial compleja en el sector de Laureles. El ingeniero de transito debe presentar los criterios tecnicos que utilizara para el diseno de la interseccion.\n\nPregunta\n\nSegun las normas de diseno vial, ¿que aspectos debe considerar el diseno de intersecciones viales?",
    options: [
      "Solo semaforos",
      "Volumenes de trafico, movimientos vehiculares (giros), carriles de aceleracion y desaceleracion, radios de giro, visibilidad, senalizacion, semaforizacion y seguridad de peatones y ciclistas",
      "Unicamente estetica urbana",
      "Solo estacionamientos cercanos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero de transito debe considerar: analisis de volumenes y capacidad, geometria de movimientos (directos, giros), carriles de aceleracion/desaceleracion, radios de giro segun vehiculo de diseno, distancias de visibilidad (triangulo de visibilidad), senalizacion horizontal y vertical, semaforizacion (si aplica), y diseno de pasos peatonales y cruces ciclistas seguros.",
    topic: "Diseno de intersecciones"
  },
  // Normas tecnicas
  {
    id: 14,
    question: "Situacion\n\nEl ingeniero estructural de una firma de diseno de Medellin debe calcular las fuerzas sismicas de diseno para un edificio de oficinas de 12 pisos. Necesita determinar el espectro de diseno sismico aplicable segun la ubicacion y caracteristicas del proyecto.\n\nPregunta\n\nSegun la NSR-10, ¿de que factores depende el espectro de diseno sismico?",
    options: [
      "Solo el area de construccion",
      "La zona de amenaza sismica, el tipo de suelo de fundacion, el grupo de uso de la edificacion y el sistema estructural empleado",
      "Unicamente el presupuesto disponible",
      "Solo la altura de la edificacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero estructural debe definir el espectro de diseno sismico segun: zona de amenaza sismica (baja, intermedia, alta), perfil de suelo (A a F segun rigidez), grupo de uso (I a IV segun importancia), y coeficientes de modificacion de respuesta (R) segun sistema estructural. Determina las fuerzas sismicas de diseno.",
    topic: "Espectro de diseno sismico"
  },
  {
    id: 15,
    question: "Situacion\n\nEl interventor de un proyecto de construccion de un edificio en Sabaneta esta verificando los planos de despiece de refuerzo. Debe confirmar que los recubrimientos especificados cumplan con la NSR-10 para los elementos expuestos a la intemperie.\n\nPregunta\n\nSegun la NSR-10, ¿cuales son los recubrimientos minimos de concreto sobre refuerzo en elementos expuestos a la intemperie?",
    options: [
      "5mm en todos los casos",
      "Para barras #5 y menores: 40mm; para barras #6 y mayores: 50mm; en elementos en contacto con suelo: 75mm",
      "Solo 10mm sin importar condiciones",
      "100mm en todos los elementos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el interventor de Sabaneta debe verificar que los recubrimientos cumplan con la NSR-10 segun exposicion: Concreto en contacto con suelo: 75mm; Expuesto a intemperie: 40mm (barras ≤#5) o 50mm (barras ≥#6); Interior no expuesto: 40mm (vigas, columnas), 20mm (losas). Garantiza proteccion contra corrosion y adherencia.",
    topic: "Recubrimientos en concreto reforzado"
  },
  {
    id: 16,
    question: "Situacion\n\nEl ingeniero consultor contratado para el diseno de una carretera terciaria en el Bajo Cauca antioqueno debe seleccionar la velocidad de diseno apropiada. El terreno es montanoso y el trafico proyectado es bajo.\n\nPregunta\n\nSegun el Manual INVIAS, ¿que factores se deben considerar para seleccionar la velocidad de diseno en carreteras?",
    options: [
      "Solo el deseo del disenador",
      "La categoria funcional de la via, topografia del terreno (plano, ondulado, montanoso), volumen de trafico proyectado y costos de construccion",
      "Unicamente el limite de velocidad urbano",
      "Solo la potencia de los vehiculos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero consultor debe seleccionar la velocidad de diseno segun: categoria de via (primaria: 80-110 km/h, secundaria: 60-80 km/h, terciaria: 30-60 km/h), topografia (plana, ondulada, montanosa, escarpada), TPD (trafico promedio diario), restricciones economicas. Determina todos los elementos geometricos: radios, peraltes, visibilidad.",
    topic: "Velocidad de diseno de carreteras"
  },
  {
    id: 17,
    question: "Situacion\n\nEl arquitecto de un proyecto de construccion de una terminal de transporte en Rionegro debe disenar los banos publicos accesibles. Necesita conocer todos los requisitos tecnicos que establece la norma de accesibilidad.\n\nPregunta\n\nSegun la Resolucion 0549, ¿cuales son los requisitos de accesibilidad para banos publicos?",
    options: [
      "Solo mayor tamano",
      "Dimensiones minimas (1.50m x 1.70m), area de maniobra para silla de ruedas, sanitario con barras de apoyo, lavamanos accesible sin pedestal, griferia de palanca, espejo inclinado y senalizacion",
      "Unicamente una rampa exterior",
      "Solo sanitario especial sin otros requisitos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el arquitecto debe disenar los banos accesibles con: dimensiones minimas 1.50m x 1.70m libres, puerta minimo 0.90m que abre hacia afuera, area de transferencia lateral al sanitario (0.90m), barras de apoyo abatibles (0.75-0.80m altura), lavamanos sin pedestal (altura 0.80-0.85m), griferia de palanca o sensor, espejo inclinado desde 0.90m, senalizacion con simbolo internacional.",
    topic: "Banos accesibles"
  },
  {
    id: 18,
    question: "Situacion\n\nEl disenador de un centro comercial en Medellin debe definir las dimensiones y caracteristicas del estacionamiento vehicular del proyecto. Necesita aplicar la norma tecnica colombiana correspondiente para garantizar el cumplimiento normativo.\n\nPregunta\n\nSegun la NTC 4595 sobre instalaciones de estacionamientos, ¿que aspectos regula esta norma?",
    options: [
      "Solo el numero de parqueaderos requeridos",
      "Dimensiones minimas de espacios de parqueo (tipo de vehiculo), anchos de circulacion, rampas, radios de giro, estacionamientos accesibles, senalizacion y ventilacion",
      "Unicamente tarifas de cobro",
      "Solo iluminacion de parqueaderos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el disenador debe aplicar la NTC 4595 que define: dimensiones minimas de espacios (2.30-2.50m x 4.50-5.00m segun tipo), anchos de circulacion (3.00-6.50m), pendientes de rampas (max 15%), radios de giro, estacionamientos accesibles (5% del total, minimo 1), senalizacion horizontal y vertical, iluminacion, ventilacion mecanica si aplica.",
    topic: "NTC 4595 - Parqueaderos"
  },
  {
    id: 19,
    question: "Situacion\n\nEl laboratorio de pavimentos contratado para el control de calidad de una via en el oriente antioqueno debe realizar ensayos Marshall a las mezclas asfalticas producidas en planta. El ingeniero de pavimentos necesita entender que parametros determina este ensayo.\n\nPregunta\n\nTecnicamente, ¿que parametros determina el ensayo Marshall para mezclas asfalticas?",
    options: [
      "Solo el color del asfalto",
      "El contenido optimo de asfalto de la mezcla, estabilidad (resistencia a la deformacion), flujo, porcentaje de vacios y propiedades volumetricas",
      "Unicamente la temperatura de aplicacion",
      "Solo el costo del pavimento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero de pavimentos debe entender que el ensayo Marshall determina: contenido optimo de cemento asfaltico (%), estabilidad (resistencia a la deformacion en kN), flujo o deformacion (mm), porcentaje de vacios con aire (VCA), vacios del agregado mineral (VAM), vacios llenos de asfalto (VFA). Asegura desempeno adecuado del pavimento asfaltico.",
    topic: "Ensayo Marshall"
  },
  {
    id: 20,
    question: "Situacion\n\nEl contratista de un proyecto vial en el suroeste antioqueno debe instalar la senalizacion vial segun el Manual de Senalizacion Vial del MinTransporte. El ingeniero residente necesita conocer los tipos de senalizacion que debe implementar.\n\nPregunta\n\nSegun el Manual de Senalizacion Vial del MinTransporte, ¿que tipos de senalizacion comprende la senalizacion vial?",
    options: [
      "Solo semaforos",
      "Senales verticales (reglamentarias, preventivas, informativas), senalizacion horizontal (demarcacion), senales transitorias (obras), y dispositivos de seguridad (delineadores, tachas, barreras)",
      "Unicamente pintura amarilla",
      "Solo senales de pare"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero residente debe implementar segun el Manual: Verticales (reglamentarias-orden, preventivas-advertencia, informativas-orientacion), Horizontales (lineas, simbolos, letras, tachas reflectivas), Transitorias (obras en la via), y Dispositivos de seguridad (delineadores, barreras, reductores de velocidad). Cada tipo tiene especificaciones de forma, color, tamano, ubicacion y retroreflectividad.",
    topic: "Senalizacion vial"
  },
  // Presupuestos de obra
  {
    id: 21,
    question: "Situacion\n\nEl ingeniero de costos de una constructora de Medellin esta elaborando los APU para un proyecto de construccion de un colegio. Debe calcular el componente de mano de obra y necesita entender como expresar correctamente los rendimientos.\n\nPregunta\n\nTecnicamente, ¿que representa el rendimiento de mano de obra en un APU?",
    options: [
      "Solo el salario del trabajador",
      "La cantidad de unidades de obra que una cuadrilla puede ejecutar en una jornada laboral (jornadas/unidad o unidades/jornada)",
      "Unicamente las horas trabajadas",
      "Solo las prestaciones sociales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero de costos debe entender que el rendimiento expresa la productividad de la cuadrilla de trabajo, indicando cuantas jornadas se requieren para ejecutar una unidad de obra (jornadas/m3, jornadas/m2) o cuantas unidades se ejecutan en una jornada (m3/jornada). Se determina por analisis historico, estudios de tiempo o referencia de manuales tecnicos. Afecta directamente el costo.",
    topic: "Rendimientos de mano de obra"
  },
  {
    id: 22,
    question: "Situacion\n\nEl analista de costos de un proyecto de construccion de un hospital en el Uraba antioqueno debe calcular el costo horario de una retroexcavadora para incluirlo en los APU. Necesita conocer todos los componentes que conforman este costo.\n\nPregunta\n\nTecnicamente, ¿que componentes considera el costo horario de un equipo de construccion?",
    options: [
      "Solo el precio de compra",
      "Depreciacion, intereses sobre inversion, seguros, costos de operacion (combustible, lubricantes, llantas), mantenimiento y reparaciones, y operador si aplica",
      "Unicamente el combustible",
      "Solo el salario del operador"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el analista de costos debe calcular el costo horario del equipo incluyendo: Costos de posesion (depreciacion, intereses sobre capital invertido, seguros, almacenamiento) y Costos de operacion (combustible, energia, lubricantes, filtros, llantas, mantenimiento preventivo y correctivo, reparaciones, operador si aplica). Se calcula segun vida util, valor de salvamento y horas trabajadas al ano.",
    topic: "Costo horario de equipos"
  },
  {
    id: 23,
    question: "Situacion\n\nEl ingeniero de recursos humanos de una constructora en Antioquia debe calcular el costo real de la mano de obra para los proyectos de la empresa. Necesita determinar el factor prestacional aplicable segun la legislacion laboral colombiana.\n\nPregunta\n\nSegun la legislacion laboral colombiana, ¿que componentes incluye el factor prestacional para calcular el costo real de mano de obra?",
    options: [
      "Solo el salario basico",
      "Prestaciones sociales (cesantias, intereses, prima, vacaciones), seguridad social (salud, pension, ARL), aportes parafiscales (SENA, ICBF, Caja de Compensacion), dotacion y herramientas",
      "Unicamente el auxilio de transporte",
      "Solo las vacaciones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el ingeniero de recursos humanos debe calcular el factor prestacional (tipicamente 52-58%) que incluye: Prestaciones (cesantias 8.33%, intereses 1%, prima 8.33%, vacaciones 4.17%), Seguridad Social (salud 8.5%, pension 12%, ARL 0.522-6.96%), Parafiscales (SENA 2%, ICBF 3%, CCF 4%), dotacion, herramientas menores. Se multiplica por el salario basico para obtener costo real.",
    topic: "Factor prestacional"
  },
  {
    id: 24,
    question: "Situacion\n\nUn contratista que participa en una licitacion publica para la construccion de un centro deportivo en Bello debe definir los porcentajes de AIU de su propuesta economica. Necesita entender que representa cada componente para justificarlo ante la entidad.\n\nPregunta\n\nEn un presupuesto de obra, ¿que representan la Administracion, Imprevistos y Utilidad (AIU)?",
    options: [
      "Solo ganancias del contratista",
      "Costos indirectos de administracion del contratista, imprevistos (riesgos no cuantificables) y utilidad o margen de ganancia esperado, expresados como porcentajes sobre costos directos",
      "Unicamente impuestos",
      "Solo el costo de oficina"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el contratista debe justificar que el AIU comprende: Administracion (gastos indirectos: personal administrativo, oficina, equipos de oficina, servicios, tipicamente 10-18%), Imprevistos (contingencias para riesgos no cuantificados, tipicamente 3-5%), Utilidad (margen de ganancia esperado por el contratista, tipicamente 5-10%). Se calcula sobre la sumatoria de costos directos.",
    topic: "Administracion, Imprevistos y Utilidad (AIU)"
  },
  {
    id: 25,
    question: "Situacion\n\nUna empresa constructora firmo un contrato a precios unitarios fijos sin formula de reajuste para la construccion de un puente en el Magdalena Medio. El gerente financiero necesita entender las implicaciones de esta modalidad contractual para la empresa.\n\nPregunta\n\nEn terminos contractuales, ¿que implica un acta de precios unitarios fijos sin formula de reajuste?",
    options: [
      "Los precios pueden cambiar libremente",
      "Los precios pactados permanecen constantes durante toda la ejecucion del contrato, asumiendo el contratista el riesgo de variacion de costos de insumos",
      "Solo se ajustan por inflacion automaticamente",
      "Los precios se renegocian mensualmente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el gerente financiero debe entender que en contratos a precios unitarios fijos sin reajuste, los valores pactados en el APU permanecen constantes durante toda la ejecucion del contrato, independientemente de las variaciones en precios de materiales, mano de obra o equipos. El contratista asume el riesgo de incrementos. Se usa tipicamente en contratos de corta duracion.",
    topic: "Precios unitarios fijos"
  }
]

export function InfraestructuraTest() {
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
    setShowFeedback(false)
  }

  const calculateScore = () => {
    let score = 0
    currentQuestions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        score += question.points
      }
    })
    return score
  }

  const totalPoints = currentQuestions.reduce((sum, q) => sum + q.points, 0)

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const score = calculateScore()
  const percentage = totalPoints > 0 ? (score / totalPoints) * 100 : 0

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="v1">Version 1</TabsTrigger>
          <TabsTrigger value="v2">Version 2</TabsTrigger>
        </TabsList>

        <TabsContent value="v1" className="space-y-6 mt-6">
          {renderQuestions()}
        </TabsContent>

        <TabsContent value="v2" className="space-y-6 mt-6">
          {renderQuestions()}
        </TabsContent>
      </Tabs>
    </div>
  )

  function renderQuestions() {
    return (
      <>
        {!showResults && (
          <TestTimer
            formattedTime={timer.formattedTime}
            timeColor={timer.timeColor}
            percentageRemaining={timer.percentageRemaining}
          />
        )}

        {showResults && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Resultados de la Prueba
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Puntuacion</p>
                  <p className="text-3xl font-bold text-primary">
                    {score} / {totalPoints}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Porcentaje</p>
                  <p className="text-3xl font-bold text-primary">{percentage.toFixed(1)}%</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  {percentage >= 80
                    ? "Excelente! Dominas el diseno de infraestructura publica."
                    : percentage >= 60
                    ? "Buen trabajo. Continua estudiando normas NSR-10 e INVIAS."
                    : "Sigue practicando. Revisa manuales tecnicos y especificaciones."}
                </p>
              </div>
              <Button onClick={handleReset} className="w-full">
                Reiniciar Prueba
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {currentQuestions.map((question, index) => (
            <Card
              key={question.id}
              className={
                showFeedback && answers[question.id] !== undefined
                  ? answers[question.id] === question.correctAnswer
                    ? "border-green-500"
                    : "border-red-500"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-base">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="flex-1">Pregunta {index + 1}</span>
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
                      {answers[question.id] === question.correctAnswer ? "Correcto!" : "Incorrecto"}
                    </AlertTitle>
                    <AlertDescription className="text-sm mt-2 leading-relaxed">
                      {question.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {!showResults && (
          <div className="flex justify-center pt-6">
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={Object.keys(answers).length !== currentQuestions.length}
              className="min-w-[200px]"
            >
              {Object.keys(answers).length === currentQuestions.length
                ? "Ver Resultados"
                : `Responde todas las preguntas (${Object.keys(answers).length}/${currentQuestions.length})`}
            </Button>
          </div>
        )}
      </>
    )
  }
}
