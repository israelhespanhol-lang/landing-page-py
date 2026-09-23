# Guia Completo de Deploy — HostGator

Este projeto já está 100% preparado e otimizado para a **HostGator** (servidor Apache com cPanel).

---

## ⚡ Método 1: Upload Direto no cPanel (Mais Rápido e Fácil)

O pacote **`site-pronto-hostgator.zip`** já foi gerado na raiz do projeto com todos os arquivos estáticos, imagens e o `.htaccess` configurado.

1. Acesse o **Portal do Cliente HostGator** e abra o **cPanel**.
2. No cPanel, clique em **Gerenciador de Arquivos** (File Manager).
3. Navegue até a pasta raiz do seu domínio:
   - Se for o domínio principal: pasta **`public_html`**.
   - Se for um subdomínio ou domínio adicional: pasta correspondente ao domínio.
4. Clique no botão superior **Carregar** (*Upload*).
5. Selecione e envie o arquivo **`site-pronto-hostgator.zip`**.
6. Após concluir o upload, volte ao Gerenciador de Arquivos, selecione o arquivo `site-pronto-hostgator.zip` e clique em **Extrair** (*Extract*).
7. (Opcional) Exclua o arquivo `.zip` da pasta após a extração para manter a hospedagem limpa.

> ✅ **Pronto!** O site estará imediatamente no ar, com HTTPS forçado e cache ativado.

---

## 🔄 Método 2: Deploy Automático com GitHub Actions (CI/CD)

Se você utiliza o repositório GitHub (`main`), o fluxo de deploy automático já foi criado no arquivo [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Toda vez que você fizer `git push` para a branch `main` ou `master`, o GitHub enviará os arquivos atualizados automaticamente para a HostGator.

### Como configurar em 3 passos:

1. Acesse o seu repositório no GitHub.
2. Vá em **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.
3. Crie os seguintes segredos:

| Nome do Secret | Descrição | Exemplo |
| :--- | :--- | :--- |
| `FTP_SERVER` | Servidor ou IP do FTP da HostGator | `ftp.fronteira.grupos-ultravel.com` ou IP do painel |
| `FTP_USERNAME` | Usuário de FTP ou usuário do cPanel | `seu_usuario@fronteira.grupos-ultravel.com` |
| `FTP_PASSWORD` | Senha da conta de FTP | `SuaSenhaForte123` |

---

## 💻 Método 3: Envio via FileZilla / FTP

1. Abra o seu cliente FTP (FileZilla, WinSCP ou Cyberduck).
2. Conecte-se com as credenciais da HostGator:
   - **Host**: `ftp.seudominio.com.br` (ou o IP do servidor HostGator informado no e-mail de boas-vindas).
   - **Porta**: `21` (ou `22` para SFTP).
   - **Usuário**: seu usuário cPanel ou conta FTP criada.
   - **Senha**: sua senha.
3. No painel remoto (lado direito), abra a pasta `public_html`.
4. No painel local (lado esquerdo), envie todos os arquivos do projeto:
   - `index.html`
   - `styles.css`
   - `experience.css`
   - `experience.js`
   - `gatekeeper.css`
   - `gatekeeper.js`
   - `script.js`
   - `.htaccess` *(atenção: arquivos com ponto no início podem ficar ocultos por padrão)*
   - pasta `assets/` com as imagens

---

## 🛡️ O que o arquivo `.htaccess` faz na HostGator?

O arquivo `.htaccess` incluído realiza configurações essenciais de servidor Apache:
- **HTTPS Forçado**: Redireciona automaticamente qualquer acesso `http://` para `https://` seguro (SSL).
- **Compressão Gzip / Deflate**: Reduz o tamanho de transferência do HTML, CSS e JS em até 70%, acelerando o carregamento no celular e desktop.
- **Cache de Navegador**: Define cabeçalhos de expiração (`mod_expires`) para que imagens e estilos fiquem salvos no navegador do visitante, tornando visitas subsequentes instantâneas.
- **Segurança**: Bloqueia a listagem de diretórios (`Options -Indexes`) e adiciona cabeçalhos contra ataques XSS e sniffing MIME.

---

## 🔨 Como regerar o pacote ZIP no futuro

Sempre que fizer alterações no código e quiser gerar um novo arquivo ZIP limpo e atualizado para envio manual:

```powershell
powershell -ExecutionPolicy Bypass -File .\gerar-pacote-deploy.ps1
```
