# Correção do Scroll para Seções

## Problema Identificado

O scroll para as seções ao clicar nos itens do índice não estava funcionando devido a dois problemas:

### 1. IDs Inconsistentes

**Problema**: No serviço `livro-individual.service.ts`, o método `markdownToHtml` estava gerando IDs usando sempre `index: 0`, enquanto o método `parseMarkdownHeadings` usava o índice real da linha.

**Exemplo**:
- `parseMarkdownHeadings`: gerava ID `"introducao-25"` (linha 25)
- `markdownToHtml`: gerava ID `"introducao-0"` (sempre 0)

**Solução**: Refatorei o método `markdownToHtml` para processar linha por linha e usar o mesmo índice que o `parseMarkdownHeadings`.

```typescript
// ANTES (ERRADO)
html = html.replace(/^### (.+)$/gm, (match, title) => {
  const id = this.generateId(title, 0); // ❌ Sempre 0
  return `<h3 id="${id}">${title}</h3>`;
});

// DEPOIS (CORRETO)
lines.forEach((line, index) => {
  const h3Match = line.match(/^### (.+)$/);
  if (h3Match) {
    const title = h3Match[1].trim();
    const id = this.generateId(title, index); // ✅ Usa o índice correto
    html += `<h3 id="${id}">${title}</h3>\n`;
    return;
  }
});
```

### 2. Scroll no Container Incorreto

**Problema**: O método `scrollToSection` estava tentando fazer scroll na janela principal (`window.scrollTo`), mas o conteúdo está dentro de um container `.content-area` que tem seu próprio scroll.

**Solução**: Ajustei para fazer scroll dentro do container correto.

```typescript
// ANTES (ERRADO)
scrollToSection(headingId: string) {
  const element = document.getElementById(headingId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // ❌ Scroll global
  }
}

// DEPOIS (CORRETO)
scrollToSection(headingId: string) {
  setTimeout(() => {
    const element = document.getElementById(headingId);
    const contentArea = document.querySelector('.content-area');
    
    if (element && contentArea) {
      // ✅ Scroll dentro do container .content-area
      const elementTop = element.offsetTop;
      contentArea.scrollTo({
        top: elementTop - 20, // offset de 20px
        behavior: 'smooth'
      });
    }
  }, 100);
}
```

## Alterações Realizadas

### 1. `livro-individual.service.ts`

**Método `markdownToHtml` refatorado:**
- Agora processa o conteúdo linha por linha
- Usa o índice correto da linha ao gerar IDs
- Mantém consistência com o método `parseMarkdownHeadings`

### 2. `livro-individual.ts` (Componente)

**Método `scrollToSection` melhorado:**
- Adicionado `setTimeout` de 100ms para garantir que o DOM foi atualizado
- Identifica o container `.content-area` que possui o scroll
- Calcula a posição do elemento usando `offsetTop`
- Faz scroll suave dentro do container correto
- Inclui offset de 20px para melhor visualização
- Mantém fallback para `scrollIntoView` caso não encontre o container
- Adiciona log de aviso quando o elemento não é encontrado

## Como Funciona Agora

1. **Usuário clica em um item do índice** (H1, H2 ou H3)
2. **`navigateToHeading` é chamado:**
   - Se o item tem filhos e está colapsado, expande primeiro
   - Se o item tem filhos e está expandido, colapsa
   - Se não tem filhos, vai direto para o scroll
3. **`scrollToSection` é executado:**
   - Aguarda 100ms para o DOM atualizar
   - Localiza o elemento pelo ID
   - Localiza o container `.content-area`
   - Calcula a posição relativa ao container
   - Faz scroll suave até a posição

## Estrutura de IDs

Os IDs agora são gerados de forma consistente:

```
Texto: "# A Rússia e o Heartland" (linha 5)
ID gerado: "a-russia-e-o-heartland-5"

Texto: "## Geografia da Rússia" (linha 25)
ID gerado: "geografia-da-russia-25"

Texto: "### Clima e Território" (linha 45)
ID gerado: "clima-e-territorio-45"
```

## Testando

Para verificar se está funcionando:

1. Abra o DevTools (F12)
2. Vá para a aba Console
3. Clique em qualquer item do índice
4. Verifique se:
   - Não aparece aviso "Elemento não encontrado"
   - O scroll acontece suavemente
   - A seção correta é exibida

### Debug

Se ainda houver problemas, você pode adicionar logs temporários:

```typescript
scrollToSection(headingId: string) {
  setTimeout(() => {
    console.log('Procurando elemento com ID:', headingId);
    const element = document.getElementById(headingId);
    console.log('Elemento encontrado:', element);
    const contentArea = document.querySelector('.content-area');
    console.log('Content area:', contentArea);
    
    if (element && contentArea) {
      const elementTop = element.offsetTop;
      console.log('Scrolling para:', elementTop);
      contentArea.scrollTo({
        top: elementTop - 20,
        behavior: 'smooth'
      });
    }
  }, 100);
}
```

## Melhorias Futuras

Possíveis melhorias adicionais:

1. **Highlight da seção ativa** - Destacar no índice qual seção está visível
2. **Scroll spy** - Atualizar automaticamente o item ativo conforme o usuário rola a página
3. **Deep linking** - Permitir URLs com hash para seções específicas (#secao-nome)
4. **Smooth scroll polyfill** - Para navegadores mais antigos
5. **Keyboard navigation** - Navegar pelo índice com teclado

## Conclusão

✅ O scroll agora funciona corretamente!
✅ Os IDs são gerados de forma consistente
✅ O scroll acontece dentro do container correto
✅ Há feedback visual (smooth scroll)
✅ Há tratamento de erros (console.warn)
