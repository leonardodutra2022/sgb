import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/model/aluno';
import { AlunoService } from 'src/app/service/aluno.service';
import { DadosAcademicosService } from 'src/app/service/dados.academicos.service';
import { DadosAcademicos } from 'src/app/model/dados.academicos';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from 'src/app/user/user-modal/user.modal.component';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { Subscription } from 'src/app/model/subscription';
import { Processos } from 'src/app/model/processos';
import { SessaoService } from 'src/app/service/sessao.service';
import { Usuario } from 'src/app/model/usuario';
import { ProcessosService } from 'src/app/service/processos.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateMatriculaModalComponent } from 'src/app/cadastro/update-matricula-modal/update-matricula-modal.component';

export interface FormaIngresso {
  value:string;
  ingresso:string;
}

export interface Curso {
  value:string;
  curso:string;
}

export interface Frequencia {
  value:string;
  frequencia:string;
}

export interface Desempenho {
  value:string;
  desempenho:string;
}

@Component({
  selector: 'app-subscription-info-acad-form',
  templateUrl: './subscription.info.acad.form.component.html',
  styleUrls: ['./subscription.info.acad.form.component.scss']
})
export class SubscriptionInfoAcadFormComponent implements OnInit {

  idTemp = '';
  selecaoFormaIngresso = '';
  selecaoCurso = '';
  matriculaSessaoAluno = '';
  idProcesso = '';
  aluno: Aluno = new Aluno();
  inscricao : Subscription = new Subscription();
  processo : Processos = new Processos();
  dadosAcad : DadosAcademicos = new DadosAcademicos();
  listIngresso : FormaIngresso[] = [
    {value:'AMPLA_CONCORRENCIA', ingresso:'Ampla Concorrência'},
    {value:'COTAS_L1_L2', ingresso:'Cotas L1 e L2'},
    {value:'COTAS_L5_L6', ingresso:'Cotas L5 e L6'},
    {value:'COTAS_L9_L10', ingresso:'Cotas L9 e L10'},
    {value:'COTAS_L13_L14', ingresso:'Cotas L13 e L14'},
    {value:'OUTRA_FORMA', ingresso:'Outra Forma'},
  ];

  listCurso : Curso[] = [
    {value:'Ciências da Computação', curso:'Ciências da Computação'},
    {value:'Sistemas de Informação', curso:'Sistemas de Informação'},
    {value:'Engenharia Ambiental', curso:'Engenharia Ambiental'},
    {value:'Engenharia Civil', curso:'Engenharia Civil'},
    {value:'Engenharia de Minas', curso:'Engenharia de Minas'},
  ];  

  listFrequencia : Frequencia[] = [
    {value:'FREQUENCIA_ESCOLAR_NORMAL', frequencia:'Frequência Escolar Satisfatória'},
    {value:'BAIXA_FREQUENCIA_ESCOLAR', frequencia:'Baixa Frequência Escolar'}
  ];  

  listDesempenho : Desempenho[] = [
    {value:'APROVADO', desempenho:'Rendimento Acadêmico Satisfatório'},
    {value:'REPROVADO', desempenho:'Rendimento Acadêmico Insatisfatório'}
  ];

  dadosAcademico : DadosAcademicos = new DadosAcademicos();
  vinculosAcademicos : DadosAcademicos[] = [];
  inscricaoValidacao : InscricaoValidacao = new InscricaoValidacao();
  viewCreditoCampo : boolean = false;
  isExistValidacao : boolean = false;
  isModalForm : boolean = false;
  isUpdate : boolean = false;
  fetching : boolean = false;

  constructor(private alunoService : AlunoService, 
              private sessaoService : SessaoService,
              private dadosAcadService : DadosAcademicosService,
              private fb : FormBuilder, 
              private dialog : MatDialog,
              private inscricaoService : SubscriptionService,
              private inscricaoValidaService : InscricaoValidacaoService,
              private router : Router, 
              private rotas : ActivatedRoute,
              private processoService : ProcessosService) { }

  ngOnInit() {
    this.getAluno();   
  }

  grupoAcad = this.fb.group({
    acad: this.fb.group({
      id: [this.dadosAcademico.id],
      matricula: [this.dadosAcademico.matricula, Validators.nullValidator],
      curso: [this.dadosAcademico.curso, Validators.nullValidator],
      periodoLetivo: [this.dadosAcademico.periodoLetivo],
      ira: [this.dadosAcademico.ira],
      semestreCursado: [this.dadosAcademico.semestreCursado],
      totalCreditoCursado: [this.dadosAcademico.totalCreditoCursado],
      totalCreditoAprovado: [this.dadosAcademico.totalCreditoAprovado]
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  get aliases() {
    return this.grupoAcad.get('aliases') as FormArray;
  }

  addAlias() {
    let acad = this.grupoAcad.value;
    this.salvarFormAcad(acad.acad);
    this.resetFormAcad();
  }

  resetFormAcad(){
    this.grupoAcad.reset();
    this.idTemp = '';
  }

  atualizar() {
    if(this.idTemp !== null && this.idTemp !== '' && typeof this.idTemp !== 'undefined'){
      this.dadosAcademico = this.grupoAcad.value.acad;
      this.dadosAcademico.aluno = this.aluno;
      this.dadosAcadService.update(this.dadosAcademico).subscribe(
        _ => {
          this.atualizarListAcad()
          this.resetFormAcad()
        }
      );
    }
  }

  openDeleteDialog(id) {
    const dialogRef = this.dialog.open(UserModalComponent);
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
          this.dadosAcadService.delete(id).subscribe(_ => this.atualizarListAcad())
       }
    });
  }

  salvarFormAcad(dados : DadosAcademicos){
    this.dadosAcademico = dados;
    this.dadosAcademico.aluno = this.aluno;
    this.dadosAcadService.add(this.dadosAcademico).subscribe(
            temp => {
              this.dadosAcademico = temp
              this.atualizarListAcad()
            }
          );

  }


  atualizarListAcad(){
    this.dadosAcadService.getAllDadosAcademicosByAlunoCpf(this.aluno.cpf).subscribe(
      list => {
        this.vinculosAcademicos = []
        this.vinculosAcademicos = list
      }
    );
  }

  edit(dados:DadosAcademicos) {
    this.idTemp = dados.id;
    this.grupoAcad.setValue({
      'acad': {
        'id': dados.id,
        'matricula': dados.matricula,
        'curso': dados.curso,
        'periodoLetivo':dados.periodoLetivo,
        'ira':dados.ira,
        'semestreCursado':dados.semestreCursado,
        'totalCreditoCursado':dados.totalCreditoCursado,
        'totalCreditoAprovado':dados.totalCreditoAprovado
      },
      'aliases':'0'
    });
    this.idTemp = dados.id;
    this.dadosAcademico = dados;
  }

  setCreditosCampos(){
    if(this.aluno.semestreCursoAtual <= 1){
      this.viewCreditoCampo = false;
    }else{
      this.viewCreditoCampo = true;
    }
  }

  carregarDados() {
      this.selecaoFormaIngresso = this.aluno.formaIngresso;
      this.selecaoCurso = this.aluno.cursoAtual;
      this.setCreditosCampos();
  }

  add(){
    this.aluno.formaIngresso = this.selecaoFormaIngresso;
    this.aluno.cursoAtual = this.selecaoCurso;
    this.dadosAcad.aluno = this.aluno;

    this.fetching = true;
    
    this.alunoService.update(this.aluno).subscribe(
      temp => 
        {
          this.checkInscricaoStatus();
          this.aluno = temp;
          this.addValidacao();
          this.router.navigate([`/processos/${this.processo.id}/inscricao/upload-docs`]);
        }
    );
  }

  carregarDadosAcad() {
    this.dadosAcadService.getAllDadosAcademicosByAlunoCpf(this.aluno.cpf)
      .subscribe(
        temp => this.vinculosAcademicos = temp
      )
  }

  getInscricao(dados){
    this.inscricaoService
      .getInscricaoByProcessoAndMatriculaAluno(dados.id, this.aluno.siape)
        .subscribe(
          inscricao =>
            {
              if(inscricao != null){
                this.inscricao = inscricao;
                this.carregarValidacao(inscricao);
                this.isUpdate = true;
              }else{
                this.inscricao = new Subscription();
              }
            }
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
              this.carregarProcesso();
              this.carregarDados();
              this.carregarDadosAcad();
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

  cofigCreditosCampos(event){
    if(event <= 1){
      this.viewCreditoCampo = false;
    }else{
      this.viewCreditoCampo = true;
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
    this.inscricaoValidacao.dadosAcadCompleto = true;
    if(this.isExistValidacao){
      this.inscricaoValidaService.update(this.inscricaoValidacao)
        .subscribe(
          _ => {
            this.inscricaoValidaService.stepAcad.next(true);
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
    this.inscricaoValidacao.dadosAcadCompleto = false;
  }

  editSiape(){
    const dialogRef = this.dialog.open(UpdateMatriculaModalComponent, {
      data: {
        aluno: this.aluno,
        usuario: this.sessaoService.getUsuarioLogado(),
        matricula: this.matriculaSessaoAluno,
        iValidacao: this.inscricaoValidacao
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  dbClick(){
    this.fetching = true;
  }
  
}
