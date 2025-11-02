import { BehavioralSubject } from "./behavioral-competencies"

export const behavioralSubjectsV2: BehavioralSubject[] = [
  {
    id: "adaptacion-cambio",
    title: "Adaptación al Cambio",
    description: "Flexibilidad ante nuevas situaciones y cooperación activa en su implementación.",
    intro:
      "Evalúa cómo respondes ante cambios organizacionales, la disposición para apoyar nuevas decisiones y la capacidad de guiar a tu equipo durante las transiciones.",
    reference: "Sección 2.6 del Decreto 815 de 2018 - Adaptación al Cambio.",
    questions: [
      {
        id: "adaptacion-cambio-v2-1",
        text: "¿Cuál es el rol principal del servidor público frente a los cambios organizacionales según el Decreto 815?",
        options: [
          { value: "a", label: "Mantener las prácticas anteriores hasta recibir capacitación formal completa." },
          { value: "b", label: "Facilitar la transición apoyando activamente la implementación de nuevas formas de trabajo." },
          { value: "c", label: "Observar pasivamente cómo otros implementan los cambios antes de participar." },
          { value: "d", label: "Solicitar prórroga en la aplicación de cambios hasta completar otras tareas pendientes." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El decreto establece que se debe facilitar la transición y apoyar activamente la implementación, demostrando flexibilidad y compromiso institucional.",
        review:
          "Revisa la sección de Adaptación al Cambio: la actitud proactiva y el apoyo activo son fundamentales durante transiciones organizacionales.",
      },
      {
        id: "adaptacion-cambio-v2-2",
        text: "Cuando un equipo manifiesta resistencia ante un cambio institucional, el servidor debe:",
        options: [
          { value: "a", label: "Reportar inmediatamente la resistencia y solicitar medidas disciplinarias." },
          { value: "b", label: "Acompañar al equipo, escuchar sus inquietudes y promover una integración constructiva del cambio." },
          { value: "c", label: "Ignorar la resistencia y continuar con la implementación forzada del cambio." },
          { value: "d", label: "Posponer el cambio hasta que todos estén completamente de acuerdo." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La adaptación al cambio implica promover que el grupo se adapte mediante acompañamiento y generación de un ambiente de soporte constructivo.",
        review:
          "Consulta las conductas asociadas: acompañar al equipo y promover la adaptación positiva son competencias clave.",
      },
      {
        id: "adaptacion-cambio-v2-3",
        text: "La respuesta flexible ante situaciones nuevas significa:",
        options: [
          { value: "a", label: "Ajustar comportamientos y métodos de trabajo para alinearse con las nuevas condiciones institucionales." },
          { value: "b", label: "Esperar instrucciones detalladas antes de modificar cualquier procedimiento establecido." },
          { value: "c", label: "Mantener procedimientos anteriores como respaldo ante posibles fallas del cambio." },
          { value: "d", label: "Aplicar cambios solo si no afectan la carga de trabajo actual." },
        ],
        correctOption: "a",
        score: 10,
        explanation:
          "El Decreto 815 enfatiza aceptar y responder con flexibilidad, ajustando comportamientos y métodos según las necesidades institucionales.",
        review:
          "Repasa el concepto de flexibilidad organizacional: implica ajustar proactivamente comportamientos y métodos de trabajo.",
      },
      {
        id: "adaptacion-cambio-v2-4",
        text: "¿Qué caracteriza a un servidor que coopera activamente en la implementación de cambios?",
        options: [
          { value: "a", label: "Participa en reuniones informativas pero espera a que otros ejecuten las acciones." },
          { value: "b", label: "Integra nuevos objetivos en su trabajo diario y apoya a colegas en la transición." },
          { value: "c", label: "Documenta los cambios sin modificar sus rutinas de trabajo establecidas." },
          { value: "d", label: "Delega la implementación a niveles superiores o a áreas especializadas." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "Cooperar activamente significa integrar los nuevos objetivos en el trabajo diario y apoyar al equipo en la adopción de las nuevas prácticas.",
        review:
          "Revisa las conductas de cooperación activa: implica integración práctica y apoyo colaborativo al equipo.",
      },
      {
        id: "adaptacion-cambio-v2-5",
        text: "Eres responsable de implementar un nuevo sistema de gestión. Algunos empleados se resisten al cambio y continúan utilizando el sistema antiguo. ¿Cómo manejarías esta resistencia al cambio?",
        options: [
          { value: "a", label: "Ignorar a los empleados que se resisten y seguir adelante con la implementación." },
          { value: "b", label: "Forzar a los empleados a usar el nuevo sistema bajo amenaza de sanciones." },
          { value: "c", label: "Organizar sesiones de capacitación adicionales y explicar los beneficios del nuevo sistema para obtener su aceptación." },
          { value: "d", label: "Permitir que los empleados elijan qué sistema quieren usar." },
        ],
        correctOption: "c",
        score: 10,
        explanation:
          "Organizar capacitaciones y explicar beneficios es la mejor estrategia para gestionar la resistencia al cambio, generando comprensión y aceptación. Esta conducta demuestra adaptación al cambio mediante el acompañamiento al equipo.",
        review:
          "Revisa las conductas de adaptación al cambio: promover que el grupo se adapte a nuevas condiciones requiere acompañamiento, explicación y generación de aceptación constructiva.",
      },
      {
        id: "adaptacion-cambio-v2-6-b",
        text: "Adaptación al cambio requiere:",
        options: [
          { value: "a", label: "Rechazar nuevas metas" },
          { value: "b", label: "Aceptar y apoyar nuevas situaciones, procesos y objetivos institucionales" },
          { value: "c", label: "Limitarse a procedimientos antiguos" },
          { value: "d", label: "Detener la transformación organizacional" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "La competencia se enfoca en aceptar, apoyar y gestionar positivamente los cambios institucionales.",
        review:
          "Repasa la competencia Adaptación al Cambio: aceptar y apoyar nuevas situaciones, procesos y objetivos es fundamental.",
      },
      {
        id: "adaptacion-cambio-v2-6-c",
        text: "Abandonar tareas ante dificultades no previstas refleja:",
        options: [
          { value: "a", label: "Resiliencia" },
          { value: "b", label: "Falta de perseverancia y adaptación al cambio" },
          { value: "c", label: "Capacidad de priorización" },
          { value: "d", label: "Gestión estratégica" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "La adaptación al cambio requiere mantener el esfuerzo, buscar soluciones y gestionar los obstáculos.",
        review:
          "Consulta la competencia Adaptación al Cambio: requiere perseverancia, búsqueda de soluciones y gestión de obstáculos.",
      },
      {
        id: "adaptacion-cambio-v2-6",
        text: "Al documentar la competencia de Adaptación al Cambio, el Decreto 815 exige incluir:",
        options: [
          { value: "a", label: "Solo la descripción general de la conducta sin detallar responsabilidades." },
          { value: "b", label: "Responsabilidad sobre personal, habilidades y aptitudes, responsabilidad decisoria, iniciativa e innovación y valor estratégico de la responsabilidad." },
          { value: "c", label: "La lista de cursos que debe tomar cada servidor para fortalecer la competencia." },
          { value: "d", label: "Los indicadores financieros asociados al área donde se ejerce la competencia." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El artículo 2.2.4.6 establece cinco criterios para describir una competencia comportamental: responsabilidades sobre personal, habilidades y aptitudes, responsabilidad decisoria, iniciativa e innovación y valor estratégico.",
        review:
          "Consulta el artículo 2.2.4.6 del Decreto 815: los cinco criterios garantizan descripciones completas y comparables de las competencias comportamentales.",
      },
    ],
  },
  {
    id: "aporte-tecnico",
    title: "Aporte Técnico - Profesional",
    description: "Contribución de conocimientos especializados para anticipar y resolver problemas.",
    intro:
      "Pon a prueba tu capacidad para aportar soluciones técnicas, anticipar problemas y aprovechar la interdisciplinariedad dentro de tu rol profesional.",
    reference: "Sección 3.1 del Decreto 815 de 2018 - Aporte técnico-profesional.",
    questions: [
      {
        id: "aporte-tecnico-v2-1",
        text: "¿Qué implica aportar conocimientos especializados según el Decreto 815?",
        options: [
          { value: "a", label: "Compartir experiencia técnica para mejorar procesos y resolver situaciones problemáticas de manera proactiva." },
          { value: "b", label: "Limitar el conocimiento especializado a reportes escritos sin participar en soluciones prácticas." },
          { value: "c", label: "Aplicar conocimientos solo cuando sean solicitados explícitamente por superiores." },
          { value: "d", label: "Utilizar el conocimiento técnico exclusivamente para tareas asignadas individualmente." },
        ],
        correctOption: "a",
        score: 10,
        explanation:
          "El aporte técnico-profesional requiere compartir experiencia especializada proactivamente para anticipar problemas y contribuir a soluciones efectivas.",
        review:
          "Repasa la sección de Aporte Técnico: la proactividad y la contribución a soluciones son elementos centrales.",
      },
      {
        id: "aporte-tecnico-v2-2",
        text: "Anticipar problemas previsibles en el contexto profesional significa:",
        options: [
          { value: "a", label: "Esperar a que los problemas se materialicen para documentarlos adecuadamente." },
          { value: "b", label: "Identificar riesgos potenciales con base en conocimiento técnico y proponer medidas preventivas." },
          { value: "c", label: "Reportar situaciones solo cuando causen impacto en los indicadores de gestión." },
          { value: "d", label: "Delegar la identificación de riesgos a las áreas de control y auditoría." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "Anticipar implica usar el conocimiento especializado para identificar riesgos y proponer soluciones antes de que los problemas afecten el servicio.",
        review:
          "Consulta las conductas de anticipación: el uso proactivo del conocimiento técnico para prevenir problemas es clave.",
      },
      {
        id: "aporte-tecnico-v2-3",
        text: "¿Cómo se manifiesta la interdisciplinariedad en el aporte técnico-profesional?",
        options: [
          { value: "a", label: "Manteniendo estrictamente los límites de la propia disciplina sin involucrarse en otras áreas." },
          { value: "b", label: "Reconociendo y aprovechando aportes de otras disciplinas para enriquecer soluciones integrales." },
          { value: "c", label: "Limitando la colaboración a reuniones formales sin integración práctica de conocimientos." },
          { value: "d", label: "Priorizando siempre la perspectiva técnica propia sobre las de otras especialidades." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El decreto enfatiza reconocer y aprovechar los aportes de otras disciplinas para construir soluciones más completas y efectivas.",
        review:
          "Revisa el componente de interdisciplinariedad: implica integrar activamente aportes de diversas especialidades.",
      },
      {
        id: "aporte-tecnico-v2-4",
        text: "La experiencia especializada debe aplicarse para:",
        options: [
          { value: "a", label: "Resolver únicamente problemas técnicos específicos asignados por el supervisor." },
          { value: "b", label: "Contribuir a la generación de soluciones que beneficien procesos y objetivos institucionales." },
          { value: "c", label: "Documentar procedimientos técnicos sin involucrarse en su implementación práctica." },
          { value: "d", label: "Mantener el conocimiento técnico actualizado exclusivamente para certificaciones personales." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El aporte técnico-profesional busca que la experiencia especializada contribuya activamente a soluciones que fortalezcan los procesos institucionales.",
        review:
          "Refuerza la comprensión del aporte técnico: debe orientarse al beneficio de procesos y objetivos organizacionales.",
      },
      {
        id: "aporte-tecnico-v2-5",
        text: "Al definir las competencias funcionales de un empleo, el Decreto 815 establece que deben contemplarse:",
        options: [
          { value: "a", label: "Los manuales de procesos de otras entidades para homologar responsabilidades." },
          { value: "b", label: "Criterios de desempeño, conocimientos básicos, contextos de aplicación y evidencias que demuestren las contribuciones." },
          { value: "c", label: "Únicamente las herramientas tecnológicas utilizadas por el cargo." },
          { value: "d", label: "Las certificaciones y cursos voluntarios realizados por el servidor público." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El artículo 2.2.4.5 precisa que las competencias funcionales se definen con criterios de desempeño, conocimientos, contextos y evidencias que demuestren el aporte del empleo.",
        review:
          "Consulta el artículo 2.2.4.5: los cuatro elementos garantizan claridad en las competencias funcionales del empleo público.",
      },
      {
        id: "aporte-tecnico-v2-6",
        text: "El nivel Profesional se caracteriza por:",
        options: [
          { value: "a", label: "Ejecutar procesos y procedimientos técnicos aplicando ciencia y tecnología" },
          { value: "b", label: "Administrar trámites básicos" },
          { value: "c", label: "Apoyar tareas logísticas" },
          { value: "d", label: "Coordinar exclusivamente la agenda de directivos" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "Los profesionales ejecutan procesos técnicos y aplican conocimientos científicos y tecnológicos.",
        review:
          "Consulta las competencias del nivel Profesional: ejecutar procesos técnicos aplicando ciencia y tecnología.",
      },
      {
        id: "aporte-tecnico-v2-7",
        text: "Una competencia del nivel Profesional es:",
        options: [
          { value: "a", label: "Instrumentación de decisiones" },
          { value: "b", label: "Registro de correspondencia" },
          { value: "c", label: "Transporte de documentos" },
          { value: "d", label: "Turnos de vigilancia" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "Entre las competencias profesionales se encuentran aporte técnico-profesional, comunicación efectiva, instrumentación de decisiones y gestión de procedimientos.",
        review:
          "Repasa las competencias del nivel Profesional: aporte técnico, comunicación, instrumentación de decisiones y gestión de procedimientos.",
      },
    ],
  },
  {
    id: "aprendizaje-continuo",
    title: "Aprendizaje Continuo",
    description: "Actualización permanente mediante fuentes confiables y espacios de capacitación.",
    intro:
      "Mide tu compromiso con la formación constante, la búsqueda de nuevos conocimientos y la aplicación práctica de lo aprendido.",
    reference: "Sección 2.1 del Decreto 815 de 2018 - Aprendizaje continuo.",
    questions: [
      {
        id: "aprendizaje-continuo-v2-1",
        text: "¿Qué caracteriza el aprendizaje continuo según el Decreto 815?",
        options: [
          { value: "a", label: "Actualizar conocimientos solo cuando la entidad ofrezca capacitaciones obligatorias." },
          { value: "b", label: "Adquirir y desarrollar permanentemente conocimientos, habilidades y destrezas mediante fuentes confiables." },
          { value: "c", label: "Acumular certificados de capacitación sin aplicar los conocimientos en el trabajo diario." },
          { value: "d", label: "Delegar la responsabilidad de actualización al área de talento humano." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El aprendizaje continuo implica la adquisición y desarrollo permanente de conocimientos a través de fuentes confiables y espacios formales e informales.",
        review:
          "Revisa la definición de aprendizaje continuo: es un proceso permanente y proactivo, no limitado a capacitaciones formales obligatorias.",
      },
      {
        id: "aprendizaje-continuo-v2-2",
        text: "La aplicación práctica del conocimiento adquirido se evidencia cuando:",
        options: [
          { value: "a", label: "Se archivan certificados de capacitación en la hoja de vida sin cambios en el desempeño." },
          { value: "b", label: "Se integran nuevos conocimientos en las actividades laborales para mejorar procesos y resultados." },
          { value: "c", label: "Se comparte la asistencia a capacitaciones en reuniones sin modificar prácticas de trabajo." },
          { value: "d", label: "Se espera a recibir instrucciones específicas sobre cómo aplicar lo aprendido." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El decreto enfatiza que el conocimiento debe aplicarse en el trabajo para contribuir al mejoramiento de procesos y resultados institucionales.",
        review:
          "Consulta las conductas asociadas: la aplicación práctica del conocimiento en el trabajo diario es fundamental.",
      },
      {
        id: "aprendizaje-continuo-v2-3",
        text: "¿Qué papel juegan las fuentes confiables en el aprendizaje continuo?",
        options: [
          { value: "a", label: "Son opcionales si se cuenta con experiencia laboral suficiente." },
          { value: "b", label: "Garantizan que la actualización se base en información verificada y de calidad para el ejercicio profesional." },
          { value: "c", label: "Deben limitarse únicamente a publicaciones oficiales de la entidad empleadora." },
          { value: "d", label: "Son relevantes solo para cargos de nivel directivo o asesor." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "Las fuentes confiables aseguran que la actualización se realice con información verificada, actual y de calidad que respalde el ejercicio profesional.",
        review:
          "Repasa la importancia de las fuentes confiables: son esenciales para garantizar la calidad del aprendizaje continuo.",
      },
      {
        id: "aprendizaje-continuo-v2-4",
        text: "Los espacios de capacitación incluyen:",
        options: [
          { value: "a", label: "Únicamente programas formales certificados por instituciones educativas acreditadas." },
          { value: "b", label: "Tanto capacitaciones formales como espacios informales de aprendizaje autodirigido." },
          { value: "c", label: "Solo aquellas capacitaciones financiadas directamente por la entidad pública." },
          { value: "d", label: "Exclusivamente eventos presenciales organizados por el área de talento humano." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El Decreto 815 reconoce tanto espacios formales como informales de capacitación, incluyendo el aprendizaje autodirigido y continuo.",
        review:
          "Revisa el alcance de los espacios de capacitación: incluyen modalidades formales e informales de actualización profesional.",
      },
      {
        id: "aprendizaje-continuo-v2-5",
        text: "¿Cuáles son los componentes de las competencias laborales definidos en el Decreto 815?",
        options: [
          { value: "a", label: "Requisitos de estudio y experiencia del empleo, competencias funcionales y competencias comportamentales." },
          { value: "b", label: "Únicamente los requisitos de formación y las certificaciones técnicas vigentes." },
          { value: "c", label: "Las funciones misionales del área y las metas del plan de acción institucional." },
          { value: "d", label: "El plan de capacitación anual y los indicadores de desempeño individuales." },
        ],
        correctOption: "a",
        score: 10,
        explanation:
          "El artículo 2.2.4.3 establece que las competencias laborales se integran por requisitos de estudio y experiencia, competencias funcionales y competencias comportamentales.",
        review:
          "Revisa el artículo 2.2.4.3: identifica los tres componentes que estructuran las competencias laborales en el empleo público.",
      },
      {
        id: "aprendizaje-continuo-v2-6",
        text: "Aprendizaje continuo implica conductas como:",
        options: [
          { value: "a", label: "Resistirse a los cambios" },
          { value: "b", label: "Mantener competencias actualizadas, gestionar fuentes de información confiables y compartir conocimientos" },
          { value: "c", label: "Reservar el conocimiento" },
          { value: "d", label: "Depender de información sin verificar" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "La competencia demanda actualización permanente, uso de fuentes confiables y socialización del conocimiento.",
        review:
          "Consulta la competencia Aprendizaje Continuo: actualización, fuentes confiables y compartir conocimiento.",
      },
      {
        id: "aprendizaje-continuo-v2-7",
        text: "Invertir tiempo extra en capacitarse para servir mejor a la ciudadanía es un ejemplo de:",
        options: [
          { value: "a", label: "Falta de priorización" },
          { value: "b", label: "Aprendizaje continuo y compromiso con la excelencia" },
          { value: "c", label: "Uso indebido del tiempo" },
          { value: "d", label: "Conducta innecesaria" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "La autoformación constante fortalece el valor Aprendizaje continuo y la vocación de servicio.",
        review:
          "Revisa Aprendizaje Continuo en la práctica: la autoformación constante es ejemplo de compromiso con la excelencia.",
      },
    ],
  },
  {
    id: "compromiso-organizacion",
    title: "Compromiso con la Organización",
    description: "Aplicación cotidiana de los valores del Código de Integridad del Servicio Público Colombiano.",
    intro:
      "Profundiza en situaciones prácticas para aplicar los valores del Código de Integridad y sostener una cultura ética en la gestión pública.",
    reference: "Código de Integridad del Servicio Público Colombiano – DAFP (2017).",
    questions: [
      {
        id: "compromiso-organizacion-v2-1",
        text: "¿Por qué el Código de Integridad se acompaña de un ejercicio comunicativo y pedagógico?",
        options: [
          { value: "a", label: "Para reemplazar el Código Disciplinario Único por un régimen de sanciones inmediatas." },
          {
            value: "b",
            label: "Porque lograr organizaciones íntegras exige transformar percepciones, actitudes y comportamientos mediante compromiso activo.",
          },
          { value: "c", label: "Para restringir la participación ciudadana en la definición de valores éticos." },
          { value: "d", label: "Para otorgar facultades disciplinarias adicionales al Departamento Administrativo de la Función Pública." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El Código destaca que no bastan normas; se requiere un proceso pedagógico que promueva cambios culturales y compromiso cotidiano con la integridad.",
        review:
          "Revisa la motivación del Código de Integridad: subraya la necesidad de un enfoque pedagógico y preventivo.",
      },
      {
        id: "compromiso-organizacion-v2-2",
        text: "La decisión del DAFP de formular un código general y conciso busca principalmente:",
        options: [
          { value: "a", label: "Permitir que cada entidad defina valores distintos sin lineamientos comunes." },
          { value: "b", label: "Garantizar universalidad y un lenguaje compartido para todos los servidores de la Rama Ejecutiva." },
          { value: "c", label: "Eliminar los códigos éticos existentes en entidades que ya contaban con ellos." },
          { value: "d", label: "Limitar la política de integridad a las entidades del orden territorial." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El Código adopta un enfoque universal para redefinir la gestión ética con una política aplicable a todo el sector público.",
        review:
          "Consulta el apartado sobre universalidad: resalta la necesidad de un marco común para todos los servidores.",
      },
      {
        id: "compromiso-organizacion-v2-3",
        text: "¿Cuál comportamiento vulnera directamente el valor honestidad?",
        options: [
          {
            value: "a",
            label: "Facilitar información veraz, denunciar faltas y buscar orientación cuando surgen dudas sobre la decisión correcta.",
          },
          {
            value: "b",
            label: "Aceptar incentivos de quienes tienen intereses en una decisión y usar tiempo o recursos públicos para asuntos personales.",
          },
          { value: "c", label: "Tratar por igual a todas las personas al momento de gestionar trámites." },
          { value: "d", label: "Reconocer un error y corregirlo de forma transparente." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El Código señala que la honestidad exige evitar incentivos indebidos y el uso de recursos públicos para fines personales.",
        review:
          "Revisa los comportamientos a evitar en honestidad: rechaza incentivos y uso personal de recursos públicos.",
      },
      {
        id: "compromiso-organizacion-v2-4",
        text: "Durante una atención presencial, un ciudadano de zona rural recibe comentarios despectivos. Aplicar el valor respeto implica:",
        options: [
          { value: "a", label: "Continuar con el trámite priorizando usuarios que residen en la capital para ganar eficiencia." },
          {
            value: "b",
            label: "Garantizar trato digno e igualitario, escuchar sus necesidades y corregir cualquier actitud discriminatoria.",
          },
          { value: "c", label: "Remitir al ciudadano a otra sede para evitar conflictos con el personal." },
          { value: "d", label: "Solicitar al usuario esperar un turno especial hasta que disminuya la afluencia de personas." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El respeto exige reconocer la dignidad de todas las personas, sin discriminación por procedencia, cargo o condición.",
        review:
          "Revisa el valor respeto: evidencia la obligación de eliminar prejuicios y garantizar trato igualitario.",
      },
      {
        id: "compromiso-organizacion-v2-5",
        text: "Una familia llega a la entidad sin comprender los requisitos de un programa social. Actuar con compromiso significa:",
        options: [
          { value: "a", label: "Indicarles que consulten la información en internet y continuar con otras tareas." },
          {
            value: "b",
            label: "Escuchar su contexto, orientar con paciencia, mantenerse atento y proponer soluciones para responder a sus necesidades.",
          },
          { value: "c", label: "Remitirlos a otra dependencia sin brindar orientación adicional." },
          { value: "d", label: "Señalar que deben regresar cuando tengan todos los documentos completos sin mayor explicación." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El compromiso implica empatía, orientación activa y disposición permanente para resolver necesidades ciudadanas.",
        review:
          "Consulta el valor compromiso: destaca la importancia de escuchar, orientar y mantener actitud proactiva.",
      },
      {
        id: "compromiso-organizacion-v2-6",
        text: "Debes entregar un informe clave en poco tiempo y recibes nuevas solicitudes ciudadanas. Ser diligente implica:",
        options: [
          { value: "a", label: "Postergar el informe hasta que finalicen todas las solicitudes pendientes." },
          {
            value: "b",
            label: "Organizar actividades, cumplir los plazos previstos y optimizar recursos asegurando calidad en cada entrega.",
          },
          { value: "c", label: "Delegar las tareas en terceros sin brindar seguimiento." },
          { value: "d", label: "Reducir el alcance del informe sin informarlo para evitar retrasos." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La diligencia exige atención, prontitud y eficiencia para cumplir plazos con calidad, cuidando los recursos del Estado.",
        review:
          "Revisa el valor diligencia: resalta el uso responsable de recursos y el cumplimiento oportuno con alta calidad.",
      },
      {
        id: "compromiso-organizacion-v2-7",
        text: "Frente a presiones de un conocido para priorizar su trámite, actuar con justicia implica:",
        options: [
          { value: "a", label: "Aceptar la solicitud para fortalecer la relación personal y evitar conflictos." },
          { value: "b", label: "Suspender los trámites de otros usuarios hasta resolver la petición del conocido." },
          {
            value: "c",
            label: "Tomar decisiones basadas en evidencias y criterios de equidad, rechazando presiones o favoritismos particulares.",
          },
          { value: "d", label: "Buscar un acuerdo informal que beneficie al conocido sin dejar rastro documental." },
        ],
        correctOption: "c",
        score: 10,
        explanation:
          "La justicia exige imparcialidad y decisiones objetivas que garanticen igualdad de trato y protección de los derechos.",
        review:
          "Revisa el valor justicia: subraya la necesidad de evitar presiones, caprichos o intereses particulares.",
      },
      {
        id: "compromiso-organizacion-v2-8",
        text: "¿Cuál es el objetivo del sistema de seguimiento y evaluación del Código de Integridad?",
        options: [
          { value: "a", label: "Otorgar premios económicos automáticos a los servidores destacados." },
          {
            value: "b",
            label: "Medir la implementación del Código, identificar brechas de integridad y ajustar acciones pedagógicas.",
          },
          { value: "c", label: "Sustituir a los organismos de control disciplinario existentes." },
          { value: "d", label: "Convertir los valores en requisitos excluyentes para ascensos automáticos." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El sistema de seguimiento busca evaluar la implementación, detectar brechas y fortalecer la política de integridad con acciones correctivas.",
        review:
          "Vuelve a los elementos fundacionales del Código: el seguimiento y evaluación garantizan la vivencia real de los valores.",
      },
      {
        id: "compromiso-organizacion-v2-9",
        text: "¿Cuál norma creó el Código de Integridad como instrumento técnico de la política de integridad?",
        options: [
          { value: "a", label: "Decreto 1499 de 2017" },
          { value: "b", label: "Ley 2016 de 2020" },
          { value: "c", label: "Decreto 815 de 2018" },
          { value: "d", label: "Ley 1474 de 2011" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "El Decreto 1499 de 2017, expedido con la entrada en vigencia del MIPG, estableció el Código de Integridad como instrumento técnico de la política de integridad.",
        review:
          "Revisa el fundamento normativo del Código de Integridad: el Decreto 1499 de 2017 lo creó como instrumento técnico.",
      },
      {
        id: "compromiso-organizacion-v2-10",
        text: "La adopción e implementación del Código de Integridad en todo el servicio público colombiano fue formalizada por:",
        options: [
          { value: "a", label: "Ley 2016 de 2020" },
          { value: "b", label: "Ley 1712 de 2014" },
          { value: "c", label: "Ley 2195 de 2022" },
          { value: "d", label: "Ley 87 de 1993" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "La Ley 2016 de 2020 dispuso la adopción e implementación del código de integridad en el servicio público colombiano.",
        review:
          "Repasa el marco normativo: la Ley 2016 de 2020 formalizó la adopción obligatoria del Código de Integridad.",
      },
      {
        id: "compromiso-organizacion-v2-11",
        text: "Según la presentación, adoptar el Código de Integridad implica que las entidades deben:",
        options: [
          { value: "a", label: "Diseñar controles exclusivamente financieros" },
          { value: "b", label: "Adoptar el código, gestionar conflictos de interés y fortalecer la declaración de bienes y rentas" },
          { value: "c", label: "Suspender los manuales de funciones" },
          { value: "d", label: "Eliminar los programas de inducción" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Se menciona que las entidades deben adoptar el código, manejar los conflictos de interés y robustecer la declaración de bienes y rentas.",
        review:
          "Consulta los requisitos de implementación: adopción del código, gestión de conflictos de interés y declaración de bienes.",
      },
      {
        id: "compromiso-organizacion-v2-12",
        text: "¿Cuántos participantes intervinieron en la construcción participativa del Código de Integridad?",
        options: [
          { value: "a", label: "Cerca de 2.500" },
          { value: "b", label: "Cerca de 25.000" },
          { value: "c", label: "Más de 100.000" },
          { value: "d", label: "Menos de 500" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "La presentación señala que cerca de 25.000 ciudadanos y servidores públicos participaron en la construcción del código tras un diagnóstico de la OCDE.",
        review:
          "Revisa la construcción participativa del código: cerca de 25.000 personas participaron en su formulación.",
      },
      {
        id: "compromiso-organizacion-v2-13",
        text: "¿Cuántos valores adicionales puede incorporar cada entidad, además de los cinco centrales del Código?",
        options: [
          { value: "a", label: "Ninguno" },
          { value: "b", label: "Uno" },
          { value: "c", label: "Hasta dos" },
          { value: "d", label: "Hasta cinco" },
        ],
        correctOption: "c",
        score: 5,
        explanation:
          "Cada entidad puede añadir hasta dos valores adicionales acordes con su misión, además de los cinco valores centrales.",
        review:
          "Repasa la flexibilidad del código: las entidades pueden incorporar hasta dos valores adicionales propios.",
      },
      {
        id: "compromiso-organizacion-v2-14",
        text: "La implementación del Código incluye, entre otros elementos:",
        options: [
          { value: "a", label: "Capacitación obligatoria de inducción para cualquier cargo" },
          { value: "b", label: "Eliminación de la evaluación del desempeño" },
          { value: "c", label: "Suspensión de indicadores de integridad" },
          { value: "d", label: "Exclusión del código de los manuales de funciones" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "La guía menciona capacitación obligatoria de inducción, indicadores y la inclusión del código en los manuales de funciones.",
        review:
          "Consulta los elementos de implementación: capacitación obligatoria, indicadores e inclusión en manuales.",
      },
      {
        id: "compromiso-organizacion-v2-15",
        text: "Además de capacitar, implementar el Código exige:",
        options: [
          { value: "a", label: "Evitar el seguimiento" },
          { value: "b", label: "Evaluar, hacer seguimiento y generar indicadores" },
          { value: "c", label: "Centralizar la información en un único funcionario" },
          { value: "d", label: "Delegar su cumplimiento a proveedores privados" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Se plantea evaluar el cumplimiento, hacer seguimiento y generar indicadores que midan la aplicación del código.",
        review:
          "Revisa los mecanismos de implementación: evaluación, seguimiento e indicadores son fundamentales.",
      },
      {
        id: "compromiso-organizacion-v2-16",
        text: "El valor Honestidad exige entre otras conductas que el servidor público:",
        options: [
          { value: "a", label: "Oculte errores" },
          { value: "b", label: "Diga la verdad incluso ante errores, busque orientación, facilite información pública y denuncie faltas" },
          { value: "c", label: "Priorice beneficios personales" },
          { value: "d", label: "Reserve información para evitar críticas" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Honestidad supone actuar con verdad, transparencia y denunciar irregularidades.",
        review:
          "Repasa el valor Honestidad: implica verdad, transparencia, búsqueda de orientación y denuncia de irregularidades.",
      },
      {
        id: "compromiso-organizacion-v2-17",
        text: "Dentro de lo que NO se hace bajo el valor Honestidad está:",
        options: [
          { value: "a", label: "Dar trato preferencial, aceptar incentivos indebidos o usar recursos públicos para fines personales" },
          { value: "b", label: "Documentar procesos" },
          { value: "c", label: "Solicitar orientación" },
          { value: "d", label: "Publicar información de interés" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "Se prohíbe otorgar privilegios, recibir beneficios indebidos o emplear recursos públicos para asuntos personales.",
        review:
          "Consulta las conductas prohibidas en Honestidad: tratos preferenciales, incentivos indebidos y uso personal de recursos.",
      },
      {
        id: "compromiso-organizacion-v2-18",
        text: "El valor Compromiso promueve conductas como:",
        options: [
          { value: "a", label: "Tratar el servicio como un favor personal" },
          { value: "b", label: "Ponerse en los zapatos de los usuarios, escuchar, orientar y prestar un servicio ágil y de calidad" },
          { value: "c", label: "Ignorar las necesidades ciudadanas" },
          { value: "d", label: "Trabajar con actitud negativa" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Compromiso significa asumir responsabilidades, empatizar con la ciudadanía y ofrecer servicios oportunos y de calidad.",
        review:
          "Revisa el valor Compromiso: empatía, orientación activa y servicios de calidad.",
      },
      {
        id: "compromiso-organizacion-v2-19",
        text: "Lo que NO corresponde al valor Compromiso es:",
        options: [
          { value: "a", label: "Ignorar a los ciudadanos o minimizar el impacto del rol" },
          { value: "b", label: "Atender con disposición" },
          { value: "c", label: "Escuchar activamente" },
          { value: "d", label: "Orientar procesos" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "Se advierte contra la actitud negativa, el desinterés y tratar el trabajo como un favor.",
        review:
          "Consulta las conductas prohibidas en Compromiso: ignorar ciudadanos, actitud negativa y desinterés.",
      },
      {
        id: "compromiso-organizacion-v2-20",
        text: "¿Qué valor fue el más votado durante la construcción participativa del código?",
        options: [
          { value: "a", label: "Justicia" },
          { value: "b", label: "Honestidad" },
          { value: "c", label: "Respeto" },
          { value: "d", label: "Diligencia" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Honestidad recibió 13.879 votos, convirtiéndose en el valor más respaldado por los participantes.",
        review:
          "Repasa la construcción participativa: la Honestidad fue el valor más votado con 13.879 votos.",
      },
      {
        id: "compromiso-organizacion-v2-21",
        text: "La inclusión del Código de Integridad en los manuales de funciones busca principalmente:",
        options: [
          { value: "a", label: "Generar trámites adicionales" },
          { value: "b", label: "Fortalecer la integridad en el servicio público incorporando los valores al desempeño diario" },
          { value: "c", label: "Eliminar la evaluación del desempeño" },
          { value: "d", label: "Reducir los programas de formación" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Incorporar el código en los manuales refuerza la integridad y los comportamientos esperados de los servidores públicos.",
        review:
          "Revisa el propósito de incluir el código en manuales: fortalecer integridad en el desempeño diario.",
      },
      {
        id: "compromiso-organizacion-v2-22",
        text: "De acuerdo con el Código de Integridad, firmar listas de asistencia en nombre de un compañero ausente es:",
        options: [
          { value: "a", label: "Una ayuda válida si se conoce al compañero" },
          { value: "b", label: "Una práctica que vulnera la honestidad y constituye falsificación documental" },
          { value: "c", label: "Aceptable cuando se cuenta con autorización verbal" },
          { value: "d", label: "Irrelevante mientras no existan sanciones formales" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Firmar por otra persona viola la autenticidad de los registros y atenta contra el valor de la honestidad contemplado en el código.",
        review:
          "Consulta aplicaciones prácticas del valor Honestidad: firmar por otro es falsificación y viola la integridad.",
      },
      {
        id: "compromiso-organizacion-v2-23",
        text: "Decir la verdad aunque perjudique la imagen o los intereses personales refleja:",
        options: [
          { value: "a", label: "Un comportamiento ingenuo que debe evitarse" },
          { value: "b", label: "La conducta esperada de honestidad y transparencia en el servicio público" },
          { value: "c", label: "Una práctica exclusiva de auditorías" },
          { value: "d", label: "Una obligación solo cuando existe supervisión" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "La honestidad implica priorizar la verdad y la transparencia por encima de beneficios personales inmediatos.",
        review:
          "Repasa la Honestidad en acción: priorizar la verdad sobre intereses personales es la conducta esperada.",
      },
      {
        id: "compromiso-organizacion-v2-24",
        text: "Reportar irregularidades éticas o financieras que se presencian es considerado:",
        options: [
          { value: "a", label: "Una actitud opcional que puede omitirse" },
          { value: "b", label: "Un deber ético que protege los recursos públicos y combate la corrupción" },
          { value: "c", label: "Una tarea exclusiva de los organismos de control" },
          { value: "d", label: "Una acción innecesaria si no hay evidencias documentales" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Denunciar faltas y delitos es un deber contemplado en el Código de Integridad y en la normatividad disciplinaria.",
        review:
          "Consulta el deber de denuncia: reportar irregularidades es un deber ético que protege recursos públicos.",
      },
      {
        id: "compromiso-organizacion-v2-25",
        text: "Limitarse a realizar únicamente las tareas mínimas para no exceder la jornada evidencia:",
        options: [
          { value: "a", label: "Un compromiso sólido con la organización" },
          { value: "b", label: "Una falta de compromiso y desapego con la misión institucional" },
          { value: "c", label: "Una estrategia válida para equilibrar responsabilidades" },
          { value: "d", label: "Una forma de evitar conflictos con los superiores" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "El valor Compromiso implica ir más allá del mínimo requerido y priorizar los resultados para la ciudadanía.",
        review:
          "Revisa el valor Compromiso en acción: requiere ir más allá del mínimo, no limitarse a lo estrictamente requerido.",
      },
      {
        id: "compromiso-organizacion-v2-26",
        text: "¿Cómo define la presentación las competencias laborales en términos generales?",
        options: [
          { value: "a", label: "Como conocimientos aislados" },
          { value: "b", label: "Como características intrínsecas demostradas mediante conductas ligadas a un desempeño superior" },
          { value: "c", label: "Como requisitos administrativos sin efectos en el trabajo" },
          { value: "d", label: "Como inventarios de funciones" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Se afirma que las competencias son características intrínsecas que se evidencian en conductas relacionadas con un desempeño destacado.",
        review:
          "Repasa la definición de competencias: son características intrínsecas que se manifiestan en conductas de desempeño superior.",
      },
      {
        id: "compromiso-organizacion-v2-27",
        text: "La definición de Spenser rescatada en la presentación indica que una competencia es:",
        options: [
          { value: "a", label: "Una característica opcional" },
          { value: "b", label: "Una característica fundamental causalmente relacionada con un desempeño efectivo o superior" },
          { value: "c", label: "Un requisito de antigüedad" },
          { value: "d", label: "Un documento administrativo" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Spenser conceptualiza la competencia como una característica fundamental causalmente ligada al desempeño superior.",
        review:
          "Consulta la definición académica de Spenser: competencia es característica fundamental ligada causalmente al desempeño.",
      },
      {
        id: "compromiso-organizacion-v2-28",
        text: "De acuerdo con el Decreto 815 de 2018, una competencia en el sector público es la capacidad de:",
        options: [
          {
            value: "a",
            label: "Desempeñarse en diferentes contextos cumpliendo estándares de calidad y resultados, sustentada en conocimientos, destrezas, habilidades, valores, actitudes y aptitudes",
          },
          { value: "b", label: "Cumplir únicamente metas financieras" },
          { value: "c", label: "Ejecutar tareas sin evaluar resultados" },
          { value: "d", label: "Restringir los procesos a un único contexto" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "El decreto establece que la competencia integra conocimientos, destrezas, habilidades, valores, actitudes y aptitudes para alcanzar los resultados esperados.",
        review:
          "Revisa la definición normativa del Decreto 815: competencia es capacidad integral en múltiples contextos.",
      },
      {
        id: "compromiso-organizacion-v2-29",
        text: "El Decreto 815 diferencia entre competencias funcionales y comportamentales para:",
        options: [
          { value: "a", label: "Eliminar la gestión por competencias" },
          { value: "b", label: "Separar responsabilidades técnicas de conductuales" },
          { value: "c", label: "Limitar las responsabilidades del servidor" },
          { value: "d", label: "Sustituir el Código de Integridad" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "El decreto distingue competencias funcionales (relacionadas con las tareas técnicas) y comportamentales (conductas esperadas).",
        review:
          "Consulta la clasificación de competencias: funcionales (técnicas) y comportamentales (conductas).",
      },
      {
        id: "compromiso-organizacion-v2-30",
        text: "Las competencias comunes que todo servidor debe acreditar incluyen:",
        options: [
          {
            value: "a",
            label: "Aprendizaje continuo, orientación a resultados, orientación al usuario y al ciudadano, compromiso con la organización, trabajo en equipo y adaptación al cambio",
          },
          { value: "b", label: "Solo competencias directivas" },
          { value: "c", label: "Exclusivamente conocimientos disciplinarios" },
          { value: "d", label: "Únicamente competencias técnicas" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "El decreto identifica seis competencias comunes que aplican a todos los niveles jerárquicos.",
        review:
          "Repasa las competencias comunes: aprendizaje continuo, orientación a resultados, orientación al usuario, compromiso, trabajo en equipo y adaptación al cambio.",
      },
      {
        id: "compromiso-organizacion-v2-31",
        text: "Compromiso con la organización se manifiesta cuando el servidor:",
        options: [
          {
            value: "a",
            label: "Alinea su comportamiento con las metas institucionales, antepone los intereses de la organización y demuestra sentido de pertenencia",
          },
          { value: "b", label: "Prioriza el beneficio personal" },
          { value: "c", label: "Ignora los objetivos institucionales" },
          { value: "d", label: "Limita su aporte a lo mínimo" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "La competencia exige comportamiento alineado con metas y sentido de pertenencia.",
        review:
          "Consulta la competencia Compromiso con la Organización: alineación con metas y sentido de pertenencia.",
      },
      {
        id: "compromiso-organizacion-v2-32",
        text: "Renunciar a un proyecto prioritario porque requiere esfuerzo adicional no remunerado revela:",
        options: [
          { value: "a", label: "Vocación de servicio" },
          { value: "b", label: "Un compromiso condicionado y falta de perseverancia" },
          { value: "c", label: "Gestión eficiente del tiempo" },
          { value: "d", label: "Una medida justificada por el bienestar personal" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "El compromiso con la organización implica asumir esfuerzos adicionales cuando es necesario para cumplir la misión.",
        review:
          "Revisa el valor Compromiso en la práctica: implica esfuerzo adicional cuando la misión lo requiere.",
      },
    ],
  },
  {
    id: "comunicacion-efectiva",
    title: "Comunicación Efectiva",
    description: "Intercambio claro, preciso y empático con superiores, pares y ciudadanos.",
    intro:
      "Mide tu habilidad para transmitir información clara, escuchar activamente y adaptar la comunicación según el interlocutor.",
    reference: "Sección 2.5 del Decreto 815 de 2018 - Comunicación efectiva.",
    questions: [
      {
        id: "comunicacion-efectiva-v2-1",
        text: "¿Qué caracteriza la comunicación efectiva según el Decreto 815?",
        options: [
          { value: "a", label: "Transmitir información técnica detallada sin considerar el nivel de comprensión del interlocutor." },
          { value: "b", label: "Intercambiar información clara y precisa, escuchando activamente y adaptando el mensaje al interlocutor." },
          { value: "c", label: "Limitarse a enviar comunicaciones escritas formales para evitar malentendidos verbales." },
          { value: "d", label: "Priorizar siempre el lenguaje técnico especializado para demostrar conocimiento profesional." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La comunicación efectiva requiere claridad, precisión, escucha activa y adaptación del mensaje según las características del interlocutor.",
        review:
          "Revisa los elementos de comunicación efectiva: claridad, escucha activa y adaptación son componentes esenciales.",
      },
      {
        id: "comunicacion-efectiva-v2-2",
        text: "La escucha activa en el contexto laboral implica:",
        options: [
          { value: "a", label: "Esperar el turno para hablar mientras el otro termina de expresarse." },
          { value: "b", label: "Prestar atención genuina, comprender el mensaje y verificar la comprensión antes de responder." },
          { value: "c", label: "Tomar notas de todo lo que se dice sin necesidad de retroalimentación verbal." },
          { value: "d", label: "Interrumpir cortésmente para aclarar dudas antes de que el interlocutor termine." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La escucha activa requiere atención genuina al mensaje, comprensión del contenido y verificación de entendimiento antes de formular respuestas.",
        review:
          "Consulta las conductas de escucha activa: atención, comprensión y verificación son elementos fundamentales.",
      },
      {
        id: "comunicacion-efectiva-v2-3",
        text: "Adaptar el mensaje según el interlocutor significa:",
        options: [
          { value: "a", label: "Mantener un único estilo de comunicación formal para todos los contextos laborales." },
          { value: "b", label: "Ajustar lenguaje, tono y nivel de detalle según el conocimiento y necesidades del receptor." },
          { value: "c", label: "Simplificar excesivamente la información para evitar que el interlocutor se sienta abrumado." },
          { value: "d", label: "Utilizar siempre términos técnicos ya que el interlocutor debe esforzarse por entender." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "Adaptar el mensaje implica ajustar el lenguaje, tono y nivel de detalle considerando el conocimiento previo y las necesidades del interlocutor.",
        review:
          "Repasa la adaptación comunicativa: debe considerar características específicas del receptor para garantizar comprensión.",
      },
      {
        id: "comunicacion-efectiva-v2-4",
        text: "La empatía en la comunicación con ciudadanos se manifiesta cuando:",
        options: [
          { value: "a", label: "Se aplican procedimientos estándar sin considerar circunstancias particulares del caso." },
          { value: "b", label: "Se reconocen y consideran las emociones y perspectivas del ciudadano al interactuar." },
          { value: "c", label: "Se mantiene distancia emocional profesional evitando cualquier conexión personal." },
          { value: "d", label: "Se prioriza la eficiencia del proceso sobre la comprensión de necesidades individuales." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La empatía comunicativa implica reconocer y considerar las emociones, perspectivas y necesidades del ciudadano durante la interacción.",
        review:
          "Revisa el componente empático: reconocer perspectivas y emociones del ciudadano es fundamental en la comunicación efectiva.",
      },
    ],
  },
  {
    id: "gestion-procedimientos",
    title: "Gestión de Procedimientos",
    description: "Ejecución y mejora continua de procesos dentro de los lineamientos vigentes.",
    intro:
      "Evalúa tu capacidad para ejecutar procedimientos institucionales, identificar oportunidades de mejora y garantizar cumplimiento normativo.",
    reference: "Sección 3.2 del Decreto 815 de 2018 - Gestión de procedimientos.",
    questions: [
      {
        id: "gestion-procedimientos-v2-1",
        text: "¿Qué implica la gestión de procedimientos según el Decreto 815?",
        options: [
          { value: "a", label: "Ejecutar procesos tal como están documentados sin cuestionarlos ni proponer cambios." },
          { value: "b", label: "Ejecutar procedimientos con eficacia, identificar mejoras y garantizar cumplimiento de lineamientos." },
          { value: "c", label: "Delegar la ejecución de procedimientos a personal operativo mientras se supervisa pasivamente." },
          { value: "d", label: "Modificar procedimientos según criterio personal cuando se considere conveniente." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La gestión de procedimientos requiere ejecución eficaz, identificación proactiva de mejoras y garantía de cumplimiento de lineamientos vigentes.",
        review:
          "Revisa la definición de gestión de procedimientos: combina ejecución eficaz, mejora continua y cumplimiento normativo.",
      },
      {
        id: "gestion-procedimientos-v2-2",
        text: "Identificar oportunidades de mejora en los procesos implica:",
        options: [
          { value: "a", label: "Esperar a que problemas recurrentes generen quejas formales antes de proponer cambios." },
          { value: "b", label: "Analizar críticamente procedimientos actuales y proponer ajustes que optimicen resultados." },
          { value: "c", label: "Implementar cambios inmediatos sin consultar con superiores o áreas de control." },
          { value: "d", label: "Documentar problemas sin necesidad de proponer soluciones concretas." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "Identificar mejoras requiere análisis crítico de procedimientos actuales y proposición fundamentada de ajustes que optimicen resultados institucionales.",
        review:
          "Consulta las conductas de mejora continua: el análisis crítico y las propuestas fundamentadas son clave.",
      },
      {
        id: "gestion-procedimientos-v2-3",
        text: "El cumplimiento de lineamientos vigentes significa:",
        options: [
          { value: "a", label: "Aplicar normas y procedimientos institucionales con rigor, garantizando legalidad y transparencia." },
          { value: "b", label: "Seguir procedimientos cuando sean cómodos y adaptarlos cuando dificulten el trabajo diario." },
          { value: "c", label: "Cumplir lineamientos solo cuando exista supervisión directa de superiores." },
          { value: "d", label: "Priorizar la rapidez en la ejecución incluso si implica omitir algunos pasos procedimentales." },
        ],
        correctOption: "a",
        score: 10,
        explanation:
          "El cumplimiento de lineamientos requiere aplicación rigurosa de normas y procedimientos institucionales para garantizar legalidad y transparencia.",
        review:
          "Repasa el concepto de cumplimiento normativo: implica rigor, legalidad y transparencia en la ejecución de procedimientos.",
      },
      {
        id: "gestion-procedimientos-v2-4",
        text: "¿Cómo contribuye la gestión de procedimientos a la calidad del servicio?",
        options: [
          { value: "a", label: "Permite que cada servidor personalice procesos según su experiencia individual." },
          { value: "b", label: "Garantiza estandarización, eficiencia y cumplimiento normativo en la prestación del servicio." },
          { value: "c", label: "Reduce la necesidad de capacitación al documentar exhaustivamente cada paso procedimental." },
          { value: "d", label: "Limita la creatividad pero asegura que no haya desviaciones del protocolo establecido." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La gestión adecuada de procedimientos garantiza estandarización, eficiencia y cumplimiento normativo, mejorando la calidad y confiabilidad del servicio.",
        review:
          "Revisa la relación entre gestión de procedimientos y calidad: la estandarización y el cumplimiento son fundamentales.",
      },
      {
        id: "gestion-procedimientos-v2-5",
        text: "Después de la expedición del Decreto 815, ¿cuál es el plazo para que las entidades del orden nacional adecuen sus manuales de funciones y competencias?",
        options: [
          { value: "a", label: "Tres meses para todas las entidades públicas." },
          { value: "b", label: "Seis meses para el orden nacional y un año para el orden territorial." },
          { value: "c", label: "Doce meses para el orden nacional y seis meses para el territorial." },
          { value: "d", label: "Dos años sin distinción del orden administrativo." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El parágrafo 2 del artículo 2.2.4.8 establece seis meses para el ajuste de manuales del orden nacional y un año para las entidades territoriales.",
        review:
          "Revisa los plazos de adecuación del Decreto 815: identifica los tiempos diferenciados para órdenes nacional y territorial.",
      },
      {
        id: "gestion-procedimientos-v2-6",
        text: "Para apoyar a las entidades territoriales en la actualización de sus manuales, el Decreto 815 dispone que:",
        options: [
          { value: "a", label: "Cada entidad territorial gestione autónomamente la adecuación sin acompañamiento." },
          { value: "b", label: "La Función Pública establezca lineamientos para un programa de asistencia ejecutado por la ESAP." },
          { value: "c", label: "El Ministerio de Hacienda lidere directamente la actualización de manuales." },
          { value: "d", label: "Las gobernaciones coordinen la asistencia mediante convenios interadministrativos." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El artículo 2.2.4.11 ordena a la Función Pública definir lineamientos para un programa de asistencia que ejecutará la ESAP, apoyando a las entidades territoriales.",
        review:
          "Revisa el artículo 2.2.4.11: la ESAP, bajo lineamientos de la Función Pública, brinda asistencia en la actualización de manuales.",
      },
      {
        id: "gestion-procedimientos-v2-7",
        text: "Cuando las necesidades del servicio lo requieran, ¿quién puede actualizar mediante acto motivado las competencias del artículo 2.2.4.8?",
        options: [
          { value: "a", label: "Las entidades territoriales, previa autorización de sus concejos." },
          { value: "b", label: "El Departamento Administrativo de la Función Pública." },
          { value: "c", label: "La Comisión Nacional del Servicio Civil." },
          { value: "d", label: "El Ministerio de Trabajo mediante resolución general." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El parágrafo 1 del artículo 2.2.4.8 faculta al Departamento Administrativo de la Función Pública para actualizar las competencias mediante acto motivado cuando sea necesario.",
        review:
          "Consulta el parágrafo 1 del artículo 2.2.4.8: la Función Pública es la entidad autorizada para ajustar las competencias adoptadas.",
      },
      {
        id: "gestion-procedimientos-v2-8",
        text: "Según el artículo 2.2.4.9, ¿qué acción tomará la Función Pública respecto a las áreas o procesos transversales?",
        options: [
          { value: "a", label: "Autorizar a cada entidad para que diseñe libremente sus competencias funcionales transversales." },
          { value: "b", label: "Adoptar un catálogo de normas de competencias funcionales aplicable a las áreas o procesos transversales de las entidades públicas." },
          { value: "c", label: "Trasladar la definición de competencias transversales al Ministerio de Hacienda." },
          { value: "d", label: "Suspender la definición de competencias transversales hasta nueva reglamentación." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El artículo 2.2.4.9 indica que la Función Pública adoptará un catálogo de normas de competencias funcionales para áreas o procesos transversales, armonizando criterios en el empleo público.",
        review:
          "Revisa el artículo 2.2.4.9: el catálogo asegura coherencia y estandarización de competencias funcionales transversales.",
      },
      {
        id: "gestion-procedimientos-v2-9",
        text: "Al diseñar un concurso de mérito conforme al Decreto 1083 de 2015, la entidad debe garantizar que:",
        options: [
          { value: "a", label: "Se aplique únicamente una entrevista, siempre que esté soportada en competencias." },
          { value: "b", label: "Se utilicen al menos dos pruebas, una de ellas escrita o de ejecución, para valorar capacidad, idoneidad y potencialidad." },
          { value: "c", label: "Las pruebas se definan libremente por cada jurado sin parámetros previos." },
          { value: "d", label: "La totalidad de la calificación corresponda a análisis de antecedentes." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El artículo 2.2.6.13 exige mínimo dos pruebas, entre ellas una escrita o de ejecución, con parámetros objetivos que valoren capacidades y competencias del aspirante.",
        review:
          "Consulta el artículo 2.2.6.13: detalla la finalidad y el mínimo de pruebas dentro del concurso de mérito.",
      },
      {
        id: "gestion-procedimientos-v2-10",
        text: "Cuando la convocatoria incluye la prueba de polígrafo, esta se aplica para:",
        options: [
          { value: "a", label: "Medir conocimientos específicos del cargo." },
          { value: "b", label: "Verificar la confiabilidad del aspirante mediante preguntas que generan reacciones fisiológicas asociadas a su experiencia previa." },
          { value: "c", label: "Reemplazar la entrevista estructurada y el examen escrito." },
          { value: "d", label: "Cumplir un requisito opcional de autoevaluación del aspirante." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El artículo 2.2.18.6.1 describe el polígrafo como una prueba de confiabilidad que utiliza preguntas para validar la información y las conductas previas del aspirante mediante sus reacciones fisiológicas.",
        review:
          "Revisa la descripción del polígrafo en el Decreto 1083: su foco es la confiabilidad, no la medición de conocimientos.",
      },
      {
        id: "gestion-procedimientos-v2-11",
        text: "El Decreto 1083 define el examen como un mecanismo que:",
        options: [
          { value: "a", label: "Consiste en un banco de preguntas de selección múltiple dispuesto en el decreto para todos los cargos." },
          { value: "b", label: "Mide la competencia del candidato a través de medios escritos, orales, prácticos u observación de comportamientos." },
          { value: "c", label: "Se limita a entrevistas de verificación documental." },
          { value: "d", label: "Solo aplica a aspirantes de los niveles directivo y asesor." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El artículo 2.2.18.4.1 define el examen como un mecanismo de evaluación que puede emplear distintos medios para medir la competencia, sin proveer en el decreto un cuestionario cerrado.",
        review:
          "Consulta la definición de examen en el Decreto 1083: destaca la flexibilidad de medios para evaluar competencias.",
      },
      {
        id: "gestion-procedimientos-v2-12",
        text: "Un participante pregunta si el decreto incluye ejemplos de cuestionarios para estudiar. ¿Cuál debería ser la respuesta correcta?",
        options: [
          { value: "a", label: "Sí, porque el decreto anexa preguntas de selección múltiple para cada empleo." },
          { value: "b", label: "No, el decreto solo menciona preguntas al describir la prueba de polígrafo como instrumento de confiabilidad." },
          { value: "c", label: "Sí, pero únicamente para los empleos de la DIAN." },
          { value: "d", label: "No, porque todos los cuestionarios se publican en resoluciones posteriores." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El Decreto 1083 no contiene cuestionarios; la única referencia a «preguntas» aparece en la descripción del polígrafo para verificar confiabilidad del aspirante.",
        review:
          "Revisa el artículo 2.2.18.6.1: aclara el alcance de las preguntas empleadas exclusivamente en la prueba de polígrafo.",
      },
      {
        id: "gestion-procedimientos-v2-13",
        text: "En la planeación de un concurso, el comité propone que la entrevista pese el 25 % del puntaje total. ¿Qué indica el decreto?",
        options: [
          { value: "a", label: "La propuesta es válida si así lo aprueba el jefe de talento humano." },
          { value: "b", label: "Debe ajustarse, porque la entrevista no puede superar el 15 % de la calificación total." },
          { value: "c", label: "No hay límites establecidos para la ponderación de la entrevista." },
          { value: "d", label: "La entrevista debe reemplazar a las demás pruebas para agilizar el concurso." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El Decreto 1083 fija un límite máximo del 15 % para la entrevista, asegurando que otros instrumentos objetivos definan la mayor parte del puntaje.",
        review:
          "Consulta las reglas de ponderación: la entrevista es complementar ia y su peso no puede exceder el 15 %.",
      },
      {
        id: "gestion-procedimientos-v2-14",
        text: "Si un aspirante no está conforme con el resultado de una prueba, el Decreto 1083 señala que debe presentar su reclamación ante:",
        options: [
          { value: "a", label: "La Comisión Nacional del Servicio Civil, siguiendo el procedimiento establecido." },
          { value: "b", label: "La Procuraduría General, para que ejerza control disciplinario inmediato." },
          { value: "c", label: "El despacho del jefe de la entidad convocante." },
          { value: "d", label: "El Departamento Administrativo de la Función Pública para revisión integral." },
        ],
        correctOption: "a",
        score: 10,
        explanation:
          "El decreto remite las reclamaciones sobre las pruebas a la Comisión Nacional del Servicio Civil, órgano garante del mérito en los procesos de selección.",
        review:
          "Revisa el procedimiento de reclamaciones: la CNSC centraliza la atención y decisión sobre inconformidades de los aspirantes.",
      },
      {
        id: "gestion-procedimientos-v2-15",
        text: "El valor Justicia se asocia a conductas como:",
        options: [
          { value: "a", label: "Discriminar según preferencias personales" },
          { value: "b", label: "Decidir con base en hechos, respetar derechos y actuar con imparcialidad" },
          { value: "c", label: "Privilegiar a grupos influyentes" },
          { value: "d", label: "Ignorar las pruebas al decidir" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Justicia supone tomar decisiones basadas en hechos, evitando favoritismos y respetando derechos de todas las personas.",
        review:
          "Revisa el valor Justicia: decisiones basadas en hechos, imparcialidad y respeto por los derechos.",
      },
      {
        id: "gestion-procedimientos-v2-16",
        text: "Lo que NO corresponde al valor Justicia es:",
        options: [
          { value: "a", label: "Tomar decisiones con objetividad" },
          { value: "b", label: "Actuar con base en caprichos, amiguismos o intereses particulares" },
          { value: "c", label: "Respetar la dignidad humana" },
          { value: "d", label: "Garantizar derechos y deberes" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "El código prohíbe decidir con base en caprichos, amiguismos o intereses que comprometan la imparcialidad.",
        review:
          "Consulta las conductas prohibidas en Justicia: caprichos, amiguismos e intereses particulares.",
      },
      {
        id: "gestion-procedimientos-v2-17",
        text: "El valor Diligencia implica que el servidor público:",
        options: [
          { value: "a", label: "Procrastine tareas importantes" },
          { value: "b", label: "Cumpla con prontitud, oportunidad y calidad, usando responsablemente los recursos del Estado" },
          { value: "c", label: "Relegue funciones críticas" },
          { value: "d", label: "Delegue todo sin supervisión" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Diligencia exige cumplir oportunamente con calidad, cuidando los recursos estatales.",
        review:
          "Repasa el valor Diligencia: cumplimiento oportuno, calidad y uso responsable de recursos.",
      },
      {
        id: "gestion-procedimientos-v2-18",
        text: "Dentro de lo que NO se hace según el valor Diligencia está:",
        options: [
          { value: "a", label: "Trabajar con atención" },
          { value: "b", label: "Postergar actividades sin justificación, incumplir plazos o descuidar los recursos públicos" },
          { value: "c", label: "Respetar los plazos institucionales" },
          { value: "d", label: "Optimizar recursos" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "La diligencia rechaza postergar, incumplir plazos y descuidar los recursos del Estado.",
        review:
          "Consulta las conductas prohibidas en Diligencia: postergación, incumplimiento y descuido de recursos.",
      },
      {
        id: "gestion-procedimientos-v2-19",
        text: "El nivel Directivo del Decreto 815 se caracteriza por:",
        options: [
          { value: "a", label: "Ejecutar tareas operativas" },
          { value: "b", label: "Formular y dirigir la ejecución de planes y programas, supervisando su cumplimiento" },
          { value: "c", label: "Cumplir órdenes sin participar en decisiones" },
          { value: "d", label: "Tramitar correspondencia" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Los directivos formulan, dirigen y supervisan la ejecución de planes y programas institucionales.",
        review:
          "Consulta las características del nivel Directivo: formulación, dirección y supervisión de planes.",
      },
      {
        id: "gestion-procedimientos-v2-20",
        text: "Una competencia del nivel Directivo es:",
        options: [
          { value: "a", label: "Planeación" },
          { value: "b", label: "Transcripción" },
          { value: "c", label: "Archivo" },
          { value: "d", label: "Mensajería" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "Entre las competencias directivas se destacan: planeación, dirección, toma de decisiones y visión estratégica.",
        review:
          "Repasa las competencias del nivel Directivo: planeación, dirección, toma de decisiones, visión estratégica.",
      },
      {
        id: "gestion-procedimientos-v2-21",
        text: "El nivel Asesor se caracteriza por:",
        options: [
          { value: "a", label: "Ejecutar tareas rutinarias" },
          { value: "b", label: "Asistir, aconsejar y asesorar directamente a las directivas mediante análisis técnico y conocimiento especializado" },
          { value: "c", label: "Supervisar personal operativo" },
          { value: "d", label: "Coordinar eventos sociales" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Los asesores asisten y aconsejan a directivas aplicando análisis técnico y conocimiento especializado.",
        review:
          "Consulta las características del nivel Asesor: asistencia y asesoría técnica a directivas.",
      },
      {
        id: "gestion-procedimientos-v2-22",
        text: "Una competencia del nivel Asesor es:",
        options: [
          { value: "a", label: "Experticia profesional" },
          { value: "b", label: "Ingreso de datos" },
          { value: "c", label: "Vigilancia" },
          { value: "d", label: "Conducción de vehículos" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "Los asesores requieren experticia profesional, conocimiento del entorno y construcción de relaciones.",
        review:
          "Repasa las competencias del nivel Asesor: experticia profesional, conocimiento del entorno y construcción de relaciones.",
      },
      {
        id: "gestion-procedimientos-v2-23",
        text: "El nivel Técnico se caracteriza por:",
        options: [
          { value: "a", label: "Formular políticas" },
          { value: "b", label: "Aplicar conocimientos técnicos en procesos y procedimientos administrativos u operativos" },
          { value: "c", label: "Tomar decisiones estratégicas" },
          { value: "d", label: "Aprobar presupuestos" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Los técnicos aplican conocimientos especializados en procesos administrativos y operativos.",
        review:
          "Consulta las características del nivel Técnico: aplicación de conocimientos técnicos en procesos.",
      },
      {
        id: "gestion-procedimientos-v2-24",
        text: "Una competencia del nivel Técnico es:",
        options: [
          { value: "a", label: "Instrumentación de decisiones" },
          { value: "b", label: "Gerencia de equipos" },
          { value: "c", label: "Visión estratégica" },
          { value: "d", label: "Planeación institucional" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "El nivel técnico requiere instrumentación de decisiones, manejo de procedimientos y seguimiento a procesos.",
        review:
          "Repasa las competencias del nivel Técnico: instrumentación, procedimientos y seguimiento.",
      },
      {
        id: "gestion-procedimientos-v2-25",
        text: "El nivel Asistencial se caracteriza por:",
        options: [
          { value: "a", label: "Dirigir departamentos" },
          { value: "b", label: "Apoyar, complementar y ejecutar labores propias de los niveles superiores" },
          { value: "c", label: "Formular proyectos normativos" },
          { value: "d", label: "Representar legalmente la entidad" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Los asistenciales apoyan, complementan y ejecutan labores de los niveles superiores.",
        review:
          "Consulta las características del nivel Asistencial: apoyo y complemento a niveles superiores.",
      },
      {
        id: "gestion-procedimientos-v2-26",
        text: "Cumplir una tarea fuera del plazo establecido sin justificación ni comunicación oportuna contradice:",
        options: [
          { value: "a", label: "El valor Respeto" },
          { value: "b", label: "El valor Diligencia y el Compromiso con la organización" },
          { value: "c", label: "El valor Justicia" },
          { value: "d", label: "La competencia de Aprendizaje continuo" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Incumplir plazos sin justificación vulnera la Diligencia y evidencia falta de compromiso institucional.",
        review:
          "Repasa Diligencia y Compromiso: cumplir plazos es fundamental para ambos valores.",
      },
      {
        id: "gestion-procedimientos-v2-27",
        text: "Asignar proyectos estratégicos según afinidades personales y no por méritos técnicos contradice:",
        options: [
          { value: "a", label: "El valor Respeto" },
          { value: "b", label: "El valor Justicia" },
          { value: "c", label: "El valor Honestidad" },
          { value: "d", label: "El valor Compromiso" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Decidir con base en afinidades personales en lugar de criterios técnicos vulnera la Justicia.",
        review:
          "Consulta el valor Justicia: las decisiones deben basarse en criterios objetivos, no en preferencias personales.",
      },
      {
        id: "gestion-procedimientos-v2-28",
        text: "Denegar el acceso a información pública solicitada legalmente para evitar rendición de cuentas vulnera:",
        options: [
          { value: "a", label: "El valor Diligencia" },
          { value: "b", label: "Los valores de Honestidad y Justicia, además del derecho de acceso a la información" },
          { value: "c", label: "El valor Respeto exclusivamente" },
          { value: "d", label: "La competencia de Adaptación al cambio" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Negar información pública atenta contra la Honestidad, la Justicia y el derecho ciudadano al acceso a la información.",
        review:
          "Repasa los valores de Honestidad y Justicia: garantizar acceso a información pública es obligación fundamental.",
      },
      {
        id: "gestion-procedimientos-v2-29",
        text: "Usar información confidencial de un proceso de contratación para beneficiar a un proveedor conocido es:",
        options: [
          { value: "a", label: "Aceptable si mejora la eficiencia del proceso" },
          { value: "b", label: "Una violación grave de Honestidad, Justicia y Compromiso, además de constituir posible corrupción" },
          { value: "c", label: "Válido si no se documenta" },
          { value: "d", label: "Permitido cuando hay confianza mutua" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Usar información privilegiada para beneficiar terceros vulnera múltiples valores del código y puede constituir delito.",
        review:
          "Consulta las prohibiciones del Código de Integridad: usar información privilegiada es violación grave de múltiples valores.",
      },
    ],
  },
  {
    id: "instrumentacion-decisiones",
    title: "Instrumentación de Decisiones",
    description: "Aplicación efectiva de decisiones con criterios de eficacia, eficiencia y transparencia.",
    intro:
      "Evalúa tu capacidad para implementar decisiones institucionales garantizando su efectividad, eficiencia y cumplimiento normativo.",
    reference: "Sección 3.3 del Decreto 815 de 2018 - Instrumentación de decisiones.",
    questions: [
      {
        id: "instrumentacion-decisiones-v2-1",
        text: "¿Qué significa instrumentar decisiones según el Decreto 815?",
        options: [
          { value: "a", label: "Comunicar decisiones a los equipos de trabajo sin involucrarse en su implementación práctica." },
          { value: "b", label: "Implementar efectivamente decisiones institucionales con criterios de eficacia, eficiencia y transparencia." },
          { value: "c", label: "Documentar decisiones tomadas por superiores para el archivo institucional." },
          { value: "d", label: "Esperar instrucciones detalladas sobre cada paso de la implementación antes de actuar." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "Instrumentar decisiones implica implementarlas efectivamente, garantizando eficacia en resultados, eficiencia en recursos y transparencia en el proceso.",
        review:
          "Revisa la definición de instrumentación: requiere implementación efectiva con criterios de eficacia, eficiencia y transparencia.",
      },
      {
        id: "instrumentacion-decisiones-v2-2",
        text: "La eficacia en la implementación de decisiones se evidencia cuando:",
        options: [
          { value: "a", label: "Se completan actividades planificadas independientemente de si se logran los objetivos esperados." },
          { value: "b", label: "Se alcanzan los objetivos y resultados esperados de la decisión implementada." },
          { value: "c", label: "Se utiliza la menor cantidad de recursos posible durante la implementación." },
          { value: "d", label: "Se documenta exhaustivamente el proceso de implementación para auditorías futuras." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La eficacia se refiere al logro de objetivos y resultados esperados, es decir, a que la decisión implementada cumpla su propósito institucional.",
        review:
          "Consulta el concepto de eficacia: se centra en el logro de objetivos y resultados esperados de la decisión.",
      },
      {
        id: "instrumentacion-decisiones-v2-3",
        text: "La eficiencia en la instrumentación implica:",
        options: [
          { value: "a", label: "Lograr resultados óptimos con el mejor uso posible de recursos disponibles (tiempo, personal, presupuesto)." },
          { value: "b", label: "Cumplir plazos establecidos incluso si requiere inversión adicional no presupuestada." },
          { value: "c", label: "Priorizar ahorro de recursos sobre la calidad de los resultados obtenidos." },
          { value: "d", label: "Implementar decisiones rápidamente sin análisis de costo-beneficio." },
        ],
        correctOption: "a",
        score: 10,
        explanation:
          "La eficiencia implica optimizar el uso de recursos (tiempo, personal, presupuesto) para lograr los mejores resultados posibles con los medios disponibles.",
        review:
          "Repasa el concepto de eficiencia: se refiere a la optimización en el uso de recursos para lograr resultados.",
      },
      {
        id: "instrumentacion-decisiones-v2-4",
        text: "La transparencia en la implementación de decisiones requiere:",
        options: [
          { value: "a", label: "Mantener confidencialidad absoluta del proceso de implementación hasta obtener resultados finales." },
          { value: "b", label: "Comunicar claramente el proceso, garantizar trazabilidad y permitir rendición de cuentas sobre las acciones realizadas." },
          { value: "c", label: "Publicar cada detalle operativo del proceso en plataformas públicas en tiempo real." },
          { value: "d", label: "Limitar la información sobre la implementación a superiores jerárquicos exclusivamente." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La transparencia requiere comunicación clara del proceso, trazabilidad de acciones y mecanismos de rendición de cuentas sobre la implementación.",
        review:
          "Revisa el componente de transparencia: implica comunicación, trazabilidad y rendición de cuentas en la implementación.",
      },
      {
        id: "instrumentacion-decisiones-v2-5",
        text: "En el nivel directivo, la competencia de toma de decisiones implica:",
        options: [
          { value: "a", label: "Delegar decisiones complejas para evitar asumir riesgos institucionales." },
          { value: "b", label: "Analizar alternativas, consultar al equipo, decidir en escenarios complejos y asumir la responsabilidad por los resultados." },
          { value: "c", label: "Esperar lineamientos escritos del nivel central antes de actuar." },
          { value: "d", label: "Priorizar opciones que generen consenso aun cuando se sacrifiquen objetivos institucionales." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El Decreto 815 señala que los directivos deben evaluar alternativas, escuchar al equipo, decidir en situaciones complejas y responder por los resultados obtenidos.",
        review:
          "Revisa la competencia de toma de decisiones del nivel directivo: integra análisis, participación y responsabilidad por los resultados.",
      },
      {
        id: "instrumentacion-decisiones-v2-6",
        text: "Para definir el contenido funcional de un empleo, el Decreto 815 exige describir:",
        options: [
          { value: "a", label: "La trayectoria laboral previa del servidor y los resultados obtenidos." },
          { value: "b", label: "El propósito principal del empleo, las funciones esenciales y las contribuciones esperadas." },
          { value: "c", label: "Los procedimientos transversales de la entidad relacionados con el cargo." },
          { value: "d", label: "Los indicadores estratégicos de la entidad sin precisar responsabilidades del cargo." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El artículo 2.2.4.4 establece que el contenido funcional debe describir el propósito principal, las funciones esenciales y las contribuciones esperadas del empleo.",
        review:
          "Consulta el artículo 2.2.4.4: el contenido funcional alinea propósito, funciones y contribuciones del cargo con la estrategia institucional.",
      },
    ],
  },
  {
    id: "orientacion-resultados",
    title: "Orientación a Resultados",
    description: "Cumplimiento de objetivos con eficacia, calidad y uso de indicadores para medir avances.",
    intro:
      "Mide tu enfoque en el logro de metas, la calidad de los resultados y el uso de indicadores para monitorear desempeño.",
    reference: "Sección 2.3 del Decreto 815 de 2018 - Orientación a resultados.",
    questions: [
      {
        id: "orientacion-resultados-v2-1",
        text: "¿Qué caracteriza la orientación a resultados según el Decreto 815?",
        options: [
          { value: "a", label: "Enfocarse en completar actividades asignadas sin necesidad de medir su impacto." },
          { value: "b", label: "Cumplir objetivos con calidad, eficacia y persistencia, monitoreando avances mediante indicadores." },
          { value: "c", label: "Priorizar la cantidad de tareas completadas sobre la calidad de los resultados obtenidos." },
          { value: "d", label: "Delegar el seguimiento de resultados a áreas especializadas de planeación o control." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La orientación a resultados implica cumplir objetivos con calidad y eficacia, manteniendo persistencia y monitoreando avances a través de indicadores.",
        review:
          "Revisa la definición de orientación a resultados: combina calidad, eficacia, persistencia y monitoreo de indicadores.",
      },
      {
        id: "orientacion-resultados-v2-2",
        text: "El uso de indicadores para medir avances sirve para:",
        options: [
          { value: "a", label: "Justificar retrasos o incumplimientos mediante datos objetivos documentados." },
          { value: "b", label: "Monitorear progreso, identificar desviaciones y tomar decisiones para garantizar el logro de objetivos." },
          { value: "c", label: "Generar reportes periódicos sin necesidad de analizar o actuar sobre la información obtenida." },
          { value: "d", label: "Comparar el desempeño individual con el de otros servidores para establecer rankings." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "Los indicadores permiten monitorear progreso, identificar desviaciones tempranamente y tomar decisiones correctivas para asegurar el cumplimiento de objetivos.",
        review:
          "Consulta el uso de indicadores: son herramientas para monitoreo, identificación de desviaciones y toma de decisiones.",
      },
      {
        id: "orientacion-resultados-v2-3",
        text: "La persistencia en el cumplimiento de objetivos significa:",
        options: [
          { value: "a", label: "Mantener el mismo enfoque de trabajo independientemente de obstáculos o resultados parciales." },
          { value: "b", label: "Superar obstáculos y mantener esfuerzo sostenido hasta lograr los objetivos establecidos, ajustando estrategias según sea necesario." },
          { value: "c", label: "Insistir en métodos de trabajo iniciales incluso cuando demuestren ser inefectivos." },
          { value: "d", label: "Extender plazos indefinidamente hasta alcanzar resultados perfectos sin errores." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La persistencia implica mantener esfuerzo sostenido, superar obstáculos y ajustar estrategias cuando sea necesario para lograr los objetivos institucionales.",
        review:
          "Repasa el concepto de persistencia: incluye esfuerzo sostenido, superación de obstáculos y flexibilidad estratégica.",
      },
      {
        id: "orientacion-resultados-v2-4",
        text: "La calidad en los resultados se garantiza cuando:",
        options: [
          { value: "a", label: "Se cumplen plazos establecidos independientemente del nivel de calidad alcanzado." },
          { value: "b", label: "Los resultados satisfacen estándares esperados, cumplen requisitos y generan valor institucional." },
          { value: "c", label: "Se documenta exhaustivamente el proceso seguido para obtener los resultados." },
          { value: "d", label: "Se obtienen resultados superiores a lo esperado aunque se excedan recursos presupuestados." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La calidad implica que los resultados satisfagan estándares esperados, cumplan requisitos establecidos y generen valor real para la institución.",
        review:
          "Revisa el componente de calidad: los resultados deben satisfacer estándares, cumplir requisitos y generar valor institucional.",
      },
      {
        id: "orientacion-resultados-v2-5",
        text: "Dentro de las competencias del nivel directivo, la planeación definida por el Decreto 815 implica:",
        options: [
          { value: "a", label: "Definir actividades generales sin asignar responsables ni recursos para mantener flexibilidad." },
          { value: "b", label: "Establecer metas y prioridades institucionales, asignar responsables, plazos y recursos, y hacer seguimiento permanente orientado a usuarios y ciudadanos." },
          { value: "c", label: "Delegar la construcción del plan al área financiera mientras se supervisa su ejecución." },
          { value: "d", label: "Ajustar los planes únicamente cuando exista una directriz escrita del nivel central." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La competencia de planeación del nivel directivo requiere definir metas y prioridades, asignar responsables, recursos y plazos, y realizar seguimiento constante con enfoque en usuarios y ciudadanos.",
        review:
          "Consulta las competencias directivas del Decreto 815: la planeación integra metas, responsables, recursos y seguimiento orientado al servicio ciudadano.",
      },
      {
        id: "orientacion-resultados-v2-6",
        text: "Orientación a resultados conlleva:",
        options: [
          { value: "a", label: "Fijar objetivos claros, diseñar indicadores, minimizar riesgos y asumir responsabilidad por los resultados" },
          { value: "b", label: "Trabajar sin métricas" },
          { value: "c", label: "Delegar siempre la responsabilidad" },
          { value: "d", label: "Ignorar los estándares institucionales" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "Esta competencia busca el cumplimiento de objetivos con indicadores, gestión de riesgos y responsabilidad individual.",
        review:
          "Consulta Orientación a Resultados: fijar objetivos, indicadores, gestión de riesgos y responsabilidad por resultados.",
      },
    ],
  },
  {
    id: "orientacion-usuario",
    title: "Orientación al Usuario y al Ciudadano",
    description: "Atención oportuna, inclusiva y veraz a las necesidades de usuarios y ciudadanos.",
    intro:
      "Evalúa tu capacidad para identificar necesidades ciudadanas, brindar atención de calidad y garantizar satisfacción en el servicio.",
    reference: "Sección 2.2 del Decreto 815 de 2018 - Orientación al usuario y al ciudadano.",
    questions: [
      {
        id: "orientacion-usuario-v2-1",
        text: "¿Qué implica la orientación al usuario según el Decreto 815?",
        options: [
          { value: "a", label: "Aplicar procedimientos estándar a todos los usuarios sin considerar necesidades particulares." },
          { value: "b", label: "Identificar necesidades, brindar atención oportuna y veraz, y garantizar satisfacción del usuario." },
          { value: "c", label: "Limitar la interacción con usuarios a los canales oficiales establecidos por la entidad." },
          { value: "d", label: "Priorizar la eficiencia operativa sobre la calidad de la atención brindada al ciudadano." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La orientación al usuario requiere identificar necesidades, brindar atención oportuna, inclusiva y veraz, garantizando la satisfacción del ciudadano.",
        review:
          "Revisa la definición de orientación al usuario: incluye identificación de necesidades, atención de calidad y garantía de satisfacción.",
      },
      {
        id: "orientacion-usuario-v2-2",
        text: "La atención inclusiva a ciudadanos significa:",
        options: [
          { value: "a", label: "Atender únicamente a quienes cumplan estrictamente todos los requisitos documentales exigidos." },
          { value: "b", label: "Reconocer diversidad de usuarios, adaptar la atención a necesidades especiales y garantizar acceso equitativo." },
          { value: "c", label: "Ofrecer el mismo tipo de atención a todos los usuarios para garantizar igualdad formal." },
          { value: "d", label: "Derivar casos complejos o de poblaciones especiales a áreas especializadas exclusivamente." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La inclusión implica reconocer la diversidad, adaptar la atención a necesidades especiales (discapacidad, edad, etc.) y garantizar acceso equitativo.",
        review:
          "Consulta el componente de inclusión: requiere reconocimiento de diversidad, adaptación y equidad en el acceso al servicio.",
      },
      {
        id: "orientacion-usuario-v2-3",
        text: "La oportunidad en la atención al ciudadano se refiere a:",
        options: [
          { value: "a", label: "Atender solicitudes exclusivamente dentro de los términos legales máximos establecidos." },
          { value: "b", label: "Responder a necesidades del ciudadano en el momento adecuado, con agilidad y sin dilaciones innecesarias." },
          { value: "c", label: "Priorizar casos según orden de llegada sin considerar urgencia o complejidad." },
          { value: "d", label: "Diferir atención cuando el volumen de solicitudes supere la capacidad operativa del área." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La oportunidad implica responder en el momento adecuado, con agilidad y evitando dilaciones innecesarias que afecten al ciudadano.",
        review:
          "Repasa el concepto de oportunidad: se refiere a respuesta ágil, en el momento adecuado y sin dilaciones innecesarias.",
      },
      {
        id: "orientacion-usuario-v2-4",
        text: "La veracidad en la información brindada al ciudadano requiere:",
        options: [
          { value: "a", label: "Proporcionar información completa, precisa y verificada, evitando datos erróneos o engañosos." },
          { value: "b", label: "Comunicar solo información positiva para mantener satisfacción del ciudadano con la entidad." },
          { value: "c", label: "Limitar la información a lo estrictamente solicitado sin ofrecer contexto adicional." },
          { value: "d", label: "Derivar al ciudadano a fuentes documentales oficiales para evitar errores en la comunicación oral." },
        ],
        correctOption: "a",
        score: 10,
        explanation:
          "La veracidad requiere proporcionar información completa, precisa, verificada y evitar datos erróneos, incompletos o engañosos al ciudadano.",
        review:
          "Revisa el componente de veracidad: implica información completa, precisa, verificada y libre de errores o engaños.",
      },
      {
        id: "orientacion-usuario-v2-5",
        text: "Un funcionario de atención al público recibe a un ciudadano muy molesto porque su trámite ha sido rechazado varias veces y exige hablar con un superior. ¿Qué debería hacer el funcionario según los principios de orientación al usuario?",
        options: [
          { value: "a", label: "Ignorar al ciudadano y continuar con su trabajo." },
          { value: "b", label: "Llamar inmediatamente a un superior para que se encargue de la situación." },
          { value: "c", label: "Escuchar al ciudadano con calma, explicarle las razones del rechazo y ofrecerle ayuda para resolver el problema." },
          { value: "d", label: "Pedirle al ciudadano que se calme y que vuelva otro día cuando esté más tranquilo." },
        ],
        correctOption: "c",
        score: 10,
        explanation:
          "La orientación al usuario requiere escuchar con calma, explicar con veracidad las razones y ofrecer ayuda oportuna para resolver el problema. Esto demuestra empatía, profesionalismo y compromiso con la satisfacción del ciudadano.",
        review:
          "Revisa los principios de orientación al usuario: incluye atención oportuna, trato respetuoso, explicación veraz y disposición para ayudar a resolver problemas del ciudadano.",
      },
      {
        id: "orientacion-usuario-v2-6",
        text: "El valor Respeto implica como conducta positiva que el servidor público:",
        options: [
          { value: "a", label: "Priorice a quienes tienen mayor influencia" },
          { value: "b", label: "Atiendan con amabilidad y equidad, abiertos al diálogo aun ante opiniones diferentes" },
          { value: "c", label: "Evite comunicarse con los usuarios" },
          { value: "d", label: "Resuelva trámites de forma discrecional" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "El Respeto se traduce en atender con dignidad y apertura al diálogo, reconociendo a todas las personas sin discriminación.",
        review:
          "Revisa el valor Respeto del Código de Integridad: implica dignidad, equidad y apertura al diálogo.",
      },
      {
        id: "orientacion-usuario-v2-7",
        text: "Lo que NO debe hacerse según el valor Respeto es:",
        options: [
          { value: "a", label: "Considerar opiniones distintas" },
          { value: "b", label: "Actuar de forma discriminatoria, grosera o basar decisiones en prejuicios" },
          { value: "c", label: "Escuchar las necesidades ciudadanas" },
          { value: "d", label: "Promover el diálogo" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "El código señala que no se debe discriminar, actuar con grosería ni decidir con base en estereotipos.",
        review:
          "Consulta las conductas prohibidas en Respeto: discriminación, grosería y decisiones basadas en prejuicios.",
      },
      {
        id: "orientacion-usuario-v2-8",
        text: "¿Qué comportamiento concreto se asocia al valor Respeto según la guía?",
        options: [
          { value: "a", label: "Tratar dignamente y escuchar incluso opiniones distintas" },
          { value: "b", label: "Evitar responder preguntas del ciudadano" },
          { value: "c", label: "Priorizar la jerarquía sobre la igualdad" },
          { value: "d", label: "Limitar el diálogo a los superiores" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "Respeto significa reconocer y tratar dignamente a todas las personas, propiciando diálogo y comprensión.",
        review:
          "Repasa el valor Respeto en acción: trato digno, escucha activa y apertura al diálogo con todos.",
      },
      {
        id: "orientacion-usuario-v2-9",
        text: "Adaptar la comunicación para que personas con discapacidad comprendan los mensajes es:",
        options: [
          { value: "a", label: "Un esfuerzo opcional" },
          { value: "b", label: "Una obligación de accesibilidad y trato digno coherente con el valor Respeto" },
          { value: "c", label: "Una práctica exclusiva de servicios especializados" },
          { value: "d", label: "Un ajuste innecesario cuando hay prisa" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Garantizar accesibilidad comunicativa asegura igualdad de oportunidades y materializa el valor de respeto.",
        review:
          "Consulta la accesibilidad como parte del Respeto: garantizar comunicación adaptada es obligación para trato digno e igualdad.",
      },
      {
        id: "orientacion-usuario-v2-10",
        text: "Hacer comentarios sexistas o discriminatorios, aunque sea en privado, según el código:",
        options: [
          { value: "a", label: "Es aceptable porque no se hace en público" },
          { value: "b", label: "Normaliza la discriminación y contradice el valor Respeto" },
          { value: "c", label: "Es válido si no se identifica a la persona" },
          { value: "d", label: "Es admisible siempre que exista confianza" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Cualquier manifestación discriminatoria vulnera la dignidad humana y se opone al valor Respeto del código.",
        review:
          "Repasa el valor Respeto: cualquier comentario discriminatorio (público o privado) vulnera la dignidad y contradice el código.",
      },
      {
        id: "orientacion-usuario-v2-11",
        text: "Orientación al usuario y al ciudadano implica:",
        options: [
          { value: "a", label: "Centrar las decisiones en la satisfacción de usuarios y ciudadanía, valorar sus necesidades y establecer mecanismos para conocerlas" },
          { value: "b", label: "Evitar la interacción con el ciudadano" },
          { value: "c", label: "Restringir el servicio a canales internos" },
          { value: "d", label: "Discriminar según el tipo de usuario" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "La competencia orienta decisiones y acciones hacia la satisfacción y no discriminación de usuarios y ciudadanos.",
        review:
          "Consulta la competencia Orientación al Usuario: centrar decisiones en satisfacción ciudadana y establecer mecanismos para conocer sus necesidades.",
      },
    ],
  },
  {
    id: "trabajo-equipo",
    title: "Trabajo en Equipo",
    description: "Colaboración integrada, respeto por la diversidad y responsabilidad compartida.",
    intro:
      "Mide tu capacidad para colaborar efectivamente, respetar perspectivas diversas y asumir responsabilidad colectiva por resultados.",
    reference: "Sección 2.7 del Decreto 815 de 2018 - Trabajo en equipo.",
    questions: [
      {
        id: "trabajo-equipo-v2-1",
        text: "¿Qué caracteriza el trabajo en equipo según el Decreto 815?",
        options: [
          { value: "a", label: "Completar tareas individuales coordinando únicamente los aspectos mínimos necesarios con otros." },
          { value: "b", label: "Colaborar con otros para lograr objetivos comunes, respetando diversidad y asumiendo responsabilidad compartida." },
          { value: "c", label: "Distribuir responsabilidades equitativamente sin necesidad de interacción colaborativa constante." },
          { value: "d", label: "Liderar equipos asignando tareas y supervisando el cumplimiento individual de cada miembro." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El trabajo en equipo implica colaboración genuina para lograr objetivos comunes, respetando la diversidad y compartiendo responsabilidad por los resultados.",
        review:
          "Revisa la definición de trabajo en equipo: incluye colaboración, respeto por diversidad y responsabilidad compartida.",
      },
      {
        id: "trabajo-equipo-v2-2",
        text: "El respeto por la diversidad en el equipo significa:",
        options: [
          { value: "a", label: "Tolerar pasivamente perspectivas diferentes sin necesidad de integrarlas en las decisiones." },
          { value: "b", label: "Valorar y aprovechar perspectivas, experiencias y habilidades diversas para enriquecer soluciones." },
          { value: "c", label: "Evitar discusiones sobre diferencias para mantener armonía superficial en el grupo." },
          { value: "d", label: "Adaptar el comportamiento individual para conformarse con la opinión mayoritaria del equipo." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "Respetar la diversidad implica valorar activamente y aprovechar perspectivas, experiencias y habilidades diversas para enriquecer soluciones colectivas.",
        review:
          "Consulta el componente de respeto por diversidad: requiere valoración activa y aprovechamiento de diferencias para mejores resultados.",
      },
      {
        id: "trabajo-equipo-v2-3",
        text: "La responsabilidad compartida en el trabajo en equipo implica:",
        options: [
          { value: "a", label: "Distribuir claramente responsabilidades individuales para facilitar la rendición de cuentas personal." },
          { value: "b", label: "Asumir colectivamente tanto los éxitos como los fracasos del equipo, apoyándose mutuamente." },
          { value: "c", label: "Identificar responsables específicos cuando ocurren errores para aplicar medidas correctivas individuales." },
          { value: "d", label: "Limitar la propia responsabilidad al cumplimiento de tareas asignadas individualmente." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "La responsabilidad compartida significa asumir colectivamente resultados (éxitos y fracasos), apoyándose mutuamente en el logro de objetivos comunes.",
        review:
          "Repasa el concepto de responsabilidad compartida: implica asunción colectiva de resultados y apoyo mutuo continuo.",
      },
      {
        id: "trabajo-equipo-v2-4",
        text: "¿Cómo contribuye el trabajo en equipo al logro de objetivos institucionales?",
        options: [
          { value: "a", label: "Permite distribuir tareas reduciendo la carga de trabajo individual de cada servidor." },
          { value: "b", label: "Integra conocimientos, habilidades y perspectivas diversas para generar soluciones más completas y efectivas." },
          { value: "c", label: "Facilita la supervisión jerárquica al concentrar múltiples servidores en un mismo objetivo." },
          { value: "d", label: "Reduce la necesidad de coordinación interinstitucional al resolver internamente los desafíos." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "El trabajo en equipo aporta al logro institucional integrando conocimientos, habilidades y perspectivas diversas para soluciones más completas y efectivas.",
        review:
          "Revisa el aporte del trabajo en equipo: la integración de diversidad genera soluciones superiores a las individuales.",
      },
      {
        id: "trabajo-equipo-v2-5",
        text: "Estás a cargo de un proyecto con plazo ajustado. Un miembro clave del equipo solicita una semana de licencia por motivos personales. ¿Qué harías en esta situación demostrando trabajo en equipo?",
        options: [
          { value: "a", label: "Negar la solicitud de licencia y exigir que el miembro se quede para cumplir con el plazo." },
          { value: "b", label: "Aceptar la solicitud de licencia sin ajustar el plan del proyecto." },
          { value: "c", label: "Aceptar la solicitud de licencia y redistribuir las tareas entre los demás miembros para asegurar que el proyecto se complete a tiempo." },
          { value: "d", label: "Pedir al miembro del equipo que trabaje desde casa durante su licencia." },
        ],
        correctOption: "c",
        score: 10,
        explanation:
          "Aceptar la licencia y redistribuir tareas demuestra respeto por el bienestar del equipo, responsabilidad compartida y capacidad de adaptación colaborativa para cumplir objetivos. Esta conducta refleja los principios del trabajo en equipo.",
        review:
          "Revisa los principios del trabajo en equipo: incluye respeto por los miembros, responsabilidad compartida, flexibilidad y colaboración para lograr objetivos comunes.",
      },
      {
        id: "trabajo-equipo-v2-6",
        text: "En el nivel directivo, la competencia de gerenciar equipos descrita en el Decreto 815 se evidencia cuando el líder:",
        options: [
          { value: "a", label: "Concentra todas las decisiones y funciones críticas para mantener un control total del equipo." },
          { value: "b", label: "Forma equipos comprometidos, delega según competencias e intereses y brinda apoyo ante situaciones adversas." },
          { value: "c", label: "Evita delegar responsabilidades para asegurar resultados homogéneos." },
          { value: "d", label: "Comunica directrices generales y espera que el equipo resuelva autónomamente los inconvenientes." },
        ],
        correctOption: "b",
        score: 10,
        explanation:
          "Gerenciar equipos implica movilizar a los miembros, delegar con criterio y sostener el compromiso brindando apoyo ante la adversidad, tal como señala la competencia directiva del Decreto 815.",
        review:
          "Consulta la competencia de gerenciar equipos del nivel directivo: combina movilización, delegación y apoyo continuo al talento humano.",
      },
      {
        id: "trabajo-equipo-v2-7",
        text: "Aceptar críticas sobre el trabajo sin tomarlas como ataques personales demuestra:",
        options: [
          { value: "a", label: "Debilidad profesional" },
          { value: "b", label: "Apertura al diálogo, madurez emocional y compromiso con la mejora" },
          { value: "c", label: "Desinterés frente a la tarea asignada" },
          { value: "d", label: "Una postura contraproducente para el liderazgo" },
        ],
        correctOption: "b",
        score: 5,
        explanation:
          "Escuchar críticas con apertura es coherente con el valor Respeto y fortalece el trabajo en equipo.",
        review:
          "Revisa el valor Respeto en contexto de trabajo en equipo: apertura al diálogo, madurez emocional y compromiso con mejora son fundamentales.",
      },
      {
        id: "trabajo-equipo-v2-8",
        text: "Trabajo en equipo, según la presentación, incluye:",
        options: [
          { value: "a", label: "Colaborar con compañeros, respetar criterios diversos y contribuir a un clima laboral armónico" },
          { value: "b", label: "Competir con el equipo" },
          { value: "c", label: "Evitar el intercambio de ideas" },
          { value: "d", label: "Delegar todo en un líder" },
        ],
        correctOption: "a",
        score: 5,
        explanation:
          "La competencia enfatiza la colaboración, el respeto por la diversidad y el apoyo mutuo.",
        review:
          "Consulta la competencia Trabajo en Equipo: colaboración, respeto por diversidad y clima armónico son elementos clave.",
      },
    ],
  },
]
