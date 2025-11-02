/* eslint-disable jsx-a11y/label-has-associated-control */
"use client"

import { useState, useMemo } from "react"
import { CheckCircle2, Info, RefreshCw, Brain } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Question = {
  id: number
  category: string
  question: string
  context?: string
  options: { id: string; text: string }[]
  correct: string
  explanation: string
  points: number
}

const questionsV1: Question[] = [
  // Oraciones temáticas
  {
    id: 1,
    category: "Identificación de Idea Central",
    context: "Al masticar chicle se estimulan las glándulas salivares. (2) Estas glándulas envían señales al cerebro. (3) El cerebro, al recibir la señal de que viene alimento, ordena al estómago prepararse. (4) El estómago entonces produce ácidos digestivos. (5) Como no llega alimento real, estos ácidos atacan la pared estomacal. (6) Con el tiempo, esto daña la mucosa gástrica. (7) El resultado es la aparición de gastritis. (8) Por eso no se recomienda masticar chicle con el estómago vacío.",
    question: "La idea central del párrafo anterior está contenida en:",
    options: [
      { id: "a", text: "La oración 1" },
      { id: "b", text: "La oración 7" },
      { id: "c", text: "La oración 3" },
      { id: "d", text: "La oración 4" },
      { id: "e", text: "La oración 8" },
    ],
    correct: "b",
    explanation: "La oración 7 'El resultado es la aparición de gastritis' contiene la idea central del párrafo, que es explicar cómo masticar chicle causa gastritis. Las demás oraciones son detalles del proceso.",
    points: 5,
  },
  {
    id: 2,
    category: "Identificación de Idea Central",
    context: "(1) Una persona necesita entre 1,500 y 1,800 calorías diarias para el metabolismo basal. (2) Este es el mínimo de energía para mantener las funciones vitales en reposo. (3) Las actividades físicas requieren calorías adicionales. (4) Una actividad sedentaria necesita 500 calorías extra. (5) Un trabajo moderado requiere 1,000 calorías adicionales. (6) El trabajo pesado puede demandar hasta 1,500 calorías más.",
    question: "La idea central del párrafo anterior está contenida en:",
    options: [
      { id: "a", text: "La oración 3" },
      { id: "b", text: "La oración 1" },
      { id: "c", text: "La oración 6" },
      { id: "d", text: "La oración 4" },
      { id: "e", text: "La oración 5" },
    ],
    correct: "b",
    explanation: "La oración 1 presenta la idea principal sobre el requerimiento calórico basal, que es el tema central. Las demás oraciones desarrollan información complementaria sobre actividades adicionales.",
    points: 5,
  },
  {
    id: 3,
    category: "Identificación de Idea Central",
    context: "(1) La cantidad de energía necesaria para mantener un animal vivo en reposo se llama metabolismo basal. (2) Para medirlo se determina el consumo de oxígeno tras varias horas sin comer. (3) Este consumo se mide en condiciones controladas de temperatura. (4) La tasa metabólica basal varía según el peso del animal. (5) Un elefante tiene mayor metabolismo basal que un ratón. (6) Sin embargo, por metro cuadrado de superficie corporal, la tasa es semejante en todos los mamíferos.",
    question: "La idea central del párrafo anterior está contenida en:",
    options: [
      { id: "a", text: "La oración 1" },
      { id: "b", text: "La oración 2" },
      { id: "c", text: "La oración 4" },
      { id: "d", text: "La oración 5" },
      { id: "e", text: "La oración 6" },
    ],
    correct: "a",
    explanation: "La oración 1 define el concepto de metabolismo basal, que es el tema principal del párrafo. Las demás oraciones explican cómo se mide y sus variaciones.",
    points: 5,
  },
  // Ordenamiento de párrafos
  {
    id: 4,
    category: "Ordenamiento de Párrafos",
    context: "Ordene las siguientes oraciones para formar un texto coherente:\n\n1. Un cuerpo de investigadores rusos\n2. cifra que supera a la del Cañón de la Muerte en Estados Unidos\n3. de seguro que pensaría en el Sahara u otro desierto\n4. el lugar más soleado del mundo es la Antártida\n5. o a la del Sahara mismo\n6. luego de años de estudios y mediciones\n7. Si a usted le preguntaran cuál es el lugar más soleado del mundo\n8. cuyas radiaciones solares son de 1.81 calorías por minuto en cm²\n9. llegó a esta sorprendente conclusión",
    question: "El orden más adecuado para las anteriores secuencias es:",
    options: [
      { id: "a", text: "1 – 6 – 9 – 4 – 8 – 2 – 5 – 7 – 3" },
      { id: "b", text: "7 – 3 – 1 – 9 – 6 – 4 – 8 – 2 – 5" },
      { id: "c", text: "7 – 3 – 1 – 6 – 9 – 4 – 8 – 2 – 5" },
      { id: "d", text: "1 – 9 – 6 – 4 – 8 – 2 – 5 – 7 – 3" },
    ],
    correct: "c",
    explanation: "El orden lógico comienza con la pregunta hipotética (7), la respuesta común (3), introduce a los investigadores (1), su trabajo (6), la conclusión (9), el resultado (4), los datos (8) y las comparaciones (2, 5).",
    points: 5,
  },
  {
    id: 5,
    category: "Ordenamiento de Párrafos",
    context: "Ordene las siguientes oraciones:\n\n1. La hulla es el carbón mineral más abundante de la naturaleza\n2. A partir de ella se obtienen, por destilación, el gas del alumbrado público, aguas amoniacales y el coque\n3. Para obtenerlo hay que someter la hulla a una destilación seca, eliminando impurezas\n4. Así se logra un residuo compacto y resistente, adecuado para mezclar con el mineral de hierro en el alto horno\n5. Desde el punto de vista químico e industrial, tiene el mayor número de aplicaciones\n6. Este residuo es un recurso indispensable para la metalurgia del hierro",
    question: "El orden más adecuado es:",
    options: [
      { id: "a", text: "1 – 2 – 3 – 6 – 5 – 4" },
      { id: "b", text: "5 – 1 – 2 – 6 – 3 – 4" },
      { id: "c", text: "1 – 5 – 2 – 6 – 3 – 4" },
      { id: "d", text: "1 – 3 – 2 – 5 – 4 – 6" },
    ],
    correct: "c",
    explanation: "Se presenta primero la hulla (1), sus aplicaciones (5), los productos obtenidos (2), el residuo importante (6), el proceso para obtenerlo (3) y sus usos (4).",
    points: 5,
  },
  // Sinonimia
  {
    id: 6,
    category: "Sinonimia",
    question: "Seleccione el sinónimo más adecuado para BALADÍ:",
    options: [
      { id: "a", text: "pobre" },
      { id: "b", text: "confuso" },
      { id: "c", text: "débil" },
      { id: "d", text: "insignificante" },
      { id: "e", text: "anegado" },
    ],
    correct: "d",
    explanation: "BALADÍ significa insignificante, de poca importancia o trivial. Es sinónimo de algo que no tiene valor o trascendencia.",
    points: 5,
  },
  {
    id: 7,
    category: "Sinonimia",
    question: "Seleccione el sinónimo más adecuado para ADULTERAR:",
    options: [
      { id: "a", text: "glosar" },
      { id: "b", text: "parafrasear" },
      { id: "c", text: "falsear" },
      { id: "d", text: "traducir" },
      { id: "e", text: "retorcer" },
    ],
    correct: "c",
    explanation: "ADULTERAR significa falsear, alterar o corromper algo. El término más cercano es falsear.",
    points: 5,
  },
  {
    id: 8,
    category: "Sinonimia",
    question: "Seleccione el sinónimo más adecuado para DOMEÑAR:",
    options: [
      { id: "a", text: "lesión" },
      { id: "b", text: "someter" },
      { id: "c", text: "sometido" },
      { id: "d", text: "espoleado" },
      { id: "e", text: "custodiando" },
    ],
    correct: "b",
    explanation: "DOMEÑAR significa someter, dominar o controlar algo o a alguien.",
    points: 5,
  },
  {
    id: 9,
    category: "Sinonimia",
    question: "Seleccione el sinónimo más adecuado para TENEBROSO:",
    options: [
      { id: "a", text: "triste" },
      { id: "b", text: "oscuro" },
      { id: "c", text: "claro" },
      { id: "d", text: "público" },
      { id: "e", text: "enemigo" },
    ],
    correct: "b",
    explanation: "TENEBROSO significa oscuro, lúgubre o siniestro. Su sinónimo más directo es oscuro.",
    points: 5,
  },
  // Antonimia
  {
    id: 10,
    category: "Antonimia",
    question: "Seleccione el antónimo de AYUDAR:",
    options: [
      { id: "a", text: "impedido" },
      { id: "b", text: "dificultar" },
      { id: "c", text: "estorbado" },
      { id: "d", text: "auxiliar" },
      { id: "e", text: "secundar" },
    ],
    correct: "b",
    explanation: "AYUDAR significa prestar asistencia. Su antónimo es DIFICULTAR, que significa poner obstáculos o hacer más difícil algo.",
    points: 5,
  },
  {
    id: 11,
    category: "Antonimia",
    question: "Seleccione el antónimo de ÓPTIMO:",
    options: [
      { id: "a", text: "bueno" },
      { id: "b", text: "pésimo" },
      { id: "c", text: "malo" },
      { id: "d", text: "superior" },
      { id: "e", text: "pobre" },
    ],
    correct: "b",
    explanation: "ÓPTIMO es el superlativo de bueno (lo mejor posible). Su antónimo es PÉSIMO, que es el superlativo de malo (lo peor posible).",
    points: 5,
  },
  {
    id: 12,
    category: "Antonimia",
    question: "Seleccione el antónimo de LACÓNICO:",
    options: [
      { id: "a", text: "silencioso" },
      { id: "b", text: "parco" },
      { id: "c", text: "hablador" },
      { id: "d", text: "aceptar" },
      { id: "e", text: "callado" },
    ],
    correct: "c",
    explanation: "LACÓNICO significa breve, conciso en el hablar. Su antónimo es HABLADOR, que indica a quien habla mucho o es verboso.",
    points: 5,
  },
  // Analogías
  {
    id: 13,
    category: "Analogías",
    question: "PANADERO es a PAN, como _____ es a _____:",
    options: [
      { id: "a", text: "obra : autor" },
      { id: "b", text: "agricultor : tierra" },
      { id: "c", text: "pintor : cuadro" },
      { id: "d", text: "músico : clarinete" },
      { id: "e", text: "artista : escultura" },
    ],
    correct: "c",
    explanation: "La relación es de productor a producto. El panadero produce pan, así como el pintor produce cuadro. Es una relación de agente-resultado.",
    points: 5,
  },
  {
    id: 14,
    category: "Analogías",
    question: "ÁRBOL es a BOSQUE, como _____ es a _____:",
    options: [
      { id: "a", text: "soldado : ejército" },
      { id: "b", text: "facultad : universidad" },
      { id: "c", text: "grupo : estudiante" },
      { id: "d", text: "elemento : relación" },
      { id: "e", text: "mil : tres mil" },
    ],
    correct: "a",
    explanation: "La relación es de parte a todo o elemento a conjunto. Un árbol forma parte de un bosque, así como un soldado forma parte de un ejército.",
    points: 5,
  },
  {
    id: 15,
    category: "Analogías",
    question: "PALOMA es a PAZ, como _____ es a _____:",
    options: [
      { id: "a", text: "París : luz" },
      { id: "b", text: "antorcha : libertad" },
      { id: "c", text: "punto : foco" },
      { id: "d", text: "balanza : justicia" },
      { id: "e", text: "rojo : atención" },
    ],
    correct: "d",
    explanation: "Es una relación simbólica. La paloma simboliza la paz, así como la balanza simboliza la justicia. Ambos son símbolos de conceptos abstractos.",
    points: 5,
  },
  {
    id: 16,
    category: "Analogías",
    question: "COMPRAR es a VENDER, como _____ es a _____:",
    options: [
      { id: "a", text: "yegua : caballo" },
      { id: "b", text: "bandera : país" },
      { id: "c", text: "broma : humor" },
      { id: "d", text: "dar : recibir" },
      { id: "e", text: "pulmones : oxígeno" },
    ],
    correct: "d",
    explanation: "Es una relación de acciones recíprocas u opuestas complementarias. Comprar es lo opuesto a vender, así como dar es lo opuesto a recibir.",
    points: 5,
  },
  // Completación de oraciones
  {
    id: 17,
    category: "Completación de Oraciones",
    question: "La sumisión a un hombre débil es disciplina. La sumisión a un hombre fuerte es solo ______",
    options: [
      { id: "a", text: "servilismo" },
      { id: "b", text: "capricho" },
      { id: "c", text: "obediente" },
      { id: "d", text: "costumbre" },
      { id: "e", text: "orden" },
    ],
    correct: "a",
    explanation: "SERVILISMO es la palabra correcta porque contrasta con 'disciplina'. La sumisión a quien es fuerte (y podría abusar) se degrada a servilismo, que es sumisión excesiva y degradante.",
    points: 5,
  },
  {
    id: 18,
    category: "Completación de Oraciones",
    question: "Si hallas un camino sin ________ quizás no te lleve a ninguna parte",
    options: [
      { id: "a", text: "fronteras" },
      { id: "b", text: "sentidos" },
      { id: "c", text: "objetivos" },
      { id: "d", text: "límites" },
      { id: "e", text: "obstáculos" },
    ],
    correct: "e",
    explanation: "OBSTÁCULOS es correcto porque la frase sugiere que un camino demasiado fácil (sin obstáculos) puede no conducir a logros valiosos. Los desafíos dan valor al destino.",
    points: 5,
  },
  {
    id: 19,
    category: "Completación de Oraciones",
    question: "Es demasiado ________ en sus escritos: escribe una página cuando es suficiente con una oración",
    options: [
      { id: "a", text: "prolijo" },
      { id: "b", text: "lacónico" },
      { id: "c", text: "expresivo" },
      { id: "d", text: "propicio" },
      { id: "e", text: "agradable" },
    ],
    correct: "a",
    explanation: "PROLIJO significa extenso en exceso, que se extiende demasiado. Describe perfectamente a quien escribe más de lo necesario.",
    points: 5,
  },
  // Conectores
  {
    id: 20,
    category: "Conectores Lógicos",
    context: "A mi modo de ver, escribir es tanto como componer. ______, es reunir varias piezas en un todo, de manera que cada parte se relacione armónicamente con las demás. ________, la escritura es un trabajo artesanal de trato, de lucha con las palabras. __________, escribir es un trabajo en el sentido de esfuerzo, de transpiración. _________ la inspiración solo es un motivo de inicio, mas no por ello se recomienda confiar demasiado en ella.",
    question: "Complete el texto con los conectores adecuados:",
    options: [
      { id: "a", text: "Es decir / De hecho / En contraste / Por ello" },
      { id: "b", text: "En primer lugar / En segundo lugar / En tercer lugar / Por último" },
      { id: "c", text: "Además / Por ejemplo / Por lo anterior / En síntesis" },
      { id: "d", text: "Esto es / En detalle / También / De pronto" },
      { id: "e", text: "En otras palabras / Según lo anterior / En definitiva / Esto significa que" },
    ],
    correct: "e",
    explanation: "'En otras palabras' explica lo que significa componer; 'Según lo anterior' continúa la idea; 'En definitiva' sintetiza; 'Esto significa que' concluye el razonamiento.",
    points: 5,
  },
  // Comprensión Lectora
  {
    id: 21,
    category: "Comprensión Lectora",
    context: "La comprensión lectora es la capacidad de entender lo que se lee, permitiendo captar los postulados del autor e interpretar sus argumentos principales. Tener buena comprensión implica concentración, dejar de lado distracciones y utilizar herramientas y estrategias, no solo inteligencia, para leer de forma más efectiva. La comprensión integral exige dominar varios niveles: literal, interpretativa, inferencial y comparativa, cada uno enfocado en distintos procesos cognitivos.",
    question: "Según el texto, ¿qué implica tener buena comprensión lectora?",
    options: [
      { id: "a", text: "Únicamente tener alta inteligencia" },
      { id: "b", text: "Concentración, evitar distracciones y usar estrategias de lectura" },
      { id: "c", text: "Leer rápidamente sin detenerse" },
      { id: "d", text: "Memorizar todo el contenido del texto" },
      { id: "e", text: "Leer en voz alta para mejor retención" },
    ],
    correct: "b",
    explanation: "El texto indica explícitamente que la buena comprensión 'implica concentración, dejar de lado distracciones y utilizar herramientas y estrategias, no solo inteligencia'.",
    points: 5,
  },
  {
    id: 22,
    category: "Comprensión Lectora",
    context: "Los textos descriptivos se caracterizan por presentar caracterizaciones y contextualizaciones detalladas. En este tipo de texto, las ideas principales suelen girar alrededor de las descripciones del contenido. Por otro lado, en textos argumentativos, las ideas principales generalmente están al inicio o al final de los párrafos, siguiendo los postulados del autor. Los textos dialógicos requieren localizar contraargumentos en el enunciado y analizar cómo influyen en los postulados expuestos.",
    question: "¿Dónde se localizan típicamente las ideas principales en un texto argumentativo?",
    options: [
      { id: "a", text: "En la mitad de cada párrafo" },
      { id: "b", text: "Distribuidas uniformemente en todo el texto" },
      { id: "c", text: "Al inicio o al final de los párrafos" },
      { id: "d", text: "Exclusivamente en las descripciones" },
      { id: "e", text: "En los contraargumentos del texto" },
    ],
    correct: "c",
    explanation: "El texto establece claramente que 'en textos argumentativos, las ideas principales generalmente están al inicio o al final de los párrafos, siguiendo los postulados del autor'.",
    points: 5,
  },
  {
    id: 23,
    category: "Comprensión Lectora",
    context: "Para comprender un texto efectivamente, se recomienda seguir cinco pasos fundamentales: (1) Atención selectiva: mantener una actividad continua sin distraerse por estímulos externos. (2) Análisis secuencial: asociar significados de palabras y dar sentido global mediante relaciones causa-efecto. (3) Síntesis textual: reducir el texto identificando ideas principales y palabras clave. (4) Memoria a corto plazo: asociar y recordar el texto siguiendo su secuencia. (5) Memoria a largo plazo: vincular nuevos contenidos con aprendizajes previos.",
    question: "Según el texto, ¿qué proceso implica el análisis secuencial?",
    options: [
      { id: "a", text: "Mantener concentración sin distracciones externas" },
      { id: "b", text: "Asociar significados de palabras y establecer relaciones causa-efecto" },
      { id: "c", text: "Reducir el texto a sus ideas principales" },
      { id: "d", text: "Recordar el texto en su orden original" },
      { id: "e", text: "Vincular nuevos contenidos con conocimientos previos" },
    ],
    correct: "b",
    explanation: "El análisis secuencial se define explícitamente en el texto como 'asociar significados de palabras y dar sentido global mediante relaciones causa-efecto'.",
    points: 5,
  },
  // Análisis de Gráficos
  {
    id: 24,
    category: "Análisis de Gráficos",
    context: "Un gráfico representa visual o numéricamente relaciones entre datos mediante figuras, tablas, mapas, fotografías o pictogramas. Se usa para sintetizar, clarificar y resaltar información importante. Para leer correctamente una tabla, se deben seguir estos pasos: leer el título, revisar subtítulos de columnas y filas, observar el cuerpo de la tabla, considerar notas al pie e inferir lo expresado a partir del conjunto.",
    question: "Según el texto, ¿cuál es el primer paso para leer correctamente una tabla?",
    options: [
      { id: "a", text: "Observar el cuerpo de la tabla" },
      { id: "b", text: "Considerar las notas al pie" },
      { id: "c", text: "Leer el título de la tabla" },
      { id: "d", text: "Revisar únicamente las columnas" },
      { id: "e", text: "Inferir las conclusiones generales" },
    ],
    correct: "c",
    explanation: "El texto establece claramente el orden de pasos para leer una tabla, siendo el primero 'leer el título'.",
    points: 5,
  },
  {
    id: 25,
    category: "Análisis de Gráficos",
    context: "Para leer un gráfico lineal efectivamente, se deben seguir cuatro pasos: (1) Leer el título del gráfico. (2) Identificar la abscisa (eje horizontal) y la ordenada (eje vertical). (3) Observar la tendencia de la línea: si es ascendente, descendente o horizontal. (4) Inferir lo que expresa el gráfico a partir de toda la información.",
    question: "¿Qué información proporciona observar si la línea es ascendente, descendente u horizontal en un gráfico lineal?",
    options: [
      { id: "a", text: "El título del gráfico" },
      { id: "b", text: "Los valores exactos de cada punto" },
      { id: "c", text: "La tendencia o comportamiento de los datos" },
      { id: "d", text: "La diferencia entre abscisa y ordenada" },
      { id: "e", text: "Las unidades de medida utilizadas" },
    ],
    correct: "c",
    explanation: "Observar la tendencia de la línea (ascendente, descendente, horizontal) permite identificar el comportamiento y la dirección de los datos representados en el gráfico.",
    points: 5,
  },
  {
    id: 26,
    category: "Análisis de Gráficos",
    context: "En un gráfico de barras, es importante: (1) Leer el título. (2) Identificar la abscisa (variable independiente) y la ordenada (variable dependiente). (3) Asociar los colores con su significado. (4) Comparar alturas entre barras de distinto y mismo color. (5) Inferir lo expresado. Por ejemplo, en un gráfico sobre escolaridad por año con categorías Primaria, Secundaria y Universitaria, se pueden comparar variaciones por periodo.",
    question: "¿Qué permite comparar las alturas de las barras en un gráfico de barras?",
    options: [
      { id: "a", text: "El título del gráfico únicamente" },
      { id: "b", text: "Las diferencias y similitudes entre las variables representadas" },
      { id: "c", text: "Solo los colores utilizados" },
      { id: "d", text: "Exclusivamente la variable independiente" },
      { id: "e", text: "Las notas al pie del gráfico" },
    ],
    correct: "b",
    explanation: "Comparar las alturas de las barras permite identificar diferencias y similitudes entre las variables representadas, tanto de distinto como del mismo color.",
    points: 5,
  },
  // Estrategias de Lectura
  {
    id: 27,
    category: "Estrategias de Lectura",
    context: "Para resolver ítems de selección múltiple efectivamente, se recomienda: identificar el tipo de pregunta (literal, inferencial, argumentativa), repetir la pregunta con tus propias palabras, tener cuidado con negaciones ('no', 'excepto', 'no es correcto'), detectar palabras clave comunes entre texto, enunciado y opciones, y descartar opciones descabelladas si no se sabe la respuesta.",
    question: "¿Por qué es importante tener cuidado con las negaciones en las preguntas?",
    options: [
      { id: "a", text: "Porque hacen la pregunta más larga" },
      { id: "b", text: "Porque invierten el criterio de selección" },
      { id: "c", text: "Porque siempre indican la respuesta correcta" },
      { id: "d", text: "Porque no tienen relevancia en el contenido" },
      { id: "e", text: "Porque facilitan encontrar la respuesta" },
    ],
    correct: "b",
    explanation: "El texto advierte que las negaciones 'invierten el criterio de selección', lo que puede confundir al lector si no se identifica correctamente.",
    points: 5,
  },
  {
    id: 28,
    category: "Estrategias de Lectura",
    context: "Las palabras clave facilitan reconocer estructura, argumentos y conclusiones, y sirven como guía para localizar la información pertinente. Se recomienda detectar palabras clave comunes entre texto, enunciado y opciones, ya que la respuesta correcta suele compartir términos núcleo con el contenido base. Además, identificar las ideas principales ayuda a resaltar lo relevante y no distraerse con lo intrascendente.",
    question: "¿Qué ventaja tiene identificar palabras clave comunes entre el texto y las opciones de respuesta?",
    options: [
      { id: "a", text: "Hace el texto más difícil de comprender" },
      { id: "b", text: "La respuesta correcta suele compartir términos núcleo con el contenido" },
      { id: "c", text: "Elimina la necesidad de leer el texto completo" },
      { id: "d", text: "Garantiza automáticamente la respuesta correcta" },
      { id: "e", text: "Reduce el número de opciones a una sola" },
    ],
    correct: "b",
    explanation: "El texto indica que 'la respuesta correcta suele compartir términos núcleo con el contenido base', por lo que identificar palabras clave comunes es una estrategia efectiva.",
    points: 5,
  },
  {
    id: 29,
    category: "Estrategias de Lectura",
    context: "La estructura de los ítems en pruebas CNSC incluye: (1) Contexto: puede ser texto, imagen o gráfica; actúa como referencia o información indirecta. (2) Enunciado: plantea la problemática a resolver de manera clara y suficiente. (3) Opciones de respuesta: son posibles soluciones con distractores plausibles. (4) Clave: opción correcta que se distingue por su contenido, no por sutilezas lingüísticas.",
    question: "¿Cómo se distingue la clave (respuesta correcta) de las demás opciones?",
    options: [
      { id: "a", text: "Por sutilezas lingüísticas y gramática compleja" },
      { id: "b", text: "Por ser siempre la opción más larga" },
      { id: "c", text: "Por su contenido, no por sutilezas lingüísticas" },
      { id: "d", text: "Por estar ubicada en una posición específica" },
      { id: "e", text: "Por usar palabras más complejas" },
    ],
    correct: "c",
    explanation: "El texto establece claramente que la clave 'se distingue por su contenido, no por sutilezas lingüísticas'.",
    points: 5,
  },
  {
    id: 30,
    category: "Estrategias de Lectura",
    context: "Se recomienda leer primero todas las preguntas con opciones, cuando sea conveniente, para saber qué identificar en el texto, ganar velocidad y reconocer respuestas conocidas durante la lectura. Antes de atribuir fallas a quien redacta las preguntas o al texto, conviene preguntarse: ¿analizo bien la pregunta?, ¿leo en el orden más provechoso?, ¿sé identificar la información relevante?",
    question: "¿Cuál es la principal ventaja de leer las preguntas antes del texto cuando sea conveniente?",
    options: [
      { id: "a", text: "Permite omitir la lectura del texto completo" },
      { id: "b", text: "Saber qué identificar en el texto y ganar velocidad" },
      { id: "c", text: "Garantiza respuestas correctas automáticamente" },
      { id: "d", text: "Hace innecesaria la comprensión profunda" },
      { id: "e", text: "Reduce el número de preguntas a responder" },
    ],
    correct: "b",
    explanation: "El texto indica que leer las preguntas primero ayuda 'para saber qué identificar en el texto, ganar velocidad y reconocer respuestas conocidas durante la lectura'.",
    points: 5,
  },
  {
    id: 31,
    category: "Comprensión Lectora",
    context:
      "El documento \"Presentación Juicio Situacional\", elaborado por Juan David Mejía Balvín, se organiza en módulos como \"Comprensión de lectura en 5 pasos\", \"La comprensión de lectura con base en análisis de gráficos\", \"Comprensión de lectura aplicada a la resolución de pruebas\" y \"La práctica de la comprensión lectora en la estructura de los ítems\". Su propósito es ofrecer estrategias entrenables para convocatorias públicas de la CNSC, enfocadas en leer con atención, identificar ideas principales y elegir respuestas correctas.",
    question: "¿Cuál es el propósito central del material presentado por Juan David Mejía Balvín?",
    options: [
      { id: "a", text: "Resumir exclusivamente la trayectoria profesional del autor." },
      {
        id: "b",
        text: "Ofrecer estrategias entrenables para mejorar la comprensión lectora y la resolución de ítems en convocatorias públicas.",
      },
      { id: "c", text: "Publicar las calificaciones históricas de la CNSC sin análisis." },
      { id: "d", text: "Explicar la jurisprudencia disciplinaria reciente de la función pública." },
      { id: "e", text: "Presentar resultados estadísticos sin recomendaciones prácticas." },
    ],
    correct: "b",
    explanation:
      "El texto resalta que la presentación busca compartir estrategias entrenables para leer con atención, identificar ideas principales y acertar en los ítems siguiendo metodologías de la CNSC.",
    points: 5,
  },
  {
    id: 32,
    category: "Comprensión Lectora",
    context:
      "El logro integral en comprensión se alcanza aplicando niveles complementarios: literal, interpretativa, inferencial y comparativa. El nivel literal aborda información local, estructura y vocabulario; el interpretativo busca el sentido global con apoyo de conocimientos previos; el inferencial deduce información implícita; y el comparativo enlaza el texto con otros previamente leídos.",
    question: "¿Qué caracteriza al nivel comparativa de comprensión lectora?",
    options: [
      { id: "a", text: "Se limita a definir vocabulario y estructuras gramaticales básicas." },
      { id: "b", text: "Busca el sentido global del texto apoyándose en conocimientos previos." },
      { id: "c", text: "Relaciona el texto con otros leídos con anterioridad para establecer vínculos." },
      { id: "d", text: "Deduce información implícita a partir de pistas contextuales." },
      { id: "e", text: "Memoriza todos los detalles y ejemplos del texto sin analizarlos." },
    ],
    correct: "c",
    explanation:
      "El documento indica que la comprensión comparativa enlaza el texto actual con otros previamente leídos, estableciendo relaciones intertextuales.",
    points: 5,
  },
  {
    id: 33,
    category: "Comprensión Lectora",
    context:
      "La comprensión se modela con cinco procesos encadenados: Atención selectiva, Análisis secuencial, Síntesis textual, Memoria a corto plazo y Memoria a largo plazo. La Síntesis textual implica reducir el texto identificando ideas principales y palabras clave, comparando detalles y detectando relaciones causa–efecto para deducir los componentes esenciales.",
    question: "¿Cuál es el objetivo de la etapa de Síntesis textual en los cinco pasos de comprensión?",
    options: [
      { id: "a", text: "Mantener la concentración sin distraerse con estímulos externos." },
      { id: "b", text: "Asociar significados palabra a palabra para otorgar claridad global." },
      { id: "c", text: "Reducir el texto a ideas principales y palabras clave para extraer lo esencial." },
      { id: "d", text: "Recordar la secuencia exacta del texto tal como fue presentado." },
      { id: "e", text: "Relacionar nuevos contenidos con aprendizajes previos de largo plazo." },
    ],
    correct: "c",
    explanation:
      "La Síntesis textual busca condensar la información destacando ideas principales, palabras clave y relaciones causa–efecto, lo que permite quedarse con lo esencial.",
    points: 5,
  },
  {
    id: 34,
    category: "Comprensión Lectora",
    context:
      "El paso de Atención selectiva propone entrenar la concentración para sostener la lectura sin distraerse. El documento sugiere practicar con estímulos como música, internet o conversaciones, fortaleciendo la capacidad de mantener el foco en la lectura a pesar de los distractores.",
    question: "¿Cómo recomienda el documento entrenar la atención selectiva?",
    options: [
      { id: "a", text: "Evitar toda práctica de lectura hasta el día de la prueba." },
      {
        id: "b",
        text: "Leer y concentrarse aun en presencia de estímulos como música o internet para fortalecer el foco atencional.",
      },
      { id: "c", text: "Memorizar definiciones sin volver a leer los textos de referencia." },
      { id: "d", text: "Revisar solo los títulos y omitir los párrafos de desarrollo." },
      { id: "e", text: "Depender únicamente de la inspiración del día del examen." },
    ],
    correct: "b",
    explanation:
      "El documento sugiere practicar la lectura mientras se gestionan estímulos distractores, de modo que la concentración se fortalezca y se sostenga la atención en el texto.",
    points: 5,
  },
  {
    id: 35,
    category: "Análisis de Gráficos",
    context:
      "En el ejemplo \"Rendimiento de un estudiante en un curso\", el gráfico lineal presenta en el eje vertical (ordenada) la puntuación de 0 a 10 y en el eje horizontal (abscisa) el número de lección entre 0 y 10, lo que permite observar la variación del desempeño a lo largo del curso.",
    question: "En el gráfico lineal del ejemplo citado, ¿qué representa la abscisa?",
    options: [
      { id: "a", text: "La puntuación obtenida por el estudiante." },
      { id: "b", text: "El número de lección dentro del curso." },
      { id: "c", text: "El promedio final del curso respecto al grupo." },
      { id: "d", text: "La cantidad de gráficos analizados durante la prueba." },
      { id: "e", text: "El porcentaje de asistencia a las sesiones." },
    ],
    correct: "b",
    explanation:
      "La abscisa corresponde al eje horizontal, donde el ejemplo ubica el número de lección para seguir la evolución del rendimiento a lo largo del curso.",
    points: 5,
  },
  {
    id: 36,
    category: "Análisis de Gráficos",
    context:
      "El ejemplo de tabla \"Competencias evaluadas a los concursantes nivel profesional – Convocatoria 429 de 2016 – Antioquia\" incluye una nota al pie que contextualiza la información presentada en columnas de Código OPEC y Nivel.",
    question: "¿Qué señala la nota al pie incluida en la tabla del ejemplo?",
    options: [
      { id: "a", text: "Que la tabla corresponde a la convocatoria 2023 sin ajustes previos." },
      { id: "b", text: "Que las competencias fueron modificadas por el acuerdo N° 00047628293 de 2017." },
      { id: "c", text: "Que los códigos OPEC fueron eliminados del proceso de evaluación." },
      { id: "d", text: "Que únicamente se evaluó el nivel asistencial durante la convocatoria." },
      { id: "e", text: "Que los datos registrados son estimaciones sin soporte documental." },
    ],
    correct: "b",
    explanation:
      "La nota al pie indica expresamente que las competencias fueron modificadas por el acuerdo N° 00047628293 de 2017, información necesaria para interpretar la tabla.",
    points: 5,
  },
  {
    id: 37,
    category: "Estrategias de Lectura",
    context:
      "Entre los tips para resolver ítems, el documento recomienda repetir la pregunta con tus palabras para clarificar redacciones técnicas o 'cáscaras' que elevan la dificultad aparente y para asegurarse de comprender lo solicitado antes de revisar las opciones.",
    question: "¿Cuál es la finalidad principal de repetir la pregunta con tus propias palabras?",
    options: [
      { id: "a", text: "Ganar tiempo sin necesidad de leer el texto base." },
      {
        id: "b",
        text: "Clarificar redacciones técnicas o engaños y asegurar que se comprende lo que realmente se pide.",
      },
      { id: "c", text: "Evitar identificar palabras clave que coinciden con el texto." },
      { id: "d", text: "Reducir automáticamente el número de opciones disponibles." },
      { id: "e", text: "Recordar las notas al pie sin volver al enunciado." },
    ],
    correct: "b",
    explanation:
      "Repetir la pregunta con palabras propias ayuda a despejar términos técnicos o trampas, confirmando qué se solicita antes de contrastar las opciones.",
    points: 5,
  },
  {
    id: 38,
    category: "Estrategias de Lectura",
    context:
      "La recomendación clave del documento plantea que, antes de atribuir fallas a redactores o textos, conviene cuestionar la propia estrategia: analizar si se comprende bien la pregunta, qué conviene leer primero, si se identificó la información relevante y por qué persisten dudas entre opciones.",
    question: "Según la recomendación clave, ¿qué debe hacer el aspirante antes de culpar al enunciado o al redactor?",
    options: [
      { id: "a", text: "Solicitar la anulación del ítem sin análisis previo." },
      { id: "b", text: "Cuestionar su propio análisis, orden de lectura e identificación de información relevante." },
      { id: "c", text: "Buscar la respuesta en foros o redes sociales." },
      { id: "d", text: "Elegir la primera opción que parezca familiar." },
      { id: "e", text: "Suspender la prueba hasta recibir confirmación oficial." },
    ],
    correct: "b",
    explanation:
      "El documento propone una revisión metacognitiva que incluye evaluar cómo se analizó la pregunta, el orden de lectura y la identificación de información antes de responsabilizar al enunciado.",
    points: 5,
  },
  {
    id: 39,
    category: "Estrategias de Lectura",
    context:
      "Los procesos cognitivos que sustentan la comprensión se agrupan en recuerdo (ideas, conceptos, modelos, principios, teorías), comprensión (parafrasear, interpretar, reorganizar, extrapolar) y aplicación (transferir información y resolver problemas), incorporando conocimiento mediante inteligencia, atención, memoria y lenguaje.",
    question: "¿Qué acciones describe el enfoque de comprensión dentro de los procesos cognitivos mencionados?",
    options: [
      { id: "a", text: "Recordar datos y definiciones sin analizarlos." },
      { id: "b", text: "Parafrasear, interpretar, reorganizar y extrapolar la información leída." },
      { id: "c", text: "Registrar únicamente modelos y teorías para memorizarlos." },
      { id: "d", text: "Aplicar el conocimiento en situaciones prácticas sin reflexión." },
      { id: "e", text: "Reducir la lectura a identificar la longitud de cada párrafo." },
    ],
    correct: "b",
    explanation:
      "El enfoque de comprensión implica transformar la información: parafrasear, interpretar, reorganizar y extrapolar, a diferencia del simple recuerdo o de la aplicación directa.",
    points: 5,
  },
  {
    id: 40,
    category: "Comprensión Lectora",
    context:
      "La presentación \"Sistema de Gestión en Seguridad y Salud en el Trabajo\" fue elaborada por Estefany Fierro Carbonell, especialista en SST, e incluye una diapositiva final de agradecimiento y espacio para preguntas.",
    question: "¿Quién lidera la presentación sobre el Sistema de Gestión en Seguridad y Salud en el Trabajo?",
    options: [
      { id: "a", text: "Juan David Mejía Balvín, especialista en convocatorias públicas." },
      { id: "b", text: "Estefany Fierro Carbonell, especialista en SST." },
      { id: "c", text: "María Fernanda Suárez, ministra de Minas y Energía." },
      { id: "d", text: "Germán Vargas Lleras, ex ministro de Trabajo." },
      { id: "e", text: "Carlos Mario Estrada, director del SENA." },
    ],
    correct: "b",
    explanation:
      "El documento identifica a Estefany Fierro Carbonell, especialista en SST, como responsable de la presentación sobre el SG-SST.",
    points: 5,
  },
  {
    id: 41,
    category: "Comprensión Lectora",
    context:
      "El objetivo de la presentación es orientar a los servidores públicos sobre sus responsabilidades en Seguridad y Salud en el Trabajo dentro del Sistema de Gestión Integrado y de la regulación del SG-SST, aclarando qué exige la norma y qué obligaciones recaen en cada actor.",
    question: "¿Cuál es el propósito operativo del material descrito?",
    options: [
      { id: "a", text: "Difundir estadísticas de accidentalidad sin recomendaciones." },
      {
        id: "b",
        text: "Explicar exigencias normativas, estructura y obligaciones del SG-SST a los servidores públicos.",
      },
      { id: "c", text: "Promocionar servicios privados de asesoría en riesgos laborales." },
      { id: "d", text: "Presentar estudios de caso internacionales de forma anecdótica." },
      { id: "e", text: "Anunciar cambios en la nómina institucional para 2025." },
    ],
    correct: "b",
    explanation:
      "La presentación busca que los servidores comprendan las exigencias normativas, la estructura del sistema y las responsabilidades de cada actor en el SG-SST.",
    points: 5,
  },
  {
    id: 42,
    category: "Comprensión Lectora",
    context:
      "El contenido se organiza en tres bloques: Fundamentos conceptuales y reglamentarios, Estructura del SG-SST y Obligaciones del SG-SST. Además, se inicia con la diapositiva \"¿Qué sabemos del SG-SST?\" para activar conocimientos previos.",
    question: "¿Cómo se estructura el contenido principal de la presentación?",
    options: [
      { id: "a", text: "Política económica, análisis financiero y cierre contable." },
      { id: "b", text: "Diagnóstico de clientes, marketing institucional y evaluación comercial." },
      {
        id: "c",
        text: "Fundamentos conceptuales y reglamentarios, estructura del SG-SST y obligaciones del SG-SST.",
      },
      { id: "d", text: "Historia del derecho laboral, derecho civil y derecho internacional público." },
      { id: "e", text: "Gestión del talento humano, planeación de nómina y bienestar recreativo." },
    ],
    correct: "c",
    explanation:
      "La presentación organiza el estudio en tres bloques centrales: fundamentos, estructura y obligaciones del SG-SST.",
    points: 5,
  },
  {
    id: 43,
    category: "Comprensión Lectora",
    context:
      "El Sistema de Seguridad Social Integral articula los subsistemas de salud, pensiones y riesgos laborales, así como las prestaciones familiares, a través de entidades como EPS, AFP, ARL y Cajas de Compensación Familiar para cubrir contingencias como enfermedad, invalidez, vejez y accidentes de trabajo.",
    question: "¿Qué describe el material como marco de referencia del SG-SST?",
    options: [
      { id: "a", text: "Exclusivamente la red hospitalaria pública." },
      {
        id: "b",
        text: "El Sistema de Seguridad Social Integral y sus actores (EPS, AFP, ARL, Cajas de Compensación).",
      },
      { id: "c", text: "Únicamente el Ministerio de Hacienda y la Dian." },
      { id: "d", text: "El régimen especial de las fuerzas militares." },
      { id: "e", text: "La Superintendencia de Industria y Comercio." },
    ],
    correct: "b",
    explanation:
      "La presentación ubica al SG-SST dentro del Sistema de Seguridad Social Integral, integrando salud, pensiones, riesgos laborales y prestaciones familiares.",
    points: 5,
  },
  {
    id: 44,
    category: "Comprensión Lectora",
    context:
      "La responsabilidad legal en Seguridad y Salud en el Trabajo se clasifica en ámbitos laboral, civil, penal y administrativo, resaltando el deber del empleador de proteger a los trabajadores y afiliarse al sistema de riesgos laborales.",
    question: "¿Qué ámbitos componen la responsabilidad legal en SST según la presentación?",
    options: [
      { id: "a", text: "Laboral, civil, penal y administrativa." },
      { id: "b", text: "Mercantil, tributaria, aduanera y ambiental." },
      { id: "c", text: "Fiscal, electoral, patrimonial y contractual." },
      { id: "d", text: "Tecnológica, reputacional, logística y comunitaria." },
      { id: "e", text: "Académica, disciplinaria, pedagógica y social." },
    ],
    correct: "a",
    explanation:
      "El documento enfatiza que la responsabilidad en SST se aborda en cuatro frentes: laboral, civil, penal y administrativa.",
    points: 5,
  },
  {
    id: 45,
    category: "Comprensión Lectora",
    context:
      "La responsabilidad laboral del empleador abarca regímenes objetivo y subjetivo. La objetiva se origina en el riesgo laboral y no admite eximentes, mientras que la subjetiva exige probar culpa y conlleva indemnización plena de perjuicios.",
    question: "¿Qué caracteriza la responsabilidad objetiva del empleador en SST?",
    options: [
      { id: "a", text: "Se basa en la culpa comprobada del trabajador." },
      { id: "b", text: "Permite eximir al empleador si delega la tarea a un contratista." },
      {
        id: "c",
        text: "Surge por la existencia del riesgo laboral y no admite eximentes cuando se prueba el nexo causal.",
      },
      { id: "d", text: "Implica únicamente sanciones disciplinarias internas." },
      { id: "e", text: "Se limita a daños materiales sobre maquinaria." },
    ],
    correct: "c",
    explanation:
      "La responsabilidad objetiva nace de la materialización del riesgo laboral y obliga al empleador incluso sin necesidad de demostrar culpa.",
    points: 5,
  },
  {
    id: 46,
    category: "Comprensión Lectora",
    context:
      "La línea normativa del SG-SST incluye antecedentes como la Ley 9 de 1979 y la Resolución 1016 de 1989, y bases vigentes como la Ley 1562 de 2012, el Decreto 1072 de 2015, el Decreto 472 de 2015 y la Resolución 312 de 2019.",
    question: "¿Cuál de las siguientes normas hace parte de la base normativa vigente del SG-SST mencionada?",
    options: [
      { id: "a", text: "Ley 152 de 1994 de planes de desarrollo." },
      { id: "b", text: "Ley 1562 de 2012 sobre riesgos laborales." },
      { id: "c", text: "Ley 99 de 1993 del Ministerio de Ambiente." },
      { id: "d", text: "Decreto 019 de 2012 de eliminación de trámites." },
      { id: "e", text: "Resolución 1151 de 2022 de conectividad digital." },
    ],
    correct: "b",
    explanation:
      "La Ley 1562 de 2012 es parte del conjunto normativo vigente que fundamenta el SG-SST en Colombia.",
    points: 5,
  },
  {
    id: 47,
    category: "Comprensión Lectora",
    context:
      "Entre las actualizaciones normativas de 2025 se encuentra la Circular 009 sobre autoevaluación de estándares mínimos 2024, el Decreto 0405 sobre multas por despido de denunciantes de acoso sexual y la Resolución 1843 sobre evaluaciones médicas ocupacionales, entre otras disposiciones emitidas por los ministerios de Trabajo y de Salud.",
    question: "¿Qué establece la Circular 009 de 2025 mencionada en la presentación?",
    options: [
      { id: "a", text: "El cierre definitivo de empresas reincidentes en incumplimientos." },
      { id: "b", text: "El manual de señalización de ambientes 100% libres de humo." },
      {
        id: "c",
        text: "El plazo para registrar la autoevaluación de estándares mínimos del SG-SST correspondiente a 2024.",
      },
      { id: "d", text: "Los contenidos mínimos del curso de 20 horas del SG-SST." },
      { id: "e", text: "La adopción de la Política Nacional de Salud Mental 2025-2034." },
    ],
    correct: "c",
    explanation:
      "La Circular 009 de 2025 fija el plazo para reportar la autoevaluación de estándares mínimos del SG-SST del año 2024.",
    points: 5,
  },
  {
    id: 48,
    category: "Comprensión Lectora",
    context:
      "El SG-SST aplica a todos los empleadores públicos y privados, contratantes civiles, comerciales o administrativos, organizaciones de economía solidaria, empresas de servicios temporales y trabajadores dependientes, contratistas, cooperados y en misión.",
    question: "¿A quiénes se aplica obligatoriamente el SG-SST según el documento?",
    options: [
      { id: "a", text: "Solo a empresas privadas con más de 50 trabajadores." },
      {
        id: "b",
        text: "A empleadores públicos y privados, contratantes y trabajadores dependientes o contratistas vinculados.",
      },
      { id: "c", text: "Exclusivamente a entidades del sector salud." },
      { id: "d", text: "Únicamente a cooperativas de trabajo asociado." },
      { id: "e", text: "Solo a empresas con capital extranjero." },
    ],
    correct: "b",
    explanation:
      "El alcance del SG-SST cubre a todos los empleadores y contratantes, así como a trabajadores dependientes, contratistas y cooperados que desarrollan actividades bajo su control.",
    points: 5,
  },
  {
    id: 49,
    category: "Comprensión Lectora",
    context:
      "La Seguridad y Salud en el Trabajo se define como la disciplina que previene lesiones y enfermedades causadas por las condiciones laborales, promueve la salud del trabajador y busca mantener el bienestar físico, mental y social en todas las ocupaciones.",
    question: "¿Qué describe la definición de Seguridad y Salud en el Trabajo incluida en la presentación?",
    options: [
      { id: "a", text: "Un programa recreativo para familias de servidores públicos." },
      { id: "b", text: "Una estrategia de mercadeo para empresas de seguros privados." },
      {
        id: "c",
        text: "La disciplina orientada a prevenir lesiones y enfermedades laborales y a promover el bienestar integral del trabajador.",
      },
      { id: "d", text: "Un procedimiento exclusivo para industrias extractivas." },
      { id: "e", text: "Un esquema voluntario de certificación empresarial sin implicaciones legales." },
    ],
    correct: "c",
    explanation:
      "La presentación define la SST como la disciplina que previene lesiones, protege la salud y asegura el bienestar integral de las personas en el trabajo.",
    points: 5,
  },
  {
    id: 50,
    category: "Comprensión Lectora",
    context:
      "El ciclo PHVA (Planear, Hacer, Verificar y Actuar) se presenta como la columna vertebral del SG-SST para lograr la mejora continua mediante la planificación, la implementación, la comprobación y las acciones correctivas.",
    question: "¿Qué papel cumple el ciclo PHVA dentro del SG-SST?",
    options: [
      { id: "a", text: "Sustituir el cumplimiento normativo por auditorías externas." },
      { id: "b", text: "Definir los planes de mercadeo de las entidades públicas." },
      {
        id: "c",
        text: "Servir como base de la mejora continua articulando planificación, ejecución, verificación y acciones correctivas.",
      },
      { id: "d", text: "Eliminar la participación de la alta dirección en el sistema." },
      { id: "e", text: "Delimitar las sanciones económicas aplicables al empleador." },
    ],
    correct: "c",
    explanation:
      "El ciclo PHVA es el esquema de mejora continua que integra las etapas de planeación, ejecución, verificación y actuación en el SG-SST.",
    points: 5,
  },
  {
    id: 51,
    category: "Comprensión Lectora",
    context:
      "La fase de planificación del SG-SST comprende la evaluación inicial, la identificación de peligros y valoración de riesgos, la definición de políticas y objetivos, el plan de trabajo, la capacitación, los indicadores y la comunicación/documentación.",
    question: "¿Cuál de las siguientes actividades pertenece a la fase de planificación del SG-SST?",
    options: [
      { id: "a", text: "Realizar la auditoría de investigación de accidentes laborales." },
      { id: "b", text: "Responder a emergencias en campo mediante brigadas." },
      { id: "c", text: "Elaborar el plan de trabajo con objetivos, indicadores y programas de capacitación." },
      { id: "d", text: "Aplicar sanciones disciplinarias a trabajadores infractores." },
      { id: "e", text: "Cerrar temporalmente instalaciones por orden de autoridad." },
    ],
    correct: "c",
    explanation:
      "La planificación del SG-SST incluye la elaboración del plan de trabajo con objetivos, indicadores y acciones formativas.",
    points: 5,
  },
  {
    id: 52,
    category: "Comprensión Lectora",
    context:
      "Los actores clave del SG-SST identificados son el empleador, los trabajadores, la ARL y los comités y brigadas de apoyo que acompañan la gestión.",
    question: "¿Quiénes se reconocen como actores principales del SG-SST?",
    options: [
      { id: "a", text: "El Congreso de la República y las altas cortes." },
      { id: "b", text: "Los proveedores externos de bienes y los clientes finales." },
      { id: "c", text: "El empleador, los trabajadores, la ARL y los comités o brigadas internas." },
      { id: "d", text: "Las juntas de acción comunal y las veedurías ciudadanas." },
      { id: "e", text: "Las empresas de vigilancia privada y los sindicatos internacionales." },
    ],
    correct: "c",
    explanation:
      "La presentación destaca al empleador, los trabajadores, la ARL y los comités o brigadas como actores esenciales del SG-SST.",
    points: 5,
  },
  {
    id: 53,
    category: "Comprensión Lectora",
    context:
      "Entre las obligaciones del empleador se encuentran definir, firmar y divulgar la política SST, implementar el plan anual, gestionar riesgos, asegurar la participación de los trabajadores, asignar responsabilidades, garantizar capacitación dentro de la jornada y reportar resultados a la alta dirección.",
    question: "¿Cuál es una obligación específica del empleador dentro del SG-SST?",
    options: [
      { id: "a", text: "Solicitar a los trabajadores que costeen su capacitación en horario extra laboral." },
      {
        id: "b",
        text: "Definir, firmar y divulgar la política de SST e integrar el sistema a procesos y decisiones corporativas.",
      },
      { id: "c", text: "Delegar la gestión de riesgos únicamente en la ARL." },
      { id: "d", text: "Limitar el plan de trabajo a actividades recreativas voluntarias." },
      { id: "e", text: "Reducir la inversión en SST cuando no se presenten accidentes." },
    ],
    correct: "b",
    explanation:
      "El empleador debe formular y divulgar la política SST, integrar el sistema a la gestión corporativa y garantizar recursos y participación.",
    points: 5,
  },
  {
    id: 54,
    category: "Comprensión Lectora",
    context:
      "Las ARL deben capacitar al COPASST o vigía SST, prestar asesoría y asistencia técnica a las empresas afiliadas y ejercer la vigilancia delegada del cumplimiento del SG-SST.",
    question: "¿Qué obligación recae sobre la ARL según la presentación?",
    options: [
      { id: "a", text: "Diseñar y aprobar la nómina de todos los contratistas de una entidad." },
      { id: "b", text: "Capacitar al COPASST o vigía SST y brindar asistencia técnica a las empresas afiliadas." },
      { id: "c", text: "Definir el presupuesto anual de inversión de cada empleador." },
      { id: "d", text: "Autorizar la contratación de personal temporal en el sector público." },
      { id: "e", text: "Emitir sanciones penales a los trabajadores infractores." },
    ],
    correct: "b",
    explanation:
      "El documento señala que las ARL deben capacitar al COPASST o vigía y ofrecer asesoría técnica y vigilancia sobre el SG-SST.",
    points: 5,
  },
  {
    id: 55,
    category: "Comprensión Lectora",
    context:
      "El trabajador debe cuidar su salud, entregar información clara y veraz, cumplir normas e instrucciones del SG-SST, reportar peligros y participar en actividades de capacitación para aportar al logro de los objetivos del sistema.",
    question: "¿Qué deber específico tiene el trabajador dentro del SG-SST?",
    options: [
      { id: "a", text: "Determinar la política institucional de SST." },
      { id: "b", text: "Aprobar la contratación de la ARL para la empresa." },
      {
        id: "c",
        text: "Reportar peligros, cumplir normas e instrucciones y participar en las actividades de capacitación programadas.",
      },
      { id: "d", text: "Suspender unilateralmente la operación cuando lo considere." },
      { id: "e", text: "Autorizar las auditorías externas de la entidad." },
    ],
    correct: "c",
    explanation:
      "El trabajador tiene la obligación de cuidar su salud, reportar riesgos, cumplir las normas y asistir a las capacitaciones del SG-SST.",
    points: 5,
  },
  {
    id: 56,
    category: "Comprensión Lectora",
    context:
      "Los comités y brigadas cumplen funciones de vigilancia, capacitación, coordinación, auditoría, prevención, inspecciones, investigación, gestión de quejas, preparación y respuesta a emergencias, análisis y mejora, e incluso articulan frentes como el Comité de Seguridad Vial.",
    question: "¿Qué funciones se asignan a los comités y brigadas que apoyan el SG-SST?",
    options: [
      { id: "a", text: "Gestionar únicamente las vacaciones y licencias de los trabajadores." },
      {
        id: "b",
        text: "Vigilar, capacitar, coordinar, inspeccionar, investigar y apoyar la prevención y respuesta ante emergencias.",
      },
      { id: "c", text: "Definir las metas de ventas y recaudo de la entidad." },
      { id: "d", text: "Administrar los contratos de obra pública." },
      { id: "e", text: "Elaborar los estados financieros certificados de la organización." },
    ],
    correct: "b",
    explanation:
      "El documento señala que los comités y brigadas tienen roles integrales de vigilancia, formación, inspección, prevención e intervención ante emergencias.",
    points: 5,
  },
  {
    id: 57,
    category: "Comprensión Lectora",
    context:
      "El Decreto 472 de 2015, compilado en el Decreto 1072 de 2015, fija criterios sancionatorios del SG-SST según tamaño, número de trabajadores y activos, contemplando multas hasta de 1000 salarios mínimos y cierres temporales o definitivos.",
    question: "¿Qué tipo de sanciones contempla la normativa mencionada para incumplimientos del SG-SST?",
    options: [
      { id: "a", text: "Únicamente llamados de atención verbales por parte del supervisor." },
      { id: "b", text: "Suspensión indefinida del contrato de la ARL sin multas." },
      {
        id: "c",
        text: "Multas hasta de 1000 salarios mínimos, cierre temporal del lugar de trabajo o clausura definitiva.",
      },
      { id: "d", text: "Asignación automática de beneficios tributarios negativos." },
      { id: "e", text: "Pérdida de ciudadanía laboral sin consecuencias económicas." },
    ],
    correct: "c",
    explanation:
      "El régimen sancionatorio prevé multas significativas y cierres temporales o definitivos, modulados por el tamaño y activos de la empresa.",
    points: 5,
  },
]

const questionsV2: Question[] = [
  // Oraciones temáticas V2
  {
    id: 21,
    category: "Identificación de Idea Central",
    context: "(1) Las plantas producen su propio alimento mediante fotosíntesis. (2) Los animales, en cambio, deben ingerirlo del exterior. (3) Los herbívoros se alimentan exclusivamente de vegetales. (4) Los carnívoros consumen carne de otros animales. (5) Los omnívoros combinan ambos tipos de alimento. (6) Todas las plantas y animales necesitan un suministro adecuado de alimento para sobrevivir.",
    question: "La idea central del párrafo anterior está contenida en:",
    options: [
      { id: "a", text: "La oración 1" },
      { id: "b", text: "La oración 4" },
      { id: "c", text: "La oración 2" },
      { id: "d", text: "La oración 3" },
      { id: "e", text: "La oración 6" },
    ],
    correct: "c",
    explanation: "La oración 2 establece la diferencia fundamental entre plantas y animales respecto a la alimentación, que es el tema central. Las demás oraciones detallan tipos de animales.",
    points: 5,
  },
  // Ordenamiento V2
  {
    id: 22,
    category: "Ordenamiento de Párrafos",
    context: "Ordene las siguientes oraciones:\n\n1. Desde entonces se comportaron como si él fuera la progenitora\n2. Konrad Lorenz descubrió en 1930 un tipo de aprendizaje de una sola experiencia en aves\n3. El científico quedó fijado en la experiencia de los polluelos como su 'madre'\n4. La mayoría de formas de aprendizaje requiere más de una experiencia\n5. Pero los gansos nacidos en incubadora siguieron al Dr. Lorenz\n6. Normalmente esa figura es su madre\n7. Los gansos, por ejemplo, siguen lo primero que ven moverse después del nacimiento",
    question: "El orden más adecuado es:",
    options: [
      { id: "a", text: "4 – 2 – 7 – 6 – 5 – 3 – 1" },
      { id: "b", text: "4 – 5 – 1 – 7 – 6 – 3 – 2" },
      { id: "c", text: "4 – 7 – 2 – 6 – 5 – 3 – 1" },
      { id: "d", text: "4 – 2 – 1 – 3 – 6 – 5 – 7" },
    ],
    correct: "a",
    explanation: "Comienza con el contraste (4), introduce a Lorenz (2), explica el comportamiento de gansos (7), lo normal (6), el experimento (5), el resultado (3) y la conclusión (1).",
    points: 5,
  },
  {
    id: 23,
    category: "Ordenamiento de Párrafos",
    context: "Ordene las oraciones:\n\n1. Pavlov se intrigó por si otro tipo de estímulos podría producir la respuesta\n2. Pavlov encontró que tras someter al animal a la experiencia, bastaba hacer sonar una campana para que salivara\n3. La transferencia de una respuesta refleja de un estímulo a otro se denomina 'condicionamiento'\n4. El ruso P. Pavlov (1849-1936) se interesó por el funcionamiento del sistema nervioso de los mamíferos\n5. Antes de ofrecer carne al perro, hacía sonar una campana; repitió este proceso muchas veces\n6. Comenzó a estudiar los reflejos envueltos en la elaboración de saliva y descubrió que el olor o la vista de carne iniciaban la salivación",
    question: "El orden correcto es:",
    options: [
      { id: "a", text: "4 – 6 – 3 – 5 – 2 – 1" },
      { id: "b", text: "4 – 6 – 1 – 5 – 2 – 3" },
      { id: "c", text: "4 – 5 – 2 – 1 – 6 – 3" },
      { id: "d", text: "4 – 1 – 5 – 2 – 3 – 6" },
    ],
    correct: "b",
    explanation: "Introduce a Pavlov (4), su descubrimiento inicial (6), su curiosidad (1), el experimento (5), el resultado (2) y la definición del concepto (3).",
    points: 5,
  },
  // Sinonimia V2
  {
    id: 24,
    category: "Sinonimia",
    question: "Seleccione el sinónimo más adecuado para REPUDIO:",
    options: [
      { id: "a", text: "incapacidad" },
      { id: "b", text: "dificultad" },
      { id: "c", text: "vejación" },
      { id: "d", text: "rechazo" },
      { id: "e", text: "encarcelamiento" },
    ],
    correct: "d",
    explanation: "REPUDIO significa rechazo, negación o desaprobación de algo o alguien.",
    points: 5,
  },
  {
    id: 25,
    category: "Sinonimia",
    question: "Seleccione el sinónimo más adecuado para DESFALCO:",
    options: [
      { id: "a", text: "blasfemia" },
      { id: "b", text: "malversación" },
      { id: "c", text: "perverso" },
      { id: "d", text: "maligno" },
      { id: "e", text: "adverso" },
    ],
    correct: "b",
    explanation: "DESFALCO significa malversación de fondos, apropiación indebida de dinero o bienes confiados a alguien.",
    points: 5,
  },
  // Antonimia V2
  {
    id: 26,
    category: "Antonimia",
    question: "Seleccione el antónimo de SOSLAYAR:",
    options: [
      { id: "a", text: "ganar" },
      { id: "b", text: "afrontar" },
      { id: "c", text: "choque" },
      { id: "d", text: "eludir" },
      { id: "e", text: "perder" },
    ],
    correct: "b",
    explanation: "SOSLAYAR significa eludir, evitar algo. Su antónimo es AFRONTAR, que significa enfrentar directamente algo.",
    points: 5,
  },
  {
    id: 27,
    category: "Antonimia",
    question: "Seleccione el antónimo de PUSILÁNIME:",
    options: [
      { id: "a", text: "miedoso" },
      { id: "b", text: "temerario" },
      { id: "c", text: "medroso" },
      { id: "d", text: "timorato" },
      { id: "e", text: "asustado" },
    ],
    correct: "b",
    explanation: "PUSILÁNIME significa cobarde, falto de ánimo. Su antónimo es TEMERARIO, que significa audaz, osado, valiente en exceso.",
    points: 5,
  },
  {
    id: 28,
    category: "Antonimia",
    question: "Seleccione el antónimo de SOSEGADO:",
    options: [
      { id: "a", text: "alocado" },
      { id: "b", text: "moderado" },
      { id: "c", text: "calmoso" },
      { id: "d", text: "excitar" },
      { id: "e", text: "atolondrar" },
    ],
    correct: "a",
    explanation: "SOSEGADO significa tranquilo, calmado. Su antónimo es ALOCADO, que significa imprudente, irreflexivo o agitado.",
    points: 5,
  },
  // Analogías V2
  {
    id: 29,
    category: "Analogías",
    question: "MÉDICO es a PACIENTE, como _____ es a _____:",
    options: [
      { id: "a", text: "profesor : alumno" },
      { id: "b", text: "palomo : volar" },
      { id: "c", text: "blanco : negro" },
      { id: "d", text: "Demóstenes : discurso" },
      { id: "e", text: "Márquez : Nobel" },
    ],
    correct: "a",
    explanation: "Es una relación de agente-beneficiario o profesional-cliente. El médico atiende al paciente, así como el profesor enseña al alumno.",
    points: 5,
  },
  {
    id: 30,
    category: "Analogías",
    question: "ROSA es a FLORES, como _____ es a _____:",
    options: [
      { id: "a", text: "papel : cuaderno" },
      { id: "b", text: "enseñar : aprender" },
      { id: "c", text: "hoja : papel" },
      { id: "d", text: "papel : paja" },
      { id: "e", text: "paloma : ave" },
    ],
    correct: "e",
    explanation: "Es una relación de especie a género. La rosa es un tipo de flor, así como la paloma es un tipo de ave.",
    points: 5,
  },
  {
    id: 31,
    category: "Analogías",
    question: "YEGUA es a CABALLO, como _____ es a _____:",
    options: [
      { id: "a", text: "vaca : toro" },
      { id: "b", text: "gato : perro" },
      { id: "c", text: "lombriz : serpiente" },
      { id: "d", text: "yegua : vaca" },
      { id: "e", text: "cuido : gallina" },
    ],
    correct: "a",
    explanation: "Es una relación de género (hembra-macho de la misma especie). Yegua es la hembra del caballo, así como vaca es la hembra del toro.",
    points: 5,
  },
  {
    id: 32,
    category: "Analogías",
    question: "REGLA es a LÍNEA, como _____ es a _____:",
    options: [
      { id: "a", text: "clases : estudiante" },
      { id: "b", text: "alumno : grupo" },
      { id: "c", text: "cáncer : hombre" },
      { id: "d", text: "compás : círculo" },
      { id: "e", text: "tabaco : anciano" },
    ],
    correct: "d",
    explanation: "Es una relación de instrumento a resultado. La regla sirve para trazar líneas, así como el compás sirve para trazar círculos.",
    points: 5,
  },
  {
    id: 33,
    category: "Analogías",
    question: "APÁTICO es a ENTUSIASTA, como _____ es a _____:",
    options: [
      { id: "a", text: "humildad : notable" },
      { id: "b", text: "ignorancia : hábil" },
      { id: "c", text: "comicidad : parco" },
      { id: "d", text: "alocado : sereno" },
      { id: "e", text: "seriedad : estricto" },
    ],
    correct: "d",
    explanation: "Es una relación de antonimia. Apático es opuesto a entusiasta, así como alocado es opuesto a sereno.",
    points: 5,
  },
  // Completación V2
  {
    id: 34,
    category: "Completación de Oraciones",
    question: "La ________ no logra jamás persuadir a los hombres, solo logra hacerlos _________",
    options: [
      { id: "a", text: "fuerza – injustos" },
      { id: "b", text: "justicia – elocuentes" },
      { id: "c", text: "ley – cumplidores" },
      { id: "d", text: "emoción – rebeldes" },
      { id: "e", text: "mujer – machistas" },
    ],
    correct: "a",
    explanation: "FUERZA e INJUSTOS completan el sentido: la fuerza no persuade (convence por razón), solo obliga, y eso genera injusticia o hace a las personas injustas.",
    points: 5,
  },
  {
    id: 35,
    category: "Completación de Oraciones",
    question: "La reconocida rectitud de su _________ permitió descartar toda posibilidad de _______",
    options: [
      { id: "a", text: "discurso – sospecha" },
      { id: "b", text: "biografía – desprendimiento" },
      { id: "c", text: "conducta – culpa" },
      { id: "d", text: "figura – egoísmo" },
      { id: "e", text: "propósito – sacrificio" },
    ],
    correct: "c",
    explanation: "CONDUCTA y CULPA: la rectitud en la conducta (comportamiento) permite descartar la culpa (responsabilidad en algo negativo).",
    points: 5,
  },
  {
    id: 36,
    category: "Completación de Oraciones",
    question: "Si arde un ______ en un cuarto se produce gases ______ que pueden causar la muerte",
    options: [
      { id: "a", text: "veneno – venenoso" },
      { id: "b", text: "televisor – vitales" },
      { id: "c", text: "carbón – especiales" },
      { id: "d", text: "combustible – deletéreos" },
      { id: "e", text: "material – lúgubres" },
    ],
    correct: "d",
    explanation: "COMBUSTIBLE y DELETÉREOS (tóxicos, mortales): un combustible al arder produce gases deletéreos que pueden causar la muerte.",
    points: 5,
  },
  {
    id: 37,
    category: "Completación de Oraciones",
    question: "Mientras corría, no se dio cuenta del ______ intenso, que ya le había insensibilizado la nariz y le ______ las orejas",
    options: [
      { id: "a", text: "aguacero – mojaba" },
      { id: "b", text: "calor – quemaba" },
      { id: "c", text: "viento – azotaba" },
      { id: "d", text: "frío – congelaba" },
      { id: "e", text: "granizo – hería" },
    ],
    correct: "d",
    explanation: "FRÍO y CONGELABA: el frío intenso insensibiliza (entumece) la nariz y congela las orejas, lo cual es coherente con la descripción.",
    points: 5,
  },
  // Conectores V2
  {
    id: 38,
    category: "Conectores Lógicos",
    context: "¿Qué es o en qué consiste la familiaridad con las palabras? ____________, es un trabajo de acercamiento, de intimidad con el lenguaje. Mirar sus características –si es un adverbio o una conjunción, si es una preposición o un verbo reflexivo–; reconocer su genealogía, su etimología y su procedencia; indagar, ___________, la fisonomía y la descriptiva de las palabras. ____________, la familiaridad con el lenguaje consiste en ir creando un cierto hábito, una cierta aclimatación. __________ disponer de un tiempo para adaptarse o darse alguna confianza con las palabras.",
    question: "Complete con los conectores adecuados:",
    options: [
      { id: "a", text: "En primer lugar / En otras palabras / Luego / Sin embargo" },
      { id: "b", text: "En principio / Es decir / En segundo lugar / Es tanto como" },
      { id: "c", text: "Inicialmente / Posteriormente / Así pues / Por ejemplo" },
      { id: "d", text: "Por eso / De hecho / Por el contrario / Además" },
      { id: "e", text: "Esto significa que / Pero / Aunque / A diferencia de" },
    ],
    correct: "b",
    explanation: "'En principio' inicia la explicación; 'Es decir' reformula; 'En segundo lugar' introduce otro aspecto; 'Es tanto como' equipara los conceptos.",
    points: 5,
  },
  {
    id: 39,
    category: "Conectores Lógicos",
    context: "___________ la inspiración sirva de motivo o de inicio de un escrito, ______ nunca podrá reemplazar el ejercicio de composición y de encuadre, elaborado (por lo general) con lentitud y con sumo cuidado. _______, solo en ciertas circunstancias de la escritura, en determinados momentos, la 'inspiración' realmente contribuye a un logro en la redacción; en la mayoría de veces, __________, es la causante de la desorganización, del caos o de la falta de ilación en lo que escribimos.",
    question: "Complete el texto:",
    options: [
      { id: "a", text: "Es posible que / Pero / Es más / Por el contrario" },
      { id: "b", text: "Seguramente / Sin embargo / Empero / Asimismo" },
      { id: "c", text: "Indudablemente / Por el contrario / Como resultado / Y" },
      { id: "d", text: "No solo / Sino que también / Por ello / Ya que" },
      { id: "e", text: "Así mismo / De ahí que / En concreto / Para finalizar" },
    ],
    correct: "a",
    explanation: "'Es posible que' concede un punto; 'Pero' introduce contraste; 'Es más' añade énfasis; 'Por el contrario' marca oposición.",
    points: 5,
  },
  {
    id: 40,
    category: "Conectores Lógicos",
    context: "Como ya lo hice notar, escribir es una actividad artesanal. Es oportuno, ________, decir ahora algunas cosas sobre la materia con la cual trabaja el escritor: las palabras. Esos signos son escurridizos, ambiguos, inciertos. ________, dada esas características de las palabras, escribir se convierte en una continua tarea de talla, de escultura con y sobre el lenguaje. Escribir es como ir esculpiendo. Difícil, cierto, ________ si uno se propone establecer un trato con las palabras; si comienza a reconocerlas; si inicia una relación o una convivencia con ellas. __________, aprender a escribir es, también, aprender a familiarizarse con las palabras.",
    question: "Seleccione los conectores correctos:",
    options: [
      { id: "a", text: "Por lo demás / No obstante / No solo / Sino que también" },
      { id: "b", text: "Por ejemplo / Por ello / Sin embargo / Por todo lo anterior" },
      { id: "c", text: "Además / De hecho / Aunque / En síntesis" },
      { id: "d", text: "A propósito / Entonces / Pero no tanto / En cierto sentido" },
      { id: "e", text: "Por eso / Luego / En contraste / Como conclusión" },
    ],
    correct: "d",
    explanation: "'A propósito' introduce un tema relacionado; 'Entonces' conecta consecuencia; 'Pero no tanto' matiza; 'En cierto sentido' concluye reflexivamente.",
    points: 5,
  },
  // Comprensión Lectora V2
  {
    id: 41,
    category: "Comprensión Lectora",
    context: "El nivel literal de comprensión se centra en información local como estructura y vocabulario presente en el texto. La comprensión interpretativa extrae sentido global con base en conocimientos previos del lector. El nivel inferencial deduce información implícita que no está explícitamente escrita. La comprensión comparativa enlaza el texto leído con otros textos previamente estudiados, estableciendo relaciones intertextuales.",
    question: "¿Qué caracteriza al nivel inferencial de comprensión lectora?",
    options: [
      { id: "a", text: "Se centra en la estructura y vocabulario del texto" },
      { id: "b", text: "Extrae sentido global usando conocimientos previos" },
      { id: "c", text: "Deduce información implícita no escrita explícitamente" },
      { id: "d", text: "Enlaza el texto con otros textos previamente leídos" },
      { id: "e", text: "Identifica únicamente las palabras clave del texto" },
    ],
    correct: "c",
    explanation: "El texto define el nivel inferencial como aquel que 'deduce información implícita' que no está explícitamente escrita en el texto.",
    points: 5,
  },
  {
    id: 42,
    category: "Comprensión Lectora",
    context: "En textos dialógicos se deben localizar contraargumentos en el enunciado y analizar cómo influyen en los postulados expuestos. Este tipo de texto presenta diferentes voces o perspectivas que dialogan entre sí, por lo que es fundamental identificar no solo los argumentos principales sino también aquellos que los contradicen o matizan.",
    question: "¿Qué característica es fundamental analizar en textos dialógicos?",
    options: [
      { id: "a", text: "Las descripciones y caracterizaciones detalladas" },
      { id: "b", text: "Las ideas principales solo al inicio de párrafos" },
      { id: "c", text: "Los contraargumentos y su influencia en los postulados" },
      { id: "d", text: "Exclusivamente el vocabulario especializado" },
      { id: "e", text: "Solo la conclusión final del texto" },
    ],
    correct: "c",
    explanation: "El texto establece que en textos dialógicos se deben 'localizar contraargumentos en el enunciado y analizar cómo influyen en los postulados expuestos'.",
    points: 5,
  },
  {
    id: 43,
    category: "Comprensión Lectora",
    context: "La memoria a largo plazo permite vincular nuevos contenidos con aprendizajes previos para fortalecer la comprensión, asociando temas actuales con conocimientos de épocas anteriores. Este proceso cognitivo es esencial para construir conocimiento significativo y duradero, ya que conecta la nueva información con estructuras mentales ya existentes.",
    question: "¿Cuál es la función principal de la memoria a largo plazo en la comprensión lectora?",
    options: [
      { id: "a", text: "Mantener concentración sin distracciones" },
      { id: "b", text: "Recordar el texto en su secuencia original" },
      { id: "c", text: "Vincular nuevos contenidos con aprendizajes previos" },
      { id: "d", text: "Identificar únicamente las ideas principales" },
      { id: "e", text: "Reducir el texto a palabras clave" },
    ],
    correct: "c",
    explanation: "El texto define la memoria a largo plazo como la que 'permite vincular nuevos contenidos con aprendizajes previos para fortalecer la comprensión'.",
    points: 5,
  },
  // Análisis de Gráficos V2
  {
    id: 44,
    category: "Análisis de Gráficos",
    context: "Un gráfico circular representa datos mediante particiones de un círculo. Para leerlo correctamente se debe: (1) Leer el título. (2) Identificar cada partición con su denominación y participación sobre el total. (3) Asociar las particiones con su significado. (4) Inferir lo expresado. Por ejemplo, un gráfico sobre 'Distribución de habitantes por edad' podría mostrar 50% adultos, 30% jóvenes y 20% niños.",
    question: "¿Qué representa cada partición en un gráfico circular?",
    options: [
      { id: "a", text: "La tendencia ascendente o descendente de datos" },
      { id: "b", text: "La relación entre variable independiente y dependiente" },
      { id: "c", text: "Una porción del total con su denominación y participación" },
      { id: "d", text: "Únicamente colores sin significado específico" },
      { id: "e", text: "Las columnas y filas de una tabla de datos" },
    ],
    correct: "c",
    explanation: "En un gráfico circular, cada partición representa 'su denominación y participación sobre el total', mostrando qué porcentaje del total corresponde a cada categoría.",
    points: 5,
  },
  {
    id: 45,
    category: "Análisis de Gráficos",
    context: "Para analizar tablas correctamente, después de leer el título y los subtítulos de columnas y filas, se debe observar el cuerpo de la tabla y considerar las notas al pie. Las notas al pie pueden contener información crucial como aclaraciones, excepciones o modificaciones a los datos presentados. Finalmente, se debe inferir lo expresado a partir del conjunto completo de información.",
    question: "¿Por qué son importantes las notas al pie en una tabla?",
    options: [
      { id: "a", text: "Solo sirven para decoración del gráfico" },
      { id: "b", text: "Contienen aclaraciones, excepciones o modificaciones cruciales" },
      { id: "c", text: "Reemplazan la necesidad de leer el título" },
      { id: "d", text: "Indican únicamente el autor del gráfico" },
      { id: "e", text: "Muestran la tendencia de los datos" },
    ],
    correct: "b",
    explanation: "Las notas al pie 'pueden contener información crucial como aclaraciones, excepciones o modificaciones a los datos presentados', siendo esenciales para la comprensión completa.",
    points: 5,
  },
  {
    id: 46,
    category: "Análisis de Gráficos",
    context: "Los gráficos se usan para sintetizar, clarificar y resaltar información importante mediante representaciones visuales o numéricas. Pueden presentarse como figuras, tablas, mapas, fotografías o pictogramas. La lectura comprensiva de gráficos es una habilidad fundamental en contextos académicos y profesionales.",
    question: "¿Cuál es el propósito principal de usar gráficos?",
    options: [
      { id: "a", text: "Hacer los documentos más extensos y complejos" },
      { id: "b", text: "Sustituir completamente el texto escrito" },
      { id: "c", text: "Sintetizar, clarificar y resaltar información importante" },
      { id: "d", text: "Confundir al lector con datos visuales" },
      { id: "e", text: "Decorar las páginas de documentos académicos" },
    ],
    correct: "c",
    explanation: "El texto establece que los gráficos 'se usan para sintetizar, clarificar y resaltar información importante', facilitando la comprensión de datos complejos.",
    points: 5,
  },
  // Estrategias de Lectura V2
  {
    id: 47,
    category: "Estrategias de Lectura",
    context: "Identificar el tipo de texto es fundamental porque la distribución de ideas centrales cambia según la tipología (descriptivo, argumentativo, dialógico) y afecta dónde buscar lo esencial. Cada tipo de texto tiene una estructura característica que determina la ubicación y presentación de la información relevante.",
    question: "¿Por qué es importante identificar el tipo de texto al leer?",
    options: [
      { id: "a", text: "Para saber cuántas páginas tiene el documento" },
      { id: "b", text: "Porque determina dónde buscar las ideas centrales según su estructura" },
      { id: "c", text: "Para decidir si vale la pena leerlo o no" },
      { id: "d", text: "Solo para clasificarlo en una biblioteca" },
      { id: "e", text: "Para memorizar mejor el vocabulario técnico" },
    ],
    correct: "b",
    explanation: "El texto indica que identificar el tipo 'afecta dónde buscar lo esencial' porque 'la distribución de ideas centrales cambia según la tipología'.",
    points: 5,
  },
  {
    id: 48,
    category: "Estrategias de Lectura",
    context: "Se recomienda identificar qué hay de nuevo en cada párrafo, asumiendo que cada uno desarrolla al menos una idea con ventajas, desventajas, argumentos y contraargumentos que deben ser considerados. Esta estrategia permite seguir el desarrollo lógico del texto y captar el aporte específico de cada sección.",
    question: "¿Qué estrategia facilita seguir el desarrollo lógico de un texto?",
    options: [
      { id: "a", text: "Leer solo el primer y último párrafo" },
      { id: "b", text: "Identificar qué hay de nuevo en cada párrafo" },
      { id: "c", text: "Memorizar todas las palabras desconocidas" },
      { id: "d", text: "Ignorar los argumentos secundarios" },
      { id: "e", text: "Leer en voz alta sin pausas" },
    ],
    correct: "b",
    explanation: "El texto recomienda 'identificar qué hay de nuevo en cada párrafo', asumiendo que cada uno desarrolla al menos una idea que aporta al desarrollo lógico.",
    points: 5,
  },
  {
    id: 49,
    category: "Estrategias de Lectura",
    context: "Los procesos cognitivos implicados en la comprensión incluyen: recuerdo (aprendizajes basados en memoria de ideas y teorías), comprensión (parafrasear, interpretar, reorganizar, extrapolar) y aplicación (transferir información a condiciones distintas y resolver problemas). Estos procesos incorporan conocimiento mediante inteligencia, atención, memoria y lenguaje.",
    question: "¿Qué proceso cognitivo implica transferir información a condiciones distintas y resolver problemas?",
    options: [
      { id: "a", text: "Recuerdo de ideas y teorías memorizadas" },
      { id: "b", text: "Parafraseo e interpretación de textos" },
      { id: "c", text: "Aplicación de conocimiento a nuevas situaciones" },
      { id: "d", text: "Reorganización de párrafos" },
      { id: "e", text: "Extrapolación de conclusiones únicamente" },
    ],
    correct: "c",
    explanation: "El texto define 'aplicación' como el proceso de 'transferir información a condiciones distintas y resolver problemas', más allá del simple recuerdo o comprensión.",
    points: 5,
  },
  {
    id: 50,
    category: "Estrategias de Lectura",
    context: "Para analizar preguntas de prueba efectivamente, se debe: conocer su estructura y contenido (cómo inicia, si hay continuidad con las opciones), comparar opciones con el enunciado (verificar si son acordes, coherentes y complementarias), y contrastar cada respuesta con el enunciado (evaluar si son contradictorias, verdaderas o falsas, y si algunas son claramente discordantes).",
    question: "¿Qué se debe verificar al comparar opciones con el enunciado de una pregunta?",
    options: [
      { id: "a", text: "Solo si las opciones son largas o cortas" },
      { id: "b", text: "Únicamente el número de palabras en cada opción" },
      { id: "c", text: "Si son acordes, coherentes y complementarias con la pregunta" },
      { id: "d", text: "Solo la ubicación de la respuesta correcta" },
      { id: "e", text: "Exclusivamente el tipo de letra utilizado" },
    ],
    correct: "c",
    explanation: "El texto establece que al comparar opciones con el enunciado se debe 'verificar si son acordes con la pregunta, si su contenido es coherente y si resultan complementarias a lo planteado'.",
    points: 5,
  },
  {
    id: 89,
    category: "Comprensión Lectora",
    context: "El documento elaborado por Jaime Arbey Atehortúa Sánchez sintetiza conceptos y estrategias empleados en las pruebas de comprensión lectora y habilidad verbal de la CNSC. Explica el sentido de las habilidades evaluadas, describe la estructura de los ítems de selección múltiple y ofrece recomendaciones para responderlos con acierto.",
    question: "¿Cuál es el propósito central del documento según la descripción anterior?",
    options: [
      { id: "a", text: "Presentar exclusivamente ejercicios matemáticos ajenos a las pruebas de la CNSC." },
      { id: "b", text: "Explicar las habilidades evaluadas, detallar la estructura de las preguntas y brindar recomendaciones para contestarlas." },
      { id: "c", text: "Resumir la normativa disciplinaria aplicable a los servidores públicos." },
      { id: "d", text: "Ofrecer biografías de autores colombianos sin relación con procesos evaluativos." },
    ],
    correct: "b",
    explanation: "El documento se propone aclarar las habilidades evaluadas, describir la arquitectura de los ítems y orientar al participante con recomendaciones prácticas.",
    points: 5,
  },
  {
    id: 90,
    category: "Comprensión Lectora",
    context: "La guía distingue entre habilidad y competencia: la habilidad es la capacidad demostrada ante problemas conocidos, mientras que la competencia implica enfrentar problemas desconocidos trasladando conocimientos a situaciones nuevas para resolverlas con éxito.",
    question: "¿Cuál de las siguientes situaciones ejemplifica una competencia según el documento?",
    options: [
      { id: "a", text: "Aplicar siempre el mismo algoritmo memorizado en un ejercicio idéntico al practicado." },
      { id: "b", text: "Trasladar conocimientos previos a un contexto novedoso para solucionar un problema no visto." },
      { id: "c", text: "Repetir definiciones de memoria sin considerar el caso presentado." },
      { id: "d", text: "Ejecutar de forma mecánica una tarea rutinaria sin variaciones." },
    ],
    correct: "b",
    explanation: "Una competencia se demuestra cuando la persona logra resolver problemas desconocidos trasladando y adaptando su conocimiento previo a la nueva situación.",
    points: 5,
  },
  {
    id: 91,
    category: "Comprensión Lectora",
    context: "El nivel de información local exige secuenciar datos, reconocer relaciones lógicas entre oraciones y detectar datos explícitos o implícitos dentro de fragmentos breves, atendiendo a sentidos puntuales y relaciones causales inmediatas.",
    question: "Cuando una pregunta pide relacionar causa y efecto dentro de un párrafo específico, ¿qué nivel de información está evaluando?",
    options: [
      { id: "a", text: "Información local." },
      { id: "b", text: "Información global." },
      { id: "c", text: "Información intertextual." },
      { id: "d", text: "Memoria de largo plazo." },
    ],
    correct: "a",
    explanation: "Relacionar causa y efecto en un segmento puntual corresponde al nivel de información local, centrado en relaciones intrapárrafo y datos inmediatos.",
    points: 5,
  },
  {
    id: 92,
    category: "Comprensión Lectora",
    context: "El nivel de información global demanda reconocer proposiciones implícitas, sintetizar el tema, jerarquizar información, identificar subtemas y extraer conclusiones a partir del texto completo.",
    question: "Identificar la idea principal de un texto y jerarquizar sus subtemas corresponde al nivel de información:",
    options: [
      { id: "a", text: "Local." },
      { id: "b", text: "Global." },
      { id: "c", text: "Intertextual." },
      { id: "d", text: "Lexical." },
    ],
    correct: "b",
    explanation: "Jerarquizar subtemas y captar la idea central forma parte del nivel de información global, que integra el sentido del texto completo.",
    points: 5,
  },
  {
    id: 93,
    category: "Comprensión Lectora",
    context: "El nivel de información intertextual implica conectar información explícita e implícita y derivar nuevas ideas a partir de lo planteado en el texto o en otras situaciones comunicativas relacionadas con temas similares.",
    question: "Una pregunta que exige vincular el texto con experiencias externas para proponer nuevas conclusiones evalúa información:",
    options: [
      { id: "a", text: "Local." },
      { id: "b", text: "Global." },
      { id: "c", text: "Intertextual." },
      { id: "d", text: "Literal." },
    ],
    correct: "c",
    explanation: "Conectar el texto con otros contextos y derivar ideas nuevas se ubica en el nivel intertextual, que trasciende el contenido inmediato del escrito.",
    points: 5,
  },
  {
    id: 94,
    category: "Comprensión Lectora",
    context: "El documento recuerda que la taxonomía de Bloom organiza los procesos cognitivos en la siguiente secuencia: recuerdo, comprensión, aplicación, análisis, síntesis y evaluación.",
    question: "¿Cuál opción presenta los niveles de la taxonomía de Bloom en el orden ascendente correcto?",
    options: [
      { id: "a", text: "Comprensión, recuerdo, aplicación, análisis, síntesis, evaluación." },
      { id: "b", text: "Recuerdo, comprensión, aplicación, análisis, síntesis, evaluación." },
      { id: "c", text: "Aplicación, recuerdo, análisis, evaluación, síntesis, comprensión." },
      { id: "d", text: "Evaluación, síntesis, análisis, aplicación, comprensión, recuerdo." },
    ],
    correct: "b",
    explanation: "La taxonomía progresa de recuerdo a comprensión, aplicación, análisis, síntesis y evaluación como niveles crecientes de complejidad.",
    points: 5,
  },
  {
    id: 95,
    category: "Comprensión Lectora",
    context: "La competencia interpretativa mide la capacidad de comprender información otorgándole sentido; exige reconocer relaciones semánticas, sintácticas y pragmáticas, vincular tópicos locales y globales, inferir sentidos y reconocer intenciones comunicativas.",
    question: "¿Cuál acción evidencia el desarrollo de la competencia interpretativa?",
    options: [
      { id: "a", text: "Plantear una hipótesis novedosa sin apoyo en el texto." },
      { id: "b", text: "Explicar por qué se adopta una decisión utilizando teorías." },
      { id: "c", text: "Reconocer las relaciones semánticas entre párrafos e inferir el sentido global del mensaje." },
      { id: "d", text: "Memorizar definiciones sin analizarlas." },
    ],
    correct: "c",
    explanation: "La competencia interpretativa supone identificar relaciones semánticas y extraer el sentido global del texto, más allá de la simple memoria.",
    points: 5,
  },
  {
    id: 96,
    category: "Comprensión Lectora",
    context: "La competencia argumentativa se relaciona con fundamentar o sustentar planteamientos: explicitar las razones de una posición, articular teorías, vincular premisas y establecer relaciones de causalidad que respalden conclusiones.",
    question: "¿Qué conducta corresponde a la competencia argumentativa descrita?",
    options: [
      { id: "a", text: "Distinguir variables que responden a qué, dónde y cuándo." },
      { id: "b", text: "Plantear varias alternativas hipotéticas sin justificar su viabilidad." },
      { id: "c", text: "Explicar con razones y premisas por qué se adopta una decisión dentro del caso." },
      { id: "d", text: "Describir literalmente los datos sin analizarlos." },
    ],
    correct: "c",
    explanation: "Argumentar implica ofrecer razones y articular premisas que sustenten una conclusión o decisión tomada.",
    points: 5,
  },
  {
    id: 97,
    category: "Comprensión Lectora",
    context: "La competencia propositiva examina la capacidad de plantear alternativas o establecer nuevas relaciones: formular soluciones, identificar regularidades, generar hipótesis y elaborar diseños que respondan al problema.",
    question: "¿Cuál enunciado ilustra la competencia propositiva?",
    options: [
      { id: "a", text: "Determinar si las premisas del texto son coherentes entre sí." },
      { id: "b", text: "Proponer una solución viable que articule las variables descritas en el caso." },
      { id: "c", text: "Resumir fielmente cada párrafo sin modificarlo." },
      { id: "d", text: "Explicar con citas textuales la opinión del autor." },
    ],
    correct: "b",
    explanation: "La competencia propositiva se centra en plantear alternativas o soluciones fundamentadas ante la situación descrita.",
    points: 5,
  },
  {
    id: 98,
    category: "Conectores Lógicos",
    context: "Los conectores propios de la competencia interpretativa incluyen expresiones como 'se deduce que', 'se infiere que', 'significa que', 'se plantea que' y 'está relacionado con'.",
    question: "¿Cuál de los siguientes conectores anticipa una pregunta interpretativa?",
    options: [
      { id: "a", text: "Se infiere que" },
      { id: "b", text: "Esto se explica por" },
      { id: "c", text: "La principal razón es que" },
      { id: "d", text: "Desde el punto de vista de" },
    ],
    correct: "a",
    explanation: "'Se infiere que' es uno de los conectores destacados para preguntas interpretativas según la guía.",
    points: 5,
  },
  {
    id: 99,
    category: "Conectores Lógicos",
    context: "Entre los conectores argumentativos se destacan: 'Esto se explica por…', 'Esto no es pertinente porque…', 'La razón es que…', 'Se debe a que…' y formulaciones similares que solicitan justificar una posición.",
    question: "¿Qué conector corresponde a un enfoque argumentativo?",
    options: [
      { id: "a", text: "El cuadro podría evolucionar a" },
      { id: "b", text: "Esto se explica por" },
      { id: "c", text: "Se infiere que" },
      { id: "d", text: "Significa que" },
    ],
    correct: "b",
    explanation: "'Esto se explica por…' es un conector típico de preguntas argumentativas que piden fundamentar con razones.",
    points: 5,
  },
  {
    id: 100,
    category: "Conectores Lógicos",
    context: "Los conectores propositivos proponen alternativas o proyecciones, como 'Desde el punto de vista de…', 'Este problema podría solucionarse si…', 'De continuar esta tendencia…' o 'El cuadro podría evolucionar a…'.",
    question: "¿Cuál conector introduce una pregunta de tipo propositivo?",
    options: [
      { id: "a", text: "La razón es que" },
      { id: "b", text: "Se deduce que" },
      { id: "c", text: "Desde el punto de vista de" },
      { id: "d", text: "Esto no es pertinente porque" },
    ],
    correct: "c",
    explanation: "'Desde el punto de vista de…' dirige al examinando a plantear alternativas o proyecciones, rasgo propio de preguntas propositivas.",
    points: 5,
  },
  {
    id: 101,
    category: "Estrategias de Lectura",
    context: "Las opciones de respuesta incluyen distractores de varios tipos: el distractor tipo A parece sugerido por el enunciado pero no responde al conector; el tipo B podría responder al conector pero el enunciado no lo sugiere y se apoya en conocimientos generales; también hay respuestas erróneas que no atienden el conector aunque aparezcan en el texto, y respuestas contradictorias que van en contra de lo planteado.",
    question: "¿Cómo se reconoce un distractor tipo A?",
    options: [
      { id: "a", text: "Es contradictorio con el enunciado principal." },
      { id: "b", text: "Parece sugerido por el contexto pero no responde al conector solicitado." },
      { id: "c", text: "Se apoya en conocimientos externos que el enunciado no menciona." },
      { id: "d", text: "Repite literalmente la clave correcta." },
    ],
    correct: "b",
    explanation: "El distractor tipo A se presenta como plausible porque surge del enunciado, pero no atiende la relación pedida por el conector de la pregunta.",
    points: 5,
  },
  {
    id: 102,
    category: "Estrategias de Lectura",
    context: "La clave correcta rara vez aparece literalmente en el texto, no siempre es la opción más extensa ni la de vocabulario rebuscado; se destaca por su mejor estructura y por representar cierto grado de dificultad al conectar de manera precisa con la pregunta.",
    question: "Según la guía, ¿qué caracteriza a la clave de una pregunta de selección múltiple?",
    options: [
      { id: "a", text: "Ser siempre la frase más corta y sencilla." },
      { id: "b", text: "Distinguirse por su contenido preciso y coherente con el conector, aunque no esté escrito literalmente en el texto." },
      { id: "c", text: "Aparecer copiada textualmente en el enunciado." },
      { id: "d", text: "Utilizar términos técnicos incomprensibles." },
    ],
    correct: "b",
    explanation: "La clave se reconoce por la exactitud con la que responde a la pregunta, más allá de su longitud o de aparecer literal en el texto.",
    points: 5,
  },
  {
    id: 103,
    category: "Estrategias de Lectura",
    context: "Primer bloque de recomendaciones: (1) Ante generalidades, elige la respuesta más abarcadora. (2) Identifica claramente el sujeto y el objetivo de la pregunta. (3) Si varias acciones parecen correctas, selecciona la primera en orden consecutivo. (4) Detecta los señuelos y descarta lo que no cumple el objetivo. (5) Inclínate por la opción mejor elaborada. (6) Descarta opciones que no atiendan el objetivo. (7) Si las opciones tienen varias partes, analiza cada segmento. (8) Verifica la lógica temporal. (9) Comprende el contexto y satisface completamente la solicitud. (10) No violes las premisas globales. (11) Conocer al autor ayuda a intuir la intención de la pregunta.",
    question: "¿Qué finalidad comparten las recomendaciones de este bloque?",
    options: [
      { id: "a", text: "Priorizar siempre la opción más breve sin importar el contexto." },
      { id: "b", text: "Alinear la elección con el alcance y las premisas de la pregunta para evitar distracciones aparentes." },
      { id: "c", text: "Responder únicamente con conocimientos externos al texto." },
      { id: "d", text: "Reducir el tiempo de lectura ignorando el objetivo del enunciado." },
    ],
    correct: "b",
    explanation: "Todas las pautas buscan mantener el foco en el propósito y las premisas de la pregunta, descartando alternativas que se apartan del objetivo o del contexto planteado.",
    points: 5,
  },
  {
    id: 104,
    category: "Estrategias de Lectura",
    context: "Segundo bloque de recomendaciones: (12) Identifica redundancias entre pregunta y opciones. (13) Detecta palabras clave y sus definiciones. (14) Asegura concordancia de número entre pregunta y respuesta. (15) Verifica cantidades, evitando aludir a varias situaciones cuando el caso habla de una sola. (16) Reconoce patrones en la redacción de las opciones. (17) Alinea el verbo de la respuesta con el del caso. (18) Sustituye términos de referencia por cada opción para comprobar cuál encaja.",
    question: "¿Cuál estrategia aplica mejor este conjunto de recomendaciones?",
    options: [
      { id: "a", text: "Elegir la alternativa con más tecnicismos aunque cambie el sentido." },
      { id: "b", text: "Verificar la coherencia lingüística entre la pregunta y cada opción antes de decidir." },
      { id: "c", text: "Ignorar las palabras clave para no sesgar la lectura." },
      { id: "d", text: "Responder con la opción más llamativa gráficamente." },
    ],
    correct: "b",
    explanation: "Las recomendaciones insisten en comprobar la concordancia lingüística y semántica entre el enunciado y las opciones mediante palabras clave, números, verbos y patrones de redacción.",
    points: 5,
  },
  {
    id: 105,
    category: "Estrategias de Lectura",
    context: "Tercer bloque de recomendaciones: (19) Evita palabras negativas en preguntas sobre conceptos; las opciones deben relacionarse con el concepto citado. (20) Atiende la condición del caso cuando todas las opciones parecen plausibles. (21) Sintetiza patrones buscando una palabra que aglutine características. (22) Elige la respuesta más completa cuando el caso ya está resuelto. (23) Sigue la secuencia lógica del caso reflejada en las opciones. (24) Identifica la acción sugerida y evita trampas. (25) Busca sinónimos compartidos entre texto y opciones. (26) Focaliza el objetivo y descarta lo que no lo cumple. (27) Considera simultáneamente el objetivo y la condición establecida. (28) Mantén la coherencia temporal entre pregunta y respuesta. (29) Identifica palabras clave que dan sentido al caso. (30) Reconoce las condiciones descritas para tomar la decisión correcta.",
    question: "¿Cuál opción refleja la aplicación adecuada de estas recomendaciones finales?",
    options: [
      { id: "a", text: "Seleccionar la respuesta con palabras negativas para generar contraste." },
      { id: "b", text: "Escoger la alternativa que respeta la condición planteada, mantiene la secuencia lógica y responde por completo el objetivo." },
      { id: "c", text: "Responder con la opción más breve aunque omita parte de la solución." },
      { id: "d", text: "Ignorar la temporalidad del caso y cambiar el tiempo verbal si suena mejor." },
    ],
    correct: "b",
    explanation: "Las pautas finales enfatizan cumplir la condición del caso, mantener sentido y temporalidad coherentes y elegir la alternativa que responde íntegramente al objetivo planteado.",
    points: 5,
  },
  {
    id: 68,
    category: "Comprensión Lectora",
    context: "De niño, Carl Sagan comentó a su abuelo que quería ser astrónomo y recibió la pregunta pragmática sobre cómo ganaría la vida. La anécdota subraya que una afición temprana puede orientar un proyecto vital.",
    question: "¿Qué idea se infiere de la anécdota sobre Carl Sagan?",
    options: [
      { id: "a", text: "Los pasatiempos infantiles siempre se abandonan al crecer." },
      { id: "b", text: "Un pasatiempo puede transformarse en proyecto de vida con dedicación." },
      { id: "c", text: "Los abuelos suelen desanimar cualquier aspiración científica." },
      { id: "d", text: "Ser astrónomo impide obtener ingresos suficientes." },
    ],
    correct: "b",
    explanation: "El relato invita a inferir que una afición bien cultivada puede convertirse en el propósito profesional de una persona.",
    points: 5,
  },
  {
    id: 69,
    category: "Comprensión Lectora",
    context: "Un profesor lleva un frasco con agua y persuade a sus alumnos de que huele a perfume, demostrando cómo la influencia social puede moldear la percepción colectiva.",
    question: "¿Qué conclusión sugiere la anécdota del frasco de perfume?",
    options: [
      { id: "a", text: "El olfato académico es superior al de la gente común." },
      { id: "b", text: "La sugestión colectiva puede alterar la percepción de las personas." },
      { id: "c", text: "Los estudiantes deben desconfiar de todo experimento." },
      { id: "d", text: "El agua destilada tiene olor a perfume." },
    ],
    correct: "b",
    explanation: "El episodio evidencia cómo la influencia social lleva a las personas a percibir olores inexistentes.",
    points: 5,
  },
  {
    id: 70,
    category: "Comprensión Lectora",
    context: "Un cruzado confía a su amigo la llave del cinturón de castidad de su esposa y el amigo lo alcanza más tarde diciendo que le dio la llave equivocada, revelando su indiscreción.",
    question: "¿Qué revela la actitud del amigo en esta historia?",
    options: [
      { id: "a", text: "Su estricta lealtad con el cruzado." },
      { id: "b", text: "Su imprudencia y falta de fidelidad a la confianza recibida." },
      { id: "c", text: "Su habilidad para fabricar llaves nuevas." },
      { id: "d", text: "Su desconocimiento del uso de cinturones de castidad." },
    ],
    correct: "b",
    explanation: "Al probar la llave traiciona la confianza del amigo, mostrando imprudencia e infidelidad.",
    points: 5,
  },
  {
    id: 71,
    category: "Comprensión Lectora",
    context: "Un anciano se queja de que solo puede caminar hasta la mitad del trayecto y regresar por el mismo camino, sin notar que recorre la distancia completa en cada intento.",
    question: "¿Por qué la queja del anciano resulta absurda?",
    options: [
      { id: "a", text: "Porque la mitad del camino es más difícil que el resto." },
      { id: "b", text: "Porque siempre recorre la distancia completa al ir y volver por el mismo trayecto." },
      { id: "c", text: "Porque debería usar otro medio de transporte." },
      { id: "d", text: "Porque olvida cuál es su destino final." },
    ],
    correct: "b",
    explanation: "Aunque crea quedarse en la mitad, en realidad recorre el trayecto completo al retornar por el mismo camino.",
    points: 5,
  },
  {
    id: 72,
    category: "Comprensión Lectora",
    context: "En la historia del emperador desnudo, la multitud aparenta admirar un traje inexistente hasta que un niño señala la verdad, evidenciando la hipocresía colectiva y el miedo al ridículo.",
    question: "¿Qué fenómeno satiriza la anécdota del emperador desnudo?",
    options: [
      { id: "a", text: "La obediencia ciega a la autoridad por miedo al ridículo." },
      { id: "b", text: "La eficacia de los sastres reales." },
      { id: "c", text: "La necesidad de vestir de gala en público." },
      { id: "d", text: "La importancia de seguir modas extravagantes." },
    ],
    correct: "a",
    explanation: "La historia muestra cómo el temor a contradecir la opinión colectiva lleva a aceptar falacias evidentes.",
    points: 5,
  },
  {
    id: 73,
    category: "Comprensión Lectora",
    context: "Un astrólogo sentencia que morirá tres días antes que el rey para evitar ser ejecutado, utilizando su predicción como salvaguarda astuta.",
    question: "¿Qué resalta esta anécdota sobre el astrólogo?",
    options: [
      { id: "a", text: "Su desconocimiento de la corte." },
      { id: "b", text: "Su rapidez mental para proteger su vida mediante una predicción conveniente." },
      { id: "c", text: "Su desprecio por el monarca." },
      { id: "d", text: "Su habilidad para curar enfermedades." },
    ],
    correct: "b",
    explanation: "El astrólogo demuestra astucia al pronosticar una muerte que evita un castigo inmediato.",
    points: 5,
  },
  {
    id: 74,
    category: "Comprensión Lectora",
    context: "El escritor Tomás Carrasquilla recibe un jarabe recetado como si fuera aguardiente y responde que prefiere beber aguardiente como si fuera jarabe, dejando ver su humor y preferencia.",
    question: "¿Qué pone de manifiesto la respuesta de Carrasquilla?",
    options: [
      { id: "a", text: "Su rechazo absoluto a los medicamentos." },
      { id: "b", text: "Su ingenio para expresar que prefería el aguardiente al remedio." },
      { id: "c", text: "Su desconocimiento sobre las dosis prescritas." },
      { id: "d", text: "Su preocupación por el costo del tratamiento." },
    ],
    correct: "b",
    explanation: "El autor usa el humor para insinuar que prefiere el aguardiente antes que el jarabe sugerido.",
    points: 5,
  },
  {
    id: 75,
    category: "Comprensión Lectora",
    context: "Cuando Sigmund Freud, de siete años, se orina en el cuarto de sus padres, su padre le dice que nunca llegará a nada, lo que resalta el contraste entre la creatividad infantil y la falta de apoyo paterno.",
    question: "¿Qué destaca este episodio sobre la valoración de Freud?",
    options: [
      { id: "a", text: "Que su padre celebró su ingenio." },
      { id: "b", text: "Que la reacción paterna subestimó su originalidad." },
      { id: "c", text: "Que abandonó toda aspiración intelectual." },
      { id: "d", text: "Que odiaba las normas familiares." },
    ],
    correct: "b",
    explanation: "La anécdota enfatiza cómo, pese a su creatividad, fue desalentado por la crítica de su padre.",
    points: 5,
  },
  {
    id: 76,
    category: "Comprensión Lectora",
    context: "Einstein permite que su chofer, que memorizó la conferencia de relatividad, la presente. Ante una pregunta compleja, Einstein —disfrazado de chofer— indica que 'su chofer' responderá, exhibiendo ingenio.",
    question: "¿Qué pone de relieve esta anécdota sobre Einstein?",
    options: [
      { id: "a", text: "Su incapacidad para contestar preguntas complejas." },
      { id: "b", text: "Su astucia para salir airoso sin delatar el cambio con su chofer." },
      { id: "c", text: "Su desinterés por la física." },
      { id: "d", text: "Su deseo de abandonar las conferencias públicas." },
    ],
    correct: "b",
    explanation: "El científico demuestra ingenio al mantener la farsa y revertir la situación con humor.",
    points: 5,
  },
  {
    id: 77,
    category: "Comprensión Lectora",
    context: "Una anciana cuestiona a Picasso por su estilo y le aconseja visitar al oculista; el humor surge del doble sentido entre la visión artística y la visión física.",
    question: "¿En qué radica el humor de la anécdota con la anciana?",
    options: [
      { id: "a", text: "En que Picasso reconoce que no sabe dibujar." },
      { id: "b", text: "En la confusión entre la 'visión' artística y la visión oftalmológica." },
      { id: "c", text: "En que la anciana admira profundamente su obra." },
      { id: "d", text: "En que la pintura realista es superior a la abstracta." },
    ],
    correct: "b",
    explanation: "La señora interpreta 'ver el mundo' literalmente y sugiere un oculista, mientras Picasso hablaba de visión artística.",
    points: 5,
  },
  {
    id: 78,
    category: "Comprensión Lectora",
    context: "En la galería, un desconocido pregunta si se cree en fantasmas y otro desaparece tras escuchar una respuesta afirmativa, mezclando fantasía y realidad.",
    question: "¿Qué recurso sostiene la gracia del relato de los fantasmas?",
    options: [
      { id: "a", text: "La explicación científica de un fenómeno natural." },
      { id: "b", text: "La combinación entre respuesta realista y desenlace fantástico." },
      { id: "c", text: "La meticulosa descripción de la galería." },
      { id: "d", text: "La referencia a teorías paranormales comprobadas." },
    ],
    correct: "b",
    explanation: "La historia sorprende porque un interlocutor desaparece justo después de afirmar creer en fantasmas, uniendo realidad y fantasía.",
    points: 5,
  },
  {
    id: 79,
    category: "Comprensión Lectora",
    context: "En un campeonato, Medellín ocupa el primer lugar, América el quinto y Nacional un puesto intermedio; Cali está por encima del América y Millonarios después del Nacional. Se busca determinar la segunda posición.",
    question: "¿Qué equipo ocupa el segundo lugar conforme a la información dada?",
    options: [
      { id: "a", text: "Nacional" },
      { id: "b", text: "Cali" },
      { id: "c", text: "Millonarios" },
      { id: "d", text: "América" },
      { id: "e", text: "Medellín" },
    ],
    correct: "b",
    explanation: "Al estar Nacional en el lugar intermedio (tercero) y Millonarios después (cuarto), el puesto restante por encima de América (quinto) corresponde al Cali, que queda segundo.",
    points: 5,
  },
  {
    id: 80,
    category: "Comprensión Lectora",
    context: "Un texto sobre geografía afirma que es la ciencia de la ubicación y que ubicar implica ubicarse respecto a uno mismo, resaltando la importancia de situarse en el espacio.",
    question: "¿Cuál es la idea central del fragmento sobre geografía?",
    options: [
      { id: "a", text: "La geografía solo estudia mapas físicos." },
      { id: "b", text: "La esencia de la geografía radica en comprender la ubicación para orientarse en el mundo." },
      { id: "c", text: "La geografía se limita a medir distancias numéricas." },
      { id: "d", text: "Los geógrafos deben memorizar capitales sin contextualizarlas." },
    ],
    correct: "b",
    explanation: "El texto destaca que la geografía consiste en saber ubicarse, pues la ubicación es clave para la experiencia humana.",
    points: 5,
  },
  {
    id: 81,
    category: "Comprensión Lectora",
    context: "Bordalove elogia a Fray Antonio porque su prédica hace que los ladrones devuelvan lo robado, pero al decirlo realza tanto el mérito propio como el del colega.",
    question: "¿Qué sugiere la anécdota sobre el elogio de Bordalove?",
    options: [
      { id: "a", text: "Que Fray Antonio carece de talento." },
      { id: "b", text: "Que Bordalove, al alabarlo, también destaca su propio impacto moral." },
      { id: "c", text: "Que las prédicas no influyen en los feligreses." },
      { id: "d", text: "Que devolver lo robado es señal de fracaso." },
    ],
    correct: "b",
    explanation: "El comentario pondera al colega pero implícitamente resalta que sus propias prédicas tienen efectos extraordinarios.",
    points: 5,
  },
  {
    id: 82,
    category: "Comprensión Lectora",
    context: "Teodoro vende zapatos por $3.000, entrega el cambio de un billete de $5.000 falso y luego debe reembolsar la suma recibida, perdiendo también el producto.",
    question: "¿Cuál es la pérdida total de Teodoro?",
    options: [
      { id: "a", text: "$2.000" },
      { id: "b", text: "$3.000" },
      { id: "c", text: "$5.000" },
      { id: "d", text: "$8.000" },
    ],
    correct: "c",
    explanation: "Pierde los $3.000 del par de zapatos y los $2.000 entregados como cambio, es decir, $5.000 en total.",
    points: 5,
  },
  {
    id: 83,
    category: "Comprensión Lectora",
    context: "Durante un examen de conducción, la aspirante sube el auto al césped y el evaluador comenta en tono jocoso que así podrá almorzar a la sombra, buscando relajar la situación.",
    question: "¿Qué efecto tiene el comentario del evaluador?",
    options: [
      { id: "a", text: "Ridiculizar a la aspirante para suspenderla." },
      { id: "b", text: "Introducir ironía para reducir la tensión del error cometido." },
      { id: "c", text: "Ordenar que detenga el examen inmediatamente." },
      { id: "d", text: "Explicar los criterios técnicos de reprobación." },
    ],
    correct: "b",
    explanation: "El comentario irónico funciona como un recurso amable para rebajar la tensión del tropiezo.",
    points: 5,
  },
  {
    id: 84,
    category: "Comprensión Lectora",
    context: "En la playa, un niño pide a Picasso un dibujo firmado; el artista lo realiza sobre su piel para evitar que lo vendan y proteger su obra.",
    question: "¿Qué buscaba Picasso al dibujar sobre la piel del niño?",
    options: [
      { id: "a", text: "Aumentar el valor de reventa del dibujo." },
      { id: "b", text: "Impedir que la obra fuera comercializada, conservando control sobre ella." },
      { id: "c", text: "Practicar técnicas dermatológicas." },
      { id: "d", text: "Salvar papel porque no tenía materiales." },
    ],
    correct: "b",
    explanation: "Al dibujar sobre la piel, garantizó que el boceto no pudiera venderse, evidenciando su astucia.",
    points: 5,
  },
  {
    id: 85,
    category: "Comprensión Lectora",
    context: "Un futbolista es reprobado en matemáticas pese a la súplica del entrenador; cuando responde 'cuatro' a '¿cuánto son dos más dos?', el entrenador pide otra oportunidad, mostrando su turbación.",
    question: "¿Dónde reside el humor de la escena del futbolista?",
    options: [
      { id: "a", text: "En que el jugador responde con brillantez." },
      { id: "b", text: "En la contradicción del entrenador, que pide otra oportunidad incluso tras una respuesta correcta evidente." },
      { id: "c", text: "En que el profesor confunde la pregunta." },
      { id: "d", text: "En que las matemáticas carecen de importancia." },
    ],
    correct: "b",
    explanation: "El entrenador se muestra tan nervioso que insiste en otra oportunidad aunque el jugador respondió bien, lo que genera ironía.",
    points: 5,
  },
  {
    id: 86,
    category: "Comprensión Lectora",
    context: "Thomas Jefferson afirma que quien no lee periódicos está mejor informado que quien sí lo hace, porque evita falsedades y errores difundidos.",
    question: "¿Qué crítica formula Jefferson a la prensa?",
    options: [
      { id: "a", text: "Que siempre ofrece información precisa." },
      { id: "b", text: "Que difunde errores y falsedades, de modo que evitarlos puede dejar a la persona menos desinformada." },
      { id: "c", text: "Que es un medio indispensable para gobernar." },
      { id: "d", text: "Que solo trata temas triviales." },
    ],
    correct: "b",
    explanation: "Jefferson ironiza al señalar que quien no lee la prensa evita errores y falsedades, quedando menos mal informado.",
    points: 5,
  },
  {
    id: 87,
    category: "Comprensión Lectora",
    context: "Tras quemar la cena, el cocinero de César se suicida cuando recibe el perdón del emperador porque percibe la indulgencia como humillante.",
    question: "¿Por qué el cocinero opta por suicidarse pese al perdón?",
    options: [
      { id: "a", text: "Porque César lo condenó de todos modos." },
      { id: "b", text: "Porque la indulgencia lo avergüenza más que un castigo abierto." },
      { id: "c", text: "Porque no soporta trabajar en la cocina." },
      { id: "d", text: "Porque perdió la receta secreta." },
    ],
    correct: "b",
    explanation: "La historia señala que la indulgencia imperial lo avergonzó al punto de preferir la muerte antes que la humillación.",
    points: 5,
  },
  {
    id: 88,
    category: "Comprensión Lectora",
    context: "La maestra de párvulos Elma Tschumy organiza su fiesta de cumpleaños invitando únicamente a 263 exalumnos hombres, revelando su deseo de estar rodeada exclusivamente de varones.",
    question: "¿Qué deja en evidencia la celebración planeada por Elma Tschumy?",
    options: [
      { id: "a", text: "Que desea un encuentro equilibrado entre hombres y mujeres." },
      { id: "b", text: "Que busca deliberadamente un entorno festivo compuesto solo por hombres." },
      { id: "c", text: "Que pretende realizar actividades académicas durante la fiesta." },
      { id: "d", text: "Que no quiere que asista ningún exalumno." },
    ],
    correct: "b",
    explanation: "Al invitar únicamente a sus exalumnos hombres, muestra su interés por celebrar rodeada exclusivamente de ellos.",
    points: 5,
  },
]

export function RazonamientoTest() {
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
      return "Excelente nivel de competencia verbal y razonamiento analítico. Dominas la comprensión lectora, el análisis textual y las relaciones lógicas."
    }
    if (percentage >= 70) {
      return "Buen nivel de razonamiento analítico. Revisa la retroalimentación para fortalecer áreas específicas de comprensión verbal."
    }
    return "Es necesario reforzar las habilidades de razonamiento verbal. Practica más con textos, conectores lógicos y relaciones analógicas."
  })()

  const unansweredCount = questions.length - Object.keys(answers).length

  // Agrupar preguntas por categoría
  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = []
    }
    acc[question.category].push(question)
    return acc
  }, {} as Record<string, typeof questions>)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-white/30 bg-white/80 shadow-lg shadow-primary/15 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-balance flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Razonamiento Analítico y Competencia Verbal
          </CardTitle>
          <CardDescription className="text-balance leading-relaxed">
            Evalúa tu capacidad de comprensión lectora, análisis textual, relaciones lógicas y manejo del lenguaje.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <Alert className="border-primary/30 bg-primary/10">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription>
              Esta prueba incluye ejercicios de identificación de ideas centrales, ordenamiento de párrafos, sinonimia,
              antonimia, analogías, completación de oraciones y conectores lógicos.
            </AlertDescription>
          </Alert>
          <p>
            Lee cuidadosamente cada pregunta y su contexto cuando aplique. Selecciona la opción que mejor responda a lo
            solicitado según las reglas del razonamiento verbal y la lógica textual.
          </p>
        </CardContent>
      </Card>

      <Card className="border-white/30 bg-white/80 shadow-lg shadow-primary/15 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">Selecciona la versión de la prueba</CardTitle>
          <CardDescription>
            Cada versión contiene diferentes preguntas de competencia verbal y razonamiento analítico
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

      {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <div className="h-1 w-12 bg-primary/30 rounded-full" />
            <h3 className="text-lg font-semibold text-primary">{category}</h3>
            <div className="h-1 flex-1 bg-primary/30 rounded-full" />
          </div>

          {categoryQuestions.map((question, index) => {
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
                    <p className="text-sm font-semibold text-primary/80">
                      Pregunta {question.id}
                    </p>
                    <span className="rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                      {question.points} pts
                    </span>
                  </div>
                  {question.context && (
                    <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                      <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">
                        {question.context}
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
                        {showIncorrect && <Info className="h-5 w-5 text-rose-500" aria-hidden="true" />}
                      </label>
                    )
                  })}

                  {showState && (
                    <div className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2 text-foreground">
                        <Info className="h-4 w-4 text-primary" />
                        Respuesta correcta:&nbsp;
                        <span className="font-medium text-primary">{question.correct.toUpperCase()}</span>
                      </p>
                      <p className="mt-2 leading-relaxed">{question.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ))}

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
            Usa la retroalimentación para comprender las reglas del razonamiento verbal y mejorar tu análisis textual.
          </p>
        </div>
      )}
    </form>
  )
}
