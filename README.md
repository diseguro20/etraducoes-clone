# eTraduções Clone

Clone completo da plataforma [eTraduções](https://www.etraducoes.com.br/) — empresa de tradução juramentada, certificada e técnica.

## 🚀 Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Deploy**: Vercel (frontend) + Firebase (backend)

## 📦 Funcionalidades

### Público
- ✅ Homepage completa com hero, serviços, idiomas, como funciona, depoimentos, CTA
- ✅ Formulário de orçamento com upload de documentos
- ✅ Página de Tradução Juramentada com FAQ
- ✅ Página de Tradução Certificada
- ✅ Página de Tradução Técnica
- ✅ Página de Apostilamento de Haia
- ✅ Plataforma AIUTA
- ✅ Sobre Nós com timeline e valores
- ✅ Página de Idiomas (+14 idiomas)
- ✅ Contato com escritórios
- ✅ Política de Privacidade (LGPD)

### Área do Cliente
- ✅ Login com e-mail/senha e Google
- ✅ Cadastro de usuário
- ✅ Dashboard com lista de pedidos
- ✅ Acompanhamento de status em tempo real

### Painel Admin
- ✅ Gerenciamento de orçamentos recebidos
- ✅ Atualização de status de pedidos
- ✅ Visualização de métricas

### Backend (Firebase)
- ✅ Firestore com coleções: `users`, `quotes`, `orders`
- ✅ Authentication com Email/Password + Google
- ✅ Storage para documentos com limite 1 GB
- ✅ Security Rules com controle de acesso por papel

## ⚙️ Configuração

### 1. Firebase

1. Crie um projeto em [console.firebase.google.com](https://console.firebase.google.com)
2. Ative **Authentication** (Email/Password + Google)
3. Ative **Firestore Database** (modo produção)
4. Ative **Storage**
5. Copie as credenciais do projeto

### 2. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=seu-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=5511920037059
```

### 3. Deploy das Regras Firebase

```bash
npm install -g firebase-tools
firebase login
firebase init  # selecione Firestore e Storage
firebase deploy --only firestore:rules,storage
```

### 4. Desenvolvimento Local

```bash
npm install
npm run dev
```

### 5. Deploy na Vercel

```bash
npm install -g vercel
vercel
```

Ou conecte o repositório GitHub à Vercel pelo painel web e configure as variáveis de ambiente lá.

## 🔑 Tornar um usuário Admin

No Firestore, vá em `users/{uid}` e mude o campo `isAdmin` para `true`.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Estilos globais
│   ├── traducao-juramentada/       # Serviço
│   ├── traducao-certificada/       # Serviço
│   ├── traducao-tecnica/           # Serviço
│   ├── apostilamento-de-haia/      # Serviço
│   ├── plataforma-de-traducao/     # AIUTA
│   ├── sobre-nos/                  # Sobre a empresa
│   ├── contato/                    # Contato
│   ├── idiomas/                    # Lista de idiomas
│   ├── orcamento-traducoes/        # Formulário de orçamento
│   ├── politicas-de-privacidade/   # LGPD
│   ├── me/
│   │   ├── login/                  # Login
│   │   ├── cadastro/               # Cadastro
│   │   └── pedidos/                # Dashboard do cliente
│   └── admin/                      # Painel admin
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── forms/
│   │   └── QuoteForm.tsx
│   └── ui/
│       └── WhatsAppButton.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   ├── firebase.ts
│   ├── firestore.ts
│   ├── storage.ts
│   └── utils.ts
└── types/
    └── index.ts
```
