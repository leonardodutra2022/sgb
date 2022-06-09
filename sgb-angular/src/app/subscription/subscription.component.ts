import { Component, OnInit } from '@angular/core';
import { Subscription } from '../model/subscription';
import { Recurso } from '../model/recurso';
import { SubscriptionService } from '../service/subscription.service';
import { SessaoService } from '../service/sessao.service';
import { RecursoService } from '../service/recurso.service';
import { Processos } from '../model/processos';
import { ProcessosService } from '../service/processos.service';
import { EntrevistaService } from '../service/entrevista.service';
import { Entrevista } from '../model/entrevista';
import { AlunoService } from '../service/aluno.service';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../model/usuario';
import { Aluno } from '../model/aluno';
import { MatDialog } from '@angular/material/dialog';
import { RecursosDetailModalComponent } from '../mensagens/recursos-detail-modal/recursos-detail-modal.component';
import { EntrevistaDetailModalComponent } from '../mensagens/entrevista-detail-modal/entrevista-detail-modal.component';
import { API_SGB } from '../config/API';
import { ComissaoModalComponent } from '../mensagens/comissao-modal/comissao.modal.component';
import { RecursoFormModalComponent } from '../recursos/recurso-form-modal/recurso-form-modal.component';
import { ProcessoEtapa } from '../model/processo.etapa';
import { ProcessoEtapaServiceService } from '../service/processo-etapa-service.service';
import { SubscriptionCustom } from '../model/subscription.custom';
import { RegistrosAssociados } from '../model/registros.associados';
import { InscricaoPendenciaService } from '../service/inscricao.pendencia.service.service';
import { InscricaoPendencia } from '../model/inscricao.pendencia';
import { FormPendenciaComponent } from '../cadastro/form-pendencia/form-pendencia.component';



@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  
})
export class SubscriptionComponent implements OnInit {

  // listaInscricoes : Subscription[] = [];
  listaInscricoes : SubscriptionCustom[] = [];
  listaRecursos: Recurso[] = [];
  processo : Processos = new Processos();
  entrevista : Entrevista = new Entrevista();
  usuario : Usuario = new Usuario();
  aluno : Aluno = new Aluno();
  listaRegistrosCustom : RegistrosAssociados[] =[];
  etapasProcesso : ProcessoEtapa[] = [];
  pendencias : InscricaoPendencia[] = [];
  isEtapaComissao : boolean = false;
  isResultadoFinal : boolean = false;
  isEtapaRecurso : boolean = false;
  linkReport = '';
  hasEntrevista = false;

  constructor(private subscriptionService : SubscriptionService, 
              private processoService : ProcessosService,
              private sessaoService: SessaoService, 
              private recursoService : RecursoService,
              private entrevistaService : EntrevistaService,
              private alunoService : AlunoService,
              private authService : AuthService,
              private dialog : MatDialog,
              private etapasProcessoService : ProcessoEtapaServiceService,
              private inscricaoPendencias : InscricaoPendenciaService) { }

  ngOnInit() {
    this.carregarUsuario();
    this.linkReport = API_SGB + "/relatorio"
  }

  carregarPendencias(id){
    this.inscricaoPendencias
      .getPendenciasByInscricao(id)
        .subscribe(
          dados => {
            this.pendencias = dados;
          }
        );
  }

  carregarUsuario(){
    this.usuario = this.sessaoService.getUsuarioLogado();
    this.alunoService.getAlunoByMatricula(this.usuario.siape)
      .subscribe(
        dados => {
          this.aluno = dados;
          this.carregarMinhasInscricoes();
          // this.carregarEtapas();
        }
      );
  }

  getResumeStatus(st) : string {
    switch(st){
      case "ANALISE_DOCUMENTAL":
        return "Análise Documental";
        break;
      case "RESULTADO_FINAL":
        return "Resultado Final (Após Recursos)";
        break;
      case "RESULTADO_PARCIAL":
        return "Resultado Parcial";
        break;
      case "INSCRICOES_ABERTAS":
        return "Inscrições Abertas";
        break;
      case "ANDAMENTO":
        return "Em Andamento";
        break;
      case "SUSPENSO":
        return "Processo Suspenso";
        break;
      case "RECURSO":
        return "Etapa de Recursos";
        break;
      case "CONCLUIDO":
        return "Processo Concluído";
        break;
      case "VISITA":
        return "Etapa de Visitas";
        break;
      case "RECURSO_PARECER":
        return "Resultado dos Recursos Interpostos";
        break;
      case "ENTREVISTA":
        return "Etapa de Entrevistas";
    }
  }

  carregarMinhasInscricoes(){
    this.subscriptionService.getInscricoesByAluno(this.aluno.id)
      .subscribe(
        listaTemp => 
          {
            let listaInscricoesCustomTemp : SubscriptionCustom[] = [];

            for(let i of listaTemp){
              let inscricaoNova : SubscriptionCustom = new SubscriptionCustom();
              inscricaoNova.codAluno = i.aluno.id;
              inscricaoNova.codInscricao = i.id;
              inscricaoNova.codProcesso = i.processo.id;
              inscricaoNova.processo = i.processo;
              inscricaoNova.dataHoraInscricao = i.dataHoraInscricao;
              inscricaoNova.statusInscricao = i.situacao;
              inscricaoNova.statusInscricaoFinal = i.situacaoFinal;
              inscricaoNova.anoProcesso = i.processo.ano;
              inscricaoNova.statusProcesso = i.processo.statusProcesso;
              inscricaoNova.analiseComissao = i.analiseComissao;

              inscricaoNova.statusProcessoResume = this.getResumeStatus(i.processo.statusProcesso);
              
              this.recursoService.getRecursosByInscricao(i.id)
              .subscribe(
                recursos => {
                  inscricaoNova.recursosInscricao = recursos;
                }
              );

              this.entrevistaService.getEntrevistaByInscricao(i.id)
                .subscribe(
                  entrevista => 
                    {
                      inscricaoNova.entrevista = entrevista;
                      if (entrevista != null){
                        this.hasEntrevista = true
                      } 
                    }
                );

              this.inscricaoPendencias
                .getPendenciasByInscricao(i.id)
                  .subscribe(
                    dados => {
                      if(dados != []){
                        for(let p of dados){
                          if(p.pendencia == 'INSCRICAO_DOCUMENTACAO'){
                            inscricaoNova.pendenciaDoc = true;
                            inscricaoNova.pendenciaDocObs = p.observacao;
                          }

                          if(p.pendencia != 'INSCRICAO_DOCUMENTACAO'){
                            inscricaoNova.pendenciaDados = true;
                            inscricaoNova.formDados = p.pendencia;
                            inscricaoNova.pendenciaDadosObs = p.observacao;
                          }
                        }
                      }
                    }
                  );
              
              listaInscricoesCustomTemp.push(inscricaoNova);
            }
            this.listaInscricoes = listaInscricoesCustomTemp;
          }
      );
  }

  testes(){
  }

  openDetail(recurso){
    const dialogRef = this.dialog.open(RecursosDetailModalComponent, 
        {
          data: {
            recurso: recurso
          }
        });
    dialogRef.afterClosed().subscribe(
      result => {
    });
  }

  openEntrevista(entrevista){
    const dialogRef = this.dialog.open(EntrevistaDetailModalComponent, 
        {
          data: {
            entrevista: entrevista
          }
        });
      dialogRef.afterClosed().subscribe(
        result => {
      });
  }


  openAnaliseComissao(inscricao : Subscription){
    const dialogRef = this.dialog.open(ComissaoModalComponent, 
      {
        data: {
          inscricao: inscricao
        }
      });
    dialogRef.afterClosed().subscribe(
      result => {
    });
  }

  openPDF(idInscricao, idProcesso){
    let link = API_SGB + "/relatorio/inscricao?inscricao=" + idInscricao 
        + "&processo=" + idProcesso;
    let l = document.createElement("a");
    l.href = link;
    l.target = "_blank";
    l.click();
  }

  openRecurso(inscricao, pendenciaDoc){
    let pendencia : boolean = false;
    pendencia = pendenciaDoc;

    const dialogRef = this.dialog.open(RecursoFormModalComponent,
      {
        data: {
          inscricao: inscricao,
          pendenciaDoc: pendencia
        },
        disableClose: true
      });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result)
          this.carregarMinhasInscricoes();
    });
  }

  openFormPendente(inscricao){
    const dialogRef = this.dialog.open(FormPendenciaComponent,
      {
        data: {
          inscricao: inscricao
        },
        // disableClose: true
      });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){

        }
          // this.carregarMinhasInscricoes();
    });
  }

  carregarEtapas(id){
    this.etapasProcessoService
      .getEtapasByProcesso(id)
        .subscribe(
          lista => {
            this.etapasProcesso = lista;
          }
        );
  }

  checkEtapaAnaliseComissao(id){
    // this.carregarEtapas(id);
  }

  checkResultadoFinal(processo) : boolean{
    let check : boolean = false;
      if(processo.statusProcesso == 'RESULTADO_FINAL'){
        check = true;
      }
    return check;
  }

  getViewAnalise(processo) : boolean{
      if(typeof processo != 'undefined' || processo != null || processo != 'undefined'){
        if(processo.statusProcesso == 'ANALISE_DOCUMENTAL'){
          this.isEtapaComissao = true;
        }else{
          this.isEtapaComissao = false;
        }
      }
      return this.isEtapaComissao;
  }

  getViewResultadoFinal(processo) : boolean{
      if(processo.statusProcesso == 'RESULTADO_FINAL' || processo.statusProcesso == 'CONCLUIDO'){
        this.isResultadoFinal = true;
      }else{
        this.isResultadoFinal = false;
      }
    return this.isResultadoFinal;
  }

  getViewRecurso(processo) : boolean{
      if(processo.statusProcesso == 'RECURSO' && !this.isEtapaComissao){
        this.isEtapaRecurso = true;
      }else{
        this.isEtapaRecurso = false;
      }
     return this.isEtapaRecurso;
  }

  getProcesso(id){
    this.processoService
      .getProcessosById(id)
        .subscribe(
          dados => {
            this.processo = dados;
          }
        );
  }
}


