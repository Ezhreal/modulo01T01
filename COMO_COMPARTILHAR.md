# 📦 Como Compartilhar o Projeto

## Opção 1: Servidor Local Simples (Mais Fácil)

Após fazer o build, você pode usar o servidor simples incluído:

1. **Faça o build:**
   ```bash
   npm run build
   ```

2. **Inicie o servidor:**
   ```bash
   npm run serve
   ```

3. **Acesse no navegador:**
   - Local: `http://localhost:3000`
   - Para compartilhar na mesma rede: use seu IP local (ex: `http://192.168.1.100:3000`)

4. **Para compartilhar com alguém:**
   - Envie a pasta `dist` + o arquivo `serve.js`
   - A pessoa só precisa executar: `node serve.js`
   - Ou se tiver npm: `npm run serve`

---

## Opção 2: Hospedagem Gratuita (Recomendado para compartilhar online)

### Vercel (Mais fácil)
1. Instale: `npm i -g vercel`
2. Na pasta do projeto: `vercel`
3. Siga as instruções
4. Pronto! Você terá um link público

### Netlify
1. Acesse: https://www.netlify.com
2. Arraste a pasta `dist` para o site
3. Pronto! Link público gerado

### GitHub Pages
1. Faça push do código para GitHub
2. Vá em Settings > Pages
3. Selecione a branch e pasta `dist`
4. Link público: `https://seu-usuario.github.io/repositorio`

---

## Opção 3: Servidor na Rede Local

Se você e a pessoa estão na mesma rede Wi-Fi:

1. Execute: `npm run serve`
2. Descubra seu IP local:
   - Windows: `ipconfig` (procure por IPv4)
   - Mac/Linux: `ifconfig` ou `ip addr`
3. Compartilhe: `http://SEU_IP:3000`
4. A pessoa acessa pelo navegador

---

## Opção 4: Usar ngrok (Para acesso externo)

1. Instale ngrok: https://ngrok.com
2. Execute: `npm run serve`
3. Em outro terminal: `ngrok http 3000`
4. Compartilhe o link gerado pelo ngrok

---

## ⚠️ Importante

**NÃO** abra o `index.html` diretamente no navegador após o build. Sempre use um servidor HTTP (uma das opções acima).
