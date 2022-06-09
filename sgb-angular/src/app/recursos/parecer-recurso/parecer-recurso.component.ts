import { Component, OnInit, Inject } from '@angular/core';
import { Recurso } from 'src/app/model/recurso';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'src/app/model/subscription';
import { ParecerModalComponent } from 'src/app/cadastro/parecer-modal/parecer-modal.component';
import { RecursoService } from 'src/app/service/recurso.service';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { ConcessaoService } from 'src/app/service/concessao.service';
import { Concessao } from 'src/app/model/concessao';
import { BeneficioService } from 'src/app/service/beneficio.service';
import { Processos } from 'src/app/model/processos';
import { Aluno } from 'src/app/model/aluno';
import { UserModalComponent } from 'src/app/user/user-modal/user.modal.component';
import { ConcessaoExclusaoComponent } from 'src/app/mensagens/concessao-exclusao/concessao-exclusao.component';

interface Status {
  st : string;
}

@Component({
  selector: 'app-parecer-recurso',
  templateUrl: './parecer-recurso.component.html',
  styleUrls: ['./parecer-recurso.component.scss']
})
export class ParecerRecursoComponent implements OnInit {

  selecaoStatus : string = '';
  selecaoStatusInscricao = '';
  viewMsg : boolean = false;
  existConcessao : boolean = false;
  recurso : Recurso = new Recurso();
  inscricao : Subscription = new Subscription();
  processo : Processos = new Processos();
  aluno : Aluno = new Aluno();
  concessao : Concessao = new Concessao();

  listStatus : Status[] = [
    {st:"DEFERIDO"},
    {st:'INDEFERIDO'}
  ]; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private recursoService : RecursoService,
              private inscricaoService : SubscriptionService,
              private dialog : MatDialog,
              private concessaoService : ConcessaoService,
              private beneficioService : BeneficioService) { }

  ngOnInit() {
    this.recurso = this.data.recurso;
    this.inscricao = this.data.inscricao;
    this.processo = this.inscricao.processo;
    this.aluno = this.inscricao.aluno;

    this.concessaoService
      .getConcessaoByAlunoAndProcesso(this.aluno.id, this.processo.id)
        .subscribe(
          dados => {
            if(dados != null && typeof dados != 'undefined'){
              this.concessao = dados;
              this.existConcessao = true;
            }else{
              this.concessao = new Concessao();
              this.existConcessao = false;
            }
        
            this.selecaoStatus = this.recurso.parecer;
            this.selecaoStatusInscricao = this.inscricao.situacaoFinal;
          }
        );
  }

  setStatus(event){
    this.recurso.parecer = event;
    this.selecaoStatus = event;
  }

  salvarAnalise(){
    this.recursoService
      .update(this.recurso)
        .subscribe(
          temp => {}
      );
  }

  deleteConcessao(){
    const dialogRef = this.dialog.open(ConcessaoExclusaoComponent);
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
        this.concessaoService
          .delete(this.concessao.id)
            .subscribe(
              _ => {
                this.openSucessModal();
              }
                // this.listarUsuarios()
          );
       }
    });
  }

  openSucessModal(){
    const dialogRef = this.dialog.open(ParecerModalComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
        }
    });
  }

  hideMsg(){
    this.viewMsg = false;
  }

}
