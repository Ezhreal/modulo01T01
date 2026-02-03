# 🚀 Configuração do GitHub Pages

## Passo a Passo

### 1. Criar o Repositório no GitHub

1. Acesse: https://github.com/new
2. Crie um novo repositório (pode ser público ou privado)
3. **NÃO** inicialize com README, .gitignore ou licença (já temos arquivos)

### 2. Inicializar Git e Fazer Push

No terminal, na pasta do projeto:

```bash
# Inicializar Git (se ainda não tiver)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit"

# Adicionar o repositório remoto (substitua SEU_USUARIO e SEU_REPOSITORIO)
git remote add origin https://github.com/Ezhreal/modulo01T01.git

# Fazer push
git branch -M main
git push -u origin main
```

### 3. Configurar GitHub Pages

1. Vá para o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source** (Fonte), **IMPORTANTE**: Selecione:
   - **GitHub Actions** (NÃO use "Deploy from a branch")
   - Isso permitirá que o workflow automático faça o deploy
5. Clique em **Save**

**⚠️ Atenção:** Se você selecionar "Deploy from a branch", o workflow automático não funcionará. Use sempre "GitHub Actions" quando tiver um workflow configurado.

### 4. Ativar GitHub Actions (se necessário)

1. No repositório, vá em **Settings** > **Actions** > **General**
2. Certifique-se de que "Allow all actions and reusable workflows" está marcado
3. Role até "Workflow permissions" e selecione "Read and write permissions"
4. Clique em **Save**

### 5. Fazer Deploy

O deploy acontece automaticamente quando você faz push para a branch `main` ou `master`.

**Primeiro deploy:**
- Após fazer push, vá em **Actions** no GitHub
- Você verá o workflow "Deploy to GitHub Pages" rodando
- Aguarde alguns minutos
- Quando terminar, o link estará disponível em **Settings** > **Pages**

**Link do seu site:**
- Se o repositório for `usuario/repositorio`, o link será:
  - `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`

### 6. Deploy Manual (Opcional)

Se quiser fazer deploy manualmente:

```bash
npm run build
# Depois copie a pasta dist para a branch gh-pages
```

Mas o workflow automático é mais fácil! 🎉

---

## ⚙️ Configuração Avançada

### Se o repositório NÃO estiver na raiz

Se você quiser que o site fique em um subdiretório (ex: `https://usuario.github.io/projeto/`):

1. Edite `vite.config.js`
2. Altere `base: '/'` para `base: '/NOME_DO_REPOSITORIO/'`
3. Faça commit e push

---

## 🔄 Atualizar o Site

Sempre que você fizer alterações:

```bash
git add .
git commit -m "Descrição das alterações"
git push
```

O GitHub Actions fará o deploy automaticamente em alguns minutos!

---

## ❓ Problemas Comuns

### ❌ Erro 404: "There isn't a GitHub Pages site here"
**Solução completa:** Veja o arquivo `TROUBLESHOOTING.md` para um guia detalhado.

**Solução rápida:**
1. Vá em **Actions** e verifique se o workflow foi executado
2. Se não foi, faça um push: `git push`
3. Se falhou, veja o erro em Actions e corrija
4. Aguarde 5-10 minutos após o workflow terminar
5. Verifique se **Source** está como **"GitHub Actions"** em Settings > Pages

### ❌ Erro: "Get Pages site failed" / "HttpError: Not Found" (actions/configure-pages)
Esse erro aparece quando o repositório **não tem GitHub Pages habilitado** ou está usando **"Deploy from a branch"** em vez de **GitHub Actions**.

**Solução:**
1. No GitHub, abra o repositório e vá em **Settings** (Configurações).
2. No menu lateral, clique em **Pages**.
3. Em **Build and deployment** > **Source**, selecione **GitHub Actions** (não use "Deploy from a branch").
4. Salve. Não é necessário escolher branch nem pasta.
5. Rode o workflow de novo: **Actions** > workflow "Deploy to GitHub Pages" > **Re-run all jobs**.

Se **Pages** não aparecer no menu ou estiver desativado, verifique se sua conta permite GitHub Pages (repositórios públicos têm Pages grátis).

### ❌ "The job was not acquired by Runner of type hosted even after multiple attempts"
Significa que o GitHub **não conseguiu alocar um runner** para o job (fila cheia ou **incidente em Actions**).

**O que fazer:**
1. Confira [GitHub Status](https://www.githubstatus.com/) – se **Actions** ou **Pages** estiverem em "Incident" ou "Degraded", é problema do GitHub; espere a resolução e depois **Re-run all jobs**.
2. Se estiver tudo verde, espere 30–60 min e rode de novo: **Actions** > **Deploy to GitHub Pages** > **Re-run all jobs**.
3. Repositório **público** = minutos ilimitados; se for **privado**, verifique **Settings** > **Billing**.

### ❌ "Internal server error" (Deploy to GitHub Pages) / Correlation ID: ...
Erro **interno do GitHub**, não do seu projeto.

**O que fazer:**
1. **Re-execute o workflow**: **Actions** > **Deploy to GitHub Pages** > **Re-run all jobs**.
2. Se continuar, espere algumas horas e tente de novo; costuma ser instável por pouco tempo.
3. Veja [GitHub Status](https://www.githubstatus.com/) para saber se há incidente em andamento.

### ⏳ Job fica "Waiting for a runner" ou build demora muito (7+ min)
- **"Waiting for a runner"**: é a fila do GitHub. Em horário de pico ou em contas gratuitas pode levar vários minutos até um runner ficar livre. Não há como acelerar; espere ou cancele e rode de novo mais tarde (**Actions** > **Re-run all jobs**).
- **Build lento**: o primeiro build costuma ser mais lento (download de dependências). Os próximos tendem a ser mais rápidos por causa do cache. O workflow foi ajustado com `timeout-minutes: 15` e mensagens no log para você acompanhar o progresso (Instalando dependências… / Iniciando build… / Build concluído).

### Site não aparece
- Aguarde 5-10 minutos após o primeiro deploy
- Verifique se o workflow terminou com sucesso em **Actions**
- Verifique se o GitHub Pages está ativado em **Settings** > **Pages**
- Limpe o cache do navegador (Ctrl+F5)

### ❌ 404 em index-xxx.js / index-xxx.css (assets não carregam)
O site está sendo aberto na **URL errada** ou o navegador está com **cache antigo**.

**O que fazer:**
1. Abra o site na URL correta: **`https://SEU_USUARIO.github.io/modulo01T01/`** (com o nome exato do repositório e barra no final).
2. **Limpe o cache** ou faça hard refresh: **Ctrl+Shift+R** (Windows/Linux) ou **Cmd+Shift+R** (Mac).
3. Se o repositório tiver **outro nome** (ex.: `Modulos`), altere no `vite.config.js`: `base: '/NOME_DO_REPO/'`, faça novo build e deploy.

### Imagens não carregam
- Verifique se o `base` no `vite.config.js` está correto
- Certifique-se de que os caminhos das imagens estão corretos

### 404 em rotas
- O GitHub Pages já está configurado para redirecionar para `index.html` automaticamente
- Se ainda tiver problemas, verifique o React Router

---

## 📝 Notas

- O workflow usa a branch `gh-pages` automaticamente
- Não precisa fazer nada manualmente após configurar
- Cada push na `main` atualiza o site automaticamente
