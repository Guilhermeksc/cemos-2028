# Refatoração do Componente de Perguntas

## 📋 Resumo da Refatoração

O componente `app-perguntas` foi refatorado para melhorar a organização do código, seguindo o princípio de **Single Responsibility** e **Component Composition**.

## 🎯 Objetivos Alcançados

1. **Separação de Responsabilidades**: Cada tipo de pergunta agora tem seu próprio componente
2. **Código Mais Limpo**: Redução significativa de código no componente principal
3. **Manutenibilidade**: Mais fácil adicionar novos tipos ou modificar existentes
4. **Reutilização**: Componentes podem ser reutilizados em outros contextos

## 📁 Estrutura de Componentes

### Componente Principal: `Perguntas`
**Responsabilidades:**
- Gerenciar o estado global do simulado
- Carregar questões do backend
- Coordenar respostas entre componentes filhos
- Calcular estatísticas (acertos, performance)
- Renderizar lista de questões

### Componentes Específicos

#### 1. `PerguntaVF` (Verdadeiro/Falso)
**Localização:** `pergunta-v-f/`

**@Input:**
- `questionId: number` - ID da questão
- `questionData: PerguntaVFInterface` - Dados da questão
- `isAnswered: boolean` - Se já foi respondida
- `isCorrect: boolean` - Se a resposta está correta

**@Output:**
- `answerSubmitted` - Emite `{ questionId, answer }` quando usuário responde

**Funcionalidades:**
- Renderiza afirmação
- Opções Verdadeiro/Falso
- Validação de resposta
- Exibe justificativa após resposta

#### 2. `PerguntaMultipla` (Múltipla Escolha)
**Localização:** `pergunta-multipla/`

**@Input:**
- `questionId: number`
- `questionData: PerguntaMultiplaInterface`
- `isAnswered: boolean`
- `isCorrect: boolean`

**@Output:**
- `answerSubmitted` - Emite `{ questionId, answer }`

**Funcionalidades:**
- Renderiza alternativas A, B, C, D
- Validação de resposta
- Exibe justificativa após resposta

#### 3. `PerguntaCorrelacao` (Correlação)
**Localização:** `pergunta-correlacao/`

**@Input:**
- `questionId: number`
- `questionData: PerguntaCorrelacaoInterface`
- `isAnswered: boolean`
- `isCorrect: boolean`

**@Output:**
- `answerSubmitted` - Emite `{ questionId, answer }`

**Funcionalidades:**
- Renderiza colunas A e B
- Sistema de correlação com radio buttons
- Validação de completude (todos itens correlacionados)
- Conversão de formato de resposta
- Exibe justificativa após resposta

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────┐
│    Componente Principal (Perguntas) │
│  - Carrega questões                 │
│  - Gerencia estado global           │
│  - Calcula estatísticas             │
└──────────┬──────────────────────────┘
           │
           ├─── @Input ────┐
           │               ▼
           │    ┌──────────────────┐
           │    │  PerguntaVF      │
           │    │  - userAnswer    │
           │    │  - onSubmit()    │
           │    └────────┬─────────┘
           │             │
           │    ┌──────────────────┐
           │    │ PerguntaMultipla │
           │    │  - userAnswer    │
           │    │  - onSubmit()    │
           │    └────────┬─────────┘
           │             │
           │    ┌──────────────────┐
           │    │PerguntaCorrelacao│
           │    │  - userAnswer    │
           │    │  - isComplete()  │
           │    │  - onSubmit()    │
           │    └────────┬─────────┘
           │             │
           └─ @Output ◄──┘
              (answerSubmitted)
                   │
                   ▼
           onAnswerSubmitted()
           - Atualiza questionResults
           - Calcula isCorrect
           - Atualiza UI
```

## 📝 Template Simplificado

**Antes:**
```html
<div *ngIf="question.tipo === 'vf'">
  <!-- 50+ linhas de HTML específico -->
</div>
<div *ngIf="question.tipo === 'multipla'">
  <!-- 60+ linhas de HTML específico -->
</div>
<div *ngIf="question.tipo === 'correlacao'">
  <!-- 100+ linhas de HTML específico -->
</div>
```

**Depois:**
```html
<app-pergunta-v-f
  *ngIf="question.tipo === 'vf'"
  [questionId]="question.id"
  [questionData]="getVFData(question)"
  [isAnswered]="isQuestionAnswered(question.id)"
  [isCorrect]="getQuestionAnswerStatus(question.id) === 'correct'"
  (answerSubmitted)="onAnswerSubmitted($event)"
></app-pergunta-v-f>
```

## 🎨 Estilos

Os estilos permanecem centralizados em `perguntas.scss` para manter consistência visual. Os componentes filhos referenciam as mesmas classes CSS.

## ✅ Benefícios

1. **Código mais legível**: Cada arquivo tem um propósito claro
2. **Fácil teste**: Componentes podem ser testados isoladamente
3. **Fácil manutenção**: Mudanças em um tipo não afetam outros
4. **Escalável**: Adicionar novos tipos de pergunta é simples
5. **Reutilizável**: Componentes podem ser usados em outros contextos

## 🚀 Próximos Passos (Opcional)

1. **Extrair estilos específicos**: Mover estilos para componentes individuais
2. **Adicionar testes unitários**: Testar cada componente isoladamente
3. **Criar interfaces compartilhadas**: Padronizar @Input/@Output
4. **Adicionar animações**: Transições suaves entre estados
5. **Melhorar acessibilidade**: ARIA labels, navegação por teclado

## 📦 Arquivos Modificados

- ✅ `perguntas.ts` - Simplificado (~300 linhas removidas)
- ✅ `perguntas.html` - Reduzido (~200 linhas removidas)
- ✅ `pergunta-v-f/pergunta-v-f.ts` - Novo componente
- ✅ `pergunta-v-f/pergunta-v-f.html` - Novo template
- ✅ `pergunta-multipla/pergunta-multipla.ts` - Novo componente
- ✅ `pergunta-multipla/pergunta-multipla.html` - Novo template
- ✅ `pergunta-correlacao/pergunta-correlacao.ts` - Novo componente
- ✅ `pergunta-correlacao/pergunta-correlacao.html` - Novo template

## 🔍 Métodos Removidos do Componente Principal

- `answerQuestion()` → Substituído por `onAnswerSubmitted()`
- `updateCorrelacaoAnswer()` → Movido para `PerguntaCorrelacao`
- `submitCorrelacaoAnswer()` → Movido para `PerguntaCorrelacao`
- `isCorrelacaoComplete()` → Movido para `PerguntaCorrelacao`
- `getCorrelacaoMissingCount()` → Movido para `PerguntaCorrelacao`
- `getAlternativaText()` → Movido para `PerguntaMultipla`
- `getCorrelacaoKeys()` → Removido (não mais necessário)
- `getCorrelacaoCorrectLetter()` → Movido para `PerguntaCorrelacao`
- `isProcessingSubmit` → Removido (gerenciado nos componentes filhos)

## 📚 Documentação Adicional

Para mais detalhes sobre cada componente, consulte:
- [PerguntaVF](./pergunta-v-f/README.md)
- [PerguntaMultipla](./pergunta-multipla/README.md)
- [PerguntaCorrelacao](./pergunta-correlacao/README.md)
