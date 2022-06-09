import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InformeInscricaoComponent } from 'src/app/mensagens/informe-inscricao/informe-inscricao.component';

@Component({
  selector: 'app-processos-main',
  templateUrl: './processos.main.component.html',
  styleUrls: ['./processos.main.component.scss']
})
export class ProcessosMainComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  ngOnInit() {
    //this.openInfoDialog();
  }
 
  openInfoDialog() {
    const dialogRef = this.dialog.open(InformeInscricaoComponent);
    dialogRef.afterClosed().subscribe(
      result => {
       if(result==true){
       }
    });
  }
}
