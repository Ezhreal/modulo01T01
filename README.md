# Projeto Módulos - One Page

Projeto React + Vite para criação de curso one page com sistema de módulos e tópicos.

## Estrutura

- Cada tela é uma `section` com ID no formato `tela01`, `tela02`, etc.
- Sistema de navegação por âncoras com cache no localStorage
- URL sincronizada com a tela atual (`?tela=01`)

## Componentes Reutilizáveis

### Accordion
Componente de acordeão expansível.

```jsx
<Accordion
  items={[
    { title: 'Título 1', content: 'Conteúdo 1' },
    { title: 'Título 2', content: 'Conteúdo 2' },
  ]}
/>
```

### CardFlip
Card com efeito de flip ao clicar.

```jsx
<CardFlip
  front={<div>Conteúdo da frente</div>}
  back={<div>Conteúdo do verso</div>}
/>
```

### Tabs
Sistema de abas.

```jsx
<Tabs
  tabs={[
    { label: 'Tab 1', content: <div>Conteúdo 1</div> },
    { label: 'Tab 2', content: <div>Conteúdo 2</div> },
  ]}
/>
```

### Carousel
Carrossel de slides.

```jsx
<Carousel
  items={[
    <div>Slide 1</div>,
    <div>Slide 2</div>,
  ]}
  autoPlay={true}
  interval={3000}
/>
```

## Como Adicionar Novas Telas

1. Adicione uma nova `<section>` no `App.jsx` com ID `telaXX`
2. Use os componentes reutilizáveis conforme necessário
3. O sistema de navegação e cache funciona automaticamente

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

## Build e entrega

**Um único build.** O cliente **não configura nada**: só recebe a pasta **`dist`** e sobe no servidor no caminho que quiser.

```bash
npm run build
```

Funciona em qualquer URL: raiz (`https://site.com/`), 1 pasta (`/modulo01T01/`), 2 (`/modulo01/topico01/`), 3 (`/curso/modulo01/topico01/`). O app detecta o caminho sozinho.

Entrega: zip da pasta **`dist`** (ou envio dos arquivos). O cliente publica onde quiser.

---

## Testar localmente

**Desenvolvimento** (hot reload):

```bash
npm run dev
```

Abre em `http://localhost:3099`.

**Testar o build** (gera `dist` e sobe servidor):

```bash
npm run start
```

Abre em `http://localhost:3000`. Para simular subpasta: `http://localhost:3000/modulo01/` ou `http://localhost:3000/modulo01/topico01/`.
