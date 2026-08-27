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
      data.origem || 'site-captura',
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