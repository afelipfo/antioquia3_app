"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, InfoIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  {
    id: 1,
    question: "¿Cuál conjunto normativo constituye la base principal del proceso disciplinario colombiano?",
    options: [
      "Constitución Política (arts. 6, 90 y 124), Ley 734 de 2002, Ley 1952 de 2019 y Ley 2094 de 2021",
      "Ley 80 de 1993, Ley 1150 de 2007 y Decreto 1082 de 2015",
      "Código General del Proceso y Ley 1437 de 2011",
      "Ley 190 de 1995 y Decreto 019 de 2012"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "El régimen disciplinario se soporta en los artículos 6, 90 y 124 de la Constitución Política, la Ley 734 de 2002 (Código Disciplinario Único) y sus reformas: la Ley 1952 de 2019 y la Ley 2094 de 2021.",
    topic: "Normativa disciplinaria"
  },
  {
    id: 2,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Una finalidad central de las reformas disciplinarias de 2019 y 2021 fue:",
    options: [
      "Eliminar la doble instancia en el proceso disciplinario",
      "Adaptar el procedimiento a estándares internacionales de debido proceso e introducir un sistema mixto de juzgamiento",
      "Trasladar todas las competencias disciplinarias a la jurisdicción contenciosa",
      "Limitar la defensa a la etapa de juzgamiento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, las reformas introdujeron la doble instancia, mecanismos orales y escritos en el juicio y mayores garantías acordes con estándares internacionales de debido proceso.",
    topic: "Reformas al régimen disciplinario"
  },
  {
    id: 3,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. El principio de doble instancia implica que:",
    options: [
      "La misma autoridad investiga y sanciona en una sola actuación",
      "Quien instruye puede fallar si existe autorización del investigado",
      "La actuación debe permitir que una autoridad distinta revise lo decidido en primera instancia",
      "Las decisiones disciplinarias son definitivas sin recursos"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, el debido proceso disciplinario exige doble instancia: quien instruye no puede juzgar y debe existir revisión por autoridad distinta.",
    topic: "Principios rectores - Debido proceso"
  },
  {
    id: 4,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Según el principio de motivación, una decisión disciplinaria debe:",
    options: [
      "Fundarse en la conveniencia política de la sanción",
      "Ser breve y sin argumentación para garantizar celeridad",
      "Expresar las razones fácticas y jurídicas que sustentan la medida, pues la falta de motivación constituye vicio",
      "Apoyarse únicamente en precedentes administrativos"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, la motivación exige explicitar razones de hecho y de derecho que soportan la decisión; su ausencia genera vicio sustancial.",
    topic: "Principios rectores - Motivación"
  },
  {
    id: 5,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. La ilicitud sustancial de la conducta disciplinaria se configura cuando:",
    options: [
      "La conducta afecta el deber funcional sin justificación legal",
      "El servidor actúa conforme a la ley pero genera molestia social",
      "Se incumple un deber sin causar perjuicio alguno",
      "Existen dudas sobre la autoría del hecho"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, la ilicitud sustancial supone que la conducta vulnera de manera injustificada el deber funcional, ocasionando reproche disciplinario.",
    topic: "Principios rectores - Ilicitud sustancial"
  },
  {
    id: 6,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. El principio de congruencia exige que:",
    options: [
      "La sanción pueda basarse en hechos distintos a los cargos",
      "La calificación jurídica del fallo se mantenga aunque cambien los hechos probados",
      "La sanción corresponda a los hechos y tipificación consignados en el proceso disciplinario",
      "Se imponga la sanción más grave posible ante cualquier duda"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, la congruencia asegura que la sanción guarde correspondencia con los hechos, cargos y calificación jurídica formulados durante el proceso.",
    topic: "Principios rectores - Congruencia"
  },
  {
    id: 7,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. El principio de favorabilidad en materia disciplinaria implica que:",
    options: [
      "Se aplique siempre la sanción más benigna dentro del catálogo legal",
      "Se prefiera la norma más favorable al disciplinable cuando exista duda interpretativa",
      "Los servidores puedan elegir la sanción a imponer",
      "No se pueda sancionar si existen normas semejantes"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la favorabilidad indica que, en caso de duda normativa o cambio legislativo, debe aplicarse la disposición más favorable al investigado.",
    topic: "Principios rectores - Favorabilidad"
  },
  {
    id: 8,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. ¿Quién es titular de la acción disciplinaria en Colombia?",
    options: [
      "Únicamente la Procuraduría General de la Nación",
      "El Estado, a través de la Procuraduría, oficinas de control interno disciplinario, personerías y demás entidades con competencia sobre sus servidores",
      "Solo los ciudadanos afectados mediante derecho de petición",
      "Las asambleas departamentales y concejos municipales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el Estado ejerce la acción disciplinaria por conducto de la Procuraduría, oficinas de control interno, personerías y entidades competentes respecto de sus servidores y ex servidores.",
    topic: "Titularidad y destinatarios de la acción disciplinaria"
  },
  {
    id: 9,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Entre los destinatarios de la ley disciplinaria se encuentran:",
    options: [
      "Únicamente los funcionarios de carrera administrativa",
      "Los servidores públicos, particulares que ejercen funciones públicas, administran recursos públicos o actúan como interventores y auxiliares de la justicia",
      "Solo los contratistas por prestación de servicios",
      "Exclusivamente servidores del nivel directivo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la ley disciplinaria cobija servidores públicos y particulares que cumplen funciones públicas, administran recursos o ejercen labores de interventoría o auxiliares de justicia.",
    topic: "Destinatarios de la acción disciplinaria"
  },
  {
    id: 10,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. ¿Cuál NO es un sujeto procesal en el proceso disciplinario?",
    options: [
      "El investigado",
      "El defensor",
      "El Ministerio Público en intervención excepcional",
      "El juez laboral que conoció de una demanda previa"
    ],
    correctAnswer: 3,
    points: 5,
    explanation: "En la situación descrita, son sujetos procesales el investigado, su defensor, el Ministerio Público en intervención excepcional, la Procuraduría en supervigilancia y las víctimas; un juez laboral externo no participa como sujeto procesal.",
    topic: "Sujetos procesales"
  },
  {
    id: 11,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Un derecho esencial del disciplinable es:",
    options: [
      "Designar apoderado, solicitar y controvertir pruebas y presentar alegatos",
      "Escoger la autoridad que lo investigará",
      "Renunciar a la defensa y recibir la sanción que prefiera",
      "Exigir que el proceso carezca de publicidad"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, el disciplinable tiene derecho de defensa integral: designar apoderado, solicitar, aportar o controvertir pruebas, rendir descargos y presentar alegatos.",
    topic: "Derechos del disciplinable"
  },
  {
    id: 12,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Una falta disciplinaria se configura cuando el servidor:",
    options: [
      "Ejecuta cualquier conducta no prevista en la ley",
      "Desconoce deberes, prohibiciones o régimen de inhabilidades descritos en el Código General Disciplinario",
      "Únicamente comete delitos penales",
      "Incumple metas de gestión asignadas por la entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el Código General Disciplinario define como falta la conducta descrita en la ley: incumplimiento de deberes, prohibiciones, inhabilidades, incompatibilidades o conflictos de interés.",
    topic: "Faltas disciplinarias"
  },
  {
    id: 13,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Un deber disciplinario expresamente previsto es:",
    options: [
      "Negarse a rendir cuentas sobre bienes públicos",
      "Denunciar delitos y faltas disciplinarias conocidos, salvo excepciones legales",
      "Aceptar regalos de agradecimiento de los usuarios",
      "Delegar funciones en terceros sin autorización"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la Ley 1952 ordena denunciar los delitos, contravenciones y faltas disciplinarias de los que se tenga conocimiento, salvo reservas legales específicas.",
    topic: "Deberes del servidor público"
  },
  {
    id: 14,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Según el régimen disciplinario, una prohibición expresa es:",
    options: [
      "Solicitar dádivas o favores relacionados con la función",
      "Rechazar regalos ofrecidos por los usuarios",
      "Exigir que las quejas se presenten por escrito",
      "Reportar hechos irregulares a la autoridad competente"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, entre las prohibiciones está solicitar dádivas, cobrar por trámites, omitir o retardar el servicio o nombrar personas sin requisitos.",
    topic: "Prohibiciones disciplinarias"
  },
  {
    id: 15,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. La instrucción dentro del proceso disciplinario se caracteriza por:",
    options: [
      "Ser la etapa en la que se decide la sanción",
      "Recopilar pruebas en indagación previa o investigación para determinar existencia de la falta y autor, pudiendo archivarse o formular cargos",
      "Permitir la conciliación entre disciplinante y disciplinado",
      "Excluir la práctica de pruebas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la instrucción reúne elementos probatorios, identifica la conducta y al presunto autor y concluye archivando o formulando cargos.",
    topic: "Procedimiento disciplinario - Instrucción"
  },
  {
    id: 16,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. El juzgamiento disciplinario:",
    options: [
      "Se limita a revisar formalmente el pliego sin practicar pruebas",
      "Puede ser adelantado por el mismo funcionario instructor para garantizar coherencia",
      "Evalúa el pliego de cargos, permite modificarlo por pruebas sobrevinientes, practicar nuevas pruebas y culmina con fallo absolutorio o sancionatorio",
      "Siempre finaliza con sanción pecuniaria"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, el juzgamiento estudia cargos, admite variaciones justificadas, practica pruebas y concluye con decisión absolutoria o sancionatoria por autoridad distinta a la instructora.",
    topic: "Procedimiento disciplinario - Juzgamiento"
  },
  {
    id: 17,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. La acción disciplinaria puede iniciarse de oficio cuando:",
    options: [
      "El investigado reconoce voluntariamente su responsabilidad",
      "Existe información creíble proveniente de servidor público u otra fuente, sin necesidad de queja formal",
      "La queja es anónima y no cumple requisitos legales",
      "El disciplinado solicita la investigación para aclarar su conducta"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el proceso puede iniciarse de oficio cuando la autoridad cuenta con información seria; las quejas anónimas solo proceden si cumplen las exigencias de las Leyes 190 de 1995 y 24 de 1992.",
    topic: "Inicio de la actuación disciplinaria"
  },
  {
    id: 18,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. La tipicidad disciplinaria implica que:",
    options: [
      "La autoridad puede sancionar conductas no previstas si son socialmente reprochables",
      "La conducta debe encuadrarse en una falta descrita en la ley y se evalúa su culpabilidad y gravedad",
      "La sanción se fija según la costumbre administrativa",
      "Solo se analizan aspectos morales de la conducta"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, tipicidad exige correlacionar la conducta con faltas previstas legalmente y valorar culpabilidad (dolo o culpa) y gravedad.",
    topic: "Responsabilidad disciplinaria - Tipicidad"
  },
  {
    id: 19,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Cuando el disciplinable actúa con dolo:",
    options: [
      "Desconoce la ilicitud de su conducta por error invencible",
      "Prevé la falta y su ilicitud y aun así decide ejecutarla",
      "Confía en que su conducta será declarada atípica",
      "Actúa sin intención ni previsión del resultado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el dolo supone conocimiento de la falta y voluntad de realizarla pese a conocer su ilicitud.",
    topic: "Responsabilidad disciplinaria - Culpabilidad"
  },
  {
    id: 20,
    question: "Una causal de exclusión de responsabilidad disciplinaria es:",
    options: [
      "Falta de motivación en el fallo",
      "Miedo insuperable o fuerza mayor que impiden actuar conforme al deber",
      "Desacuerdo con la jerarquía del superior",
      "Ausencia de antecedentes disciplinarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Eximen responsabilidad causales como fuerza mayor, caso fortuito, miedo o coacción insuperables, cumplimiento de orden legítima, entre otras.",
    topic: "Responsabilidad disciplinaria - Causales de exclusión"
  }
]

const questionsV2: Question[] = [
  {
    id: 1,
    question: "La clasificación de las faltas gravísimas en el Código General Disciplinario se encuentra:",
    options: [
      "En los artículos 5 al 20 de la Ley 1952 de 2019",
      "En los artículos 52 al 66 de la Ley 1952 de 2019",
      "Únicamente en decretos reglamentarios del Gobierno Nacional",
      "En el Código Penal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "Los artículos 52 a 66 de la Ley 1952 de 2019 enumeran taxativamente las faltas gravísimas.",
    topic: "Clasificación de las faltas"
  },
  {
    id: 2,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Una falta grave culposa puede acarrear:",
    options: [
      "Destitución e inhabilidad general de 10 a 20 años",
      "Suspensión e inhabilidad especial entre 1 y 18 meses",
      "Solo una amonestación escrita",
      "Multa de 5 a 20 días de salario"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, para faltas graves culposas la sanción prevista es suspensión e inhabilidad especial de 1 a 18 meses.",
    topic: "Sanciones disciplinarias"
  },
  {
    id: 3,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. La destitución disciplinaria implica que:",
    options: [
      "Se suspende al servidor solo por un mes",
      "Pierde la relación con la administración sin importar el tipo de vinculación y queda inhabilitado para ejercer funciones públicas por el término fijado",
      "Puede seguir ejerciendo otras funciones públicas",
      "Es sustituida automáticamente por una multa"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la destitución desvincula al disciplinado de su cargo, finaliza cualquier relación con la administración y genera inhabilidad general por el término señalado.",
    topic: "Efectos de las sanciones"
  },
  {
    id: 4,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Un atenuante de la responsabilidad disciplinaria es:",
    options: [
      "Atribuir infundadamente la falta a un tercero",
      "Confesar o aceptar los cargos, o resarcir el daño causado",
      "Recibir recompensa por la conducta",
      "Pertenecer al nivel directivo de la entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, constituyen atenuantes la diligencia en el cargo, ausencia de antecedentes, confesión o aceptación de cargos y reparación del daño.",
    topic: "Atenuantes y agravantes"
  },
  {
    id: 5,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Entre los agravantes disciplinarios se encuentra:",
    options: [
      "Resarcir el daño ocasionado",
      "Haber sido sancionado disciplinaria o fiscalmente en los últimos cinco años",
      "Falta de antecedentes disciplinarios",
      "Presentar descargos dentro del término"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, ser reincidente en sanciones disciplinarias o fiscales dentro de cinco años es un agravante; también lo son el grave daño social, conocimiento de la ilicitud o recibir recompensa.",
    topic: "Atenuantes y agravantes"
  },
  {
    id: 6,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. La multa como sanción disciplinaria procede para:",
    options: [
      "Faltas gravísimas con dolo",
      "Faltas leves, tanto dolosas como culposas, con rangos de 20-90 o 5-20 días de salario básico",
      "Todas las faltas graves",
      "Cualquier falta cometida por particulares"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, las faltas leves tienen como consecuencia principal la multa: de 20 a 90 días cuando son dolosas y de 5 a 20 días si son culposas.",
    topic: "Sanciones disciplinarias"
  },
  {
    id: 7,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Una causal de exclusión de la conducta disciplinaria es el error invencible sobre la ilicitud. Esto significa que:",
    options: [
      "El investigado desconoce la norma pese a que podía conocerla",
      "Existía un conocimiento pleno de la falta y aun así decidió realizarla",
      "No podía conocer la ilicitud pese a emplear la diligencia debida",
      "La autoridad le informó previamente que la conducta era lícita a cambio de dinero"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situación descrita, el error invencible implica imposibilidad de conocer la ilicitud incluso actuando con la diligencia exigible, por lo que excluye responsabilidad.",
    topic: "Responsabilidad disciplinaria - Exclusiones"
  },
  {
    id: 8,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. La acción disciplinaria prescribe, por regla general, en:",
    options: [
      "Tres años contados desde la apertura de investigación",
      "Cinco años contados desde la consumación de la falta o el último acto en conductas continuadas",
      "Seis meses desde la queja",
      "Doce años para todas las faltas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la prescripción general es de cinco años, salvo faltas relacionadas con violaciones de derechos humanos o DIH que prescriben en doce años.",
    topic: "Extinción y prescripción de la acción disciplinaria"
  },
  {
    id: 9,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. La caducidad de la acción disciplinaria ocurre cuando:",
    options: [
      "Transcurren cinco años sin que se expida auto de apertura de investigación",
      "El investigado renuncia al cargo",
      "Se interpone recurso de apelación contra el fallo",
      "Se decreta nulidad dentro del proceso"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, la acción caduca si transcurren cinco años desde la ocurrencia de la falta sin que se haya proferido auto de apertura de investigación disciplinaria.",
    topic: "Extinción de la acción disciplinaria"
  },
  {
    id: 10,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Una notificación personal en el proceso disciplinario se practica sobre decisiones como:",
    options: [
      "Autos de apertura, vinculación, pliegos de cargos y fallos de instancia",
      "Traslado del dictamen pericial",
      "Auto de cierre de investigación",
      "Todas las decisiones de trámite menores"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, se notifican personalmente decisiones como el auto de apertura de investigación, auto de vinculación, pliego de cargos y los fallos disciplinarios.",
    topic: "Notificaciones disciplinarias"
  },
  {
    id: 11,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. La notificación por estado procede, entre otros casos, para:",
    options: [
      "El auto que resuelve el recurso de apelación",
      "El auto de cierre de investigación y el traslado para alegatos precalificados",
      "El fallo de primera instancia",
      "La variación del pliego de cargos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, el auto de cierre de investigación y el traslado para alegatos precalificados se notifican por estado, al igual que el traslado del dictamen pericial.",
    topic: "Notificaciones disciplinarias"
  },
  {
    id: 12,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. La notificación en estrado se entiende realizada cuando:",
    options: [
      "Se envía por correo electrónico certificado",
      "La decisión se profiere en audiencia pública o diligencia verbal y queda notificada inmediatamente a todos los sujetos procesales",
      "Se fija edicto en la cartelera",
      "El disciplinado firma el acta de archivo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, las decisiones adoptadas en audiencia o diligencia verbal se notifican inmediatamente en estrado a quienes intervienen.",
    topic: "Notificaciones disciplinarias"
  },
  {
    id: 13,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Un medio de prueba disciplinario descrito en el compendio es:",
    options: [
      "La inspección disciplinaria sobre bienes o lugares con levantamiento de acta",
      "La confesión judicial únicamente en procesos penales",
      "El rumor de los medios de comunicación",
      "El voto en las asambleas ciudadanas"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situación descrita, la inspección disciplinaria recae sobre bienes o lugares y debe documentarse mediante acta con los elementos observados.",
    topic: "Medios de prueba"
  },
  {
    id: 14,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Para admitir una prueba disciplinaria se requiere que sea:",
    options: [
      "Impertinente para evitar retrasos",
      "Conducente al hecho, pertinente y obtenida legalmente",
      "Únicamente documental",
      "Solicitada por el Ministerio Público"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, las pruebas deben ser conducentes, pertinentes y practicarse con apego a la ley; se rechazan las inconducentes, impertinentes o superfluas.",
    topic: "Medios de prueba"
  },
  {
    id: 15,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. La confesión o aceptación de cargos con acompañamiento de defensor:",
    options: [
      "Debe presentarse antes de la apertura de la investigación",
      "Puede realizarse hasta antes de la ejecutoria del auto de cierre y permite reducción de sanción hasta la mitad si es en investigación o de una tercera parte si es en juzgamiento",
      "No produce beneficios frente a la sanción",
      "Solo procede cuando ya existe fallo sancionatorio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la confesión puede formularse desde la apertura hasta antes de la ejecutoria del auto de cierre; reduce la sanción hasta la mitad si se hace en investigación y en una tercera parte si es en juzgamiento.",
    topic: "Medios de prueba - Confesión"
  },
  {
    id: 16,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. En materia de recursos, la reposición y la apelación deben interponerse:",
    options: [
      "Dentro de los cinco días siguientes a la notificación y siempre por escrito",
      "Desde la expedición de la decisión hasta cinco días después de la notificación, sustentándolos dentro del mismo término",
      "Únicamente mediante apoderado judicial",
      "Solo cuando la decisión sea de trámite"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, reposición y apelación se interponen desde la expedición y hasta cinco días posteriores a la notificación; si la decisión se profiere en estrados, deben sustentarse allí.",
    topic: "Recursos disciplinarios"
  },
  {
    id: 17,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. El recurso de queja procede contra:",
    options: [
      "Fallos de segunda instancia",
      "Decisiones que rechazan el recurso de apelación",
      "Autos que decreten pruebas",
      "Actos de trámite sin efectos definitivos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la queja es procedente contra la decisión que inadmite un recurso de apelación.",
    topic: "Recursos disciplinarios"
  },
  {
    id: 18,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Una nulidad disciplinaria puede alegarse por:",
    options: [
      "Simple inconformidad con la valoración probatoria",
      "Falta de competencia o violación del derecho de defensa que afecte el debido proceso, siempre que no exista otro medio para subsanar",
      "No haber concedido términos probatorios adicionales",
      "No invocar oportunamente recursos ordinarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, las nulidades se plantean por vicios como falta de competencia o violación del debido proceso; deben proponerse antes del traslado para alegatos y solo proceden si no hay otro medio para corregir el vicio.",
    topic: "Nulidades disciplinarias"
  },
  {
    id: 19,
    question: "Lectura: La Oficina de Control Interno Disciplinario adelanta una investigación a un servidor y el equipo repasa las reglas aplicables para orientar el trámite. Una decisión disciplinaria queda ejecutoriada cuando:",
    options: [
      "El disciplinado manifiesta su desacuerdo verbal",
      "No procede recurso, o si procedía, no fue interpuesto o ya se resolvió; también después de cinco días sin recurso tras la última notificación",
      "Se radica un memorial ante la Procuraduría",
      "El investigado renuncia al cargo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situación descrita, la ejecutoria se da cuando no existen recursos procedentes, no se interponen dentro del término o se resuelven; igualmente se produce tras cinco días sin recurso desde la última notificación.",
    topic: "Ejecutoria de decisiones"
  },
  {
    id: 20,
    question: "Las sanciones disciplinarias deben registrarse en:",
    options: [
      "El despacho del jefe inmediato",
      "La División de Registro y Control y Correspondencia de la Procuraduría General de la Nación para efectos del certificado de antecedentes",
      "La Registraduría Nacional del Estado Civil",
      "Los juzgados penales del circuito"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "La Procuraduría, a través de la División de Registro y Control y Correspondencia, lleva el registro de sanciones disciplinarias para expedir certificados de antecedentes.",
    topic: "Registro de sanciones"
  }
]

export function ProcesoDisciplinarioTest() {
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2">("v1")
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = selectedVersion === "v1" ? questionsV1 : questionsV2

  const handleSubmit = () => {
    setShowResults(true)
    setShowFeedback(true)
  }

  const timer = useTestTimer({
    totalQuestions: questions.length,
    timePerQuestion: 120,
    onTimeUp: handleSubmit,
    isActive: !showResults
  })

  const handleVersionChange = (value: string) => {
    setSelectedVersion(value as "v1" | "v2")
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const calculateScore = () => {
    let correct = 0
    let totalPoints = 0
    let earnedPoints = 0

    questions.forEach((q) => {
      totalPoints += q.points
      if (answers[q.id] === q.correctAnswer) {
        correct++
        earnedPoints += q.points
      }
    })

    return { correct, total: questions.length, earnedPoints, totalPoints }
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
    setShowFeedback(false)
    timer.resetTimer()
  }

  const score = showResults ? calculateScore() : null

  return (
    <div className="space-y-6">
      {!showResults && (
        <TestTimer
          formattedTime={timer.formattedTime}
          timeColor={timer.timeColor}
          percentageRemaining={timer.percentageRemaining}
        />
      )}

      <Alert className="border-primary/50 bg-primary/5">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Esta prueba contiene {questions.length} preguntas sobre el proceso disciplinario de los servidores públicos.
          Total de puntos disponibles: {questions.reduce((sum, q) => sum + q.points, 0)} puntos.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selecciona la versión de la prueba</CardTitle>
          <CardDescription>
            Cada versión incluye 20 preguntas basadas en el compendio del proceso disciplinario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedVersion} onValueChange={handleVersionChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="v1" disabled={showResults}>
                Versión 1
              </TabsTrigger>
              <TabsTrigger value="v2" disabled={showResults}>
                Versión 2
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {showResults && (
            <p className="mt-3 text-sm text-muted-foreground">Reinicia la prueba para cambiar de versión.</p>
          )}
        </CardContent>
      </Card>

      {showResults && score && (
        <Alert
          className={
            score.earnedPoints >= score.totalPoints * 0.7
              ? "border-green-500 bg-green-50"
              : "border-orange-500 bg-orange-50"
          }
        >
          <AlertTitle className="text-lg font-semibold">
            Resultado: {score.earnedPoints} / {score.totalPoints} puntos
          </AlertTitle>
          <AlertDescription>
            Respondiste correctamente {score.correct} de {score.total} preguntas (
            {Math.round((score.earnedPoints / score.totalPoints) * 100)}%)
          </AlertDescription>
        </Alert>
      )}

      {questions.map((question, index) => (
        <Card
          key={question.id}
          className={`border ${
            showFeedback && answers[question.id] !== undefined
              ? answers[question.id] === question.correctAnswer
                ? "border-green-500 bg-green-50/50"
                : "border-red-500 bg-red-50/50"
              : "border-border"
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-start justify-between gap-4 text-lg">
              <span>
                Pregunta {index + 1} ({question.points} puntos)
              </span>
              {showFeedback && answers[question.id] !== undefined && (
                answers[question.id] === question.correctAnswer ? (
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                )
              )}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Tema: {question.topic}</CardDescription>
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
                  className={`flex items-start space-x-3 rounded-lg border p-3 transition-colors ${
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
                    id={`procdisc-q${question.id}-opt${optionIndex}`}
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor={`procdisc-q${question.id}-opt${optionIndex}`}
                    className="flex-1 cursor-pointer leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {showFeedback && answers[question.id] !== undefined && (
              <Alert
                className={
                  answers[question.id] === question.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : "border-orange-500 bg-orange-50"
                }
              >
                <AlertTitle className="font-semibold">
                  {answers[question.id] === question.correctAnswer ? "¡Correcto!" : "Respuesta incorrecta"}
                </AlertTitle>
                <AlertDescription className="mt-2 space-y-2">
                  <p>
                    <strong>Explicación:</strong> {question.explanation}
                  </p>
                  {answers[question.id] !== question.correctAnswer && (
                    <p className="text-sm">
                      <strong>Debes revisar:</strong> {question.topic}
                    </p>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ))}

      <div className="flex flex-wrap gap-4">
        {!showResults ? (
          <Button
            onClick={handleSubmit}
            size="lg"
            disabled={Object.keys(answers).length !== questions.length}
            className="min-w-[200px]"
          >
            Enviar Respuestas
          </Button>
        ) : (
          <>
            <Button
              onClick={() => setShowFeedback(!showFeedback)}
              variant="outline"
              size="lg"
              className="min-w-[200px]"
            >
              {showFeedback ? "Ocultar" : "Mostrar"} Retroalimentación
            </Button>
            <Button onClick={handleReset} variant="secondary" size="lg" className="min-w-[200px]">
              Reiniciar Prueba
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
