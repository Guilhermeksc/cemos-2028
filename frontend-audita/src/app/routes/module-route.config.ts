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
    title: 'App1 ControleExt',
    path: 'app1-controle-ext',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Flashcards',
        path: 'flashcards',
        loadComponent: () => import('../modules/app1-controle-ext/app1-controle-ext-flashcards/app1-controle-ext-flashcards').then(m => m.App1ControleExtFlashcards)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () => import('../modules/app1-controle-ext/app1-controle-ext-perguntas/app1-controle-ext-perguntas').then(m => m.App1ControleExtPerguntas)
      },
      {
        title: 'Conceitos',
        path: 'conceitos',
        loadComponent: () => import('../modules/app1-controle-ext/app1-controle-ext-conceitos/app1-controle-ext-conceitos').then(m => m.App1ControleExtConceitos)
      },
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () => import('../modules/app1-controle-ext/app1-controle-ext-bibliografia/app1-controle-ext-bibliografia').then(m => m.App1ControleExtBibliografia)
      },
    ]
  },
  {
    title: 'App2 AdmPub',
    path: 'app2-adm-pub',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Flashcards',
        path: 'flashcards',
        loadComponent: () => import('../modules/app2-adm-pub/app2-adm-pub-flashcards/app2-adm-pub-flashcards').then(m => m.App2AdmPubFlashcards)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () => import('../modules/app2-adm-pub/app2-adm-pub-perguntas/app2-adm-pub-perguntas').then(m => m.App2AdmPubPerguntas)
      },
      {
        title: 'Conceitos',
        path: 'conceitos',
        loadComponent: () => import('../modules/app2-adm-pub/app2-adm-pub-conceitos/app2-adm-pub-conceitos').then(m => m.App2AdmPubConceitos)
      },
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () => import('../modules/app2-adm-pub/app2-adm-pub-bibliografia/app2-adm-pub-bibliografia').then(m => m.App2AdmPubBibliografia)
      },
    ]
  },
  {
    title: 'App3 DirConst',
    path: 'app3-dir-const',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Flashcards',
        path: 'flashcards',
        loadComponent: () => import('../modules/app3-dir-const/app3-dir-const-flashcards/app3-dir-const-flashcards').then(m => m.App3DirConstFlashcards)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () => import('../modules/app3-dir-const/app3-dir-const-perguntas/app3-dir-const-perguntas').then(m => m.App3DirConstPerguntas)
      },
      {
        title: 'Conceitos',
        path: 'conceitos',
        loadComponent: () => import('../modules/app3-dir-const/app3-dir-const-conceitos/app3-dir-const-conceitos').then(m => m.App3DirConstConceitos)
      },
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () => import('../modules/app3-dir-const/app3-dir-const-bibliografia/app3-dir-const-bibliografia').then(m => m.App3DirConstBibliografia)
      },
    ]
  },
  {
    title: 'App4 DirAdm',
    path: 'app4-dir-adm',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Flashcards',
        path: 'flashcards',
        loadComponent: () => import('../modules/app4-dir-adm/app4-dir-adm-flashcards/app4-dir-adm-flashcards').then(m => m.App4DirAdmFlashcards)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () => import('../modules/app4-dir-adm/app4-dir-adm-perguntas/app4-dir-adm-perguntas').then(m => m.App4DirAdmPerguntas)
      },
      {
        title: 'Conceitos',
        path: 'conceitos',
        loadComponent: () => import('../modules/app4-dir-adm/app4-dir-adm-conceitos/app4-dir-adm-conceitos').then(m => m.App4DirAdmConceitos)
      },
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () => import('../modules/app4-dir-adm/app4-dir-adm-bibliografia/app4-dir-adm-bibliografia').then(m => m.App4DirAdmBibliografia)
      },
    ]
  },
  {
    title: 'App5 InfraTi',
    path: 'app5-infra-ti',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Flashcards',
        path: 'flashcards',
        loadComponent: () => import('../modules/app5-infra-ti/app5-infra-ti-flashcards/app5-infra-ti-flashcards').then(m => m.App5InfraTiFlashcards)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () => import('../modules/app5-infra-ti/app5-infra-ti-perguntas/app5-infra-ti-perguntas').then(m => m.App5InfraTiPerguntas)
      },
      {
        title: 'Conceitos',
        path: 'conceitos',
        loadComponent: () => import('../modules/app5-infra-ti/app5-infra-ti-conceitos/app5-infra-ti-conceitos').then(m => m.App5InfraTiConceitos)
      },
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () => import('../modules/app5-infra-ti/app5-infra-ti-bibliografia/app5-infra-ti-bibliografia').then(m => m.App5InfraTiBibliografia)
      },
    ]
  },
  {
    title: 'App6 EngDados',
    path: 'app6-eng-dados',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Flashcards',
        path: 'flashcards',
        loadComponent: () => import('../modules/app6-eng-dados/app6-eng-dados-flashcards/app6-eng-dados-flashcards').then(m => m.App6EngDadosFlashcards)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () => import('../modules/app6-eng-dados/app6-eng-dados-perguntas/app6-eng-dados-perguntas').then(m => m.App6EngDadosPerguntas)
      },
      {
        title: 'Conceitos',
        path: 'conceitos',
        loadComponent: () => import('../modules/app6-eng-dados/app6-eng-dados-conceitos/app6-eng-dados-conceitos').then(m => m.App6EngDadosConceitos)
      },
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () => import('../modules/app6-eng-dados/app6-eng-dados-bibliografia/app6-eng-dados-bibliografia').then(m => m.App6EngDadosBibliografia
        ),
        children: [
          {
            title: 'Bancos de Dados',
            path: 'bancos-de-dados',
            loadComponent: () => import('../modules/app6-eng-dados/app6-eng-dados-bibliografia/eng-banco-dados/eng-banco-dados').then(m => m.EngBancoDados)
          }, 
          {
            title: 'Arquitetura de Inteligência de Negócio',
            path: 'arquitetura-de-inteligencia-de-negocio',
            loadComponent: () => import('../modules/app6-eng-dados/app6-eng-dados-bibliografia/eng-arquitetura/eng-arquitetura').then(m => m.EngArquitetura)
          },
          {
            title: 'Conectores e Integração com Fontes de Dados',
            path: 'conectores-e-integracao-com-fontes-de-dados',
            loadComponent: () => import('../modules/app6-eng-dados/app6-eng-dados-bibliografia/eng-conectores/eng-conectores').then(m => m.EngConectores)
          },
          {
            title: 'Fluxo de Manipulação de Dados',
            path: 'fluxo-de-manipulacao-de-dados',
            loadComponent: () => import('../modules/app6-eng-dados/app6-eng-dados-bibliografia/eng-fluxos/eng-fluxos').then(m => m.EngFluxos)
          },
          {
            title: 'Governança e Qualidade de Dados',
            path: 'governanca-e-qualidade-de-dados',
            loadComponent: () => import('../modules/app6-eng-dados/app6-eng-dados-bibliografia/eng-governanca/eng-governanca').then(m => m.EngGovernanca)
          },
          {
            title: 'Integração com Nuvem',
            path: 'integracao-com-nuvem',
            loadComponent: () => import('../modules/app6-eng-dados/app6-eng-dados-bibliografia/eng-nuvem/eng-nuvem').then(m => m.EngNuvem)
          },
        ]
      },
    ]
  },
  {
    title: 'App7 EngSoftware',
    path: 'app7-eng-software',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Flashcards',
        path: 'flashcards',
        loadComponent: () => import('../modules/app7-eng-software/app7-eng-software-flashcards/app7-eng-software-flashcards').then(m => m.App7EngSoftwareFlashcards)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () => import('../modules/app7-eng-software/app7-eng-software-perguntas/app7-eng-software-perguntas').then(m => m.App7EngSoftwarePerguntas)
      },
      {
        title: 'Conceitos',
        path: 'conceitos',
        loadComponent: () => import('../modules/app7-eng-software/app7-eng-software-conceitos/app7-eng-software-conceitos').then(m => m.App7EngSoftwareConceitos)
      },
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () =>
          import('../modules/app7-eng-software/app7-eng-software-bibliografia/app7-eng-software-bibliografia').then(
            (m) => m.App7EngSoftwareBibliografia
          ),
        children: [
          {
            title: 'Manifesto Ágil',
            path: 'manifesto-agil',
            loadComponent: () =>
              import('../modules/app7-eng-software/app7-eng-software-bibliografia/manifesto-agil/manifesto-agil').then(
                (m) => m.ManifestoAgil
              )
          }
        ]
      },
    ]
  },
  {
    title: 'App8 SegInfo',
    path: 'app8-seg-info',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Flashcards',
        path: 'flashcards',
        loadComponent: () => import('../modules/app8-seg-info/app8-seg-info-flashcards/app8-seg-info-flashcards').then(m => m.App8SegInfoFlashcards)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () => import('../modules/app8-seg-info/app8-seg-info-perguntas/app8-seg-info-perguntas').then(m => m.App8SegInfoPerguntas)
      },
      {
        title: 'Conceitos',
        path: 'conceitos',
        loadComponent: () => import('../modules/app8-seg-info/app8-seg-info-conceitos/app8-seg-info-conceitos').then(m => m.App8SegInfoConceitos)
      },
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () => import('../modules/app8-seg-info/app8-seg-info-bibliografia/app8-seg-info-bibliografia').then(m => m.App8SegInfoBibliografia)
      },
    ]
  },
  {
    title: 'App9 CompNuvem',
    path: 'app9-comp-nuvem',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Flashcards',
        path: 'flashcards',
        loadComponent: () => import('../modules/app9-comp-nuvem/app9-comp-nuvem-flashcards/app9-comp-nuvem-flashcards').then(m => m.App9CompNuvemFlashcards)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () => import('../modules/app9-comp-nuvem/app9-comp-nuvem-perguntas/app9-comp-nuvem-perguntas').then(m => m.App9CompNuvemPerguntas)
      },
      {
        title: 'Conceitos',
        path: 'conceitos',
        loadComponent: () => import('../modules/app9-comp-nuvem/app9-comp-nuvem-conceitos/app9-comp-nuvem-conceitos').then(m => m.App9CompNuvemConceitos)
      },
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () => import('../modules/app9-comp-nuvem/app9-comp-nuvem-bibliografia/app9-comp-nuvem-bibliografia').then(m => m.App9CompNuvemBibliografia)
      },
    ]
  },
  {
    title: 'App10 IA',
    path: 'app10-IA',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Flashcards',
        path: 'flashcards',
        loadComponent: () => import('../modules/app10-IA/app10-ia-flashcards/app10-ia-flashcards').then(m => m.App10IAFlashcards)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () => import('../modules/app10-IA/app10-ia-perguntas/app10-ia-perguntas').then(m => m.App10IAPerguntas)
      },
      {
        title: 'Conceitos',
        path: 'conceitos',
        loadComponent: () => import('../modules/app10-IA/app10-ia-conceitos/app10-ia-conceitos').then(m => m.App10IAConceitos)
      },
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () => import('../modules/app10-IA/app10-ia-bibliografia/app10-ia-bibliografia').then(m => m.App10IABibliografia)
      },
    ]
  },
  {
    title: 'App11 ContratacaoTi',
    path: 'app11-contratacao-ti',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Flashcards',
        path: 'flashcards',
        loadComponent: () => import('../modules/app11-contratacao-ti/app11-contratacao-ti-flashcards/app11-contratacao-ti-flashcards').then(m => m.App11ContratacaoTiFlashcards)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () => import('../modules/app11-contratacao-ti/app11-contratacao-ti-perguntas/app11-contratacao-ti-perguntas').then(m => m.App11ContratacaoTiPerguntas)
      },
      {
        title: 'Conceitos',
        path: 'conceitos',
        loadComponent: () => import('../modules/app11-contratacao-ti/app11-contratacao-ti-conceitos/app11-contratacao-ti-conceitos').then(m => m.App11ContratacaoTiConceitos)
      },
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () => import('../modules/app11-contratacao-ti/app11-contratacao-ti-bibliografia/app11-contratacao-ti-bibliografia').then(m => m.App11ContratacaoTiBibliografia)
      },
    ]
  },
  {
    title: 'App12 GestaoTi',
    path: 'app12-gestao-ti',
    defaultChild: 'bibliografia',
    segments: [
      {
        title: 'Flashcards',
        path: 'flashcards',
        loadComponent: () => import('../modules/app12-gestao-ti/app12-gestao-ti-flashcards/app12-gestao-ti-flashcards').then(m => m.App12GestaoTiFlashcards)
      },
      {
        title: 'Perguntas',
        path: 'perguntas',
        loadComponent: () => import('../modules/app12-gestao-ti/app12-gestao-ti-perguntas/app12-gestao-ti-perguntas').then(m => m.App12GestaoTiPerguntas)
      },
      {
        title: 'Conceitos',
        path: 'conceitos',
        loadComponent: () => import('../modules/app12-gestao-ti/app12-gestao-ti-conceitos/app12-gestao-ti-conceitos').then(m => m.App12GestaoTiConceitos)
      },
      {
        title: 'Bibliografia',
        path: 'bibliografia',
        loadComponent: () => import('../modules/app12-gestao-ti/app12-gestao-ti-bibliografia/app12-gestao-ti-bibliografia').then(m => m.App12GestaoTiBibliografia)
      },
    ]
  },
];

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
      loadComponent: seg.loadComponent,
      ...(seg.children && seg.children.length > 0 ? {
        children: seg.children.map(child => ({
          path: child.path,
          loadComponent: child.loadComponent
        }))
      } : {})
    }))
  ]
}));

export const defaultHomeRedirect = `${MODULE_ROUTE_CONFIGS[0]?.path ?? ''}/${
  MODULE_ROUTE_CONFIGS[0]?.defaultChild ?? MODULE_ROUTE_CONFIGS[0]?.segments[0]?.path ?? ''
}`;
