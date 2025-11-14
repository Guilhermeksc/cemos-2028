# Componente de Perguntas - Geopolítica e Relações Internacionais

Este componente integra o sistema de simulados de perguntas especificamente para o módulo de Geopolítica e Relações Internacionais.

## Funcionalidades

### 🎯 Características do Simulado
- **10 questões aleatórias** selecionadas da bibliografia ID 1 (Geopolítica)
- **Distribuição das questões:**
  - 5 perguntas Verdadeiro/Falso
  - 4 perguntas de Múltipla Escolha
  - 1 pergunta de Correlação
- **Sem limite de tempo** para responder
- **Navegação livre** entre as questões
- **Feedback imediato** com justificativas

### 📊 Sistema de Avaliação
- **Pontuação automática** baseada nas respostas corretas
- **Classificação do desempenho:**
  - 80%+ = Excelente
  - 60-79% = Bom
  - <60% = Continue estudando
- **Histórico de resultados** salvos no localStorage
- **Estatísticas de progresso** (melhor resultado, total de simulados)

### 🎨 Interface Personalizada
- **Tema azul diplomático** específico para geopolítica
- **Layout responsivo** para mobile e desktop
- **Informações contextuais** sobre o simulado
- **Dicas de estudo** personalizadas baseadas no desempenho

## Configuração

O componente está pré-configurado com as seguintes opções:

```typescript
bibliografiaIds: number[] = [1]; // Bibliografia de Geopolítica
showBibliografiaSelector: boolean = false; // Seletor desabilitado
autoStartSimulado: boolean = false; // Início manual
```

## Tópicos Abordados

- 🌍 Ordem mundial e sistemas internacionais
- 🏛️ Organizações internacionais (ONU, OTAN, UE, etc.)
- ⚔️ Conflitos e crises internacionais
- 🇧🇷 Política externa brasileira
- 📚 Teorias das relações internacionais
- 🗺️ Geopolítica regional e global
- ⚖️ Direito internacional público
- 🤝 Diplomacia e negociações

## Como Usar

### No Template
```html
<app-app6-geopolitica-relacoes-internacionais-perguntas></app-app6-geopolitica-relacoes-internacionais-perguntas>
```

### Eventos Disponíveis
O componente emite eventos que podem ser capturados:

```typescript
onSimuladoStarted() {
  // Executado quando o simulado é iniciado
}

onSimuladoFinished(resultado: SimuladoResult) {
  // Executado quando o simulado é finalizado
  // resultado contém: totalQuestoes, acertos, erros, percentual, questoes
}
```

## Armazenamento Local

O componente salva automaticamente:
- **Histórico de resultados** (últimos 10 simulados)
- **Estatísticas de desempenho**
- **Data e hora** de cada simulado

### Estrutura dos dados salvos:
```json
{
  "totalQuestoes": 10,
  "acertos": 8,
  "erros": 2,
  "percentual": 80,
  "data": "2025-10-16T...",
  "modulo": "Geopolítica e Relações Internacionais",
  "bibliografia": "Bibliografia ID 1"
}
```

## Personalização

### Modificar configurações:
```typescript
// Para permitir seleção de bibliografia
showBibliografiaSelector = true;

// Para início automático
autoStartSimulado = true;

// Para usar diferentes bibliografias
bibliografiaIds = [1, 2, 3];
```

### Customizar cores (CSS):
```scss
.geopolitica-perguntas-container {
  --geopolitica-primary: #1e40af; // Cor principal
  --geopolitica-secondary: #059669; // Cor secundária
  --geopolitica-accent: #dc2626; // Cor de destaque
}
```

## Dependências

- `Perguntas` - Componente base de simulados
- `PerguntasService` - Serviço para buscar questões
- `CommonModule` - Para diretivas Angular

## Responsividade

O componente é totalmente responsivo:
- **Desktop**: Layout em grid com sidebar de estatísticas
- **Tablet**: Layout adaptado com elementos empilhados
- **Mobile**: Interface otimizada para toque

## Acessibilidade

- **Navegação por teclado** suportada
- **Cores contrastantes** para legibilidade
- **Textos alternativos** em elementos visuais
- **Foco visível** em elementos interativos

## Performance

- **Lazy loading** das questões
- **Otimização de re-renderização** com OnPush (futuro)
- **Debounce** em ações do usuário
- **Cache local** de resultados