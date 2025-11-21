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

export const razonamientoLogicoQuestions: Question[] = [
  {
    id: 1,
    question: "Situacion\n\nDurante una capacitacion sobre logica formal, un funcionario de la Gobernacion debe analizar el siguiente silogismo: 'Todos los mamiferos son animales. El perro es mamifero'. El capacitador le pide identificar la conclusion valida.\n\nPregunta\n\nCon base en el silogismo presentado, ¿que conclusion deductiva es valida?",
    options: [
      "Algunos perros son animales",
      "El perro es un animal",
      "El perro no es vertebrado",
      "Todos los animales son perros",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el silogismo clasico permite concluir que el perro es un animal, ya que al ser mamifero y estar todos los mamiferos incluidos en el conjunto de animales, el perro necesariamente pertenece a dicho conjunto.",
    topic: "Deduccion",
  },
  {
    id: 2,
    question: "Situacion\n\nUn analista del area de planeacion esta revisando un informe sobre divisibilidad de numeros para un proyecto educativo. Encuentra la siguiente afirmacion: 'Si un numero es par, entonces es divisible entre 2. 18 es par'.\n\nPregunta\n\nSegun el enunciado condicional presentado, ¿cual es la conclusion correcta?",
    options: ["18 no es divisible entre 2", "18 es primo", "18 es divisible entre 2", "18 es impar"],
    correctAnswer: 2,
    points: 5,
    explanation: "En esta situacion, aplicar la regla general (modus ponens) implica que si 18 cumple la condicion de ser par, entonces necesariamente es divisible entre 2.",
    topic: "Deduccion",
  },
  {
    id: 3,
    question: "Situacion\n\nEn una jornada de formacion sobre nutricion para funcionarios del programa de seguridad alimentaria, se presenta el siguiente razonamiento: 'Todas las frutas contienen vitaminas. La naranja es una fruta'.\n\nPregunta\n\nA partir de las premisas presentadas, ¿que conclusion se sigue logicamente?",
    options: ["La naranja contiene vitaminas", "La naranja no contiene agua", "Todas las vitaminas son naranjas", "La naranja no es comestible"],
    correctAnswer: 0,
    points: 5,
    explanation: "Dada la situacion, la conclusion necesaria es que la naranja contiene vitaminas, pues al ser fruta hereda la propiedad que todas las frutas poseen segun la premisa mayor.",
    topic: "Deduccion",
  },
  {
    id: 4,
    question: "Situacion\n\nEn el servicio de salud domiciliaria, el reglamento establece que en excepciones se deben redistribuir las cargas priorizando los casos urgentes. Hoy hay una fuerte lluvia que impide la salida de varios tecnicos, pero hay pacientes postquirurgicos que requieren visita diaria.\n\nPregunta\n\nSegun la norma vigente y la situacion descrita, ¿que accion se deduce que debe tomarse?",
    options: [
      "Cancelar todas las visitas",
      "Exigir salida de todo el personal",
      "Redistribuir entre disponibles priorizando postquirurgicos y reprogramar lo no urgente",
      "Atender solo pacientes nuevos",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En esta situacion excepcional, la regla ordena priorizar urgencias (postquirurgicos) y redistribuir la carga entre el personal disponible, reprogramando los casos no urgentes.",
    topic: "Deduccion aplicada",
  },
  {
    id: 5,
    question: "Situacion\n\nUn funcionario de mantenimiento encuentra un carro de suministros obstruyendo parcialmente el pasillo de emergencias del edificio administrativo. Retira el carro inmediatamente. La norma de emergencias establece que todo incidente debe informarse de inmediato y documentarse por escrito, aunque la situacion ya se haya resuelto.\n\nPregunta\n\nDe acuerdo con la norma y la situacion descrita, ¿que debe hacer el funcionario?",
    options: [
      "No reportar porque no paso nada",
      "Esperar al final del turno",
      "Informar de inmediato y radicar informe escrito",
      "Llamar a archivo para decidir",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "Segun la situacion presentada, la norma exige reporte inmediato y documentacion escrita aun cuando no haya ocurrido dano, pues el incidente existio y fue mitigado.",
    topic: "Deduccion aplicada",
  },
  {
    id: 6,
    question: "Situacion\n\nDurante un taller de logica aplicada, un facilitador presenta el siguiente caso: 'La norma dice que en excepciones se redistribuye priorizando urgentes; hoy hay tecnicos ausentes por lluvia y hay pacientes postquirurgicos pendientes'. Pide a los participantes identificar la estructura del razonamiento.\n\nPregunta\n\nEn el caso presentado, ¿cuales son la premisa mayor y la premisa menor del silogismo?",
    options: [
      "Mayor: hoy llueve; Menor: hay postquirurgicos",
      "Mayor: hay tecnicos disponibles; Menor: no hay urgencias",
      "Mayor: norma de redistribucion; Menor: situacion concreta (ausentes + postquirurgicos)",
      "Mayor: postquirurgicos son leves; Menor: se atienden ultimos",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En esta situacion de analisis logico, la premisa mayor es la norma general de redistribucion y la premisa menor es la situacion concreta que se presenta (tecnicos ausentes y pacientes urgentes).",
    topic: "Estructura deduccion",
  },
  {
    id: 7,
    question: "Situacion\n\nEl equipo de mejora continua de una secretaria esta analizando por que los tramites tardan tanto. Deciden separar el proceso en pasos individuales: asignacion de turno, verificacion de documentos, radicacion en sistema, para identificar donde ocurren las demoras.\n\nPregunta\n\nSegun la metodologia utilizada por el equipo, ¿que eje de pensamiento estan aplicando?",
    options: ["Categorial", "Analitico", "Intuitivo", "Retorico"],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el equipo aplica el eje analitico porque descompone el proceso complejo en sus partes constitutivas para entender mejor cada etapa.",
    topic: "Ejes de pensamiento",
  },
  {
    id: 8,
    question: "Situacion\n\nUn funcionario del area de atencion al ciudadano esta organizando el sistema de PQRSD. Para ello, separa las solicitudes en categorias definidas: peticiones, quejas, reclamos, sugerencias y denuncias, cada una con sus caracteristicas propias.\n\nPregunta\n\nAl clasificar las solicitudes de esta manera, ¿que eje de pensamiento esta utilizando el funcionario?",
    options: ["Analitico", "Categorial", "Hipotetico", "Axiologico"],
    correctAnswer: 1,
    points: 5,
    explanation: "En esta situacion, el funcionario aplica el eje categorial porque agrupa los elementos en categorias claramente definidas segun sus caracteristicas distintivas.",
    topic: "Ejes de pensamiento",
  },
  {
    id: 9,
    question: "Situacion\n\nEl coordinador de atencion al usuario ha observado que la mayoria de los ciudadanos que presentan quejas por demora en sus tramites no traian sus documentos completos al momento de radicar. Ha documentado este patron en los ultimos tres meses.\n\nPregunta\n\nCon base en las observaciones del coordinador, ¿que conclusion inductiva es razonable formular?",
    options: [
      "Toda queja es por falta de documentos",
      "No se puede concluir nada",
      "En la mayoria de casos, la documentacion incompleta retrasa la atencion",
      "Las demoras solo ocurren los lunes",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "Dada la situacion observada, la induccion permite sugerir que, generalmente, la falta de documentos completos es un factor que contribuye a retrasar los tramites.",
    topic: "Induccion",
  },
  {
    id: 10,
    question: "Situacion\n\nEn una clase de fisica para tecnicos de laboratorio, el profesor explica que 'calentar agua a 100 °C produce ebullicion'. Un estudiante pregunta si esto siempre es cierto, y el profesor aclara que depende de la presion atmosferica del lugar.\n\nPregunta\n\nSegun la aclaracion del profesor, ¿que caracteriza esta inferencia sobre el punto de ebullicion?",
    options: [
      "Es cierta sin excepcion",
      "Generaliza observaciones y es probable (depende de condiciones)",
      "Es un silogismo categorico",
      "Es una definicion",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En esta situacion educativa, se evidencia que la induccion generaliza observaciones pero su validez depende de condiciones especificas como la presion atmosferica.",
    topic: "Induccion",
  },
  {
    id: 11,
    question: "Situacion\n\nUn investigador observo 10 cisnes en diferentes lagos de Europa y todos resultaron ser blancos. Concluyo que todos los cisnes son blancos. Tiempo despues, en un viaje a Australia, descubrio que existen cisnes negros.\n\nPregunta\n\nA partir de la experiencia del investigador, ¿que ensenanza se obtiene sobre la naturaleza de la induccion?",
    options: [
      "Toda induccion es falsa",
      "La conclusion es probable, puede haber contraejemplos",
      "Ver 10 casos prueba una ley universal",
      "Induccion equivale a deduccion",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La situacion del investigador ilustra que las generalizaciones inductivas no son necesarias ni absolutas; siempre pueden existir casos contrarios que refuten la conclusion.",
    topic: "Induccion",
  },
  {
    id: 12,
    question: "Situacion\n\nUn analista de gestion documental reviso cinco tramites recientes que fueron resueltos en tiempo record. En todos los casos, los ciudadanos habian entregado informacion completa y bien organizada desde el inicio.\n\nPregunta\n\nCon base en el analisis de estos casos, ¿que conclusion inductiva favorece la mejora de la gestion?",
    options: [
      "La informacion no influye",
      "Dar informacion clara generalmente agiliza la resolucion",
      "Solo importan recursos humanos",
      "La conclusion es cierta siempre",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion analizada, la induccion respalda que entregar informacion completa y organizada tiende a agilizar la resolucion de los tramites.",
    topic: "Induccion",
  },
  {
    id: 13,
    question: "Situacion\n\nEn un curso de logica proposicional para funcionarios, el instructor presenta tres oraciones para analizar: i) 'Bogota es la capital de Colombia'; ii) '2+2=5'; iii) '¿Que hora es?'. Pide identificar cuales son proposiciones.\n\nPregunta\n\nSegun los criterios de la logica proposicional, ¿cuales de las oraciones presentadas son proposiciones?",
    options: ["Solo i", "i y ii", "i y ii; iii no lo es", "Todas"],
    correctAnswer: 2,
    points: 5,
    explanation: "En esta situacion de formacion, las proposiciones son enunciados que pueden ser verdaderos o falsos. Las oraciones i y ii tienen valor de verdad, mientras que iii es una pregunta y por tanto no es una proposicion.",
    topic: "Proposiciones",
  },
  {
    id: 14,
    question: "Situacion\n\nDurante un ejercicio de evaluacion logica, un funcionario debe asignar valores de verdad a dos proposiciones: 'Bogota es la capital de Colombia' y '2+2=5'. Debe determinar el emparejamiento correcto.\n\nPregunta\n\nSegun el valor de verdad de cada proposicion, ¿cual es el emparejamiento correcto?",
    options: ["V,V", "F,V", "V,F", "F,F"],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion presentada, la primera proposicion es verdadera (Bogota si es la capital) y la segunda es falsa (2+2 no es igual a 5), por lo que el emparejamiento correcto es V,F.",
    topic: "Valores de verdad",
  },
  {
    id: 15,
    question: "Situacion\n\nUn funcionario de ventanilla recibe a un ciudadano que desea radicar una peticion. Segun el protocolo PQRSD, debe cumplir dos condiciones obligatorias expresadas como conjuncion logica: verificar identidad Y registrar en el sistema (V ∧ V).\n\nPregunta\n\nPara que la conjuncion sea verdadera, ¿que opcion debe ejecutar el funcionario?",
    options: [
      "Verificar identidad y registrar",
      "Exigir recibo y remitir",
      "Verificar y pedir regresar",
      "Registrar sin verificar",
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, la conjuncion logica requiere que ambas acciones se cumplan: verificar la identidad del ciudadano y registrar la peticion en el sistema.",
    topic: "Conjuncion",
  },
  {
    id: 16,
    question: "Situacion\n\nA la ventanilla de atencion llega un usuario que es adulto mayor y ademas tiene una discapacidad visual leve. El protocolo establece que 'adultos mayores O personas con discapacidad tienen derecho a atencion preferente' (disyuncion).\n\nPregunta\n\nDada la situacion del usuario, ¿que opcion respeta correctamente la disyuncion del protocolo?",
    options: [
      "Otorgar atencion preferente o remitir si falta info",
      "Leer en voz alta sus datos",
      "Negar prioridad",
      "Exigir documentos no requeridos",
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En esta situacion, la disyuncion indica que basta con que se cumpla una de las condiciones para otorgar atencion preferente. El usuario cumple ambas, por lo que definitivamente tiene derecho a prioridad.",
    topic: "Disyuncion",
  },
  {
    id: 17,
    question: "Situacion\n\nUn funcionario atiende a una ciudadana que presenta documentos con informacion personal sensible (direccion, telefono, datos de salud). El protocolo de proteccion de datos establece que se debe aplicar la negacion: NO leer informacion sensible en voz alta.\n\nPregunta\n\nPara respetar la negacion establecida en el protocolo, ¿que conducta debe adoptar el funcionario?",
    options: [
      "Orientar sin verbalizar datos",
      "Leer el documento en voz alta",
      "Repetir direccion frente a todos",
      "Mostrar datos en pantalla publica",
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion presentada, la negacion ordena no divulgar informacion sensible verbalmente. Orientar sin verbalizar los datos protege la informacion personal del ciudadano.",
    topic: "Negacion",
  },
  {
    id: 18,
    question: "Situacion\n\nUn ciudadano llega a la ventanilla con una consulta sobre licencias de construccion, pero el funcionario no tiene toda la informacion necesaria para responder. El protocolo establece el condicional: 'Si no tienes toda la informacion, entonces remite al area competente' (p → q).\n\nPregunta\n\nPara cumplir correctamente el condicional del protocolo, ¿que accion debe tomar el funcionario?",
    options: [
      "Falta info y no remites",
      "Falta info y remites",
      "Hay info completa y remites igual",
      "Nunca remites",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En esta situacion, el condicional se satisface cuando se cumple la antecedente (falta informacion) y se ejecuta la consecuente (remitir al area competente).",
    topic: "Condicional",
  },
  {
    id: 19,
    question: "Situacion\n\nEn una capacitacion sobre logica, el instructor explica el bicondicional (p ↔ q) y senala que es verdadero cuando ambas proposiciones tienen el mismo valor de verdad. Pide a los participantes identificar un ejemplo correcto.\n\nPregunta\n\nSegun la definicion del bicondicional, ¿cual ejemplo muestra correctamente cuando p ↔ q es verdadero?",
    options: [
      "p V, q F",
      "p F, q V",
      "p V, q V",
      "p F, q V y falso a la vez",
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion de capacitacion, el bicondicional requiere que ambas proposiciones tengan el mismo valor de verdad. Cuando p es verdadera y q es verdadera, el bicondicional es verdadero.",
    topic: "Bicondicional",
  },
  {
    id: 20,
    question: "Situacion\n\nDurante un examen de logica, un estudiante presenta el siguiente razonamiento: 'Todos los mamiferos son animales; todos los animales son perros; luego todas las naranjas son mamiferos'. El evaluador debe determinar si es valido.\n\nPregunta\n\nAl analizar el razonamiento del estudiante, ¿que conclusion puede establecer el evaluador?",
    options: [
      "Silogismo valido",
      "Conclusion no se sigue de las premisas",
      "Induccion correcta",
      "Equivalencia logica",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En esta situacion de evaluacion, el razonamiento es claramente invalido porque la conclusion sobre las naranjas no tiene ninguna conexion logica con las premisas sobre mamiferos y animales.",
    topic: "Falacias",
  },
  {
    id: 21,
    question: "Situacion\n\nUn ciudadano llega a radicar una peticion presentando su cedula de ciudadania vigente, pero sin traer recibo de servicios publicos. El protocolo PQRSD exige verificar identidad (cedula) y registrar en sistema. El recibo no es un requisito establecido.\n\nPregunta\n\nSegun los requisitos del protocolo y la documentacion presentada, ¿que accion cumple la conjuncion exigida?",
    options: [
      "Verificar y registrar",
      "Exigir recibo y remitir",
      "Verificar y pedir volver",
      "Remitir sin registrar",
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, la norma solo exige verificar identidad (cedula presentada) y registrar en el sistema. El recibo no es requisito, por lo que se debe proceder con el tramite.",
    topic: "PQRSD",
  },
  {
    id: 22,
    question: "Situacion\n\nUna persona de la tercera edad con discapacidad visual leve se acerca a la ventanilla solicitando ayuda para diligenciar un formato de peticion. No puede leer bien el documento y necesita asistencia para completarlo correctamente.\n\nPregunta\n\nDe acuerdo con el protocolo de atencion preferente, ¿que actuacion debe realizar el funcionario?",
    options: [
      "Dar prioridad y apoyar el diligenciamiento",
      "Leer datos en voz alta",
      "Registrar y negar prioridad",
      "Negar ayuda",
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En esta situacion, el protocolo exige combinar la atencion preferente (por ser adulto mayor y tener discapacidad) con el apoyo en el diligenciamiento del formato.",
    topic: "PQRSD",
  },
  {
    id: 23,
    question: "Situacion\n\nDurante la ronda de seguridad, un vigilante encuentra una caja de suministros obstruyendo parcialmente la salida de emergencias del sotano. Inmediatamente retira la caja y despeja la ruta. No hubo heridos ni danos.\n\nPregunta\n\nSegun la norma de emergencias, ¿que conducta debe seguir el vigilante despues de retirar la obstruccion?",
    options: [
      "No reportar",
      "Informar de inmediato y elaborar informe",
      "Solo informe mensual",
      "Esperar otro incidente",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la norma exige que siempre se reporte de inmediato y se elabore un informe escrito, aunque el riesgo ya se haya mitigado y no haya ocurrido dano.",
    topic: "Emergencias",
  },
  {
    id: 24,
    question: "Situacion\n\nEn el servicio de salud domiciliaria, una fuerte tormenta impide que varios tecnicos salgan a realizar visitas programadas. Sin embargo, hay pacientes postquirurgicos que requieren atencion urgente ese dia. El coordinador debe tomar una decision.\n\nPregunta\n\nConsiderando la norma de redistribucion y la logica de priorizacion, ¿que decision debe tomar el coordinador?",
    options: [
      "Suspender agenda",
      "Redistribuir disponibles priorizando urgentes y optimizando rutas",
      "Forzar salida de todos",
      "Atender primero controles de rutina",
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En esta situacion de emergencia climatica, la norma manda redistribuir el personal disponible priorizando los casos urgentes (postquirurgicos) y reorganizar las rutas para optimizar la cobertura.",
    topic: "Salud domiciliaria",
  },
]

export function RazonamientoLogicoTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

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
              <CardTitle>Razonamiento deductivo e inductivo</CardTitle>
              <CardDescription>
                Banco basado en la presentacion de razonamiento logico y casos de PQRSD, salud y emergencias.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Practica silogismos, ejes analitico/categorial, induccion, logica proposicional y aplicaciones institucionales con 24 preguntas
                situacionales.
              </p>
              <Alert>
                <AlertTitle className="flex items-center gap-2 text-sm font-semibold">
                  <InfoIcon className="h-4 w-4 text-primary" />
                  Puntaje
                </AlertTitle>
                <AlertDescription>Cada pregunta vale 5 puntos. Debes responder las 24 para enviar.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="indicaciones">
          <Card className="border bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle>Indicaciones</CardTitle>
              <CardDescription>Lee la situacion, identifica el tipo de razonamiento y elige la opcion coherente.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>Temporizador: 2 minutos por pregunta.</li>
                <li>Puedes reiniciar la prueba cuando desees.</li>
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
                    <RadioGroupItem value={optionIndex.toString()} id={`logic-q-${question.id}-opt-${optionIndex}`} className="mt-1" />
                    <Label htmlFor={`logic-q-${question.id}-opt-${optionIndex}`} className="flex-1 cursor-pointer">
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
