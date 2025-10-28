import { Route } from '@angular/router';

type ComponentLoader = () => Promise<any>;

export interface RouteSegmentConfig {
  title: string;
  path: string;
  loadComponent: ComponentLoader;
  children?: RouteSegmentConfig[];
}

export interface ModuleRouteConfig {
  title: string;
  path: string;
  defaultChild?: string;
  segments: RouteSegmentConfig[];
}

export const MODULE_ROUTE_CONFIGS: ModuleRouteConfig[] = [
  {
    title: 'App1 Intendência',
    path: 'app1-intendencia',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () =>
          import(
            '../modules/app1-intendencia/app1-intendencia-bibliografia/app1-intendencia-bibliografia'
          ).then((m) => m.App1IntendenciaBibliografia)
      },
      {
        title: 'Mídia',
        path: 'media',
        loadComponent: () =>
          import('../modules/app1-intendencia/app1-intendencia-media/app1-intendencia-media').then(
            (m) => m.App1IntendenciaMedia
          )
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () =>
          import(
            '../modules/app1-intendencia/app1-intendencia-perguntas/app1-intendencia-perguntas'
          ).then((m) => m.App1IntendenciaPerguntas)
      },
      {
        title: 'Resumo',
        path: 'resumo',
        loadComponent: () =>
          import('../modules/app1-intendencia/app1-intendencia-resumo/app1-intendencia-resumo').then(
            (m) => m.App1IntendenciaResumo
          )
      }
    ]
  },
  {
    title: 'App2 Estratégia',
    path: 'app2-estrategia',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () =>
          import(
            '../modules/app2-estrategia/app2-estrategia-bibliografia/app2-estrategia-bibliografia'
          ).then((m) => m.App2EstrategiaBibliografia)
      },
      {
        title: 'Mídia',
        path: 'media',
        loadComponent: () =>
          import('../modules/app2-estrategia/app2-estrategia-media/app2-estrategia-media').then(
            (m) => m.App2EstrategiaMedia
          )
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () =>
          import('../modules/app2-estrategia/app2-estrategia-perguntas/app2-estrategia-perguntas').then(
            (m) => m.App2EstrategiaPerguntas
          )
      },
      {
        title: 'Resumo',
        path: 'resumo',
        loadComponent: () =>
          import('../modules/app2-estrategia/app2-estrategia-resumo/app2-estrategia-resumo').then(
            (m) => m.App2EstrategiaResumo
          )
      }
    ]
  },
  {
    title: 'App3 Planejamento Militar',
    path: 'app3-planejamento-militar',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () =>
          import(
            '../modules/app3-planejamento-militar/app3-planejamento-militar-bibliografia/app3-planejamento-militar-bibliografia'
          ).then((m) => m.App3PlanejamentoMilitarBibliografia)
      },
      {
        title: 'Mídia',
        path: 'media',
        loadComponent: () =>
          import(
            '../modules/app3-planejamento-militar/app3-planejamento-militar-media/app3-planejamento-militar-media'
          ).then((m) => m.App3PlanejamentoMilitarMedia)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () =>
          import(
            '../modules/app3-planejamento-militar/app3-planejamento-militar-perguntas/app3-planejamento-militar-perguntas'
          ).then((m) => m.App3PlanejamentoMilitarPerguntas)
      },
      {
        title: 'Resumo',
        path: 'resumo',
        loadComponent: () =>
          import(
            '../modules/app3-planejamento-militar/app3-planejamento-militar-resumo/app3-planejamento-militar-resumo'
          ).then((m) => m.App3PlanejamentoMilitarResumo)
      }
    ]
  },
  {
    title: 'App4 História',
    path: 'app4-historia',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () =>
          import('../modules/app4-historia/app4-historia-bibliografia/app4-historia-bibliografia').then(
            (m) => m.App4HistoriaBibliografia
          ),
        children: [
          {
            title: 'Breve História',
            path: 'breve-historia',
            loadComponent: () =>
              import('../modules/app4-historia/app4-historia-bibliografia/breve-historia/breve-historia').then(
                (m) => m.BreveHistoria
              )
          },
          {
            title: 'Guerra no Mar',
            path: 'guerra-no-mar',
            loadComponent: () =>
              import('../modules/app4-historia/app4-historia-bibliografia/guerra-no-mar/guerra-no-mar').then(
                (m) => m.GuerraNoMar
              )
          },
          {
            title: 'História das Guerras',
            path: 'historia-das-guerras',
            loadComponent: () =>
              import('../modules/app4-historia/app4-historia-bibliografia/historia-das-guerras/historia-das-guerras').then(
                (m) => m.HistoriaDasGuerras
              )
          },
          {
            title: 'Síntese Histórica',
            path: 'sintese-historica',
            loadComponent: () =>
              import('../modules/app4-historia/app4-historia-bibliografia/sintese-historica/sintese-historica').then(
                (m) => m.SinteseHistorica
              )
          }
        ]
      },
      {
        title: 'Mídia',
        path: 'media',
        loadComponent: () =>
          import('../modules/app4-historia/app4-historia-media/app4-historia-media').then(
            (m) => m.App4HistoriaMedia
          )
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () =>
          import('../modules/app4-historia/app4-historia-perguntas/app4-historia-perguntas').then(
            (m) => m.App4HistoriaPerguntas
          )
      },
      {
        title: 'Resumo',
        path: 'resumo',
        loadComponent: () =>
          import('../modules/app4-historia/app4-historia-resumo/app4-historia-resumo').then(
            (m) => m.App4HistoriaResumo
          )
      }
    ]
  },
  {
    title: 'App5 Inglês',
    path: 'app5-ingles',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () =>
          import('../modules/app5-ingles/app5-ingles-bibliografia/app5-ingles-bibliografia').then(
            (m) => m.App5InglesBibliografia
          )
      },
      {
        title: 'Mídia',
        path: 'media',
        loadComponent: () =>
          import('../modules/app5-ingles/app5-ingles-media/app5-ingles-media').then((m) => m.App5InglesMedia)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () =>
          import('../modules/app5-ingles/app5-ingles-perguntas/app5-ingles-perguntas').then(
            (m) => m.App5InglesPerguntas
          )
      },
      {
        title: 'Resumo',
        path: 'resumo',
        loadComponent: () =>
          import('../modules/app5-ingles/app5-ingles-resumo/app5-ingles-resumo').then((m) => m.App5InglesResumo)
      }
    ]
  },
  {
    title: 'App6 Geopolítica',
    path: 'app6-geopolitica-relacoes-internacionais',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () =>
          import('../modules/app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-bibliografia/app6-geopolitica-relacoes-internacionais-bibliografia').then(
            (m) => m.App6GeopoliticaRelacoesInternacionaisBibliografia
          ),
        children: [
          {
            title: 'A Vingança da Geografia',
            path: 'vinganca-geografia',
            loadComponent: () =>
              import('../modules/app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-bibliografia/vinganca-geografia/vinganca-geografia').then(
                (m) => m.VingancaGeografia
              )
          },
          {
            title: 'Geopolítica e Modernidade',
            path: 'geopolitica-modernidade',
            loadComponent: () =>
              import('../modules/app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-bibliografia/geopolitica-modernidade/geopolitica-modernidade').then(
                (m) => m.GeopoliticaModernidade
              )
          },
          {
            title: 'Novas Geopolíticas',
            path: 'novas-geopoliticas',
            loadComponent: () =>
              import('../modules/app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-bibliografia/novas-geopoliticas/novas-geopoliticas').then(
                (m) => m.NovasGeopoliticas
              )
          },
          {
            title: 'Princípios de Relações Internacionais',
            path: 'principios-ri',
            loadComponent: () =>
              import('../modules/app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-bibliografia/principios-ri/principios-ri').then(
                (m) => m.PrincipiosRi
              )
          }
        ]
      },
      {
        title: 'Mídia',
        path: 'media',
        loadComponent: () =>
          import(
            '../modules/app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-media/app6-geopolitica-relacoes-internacionais-media'
          ).then((m) => m.App6GeopoliticaRelacoesInternacionaisMedia),
        },
      {
        title: 'Flash Cards',
        path: 'flash-cards',
        loadComponent: () =>
          import(
            '../modules/app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-flashcards/app6-geopolitica-relacoes-internacionais-flashcards'
          ).then((m) => m.App6GeopoliticaRelacoesInternacionaisFlashcards)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () =>
          import(
            '../modules/app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-perguntas/app6-geopolitica-relacoes-internacionais-perguntas'
          ).then((m) => m.App6GeopoliticaRelacoesInternacionaisPerguntas)
      },
      {
        title: 'Conceitos',
        path: 'conceitos',
        loadComponent: () =>
          import(
            '../modules/app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-conceitos/app6-geopolitica-relacoes-internacionais-conceitos'
          ).then((m) => m.App6GeopoliticaRelacoesInternacionaisConceitos)
      },
      {
        title: 'Pensadores',
        path: 'pensadores',
        loadComponent: () =>
          import(
            '../modules/app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-pensadores/app6-geopolitica-relacoes-internacionais-pensadores'
          ).then((m) => m.App6GeopoliticaRelacoesInternacionaisPensadores)
      },
      {
        title: 'Resumo',
        path: 'resumo',
        loadComponent: () =>
          import('../modules/app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-resumo/app6-geopolitica-relacoes-internacionais-resumo').then(
            (m) => m.App6GeopoliticaRelacoesInternacionaisResumo
          ),                  
        children: [
          {
            title: 'Geopolítica',
            path: 'geopolitica',
            loadComponent: () =>
              import('../modules/app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-resumo/geopolitica/geopolitica').then(
                (m) => m.Geopolitica
              )
          },
          {
            title: 'Relações Internacionais',
            path: 'relacoes-internacionais',
            loadComponent: () =>
              import('../modules/app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-resumo/relacoes-internacionais/relacoes-internacionais').then(
                (m) => m.RelacoesInternacionais
              )
          }
        ]
      }
    ]
  },
  {
    title: 'App7 Política',
    path: 'app7-politica',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () =>
          import('../modules/app7-politica/app7-politica-bibliografia/app7-politica-bibliografia').then(
            (m) => m.App7PoliticaBibliografia
          )
      },
      {
        title: 'Mídia',
        path: 'media',
        loadComponent: () =>
          import('../modules/app7-politica/app7-politica-media/app7-politica-media').then(
            (m) => m.App7PoliticaMedia
          )
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () =>
          import('../modules/app7-politica/app7-politica-perguntas/app7-politica-perguntas').then(
            (m) => m.App7PoliticaPerguntas
          )
      },
      {
        title: 'Resumo',
        path: 'resumo',
        loadComponent: () =>
          import('../modules/app7-politica/app7-politica-resumo/app7-politica-resumo').then(
            (m) => m.App7PoliticaResumo
          )
      }
    ]
  },
  {
    title: 'App8 Direito',
    path: 'app8-direito',
    defaultChild: 'bibliografia',
    segments: [
  {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () =>
          import('../modules/app8-direito/app8-direito-bibliografia/app8-direito-bibliografia').then(
            (m) => m.App8DireitoBibliografia
          ),
        children: [
          {
            title: 'EMA-135',
            path: 'ema-135',
            loadComponent: () =>
              import('../modules/app8-direito/app8-direito-bibliografia/ema-135/ema-135').then(
                (m) => m.Ema135
              )
          },
          {
            title: 'A Lei da Guerra',
            path: 'lei-da-guerra',
            loadComponent: () =>
              import('../modules/app8-direito/app8-direito-bibliografia/lei-da-guerra/lei-da-guerra').then(
                (m) => m.LeiDaGuerra
              )
          },
          {
            title: 'Carta das Nações Unidas',
            path: 'carta-nacoes-unidas',
            loadComponent: () =>
              import('../modules/app8-direito/app8-direito-bibliografia/3-carta-nacoes-unidas/carta-nacoes-unidas').then(
                (m) => m.CartaNacoesUnidas
              )
          },
          {
            title: 'Feridos, enfermos e náufragos',
            path: 'feridos-enfermos',
            loadComponent: () =>
              import('../modules/app8-direito/app8-direito-bibliografia/feridos-enfermos/feridos-enfermos').then(
                (m) => m.FeridosEnfermos
              )
          },
          {
            title: 'Protocolo I',
            path: 'protocolo-i',
            loadComponent: () =>
              import('../modules/app8-direito/app8-direito-bibliografia/protocolo-i/protocolo-i').then(
                (m) => m.ProtocoloI
              )
          },
          {
            title: 'Protocolo II',
            path: 'protocolo-ii',
            loadComponent: () =>
              import('../modules/app8-direito/app8-direito-bibliografia/protocolo-ii/protocolo-ii').then(
                (m) => m.ProtocoloII
              )
          },
          {
            title: 'San Remo Manual',
            path: 'san-remo-manual',
            loadComponent: () =>
              import('../modules/app8-direito/app8-direito-bibliografia/san-remo-manual/san-remo-manual').then(
                (m) => m.SanRemoManual
              )
          },
          {
            title: 'Concenção das Nações Unidas sobre o Direito do Mar',
            path: 'cnudm',
            loadComponent: () =>
              import('../modules/app8-direito/app8-direito-bibliografia/cnudm/cnudm').then(
                (m) => m.Cnudm
              )
          },
          {
            title: 'Entorpecentes e Psicotrópicos',
            path: 'entorpecentes-psicotropicos',
            loadComponent: () =>
              import('../modules/app8-direito/app8-direito-bibliografia/entorpecentes-psicotropicos/entorpecentes-psicotropicos').then(
                (m) => m.EntorpecentesPsicotropicos
              )
          },
          {
            title: 'Pacto de São José',
            path: 'pacto-sao-jose',
            loadComponent: () =>
              import('../modules/app8-direito/app8-direito-bibliografia/pacto-sao-jose/pacto-sao-jose').then(
                (m) => m.PactoSaoJose
              )
          },
          {
            title: 'Declaração Universal dos Direitos Humanos',
            path: 'declaracao-direitos-humanos',
            loadComponent: () =>
              import('../modules/app8-direito/app8-direito-bibliografia/declaracao-direitos-humanos/declaracao-direitos-humanos').then(
                (m) => m.DeclaracaoDireitosHumanos
              )
          },
          {
            title: 'Direito dos Tratados',
            path: 'declaracao-direito-tratados',
            loadComponent: () =>
              import('../modules/app8-direito/app8-direito-bibliografia/declaracao-direito-tratados/declaracao-direito-tratados').then(
                (m) => m.DeclaracaoDireitoTratados
              )
          }
        ]
      },
      {
        title: 'Mídia',
        path: 'media',
        loadComponent: () =>
          import('../modules/app8-direito/app8-direito-media/app8-direito-media').then((m) => m.App8DireitoMedia)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () =>
          import('../modules/app8-direito/app8-direito-perguntas/app8-direito-perguntas').then(
            (m) => m.App8DireitoPerguntas
          )
      },
      {
        title: 'Resumo',
        path: 'resumo',
        loadComponent: () =>
          import('../modules/app8-direito/app8-direito-resumo/app8-direito-resumo').then(
            (m) => m.App8DireitoResumo
          )
      }
    ]
  },
  {
    title: 'App9 Economia',
    path: 'app9-economia',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () =>
          import('../modules/app9-economia/app9-economia-bibliografia/app9-economia-bibliografia').then(
            (m) => m.App9EconomiaBibliografia
          )
      },
      {
        title: 'Mídia',
        path: 'media',
        loadComponent: () =>
          import('../modules/app9-economia/app9-economia-media/app9-economia-media').then(
            (m) => m.App9EconomiaMedia
          )
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () =>
          import('../modules/app9-economia/app9-economia-perguntas/app9-economia-perguntas').then(
            (m) => m.App9EconomiaPerguntas
          )
      },
      {
        title: 'Resumo',
        path: 'resumo',
        loadComponent: () =>
          import('../modules/app9-economia/app9-economia-resumo/app9-economia-resumo').then(
            (m) => m.App9EconomiaResumo
          )
      }
    ]
  }
];

export const moduleRoutes: Route[] = MODULE_ROUTE_CONFIGS.map(({ path, defaultChild, segments }) => {
  const children: Route['children'] = [
    {
      path: '',
      redirectTo: defaultChild ?? segments[0]?.path ?? '',
      pathMatch: 'full'
    },
    ...segments.map(({ path: segmentPath, loadComponent, children }) => {
      if (children && children.length > 0) {
        // Se tem filhos, criar rotas aninhadas SEM redirecionamento automático
        const nestedChildren: Route['children'] = [
          ...children.map(({ path: childPath, loadComponent: childLoadComponent }) => ({
            path: childPath,
            loadComponent: childLoadComponent
          }))
        ];
        
        return {
          path: segmentPath,
          loadComponent,
          children: nestedChildren
        };
      } else {
        // Se não tem filhos, rota simples
        return {
          path: segmentPath,
          loadComponent
        };
      }
    })
  ];

  return {
    path,
    children
  };
});

export const defaultHomeRedirect = `${MODULE_ROUTE_CONFIGS[0]?.path ?? ''}/${
  MODULE_ROUTE_CONFIGS[0]?.defaultChild ?? MODULE_ROUTE_CONFIGS[0]?.segments[0]?.path ?? ''
}`;
