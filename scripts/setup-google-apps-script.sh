#!/bin/bash
# Script de configuração automática do Google Apps Script
# Execute: bash scripts/setup-google-apps-script.sh

echo "🚀 Configurando Google Apps Script para captura de leads..."
echo ""

# Verifica se o Google Apps Script URL já está configurada
if [ -f .env.local ]; then
    if grep -q "GOOGLE_APPS_SCRIPT_URL=" .env.local; then
        URL=$(grep "GOOGLE_APPS_SCRIPT_URL=" .env.local | cut -d '=' -f2)
        if [ -n "$URL" ] && [ "$URL" != "" ]; then
            echo "✅ GOOGLE_APPS_SCRIPT_URL já configurada: $URL"
            echo "   Se precisar reconfigurar, edite o arquivo .env.local"
            exit 0
        fi
    fi
fi

echo "📋 Instruções para configurar o Google Apps Script:"
echo ""
echo "1. Acesse: https://sheets.google.com"
echo "2. Abra ou crie a planilha 'Leads - Produtos Site'"
echo "3. Vá em: Extensões > Apps Script"
echo "4. Apague todo o código padrão"
echo "5. Cole o código do arquivo: scripts/google-apps-script.js"
echo "6. Salve (Ctrl+S) e dê um nome ao projeto"
echo "7. Clique em 'Implantar' > 'Nova implantação'"
echo "8. Configure:"
echo "   - Tipo: Aplicativo Web"
echo "   - Executar como: Eu"
echo "   - Quem tem acesso: Qualquer pessoa"
echo "9. Clique em 'Implantar'"
echo "10. Copie a URL gerada (termina em /exec)"
echo "11. Cole a URL no arquivo .env.local:"
echo "    GOOGLE_APPS_SCRIPT_URL=sua_url_aqui"
echo ""
echo "12. Faça deploy no Vercel:"
echo "    vercel --prod"
echo ""
echo "💡 Dica: O script já está pronto em scripts/google-apps-script.js"
echo ""

# Pergunta se o usuário quer continuar
read -p "Você já configurou o Apps Script? (s/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Ss]$ ]]; then
    read -p "Cole a URL do Apps Script (termina em /exec): " APPS_SCRIPT_URL
    
    if [ -n "$APPS_SCRIPT_URL" ]; then
        # Cria ou atualiza .env.local
        if [ -f .env.local ]; then
            # Atualiza URL existente
            if grep -q "GOOGLE_APPS_SCRIPT_URL=" .env.local; then
                sed -i "s|GOOGLE_APPS_SCRIPT_URL=.*|GOOGLE_APPS_SCRIPT_URL=$APPS_SCRIPT_URL|" .env.local
            else
                echo "GOOGLE_APPS_SCRIPT_URL=$APPS_SCRIPT_URL" >> .env.local
            fi
        else
            echo "GOOGLE_APPS_SCRIPT_URL=$APPS_SCRIPT_URL" > .env.local
        fi
        
        echo ""
        echo "✅ Configuração salva em .env.local"
        echo ""
        echo "🚀 Próximos passos:"
        echo "1. Faça deploy no Vercel:"
        echo "   vercel --prod"
        echo ""
        echo "2. Teste a API:"
        echo "   curl -X POST https://melpropolis-cia.vercel.app/api/capture \\"
        echo "     -H 'Content-Type: application/json' \\"
        echo "     -d '{\"name\":\"Teste\",\"email\":\"teste@teste.com\",\"whatsapp\":\"11999999999\"}'"
        echo ""
        echo "3. Verifique a planilha no Google Sheets"
    else
        echo "❌ URL não fornecida. Configure manualmente editando .env.local"
    fi
else
    echo "📝 Configure manualmente:"
    echo "1. Edite o arquivo .env.local"
    echo "2. Adicione: GOOGLE_APPS_SCRIPT_URL=sua_url_aqui"
    echo "3. Faça deploy: vercel --prod"
fi