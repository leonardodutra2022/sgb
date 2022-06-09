import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'src/app/model/subscription';

@Component({
  selector: 'app-comissao-modal',
  templateUrl: './comissao.modal.component.html',
  styleUrls: ['./comissao.modal.component.scss']
})
export class ComissaoModalComponent implements OnInit {

  inscricao : Subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.inscricao = this.data.inscricao;
  }

}
