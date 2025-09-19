import { Carteira, FAQ, SimulacaoResult } from '../types';

export const mockCarteiras: Carteira[] = [
  {
    id: '1',
    nome: 'Carteira Conservadora',
    perfil: 'conservador',
    descricao: 'Ideal para quem busca segurança e baixo risco',
    rentabilidadeAnual: 8.5,
    ativos: [
      {
        id: '1',
        nome: 'Tesouro Selic',
        tipo: 'Renda Fixa',
        percentual: 40,
        descricao: 'Título público com liquidez diária, acompanha a taxa básica de juros'
      },
      {
        id: '2',
        nome: 'CDB Banco',
        tipo: 'Renda Fixa',
        percentual: 30,
        descricao: 'Certificado de Depósito Bancário com baixo risco'
      },
      {
        id: '3',
        nome: 'LCI/LCA',
        tipo: 'Renda Fixa',
        percentual: 20,
        descricao: 'Letras de Crédito com isenção de IR'
      },
      {
        id: '4',
        nome: 'Fundos DI',
        tipo: 'Fundo',
        percentual: 10,
        descricao: 'Fundos que seguem a taxa DI com baixa volatilidade'
      }
    ]
  },
  {
    id: '2',
    nome: 'Carteira Moderada',
    perfil: 'moderado',
    descricao: 'Equilibrio entre segurança e rentabilidade',
    rentabilidadeAnual: 12.3,
    ativos: [
      {
        id: '5',
        nome: 'Tesouro IPCA+',
        tipo: 'Renda Fixa',
        percentual: 35,
        descricao: 'Proteção contra inflação com rentabilidade real'
      },
      {
        id: '6',
        nome: 'Ações Grandes',
        tipo: 'Ações',
        percentual: 25,
        descricao: 'Ações de empresas consolidadas (blue chips)'
      },
      {
        id: '7',
        nome: 'Fundos Multimercado',
        tipo: 'Fundo',
        percentual: 20,
        descricao: 'Diversificação em vários mercados'
      },
      {
        id: '8',
        nome: 'REITs',
        tipo: 'Fundos Imobiliários',
        percentual: 15,
        descricao: 'Fundos de investimento imobiliário'
      },
      {
        id: '9',
        nome: 'Debêntures',
        tipo: 'Renda Fixa',
        percentual: 5,
        descricao: 'Títulos de dívida corporativa'
      }
    ]
  },
  {
    id: '3',
    nome: 'Carteira Agressiva',
    perfil: 'agressivo',
    descricao: 'Máxima rentabilidade com maior exposição ao risco',
    rentabilidadeAnual: 18.7,
    ativos: [
      {
        id: '10',
        nome: 'Ações Growth',
        tipo: 'Ações',
        percentual: 40,
        descricao: 'Ações de empresas com alto potencial de crescimento'
      },
      {
        id: '11',
        nome: 'Small Caps',
        tipo: 'Ações',
        percentual: 25,
        descricao: 'Ações de empresas pequenas com alto potencial'
      },
      {
        id: '12',
        nome: 'ETF Internacional',
        tipo: 'ETF',
        percentual: 15,
        descricao: 'Exposição a mercados internacionais'
      },
      {
        id: '13',
        nome: 'Criptomoedas',
        tipo: 'Cripto',
        percentual: 10,
        descricao: 'Bitcoin e outras criptomoedas principais'
      },
      {
        id: '14',
        nome: 'Tesouro IPCA+',
        tipo: 'Renda Fixa',
        percentual: 10,
        descricao: 'Proteção mínima contra inflação'
      }
    ]
  }
];

export const mockFAQ: FAQ[] = [
  {
    id: '1',
    pergunta: 'O que é um CDB?',
    resposta: 'Certificado de Depósito Bancário é um título de renda fixa emitido por bancos. É garantido pelo FGC até R$ 250.000 por CPF por instituição.',
    categoria: 'Renda Fixa'
  },
  {
    id: '2',
    pergunta: 'Como funciona o Tesouro IPCA+?',
    resposta: 'É um título público que paga uma taxa fixa mais a variação do IPCA (inflação). Garante rentabilidade real acima da inflação.',
    categoria: 'Tesouro Direto'
  },
  {
    id: '3',
    pergunta: 'O que significa liquidez D+0 e D+30?',
    resposta: 'D+0 significa que você pode resgatar no mesmo dia. D+30 significa que o resgate acontece 30 dias úteis após a solicitação.',
    categoria: 'Liquidez'
  },
  {
    id: '4',
    pergunta: 'Qual a diferença entre LCI e LCA?',
    resposta: 'LCI é Letra de Crédito Imobiliário e LCA é Letra de Crédito do Agronegócio. Ambas são isentas de IR para pessoa física.',
    categoria: 'Renda Fixa'
  },
  {
    id: '5',
    pergunta: 'Como escolher meu perfil de investidor?',
    resposta: 'Depende da sua tolerância ao risco, objetivos e prazo. Conservador prioriza segurança, moderado busca equilíbrio, agressivo aceita mais risco por maior retorno.',
    categoria: 'Perfil'
  },
  {
    id: '6',
    pergunta: 'O que são Fundos Imobiliários (REITs)?',
    resposta: 'São fundos que investem em imóveis ou títulos imobiliários. Distribuem dividendos mensais e têm isenção de IR sobre os rendimentos.',
    categoria: 'Fundos'
  },
  {
    id: '7',
    pergunta: 'Como funciona o FGC?',
    resposta: 'Fundo Garantidor de Créditos que protege investimentos até R$ 250.000 por CPF por instituição em produtos como poupança, CDB, LCI/LCA.',
    categoria: 'Garantias'
  },
  {
    id: '8',
    pergunta: 'O que são ETFs?',
    resposta: 'Exchange Traded Funds são fundos negociados na bolsa que replicam índices. Oferecem diversificação com custos baixos.',
    categoria: 'Fundos'
  },
  {
    id: '9',
    pergunta: 'Qual a tributação da renda fixa?',
    resposta: 'Segue tabela regressiva: 22,5% até 180 dias, 20% de 181 a 360 dias, 17,5% de 361 a 720 dias, 15% acima de 720 dias.',
    categoria: 'Tributação'
  },
  {
    id: '10',
    pergunta: 'Como diversificar meus investimentos?',
    resposta: 'Distribua entre diferentes classes (renda fixa, ações, fundos), setores, prazos e geografias para reduzir riscos e otimizar retornos.',
    categoria: 'Estratégia'
  }
];

export const simulatePortfolio = (allocations: {
  rendaFixa: number;
  acoes: number;
  fundos: number;
  cripto: number;
}): SimulacaoResult => {
  const total = allocations.rendaFixa + allocations.acoes + allocations.fundos + allocations.cripto;
  
  if (total !== 100) {
    throw new Error('A soma das alocações deve ser 100%');
  }

  // Taxas de retorno esperadas (anuais) para cada classe
  const taxas = {
    rendaFixa: 0.09,    // 9% ao ano
    acoes: 0.15,        // 15% ao ano
    fundos: 0.12,       // 12% ao ano
    cripto: 0.25,       // 25% ao ano (mais volátil)
  };

  // Calcular rentabilidade ponderada
  const rentabilidadeEstimada = 
    (allocations.rendaFixa / 100) * taxas.rendaFixa +
    (allocations.acoes / 100) * taxas.acoes +
    (allocations.fundos / 100) * taxas.fundos +
    (allocations.cripto / 100) * taxas.cripto;

  // Determinar nível de risco baseado na alocação
  let risco: 'baixo' | 'medio' | 'alto' = 'baixo';
  const riscoScore = (allocations.acoes + allocations.cripto * 1.5) / 100;
  
  if (riscoScore > 0.5) {
    risco = 'alto';
  } else if (riscoScore > 0.25) {
    risco = 'medio';
  }

  // Projeções considerando juros compostos
  const valor = 10000; // Valor base para simulação
  const projecao12Meses = valor * (1 + rentabilidadeEstimada);
  const projecao24Meses = valor * Math.pow(1 + rentabilidadeEstimada, 2);
  const projecao36Meses = valor * Math.pow(1 + rentabilidadeEstimada, 3);

  return {
    rentabilidadeEstimada: rentabilidadeEstimada * 100, // converter para porcentagem
    risco,
    projecao12Meses,
    projecao24Meses,
    projecao36Meses,
  };
};
