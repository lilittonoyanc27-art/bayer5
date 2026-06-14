export type TenseType = 'present' | 'past' | 'future';
export type PronounType = 'Yo' | 'Tú' | 'Él / Ella' | 'Nosotros' | 'Vosotros' | 'Ellos / Ellas';

export interface ConjugationResult {
  conjugated: string;
  isIrregular: boolean;
  explanation?: string;
  originalVerb: string;
}

// Pronoun map
export const PRONOUN_LABELS: Record<PronounType, string> = {
  'Yo': 'Yo (Ես)',
  'Tú': 'Tú (Դուն)',
  'Él / Ella': 'Él / Ella (Նա)',
  'Nosotros': 'Nosotros (Մենք)',
  'Vosotros': 'Vosotros (Դուք)',
  'Ellos / Ellas': 'Ellos / Ellas (Նրանք)',
};

export const TENSE_LABELS: Record<TenseType, { es: string; hy: string }> = {
  'present': { es: 'Presente', hy: 'Ներկա ժամանակ' },
  'past': { es: 'Pretérito Indefinido', hy: 'Անցյալ կատարյալ' },
  'future': { es: 'Futuro Simple', hy: 'Ապառնի ժամանակ' }
};

// Irregular verbs dictionary for 3 tenses
// Indexing: [tense][pronounIndex] where pronounIndex: 0=Yo, 1=Tú, 2=Él/Ella, 3=Nosotros, 4=Vosotros, 5=Ellos/Ellas
interface IrregularConjugations {
  present: string[];
  past: string[];
  future: string[];
}

const IRREGULAR_VERBS: Record<string, IrregularConjugations> = {
  'ser': {
    present: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
    past: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
    future: ['seré', 'serás', 'será', 'seremos', 'seréis', 'serán']
  },
  'estar': {
    present: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
    past: ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron'],
    future: ['estaré', 'estarás', 'estará', 'estaremos', 'estaréis', 'estarán']
  },
  'ir': {
    present: ['voy', 'vas', 'va', 'vamos', 'vais', 'van'],
    past: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
    future: ['iré', 'irás', 'irá', 'iremos', 'iréis', 'irán']
  },
  'irse': {
    present: ['me voy', 'te vas', 'se va', 'nos vamos', 'os vais', 'se van'],
    past: ['me fui', 'te fuiste', 'se fue', 'nos fuimos', 'os fuisteis', 'se fueron'],
    future: ['me iré', 'te irás', 'se irá', 'nos iremos', 'os iréis', 'se irán']
  },
  'tener': {
    present: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'],
    past: ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron'],
    future: ['tendré', 'tendrás', 'tendrá', 'tendremos', 'tendréis', 'tendrán']
  },
  'hacer': {
    present: ['hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen'],
    past: ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'],
    future: ['haré', 'harás', 'hará', 'haremos', 'haréis', 'harán']
  },
  'decir': {
    present: ['digo', 'dices', 'dice', 'decimos', 'decís', 'dicen'],
    past: ['dije', 'dijiste', 'dijo', 'dijimos', 'dijisteis', 'dijeron'],
    future: ['diré', 'dirás', 'dirá', 'diremos', 'diréis', 'dirán']
  },
  'poder': {
    present: ['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'],
    past: ['pude', 'pudiste', 'pudo', 'pudimos', 'pudisteis', 'pudieron'],
    future: ['podré', 'podrás', 'podrá', 'podremos', 'podréis', 'podrán']
  },
  'querer': {
    present: ['quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren'],
    past: ['quise', 'quisiste', 'quiso', 'quisimos', 'quisisteis', 'quisieron'],
    future: ['querré', 'querrás', 'querrá', 'querremos', 'querréis', 'querrán']
  },
  'saber': {
    present: ['sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben'],
    past: ['supe', 'supiste', 'supo', 'supimos', 'supisteis', 'supieron'],
    future: ['sabré', 'sabrás', 'sabrá', 'sabremos', 'sabréis', 'sabrán']
  },
  'ver': {
    present: ['veo', 'ves', 've', 'vemos', 'veis', 'ven'],
    past: ['vi', 'viste', 'vio', 'vimos', 'visteis', 'vieron'],
    future: ['veré', 'verás', 'verá', 'veremos', 'veréis', 'verán']
  },
  'dar': {
    present: ['doy', 'das', 'da', 'damos', 'dais', 'dan'],
    past: ['di', 'diste', 'dio', 'dimos', 'disteis', 'dieron'],
    future: ['daré', 'darás', 'dará', 'daremos', 'daréis', 'darán']
  },
  'venir': {
    present: ['vengo', 'vienes', 'viene', 'venimos', 'venís', 'vienen'],
    past: ['vine', 'viniste', 'vino', 'vinimos', 'vinisteis', 'vinieron'],
    future: ['vendré', 'vendrás', 'vendrá', 'vendremos', 'vendréis', 'vendrán']
  },
  'traer': {
    present: ['traigo', 'traes', 'trae', 'traemos', 'traéis', 'traen'],
    past: ['traje', 'trajiste', 'trajo', 'trajimos', 'trajisteis', 'trajeron'],
    future: ['traeré', 'traerás', 'traerá', 'traeremos', 'traeréis', 'traerán']
  },
  'dormir': {
    present: ['duermo', 'duermes', 'duerme', 'dormimos', 'dormís', 'duermen'],
    past: ['dormí', 'dormiste', 'durmió', 'dormimos', 'dormisteis', 'durmieron'],
    future: ['dormiré', 'dormirás', 'dormirá', 'dormiremos', 'dormiréis', 'dormirán']
  },
  'dormirse': {
    present: ['me duermo', 'te duermes', 'se duerme', 'nos dormimos', 'os dormís', 'se duermen'],
    past: ['me dormí', 'te dormiste', 'se durmió', 'nos dormimos', 'os dormisteis', 'se durmieron'],
    future: ['me dormiré', 'te dormirás', 'se dormirá', 'nos dormiremos', 'os dormiréis', 'se dormirán']
  },
  'pedir': {
    present: ['pido', 'pides', 'pide', 'pedimos', 'pedís', 'piden'],
    past: ['pedí', 'pediste', 'pidió', 'pedimos', 'pedisteis', 'pidieron'],
    future: ['pediré', 'pediré', 'pedirá', 'pediremos', 'pediréis', 'pedirán']
  },
  'elegir': {
    present: ['elijo', 'eliges', 'elige', 'elegimos', 'elegís', 'eligen'],
    past: ['elegí', 'elegiste', 'eligió', 'elegimos', 'elegisteis', 'eligieron'],
    future: ['elegiré', 'elegirás', 'elegirá', 'elegiremos', 'elegiréis', 'elegirán']
  },
  'seguir': {
    present: ['sigo', 'sigues', 'sigue', 'seguimos', 'seguís', 'siguen'],
    past: ['seguí', 'seguiste', 'siguió', 'seguimos', 'seguisteis', 'siguieron'],
    future: ['seguiré', 'seguirás', 'seguirá', 'seguiremos', 'seguiréis', 'seguirán']
  },
  'volver': {
    present: ['vuelvo', 'vuelves', 'vuelve', 'volvemos', 'volvéis', 'vuelven'],
    past: ['volví', 'volviste', 'volvió', 'volvimos', 'volvisteis', 'volvieron'],
    future: ['volveré', 'volverás', 'volverá', 'volveremos', 'volveréis', 'volverán']
  },
  'volverse': {
    present: ['me vuelvo', 'te vuelves', 'se vuelve', 'nos volvemos', 'os volvéis', 'se vuelven'],
    past: ['me volví', 'te volviste', 'se volvió', 'nos volvimos', 'os volvisteis', 'se volvieron'],
    future: ['me volveré', 'te volverás', 'se volverá', 'nos volveremos', 'os volveréis', 'se volverán']
  },
  'sentirse': {
    present: ['me siento', 'te sientes', 'se siente', 'nos sentimos', 'os sentís', 'se sienten'],
    past: ['me sentí', 'te sentiste', 'se sintió', 'nos sentimos', 'os sentisteis', 'se sintieron'],
    future: ['me sentiré', 'te sentirás', 'se sentirá', 'nos sentiremos', 'os sentiréis', 'se sentirán']
  },
  'sentarse': {
    present: ['me siento', 'te sientas', 'se sienta', 'nos sentamos', 'os sentáis', 'se sientan'],
    past: ['me senté', 'te sentaste', 'se sentó', 'nos sentamos', 'os sentasteis', 'se sentaron'],
    future: ['me sentaré', 'te sentarás', 'se sentará', 'nos sentaremos', 'os sentaréis', 'se sentarán']
  },
  'acostarse': {
    present: ['me acuesto', 'te acuestas', 'se acuesta', 'nos acostamos', 'os acostáis', 'se acuestan'],
    past: ['me acosté', 'te acostaste', 'se acostó', 'nos acostamos', 'os acostasteis', 'se acostaron'],
    future: ['me acostaré', 'te acostarás', 'se acostará', 'nos acostaremos', 'os acostaréis', 'se acostarán']
  },
  'sentir': {
    present: ['siento', 'sientes', 'siente', 'sentimos', 'sentís', 'sienten'],
    past: ['sentí', 'sentiste', 'sintió', 'sentimos', 'sentisteis', 'sintieron'],
    future: ['sentiré', 'sentirás', 'sentirá', 'sentiremos', 'sentiréis', 'sentirán']
  },
  'empezar': {
    present: ['empiezo', 'empiezas', 'empieza', 'empezamos', 'empezáis', 'empiezan'],
    past: ['empecé', 'empezaste', 'empezó', 'empezamos', 'empezasteis', 'empezaron'],
    future: ['empezaré', 'empezarás', 'empezará', 'empezaremos', 'empezaréis', 'empezarán']
  }
};

const PRONOUN_INDEX_MAP: Record<PronounType, number> = {
  'Yo': 0,
  'Tú': 1,
  'Él / Ella': 2,
  'Nosotros': 3,
  'Vosotros': 4,
  'Ellos / Ellas': 5
};

const REFLEXIVE_PRONOUNS: Record<PronounType, string> = {
  'Yo': 'me',
  'Tú': 'te',
  'Él / Ella': 'se',
  'Nosotros': 'nos',
  'Vosotros': 'os',
  'Ellos / Ellas': 'se'
};

export function conjugateVerb(verb: string, pronoun: PronounType, tense: TenseType): ConjugationResult {
  const cleanVerb = verb.trim().toLowerCase();
  const pronounIdx = PRONOUN_INDEX_MAP[pronoun];

  // 1. Check direct Irregulars dictionary
  if (IRREGULAR_VERBS[cleanVerb]) {
    return {
      conjugated: IRREGULAR_VERBS[cleanVerb][tense][pronounIdx],
      isIrregular: true,
      originalVerb: cleanVerb,
      explanation: `${cleanVerb} is irregular in the ${tense} tense.`
    };
  }

  // Handle reflexive verbs (ending in "se")
  const isReflexive = cleanVerb.endsWith('se');
  const baseVerb = isReflexive ? cleanVerb.slice(0, -2) : cleanVerb;

  // Check if the underlying base verb is in irregular list (like sentarse -> sentar)
  if (isReflexive && IRREGULAR_VERBS[baseVerb]) {
    const rawConjugated = IRREGULAR_VERBS[baseVerb][tense][pronounIdx];
    const refl = REFLEXIVE_PRONOUNS[pronoun];
    return {
      conjugated: `${refl} ${rawConjugated}`,
      isIrregular: true,
      originalVerb: cleanVerb,
      explanation: `${cleanVerb} is a reflexive verb with stem-changing irregular base.`
    };
  }

  // 2. Regular verb rules
  const endings = {
    ar: {
      present: ['o', 'as', 'a', 'amos', 'áis', 'an'],
      past: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
      future: [] as string[]
    },
    er: {
      present: ['o', 'es', 'e', 'emos', 'éis', 'en'],
      past: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
      future: [] as string[]
    },
    ir: {
      present: ['o', 'es', 'e', 'imos', 'ís', 'en'],
      past: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
      future: [] as string[]
    }
  };

  const verbType = baseVerb.endsWith('ar') ? 'ar' : baseVerb.endsWith('er') ? 'er' : baseVerb.endsWith('ir') ? 'ir' : null;

  if (!verbType) {
    // If we can't identify, just return infinitive guess or simple future rules
    return {
      conjugated: tense === 'future' ? `${cleanVerb}${getFutureSuffix(pronoun)}` : cleanVerb,
      isIrregular: false,
      originalVerb: cleanVerb,
      explanation: 'Unrecognized verb ending. Showing approximation.'
    };
  }

  const root = baseVerb.slice(0, -2);
  let result = '';

  if (tense === 'future') {
    // Regular Future: Infinitive + end
    const futureSuffix = getFutureSuffix(pronoun);
    result = `${baseVerb}${futureSuffix}`;
  } else {
    // Regular Present / Past
    const suffix = endings[verbType][tense][pronounIdx];
    result = `${root}${suffix}`;
  }

  // Re-attach reflexive pronoun if necessary
  if (isReflexive) {
    const refl = REFLEXIVE_PRONOUNS[pronoun];
    result = `${refl} ${result}`;
  }

  return {
    conjugated: result,
    isIrregular: false,
    originalVerb: cleanVerb
  };
}

function getFutureSuffix(pronoun: PronounType): string {
  switch (pronoun) {
    case 'Yo': return 'é';
    case 'Tú': return 'ás';
    case 'Él / Ella': return 'á';
    case 'Nosotros': return 'emos';
    case 'Vosotros': return 'éis';
    case 'Ellos / Ellas': return 'án';
  }
}
