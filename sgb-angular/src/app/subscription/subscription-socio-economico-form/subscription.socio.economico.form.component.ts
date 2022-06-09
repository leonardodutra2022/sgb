import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/model/subscription';
import { Aluno } from 'src/app/model/aluno';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SituacaoSocioEconFamiliar } from 'src/app/model/situacao.socio.econ.familiar';
import { SituacaoSocioEconFamiliarService } from 'src/app/service/situacao.socio.econ.familiar.service';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from 'src/app/user/user-modal/user.modal.component';
import { AlunoService } from 'src/app/service/aluno.service';
import { Usuario } from 'src/app/model/usuario';
import { pipe, Subject } from 'rxjs';
import { Processos } from 'src/app/model/processos';
import { ProcessosService } from 'src/app/service/processos.service';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { ActivatedRoute, Router } from '@angular/router';
import { InscricaoPendenciaService } from 'src/app/service/inscricao.pendencia.service.service';
import { InscricaoPendencia } from 'src/app/model/inscricao.pendencia';
import { UpdateModalComponent } from 'src/app/cadastro/update-modal/update-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorModalComponent } from 'src/app/cadastro/error-modal/error-modal.component';

export interface Escolaridade {
  value: string;
  escolaridade: string;
}

export interface Parentes {
  atividadeProfissao:string;
  escolaridade:string;
  idade:number;
  nomeCompleto:string;
  parentesco:string;
  rendaMensal:number;
}

export interface DadosGerais {
  idadeFilhoMaisNovo:number;
  numFilhos:number;
  numPessoasFamilia:string;
  possuiGuardaFilhos:boolean;
  rendaFamiliar:number;
}

@Component({
  selector: 'app-subscription-socio-economico-form',
  templateUrl: './subscription.socio.economico.form.component.html',
  styleUrls: ['./subscription.socio.economico.form.component.scss']
})
export class SubscriptionSocioEconomicoFormComponent implements OnInit {

idTemp = '';
idProcesso = '';
rendaFamiliar = new FormControl('');
parentes : SituacaoSocioEconFamiliar[] = [];
dadosSocioEcon : SituacaoSocioEconFamiliar = new SituacaoSocioEconFamiliar();
isExistValidacao : boolean = false;
isModalForm : boolean = false;
isUpdate : boolean = false;
fetching : boolean = false;
inscricaoValidacao : InscricaoValidacao = new InscricaoValidacao();

erro : HttpErrorResponse;
error$ = new Subject<Boolean>();
msgErro = '';
codErro : number;

grupoSocioEconFamiliar = this.fb.group({

  pessoaFamiliar: this.fb.group({
    id: [this.dadosSocioEcon.id],
    nomeCompleto: [this.dadosSocioEcon.nomeCompleto, Validators.required],
    parentesco: [this.dadosSocioEcon.parentesco, Validators.required],
    idade: [this.dadosSocioEcon.idade, Validators.required],
    escolaridade: [this.dadosSocioEcon.escolaridade, Validators.required],
    rendaMensal: [this.dadosSocioEcon.rendaMensal],
    atividadeProfissao: [this.dadosSocioEcon.atividadeProfissao]
  }),
  aliases: this.fb.array([
    this.fb.control('')
  ])
});

  selecaoEscolaridade = '';
  inscricao: Subscription = new Subscription();
  aluno: Aluno = new Aluno();
  processo : Processos = new Processos();
  matriculaSessaoAluno = '';
  listEscolaridade : Escolaridade[] = [
    {value:'NAO_SABE_LER_ESCREVER', escolaridade:'Não sabe Ler/Escrever'},
    {value:'ALFABETIZADO', escolaridade:'Alfabetizado'},
    {value:'ENSINO_FUNDAMENTAL_INCOMPLETO', escolaridade:'Ensino Fundamental Incompleto'},
    {value:'ENSINO_FUNDAMENTAL_COMPLETO', escolaridade:'Ensino Fundamental Completo'},
    {value:'ENSINO_MEDIO_INCOMPLETO', escolaridade:'Ensino Médio Incompleto'},
    {value:'ENSINO_MEDIO_COMPLETO', escolaridade:'Ensino Médio Completo'},
    {value:'ENSINO_SUPERIOR_INCOMPLETO', escolaridade:'Ensino Superior Incompleto'},
    {value:'ENSINO_SUPERIOR_COMPLETO', escolaridade:'Ensino Superior Completo'},
    {value:'ESPECIALIZAÇÃO_INCOMPLETO', escolaridade:'Especialização Incompleta'},
    {value:'ESPECIALIZAÇÃO_COMPLETO', escolaridade:'Especialização Completa'},
    {value:'MESTRADO_INCOMPLETO', escolaridade:'Mestrado Incompleto'},
    {value:'MESTRADO_COMPLETO', escolaridade:'Mestrado Completo'},
    {value:'DOUTORADO_INCOMPLETO', escolaridade:'Doutorado Incompleto'},
    {value:'DOUTORADO_COMPLETO', escolaridade:'Doutorado Completo'}
  ];

  constructor(private sessaoService : SessaoService, 
    private subscriptionService : SubscriptionService, 
    private dialog : MatDialog,
    private fb: FormBuilder,private socioEconService : SituacaoSocioEconFamiliarService,
    private alunoService : AlunoService, 
    private inscricaoValidaService : InscricaoValidacaoService,
    private rotas : ActivatedRoute,
    private processoService : ProcessosService,
    private router : Router,
    private inscricaoPendenteService : InscricaoPendenciaService) { }

  ngOnInit() {
    this.getAluno();
    this.carregarDadosSocioEcon();
  }

  getInscricao(dados){
    this.subscriptionService
    .getInscricaoByProcessoAndMatriculaAluno(dados.id, this.aluno.siape)
      .subscribe(
        inscricao =>
          {
            if(inscricao != null && typeof inscricao != 'undefined'){
              this.inscricao = inscricao;
              this.carregarValidacao(inscricao);
              this.isUpdate = true;
            }else{
              this.inscricao = new Subscription();
            }
          }
      );
  }

  carregarDadosSocioEcon() {
    if(typeof this.aluno !== null && typeof this.aluno.id !== 'undefined' && this.aluno.id !== ''){
      this.socioEconService.getSocioEconByAluno(this.aluno.id).subscribe(
        list => {
          // this.parentes = [];
          // this.parentes = list;
          this.atualizarListParentes();
        }
      );
    }
  }

  get aliases() {
    return this.grupoSocioEconFamiliar.get('aliases') as FormArray;
  }

  resetFormParentes(){
    this.grupoSocioEconFamiliar.reset();
  }

  addAlias() {
    let parenteSocioEcon = this.grupoSocioEconFamiliar.value;
    this.salvar(parenteSocioEcon.pessoaFamiliar);
    this.resetFormParentes();
  }

  salvar(dados : SituacaoSocioEconFamiliar){
    dados.aluno = this.aluno;
    this.dadosSocioEcon = dados;
    this.aluno.rendaFamiliar += this.dadosSocioEcon.rendaMensal;
    this.inscricao.aluno = this.aluno;
    this.socioEconService.add(this.dadosSocioEcon).subscribe(
      temp => {
        this.dadosSocioEcon = temp
        this.atualizarListParentes()
      },
      error => {
        this.error$.next(true);
        this.erro = error;
        this.getMsgErro();

      }
    );
  }

  private getMsgErro(){
    switch(this.getErroCode()){
      case 406:
        this.msgErro = "Erro ao incluir membro familiar, pois já existe alguém com esse nome e idade";
        this.codErro = this.getErroCode();
        this.getModalErro();
        break;
    }
  }

  private getErroCode() : number{
    return this.erro.status;
  }

  getModalErro(){
    const dialogRef = this.dialog.open(ErrorModalComponent, 
      {
        data: {
          msgErro: this.msgErro,
          codErro: this.codErro
        }
      });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
        }
    });
  }

  edit(dados:SituacaoSocioEconFamiliar) {
    this.idTemp = dados.id;
    this.grupoSocioEconFamiliar.setValue({
      'pessoaFamiliar': {
        'id': dados.id,
        'nomeCompleto': dados.nomeCompleto,
        'parentesco': dados.parentesco,
        'idade':dados.idade,
        'escolaridade':dados.escolaridade,
        'atividadeProfissao':dados.atividadeProfissao,
        'rendaMensal':dados.rendaMensal
      },
      'aliases':'0'
    });
    this.idTemp = dados.id;
    this.dadosSocioEcon = dados;
  }

  atualizar() {
    if(this.idTemp !== null && this.idTemp !== '' && typeof this.idTemp !== 'undefined'){
      this.dadosSocioEcon = this.grupoSocioEconFamiliar.value.pessoaFamiliar;
      this.dadosSocioEcon.aluno = this.aluno;
      this.socioEconService.update(this.dadosSocioEcon).subscribe(
        _ => {
          this.atualizarListParentes()
          this.resetFormParentes()
        }
      );
    }
  }

  atualizarListParentes(){
    this.socioEconService.getSocioEconByAluno(this.aluno.id).subscribe(
      list => {
        this.parentes = []
        this.parentes = list
      }
    );
  }

  openDeleteDialog(dados) {
    const dialogRef = this.dialog.open(UserModalComponent);
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
          this.aluno.rendaFamiliar = this.aluno.rendaFamiliar - dados.rendaMensal;
          this.socioEconService.delete(dados.id).subscribe(_ => this.atualizarListParentes());
       }
    });
  }

  salvarProximo() {
    this.inscricao.aluno = this.aluno;

    this.fetching = true;

    this.alunoService.update(this.aluno).subscribe(
      _ => { 
        // this.aluno;
        this.subscriptionService.update(this.inscricao)
          .subscribe(
            pipe(
              _ => {
                this.addValidacao();
                this.checkInscricaoStatus();
                this.router.navigate([`/processos/${this.processo.id}/inscricao/info-financeira`]);
              }
            )
        );
      }
    );
  }


  salvarPendente() {
    let pendencia : InscricaoPendencia = new InscricaoPendencia();
    this.inscricao.aluno = this.aluno;
    this.alunoService.update(this.aluno).subscribe(
      _ => { 
        // this.aluno;
        this.subscriptionService.update(this.inscricao).subscribe(
          pipe(
              _ => {
                this.addValidacao();
                this.checkInscricaoStatus();
                this.inscricaoPendenteService
                .getPendenciasByInscricaoAndForm(this.inscricao.id, "INSCRICAO_SOCIOECONOMICO")
                  .subscribe(
                    dados => {
                      pendencia = dados;
                      if(!dados.concluido){
                        pendencia.concluido = true;
                        this.inscricaoPendenteService
                          .update(pendencia)
                            .subscribe(
                              _ => {
                                this.updateSucess();
                              }
                            );
                      }
                    }
                  );
              }
            )
        );
      }
    );
  }

  updateSucess(){
    const dialogRef = this.dialog.open(UpdateModalComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
          this.dialog.closeAll();
          this.dialog.afterAllClosed.subscribe(
            _ => 
              {
                this.router.navigate(['/inscricoes']);
              }
          );
        }
    });
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
              this.getProcesso();
              this.atualizarListParentes();
            }
          }
      );
  }

  getProcesso(){
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
    this.inscricaoValidacao.dadosSocioEconCompleto = true;
    if(this.isExistValidacao){
      this.inscricaoValidaService.update(this.inscricaoValidacao)
        .subscribe(
          _ => {
            this.inscricaoValidaService.stepSocio.next(true);
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
    this.inscricaoValidacao.dadosSocioEconCompleto = false;
  }

  dbClick(){
    this.fetching = true;
  }
}
