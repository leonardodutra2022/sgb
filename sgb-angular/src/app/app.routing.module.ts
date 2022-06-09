import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router/';
import { SubscriptionComponent } from './subscription/subscription.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { ProcessosComponent } from './processos/processos.component';
import { DocumentacaoComponent } from './documentacao/documentacao.component';
import { DocumentacaoFormComponent } from './documentacao/documentacao-form/documentacao.form.component';
import { DocumentacaoDetailComponent } from './documentacao/documentacao-detail/documentacao.detail.component';
import { BeneficioComponent } from './beneficio/beneficio.component';
import { BeneficioFormComponent } from './beneficio/beneficio-form/beneficio.form.component';
import { BeneficioDetailComponent } from './beneficio/beneficio-detail/beneficio.detail.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AlunoFormComponent } from './aluno/aluno-form/aluno.form.component';
import { LoginCadastroComponent } from './cadastro/login-cadastro/login.cadastro.component';
import { ManutencaoComponent } from './manutencao/manutencao.component';
import { ExportFileComponent } from './export-file/export-file.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LogradourosComponent } from './cadastro/logradouros/logradouros.component';
import { LogradourosTiposComponent } from './cadastro/logradouros-tipos/logradouros-tipos.component';
import { CidadesUfComponent } from './cadastro/cidades-uf/cidades-uf.component';
import { OrgaosExpedidoresComponent } from './cadastro/orgaos-expedidores/orgaos-expedidores.component';
import { BancosComponent } from './cadastro/bancos/bancos.component';
import { CadastroInfoComponent } from './cadastro/cadastro-info/cadastro-info.component';
import { ConcessaoComponent } from './concessao/concessao.component';
import { ConcessaoFormComponent } from './concessao/concessao-form/concessao-form.component';
import { SubscriptionStepVerticalComponent } from './subscription/subscription-step-vertical/subscription.step.vertical.component';
import { SubscriptionDetailComponent } from './subscription/subscription-detail/subscription.detail.component';
import { SubscriptionStepHorizontalComponent } from './subscription/subscription-step-horizontal/subscription-step-horizontal.component';
import { SubscriptionDadosPessoaisFormComponent } from './subscription/subscription-dados-pessoais-form/subscription.dados.pessoais.form.component';
import { SubscriptionContatosEnderecosFormComponent } from './subscription/subscription-contatos-enderecos-form/subscription.contatos.enderecos.form.component';
import { SubscriptionSocioEconomicoFormComponent } from './subscription/subscription-socio-economico-form/subscription.socio.economico.form.component';
import { SubscriptionInfoFinanceiraFormComponent } from './subscription/subscription-info-financeira-form/subscription.info.financeira.form.component';
import { SubscriptionSaudeDeficienciaFormComponent } from './subscription/subscription-saude-deficiencia-form/subscription.saude.deficiencia.form.component';
import { SubscriptionMoradiaTransporteFormComponent } from './subscription/subscription-moradia-transporte-form/subscription.moradia.transporte.form.component';
import { SubscriptionOutrosAuxiliosFormComponent } from './subscription/subscription-outros-auxilios-form/subscription.outros.auxilios.form.component';
import { SubscriptionInfoAcadFormComponent } from './subscription/subscription-info-acad-form/subscription.info.acad.form.component';
import { SubscriptionDocumentacaoComponent } from './subscription/subscription-documentacao/subscription.documentacao.component';
import { SubscriptionComissaoComponent } from './subscription/subscription-comissao/subscription-comissao.component';
import { SubscriptionSubmitComponent } from './subscription/subscription-submit/subscription.submit.component';
import { ProcessosMainComponent } from './processos/processos-main/processos.main.component';
import { ProcessosAdminComponent } from './processos/processos-admin/processos.admin.component';
import { ProcessosFormComponent } from './processos/processos-form/processos.form.component';
import { ProcessosDetailComponent } from './processos/processos.detail/processos.detail.component';
import { SubscriptionSubmitedComponent } from './subscription/subscription-submited/subscription-submited.component';

import { FrequenciaFormComponent } from './frequencia/admin/frequencia-form/frequencia-form.component';
import { FrequenciaAdminComponent } from './frequencia/admin/frequencia-admin/frequencia-admin.component';
import { AlunoProjetoModalComponent } from './frequencia/aluno/aluno-projeto-modal/aluno.projeto.modal.component';
import { PeriodoFormModalComponent } from './frequencia/admin/periodo-form-modal/periodo-form-modal.component';
import { ProjetoFormModalComponent } from './frequencia/admin/projeto-form-modal/projeto-form-modal.component';
import { ResponsavelFormModalComponent } from './frequencia/responsavel/responsavel-form-modal/responsavel-form-modal.component';
import { FrequenciaAlunoAdminComponent } from './frequencia/aluno/frequencia-aluno-admin/frequencia-aluno-admin.component';
import { FrequenciaAlunoRegistroComponent } from './frequencia/aluno/frequencia-aluno-registro/frequencia-aluno-registro.component';
import { FrequenciaAssinaturaComponent } from './frequencia/admin/frequencia-assinatura/frequencia-assinatura.component';
import { AcompanhamentoDocenteComponent } from './frequencia/responsavel/acompanhamento-docente/acompanhamento-docente.component';
import { PdfComponent } from './frequencia/pdf/pdf.component';
import { AlunoFormModalComponent } from './frequencia/aluno/aluno-form-modal/aluno-form-modal.component';
import { RubricaCropperComponent } from './frequencia/rubrica-cropper/rubrica-cropper.component';
import { InformeRubricaComponent } from './mensagens/informe-rubrica/informe-rubrica.component';
import { PdfValidarComponent } from './frequencia/pdf-validar/pdf-validar.component';
import { FrequenciasProjetoModalComponent } from './frequencia/admin/frequencias-projeto-modal/frequencias-projeto-modal.component';
import { SistemaComponent } from './sistema/sistema.component';
import { LogComponent } from './sistema/log/log.component';
import { AlunoViewComponent } from './frequencia/aluno/aluno-view/aluno-view.component';
import { ResponsavelViewComponent } from './frequencia/responsavel/responsavel-view/responsavel-view.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'novo-acesso',
    component: LoginCadastroComponent
  },
  {
    path: 'sistema',
    component: SistemaComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "sistema/log",
        component: LogComponent
      }
    ]
  },
  {
    path: 'dashboard', 
    component: DashboardComponent,
    data: {
      title: "SGB/UFC"
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'manutencao',
    component: ManutencaoComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'concessao',
    component: ConcessaoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'concessao/add',
    component: ConcessaoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'concessao/:id/edit',
    component: ConcessaoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'documentacao',
    component: DocumentacaoComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ExportFileComponent,
        data: {
          value: "DOCUMENTACOES"
        }
      }
    ]
  },
  {
    path: 'documentacao/add',
    component: DocumentacaoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'documentacao/:id/edit',
    component: DocumentacaoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'documentacao/:id',
    component: DocumentacaoDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro/auxilio',
    component: BeneficioComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ExportFileComponent,
        data: {
          value: "BENEFICIOS"
        }
      }
    ]
  },
  {
    path: 'cadastro/auxilio/add',
    component: BeneficioFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro/auxilio/:id/edit',
    component: BeneficioFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro/auxilio/:id',
    component: BeneficioDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastros-basicos',
    component: CadastroComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CadastroInfoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'logradouros',
        component: LogradourosComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'logradouros-tipos',
        component: LogradourosTiposComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cidades-uf',
        component: CidadesUfComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'orgaos-expedidores',
        component: OrgaosExpedidoresComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'bancos',
        component: BancosComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'cadastro/aluno',
    component: AlunoComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ExportFileComponent,
        data: {
          value: 'ALUNOS'
        }
      }
    ]
  },
  {
    path: 'cadastro/aluno/add',
    component: AlunoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro/aluno/:id/edit',
    component: AlunoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inscricoes/add',
    component: SubscriptionStepVerticalComponent,
    canActivate: [AuthGuard]
  },
  {
      path: 'inscricoes',
      component: SubscriptionComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'inscricoes/:id/edit',
      component: SubscriptionStepVerticalComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'inscricoes/:id',
      component: SubscriptionDetailComponent,
      canActivate: [AuthGuard]
  },
  {
    path: 'processos/:id/inscricao',
    component: SubscriptionStepVerticalComponent,
    children: [
    {
        path: '',
        component: SubscriptionStepHorizontalComponent,
        children: 
        [
            {
                path: 'dados-pessoais',
                component: SubscriptionDadosPessoaisFormComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'contatos-enderecos',
                component: SubscriptionContatosEnderecosFormComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'socioeconomico',
                component: SubscriptionSocioEconomicoFormComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'info-financeira',
                component: SubscriptionInfoFinanceiraFormComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'info-saude',
                component: SubscriptionSaudeDeficienciaFormComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'moradia-transporte',
                component: SubscriptionMoradiaTransporteFormComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'outros-auxilios',
                component: SubscriptionOutrosAuxiliosFormComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'info-acad',
        component: SubscriptionInfoAcadFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'upload-docs',
        component: SubscriptionDocumentacaoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'comissao',
        component: SubscriptionComissaoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'submit',
        component: SubscriptionSubmitComponent,
        canActivate: [AuthGuard]
    }]
    // canActivate: [AuthGuard]
    
},
{        
    path: 'processos',
    component: ProcessosMainComponent,
    canActivate: [AuthGuard],
    children: 
        [{
            path: '',
            component: ProcessosComponent,
            canActivate: [AuthGuard],  
        },
        {
            path: ':id/inscricoes',
            component: SubscriptionComponent,
            canActivate: [AuthGuard]
        }]
},
{
    path: 'inscricoes',
    component: SubscriptionComponent,
    canActivate: [AuthGuard]
},
{
    path: 'inscricao/:id',
    component: SubscriptionDetailComponent,
    canActivate: [AuthGuard]
},
{ 
    path: 'processos/financas/:id', 
    component: SubscriptionInfoFinanceiraFormComponent, 
    outlet: 'modal_pendencias' 
},        
{ 
    path: 'processos/saude/:id', 
    component: SubscriptionSaudeDeficienciaFormComponent, 
    outlet: 'modal_pendencias' 
},
{ 
    path: 'processos/socioecon/:id', 
    component: SubscriptionSocioEconomicoFormComponent, 
    outlet: 'modal_pendencias' 
},
{ 
    path: 'processos/dados-pessoais/:id', 
    component: SubscriptionDadosPessoaisFormComponent, 
    outlet: 'modal_pendencias' 
},
{ 
    path: 'processos/logradouro-contato/:id', 
    component: SubscriptionContatosEnderecosFormComponent, 
    outlet: 'modal_pendencias' 
},        
{
    path: 'processos/admin',
    component: ProcessosAdminComponent,
    canActivate: [AuthGuard],
    children: [
        {
            path: '',
            component: ExportFileComponent,
            data: {
                value: "PROCESSOS"
            }
        },
    ]
},
{
    path: 'processos/admin/add',
    component: ProcessosFormComponent,
    canActivate: [AuthGuard]
},
{
    path: 'processos/admin/:id/edit',
    component: ProcessosFormComponent,
    canActivate: [AuthGuard]
},
{
    path: 'processos/admin/:id',
    component: ProcessosDetailComponent,
    canActivate: [AuthGuard]
},
{
    path: 'processos/:id/inscricoes-recebidas',
    component: SubscriptionSubmitedComponent,
    canActivate: [AuthGuard]
},
{
  path: 'frequencia/admin',
  component: FrequenciaAdminComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: FrequenciasProjetoModalComponent,
      data: {
          value: "FREQUENCIASPROJETO"
      }
    },    
    {
        path: '',
        component: AlunoProjetoModalComponent,
        data: {
            value: "LIST"
        }
    },
    {
      path: '',
      component: PeriodoFormModalComponent,
      data: {
          value: "PERIODO"
      }
    },
    {
      path: '',
      component: AlunoFormModalComponent,
      data: {
        value: 'ALUNO'
      }
    },
    {
      path: '',
      component: ProjetoFormModalComponent,
      data: {
          value: "PROJETO"
      }
    },
    {
      path: '',
      component: ResponsavelFormModalComponent,
      data: {
          value: "RESPONSAVEL"
      }
    },
    {
      path: '',
      component: AcompanhamentoDocenteComponent,
      data: {
        value: "ACOMPANHAMENTO"
      },
      children: [
        {
          path: '',
          component: FrequenciaAssinaturaComponent,
          data: {
            value: 'ASSINATURA'
          }
        }
      ]
    }
  ]
},
{
  path: 'frequencia/admin/projeto/add',
  component: FrequenciaFormComponent,
  canActivate: [AuthGuard]
},
{
  path: 'frequencia/rubrica',
  component: RubricaCropperComponent,
  canActivate: [AuthGuard]
},
{
  path: 'frequencia/pdf/:id',
  component: PdfComponent
},
{
  path: 'frequencia/pdf/validar/:uuid',
  component: PdfValidarComponent
},
{
  path: 'frequencia/admin/projeto/:id/edit',
  component: FrequenciaFormComponent,
  canActivate: [AuthGuard]
},
{
  path: 'frequencia/admin/:value',
  component: FrequenciaAdminComponent,
  canActivate: [AuthGuard]
},
{
  path: 'frequencia/responsavel/',
  component: ResponsavelViewComponent,
  canActivate: [AuthGuard]
},
{
  path: 'frequencia/aluno',
  component: FrequenciaAlunoAdminComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: FrequenciaAlunoRegistroComponent,
      data: {
          value: "REGISTRO_FREQUENCIA"
      },
      children: [
        {
          path: '',
          component: FrequenciaAssinaturaComponent,
          data: {
              value: "ASS_REGISTRO_FREQUENCIA"
          },
        },
        {
          path: "view",
          component: AlunoViewComponent
        }
        // {
        //   path: 'pdf',
        //   component: PdfComponent
        // }
      ]
    },
  ]
 },
 {
   path: 'informe-rubrica',
   component: InformeRubricaComponent,
   canActivate: [AuthGuard]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    {
      useHash: true,
      initialNavigation: 'enabled',
      paramsInheritanceStrategy: 'always'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  constructor(private router : Router){
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['not-found'])
    }
  }

}
