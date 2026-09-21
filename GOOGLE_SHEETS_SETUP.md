# 📊 Configuração do Google Sheets para Recebimento de Leads

Siga este passo a passo rápido (leva menos de 2 minutos) para conectar sua planilha do Google Sheets ao formulário da landing page sem pagar nada e sem limites de envio.

---

## Passo 1: Criar a Planilha no Google Drive
1. Acesse o [Google Sheets / Planilhas Google](https://sheets.new) e crie uma nova planilha.
2. Dê um nome à planilha (ex: `Leads - Fronteira de Negócios`).
3. Na primeira linha (cabeçalho), preencha as colunas:
   - **A1**: `Data e Hora`
   - **B1**: `Nome`
   - **C1**: `WhatsApp`
   - **D1**: `Origem`

---

## Passo 2: Adicionar o Código no Apps Script
1. No menu superior da planilha, clique em **Extensões** > **Apps Script**.
2. Apague qualquer código existente no editor e cole o código abaixo:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = {};
      }
    }
    
    var timestamp = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");
    var nome = (e && e.parameter && e.parameter.nome) || data.nome || "";
    var whatsapp = (e && e.parameter && e.parameter.whatsapp) || data.whatsapp || "";
    var origem = (e && e.parameter && e.parameter.origem) || data.origem || "Landing Page";
    
    sheet.appendRow([timestamp, nome, whatsapp, origem]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Lead registrado com sucesso" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Clique no ícone de salvar (💾) ou tecle `Ctrl + S`.

---

## Passo 3: Implantar como Aplicativo da Web (Web App)
1. No canto superior direito da tela do Apps Script, clique no botão azul **Implantar** (ou *Deploy*) > **Nova implantação** (*New deployment*).
2. Na engrenagem ao lado de "Selecione o tipo", escolha **App da Web** (*Web app*).
3. Preencha as opções:
   - **Descrição**: `Captura de Leads Landing Page`
   - **Executar como**: **Eu** (*Me*)
   - **Quem tem acesso**: **Qualquer pessoa** (*Anyone*) ⚠️ *Muito importante selecionar "Qualquer pessoa" para que a landing page consiga enviar os dados sem pedir login do Google aos visitantes.*
4. Clique em **Implantar** (*Deploy*).
5. Se for a primeira vez, o Google pedirá autorização:
   - Clique em **Autorizar acesso**, escolha sua conta Google.
   - Caso apareça um aviso "O Google não verificou este app", clique em **Avançado** > **Acessar (não seguro)** e confirme.
6. Copie o link gerado sob o título **URL do app da Web** (termina com `/exec`).

---

## Passo 4: Colar a URL no arquivo `gatekeeper.js`
Abra o arquivo `gatekeeper.js` na raiz do seu projeto e cole sua URL na primeira linha:

```javascript
const GOOGLE_SHEETS_URL = "SUA_URL_DO_APPS_SCRIPT_AQUI/exec";
```

Pronto! Cada novo visitante que preencher o nome e WhatsApp na tela terá a linha adicionada instantaneamente na sua planilha.

---

### 🛡️ Backup Local (Garantia de segurança)
Mesmo antes de você configurar a URL do Google Sheets ou caso o visitante tenha instabilidade de rede no momento do envio, o sistema salva automaticamente todos os cadastros no navegador (`localStorage`).

Você pode exportar a lista a qualquer momento abrindo o console do navegador (F12) e digitando:
```javascript
window.exportLeadsCSV();
```
Isso baixará automaticamente uma planilha `.csv` com todos os leads capturados até o momento.
