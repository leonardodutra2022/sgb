import { Component, OnInit } from '@angular/core';
import { ProcessosService } from '../service/processos.service';
import { DocumentacaoArquivosService } from '../service/documentacao.arquivos.service';
import { API_SGB } from '../config/API';
import { Beneficio } from '../model/beneficio';
import { SessaoService } from '../service/sessao.service';
import { SubscriptionService } from '../service/subscription.service';
import { Usuario } from '../model/usuario';
import { AlunoService } from '../service/aluno.service';
import { Aluno } from '../model/aluno';
import { InscricaoValidacaoService } from '../service/inscricao.validacao.service';
import { Subscription } from '../model/subscription';
import { InscricaoValidacao } from '../model/inscricao.validacao';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../cadastro/info-modal/info-modal.component';
import { Mensagem } from '../model/mensagem';
import { Router } from '@angular/router';

const URL_DOWNLOAD = API_SGB + "/download";

class ProcessosList {
  idProcesso : string;
  statusProcesso:string;
  statusProcessoResume : string;
  descricao:string;
  ano:string;
  dataAbertura:string;
  docsOficiais : DocOficial[];
  hasEntrevista : boolean = false;
  beneficio : Beneficio;
  cronogramaLink : string;
  hasInscricao : boolean = false;
}

interface DocOficial {
  idDoc: string;
  dataPostagem : string;
  numEdital: string;
  descricao : string;
  tipo: string;
}

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.scss']
})
export class ProcessosComponent implements OnInit {

  listaProcessos : ProcessosList[] = [];
  docsProcessos : DocOficial[] = [];
  aluno : Aluno = new Aluno();
  idProcesso : any = '';
  inscricao : Subscription = new Subscription();
  inscricaoValidacao : InscricaoValidacao = new InscricaoValidacao();
  acessoTempUser : boolean;
  link = URL_DOWNLOAD;
  linkCronograma : string = '';
  matriculaSessaoAluno = '';
  hasInscricao : boolean = false;
  pendingInscricao : boolean = false;
  isAbble : Boolean = false;

  constructor(private processosService : ProcessosService, 
              private docArquivosService: DocumentacaoArquivosService,
              private sessaoService : SessaoService,
              private inscricaoService : SubscriptionService,
              private alunoService : AlunoService,
              private iValidaService : InscricaoValidacaoService,
              private dialog : MatDialog,
              private router : Router) { }

  ngOnInit() {
    this.setListaProcessos();
  }

  auxilioMoradiaIcon(id) : boolean{
    return id == 1;
  }

  auxilioCrecheIcon(id) : boolean{
    return id == 2;
  }

  isencaoRUIcon(id) : boolean {
    return id == 4;
  }

  auxilioEmerg(id) : boolean{
    return id == 5;
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

  setDocsLista(){
    for(let p of this.listaProcessos){
            this.docArquivosService.getDocsOficiaisByProcesso(p.idProcesso)
              .subscribe(
                temp => {
                  let listItensTemp : DocOficial[] = [];
                  for(let d of temp){
                    
                    var docTipo = "";
                    switch(d.docTipo){
                      case "EDITAL":
                        docTipo = "Edital"
                        break;
                      case "ADITIVO_EDITAL":
                        docTipo = "Aditivo/Retificação ao Edital";
                        break;
                      case "PORTARIA":
                        docTipo = "Portaria";
                        break;
                      case "CRONOGRAMA":
                          docTipo = "Cronograma";
                          p.cronogramaLink = this.link + "/" + d.id;
                          break;
                      default:
                          docTipo = "Outro Documento";
                    }

                    let item : DocOficial = 
                     {idDoc: d.id, dataPostagem: d.dataPostagem, descricao: d.descricao, 
                      numEdital: d.id, tipo: docTipo};
                        
                    listItensTemp.push(item)

                  }
                  p.docsOficiais = listItensTemp;
                }
              );
            }
            this.docsProcessos = [];
  }

  getDocByIdList(id) : boolean{
    for(let d of this.docsProcessos){
      if(d.idDoc == id)
        return true;
    }
  }

  setListaProcessos(){
    this.processosService.getProcessos()
    .subscribe(
      listaTemp => 
        {
          
          for(let b of listaTemp){
            var itemProc : ProcessosList = new ProcessosList
            itemProc.ano = b.ano
            itemProc.dataAbertura = b.dataAbertura
            itemProc.idProcesso = b.id
            itemProc.statusProcesso = b.statusProcesso
            itemProc.descricao = b.descricao
            itemProc.beneficio = b.beneficio
            itemProc.hasEntrevista = b.possuiEntrevista;
            itemProc.statusProcessoResume = this.getResumeStatus(itemProc.statusProcesso);

            this.checkInscricao(itemProc.idProcesso);

            itemProc.hasInscricao = this.hasInscricao;

            this.listaProcessos.push(itemProc) 
          }

          if(this.idProcesso == 30){
            this.verifyAbble(this.matriculaSessaoAluno, 1);
          }else{
            this.verifyAbble(this.matriculaSessaoAluno, 0);
          }

          this.setDocsLista();

        }
    ); 
  }

  verifyAbble(siape: any, validade: number){
    this.inscricaoService
      .checkAbble(validade, siape)
        .subscribe(
          res => this.isAbble = res
        );
  }

  checkInscricao(idProcesso){
    this.idProcesso = idProcesso;
    this.getAluno(idProcesso);
  }

  checkSessao() : boolean{
    return this.sessaoService.sessaoAtiva();
  }

  checkInscricaoStatus(status) : boolean {
    return status == "INSCRICOES_ABERTAS";
  }

  getAluno(idProcesso){
    let u : Usuario = new Usuario();
    u = this.sessaoService.getUsuarioLogado();
    this.matriculaSessaoAluno = u.siape;
    this.acessoTempUser = u.acessoInscricaoTemp;
    this.alunoService.getAlunoByMatricula(this.matriculaSessaoAluno)
      .subscribe(
        aluno => 
          {
            if(aluno == null && typeof aluno == 'undefined'){
              this.aluno = new Aluno();
              this.setDadosUsuario(u);
            }else{
              this.aluno = aluno;
              this.carregarDados(idProcesso);
            }
          }
      );
  }

  carregarDados(idProcesso){
    this.inscricaoService.
    getInscricaoByProcessoAndMatriculaAluno(idProcesso, this.matriculaSessaoAluno).
      subscribe(
        dados => {
          if(dados != null && typeof dados != 'undefined'){
            this.hasInscricao = true;
            this.inscricao = dados;
            this.checkSubmitInscricao();
          }
        }
      );
  }

  setDadosUsuario(dados){
    this.aluno.siape = dados.siape;
    this.aluno.email = dados.email;
    this.aluno.nomeCompleto = dados.nomeCompleto;
    this.aluno.sexo = dados.sexo;
  }

  checkSubmitInscricao(){
    this.iValidaService.
      getInscricaoValidacaoByInscricao(this.inscricao.id).
        subscribe(
          dados => {
            this.inscricaoValidacao = dados;
            this.checkValidInscricao();
          }
      );
  }

  checkValidInscricao(){
    if(this.inscricaoValidacao.dadosPessoaisCompleto && this.inscricaoValidacao.dadosContatosLogradouroCompleto
       && this.inscricaoValidacao.dadosMoradiaTransporteCompleto && this.inscricaoValidacao.dadosSocioEconCompleto
       && this.inscricaoValidacao.infoFinanceiroCompleto && this.inscricaoValidacao.dadosSaudeDeficienciaCompleto
       && this.inscricaoValidacao.dadosOutrosAuxiliosCompleto && this.inscricaoValidacao.dadosAcadCompleto
       && this.inscricaoValidacao.documentacaoCompleta 
       && (this.inscricao.situacao != 'INSCRITO' && this.inscricao.situacao != 'INDEFERIDO' && this.inscricao.situacao != 'DEFERIDO' && this.inscricao.situacao != 'INSCRICAO_CANCELADA')){
        this.pendingInscricao = true;
        this.openModalPending();
    }
  }

  openModalPending(){
    let msg : Mensagem = new Mensagem();
    msg.info = true;
    msg.mensagem = "Caro aluno, você já possui todos os requisitos básicos para submeter sua inscrição à Comissão. Clique em continuar para ser direcionado à página de Submissão de Inscrição, e clique em 'Submeter Inscrição'!";
    msg.titulo = "Inscrição não Submetida!";

    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: {
        mensagem: msg
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate([`processos/${this.idProcesso}/inscricao/submit`]);
      }
    });
  }
}
