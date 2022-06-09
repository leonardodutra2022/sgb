import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'src/app/model/subscription';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';
import { UpdateModalComponent } from 'src/app/cadastro/update-modal/update-modal.component';

@Component({
  selector: 'app-subscription-validation',
  templateUrl: './subscription-validation.component.html',
  styleUrls: ['./subscription-validation.component.scss']
})
export class SubscriptionValidationComponent implements OnInit {
 
  idInscricao = '';
  inscricao : Subscription = new Subscription();
  inscricaoValidacao : InscricaoValidacao = new InscricaoValidacao();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private inscricaoService : SubscriptionService,
              private inscricaoValidacaoService : InscricaoValidacaoService,
              private dialog : MatDialog) { }

  ngOnInit() {
    this.idInscricao = this.data.idInscricao;
    this.getInscricaoValidacao(this.idInscricao);
  }

  getInscricao(){

  }

  getInscricaoValidacao(id){
    this.inscricaoValidacaoService
      .getInscricaoValidacaoByInscricao(id)
        .subscribe(
          dados => {
            if(dados != null && typeof dados != 'undefined'){
              this.inscricaoValidacao = dados;
            }
          }
        );
  }

  setStatusValidacao(form){
    switch(form){
      case 1:
        this.inscricaoValidacao.dadosPessoaisCompleto = !this.inscricaoValidacao.dadosPessoaisCompleto;
        break;
      case 2:
        this.inscricaoValidacao.dadosContatosLogradouroCompleto = !this.inscricaoValidacao.dadosContatosLogradouroCompleto;
        break;
      case 3:
        this.inscricaoValidacao.dadosSocioEconCompleto = !this.inscricaoValidacao.dadosSocioEconCompleto;
        break;
      case 4:
        this.inscricaoValidacao.dadosMoradiaTransporteCompleto = !this.inscricaoValidacao.dadosMoradiaTransporteCompleto;
        break;
      case 5:
        this.inscricaoValidacao.dadosSaudeDeficienciaCompleto = !this.inscricaoValidacao.dadosSaudeDeficienciaCompleto;
        break;
      case 6:
        this.inscricaoValidacao.infoFinanceiroCompleto = !this.inscricaoValidacao.infoFinanceiroCompleto;
        break;
      case 7:
        this.inscricaoValidacao.dadosOutrosAuxiliosCompleto = !this.inscricaoValidacao.dadosOutrosAuxiliosCompleto;
        break;
      case 8: 
        this.inscricaoValidacao.documentacaoCompleta = !this.inscricaoValidacao.documentacaoCompleta;
        break;
    }
  }

  atualizarValidacao(){
    this.inscricaoValidacaoService
      .update(this.inscricaoValidacao)
        .subscribe(
          _ => {
            this.openDialogAtualizado();
          }
        );
  }

  openDialogAtualizado(){
    const dialogRef = this.dialog.open(UpdateModalComponent);
    dialogRef.afterClosed().subscribe(
      result => {
    });
  }
}
