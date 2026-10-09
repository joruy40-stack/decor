export interface EnvironmentOption {
  id: string;
  name: string;
  subtitle: string;
  iconName: string;
  defaultPreset: string;
  tip: string;
  lightingType: string;
  challenge: string;
  idealVibe: string;
}

export interface PalettePreset {
  id: string;
  name: string;
  category: string;
  envMatch: string;
  color60: {
    name: string;
    hex: string;
    role: string;
    material: string;
  };
  color30: {
    name: string;
    hex: string;
    role: string;
    material: string;
  };
  color10: {
    name: string;
    hex: string;
    role: string;
    material: string;
  };
  description: string;
  photoPreview: string;
  photoAlt: string;
}

export type FloralType = 'permanente' | 'natural';
export type PaymentMethod = 'pix' | 'cartao_vista' | 'cartao_parcelado' | 'sinal_parcelado';

export interface PackageOption {
  id: string;
  name: string;
  badge: string;
  highlightTag?: string;
  isPopular?: boolean;
  basePrice: number; // default natural price
  pricePermanente: number;
  priceNatural: number;
  description: string;
  featuresNatural: string[];
  featuresPermanente: string[];
  features: string[];
  recommendedFor: string;
}

export interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'iluminacao' | 'cenografia' | 'mobiliario' | 'personalizado';
}

export interface SavedQuote {
  id: string;
  clientName: string;
  clientPhone: string;
  eventDate: string;
  eventType: string;
  environmentName: string;
  paletteName: string;
  packageName: string;
  floralType: FloralType;
  floralLabel: string;
  paymentMethod: PaymentMethod;
  paymentDetails: string;
  totalPrice: number;
  addons: string[];
  createdAt: string;
}

export function getPaymentSummary(
  amount: number,
  method: PaymentMethod,
  installments: number = 3
): {
  finalAmount: number;
  description: string;
  badge: string;
  breakdown: string;
} {
  if (method === 'pix') {
    const discounted = Math.round(amount * 0.95);
    const savings = amount - discounted;
    return {
      finalAmount: discounted,
      description: `R$ ${discounted.toLocaleString('pt-BR')},00 no PIX (5% de desconto à vista)`,
      badge: '5% OFF Instantâneo',
      breakdown: `Economia de R$ ${savings.toLocaleString('pt-BR')},00 no pagamento via PIX imediato.`,
    };
  }

  if (method === 'cartao_vista') {
    return {
      finalAmount: amount,
      description: `R$ ${amount.toLocaleString('pt-BR')},00 no cartão de crédito em 1x`,
      badge: '1x Sem Juros',
      breakdown: `Pagamento à vista no cartão de crédito com confirmação imediata.`,
    };
  }

  if (method === 'cartao_parcelado') {
    const count = Math.min(Math.max(installments, 2), 12);
    // Até 3x sem juros, de 4x a 12x acréscimo leve de 1.99% a.m.
    if (count <= 3) {
      const perMonth = amount / count;
      return {
        finalAmount: amount,
        description: `${count}x de R$ ${perMonth.toFixed(2).replace('.', ',')} sem juros`,
        badge: `${count}x Sem Juros`,
        breakdown: `Parcelamento facilitado em até 3x sem juros no cartão de crédito.`,
      };
    } else {
      const rate = 1 + count * 0.015;
      const totalInterest = Math.round(amount * rate);
      const perMonth = totalInterest / count;
      return {
        finalAmount: totalInterest,
        description: `${count}x de R$ ${perMonth.toFixed(2).replace('.', ',')} no cartão`,
        badge: `${count}x Parcelado`,
        breakdown: `Total parcelado de R$ ${totalInterest.toLocaleString('pt-BR')},00 em ${count}x.`,
      };
    }
  }

  // sinal_parcelado (50% sinal + 50% montagem)
  const sinal = Math.round(amount * 0.5);
  const restante = amount - sinal;
  return {
    finalAmount: amount,
    description: `Sinal de 50% (R$ ${sinal.toLocaleString('pt-BR')},00) + 50% na montagem (R$ ${restante.toLocaleString('pt-BR')},00)`,
    badge: '50% Entrada + 50% Evento',
    breakdown: `Reserva imediata da data com 50% e quitação apenas no dia da montagem.`,
  };
}

export function calculateCashback(amount: number, percent: number = 10): number {
  return Math.round(amount * (percent / 100));
}

export const ENVIRONMENTS: EnvironmentOption[] = [
  {
    id: 'praia',
    name: 'Praia',
    subtitle: 'Beira-mar / Tropical',
    iconName: 'waves',
    defaultPreset: 'praia',
    tip: 'Atenção à incidência de vento forte e reflexo de sol intenso. Usar pesos de mesa sutis, linho pesado e paleta fresca e luminosa.',
    lightingType: 'Luz natural direta e poente dourado',
    challenge: 'Maresia e rajadas de vento em arranjos altos',
    idealVibe: 'Leveza orgânica, texturas de fibras e frescor marinho',
  },
  {
    id: 'salao',
    name: 'Salão',
    subtitle: 'Nobre / Clássico',
    iconName: 'corporate_fare',
    defaultPreset: 'salao',
    tip: 'Iluminação cênica artificial e pé-direito amplo. Exige arranjos com pontos de contraste dourados para sobressair nas lentes.',
    lightingType: 'Iluminação cênica quente / Lustres de cristal',
    challenge: 'Espaços amplos que exigem volumetria vertical nobre',
    idealVibe: 'Sofisticação clássica, simetria e brilho refinado',
  },
  {
    id: 'campo',
    name: 'Campo',
    subtitle: 'Boho Chic / Jardim',
    iconName: 'park',
    defaultPreset: 'campo',
    tip: 'Vegetação de fundo já atua como 60% de verde natural. Flores desidratadas, linho cru e terracota equilibram com perfeição.',
    lightingType: 'Luz difusa solar e varal de lâmpadas vintage',
    challenge: 'Piso irregular de grama e variações de temperatura',
    idealVibe: 'Aconchego botânico, romantismo e texturas artesanais',
  },
  {
    id: 'industrial',
    name: 'Industrial',
    subtitle: 'Urbano / Loft',
    iconName: 'domain',
    defaultPreset: 'industrial',
    tip: 'Paredes de tijolo ou cimento queimado pedem terracota aconchegante, metais acobreados e pontos de contraste para aquecer o olhar.',
    lightingType: 'Fitas LED quentes, filamento de carbono e spots focais',
    challenge: 'Frieza do concreto e estruturas metálicas escuras',
    idealVibe: 'Contemporâneo autoral, arrojado e cosmopolita',
  },
  {
    id: 'intimista',
    name: 'Intimista',
    subtitle: 'Home Reception / Ape',
    iconName: 'cottage',
    defaultPreset: 'intimista',
    tip: 'Mesa próxima aos convidados: priorizar peças com textura tátil fina, velas sem cheiro e flores sem fragrância invasiva.',
    lightingType: 'Luz indireta residencial e velas cônicas aconchegantes',
    challenge: 'Circulação reduzida exigindo aproveitamento milimétrico',
    idealVibe: 'Afeto próximo, alta gastronomia e conforto familiar',
  },
];

export const PALETTES: Record<string, PalettePreset> = {
  ferrari: {
    id: 'ferrari',
    name: 'Vermelho Ferrari & Ouro Nobre',
    category: 'Alta Cenografia & Glamour',
    envMatch: 'Salão Nobre, Buffet ou Loft',
    color60: {
      name: 'Branco Pérola & Linho Nobre',
      hex: '#F8F6F4',
      role: 'Toalhas estruturadas, painel de fundo e revestimentos base',
      material: 'Linho puro perolizado & Seda fosca',
    },
    color30: {
      name: 'Vermelho Ferrari Rosso Corsa',
      hex: '#D40000',
      role: 'Suportes de doces, taças de cristal rubi e guardanapos',
      material: 'Cerâmica esmaltada vermelho vivo & Cristais rubi',
    },
    color10: {
      name: 'Ouro 24k Nobre & Velas',
      hex: '#D4AF37',
      role: 'Castiçais polidos, talheres dourados e fitas de cetim',
      material: 'Metal dourado espelhado & Castiçais franceses',
    },
    description:
      'Impacto visual supremo e inesquecível: o vermelho Ferrari traz paixão e energia dramática, equilibrado pelo linho pérola e realçado pelo brilho do ouro.',
    photoPreview:
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80',
    photoAlt:
      'Mesa de festa luxuosa com arranjos vermelhos vibrantes, detalhes dourados e toalha nobre.',
  },
  oliva: {
    id: 'oliva',
    name: 'Verde Oliva & Terracota Autoral',
    category: 'Harmonia Botânica & Boho',
    envMatch: 'Campo, Jardim ou Salão',
    color60: {
      name: 'Verde Oliva Nobre & Linho',
      hex: '#4A5D44',
      role: 'Toalhas estruturadas, passadeiras e revestimento cenográfico',
      material: 'Linho puro verde oliva & Fibras vegetais nobres',
    },
    color30: {
      name: 'Terracota Queimada & Cerâmica',
      hex: '#A35339',
      role: 'Suportes de doces, vasos artesanais e sousplats de argila',
      material: 'Cerâmica terracota vitrificada & Vasos rústicos',
    },
    color10: {
      name: 'Dourado Champanhe & Cera Mel',
      hex: '#D4AF37',
      role: 'Velas cônicas, botões de flores nobres e castiçais finos',
      material: 'Latão escovado dourado & Velas aromáticas de soja',
    },
    description:
      'A harmonia perfeita entre a serenidade botânica do verde oliva e o aconchego acolhedor da terracota. Cria fotos quentes, elegantes e atemporais.',
    photoPreview:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
    photoAlt:
      'Composição de mesa com tons de verde oliva botânico, cerâmica terracota e toques dourados.',
  },
  salao: {
    id: 'salao',
    name: 'Salão Nobre Imperial',
    category: 'Clássico Elegante',
    envMatch: 'Salão Nobre / Clássico',
    color60: {
      name: 'Branco Pérola & Linho',
      hex: '#F4EDE4',
      role: 'Toalha principal, painel de fundo e revestimentos base',
      material: 'Linho egípcio perolizado & Seda fosca',
    },
    color30: {
      name: 'Verde Folhagem Imperial',
      hex: '#52634F',
      role: 'Suportes de doces, taças bico de jaca e guardanapos',
      material: 'Cerâmica verde esmeralda & Folhagens de eucalipto',
    },
    color10: {
      name: 'Dourado Champanhe',
      hex: '#CFA258',
      role: 'Velas cônicas, botões de rosas nobres e detalhes de talheres',
      material: 'Metal champanhe escovado & Castiçais torneados',
    },
    description:
      'Contraste elegante ideal para iluminação cênica: o fundo perolizado amplia o salão e os toques dourados cintilam com sofisticação em fotos com flash.',
    photoPreview:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUbIFYbikUSDkq0oMqK-0JxhN0DKcYK8uHJRWAh4D-ctaeaNYbyjfk3iyqxRLKYGiJWhItXB1lQ5smofTdTECjvRXLbki0G6Ca1_veE77mT943iXTCyGkcwS72rmtOvtHlWU32JmLk0cntXr4hwquNVcB7yABqxtyiCDQzYVjOFoBXmIkDRLs03OtSDk990-nVYv9dQ2CcAQvtSZWR_xh1najksf3KXUcdfv6e8BmVmj7GishyveUzGw',
    photoAlt:
      'Mesa de doces imperial com toalha de linho pérola, folhagens verdes imperiais e detalhes em dourado champanhe.',
  },
  praia: {
    id: 'praia',
    name: 'Praia Suave & Maresia',
    category: 'Vibrante & Tropical',
    envMatch: 'Praia / Beira-mar',
    color60: {
      name: 'Areia Natural & Linho Cru',
      hex: '#E8DEC8',
      role: 'Toalhas estruturadas, bases de mesa e esteiras de fibra',
      material: 'Linho puro rústico & Fibras de juta natural',
    },
    color30: {
      name: 'Azul Egeu & Cristais',
      hex: '#4F758B',
      role: 'Taças de cristal martelado, guardanapos e bandejas marinhas',
      material: 'Vidro artesanal azulado & Cerâmica grega',
    },
    color10: {
      name: 'Coral Terracota Vivo',
      hex: '#D97455',
      role: 'Arranjos de flores tropicais, antúrios e fitas de seda',
      material: 'Flores nobres tropicais & Cerâmicas terracota',
    },
    description:
      'Contraste marinho luminoso: o linho cru atenua o reflexo do sol na praia e os acentos em coral destacam os arranjos balançando ao vento litorâneo.',
    photoPreview:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    photoAlt:
      'Mesa praiana com toalha em tom areia natural, cristais azuis e detalhes em coral.',
  },
  campo: {
    id: 'campo',
    name: 'Campo Boho & Terracota',
    category: 'Boho Chic',
    envMatch: 'Jardim / Campo Boho',
    color60: {
      name: 'Fendi Suave & Textura Rústica',
      hex: '#DCD8CF',
      role: 'Mesa de madeira aparente com passadeira fendi orgânica',
      material: 'Gaze de algodão puro & Madeira de demolição',
    },
    color30: {
      name: 'Terracota Queimada & Argila',
      hex: '#A35C42',
      role: 'Vasos de barro nobre, sousplats e suportes artesanais',
      material: 'Argila vitrificada & Cerâmica terracota manual',
    },
    color10: {
      name: 'Mostarda Solar Nobre',
      hex: '#D89B34',
      role: 'Flores secas protegidas, velinhas de soja e cravos',
      material: 'Craspédias amarelas & Metais envelhecidos',
    },
    description:
      'A vegetação externa funciona como moldura natural viva. Os tons quentes de terracota e mostarda ancoram a cenografia à terra com elegância poética.',
    photoPreview:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
    photoAlt:
      'Decoração boho chic no campo com elementos de terracota, flores silvestres e luz natural.',
  },
  industrial: {
    id: 'industrial',
    name: 'Industrial Chic & Urban Loft',
    category: 'Contemporâneo Urbano',
    envMatch: 'Industrial / Urbano',
    color60: {
      name: 'Cinza Concreto & Grafite Suave',
      hex: '#D2D0CB',
      role: 'Bases geométricas, toalhas cinzas texturizadas ou ferro',
      material: 'Microcimento acetinado & Tecido linho cinza grafite',
    },
    color30: {
      name: 'Cobre Escovado & Madeira',
      hex: '#8E593D',
      role: 'Bandejas metálicas acobreadas e tábuas de nogueira maciça',
      material: 'Cobre rosê industrial & Nogueira americana',
    },
    color10: {
      name: 'Borgonha Intenso & Veludo',
      hex: '#7A2233',
      role: 'Callas negras, orquídeas bordô e detalhes em fita de veludo',
      material: 'Orquídeas nobres vinho & Veludo de seda escuro',
    },
    description:
      'Ideal para galpões e lofts: o calor dos metais em cobre e das flores bordô quebra a rusticidade do cimento, conferindo estética de galeria de arte.',
    photoPreview:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
    photoAlt:
      'Mesa de festa em galpão industrial com detalhes em cobre, concreto e arranjos bordô.',
  },
  intimista: {
    id: 'intimista',
    name: 'Minimalista Romântico & Pastel',
    category: 'Minimalista Pastel',
    envMatch: 'Casa / Intimista',
    color60: {
      name: 'Off-White Texturizado',
      hex: '#EDE8E1',
      role: 'Toalha de mesa de piquê fino e fundo aconchegante',
      material: 'Piquê de algodão 400 fios & Papéis texturizados',
    },
    color30: {
      name: 'Rosa Seco Suave & Porcelana',
      hex: '#A66E74',
      role: 'Pratos de sobremesa vintage, louça florais e guardanapos',
      material: 'Porcelana filetada & Seda rosa antigo',
    },
    color10: {
      name: 'Ouro Velho Envelhecido',
      hex: '#B8924B',
      role: 'Mini castiçais, porta-guardanapos e talheres retrô',
      material: 'Latão antigo lapidado & Candelabros baixos',
    },
    description:
      'Aconchego absoluto para encontros familiares próximos: composição delicada, suave à visão dos convidados e harmoniosa em salas residenciais.',
    photoPreview:
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80',
    photoAlt:
      'Mesa intimista residencial com porcelanas delicadas em rosa seco e toalha off-white.',
  },
  tropical: {
    id: 'tropical',
    name: 'Vibrante & Tropical Sunset',
    category: 'Vibrante & Tropical',
    envMatch: 'Praia ou Jardim',
    color60: {
      name: 'Palha Dourada & Bege Areia',
      hex: '#DFD5C3',
      role: 'Toalhas neutras e esteiras entrelaçadas',
      material: 'Palha de carnaúba & Tecido cru',
    },
    color30: {
      name: 'Verde Costela-de-Adão',
      hex: '#2E5339',
      role: 'Bandejas e suportes com folhagens exóticas',
      material: 'Folhas tropicais enceradas & Cerâmica florestal',
    },
    color10: {
      name: 'Laranja Tangerina Solar',
      hex: '#E06D28',
      role: 'Strelitzias, orquídeas vandas e guardanapos solares',
      material: 'Flores do paraíso & Tecido tingido',
    },
    description:
      'A energia contagiante do pôr do sol: contraste vívido que transborda vitalidade e alegria em comemorações ao ar livre.',
    photoPreview:
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80',
    photoAlt:
      'Decoração tropical com folhagens exuberantes e flores alaranjadas vibrantes.',
  },
  moderno: {
    id: 'moderno',
    name: 'Moderno Black & Champagne',
    category: 'Alta Cenografia',
    envMatch: 'Salão ou Loft',
    color60: {
      name: 'Preto Fosco Carbono',
      hex: '#242322',
      role: 'Móveis laqueados e painel de fundo cenográfico',
      material: 'MDF texturizado preto & Aço carbono',
    },
    color30: {
      name: 'Branco Névola Puro',
      hex: '#F6F6F6',
      role: 'Boleiras cilíndricas e pratos geométricos',
      material: 'Acrílico branco leitoso & Mármore branco',
    },
    color10: {
      name: 'Ouro Espelhado 24k',
      hex: '#D4AF37',
      role: 'Letreiros, castiçais finos e bordas de bandejas',
      material: 'Metal dourado polido reflexivo',
    },
    description:
      'Visual dramático e de alta moda: o fundo escuro projeta o bolo cenográfico e os doces para a vanguarda do olhar.',
    photoPreview:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
    photoAlt:
      'Decoração sofisticada com paleta contemporânea preto fosco e acentos dourados espelhados.',
  },
};

export const PACKAGES: PackageOption[] = [
  {
    id: 'essencial',
    name: 'Pacote Essencial',
    badge: 'Básico Elegante',
    basePrice: 450,
    priceNatural: 450,
    pricePermanente: 350,
    description: 'Perfeito para comemorações intimistas e recepções leves em casa.',
    featuresNatural: [
      'Móveis modulares base (Mesa principal clean)',
      'Louças alinhadas na paleta 60-30-10 (6 a 8 peças)',
      'Arranjos florais naturais frescos da estação',
      'Guia de montagem e harmonização passo a passo',
    ],
    featuresPermanente: [
      'Móveis modulares base (Mesa principal clean)',
      'Louças alinhadas na paleta 60-30-10 (6 a 8 peças)',
      'Arranjos florais permanentes toque real (seda premium)',
      'Alta durabilidade sem risco de murchar com calor',
    ],
    features: [
      'Móveis modulares base (Mesa principal clean)',
      'Louças alinhadas na paleta 60-30-10 (6 a 8 peças)',
      'Arranjos florais selecionados conforme modalidade',
      'Guia de montagem e harmonização passo a passo',
    ],
    recommendedFor: 'Aniversários em casa, batizados e chás íntimos',
  },
  {
    id: 'completo',
    name: 'Pacote Completo',
    badge: 'Equilíbrio Perfeito',
    highlightTag: 'Mais Vendido • Melhor Margem',
    isPopular: true,
    basePrice: 850,
    priceNatural: 850,
    pricePermanente: 680,
    description:
      'O queridinho para salões e jardins com máximo impacto cenográfico e fotos impecáveis.',
    featuresNatural: [
      'Móveis e mesa com técnica de pirâmide completa',
      'Louças completas na paleta aprovada (12 a 16 peças)',
      'Arranjos com flores naturais frescas e nobres',
      'Iluminação cênica de destaque e velas decorativas',
      'Suporte consultivo para harmonização com o bolo',
    ],
    featuresPermanente: [
      'Móveis e mesa com técnica de pirâmide completa',
      'Louças completas na paleta aprovada (12 a 16 peças)',
      'Arranjos permanentes luxo toque real (idênticas às naturais)',
      'Iluminação cênica de destaque e velas decorativas',
      'Zero desperdício e 100% resistente a vento e calor',
    ],
    features: [
      'Móveis e mesa com técnica de pirâmide completa',
      'Louças completas na paleta aprovada (12 a 16 peças)',
      'Arranjos florais completos no método pirâmide',
      'Iluminação cênica de destaque e velas decorativas',
      'Suporte consultivo para harmonização com o bolo',
    ],
    recommendedFor: 'Casamentos, 15 anos, noivados e recepções de destaque',
  },
  {
    id: 'premium',
    name: 'Pacote Premium',
    badge: 'Luxo Autoral',
    basePrice: 1400,
    priceNatural: 1400,
    pricePermanente: 1150,
    description:
      'Experiência imersiva VIP com flores nobres e personalização cenográfica exclusiva.',
    featuresNatural: [
      'Estrutura cenográfica completa exclusiva e volumétrica',
      'Flores nobres naturais importadas selecionadas (orquídeas/rosas)',
      'Painel instagramável com monograma personalizado',
      'Iluminação arquitetural artística com dimmer',
      'Frete, montagem e desmontagem inclusos por equipe sênior',
    ],
    featuresPermanente: [
      'Estrutura cenográfica completa exclusiva e volumétrica',
      'Flores permanentes nobres importadas de altíssima fidelidade',
      'Painel instagramável com monograma personalizado',
      'Iluminação arquitetural artística com dimmer',
      'Frete, montagem e desmontagem inclusos por equipe sênior',
    ],
    features: [
      'Estrutura cenográfica completa exclusiva e volumétrica',
      'Flores nobres importadas selecionadas',
      'Painel instagramável com monograma personalizado',
      'Iluminação arquitetural artística com dimmer',
      'Frete, montagem e desmontagem inclusos por equipe sênior',
    ],
    recommendedFor: 'Festas de gala, casamentos de alto padrão e eventos corporativos VIP',
  },
];

export const ADDONS: AddonOption[] = [
  {
    id: 'arco-desconstruido',
    name: 'Arco Desconstruído com Balões Duplos',
    price: 180,
    description: 'Balões perolizados no tom da paleta em formato orgânico de fluxo',
    category: 'cenografia',
  },
  {
    id: 'painel-neon',
    name: 'Painel com Monograma ou Neon LED',
    price: 150,
    description: 'Frase brilhante no tema ou iniciais gravadas em acrílico espelhado',
    category: 'personalizado',
  },
  {
    id: 'arranjo-aereo',
    name: 'Arranjo Floral Aéreo Suspenso',
    price: 260,
    description: 'Instalação suspensa sobre a mesa para fotos de ângulo cinematográfico',
    category: 'cenografia',
  },
  {
    id: 'velas-luxo',
    name: 'Kit 12 Velas Cônicas & Candelabros',
    price: 90,
    description: 'Chamas vivas seguras em tubos de vidro borossilicato protetores',
    category: 'iluminacao',
  },
  {
    id: 'tacas-cristal',
    name: 'Conjunto 24 Taças de Cristal Bico de Jaca',
    price: 110,
    description: 'Taças lapidadas na cor secundária de 30% para brinde dos convidados',
    category: 'mobiliario',
  },
];

export interface VenueShowcaseItem {
  id: string;
  envId: string;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  mainPhoto: string;
  galleryPhotos: string[];
  floralNote: string;
  setupTime: string;
  tableFormat: string;
  highlights: string[];
}

export const VENUE_SHOWCASES: VenueShowcaseItem[] = [
  {
    id: 'showcase-salao',
    envId: 'salao',
    title: 'Salão Nobre & Buffet Clássico Imperial',
    subtitle: 'Composição de Alto Padrão em Salão Fechado',
    description:
      'Veja como a técnica piramidal ganha vida sob lustres e iluminação cênica quente: a boleira central eleva o ponto focal enquanto bandejas com pé distribuem os doces finos com simetria perfeita.',
    videoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-set-table-for-a-wedding-celebration-40986-large.mp4',
    mainPhoto:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80',
    ],
    floralNote: 'Compatível com Flores Naturais Nobres ou Flores Permanentes Toque Real Seda',
    setupTime: 'Montagem expressa: 2h30 a 3h',
    tableFormat: 'Mesa Imperial Retangular (3,20m)',
    highlights: ['Lustres integrados', 'Arranjos com 60cm de altura', 'Respiro de 5cm entre peças'],
  },
  {
    id: 'showcase-campo',
    envId: 'campo',
    title: 'Jardim Aberto & Cenografia Campo Boho',
    subtitle: 'Montagem Diurna com Luz Solar e Vegetação Viva',
    description:
      'A mesa principal integrada à natureza: passadeira em linho fendi, vasos de terracota artesanal e arranjos botânicos que não murcham sob o sol da tarde.',
    videoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-wedding-table-ready-for-guests-41002-large.mp4',
    mainPhoto:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
    ],
    floralNote: 'Flores Permanentes Premium recomendadas para resistir ao calor do dia sem murchar',
    setupTime: 'Montagem expressa: 2h',
    tableFormat: 'Mesa Rústica Orgânica de Madeira Maciça',
    highlights: ['Proteção anti-vento', 'Texturas de cerâmica manual', 'Tons quentes terrosos'],
  },
  {
    id: 'showcase-praia',
    envId: 'praia',
    title: 'Deck Beira-Mar & Estilo Litorâneo',
    subtitle: 'Cenografia Praiana com Fibras e Cristais Azuis',
    description:
      'Projetada especialmente para lidar com vento litorâneo e maresia: bases pesadas em pedra natural, esteiras de palha entrelaçada e arranjos tropicais vivos que brilham nas fotos ao pôr do sol.',
    videoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-table-setting-at-a-wedding-reception-42654-large.mp4',
    mainPhoto:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
    ],
    floralNote: 'Antúrios tropicais naturais ou flores permanentes ultra-resistentes à brisa marinha',
    setupTime: 'Montagem expressa: 2h15',
    tableFormat: 'Mesa Baixa com Troncos & Deck Suspenso',
    highlights: ['Resistência a maresia', 'Taças bico de jaca azul marinho', 'Velas protegidas'],
  },
  {
    id: 'showcase-industrial',
    envId: 'industrial',
    title: 'Loft Urbano & Cenografia Industrial Chic',
    subtitle: 'Cimento Queimado, Metais Cobre e Tijolos',
    description:
      'O charme dos antigos galpões de Nova York reinterpretado com requinte: mesas geométricas, fitas de LED quentes, candelabros cobreados e contraste marcante com flores vinho e vermelho.',
    videoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-wedding-table-decoration-40988-large.mp4',
    mainPhoto:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
    ],
    floralNote: 'Callas e folhagens secas com opções de flores nobres permanentes ou frescas',
    setupTime: 'Montagem expressa: 2h30',
    tableFormat: 'Mesa de Aço Carbono e Nogueira Escura',
    highlights: ['Iluminação de filamento', 'Monograma em Neon LED', 'Estrutura contemporânea'],
  },
  {
    id: 'showcase-intimista',
    envId: 'intimista',
    title: 'Recepção Intimista Residencial & Salão de Condomínio',
    subtitle: 'Aconchego Máximo para 20 a 50 Convidados',
    description:
      'Para festas acolhedoras em casa ou salões privativos: proporções delicadas onde o convidado admira cada detalhe de perto. Porcelanas florais finas, mini velas e louças selecionadas.',
    videoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-set-table-for-a-wedding-celebration-40986-large.mp4',
    mainPhoto:
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
    ],
    floralNote: 'Flores aromáticas sem fragrâncias invasivas ou arranjos permanentes antialérgicos',
    setupTime: 'Montagem expressa: 1h30',
    tableFormat: 'Mesa Redonda Imperial ou Mesa de Jantar Expandida',
    highlights: ['Aproveitamento milimétrico', 'Zero odor incômodo', 'Textura tátil refinada'],
  },
];

