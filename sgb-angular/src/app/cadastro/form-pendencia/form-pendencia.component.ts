import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionCustom } from 'src/app/model/subscription.custom';

@Component({
  selector: 'app-form-pendencia',
  templateUrl: './form-pendencia.component.html',
  styleUrls: ['./form-pendencia.component.scss']
})
export class FormPendenciaComponent implements OnInit {

  inscricao : SubscriptionCustom = new SubscriptionCustom();

  constructor(private router : Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.inscricao = this.data.inscricao;
    this.toForm(this.inscricao.formDados);
  }

  toForm(form){
    let link = '';
    switch(form){
      case "INSCRICAO_SOCIOECONOMICO":
        link = `processos/socioecon/${this.inscricao.codProcesso}`;
        break;
      case "INSCRICAO_DADOS_PESSOAIS":
        link = `processos/dados-pessoais/${this.inscricao.codProcesso}`;
        break;
      case "INSCRICAO_LOGRADOURO_CONTATO":
        link = `processos/logradouro-contato/${this.inscricao.codProcesso}`;
        break;
      case "INSCRICAO_MORADIA_TRANSPORTE":
        link = `processos/moradia-transporte/${this.inscricao.codProcesso}`;
        break;
      case "INSCRICAO_INFO_FINANCAS":
        link = `processos/financas/${this.inscricao.codProcesso}`;
        break;
      case "INSCRICAO_INFO_ACAD":
        link = `processos/info-acad/${this.inscricao.codProcesso}`;
        break;
      case "INSCRICAO_OUTROS_AUXILIOS":
        link = `processos/outros-auxilios/${this.inscricao.codProcesso}`;
        break;
      case "INSCRICAO_SAUDE":
        link = `processos/saude/${this.inscricao.codProcesso}`;
        break;        
    }

    this.router.navigate([{ outlets: 
      { modal_pendencias:  link}}])
  }

}
