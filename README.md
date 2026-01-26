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

## Build

```bash
npm run build
```
