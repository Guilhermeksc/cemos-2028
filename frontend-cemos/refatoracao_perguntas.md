# Refatoração da geração de PDFs: `perguntas.ts` ➜ `simulados.ts`

## 1. Contexto atual
- Toda a lógica de criação de PDF (misturando V/F, múltipla escolha e correlação + gabarito) está centralizada em `frontend-cemos/src/app/components/perguntas/perguntas.ts`.
- As rotinas `generateSinglePDFForSimulado` e `generatePDFForQuestionType` acumulam ~2k linhas de código e dependem profundamente do estado de `app-perguntas`.
- Já existe documentação do componente em `components/perguntas/docs.md`, mas ela não cobre a nova demanda de múltiplos simulados com personalização de PDF.

## 2. Objetivos da refatoração
1. **Isolar responsabilidades**: `perguntas.ts` continua cuidando de listagem, filtros e estatísticas; `simulados.ts` passa a orquestrar geração de simulados e PDFs.
2. **Reaproveitar carregamento por bibliografia/assunto**: manter consumo de `PerguntasService` exatamente como hoje (por IDs ou assuntos), apenas movendo o uso para o novo componente.
3. **Suportar múltiplos simulados**: permitir coleções independentes (cards) com quantidades configuráveis de V/F, múltipla escolha e correlação.
4. **Adicionar personalização de PDFs**: permitir que o usuário escolha o que entra no documento (ex.: capa, agrupamento, justificativas, customização manual de questões).
5. **Preparar terreno para novos formatos**: simplificar futura inclusão de outros tipos de questão sem tocar nas telas de perguntas.

## 3. Estratégia de extração
1. **Mapear dependências**  
   - Identificar todo o bloco de helpers do PDF (remoção de emoji, estilização, agrupamento, gabarito, etc.) e movê-los para `simulados.ts` (ou, preferencialmente, para um serviço compartilhado `SimuladosPdfService` em `components/simulados/services/`).
   - Manter as interfaces existentes (`SimuladoQuestion`, `SimuladoConfig`, `TabState`) num arquivo de tipos compartilhado (`components/simulados/simulados.types.ts`), reutilizado por `perguntas.ts` enquanto houver overlap.
2. **Criar `Simulados` como componente stand-alone**  
   - Importa `PerguntasService`, `AuthService` e demais utilidades usadas na montagem do simulado.
   - Recebe `@Input() bibliografiaIds` e `@Input() assuntoId` para manter compatibilidade com telas atuais.
   - Expõe eventos `@Output()` (`simuladoGerado`, `pdfBaixado`, etc.) que o componente de perguntas poderá ouvir se precisar manter métricas.
3. **Migrar ações do PDF**  
   - `perguntas.ts` passa a delegar `onGerarPdf()` ➜ `SimuladosService.generatePdf(simuladoAtual)` ou renderiza `<app-simulados>` diretamente com bindings.
   - Garantir que o estado `questionResults` usado nos PDFs (acertos/erros) continue acessível via inputs/outputs.

## 4. Design do novo componente `app-simulados`
- **Responsabilidades**  
  - Gerenciar uma lista de simulados (cards).  
  - Cada card armazena: título, descrição opcional, `SimuladoConfig`, questões carregadas, estado de customização e status de PDF.  
  - Disponibilizar ações: gerar questões automaticamente, editar seleção manual, gerar PDF, duplicar/remover card.
- **Fluxo sugerido**  
  1. Usuário seleciona bibliografias/assuntos (reutilizar dropdowns/filtros já existentes).  
  2. Escolhe um dos presets (Card 1/2/3 abaixo) ou cria uma configuração customizada.  
  3. O componente busca questões suficientes; se faltar, exibe aviso reutilizando `insufficientQuestionsMessage`.  
  4. Antes do PDF, oferece modal/listagem para customizar questões (reordenar, travar perguntas específicas, alternar entre versões).  
  5. Ao confirmar, chama o gerador de PDF parametrizado (incluir/omitir seções, alterar cabeçalho, etc.).
- **Customização de questões para o PDF**  
  - Permitir travar/remover perguntas individuais por card.  
  - Dar opção de editar título/cabeçalho do simulado (nome, data, turma).  
  - Permitir alternar ordem das questões (aleatória ou por bibliografia/assunto).  
  - Checkbox para incluir justificativas no gabarito e/ou espaçamento extra para respostas.
- **Persistência temporária**  
  - Cards podem ser salvos no `localStorage` para que o usuário não perca as composições ao navegar.

## 5. Presets de simulados (cards)
| Card | V ou F | Múltipla escolha | Correlacionar colunas | Observações |
| --- | --- | --- | --- | --- |
| 1 | 10 | 6 | 4 | Configuração atual da aba "completo". |
| 2 | 20 | 10 | 6 | Serve como simulado intermediário. |
| 3 | 30 | 15 | 8 | Simulado avançado/extenso. |

- Esses presets devem vir prontos, mas o usuário pode duplicá-los e ajustar quantidades.  
- As regras de validação devem impedir gerar PDF sem a quantidade mínima disponível; indicar claramente quais bibliografias/assuntos estão sem estoque.

## 6. Personalização do PDF
1. **Opções gerais**  
   - Nome do simulado, data e informações de cabeçalho editáveis.  
   - Escolha do agrupamento: por bibliografia/assunto (modelo atual) ou por tipo de questão.  
   - Alternância de fonte/tamanho (ex.: “compacto” vs “padrão”) herdando os estilos existentes (linhas 2975–4749 de `perguntas.ts`).
2. **Seções toggláveis**  
   - Mostrar/ocultar sumário de desempenho.  
   - Incluir páginas em branco para respostas (espaçamento configurável).  
   - Habilitar/ocultar justificativas no gabarito.  
3. **Customização por questão**  
   - Editar manualmente textos antes da renderização (apenas em memória).  
   - Fixar ordem das alternativas na múltipla escolha e permitir controlar o “swap” da V/F.  
4. **Exportação**  
   - Nome do arquivo: `simulado-{titulo}-{YYYY-MM-DD}.pdf` usando helper `removeAccents`.  
   - Registrar logs dos parâmetros usados (úteis para auditoria).

## 7. Integração com filtros de bibliografia/assunto
- `Simulados` deve expor métodos para receber `bibliografiaIds` e `assuntoId` exatamente como `perguntas.ts` já faz (inclusive com fallback para “Sem assunto”).  
- Reutilizar caches já existentes (`allQuestionsCache`, `allQuestionsCacheComplete`) movendo-os para um serviço compartilhado (`PerguntasRepository`?) ou injetando-os via inputs.  
- Garantir que filtros de assunto atualizados no componente pai reflitam nos cards (ex.: evento `onAssuntoChange` que reseta apenas o card selecionado).

## 8. Passos sugeridos de implementação
1. **Preparação**  
   - Criar pasta `components/simulados/` com o componente, template, styles e um serviço `simulados-pdf.service.ts`.  
   - Copiar interfaces/enumerações relevantes de `perguntas.ts` para arquivos de tipos.
2. **Extração da lógica de PDF**  
   - Mover helpers (`removeEmojis`, `extractTextWithStyles`, `renderStyledText`, `removeAssuntoFromPergunta`, etc.) para o serviço.  
   - Expôr métodos `generateMixedPdf(simulado: SimuladoCard)` e `generatePdfByType(type, questions)` reutilizando o mesmo código já validado.
3. **Gerenciamento de cards**  
   - Implementar `SimuladoCard` contendo `config`, `questions`, `customQuestions`, `status`.  
   - Criar UI em `simulados.html` com cards (Angular Material ou layout existente) + botões “Gerar questões”, “Customizar”, “PDF”.  
4. **Customização**  
   - Criar modal ou drawer permitindo alterar seleção das perguntas e salvar no card.  
   - Controle de presets (Card 1/2/3) + opção “Adicionar novo”.
5. **Integração com `perguntas.ts`**  
   - Substituir botões de PDF que chamavam métodos internos por `<app-simulados ...>` ou um serviço injetado.  
   - Remover código morto de `perguntas.ts` após validar toda a funcionalidade em `simulados.ts`.
6. **Testes e validação**  
   - Verificar geração dos três tipos de PDF e garantir que as métricas (respondidas/acertos) continuem corretas.  
   - Validar cards com bibliografias diferentes e múltiplos assuntos.  
   - Garantir que customizações reflitam no PDF (pré-visualizar JSON antes da chamada do serviço).

## 9. Navegação e rotas
1. **Botão na home**  
   - Em `frontend-cemos/src/app/pages/home/home.component.html`, adicionar um botão/atalho “Simulados” visível tanto no layout mobile (menu superior) quanto no desktop (menu lateral).  
   - Usar `routerLink` apontando para a rota de simulados, com foco em acessibilidade (atribuir `aria-label`, suporte a teclado e ícones consistentes com os demais botões).
2. **Rotas por módulo**  
   - Atualizar `frontend-cemos/src/app/routes/module-route.config.ts` incluindo um `RouteSegmentConfig` para “Simulados” em cada item de `segments`.  
   - O novo segmento deve carregar o componente via `loadComponent: () => import('../components/simulados/simulados').then(m => m.Simulados)` e, se necessário, repassar parâmetros do módulo (IDs de bibliografia/assunto) para manter o carregamento filtrado.  
   - Garantir que o menu lateral/topo passe a exibir o novo link automaticamente a partir dessa configuração.

> Após implementar, validar que clicar no botão “Simulados” em qualquer módulo leva ao componente recém-criado e preserva o contexto (bibliografia/assunto) do módulo atual.

## 10. Critérios de aceitação
- Usuário consegue criar pelo menos três simulados simultâneos (cards) com quantidades indicadas.  
- PDFs gerados pelo novo componente são idênticos (ou melhores) aos atuais, mantendo agrupamentos por bibliografia/assunto e gabarito completo.  
- Opções de personalização funcionam sem quebrar o layout (testar com textos longos e justificativas extensas).  
- Componentes antigos continuam funcionando para estudo/resposta online; apenas a geração de PDF é delegada.  
- Documentação atualizada (`components/perguntas/docs.md` + este arquivo) descreve o fluxo definitivo.

---
Este documento deve ser usado como guia de implementação e checklist de QA ao mover a lógica para `Simulados`. Ajustes adicionais podem ser anexados conforme surgirem novos requisitos.
