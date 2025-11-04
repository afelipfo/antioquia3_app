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

const questionsV1: Question[] = [
  // Clasificación de infraestructura
  {
    id: 1,
    question: "La jerarquización del sistema vial urbano en Colombia clasifica las vías en:",
    options: [
      "Solo vías principales y secundarias",
      "Vías arterias (V-0, V-1), vías principales (V-2, V-3), vías secundarias (V-4, V-5), vías terciarias (V-6, V-7), vías peatonales (V-8) y ciclorutas (V-9)",
      "Únicamente autopistas y calles",
      "Solo vías vehiculares sin clasificación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El sistema vial urbano se clasifica según el POT y manuales de diseño en: arterias (V-0, V-1), principales (V-2, V-3), secundarias (V-4, V-5), terciarias (V-6, V-7), peatonales (V-8) y ciclorutas (V-9), según su función, capacidad y velocidad de diseño.",
    topic: "Jerarquización vial"
  },
  {
    id: 2,
    question: "Los equipamientos colectivos de una ciudad incluyen:",
    options: [
      "Solo viviendas privadas",
      "Infraestructuras de educación, salud, cultura, recreación, deporte, seguridad, servicios públicos y administración pública",
      "Únicamente centros comerciales",
      "Solo oficinas privadas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los equipamientos colectivos son infraestructuras de uso público que prestan servicios sociales: educación (colegios), salud (hospitales), cultura (bibliotecas, teatros), recreación (parques), deporte (polideportivos), seguridad (CAI), servicios (mercados) y administración.",
    topic: "Equipamientos colectivos"
  },
  {
    id: 3,
    question: "El espacio público en áreas urbanas comprende:",
    options: [
      "Solo parques y jardines",
      "Vías peatonales, andenes, separadores, parques, plazas, plazoletas, zonas verdes, mobiliario urbano y elementos naturales como ríos y quebradas",
      "Únicamente zonas privadas",
      "Solo estacionamientos públicos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El espacio público incluye: vías y áreas peatonales, andenes, separadores viales, parques, plazas, plazoletas, zonas verdes, mobiliario urbano (bancas, luminarias), y elementos naturales del paisaje como cuerpos de agua y zonas de protección ambiental.",
    topic: "Espacio público"
  },
  {
    id: 4,
    question: "La clasificación funcional de carreteras en Colombia según el Manual de Diseño Geométrico INVIAS incluye:",
    options: [
      "Solo autopistas",
      "Primarias o troncales (conectan principales centros), secundarias o interregionales (conectan cabeceras municipales) y terciarias o veredales (penetración rural)",
      "Únicamente carreteras pavimentadas",
      "Solo vías de alta velocidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La clasificación funcional según INVIAS: Primarias o troncales (conectan principales centros de producción y consumo), secundarias o interregionales (conectan cabeceras municipales), y terciarias o veredales (acceso a veredas y zonas rurales de producción).",
    topic: "Clasificación de carreteras"
  },
  {
    id: 5,
    question: "Los diferentes tipos de infraestructura pública incluyen:",
    options: [
      "Solo infraestructura vial",
      "Infraestructura vial (vías, puentes), hidráulica (acueducto, alcantarillado), social (educación, salud), recreativa (parques, escenarios deportivos) y de servicios (mercados, cementerios)",
      "Únicamente edificaciones",
      "Solo redes eléctricas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La infraestructura pública se clasifica en: vial (vías, puentes, ciclorutas), hidráulica y sanitaria (acueducto, alcantarillado, drenaje), social (equipamientos de educación, salud), recreativa y deportiva (parques, polideportivos), y de servicios públicos (mercados, plazas de mercado, cementerios).",
    topic: "Tipos de infraestructura"
  },
  // Diseño de infraestructura
  {
    id: 6,
    question: "Los estudios topográficos para proyectos de infraestructura deben incluir:",
    options: [
      "Solo mediciones aproximadas",
      "Levantamiento planimétrico y altimétrico, localización de redes existentes, linderos, curvas de nivel, perfiles longitudinales y transversales, y georreferenciación en sistema de coordenadas oficial",
      "Únicamente fotografías del terreno",
      "Solo descripción escrita del sitio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los estudios topográficos incluyen: levantamiento planimétrico (coordenadas X,Y) y altimétrico (cotas Z), localización de redes de servicios públicos existentes, linderos y construcciones, curvas de nivel, perfiles longitudinales y transversales del terreno, y georreferenciación en sistema Magna-Sirgas.",
    topic: "Estudios topográficos"
  },
  {
    id: 7,
    question: "El estudio geotécnico y de suelos de un proyecto de infraestructura determina:",
    options: [
      "Solo el color del suelo",
      "Estratigrafía del subsuelo, propiedades mecánicas del suelo (capacidad portante, compresibilidad, expansividad), nivel freático, recomendaciones de cimentación y estabilidad de taludes",
      "Únicamente la presencia de rocas",
      "Solo la vegetación existente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El estudio geotécnico determina: estratigrafía (capas del subsuelo), propiedades físicas y mecánicas (granulometría, plasticidad, resistencia, compresibilidad, expansividad), capacidad portante, nivel freático, estabilidad de taludes, y recomendaciones para tipo de cimentación y movimiento de tierras.",
    topic: "Estudio geotécnico"
  },
  {
    id: 8,
    question: "El diseño geométrico de una vía urbana debe considerar:",
    options: [
      "Solo el ancho de la calzada",
      "Velocidad de diseño, radio de curvatura horizontal y vertical, peralte, pendientes longitudinales, distancia de visibilidad, ancho de carriles, bermas y obras de drenaje",
      "Únicamente el pavimento a utilizar",
      "Solo el número de carriles"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El diseño geométrico considera: velocidad de diseño, alineamiento horizontal (radios de curvatura, peralte, transiciones), alineamiento vertical (pendientes, curvas verticales), distancia de visibilidad de parada y adelantamiento, sección transversal (ancho de carriles, bermas, andenes), y obras de drenaje.",
    topic: "Diseño geométrico vial"
  },
  {
    id: 9,
    question: "Las especificaciones técnicas de un proyecto de infraestructura definen:",
    options: [
      "Solo el presupuesto del proyecto",
      "Los requisitos de calidad de materiales, procedimientos constructivos, equipos a utilizar, tolerancias dimensionales, controles de calidad y ensayos requeridos para cada actividad",
      "Únicamente el cronograma de obra",
      "Solo el personal necesario"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las especificaciones técnicas detallan para cada actividad: requisitos de calidad de materiales (normas ICONTEC, ASTM), procedimientos constructivos paso a paso, equipos y herramientas, tolerancias dimensionales, controles de calidad, ensayos y pruebas requeridos, y criterios de aceptación.",
    topic: "Especificaciones técnicas"
  },
  {
    id: 10,
    question: "Los planos de un proyecto de infraestructura deben incluir:",
    options: [
      "Solo el plano de localización",
      "Planos arquitectónicos, estructurales, hidráulicos, sanitarios, eléctricos, de detalles constructivos, cortes, secciones, especificaciones y notas técnicas",
      "Únicamente fotografías del sitio",
      "Solo dibujos a mano alzada"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los planos incluyen: localización general, arquitectónicos (plantas, fachadas), estructurales (cimentación, estructura), instalaciones hidráulicas y sanitarias, instalaciones eléctricas, detalles constructivos ampliados, cortes y secciones, especificaciones técnicas, notas y convenciones, y cuadro de áreas.",
    topic: "Planos del proyecto"
  },
  {
    id: 11,
    question: "Las memorias de cálculo de un proyecto estructural deben contener:",
    options: [
      "Solo el resultado final sin justificación",
      "Criterios de diseño, cargas consideradas (muertas, vivas, sísmicas), combinaciones de carga, análisis estructural, diseño de elementos (cimentación, columnas, vigas, losas), cumplimiento de norma NSR-10",
      "Únicamente el costo de la estructura",
      "Solo listado de materiales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las memorias de cálculo documentan: criterios y normas de diseño (NSR-10), caracterización de materiales, cargas (muertas, vivas, sismo), combinaciones de carga, modelo y análisis estructural, diseño y verificación de cada elemento (cimentación, columnas, vigas, muros, losas, conexiones), y cumplimiento de requisitos normativos.",
    topic: "Memorias de cálculo"
  },
  {
    id: 12,
    question: "El diseño de pavimento flexible de una vía requiere:",
    options: [
      "Solo estimar espesores al azar",
      "Estudio de tránsito (número de ejes equivalentes), caracterización de subrasante (CBR), diseño de estructura de pavimento (subbase, base, rodadura) según método AASHTO o INVIAS, y drenaje",
      "Únicamente colocar concreto asfáltico",
      "Solo nivelar el terreno"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El diseño de pavimento flexible requiere: estudio de tránsito para determinar ejes equivalentes (ESAL), caracterización de subrasante mediante ensayo CBR, diseño de estructura (espesores de subbase, base granular, capa asfáltica) según metodología AASHTO o Manual INVIAS, y diseño de obras de drenaje.",
    topic: "Diseño de pavimento"
  },
  {
    id: 13,
    question: "Los estudios de impacto ambiental de proyectos de infraestructura deben incluir:",
    options: [
      "Solo una carta de intención",
      "Línea base ambiental, identificación y evaluación de impactos, Plan de Manejo Ambiental (PMA), Plan de Gestión Social (PGS), y Plan de Compensación y Restauración",
      "Únicamente permisos básicos",
      "Solo listado de árboles a talar"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El estudio de impacto ambiental incluye: línea base (medio físico, biótico, social), identificación y evaluación de impactos (matrices, metodología), Plan de Manejo Ambiental (prevención, mitigación, corrección, compensación), Plan de Gestión Social, permisos ambientales requeridos y plan de seguimiento.",
    topic: "Impacto ambiental de infraestructura"
  },
  // Normas técnicas
  {
    id: 14,
    question: "La NSR-10 (Reglamento Colombiano de Construcción Sismo Resistente) establece requisitos para:",
    options: [
      "Solo edificios de gran altura",
      "Diseño y construcción sismo resistente de edificaciones, incluyendo cargas, análisis estructural, diseño de elementos, supervisión técnica y requisitos de calidad de materiales",
      "Únicamente obras hidráulicas",
      "Solo puentes vehiculares"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La NSR-10 (Ley 400 de 1997, Decreto 926 de 2010) regula el diseño y construcción sismo resistente de edificaciones nuevas en Colombia, estableciendo: requisitos de estudios de suelos, análisis y diseño estructural, calidad de materiales, supervisión técnica, y aspectos arquitectónicos y de instalaciones.",
    topic: "NSR-10"
  },
  {
    id: 15,
    question: "Los Títulos de la NSR-10 abarcan:",
    options: [
      "Solo diseño de concreto",
      "Título A (requisitos generales), B (cargas), C (concreto), D (mampostería), E (casas de uno y dos pisos), F (estructuras metálicas), G (madera), H (estudios geotécnicos), I (cubiertas), J (requisitos de protección contra incendios), K (requisitos complementarios)",
      "Únicamente normas de acero",
      "Solo especificaciones de acabados"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La NSR-10 comprende: Título A (requisitos generales, licencias, supervisión), B (cargas), C (concreto reforzado), D (mampostería estructural), E (casas de uno y dos pisos), F (estructuras metálicas), G (madera), H (estudios geotécnicos, cimentaciones), I (cubiertas), J (protección contra incendios), K (complementarios).",
    topic: "Estructura NSR-10"
  },
  {
    id: 16,
    question: "El Manual de Diseño Geométrico de Carreteras del INVIAS establece criterios para:",
    options: [
      "Solo el color de señalización",
      "Clasificación de carreteras, velocidad de diseño, alineamiento horizontal y vertical, sección transversal, distancias de visibilidad, intersecciones y obras de drenaje",
      "Únicamente el paisajismo vial",
      "Solo tarifas de peajes"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El Manual INVIAS define criterios para: clasificación funcional de vías, velocidades de diseño según categoría, diseño de alineamiento horizontal (radios, peralte, transición), alineamiento vertical (pendientes, curvas), sección transversal (carriles, bermas, cunetas), visibilidad, intersecciones y drenaje vial.",
    topic: "Manual INVIAS"
  },
  {
    id: 17,
    question: "La Resolución 0549 de 2015 del MinVivienda establece parámetros para:",
    options: [
      "Solo rampas de acceso",
      "Accesibilidad universal en edificaciones y espacios urbanos para personas con movilidad reducida: rampas, pasamanos, baños accesibles, señalización, circulaciones y mobiliario urbano",
      "Únicamente ascensores",
      "Solo estacionamientos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La Resolución 0549/2015 regula la accesibilidad universal estableciendo parámetros técnicos para: rampas (pendientes, descansos), pasamanos, puertas, baños accesibles, ascensores, rutas accesibles, circulaciones, señalización táctil y visual, y mobiliario urbano accesible en edificaciones y espacio público.",
    topic: "Accesibilidad - Resolución 0549"
  },
  {
    id: 18,
    question: "Las pendientes máximas en rampas de acceso según Resolución 0549/2015 son:",
    options: [
      "30% sin restricción",
      "Hasta 12% para desniveles hasta 15cm; hasta 10% para desniveles entre 15cm y 75cm; hasta 8% para desniveles entre 75cm y 150cm; y hasta 6% para desniveles mayores",
      "Solo 5% sin importar desnivel",
      "20% en todos los casos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La Resolución 0549 establece pendientes máximas para rampas según el desnivel a salvar: hasta 12% (desnivel ≤15cm), hasta 10% (15cm<desnivel≤75cm), hasta 8% (75cm<desnivel≤150cm), y hasta 6% (desnivel>150cm). Además requiere descansos cada 9 metros y pasamanos continuos.",
    topic: "Pendientes en rampas"
  },
  {
    id: 19,
    question: "Las especificaciones generales de construcción de carreteras del INVIAS establecen requisitos para:",
    options: [
      "Solo el transporte de materiales",
      "Movimiento de tierras, obras de drenaje, pavimentos (subbases, bases, carpetas asfálticas, concreto), puentes, señalización, seguridad vial y protección ambiental",
      "Únicamente pintura de señalización",
      "Solo cerramientos temporales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las Especificaciones INVIAS definen requisitos para: movimiento de tierras (excavación, terraplenes, compactación), obras de drenaje (alcantarillas, cunetas, filtros), pavimentos (subbases, bases, mezclas asfálticas, concreto hidráulico), estructuras (puentes), señalización, seguridad vial, protección ambiental, y ensayos de control de calidad.",
    topic: "Especificaciones INVIAS"
  },
  {
    id: 20,
    question: "Las normas técnicas ICONTEC (Instituto Colombiano de Normas Técnicas) regulan:",
    options: [
      "Solo exportaciones",
      "Requisitos de calidad, especificaciones técnicas, métodos de ensayo y certificación para materiales de construcción, productos, procesos y servicios utilizados en infraestructura",
      "Únicamente importaciones",
      "Solo diseño gráfico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las NTC (Normas Técnicas Colombianas) establecen: requisitos de calidad y especificaciones para materiales de construcción (cemento, acero, agregados), métodos de ensayo y muestreo, procedimientos de certificación, y requisitos para productos, procesos y servicios. Son referencia en contratos y especificaciones técnicas.",
    topic: "Normas ICONTEC"
  },
  // Presupuestos de obra
  {
    id: 21,
    question: "El Análisis de Precios Unitarios (APU) de una actividad de construcción incluye:",
    options: [
      "Solo el costo total sin detallar",
      "Costos de materiales (cantidades y precios), mano de obra (rendimientos y salarios), equipos y herramientas (rendimientos y tarifas), transporte, y porcentajes de administración, imprevistos y utilidad",
      "Únicamente el precio de venta",
      "Solo el costo de materiales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El APU desglosa todos los costos directos e indirectos de una unidad de obra: materiales (cantidades, desperdicios, precios), mano de obra (cuadrilla, rendimiento, salarios, prestaciones), equipos (rendimiento, tarifas), transporte, más porcentajes de administración, imprevistos y utilidad. Se expresa en $/unidad (m3, m2, ml, UN).",
    topic: "Análisis de Precios Unitarios (APU)"
  },
  {
    id: 22,
    question: "Las cantidades de obra de un presupuesto se calculan a partir de:",
    options: [
      "Estimaciones sin sustento técnico",
      "Los planos y especificaciones técnicas del proyecto, mediante levantamiento o cuantificación detallada de cada actividad (volúmenes, áreas, longitudes, unidades)",
      "Solo experiencia en proyectos anteriores",
      "Únicamente el presupuesto disponible"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las cantidades de obra se cuantifican rigurosamente a partir de los planos (plantas, cortes, detalles) y especificaciones técnicas del proyecto, calculando volúmenes de excavación, áreas de pavimento, longitudes de tubería, unidades de elementos, considerando desperdicios normales. Cada cantidad debe sustentarse con memorias de cálculo.",
    topic: "Cantidades de obra"
  },
  {
    id: 23,
    question: "El cronograma valorado de un proyecto relaciona:",
    options: [
      "Solo fechas de actividades",
      "El cronograma de ejecución de actividades con los costos asociados a cada periodo (mensual o semanal), permitiendo la programación de flujo de caja del proyecto",
      "Únicamente los recursos humanos",
      "Solo el costo total final"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El cronograma valorado integra la programación temporal de actividades con sus costos, indicando cuánto se debe invertir en cada periodo (semana o mes). Permite: programar flujo de caja, establecer cronograma de desembolsos, determinar avance financiero esperado, y controlar la ejecución presupuestal del proyecto.",
    topic: "Cronograma valorado"
  },
  {
    id: 24,
    question: "Las fórmulas de reajuste de precios en contratos de obra pública permiten:",
    options: [
      "Modificar arbitrariamente los precios",
      "Ajustar el valor del contrato cuando varían los costos de insumos (materiales, mano de obra, equipos) durante la ejecución, según índices oficiales (DANE, Banco de la República)",
      "Solo incrementar las utilidades del contratista",
      "Únicamente reducir el valor del contrato"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las fórmulas de reajuste (polinómicas o monomiales) ajustan el valor del contrato cuando varían los índices de precios de insumos durante la ejecución, protegiendo el equilibrio económico. Utilizan índices oficiales del DANE o Banco de la República para materiales, mano de obra y equipos, según participación porcentual en el presupuesto.",
    topic: "Fórmulas de reajuste"
  },
  {
    id: 25,
    question: "El presupuesto oficial de un proyecto de inversión pública debe incluir:",
    options: [
      "Solo el costo de construcción",
      "Estudios y diseños, adquisición de predios, construcción, interventoría, gestión ambiental, gestión social, gestión predial, imprevistos, y costos indirectos de la entidad",
      "Únicamente materiales y mano de obra",
      "Solo el valor del contrato principal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El presupuesto oficial integral incluye: estudios y diseños previos, adquisición de predios y servidumbres, construcción u obra física, interventoría o supervisión, gestión ambiental (permisos, PMA), gestión social (socialización, reasentamientos), gestión predial, imprevistos (típicamente 5-10%), y costos indirectos de la entidad contratante.",
    topic: "Presupuesto oficial del proyecto"
  }
]

const questionsV2: Question[] = [
  // Clasificación de infraestructura
  {
    id: 1,
    question: "Los andenes peatonales en zonas urbanas deben tener:",
    options: [
      "Cualquier ancho sin restricción",
      "Ancho mínimo de 1.20m en zonas residenciales y 2.00m en zonas comerciales, superficie antideslizante, pendiente transversal máxima 2%, y estar libres de obstáculos",
      "Solo 50cm de ancho",
      "Únicamente grama sin pavimento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los andenes deben tener ancho mínimo de 1.20m libre de obstáculos (zona residencial) o 2.00m (zona comercial), superficie firme, estable y antideslizante, pendiente transversal máxima 2% para drenaje, sin escalones ni resaltos, y franja táctil guía para personas con discapacidad visual.",
    topic: "Diseño de andenes"
  },
  {
    id: 2,
    question: "Las ciclorutas o infraestructura para bicicletas deben diseñarse con:",
    options: [
      "Solo pintura en la vía vehicular",
      "Ancho mínimo de 1.20m por sentido, separación física o visual de vehículos motorizados, pendientes controladas, radios de curvatura adecuados, señalización específica y conexión con red de transporte",
      "Únicamente señalización vertical",
      "Solo en vías de baja velocidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las ciclorutas requieren: ancho mínimo 1.20m unidireccional o 2.50m bidireccional, separación de tráfico motorizado (física o demarcación), pendientes máximas 6-8%, radios de curvatura mínimos, pavimento antideslizante, señalización horizontal y vertical específica, iluminación, y conexión con sistema de transporte público.",
    topic: "Diseño de ciclorutas"
  },
  {
    id: 3,
    question: "La clasificación del suelo según su capacidad portante (CBR) es:",
    options: [
      "Solo suelo bueno o malo",
      "Inadecuado (CBR<3%), pobre (3%≤CBR<5%), regular (5%≤CBR<10%), bueno (10%≤CBR<20%), muy bueno (20%≤CBR<30%), excelente (CBR≥30%)",
      "Únicamente suelo duro o blando",
      "Solo arcilla o arena"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La clasificación por CBR (California Bearing Ratio) es: Inadecuado (CBR<3%), Pobre (3-5%), Regular (5-10%), Bueno (10-20%), Muy bueno (20-30%), Excelente (≥30%). El CBR es fundamental para diseño de pavimentos y determina el espesor de las capas estructurales.",
    topic: "Clasificación de suelos por CBR"
  },
  {
    id: 4,
    question: "La carga viva vehicular de diseño para puentes en Colombia según la NSR-10 y CCP-14 es:",
    options: [
      "Solo vehículos livianos",
      "Camión C40-95 o HS20-44 y sistema de cargas alternativo (carril más tandem), considerando factor de carga y reducción por número de carriles",
      "Únicamente motos y bicicletas",
      "Solo buses urbanos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El diseño de puentes utiliza: Camión de diseño C40-95 (equivalente HS20-44), Sistema alternativo de carga (carril uniforme + tandem), con factores de carga según LRFD y reducción por múltiples carriles cargados. Se considera también carga peatonal, sísmica, viento, temperatura y fuerzas de frenado.",
    topic: "Cargas de diseño en puentes"
  },
  {
    id: 5,
    question: "Los elementos constitutivos naturales del espacio público incluyen:",
    options: [
      "Solo construcciones urbanas",
      "Áreas de protección de ríos, quebradas, nacimientos de agua, humedales, zonas de reserva forestal, parques naturales y elementos del paisaje natural",
      "Únicamente andenes y calles",
      "Solo monumentos históricos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los elementos naturales del espacio público comprenden: áreas de protección y rondas de ríos, quebradas y cuerpos de agua, zonas de nacimientos de agua, humedales, zonas de reserva forestal protectora, parques naturales, cerros tutelares y elementos naturales del paisaje que hacen parte del patrimonio ambiental.",
    topic: "Elementos naturales del espacio público"
  },
  // Diseño de infraestructura
  {
    id: 6,
    question: "El peralte en curvas horizontales de una vía sirve para:",
    options: [
      "Solo estética vial",
      "Contrarrestar la fuerza centrífuga que actúa sobre los vehículos en curvas, mejorando la seguridad y comodidad, mediante inclinación transversal de la calzada",
      "Únicamente drenar agua lluvia",
      "Solo señalización de curvas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El peralte es la inclinación transversal de la calzada en curvas horizontales que contrarresta la fuerza centrífuga, permitiendo que los vehículos circulen con seguridad a la velocidad de diseño. Se calcula según radio de curvatura y velocidad. Los valores típicos varían entre 2% (mínimo) y 8-10% (máximo en zonas urbanas).",
    topic: "Peralte en curvas"
  },
  {
    id: 7,
    question: "La distancia de visibilidad de parada en una vía es:",
    options: [
      "Cualquier distancia al azar",
      "La longitud de vía requerida para que un conductor pueda detener su vehículo antes de alcanzar un obstáculo visible, considerando tiempo de reacción y distancia de frenado",
      "Solo 10 metros en todos los casos",
      "Únicamente la distancia entre señales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La distancia de visibilidad de parada es la suma de: distancia recorrida durante el tiempo de percepción-reacción del conductor (típicamente 2.5 segundos), más la distancia de frenado considerando la velocidad de diseño, pendiente y coeficiente de fricción. Es fundamental para el diseño seguro de alineamientos horizontal y vertical.",
    topic: "Distancia de visibilidad"
  },
  {
    id: 8,
    question: "El bombeo de una vía en tramos rectos es:",
    options: [
      "La profundidad de excavación",
      "La inclinación transversal de la calzada desde el eje hacia los bordes para evacuar el agua lluvia, típicamente entre 1.5% y 2.5%",
      "Solo el ancho de la vía",
      "Únicamente la pendiente longitudinal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El bombeo es la inclinación transversal de la calzada en tramos rectos que facilita el drenaje superficial del agua lluvia desde el centro hacia las cunetas laterales. Los valores típicos son: 1.5-2% para pavimentos asfálticos o concreto, 2-3% para pavimentos en adoquín o grava.",
    topic: "Bombeo de vías"
  },
  {
    id: 9,
    question: "Las bermas o espaldones de una carretera son:",
    options: [
      "Solo vegetación lateral",
      "Franjas longitudinales contiguas a la calzada, de ancho variable según categoría de vía, que sirven como zona de escape, soporte lateral del pavimento y zona de trabajo en mantenimiento",
      "Únicamente señalización vertical",
      "Solo cunetas de drenaje"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las bermas son franjas longitudinales paralelas a la calzada que proporcionan: zona de escape para vehículos en emergencia, soporte lateral para la estructura del pavimento, espacio para maniobras de mantenimiento, ubicación de señalización, y mejora en seguridad vial. El ancho varía entre 0.50m y 3.00m según categoría de vía.",
    topic: "Bermas en carreteras"
  },
  {
    id: 10,
    question: "El módulo de rotura del concreto (Mr) se utiliza para:",
    options: [
      "Solo estimar costos",
      "Diseñar pavimentos rígidos de concreto hidráulico, expresado en MPa, y representa la resistencia a la flexión del concreto",
      "Únicamente calcular tiempos de fraguado",
      "Solo dosificar mezclas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El Módulo de Rotura (Mr) es la resistencia a la flexión del concreto utilizada en diseño de pavimentos rígidos, expresada en MPa. Valores típicos: 3.8-4.5 MPa para vías de bajo tráfico, 4.0-4.5 MPa para tráfico medio, 4.5-5.0 MPa para tráfico alto. Se determina mediante ensayo de viga simple a los 28 días.",
    topic: "Módulo de rotura del concreto"
  },
  {
    id: 11,
    question: "Las juntas de construcción en pavimentos de concreto sirven para:",
    options: [
      "Solo decoración",
      "Controlar el agrietamiento por retracción del concreto, permitir movimientos térmicos, delimitar áreas de vaciado y facilitar el proceso constructivo",
      "Únicamente separar colores",
      "Solo ahorrar material"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Las juntas en pavimentos rígidos son: Juntas transversales de contracción (controlan fisuras, cada 3-5m), juntas longitudinales (entre carriles), juntas de construcción (límite de jornadas de vaciado), y juntas de expansión (permiten dilatación térmica). Requieren sellado y diseño de transferencia de carga con pasajuntas o dovelas.",
    topic: "Juntas en pavimentos de concreto"
  },
  {
    id: 12,
    question: "El ensayo Proctor de compactación de suelos determina:",
    options: [
      "Solo el color del suelo",
      "La densidad seca máxima que puede alcanzar un suelo y la humedad óptima de compactación, fundamentales para el control de calidad de terraplenes y capas de pavimento",
      "Únicamente la granulometría",
      "Solo la plasticidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El ensayo Proctor (estándar o modificado) determina: la densidad seca máxima (γd max) que puede alcanzar el suelo y el contenido de humedad óptimo (w opt) para lograrla. Es fundamental para: especificar grados de compactación (90%, 95%, 100% del Proctor), controlar calidad de terraplenes, subbases y bases granulares.",
    topic: "Ensayo Proctor"
  },
  {
    id: 13,
    question: "El diseño de intersecciones viales debe considerar:",
    options: [
      "Solo semáforos",
      "Volúmenes de tráfico, movimientos vehiculares (giros), carriles de aceleración y desaceleración, radios de giro, visibilidad, señalización, semaforización y seguridad de peatones y ciclistas",
      "Únicamente estética urbana",
      "Solo estacionamientos cercanos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El diseño de intersecciones considera: análisis de volúmenes y capacidad, geometría de movimientos (directos, giros), carriles de aceleración/desaceleración, radios de giro según vehículo de diseño, distancias de visibilidad (triángulo de visibilidad), señalización horizontal y vertical, semaforización (si aplica), y diseño de pasos peatonales y cruces ciclistas seguros.",
    topic: "Diseño de intersecciones"
  },
  // Normas técnicas
  {
    id: 14,
    question: "El espectro de diseño sísmico según NSR-10 depende de:",
    options: [
      "Solo el área de construcción",
      "La zona de amenaza sísmica, el tipo de suelo de fundación, el grupo de uso de la edificación y el sistema estructural empleado",
      "Únicamente el presupuesto disponible",
      "Solo la altura de la edificación"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El espectro de diseño sísmico se define según: zona de amenaza sísmica (baja, intermedia, alta), perfil de suelo (A a F según rigidez), grupo de uso (I a IV según importancia), y coeficientes de modificación de respuesta (R) según sistema estructural. Determina las fuerzas sísmicas de diseño.",
    topic: "Espectro de diseño sísmico"
  },
  {
    id: 15,
    question: "El recubrimiento mínimo de concreto sobre refuerzo según NSR-10 en elementos expuestos a la intemperie es:",
    options: [
      "5mm en todos los casos",
      "Para barras #5 y menores: 40mm; para barras #6 y mayores: 50mm; en elementos en contacto con suelo: 75mm",
      "Solo 10mm sin importar condiciones",
      "100mm en todos los elementos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La NSR-10 establece recubrimientos mínimos para protección del refuerzo según exposición: Concreto en contacto con suelo: 75mm; Expuesto a intemperie: 40mm (barras ≤#5) o 50mm (barras ≥#6); Interior no expuesto: 40mm (vigas, columnas), 20mm (losas). Garantiza protección contra corrosión y adherencia.",
    topic: "Recubrimientos en concreto reforzado"
  },
  {
    id: 16,
    question: "La velocidad de diseño en carreteras según INVIAS se selecciona considerando:",
    options: [
      "Solo el deseo del diseñador",
      "La categoría funcional de la vía, topografía del terreno (plano, ondulado, montañoso), volumen de tráfico proyectado y costos de construcción",
      "Únicamente el límite de velocidad urbano",
      "Solo la potencia de los vehículos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La velocidad de diseño se selecciona según: categoría de vía (primaria: 80-110 km/h, secundaria: 60-80 km/h, terciaria: 30-60 km/h), topografía (plana, ondulada, montañosa, escarpada), TPD (tráfico promedio diario), restricciones económicas. Determina todos los elementos geométricos: radios, peraltes, visibilidad.",
    topic: "Velocidad de diseño de carreteras"
  },
  {
    id: 17,
    question: "Los requisitos de accesibilidad para baños públicos según Resolución 0549 incluyen:",
    options: [
      "Solo mayor tamaño",
      "Dimensiones mínimas (1.50m x 1.70m), área de maniobra para silla de ruedas, sanitario con barras de apoyo, lavamanos accesible sin pedestal, grifería de palanca, espejo inclinado y señalización",
      "Únicamente una rampa exterior",
      "Solo sanitario especial sin otros requisitos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los baños accesibles requieren: dimensiones mínimas 1.50m x 1.70m libres, puerta mínimo 0.90m que abre hacia afuera, área de transferencia lateral al sanitario (0.90m), barras de apoyo abatibles (0.75-0.80m altura), lavamanos sin pedestal (altura 0.80-0.85m), grifería de palanca o sensor, espejo inclinado desde 0.90m, señalización con símbolo internacional.",
    topic: "Baños accesibles"
  },
  {
    id: 18,
    question: "La NTC 4595 (Ingeniería Civil y Arquitectura. Planeamiento y Diseño de Instalaciones de Estacionamientos) establece:",
    options: [
      "Solo el número de parqueaderos requeridos",
      "Dimensiones mínimas de espacios de parqueo (tipo de vehículo), anchos de circulación, rampas, radios de giro, estacionamientos accesibles, señalización y ventilación",
      "Únicamente tarifas de cobro",
      "Solo iluminación de parqueaderos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La NTC 4595 define: dimensiones mínimas de espacios (2.30-2.50m x 4.50-5.00m según tipo), anchos de circulación (3.00-6.50m), pendientes de rampas (máx 15%), radios de giro, estacionamientos accesibles (5% del total, mínimo 1), señalización horizontal y vertical, iluminación, ventilación mecánica si aplica.",
    topic: "NTC 4595 - Parqueaderos"
  },
  {
    id: 19,
    question: "El ensayo Marshall para mezclas asfálticas determina:",
    options: [
      "Solo el color del asfalto",
      "El contenido óptimo de asfalto de la mezcla, estabilidad (resistencia a la deformación), flujo, porcentaje de vacíos y propiedades volumétricas",
      "Únicamente la temperatura de aplicación",
      "Solo el costo del pavimento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El ensayo Marshall determina: contenido óptimo de cemento asfáltico (%), estabilidad (resistencia a la deformación en kN), flujo o deformación (mm), porcentaje de vacíos con aire (VCA), vacíos del agregado mineral (VAM), vacíos llenos de asfalto (VFA). Asegura desempeño adecuado del pavimento asfáltico.",
    topic: "Ensayo Marshall"
  },
  {
    id: 20,
    question: "La señalización vial según el Manual de Señalización Vial del MinTransporte comprende:",
    options: [
      "Solo semáforos",
      "Señales verticales (reglamentarias, preventivas, informativas), señalización horizontal (demarcación), señales transitorias (obras), y dispositivos de seguridad (delineadores, tachas, barreras)",
      "Únicamente pintura amarilla",
      "Solo señales de pare"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La señalización vial incluye: Verticales (reglamentarias-orden, preventivas-advertencia, informativas-orientación), Horizontales (líneas, símbolos, letras, tachas reflectivas), Transitorias (obras en la vía), y Dispositivos de seguridad (delineadores, barreras, reductores de velocidad). Cada tipo tiene especificaciones de forma, color, tamaño, ubicación y retroreflectividad.",
    topic: "Señalización vial"
  },
  // Presupuestos de obra
  {
    id: 21,
    question: "El rendimiento de mano de obra en un APU representa:",
    options: [
      "Solo el salario del trabajador",
      "La cantidad de unidades de obra que una cuadrilla puede ejecutar en una jornada laboral (jornadas/unidad o unidades/jornada)",
      "Únicamente las horas trabajadas",
      "Solo las prestaciones sociales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El rendimiento expresa la productividad de la cuadrilla de trabajo, indicando cuántas jornadas se requieren para ejecutar una unidad de obra (jornadas/m3, jornadas/m2) o cuántas unidades se ejecutan en una jornada (m3/jornada). Se determina por análisis histórico, estudios de tiempo o referencia de manuales técnicos. Afecta directamente el costo.",
    topic: "Rendimientos de mano de obra"
  },
  {
    id: 22,
    question: "El costo horario de un equipo de construcción considera:",
    options: [
      "Solo el precio de compra",
      "Depreciación, intereses sobre inversión, seguros, costos de operación (combustible, lubricantes, llantas), mantenimiento y reparaciones, y operador si aplica",
      "Únicamente el combustible",
      "Solo el salario del operador"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El costo horario del equipo incluye: Costos de posesión (depreciación, intereses sobre capital invertido, seguros, almacenamiento) y Costos de operación (combustible, energía, lubricantes, filtros, llantas, mantenimiento preventivo y correctivo, reparaciones, operador si aplica). Se calcula según vida útil, valor de salvamento y horas trabajadas al año.",
    topic: "Costo horario de equipos"
  },
  {
    id: 23,
    question: "El factor prestacional en Colombia para calcular el costo real de mano de obra incluye:",
    options: [
      "Solo el salario básico",
      "Prestaciones sociales (cesantías, intereses, prima, vacaciones), seguridad social (salud, pensión, ARL), aportes parafiscales (SENA, ICBF, Caja de Compensación), dotación y herramientas",
      "Únicamente el auxilio de transporte",
      "Solo las vacaciones"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El factor prestacional (típicamente 52-58%) incluye: Prestaciones (cesantías 8.33%, intereses 1%, prima 8.33%, vacaciones 4.17%), Seguridad Social (salud 8.5%, pensión 12%, ARL 0.522-6.96%), Parafiscales (SENA 2%, ICBF 3%, CCF 4%), dotación, herramientas menores. Se multiplica por el salario básico para obtener costo real.",
    topic: "Factor prestacional"
  },
  {
    id: 24,
    question: "La Administración, Imprevistos y Utilidad (AIU) en un presupuesto representan:",
    options: [
      "Solo ganancias del contratista",
      "Costos indirectos de administración del contratista, imprevistos (riesgos no cuantificables) y utilidad o margen de ganancia esperado, expresados como porcentajes sobre costos directos",
      "Únicamente impuestos",
      "Solo el costo de oficina"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "El AIU comprende: Administración (gastos indirectos: personal administrativo, oficina, equipos de oficina, servicios, típicamente 10-18%), Imprevistos (contingencias para riesgos no cuantificados, típicamente 3-5%), Utilidad (margen de ganancia esperado por el contratista, típicamente 5-10%). Se calcula sobre la sumatoria de costos directos.",
    topic: "Administración, Imprevistos y Utilidad (AIU)"
  },
  {
    id: 25,
    question: "El acta de precios unitarios fijos sin fórmula de reajuste implica que:",
    options: [
      "Los precios pueden cambiar libremente",
      "Los precios pactados permanecen constantes durante toda la ejecución del contrato, asumiendo el contratista el riesgo de variación de costos de insumos",
      "Solo se ajustan por inflación automáticamente",
      "Los precios se renegocian mensualmente"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En contratos a precios unitarios fijos sin reajuste, los valores pactados en el APU permanecen constantes durante toda la ejecución del contrato, independientemente de las variaciones en precios de materiales, mano de obra o equipos. El contratista asume el riesgo de incrementos. Se usa típicamente en contratos de corta duración.",
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
          <TabsTrigger value="v1">Versión 1</TabsTrigger>
          <TabsTrigger value="v2">Versión 2</TabsTrigger>
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
                  <p className="text-sm text-muted-foreground">Puntuación</p>
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
                    ? "¡Excelente! Dominas el diseño de infraestructura pública."
                    : percentage >= 60
                    ? "Buen trabajo. Continúa estudiando normas NSR-10 e INVIAS."
                    : "Sigue practicando. Revisa manuales técnicos y especificaciones."}
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
                <p className="font-medium leading-relaxed">{question.question}</p>

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
                      {answers[question.id] === question.correctAnswer ? "¡Correcto!" : "Incorrecto"}
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
