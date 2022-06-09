import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entrevista } from 'src/app/model/entrevista';

@Component({
  selector: 'app-entrevista-detail-modal',
  templateUrl: './entrevista-detail-modal.component.html',
  styleUrls: ['./entrevista-detail-modal.component.scss']
})
export class EntrevistaDetailModalComponent implements OnInit {

  entrevista : Entrevista = new Entrevista();

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.entrevista = this.data.entrevista;
  }

}
