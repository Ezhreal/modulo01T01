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
4. Em **Source**, selecione:
   - **Branch**: `gh-pages` (será criado automaticamente pelo workflow)
   - **Folder**: `/ (root)` ou deixe como está
5. Clique em **Save**

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

### Site não aparece
- Aguarde 5-10 minutos após o primeiro deploy
- Verifique se o workflow terminou com sucesso em **Actions**
- Verifique se o GitHub Pages está ativado em **Settings** > **Pages**

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
