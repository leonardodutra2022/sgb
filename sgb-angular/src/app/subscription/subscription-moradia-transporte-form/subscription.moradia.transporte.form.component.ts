import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/model/aluno';
import { Subscription } from 'src/app/model/subscription';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { Processos } from 'src/app/model/processos';
import { Usuario } from 'src/app/model/usuario';
import { AlunoService } from 'src/app/service/aluno.service';
import { ProcessosService } from 'src/app/service/processos.service';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { ActivatedRoute, Router } from '@angular/router';

export interface MoradiaTipo {
  value:string;
  tipo:string;
}

export interface Transporte{
  value:string;
  transporte:string;
}

export interface SituacaoImovel {
  value: string;
  situacao:string;
}

@Component({
  selector: 'app-subscription-moradia-transporte-form',
  templateUrl: './subscription.moradia.transporte.form.component.html',
  styleUrls: ['./subscription.moradia.transporte.form.component.scss']
})
export class SubscriptionMoradiaTransporteFormComponent implements OnInit {

  selecaoMoradiaTipo = '';
  selecaoSituacaoImovel = '';
  selecaoSituacaoImovelFamiliar = '';
  selecaoTransporte = '';
  matriculaSessaoAluno = '';
  idProcesso = '';
  inscricao: Subscription = new Subscription();
  aluno : Aluno = new Aluno();
  processo : Processos = new Processos();
  inscricaoValidacao : InscricaoValidacao = new InscricaoValidacao();
  isExistValidacao : boolean = false;
  isModalForm : boolean = false;
  isUpdate : boolean = false;
  fetching : boolean = false;

  listMoradiaTipo : MoradiaTipo[] = [
    {value:'RESIDE_COM_AMIGOS', tipo:'Reside com Amigos'},
    {value:'RESIDE_COM_IRMAOS', tipo:'Reside com Irmãos'},
    {value:'RESIDE_COM_PAI_MAE', tipo:'Reside com Pai e Mãe'},
    {value:'RESIDE_COM_CONJUGUE_COMPANHEIRO', tipo:'Reside com Cônjugue/Companheiro(a)'},
    {value:'RESIDE_COM_OUTROS', tipo:'Reside com Outros'},
    {value:'RESIDE_SOZINHO',tipo:'Reside Sozinho'}
  ];
  listSituacaoImovel : SituacaoImovel[] = [
    {value:'PROPRIO', situacao:'Próprio'},
    {value:'ALUGADO', situacao:'Alugado'},
    {value:'CEDIDO', situacao:'Cedido'},
    {value:'FINANCIADO', situacao:'Financiado'}
  ];
  listTransporte : Transporte[] = [
    {value:'A_PE', transporte:'A Pé'},
    {value:'BICICLETA', transporte:'Bicicleta'},
    {value:'TRANSPORTE_PUBLICO', transporte:'Transporte Público'},
    {value:'CARRO_PROPRIO', transporte:'Carro Próprio'},
    {value:'MOTO_PROPRIO', transporte:'Motocicleta Própria'},
    {value:'CARONA', transporte:'Carona'},
    {value:'TRANSPORTE_FRETADO', transporte:'Transporte Fretado'},
    {value:'OUTROS', transporte:'Outros'}
  ];

  constructor(private inscricaoService : SubscriptionService,
              private sessaoService : SessaoService,
              private alunoService : AlunoService,
              private inscricaoValidaService : InscricaoValidacaoService,
              private rotas : ActivatedRoute,
              private router : Router,
              private processoService : ProcessosService) {}

  ngOnInit() {
    this.getAluno();
    this.carregarDados();
  }
 
  add(){
    this.inscricao.tipoMoradia = this.selecaoMoradiaTipo;
    this.inscricao.situacaoMoradiaImovel = this.selecaoSituacaoImovel;
    this.inscricao.situacaoMoradiaImovelFamiliar = this.selecaoSituacaoImovelFamiliar;

    this.inscricao.meioTransporte = this.selecaoTransporte;

    this.fetching = true;
    
    this.inscricaoService.update(this.inscricao)
      .subscribe(
        temp => 
          {
            this.inscricao = temp;
            this.addValidacao();
            this.checkInscricaoStatus();
            this.router.navigate([`/processos/${this.processo.id}/inscricao/socioeconomico`]);
         }
      );
  }

  carregarDados() {
    this.selecaoMoradiaTipo = this.inscricao.tipoMoradia;
    this.selecaoSituacaoImovel = this.inscricao.situacaoMoradiaImovel;
    this.selecaoSituacaoImovelFamiliar = this.inscricao.situacaoMoradiaImovelFamiliar;
    this.selecaoTransporte = this.inscricao.meioTransporte;
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
              this.carregarProcesso();
            }
          }
      );
  }

  getInscricao(dados){
    this.inscricaoService
      .getInscricaoByProcessoAndMatriculaAluno(dados.id, this.aluno.siape)
        .subscribe(
          inscricao =>
            {
              if(inscricao != null && typeof inscricao != 'undefined'){
                this.inscricao = inscricao;
                this.carregarValidacao(inscricao);
                this.setCombo(inscricao);
                this.isUpdate = true;
              }else{
                this.inscricao = new Subscription();
              }
            }
        );
  }

  carregarProcesso(){
    this.idProcesso = this.rotas.snapshot.paramMap.get('id');
    if(this.idProcesso != null && this.idProcesso != "" && typeof this.idProcesso != 'undefined'){
      this.processoService
        .getProcessosById(this.idProcesso)
          .subscribe(
            dados => 
              {
                this.processo = dados;
                // this.isModalForm = true;
                this.getInscricao(dados);
              }
          );
    }else{
      this.processo = ProcessosService.processoAtual;
      this.isModalForm = false;
      this.getInscricao(this.processo);
    }
  }

  setCombo(inscricao : Subscription){
    this.selecaoMoradiaTipo = inscricao.tipoMoradia;
    this.selecaoSituacaoImovel = inscricao.situacaoMoradiaImovel;
    this.selecaoTransporte = inscricao.meioTransporte;
    this.selecaoSituacaoImovelFamiliar = inscricao.situacaoMoradiaImovelFamiliar;
  }

  checkValorFinancas() : boolean{
    if(this.selecaoSituacaoImovel == "FINANCIADO"){
      return true;
    }else if(this.selecaoSituacaoImovel == "ALUGADO"){
      return true;
    }else{
      return false;
    }
  }

  checkValorFinancasFamiliar() : boolean{
    if(this.selecaoSituacaoImovelFamiliar == "FINANCIADO"){
      return true;
    }else if(this.selecaoSituacaoImovelFamiliar == "ALUGADO"){
      return true;
    }else{
      return false;
    }
  }


  carregarValidacao(inscricao){
    this.inscricaoValidaService.getInscricaoValidacaoByInscricao(inscricao.id)
      .subscribe(
        dados => {
          if(dados != null && typeof dados != 'undefined'){
            this.isExistValidacao = true;
            this.inscricaoValidacao = dados;
          }else{
            this.isExistValidacao = false;
            this.inscricaoValidacao = new InscricaoValidacao();
          }
        }
      );
  }

  addValidacao(){
    this.inscricaoValidacao.dadosMoradiaTransporteCompleto = true;
    if(this.isExistValidacao){
      this.inscricaoValidaService.update(this.inscricaoValidacao)
        .subscribe(
          _ => {
            this.inscricaoValidaService.stepMoradia.next(true);
            this.checkInscricaoStatus();
          }
        );
      }
   }

   checkInscricaoStatus(){
    if(this.inscricaoValidaService.checkInscricaoValidacao(this.inscricaoValidacao)){
      this.inscricao.situacao = "INSCRITO";
    }else{
      this.inscricao.situacao = "NAO_INSCRITO";
    }
  }

  editEnable() {
    this.inscricaoValidacao.dadosMoradiaTransporteCompleto = false;
  }

  dbClick(){
    this.fetching = true;
  }
}
