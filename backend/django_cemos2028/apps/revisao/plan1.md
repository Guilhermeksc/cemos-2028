# RELATÓRIO DE REGRAS DE NEGÓCIO

## 1. Objetivo do Aplicativo

O aplicativo tem como finalidade permitir que cada usuário **planeje, execute, registre e revise seus estudos de forma personalizada**, respeitando seu próprio ritmo, disponibilidade de tempo e estratégia de aprendizado, com foco em **revisões periódicas e consolidação do conteúdo**.

## 2. Usuários e Autonomia

1. Cada usuário possui **autonomia total** sobre seus estudos.
2. O usuário pode:

   * Criar um projetos de estudo individualizado.
   * Definir quando iniciar seus estudos.
   * Ajustar prioridades entre matérias.
   * Iniciar qualquer matéria em qualquer momento, sem bloqueios.

3. Não há dependência entre usuários. Todos os dados são individuais.

## 3. Projeto de Estudo

1. Um projeto de estudo representa um **plano completo de preparação** para o concurso de admissão ao cemos.

2. Cada projeto deve conter:

   * Id vinculado ao usuário.
   * Data de início definida pelo usuário.
   * Quantidade média de tempo disponível por dia.
   * Quantidade de páginas por matéria.
   * Quantidade de páginas por dia.

## 4. Estrutura do Conteúdo

### 4.1 Matérias

1. Cada projeto possui uma lista de matérias (Intendência, Estratégia, Planejamento Militar, História, Geopolítica e RI, Política, Direito e Economia)

2. Cada matéria pode ter:

   * Grau de importância relativo às demais.
   * Quantidade variável de conteúdo.
3. A ordem das matérias **não é fixa** e pode ser ajustada pelo sistema ou pelo usuário.

### 4.2 Capítulos

1. Cada matéria é composta por Capítulos.
2. Cada Capítulo tem um respectivo id.
3. O usuário pode avançar Capítulo por Capítulo, sem obrigatoriedade de finalizar toda a matéria de uma vez.

## 5. Sessões de Estudo

1. Cada Capítulo estudado gera uma sessão de estudo associada a uma data.
2. Uma sessão representa o estudo efetivo de um conteúdo em um dia específico.
3. O usuário pode registrar:

   * Tempo dedicado.
   * Material utilizado.
   * O sistema deve registrar a quantidade de questões resolvidas.
   * Se a teoria foi finalizada.

4. Uma sessão pode ser marcada como concluída ou pendente.

## 6. Passadas de Estudo

1. O estudo de cada matéria ocorre em **múltiplas passadas**.
2. As passadas possuem o seguinte significado:

   * **1ª passada**: primeiro contato com o conteúdo.
   * **2ª passada**: revisão e aprofundamento.
   * **3ª passada**: consolidação final.
   outras passadas podem ser adicionadas, essa lógica de 3 passas é a recomendação.

3. A sugestão é que cada passada possua duração menor que a anterior.
4. O sistema organiza as passadas de forma sequencial, respeitando a progressão do aprendizado.

## 7. Geração Automática do Cronograma

1. O cronograma é gerado automaticamente a partir da data de início definida pelo usuário.
2. A ordem das matérias é sugerida considerando: a seguinte ordem 
(1º História, 2º Geopolítica e RI, 3º Política, 4º Direito, 5º Economia, 6º Estratégia, 7º  Planejamento Militar, 8º Intendência)

3. O sistema distribui os estudos em dias consecutivos, respeitando a disponibilidade diária informada.
4. O usuário pode alterar a ordem da sugestão de matérias

## 8. Revisões Programadas

1. Toda sessão de estudo gera revisões automáticas.
2. As revisões ocorrem obrigatoriamente nos seguintes intervalos:

   * 1 dia após o estudo.
   * 7 dias após o estudo.
   * 30 dias após o estudo.
   * 60 dias após o estudo.
   * 120 dias após o estudo.
3. As revisões são vinculadas ao conteúdo estudado.
4. O não cumprimento de uma revisão não impede as próximas, mas é registrado.

## 9. Registro de Estudos

1. O usuário pode registrar estudos Manualmente. O registro inclui:

   * Data.
   * Matéria.
   * Capítulo ou tópico.
   * Tempo estudado.
   * Observações opcionais.

2. O registro pode ser contabilizado no planejamento ou apenas como histórico, a critério do usuário.

## 10. Planejamento Flexível

1. O planejamento **não é rígido**.
2. Caso o usuário:

   * Falte um dia.
   * Estude menos do que o previsto.
   * Antecipe estudos.

   O sistema deve ajustar o cronograma de forma progressiva, sem descartar estudos anteriores.

3. O histórico nunca é apagado automaticamente.

## 11. Visualização do Calendário

1. O usuário visualiza o cronograma em formato de calendário.
2. O calendário apresenta:

   * Número da passada.
   * Matéria.
   * Data de início.
   * Data de término.
3. Cada passada possui identificação visual distinta.
4. O calendário reflete tanto estudos planejados quanto realizados.

## 12. Indicadores e Acompanhamento

1. O sistema deve permitir acompanhamento do progresso:

   * Matérias iniciadas.
   * Matérias concluídas.
   * Revisões pendentes.
2. O foco é **consistência ao longo do tempo**, não apenas volume.

## 13. Princípios Fundamentais

1. O usuário nunca é penalizado por atrasos.
2. O sistema atua como **apoio e orientação**, não como imposição.
3. O estudo é tratado como um processo contínuo e adaptável.
4. Revisão é parte obrigatória do aprendizado, não opcional.

## 14. Resultado Esperado

Ao utilizar o aplicativo, o usuário deverá:

* Ter clareza do que estudar em cada dia.
* Saber exatamente quando revisar cada conteúdo.
* Conseguir iniciar, pausar e retomar seus estudos sem prejuízo.
* Manter um histórico confiável e organizado de todo o processo de aprendizagem.

Se desejar, posso gerar a partir deste documento:

* **Casos de uso**
* **Fluxos operacionais**
* **Critérios de aceite**
* **Mapa de navegação do aplicativo**
* **Documento para validação com usuários finais**
