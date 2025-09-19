# 💼 Operum - Assessor Virtual de Investimentos
 
**React Native + Expo + TypeScript**

## 📋 Sobre o Projeto

O Operum é um aplicativo mobile de assessoria virtual de investimentos desenvolvido como projeto do Challenge. O app oferece diagnóstico de perfil do investidor, carteiras recomendadas, simulador de investimentos e conteúdo educacional sobre o mercado financeiro.

## 👥 Integrantes

- **Pedro Oliveira Valotto** — RM 551445
- **Rony Ken Nagai** — RM 551549
- **Tomáz Versolato Carballo** — RM 551417

## 🎯 Funcionalidades Implementadas

### ✅ Pontuação SP3

#### 🏠 Home com Navegação

#### 🔐 Tela de Login com AsyncStorage

#### 📱 Telas com Conteúdo Real
1. **🏠 Home**: Boas-vindas personalizadas, informações do perfil, acesso rápido
2. **💼 Carteiras**: Lista de carteiras por perfil (conservador, moderado, agressivo) com detalhes
3. **📊 Simulador**: Sliders para alocação de ativos, cálculo de projeções, gráfico de resultado
4. **📚 Educação**: FAQ interativo com busca, categorias, demonstração de chat
5. **⚙️ Perfil**: Informações do usuário, características do perfil, configurações, logout

#### 🏗️ Arquitetura Clara

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI: `npm install -g @expo/cli`
- Dispositivo físico com Expo Go OU emulador Android/iOS

### Passo a Passo

1. **Clone o repositório:**
```bash
git clone [URL_DO_REPOSITORIO]
cd OperumApp
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o projeto:**
```bash
npm start
# ou
npx expo start
```

4. **Execute no dispositivo:**

**📱 Android:**
```bash
npm run android
# ou
npx expo start --android
```

**🍎 iOS:**
```bash
npm run ios
# ou
npx expo start --ios
```

**🌐 Web (opcional):**
```bash
npm run web
# ou
npx expo start --web
```

## 🔑 Credenciais de Teste

### Credenciais Principais:
- **Email:** `teste@operum.app`
- **Senha:** `1234`

### Credenciais Alternativas:
- **Email:** `conservador@operum.app` (perfil conservador)
- **Senha:** `1234`
- **Email:** `agressivo@operum.app` (perfil agressivo)
- **Senha:** `1234`

## 📂 Estrutura do Projeto

```
OperumApp/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── EmptyState.tsx
│   │   ├── AuthProvider.tsx
│   │   └── index.ts
│   ├── screens/             # Telas da aplicação
│   │   ├── LoginScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CarteirasScreen.tsx
│   │   ├── SimuladorScreen.tsx
│   │   ├── EducacaoScreen.tsx
│   │   ├── PerfilScreen.tsx
│   │   └── index.ts
│   ├── navigation/          # Configuração de navegação
│   │   └── AppNavigator.tsx
│   ├── hooks/               # Hooks customizados
│   │   └── useAuth.ts
│   ├── storage/             # Gerenciamento AsyncStorage
│   │   └── session.ts
│   ├── data/                # Dados mock
│   │   └── mockData.ts
│   └── types/               # Definições TypeScript
│       └── index.ts
├── App.tsx                  # Componente principal
├── package.json
└── README.md
```

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **@react-navigation/native** - Navegação
- **@react-navigation/bottom-tabs** - Tab navigation
- **@react-native-async-storage/async-storage** - Persistência local
- **react-native-safe-area-context** - Áreas seguras
- **react-native-gesture-handler** - Gestos
- **react-native-reanimated** - Animações

## 💡 Principais Características

### 🎨 Design e UX
- Interface moderna e intuitiva
- Tema consistente com cores do sistema iOS
- Componentes acessíveis com feedback visual
- Responsividade para diferentes tamanhos de tela

### 🔐 Autenticação
- Sistema de login robusto com validação
- Persistência de sessão usando AsyncStorage
- Proteção automática de rotas
- Logout seguro com limpeza de dados

### 📊 Funcionalidades de Investimento
- **Carteiras Personalizadas**: 3 perfis com alocações diferentes
- **Simulador Interativo**: Ajuste de % por ativo com projeções
- **Educação Financeira**: FAQ searchable com 10+ perguntas
- **Gestão de Perfil**: Informações detalhadas do investidor

### 🏗️ Arquitetura
- **Separação de responsabilidades**
- **Componentes reutilizáveis**
- **Gerenciamento de estado com hooks**
- **Tipagem TypeScript completa**

## 📈 Dados Mock

### Carteiras Disponíveis:
1. **Conservadora** (8.5% a.a.): Renda fixa + fundos DI
2. **Moderada** (12.3% a.a.): Mix renda fixa + ações + REITs
3. **Agressiva** (18.7% a.a.): Ações growth + small caps + cripto

### FAQ:
10 perguntas cobrindo tópicos como CDB, Tesouro IPCA+, FGC, ETFs, tributação, etc.

### Simulador:
- 4 classes de ativos (Renda Fixa, Ações, Fundos, Cripto)
- Cálculo automático de rentabilidade e risco
- Projeções para 12, 24 e 36 meses

---
