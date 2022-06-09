import { Component, OnInit } from '@angular/core';
import { ProcessosService } from 'src/app/service/processos.service';
import { Processos } from 'src/app/model/processos';
import { SessaoService } from 'src/app/service/sessao.service';
import { Usuario } from 'src/app/model/usuario';
import { AlunoService } from 'src/app/service/aluno.service';
import { Aluno } from 'src/app/model/aluno';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { Subscription } from 'src/app/model/subscription';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subscription-step-horizontal',
  templateUrl: './subscription-step-horizontal.component.html',
  styleUrls: ['./subscription-step-horizontal.component.scss']
})
export class SubscriptionStepHorizontalComponent implements OnInit {

  processoSelecionado : Processos = new Processos();
  aluno : Aluno = new Aluno();
  inscricaoSelecionada : Subscription = new Subscription();
  inscricaoValidacao : InscricaoValidacao = new InscricaoValidacao();
  matriculaSessaoAluno = '';
  isExistValidacao : boolean = false;
  
  stepSaude$ : boolean = false;
  stepMoradia$ : boolean = false;
  stepDadosPessoais$ : boolean = false;
  stepContatos$ : boolean = false;
  stepSocio$ : boolean = false;
  stepFinancas$ : boolean = false;
  stepAuxilios$ : boolean = false;
  subStepDadosPessoais: boolean = false;
  reloadRealTime$ : Observable<boolean> = this.inscricaoValidaService.reload$.asObservable();
  

  constructor(private sessaoService : SessaoService, private alunoService : AlunoService,
              private subscriptionService : SubscriptionService, 
              private inscricaoValidaService : InscricaoValidacaoService) { }

  ngOnInit() {
    this.getAluno();
    this.reload();    
  }

  reload(){
    this.reloadRealTime$
    .subscribe(
      resp => {
        this.getAluno();
      }
    );
  }

  initValidaStep(dados : InscricaoValidacao){
    
    this.inscricaoValidaService.stepSaude.next(dados.dadosSaudeDeficienciaCompleto);
    this.stepSaude$ = dados.dadosSaudeDeficienciaCompleto;
    this.inscricaoValidaService.stepSaude.subscribe(
      _ => {
        this.stepSaude$ = _;
      }
    );

    this.inscricaoValidaService.stepMoradia.next(dados.dadosMoradiaTransporteCompleto);
    this.stepMoradia$ = dados.dadosMoradiaTransporteCompleto;
    this.inscricaoValidaService.stepMoradia.subscribe(
      _ => {
        this.stepMoradia$ = _;
      }
    );

    this.inscricaoValidaService.stepDadosPessoais.next(dados.dadosPessoaisCompleto);
    this.stepDadosPessoais$ = dados.dadosPessoaisCompleto;
    this.inscricaoValidaService.stepDadosPessoais.subscribe(
      _ => {
        this.stepDadosPessoais$ = _;
      }
    );

    this.inscricaoValidaService.stepContatos.next(dados.dadosContatosLogradouroCompleto);
    this.stepContatos$ = dados.dadosContatosLogradouroCompleto;
    this.inscricaoValidaService.stepContatos.subscribe(
      _ => {
        this.stepContatos$ = _;
      }
    );

    this.inscricaoValidaService.stepSocio.next(dados.dadosSocioEconCompleto);
    this.stepSocio$ = dados.dadosSocioEconCompleto;
    this.inscricaoValidaService.stepSocio.subscribe(
      _ => {
        this.stepSocio$ = _;
      }
    );

    this.inscricaoValidaService.stepFinancas.next(dados.infoFinanceiroCompleto);
    this.stepFinancas$ = dados.infoFinanceiroCompleto;
    this.inscricaoValidaService.stepFinancas.subscribe(
      _ => {
        this.stepFinancas$ = _;
      }
    );

    this.inscricaoValidaService.stepAuxilios.next(dados.dadosOutrosAuxiliosCompleto);
    this.stepAuxilios$ = dados.dadosOutrosAuxiliosCompleto;
    this.inscricaoValidaService.stepAuxilios.subscribe(
      _ => {
        this.stepAuxilios$ = _;
      }
    ); 
  }

  carregarProcesso(){
    if(ProcessosService.processoAtual != null || typeof ProcessosService.processoAtual != 'undefined'){
      this.processoSelecionado = ProcessosService.processoAtual;
      this.getInscricao(ProcessosService.processoAtual);
    }else{
      this.processoSelecionado = new Processos();
    }
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
              this.setDadosUsuario(u);
            }else{
              this.aluno = aluno;
              this.carregarProcesso();
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

  getInscricao(processo){
    // this.checkInscricaoExistente();
    this.subscriptionService
      .getInscricaoByProcessoAndMatriculaAluno(processo.id, this.aluno.siape)
        .subscribe(
          inscricao =>
            {
              if(inscricao != null && typeof inscricao != 'undefined'){
                this.inscricaoSelecionada = inscricao;
                this.carregarValidacao(inscricao);
              }else{
                this.inscricaoSelecionada = new Subscription();
              }
            }
        );
  }

  carregarValidacao(inscricao){
    this.inscricaoValidaService.getInscricaoValidacaoByInscricao(inscricao.id)
      .subscribe(
        dados => {
          if(dados != null && typeof dados != 'undefined'){
            this.isExistValidacao = true;
            this.inscricaoValidacao = dados;
            this.initValidaStep(dados);
          }else{
            this.isExistValidacao = false;
            this.inscricaoValidacao = new InscricaoValidacao();
          }
        }
      );
  }
}
