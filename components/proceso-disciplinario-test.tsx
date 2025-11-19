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
    question: "Situacion\n\nLa Oficina de Control Interno Disciplinario de la Gobernacion de Antioquia inicia una investigacion contra un funcionario de la Secretaria de Hacienda por presuntas irregularidades en la contratacion. El equipo juridico debe determinar cual normativa aplicar para orientar correctamente el tramite disciplinario.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual conjunto normativo constituye la base principal del proceso disciplinario colombiano?",
    options: [
      "Constitucion Politica (arts. 6, 90 y 124), Ley 734 de 2002, Ley 1952 de 2019 y Ley 2094 de 2021",
      "Ley 80 de 1993, Ley 1150 de 2007 y Decreto 1082 de 2015",
      "Codigo General del Proceso y Ley 1437 de 2011",
      "Ley 190 de 1995 y Decreto 019 de 2012"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el equipo juridico debe aplicar el regimen disciplinario que se soporta en los articulos 6, 90 y 124 de la Constitucion Politica, la Ley 734 de 2002 (Codigo Disciplinario Unico) y sus reformas: la Ley 1952 de 2019 y la Ley 2094 de 2021.",
    topic: "Normativa disciplinaria"
  },
  {
    id: 2,
    question: "Situacion\n\nUn abogado recien vinculado a la Personeria de Medellin debe estudiar las reformas al regimen disciplinario para asesorar correctamente en los procesos. El personero le solicita un informe sobre las principales finalidades de las reformas de 2019 y 2021.\n\nPregunta\n\nSegun la situacion descrita, ¿cual fue una finalidad central de las reformas disciplinarias de 2019 y 2021?",
    options: [
      "Eliminar la doble instancia en el proceso disciplinario",
      "Adaptar el procedimiento a estandares internacionales de debido proceso e introducir un sistema mixto de juzgamiento",
      "Trasladar todas las competencias disciplinarias a la jurisdiccion contenciosa",
      "Limitar la defensa a la etapa de juzgamiento"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el abogado debe informar que las reformas introdujeron la doble instancia, mecanismos orales y escritos en el juicio y mayores garantias acordes con estandares internacionales de debido proceso.",
    topic: "Reformas al regimen disciplinario"
  },
  {
    id: 3,
    question: "Situacion\n\nEn una investigacion disciplinaria adelantada por la Procuraduria Provincial de Rionegro, el funcionario instructor ha recopilado todas las pruebas y formulado el pliego de cargos. El disciplinado alega que el mismo funcionario no puede dictar el fallo porque vulneraria el principio de doble instancia.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que implica el principio de doble instancia?",
    options: [
      "La misma autoridad investiga y sanciona en una sola actuacion",
      "Quien instruye puede fallar si existe autorizacion del investigado",
      "La actuacion debe permitir que una autoridad distinta revise lo decidido en primera instancia",
      "Las decisiones disciplinarias son definitivas sin recursos"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el disciplinado tiene razon parcialmente: el debido proceso disciplinario exige doble instancia, lo que significa que quien instruye no puede juzgar y debe existir revision por autoridad distinta.",
    topic: "Principios rectores - Debido proceso"
  },
  {
    id: 4,
    question: "Situacion\n\nLa Oficina de Control Interno Disciplinario de un hospital publico en Envigado profiere un fallo sancionatorio contra una enfermera. El apoderado de la disciplinada presenta recurso de apelacion argumentando que la decision carece de motivacion porque no explica las razones por las cuales se determino la sancion.\n\nPregunta\n\nCon base en la situacion descrita, segun el principio de motivacion, ¿como debe ser una decision disciplinaria?",
    options: [
      "Fundarse en la conveniencia politica de la sancion",
      "Ser breve y sin argumentacion para garantizar celeridad",
      "Expresar las razones facticas y juridicas que sustentan la medida, pues la falta de motivacion constituye vicio",
      "Apoyarse unicamente en precedentes administrativos"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el apoderado tiene fundamento para su recurso porque la motivacion exige explicitar razones de hecho y de derecho que soportan la decision; su ausencia genera vicio sustancial.",
    topic: "Principios rectores - Motivacion"
  },
  {
    id: 5,
    question: "Situacion\n\nUn funcionario de la Secretaria de Movilidad de Medellin es investigado por no atender oportunamente las solicitudes de los ciudadanos. El investigado alega que su conducta no causo ningun perjuicio real a los usuarios. El instructor debe determinar si existe ilicitud sustancial.\n\nPregunta\n\nSegun la situacion descrita, ¿cuando se configura la ilicitud sustancial de la conducta disciplinaria?",
    options: [
      "La conducta afecta el deber funcional sin justificacion legal",
      "El servidor actua conforme a la ley pero genera molestia social",
      "Se incumple un deber sin causar perjuicio alguno",
      "Existen dudas sobre la autoria del hecho"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, la defensa del funcionario no es valida porque la ilicitud sustancial supone que la conducta vulnera de manera injustificada el deber funcional, ocasionando reproche disciplinario, independientemente del perjuicio concreto.",
    topic: "Principios rectores - Ilicitud sustancial"
  },
  {
    id: 6,
    question: "Situacion\n\nEn el fallo de primera instancia contra un servidor de la Alcaldia de Bello, el operador disciplinario lo sanciona por hechos diferentes a los contenidos en el pliego de cargos. El defensor argumenta que se violo el principio de congruencia.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que exige el principio de congruencia?",
    options: [
      "La sancion pueda basarse en hechos distintos a los cargos",
      "La calificacion juridica del fallo se mantenga aunque cambien los hechos probados",
      "La sancion corresponda a los hechos y tipificacion consignados en el proceso disciplinario",
      "Se imponga la sancion mas grave posible ante cualquier duda"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el defensor tiene razon porque la congruencia asegura que la sancion guarde correspondencia con los hechos, cargos y calificacion juridica formulados durante el proceso.",
    topic: "Principios rectores - Congruencia"
  },
  {
    id: 7,
    question: "Situacion\n\nDurante la investigacion disciplinaria contra un funcionario de la Contraloria Departamental de Antioquia, se expide una nueva ley que modifica la tipificacion de la falta investigada, haciendola menos gravosa. El defensor solicita la aplicacion de la nueva norma.\n\nPregunta\n\nCon base en la situacion descrita, ¿que implica el principio de favorabilidad en materia disciplinaria?",
    options: [
      "Se aplique siempre la sancion mas benigna dentro del catalogo legal",
      "Se prefiera la norma mas favorable al disciplinable cuando exista duda interpretativa",
      "Los servidores puedan elegir la sancion a imponer",
      "No se pueda sancionar si existen normas semejantes"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el defensor puede solicitar la aplicacion de la nueva norma porque la favorabilidad indica que, en caso de duda normativa o cambio legislativo, debe aplicarse la disposicion mas favorable al investigado.",
    topic: "Principios rectores - Favorabilidad"
  },
  {
    id: 8,
    question: "Situacion\n\nUn ciudadano presenta una queja contra un funcionario de la Secretaria de Educacion de Itagui por presunto acoso laboral. El ciudadano pregunta quien es el competente para investigar y si solo la Procuraduria puede hacerlo.\n\nPregunta\n\nSegun la situacion descrita, ¿quien es titular de la accion disciplinaria en Colombia?",
    options: [
      "Unicamente la Procuraduria General de la Nacion",
      "El Estado, a traves de la Procuraduria, oficinas de control interno disciplinario, personerias y demas entidades con competencia sobre sus servidores",
      "Solo los ciudadanos afectados mediante derecho de peticion",
      "Las asambleas departamentales y concejos municipales"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, se le debe informar al ciudadano que el Estado ejerce la accion disciplinaria por conducto de la Procuraduria, oficinas de control interno, personerias y entidades competentes respecto de sus servidores y ex servidores.",
    topic: "Titularidad y destinatarios de la accion disciplinaria"
  },
  {
    id: 9,
    question: "Situacion\n\nLa Personeria de Sabaneta recibe una denuncia contra un particular que ejerce funciones de interventoria en un contrato de obra publica municipal. El personero debe determinar si esta persona puede ser sujeto de investigacion disciplinaria.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿quienes se encuentran entre los destinatarios de la ley disciplinaria?",
    options: [
      "Unicamente los funcionarios de carrera administrativa",
      "Los servidores publicos, particulares que ejercen funciones publicas, administran recursos publicos o actuan como interventores y auxiliares de la justicia",
      "Solo los contratistas por prestacion de servicios",
      "Exclusivamente servidores del nivel directivo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el interventor si puede ser investigado porque la ley disciplinaria cobija servidores publicos y particulares que cumplen funciones publicas, administran recursos o ejercen labores de interventoria o auxiliares de justicia.",
    topic: "Destinatarios de la accion disciplinaria"
  },
  {
    id: 10,
    question: "Situacion\n\nEn un proceso disciplinario adelantado por la Oficina de Control Interno de la ESE Hospital General de Medellin, el apoderado del investigado solicita que se vincule como sujeto procesal al juez laboral que conocio una demanda previa del disciplinado contra la entidad.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual NO es un sujeto procesal en el proceso disciplinario?",
    options: [
      "El investigado",
      "El defensor",
      "El Ministerio Publico en intervencion excepcional",
      "El juez laboral que conocio de una demanda previa"
    ],
    correctAnswer: 3,
    points: 5,
    explanation: "En la situacion descrita, la solicitud debe rechazarse porque son sujetos procesales el investigado, su defensor, el Ministerio Publico en intervencion excepcional, la Procuraduria en supervigilancia y las victimas; un juez laboral externo no participa como sujeto procesal.",
    topic: "Sujetos procesales"
  },
  {
    id: 11,
    question: "Situacion\n\nUn funcionario de la Secretaria de Hacienda del Municipio de Copacabana es vinculado a una investigacion disciplinaria. No cuenta con recursos para contratar un abogado particular y desconoce cuales son sus derechos dentro del proceso.\n\nPregunta\n\nSegun la situacion descrita, ¿cual es un derecho esencial del disciplinable?",
    options: [
      "Designar apoderado, solicitar y controvertir pruebas y presentar alegatos",
      "Escoger la autoridad que lo investigara",
      "Renunciar a la defensa y recibir la sancion que prefiera",
      "Exigir que el proceso carezca de publicidad"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el funcionario tiene derecho de defensa integral: designar apoderado, solicitar, aportar o controvertir pruebas, rendir descargos y presentar alegatos, y si no tiene recursos, se le asignara defensor de oficio.",
    topic: "Derechos del disciplinable"
  },
  {
    id: 12,
    question: "Situacion\n\nUn servidor publico de la Alcaldia de La Estrella es investigado por no haber cumplido una meta de gestion asignada por su jefe inmediato. El funcionario argumenta que el incumplimiento de metas no constituye falta disciplinaria.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cuando se configura una falta disciplinaria?",
    options: [
      "Ejecuta cualquier conducta no prevista en la ley",
      "Desconoce deberes, prohibiciones o regimen de inhabilidades descritos en el Codigo General Disciplinario",
      "Unicamente comete delitos penales",
      "Incumple metas de gestion asignadas por la entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el funcionario tiene razon parcialmente: el Codigo General Disciplinario define como falta la conducta descrita en la ley como incumplimiento de deberes, prohibiciones, inhabilidades, incompatibilidades o conflictos de interes, no el simple incumplimiento de metas de gestion.",
    topic: "Faltas disciplinarias"
  },
  {
    id: 13,
    question: "Situacion\n\nUna funcionaria de la Secretaria de Gobierno de Caldas (Antioquia) tiene conocimiento de que un companero esta cometiendo irregularidades en el manejo de recursos publicos. Ella duda si tiene la obligacion de denunciar estos hechos.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es un deber disciplinario expresamente previsto?",
    options: [
      "Negarse a rendir cuentas sobre bienes publicos",
      "Denunciar delitos y faltas disciplinarias conocidos, salvo excepciones legales",
      "Aceptar regalos de agradecimiento de los usuarios",
      "Delegar funciones en terceros sin autorizacion"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la funcionaria tiene la obligacion de denunciar porque la Ley 1952 ordena denunciar los delitos, contravenciones y faltas disciplinarias de los que se tenga conocimiento, salvo reservas legales especificas.",
    topic: "Deberes del servidor publico"
  },
  {
    id: 14,
    question: "Situacion\n\nUn funcionario de la Secretaria de Transito de Girardota es sorprendido solicitando una suma de dinero a un ciudadano para agilizar un tramite de licencia de conduccion. El ciudadano denuncia el hecho ante la Personeria Municipal.\n\nPregunta\n\nSegun la situacion descrita, ¿cual es una prohibicion expresa del regimen disciplinario?",
    options: [
      "Solicitar dadivas o favores relacionados con la funcion",
      "Rechazar regalos ofrecidos por los usuarios",
      "Exigir que las quejas se presenten por escrito",
      "Reportar hechos irregulares a la autoridad competente"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el funcionario incurrio en una prohibicion expresa porque entre las prohibiciones esta solicitar dadivas, cobrar por tramites, omitir o retardar el servicio o nombrar personas sin requisitos.",
    topic: "Prohibiciones disciplinarias"
  },
  {
    id: 15,
    question: "Situacion\n\nLa Oficina de Control Interno Disciplinario de la Gobernacion de Antioquia se encuentra en la etapa de instruccion de un proceso contra varios funcionarios. El instructor ha recopilado suficiente material probatorio y debe decidir si formula cargos o archiva el proceso.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que caracteriza a la instruccion dentro del proceso disciplinario?",
    options: [
      "Ser la etapa en la que se decide la sancion",
      "Recopilar pruebas en indagacion previa o investigacion para determinar existencia de la falta y autor, pudiendo archivarse o formular cargos",
      "Permitir la conciliacion entre disciplinante y disciplinado",
      "Excluir la practica de pruebas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el instructor esta actuando correctamente porque la instruccion reune elementos probatorios, identifica la conducta y al presunto autor y concluye archivando o formulando cargos.",
    topic: "Procedimiento disciplinario - Instruccion"
  },
  {
    id: 16,
    question: "Situacion\n\nUna vez formulado el pliego de cargos contra un funcionario de la Alcaldia de Barbosa, el proceso pasa a la etapa de juzgamiento. El funcionario de juzgamiento debe evaluar los cargos y las pruebas recaudadas. Durante esta etapa surgen nuevas pruebas que modifican la calificacion juridica de la conducta.\n\nPregunta\n\nCon base en la situacion descrita, ¿que caracteriza al juzgamiento disciplinario?",
    options: [
      "Se limita a revisar formalmente el pliego sin practicar pruebas",
      "Puede ser adelantado por el mismo funcionario instructor para garantizar coherencia",
      "Evalua el pliego de cargos, permite modificarlo por pruebas sobrevinientes, practicar nuevas pruebas y culmina con fallo absolutorio o sancionatorio",
      "Siempre finaliza con sancion pecuniaria"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, el operador de juzgamiento puede actuar conforme a las nuevas pruebas porque el juzgamiento estudia cargos, admite variaciones justificadas, practica pruebas y concluye con decision absolutoria o sancionatoria por autoridad distinta a la instructora.",
    topic: "Procedimiento disciplinario - Juzgamiento"
  },
  {
    id: 17,
    question: "Situacion\n\nEl jefe de la Oficina de Control Interno Disciplinario de un municipio del oriente antioqueno recibe informacion de un servidor publico sobre presuntas irregularidades en la contratacion de la Secretaria de Infraestructura. No existe queja formal de ningun ciudadano.\n\nPregunta\n\nSegun la situacion descrita, ¿cuando puede iniciarse de oficio la accion disciplinaria?",
    options: [
      "El investigado reconoce voluntariamente su responsabilidad",
      "Existe informacion creible proveniente de servidor publico u otra fuente, sin necesidad de queja formal",
      "La queja es anonima y no cumple requisitos legales",
      "El disciplinado solicita la investigacion para aclarar su conducta"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el jefe de la oficina puede iniciar el proceso de oficio porque la accion puede iniciarse cuando la autoridad cuenta con informacion seria; las quejas anonimas solo proceden si cumplen las exigencias de las Leyes 190 de 1995 y 24 de 1992.",
    topic: "Inicio de la actuacion disciplinaria"
  },
  {
    id: 18,
    question: "Situacion\n\nEl operador disciplinario de la Personeria de Caucasia debe calificar la conducta de un funcionario que aprobo pagos sin verificar la ejecucion de los contratos. Debe determinar si la conducta es tipica y valorar el grado de culpabilidad.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que implica la tipicidad disciplinaria?",
    options: [
      "La autoridad puede sancionar conductas no previstas si son socialmente reprochables",
      "La conducta debe encuadrarse en una falta descrita en la ley y se evalua su culpabilidad y gravedad",
      "La sancion se fija segun la costumbre administrativa",
      "Solo se analizan aspectos morales de la conducta"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el operador debe verificar la tipicidad, que exige correlacionar la conducta con faltas previstas legalmente y valorar culpabilidad (dolo o culpa) y gravedad.",
    topic: "Responsabilidad disciplinaria - Tipicidad"
  },
  {
    id: 19,
    question: "Situacion\n\nUn tesorero municipal de Yarumal aprobo el desembolso de recursos para un contratista sin que este hubiera cumplido los requisitos contractuales. En el proceso disciplinario se establecio que el funcionario conocia perfectamente la irregularidad pero decidio realizar el pago de todas formas.\n\nPregunta\n\nCon base en la situacion descrita, ¿cuando se considera que el disciplinable actua con dolo?",
    options: [
      "Desconoce la ilicitud de su conducta por error invencible",
      "Preve la falta y su ilicitud y aun asi decide ejecutarla",
      "Confia en que su conducta sera declarada atipica",
      "Actua sin intencion ni prevision del resultado"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el tesorero actuo con dolo porque el dolo supone conocimiento de la falta y voluntad de realizarla pese a conocer su ilicitud, exactamente como ocurrio en este caso.",
    topic: "Responsabilidad disciplinaria - Culpabilidad"
  },
  {
    id: 20,
    question: "Situacion\n\nUn funcionario de la Alcaldia de Puerto Berrio es investigado por no haber ejecutado una orden de su superior relacionada con el desalojo de vendedores ambulantes. El funcionario alega que no cumplio la orden porque fue amenazado de muerte por los afectados.\n\nPregunta\n\nSegun la situacion descrita, ¿cual es una causal de exclusion de responsabilidad disciplinaria?",
    options: [
      "Falta de motivacion en el fallo",
      "Miedo insuperable o fuerza mayor que impiden actuar conforme al deber",
      "Desacuerdo con la jerarquia del superior",
      "Ausencia de antecedentes disciplinarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, si se comprueba la amenaza, el funcionario podria quedar exento de responsabilidad porque eximen responsabilidad causales como fuerza mayor, caso fortuito, miedo o coaccion insuperables, cumplimiento de orden legitima, entre otras.",
    topic: "Responsabilidad disciplinaria - Causales de exclusion"
  }
]

const questionsV2: Question[] = [
  {
    id: 1,
    question: "Situacion\n\nLa Procuraduria Provincial de Turbo investiga a un funcionario por presunta comision de una falta gravisima. El operador disciplinario necesita verificar en que articulos del Codigo General Disciplinario se encuentran clasificadas estas faltas para tipificar correctamente la conducta.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿donde se encuentra la clasificacion de las faltas gravisimas en el Codigo General Disciplinario?",
    options: [
      "En los articulos 5 al 20 de la Ley 1952 de 2019",
      "En los articulos 52 al 66 de la Ley 1952 de 2019",
      "Unicamente en decretos reglamentarios del Gobierno Nacional",
      "En el Codigo Penal"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el operador debe consultar los articulos 52 a 66 de la Ley 1952 de 2019, que enumeran taxativamente las faltas gravisimas.",
    topic: "Clasificacion de las faltas"
  },
  {
    id: 2,
    question: "Situacion\n\nUn funcionario de la Secretaria de Planeacion de Apartado es declarado responsable de una falta grave cometida a titulo de culpa. El operador de juzgamiento debe determinar la sancion aplicable segun la ley disciplinaria.\n\nPregunta\n\nCon base en la situacion descrita, ¿que sancion puede acarrear una falta grave culposa?",
    options: [
      "Destitucion e inhabilidad general de 10 a 20 anos",
      "Suspension e inhabilidad especial entre 1 y 18 meses",
      "Solo una amonestacion escrita",
      "Multa de 5 a 20 dias de salario"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el operador debe imponer suspension e inhabilidad especial de 1 a 18 meses, que es la sancion prevista para faltas graves culposas.",
    topic: "Sanciones disciplinarias"
  },
  {
    id: 3,
    question: "Situacion\n\nUn servidor publico de carrera administrativa de la Gobernacion de Antioquia es sancionado con destitucion e inhabilidad general por la comision de una falta gravisima dolosa. El funcionario pregunta si puede posesionarse en otro cargo publico mientras se resuelve su recurso de apelacion.\n\nPregunta\n\nSegun la situacion descrita, ¿que implica la destitucion disciplinaria?",
    options: [
      "Se suspende al servidor solo por un mes",
      "Pierde la relacion con la administracion sin importar el tipo de vinculacion y queda inhabilitado para ejercer funciones publicas por el termino fijado",
      "Puede seguir ejerciendo otras funciones publicas",
      "Es sustituida automaticamente por una multa"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el funcionario no puede posesionarse en otro cargo porque la destitucion desvincula al disciplinado de su cargo, finaliza cualquier relacion con la administracion y genera inhabilidad general por el termino senalado.",
    topic: "Efectos de las sanciones"
  },
  {
    id: 4,
    question: "Situacion\n\nEn el proceso disciplinario contra un funcionario de la ESE Hospital San Rafael de Itagui, el investigado acepta los cargos formulados y presenta pruebas de que resarcio integralmente el dano causado a la entidad. El operador debe valorar si estas circunstancias atenuan la sancion.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cual es un atenuante de la responsabilidad disciplinaria?",
    options: [
      "Atribuir infundadamente la falta a un tercero",
      "Confesar o aceptar los cargos, o resarcir el dano causado",
      "Recibir recompensa por la conducta",
      "Pertenecer al nivel directivo de la entidad"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, tanto la aceptacion de cargos como el resarcimiento del dano son atenuantes validos porque constituyen atenuantes la diligencia en el cargo, ausencia de antecedentes, confesion o aceptacion de cargos y reparacion del dano.",
    topic: "Atenuantes y agravantes"
  },
  {
    id: 5,
    question: "Situacion\n\nAl momento de dosificar la sancion contra un funcionario de la Alcaldia de Chigorodo, el operador disciplinario encuentra que el investigado fue sancionado disciplinariamente hace tres anos por una falta similar. El operador debe determinar si esta circunstancia agrava la sancion.\n\nPregunta\n\nCon base en la situacion descrita, ¿cual es un agravante disciplinario?",
    options: [
      "Resarcir el dano ocasionado",
      "Haber sido sancionado disciplinaria o fiscalmente en los ultimos cinco anos",
      "Falta de antecedentes disciplinarios",
      "Presentar descargos dentro del termino"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la sancion anterior si constituye un agravante porque ser reincidente en sanciones disciplinarias o fiscales dentro de cinco anos es un agravante; tambien lo son el grave dano social, conocimiento de la ilicitud o recibir recompensa.",
    topic: "Atenuantes y agravantes"
  },
  {
    id: 6,
    question: "Situacion\n\nUn funcionario de la Secretaria de Gobierno de Rionegro es declarado responsable de una falta leve cometida con dolo. El operador de juzgamiento debe consultar cual es la sancion principal aplicable a este tipo de falta.\n\nPregunta\n\nSegun la situacion descrita, ¿para que tipo de faltas procede la multa como sancion disciplinaria?",
    options: [
      "Faltas gravisimas con dolo",
      "Faltas leves, tanto dolosas como culposas, con rangos de 20-90 o 5-20 dias de salario basico",
      "Todas las faltas graves",
      "Cualquier falta cometida por particulares"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el operador debe imponer multa porque las faltas leves tienen como consecuencia principal la multa: de 20 a 90 dias cuando son dolosas y de 5 a 20 dias si son culposas.",
    topic: "Sanciones disciplinarias"
  },
  {
    id: 7,
    question: "Situacion\n\nUn funcionario investigado por la Personeria de Marinilla alega que no sabia que su conducta era contraria a la ley, pese a haber actuado con la diligencia debida para conocer la normativa aplicable. El operador debe evaluar si procede la exclusion de responsabilidad por error invencible.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿que significa el error invencible sobre la ilicitud como causal de exclusion?",
    options: [
      "El investigado desconoce la norma pese a que podia conocerla",
      "Existia un conocimiento pleno de la falta y aun asi decidio realizarla",
      "No podia conocer la ilicitud pese a emplear la diligencia debida",
      "La autoridad le informo previamente que la conducta era licita a cambio de dinero"
    ],
    correctAnswer: 2,
    points: 5,
    explanation: "En la situacion descrita, si se comprueba que el funcionario no podia conocer la ilicitud pese a actuar diligentemente, procederia la exclusion porque el error invencible implica imposibilidad de conocer la ilicitud incluso actuando con la diligencia exigible.",
    topic: "Responsabilidad disciplinaria - Exclusiones"
  },
  {
    id: 8,
    question: "Situacion\n\nLa Oficina de Control Interno Disciplinario de la Asamblea Departamental de Antioquia encuentra que la falta investigada ocurrio hace cuatro anos y ocho meses. El instructor debe verificar si la accion disciplinaria aun puede ejercerse o si ya prescribio.\n\nPregunta\n\nCon base en la situacion descrita, ¿en cuanto tiempo prescribe, por regla general, la accion disciplinaria?",
    options: [
      "Tres anos contados desde la apertura de investigacion",
      "Cinco anos contados desde la consumacion de la falta o el ultimo acto en conductas continuadas",
      "Seis meses desde la queja",
      "Doce anos para todas las faltas"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la accion aun puede ejercerse porque la prescripcion general es de cinco anos, salvo faltas relacionadas con violaciones de derechos humanos o DIH que prescriben en doce anos.",
    topic: "Extincion y prescripcion de la accion disciplinaria"
  },
  {
    id: 9,
    question: "Situacion\n\nLa Personeria de Santa Fe de Antioquia recibe una queja sobre hechos que ocurrieron hace cuatro anos y once meses. Al revisar el expediente, el personero encuentra que nunca se profrio auto de apertura de investigacion disciplinaria. Debe determinar si opero la caducidad.\n\nPregunta\n\nSegun la situacion descrita, ¿cuando ocurre la caducidad de la accion disciplinaria?",
    options: [
      "Transcurren cinco anos sin que se expida auto de apertura de investigacion",
      "El investigado renuncia al cargo",
      "Se interpone recurso de apelacion contra el fallo",
      "Se decreta nulidad dentro del proceso"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, aun no ha operado la caducidad pero esta proxima porque la accion caduca si transcurren cinco anos desde la ocurrencia de la falta sin que se haya proferido auto de apertura de investigacion disciplinaria.",
    topic: "Extincion de la accion disciplinaria"
  },
  {
    id: 10,
    question: "Situacion\n\nLa Oficina de Control Interno Disciplinario de la Alcaldia de Envigado profiere auto de apertura de investigacion contra un funcionario. El secretario del despacho debe determinar como notificar esta decision al investigado.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿sobre que tipo de decisiones se practica notificacion personal en el proceso disciplinario?",
    options: [
      "Autos de apertura, vinculacion, pliegos de cargos y fallos de instancia",
      "Traslado del dictamen pericial",
      "Auto de cierre de investigacion",
      "Todas las decisiones de tramite menores"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, el auto de apertura debe notificarse personalmente porque se notifican personalmente decisiones como el auto de apertura de investigacion, auto de vinculacion, pliego de cargos y los fallos disciplinarios.",
    topic: "Notificaciones disciplinarias"
  },
  {
    id: 11,
    question: "Situacion\n\nConcluida la etapa probatoria en un proceso disciplinario de la Procuraduria Provincial de Medellin, se profiere auto de cierre de investigacion. El secretario debe determinar el mecanismo de notificacion de esta decision.\n\nPregunta\n\nCon base en la situacion descrita, ¿para que tipo de decisiones procede la notificacion por estado?",
    options: [
      "El auto que resuelve el recurso de apelacion",
      "El auto de cierre de investigacion y el traslado para alegatos precalificados",
      "El fallo de primera instancia",
      "La variacion del pliego de cargos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el auto de cierre se notifica por estado porque el auto de cierre de investigacion y el traslado para alegatos precalificados se notifican por estado, al igual que el traslado del dictamen pericial.",
    topic: "Notificaciones disciplinarias"
  },
  {
    id: 12,
    question: "Situacion\n\nDurante la audiencia de juzgamiento de un proceso disciplinario verbal en la Personeria de Bello, el operador disciplinario profiere fallo sancionatorio. El disciplinado, quien asistio a la audiencia con su apoderado, pregunta como queda notificado de la decision.\n\nPregunta\n\nSegun la situacion descrita, ¿cuando se entiende realizada la notificacion en estrado?",
    options: [
      "Se envia por correo electronico certificado",
      "La decision se profiere en audiencia publica o diligencia verbal y queda notificada inmediatamente a todos los sujetos procesales",
      "Se fija edicto en la cartelera",
      "El disciplinado firma el acta de archivo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el disciplinado ya quedo notificado porque las decisiones adoptadas en audiencia o diligencia verbal se notifican inmediatamente en estrado a quienes intervienen.",
    topic: "Notificaciones disciplinarias"
  },
  {
    id: 13,
    question: "Situacion\n\nEl operador disciplinario de la Contraloria General de Antioquia necesita verificar el estado de unos bienes muebles que presuntamente fueron apropiados por un funcionario. Para ello, planea realizar una inspeccion en las instalaciones de la entidad.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cual es un medio de prueba disciplinario valido?",
    options: [
      "La inspeccion disciplinaria sobre bienes o lugares con levantamiento de acta",
      "La confesion judicial unicamente en procesos penales",
      "El rumor de los medios de comunicacion",
      "El voto en las asambleas ciudadanas"
    ],
    correctAnswer: 0,
    points: 5,
    explanation: "En la situacion descrita, la inspeccion que planea el operador es un medio de prueba valido porque la inspeccion disciplinaria recae sobre bienes o lugares y debe documentarse mediante acta con los elementos observados.",
    topic: "Medios de prueba"
  },
  {
    id: 14,
    question: "Situacion\n\nEl apoderado del investigado en un proceso adelantado por la Oficina de Control Interno Disciplinario de Medellin solicita la practica de una prueba. El operador debe evaluar si la prueba cumple los requisitos para ser admitida.\n\nPregunta\n\nCon base en la situacion descrita, ¿que se requiere para admitir una prueba disciplinaria?",
    options: [
      "Impertinente para evitar retrasos",
      "Conducente al hecho, pertinente y obtenida legalmente",
      "Unicamente documental",
      "Solicitada por el Ministerio Publico"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el operador debe verificar que la prueba sea conducente, pertinente y obtenida legalmente; se rechazan las inconducentes, impertinentes o superfluas.",
    topic: "Medios de prueba"
  },
  {
    id: 15,
    question: "Situacion\n\nUn funcionario investigado por la Procuraduria Regional de Antioquia decide aceptar los cargos formulados en su contra durante la etapa de investigacion. El apoderado lo asesora sobre los beneficios de esta aceptacion y el momento procesal oportuno.\n\nPregunta\n\nSegun la situacion descrita, ¿que beneficios tiene la confesion o aceptacion de cargos con acompanamiento de defensor?",
    options: [
      "Debe presentarse antes de la apertura de la investigacion",
      "Puede realizarse hasta antes de la ejecutoria del auto de cierre y permite reduccion de sancion hasta la mitad si es en investigacion o de una tercera parte si es en juzgamiento",
      "No produce beneficios frente a la sancion",
      "Solo procede cuando ya existe fallo sancionatorio"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el apoderado asesora correctamente porque la confesion puede formularse desde la apertura hasta antes de la ejecutoria del auto de cierre; reduce la sancion hasta la mitad si se hace en investigacion y en una tercera parte si es en juzgamiento.",
    topic: "Medios de prueba - Confesion"
  },
  {
    id: 16,
    question: "Situacion\n\nEl fallo de primera instancia en un proceso disciplinario de la Personeria de Copacabana es notificado personalmente al investigado. El apoderado debe interponer recursos de reposicion y apelacion contra la decision.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿en que termino deben interponerse los recursos de reposicion y apelacion?",
    options: [
      "Dentro de los cinco dias siguientes a la notificacion y siempre por escrito",
      "Desde la expedicion de la decision hasta cinco dias despues de la notificacion, sustandolos dentro del mismo termino",
      "Unicamente mediante apoderado judicial",
      "Solo cuando la decision sea de tramite"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el apoderado tiene plazo desde la expedicion y hasta cinco dias posteriores a la notificacion; si la decision se profiere en estrados, deben sustentarse alli.",
    topic: "Recursos disciplinarios"
  },
  {
    id: 17,
    question: "Situacion\n\nEl operador disciplinario de primera instancia en la Alcaldia de La Ceja rechaza el recurso de apelacion interpuesto por el apoderado del investigado por considerarlo extemporaneo. El apoderado no esta de acuerdo con esta decision.\n\nPregunta\n\nCon base en la situacion descrita, ¿contra que tipo de decisiones procede el recurso de queja?",
    options: [
      "Fallos de segunda instancia",
      "Decisiones que rechazan el recurso de apelacion",
      "Autos que decreten pruebas",
      "Actos de tramite sin efectos definitivos"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el apoderado puede interponer recurso de queja porque la queja es procedente contra la decision que inadmite un recurso de apelacion.",
    topic: "Recursos disciplinarios"
  },
  {
    id: 18,
    question: "Situacion\n\nEl apoderado de un funcionario investigado por la Oficina de Control Interno Disciplinario del IDEA considera que el operador disciplinario carece de competencia para conocer el proceso. Solicita que se declare la nulidad de lo actuado.\n\nPregunta\n\nSegun la situacion descrita, ¿por que causales puede alegarse una nulidad disciplinaria?",
    options: [
      "Simple inconformidad con la valoracion probatoria",
      "Falta de competencia o violacion del derecho de defensa que afecte el debido proceso, siempre que no exista otro medio para subsanar",
      "No haber concedido terminos probatorios adicionales",
      "No invocar oportunamente recursos ordinarios"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, el apoderado tiene fundamento para solicitar la nulidad porque las nulidades se plantean por vicios como falta de competencia o violacion del debido proceso; deben proponerse antes del traslado para alegatos y solo proceden si no hay otro medio para corregir el vicio.",
    topic: "Nulidades disciplinarias"
  },
  {
    id: 19,
    question: "Situacion\n\nEl fallo sancionatorio de primera instancia contra un funcionario de la Secretaria de Salud de Medellin fue notificado hace seis dias y el apoderado no interpuso ningun recurso. El funcionario pregunta si la decision ya quedo en firme.\n\nPregunta\n\nDe acuerdo con la situacion descrita, ¿cuando queda ejecutoriada una decision disciplinaria?",
    options: [
      "El disciplinado manifiesta su desacuerdo verbal",
      "No procede recurso, o si procedia, no fue interpuesto o ya se resolvio; tambien despues de cinco dias sin recurso tras la ultima notificacion",
      "Se radica un memorial ante la Procuraduria",
      "El investigado renuncia al cargo"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la decision ya quedo ejecutoriada porque la ejecutoria se da cuando no existen recursos procedentes, no se interponen dentro del termino o se resuelven; igualmente se produce tras cinco dias sin recurso desde la ultima notificacion.",
    topic: "Ejecutoria de decisiones"
  },
  {
    id: 20,
    question: "Situacion\n\nUna vez ejecutoriado el fallo sancionatorio contra un funcionario de la Gobernacion de Antioquia, el operador disciplinario debe proceder al registro de la sancion. El secretario del despacho pregunta ante que entidad debe reportarse.\n\nPregunta\n\nCon base en la situacion descrita, ¿donde deben registrarse las sanciones disciplinarias?",
    options: [
      "El despacho del jefe inmediato",
      "La Division de Registro y Control y Correspondencia de la Procuraduria General de la Nacion para efectos del certificado de antecedentes",
      "La Registraduria Nacional del Estado Civil",
      "Los juzgados penales del circuito"
    ],
    correctAnswer: 1,
    points: 5,
    explanation: "En la situacion descrita, la sancion debe reportarse a la Procuraduria, a traves de la Division de Registro y Control y Correspondencia, que lleva el registro de sanciones disciplinarias para expedir certificados de antecedentes.",
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
          Esta prueba contiene {questions.length} preguntas sobre el proceso disciplinario de los servidores publicos.
          Total de puntos disponibles: {questions.reduce((sum, q) => sum + q.points, 0)} puntos.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selecciona la version de la prueba</CardTitle>
          <CardDescription>
            Cada version incluye 20 preguntas basadas en el compendio del proceso disciplinario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedVersion} onValueChange={handleVersionChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="v1" disabled={showResults}>
                Version 1
              </TabsTrigger>
              <TabsTrigger value="v2" disabled={showResults}>
                Version 2
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {showResults && (
            <p className="mt-3 text-sm text-muted-foreground">Reinicia la prueba para cambiar de version.</p>
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
            <p className="font-medium leading-relaxed whitespace-pre-line">{question.question}</p>

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
                    <strong>Explicacion:</strong> {question.explanation}
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
              {showFeedback ? "Ocultar" : "Mostrar"} Retroalimentacion
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
