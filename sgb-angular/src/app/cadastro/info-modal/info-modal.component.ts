import { Component, OnInit, Inject } from '@angular/core';
import { Mensagem } from 'src/app/model/mensagem';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  mensagem : Mensagem = new Mensagem();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.mensagem = this.data.mensagem;
  }

}
