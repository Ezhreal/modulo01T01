# 🔧 Troubleshooting - GitHub Pages 404

## ❌ Erro: "404 - There isn't a GitHub Pages site here"

Este erro significa que o GitHub Pages ainda não foi configurado ou o deploy não foi concluído. Siga estes passos:

---

## ✅ Checklist de Verificação

### 1. Verificar se o Workflow foi Executado

1. No repositório GitHub, clique em **Actions** (no topo)
2. Você deve ver um workflow chamado "Deploy to GitHub Pages"
3. Se não aparecer nenhum workflow:
   - Faça um novo push para disparar o workflow:
     ```bash
     git add .
     git commit -m "Trigger workflow"
     git push
     ```

### 2. Verificar se o Workflow Passou com Sucesso

1. Em **Actions**, clique no workflow mais recente
2. Verifique se todos os passos estão com ✅ (verde)
3. Se houver ❌ (vermelho), clique no passo que falhou para ver o erro

**Erros comuns:**
- ❌ "npm ci" falhou → Verifique se o `package.json` está correto
- ❌ "Build" falhou → Verifique se há erros no código
- ❌ "Deploy" falhou → Verifique permissões do GitHub Pages

### 3. Verificar Configuração do GitHub Pages

1. Vá em **Settings** > **Pages**
2. Verifique se:
   - **Source** está como **"GitHub Actions"** (NÃO "Deploy from a branch")
   - Há uma mensagem indicando que o site está publicado
   - O link do site aparece na parte superior

### 4. Verificar Permissões do Workflow

1. Vá em **Settings** > **Actions** > **General**
2. Em **"Workflow permissions"**, certifique-se de que está:
   - ✅ **"Read and write permissions"** selecionado
   - ✅ **"Allow GitHub Actions to create and approve pull requests"** (opcional)

### 5. Aguardar o Deploy

- O primeiro deploy pode levar **5-10 minutos**
- Após o workflow terminar, aguarde mais **2-5 minutos** para o site ficar disponível
- Atualize a página do GitHub Pages (F5) para ver se o link apareceu

---

## 🚀 Solução Passo a Passo

### Se o Workflow NÃO foi Executado:

```bash
# 1. Certifique-se de que está na branch main
git branch

# 2. Se não estiver, mude para main
git checkout main

# 3. Faça um pequeno commit para disparar o workflow
echo "# Test" >> README.md
git add .
git commit -m "Trigger GitHub Pages deploy"
git push
```

### Se o Workflow FALHOU:

1. **Veja o erro específico** em Actions > [Workflow] > [Job que falhou]
2. **Erros comuns e soluções:**

   **Erro: "npm ci failed"**
   - Verifique se o `package.json` está no repositório
   - Verifique se todas as dependências estão corretas

   **Erro: "Build failed"**
   - Execute `npm run build` localmente para ver o erro
   - Corrija os erros e faça push novamente

   **Erro: "Permission denied"**
   - Vá em Settings > Actions > General
   - Mude "Workflow permissions" para "Read and write permissions"

### Se o Workflow PASSOU mas o site não aparece:

1. **Aguarde 5-10 minutos** após o workflow terminar
2. **Verifique o link correto:**
   - Se o repositório é `Ezhreal/modulo01T01`
   - O link deve ser: `https://Ezhreal.github.io/modulo01T01/`
   - **Importante:** Note a barra `/` no final!
3. **Limpe o cache do navegador** (Ctrl+F5)
4. **Tente em modo anônimo/privado**

---

## 🔄 Forçar Novo Deploy

Se nada funcionar, force um novo deploy:

1. Vá em **Actions**
2. Clique em **"Deploy to GitHub Pages"** (workflow)
3. Clique em **"Run workflow"** (botão no canto superior direito)
4. Selecione a branch **main**
5. Clique em **"Run workflow"**
6. Aguarde o workflow terminar

---

## 📝 Verificar se o Base Path está Correto

Se o repositório NÃO está na raiz do GitHub Pages (ex: `usuario.github.io`), você precisa ajustar o `base` no `vite.config.js`:

```js
// vite.config.js
export default defineConfig({
  base: '/modulo01T01/', // Nome do repositório
  // ...
})
```

Depois:
```bash
git add vite.config.js
git commit -m "Fix base path for GitHub Pages"
git push
```

---

## 🆘 Ainda não funciona?

1. **Verifique os logs completos** em Actions
2. **Certifique-se de que:**
   - O repositório não é privado (ou você tem GitHub Pro)
   - O workflow está na pasta `.github/workflows/`
   - O arquivo se chama `deploy.yml`
3. **Tente deletar e recriar o workflow:**
   - Delete `.github/workflows/deploy.yml`
   - Crie novamente
   - Faça commit e push

---

## ✅ Quando Funcionar

Você verá:
- ✅ Workflow com status verde em Actions
- ✅ Link do site em Settings > Pages
- ✅ Site acessível em `https://Ezhreal.github.io/modulo01T01/`
