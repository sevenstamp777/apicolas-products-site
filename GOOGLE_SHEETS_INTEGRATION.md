# 📊 Integração Google Sheets via Apps Script

Este guia mostra como configurar um webhook no Google Apps Script para receber leads do formulário do site e salvar automaticamente em uma planilha do Google Sheets.

---

## 🚀 Passo a Passo (5 minutos)

### 1. Crie a Planilha
1. Acesse [sheets.google.com](https://sheets.google.com)
2. Clique em **"+" em branco** para nova planilha
3. Nomeie: **"Leads - Apiários & Cia"**
4. Na linha 1 (cabeçalho), coloque:
   | A | B | C | D | E |
   |---|---|---|---|---|
   | **Data/Hora** | **Nome** | **E-mail** | **WhatsApp** | **Origem** |

### 2. Abra o Apps Script
1. Na planilha: **Extensões > Apps Script**
2. Apague todo o código padrão (`meuFuncao`)
3. Cole o código abaixo:

---

## 📋 Código do Apps Script

```javascript
/**
 * Google Apps Script - Webhook para captura de leads
 * Salva automaticamente na planilha atual
 * 
 * Como usar:
 * 1. Cole este código em Extensões > Apps Script
 * 2. Salve (Ctrl+S) - dê um nome ao projeto
 * 3. Implantar > Nova implantação
 * 4. Tipo: "Aplicativo Web"
 * 5. Executar como: "Eu"
 * 6. Quem tem acesso: "Qualquer pessoa"
 * 7. Clique em "Implantar"
 * 8. Copie a URL gerada (termina em /exec)
 * 9. Cole no .env.local como GOOGLE_APPS_SCRIPT_URL
 */

function doPost(e) {
  try {
    // Parse dos dados recebidos (form-urlencoded ou JSON)
    let data;
    if (e.postData && e.postData.contents) {
      // Tenta JSON primeiro
      try {
        data = JSON.parse(e.postData.contents);
      } catch {
        // Se falhar, assume form-urlencoded
        const params = new URLSearchParams(e.postData.contents);
        data = {};
        for (const [key, value] of params) {
          data[key] = value;
        }
      }
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error('Nenhum dado recebido');
    }

    // Validação básica
    if (!data.nome || !data.email) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Campos obrigatórios faltando' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Acessa a planilha ativa (a que está vinculada a este script)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Prepara linha de dados
    const row = [
      data.timestamp || new Date().toISOString(),
      data.nome || '',
      data.email || '',
      data.whatsapp || '',
      data.origem || 'site-quiz',
    ];

    // Adiciona à planilha
    sheet.appendRow(row);

    // Log para debug
    console.log('Lead salvo:', row);

    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Lead salvo com sucesso',
        row: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: error.toString(),
        success: false 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função auxiliar para testar localmente
function testDoPost() {
  const testEvent = {
    postData: {
      contents: 'nome=Teste Usuario&email=teste@email.com&whatsapp=11999999999&timestamp=2024-01-15T10:30:00Z&origem=teste'
    }
  };
  const result = doPost(testEvent);
  Logger.log(result.getContent());
}
```

---

## ⚙️ Configuração da Implantação

1. **Salve** o script (Ctrl+S) → Nomeie: "Webhook Leads Apiários"
2. **Implantar** (canto superior direito) > **Nova implantação**
3. **Tipo**: Selecione ⚙️ **Aplicativo Web**
4. **Descrição**: "Webhook captura leads site"
5. **Executar como**: **Eu** (seu e-mail Google)
6. **Quem tem acesso**: **Qualquer pessoa** (importante!)
7. **Implantar**
8. **Autorize** o acesso na tela que abrir (pode aparecer "Google não verificou" → Avançado → Acessar mesmo assim)
9. **Copie a URL** gerada (ex: `https://script.google.com/macros/s/AKfycbx.../exec`)

---

## 🔧 Configurar no Site

### No arquivo `.env.local`:
```bash
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/SEU_CODIGO_AQUI/exec
```

### No servidor (Vercel):
1. Vá em **Settings > Environment Variables**
2. Adicione: `GOOGLE_APPS_SCRIPT_URL` = sua URL do Apps Script
3. **Redeploy** o projeto

---

## ✅ Testando

### Teste pelo terminal:
```bash
curl -X POST "https://script.google.com/macros/s/SEU_CODIGO/exec" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "nome=Teste Usuario&email=teste@email.com&whatsapp=11999999999&origem=teste"
```

### Teste pelo site:
1. Acesse http://localhost:3002/quiz
2. Complete o quiz
3. Preencha o formulário
4. Verifique a planilha - deve aparecer a nova linha

---

## 🔍 Debug e Monitoramento

### Ver logs no Apps Script:
1. No editor do Apps Script: **Execuções** (ícone relógio à esquerda)
2. Clique na execução mais recente
3. Veja logs de `console.log()`

### Ver erros:
- Se der erro 400/500: verifique **Execuções** > detalhes
- Erro comum: "Exception: Request failed" = problema de CORS ou URL errada

---

## 📝 Campos Salvos na Planilha

| Coluna | Campo | Exemplo |
|--------|-------|---------|
| A | Data/Hora | 2024-01-15T10:30:00.000Z |
| B | Nome | João Silva |
| C | E-mail | joao@email.com |
| D | WhatsApp | 5511999999999 |
| E | Origem | site-quiz / site-captura / site-contato |

---

## 🔄 Futuro: Migração para SendPulse

Quando comprar o domínio `melpropolis.cia.com.br`:

1. **Remova** a integração Google Sheets
2. **Adicione** variáveis SendPulse no `.env`:
   ```bash
   SENDPULSE_CLIENT_ID=xxx
   SENDPULSE_CLIENT_SECRET=xxx
   SENDPULSE_BOOK_ID=xxx
   SENDPULSE_DOUBLE_OPTIN=true
   ```
3. **Atualize** `pages/api/capture.js` para usar API SendPulse
4. **Mantenha** o mesmo fluxo no front-end (formulário não muda)

---

## ❓ Troubleshooting

| Problema | Solução |
|----------|---------|
| "Script function not found: doPost" | Salve o script e reimplante |
| "Access denied" | Em Implantação: "Quem tem acesso" = "Qualquer pessoa" |
| Dados não aparecem | Verifique se a planilha correta está ativa |
| CORS error | Apps Script já permite CORS; verifique URL correta |
| WhatsApp sem formatação | O script já limpa (remove não-dígitos) |

---

## 📞 Suporte

Se tiver dúvidas:
- Teste com o `curl` acima primeiro
- Verifique logs em **Execuções** no Apps Script
- Confirme que a URL termina em `/exec` (não `/dev`)
- Certifique-se de que **reimplantou** após mudanças no código

---

*Última atualização: 2026-08-26*  
*Versão: 1.0 - Para uso temporário até migração SendPulse*