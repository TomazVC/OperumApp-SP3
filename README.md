# 💼 Operum - Assessor Virtual de Investimentos

**CP3 - Mobile Development and IoT**  
**React Native + Expo + TypeScript**

## 📋 Sobre o Projeto

O Operum é um aplicativo mobile de assessoria virtual de investimentos desenvolvido como projeto do CP3. O app oferece diagnóstico de perfil do investidor, carteiras recomendadas, simulador de investimentos e conteúdo educacional sobre o mercado financeiro.

## 👥 Integrantes

- **Lucas Laia Manentti** — RM 97709
- **Pedro Oliveira Valotto** — RM 551445
- **Rony Ken Nagai** — RM 551549
- **Tomáz Versolato Carballo** — RM 551417

## 🎯 Funcionalidades Implementadas

### ✅ Pontuação CP3 (100 pontos)

#### 🏠 Home com Navegação (25 pontos)
- ✅ **Tab Navigation** com 5 abas (Home, Carteiras, Simulador, Educação, Perfil)
- ✅ Navegação fluida entre todas as telas
- ✅ Atalhos visuais para acesso rápido às funcionalidades
- ✅ Interface responsiva e acessível

#### 🔐 Tela de Login com AsyncStorage (25 pontos)
- ✅ **Login funcional** com validação (email deve conter "@", senha ≥ 4 caracteres)
- ✅ **AsyncStorage** para persistir sessão do usuário
- ✅ **Logout** que limpa dados armazenados
- ✅ **Proteção de rotas** - redirecionamento automático baseado no status de autenticação
- ✅ **Credenciais de teste** disponíveis no app

#### 📱 Telas com Conteúdo Real (40 pontos)
1. **🏠 Home**: Boas-vindas personalizadas, informações do perfil, acesso rápido
2. **💼 Carteiras**: Lista de carteiras por perfil (conservador, moderado, agressivo) com detalhes
3. **📊 Simulador**: Sliders para alocação de ativos, cálculo de projeções, gráfico de resultado
4. **📚 Educação**: FAQ interativo com busca, categorias, demonstração de chat
5. **⚙️ Perfil**: Informações do usuário, características do perfil, configurações, logout

#### 🏗️ Arquitetura Clara (10 pontos)
- ✅ **Estrutura de pastas** organizada e modular
- ✅ **Componentes reutilizáveis** (Button, Input, Card, EmptyState)
- ✅ **Hooks personalizados** para autenticação
- ✅ **Tipos TypeScript** bem definidos
- ✅ **Separação de responsabilidades**

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

### Regra de Login:
- ✅ Email deve conter "@"
- ✅ Senha deve ter pelo menos 4 caracteres
- ✅ O perfil é determinado automaticamente baseado no email

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

## 🐛 Troubleshooting

### Erro ao iniciar:
```bash
# Limpar cache
npx expo start -c

# Reinstalar dependências
rm -rf node_modules
npm install
```

### Problemas de navegação:
- Verifique se todas as dependências foram instaladas
- Reinicie o metro bundler

### AsyncStorage não funciona:
- Teste em dispositivo físico ou emulador (não funciona no web)

## 📝 Observações de Desenvolvimento

### Decisões Técnicas:
- **Tab Navigation** escolhida por melhor UX mobile
- **AsyncStorage** para persistência simples e eficaz
- **Dados mock** bem estruturados para demonstrar funcionalidades
- **TypeScript** para maior robustez e manutenibilidade

### Melhorias Futuras:
- Integração com APIs reais de investimentos
- Gráficos mais avançados com bibliotecas especializadas
- Sistema de notificações push
- Biometria para autenticação
- Modo escuro

## ✅ Checklist de Aceite

- [x] `git clone`, `npm i`, `npx expo start` — **sem erro**
- [x] Login grava/limpa sessão; redireciona corretamente
- [x] Navegação entre **todas** as telas funciona
- [x] Existem **≥ 3** telas de conteúdo útil (Carteiras, Simulador, Educação)
- [x] Arquitetura/pastas conforme descrito; componentes reutilizados
- [x] README completo com nomes/RMs e instruções

---

**Desenvolvido com ❤️ pela equipe FIAP para o CP3 - Mobile Development and IoT**
