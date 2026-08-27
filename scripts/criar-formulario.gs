/**
 * Script para criar Google Form automaticamente
 * 
 * COMO USAR:
 * 1. Abra https://sheets.google.com
 * 2. Crie uma nova planilha (ou abra existente)
 * 3. Vá em: Extensões > Apps Script
 * 4. Cole todo este código
 * 5. Salve (Ctrl+S)
 * 6. Execute a função: criarFormulario
 * 7. Autorize o acesso quando solicitado
 * 8. Copie a URL do formulário e os Entry IDs gerados
 */

function criarFormulario() {
  // Cria o formulário
  const form = FormApp.create('Capture de Leads - Produtos Site');
  form.setDescription('Formulário de captação de leads do site');
  form.setAllowResponseEdits(false);
  form.setCollectEmail(false); // DESABILITA coleta de e-mail automático
  
  // Adiciona os campos
  const nomeField = form.addTextItem()
    .setTitle('Nome completo')
    .setRequired(true);
  
  const emailField = form.addTextItem()
    .setTitle('Seu melhor e-mail')
    .setRequired(true);
  
  const whatsappField = form.addTextItem()
    .setTitle('WhatsApp com DDD')
    .setRequired(true);
  
  // Vincula a uma nova planilha
  const spreadsheet = SpreadsheetApp.create('Leads - Produtos Site');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  
  // Obtém os Entry IDs
  const formId = form.getId();
  const formUrl = form.getPublishedUrl();
  
  // Para obter os Entry IDs, precisamos inspecionar o HTML do formulário
  // Vamos usar uma abordagem diferente: criar um HTML temporário
  const htmlOutput = HtmlService.createHtmlOutput(
    '<script>' +
    'google.script.run' +
    '</script>'
  );
  
  // Log dos resultados
  Logger.log('=== FORMULÁRIO CRIADO COM SUCESSO ===');
  Logger.log('ID do Form: ' + formId);
  Logger.log('URL do Form: ' + formUrl);
  Logger.log('ID da Planilha: ' + spreadsheet.getId());
  Logger.log('URL da Planilha: ' + spreadsheet.getUrl());
  Logger.log('');
  Logger.log('PRÓXIMOS PASSOS:');
  Logger.log('1. Acesse a planilha: ' + spreadsheet.getUrl());
  Logger.log('2. Acesse o formulário: ' + formUrl);
  Logger.log('3. Copie os Entry IDs do HTML do formulário');
  Logger.log('4. Atualize a API com os novos Entry IDs');
  
  // Tenta extrair os Entry IDs do formulário
  // Nota: O Google Forms não fornece Entry IDs diretamente via API
  // É necessário inspecionar o HTML do formulário
  
  // Vamos criar um manifesto com as informações
  const manifest = {
    formId: formId,
    formUrl: formUrl,
    spreadsheetId: spreadsheet.getId(),
    spreadsheetUrl: spreadsheet.getUrl(),
    fields: {
      nome: 'Nome completo',
      email: 'Seu melhor e-mail',
      whatsapp: 'WhatsApp com DDD'
    }
  };
  
  // Salva o manifesto na planilha
  const ss = SpreadsheetApp.openById(spreadsheet.getId());
  const sheet = ss.getActiveSheet();
  sheet.setName('Configuração');
  sheet.getRange('A1').setValue('Configuração do Formulário');
  sheet.getRange('A3').setValue('Form ID:');
  sheet.getRange('B3').setValue(formId);
  sheet.getRange('A4').setValue('Form URL:');
  sheet.getRange('B4').setValue(formUrl);
  sheet.getRange('A5').setValue('Spreadsheet ID:');
  sheet.getRange('B5').setValue(spreadsheet.getId());
  
  // Cria aba de leads
  ss.insertSheet('Leads');
  const leadsSheet = ss.getSheetByName('Leads');
  leadsSheet.getRange('A1').setValue('Data/Hora');
  leadsSheet.getRange('B1').setValue('Nome');
  leadsSheet.getRange('C1').setValue('E-mail');
  leadsSheet.getRange('D1').setValue('WhatsApp');
  leadsSheet.getRange('E1').setValue('Origem');
  
  // Formata o cabeçalho
  const headerRange = leadsSheet.getRange('A1:E1');
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f5a623');
  headerRange.setFontColor('#0f0d08');
  
  // Remove a aba padrão
  try {
    ss.deleteSheet(ss.getSheets()[0]);
  } catch (e) {
    // Ignora erro se não puder deletar
  }
  
  Logger.log('');
  Logger.log('=== MANIFESTO ===');
  Logger.log(JSON.stringify(manifest, null, 2));
  
  // Retorna o manifesto
  return manifest;
}

/**
 * Função para extrair Entry IDs do HTML do formulário
 * Execute esta função após criar o formulário
 */
function extrairEntryIds(formUrl) {
  // NOTA: Esta função requer acesso à URL do formulário
  // O Google Apps Script não pode acessar URLs externas diretamente
  // Você precisará inspecionar o HTML manualmente
  
  Logger.log('Para extrair os Entry IDs:');
  Logger.log('1. Acesse o formulário: ' + formUrl);
  Logger.log('2. Pressione F12 para abrir o DevTools');
  Logger.log('3. Vá na aba Console');
  Logger.log('4. Cole e execute este código:');
  Logger.log('');
  Logger.log('(() => {');
  Logger.log('  const html = document.documentElement.innerHTML;');
  Logger.log('  const matches = html.match(/entry\\.([0-9]+)/g);');
  Logger.log('  if (matches) {');
  Logger.log('    const unique = [...new Set(matches)];');
  Logger.log('    console.log("Entry IDs encontrados:");');
  Logger.log('    unique.forEach(id => console.log(id));');
  Logger.log('  } else {');
  Logger.log('    console.log("Nenhum Entry ID encontrado");');
  Logger.log('  }');
  Logger.log('})()');
}

/**
 * Função para testar o envio de dados
 */
function testarEnvio() {
  const formUrl = 'URL_DO_SEU_FORMULARIO';
  
  // NOTA: Esta função não funciona diretamente
  // O Google Forms requer POST com application/x-www-form-urlencoded
  // Use a API Node.js para testar
  
  Logger.log('Para testar o envio, use a API Node.js:');
  Logger.log('curl -X POST https://products-site-gamma.vercel.app/api/capture \\');
  Logger.log('  -H "Content-Type: application/json" \\');
  Logger.log('  -d \'{"name":"Teste","email":"teste@teste.com","whatsapp":"11999999999"}\'');
}