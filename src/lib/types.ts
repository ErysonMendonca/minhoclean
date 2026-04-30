export type ServiceType = 'domestic' | 'business' | 'post-construction';

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon_name?: string;
  form_config: FormConfig; // Now mandatory per service
  created_at?: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number';
  required: boolean;
  enabled: boolean;
  placeholder?: string;
  options?: string[]; // For select, checkbox, and radio
}

export interface FormConfig {
  fields: FormField[];
}

export interface Lead {
  id: string;
  serviceType: ServiceType;
  data: Record<string, string>;
  status: 'new' | 'contacted' | 'in-progress' | 'scheduled' | 'completed';
  createdAt: string;
}

export const DEFAULT_FORM_CONFIG: FormConfig = {
  fields: [
    { id: 'name', label: 'Nome Completo', type: 'text', required: true, enabled: true, placeholder: 'Seu nome' },
    { id: 'email', label: 'E-mail', type: 'email', required: true, enabled: true, placeholder: 'seu@email.com' },
    { id: 'phone', label: 'Telefone', type: 'tel', required: true, enabled: true, placeholder: '+351 XXX XXX XXX' },
    { id: 'address', label: 'Morada / Localização', type: 'text', required: true, enabled: true, placeholder: 'Rua, número, cidade' },
    { id: 'details', label: 'Detalhes Adicionais', type: 'textarea', required: false, enabled: true, placeholder: 'Conte-nos mais sobre a sua necessidade' },
  ]
};

export const SERVICES = [
  {
    id: 'domestic',
    title: 'Limpeza Doméstica',
    description: 'Deixe sua casa impecável com nossa equipe especializada. Cuidamos de cada detalhe para o seu conforto.',
    image: '/images/domestic.jpg',
    features: ['Limpeza profunda', 'Organização de armários', 'Lavagem de vidros']
  },
  {
    id: 'business',
    title: 'Limpeza Empresarial',
    description: 'Um ambiente limpo é essencial para a produtividade. Oferecemos soluções completas para escritórios e lojas.',
    image: '/images/business.jpg',
    features: ['Manutenção diária', 'Limpeza de carpetes', 'Higienização de áreas comuns']
  },
  {
    id: 'post-construction',
    title: 'Limpeza Pós-Obra',
    description: 'A parte pesada fica com a gente. Entregamos o seu imóvel pronto para morar ou trabalhar.',
    image: '/images/post-construction.jpg',
    features: ['Remoção de resíduos', 'Limpeza de manchas de tinta', 'Polimento de superfícies']
  }
];
