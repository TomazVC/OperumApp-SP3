export interface User {
  id: string;
  name: string;
  email: string;
  perfil: 'conservador' | 'moderado' | 'agressivo';
}

export interface Carteira {
  id: string;
  nome: string;
  perfil: 'conservador' | 'moderado' | 'agressivo';
  descricao: string;
  rentabilidadeAnual: number;
  ativos: Ativo[];
}

export interface Ativo {
  id: string;
  nome: string;
  tipo: string;
  percentual: number;
  descricao: string;
}

export interface SimulacaoInput {
  rendaFixa: number;
  acoes: number;
  fundos: number;
  cripto: number;
}

export interface SimulacaoResult {
  rentabilidadeEstimada: number;
  risco: 'baixo' | 'medio' | 'alto';
  projecao12Meses: number;
  projecao24Meses: number;
  projecao36Meses: number;
}

export interface FAQ {
  id: string;
  pergunta: string;
  resposta: string;
  categoria: string;
}
