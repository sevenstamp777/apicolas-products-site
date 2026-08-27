# 📊 Configuração do Google Apps Script

Este guia mostra como configurar o webhook do Google Apps Script para receber leads do formulário do site e salvar automaticamente em uma planilha do Google Sheets.

## 🚀 Configuração Rápida (5 minutos)

### Passo 1: Acesse a Planilha
1. Acesse [sheets.google.com](https://sheets.google.com)
2. Abra ou crie a planilha **"Leads - Produtos Site"**

### Passo 2: Abra o Apps Script
1. Na planilha: **Extensões > Apps Script**
2. Apague todo o código padrão (`meuFuncao`)
3. Cole o código do arquivo `scripts/google-apps-script.js`

### Passo 3: Configure e Implante
1. **Salve** o script (Ctrl+S) → Nomeie: "Webhook Leads Apiários"
2. **Implantar** (canto superior direito) > **Nova implantação**
3. **Tipo**: Selecione ⚙️ **Aplicativo Web**
4. **Descrição**: "Webhook captura leads site"
5. **Executar como**: **Eu** (seu e-mail Google)
6. **Quem tem acesso**: **Qualquer pessoa** (importante!)
7. **Implantar**
8. **Autorize** o acesso na tela que abrir
9. **Copie a URL** gerada (ex: `https://script.google.com/macros/s/AKfycbx.../exec`)

### Passo 4: Configure no Site
1. Edite o arquivo `.env.local`:
   ```bash
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/SUA_URL_AQUI/exec
   ```

2. Faça deploy no Vercel:
   ```bash
   vercel --prod
   ```

### Passo 5: Teste
```bash
curl -X POST "https://products-site-gamma.vercel.app/api/capture" \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@email.com","whatsapp":"11999999999"}'
```

## 📋 Como Funciona

1. **Usuário preenche o formulário** no site
2. **API recebe os dados** e envia para o Apps Script
3. **Apps Script salva** na planilha do Google Sheets
4. **Dados aparecem** automaticamente na planilha

## 🔧 Troubleshooting

| Problema | Solução |
|----------|---------|
| "Script function not found: doPost" | Salve o script e reimplante |
| "Access denied" | Em Implantação: "Quem tem acesso" = "Qualquer pessoa" |
| Dados não aparecem | Verifique se a planilha correta está ativa |
| CORS error | Apps Script já permite CORS; verifique URL correta |

## 📝 Campos Salvos na Planilha

| Coluna | Campo | Exemplo |
|--------|-------|---------|
| A | Data/Hora | 2024-01-15T10:30:00.000Z |
| B | Nome | João Silva |
| C | E-mail | joao@email.com |
| D | WhatsApp | 5511999999999 |
| E | Origem | site-captura |

## 🚀 Script de Configuração Automática

Execute o script de configuração:
```bash
bash scripts/setup-google-apps-script.sh
```

O script irá:
1. Verificar se já existe configuração
2. Guiar você passo a passo
3. Salvar a URL no `.env.local`
4. Fornecer instruções de deploy