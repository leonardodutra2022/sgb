import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Periodo } from 'src/app/model/periodo';
import { PeriodoService } from 'src/app/service/periodo.service';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-periodo-form-modal',
  templateUrl: './periodo-form-modal.component.html',
  styleUrls: ['./periodo-form-modal.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class PeriodoFormModalComponent implements OnInit {

  periodo: Periodo = new Periodo();
  date = new FormControl(moment());
  mesSelected = '';
  anoSelected = '';

  constructor(private periodoService: PeriodoService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PeriodoFormModalComponent>) { }
 
  ngOnInit(): void {
  }

  selectAno(ano: Moment){
    
    const ctrlValue = this.date.value;
    ctrlValue.year(ano.year());
    this.date.setValue(ctrlValue);
    this.anoSelected = this.date.value.year();
  }

  selectMes(mes: Moment, datepicker: MatDatepicker<Moment>){
    const ctrlValue = this.date.value;
    ctrlValue.month(mes.month());
    this.date.setValue(ctrlValue);
    this.mesSelected = this.date.value.month() + 1;
    datepicker.close();
  }

  add() {
    this.setPeriodo();
    this.dialogRef.close()
    this.periodoService
      .add(this.periodo)
        .subscribe(
          res => {
            this.data.res = res;
          }
      );
  }

  setPeriodo(){
    let anoSelect:any = this.anoSelected;
    let mesSelect:any = this.mesSelected;

    this.periodo.anoReferencia = anoSelect;
    this.periodo.mesReferencia = mesSelect;
    this.periodo.periodoReferencia = mesSelect + "/" + anoSelect;

    this.periodo.status = "ANDAMENTO";
    this.periodo.created = new Date();
  }
}
