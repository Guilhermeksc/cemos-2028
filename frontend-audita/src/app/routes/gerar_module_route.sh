#!/bin/bash

OUTPUT_FILE="module-route.config.ts"

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

# Função para transformar "app1-controle-ext" em "App1ControleExt"
capitalize() {
  IFS='-' read -ra parts <<< "$1"
  result=""
  for p in "${parts[@]}"; do
    result+="${p^}"
  done
  echo "$result"
}

echo "📝 Gerando $OUTPUT_FILE ..."

cat << 'EOF' > "$OUTPUT_FILE"
import { Route } from '@angular/router';

type ComponentLoader = () => Promise<any>;

export interface RouteSegmentConfig {
  title: string;
  path: string;
  loadComponent: ComponentLoader;
}

export interface ModuleRouteConfig {
  title: string;
  path: string;
  defaultChild?: string;
  segments: RouteSegmentConfig[];
}

export const MODULE_ROUTE_CONFIGS: ModuleRouteConfig[] = [
EOF

# Iterar pelos apps
for app in "${apps[@]}"; do
  ClassName=$(capitalize "$app")
  ModuleTitle=$(echo "$ClassName" | sed 's/^\(App[0-9]*\)/\1 /') # App1 Controle Ext
  ModulePath="$app"

  echo "  {" >> "$OUTPUT_FILE"
  echo "    title: '$ModuleTitle'," >> "$OUTPUT_FILE"
  echo "    path: '$ModulePath'," >> "$OUTPUT_FILE"
  echo "    defaultChild: 'bibliografia'," >> "$OUTPUT_FILE"
  echo "    segments: [" >> "$OUTPUT_FILE"

  # Subcomponentes
  for sub in "${subcomponents[@]}"; do
    SubClass="${ClassName}${sub^}"
    SubPath="$sub"
    ImportPath="../modules/$app/$app-$sub/$app-$sub"

    echo "      {" >> "$OUTPUT_FILE"
    echo "        title: '${sub^}'," >> "$OUTPUT_FILE"
    echo "        path: '$SubPath'," >> "$OUTPUT_FILE"
    echo "        loadComponent: () => import('$ImportPath').then(m => m.$SubClass)" >> "$OUTPUT_FILE"
    echo "      }," >> "$OUTPUT_FILE"
  done

  echo "    ]" >> "$OUTPUT_FILE"
  echo "  }," >> "$OUTPUT_FILE"
done

# Fechar o array
echo "];" >> "$OUTPUT_FILE"

cat << 'EOF' >> "$OUTPUT_FILE"

export const moduleRoutes: Route[] = MODULE_ROUTE_CONFIGS.map(({ path, defaultChild, segments }) => ({
  path,
  children: [
    {
      path: '',
      redirectTo: defaultChild ?? segments[0]?.path ?? '',
      pathMatch: 'full'
    },
    ...segments.map(seg => ({
      path: seg.path,
      loadComponent: seg.loadComponent
    }))
  ]
}));

export const defaultHomeRedirect = `${MODULE_ROUTE_CONFIGS[0]?.path ?? ''}/${
  MODULE_ROUTE_CONFIGS[0]?.defaultChild ?? MODULE_ROUTE_CONFIGS[0]?.segments[0]?.path ?? ''
}`;
EOF

echo "✅ Arquivo $OUTPUT_FILE gerado com sucesso."
