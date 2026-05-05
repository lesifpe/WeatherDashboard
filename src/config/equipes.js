// src/config/equipes.js
/* ============================================================
   CONFIGURAÇÃO CENTRAL DE EQUIPES
   ALTERE APENAS AS INFORMAÇÕES ABAIXO
   ============================================================ */

// Lista completa de equipes
export const equipes = [
  {
    id: 1,
    nome: 'ALPHA',
    regiao: 'Região Norte',
    cor: '#00f5ff',
    online: true,
    colecaoFirebase: 'equipe_alpha',
    historia: {
      descricao: 'A Equipe ALPHA foi fundada em 2024 com foco no monitoramento da Região Norte, área propensa a enchentes sazonais.',
      marcos: [
        { ano: '2024', descricao: 'Instalação dos primeiros 5 sensores' },
        { ano: '2025', descricao: 'Expansão para 15 pontos' },
        { ano: '2026', descricao: 'Meta: Cobertura completa' }
      ],
      especialidade: 'Monitoramento Hídrico',
      tecnologias: ['Sensores Submersíveis', 'LoRaWAN', 'React Native']
    },
    membros: [
      { nome: 'Dra. Amanda Souza', cargo: 'Coordenadora', iniciais: 'AS', cor: '#00f5ff' },
      { nome: 'Dr. Bruno Costa', cargo: 'Eng. Sensores', iniciais: 'BC', cor: '#00ff9f' }
    ]
  },
  {
    id: 2,
    nome: 'BETA',
    regiao: 'Região Sul',
    cor: '#00ff9f',
    online: true,
    colecaoFirebase: 'equipe_beta',
    historia: {
      descricao: 'A Equipe BETA especializa-se em monitoramento de encostas e deslizamentos.',
      marcos: [
        { ano: '2024', descricao: 'Mapeamento de 30 áreas de risco' },
        { ano: '2025', descricao: 'Sistema de alerta via SMS' },
        { ano: '2026', descricao: 'Integração com defesa civil' }
      ],
      especialidade: 'Análise de Encostas',
      tecnologias: ['Georadar', 'Machine Learning', 'Python']
    },
    membros: [
      { nome: 'Dr. Eduardo Santos', cargo: 'Geólogo', iniciais: 'ES', cor: '#00f5ff' },
      { nome: 'Dra. Fernanda Melo', cargo: 'Eng. Geotécnica', iniciais: 'FM', cor: '#00ff9f' }
    ]
  },
  {
    id: 3,
    nome: 'GAMMA',
    regiao: 'Região Leste',
    cor: '#ff6b35',
    online: false,
    colecaoFirebase: 'equipe_gamma',
    historia: {
      descricao: 'A Equipe GAMMA atua no monitoramento costeiro e ressacas do mar.',
      marcos: [
        { ano: '2024', descricao: 'Primeira boia inteligente' },
        { ano: '2025', descricao: 'Rede de 10 estações' },
        { ano: '2026', descricao: 'Previsão de marés com IA' }
      ],
      especialidade: 'Monitoramento Costeiro',
      tecnologias: ['Boias IoT', 'TensorFlow', 'Node.js']
    },
    membros: [
      { nome: 'Dra. Isabela Rios', cargo: 'Oceanógrafa', iniciais: 'IR', cor: '#00f5ff' },
      { nome: 'Dr. João Mendes', cargo: 'Eng. Costeiro', iniciais: 'JM', cor: '#00ff9f' }
    ]
  },
  {
    id: 4,
    nome: 'DELTA',
    regiao: 'Região Oeste',
    cor: '#9d4edd',
    online: true,
    colecaoFirebase: 'equipe_delta',
    historia: {
      descricao: 'A Equipe DELTA foca em qualidade do ar e prevenção de queimadas.',
      marcos: [
        { ano: '2024', descricao: 'Rede de 20 sensores' },
        { ano: '2025', descricao: 'Integração com satélites' },
        { ano: '2026', descricao: 'Previsão de dispersão' }
      ],
      especialidade: 'Qualidade do Ar',
      tecnologias: ['Sensores Ópticos', 'GIS', 'FastAPI']
    },
    membros: [
      { nome: 'Dr. Marcos Andrade', cargo: 'Atmosferista', iniciais: 'MA', cor: '#00f5ff' },
      { nome: 'Dra. Natália Faria', cargo: 'Eng. Ambiental', iniciais: 'NF', cor: '#00ff9f' }
    ]
  }
]

// Equipe padrão (fallback)
export const equipePadrao = {
  id: 0,
  nome: 'GERAL',
  regiao: 'Sistema',
  cor: '#00f5ff',
  online: true,
  colecaoFirebase: '',
  historia: {
    descricao: 'Weather Watch - Monitoramento climático inteligente',
    marcos: [
      { ano: '2024', descricao: 'Fundação' },
      { ano: '2025', descricao: 'Expansão' },
      { ano: '2026', descricao: 'Meta: 50 estações' }
    ],
    especialidade: 'Monitoramento Climático',
    tecnologias: ['Vue 3', 'Firebase', 'Chart.js']
  },
  membros: [
    { nome: 'Ana Silva', cargo: 'Tech Lead', iniciais: 'AS', cor: '#00f5ff' },
    { nome: 'Carlos Mendes', cargo: 'Backend', iniciais: 'CM', cor: '#00ff9f' },
    
  ]
}

// ============================================================
// FUNÇÕES AUXILIARES
// ============================================================

export const getEquipes = () => {
  return equipes
}

export const getEquipePorId = (id) => {
  const equipe = equipes.find(e => e.id === id)
  return equipe || equipePadrao
}

export const getEquipePorColecao = (colecao) => {
  const equipe = equipes.find(e => e.colecaoFirebase === colecao)
  return equipe || equipePadrao
}

export const getEquipePadrao = () => {
  return equipePadrao
}