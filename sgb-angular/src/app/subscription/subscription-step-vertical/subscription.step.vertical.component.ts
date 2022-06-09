import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { ProcessosService } from 'src/app/service/processos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Processos } from 'src/app/model/processos';
import { Beneficio } from 'src/app/model/beneficio';
import { DocumentacaoService } from 'src/app/service/documentacao.service';
import { Documentacao } from 'src/app/model/documentacao';
import { DadosAcademicos } from 'src/app/model/dados.academicos';
import { DocumentacaoArquivosService } from 'src/app/service/documentacao.arquivos.service';
import { DocumentacaoArquivos } from 'src/app/model/documentacao.arquivos';
import { Logradouro } from 'src/app/model/logradouro';
import { LogradouroService } from 'src/app/service/logradouro.service';
import { AlunoService } from 'src/app/service/aluno.service';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { Usuario } from 'src/app/model/usuario';
import { Aluno } from 'src/app/model/aluno';
import { Subscription } from 'src/app/model/subscription';
import { Observable } from 'rxjs';

export var logradouroAluno: Logradouro = new Logradouro();
export var dadosAcad : DadosAcademicos[] = [];

@Component({
  selector: 'app-subscription-step-vertical',
  templateUrl: './subscription.step.vertical.component.html',
  styleUrls: ['./subscription.step.vertical.component.scss']
})
export class SubscriptionStepVerticalComponent implements OnInit {

  idProcessoTemp : string = '';
  processoDados : Processos = new Processos();
  
  idBeneficioTemp : string = '';
  beneficio : Beneficio = new Beneficio();
  listaDocumentacao: Documentacao[] = [];
  listaArquivosDocumentais : DocumentacaoArquivos[] = [];
  
  listaEditaisProcesso:DocumentacaoArquivos[] = [];
  editalProcesso:DocumentacaoArquivos = new DocumentacaoArquivos();
  
  logradouros:Logradouro[] = [];

  inscricaoId:string = '';
  inscricaoValidacao:InscricaoValidacao = new InscricaoValidacao();
  
  stepDadosPessoais : string = '';
  subStepDadosPessoais : string = '';
  stepDadosAcad : string = '';
  stepDocumentacao : string = '';
  stepComissao : string = null;
  subStepContatosEndereco : string = '';
  subStepDadosSocioEcon : string = '';
  matriculaSessaoAluno = '';
  aluno : Aluno = new Aluno();
  inscricao : Subscription = new Subscription();
  isExistValidacao : boolean = false;
  
  stepAcad$ : boolean = false;
  stepSaude$ : boolean = false;
  stepMoradia$ : boolean = false;
  stepDadosPessoais$ : boolean = false;
  stepContatos$ : boolean = false;
  stepSocio$ : boolean = false;
  stepFinancas$ : boolean = false;
  stepAuxilios$ : boolean = false;
  reloadRealTime$ : Observable<boolean> = this.iValidaService.reload$.asObservable();
 
  constructor(private subscriptionService : SubscriptionService, private sessaoService: SessaoService,
              private processoService : ProcessosService, private router : Router, 
              private rota : ActivatedRoute, private docService : DocumentacaoService,
              private alunoService : AlunoService, private inscricaoService : SubscriptionService,
              private docArquivoService : DocumentacaoArquivosService,
              private logradouroService : LogradouroService, 
              private iValidaService : InscricaoValidacaoService) 
              { } 

  ngOnInit() {
    this.carregaProcesso();
    this.carregarListaDocumentacao();    
    this.carregarArquivosDocumentais();
    this.getEditalProcesso();
    this.carregarLogradouros();
    this.reload();
  }

  reload(){
    this.reloadRealTime$
      .subscribe(
        resp => {
          this.carregaProcesso();
        }
      );
  }

  carregaProcesso(){
    this.idProcessoTemp = this.rota.snapshot.paramMap.get('id');
    if(this.idProcessoTemp != null && typeof this.idProcessoTemp != 'undefined' || this.idProcessoTemp != ''){
      this.processoService.getProcessosById(this.idProcessoTemp).subscribe(
        temp => 
          {
            ProcessosService.processoAtual = temp;
            this.processoDados = temp;
            this.getAluno();
            this.beneficio = temp.beneficio;
          }
      );
    }
  }

  initValidaStep(dados : InscricaoValidacao){

    this.iValidaService.stepAcad.next(dados.dadosAcadCompleto);
    this.stepAcad$ = dados.dadosAcadCompleto;
    this.iValidaService.stepAcad.subscribe(
      _ => {
        this.stepAcad$ = _;
      }
    );
    
    this.stepSaude$ = dados.dadosSaudeDeficienciaCompleto;
    this.iValidaService.stepSaude.subscribe(
      _ => {
        this.stepSaude$ = _;
        }
      );

      this.stepMoradia$ = dados.dadosMoradiaTransporteCompleto;
      this.iValidaService.stepMoradia.subscribe(
        _ => {
          this.stepMoradia$ = _;
        }
      );

      this.stepDadosPessoais$ = dados.dadosPessoaisCompleto;
      this.iValidaService.stepDadosPessoais.subscribe(
        _ => {
          this.stepDadosPessoais$ = _;
        }
      );

      this.stepContatos$ = dados.dadosContatosLogradouroCompleto;
      this.iValidaService.stepContatos.subscribe(
        _ => {
          this.stepContatos$ = _;
        }
      );

      this.stepSocio$ = dados.dadosSocioEconCompleto;
      this.iValidaService.stepSocio.subscribe(
        _ => {
          this.stepSocio$ = _;
        }
      );

      this.stepFinancas$ = dados.infoFinanceiroCompleto;
      this.iValidaService.stepFinancas.subscribe(
        _ => {
          this.stepFinancas$ = _;
        }
      );

      this.stepAuxilios$ = dados.dadosOutrosAuxiliosCompleto;
      this.iValidaService.stepAuxilios.subscribe(
        _ => {
          this.stepAuxilios$ = _;
        }
      ); 
  }

  carregarListaDocumentacao() {
    this.docService.getDocumentos().subscribe(
      list => this.listaDocumentacao = list
    );
  }

  carregarArquivosDocumentais(){
    this.docArquivoService.getDocumentos().subscribe(
      list => this.listaArquivosDocumentais = list
    );
  }

  getEditalProcesso(){
    this.docArquivoService.getArquivoByProcessoAndTipo(this.idProcessoTemp, 'EDITAL').subscribe(
      temp => {
        this.listaEditaisProcesso = temp
        for(let li of this.listaEditaisProcesso){
          this.editalProcesso = li
        }
      }
    );
  }

  carregarLogradouros(){
    this.logradouroService.getLogradouros().subscribe(
      temp => this.logradouros = temp
      );
  }

  getAluno(){
    let u : Usuario = new Usuario();
    u = this.sessaoService.getUsuarioLogado();
    this.matriculaSessaoAluno = u.siape;
    this.alunoService.getAlunoByMatricula(this.matriculaSessaoAluno)
      .subscribe(
        aluno => 
          {
            if(aluno == null){
              this.aluno = new Aluno();
            }else{
              this.aluno = aluno;
              this.getInscricao();
            }
          }
      );
  }

  getInscricao(){
    this.inscricaoService
      .getInscricaoByProcessoAndMatriculaAluno(this.processoDados.id, this.aluno.siape)
        .subscribe(
          inscricao =>
            {
              if(inscricao != null){
                this.inscricao = inscricao;
                this.carregarValidacaoInscricao(inscricao.id);
              }else{
                this.inscricao = new Subscription();
              }
            }
        );
  }

  carregarValidacaoInscricao (inscricao){
    this.iValidaService.getInscricaoValidacaoByInscricao(inscricao).subscribe(
      temp => {
        if(temp != null && typeof temp != 'undefined'){
          this.isExistValidacao = true;
          this.inscricaoValidacao = temp;
          this.stepValidacao(temp);
          this.initValidaStep(temp);
        }else{
          this.isExistValidacao = false;
          this.inscricaoValidacao = new InscricaoValidacao();
        }
      }      
    );
  }

  stepValidacao(iValid:InscricaoValidacao){
 
    if(iValid.dadosPessoaisCompleto && iValid.dadosSocioEconCompleto && iValid.dadosContatosLogradouroCompleto
        && iValid.dadosMoradiaTransporteCompleto && iValid.infoFinanceiroCompleto && iValid.dadosSaudeDeficienciaCompleto
        && iValid.dadosOutrosAuxiliosCompleto){
          this.stepDadosPessoais = "completed";
        }
  }

}
