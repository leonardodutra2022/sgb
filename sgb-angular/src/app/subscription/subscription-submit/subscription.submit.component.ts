import { Component, OnInit } from '@angular/core';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { Subscription } from 'src/app/model/subscription';
import { Aluno } from 'src/app/model/aluno';
import { ProcessosService } from 'src/app/service/processos.service';
import { Processos } from 'src/app/model/processos';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AlunoService } from 'src/app/service/aluno.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateModalComponent } from 'src/app/cadastro/update-modal/update-modal.component';

@Component({
  selector: 'app-subscription-submit',
  templateUrl: './subscription.submit.component.html',
  styleUrls: ['./subscription.submit.component.scss']
})
export class SubscriptionSubmitComponent implements OnInit {

  isExistValidacao : boolean = false;
  isUpdate : boolean = false;
  submited : boolean = false;
  inscricaoValidacao : InscricaoValidacao = new InscricaoValidacao();
  inscricao : Subscription = new Subscription();
  aluno : Aluno = new Aluno();
  processo : Processos = new Processos();
  idProcesso = '';
  matriculaSessaoAluno = '';
  viewBtnIns : boolean = false;
  sendingEmail : boolean = false;

  constructor(private iValidacaoService : InscricaoValidacaoService,
              private inscricaoService : SubscriptionService,
              private processoService : ProcessosService,
              private rotas : ActivatedRoute,
              private alunoService : AlunoService,
              private sessaoService : SessaoService,
              private dialog : MatDialog) { }

  ngOnInit() {
    this.getAluno();
  }

  checkBtnIns(aluno){
    this.inscricaoService
      .getInscricoesByAluno(aluno.id)
        .subscribe(
          list => {
            if(list.length > 0){
              this.viewBtnIns = true;
            }
          }
      );
  }

  check(){
    if(this.inscricao.situacao == 'INSCRITO' || this.inscricao.situacao == 'DEFERIDO' || this.inscricao.situacao == 'INDEFERIDO'){
      this.submited = true;
    }else{
      this.submited = false;
    }
  }

  openSucess(){
    const dialogRef = this.dialog.open(UpdateModalComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
          this.dialog.closeAll();
          this.dialog.afterAllClosed.subscribe(
            _ => 
              {
                this.check();
                // this.router.navigate(['/inscricoes']);
              }
          );
        }
    });
  }

  submit(){
    this.inscricao.situacao = 'INSCRITO';
    this.sendingEmail = true;
    this.inscricaoService
      .update(this.inscricao)
        .subscribe(
          res => {
            this.openSucess();
            this.viewBtnIns = true;
            this.sendingEmail = false;
          }
        );
  }

  getAluno(){
    this.idProcesso = this.rotas.snapshot.paramMap.get('id');
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
              this.checkBtnIns(aluno);
              this.carregarProcesso();
            }
          }
      );
  }

  carregarValidacao(inscricao){
    this.iValidacaoService.getInscricaoValidacaoByInscricao(inscricao.id)
      .subscribe(
        dados => {
          if(dados != null && typeof dados != 'undefined'){
            this.isExistValidacao = true;
            this.inscricaoValidacao = dados;
            this.checkOutrasValidacoes();
          }else{
            this.isExistValidacao = false;
            this.inscricaoValidacao = new InscricaoValidacao();
          }
        }
      );
  }

  checkOutrasValidacoes(){
      let pattern = /[0-9]{11}/g;
  
      if(pattern.test(this.aluno.cpf)){
          this.inscricaoValidacao.cpfValido = true;
      }else{
          this.inscricaoValidacao.cpfValido = false;
      }

      if(this.aluno.siape <= 1000){
        this.inscricaoValidacao.matriculaAtualizada = false;
      }else{
        this.inscricaoValidacao.matriculaAtualizada = true;
      }
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
                this.isUpdate = true;
                this.check();
              }else{
                this.inscricao = new Subscription();
              }
            }
        );
  }

  carregarProcesso(){
    if(this.idProcesso != null && this.idProcesso != "" && typeof this.idProcesso != 'undefined'){
      this.processoService
        .getProcessosById(this.idProcesso)
          .subscribe(
            dados => 
              {
                this.processo = dados;
                this.getInscricao(dados);
              }
          );
    }else{
      this.processo = ProcessosService.processoAtual;
      this.getInscricao(this.processo);
    }
  }

}
