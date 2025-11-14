#!/bin/bash

OUTPUT_FILE="side-menu.ts"

apps=(
"app1-controle-ext:Controle Externo:inventory_2"
"app2-adm-pub:Administração Pública:account_balance"
"app3-dir-const:Direito Constitucional:gavel"
"app4-dir-adm:Direito Administrativo:balance_scale"
"app5-infra-ti:Infraestrutura de TI:memory"
"app6-eng-dados:Engenharia de Dados:storage"
"app7-eng-software:Engenharia de Software:terminal"
"app8-seg-info:Segurança da Informação:security"
"app9-comp-nuvem:Computação em Nuvem:cloud"
"app10-IA:Inteligência Artificial:smart_toy"
"app11-contratacao-ti:Contratação de TI:assignment"
"app12-gestao-ti:Gestão de TI:settings"
)

subcomponents=(
"Bibliografia"
"Flash Cards"
"Perguntas"
"Conceitos"
)

echo "📝 Gerando $OUTPUT_FILE ..."

cat << 'EOF' > "$OUTPUT_FILE"
// Auto-generated file
// Do not edit manually

import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../../../services/auth.service';

interface MenuItem {
  title: string;
  icon: string;
  children: (string | SubMenuItem)[];
  expanded: boolean;
}

interface SubMenuItem {
  title: string;
  icon?: string;
  children?: (string | SubSubMenuItem)[];
  expanded?: boolean;
}

interface SubSubMenuItem {
  title: string;
  icon?: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [NgFor, NgIf, MatIconModule, MatListModule, MatButtonModule],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: 'hidden' })),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')])
    ])
  ]
})
export class SideMenu {
  @Input() isTopMenuMode: boolean = false;
  @Output() itemClicked = new EventEmitter<void>();
  currentActivePath = signal<string>('');

  constructor(private router: Router, private authService: AuthService) {}

  readonly menuItems = signal<MenuItem[]>([
EOF

# Construir o menu
for entry in "${apps[@]}"; do
  IFS=':' read -r app pathTitle icon <<< "$entry"

  echo "    {" >> "$OUTPUT_FILE"
  echo "      title: '$pathTitle'," >> "$OUTPUT_FILE"
  echo "      icon: '$icon'," >> "$OUTPUT_FILE"
  echo "      children: [" >> "$OUTPUT_FILE"

  # Bibliografia possui submenu especial
  echo "        {" >> "$OUTPUT_FILE"
  echo "          title: 'Bibliografia'," >> "$OUTPUT_FILE"
  echo "          children: []" >> "$OUTPUT_FILE"
  echo "        }," >> "$OUTPUT_FILE"

  # Demais submenus simples
  for sub in "${subcomponents[@]}"; do
    if [[ "$sub" != "Bibliografia" ]]; then
      echo "        '$sub'," >> "$OUTPUT_FILE"
    fi
  done

  echo "      ]," >> "$OUTPUT_FILE"
  echo "      expanded: false" >> "$OUTPUT_FILE"
  echo "    }," >> "$OUTPUT_FILE"
done

cat << 'EOF' >> "$OUTPUT_FILE"
  ]);

  toggleSection(index: number): void {
    this.menuItems.update(items => {
      const updated = [...items];
      const wasOpen = updated[index].expanded;
      updated.forEach(i => (i.expanded = false));
      updated[index].expanded = !wasOpen;
      return updated;
    });
  }

  toggleSubSection(sectionIndex: number, subIndex: number): void {
    this.menuItems.update(items => {
      const updated = [...items];
      const sec = updated[sectionIndex];
      const sub = sec.children[subIndex];

      if (typeof sub === 'object' && sub.children) {
        const was = sub.expanded ?? false;
        sec.children = sec.children.map(c => {
          if (typeof c === 'object' && c.children) return { ...c, expanded: false };
          return c;
        });
        sec.children[subIndex] = { ...sub, expanded: !was };
      }
      return updated;
    });
  }

  navigate(path: string[]): void {
    this.currentActivePath.set(path.join('/'));
    this.router.navigate(path);
    this.itemClicked.emit();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
EOF

echo "✅ Arquivo $OUTPUT_FILE gerado com sucesso."
