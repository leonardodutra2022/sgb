import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/model/aluno';
import { Subscription } from 'src/app/model/subscription';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { AlunoService } from 'src/app/service/aluno.service';
import { Usuario } from 'src/app/model/usuario';
import { SessaoService } from 'src/app/service/sessao.service';
import { Processos } from 'src/app/model/processos';
import { ProcessosService } from 'src/app/service/processos.service';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateModalComponent } from 'src/app/cadastro/update-modal/update-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { InscricaoPendenciaService } from 'src/app/service/inscricao.pendencia.service.service';
import { InscricaoPendencia } from 'src/app/model/inscricao.pendencia';

@Component({
  selector: 'app-subscription-info-financeira-form',
  templateUrl: './subscription.info.financeira.form.component.html',
  styleUrls: ['./subscription.info.financeira.form.component.scss']
})
export class SubscriptionInfoFinanceiraFormComponent implements OnInit {

  inscricao: Subscription = new Subscription();
  aluno: Aluno = new Aluno();
  matriculaSessaoAluno = '';
  processo : Processos = new Processos();
  isExistValidacao : boolean = false;
  inscricaoValidacao : InscricaoValidacao = new InscricaoValidacao();
  idProcesso = '';
  isModalForm : boolean = false;
  isUpdate : boolean = false;
  fetching : boolean = false;

  constructor(private inscricaoService : SubscriptionService, 
              private alunoService : AlunoService,
              private sessaoService : SessaoService,
              private inscricaoValidaService : InscricaoValidacaoService,
              private rotas : ActivatedRoute,
              private processoService : ProcessosService,
              private dialog : MatDialog,
              private router : Router,
              private inscricaoPendenteService : InscricaoPendenciaService) { }

  ngOnInit() {
    this.getAluno();
  }

  add(){
    this.fetching = true;

    this.alunoService.update(this.aluno).subscribe(
      temp => {
        this.aluno = temp;
        this.inscricaoService.update(this.inscricao).subscribe(
          temp => 
            {
              this.inscricao = temp;
              this.addValidacao();
              this.checkInscricaoStatus();
              this.router.navigate([`/processos/${this.processo.id}/inscricao/info-saude`]);
            }
        );
      }
    );
  }

  addPendente(){
    let pendencia : InscricaoPendencia = new InscricaoPendencia();

    this.alunoService.update(this.aluno).subscribe(
      temp => 
        {
          this.aluno = temp;
          this.inscricaoService.update(this.inscricao).subscribe(
            temp => 
              {
                this.inscricao = temp;
                this.addValidacao();
                this.checkInscricaoStatus();
                this.inscricaoPendenteService
                .getPendenciasByInscricaoAndForm(this.inscricao.id, "INSCRICAO_INFO_FINANCAS")
                  .subscribe(
                    dados => {
                      pendencia = dados;
                      if(!dados.concluido){
                        pendencia.concluido = true;
                        this.inscricaoPendenteService
                          .update(pendencia)
                            .subscribe(
                              _ => {
                                this.checkInscricaoStatus();
                                this.updateSucess();
                              }
                            );
                      }
                    }
                  );
              }
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
                this.isUpdate = true;
              }else{
                this.inscricao = new Subscription();
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
    this.inscricaoValidacao.infoFinanceiroCompleto = true;
    if(this.isExistValidacao){
      this.inscricaoValidaService.update(this.inscricaoValidacao)
        .subscribe(
          _ => {
            this.inscricaoValidaService.stepFinancas.next(true);
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
    this.inscricaoValidacao.infoFinanceiroCompleto = false;
  }

  dbClick(){
    this.fetching = true;
  }
}
