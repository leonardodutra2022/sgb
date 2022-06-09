import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faCheckCircle, faEdit, faPlusSquare, faSignature } from '@fortawesome/free-solid-svg-icons';
import { interval, Observable, Subscription } from 'rxjs';
import { Aluno } from 'src/app/model/aluno';
import { FrequenciaRegistro } from 'src/app/model/frequencia.registro';
import { Projeto } from 'src/app/model/projeto';
import { FrequenciaRegistroService } from 'src/app/service/frequencia-registro.service';
import { FrequenciaAssinaturaComponent } from '../../admin/frequencia-assinatura/frequencia-assinatura.component';
import * as moment from 'moment/moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Horario } from 'src/app/model/horario';
import { Page } from 'src/app/model/pageable/page';

@Component({
  selector: 'app-frequencia-aluno-registro',
  templateUrl: './frequencia-aluno-registro.component.html',
  styleUrls: ['./frequencia-aluno-registro.component.scss']
})
export class FrequenciaAlunoRegistroComponent implements OnInit {

  idTemp = '';

  viewMsg: boolean;

  viewMsgErro: boolean;

  registrosFrequencia: FrequenciaRegistro[] = [];

  horarioAtual = '';

  horarioRetro = '';

  subscription : Subscription

  frequenciaRegistro: FrequenciaRegistro = new FrequenciaRegistro();

  projeto: Projeto = new Projeto();

  signIcon = faSignature;

  calendarCheck = faCheckCircle;

  signed: boolean;

  aluno: Aluno = new Aluno();

  dataAtual : Date = new Date();

  dataAtualConvertida: Date;

  mesRef : number = 0;

  anoRef: number = 0;

  diaHojeRef: number = 0;

  editIcon = faEdit;

  novoIcon = faPlusSquare

  minDate: Date;

  maxDate: Date;

  dataRetro: boolean;

  horaRetro: boolean;

  isRetro: boolean;

  horaAtual: number;

  minAtual: number;

  horarioRegistro: Horario = new Horario();

  horariosRegistro: Horario[] = [];

  horariosCount: number = 0;

  novoRegistro: boolean = false;

  viewInfo: boolean = true;

  registroFrequenciaPageable: Page<FrequenciaRegistro> = new Page<FrequenciaRegistro>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FrequenciaAlunoRegistroComponent>,
              public dialog : MatDialog,
              public registroFrequenciaService: FrequenciaRegistroService) { }

  ngOnInit(): void {
    this.dataAtualConvertida = this.convertDateTimeOffsetTZ(this.dataAtual, this.dataAtual.getTimezoneOffset());
    this.setDataHoje();
    this.setObjetos();
    this.setDataLimite();
    this.setDataRetro();
    if(!this.isRetro){
      this.subscription = interval(1000)
      .subscribe(
        _ => {
          this.horario();
          // this.setDataHoje();
        }
      );
    }
  }

  convertDateTimeOffsetTZ(data: Date, offSet: number): Date{
    if(offSet < 0){
      let offsetTimezoneBrasilia = 180;
      let valueTime = 60*1000;
      let novaData: Date = new Date(data.setTime( data.getTime() + (offSet - offsetTimezoneBrasilia) * valueTime));
      return novaData;
    }
    return data;
  }

  hideMsgInfo() {
    this.viewInfo = false;
  }

  setDataLimite(){
    this.minDate = new Date(2020, 1, 1);
    this.maxDate = new Date();
  }

  setDataRetro(){
    this.dataRetro = true;
    this.horaRetro = true;
    this.isRetro = true;
  }

  setDate(type: string, event: MatDatepickerInputEvent<Date>){
    this.dataAtual = event.value;
    this.dataRetro = false;
    this.changeDateRetro();
    this.initRegistros();
  }

  delete(registro: FrequenciaRegistro){
    this.registroFrequenciaService
      .delete(registro.id)
        .subscribe(
          res =>{
            this.initRegistros();
          }
      );
  }

  changeDateRetro(){
    this.mesRef = Number(moment(this.dataAtual).format('M'));
    this.anoRef = moment(this.dataAtual).get('year');
    this.diaHojeRef = moment(this.dataAtual).get('D');
    this.atualizarDatasRegistro();
  }

  atualizarDatasRegistro(){
    this.frequenciaRegistro.mesRef = this.mesRef;
    this.frequenciaRegistro.anoRef = this.anoRef;
    this.frequenciaRegistro.diaRef = this.diaHojeRef;
  }

  setDataHoje(){
    let offSetBrasilia = '-0300';
    let data = moment.now();
    this.mesRef = Number(moment().format('M'));
    this.anoRef = moment().get('year');
    this.diaHojeRef = moment().utcOffset(offSetBrasilia).get('D');
    this.atualizarDatasRegistro();
  }

  setObjetos() {
    this.aluno = this.data.aluno;
    this.projeto = this.data.projeto;
    this.initRegistros();
  }

  initRegistros(){
    this.getFrequenciaRegistroHoje(this.aluno, this.projeto);
    this.getRegistrosByMesAtualAlunoProjeto();
  }

  getRegistrosByMesAtualAlunoProjeto(nextPage: number = 0) {
    this.registroFrequenciaService
      .getByMesAtualAndAlunoAndProjeto(this.mesRef, this.aluno, this.projeto, this.anoRef, nextPage)
        .subscribe(
          list => {
            // this.registrosFrequencia = [];
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

  getFrequenciaRegistroHoje(aluno: Aluno, projeto: Projeto){
    this.registroFrequenciaService
      .findByDataHojeByAlunoAndProjeto(aluno, projeto, this.diaHojeRef, this.mesRef, this.anoRef)
        .subscribe(
          reg => {
            // this.frequenciaRegistro = null;
            if(reg.id > 0){
              this.frequenciaRegistro = reg;
              this.horariosCount = reg.horarios.length == 0 ? 1 : reg.horarios.length;
            }else{
              this.frequenciaRegistro = new FrequenciaRegistro();
            }
          }
      );
  }

  horario(){
    let data = new Date();
    let dataConverted = this.convertDateTimeOffsetTZ(data, data.getTimezoneOffset());
    let hora = dataConverted.getHours();
    let minuto = dataConverted.getMinutes();
    let segundos = dataConverted.getSeconds();

    this.horaAtual = hora;
    this.minAtual = minuto;

    let horario = `${hora}h${minuto}min${segundos}s`;

    this.horarioAtual = horario;
  }

  setNovoRegistro(){
    this.novoRegistro = true;
  }

  dados(){
    if(this.isRetro){

    }
  }

  assinar(){
    this.atualizarDatasRegistro();
    this.horariosRegistro = [];
    this.horariosRegistro.push(this.horarioRegistro);
    this.frequenciaRegistro.horarios = this.horariosRegistro;

    const dialogRef = this.dialog.open(FrequenciaAssinaturaComponent, {
      data: {
        aluno: this.aluno,
        frequenciaRegistro: this.frequenciaRegistro,
        isProfessor: false,
        isAluno: true,
        projeto: this.projeto,
        obs: this.frequenciaRegistro.observacao,
        horarios: this.horariosRegistro
      },width: '30%'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.initRegistros();
     })
  }  

  hideMsg(){
    this.viewMsgErro = false;
    this.viewMsg = false;
  }

  nextPage(){
    let nextPage = this.registroFrequenciaPageable.last ? this.registroFrequenciaPageable.pageable.pageNumber : this.registroFrequenciaPageable.pageable.pageNumber + 1;
    this.getRegistrosByMesAtualAlunoProjeto(nextPage);
  }

  goPage(numPage){
    this.getRegistrosByMesAtualAlunoProjeto(numPage);
    this.setPageAtual(numPage);
  }

  prevPage(){
    let prevPage = this.registroFrequenciaPageable.first ? this.registroFrequenciaPageable.pageable.pageNumber : this.registroFrequenciaPageable.pageable.pageNumber - 1;
    this.getRegistrosByMesAtualAlunoProjeto(prevPage);
  }
}
