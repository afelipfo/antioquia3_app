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
  readingId?: string
}

type Reading = {
  id: string
  title: string
  text: string
  questionIds: number[]
}

const readingsV1: Reading[] = [
  {
    id: "lectura-libro",
    title: "Lectura 1: El libro como extensión de la memoria e imaginación",
    text: `El libro es uno de los inventos más asombrosos de la humanidad, pues sirve de extensión a nuestro poder de recordar y de imaginar. ¿Cómo puede un objeto inanimado ayudar a que millones, o incluso cientos de millones de personas recuerden la misma cosa? El libro como medio de información permite contener cierta información determinada que es posible preservar; también sirve para representar el mundo y hacerlo legible. El libro es una extensión de nuestra memoria y nuestra imaginación, pues expande la capacidad de pensar y comunicarse.

Para el reconocido autor Roger Chartier, el libro no es un simple auxiliar de la memoria, sino que él mismo informa, él mismo da forma al recuerdo.

Sin embargo, es extraño comprobar cómo se rechazaba el poder de lo escrito en la antigüedad. Sócrates afirmó en algún momento que la escritura terminaría por destruir la capacidad de recordar: «Es olvido lo que [las letras] producirán en las almas de quienes las aprendan, al descuidar la memoria, ya que, fiándose de lo escrito, llegarán al recuerdo desde fuera, a través de caracteres ajenos, no desde dentro, desde ellos mismos. No es, pues, un fármaco [remedio] de la memoria lo que has hallado, sino un simple recordatorio». Sócrates dice que la escritura destruye la capacidad del juicio, pues evita el trabajo mental que debe realizar quien realmente quiere conocer. No hay error en lo afirmado por Sócrates, solo que él suponía que la memoria es algo más intenso y más noble que la escritura. La historia demostró que se trataba de una forma de pensamiento útil en su época, en la que el culto de la oralidad y las ideas eran necesarias en ese momento. Comparar ambos aspectos de la memoria —la oral y la escrita— es igual que comparar el culto a la oralidad de los antiguos con nuestro culto a los libros. Son simplemente formas de pensamiento útiles, necesarias en su momento, en su cultura.`,
    questionIds: [68, 69, 70, 71],
  },
  {
    id: "lectura-retorica",
    title: "Lectura 2: El obstáculo amoroso en la retórica medieval",
    text: `Los trovadores Provenzales contribuyeron en la Edad Media a expandir una nueva forma de pensar el amor. En sus obras, se establece como regla que el enamorado sufre el rechazo de la mujer amada, quien debe mantenerse distante y ser «inaccesible». Esta estructura narrativa no es casual: detrás del rechazo de la dama se esconde un código complejo de conductas y valores corteses. El amor debía permanecer discreto, casi secreto, y el sufrimiento del pretendiente servía para probar su persistencia, virtud y nobleza de espíritu.

La retórica cortés establecía que sin obstáculo no hay relato amoroso. El impedimento no es un accidente, sino la esencia misma del amor cortés. La imposibilidad del amor alimenta la tensión narrativa y permite explorar temas de honor, deseo contenido, sufrimiento refinado y lealtad incondicional. La dama, al mantenerse inalcanzable, eleva al caballero y lo obliga a perfeccionarse moralmente.

Este código influyó profundamente en la literatura medieval y renacentista, estableciendo el patrón del amor imposible que perduró durante siglos en la tradición literaria occidental. La distancia entre amante y amada no era un defecto del relato, sino su motor narrativo fundamental.`,
    questionIds: [72, 73, 74, 75, 76],
  },
  {
    id: "lectura-star-trek",
    title: "Lectura 3: Gene Roddenberry y el éxito de Star Trek",
    text: `El futuro cumple 30 años
Por: Mario H. Doren

Gene Roddenberry era guionista de series de televisión, pero su fascinación eran los viajes espaciales. Soñaba con velocidades lumínicas, teletransportación, comunicadores portátiles (que luego inspirarían los teléfonos celulares), computadoras parlantes y naves que exploraban las estrellas. No era científico, y para la comunidad científica era un discreto y redondo cero a la izquierda. Pero él creó la nave U.S.S. Enterprise, con una tripulación de 430 personas comandada por el capitán James Kirk, el doctor Spock y el médico McCoy, que cada semana visitaban un nuevo planeta.

La serie se estrenó en septiembre de 1966 con el episodio The Man Trap (La trampa humana) y en 1996 cumplió treinta años al aire. El programa se hizo con presupuesto limitado: la Enterprise nunca aterrizaba porque no había dinero para construir escenarios de descenso. Los guionistas asumieron que la mayoría de planetas visitados tenían atmósferas respirables para ahorrarse el costo de trajes espaciales. A pesar de estar hecha «con las uñas», con escenarios de cartón, miniaturas y uniformes sencillos, la serie Viaje a las Estrellas (Star Trek) se convirtió en un fenómeno cultural global.

Roddenberry nunca pretendió hacer ciencia real, pero sus imaginaciones sobre el futuro capturaron la fantasía de millones. Sus visiones creativas terminaron influyendo en generaciones de ingenieros, científicos y diseñadores que convirtieron muchas de sus ideas en realidad décadas después.`,
    questionIds: [77, 78, 79, 80, 81, 82],
  },
  {
    id: "lectura-lampara",
    title: "Lectura 4: La lámpara maravillosa - William Ospina",
    text: `El cuerpo, la vida, el mundo, son continuamente bendición y tormento, y desde muy temprano tenemos el deber de conocer sus dones y prevenir sus peligros; es de vida o muerte saber cuándo es provechosa la audacia y cuando es salvadora la prudencia. Y para todo eso sólo tenemos dos recursos: la experiencia y la imaginación. La experiencia nos va enseñando que no podemos acariciar el fuego ni descansar en el fondo del agua, que no conviene empujar la punta de la espina ni molestar demasiado a la abeja, que en lo alto del día hay una cosa que no se debe mirar y que en lo alto de la noche hay una que siempre queremos mirar otra vez.

Pero esos juegos de la experiencia se ahondan en los juegos de la imaginación, y en los reinos de la imaginación está permitido todo aquello que la experiencia prohíbe. Por fortuna existe el paraíso de los libros, que nos permiten escarmentar por cabeza ajena, vivir lo no vivido, recordar memorias de otros, oír los pensamientos de todos, las aventuras, las audacias, las atrocidades, las violencias, el relato de los que supieron vivir y la magia de los que supieron cantar. Una de las experiencias inevitables de la vida es la soledad, otra es la amistad, otra es la felicidad. Pero en nuestra relación con los libros están juntas las tres. La soledad nos permite dialogar con nosotros mismos; y la relación con los libros es, como diría Borges, el hallazgo de una legión de amigos que puede ser inagotable. Uno nos cuenta la historia de un hombre de vida ordinaria a quien la lectura le contagia el deseo de ser héroe y lo pone a vivir una vida fantástica; otro nos relata la cacería obsesionada y satánica de una enorme ballena blanca; otro nos cuenta la historia triste de un hombre que se convierte en escarabajo; otro nos muestra a un hombre inseguro y celoso que, manipulado por otro, termina matando sin causa a la mujer que adora. Qué alivio permitir que por momentos otros protagonicen nuestra vida. Los libros nos convierten en el escenario donde ocurren hechos ilustres, viajes asombrosos, acontecimientos fantásticos. Por un contacto que sólo podemos llamar mágico, gracias al libro vemos cosas que están guardadas más allá de sus páginas, vivimos las navegaciones, los conflictos, los crímenes.`,
    questionIds: [83, 84, 85, 86, 87, 88, 89, 90, 91],
  },
  {
    id: "lectura-kundera",
    title: "Lectura 5: La insoportable levedad del ser - Milan Kundera",
    text: `1. La idea del eterno retorno es misteriosa y con ella Nietzsche dejó perplejos a los demás filósofos: ¡pensar que alguna vez haya de repetirse todo tal como lo hemos vivido ya, y que incluso esa repetición haya de repetirse hasta el infinito! ¿Qué quiere decir ese mito demencial? 2. El mito del eterno retorno viene a decir, per negationem, que una vida que desaparece de una vez para siempre, que no retorna, es como una sombra, carece de peso, está muerta de antemano y, si ha sido horrorosa, bella, elevada, ese horror, esa elevación o esa belleza nada significan. No es necesario que los tengamos en cuenta, igual que una guerra entre dos Estados africanos en el siglo catorce que no cambió en nada la faz de la tierra, aunque en ella murieran, en medio de indecibles padecimientos, trescientos mil negros. 3. ¿Cambia en algo la guerra entre dos Estados africanos si se repite incontables veces en un eterno retorno? Cambia: se convierte en un bloque que sobresale y perdura, y su estupidez será irreparable. 4. Si la Revolución francesa tuviera que repetirse eternamente, la historiografía francesa estaría menos orgullosa de Robespierre. Pero dado que habla de algo que ya no volverá a ocurrir, los años sangrientos se convierten en meras palabras, en teorías, en discusiones, se vuelven más ligeros que una pluma, no dan miedo. Hay una diferencia infinita entre el Robespierre que apareció sólo una vez en la historia y un Robespierre que volviera eternamente a cortarle la cabeza a los franceses. 5. Digamos, por tanto, que la idea del eterno retorno significa cierta perspectiva desde la cual las cosas aparecen de un modo distinto a como las conocemos: aparecen sin la circunstancia atenuante de su fugacidad. Esta circunstancia atenuante es la que nos impide pronunciar condena alguna. ¿Cómo es posible condenar algo fugaz? El crepúsculo de la desaparición lo baña todo con la magia de la nostalgia; todo, incluida la guillotina. 6. No hace mucho me sorprendí a mí mismo con una sensación increíble: estaba hojeando un libro sobre Hitler y al ver algunas de las fotografías me emocioné: me habían recordado el tiempo de mi infancia; la viví durante la guerra; algunos de mis parientes murieron en los campos de concentración de Hitler; ¿pero qué era su muerte en comparación con el hecho de que las fotografías de Hitler me habían recordado un tiempo pasado de mi vida, un tiempo que no volverá? 7. Esta reconciliación con Hitler demuestra la profunda perversión moral que va unida a un mundo basado esencialmente en la inexistencia del retorno, porque en ese mundo todo está perdonado de antemano y, por tanto, todo cínicamente permitido.`,
    questionIds: [92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105],
  },
  {
    id: "lectura-paz",
    title: "Lectura 6: La llama doble. Amor y erotismo - Octavio Paz",
    text: `La relación entre erotismo y poesía es tal que puede decirse, sin afectación, que el primero es una poética corporal y que la segunda es una erótica verbal. Ambos están constituidos por una oposición complementaria. El lenguaje – sonido que emite sentidos, trazo material que denota ideas incorpóreas – es capaz de dar nombre a lo más fugitivo y evanescente: la sensación; a su vez, el erotismo no es mera sexualidad animal: es ceremonia, representación. El erotismo es sexualidad transfigurada: metáfora. El agente que mueve lo mismo al acto erótico que al poético es la imaginación. Es la potencia que transfigura al sexo en ceremonia y rito, al lenguaje en ritmo y metáfora. La imagen poética es abrazo de realidades opuestas y la rima es cópula de sonidos; la poesía erotiza al lenguaje y al mundo porque ella misma, en su modo de operación, es ya erotismo. Y del mismo modo: el erotismo es una metáfora de la sexualidad animal. ¿Qué dice esa metáfora? Como todas las metáforas, designa algo que está más allá de la realidad que la origina, algo nuevo y distinto de los términos que la componen. Si Góngora dice púrpura nevada, inventa o descubre una realidad que, aunque hecha de ambas, no es sangre ni nieve. Lo mismo sucede con el erotismo: dice o, más bien: es, algo diferente a la mera sexualidad.`,
    questionIds: [106, 107, 108, 109, 110, 111, 112, 113, 114, 115],
  },
  {
    id: "lectura-roca",
    title: "Lectura 7: Boca que busca la boca - Juan Manuel Roca",
    text: `El erotismo llama a la transgresión, con un acuerdo entre las partes para crear un espacio de libertad donde no hay víctimas ni victimarios sino un despojo de potestades. Es una confesión – según el término cristiano – de deseos absueltos que se acompañan de ornamentos rituales donde la boca es cáliz, el olor de los cuerpos es incienso, las palabras son claves para abrir como un sésamo el pequeño jardín que conduce al Paraíso, las palabras de amor correspondidas son plegarias escuchadas.`,
    questionIds: [116, 117, 118, 119, 120],
  },
  {
    id: "lectura-restrepo",
    title: "Lectura 8: Delirio - Laura Restrepo",
    text: `Supe que había sucedido algo irreparable en el momento en que un hombre me abrió la puerta de esa habitación de hotel y vi a mi mujer sentada en el fondo, mirando por la ventana de muy extraña manera. Fue a mi regreso de un viaje corto, sólo cuatro días por cosas de trabajo, dice Aguilar, y asegura que al partir la dejó bien. Cuando me fui no le pasaba nada raro, o al menos nada fuera de lo habitual, ciertamente nada que anunciara lo que iba a sucederle durante mi ausencia, salvo sus propias premoniciones, claro está, pero cómo iba Aguilar a creerle si Agustina, su mujer, siempre anda pronosticando calamidades. Él ha tratado por todos los medios de hacerla entrar en razón pero ella no da su brazo a torcer e insiste en que desde pequeña tiene lo que llama un don de los ojos, o visión de lo venidero, y sólo Dios sabe – dice Aguilar – lo que eso ha trastornado nuestras vidas. Esta vez, como todas, mi Agustina pronosticó que algo saldría mal, y yo, como siempre, pasé por alto su pronóstico; me fui de la ciudad un miércoles, la dejé pintando de verde las paredes del apartamento y el domingo siguiente, a mi regreso, la encontré en un hotel, al norte de la ciudad, transformada en un ser aterrado y aterrador al que apenas reconozco. No he podido saber qué le sucedió durante mi ausencia porque si se lo pregunto me insulta; hay que ver cuán feroz puede llegar a ser cuando se exalta, me trata como si yo ya no fuera yo ni ella fuera ella, intenta explicar Aguilar y si no puede es porque él mismo no lo comprende; la mujer que amo se ha perdido dentro de su propia cabeza, hace ya catorce días que la ando buscando y me va la vida en encontrarla pero la cosa es difícil, es angustiosa a morir y jodidamente difícil; es como si Agustina habitara en un plano paralelo al real, cercano pero inabordable, es como si hablara en una lengua extrajera que Aguilar vagamente reconoce pero que no logra comprender. La trastornada razón de mi mujer es un perro que me tira tarascadas pero que al mismo tiempo me envía en sus ladridos un llamado de auxilio que no atino a responder; Agustina es un perro famélico y malherido que quisiera volver a casa y no lo logra, y al minuto siguiente en un perro vagabundo que ni siquiera recuerda que alguna vez tuvo casa.`,
    questionIds: [121, 122, 123, 124, 125, 126, 127, 128, 129, 130],
  },
  {
    id: "lectura-montero",
    title: "Lectura 9: La loca de la casa - Rosa Montero",
    text: `Escribir, en fin, es estar habitado por un revoltijo de fantasías, a veces perezosas como las lentas ensoñaciones de una siesta estival, a veces agitadas y enfebrecidas como el delirio de un loco. La cabeza del novelista marcha por sí sola; está poseída por una suerte de compulsión fabuladora, y eso a veces es un don y en otras ocasiones es un castigo. Por ejemplo, a lo mejor lees un día en el periódico una noticia atroz sobre niños descuartizados delante de sus padres en Argelia, y no puedes evitar que la maldita fantasía se te dispare, recreando de manera instantánea la horripilante escena hasta en sus detalles más insoportables: los gritos, las salpicaduras, el pegajoso olor, el chasquido de los huesos al quebrarse, la mirada de los verdugos y las víctimas. O bien, en un nivel mucho más ridículo pero igualmente molesto, vas a cruzar un río de montaña por un puente improvisado de troncos y, al plantar el primer pie sobre el madero, tu cabeza te ofrece, de manera súbita, la secuencia completa de tu caída: cómo vas a resbalar con el verdín, cómo vas a bracear en el aire patosamente, cómo vas a meter un pie en la corriente helada y después, para mayor oprobio, también el otro pie e incluso las nalgas, porque te vas a caer sentada sobre el arroyo. Y, Voilà, una vez imaginada la tontería con todos sus pormenores (el choque frío del agua, el momentáneo descoloque espacial que produce toda caída, la dolorosa torcedura del pie, el escozor del raspón de la mano contra la piedra), resulta bastante difícil no cumplirla. De lo que se deriva, al menos en mi caso, una enojosa tendencia a despanzurrarme en todos los vados de riachuelos y en todas las laderas montañosas un poco ásperas.`,
    questionIds: [131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208],
  },
  {
    id: "poema-pajaros-cortazar",
    title: "Lectura 10: Ahora escribo pájaros - Julio Cortázar",
    text: `Ahora escribo pájaros. / No los veo venir, no los elijo, / de golpe están ahí, son esto, / una bandada de palabras / posándose / una / a / una / en los alambres de la página, / chirriando, picoteando, lluvia de alas / y yo sin pan que darles, solamente / dejándolos venir. Tal vez / sea eso un árbol / o tal vez / el amor.`,
    questionIds: [209],
  },
  {
    id: "poema-ratoncito-cortazar",
    title: "Lectura 11: Ratoncito, pelusa... - Julio Cortázar",
    text: `Ratoncito, pelusa, medialuna, / caleidoscopio, barco en la botella, / musgo, campana, diáspora, / palingenesia, helecho, / eso y el dulce de zapallo, / el bandoneón de Troilo y dos o tres / zonas de piel en donde / hace nido el alción, / son las palabras que contienen / tu cruel definición inalcanzable, / son las cosas que guardan las sustancias / de que estás hecha para que alguien / beba y posea y arda convencida / de conocerte entera, / de que sólo eres Cris.`,
    questionIds: [210],
  },
  {
    id: "poema-desamor-cortazar",
    title: "Lectura 12: La lenta máquina del desamor - Julio Cortázar",
    text: `La lenta máquina del desamor, / los engranajes del reflujo, / los cuerpos que abandonan las almohadas, / las sábanas, los besos, / y de pie ante el espejo interrogándose / cada uno a sí mismo, / ya no mirándose entre ellos, / ya no desnudos para el otro, / ya no te amo, / mi amor.`,
    questionIds: [211],
  },
  {
    id: "ortografia-general",
    title: "Lectura 13: Ejercicios de ortografía y gramática",
    text: `Ejercicios generales de acentuación, uso de palabras homófonas y clasificación gramatical.`,
    questionIds: [212, 213, 214, 215, 216, 217, 218],
  },
  {
    id: "poema-mal-siglo-silva",
    title: "Lectura 14: El mal del siglo - José Asunción Silva",
    text: `El paciente: / Doctor, un desaliento de la vida / que en lo íntimo de mí se arraiga y nace, / el mal del siglo… el mismo mal de Werther, / de Rolla, de Manfredo y de Leopardi. / Un cansancio de todo, un absoluto / desprecio por lo humano… un incesante / renegar de lo vil de la existencia / digno de mi maestro Schopenhauer; / un malestar profundo que se aumenta / con todas las torturas del análisis… / El médico: / Eso es cuestión de régimen: camine / de mañanita; duerma largo, báñese; / beba bien; coma bien; cuídese mucho, / ¡Lo que usted tiene es hambre!`,
    questionIds: [219, 220],
  },
  {
    id: "poema-verdor-restrepo",
    title: "Lectura 15: Verdor - Elkin Restrepo",
    text: `No son de animal salvaje / las pisadas / que rodean tu casa / esta mañana. / Cerca no hay gamos / ni osos / ni el bosque / se arrimaría hasta aquí. / Sin embargo, / alguien en la oscuridad / estuvo en vela / mientras / tú dormías. / alguien que pudo / sacar provecho / de tu fragilidad / y no lo hizo. / El rastro aún está fresco. / De actuar, / no habrías tenido salvación. / ¡Nadie hubiera podido con fuerza tal! / Lo prueba / el violento verdor / que salta allí / donde Él estuvo.`,
    questionIds: [221, 222, 239, 240],
  },
  {
    id: "poema-futuro-gonzalez",
    title: "Lectura 16: ¡Futuro mío...! - Ángel González",
    text: `¡Futuro mío…! Corazón lejano / que lo dictaste ayer: / no te avergüences. / Hoy es el resultado de tu sangre, / dolor que reconozco, luz que admito, / sufrimiento que asumo, / amor que intento. / Pero nada es aún definitivo. / Mañana he decidido ir adelante, / y avanzaré, / mañana me dispongo a estar contento, / mañana te amaré, mañana / y tarde, / mañana no será lo que Dios quiera. / Mañana gris, o luminosa, o fría, / que unas manos modelan en el viento, / que unos puños dibujan en el aire.`,
    questionIds: [223],
  },
  {
    id: "estructura-oraciones",
    title: "Lectura 17: Estructura de oraciones",
    text: `Ejercicios sobre identificación de sujeto, predicado, complementos directos e indirectos, tipos de predicado y clasificación de oraciones.`,
    questionIds: [224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238],
  },
  {
    id: "relato-zapato-juliao",
    title: "Lectura 18: Zapato Zapata - David Sánchez Juliao",
    text: `Zapato Zapata fue un zapatito que un lunes cualquiera decidió fugarse de la zapatería y salir a predicar de vitrina en vitrina, de almacén en almacén, de fábrica en fábrica, de taller en taller, pidiendo a zapatos, chanclas, sandalias, zuecos, pantuflas, tenis y botas que se fugaran como él de la vida ciudadana y se fueran al monte o a la clandestinidad urbana, no con el propósito de crear nuevos focos guerrilleros ni mucho menos con la intención de hacer la revolución, sino con el sólo objeto de que la gente, por fin, ante la ausencia de calzado, se viera forzada a poner los pies en la tierra.`,
    questionIds: [241, 242, 243],
  },
  {
    id: "ortografia-acentuacion",
    title: "Lectura 19: Ejercicios de acentuación",
    text: `Ejercicios de identificación de acentos prosódicos, ortográficos y uso del pronombre 'se'.`,
    questionIds: [244, 245],
  },
  {
    id: "cien-años-garcia-marquez",
    title: "Lectura 20: Cien años de soledad - Gabriel García Márquez",
    text: `Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo. Macondo era entonces una aldea de veinte casas de barro y cañabrava construidas a la orilla de un río de aguas diáfanas que se precipitaban por un lecho de piedras pulidas, blancas y enormes como huevos prehistóricos.`,
    questionIds: [246],
  },
  {
    id: "relato-ya-era-tiempo-juliao",
    title: "Lectura 21: Ya era tiempo - David Sánchez Juliao",
    text: `Nadie en la relojería pudo entender, ni mucho menos justificar, que las aspiraciones de aquel relojito humilde fueran las de llegar a ser reloj despertador, y las de aprender alpinismo, para así subirse al pico más alto de los Andes, poner la alarma a las seis de la mañana y campanear, campanear y campanear, hasta que todo el Continente despertara de su sueño.`,
    questionIds: [247],
  },
  {
    id: "relato-entre-lapices-juliao",
    title: "Lectura 22: Entre lápices - David Sánchez Juliao",
    text: `En una fábrica de lápices para la exportación, dos lápices conversaban un día: —¿Y por qué fabrican aquellos colegas sin borrador? —Es que esos van para la América Latina. —¿Y eso qué es? —Una tierra lejana en donde nadie reconoce errores.`,
    questionIds: [248],
  },
  {
    id: "puntuacion-ortografia-final",
    title: "Lectura 23: Ejercicios de puntuación y ortografía final",
    text: `Ejercicios finales sobre uso de coma, punto seguido, porqué/porque/por qué, y corrección ortográfica.`,
    questionIds: [249, 250, 251, 252, 253],
  },
]

const readingsV2: Reading[] = [
  {
    id: "lectura-libro",
    title: "Lectura 1: El libro como extensión de la memoria e imaginación",
    text: `El libro es uno de los inventos más asombrosos de la humanidad, pues sirve de extensión a nuestro poder de recordar y de imaginar. ¿Cómo puede un objeto inanimado ayudar a que millones, o incluso cientos de millones de personas recuerden la misma cosa? El libro como medio de información permite contener cierta información determinada que es posible preservar; también sirve para representar el mundo y hacerlo legible. El libro es una extensión de nuestra memoria y nuestra imaginación, pues expande la capacidad de pensar y comunicarse.

Para el reconocido autor Roger Chartier, el libro no es un simple auxiliar de la memoria, sino que él mismo informa, él mismo da forma al recuerdo.

Sin embargo, es extraño comprobar cómo se rechazaba el poder de lo escrito en la antigüedad. Sócrates afirmó en algún momento que la escritura terminaría por destruir la capacidad de recordar: «Es olvido lo que [las letras] producirán en las almas de quienes las aprendan, al descuidar la memoria, ya que, fiándose de lo escrito, llegarán al recuerdo desde fuera, a través de caracteres ajenos, no desde dentro, desde ellos mismos. No es, pues, un fármaco [remedio] de la memoria lo que has hallado, sino un simple recordatorio». Sócrates dice que la escritura destruye la capacidad del juicio, pues evita el trabajo mental que debe realizar quien realmente quiere conocer. No hay error en lo afirmado por Sócrates, solo que él suponía que la memoria es algo más intenso y más noble que la escritura. La historia demostró que se trataba de una forma de pensamiento útil en su época, en la que el culto de la oralidad y las ideas eran necesarias en ese momento. Comparar ambos aspectos de la memoria —la oral y la escrita— es igual que comparar el culto a la oralidad de los antiguos con nuestro culto a los libros. Son simplemente formas de pensamiento útiles, necesarias en su momento, en su cultura.`,
    questionIds: [99, 100, 101, 102],
  },
  {
    id: "lectura-retorica",
    title: "Lectura 2: El obstáculo amoroso en la retórica medieval",
    text: `Los trovadores Provenzales contribuyeron en la Edad Media a expandir una nueva forma de pensar el amor. En sus obras, se establece como regla que el enamorado sufre el rechazo de la mujer amada, quien debe mantenerse distante y ser «inaccesible». Esta estructura narrativa no es casual: detrás del rechazo de la dama se esconde un código complejo de conductas y valores corteses. El amor debía permanecer discreto, casi secreto, y el sufrimiento del pretendiente servía para probar su persistencia, virtud y nobleza de espíritu.

La retórica cortés establecía que sin obstáculo no hay relato amoroso. El impedimento no es un accidente, sino la esencia misma del amor cortés. La imposibilidad del amor alimenta la tensión narrativa y permite explorar temas de honor, deseo contenido, sufrimiento refinado y lealtad incondicional. La dama, al mantenerse inalcanzable, eleva al caballero y lo obliga a perfeccionarse moralmente.

Este código influyó profundamente en la literatura medieval y renacentista, estableciendo el patrón del amor imposible que perduró durante siglos en la tradición literaria occidental. La distancia entre amante y amada no era un defecto del relato, sino su motor narrativo fundamental.`,
    questionIds: [103, 104, 105, 106, 107],
  },
  {
    id: "lectura-star-trek",
    title: "Lectura 3: Gene Roddenberry y el éxito de Star Trek",
    text: `El futuro cumple 30 años
Por: Mario H. Doren

Gene Roddenberry era guionista de series de televisión, pero su fascinación eran los viajes espaciales. Soñaba con velocidades lumínicas, teletransportación, comunicadores portátiles (que luego inspirarían los teléfonos celulares), computadoras parlantes y naves que exploraban las estrellas. No era científico, y para la comunidad científica era un discreto y redondo cero a la izquierda. Pero él creó la nave U.S.S. Enterprise, con una tripulación de 430 personas comandada por el capitán James Kirk, el doctor Spock y el médico McCoy, que cada semana visitaban un nuevo planeta.

La serie se estrenó en septiembre de 1966 con el episodio The Man Trap (La trampa humana) y en 1996 cumplió treinta años al aire. El programa se hizo con presupuesto limitado: la Enterprise nunca aterrizaba porque no había dinero para construir escenarios de descenso. Los guionistas asumieron que la mayoría de planetas visitados tenían atmósferas respirables para ahorrarse el costo de trajes espaciales. A pesar de estar hecha «con las uñas», con escenarios de cartón, miniaturas y uniformes sencillos, la serie Viaje a las Estrellas (Star Trek) se convirtió en un fenómeno cultural global.

Roddenberry nunca pretendió hacer ciencia real, pero sus imaginaciones sobre el futuro capturaron la fantasía de millones. Sus visiones creativas terminaron influyendo en generaciones de ingenieros, científicos y diseñadores que convirtieron muchas de sus ideas en realidad décadas después.`,
    questionIds: [108, 109, 110, 111, 112, 113],
  },
  {
    id: "lectura-lampara",
    title: "Lectura 4: La lámpara maravillosa - William Ospina",
    text: `El cuerpo, la vida, el mundo, son continuamente bendición y tormento, y desde muy temprano tenemos el deber de conocer sus dones y prevenir sus peligros; es de vida o muerte saber cuándo es provechosa la audacia y cuando es salvadora la prudencia. Y para todo eso sólo tenemos dos recursos: la experiencia y la imaginación. La experiencia nos va enseñando que no podemos acariciar el fuego ni descansar en el fondo del agua, que no conviene empujar la punta de la espina ni molestar demasiado a la abeja, que en lo alto del día hay una cosa que no se debe mirar y que en lo alto de la noche hay una que siempre queremos mirar otra vez.

Pero esos juegos de la experiencia se ahondan en los juegos de la imaginación, y en los reinos de la imaginación está permitido todo aquello que la experiencia prohíbe. Por fortuna existe el paraíso de los libros, que nos permiten escarmentar por cabeza ajena, vivir lo no vivido, recordar memorias de otros, oír los pensamientos de todos, las aventuras, las audacias, las atrocidades, las violencias, el relato de los que supieron vivir y la magia de los que supieron cantar. Una de las experiencias inevitables de la vida es la soledad, otra es la amistad, otra es la felicidad. Pero en nuestra relación con los libros están juntas las tres. La soledad nos permite dialogar con nosotros mismos; y la relación con los libros es, como diría Borges, el hallazgo de una legión de amigos que puede ser inagotable. Uno nos cuenta la historia de un hombre de vida ordinaria a quien la lectura le contagia el deseo de ser héroe y lo pone a vivir una vida fantástica; otro nos relata la cacería obsesionada y satánica de una enorme ballena blanca; otro nos cuenta la historia triste de un hombre que se convierte en escarabajo; otro nos muestra a un hombre inseguro y celoso que, manipulado por otro, termina matando sin causa a la mujer que adora. Qué alivio permitir que por momentos otros protagonicen nuestra vida. Los libros nos convierten en el escenario donde ocurren hechos ilustres, viajes asombrosos, acontecimientos fantásticos. Por un contacto que sólo podemos llamar mágico, gracias al libro vemos cosas que están guardadas más allá de sus páginas, vivimos las navegaciones, los conflictos, los crímenes.`,
    questionIds: [141, 142, 143, 144, 145, 146, 147, 148, 149],
  },
  {
    id: "lectura-kundera",
    title: "Lectura 5: La insoportable levedad del ser - Milan Kundera",
    text: `1. La idea del eterno retorno es misteriosa y con ella Nietzsche dejó perplejos a los demás filósofos: ¡pensar que alguna vez haya de repetirse todo tal como lo hemos vivido ya, y que incluso esa repetición haya de repetirse hasta el infinito! ¿Qué quiere decir ese mito demencial? 2. El mito del eterno retorno viene a decir, per negationem, que una vida que desaparece de una vez para siempre, que no retorna, es como una sombra, carece de peso, está muerta de antemano y, si ha sido horrorosa, bella, elevada, ese horror, esa elevación o esa belleza nada significan. No es necesario que los tengamos en cuenta, igual que una guerra entre dos Estados africanos en el siglo catorce que no cambió en nada la faz de la tierra, aunque en ella murieran, en medio de indecibles padecimientos, trescientos mil negros. 3. ¿Cambia en algo la guerra entre dos Estados africanos si se repite incontables veces en un eterno retorno? Cambia: se convierte en un bloque que sobresale y perdura, y su estupidez será irreparable. 4. Si la Revolución francesa tuviera que repetirse eternamente, la historiografía francesa estaría menos orgullosa de Robespierre. Pero dado que habla de algo que ya no volverá a ocurrir, los años sangrientos se convierten en meras palabras, en teorías, en discusiones, se vuelven más ligeros que una pluma, no dan miedo. Hay una diferencia infinita entre el Robespierre que apareció sólo una vez en la historia y un Robespierre que volviera eternamente a cortarle la cabeza a los franceses. 5. Digamos, por tanto, que la idea del eterno retorno significa cierta perspectiva desde la cual las cosas aparecen de un modo distinto a como las conocemos: aparecen sin la circunstancia atenuante de su fugacidad. Esta circunstancia atenuante es la que nos impide pronunciar condena alguna. ¿Cómo es posible condenar algo fugaz? El crepúsculo de la desaparición lo baña todo con la magia de la nostalgia; todo, incluida la guillotina. 6. No hace mucho me sorprendí a mí mismo con una sensación increíble: estaba hojeando un libro sobre Hitler y al ver algunas de las fotografías me emocioné: me habían recordado el tiempo de mi infancia; la viví durante la guerra; algunos de mis parientes murieron en los campos de concentración de Hitler; ¿pero qué era su muerte en comparación con el hecho de que las fotografías de Hitler me habían recordado un tiempo pasado de mi vida, un tiempo que no volverá? 7. Esta reconciliación con Hitler demuestra la profunda perversión moral que va unida a un mundo basado esencialmente en la inexistencia del retorno, porque en ese mundo todo está perdonado de antemano y, por tanto, todo cínicamente permitido.`,
    questionIds: [150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163],
  },
  {
    id: "lectura-paz",
    title: "Lectura 6: La llama doble. Amor y erotismo - Octavio Paz",
    text: `La relación entre erotismo y poesía es tal que puede decirse, sin afectación, que el primero es una poética corporal y que la segunda es una erótica verbal. Ambos están constituidos por una oposición complementaria. El lenguaje – sonido que emite sentidos, trazo material que denota ideas incorpóreas – es capaz de dar nombre a lo más fugitivo y evanescente: la sensación; a su vez, el erotismo no es mera sexualidad animal: es ceremonia, representación. El erotismo es sexualidad transfigurada: metáfora. El agente que mueve lo mismo al acto erótico que al poético es la imaginación. Es la potencia que transfigura al sexo en ceremonia y rito, al lenguaje en ritmo y metáfora. La imagen poética es abrazo de realidades opuestas y la rima es cópula de sonidos; la poesía erotiza al lenguaje y al mundo porque ella misma, en su modo de operación, es ya erotismo. Y del mismo modo: el erotismo es una metáfora de la sexualidad animal. ¿Qué dice esa metáfora? Como todas las metáforas, designa algo que está más allá de la realidad que la origina, algo nuevo y distinto de los términos que la componen. Si Góngora dice púrpura nevada, inventa o descubre una realidad que, aunque hecha de ambas, no es sangre ni nieve. Lo mismo sucede con el erotismo: dice o, más bien: es, algo diferente a la mera sexualidad.`,
    questionIds: [164, 165, 166, 167, 168, 169, 170, 171, 172, 173],
  },
  {
    id: "lectura-roca",
    title: "Lectura 7: Boca que busca la boca - Juan Manuel Roca",
    text: `El erotismo llama a la transgresión, con un acuerdo entre las partes para crear un espacio de libertad donde no hay víctimas ni victimarios sino un despojo de potestades. Es una confesión – según el término cristiano – de deseos absueltos que se acompañan de ornamentos rituales donde la boca es cáliz, el olor de los cuerpos es incienso, las palabras son claves para abrir como un sésamo el pequeño jardín que conduce al Paraíso, las palabras de amor correspondidas son plegarias escuchadas.`,
    questionIds: [174, 175, 176, 177, 178],
  },
  {
    id: "lectura-restrepo",
    title: "Lectura 8: Delirio - Laura Restrepo",
    text: `Supe que había sucedido algo irreparable en el momento en que un hombre me abrió la puerta de esa habitación de hotel y vi a mi mujer sentada en el fondo, mirando por la ventana de muy extraña manera. Fue a mi regreso de un viaje corto, sólo cuatro días por cosas de trabajo, dice Aguilar, y asegura que al partir la dejó bien. Cuando me fui no le pasaba nada raro, o al menos nada fuera de lo habitual, ciertamente nada que anunciara lo que iba a sucederle durante mi ausencia, salvo sus propias premoniciones, claro está, pero cómo iba Aguilar a creerle si Agustina, su mujer, siempre anda pronosticando calamidades. Él ha tratado por todos los medios de hacerla entrar en razón pero ella no da su brazo a torcer e insiste en que desde pequeña tiene lo que llama un don de los ojos, o visión de lo venidero, y sólo Dios sabe – dice Aguilar – lo que eso ha trastornado nuestras vidas. Esta vez, como todas, mi Agustina pronosticó que algo saldría mal, y yo, como siempre, pasé por alto su pronóstico; me fui de la ciudad un miércoles, la dejé pintando de verde las paredes del apartamento y el domingo siguiente, a mi regreso, la encontré en un hotel, al norte de la ciudad, transformada en un ser aterrado y aterrador al que apenas reconozco. No he podido saber qué le sucedió durante mi ausencia porque si se lo pregunto me insulta; hay que ver cuán feroz puede llegar a ser cuando se exalta, me trata como si yo ya no fuera yo ni ella fuera ella, intenta explicar Aguilar y si no puede es porque él mismo no lo comprende; la mujer que amo se ha perdido dentro de su propia cabeza, hace ya catorce días que la ando buscando y me va la vida en encontrarla pero la cosa es difícil, es angustiosa a morir y jodidamente difícil; es como si Agustina habitara en un plano paralelo al real, cercano pero inabordable, es como si hablara en una lengua extrajera que Aguilar vagamente reconoce pero que no logra comprender. La trastornada razón de mi mujer es un perro que me tira tarascadas pero que al mismo tiempo me envía en sus ladridos un llamado de auxilio que no atino a responder; Agustina es un perro famélico y malherido que quisiera volver a casa y no lo logra, y al minuto siguiente en un perro vagabundo que ni siquiera recuerda que alguna vez tuvo casa.`,
    questionIds: [179, 180, 181, 182, 183, 184, 185, 186, 187, 188],
  },
  {
    id: "lectura-montero",
    title: "Lectura 9: La loca de la casa - Rosa Montero",
    text: `Escribir, en fin, es estar habitado por un revoltijo de fantasías, a veces perezosas como las lentas ensoñaciones de una siesta estival, a veces agitadas y enfebrecidas como el delirio de un loco. La cabeza del novelista marcha por sí sola; está poseída por una suerte de compulsión fabuladora, y eso a veces es un don y en otras ocasiones es un castigo. Por ejemplo, a lo mejor lees un día en el periódico una noticia atroz sobre niños descuartizados delante de sus padres en Argelia, y no puedes evitar que la maldita fantasía se te dispare, recreando de manera instantánea la horripilante escena hasta en sus detalles más insoportables: los gritos, las salpicaduras, el pegajoso olor, el chasquido de los huesos al quebrarse, la mirada de los verdugos y las víctimas. O bien, en un nivel mucho más ridículo pero igualmente molesto, vas a cruzar un río de montaña por un puente improvisado de troncos y, al plantar el primer pie sobre el madero, tu cabeza te ofrece, de manera súbita, la secuencia completa de tu caída: cómo vas a resbalar con el verdín, cómo vas a bracear en el aire patosamente, cómo vas a meter un pie en la corriente helada y después, para mayor oprobio, también el otro pie e incluso las nalgas, porque te vas a caer sentada sobre el arroyo. Y, Voilà, una vez imaginada la tontería con todos sus pormenores (el choque frío del agua, el momentáneo descoloque espacial que produce toda caída, la dolorosa torcedura del pie, el escozor del raspón de la mano contra la piedra), resulta bastante difícil no cumplirla. De lo que se deriva, al menos en mi caso, una enojosa tendencia a despanzurrarme en todos los vados de riachuelos y en todas las laderas montañosas un poco ásperas.`,
    questionIds: [189, 190, 191, 192, 193, 194, 195, 196, 197, 198],
  },
]

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
  {
    id: 58,
    category: "Competencias de Comprensión",
    context:
      "La habilidad es una capacidad específica para ejecutar una tarea concreta, mientras que la competencia integra conocimientos, habilidades, actitudes y valores para resolver problemas en contextos variados. La competencia implica un desempeño complejo y adaptativo.",
    question: "¿Qué diferencia esencial existe entre habilidad y competencia?",
    options: [
      { id: "a", text: "La habilidad es más compleja que la competencia." },
      { id: "b", text: "La competencia integra conocimientos, habilidades y actitudes en contextos variados." },
      { id: "c", text: "La habilidad requiere conocimientos previos, mientras que la competencia no." },
      { id: "d", text: "No existe diferencia entre ambos términos." },
      { id: "e", text: "La competencia se limita a tareas mecánicas específicas." },
    ],
    correct: "b",
    explanation:
      "La competencia es un concepto más amplio que integra conocimientos, habilidades, actitudes y valores para resolver problemas en diversos contextos, mientras que la habilidad es una capacidad específica.",
    points: 5,
  },
  {
    id: 59,
    category: "Estructura de Preguntas",
    context:
      "Una pregunta de selección múltiple se compone de tres elementos: el enunciado (plantea la situación), las opciones de respuesta (incluyen la clave correcta y los distractores), y los distractores (opciones incorrectas pero verosímiles que evalúan comprensión).",
    question: "¿Cuál es la función principal de los distractores en una pregunta de selección múltiple?",
    options: [
      { id: "a", text: "Confundir deliberadamente al evaluado sin propósito pedagógico." },
      { id: "b", text: "Presentar opciones incorrectas pero verosímiles que evalúan la comprensión." },
      { id: "c", text: "Alargar el tiempo de respuesta sin aportar valor." },
      { id: "d", text: "Ser idénticos a la respuesta correcta para aumentar dificultad." },
      { id: "e", text: "Reducir el número de respuestas posibles." },
    ],
    correct: "b",
    explanation:
      "Los distractores son opciones incorrectas pero verosímiles que permiten evaluar si el candidato comprende realmente el contenido, diferenciando el conocimiento superficial del profundo.",
    points: 5,
  },
  {
    id: 60,
    category: "Competencias de Comprensión",
    context:
      "La competencia interpretativa identifica y comprende información explícita e implícita. La competencia argumentativa establece razones y justificaciones para sustentar posiciones. La competencia propositiva genera soluciones, alternativas y propuestas creativas ante problemas.",
    question: "¿Qué caracteriza a la competencia propositiva?",
    options: [
      { id: "a", text: "Identificar información explícita en un texto." },
      { id: "b", text: "Establecer razones para justificar una posición." },
      { id: "c", text: "Generar soluciones, alternativas y propuestas creativas." },
      { id: "d", text: "Memorizar conceptos sin aplicarlos." },
      { id: "e", text: "Resumir literalmente lo leído." },
    ],
    correct: "c",
    explanation:
      "La competencia propositiva se caracteriza por la capacidad de generar soluciones, alternativas y propuestas creativas ante problemas o situaciones planteadas.",
    points: 5,
  },
  {
    id: 61,
    category: "Niveles de Información",
    context:
      "La información local se encuentra en fragmentos específicos del texto (palabras, oraciones). La información global requiere integrar múltiples partes del texto para obtener el sentido general. La información intertextual relaciona el texto actual con otros textos o conocimientos previos.",
    question: "¿Qué implica trabajar con información global en un texto?",
    options: [
      { id: "a", text: "Identificar el significado de una palabra específica." },
      { id: "b", text: "Integrar múltiples partes del texto para obtener el sentido general." },
      { id: "c", text: "Relacionar el texto con otros previamente leídos." },
      { id: "d", text: "Localizar datos puntuales en una oración." },
      { id: "e", text: "Memorizar cada párrafo sin analizarlo." },
    ],
    correct: "b",
    explanation:
      "La información global requiere integrar y sintetizar múltiples partes del texto para comprender el sentido general o la idea principal, no solo fragmentos aislados.",
    points: 5,
  },
  {
    id: 62,
    category: "Estrategias de Respuesta",
    context:
      "Para resolver ítems de comprensión se recomienda: leer primero la pregunta para saber qué buscar, subrayar palabras clave en el enunciado, eliminar opciones claramente incorrectas, y verificar que la respuesta seleccionada responde exactamente lo preguntado.",
    question: "¿Por qué es útil leer primero la pregunta antes del texto completo?",
    options: [
      { id: "a", text: "Para evitar leer el texto completo y ahorrar tiempo." },
      { id: "b", text: "Para saber qué información buscar y hacer una lectura enfocada." },
      { id: "c", text: "Para adivinar la respuesta sin leer el contexto." },
      { id: "d", text: "Para confundir el orden lógico del ejercicio." },
      { id: "e", text: "Para reducir la concentración en detalles importantes." },
    ],
    correct: "b",
    explanation:
      "Leer primero la pregunta permite identificar qué información específica se necesita buscar en el texto, haciendo la lectura más estratégica y enfocada.",
    points: 5,
  },
  {
    id: 63,
    category: "Competencias de Comprensión",
    context:
      "En el siguiente fragmento: 'Los índices de desempleo aumentaron un 2% el último trimestre, lo cual demuestra que las políticas económicas implementadas no han sido efectivas para generar empleo.' La primera parte presenta un hecho (competencia interpretativa), mientras que la segunda establece una conclusión basada en ese hecho (competencia argumentativa).",
    question: "¿Qué competencia se evidencia al establecer que el aumento del desempleo demuestra inefectividad de las políticas?",
    options: [
      { id: "a", text: "Competencia interpretativa, al identificar datos numéricos." },
      { id: "b", text: "Competencia argumentativa, al establecer una relación causal y justificar una conclusión." },
      { id: "c", text: "Competencia propositiva, al generar una nueva política." },
      { id: "d", text: "Ninguna competencia específica, es una simple descripción." },
      { id: "e", text: "Competencia memorística, al recordar porcentajes." },
    ],
    correct: "b",
    explanation:
      "La segunda parte del enunciado establece una relación causal y justifica una conclusión basándose en el hecho presentado, lo cual caracteriza la competencia argumentativa.",
    points: 5,
  },
  {
    id: 64,
    category: "Estructura de Preguntas",
    context:
      "Los conectores lógicos (sin embargo, por lo tanto, además, en consecuencia) son esenciales para establecer relaciones entre ideas. Identificar correctamente estos conectores permite comprender la estructura argumentativa del texto y anticipar el tipo de información que seguirá.",
    question: "¿Cuál es la importancia de identificar conectores lógicos en un texto?",
    options: [
      { id: "a", text: "Son irrelevantes para la comprensión del texto." },
      { id: "b", text: "Permiten comprender la estructura argumentativa y relaciones entre ideas." },
      { id: "c", text: "Solo sirven para decorar el texto sin función específica." },
      { id: "d", text: "Dificultan la lectura y deben ignorarse." },
      { id: "e", text: "Solo se usan en textos literarios, no en pruebas." },
    ],
    correct: "b",
    explanation:
      "Los conectores lógicos establecen relaciones entre ideas (contraste, consecuencia, adición, etc.) y permiten comprender la estructura argumentativa del texto.",
    points: 5,
  },
  {
    id: 65,
    category: "Niveles de Información",
    context:
      "Un estudiante lee un artículo sobre calentamiento global y lo relaciona con un documental que vio previamente sobre el deshielo polar, estableciendo conexiones entre ambas fuentes para construir una comprensión más completa del fenómeno.",
    question: "¿Qué nivel de información está utilizando el estudiante al relacionar el artículo con el documental?",
    options: [
      { id: "a", text: "Información local, al enfocarse en datos específicos." },
      { id: "b", text: "Información global, al integrar partes del artículo." },
      { id: "c", text: "Información intertextual, al relacionar diferentes fuentes de información." },
      { id: "d", text: "Información superficial, al no analizar profundamente." },
      { id: "e", text: "Información memorística, al recordar el documental." },
    ],
    correct: "c",
    explanation:
      "La información intertextual se caracteriza por relacionar el texto actual con otros textos, fuentes o conocimientos previos para construir una comprensión más completa.",
    points: 5,
  },
  {
    id: 66,
    category: "Estrategias de Respuesta",
    context:
      "Al enfrentar opciones de respuesta similares, se recomienda identificar las palabras o frases que las diferencian, analizar si esas diferencias son sustanciales o superficiales, y contrastar cada variación con la pregunta original para determinar cuál responde con mayor precisión.",
    question: "¿Cuál es la mejor estrategia para elegir entre opciones de respuesta muy similares?",
    options: [
      { id: "a", text: "Seleccionar la primera que parezca correcta sin analizar las demás." },
      { id: "b", text: "Identificar las diferencias clave y contrastarlas con la pregunta original." },
      { id: "c", text: "Asumir que todas son correctas y elegir al azar." },
      { id: "d", text: "Ignorar las opciones y reformular la pregunta." },
      { id: "e", text: "Seleccionar la opción más larga, pues suele ser correcta." },
    ],
    correct: "b",
    explanation:
      "La estrategia más efectiva es identificar las diferencias específicas entre opciones similares y contrastarlas con exactitud con lo que pregunta el enunciado.",
    points: 5,
  },
  {
    id: 67,
    category: "Competencias de Comprensión",
    context:
      "Ante el problema de alta rotación de personal en una empresa, un analista propone: implementar un programa de mentorías, flexibilizar horarios laborales, mejorar el plan de beneficios, y crear oportunidades de desarrollo profesional. Esta propuesta integra múltiples soluciones para abordar el problema.",
    question: "¿Qué competencia demuestra el analista al proponer múltiples soluciones integradas?",
    options: [
      { id: "a", text: "Competencia interpretativa, al entender el problema." },
      { id: "b", text: "Competencia argumentativa, al justificar la rotación." },
      { id: "c", text: "Competencia propositiva, al generar soluciones creativas e integradas." },
      { id: "d", text: "Competencia descriptiva, al enumerar opciones." },
      { id: "e", text: "Competencia memorística, al recordar estrategias conocidas." },
    ],
    correct: "c",
    explanation:
      "El analista demuestra competencia propositiva al generar múltiples soluciones creativas e integradas para abordar un problema complejo, no solo identificándolo o argumentando sobre él.",
    points: 5,
  },
  {
    id: 68,
    category: "Comprensión Lectora",
    context:
      "El libro es uno de los inventos más asombrosos de la humanidad. A diferencia de otros instrumentos —como el microscopio, el telescopio, el teléfono o el arado— que son extensiones de la vista, la voz o el brazo, el libro es una extensión de la memoria y de la imaginación. Mientras que un periódico o un disco se consumen 'para el olvido', un libro se lee 'para la memoria'. Los antiguos desconfiaban de la palabra escrita, pues la consideraban muerta; por eso Pitágoras se negó a escribir y Platón recurrió al diálogo. Las bibliotecas son 'gabinetes mágicos' donde reposan los mejores espíritus de la humanidad que esperan ser despertados. Un libro cerrado es apenas un objeto, pero al leerlo conectamos con el tiempo transcurrido entre su escritura y nuestra lectura.",
    question: "Tras comparar el culto a la oralidad de los antiguos con el culto a los libros actual, ¿cuál afirmación es correcta?",
    options: [
      { id: "a", text: "Son dos formas de pensamiento determinadas por necesidades culturales diferentes." },
      { id: "b", text: "Los antiguos tenían razón, pues gracias a la escritura hoy conocemos su cultura." },
      { id: "c", text: "Son formas de pensamiento similares, pues privilegian ante todo el sentido de sus enseñanzas." },
      { id: "d", text: "Los antiguos tenían razón, pues hoy se ha perdido la capacidad de escuchar y memorizar." },
    ],
    correct: "a",
    explanation:
      "El texto establece que el culto a la oralidad de los antiguos y el culto al libro moderno son dos formas de pensamiento determinadas por necesidades culturales diferentes de cada época.",
    points: 5,
  },
  {
    id: 69,
    category: "Comprensión Lectora",
    context:
      "El libro es uno de los inventos más asombrosos de la humanidad. A diferencia de otros instrumentos —como el microscopio, el telescopio, el teléfono o el arado— que son extensiones de la vista, la voz o el brazo, el libro es una extensión de la memoria y de la imaginación. Mientras que un periódico o un disco se consumen 'para el olvido', un libro se lee 'para la memoria'. Los antiguos desconfiaban de la palabra escrita, pues la consideraban muerta; por eso Pitágoras se negó a escribir y Platón recurrió al diálogo.",
    question: "En el texto se afirma que un periódico 'se lee para el olvido'. ¿A qué alude esa expresión?",
    options: [
      { id: "a", text: "A la naturaleza efímera y cotidiana de dicha publicación." },
      { id: "b", text: "A la naturaleza caótica y dispersa de dicha publicación." },
      { id: "c", text: "A la excesiva influencia de los medios impresos de comunicación." },
      { id: "d", text: "A la abundante información escrita en nuestros días." },
    ],
    correct: "a",
    explanation:
      "La expresión 'se lee para el olvido' alude a la naturaleza efímera y cotidiana del periódico, que contrasta con el libro que se lee 'para la memoria'.",
    points: 5,
  },
  {
    id: 70,
    category: "Comprensión Lectora",
    context:
      "Los antiguos desconfiaban de la palabra escrita, pues la consideraban muerta; por eso Pitágoras se negó a escribir y Platón recurrió al diálogo. El texto contrapone la oralidad antigua —que confiaba en la memoria viva de discípulos y maestros— con el culto al libro de la modernidad. Las bibliotecas se presentan como 'gabinetes mágicos' donde reposan los mejores espíritus de la humanidad que esperan ser despertados.",
    question: "De la relación planteada entre oralidad y escritura se deduce que:",
    options: [
      { id: "a", text: "El pasado se conoce gracias a la escritura y el futuro gracias a la oralidad." },
      { id: "b", text: "La memoria está determinada por la oralidad y el olvido por la escritura." },
      { id: "c", text: "La vida tenía que ver con la escritura y la muerte con la oralidad." },
      { id: "d", text: "Lo antiguo estuvo determinado por la oralidad y lo moderno por la escritura." },
    ],
    correct: "d",
    explanation:
      "El texto establece claramente que lo antiguo se caracterizó por el culto a la oralidad (Pitágoras, Platón) y lo moderno por el culto a la escritura y los libros.",
    points: 5,
  },
  {
    id: 71,
    category: "Comprensión Lectora",
    context:
      "El libro es uno de los inventos más asombrosos de la humanidad. A diferencia de otros instrumentos —como el microscopio, el telescopio, el teléfono o el arado— que son extensiones de la vista, la voz o el brazo, el libro es una extensión de la memoria y de la imaginación. Un libro cerrado es apenas un objeto, pero al leerlo conectamos con el tiempo transcurrido entre su escritura y nuestra lectura. La lectura mantiene viva la búsqueda de felicidad y sabiduría.",
    question: "Al señalar que el libro es una extensión de la memoria y la imaginación, ¿qué implica ello?",
    options: [
      { id: "a", text: "Que los libros se encuentran más allá del pasado de la humanidad." },
      { id: "b", text: "Que amplían la historia y las fantasías de la humanidad." },
      { id: "c", text: "Que están a favor de la tecnología, pero en contra de la tradición." },
      { id: "d", text: "Que promueven y estimulan los distintos avances." },
    ],
    correct: "b",
    explanation:
      "Al ser una extensión de la memoria (historia) y la imaginación (fantasías), el libro amplía ambas dimensiones de la experiencia humana.",
    points: 5,
  },
  {
    id: 72,
    category: "Comprensión Lectora",
    context:
      "La retórica amorosa del siglo XII describe un esquema en el que el amor está siempre acompañado por un obstáculo. El deseo se dirige hacia un objeto que nunca se poseerá plenamente en el 'goce'. Según la retórica cortés, el obstáculo amoroso está significado por la condena virtual contra el matrimonio, porque implica un derecho de posesión. La inmanencia del obstáculo se manifiesta en la exigencia del secreto: revelar el amor lo destruiría. La retórica del siglo XII reposa sobre una doble afirmación: el deseo se identifica con su expresión, y quien canta merece el amor.",
    question: "En el pasaje sobre el amor cortés, ¿por qué se cuestiona la idea del matrimonio como limitante del amor?",
    options: [
      { id: "a", text: "Responde al interés de la sociedad medieval por comprender el deseo." },
      { id: "b", text: "Contradice la necesidad de los amantes de mantener su secreto." },
      { id: "c", text: "Corresponde a la forma de pensar de la sociedad del siglo XII." },
      { id: "d", text: "Es un obstáculo para la creación de metáforas en el siglo XII." },
    ],
    correct: "c",
    explanation:
      "El texto indica que la concepción del matrimonio como obstáculo corresponde a la retórica y forma de pensar características de la sociedad del siglo XII.",
    points: 5,
  },
  {
    id: 73,
    category: "Comprensión Lectora",
    context:
      "Según la retórica cortés del siglo XII, el obstáculo amoroso está significado por la condena virtual contra el matrimonio, porque implica un derecho de posesión. El deseo se dirige hacia un objeto que nunca se poseerá plenamente. La inmanencia del obstáculo se manifiesta en la exigencia del secreto: revelar el amor lo destruiría.",
    question: "El texto señala que el matrimonio implica un 'derecho de posesión'. ¿Por qué?",
    options: [
      { id: "a", text: "Porque cuando se revela el secreto amoroso el amor muere." },
      { id: "b", text: "Porque en la voz hablada del deseo interfiere el obstáculo." },
      { id: "c", text: "Porque así lo concibe el simbolismo cortés primitivo." },
      { id: "d", text: "Porque este sentimiento mata la manifestación del amor." },
    ],
    correct: "c",
    explanation:
      "El texto explica que la concepción del matrimonio como derecho de posesión proviene del simbolismo cortés primitivo, que veía en ello un obstáculo para el amor ideal.",
    points: 5,
  },
  {
    id: 74,
    category: "Comprensión Lectora",
    context:
      "La retórica del siglo XII reposa sobre una doble afirmación: el deseo se identifica con su expresión, y quien canta merece el amor. Se observa así una profunda confianza en la eficacia de la palabra: amar es cantar y expresar el sentimiento. El deseo que poseo y me posee refleja la experiencia personal de quien experimenta esta posesión mutua.",
    question: "La frase 'el deseo que poseo y me posee' se clasifica como:",
    options: [
      { id: "a", text: "Afirmación general referida a la experiencia personal de quien experimenta la posesión." },
      { id: "b", text: "Afirmación particular referida a una situación general propia de la retórica del siglo XII." },
      { id: "c", text: "Afirmación colectiva porque la experiencia de posesión hace parte de la sociedad medieval." },
      { id: "d", text: "Afirmación personal porque existe un 'yo' que experimenta un sentimiento de posesión." },
    ],
    correct: "d",
    explanation:
      "La frase es una afirmación personal porque implica la existencia de un 'yo' (quien posee) que experimenta personalmente el sentimiento de posesión mutua con el deseo.",
    points: 5,
  },
  {
    id: 75,
    category: "Comprensión Lectora",
    context:
      "La retórica amorosa del siglo XII describe un esquema imaginativo y lingüístico en el que el amor está siempre acompañado por un obstáculo. La retórica cortés presenta una doble afirmación: el deseo se identifica con su expresión, y quien canta merece el amor. Se observa una profunda confianza en la eficacia de la palabra. Este discurso se inscribe en la estética, la historia y la cultura medievales.",
    question: "¿A qué ámbitos se refieren las informaciones y discursos del texto sobre la retórica del siglo XII?",
    options: [
      { id: "a", text: "A la estética, la historia y la cultura medievales." },
      { id: "b", text: "A la cultura, ya que describen la sociedad medieval." },
      { id: "c", text: "A la historia, porque permiten una ubicación temporal." },
      { id: "d", text: "A la moral, la crítica y la religión medievales." },
    ],
    correct: "a",
    explanation:
      "El texto aborda información relacionada con la estética (retórica y expresión artística), la historia (siglo XII) y la cultura (prácticas sociales) medievales.",
    points: 5,
  },
  {
    id: 76,
    category: "Comprensión Lectora",
    context:
      "La retórica amorosa del siglo XII describe un esquema en el que el amor está siempre acompañado por un obstáculo. El deseo se dirige hacia un objeto que nunca se poseerá plenamente en el 'goce'. Según la retórica cortés, el obstáculo amoroso está significado por la condena virtual contra el matrimonio, porque implica un derecho de posesión. La inmanencia del obstáculo se manifiesta en la exigencia del secreto.",
    question: "¿Cuál es el tema central del texto sobre la retórica medieval?",
    options: [
      { id: "a", text: "El obstáculo inminente a todo amor." },
      { id: "b", text: "El matrimonio que implica un derecho de posesión." },
      { id: "c", text: "El deseo de posesión y su imposibilidad." },
      { id: "d", text: "La fe casi mágica en la eficacia de la palabra." },
    ],
    correct: "a",
    explanation:
      "El tema central del texto es el obstáculo inminente a todo amor en la retórica cortés del siglo XII, del cual el matrimonio y la imposibilidad de posesión son manifestaciones específicas.",
    points: 5,
  },
  {
    id: 77,
    category: "Comprensión Lectora",
    context:
      "Gene Roddenberry, creador de la serie Star Trek, fue piloto de bombardero B-17 durante la Segunda Guerra Mundial y guionista de series del Oeste. Sus ideas en la serie posibilitaron los viajes espaciales a velocidades lumínicas, la teletransportación, los teléfonos celulares y la primera generación de máquinas inteligentes. Sin embargo, su nombre es poco recordado en la comunidad científica, que lo considera 'un discreto y redondo cero a la izquierda'. La serie se estrenó en 1966 y se convirtió en un éxito global y una 'mina de oro' para Paramount Pictures.",
    question: "¿Cuál es la intención del autor del artículo sobre Star Trek?",
    options: [
      { id: "a", text: "Señalar los percances que tuvo la serie Viaje a las estrellas para ser transmitida." },
      { id: "b", text: "Demostrar que con poco dinero no se puede hacer un buen trabajo." },
      { id: "c", text: "Dar información sobre el éxito monetario de la serie Star Trek." },
      { id: "d", text: "Criticar el trabajo hecho por Gene Roddenberry en cine y televisión." },
    ],
    correct: "c",
    explanation:
      "La intención del autor es informar sobre el éxito monetario y cultural de la serie Star Trek, destacando cómo se convirtió en una 'mina de oro' a pesar de las limitaciones presupuestales.",
    points: 5,
  },
  {
    id: 78,
    category: "Comprensión Lectora",
    context:
      "El artículo sobre Gene Roddenberry y Star Trek reseña cómo la serie se estrenó en 1966 con el episodio The Man Trap y celebró treinta años en 1996. Fue producida con restricciones presupuestales: la nave U.S.S. Enterprise nunca aterrizaba porque no había dinero para construir escenarios de descenso. A pesar de utilizar escenarios de cartón, miniaturas y uniformes sencillos, la serie se convirtió en un éxito global.",
    question: "¿Con qué tipo de texto se presenta la información sobre Viaje a las estrellas?",
    options: [
      { id: "a", text: "Periodístico, porque reseña la creación y éxito de la serie." },
      { id: "b", text: "Descriptivo, porque detalla hechos irreales sucedidos en la nave Enterprise." },
      { id: "c", text: "Científico, porque muestra los avances de la ciencia para crear naves espaciales." },
      { id: "d", text: "Informativo, porque muestra la historia del creador de la serie." },
    ],
    correct: "a",
    explanation:
      "El texto es de tipo periodístico porque reseña la creación, desarrollo y éxito de la serie Star Trek, presentando información de manera objetiva sobre un fenómeno cultural.",
    points: 5,
  },
  {
    id: 79,
    category: "Comprensión Lectora",
    context:
      "Gene Roddenberry, creador de Star Trek, posibilitó con sus ideas los viajes espaciales a velocidades lumínicas, la teletransportación, los teléfonos celulares y la primera generación de máquinas inteligentes. Pese a ello, su nombre es poco recordado en la comunidad científica, que lo considera 'un discreto y redondo cero a la izquierda'. Sin embargo, sus innovaciones generaron enormes ganancias económicas y culto entre los aficionados a la ciencia ficción.",
    question: "La expresión 'un discreto y redondo cero a la izquierda' refiere a:",
    options: [
      { id: "a", text: "Nunca fue científico y, por lo tanto, no aportó al desarrollo de la ciencia." },
      { id: "b", text: "Hizo muchos descubrimientos en el espacio que no fueron aceptados por la comunidad científica." },
      { id: "c", text: "Posibilitó la creación de un mundo fantástico e irreal que le aportó mucho al mundo científico." },
      { id: "d", text: "Consiguió su prestigio con base en falsos descubrimientos que nunca fueron aceptados por los científicos." },
    ],
    correct: "a",
    explanation:
      "La expresión 'un discreto y redondo cero a la izquierda' indica que Roddenberry no fue científico y por tanto la comunidad científica no lo considera un aporte al desarrollo de la ciencia, a pesar de su impacto cultural.",
    points: 5,
  },
  {
    id: 80,
    category: "Comprensión Lectora",
    context:
      "La serie Star Trek se estrenó en 1966 con el episodio The Man Trap y celebró treinta años en 1996. Durante ese tiempo, los viajes de la nave Enterprise captaron la imaginación de millones de espectadores y la serie se convirtió en un fenómeno cultural global. El título 'El futuro cumple 30 años' hace referencia a este aniversario.",
    question: "El título 'El futuro cumple 30 años' se refiere a:",
    options: [
      { id: "a", text: "Los viajes que ha realizado la nave Enterprise a otros planetas durante treinta años." },
      { id: "b", text: "El recorrido que ha realizado la nave por el espacio." },
      { id: "c", text: "Los adelantos espaciales que se han hecho en los últimos treinta años." },
      { id: "d", text: "La cantidad de años que lleva la serie Viaje a las Estrellas, con su nave Enterprise, al aire." },
    ],
    correct: "d",
    explanation:
      "El título se refiere a los treinta años (de 1966 a 1996) que lleva la serie Star Trek al aire, representando una visión futurista que cumple tres décadas desde su estreno.",
    points: 5,
  },
  {
    id: 81,
    category: "Comprensión Lectora",
    context:
      "Star Trek fue producida con restricciones presupuestales significativas. La nave U.S.S. Enterprise nunca aterrizaba porque no había dinero para construir escenarios de descenso. Los guionistas asumieron que la mayoría de los planetas visitados tenían atmósferas respirables para ahorrar en trajes espaciales. A pesar de utilizar escenarios de cartón, miniaturas y uniformes sencillos, la serie se convirtió en un éxito global. La frase 'hecha con las uñas' describe estas condiciones de producción.",
    question: "La frase 'hecha con las uñas' indica que la producción de la serie se realizó:",
    options: [
      { id: "a", text: "Manualmente, porque la tecnología no estaba desarrollada lo suficiente." },
      { id: "b", text: "Con insuficiente publicidad, porque no se sabía cómo promocionarla." },
      { id: "c", text: "Con pocos materiales, porque era la primera en su género que se hacía." },
      { id: "d", text: "Con escaso dinero, porque no se esperaba que tuviera tanto éxito." },
    ],
    correct: "d",
    explanation:
      "La expresión 'hecha con las uñas' indica que la serie se produjo con escaso dinero y recursos limitados, sin esperar el enorme éxito que finalmente alcanzó.",
    points: 5,
  },
  {
    id: 82,
    category: "Comprensión Lectora",
    context:
      "Gene Roddenberry creó Star Trek partiendo de sus imaginaciones sobre los viajes espaciales. Sus ideas sobre velocidades lumínicas, teletransportación, comunicadores (que inspiraron los teléfonos celulares) y computadoras inteligentes se convirtieron en la base de una serie futurista que capturó la imaginación de millones. Aunque no era científico, sus visiones imaginativas terminaron influyendo en el desarrollo tecnológico posterior.",
    question: "¿Qué pretendía Gene Roddenberry con su creación de la nave Enterprise?",
    options: [
      { id: "a", text: "Obtener reconocimiento y dinero a base de la ingenuidad de los televidentes." },
      { id: "b", text: "Indicar que podría haber vida en otros planetas y ayudar a descubrirla." },
      { id: "c", text: "Plasmar sus imaginaciones sobre los viajes espaciales, que terminaron siendo la base de una serie futurista." },
      { id: "d", text: "Explorar el espacio con una nueva tecnología y aportar este conocimiento al mundo científico." },
    ],
    correct: "c",
    explanation:
      "Roddenberry pretendía plasmar sus imaginaciones sobre los viajes espaciales, y estas visiones creativas se convirtieron en la base de la serie futurista Star Trek.",
    points: 5,
  },
  // La lámpara maravillosa - William Ospina (IDs 83-91)
  {
    id: 83,
    category: "Comprensión Lectora",
    question: "¿Cuál es la tipología textual del fragmento de La lámpara maravillosa?",
    options: [
      { id: "a", text: "Narrativo" },
      { id: "b", text: "Expositivo" },
      { id: "c", text: "Argumentativo" },
      { id: "d", text: "Descriptivo" },
    ],
    correct: "c",
    explanation:
      "El texto es argumentativo porque el autor presenta una tesis sobre la importancia de la experiencia y la imaginación, y la desarrolla con argumentos y ejemplos para convencer al lector.",
    points: 5,
  },
  {
    id: 84,
    category: "Comprensión Lectora",
    question: "¿Cuál es el propósito del autor en este fragmento?",
    options: [
      { id: "a", text: "Narrar su propia experiencia con los libros" },
      { id: "b", text: "Describir diferentes tipos de libros" },
      { id: "c", text: "Establecer la relación entre experiencia, imaginación y la lectura" },
      { id: "d", text: "Criticar a quienes no leen" },
    ],
    correct: "c",
    explanation:
      "El propósito central del autor es establecer y explicar cómo se relacionan la experiencia, la imaginación y la lectura como recursos fundamentales para navegar la vida.",
    points: 5,
  },
  {
    id: 85,
    category: "Comprensión Lectora",
    question: "¿Cuál es la idea central del segundo párrafo?",
    options: [
      { id: "a", text: "Los libros son un paraíso que permite vivir experiencias ajenas" },
      { id: "b", text: "La imaginación ahonda lo que la experiencia enseña" },
      { id: "c", text: "Los libros contienen historias fantásticas" },
      { id: "d", text: "Borges era un gran escritor" },
    ],
    correct: "a",
    explanation:
      "El segundo párrafo desarrolla la idea de que los libros constituyen un paraíso donde podemos 'escarmentar por cabeza ajena' y vivir lo no vivido, experimentando memorias, aventuras y pensamientos de otros.",
    points: 5,
  },
  {
    id: 86,
    category: "Comprensión Lectora",
    question: "Según la ubicación de la idea central en el segundo párrafo, este es un párrafo:",
    options: [
      { id: "a", text: "Deductivo" },
      { id: "b", text: "Inductivo" },
      { id: "c", text: "Inductivo-deductivo" },
      { id: "d", text: "Paralelo" },
    ],
    correct: "c",
    explanation:
      "El párrafo es inductivo-deductivo porque presenta la idea central al inicio ('Por fortuna existe el paraíso de los libros'), la desarrolla con ejemplos y argumentos en el medio, y la refuerza al final con ejemplos literarios concretos.",
    points: 5,
  },
  {
    id: 87,
    category: "Comprensión Lectora",
    question: "¿Cuál es la idea central del tercer párrafo (que empieza con 'Una de las experiencias inevitables...')?",
    options: [
      { id: "a", text: "La soledad es inevitable en la vida" },
      { id: "b", text: "Borges era un gran autor" },
      { id: "c", text: "En la relación con los libros se encuentran juntas la soledad, la amistad y la felicidad" },
      { id: "d", text: "Los libros narran historias de escarabajos" },
    ],
    correct: "c",
    explanation:
      "La idea central plantea que la relación con los libros es única porque en ella convergen simultáneamente tres experiencias fundamentales de la vida: la soledad, la amistad y la felicidad.",
    points: 5,
  },
  {
    id: 88,
    category: "Comprensión Lectora",
    question: "Los deícticos 'uno' y 'otro' (en 'Uno nos cuenta...', 'otro nos relata...') se refieren a:",
    options: [
      { id: "a", text: "Los autores de libros" },
      { id: "b", text: "Los amigos que se encuentran en los libros" },
      { id: "c", text: "Los personajes literarios" },
      { id: "d", text: "Los lectores diferentes" },
    ],
    correct: "b",
    explanation:
      "Los deícticos 'uno' y 'otro' se refieren a 'los amigos' mencionados anteriormente en la frase 'el hallazgo de una legión de amigos que puede ser inagotable', es decir, los libros como amigos.",
    points: 5,
  },
  {
    id: 89,
    category: "Comprensión Lectora",
    question: "Un sinónimo de 'escarmentar' en el contexto del texto sería:",
    options: [
      { id: "a", text: "Sufrir" },
      { id: "b", text: "Aprender" },
      { id: "c", text: "Castigar" },
      { id: "d", text: "Olvidar" },
    ],
    correct: "b",
    explanation:
      "En el contexto 'escarmentar por cabeza ajena', el término significa aprender de las experiencias de otros sin tener que vivirlas personalmente.",
    points: 5,
  },
  {
    id: 90,
    category: "Comprensión Lectora",
    question: "La relación semántica entre 'bendición' y 'tormento' es de:",
    options: [
      { id: "a", text: "Sinonimia" },
      { id: "b", text: "Causa-efecto" },
      { id: "c", text: "Oposición" },
      { id: "d", text: "Parte-todo" },
    ],
    correct: "c",
    explanation:
      "Los términos 'bendición' y 'tormento' son antónimos que expresan una relación de oposición, representando los aspectos positivos y negativos de la vida.",
    points: 5,
  },
  {
    id: 91,
    category: "Comprensión Lectora",
    question: "La alusión a 'lo alto del día' y 'lo alto de la noche' se refiere a:",
    options: [
      { id: "a", text: "Las montañas y el cielo" },
      { id: "b", text: "El sol y la luna" },
      { id: "c", text: "El mediodía y la medianoche" },
      { id: "d", text: "Los árboles y las estrellas" },
    ],
    correct: "b",
    explanation:
      "'Lo alto del día' alude al sol (que no se debe mirar directamente) y 'lo alto de la noche' a la luna o las estrellas (que siempre queremos mirar otra vez).",
    points: 5,
  },
  // La insoportable levedad del ser - Milan Kundera (IDs 92-105)
  {
    id: 92,
    category: "Comprensión Lectora",
    question: "El fragmento de Kundera es un texto predominantemente:",
    options: [
      { id: "a", text: "Narrativo" },
      { id: "b", text: "Expositivo" },
      { id: "c", text: "Descriptivo" },
      { id: "d", text: "Instructivo" },
    ],
    correct: "b",
    explanation:
      "El texto es expositivo porque explica y desarrolla el concepto filosófico del eterno retorno de Nietzsche, presentando información de manera objetiva y estructurada.",
    points: 5,
  },
  {
    id: 93,
    category: "Comprensión Lectora",
    question: "¿Cuál es la estructura del texto expositivo de Kundera?",
    options: [
      { id: "a", text: "Planteamiento, nudo, desenlace" },
      { id: "b", text: "Tesis, argumentos, conclusión" },
      { id: "c", text: "Introducción, desarrollo, conclusiones" },
      { id: "d", text: "Causa, efecto, consecuencias" },
    ],
    correct: "c",
    explanation:
      "El texto sigue la estructura clásica de un texto expositivo: introduce el concepto del eterno retorno (párrafos 1-2), lo desarrolla con ejemplos (párrafos 3-5), y concluye con reflexiones personales (párrafos 6-7).",
    points: 5,
  },
  {
    id: 94,
    category: "Comprensión Lectora",
    question: "¿Qué significa la expresión latina 'per negationem'?",
    options: [
      { id: "a", text: "Por afirmación" },
      { id: "b", text: "Por negación" },
      { id: "c", text: "Por repetición" },
      { id: "d", text: "Por contradicción" },
    ],
    correct: "b",
    explanation:
      "'Per negationem' es una expresión latina que significa 'por negación', indicando que el concepto se define a través de su opuesto.",
    points: 5,
  },
  {
    id: 95,
    category: "Comprensión Lectora",
    question: "¿Cómo se podría sintetizar la definición del eterno retorno según el texto?",
    options: [
      { id: "a", text: "Todo se repite exactamente igual infinitamente" },
      { id: "b", text: "La historia nunca se repite" },
      { id: "c", text: "Solo los eventos importantes se repiten" },
      { id: "d", text: "El tiempo es circular" },
    ],
    correct: "a",
    explanation:
      "El eterno retorno de Nietzsche plantea que alguna vez todo habrá de repetirse tal como lo hemos vivido ya, y que incluso esa repetición habrá de repetirse hasta el infinito.",
    points: 5,
  },
  {
    id: 96,
    category: "Comprensión Lectora",
    question: "¿Qué función cumple el tercer párrafo en el texto?",
    options: [
      { id: "a", text: "Presenta la conclusión del texto" },
      { id: "b", text: "Introduce el tema principal" },
      { id: "c", text: "Es un párrafo de interrogación que sirve de transición" },
      { id: "d", text: "Resume todo lo anterior" },
    ],
    correct: "c",
    explanation:
      "El tercer párrafo es un párrafo de transición que mediante una pregunta retórica conecta la definición del concepto con sus implicaciones prácticas y ejemplos concretos.",
    points: 5,
  },
  {
    id: 97,
    category: "Comprensión Lectora",
    question: "El referente de 'se vuelven más ligeros que una pluma' es:",
    options: [
      { id: "a", text: "Los historiadores franceses (metonimia)" },
      { id: "b", text: "Los años sangrientos de la Revolución francesa (símil)" },
      { id: "c", text: "Robespierre y sus acciones (metáfora)" },
      { id: "d", text: "Las teorías sobre la historia (hipérbole)" },
    ],
    correct: "b",
    explanation:
      "El referente es 'los años sangrientos' de la Revolución francesa, y la comparación 'más ligeros que una pluma' es un símil que expresa cómo la falta de repetición disminuye el peso moral de los eventos.",
    points: 5,
  },
  {
    id: 98,
    category: "Comprensión Lectora",
    question: "Un sinónimo de 'perplejos' es, EXCEPTO:",
    options: [
      { id: "a", text: "Confundidos" },
      { id: "b", text: "Desconcertados" },
      { id: "c", text: "Resueltos" },
      { id: "d", text: "Sorprendidos" },
    ],
    correct: "c",
    explanation:
      "'Resueltos' NO es sinónimo de 'perplejos'. Por el contrario, es un antónimo, ya que 'perplejos' significa confundidos o desconcertados, mientras que 'resueltos' implica determinación y claridad.",
    points: 5,
  },
  {
    id: 99,
    category: "Comprensión Lectora",
    question: "¿Qué refrán o frase se relaciona con la idea del no-retorno mencionada en el texto?",
    options: [
      { id: "a", text: "El que no conoce la historia está condenado a repetirla" },
      { id: "b", text: "Todo tiempo pasado fue mejor" },
      { id: "c", text: "Más vale tarde que nunca" },
      { id: "d", text: "A quien madruga, Dios lo ayuda" },
    ],
    correct: "a",
    explanation:
      "El refrán 'El que no conoce la historia está condenado a repetirla' se relaciona irónicamente con la idea del texto: Kundera sugiere que la historia NO se repite, y esa ausencia de retorno es lo que hace que los eventos pierdan peso moral.",
    points: 5,
  },
  {
    id: 100,
    category: "Comprensión Lectora",
    question: "¿Qué se puede inferir de la frase 'El crepúsculo de la desaparición lo baña todo con la magia de la nostalgia'?",
    options: [
      { id: "a", text: "La nostalgia solo existe al atardecer" },
      { id: "b", text: "El paso del tiempo y la certeza de que todo desaparecerá genera nostalgia que suaviza nuestra percepción de los eventos" },
      { id: "c", text: "Los crepúsculos son momentos mágicos" },
      { id: "d", text: "La desaparición es siempre dolorosa" },
    ],
    correct: "b",
    explanation:
      "La frase metafórica sugiere que el carácter transitorio e irrepetible de los eventos (su desaparición inevitable) los envuelve en nostalgia, lo cual suaviza y embellece nuestra percepción de ellos, incluso de eventos terribles.",
    points: 5,
  },
  {
    id: 101,
    category: "Comprensión Lectora",
    question: "¿En qué párrafos se expresa más claramente la idea de que vivimos en un mundo de no-retorno?",
    options: [
      { id: "a", text: "Párrafos 1 y 3" },
      { id: "b", text: "Párrafos 2 y 7" },
      { id: "c", text: "Párrafos 4 y 5" },
      { id: "d", text: "Párrafos 1 y 6" },
    ],
    correct: "b",
    explanation:
      "Los párrafos 2 y 7 expresan claramente la idea del no-retorno: el párrafo 2 explica que nuestra vida 'desaparece de una vez para siempre', y el párrafo 7 concluye con 'un mundo basado esencialmente en la inexistencia del retorno'.",
    points: 5,
  },
  {
    id: 102,
    category: "Comprensión Lectora",
    question: "Un sinónimo de 'demencial' es, EXCEPTO:",
    options: [
      { id: "a", text: "Descabellado" },
      { id: "b", text: "Absurdo" },
      { id: "c", text: "Razonable" },
      { id: "d", text: "Irracional" },
    ],
    correct: "c",
    explanation:
      "'Razonable' NO es sinónimo de 'demencial', sino su antónimo. 'Demencial' significa que carece de razón o lógica, mientras que 'razonable' implica sensatez y lógica.",
    points: 5,
  },
  {
    id: 103,
    category: "Comprensión Lectora",
    question: "Según el texto, si Robespierre y sus acciones se repitieran eternamente:",
    options: [
      { id: "a", text: "La historiografía francesa estaría más orgullosa" },
      { id: "b", text: "La historiografía francesa estaría menos orgullosa" },
      { id: "c", text: "No cambiaría nada en la percepción histórica" },
      { id: "d", text: "Robespierre sería olvidado" },
    ],
    correct: "b",
    explanation:
      "El texto afirma que 'Si la Revolución francesa tuviera que repetirse eternamente, la historiografía francesa estaría menos orgullosa de Robespierre', porque el horror de sus acciones tendría más peso si se repitiera infinitamente.",
    points: 5,
  },
  {
    id: 104,
    category: "Comprensión Lectora",
    question: "¿Qué personas gramaticales utiliza el autor en el texto?",
    options: [
      { id: "a", text: "Primera persona en todo el texto" },
      { id: "b", text: "Tercera persona en todo el texto" },
      { id: "c", text: "Tercera persona en párrafos 1-5, primera persona en párrafos 6-7" },
      { id: "d", text: "Segunda persona en todo el texto" },
    ],
    correct: "c",
    explanation:
      "En los párrafos 1-5, el autor usa la tercera persona para exponer objetivamente el concepto. En los párrafos 6-7, cambia a primera persona ('No hace mucho me sorprendí a mí mismo') para compartir una experiencia personal que ilustra el concepto.",
    points: 5,
  },
  {
    id: 105,
    category: "Comprensión Lectora",
    question: "La expresión 'perversión moral' en el último párrafo es un juicio:",
    options: [
      { id: "a", text: "Objetivo y neutral" },
      { id: "b", text: "Subjetivo y valorativo" },
      { id: "c", text: "Científico" },
      { id: "d", text: "Histórico" },
    ],
    correct: "b",
    explanation:
      "'Perversión moral' es un juicio subjetivo y valorativo del autor sobre las implicaciones éticas de vivir en un mundo sin retorno, donde todo está perdonado de antemano.",
    points: 5,
  },
  // La llama doble - Octavio Paz (IDs 106-115)
  {
    id: 106,
    category: "Comprensión Lectora",
    question: "¿Cuál es la idea central del párrafo de Octavio Paz?",
    options: [
      { id: "a", text: "La poesía es superior al erotismo" },
      { id: "b", text: "La relación entre erotismo y poesía es de oposición complementaria, ambos transfiguran su materia mediante la imaginación" },
      { id: "c", text: "La sexualidad animal es diferente del erotismo" },
      { id: "d", text: "Góngora era un gran poeta" },
    ],
    correct: "b",
    explanation:
      "La idea central es que erotismo y poesía están íntimamente relacionados: el erotismo es poética corporal, la poesía es erótica verbal, y ambos transfiguran su materia (sexo y lenguaje) mediante la imaginación.",
    points: 5,
  },
  {
    id: 107,
    category: "Comprensión Lectora",
    question: "El texto de Octavio Paz es principalmente:",
    options: [
      { id: "a", text: "Narrativo" },
      { id: "b", text: "Descriptivo" },
      { id: "c", text: "Argumentativo" },
      { id: "d", text: "Instructivo" },
    ],
    correct: "c",
    explanation:
      "El texto es argumentativo porque presenta una tesis sobre la relación entre erotismo y poesía, y la defiende mediante argumentos, ejemplos y razonamientos lógicos.",
    points: 5,
  },
  {
    id: 108,
    category: "Comprensión Lectora",
    question: "¿Cuál es la intencionalidad del autor?",
    options: [
      { id: "a", text: "Narrar una historia de amor" },
      { id: "b", text: "Describir actos eróticos" },
      { id: "c", text: "Establecer la relación entre erotismo y poesía" },
      { id: "d", text: "Definir qué es la sexualidad animal" },
    ],
    correct: "c",
    explanation:
      "La intencionalidad principal es establecer y explicar la profunda relación conceptual entre erotismo y poesía, mostrando cómo ambos operan de manera similar mediante la transfiguración imaginativa.",
    points: 5,
  },
  {
    id: 109,
    category: "Comprensión Lectora",
    question: "Las palabras 'fugitivo y evanescente' son:",
    options: [
      { id: "a", text: "Sustantivos" },
      { id: "b", text: "Verbos" },
      { id: "c", text: "Adjetivos" },
      { id: "d", text: "Adverbios" },
    ],
    correct: "c",
    explanation:
      "'Fugitivo' y 'evanescente' son adjetivos que califican a 'la sensación', describiendo su carácter pasajero y efímero.",
    points: 5,
  },
  {
    id: 110,
    category: "Comprensión Lectora",
    question: "Según el texto, la poesía es todo lo siguiente, EXCEPTO:",
    options: [
      { id: "a", text: "Una erótica verbal" },
      { id: "b", text: "Erotización del lenguaje y el mundo" },
      { id: "c", text: "Una poética corporal" },
      { id: "d", text: "Abrazo de realidades opuestas" },
    ],
    correct: "c",
    explanation:
      "'Poética corporal' NO es la poesía, sino el erotismo. El texto establece que 'el erotismo es una poética corporal y la poesía es una erótica verbal'.",
    points: 5,
  },
  {
    id: 111,
    category: "Comprensión Lectora",
    question: "Según el texto, el erotismo es todo lo siguiente, EXCEPTO:",
    options: [
      { id: "a", text: "Poética corporal" },
      { id: "b", text: "Sexualidad transfigurada" },
      { id: "c", text: "Erótica verbal" },
      { id: "d", text: "Ceremonia y representación" },
    ],
    correct: "c",
    explanation:
      "'Erótica verbal' NO es el erotismo, sino la poesía. El texto establece claramente que 'la poesía es una erótica verbal', mientras que el erotismo es 'poética corporal'.",
    points: 5,
  },
  {
    id: 112,
    category: "Comprensión Lectora",
    question: "¿Qué se puede inferir de la afirmación 'El erotismo es sexualidad transfigurada: metáfora'?",
    options: [
      { id: "a", text: "El erotismo es igual que la sexualidad animal" },
      { id: "b", text: "El erotismo tiene carácter poético" },
      { id: "c", text: "La metáfora no tiene relación con el erotismo" },
      { id: "d", text: "El erotismo es puramente físico" },
    ],
    correct: "b",
    explanation:
      "Al definir el erotismo como 'sexualidad transfigurada: metáfora', el autor establece que el erotismo tiene un carácter esencialmente poético, pues opera como una metáfora que transforma la sexualidad básica en algo más elevado.",
    points: 5,
  },
  {
    id: 113,
    category: "Comprensión Lectora",
    question: "Las palabras 'ceremonia y representación' son:",
    options: [
      { id: "a", text: "Verbos de acción" },
      { id: "b", text: "Adjetivos calificativos" },
      { id: "c", text: "Sustantivos abstractos" },
      { id: "d", text: "Sustantivos concretos" },
    ],
    correct: "c",
    explanation:
      "'Ceremonia' y 'representación' son sustantivos abstractos que designan conceptos inmateriales relacionados con actos simbólicos y rituales.",
    points: 5,
  },
  {
    id: 114,
    category: "Comprensión Lectora",
    question: "Según el texto, ¿qué potencia transfigura al sexo en ceremonia y rito?",
    options: [
      { id: "a", text: "El amor" },
      { id: "b", text: "La razón" },
      { id: "c", text: "La imaginación" },
      { id: "d", text: "La cultura" },
    ],
    correct: "c",
    explanation:
      "El texto afirma explícitamente que 'El agente que mueve lo mismo al acto erótico que al poético es la imaginación. Es la potencia que transfigura al sexo en ceremonia y rito'.",
    points: 5,
  },
  {
    id: 115,
    category: "Comprensión Lectora",
    question: "Un sinónimo de 'incorpóreas' es:",
    options: [
      { id: "a", text: "Materiales" },
      { id: "b", text: "Físicas" },
      { id: "c", text: "Intangibles" },
      { id: "d", text: "Corpóreas" },
    ],
    correct: "c",
    explanation:
      "'Incorpóreas' significa sin cuerpo o materia, por lo tanto 'intangibles' es su sinónimo, refiriéndose a las ideas que no tienen forma física.",
    points: 5,
  },
  // Boca que busca la boca - Juan Manuel Roca (IDs 116-120)
  {
    id: 116,
    category: "Comprensión Lectora",
    question: "¿Qué coincidencia existe entre los textos de Octavio Paz y Juan Manuel Roca sobre el erotismo?",
    options: [
      { id: "a", text: "Ambos lo consideran puramente físico" },
      { id: "b", text: "Ambos lo conciben como ritual o ceremonia" },
      { id: "c", text: "Ambos lo rechazan como tema literario" },
      { id: "d", text: "Ambos hablan solo de sexualidad animal" },
    ],
    correct: "b",
    explanation:
      "Tanto Paz como Roca conciben el erotismo como ceremonia, ritual y representación, más allá de la mera sexualidad física, enfatizando su dimensión simbólica y cultural.",
    points: 5,
  },
  {
    id: 117,
    category: "Comprensión Lectora",
    question: "La expresión 'despojo de potestades' significa:",
    options: [
      { id: "a", text: "Aumento del poder de una parte" },
      { id: "b", text: "Ausencia de poderes o autoridad de las partes" },
      { id: "c", text: "Imposición de la voluntad de uno sobre otro" },
      { id: "d", text: "Mantenimiento de jerarquías" },
    ],
    correct: "b",
    explanation:
      "'Despojo de potestades' indica que en el encuentro erótico ambas partes abandonan sus poderes y autoridades, creando un espacio de libertad e igualdad sin jerarquías.",
    points: 5,
  },
  {
    id: 118,
    category: "Comprensión Lectora",
    question: "La figura literaria en 'la boca es cáliz' es:",
    options: [
      { id: "a", text: "Metáfora" },
      { id: "b", text: "Hipérbole" },
      { id: "c", text: "Símil" },
      { id: "d", text: "Personificación" },
    ],
    correct: "c",
    explanation:
      "'La boca es cáliz' es un símil (comparación explícita usando 'es') que establece una analogía entre la boca en el contexto erótico y un cáliz religioso, sugiriendo su carácter sagrado y ritual.",
    points: 5,
  },
  {
    id: 119,
    category: "Comprensión Lectora",
    question: "Las palabras 'ornamentos rituales' corresponden a las categorías gramaticales:",
    options: [
      { id: "a", text: "Verbo y adverbio" },
      { id: "b", text: "Sustantivo y adjetivo" },
      { id: "c", text: "Artículo y sustantivo" },
      { id: "d", text: "Pronombre y verbo" },
    ],
    correct: "b",
    explanation:
      "'Ornamentos' es un sustantivo y 'rituales' funciona como adjetivo que califica a 'ornamentos', formando una construcción sustantivo + adjetivo.",
    points: 5,
  },
  {
    id: 120,
    category: "Comprensión Lectora",
    question: "El sujeto de la oración 'Las palabras de amor correspondidas son plegarias escuchadas' es:",
    options: [
      { id: "a", text: "Amor" },
      { id: "b", text: "Las palabras de amor correspondidas" },
      { id: "c", text: "Plegarias" },
      { id: "d", text: "Plegarias escuchadas" },
    ],
    correct: "b",
    explanation:
      "El sujeto completo es 'Las palabras de amor correspondidas', que es aquello de lo que se predica que 'son plegarias escuchadas'.",
    points: 5,
  },
  // Delirio - Laura Restrepo (IDs 121-130)
  {
    id: 121,
    category: "Comprensión Lectora",
    question: "Según Aguilar, ¿cuál fue la causa del estado mental de Agustina?",
    options: [
      { id: "a", text: "Un accidente durante su ausencia" },
      { id: "b", text: "Las premoniciones que ella siempre tenía" },
      { id: "c", text: "Una enfermedad física" },
      { id: "d", text: "El viaje de trabajo de Aguilar" },
    ],
    correct: "b",
    explanation:
      "Aguilar menciona que lo único que podría haber anunciado lo sucedido eran 'sus propias premoniciones', aunque él nunca las tomaba en serio. El texto sugiere que Agustina siempre pronosticaba calamidades.",
    points: 5,
  },
  {
    id: 122,
    category: "Comprensión Lectora",
    question: "El texto de Laura Restrepo es predominantemente:",
    options: [
      { id: "a", text: "Descriptivo" },
      { id: "b", text: "Narrativo" },
      { id: "c", text: "Argumentativo" },
      { id: "d", text: "Expositivo" },
    ],
    correct: "b",
    explanation:
      "El texto es narrativo porque relata los acontecimientos que llevaron a Aguilar a encontrar a su esposa en un estado mental alterado, usando técnicas narrativas como narrador, personajes y secuencia temporal.",
    points: 5,
  },
  {
    id: 123,
    category: "Comprensión Lectora",
    question: "El uso de mayúsculas en 'Aguilar' tiene la función de:",
    options: [
      { id: "a", text: "Indicar que es un nombre propio" },
      { id: "b", text: "Dar énfasis a la palabra" },
      { id: "c", text: "Introducir la voz del personaje en estilo indirecto libre" },
      { id: "d", text: "Corregir un error ortográfico" },
    ],
    correct: "c",
    explanation:
      "El uso de mayúsculas en 'Aguilar' junto con expresiones como 'dice Aguilar' introduce la voz del personaje en estilo indirecto libre, mezclando la narración con los pensamientos y palabras del personaje.",
    points: 5,
  },
  {
    id: 124,
    category: "Comprensión Lectora",
    question: "¿Qué sentido tiene la expresión 'La mujer que amo se ha perdido dentro de su propia cabeza'?",
    options: [
      { id: "a", text: "Agustina tiene amnesia" },
      { id: "b", text: "Agustina sufre un trastorno mental que la desconecta de la realidad" },
      { id: "c", text: "Agustina está físicamente perdida" },
      { id: "d", text: "Agustina no quiere hablar con Aguilar" },
    ],
    correct: "b",
    explanation:
      "La metáfora 'perdida dentro de su propia cabeza' indica que Agustina sufre un trastorno mental que la ha desconectado de la realidad y de su identidad previa, haciéndola inaccesible emocionalmente.",
    points: 5,
  },
  {
    id: 125,
    category: "Comprensión Lectora",
    question: "El 'don de los ojos' al que se refiere Agustina es:",
    options: [
      { id: "a", text: "Su belleza física" },
      { id: "b", text: "Su capacidad de ver bien" },
      { id: "c", text: "Sus premoniciones o visión de lo venidero" },
      { id: "d", text: "Su habilidad para pintar" },
    ],
    correct: "c",
    explanation:
      "El texto explica que Agustina llama 'don de los ojos' a su capacidad de tener 'visión de lo venidero', es decir, premoniciones sobre eventos futuros.",
    points: 5,
  },
  {
    id: 126,
    category: "Comprensión Lectora",
    question: "Un sinónimo de 'tarascadas' es, EXCEPTO:",
    options: [
      { id: "a", text: "Mordidas" },
      { id: "b", text: "Dentelladas" },
      { id: "c", text: "Ladrido" },
      { id: "d", text: "Mordiscos" },
    ],
    correct: "c",
    explanation:
      "'Ladrido' NO es sinónimo de 'tarascadas'. Las tarascadas son mordidas o dentelladas, mientras que el ladrido es el sonido que hace un perro. Aunque ambos aparecen en la metáfora del perro, son acciones diferentes.",
    points: 5,
  },
  {
    id: 127,
    category: "Comprensión Lectora",
    question: "¿Qué sentido tiene la comparación 'Agustina es un perro famélico y malherido que quisiera volver a casa y no lo logra'?",
    options: [
      { id: "a", text: "Agustina se comporta como un animal" },
      { id: "b", text: "Agustina está físicamente herida" },
      { id: "c", text: "Expresa la imposibilidad de Agustina de regresar a su estado mental normal por sí misma" },
      { id: "d", text: "Agustina está perdida en la calle" },
    ],
    correct: "c",
    explanation:
      "La metáfora del perro famélico y malherido expresa la condición de Agustina: está sufriendo (famélico, malherido), desea recuperarse ('volver a casa'), pero no puede lograrlo por sí misma debido a su trastorno mental.",
    points: 5,
  },
  {
    id: 128,
    category: "Comprensión Lectora",
    question: "¿Qué personas gramaticales predominan en el texto?",
    options: [
      { id: "a", text: "Solo tercera persona" },
      { id: "b", text: "Primera persona de Aguilar y tercera persona del narrador" },
      { id: "c", text: "Solo primera persona" },
      { id: "d", text: "Segunda persona dirigiéndose al lector" },
    ],
    correct: "b",
    explanation:
      "El texto alterna entre la tercera persona del narrador que cuenta la historia ('dice Aguilar', 'intenta explicar') y la primera persona de Aguilar en estilo indirecto libre ('mi mujer', 'me fui', 'la dejé').",
    points: 5,
  },
  {
    id: 129,
    category: "Comprensión Lectora",
    question: "Un sinónimo de 'premoniciones' es:",
    options: [
      { id: "a", text: "Recuerdos" },
      { id: "b", text: "Presagios" },
      { id: "c", text: "Alucinaciones" },
      { id: "d", text: "Ilusiones" },
    ],
    correct: "b",
    explanation:
      "'Presagios' es sinónimo de 'premoniciones', ambas palabras se refieren a intuiciones o anticipaciones de eventos futuros.",
    points: 5,
  },
  {
    id: 130,
    category: "Comprensión Lectora",
    question: "En la metáfora 'un perro que me tira tarascadas', ¿a qué se refiere 'el perro'?",
    options: [
      { id: "a", text: "La personalidad violenta de Agustina" },
      { id: "b", text: "La razón trastornada de Agustina" },
      { id: "c", text: "Un perro real que los ataca" },
      { id: "d", text: "Los recuerdos de Agustina" },
    ],
    correct: "b",
    explanation:
      "El texto aclara explícitamente: 'La trastornada razón de mi mujer es un perro que me tira tarascadas', indicando que el perro es una metáfora de la mente alterada de Agustina.",
    points: 5,
  },
  // La loca de la casa - Rosa Montero (IDs 131-140)
  {
    id: 131,
    category: "Comprensión Lectora",
    question: "¿Por qué el texto de Rosa Montero puede considerarse argumentativo?",
    options: [
      { id: "a", text: "Porque narra una historia" },
      { id: "b", text: "Porque defiende una tesis sobre la naturaleza de la escritura mediante ejemplos y argumentos" },
      { id: "c", text: "Porque describe paisajes" },
      { id: "d", text: "Porque solo da información objetiva" },
    ],
    correct: "b",
    explanation:
      "El texto es argumentativo porque presenta una tesis ('escribir es estar habitado por fantasías que son don y castigo') y la defiende mediante argumentos y ejemplos concretos.",
    points: 5,
  },
  {
    id: 132,
    category: "Comprensión Lectora",
    question: "¿Cuál es la estructura del párrafo?",
    options: [
      { id: "a", text: "Introducción, nudo, desenlace" },
      { id: "b", text: "Tesis, argumentos, ejemplos, conclusión" },
      { id: "c", text: "Planteamiento y resolución" },
      { id: "d", text: "Causa y efecto" },
    ],
    correct: "b",
    explanation:
      "El párrafo sigue la estructura: tesis inicial (la compulsión fabuladora es don y castigo), argumentos (cómo funciona la fantasía), ejemplos concretos (Argelia, el puente), y conclusión implícita sobre las consecuencias.",
    points: 5,
  },
  {
    id: 133,
    category: "Comprensión Lectora",
    question: "La figura literaria en 'perezosas como las lentas ensoñaciones de una siesta estival' es:",
    options: [
      { id: "a", text: "Metáfora" },
      { id: "b", text: "Hipérbole" },
      { id: "c", text: "Símil" },
      { id: "d", text: "Metonimia" },
    ],
    correct: "c",
    explanation:
      "Es un símil porque usa la palabra comparativa 'como' para establecer una comparación explícita entre las fantasías perezosas y las ensoñaciones de una siesta estival.",
    points: 5,
  },
  {
    id: 134,
    category: "Comprensión Lectora",
    question: "¿Cuál es la idea central del párrafo?",
    options: [
      { id: "a", text: "Los novelistas sufren enfermedades mentales" },
      { id: "b", text: "La compulsión fabuladora del escritor es tanto un don como un castigo que hace que su mente funcione automáticamente" },
      { id: "c", text: "Es peligroso cruzar puentes de madera" },
      { id: "d", text: "Las noticias de Argelia son muy tristes" },
    ],
    correct: "b",
    explanation:
      "La idea central es que la mente del novelista está poseída por una compulsión fabuladora que opera automáticamente, y esta capacidad es simultáneamente un don (para crear) y un castigo (genera sufrimiento innecesario).",
    points: 5,
  },
  {
    id: 135,
    category: "Comprensión Lectora",
    question: "El sentido de 'compulsión fabuladora' es:",
    options: [
      { id: "a", text: "Mentir compulsivamente" },
      { id: "b", text: "Tendencia irresistible a inventar, imaginar y crear historias" },
      { id: "c", text: "Leer muchos libros" },
      { id: "d", text: "Escribir muy rápido" },
    ],
    correct: "b",
    explanation:
      "'Compulsión fabuladora' se refiere a la tendencia irresistible e involuntaria a fabular, es decir, a inventar e imaginar historias constantemente, característica de la mente del novelista.",
    points: 5,
  },
  {
    id: 136,
    category: "Comprensión Lectora",
    question: "Un sinónimo de 'oprobio' es:",
    options: [
      { id: "a", text: "Honor" },
      { id: "b", text: "Alegría" },
      { id: "c", text: "Vergüenza" },
      { id: "d", text: "Orgullo" },
    ],
    correct: "c",
    explanation:
      "'Oprobio' significa vergüenza, deshonra o humillación. En el contexto, se refiere a la vergüenza de caerse de manera poco elegante en el arroyo.",
    points: 5,
  },
  {
    id: 137,
    category: "Comprensión Lectora",
    question: "La expresión 'Voilà' es un:",
    options: [
      { id: "a", text: "Anglicismo" },
      { id: "b", text: "Italianismo" },
      { id: "c", text: "Galicismo" },
      { id: "d", text: "Germanismo" },
    ],
    correct: "c",
    explanation:
      "'Voilà' es un galicismo (préstamo del francés) que significa 'he aquí' o 'ya está', usado para presentar o concluir algo.",
    points: 5,
  },
  {
    id: 138,
    category: "Comprensión Lectora",
    question: "La palabra 'chasquido' corresponde a:",
    options: [
      { id: "a", text: "Una metáfora" },
      { id: "b", text: "Una onomatopeya" },
      { id: "c", text: "Un símil" },
      { id: "d", text: "Una hipérbole" },
    ],
    correct: "b",
    explanation:
      "'Chasquido' es una onomatopeya que imita el sonido seco y repentino, en este caso del quebrarse de los huesos.",
    points: 5,
  },
  {
    id: 139,
    category: "Comprensión Lectora",
    question: "¿A qué se refiere 'a veces es un don y en otras ocasiones es un castigo'?",
    options: [
      { id: "a", text: "La lectura de noticias" },
      { id: "b", text: "Cruzar puentes de madera" },
      { id: "c", text: "La compulsión fabuladora o imaginación del novelista" },
      { id: "d", text: "Vivir en Argelia" },
    ],
    correct: "c",
    explanation:
      "Se refiere a la compulsión fabuladora del novelista: es un don cuando permite crear literatura, pero es un castigo cuando obliga a imaginar horrores o anticipar caídas ridículas.",
    points: 5,
  },
  {
    id: 140,
    category: "Comprensión Lectora",
    question: "¿Cuál de los siguientes NO es un ejemplo de cómo marcha la cabeza del novelista por sí sola?",
    options: [
      { id: "a", text: "Recrear instantáneamente una noticia atroz sobre niños descuartizados" },
      { id: "b", text: "Imaginar detalladamente una caída al cruzar un puente" },
      { id: "c", text: "Leer tranquilamente el periódico sin que se dispare la imaginación" },
      { id: "d", text: "Visualizar con todos los pormenores una situación antes de que ocurra" },
    ],
    correct: "c",
    explanation:
      "'Leer tranquilamente el periódico sin que se dispare la imaginación' NO es un ejemplo de la compulsión fabuladora. Por el contrario, el texto muestra que la imaginación del novelista se dispara involuntariamente al leer el periódico.",
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
  {
    id: 89,
    category: "Competencias de Comprensión",
    context:
      "Mientras la destreza se refiere al dominio técnico en una actividad particular (como tocar piano o programar), la competencia abarca un conjunto más amplio que incluye conocimientos teóricos, habilidades prácticas, actitudes profesionales y capacidad de aplicación en diferentes contextos.",
    question: "¿En qué se diferencia fundamentalmente una destreza de una competencia?",
    options: [
      { id: "a", text: "La destreza es teórica mientras que la competencia es práctica." },
      { id: "b", text: "La competencia integra conocimientos, habilidades, actitudes y contextos variados." },
      { id: "c", text: "La destreza requiere años de práctica, la competencia es innata." },
      { id: "d", text: "No hay diferencia real entre ambos conceptos." },
      { id: "e", text: "La competencia es menos valiosa que la destreza." },
    ],
    correct: "b",
    explanation:
      "La competencia es un concepto integrador que combina conocimientos teóricos, habilidades prácticas, actitudes y capacidad de aplicación contextual, mientras que la destreza se enfoca en el dominio técnico específico.",
    points: 5,
  },
  {
    id: 90,
    category: "Estructura de Preguntas",
    context:
      "En una pregunta bien construida, el enunciado debe ser claro y preciso, la opción correcta debe responder exactamente lo preguntado, y los distractores deben parecer plausibles pero contener errores conceptuales, información incompleta o generalizaciones incorrectas.",
    question: "¿Qué características deben tener los distractores efectivos en una evaluación?",
    options: [
      { id: "a", text: "Deben ser absurdos para facilitar la identificación de la respuesta correcta." },
      { id: "b", text: "Deben parecer plausibles pero contener errores conceptuales o información incompleta." },
      { id: "c", text: "Deben ser idénticos entre sí para confundir al evaluado." },
      { id: "d", text: "Deben ser más extensos que la respuesta correcta." },
      { id: "e", text: "No deben relacionarse con el tema evaluado." },
    ],
    correct: "b",
    explanation:
      "Los distractores efectivos son aquellos que parecen plausibles a quien no domina el tema, pero contienen errores conceptuales, información incompleta o generalizaciones incorrectas que los hacen incorrectos.",
    points: 5,
  },
  {
    id: 91,
    category: "Competencias de Comprensión",
    context:
      "Un auditor revisa un informe financiero (competencia interpretativa), luego explica por qué ciertos gastos no están justificados adecuadamente según la normativa vigente (competencia argumentativa), y finalmente sugiere un nuevo procedimiento de control interno para prevenir futuros incumplimientos (competencia propositiva).",
    question: "¿Qué competencia demuestra el auditor al sugerir un nuevo procedimiento de control interno?",
    options: [
      { id: "a", text: "Competencia interpretativa, al revisar el informe." },
      { id: "b", text: "Competencia argumentativa, al explicar los incumplimientos." },
      { id: "c", text: "Competencia propositiva, al diseñar una solución preventiva." },
      { id: "d", text: "Competencia operativa, al aplicar la normativa." },
      { id: "e", text: "Competencia descriptiva, al enumerar gastos." },
    ],
    correct: "c",
    explanation:
      "Al sugerir un nuevo procedimiento de control interno, el auditor está generando una propuesta de solución para prevenir problemas futuros, lo cual caracteriza la competencia propositiva.",
    points: 5,
  },
  {
    id: 92,
    category: "Niveles de Información",
    context:
      "La información local permite responder '¿cuándo ocurrió?', '¿quién participó?' o '¿dónde sucedió?'. La información global responde '¿cuál es el tema principal?' o '¿qué conclusión presenta el autor?'. La información intertextual requiere preguntas como '¿cómo se relaciona esto con lo planteado en el texto anterior?'",
    question: "¿Qué tipo de pregunta requiere trabajar con información global?",
    options: [
      { id: "a", text: "¿En qué año ocurrió el evento mencionado?" },
      { id: "b", text: "¿Cuál es el tema principal que desarrolla el autor?" },
      { id: "c", text: "¿Qué relación tiene este texto con otros del mismo tema?" },
      { id: "d", text: "¿Qué significa la palabra 'perspicaz' en el párrafo tres?" },
      { id: "e", text: "¿Quién es el personaje mencionado en la línea cinco?" },
    ],
    correct: "b",
    explanation:
      "Identificar el tema principal requiere integrar información de múltiples partes del texto para obtener el sentido general, lo cual caracteriza el trabajo con información global.",
    points: 5,
  },
  {
    id: 93,
    category: "Estrategias de Respuesta",
    context:
      "Las estrategias metacognitivas incluyen: planificar la lectura identificando el propósito, monitorear la comprensión pausando para verificar entendimiento, y evaluar si la respuesta seleccionada realmente contesta lo preguntado antes de confirmarla.",
    question: "¿Cuál acción corresponde a una estrategia metacognitiva de monitoreo durante la lectura?",
    options: [
      { id: "a", text: "Leer el texto completo sin detenerse en ningún momento." },
      { id: "b", text: "Pausar para verificar si se está comprendiendo lo leído." },
      { id: "c", text: "Subrayar todas las palabras desconocidas al terminar." },
      { id: "d", text: "Contar el número de párrafos del texto." },
      { id: "e", text: "Memorizar las primeras líneas de cada sección." },
    ],
    correct: "b",
    explanation:
      "El monitoreo metacognitivo implica pausar durante la lectura para verificar el nivel de comprensión y ajustar estrategias si es necesario, no simplemente leer de manera continua.",
    points: 5,
  },
  {
    id: 94,
    category: "Competencias de Comprensión",
    context:
      "Al leer: 'El proyecto se retrasó tres meses debido a problemas logísticos, por lo tanto no cumplió con los plazos establecidos en el contrato', la primera parte identifica un hecho y su causa (interpretativa), mientras que 'por lo tanto' introduce una consecuencia lógica que argumenta sobre el incumplimiento contractual (argumentativa).",
    question: "¿Qué función cumple la expresión 'por lo tanto' en la estructura argumentativa del enunciado?",
    options: [
      { id: "a", text: "Introduce información adicional sin relación causal." },
      { id: "b", text: "Establece una consecuencia lógica y conecta la causa con el efecto." },
      { id: "c", text: "Niega la información presentada previamente." },
      { id: "d", text: "Propone una solución al problema planteado." },
      { id: "e", text: "Describe detalles técnicos del proyecto." },
    ],
    correct: "b",
    explanation:
      "'Por lo tanto' es un conector consecutivo que introduce una consecuencia lógica derivada de la premisa anterior, estableciendo una relación causal explícita entre el retraso y el incumplimiento.",
    points: 5,
  },
  {
    id: 95,
    category: "Estructura de Preguntas",
    context:
      "Los conectores de contraste (sin embargo, no obstante, aunque) indican oposición entre ideas. Los de consecuencia (por lo tanto, en consecuencia, así que) muestran resultado. Los de adición (además, asimismo, también) agregan información. Reconocerlos ayuda a anticipar el desarrollo del texto.",
    question: "Si un párrafo termina con 'sin embargo', ¿qué tipo de información debería esperarse a continuación?",
    options: [
      { id: "a", text: "Una idea que contradice o contrasta con lo planteado anteriormente." },
      { id: "b", text: "Una consecuencia lógica de lo expuesto previamente." },
      { id: "c", text: "Información adicional que refuerza lo dicho antes." },
      { id: "d", text: "Una definición técnica de términos especializados." },
      { id: "e", text: "La conclusión final del texto completo." },
    ],
    correct: "a",
    explanation:
      "'Sin embargo' es un conector de contraste que introduce información que contradice, matiza u opone una idea alternativa a lo planteado anteriormente.",
    points: 5,
  },
  {
    id: 96,
    category: "Niveles de Información",
    context:
      "Una investigadora estudia un artículo sobre políticas educativas en Finlandia y lo compara con un libro que leyó sobre el sistema educativo de Singapur, identificando similitudes en sus enfoques pedagógicos y diferencias en la inversión estatal, construyendo así un análisis comparativo enriquecido.",
    question: "¿Qué nivel de procesamiento de información realiza la investigadora al comparar ambas fuentes?",
    options: [
      { id: "a", text: "Información local, al identificar datos específicos en cada texto." },
      { id: "b", text: "Información global, al sintetizar cada sistema educativo por separado." },
      { id: "c", text: "Información intertextual, al establecer relaciones entre diferentes textos." },
      { id: "d", text: "Información literal, al citar textualmente ambas fuentes." },
      { id: "e", text: "Información implícita, al deducir información no explícita." },
    ],
    correct: "c",
    explanation:
      "Al comparar y relacionar información de dos textos diferentes para construir un análisis enriquecido, la investigadora trabaja con información intertextual que vincula múltiples fuentes.",
    points: 5,
  },
  {
    id: 97,
    category: "Estrategias de Respuesta",
    context:
      "Al enfrentar dos opciones aparentemente correctas, una estrategia efectiva es preguntarse: ¿cuál responde con mayor precisión?, ¿cuál está más completa?, ¿cuál usa el vocabulario del texto?, y ¿cuál evita generalizaciones excesivas o absolutas como 'siempre' o 'nunca'?",
    question: "¿Qué característica suele hacer menos confiable una opción de respuesta?",
    options: [
      { id: "a", text: "Que use vocabulario técnico del área evaluada." },
      { id: "b", text: "Que incluya términos absolutos como 'siempre', 'nunca' o 'todos'." },
      { id: "c", text: "Que responda directamente lo preguntado." },
      { id: "d", text: "Que sea coherente con el contexto presentado." },
      { id: "e", text: "Que tenga una extensión similar a las otras opciones." },
    ],
    correct: "b",
    explanation:
      "Las opciones que contienen términos absolutos como 'siempre', 'nunca', 'todos' suelen ser menos confiables porque pocas afirmaciones son universalmente verdaderas sin excepciones.",
    points: 5,
  },
  {
    id: 98,
    category: "Competencias de Comprensión",
    context:
      "Ante la disminución de ventas en una región, un gerente comercial analiza los reportes de mercado (interpretativa), identifica que el factor principal es el aumento de competidores locales (argumentativa), y diseña una estrategia de fidelización que combina descuentos progresivos, atención personalizada y mejoras en el servicio posventa (propositiva).",
    question: "¿En qué momento el gerente demuestra competencia propositiva?",
    options: [
      { id: "a", text: "Al analizar los reportes de mercado para entender la situación." },
      { id: "b", text: "Al identificar que el aumento de competidores es el factor principal." },
      { id: "c", text: "Al diseñar una estrategia integrada de fidelización con múltiples componentes." },
      { id: "d", text: "Al observar la disminución de ventas en los registros." },
      { id: "e", text: "Al comparar los datos del trimestre actual con trimestres anteriores." },
    ],
    correct: "c",
    explanation:
      "La competencia propositiva se evidencia cuando el gerente diseña una estrategia creativa e integrada para solucionar el problema, no solo al analizar la situación o identificar causas.",
    points: 5,
  },
  {
    id: 99,
    category: "Comprensión Lectora",
    context:
      "El libro es uno de los inventos más asombrosos de la humanidad, pues sirve de extensión a nuestro poder de recordar y de imaginar. Permite contener información para preservarla, ayuda a representar el mundo y hacerlo legible. Expande la capacidad de pensar y comunicarse. En la cultura digital actual, el libro mantiene su relevancia como herramienta indispensable.",
    question: "¿Por qué el texto afirma que el libro es una extensión del poder humano?",
    options: [
      { id: "a", text: "Porque permite almacenar información fuera de la mente y expandir las capacidades cognitivas." },
      { id: "b", text: "Porque la escritura reemplazó completamente la tradición oral antigua." },
      { id: "c", text: "Porque hace innecesario ejercitar la memoria humana." },
      { id: "d", text: "Porque elimina la necesidad de comunicación directa entre personas." },
    ],
    correct: "a",
    explanation:
      "El libro es una extensión del poder humano porque permite contener información externamente, preservarla y expandir las capacidades de pensar y comunicarse, no porque reemplace o elimine funciones humanas.",
    points: 5,
  },
  {
    id: 100,
    category: "Comprensión Lectora",
    context:
      "Sócrates afirmó que la escritura terminaría con la capacidad de recordar porque ya no habría necesidad de ejercitar la memoria ni someter los pensamientos a juicio propio. Sin embargo, la historia demostró que ambas tradiciones —oral y escrita— respondían a necesidades culturales diferentes en momentos distintos de la humanidad.",
    question: "Según el texto, ¿cuál es la validez de la preocupación de Sócrates?",
    options: [
      { id: "a", text: "Tenía razón absoluta porque la escritura destruyó la capacidad memorística humana." },
      { id: "b", text: "Su preocupación era válida para su contexto, pero oralidad y escritura responden a necesidades culturales diferentes." },
      { id: "c", text: "Estaba equivocado porque la escritura siempre fue superior a la oralidad." },
      { id: "d", text: "Era correcta, pues hoy nadie ejercita la memoria gracias a los libros." },
    ],
    correct: "b",
    explanation:
      "El texto sugiere que la preocupación de Sócrates tenía sentido en su época, pero que ambas tradiciones (oral y escrita) respondían a necesidades culturales distintas en momentos diferentes.",
    points: 5,
  },
  {
    id: 101,
    category: "Comprensión Lectora",
    context:
      "Los antiguos valoraban profundamente el ejercicio de la memoria y el juicio propio sobre los pensamientos. Para ellos, el acto de recordar era fundamental para el conocimiento. En contraste, la sociedad moderna valora la capacidad de almacenar y acceder a grandes cantidades de información mediante libros y tecnología digital.",
    question: "¿Qué diferencia fundamental establece el texto entre antiguos y modernos?",
    options: [
      { id: "a", text: "Los antiguos no tenían acceso a información, mientras los modernos sí." },
      { id: "b", text: "Los antiguos valoraban el ejercicio mental de recordar, mientras los modernos valoran el almacenamiento externo de información." },
      { id: "c", text: "Los antiguos eran superiores intelectualmente a los modernos." },
      { id: "d", text: "Los modernos han perdido completamente la capacidad de memorizar." },
    ],
    correct: "b",
    explanation:
      "La diferencia clave está en los valores: los antiguos privilegiaban el ejercicio de la memoria y el juicio propio, mientras los modernos valoran la capacidad de almacenar y acceder a información externamente.",
    points: 5,
  },
  {
    id: 102,
    category: "Comprensión Lectora",
    context:
      "El libro permite representar el mundo y hacerlo legible. No solo preserva información, sino que ayuda a organizar el conocimiento, estructurar el pensamiento y comunicar ideas complejas a través del tiempo y el espacio. Es una tecnología que transforma cómo entendemos la realidad.",
    question: "Según el texto, ¿cuál es la función más amplia del libro más allá de preservar información?",
    options: [
      { id: "a", text: "Simplemente guardar datos para el futuro." },
      { id: "b", text: "Reemplazar la necesidad de pensar críticamente." },
      { id: "c", text: "Representar el mundo, organizar conocimiento y estructurar el pensamiento humano." },
      { id: "d", text: "Eliminar la comunicación oral entre generaciones." },
    ],
    correct: "c",
    explanation:
      "El texto destaca que el libro tiene funciones más profundas: representa el mundo, lo hace legible, organiza conocimiento y estructura el pensamiento, no solo preserva datos.",
    points: 5,
  },
  {
    id: 103,
    category: "Comprensión Lectora",
    context:
      "La retórica cortés medieval establecía que el enamorado debía sufrir el rechazo de la mujer amada como parte del proceso amoroso. Este sufrimiento no era casual, sino estructurado según códigos específicos. El amor debía ser discreto, y la dama mantenía su distancia para probar la persistencia y virtud del pretendiente.",
    question: "En la retórica cortés medieval, ¿qué función cumplía el rechazo de la dama?",
    options: [
      { id: "a", text: "Era una expresión de crueldad sin propósito." },
      { id: "b", text: "Servía para probar la persistencia y virtud del pretendiente según códigos establecidos." },
      { id: "c", text: "Buscaba humillar públicamente al enamorado." },
      { id: "d", text: "No tenía significado particular en la cultura medieval." },
    ],
    correct: "b",
    explanation:
      "El rechazo tenía una función específica dentro del código cortés: probar la persistencia y virtud del pretendiente, siendo parte estructurada del proceso amoroso medieval.",
    points: 5,
  },
  {
    id: 104,
    category: "Comprensión Lectora",
    context:
      "El obstáculo amoroso en la literatura medieval no era un impedimento accidental, sino un elemento estructural del relato. La imposibilidad del amor alimentaba la narrativa y permitía explorar temas de honor, virtud, sufrimiento y nobleza. Sin obstáculo, la historia perdía su tensión narrativa.",
    question: "¿Por qué el obstáculo amoroso era estructural en la narrativa medieval?",
    options: [
      { id: "a", text: "Porque los escritores no sabían crear historias sin conflictos." },
      { id: "b", text: "Porque alimentaba la narrativa y permitía explorar temas de honor, virtud y nobleza." },
      { id: "c", text: "Porque reflejaba la simple realidad social sin elaboración artística." },
      { id: "d", text: "Porque era un requisito legal impuesto por la Iglesia." },
    ],
    correct: "b",
    explanation:
      "El obstáculo era estructural porque no era accidental sino intencional: alimentaba la narrativa y permitía explorar temas centrales como honor, virtud, sufrimiento y nobleza.",
    points: 5,
  },
  {
    id: 105,
    category: "Comprensión Lectora",
    context:
      "En la poesía trovadoresca, el amor debía mantenerse secreto y discreto. La revelación pública del amor podía arruinar la reputación de la dama y del caballero. La discreción era tanto una virtud como una necesidad práctica, creando una tensión entre el deseo de expresar el amor y la obligación de ocultarlo.",
    question: "¿Qué tensión caracterizaba el amor trovadoresco medieval?",
    options: [
      { id: "a", text: "Entre la riqueza del caballero y la pobreza de la dama." },
      { id: "b", text: "Entre el deseo de expresar el amor y la obligación social de ocultarlo." },
      { id: "c", text: "Entre el amor verdadero y el matrimonio arreglado exclusivamente." },
      { id: "d", text: "Entre las órdenes religiosas y la nobleza secular." },
    ],
    correct: "b",
    explanation:
      "La tensión clave era entre el impulso de expresar el amor y la necesidad social de mantenerlo secreto y discreto para proteger reputaciones.",
    points: 5,
  },
  {
    id: 106,
    category: "Comprensión Lectora",
    context:
      "El amor cortés medieval establecía una jerarquía donde la dama ocupaba una posición superior al pretendiente. El caballero se colocaba en posición de servicio, similar a un vasallo ante su señor. Esta inversión de roles sociales convencionales creaba una dinámica única de poder y sumisión voluntaria.",
    question: "¿Qué característica distintiva tenía la jerarquía del amor cortés?",
    options: [
      { id: "a", text: "Mantenía exactamente las jerarquías sociales convencionales." },
      { id: "b", text: "Invertía los roles, colocando a la dama en posición superior y al caballero como servidor." },
      { id: "c", text: "Eliminaba completamente toda jerarquía entre los amantes." },
      { id: "d", text: "Privilegiaba siempre al hombre sobre la mujer en todas las situaciones." },
    ],
    correct: "b",
    explanation:
      "Lo distintivo del amor cortés era la inversión de jerarquías: la dama ocupaba posición superior y el caballero se colocaba voluntariamente en posición de servicio, como vasallo.",
    points: 5,
  },
  {
    id: 107,
    category: "Comprensión Lectora",
    context:
      "El código del amor cortés requería que el sufrimiento del enamorado fuera refinado y estético. No bastaba sufrir; había que hacerlo con elegancia, expresándolo mediante poesía, música y gestos codificados. El sufrimiento se convertía en arte y prueba de nobleza espiritual.",
    question: "Según el código cortés, ¿cómo debía manifestarse el sufrimiento amoroso?",
    options: [
      { id: "a", text: "De manera vulgar y desesperada para demostrar sinceridad." },
      { id: "b", text: "Con refinamiento estético, expresándose mediante arte y gestos codificados." },
      { id: "c", text: "En completo silencio sin ninguna expresión externa." },
      { id: "d", text: "Solo mediante actos violentos contra rivales." },
    ],
    correct: "b",
    explanation:
      "El sufrimiento debía ser refinado y estético, expresándose mediante poesía, música y gestos codificados, convirtiéndose en arte y prueba de nobleza espiritual.",
    points: 5,
  },
  {
    id: 108,
    category: "Comprensión Lectora",
    context:
      "Gene Roddenberry no era científico ni ingeniero, pero sus visiones imaginativas sobre el futuro influyeron posteriormente en el desarrollo tecnológico real. Los comunicadores de Star Trek inspiraron los teléfonos celulares, y conceptos como las computadoras parlantes anticiparon asistentes virtuales modernos.",
    question: "¿Qué relación establece el texto entre imaginación y desarrollo tecnológico?",
    options: [
      { id: "a", text: "Solo los científicos pueden imaginar tecnología futura relevante." },
      { id: "b", text: "La imaginación creativa puede anticipar e inspirar desarrollos tecnológicos reales posteriores." },
      { id: "c", text: "La ciencia ficción nunca tiene impacto en la tecnología real." },
      { id: "d", text: "Roddenberry robó ideas de científicos contemporáneos." },
    ],
    correct: "b",
    explanation:
      "El texto muestra que la imaginación creativa de Roddenberry, aunque no era científico, anticipó e inspiró desarrollos tecnológicos reales como celulares y asistentes virtuales.",
    points: 5,
  },
  {
    id: 109,
    category: "Comprensión Lectora",
    context:
      "Star Trek comenzó como una serie de televisión con presupuesto limitado y audiencias modestas. Sin embargo, su visión optimista del futuro, donde la humanidad superaba conflictos mediante cooperación y conocimiento, resonó profundamente con el público y creó un fenómeno cultural duradero.",
    question: "¿Qué factor explica mejor el éxito cultural duradero de Star Trek?",
    options: [
      { id: "a", text: "El enorme presupuesto inicial de producción." },
      { id: "b", text: "Su visión optimista del futuro basada en cooperación y conocimiento." },
      { id: "c", text: "Los efectos especiales revolucionarios de la época." },
      { id: "d", text: "El apoyo inmediato de audiencias masivas desde el inicio." },
    ],
    correct: "b",
    explanation:
      "A pesar del presupuesto limitado y audiencias modestas iniciales, el éxito duradero se debió a su visión optimista del futuro fundamentada en cooperación y conocimiento.",
    points: 5,
  },
  {
    id: 110,
    category: "Comprensión Lectora",
    context:
      "Los dispositivos imaginados en Star Trek —comunicadores portátiles, tabletas táctiles, traductores universales— no existían en los años 60, pero presentaban soluciones a necesidades humanas reales. Décadas después, la tecnología real desarrolló equivalentes funcionales a muchos de estos conceptos.",
    question: "¿Qué demuestra la materialización posterior de tecnologías imaginadas en Star Trek?",
    options: [
      { id: "a", text: "Que Roddenberry tenía información privilegiada de laboratorios secretos." },
      { id: "b", text: "Que la ficción que identifica necesidades humanas reales puede anticipar soluciones tecnológicas." },
      { id: "c", text: "Que toda la tecnología moderna proviene exclusivamente de Star Trek." },
      { id: "d", text: "Que la ciencia ficción no tiene valor más allá del entretenimiento." },
    ],
    correct: "b",
    explanation:
      "La materialización posterior demuestra que la ficción bien fundamentada, al identificar necesidades humanas reales, puede anticipar direcciones del desarrollo tecnológico futuro.",
    points: 5,
  },
  {
    id: 111,
    category: "Comprensión Lectora",
    context:
      "La nave Enterprise de Star Trek representaba más que un vehículo espacial: simbolizaba la exploración, el descubrimiento, la diversidad cultural y la resolución de conflictos mediante el diálogo. Era una metáfora móvil de los valores que la serie promovía sobre cómo la humanidad debería enfrentar el futuro.",
    question: "¿Cuál era la función simbólica más profunda de la nave Enterprise?",
    options: [
      { id: "a", text: "Simplemente servir como escenario para aventuras espaciales." },
      { id: "b", text: "Representar una metáfora de valores sobre exploración, diversidad y resolución de conflictos." },
      { id: "c", text: "Demostrar superioridad militar de la Tierra sobre otras civilizaciones." },
      { id: "d", text: "Mostrar tecnología impresionante sin mensaje particular." },
    ],
    correct: "b",
    explanation:
      "La Enterprise era más que escenario: simbolizaba valores como exploración, descubrimiento, diversidad y resolución de conflictos mediante diálogo, siendo metáfora de cómo enfrentar el futuro.",
    points: 5,
  },
  {
    id: 112,
    category: "Comprensión Lectora",
    context:
      "A pesar de ser cancelada después de tres temporadas por bajas audiencias, Star Trek renació como fenómeno cultural a través de repeticiones, convenciones de fans y eventual expansión a películas y series derivadas. Este patrón demuestra que el éxito inmediato no siempre predice el impacto cultural duradero.",
    question: "¿Qué lección sobre el impacto cultural ilustra la historia de Star Trek?",
    options: [
      { id: "a", text: "El éxito inmediato siempre garantiza impacto cultural duradero." },
      { id: "b", text: "Las series canceladas nunca pueden recuperarse o tener influencia posterior." },
      { id: "c", text: "El éxito inicial en audiencias no necesariamente predice el impacto cultural a largo plazo." },
      { id: "d", text: "Solo las series con altas audiencias iniciales merecen reconocimiento." },
    ],
    correct: "c",
    explanation:
      "Star Trek demuestra que obras inicialmente modestas en audiencia pueden generar impacto cultural profundo y duradero a largo plazo, desafiando predicciones basadas solo en éxito inmediato.",
    points: 5,
  },
  {
    id: 113,
    category: "Comprensión Lectora",
    context:
      "Los creadores de tecnologías modernas como los teléfonos celulares han reconocido explícitamente la inspiración que tomaron de los comunicadores de Star Trek. Martin Cooper, inventor del primer celular portátil, citó directamente a la serie como influencia para conceptualizar dispositivos de comunicación móvil.",
    question: "¿Qué evidencia concreta confirma la influencia de Star Trek en tecnología real?",
    options: [
      { id: "a", text: "Solo especulaciones de fans sin confirmación de inventores." },
      { id: "b", text: "El reconocimiento explícito de inventores como Martin Cooper sobre la inspiración recibida de la serie." },
      { id: "c", text: "Documentos secretos que prueban que Roddenberry era ingeniero encubierto." },
      { id: "d", text: "Similitudes casuales sin conexión histórica documentada." },
    ],
    correct: "b",
    explanation:
      "La influencia está concretamente documentada: inventores como Martin Cooper reconocieron explícitamente haber tomado inspiración de Star Trek para desarrollar tecnologías como el celular portátil.",
    points: 5,
  },
  // La lámpara maravillosa - William Ospina V2 (IDs 141-149)
  {
    id: 141,
    category: "Comprensión Lectora",
    question: "Según el texto, los dos recursos fundamentales que tenemos para navegar la vida son:",
    options: [
      { id: "a", text: "El conocimiento y la razón" },
      { id: "b", text: "La experiencia y la imaginación" },
      { id: "c", text: "Los libros y la educación" },
      { id: "d", text: "La memoria y la inteligencia" },
    ],
    correct: "b",
    explanation:
      "El texto establece claramente que 'para todo eso sólo tenemos dos recursos: la experiencia y la imaginación', siendo estos los medios fundamentales para conocer los dones y prevenir los peligros de la vida.",
    points: 5,
  },
  {
    id: 142,
    category: "Comprensión Lectora",
    question: "La expresión 'el paraíso de los libros' se refiere a:",
    options: [
      { id: "a", text: "Una biblioteca perfecta" },
      { id: "b", text: "Un lugar imaginario donde se escriben libros" },
      { id: "c", text: "Un espacio donde la imaginación permite vivir experiencias prohibidas en la realidad" },
      { id: "d", text: "El cielo de los escritores" },
    ],
    correct: "c",
    explanation:
      "El 'paraíso de los libros' es el espacio imaginativo donde 'está permitido todo aquello que la experiencia prohíbe', permitiendo vivir lo no vivido y escarmentar por cabeza ajena.",
    points: 5,
  },
  {
    id: 143,
    category: "Comprensión Lectora",
    question: "¿A qué obras literarias alude el autor en el segundo párrafo?",
    options: [
      { id: "a", text: "La Odisea, La Ilíada, Romeo y Julieta, Hamlet" },
      { id: "b", text: "Don Quijote, Moby Dick, La metamorfosis, Otelo" },
      { id: "c", text: "Cien años de soledad, El amor en los tiempos del cólera" },
      { id: "d", text: "La Divina Comedia, El Paraíso Perdido" },
    ],
    correct: "b",
    explanation:
      "El texto alude a Don Quijote (hombre que por la lectura quiere ser héroe), Moby Dick (cacería de la ballena blanca), La metamorfosis (hombre que se convierte en escarabajo) y Otelo (hombre celoso que mata a su mujer).",
    points: 5,
  },
  {
    id: 144,
    category: "Comprensión Lectora",
    question: "La referencia a Borges en el texto sirve para:",
    options: [
      { id: "a", text: "Criticar su obra literaria" },
      { id: "b", text: "Ilustrar cómo los libros son una legión de amigos inagotables" },
      { id: "c", text: "Comparar su estilo con otros autores" },
      { id: "d", text: "Explicar su teoría sobre la memoria" },
    ],
    correct: "b",
    explanation:
      "El autor cita a Borges para reforzar la idea de que 'la relación con los libros es... el hallazgo de una legión de amigos que puede ser inagotable', enfatizando la riqueza infinita de la lectura.",
    points: 5,
  },
  {
    id: 145,
    category: "Comprensión Lectora",
    question: "¿Qué relación establece el autor entre soledad, amistad y felicidad?",
    options: [
      { id: "a", text: "Son experiencias mutuamente excluyentes" },
      { id: "b", text: "Solo la amistad conduce a la felicidad" },
      { id: "c", text: "En la relación con los libros las tres experiencias coexisten simultáneamente" },
      { id: "d", text: "La soledad elimina la posibilidad de amistad" },
    ],
    correct: "c",
    explanation:
      "El texto afirma que estas tres experiencias inevitables de la vida 'están juntas' en nuestra relación con los libros, coexistiendo de manera única en el acto de leer.",
    points: 5,
  },
  {
    id: 146,
    category: "Comprensión Lectora",
    question: "La función de 'vivir lo no vivido' y 'recordar memorias de otros' es:",
    options: [
      { id: "a", text: "Confundir nuestra propia experiencia" },
      { id: "b", text: "Ampliar nuestra experiencia a través de la imaginación sin sufrir las consecuencias reales" },
      { id: "c", text: "Olvidar nuestras propias vivencias" },
      { id: "d", text: "Sustituir completamente la experiencia real" },
    ],
    correct: "b",
    explanation:
      "Los libros permiten ampliar nuestra experiencia vital 'escarmentando por cabeza ajena', aprendiendo de las experiencias de otros sin tener que vivirlas directamente con sus riesgos y consecuencias.",
    points: 5,
  },
  {
    id: 147,
    category: "Comprensión Lectora",
    question: "El autor presenta la vida como:",
    options: [
      { id: "a", text: "Solo bendición" },
      { id: "b", text: "Solo tormento" },
      { id: "c", text: "Continuamente bendición y tormento" },
      { id: "d", text: "Ni bendición ni tormento" },
    ],
    correct: "c",
    explanation:
      "El texto comienza afirmando que 'El cuerpo, la vida, el mundo, son continuamente bendición y tormento', reconociendo la dualidad inherente a la experiencia vital.",
    points: 5,
  },
  {
    id: 148,
    category: "Comprensión Lectora",
    question: "¿Qué significa 'los libros nos convierten en el escenario donde ocurren hechos ilustres'?",
    options: [
      { id: "a", text: "Los libros nos hacen famosos" },
      { id: "b", text: "Somos espectadores pasivos de los libros" },
      { id: "c", text: "Al leer, nosotros mismos nos convertimos en el lugar donde suceden las historias" },
      { id: "d", text: "Los libros solo describen escenarios" },
    ],
    correct: "c",
    explanation:
      "La metáfora indica que al leer, nuestra mente se transforma en el espacio donde las historias cobran vida, convirtiéndonos en participantes activos del mundo imaginario del libro.",
    points: 5,
  },
  {
    id: 149,
    category: "Comprensión Lectora",
    question: "El contacto con los libros se describe como 'mágico' porque:",
    options: [
      { id: "a", text: "Los libros contienen hechizos reales" },
      { id: "b", text: "Permite ver y vivir cosas que están más allá de las páginas físicas" },
      { id: "c", text: "Los libros desaparecen al leerlos" },
      { id: "d", text: "Los escritores son magos" },
    ],
    correct: "b",
    explanation:
      "El autor describe como mágico el proceso por el cual 'gracias al libro vemos cosas que están guardadas más allá de sus páginas, vivimos las navegaciones, los conflictos, los crímenes', transformando símbolos en experiencias vividas.",
    points: 5,
  },
  // La insoportable levedad del ser - Milan Kundera V2 (IDs 150-163)
  {
    id: 150,
    category: "Comprensión Lectora",
    question: "Según Nietzsche citado en el texto, la idea del eterno retorno implica que:",
    options: [
      { id: "a", text: "Solo los buenos eventos se repiten" },
      { id: "b", text: "Todo lo vivido se repetirá exactamente igual infinitas veces" },
      { id: "c", text: "Nada se repite jamás" },
      { id: "d", text: "Solo se repiten los errores" },
    ],
    correct: "b",
    explanation:
      "El texto presenta el eterno retorno como la idea de que 'alguna vez haya de repetirse todo tal como lo hemos vivido ya, y que incluso esa repetición haya de repetirse hasta el infinito'.",
    points: 5,
  },
  {
    id: 151,
    category: "Comprensión Lectora",
    question: "Una vida sin retorno, según el texto, es:",
    options: [
      { id: "a", text: "Más valiosa porque es única" },
      { id: "b", text: "Como una sombra, carece de peso y está muerta de antemano" },
      { id: "c", text: "Más significativa que una vida con retorno" },
      { id: "d", text: "La única forma posible de existencia" },
    ],
    correct: "b",
    explanation:
      "El texto afirma que 'una vida que desaparece de una vez para siempre, que no retorna, es como una sombra, carece de peso, está muerta de antemano', indicando su falta de peso moral.",
    points: 5,
  },
  {
    id: 152,
    category: "Comprensión Lectora",
    question: "El ejemplo de la guerra entre Estados africanos en el siglo catorce sirve para ilustrar:",
    options: [
      { id: "a", text: "La importancia de la historia africana" },
      { id: "b", text: "Que eventos sin retorno no tienen peso significativo aunque sean horribles" },
      { id: "c", text: "La crueldad de las guerras antiguas" },
      { id: "d", text: "La superioridad de unas civilizaciones sobre otras" },
    ],
    correct: "b",
    explanation:
      "El autor usa este ejemplo para mostrar cómo eventos terribles que 'no cambiaron en nada la faz de la tierra' pierden significado por su carácter único e irrepetible, ilustrando la levedad de lo que no retorna.",
    points: 5,
  },
  {
    id: 153,
    category: "Comprensión Lectora",
    question: "¿Qué diferencia hace el eterno retorno en la percepción de eventos?",
    options: [
      { id: "a", text: "No hace ninguna diferencia" },
      { id: "b", text: "Los convierte en un bloque que perdura y su estupidez será irreparable" },
      { id: "c", text: "Los hace más ligeros y fáciles de olvidar" },
      { id: "d", text: "Los transforma en eventos positivos" },
    ],
    correct: "b",
    explanation:
      "El texto explica que con el eterno retorno, los eventos 'se convierten en un bloque que sobresale y perdura, y su estupidez será irreparable', adquiriendo un peso moral permanente.",
    points: 5,
  },
  {
    id: 154,
    category: "Comprensión Lectora",
    question: "La actitud de la historiografía francesa hacia Robespierre es posible porque:",
    options: [
      { id: "a", text: "Robespierre era un héroe" },
      { id: "b", text: "Los eventos no volverán a ocurrir, convirtiéndose en meras palabras sin peso" },
      { id: "c", text: "La Revolución francesa fue positiva" },
      { id: "d", text: "No hubo víctimas reales" },
    ],
    correct: "b",
    explanation:
      "El texto explica que la historiografía puede estar orgullosa porque 'habla de algo que ya no volverá a ocurrir, los años sangrientos se convierten en meras palabras... se vuelven más ligeros que una pluma'.",
    points: 5,
  },
  {
    id: 155,
    category: "Comprensión Lectora",
    question: "La 'circunstancia atenuante' de la fugacidad significa que:",
    options: [
      { id: "a", text: "Todo es perdonable porque no se repetirá" },
      { id: "b", text: "Los eventos fugaces son más importantes" },
      { id: "c", text: "El tiempo cura todas las heridas" },
      { id: "d", text: "Solo lo permanente tiene valor" },
    ],
    correct: "a",
    explanation:
      "El texto indica que 'esta circunstancia atenuante es la que nos impide pronunciar condena alguna' porque lo fugaz, al no repetirse, pierde peso moral y es más fácil de perdonar u olvidar.",
    points: 5,
  },
  {
    id: 156,
    category: "Comprensión Lectora",
    question: "¿Qué provocó en el autor ver fotografías de Hitler?",
    options: [
      { id: "a", text: "Solo horror y rechazo" },
      { id: "b", text: "Emoción nostálgica por su infancia, superando el horror de las atrocidades" },
      { id: "c", text: "Indiferencia total" },
      { id: "d", text: "Deseo de venganza" },
    ],
    correct: "b",
    explanation:
      "El autor confiesa que las fotos de Hitler le emocionaron porque 'me habían recordado el tiempo de mi infancia', y se pregunta '¿qué era su muerte [de parientes] en comparación con... un tiempo pasado que no volverá?'",
    points: 5,
  },
  {
    id: 157,
    category: "Comprensión Lectora",
    question: "La 'reconciliación con Hitler' que menciona el autor demuestra:",
    options: [
      { id: "a", text: "Que Hitler no era tan malo" },
      { id: "b", text: "La profunda perversión moral de un mundo sin retorno" },
      { id: "c", text: "Que debemos perdonar a todos" },
      { id: "d", text: "La superioridad de la nostalgia sobre la justicia" },
    ],
    correct: "b",
    explanation:
      "El autor concluye que esta reconciliación 'demuestra la profunda perversión moral que va unida a un mundo basado esencialmente en la inexistencia del retorno, porque... todo está perdonado de antemano'.",
    points: 5,
  },
  {
    id: 158,
    category: "Comprensión Lectora",
    question: "En un mundo sin retorno, según el autor:",
    options: [
      { id: "a", text: "Existe justicia verdadera" },
      { id: "b", text: "Todo está perdonado de antemano y cínicamente permitido" },
      { id: "c", text: "Solo importan las buenas acciones" },
      { id: "d", text: "La moral es más fuerte" },
    ],
    correct: "b",
    explanation:
      "El texto concluye afirmando que en un mundo sin retorno 'todo está perdonado de antemano y, por tanto, todo cínicamente permitido', señalando el colapso de la responsabilidad moral.",
    points: 5,
  },
  {
    id: 159,
    category: "Comprensión Lectora",
    question: "La metáfora del 'crepúsculo de la desaparición' sugiere:",
    options: [
      { id: "a", text: "El fin del día" },
      { id: "b", text: "Que la transitoriedad de todo embellece incluso lo horrible con nostalgia" },
      { id: "c", text: "La muerte física" },
      { id: "d", text: "El inicio de algo nuevo" },
    ],
    correct: "b",
    explanation:
      "Esta metáfora indica que el carácter pasajero de los eventos 'lo baña todo con la magia de la nostalgia', suavizando nuestra percepción incluso de atrocidades como la guillotina.",
    points: 5,
  },
  {
    id: 160,
    category: "Comprensión Lectora",
    question: "¿Por qué Nietzsche dejó 'perplejos' a los demás filósofos?",
    options: [
      { id: "a", text: "Por su estilo de escritura complejo" },
      { id: "b", text: "Por proponer la idea radical del eterno retorno de lo mismo" },
      { id: "c", text: "Por su crítica a la religión" },
      { id: "d", text: "Por su filosofía del superhombre" },
    ],
    correct: "b",
    explanation:
      "El texto indica que los filósofos quedaron perplejos ante la idea del eterno retorno: '¡pensar que alguna vez haya de repetirse todo... hasta el infinito! ¿Qué quiere decir ese mito demencial?'",
    points: 5,
  },
  {
    id: 161,
    category: "Comprensión Lectora",
    question: "El tono del autor en los párrafos personales (6-7) es:",
    options: [
      { id: "a", text: "Objetivo y distante" },
      { id: "b", text: "Confesional y reflexivo" },
      { id: "c", text: "Agresivo y crítico" },
      { id: "d", text: "Optimista y celebratorio" },
    ],
    correct: "b",
    explanation:
      "En los párrafos finales, el autor adopta un tono confesional ('me sorprendí a mí mismo') y reflexivo, compartiendo una experiencia personal perturbadora para ilustrar sus argumentos filosóficos.",
    points: 5,
  },
  {
    id: 162,
    category: "Comprensión Lectora",
    question: "¿Qué rol cumple el cuestionamiento '¿Cómo es posible condenar algo fugaz?'",
    options: [
      { id: "a", text: "Es una pregunta retórica que expone la dificultad moral del no-retorno" },
      { id: "b", text: "Busca una respuesta concreta del lector" },
      { id: "c", text: "Critica a quienes no condenan" },
      { id: "d", text: "Defiende la fugacidad como virtud" },
    ],
    correct: "a",
    explanation:
      "Esta pregunta retórica ilustra el dilema moral central: la imposibilidad de juzgar severamente lo que no se repetirá, revelando la 'perversión moral' de un mundo sin retorno.",
    points: 5,
  },
  {
    id: 163,
    category: "Comprensión Lectora",
    question: "La expresión 'más ligeros que una pluma' se refiere a:",
    options: [
      { id: "a", text: "El peso físico de los objetos históricos" },
      { id: "b", text: "La pérdida de gravedad moral de eventos que no se repetirán" },
      { id: "c", text: "La facilidad de los estudios históricos" },
      { id: "d", text: "La ligereza del aire en Francia" },
    ],
    correct: "b",
    explanation:
      "La metáfora describe cómo los eventos históricos, al no repetirse, 'se vuelven más ligeros que una pluma, no dan miedo', perdiendo su peso y gravedad moral.",
    points: 5,
  },
  // La llama doble - Octavio Paz V2 (IDs 164-173)
  {
    id: 164,
    category: "Comprensión Lectora",
    question: "Según Paz, el erotismo se define como:",
    options: [
      { id: "a", text: "Sexualidad animal sin transformación" },
      { id: "b", text: "Ceremonia y representación, sexualidad transfigurada" },
      { id: "c", text: "Únicamente instinto físico" },
      { id: "d", text: "La negación de la sexualidad" },
    ],
    correct: "b",
    explanation:
      "El texto define claramente que 'el erotismo no es mera sexualidad animal: es ceremonia, representación. El erotismo es sexualidad transfigurada: metáfora'.",
    points: 5,
  },
  {
    id: 165,
    category: "Comprensión Lectora",
    question: "La 'oposición complementaria' entre erotismo y poesía significa que:",
    options: [
      { id: "a", text: "Son completamente diferentes y no se relacionan" },
      { id: "b", text: "Se oponen pero no se complementan" },
      { id: "c", text: "Son opuestos que se necesitan y completan mutuamente" },
      { id: "d", text: "Son exactamente lo mismo" },
    ],
    correct: "c",
    explanation:
      "El concepto de 'oposición complementaria' indica que aunque erotismo (poética corporal) y poesía (erótica verbal) parecen opuestos, en realidad funcionan de manera análoga y se complementan en su operación.",
    points: 5,
  },
  {
    id: 166,
    category: "Comprensión Lectora",
    question: "El lenguaje es definido como:",
    options: [
      { id: "a", text: "Solo sonidos sin significado" },
      { id: "b", text: "Sonido que emite sentidos, trazo material que denota ideas incorpóreas" },
      { id: "c", text: "Un sistema cerrado de símbolos" },
      { id: "d", text: "Una herramienta puramente racional" },
    ],
    correct: "b",
    explanation:
      "Paz caracteriza el lenguaje como 'sonido que emite sentidos, trazo material que denota ideas incorpóreas', resaltando su doble naturaleza material-inmaterial.",
    points: 5,
  },
  {
    id: 167,
    category: "Comprensión Lectora",
    question: "¿Qué capacidad tiene el lenguaje según el texto?",
    options: [
      { id: "a", text: "Solo expresar ideas abstractas" },
      { id: "b", text: "Dar nombre a lo más fugitivo y evanescente: la sensación" },
      { id: "c", text: "Únicamente describir objetos concretos" },
      { id: "d", text: "Expresar solo emociones" },
    ],
    correct: "b",
    explanation:
      "El texto destaca que el lenguaje 'es capaz de dar nombre a lo más fugitivo y evanescente: la sensación', subrayando su poder de capturar lo inefable.",
    points: 5,
  },
  {
    id: 168,
    category: "Comprensión Lectora",
    question: "La imaginación, según Paz, actúa como:",
    options: [
      { id: "a", text: "Un obstáculo para la sexualidad" },
      { id: "b", text: "El agente que transfigura tanto el sexo como el lenguaje" },
      { id: "c", text: "Una distracción del erotismo" },
      { id: "d", text: "Un elemento secundario sin importancia" },
    ],
    correct: "b",
    explanation:
      "El autor afirma que 'El agente que mueve lo mismo al acto erótico que al poético es la imaginación. Es la potencia que transfigura al sexo en ceremonia y rito, al lenguaje en ritmo y metáfora'.",
    points: 5,
  },
  {
    id: 169,
    category: "Comprensión Lectora",
    question: "La afirmación 'la imagen poética es abrazo de realidades opuestas' significa que:",
    options: [
      { id: "a", text: "La poesía solo une cosas similares" },
      { id: "b", text: "La metáfora une elementos contrarios creando algo nuevo" },
      { id: "c", text: "La poesía rechaza las contradicciones" },
      { id: "d", text: "Las realidades opuestas no pueden coexistir" },
    ],
    correct: "b",
    explanation:
      "Esta afirmación expresa que la imagen poética fusiona elementos opuestos, así como la rima es 'cópula de sonidos', creando unidad de los contrarios.",
    points: 5,
  },
  {
    id: 170,
    category: "Comprensión Lectora",
    question: "El ejemplo 'púrpura nevada' de Góngora ilustra que:",
    options: [
      { id: "a", text: "Góngora describía la nieve" },
      { id: "b", text: "La metáfora crea una realidad nueva más allá de sus componentes" },
      { id: "c", text: "La sangre y la nieve son lo mismo" },
      { id: "d", text: "La poesía es simple descripción" },
    ],
    correct: "b",
    explanation:
      "Paz usa este ejemplo para mostrar cómo la metáfora 'inventa o descubre una realidad que, aunque hecha de ambas, no es sangre ni nieve', sino algo completamente nuevo.",
    points: 5,
  },
  {
    id: 171,
    category: "Comprensión Lectora",
    question: "¿Qué hace la poesía con el lenguaje y el mundo?",
    options: [
      { id: "a", text: "Los describe objetivamente" },
      { id: "b", text: "Los erotiza" },
      { id: "c", text: "Los destruye" },
      { id: "d", text: "Los ignora" },
    ],
    correct: "b",
    explanation:
      "El texto afirma que 'la poesía erotiza al lenguaje y al mundo porque ella misma, en su modo de operación, es ya erotismo', estableciendo su naturaleza transformadora.",
    points: 5,
  },
  {
    id: 172,
    category: "Comprensión Lectora",
    question: "La rima es descrita como:",
    options: [
      { id: "a", text: "Simple repetición de sonidos" },
      { id: "b", text: "Cópula de sonidos" },
      { id: "c", text: "Un artificio innecesario" },
      { id: "d", text: "Decoración del poema" },
    ],
    correct: "b",
    explanation:
      "Paz usa un lenguaje erótico para describir la rima como 'cópula de sonidos', estableciendo paralelismo entre la operación poética y la erótica.",
    points: 5,
  },
  {
    id: 173,
    category: "Comprensión Lectora",
    question: "La frase 'el erotismo es una metáfora de la sexualidad animal' implica que:",
    options: [
      { id: "a", text: "El erotismo es idéntico a la sexualidad animal" },
      { id: "b", text: "El erotismo transforma la sexualidad en algo diferente y más elevado" },
      { id: "c", text: "Los animales tienen erotismo" },
      { id: "d", text: "La sexualidad humana es inferior" },
    ],
    correct: "b",
    explanation:
      "Al definir el erotismo como 'metáfora' de la sexualidad animal, Paz indica que el erotismo 'es algo diferente a la mera sexualidad', transformándola en algo cultural y simbólico.",
    points: 5,
  },
  // Boca que busca la boca - Juan Manuel Roca V2 (IDs 174-178)
  {
    id: 174,
    category: "Comprensión Lectora",
    question: "El erotismo, según Roca, implica:",
    options: [
      { id: "a", text: "Dominación de una parte sobre otra" },
      { id: "b", text: "Transgresión con acuerdo mutuo para crear libertad" },
      { id: "c", text: "Obediencia a reglas estrictas" },
      { id: "d", text: "Violencia entre las partes" },
    ],
    correct: "b",
    explanation:
      "El texto afirma que 'El erotismo llama a la transgresión, con un acuerdo entre las partes para crear un espacio de libertad', enfatizando el consenso y la liberación.",
    points: 5,
  },
  {
    id: 175,
    category: "Comprensión Lectora",
    question: "En el encuentro erótico descrito por Roca, no hay:",
    options: [
      { id: "a", text: "Ornamentos rituales" },
      { id: "b", text: "Confesión de deseos" },
      { id: "c", text: "Víctimas ni victimarios" },
      { id: "d", text: "Plegarias" },
    ],
    correct: "c",
    explanation:
      "El texto establece claramente que en este espacio de libertad erótica 'no hay víctimas ni victimarios sino un despojo de potestades', subrayando la igualdad y el consenso.",
    points: 5,
  },
  {
    id: 176,
    category: "Comprensión Lectora",
    question: "Los 'ornamentos rituales' del erotismo incluyen todas las siguientes metáforas religiosas, EXCEPTO:",
    options: [
      { id: "a", text: "La boca es cáliz" },
      { id: "b", text: "El olor es incienso" },
      { id: "c", text: "Las palabras son claves del Paraíso" },
      { id: "d", text: "El cuerpo es sacrificio" },
    ],
    correct: "d",
    explanation:
      "El texto menciona la boca como cáliz, el olor como incienso, y las palabras como claves del Paraíso, pero no presenta el cuerpo como sacrificio, lo cual contradiría la idea de placer mutuo.",
    points: 5,
  },
  {
    id: 177,
    category: "Comprensión Lectora",
    question: "La metáfora del 'pequeño jardín que conduce al Paraíso' sugiere:",
    options: [
      { id: "a", text: "Un jardín real" },
      { id: "b", text: "El espacio erótico como acceso a un estado de plenitud o éxtasis" },
      { id: "c", text: "El Edén bíblico literal" },
      { id: "d", text: "Un parque público" },
    ],
    correct: "b",
    explanation:
      "Esta metáfora presenta el encuentro erótico como un camino hacia una experiencia trascendente, usando el lenguaje religioso del Paraíso para expresar el éxtasis erótico.",
    points: 5,
  },
  {
    id: 178,
    category: "Comprensión Lectora",
    question: "El uso del término cristiano 'confesión' para describir la expresión de deseos sugiere:",
    options: [
      { id: "a", text: "Que el erotismo es pecaminoso" },
      { id: "b", text: "La sacralización del encuentro erótico mediante lenguaje religioso" },
      { id: "c", text: "Que se requiere un sacerdote" },
      { id: "d", text: "El rechazo de la religión" },
    ],
    correct: "b",
    explanation:
      "Roca utiliza conscientemente terminología religiosa ('confesión', 'absueltos', 'cáliz', 'incienso', 'plegarias') para elevar el erotismo a una dimensión sagrada o ritual.",
    points: 5,
  },
  // Delirio - Laura Restrepo V2 (IDs 179-188)
  {
    id: 179,
    category: "Comprensión Lectora",
    question: "¿Cuánto tiempo duró el viaje de Aguilar?",
    options: [
      { id: "a", text: "Una semana" },
      { id: "b", text: "Dos semanas" },
      { id: "c", text: "Cuatro días" },
      { id: "d", text: "Un mes" },
    ],
    correct: "c",
    explanation:
      "El texto menciona explícitamente que fue 'un viaje corto, sólo cuatro días por cosas de trabajo'.",
    points: 5,
  },
  {
    id: 180,
    category: "Comprensión Lectora",
    question: "¿Qué estaba haciendo Agustina cuando Aguilar se fue de viaje?",
    options: [
      { id: "a", text: "Leyendo un libro" },
      { id: "b", text: "Pintando de verde las paredes del apartamento" },
      { id: "c", text: "Visitando a su familia" },
      { id: "d", text: "Trabajando en su oficina" },
    ],
    correct: "b",
    explanation:
      "Aguilar recuerda que cuando se fue 'la dejó pintando de verde las paredes del apartamento', indicando que ella estaba realizando actividades normales.",
    points: 5,
  },
  {
    id: 181,
    category: "Comprensión Lectora",
    question: "¿Dónde encontró Aguilar a su esposa al regresar?",
    options: [
      { id: "a", text: "En su apartamento" },
      { id: "b", text: "En casa de sus padres" },
      { id: "c", text: "En un hotel al norte de la ciudad" },
      { id: "d", text: "En un hospital" },
    ],
    correct: "c",
    explanation:
      "El texto indica que 'la encontré en un hotel, al norte de la ciudad, transformada en un ser aterrado y aterrador'.",
    points: 5,
  },
  {
    id: 182,
    category: "Comprensión Lectora",
    question: "¿Cuánto tiempo lleva Aguilar buscando a Agustina (mentalmente)?",
    options: [
      { id: "a", text: "Cuatro días" },
      { id: "b", text: "Una semana" },
      { id: "c", text: "Catorce días" },
      { id: "d", text: "Un mes" },
    ],
    correct: "c",
    explanation:
      "Aguilar afirma: 'hace ya catorce días que la ando buscando y me va la vida en encontrarla', refiriéndose a su búsqueda de la Agustina que conocía dentro de su mente alterada.",
    points: 5,
  },
  {
    id: 183,
    category: "Comprensión Lectora",
    question: "La actitud de Aguilar hacia las premoniciones de Agustina era:",
    options: [
      { id: "a", text: "De total creencia y respeto" },
      { id: "b", text: "De incredulidad, siempre las pasaba por alto" },
      { id: "c", text: "De miedo y ansiedad" },
      { id: "d", text: "De indiferencia total" },
    ],
    correct: "b",
    explanation:
      "El texto indica que Aguilar 'como siempre, pasó por alto su pronóstico' y menciona su intento de 'hacerla entrar en razón', mostrando su escepticismo sistemático.",
    points: 5,
  },
  {
    id: 184,
    category: "Comprensión Lectora",
    question: "¿Cómo reacciona Agustina cuando Aguilar le pregunta qué pasó?",
    options: [
      { id: "a", text: "Le explica todo con calma" },
      { id: "b", text: "Lo insulta" },
      { id: "c", text: "Llora desconsoladamente" },
      { id: "d", text: "Permanece en silencio" },
    ],
    correct: "b",
    explanation:
      "Aguilar afirma: 'No he podido saber qué le sucedió durante mi ausencia porque si se lo pregunto me insulta', mostrando la hostilidad de su respuesta.",
    points: 5,
  },
  {
    id: 185,
    category: "Comprensión Lectora",
    question: "La metáfora 'Agustina habitara en un plano paralelo al real' significa que:",
    options: [
      { id: "a", text: "Agustina vive en otro país" },
      { id: "b", text: "Su realidad mental está separada pero cercana a la realidad compartida" },
      { id: "c", text: "Agustina es una persona paralela" },
      { id: "d", text: "Agustina vive en el pasado" },
    ],
    correct: "b",
    explanation:
      "Esta metáfora expresa que Agustina existe en una realidad mental propia 'cercana pero inabordable', accesible para ella pero inaccesible para Aguilar.",
    points: 5,
  },
  {
    id: 186,
    category: "Comprensión Lectora",
    question: "La comparación con 'una lengua extranjera que Aguilar vagamente reconoce pero que no logra comprender' se refiere a:",
    options: [
      { id: "a", text: "Que Agustina habla otro idioma" },
      { id: "b", text: "La comunicación incomprensible de Agustina en su estado mental alterado" },
      { id: "c", text: "Que Aguilar es extranjero" },
      { id: "d", text: "Las diferencias culturales entre ellos" },
    ],
    correct: "b",
    explanation:
      "La metáfora expresa la incapacidad de Aguilar para entender a Agustina: sus palabras y comportamiento son familiares pero incomprensibles en su nuevo estado mental.",
    points: 5,
  },
  {
    id: 187,
    category: "Comprensión Lectora",
    question: "La triple comparación con el perro (famélico, malherido, vagabundo) progresa para mostrar:",
    options: [
      { id: "a", text: "Que Agustina es violenta" },
      { id: "b", text: "El deterioro progresivo: de querer volver a casa a olvidar que tuvo una" },
      { id: "c", text: "Que les gusta los perros" },
      { id: "d", text: "Que Agustina necesita comida" },
    ],
    correct: "b",
    explanation:
      "Las tres imágenes muestran una progresión: primero un perro que quiere volver pero no puede, luego uno que ni siquiera recuerda haber tenido casa, ilustrando el empeoramiento del estado de Agustina.",
    points: 5,
  },
  {
    id: 188,
    category: "Comprensión Lectora",
    question: "El narrador describe la situación como:",
    options: [
      { id: "a", text: "Fácil de resolver" },
      { id: "b", text: "Angustiosa a morir y jodidamente difícil" },
      { id: "c", text: "Temporal y pasajera" },
      { id: "d", text: "Divertida y ligera" },
    ],
    correct: "b",
    explanation:
      "Aguilar caracteriza explícitamente la situación como 'angustiosa a morir y jodidamente difícil', usando lenguaje coloquial para expresar su desesperación extrema.",
    points: 5,
  },
  // La loca de la casa - Rosa Montero V2 (IDs 189-198)
  {
    id: 189,
    category: "Comprensión Lectora",
    question: "Las fantasías del escritor pueden ser:",
    options: [
      { id: "a", text: "Solo perezosas" },
      { id: "b", text: "Solo agitadas" },
      { id: "c", text: "Tanto perezosas como agitadas y enfebrecidas" },
      { id: "d", text: "Ni perezosas ni agitadas" },
    ],
    correct: "c",
    explanation:
      "El texto caracteriza las fantasías como 'a veces perezosas como las lentas ensoñaciones de una siesta estival, a veces agitadas y enfebrecidas como el delirio de un loco'.",
    points: 5,
  },
  {
    id: 190,
    category: "Comprensión Lectora",
    question: "¿Cómo describe la autora el funcionamiento de la mente del novelista?",
    options: [
      { id: "a", text: "Está completamente bajo control consciente" },
      { id: "b", text: "Marcha por sí sola, poseída por compulsión fabuladora" },
      { id: "c", text: "No funciona adecuadamente" },
      { id: "d", text: "Solo funciona cuando escribe" },
    ],
    correct: "b",
    explanation:
      "La autora afirma que 'La cabeza del novelista marcha por sí sola; está poseída por una suerte de compulsión fabuladora', indicando su carácter automático e involuntario.",
    points: 5,
  },
  {
    id: 191,
    category: "Comprensión Lectora",
    question: "El ejemplo de la noticia de Argelia sirve para ilustrar:",
    options: [
      { id: "a", text: "La violencia en África" },
      { id: "b", text: "El aspecto negativo de la imaginación descontrolada" },
      { id: "c", text: "La importancia del periodismo" },
      { id: "d", text: "La indiferencia del novelista" },
    ],
    correct: "b",
    explanation:
      "Este ejemplo muestra el lado oscuro de la compulsión fabuladora: 'no puedes evitar que la maldita fantasía se te dispare, recreando... la horripilante escena hasta en sus detalles más insoportables'.",
    points: 5,
  },
  {
    id: 192,
    category: "Comprensión Lectora",
    question: "El ejemplo del puente de troncos demuestra que:",
    options: [
      { id: "a", text: "La autora tiene miedo a las alturas" },
      { id: "b", text: "Imaginar un accidente aumenta la probabilidad de que ocurra" },
      { id: "c", text: "Los puentes son peligrosos" },
      { id: "d", text: "La imaginación es siempre positiva" },
    ],
    correct: "b",
    explanation:
      "El texto explica que 'una vez imaginada la tontería con todos sus pormenores... resulta bastante difícil no cumplirla', sugiriendo que la visualización detallada puede facilitar su ocurrencia.",
    points: 5,
  },
  {
    id: 193,
    category: "Comprensión Lectora",
    question: "¿Qué implica la frase 'a lo mejor lees un día en el periódico'?",
    options: [
      { id: "a", text: "Es una situación única" },
      { id: "b", text: "Es un ejemplo hipotético que ilustra algo recurrente" },
      { id: "c", text: "Solo ocurre al leer el periódico" },
      { id: "d", text: "Es una recomendación" },
    ],
    correct: "b",
    explanation:
      "La expresión 'a lo mejor' introduce un ejemplo hipotético representativo de lo que sucede regularmente con la imaginación del novelista ante estímulos externos.",
    points: 5,
  },
  {
    id: 194,
    category: "Comprensión Lectora",
    question: "Los detalles sensoriales que imagina (gritos, salpicaduras, olor, chasquido) demuestran:",
    options: [
      { id: "a", text: "Que la autora es violenta" },
      { id: "b", text: "La intensidad y especificidad involuntaria de la imaginación del novelista" },
      { id: "c", text: "Que disfruta del horror" },
      { id: "d", text: "Su falta de empatía" },
    ],
    correct: "b",
    explanation:
      "La acumulación de detalles sensoriales específicos ilustra cómo la imaginación del novelista funciona automática y vívidamente, 'recreando... hasta en sus detalles más insoportables'.",
    points: 5,
  },
  {
    id: 195,
    category: "Comprensión Lectora",
    question: "La referencia al 'descoloque espacial que produce toda caída' muestra:",
    options: [
      { id: "a", text: "Conocimiento físico abstracto" },
      { id: "b", text: "Experiencia corporal vivida o imaginada con precisión" },
      { id: "c", text: "Estudios científicos sobre la gravedad" },
      { id: "d", text: "Teorías filosóficas sobre el espacio" },
    ],
    correct: "b",
    explanation:
      "Este detalle específico sobre la desorientación espacial revela conocimiento experiencial o imaginativo profundo del fenómeno de caer, característico de la mente fabuladora.",
    points: 5,
  },
  {
    id: 196,
    category: "Comprensión Lectora",
    question: "La 'enojosa tendencia a despanzurrarme' resulta de:",
    options: [
      { id: "a", text: "Falta de coordinación física" },
      { id: "b", text: "La profecía autocumplida de imaginar la caída detalladamente" },
      { id: "c", text: "No prestar atención al caminar" },
      { id: "d", text: "La mala suerte" },
    ],
    correct: "b",
    explanation:
      "La autora establece una relación causal: después de imaginar la caída con todos sus detalles, 'resulta bastante difícil no cumplirla', convirtiéndose en profecía autocumplida.",
    points: 5,
  },
  {
    id: 197,
    category: "Comprensión Lectora",
    question: "El adjetivo 'patosamente' en 'bracear en el aire patosamente' connota:",
    options: [
      { id: "a", text: "Elegancia y gracia" },
      { id: "b", text: "Falta de control y torpeza, añadiendo humillación a la caída" },
      { id: "c", text: "Fuerza y determinación" },
      { id: "d", text: "Indiferencia ante la situación" },
    ],
    correct: "b",
    explanation:
      "'Patosamente' connota torpeza y falta de dignidad, amplificando la humillación ('oprobio') de la caída imaginada, lo que ilustra cómo la imaginación no se detiene en lo básico sino que añade detalles mortificantes.",
    points: 5,
  },
  {
    id: 198,
    category: "Comprensión Lectora",
    question: "La estructura 'Por ejemplo... O bien...' sirve para:",
    options: [
      { id: "a", text: "Confundir al lector" },
      { id: "b", text: "Presentar dos ejemplos contrastantes de la compulsión fabuladora" },
      { id: "c", text: "Cambiar de tema abruptamente" },
      { id: "d", text: "Concluir el argumento" },
    ],
    correct: "b",
    explanation:
      "Esta estructura presenta dos ejemplos contrastantes: uno trágico (Argelia) y otro ridículo (el puente), ilustrando cómo la compulsión fabuladora opera en diferentes registros, siempre siendo simultáneamente don y castigo.",
    points: 5,
  },
]

export function RazonamientoTest() {
  const [selectedVersion, setSelectedVersion] = useState<"v1" | "v2">("v1")
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const questions = selectedVersion === "v1" ? questionsV1 : questionsV2
  const readings = selectedVersion === "v1" ? readingsV1 : readingsV2

  const totalScore = useMemo(() => questions.reduce((sum, q) => sum + q.points, 0), [questions])

  // Separar preguntas con lectura de las demás
  const questionsWithReadings = useMemo(() => {
    const readingQuestionIds = new Set(readings.flatMap(r => r.questionIds))
    return questions.filter(q => readingQuestionIds.has(q.id))
  }, [questions, readings])

  const questionsWithoutReadings = useMemo(() => {
    const readingQuestionIds = new Set(readings.flatMap(r => r.questionIds))
    return questions.filter(q => !readingQuestionIds.has(q.id))
  }, [questions, readings])

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

  // Agrupar preguntas sin lectura por categoría
  const groupedQuestionsWithoutReadings = questionsWithoutReadings.reduce((acc, question) => {
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

      {/* Renderizar lecturas completas con sus preguntas */}
      {readings.map((reading) => {
        const readingQuestions = questions.filter(q => reading.questionIds.includes(q.id))

        return (
          <div key={reading.id} className="space-y-4">
            {/* Lectura completa */}
            <Card className="border-primary/40 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg shadow-primary/20 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  {reading.title}
                </CardTitle>
                <CardDescription>
                  Lee cuidadosamente el siguiente texto antes de responder las preguntas asociadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-primary/30 bg-white/90 px-6 py-5">
                  <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">
                    {reading.text}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Preguntas de esta lectura */}
            <div className="pl-4 border-l-4 border-primary/30 space-y-4">
              <div className="flex items-center gap-2 px-2">
                <div className="h-1 w-8 bg-primary/40 rounded-full" />
                <h4 className="text-base font-semibold text-primary">
                  Preguntas sobre: {reading.title.replace(/^Lectura \d+: /, '')}
                </h4>
                <div className="h-1 flex-1 bg-primary/40 rounded-full" />
              </div>

              {readingQuestions.map((question) => {
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
          </div>
        )
      })}

      {/* Renderizar preguntas sin lectura agrupadas por categoría */}
      {Object.entries(groupedQuestionsWithoutReadings).map(([category, categoryQuestions]) => (
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
