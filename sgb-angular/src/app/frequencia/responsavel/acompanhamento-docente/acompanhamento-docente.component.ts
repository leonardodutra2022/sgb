import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faCheckCircle, faSignature } from '@fortawesome/free-solid-svg-icons';
import { Aluno } from 'src/app/model/aluno';
import { FrequenciaRegistro } from 'src/app/model/frequencia.registro';
import { Page } from 'src/app/model/pageable/page';
import { PeriodoRegistroFrequencia } from 'src/app/model/periodo.registro.frequencia';
import { Projeto } from 'src/app/model/projeto';
import { AuthService } from 'src/app/service/auth.service';
import { FrequenciaRegistroService } from 'src/app/service/frequencia-registro.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { FrequenciaAssinaturaComponent } from '../../admin/frequencia-assinatura/frequencia-assinatura.component';

@Component({
  selector: 'app-acompanhamento-docente',
  templateUrl: './acompanhamento-docente.component.html',
  styleUrls: ['./acompanhamento-docente.component.scss']
})
export class AcompanhamentoDocenteComponent implements OnInit {

  idTemp = '';

  viewMsg: boolean;

  viewMsgErro: boolean;

  registrosFrequencia: FrequenciaRegistro[] = [];

  horarioAtual = '';

  frequenciaRegistro: FrequenciaRegistro = new FrequenciaRegistro();

  signIcon = faSignature;

  calendarCheck = faCheckCircle;

  signed: boolean;

  aluno: Aluno = new Aluno();

  projeto: Projeto = new Projeto();

  periodoFrequencia: PeriodoRegistroFrequencia = new PeriodoRegistroFrequencia();

  dataAtual = Date.now();

  isResponsavelProjeto: boolean;

  hasPendencia: boolean = true;

  registroFrequenciaPageable: Page<FrequenciaRegistro> = new Page<FrequenciaRegistro>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AcompanhamentoDocenteComponent>,
              public dialog : MatDialog,
              public registroFrequenciaService: FrequenciaRegistroService,
              public authService: AuthService,
              public sessaoService: SessaoService) { }

  ngOnInit(): void {
    this.setObjetos();
  }

  setObjetos() {
    this.aluno = this.data.aluno;
    this.projeto = this.data.projeto;
    this.periodoFrequencia = this.data.periodoFrequencia;
    this.getRegistrosByProjetoAlunoPeriodo(this.aluno.id, this.periodoFrequencia);
    this.checkResponsavelProjeto();
    this.hasPendenciaAssignedResponsavel();
  }

  checkResponsavelProjeto(){
    let usuarioLogado = this.sessaoService.getUsuarioLogado();

    if(usuarioLogado.id == this.projeto.responsavel.id){
      this.isResponsavelProjeto = true;
    }
  }

  getRegistrosByProjetoAlunoPeriodo(idAluno, periodoFrequencia: PeriodoRegistroFrequencia, numPage: number = 0) {
    this.registroFrequenciaService
      .getRegistrosByProjetoAndAlunoPeriodoRefPageable(periodoFrequencia.projeto, idAluno, 
        periodoFrequencia.mesRef, periodoFrequencia.anoRef, numPage)
        .subscribe(
          list => {
            this.registrosFrequencia = list.content;
            this.registroFrequenciaPageable = list;
          }
      );
  }

  setPageAtual(nextPage, init = false){
    if(!init){
      for(let i = 0; i < this.registroFrequenciaPageable.totalPages; i++){
        if(nextPage != i){
          document.getElementById(i.toString()).className = "item";
        }else{
          document.getElementById(i.toString()).className = "item page-atual";
        }
      }
    }
  }

  horario(){
    let data = new Date();
    let hora = data.getHours();
    let minuto = data.getMinutes();
    let segundos = data.getSeconds();

    let horario = `${hora}h${minuto}min${segundos}s`;

    this.horarioAtual = horario;
  }

  assinarDocumento(){

  }

  assinar(regF){
    const dialogRef = this.dialog.open(FrequenciaAssinaturaComponent, {
      data: {
        aluno: this.aluno,
        frequenciaRegistro: regF,
        isProfessor: true,
        isAluno: false,
        projeto: this.projeto,
        horaCustom: -1,
        minCustom: -1,
        obs: false
      },
      width: '30%',
      position: {top: "3%"}
    });

    dialogRef.afterClosed().subscribe(
      result => {
          this.getRegistrosByProjetoAlunoPeriodo(this.aluno.id, regF);
    })
   }  

  assinarTodos() {
    const dialogRef = this.dialog.open(FrequenciaAssinaturaComponent, {
      data: {
        aluno: this.aluno,
        frequenciaRegistro: null,
        isProfessor: true,
        isAluno: false,
        projeto: this.projeto,
        horaCustom: -1,
        minCustom: -1,
        obs: false,
        assinarTudo: true,
        periodoFrequencia: this.periodoFrequencia
      },width: '30%'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.getRegistrosByProjetoAlunoPeriodo(this.aluno.id, this.periodoFrequencia);
        this.hasPendenciaAssignedResponsavel();
    })
  }

  hasPendenciaAssignedResponsavel() {
    this.registroFrequenciaService
      .hasPendenciasAssignedResponsavel(this.periodoFrequencia.mesRef, this.periodoFrequencia.anoRef, this.aluno, this.projeto)
        .subscribe(
          res => this.hasPendencia = res
      );
  }

  hideMsg(){
    this.viewMsgErro = false;
    this.viewMsg = false;
  }

  nextPage(){
    let nextPage = this.registroFrequenciaPageable.last ? this.registroFrequenciaPageable.pageable.pageNumber : this.registroFrequenciaPageable.pageable.pageNumber + 1;
    this.getRegistrosByProjetoAlunoPeriodo(this.aluno.id, this.periodoFrequencia, nextPage);
  }

  goPage(numPage){
    this.getRegistrosByProjetoAlunoPeriodo(this.aluno.id, this.periodoFrequencia, numPage);
    this.setPageAtual(numPage);
  }

  prevPage(){
    let prevPage = this.registroFrequenciaPageable.first ? this.registroFrequenciaPageable.pageable.pageNumber : this.registroFrequenciaPageable.pageable.pageNumber - 1;
    this.getRegistrosByProjetoAlunoPeriodo(this.aluno.id, this.periodoFrequencia, prevPage);
  }
}
