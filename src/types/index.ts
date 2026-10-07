import type { Timestamp } from 'firebase/firestore';

export type ServiceType = 'juramentada' | 'certificada' | 'tecnica' | 'apostilamento';

export type OrderStatus =
  | 'pendente'
  | 'analise'
  | 'orcamento_enviado'
  | 'aprovado'
  | 'em_traducao'
  | 'revisao'
  | 'concluido'
  | 'entregue';

export interface QuoteRequest {
  id?: string;
  fullName: string;
  email: string;
  whatsapp: string;
  serviceType: string;
  files?: Array<string | { name: string; url?: string; dataUrl?: string; size?: number; type?: string }>;
  fileNames?: string[];
  status: 'novo' | 'visto' | 'cotado';
  createdAt: Timestamp | Date;
  updatedAt?: Timestamp | Date;
  notes?: string;
  estimatedPrice?: number;
  estimatedDays?: number;
}

export interface Order {
  id?: string;
  userId: string;
  quoteId?: string;
  serviceType: ServiceType;
  sourceLanguage: string;
  targetLanguage: string;
  documents: OrderDocument[];
  status: OrderStatus;
  price: number;
  dueDate: Timestamp | Date;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  notes?: string;
  deliveryMethod: 'digital' | 'fisico' | 'ambos';
  address?: Address;
}

export interface OrderDocument {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: Timestamp | Date;
  translatedUrl?: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  whatsapp?: string;
  cpf?: string;
  cnpj?: string;
  company?: string;
  address?: Address;
  isAdmin: boolean;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  source: 'google' | 'site';
  date: string;
}

export const LANGUAGES: Language[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷', slug: 'portugues' },
  { code: 'en', name: 'Inglês', flag: '🇺🇸', slug: 'ingles' },
  { code: 'es', name: 'Espanhol', flag: '🇪🇸', slug: 'espanhol' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', slug: 'italiano' },
  { code: 'fr', name: 'Francês', flag: '🇫🇷', slug: 'frances' },
  { code: 'de', name: 'Alemão', flag: '🇩🇪', slug: 'alemao' },
  { code: 'ru', name: 'Russo', flag: '🇷🇺', slug: 'russo' },
  { code: 'zh', name: 'Mandarim', flag: '🇨🇳', slug: 'mandarim' },
  { code: 'nl', name: 'Holandês', flag: '🇳🇱', slug: 'holandes' },
  { code: 'ja', name: 'Japonês', flag: '🇯🇵', slug: 'japones' },
  { code: 'ko', name: 'Coreano', flag: '🇰🇷', slug: 'coreano' },
  { code: 'ar', name: 'Árabe', flag: '🇸🇦', slug: 'arabe' },
  { code: 'he', name: 'Hebraico', flag: '🇮🇱', slug: 'hebraico' },
  { code: 'no', name: 'Norueguês', flag: '🇳🇴', slug: 'noruegues' },
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pendente: 'Pendente',
  analise: 'Em Análise',
  orcamento_enviado: 'Orçamento Enviado',
  aprovado: 'Aprovado',
  em_traducao: 'Em Tradução',
  revisao: 'Em Revisão',
  concluido: 'Concluído',
  entregue: 'Entregue',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pendente: 'bg-gray-100 text-gray-700',
  analise: 'bg-yellow-100 text-yellow-700',
  orcamento_enviado: 'bg-blue-100 text-blue-700',
  aprovado: 'bg-purple-100 text-purple-700',
  em_traducao: 'bg-orange-100 text-orange-700',
  revisao: 'bg-indigo-100 text-indigo-700',
  concluido: 'bg-green-100 text-green-700',
  entregue: 'bg-emerald-100 text-emerald-700',
};
