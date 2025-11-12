# Centralização de Estilos de Filtros

## 📁 Arquivo Criado

**Localização**: `frontend/src/app/styles/_filters.scss`

Este arquivo contém todos os estilos compartilhados para seções de filtros (bibliografia e assunto), centralizando a formatação em um único local.

## 🎯 Objetivo

Evitar duplicação de código CSS e garantir que todos os filtros tenham a mesma aparência consistente em toda a aplicação.

## 📋 Estilos Incluídos

O arquivo `_filters.scss` inclui formatação para:

### 1. Seção de Filtros (`.filters-section`)
- Container principal com bordas arredondadas
- Padding e margem padronizados
- Largura máxima para centralização
- Box-sizing para controle de dimensões

### 2. Linha de Filtros (`.filter-row`)
- Grid responsivo com `auto-fit`
- Largura mínima de 200px por coluna
- Gap padronizado entre colunas
- Alinhamento vertical dos elementos

### 3. Grupo de Filtro (`.filter-group`)
- Layout flexível em coluna
- Espaçamento entre label e select
- Labels com fonte em negrito

### 4. Select de Filtro (`.filter-select`)
- Padding e bordas padronizados
- Estados de hover e focus com feedback visual
- Estado disabled com estilo diferenciado
- Transições suaves
- Overflow controlado para textos longos

### 5. Linha de Ações (`.actions-row`)
- Flexbox centralizado
- Gap padronizado entre botões
- Wrap automático em telas pequenas

### 6. Botão Outline (`.btn.btn-outline`)
- Estilo consistente com hover
- Estados disabled
- Transições suaves

### 7. Responsividade
- Breakpoint em 700px para layout de coluna única
- Adaptações para telas muito pequenas (420px)

## 🔧 Como Usar

### Método 1: Importação Direta (Recomendado)

```scss
// seu-componente.scss
@import '../../styles/filters';

.seu-container {
  // Estilos específicos do componente podem sobrescrever se necessário
  .filters-section {
    // Personalizações específicas aqui
  }
}
```

### Método 2: Usando as Classes Diretamente no HTML

O arquivo exporta classes que podem ser usadas diretamente no HTML:

```html
<div class="filters-section">
  <div class="filter-row">
    <div class="filter-group">
      <label for="filtro">📖 Filtro:</label>
      <select id="filtro" class="filter-select">
        <option>Opção 1</option>
      </select>
    </div>
  </div>
  
  <div class="actions-row">
    <button class="btn btn-outline">Limpar</button>
  </div>
</div>
```

## 📝 Estrutura HTML Recomendada

```html
<div class="filters-section">
  <div class="filter-row">
    <div class="filter-group">
      <label for="bibliografia-filter">📖 Bibliografia:</label>
      <select id="bibliografia-filter" class="filter-select">
        <!-- opções -->
      </select>
    </div>
    
    <div class="filter-group">
      <label for="assunto-filter">🏷️ Assunto:</label>
      <select id="assunto-filter" class="filter-select">
        <!-- opções -->
      </select>
    </div>
  </div>
  
  <div class="actions-row">
    <button class="btn btn-outline">Limpar Filtros</button>
  </div>
</div>
```

## ✅ Componentes que Usam Este Estilo

- `conceitos` - Filtros de bibliografia e assunto
- `flash-cards` - Filtros de bibliografia e assunto (com estilos específicos adicionais)

## 🎨 Personalização

Se você precisar personalizar os estilos para um componente específico, pode sobrescrever as classes após a importação:

```scss
@import '../../styles/filters';

.filters-section {
  // Personalizações específicas
  border-radius: 12px; // Sobrescreve o padrão
  padding: 1rem; // Sobrescreve o padrão
}
```

## 📱 Responsividade

Os estilos são totalmente responsivos:
- **Desktop**: Grid com múltiplas colunas
- **Tablet (< 700px)**: Grid de coluna única
- **Mobile (< 420px)**: Adaptações adicionais para telas muito pequenas

