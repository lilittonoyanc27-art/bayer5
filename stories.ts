export interface TextSegment {
  text: string;
  isVerb?: boolean;
  verbId?: string; // Reference to VERBS_DATA item if available
  explanation?: string; // Optional custom note
  translation?: string; // Quick translation if verbId is not used or to customize
}

export interface StoryParagraph {
  segments: TextSegment[];
  translationArmenian: string;
}

export interface Story {
  id: string;
  titleEs: string;
  titleHy: string;
  descriptionEs: string;
  descriptionHy: string;
  paragraphs: StoryParagraph[];
}

export const STORIES_DATA: Story[] = [
  {
    id: "1",
    titleEs: "Un día ocupado en Madrid",
    titleHy: "Զբաղված օր Մադրիդում",
    descriptionEs: "Sigue la rutina de Clara mientras estudia, va de compras y se divierte.",
    descriptionHy: "Հետևեք Կլարայի առօրյային, երբ նա սովորում է, գնումների գնում և զվարճանում:",
    paragraphs: [
      {
        segments: [
          { text: "Hoy Clara tiene que ", isVerb: true, verbId: "90", explanation: "tiene que (tener que) - պետք է անի, Present tense: Clara tiene que (Կլարան պետք է)" },
          { text: "levantarse ", isVerb: true, verbId: "277", explanation: "levantarse - վեր կենալ, Reflexive verb, Clara se levanta" },
          { text: "muy temprano. Primero, decide ", isVerb: true, verbId: "76", explanation: "decidir - որոշել, Present tense: (նա) որոշում է" },
          { text: "desayunar ", isVerb: true, verbId: "223", explanation: "desayunar - նախաճաշել, regular -AR verb" },
          { text: "café con leche y pan tostado. Después, va a ", isVerb: true, verbId: "10", explanation: "ir a... - գնալ... Clara va a (Կլարան գնում է...)" },
          { text: "limpiar ", isVerb: true, verbId: "195", explanation: "limpiar - մաքրել, regular -AR verb" },
          { text: "su habitación y ", isVerb: false },
          { text: "lavar ", isVerb: true, verbId: "177", explanation: "lavar - լվանալ, regular -AR verb" },
          { text: "la ropa." }
        ],
        translationArmenian: "Այսօր Կլարան պետք է շատ վաղ վեր կենա: Նախ, նա որոշում է նախաճաշել կաթով սուրճ և տոստ: Հետո նա պատրաստվում է մաքրել իր սենյակը և լվանալ հագուստը:"
      },
      {
        segments: [
          { text: "A las diez de la mañana, Clara sale para ", isVerb: true, verbId: "11", explanation: "ir a clase - դասի գնալ, Clara va a clase" },
          { text: "ir a clase. ", isVerb: true, verbId: "11" },
          { text: "Allí le gusta ", isVerb: true, verbId: "7", explanation: "gustar - դուր գալ, le gusta - նրան դուր է գալիս" },
          { text: "aprender ", isVerb: true, verbId: "26", explanation: "aprender - սովորել, regular -ER verb" },
          { text: "cosas nuevas. El profesor suele ", isVerb: true, verbId: "45", explanation: "soler - սովորաբար անել, present tense: suele (սովորաբար...)" },
          { text: "explicar ", isVerb: true, verbId: "137", explanation: "explicar - բացատրել, regular -AR verb" },
          { text: "la gramática con ejemplos fáciles y siempre está listo para ", isVerb: true, verbId: "135", explanation: "estar listo para - պատրաստ լինել" },
          { text: "ayudar ", isVerb: true, verbId: "6", explanation: "ayudar - օգնել, regular -AR verb" },
          { text: "a los estudiantes si alguien tiene dudas." }
        ],
        translationArmenian: "Առավոտյան ժամը տասին Կլարան դուրս է գալիս դասի գնալու համար: Այնտեղ նրան դուր է գալիս նոր բաներ սովորել: Ուսուցիչը սովորաբար բացատրում է քերականությունը հեշտ օրինակներով և միշտ պատրաստ է օգնել ուսանողներին, եթե ինչ-որ մեկը կասկածներ ունի:"
      },
      {
        segments: [
          { text: "Por la tarde, Clara queda con su amiga Sofía para ", isVerb: true, verbId: "95", explanation: "quedar con alguien - պայմանավորվել / հանդիպել ինչ-որ մեկի հետ" },
          { text: "ir de compras. ", isVerb: true, verbId: "15", explanation: "ir de compras - գնումների գնալ" },
          { text: "Quieren ", isVerb: true, verbId: "8", explanation: "querer - ուզել / սիրել, Present: quieren (ուզում են)" },
          { text: "comprar ", isVerb: true, verbId: "4", explanation: "comprar - գնել, regular -AR verb" },
          { text: "ropa nueva porque pronto van a ", isVerb: true, verbId: "20", explanation: "irse de voyage - ճանապարհորդության գնալ, van a irse de viaje (ճանապարհորդության են գնալու)" },
          { text: "irse de viaje. ", isVerb: true, verbId: "20" },
          { text: "A Clara le encanta ", isVerb: true, verbId: "5", explanation: "encantar - շատ դուր գալ, le encanta (շատ դուր է գալիս)" },
          { text: "probarse ", isVerb: true, verbId: "109", explanation: "probarse - փորձել հագուստը, reflexive verb" },
          { text: "vestidos elegantes. Después del centro comercial, deciden ", isVerb: true, verbId: "76" },
          { text: "tomar algo ", isVerb: true, verbId: "224", explanation: "tomar algo - ինչ-որ բան խմել / ուտել" },
          { text: "en un café cercano para descansar." }
        ],
        translationArmenian: "Կեսօրից հետո Կլարան հանդիպում է իր ընկերուհի Սոֆիային՝ գնումների գնալու համար: Նրանք ցանկանում են նոր հագուստ գնել, քանի որ շուտով ճանապարհորդության են գնալու: Կլարային շատ է դուր գալիս նրբագեղ զգեստներ փորձելը: Առևտրի կենտրոնից հետո նրանք որոշում են ինչ-որ բան խմել մոտակա սրճարանում՝ հանգստանալու համար:"
      },
      {
        segments: [
          { text: "Por la noche, van a ", isVerb: true, verbId: "14", explanation: "irse de fiesta - երեկույթի գնալ, van a irse de fiesta" },
          { text: "irse de fiesta. ", isVerb: true, verbId: "14" },
          { text: "Se visten ", isVerb: true, verbId: "262", explanation: "vestirse - հագնվել, reflexive stem-changing, present tense: se visten (նրանք հագնվում են)" },
          { text: "muy guapas. En el club pueden ", isVerb: true, verbId: "217", explanation: "poder - կարողանալ, present tense: pueden (կարող են)" },
          { text: "cantar, ", isVerb: true, verbId: "54", explanation: "cantar - երգել, regular -AR verb" },
          { text: "bailar y ", isVerb: false },
          { text: "divertirse ", isVerb: true, verbId: "255", explanation: "divertirse - զվարճանալ, reflexive verb (ե-ie)" },
          { text: "mucho. Clara se lo pasa muy bien y al final decide ", isVerb: true, verbId: "254", explanation: "pasárselo bien - լավ ժամանակ անցկացնել" },
          { text: "regresar ", isVerb: true, verbId: "243", explanation: "regresar - վերադառնալ, regular -AR verb" },
          { text: "a casa en taxi. Cuando llega, se acuesta y decide ", isVerb: true, verbId: "270", explanation: "acostarse - պառկել քնելու, reflexive (o-ue), se acuesta" },
          { text: "dormirse ", isVerb: true, verbId: "259", explanation: "dormirse - քնել / քուն մտնել" },
          { text: "inmediatamente." }
        ],
        translationArmenian: "Երեկոյան նրանք պատրաստվում են երեկույթի գնալ: Նրանք շատ գեղեցիկ են հագնվում: Ակումբում նրանք կարող են երգել, պարել և շատ զվարճանալ: Կլարան շատ լավ ժամանակ է անցկացնում և վերջում որոշում է տաքսիով տուն վերադառնալ: Երբ հասնում է, պառկում է քնելու և անմիջապես քնում է:"
      }
    ]
  },
  {
    id: "2",
    titleEs: "Preparando las vacaciones de verano",
    titleHy: "Ամառային արձակուրդների պատրաստություն",
    descriptionEs: "Aprende verbos para viajar, reservar hoteles y organizar el equipaje.",
    descriptionHy: "Սովորեք ճանապարհորդելու, հյուրանոցներ ամրագրելու և ուղեբեռը կազմակերպելու բայերը:",
    paragraphs: [
      {
        segments: [
          { text: "David quiere ", isVerb: true, verbId: "8", explanation: "querer - ուզել / սիրել, David quiere (Դավիթը ուզում է)" },
          { text: "irse de vacaciones ", isVerb: true, verbId: "19", explanation: "irse de vacaciones - արձակուրդ գնալ" },
          { text: "este año a Barcelona. Para organizar todo bien, David tiene que ", isVerb: true, verbId: "200", explanation: "organizar - կազմակերպել, regular -AR verb" },
          { text: "hacer ", isVerb: true, verbId: "139", explanation: "hacer - անել / պատրաստել, irregular" },
          { text: "una lista de tareas. Lo primero es ", isVerb: false },
          { text: "reservar ", isVerb: true, verbId: "247", explanation: "reservar - ամրագրել, regular -AR verb" },
          { text: "un hotel agradable cerca de la playa y ", isVerb: false },
          { text: "comprar ", isVerb: true, verbId: "4", explanation: "comprar - գնել, regular -AR" },
          { text: "los billetes de avión." }
        ],
        translationArmenian: "Դավիթն այս տարի ցանկանում է արձակուրդ գնալ Բարսելոնա։ Ամեն ինչ լավ կազմակերպելու համար Դավիթը պետք է անելիքների ցուցակ կազմի: Առաջին հերթին անհրաժեշտ է ամրագրել հաճելի հյուրանոց ծովափի մոտ և գնել ինքնաթիռի տոմսերը:"
      },
      {
        segments: [
          { text: "Antes de salir de viaje, David debe ", isVerb: false },
          { text: "preparar ", isVerb: true, verbId: "225", explanation: "preparar - պատրաստել, regular -AR verb" },
          { text: "su maleta. Piensa en ", isVerb: true, verbId: "211", explanation: "pensar en - մտածել ինչ-որ բանի մասին, David piensa en... (Դավիթը մտածում է...)" },
          { text: "llevar ", isVerb: true, verbId: "23", explanation: "llevar - տանել / կրել, regular -AR verb" },
          { text: "ropa ligera porque allí va a ", isVerb: false },
          { text: "hacer calor. ", isVerb: true, verbId: "142", explanation: "hacer calor - շոգ լինել, va a hacer calor (շոգ է լինելու)" },
          { text: "También quiere ", isVerb: true, verbId: "8" },
          { text: "tomar el sol ", isVerb: true, verbId: "275", explanation: "tomar el sol - արևայրուք ընդունել" },
          { text: "en la playa para ", isVerb: false },
          { text: "ponerse moreno ", isVerb: true, verbId: "51", explanation: "ponerse moreno - արևահարվել / թխանալ, reflexive phrase" },
          { text: "durante sus vacaciones. Para estar seguro de no ", isVerb: false },
          { text: "olvidar ", isVerb: true, verbId: "202", explanation: "olvidar - մոռանալ, regular -AR verb" },
          { text: "nada, escribe todo en una libreta." }
        ],
        translationArmenian: "Ճանապարհորդության մեկնելուց առաջ Դավիթը պետք է ճամպրուկ պատրաստի։ Նա մտածում է թեթև հագուստ տանելու մասին, քանի որ այնտեղ շոգ է լինելու։ Նա նաև ցանկանում է արևայրուք ընդունել լողափում, որպեսզի թխանա արձակուրդի ժամանակ։ Ոչինչ չմոռանալու մեջ համոզված լինելու համար նա ամեն ինչ գրում է տետրում:"
      },
      {
        segments: [
          { text: "Ya en el aeropuerto, David tiene que ", isVerb: true, verbId: "90" },
          { text: "facturar el equipaje ", isVerb: true, verbId: "105", explanation: "facturar el equipaje - ուղեբեռը հանձնել" },
          { text: "en el mostrador. Después de pasar los controles de seguridad, por fin puede ", isVerb: true, verbId: "217", explanation: "poder - կարողանալ, present tense: puede (կարող է)" },
          { text: "subir ", isVerb: true, verbId: "186", explanation: "subir - բարձրանալ, regular -IR verb" },
          { text: "al avión. Durante el vuelo le gusta de verdad ", isVerb: false },
          { text: "disfrutar de ", isVerb: true, verbId: "229", explanation: "disfrutar de - վայելել" },
          { text: "las vistas y ", isVerb: false },
          { text: "descansar ", isVerb: true, verbId: "285", explanation: "descansar - հանգստանալ, regular -AR verb" },
          { text: "tranquilamente de todo el estrés de la ciudad." }
        ],
        translationArmenian: "Արդեն օդանավակայանում Դավիթը պետք է ուղեբեռը հանձնի սպասարկման կետում: Անվտանգության հսկողությունը անցնելուց հետո նա վերջապես կարող է ինքնաթիռ բարձրանալ: Թռիչքի ժամանակ նրան իրոք դուր է գալիս վայելել տեսարանները և հանգիստ հանգստանալ քաղաքի ողջ սթրեսից:"
      }
    ]
  },
  {
    id: "3",
    titleEs: "Buscando trabajo y estudiando",
    titleHy: "Աշխատանքի փնտրում և ուսում",
    descriptionEs: "Acompaña a Miguel en su camino para conseguir un buen empleo.",
    descriptionHy: "Ուղեկցեք Միգելին իր ճանապարհին՝ լավ աշխատանք գտնելու համար:",
    paragraphs: [
      {
        segments: [
          { text: "Miguel está en el instituto ", isVerb: true, verbId: "125", explanation: "estar en el instituto - դպրոցում / ինստիտուտում սովորել" },
          { text: "y estudia informática. A él le mola mucho ", isVerb: true, verbId: "136", explanation: "molar - շատ դուր գալ / լավը լինել, present: le mola (իրեն շատ դուր է գալիս)" },
          { text: "desarrollar ", isVerb: true, verbId: "88", explanation: "desarrollar - զարգացնել, regular -AR verb" },
          { text: "páginas web y programas útiles. Para mejorar su currículum y ", isVerb: false },
          { text: "aprender ", isVerb: true, verbId: "26" },
          { text: "más, quiere ", isVerb: true, verbId: "8" },
          { text: "hacer unas prácticas ", isVerb: true, verbId: "148", explanation: "hacer unas prácticas - պրակտիկա անցնել" },
          { text: "en una gran empresa de tecnología." }
        ],
        translationArmenian: "Միգելը սովորում է ինստիտուտում և ուսումնասիրում է ինֆորմատիկա: Նրան շատ է դուր գալիս վեբ կայքեր և օգտակար ծրագրեր զարգացնելը: Իր ինքնակենսագրականը բարելավելու և ավելի շատ սովորելու համար նա ցանկանում է պրակտիկա անցնել տեխնոլոգիական խոշոր ընկերությունում:"
      },
      {
        segments: [
          { text: "Todos los días, Miguel entra en Internet para ", isVerb: false },
          { text: "buscar ", isVerb: true, verbId: "56", explanation: "buscar - փնտրել, regular -AR verb" },
          { text: "ofertas de empleo. Él necesita ", isVerb: true, verbId: "39", explanation: "necesitar - կարիք ունենալ, Present tense: necesita (ունի կարիք)" },
          { text: "encontrar ", isVerb: true, verbId: "310", explanation: "encontrar - գտնել, stem-changing (o-ue), present: encuentra" },
          { text: "un puesto de trabajo a tiempo parcial para poder pagar sus estudios. Hoy quiere ", isVerb: false },
          { text: "enviar ", isVerb: false, translation: "enviar - ուղարկել, regular -AR verb" },
          { text: "su candidatura. Su amigo le aconseja ", isVerb: true, verbId: "66", explanation: "aconsejar - խորհուրդ տալ, Present: aconseja (խորհուրդ է տալիս)" },
          { text: "no preocuparse, ", isVerb: true, verbId: "290", explanation: "preocuparse - անհանգստանալ, reflexive verb" },
          { text: "ya que él confía en ", isVerb: true, verbId: "40", explanation: "confiar en - վստահել, present tense: confía en (վստահում է)" },
          { text: "su talento y cree que todo va a ", isVerb: false },
          { text: "ir bien. ", isVerb: true, verbId: "12", explanation: "ir bien / mal - լավ / վատ ստացվել, va a ir bien (լավ է ստացվելու)" }
        ],
        translationArmenian: "Ամեն օր Միգելը մտնում է համացանց՝ աշխատանքի հայտարարություններ փնտրելու համար: Նրան անհրաժեշտ է գտնել կես դրույքով աշխատանք, որպեսզի կարողանա վճարել իր ուսման համար: Այսօր նա ցանկանում է ուղարկել իր թեկնածությունը։ Նրա ընկերն իրեն խորհուրդ է տալիս չանհանգստանալ, քանի որ վստահում է նրա տաղանդին և հավատում է, որ ամեն ինչ լավ է ստացվելու:"
      },
      {
        segments: [
          { text: "Si Miguel tiene éxito y consigue ", isVerb: true, verbId: "32", explanation: "conseguir - կարողանալ / հասնել արդյունքի, present tense: consigue (հասնում է)" },
          { text: "el trabajo, podrá ", isVerb: false },
          { text: "ganar ", isVerb: true, verbId: "154", explanation: "ganar - հաղթել / վաստակել, regular -AR verb" },
          { text: "su propio dinero y ayudar a su familia. Su gran sueño es ", isVerb: false },
          { text: "montar un negocio ", isVerb: true, verbId: "188", explanation: "montar un negocio - բիզնես հիմնել" },
          { text: "en el futuro y desarrollar software innovador para todo el mundo. Él sabe que para ", isVerb: false },
          { text: "establecer ", isVerb: true, verbId: "111", explanation: "establecer - հաստատել / սահմանել, regular -ER verb with c-zc in first person present" },
          { text: "relaciones de negocios excelentes tiene que ", isVerb: false },
          { text: "trabajar ", isVerb: true, verbId: "309", explanation: "trabajar - աշխատել, regular -AR verb" },
          { text: "muy duro cada día." }
        ],
        translationArmenian: "Եթե Միգելին հաջողվի և նա ստանա աշխատանքը, նա կկարողանա իր սեփական գումարը վաստակել և օգնել իր ընտանիքին: Նրա մեծ երազանքն է ապագայում բիզնես հիմնել և նորարարական ծրագրային ապահովում մշակել ամբողջ աշխարհի համար։ Նա գիտի, որ գերազանց գործարար հարաբերություններ հաստատելու համար պետք է ամեն օր շատ քրտնաջան աշխատի:"
      }
    ]
  }
];
