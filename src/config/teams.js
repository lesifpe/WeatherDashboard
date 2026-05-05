// src/config/equipes.js
/* ============================================================
   CONFIGURAÇÃO CENTRAL DE EQUIPES
   ============================================================ */

// Equipe padrão (fallback)
export const equipePadrao = {
  id: 0,
  nome: 'GERAL',
  regiao: 'Sistema',
  cor: '#00f5ff',
  online: true,
  colecaoFirebase: '',
  historia: {
    descricao: 'O Weather Watch nasceu em 2024 como uma iniciativa de monitoramento climático de baixo custo para comunidades em áreas de risco. Utilizando sensores IoT e tecnologia em tempo real, o sistema fornece alertas precoces para prevenção de enchentes e desastres naturais.',
    marcos: [
      { ano: '2024', descricao: 'Fundação e primeiro protótipo' },
      { ano: '2025', descricao: 'Expansão para 4 equipes de monitoramento' },
      { ano: '2026', descricao: 'Meta: 50 estações instaladas' }
    ],
    especialidade: 'Monitoramento Climático Integrado',
    tecnologias: ['Vue 3', 'Firebase', 'Chart.js', 'IoT Sensors']
  },
  membros: [
    { nome: 'Ana Silva', cargo: 'Tech Lead', iniciais: 'AS', cor: '#00f5ff' },
    { nome: 'Carlos Mendes', cargo: 'Backend', iniciais: 'CM', cor: '#00ff9f' },
    { nome: 'Julia Costa', cargo: 'Frontend', iniciais: 'JC', cor: '#ff6b35' },
    { nome: 'Rafael Lima', cargo: 'IoT Eng.', iniciais: 'RL', cor: '#9d4edd' }
  ]
}

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
      descricao: 'A Equipe ALPHA foi fundada em 2024 com foco no monitoramento da Região Norte, área propensa a enchentes sazonais. Desenvolvemos um sistema pioneiro de sensores submersíveis que detectam níveis críticos de água com 95% de precisão.',
      marcos: [
        { ano: '2024', descricao: 'Instalação dos primeiros 5 sensores na Bacia do Rio Negro' },
        { ano: '2025', descricao: 'Expansão para 15 pontos de monitoramento' },
        { ano: '2026', descricao: 'Meta: Cobertura completa da região metropolitana' }
      ],
      especialidade: 'Monitoramento Hídrico e Prevenção de Enchentes',
      tecnologias: ['Sensores Submersíveis', 'LoRaWAN', 'React Native', 'InfluxDB']
    },
    membros: [
      { nome: 'Dra. Amanda Souza', cargo: 'Coordenadora Hídrica', iniciais: 'AS', cor: '#00f5ff' },
      { nome: 'Dr. Bruno Costa', cargo: 'Eng. Sensores', iniciais: 'BC', cor: '#00ff9f' },
      { nome: 'MSc. Carla Lima', cargo: 'Cientista Dados', iniciais: 'CL', cor: '#ff6b35' },
      { nome: 'Eng. Daniel Rocha', cargo: 'IoT Developer', iniciais: 'DR', cor: '#9d4edd' }
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
      descricao: 'A Equipe BETA especializa-se em monitoramento de encostas e deslizamentos na Região Sul. Nossa tecnologia combina sensores de umidade do solo com estações meteorológicas de alta precisão.',
      marcos: [
        { ano: '2024', descricao: 'Mapeamento de 30 áreas de risco' },
        { ano: '2025', descricao: 'Sistema de alerta via SMS implementado' },
        { ano: '2026', descricao: 'Integração com defesa civil estadual' }
      ],
      especialidade: 'Análise de Encostas e Solos',
      tecnologias: ['Georadar', 'Machine Learning', 'Python', 'PostgreSQL']
    },
    membros: [
      { nome: 'Dr. Eduardo Santos', cargo: 'Geólogo Chefe', iniciais: 'ES', cor: '#00f5ff' },
      { nome: 'Dra. Fernanda Melo', cargo: 'Eng. Geotécnica', iniciais: 'FM', cor: '#00ff9f' },
      { nome: 'MSc. Gabriel Nunes', cargo: 'ML Engineer', iniciais: 'GN', cor: '#ff6b35' },
      { nome: 'Eng. Helena Dias', cargo: 'Backend Lead', iniciais: 'HD', cor: '#9d4edd' }
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
      descricao: 'A Equipe GAMMA atua no monitoramento costeiro e ressacas do mar na Região Leste. Desenvolvemos boias inteligentes com sensores de onda e maré, transmitindo dados em tempo real.',
      marcos: [
        { ano: '2024', descricao: 'Implantação da primeira boia inteligente' },
        { ano: '2025', descricao: 'Rede de 10 estações costeiras' },
        { ano: '2026', descricao: 'Previsão de marés com IA' }
      ],
      especialidade: 'Monitoramento Costeiro e Marítimo',
      tecnologias: ['Boias IoT', 'TensorFlow', 'Node.js', 'MongoDB']
    },
    membros: [
      { nome: 'Dra. Isabela Rios', cargo: 'Oceanógrafa', iniciais: 'IR', cor: '#00f5ff' },
      { nome: 'Dr. João Mendes', cargo: 'Eng. Costeiro', iniciais: 'JM', cor: '#00ff9f' },
      { nome: 'MSc. Karina Lopes', cargo: 'Analista de Dados', iniciais: 'KL', cor: '#ff6b35' },
      { nome: 'Eng. Leonardo Paz', cargo: 'Hardware Lead', iniciais: 'LP', cor: '#9d4edd' }
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
      descricao: 'A Equipe DELTA foca no monitoramento de qualidade do ar e queimadas na Região Oeste. Utilizamos sensores de partículas finas (PM2.5/PM10) e imagens de satélite para detectar focos de calor.',
      marcos: [
        { ano: '2024', descricao: 'Rede de 20 sensores de qualidade do ar' },
        { ano: '2025', descricao: 'Integração com satélites Sentinel' },
        { ano: '2026', descricao: 'Previsão de dispersão de fumaça' }
      ],
      especialidade: 'Qualidade do Ar e Prevenção de Queimadas',
      tecnologias: ['Sensores Ópticos', 'GIS', 'FastAPI', 'TimescaleDB']
    },
    membros: [
      { nome: 'Dr. Marcos Andrade', cargo: 'Atmosferista', iniciais: 'MA', cor: '#00f5ff' },
      { nome: 'Dra. Natália Faria', cargo: 'Eng. Ambiental', iniciais: 'NF', cor: '#00ff9f' },
      { nome: 'MSc. Otávio Reis', cargo: 'Data Scientist', iniciais: 'OR', cor: '#ff6b35' },
      { nome: 'Eng. Patricia Gomes', cargo: 'Full Stack', iniciais: 'PG', cor: '#9d4edd' }
    ]
  }
]

// ============================================================
// FUNÇÕES AUXILIARES - NÃO ALTERAR
// ============================================================

// Retorna todas as equipes
export const getEquipes = () => {
  return equipes
}

// Retorna equipe por ID
export const getEquipePorId = (id) => {
  const equipe = equipes.find(e => e.id === id)
  return equipe || equipePadrao
}

// Retorna equipe por nome da coleção Firebase
export const getEquipePorColecao = (colecao) => {
  const equipe = equipes.find(e => e.colecaoFirebase === colecao)
  return equipe || equipePadrao
}

// Retorna equipe padrão
export const getEquipePadrao = () => {
  return equipePadrao
}