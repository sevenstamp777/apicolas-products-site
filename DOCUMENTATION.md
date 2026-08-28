# Documentação Técnica - Site de Produtos Apiários & Cia

**Versão:** 1.0  
**Data:** 2026-08-26  
**Autor:** Wise Bot (Erick Garcia)  
**Status:** Em desenvolvimento (localhost)

---

## 📋 Sumário

1. [Visão Geral](#1-visão-geral)
2. [Arquitetura](#2-arquitetura)
3. [Stack Tecnológica](#3-stack-tecnológica)
4. [Estrutura de Pastas](#4-estrutura-de-pastas)
5. [Páginas e Rotas](#5-páginas-e-rotas)
6. [Componentes](#6-componentes)
7. [Integrações](#7-integrações)
8. [Estilização & Design System](#8-estilização--design-system)
9. [Configuração de Ambiente](#9-configuração-de-ambiente)
10. [Deploy na Vercel](#10-deploy-na-vercel)
11. [Roadmap Futuro](#11-roadmap-futuro)

---

## 1. Visão Geral

### Objetivo
Site de apresentação e captura de leads para produtos apícolas (própolis, mel, derivados) com:
- Catálogo de produtos com páginas individuais
- Quiz interativo para recomendação personalizada
- Formulários de captura de lead (nome, e-mail, WhatsApp)
- Páginas institucionais (Sobre, Contato)
- Integração temporária com Google Sheets (futuro: SendPulse)

### Público-Alvo
- Praticantes de fitness (25-45 anos)
- Buscadores de imunidade natural
- Classe média-alta, capitais brasileiras

### Diferenciais
- **Isolamento total**: Projeto independente em `/products-site/`
- **Design System próprio**: Cores propolis/mel, tipografia Inter
- **Performance**: SSG (Static Site Generation) - páginas pré-renderizadas
- **Mobile-first**: Responsivo nativo
- **SEO-ready**: Metadados, sitemap, estrutura semântica

---

## 2. Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     NEXT.JS 14 (Pages Router)              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Pages     │  │ Components  │  │   Content/JSON      │  │
│  │  (Routes)   │  │  (React)    │  │   (Products Data)   │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
│         │                │                    │             │
│         ▼                ▼                    ▼             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Build: next build (SSG)                │   │
│  │  • HTML estático para todas as rotas                │   │
│  │  • API Routes para /api/capture                     │   │
│  │  • Otimização automática de imagens/fontes          │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              VERCEL (Deploy)                        │   │
│  │  • Edge Network global                              │   │
│  │  • HTTPS automático                                 │   │
│  │  • Variáveis de ambiente seguras                    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Decisões Arquiteturais

| Decisão | Justificativa |
|---------|---------------|
| **Pages Router** (não App Router) | Simplicidade, SSG nativo, menos breaking changes |
| **JSON para produtos** | Fácil edição sem CMS, versionável no Git, zero dependências |
| **TailwindCSS** | Utility-first, design system consistente, bundle pequeno |
| **Google Apps Script** | Grátis, sem backend, setup em 5 min, migração fácil |
| **Componentes funcionais + hooks** | Padrão React moderno, testável, composável |

---

## 3. Stack Tecnológica

### Core
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Next.js | 14.2.5 | Framework React (SSG, API Routes) |
| React | 18.3.1 | UI Library |
| Node.js | 18+ | Runtime |

### Styling
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| TailwindCSS | 3.4.10 | Utility-first CSS |
| PostCSS | 8.4.39 | Processamento CSS |
| Autoprefixer | 10.4.19 | Vendor prefixes |

### Deploy & Hosting
| Serviço | Propósito |
|---------|-----------|
| Vercel | Hosting, Edge Functions, Analytics |
| Google Sheets + Apps Script | Database temporário de leads |

### Desenvolvimento
| Ferramenta | Propósito |
|------------|-----------|
| ESLint | Linting (config Next.js default) |
| Git | Versionamento |
| npm | Gerenciador de pacotes |

---

## 4. Estrutura de Pastas

```
products-site/
├── .env.example                 # Template de variáveis de ambiente
├── .gitignore                   # Ignora node_modules, .next, .env.local
├── .vercel                      # Config Vercel (criado no deploy)
├── GOOGLE_SHEETS_INTEGRATION.md # Guia integração Google Sheets
├── DOCUMENTATION.md             # Este arquivo
├── next.config.js               # Config Next.js
├── package.json                 # Dependências e scripts
├── postcss.config.js            # Config PostCSS
├── tailwind.config.js           # Config Tailwind (design tokens)
├── vercel.json                  # Config deploy Vercel
│
├── public/                      # Assets estáticos servidos em /
│   ├── favicon.ico              # Favicon (placeholder)
│   └── products/                # Imagens dos produtos (futuro)
│
├── styles/
│   └── globals.css              # CSS global + Tailwind directives
│
├── components/                  # Componentes React reutilizáveis
│   ├── CaptureForm.js           # Formulário captura (nome, email, whatsapp)
│   ├── footer.js                # Footer do site
│   ├── header.js                # Header com navegação + WhatsApp CTA
│   ├── layout.js                # Layout wrapper (Header + children + Footer)
│   └── ProductCard.js           # Card de produto no grid
│
├── content/                     # Dados estáticos (CMS leve)
│   └── products/
│       ├── propolis-verdes.json    # Própolis Verde 30%
│       ├── mel-puro-silvestre.json # Mel Puro Silvestre
│       └── propolis-spray-bucal.json # Spray Bucal
│
├── pages/                       # Rotas (Pages Router)
│   ├── _app.js                  # App wrapper + import globals.css
│   ├── _document.js             # HTML document + fonts + meta
│   ├── api/
│   │   └── capture.js           # API Route: POST /api/capture
│   ├── captura.js               # Página captura simples (lead magnet)
│   ├── contato.js               # Página contato + FAQ
│   ├── index.js                 # Homepage
│   ├── sobre.js                 # Página Sobre Nós
│   ├── quiz.js                  # Quiz interativo (4 perguntas)
│   └── produtos/
│       ├── index.js             # Lista todos os produtos (categorizado)
│       └── [slug].js            # Página dinâmica de produto
│
└── utils/                       # Utilitários (vazio por enquanto)
```

---

## 5. Páginas e Rotas

### Rotas Estáticas (SSG - geradas no build)

| Rota | Arquivo | Descrição | `getStaticProps` |
|------|---------|-----------|------------------|
| `/` | `pages/index.js` | Homepage com hero + produtos em destaque | ✅ Produtos |
| `/produtos` | `pages/produtos/index.js` | Catálogo completo categorizado | ✅ Produtos |
| `/sobre` | `pages/sobre.js` | Institucional (história, missão, valores) | ❌ |
| `/contato` | `pages/contato.js` | Contato + formulário + FAQ | ❌ |
| `/captura` | `pages/captura.js` | Lead magnet (e-book gratuito) | ❌ |
| `/quiz` | `pages/quiz.js` | Quiz 4 perguntas + resultado + captura | ❌ |

### Rotas Dinâmicas (SSG - `getStaticPaths`)

| Rota | Arquivo | Params | Descrição |
|------|---------|--------|-----------|
| `/produtos/:slug` | `pages/produtos/[slug].js` | `slug` = nome do arquivo JSON | Página individual do produto |

### Rotas de API

| Rota | Método | Descrição |
|------|--------|-----------|
| `/api/capture` | POST | Recebe lead, valida, envia para Google Apps Script |

### Produtos Cadastrados (content/products/)

| Slug | Nome | Categoria | Preço | Promoção |
|------|------|-----------|-------|----------|
| `propolis-verdes` | Própolis Verde 30% | Própolis | R$ 89,90 | R$ 119,90 |
| `mel-puro-silvestre` | Mel Puro Silvestre | Mel | R$ 64,90 | R$ 79,90 |
| `propolis-spray-bucal` | Spray Bucal de Própolis | Própolis | R$ 49,90 | R$ 59,90 |

---

## 6. Componentes

### 6.1 `layout.js` - Wrapper Principal
```jsx
<Header />
<main>{children}</main>
<Footer />
```
Usado em **todas** as páginas via `_app.js` (implícito).

### 6.2 `header.js` - Cabeçalho
- Logo + nome "Apiários & Cia"
- Navegação: Início, Produtos, Sobre, Contato
- CTA WhatsApp (desktop)
- Hamburger menu (mobile - *não implementado ainda*)

### 6.3 `footer.js` - Rodapé
- Brand + tagline
- Links de navegação
- Contatos (e-mail, WhatsApp)
- Copyright

### 6.4 `ProductCard.js` - Card de Produto
Props: `product` (objeto completo do JSON)
- Imagem placeholder (emoji + gradient)
- Badge categoria + concentração
- Nome + subtítulo
- Preço (com promoção riscada)
- Hover: elevação + borda verde + "Ver detalhes"

### 6.5 `CaptureForm.js` - Formulário de Captura
**Estado:** `formData {name, email, whatsapp}`, `status`, `isSubmitting`

**Validações:**
- Nome: obrigatório
- E-mail: regex RFC5322 simplificado
- WhatsApp: 10-11 dígitos (só números)

**Submit:** `POST /api/capture` → mostra success/error

**Estados visuais:**
- Loading: botão "Enviando..." disabled
- Error: caixa vermelha
- Success: caixa verde + limpa formulário

### 6.6 `quiz.js` (página + lógica inline)
**Estado:** `currentStep` (0-4), `answers` (objeto)

**Fluxo:**
1. Pergunta 1: Experiência com produtos
2. Pergunta 2: Benefício valorizado
3. Pergunta 3: Objetivo principal
4. Pergunta 4: Faixa de investimento
5. Resultado personalizado (3 perfis) + CaptureForm

**Perfis de resultado:**
- **Especialista** (regular + imunidade) → Própolis 30%
- **Iniciante** (nunca/incerto) → Mel + Própolis + guia
- **Explorador** (outros) → Recomendação personalizada

---

## 7. Integrações

### 7.1 Google Sheets (Atual - Temporário)

#### Fluxo
```
Formulário (CaptureForm)
       │
       ▼ POST /api/capture
┌──────────────────┐
│  API Route       │  Valida dados
│  pages/api/      │  Lê GOOGLE_APPS_SCRIPT_URL
│  capture.js      │
└────────┬─────────┘
         │
         ▼ POST form-urlencoded
┌──────────────────────┐
│  Google Apps Script  │  doPost(e)
│  (Web App)           │  Parse data
└──────────┬───────────┘  appendRow(sheet)
           │
           ▼
┌─────────────────────┐
│  Google Sheets      │  Linha: Timestamp | Nome | Email │
│  (Planilha ativa)   │  WhatsApp | Origem
└─────────────────────┘
```

#### Configuração Necessária
1. Planilha com cabeçalhos: `Data/Hora | Nome | E-mail | WhatsApp | Origem`
2. Apps Script com código `doPost(e)` (ver `GOOGLE_SHEETS_INTEGRATION.md`)
3. Deploy como **Web App**: Execute as "Eu", Acesso "Qualquer pessoa"
4. URL no `.env.local`: `GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXX/exec`

#### Limitações Conhecidas
- Rate limit: ~30 req/s (suficiente para lead gen)
- Sem dedup nativo (pode duplicar se usuário clicar 2x)
- Sem double opt-in (LGPD: adicionar checkbox futuramente)

### 7.2 SendPulse (Futuro - Produção)

#### Quando migrar
- Após compra do domínio `melpropolis.cia.com.br`
- Necessidade de automações (sequências, tags, segmentação)

#### Migração Planejada
```javascript
// pages/api/capture.js - novo código
const sendpulse = require('sendpulse-api');
// 1. Autenticar (client_id + client_secret)
// 2. Adicionar contato ao book (book_id)
// 3. Tag por origem: 'quiz', 'captura', 'contato'
// 4. Trigger automação de boas-vindas
```

#### Variáveis de Ambiente Novas
```env
SENDPULSE_CLIENT_ID=
SENDPULSE_CLIENT_SECRET=
SENDPULSE_BOOK_ID=
SENDPULSE_DOUBLE_OPTIN=true
```

---

## 8. Estilização & Design System

### 8.1 Paleta de Cores (tailwind.config.js)

```javascript
colors: {
  propolis: {
    green: '#2D5A27',    // Primary - botões, links, accent
    light: '#4A7C40',    // Hover, focus, secondary
    dark: '#1A3A18',     // Backgrounds escuros
  },
  honey: {
    amber: '#D4A853',    // Accent quente, highlights
    dark: '#A67C2A',     // Hover âmbar
  },
}
```

### 8.2 Variáveis CSS (globals.css)
```css
:root {
  --bg: #0a0a0f;           // Fundo principal (quase preto azulado)
  --bg-subtle: #12121a;    // Cards, inputs
  --fg: #e8e8f0;           // Texto principal (off-white)
  --muted: #6b6b80;        // Texto secundário
  --accent: #2d5a27;       // Verde propolis (primary)
  --accent-light: #4a7c40; // Verde claro (hover)
  --card: #16161f;         // Background cards
  --border: #2a2a3a;       // Bordas sutis
}
```

### 8.3 Tipografia
- **Display/Headings**: `'Inter'` (Google Fonts) - weights 400-700
- **Body**: Sistema (`-apple-system, BlinkMacSystemFont, 'Segoe UI'...`)
- **Serif opcional**: Georgia (disponível no theme)

### 8.4 Espaçamento & Breakpoints
- **Container**: `max-w-6xl` (1152px) + `px-4 sm:px-6`
- **Breakpoints**: sm:640, md:768, lg:1024, xl:1280
- **Grid produtos**: 1 col (mobile) → 2 (tablet) → 3 (desktop)

### 8.5 Animações & Transições
- `transition-all duration-300` nos cards
- `hover:shadow-lg hover:shadow-[var(--accent)]/30` nos CTAs
- Progress bar no quiz: `transition-all duration-300`
- Focus-visible: `outline-2 outline-[var(--accent)]`

---

## 9. Configuração de Ambiente

### Arquivos de Configuração

| Arquivo | Propósito | Commit? |
|---------|-----------|---------|
| `.env.example` | Template (sem secrets) | ✅ Sim |
| `.env.local` | Desenvolvimento local | ❌ Não (gitignored) |
| `.env.production` | Produção (Vercel) | ❌ Não (Vercel Dashboard) |
| `vercel.json` | Config deploy | ✅ Sim |

### Variáveis Obrigatórias

```bash
# .env.local (desenvolvimento)
NEXT_PUBLIC_SITE_URL=http://localhost:3002
NEXT_PUBLIC_WHATSAPP=5511999999999
NEXT_PUBLIC_EMAIL=contato@local.dev
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID/exec
```

### Variáveis de Produção (Vercel Dashboard)
```bash
NEXT_PUBLIC_SITE_URL=https://melpropolis.cia.com.br
NEXT_PUBLIC_WHATSAPP=5511999999999
NEXT_PUBLIC_EMAIL=contato@melpropolis.cia.com.br
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID/exec
# Futuro:
# SENDPULSE_CLIENT_ID=
# SENDPULSE_CLIENT_SECRET=
# SENDPULSE_BOOK_ID=
```

---

## 10. Deploy na Vercel

### Pré-requisitos
- Conta Vercel conectada ao GitHub/GitLab/Bitbucket
- Repositório com o projeto

### Passos

1. **Import Project** no Vercel
2. **Root Directory**: `products-site` (se mono-repo) ou raiz
3. **Framework Preset**: Next.js (auto-detectado)
4. **Build Command**: `next build` (padrão)
5. **Output Directory**: `.next` (padrão)
6. **Environment Variables**: Adicionar todas do `.env.example`
7. **Deploy**

### Configurações Vercel (vercel.json)
```json
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "next build",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {"key": "X-Content-Type-Options", "value": "nosniff"},
        {"key": "X-Frame-Options", "value": "DENY"},
        {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"}
      ]
    }
  ]
}
```

### Domínio Personalizado
Após deploy:
1. Settings > Domains > Add
2. `melpropolis.cia.com.br` + `www.melpropolis.cia.com.br`
3. DNS: CNAME `cname.vercel-dns.com` ou A `76.76.21.21`
4. SSL automático

---

## 11. Roadmap Futuro

### 🎯 Prioridade Alta (Pré-lançamento)

| Item | Esforço | Descrição |
|------|---------|-----------|
| **Imagens reais dos produtos** | Baixo | Substituir placeholders por fotos profissionais |
| **Favicon + OG Image** | Baixo | Branding completo para compartilhamento |
| **LGPD Compliance** | Médio | Checkbox consentimento, política privacidade, termos |
| **Double Opt-in SendPulse** | Médio | Confirmação de e-mail antes de adicionar à lista |
| **Teste A/B Quiz vs Captura** | Médio | Medir conversão de cada funil |
| **Analytics (GA4 + Vercel)** | Baixo | Eventos: quiz_start, quiz_complete, form_submit |

### 🔧 Prioridade Média (Pós-lançamento)

| Item | Esforço | Descrição |
|------|---------|-----------|
| **CMS Headless (Contentful/Sanity)** | Alto | Gestão de produtos sem deploy |
| **Blog/Conteúdo SEO** | Médio | Artigos sobre própolis, mel, imunidade |
| **Área do Cliente** | Alto | Histórico pedidos, rastreamento |
| **Checkout integrado** | Alto | Pagamento (Mercado Pago/Stripe) |
| **PWA/Offline** | Médio | Service Worker, install prompt |
| **Internacionalização (EN/ES)** | Alto | i18n routing, traduções |

### 💡 Prioridade Baixa (Nice to Have)

| Item | Descrição |
|------|-----------|
| **Calculadora de dosagem** | Baseada em peso/idade |
| **Programa de fidelidade** | Pontos por compra/indicação |
| **Chatbot WhatsApp** | FAQ automático + transferência humana |
| **App móvel (React Native)** | Compartilhar codebase via monorepo |

---

## 📝 Checklist de Qualidade (Antes de Cada Deploy)

- [ ] `npm run build` passa sem erros
- [ ] `npm run lint` sem warnings críticos
- [ ] Todas as rotas carregam (teste manual)
- [ ] Formulários enviam dados (teste dev + prod)
- [ ] Google Sheets recebe leads
- [ ] Mobile: iOS Safari + Android Chrome
- [ ] Performance: Lighthouse > 90
- [ ] SEO: meta tags, sitemap.xml, robots.txt
- [ ] Variáveis de ambiente configuradas no Vercel

---

## 🔗 Links Úteis

| Recurso | Link |
|---------|------|
| Repositório | *(privado)* |
| Vercel Dashboard | https://vercel.com/dashboard |
| Google Sheets (Leads) | *(criar)* |
| Apps Script Editor | https://script.google.com |
| SendPulse Dashboard | https://login.sendpulse.com |
| Tailwind Docs | https://tailwindcss.com/docs |
| Next.js Docs | https://nextjs.org/docs |

---

## 📞 Contatos & Responsáveis

| Papel | Nome | Contato |
|-------|------|---------|
| Product Owner | Erick Garcia | WhatsApp / E-mail |
| Desenvolvimento | Wise Bot (AI) | Sessão OpenClaw |
| Design | *(a definir)* | - |
| Marketing | *(a definir)* | - |

---

## 📄 Changelog

| Data | Versão | Alterações |
|------|--------|------------|
| 2026-08-25 | 0.1 | Setup inicial Next.js + Tailwind |
| 2026-08-25 | 0.2 | Home, Produtos, Produto individual, Sobre |
| 2026-08-25 | 0.3 | Captura, Contato, Quiz |
| 2026-08-26 | 1.0 | Integração Google Sheets, Documentação |

---

*Documentação viva - atualize a cada mudança significativa no projeto.*