#!/bin/bash

apps=(
"app1-controle-ext"
"app2-adm-pub"
"app3-dir-const"
"app4-dir-adm"
"app5-infra-ti"
"app6-eng-dados"
"app7-eng-software"
"app8-seg-info"
"app9-comp-nuvem"
"app10-IA"
"app11-contratacao-ti"
"app12-gestao-ti"
)

subcomponents=(
"flashcards"
"perguntas"
"conceitos"
"bibliografia"
)

for app in "${apps[@]}"; do
  echo "📁 Criando pasta: $app"
  mkdir -p "src/app/$app"

  for sub in "${subcomponents[@]}"; do
    full_component_name="${app}-${sub}"
    echo "➡️  Gerando componente: $full_component_name"
    ng g c "$app/$full_component_name" --skip-tests
  done
done

echo "✅ Todos os componentes foram gerados com sucesso!"
