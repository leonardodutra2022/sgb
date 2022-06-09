import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faSignature } from '@fortawesome/free-solid-svg-icons';
import { FrequenciaRegistro } from 'src/app/model/frequencia.registro';
import { AssinaturaService } from 'src/app/service/assinatura.service';
import { FrequenciaRegistroService } from 'src/app/service/frequencia-registro.service';
import * as moment from 'moment';
import { Projeto } from 'src/app/model/projeto';
import { Aluno } from 'src/app/model/aluno';
import { ToastrService } from 'ngx-toastr';
import { Horario } from 'src/app/model/horario';
import { PeriodoRegistroFrequencia } from 'src/app/model/periodo.registro.frequencia';

@Component({
  selector: 'app-frequencia-assinatura',
  templateUrl: './frequencia-assinatura.component.html',
  styleUrls: ['./frequencia-assinatura.component.scss']
})
export class FrequenciaAssinaturaComponent implements OnInit {

  viewMsgErro: boolean;
  viewMsg: boolean;

  usuario = '';
  pass = '';

  signIcon = faSignature;

  fr: FrequenciaRegistro = new FrequenciaRegistro();
  projeto: Projeto = new Projeto();
  aluno: Aluno = new Aluno();

  diaRef: number = 0;
  mesRef: number = 0;
  anoRef: number = 0;

  listHorarios: Horario[] = [];

  assinarTudo: boolean = false;

  hasPendencia: boolean = true;

  periodoFrequencia: PeriodoRegistroFrequencia = new PeriodoRegistroFrequencia();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FrequenciaAssinaturaComponent>,
              private assinaturaService: AssinaturaService,
              private frequenciaRegistroService: FrequenciaRegistroService,
              private toarstMessage: ToastrService) { }

  ngOnInit(): void {
    this.projeto = this.data.projeto;
    this.aluno = this.data.aluno;
    this.listHorarios = this.data.horarios;
    this.assinarTudo = this.data.assinarTudo;
    this.periodoFrequencia = this.data.periodoFrequencia;
    this.carregarRegFrequencia();
    this.setDataHoje();
  }



  carregarRegFrequencia(){
    if(this.assinarTudo){
      this.fr = new FrequenciaRegistro();
    }else{
      this.fr = this.data.frequenciaRegistro;
    }
  }

  hideMsg(){
    this.viewMsgErro = false;
    this.viewMsg = false;
  }

  setDataHoje(){
    if(this.assinarTudo){
      this.mesRef = this.periodoFrequencia.mesRef;
      this.anoRef = this.periodoFrequencia.anoRef;
      this.diaRef = this.periodoFrequencia.diaRef;
    }else{
      this.mesRef = this.fr.mesRef;
      this.anoRef = this.fr.anoRef;
      this.diaRef = this.fr.diaRef;
    }
  }

  assinarTudoResponsavel(){
    this.frequenciaRegistroService
    .updateAll(this.mesRef, this.anoRef, this.aluno, this.projeto)
      .subscribe(
        r => {}
      );
  }

  check(){
    this.assinaturaService
      .checkCredenciais(this.usuario, this.pass)
        .subscribe(
          res => {
            if(res){

              if(this.assinarTudo){
                this.assinarTudoResponsavel();
              }else{
                if(this.fr.status == "" || this.fr.status == null){
                  this.fr = new FrequenciaRegistro();
                }
    
                if(!this.data.isAluno){
                  this.fr.assinaturaResponsavel = true;
                }
    
                this.fr.aluno = this.aluno;
                this.fr.projeto = this.projeto;
                this.fr.projeto.responsavel.perfils = [];
    
                this.fr.diaRef = this.diaRef;
                this.fr.mesRef = this.mesRef;
                this.fr.anoRef = this.anoRef;
                this.fr.periodoRef = this.mesRef + "_" + this.anoRef;
    
                let dataReferencia = moment();
                dataReferencia.date(this.diaRef);
                dataReferencia.month(this.mesRef - 1);
                dataReferencia.year(this.anoRef);
                this.fr.dataReferencia = dataReferencia.toDate();
    
                if(this.data.obs != false){
                  this.fr.observacao = this.data.obs;
                }
     
                if(this.fr.assinaturaAlunoEntrada || !this.data.isAluno){
                  this.frequenciaRegistroService
                  .update(this.fr)
                    .subscribe(
                      r => {}
                    );
                }else{
                  this.fr.aluno = this.data.aluno;
                  this.fr.horarios = this.listHorarios; 
                  this.frequenciaRegistroService
                  .add(this.fr)
                    .subscribe(
                      r => {}
                    );
                }
              }
            }else{
              this.toarstMessage.warning("Credenciais não Validadas!", "Credenciais")
            }
           }
      );
   }

}