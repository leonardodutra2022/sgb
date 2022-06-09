import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, Component} from '@angular/core';

import { AppRoutingModule } from './app.routing.module';

import { MatBadgeModule } from '@angular/material/badge';

import { MatDialogModule } from '@angular/material/dialog';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';


import {   MatAutocompleteModule } from '@angular/material/autocomplete';
import {   MatButtonModule } from '@angular/material/button';
import {   MatButtonToggleModule } from '@angular/material/button-toggle';
import {   MatCardModule } from '@angular/material/card';
import {   MatCheckboxModule } from '@angular/material/checkbox';
import {   MatChipsModule } from '@angular/material/chips';
import {   MatDatepickerModule } from '@angular/material/datepicker';
import {   MatDividerModule } from '@angular/material/divider';
import {   MatExpansionModule } from '@angular/material/expansion';
import {   MatGridListModule } from '@angular/material/grid-list';
import {   MatIconModule } from '@angular/material/icon';
import {   MatInputModule } from '@angular/material/input';
import {   MatListModule } from '@angular/material/list';
import {   MatMenuModule } from '@angular/material/menu';
import {   MatNativeDateModule, } from '@angular/material/core';
import {   MatPaginatorModule } from '@angular/material/paginator';
import {   MatProgressBarModule } from '@angular/material/progress-bar';
import {   MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {   MatRadioModule } from '@angular/material/radio';
import {   MatRippleModule } from '@angular/material/core';
import {   MatSelectModule } from '@angular/material/select';
import {   MatSidenavModule } from '@angular/material/sidenav';
import {   MatSliderModule } from '@angular/material/slider';
import {   MatSlideToggleModule } from '@angular/material/slide-toggle';
import {   MatSnackBarModule } from '@angular/material/snack-bar';
import {   MatSortModule } from '@angular/material/sort';
import {   MatStepperModule, } from '@angular/material/stepper';
import {   MatTableModule } from '@angular/material/table';
import {   MatTabsModule } from '@angular/material/tabs';
import {   MatToolbarModule } from '@angular/material/toolbar';
import {   MatTooltipModule } from '@angular/material/tooltip';
import {   MatTreeModule } from '@angular/material/tree';
import {   MatFormFieldModule } from '@angular/material/form-field';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

import { FormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UserModule } from './user/user.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { DocumentacaoComponent } from './documentacao/documentacao.component';
import { DocumentacaoFormComponent } from './documentacao/documentacao-form/documentacao.form.component';
import { DocumentacaoDetailComponent } from './documentacao/documentacao-detail/documentacao.detail.component';
import { BeneficioComponent } from './beneficio/beneficio.component';
import { BeneficioFormComponent } from './beneficio/beneficio-form/beneficio.form.component';
import { BeneficioDetailComponent } from './beneficio/beneficio-detail/beneficio.detail.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AlunoFormComponent } from './aluno/aluno-form/aluno.form.component';
import { PeriodoDirective } from './directives/periodo.directive';
import { ProcessosPublicosComponent } from './processos/processos-publicos/processos.publicos.component';
import { HttpClientModule } from '@angular/common/http';
import { CpfDirective } from './directives/cpf.directive';
import { LoginCadastroComponent } from './cadastro/login-cadastro/login.cadastro.component';
import { InfoModalComponent } from './cadastro/info-modal/info-modal.component';
import { SucessoModalComponent } from './cadastro/sucesso-modal/sucesso-modal.component';
import { UpdateModalComponent } from './cadastro/update-modal/update-modal.component';
import { ManutencaoComponent } from './manutencao/manutencao.component';
import { InformeUploadComponent } from './mensagens/informe-upload/informe-upload.component';
import { InformeInscricaoComponent } from './mensagens/informe-inscricao/informe-inscricao.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LogradourosComponent } from './cadastro/logradouros/logradouros.component';
import { LogradourosTiposComponent } from './cadastro/logradouros-tipos/logradouros-tipos.component';
import { CidadesUfComponent } from './cadastro/cidades-uf/cidades-uf.component';
import { OrgaosExpedidoresComponent } from './cadastro/orgaos-expedidores/orgaos-expedidores.component';
import { BancosComponent } from './cadastro/bancos/bancos.component';
import { CadastroInfoComponent } from './cadastro/cadastro-info/cadastro-info.component';
import { ConcessaoComponent } from './concessao/concessao.component';
import { ConcessaoFormComponent } from './concessao/concessao-form/concessao-form.component';
import { SubscriptionDetailComponent } from './subscription/subscription-detail/subscription.detail.component';
import { SubscriptionStepVerticalComponent } from './subscription/subscription-step-vertical/subscription.step.vertical.component';
import { SubscriptionStepHorizontalComponent } from './subscription/subscription-step-horizontal/subscription-step-horizontal.component';
import { SubscriptionDadosPessoaisFormComponent } from './subscription/subscription-dados-pessoais-form/subscription.dados.pessoais.form.component';
import { SubscriptionContatosEnderecosFormComponent } from './subscription/subscription-contatos-enderecos-form/subscription.contatos.enderecos.form.component';
import { SubscriptionSocioEconomicoFormComponent } from './subscription/subscription-socio-economico-form/subscription.socio.economico.form.component';
import { ProcessosComponent } from './processos/processos.component';
import { ProcessosDetailComponent } from './processos/processos.detail/processos.detail.component';
import { ProcessosFormComponent } from './processos/processos-form/processos.form.component';
import { ProcessosMainComponent } from './processos/processos-main/processos.main.component';
import { SubscriptionInfoFinanceiraFormComponent } from './subscription/subscription-info-financeira-form/subscription.info.financeira.form.component';
import { SubscriptionSaudeDeficienciaFormComponent } from './subscription/subscription-saude-deficiencia-form/subscription.saude.deficiencia.form.component';
import { SubscriptionMoradiaTransporteFormComponent } from './subscription/subscription-moradia-transporte-form/subscription.moradia.transporte.form.component';
import { SubscriptionOutrosAuxiliosFormComponent } from './subscription/subscription-outros-auxilios-form/subscription.outros.auxilios.form.component';
import { SubscriptionInfoAcadFormComponent } from './subscription/subscription-info-acad-form/subscription.info.acad.form.component';
import { SubscriptionDocumentacaoComponent } from './subscription/subscription-documentacao/subscription.documentacao.component';
import { SubscriptionComissaoComponent } from './subscription/subscription-comissao/subscription-comissao.component';
import { SubscriptionSubmitedComponent } from './subscription/subscription-submited/subscription-submited.component';
import { ProcessosAdminComponent } from './processos/processos-admin/processos.admin.component';
import { CelPhoneDirective } from './directives/celphone.directive';
import { PhoneDirective } from './directives/phone.directive';
import { PeriodoAcadDirective } from './directives/periodo-acad.directive';
import { CpfAcadDirective } from './directives/cpf-acad.directive';
import { CepDirective } from './directives/cep.directive';
import { RecursosDetailModalComponent } from './mensagens/recursos-detail-modal/recursos-detail-modal.component';
import { EntrevistaDetailModalComponent } from './mensagens/entrevista-detail-modal/entrevista-detail-modal.component';
import { ComissaoModalComponent } from './mensagens/comissao-modal/comissao.modal.component';
import { RecursoFormModalComponent } from './recursos/recurso-form-modal/recurso-form-modal.component';
import { UploadSucessModalComponent } from './cadastro/upload-sucess-modal/upload-sucess-modal.component';
import { ParecerModalComponent } from './cadastro/parecer-modal/parecer-modal.component';
import { FormPendenciaComponent } from './cadastro/form-pendencia/form-pendencia.component';
import { ParecerRecursoComponent } from './recursos/parecer-recurso/parecer-recurso.component';
import { ConcessaoExclusaoComponent } from './mensagens/concessao-exclusao/concessao-exclusao.component';
import { SubscriptionValidationComponent } from './subscription/subscription-validation/subscription-validation.component';
import { SubscriptionSubmitComponent } from './subscription/subscription-submit/subscription.submit.component';
import { ExportFileComponent } from './export-file/export-file.component';
import { DetailModalComponent } from './concessao/detail-modal/detail-modal.component';
import { LoginRecoverComponent } from './cadastro/login-recover/login-recover.component';
import { UpdateMatriculaModalComponent } from './cadastro/update-matricula-modal/update-matricula-modal.component';
import { UpdateCpfModalComponent } from './cadastro/update-cpf-modal/update.cpf.modal.component';
import { FrequenciaAdminComponent } from './frequencia/admin/frequencia-admin/frequencia-admin.component';
import { AlunoProjetoModalComponent } from './frequencia/aluno/aluno-projeto-modal/aluno.projeto.modal.component';
import { FrequenciaFormComponent } from './frequencia/admin/frequencia-form/frequencia-form.component';
import { ProjetoFormModalComponent } from './frequencia/admin/projeto-form-modal/projeto-form-modal.component';
import { PeriodoFormModalComponent } from './frequencia/admin/periodo-form-modal/periodo-form-modal.component';
import { ResponsavelFormModalComponent } from './frequencia/responsavel/responsavel-form-modal/responsavel-form-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { FrequenciaAlunoAdminComponent } from './frequencia/aluno/frequencia-aluno-admin/frequencia-aluno-admin.component';
import { FrequenciaAlunoRegistroComponent } from './frequencia/aluno/frequencia-aluno-registro/frequencia-aluno-registro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FrequenciaAssinaturaComponent } from './frequencia/admin/frequencia-assinatura/frequencia-assinatura.component';
import { AcompanhamentoDocenteComponent } from './frequencia/responsavel/acompanhamento-docente/acompanhamento-docente.component';
import { PdfComponent } from './frequencia/pdf/pdf.component';
import { AlunoFormModalComponent } from './frequencia/aluno/aluno-form-modal/aluno-form-modal.component';
import { RubricaCropperComponent } from './frequencia/rubrica-cropper/rubrica-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { InformeRubricaComponent } from './mensagens/informe-rubrica/informe-rubrica.component';
import { PdfValidarComponent } from './frequencia/pdf-validar/pdf-validar.component';
import { FrequenciasProjetoModalComponent } from './frequencia/admin/frequencias-projeto-modal/frequencias-projeto-modal.component';
import { CustomDatePipe } from './pipes/custom.date.picker';
import { LocalTimePipe } from './pipes/local-time.pipe';
import { SistemaComponent } from './sistema/sistema.component';
import { VersaoDesatualizadaComponent } from './mensagens/versao-desatualizada/versao-desatualizada.component';
import { LogComponent } from './sistema/log/log.component';
import { AlunoViewComponent } from './frequencia/aluno/aluno-view/aluno-view.component';
import { ResponsavelViewComponent } from './frequencia/responsavel/responsavel-view/responsavel-view.component';
import { RubricaInfoComponent } from './frequencia/rubrica-info/rubrica-info.component';


registerLocaleData(ptBr)

@NgModule({
  declarations: [
        AppComponent,
        DashboardComponent,
        ToolbarComponent,
        HomeComponent,
        FooterComponent,
        NotFoundComponent,
        UnauthorizedComponent,
        DocumentacaoComponent,
        DocumentacaoFormComponent,
        DocumentacaoDetailComponent,
        BeneficioComponent,
        BeneficioFormComponent,
        BeneficioDetailComponent,
        AlunoComponent,
        AlunoFormComponent,
        PeriodoDirective,
        CpfDirective,
        LoginCadastroComponent,
        InfoModalComponent,
        SucessoModalComponent,
        UpdateModalComponent,
        ManutencaoComponent,
        InformeUploadComponent,
        InformeInscricaoComponent,
        CadastroComponent,
        LogradourosComponent,
        LogradourosTiposComponent,
        CidadesUfComponent,
        OrgaosExpedidoresComponent,
        BancosComponent,
        CadastroInfoComponent,
        ConcessaoComponent,
        ConcessaoFormComponent,
        
        ProcessosPublicosComponent,
        ProcessosComponent,
        ProcessosDetailComponent,
        ProcessosFormComponent,
        ProcessosMainComponent,
        
        SubscriptionComponent,
        SubscriptionStepVerticalComponent,
        SubscriptionStepHorizontalComponent,
        SubscriptionDadosPessoaisFormComponent,
        SubscriptionContatosEnderecosFormComponent,
        SubscriptionSocioEconomicoFormComponent,
        SubscriptionInfoFinanceiraFormComponent,
        SubscriptionSaudeDeficienciaFormComponent,
        SubscriptionMoradiaTransporteFormComponent,
        SubscriptionOutrosAuxiliosFormComponent,
        SubscriptionInfoAcadFormComponent,
        SubscriptionDocumentacaoComponent,
        SubscriptionComissaoComponent,
        SubscriptionSubmitedComponent,
        SubscriptionDetailComponent,
        SubscriptionValidationComponent,
        SubscriptionSubmitComponent,

        ProcessosAdminComponent,
        CelPhoneDirective,
        PhoneDirective,
        PeriodoAcadDirective,
        CpfAcadDirective,
        CepDirective,
        RecursosDetailModalComponent,
        EntrevistaDetailModalComponent,
        ComissaoModalComponent,
        RecursoFormModalComponent,
        UploadSucessModalComponent,
        ParecerModalComponent,
        FormPendenciaComponent,
        ParecerRecursoComponent,
        ConcessaoExclusaoComponent,
        ExportFileComponent,
        DetailModalComponent,
        LoginRecoverComponent,
        UpdateMatriculaModalComponent,
        UpdateCpfModalComponent,

        FrequenciaAdminComponent,
        AlunoProjetoModalComponent,
        FrequenciaFormComponent,
        ProjetoFormModalComponent,
        PeriodoFormModalComponent,
        ResponsavelFormModalComponent,
        FrequenciaAlunoAdminComponent,
        FrequenciaAlunoRegistroComponent,
        FrequenciaAssinaturaComponent,
        AcompanhamentoDocenteComponent,
        PdfComponent,
        AlunoFormModalComponent,
        RubricaCropperComponent,
        FrequenciasProjetoModalComponent,
        SistemaComponent,
        LogComponent,
        AlunoViewComponent,
        ResponsavelViewComponent,
        RubricaInfoComponent,

        CustomDatePipe,
        LocalTimePipe
  ],
  entryComponents: [
        InfoModalComponent,
        SucessoModalComponent,
        UpdateModalComponent,
        InformeUploadComponent,
        InformeInscricaoComponent,

        RecursosDetailModalComponent,
        EntrevistaDetailModalComponent,
        ComissaoModalComponent,
        RecursoFormModalComponent,
        UploadSucessModalComponent,
        ParecerModalComponent,
        FormPendenciaComponent,
        ParecerRecursoComponent,
        ConcessaoExclusaoComponent,
        SubscriptionValidationComponent,
        ExportFileComponent,
        DetailModalComponent,
        LoginRecoverComponent,
        UpdateMatriculaModalComponent,
        UpdateCpfModalComponent,
        AlunoProjetoModalComponent,
        ProjetoFormModalComponent,
        PeriodoFormModalComponent,
        ResponsavelFormModalComponent,
        InformeRubricaComponent,
        PdfValidarComponent,
        FrequenciasProjetoModalComponent,
        VersaoDesatualizadaComponent
  ],
  exports: [
  ],

  imports: [
        UserModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        MatFormFieldModule,
        FormsModule,
        HttpClientModule,
        MatInputModule,
        
        MatExpansionModule,
        MatIconModule,
        MatDatepickerModule,
        
        MatButtonModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatDialogModule,
        MatTabsModule,

        FormsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule, 

        MatNativeDateModule,
        MatRippleModule,
        FlexLayoutModule,
        FontAwesomeModule,
        ImageCropperModule,

        ToastrModule.forRoot()
      ],
  providers: [
    {
      provide:LOCALE_ID, useValue: 'pt'
    },
    AuthService, 
    AuthGuard, 
    LocalTimePipe,
  ],
  bootstrap: [AppComponent]

})
export class AppModule { } 
