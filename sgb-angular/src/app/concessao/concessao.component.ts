import { Component, OnInit } from '@angular/core';
import { Concessao } from '../model/concessao';
import { ExportFileComponent } from '../export-file/export-file.component';
import { MatDialog } from '@angular/material/dialog';
import { ConcessaoService } from '../service/concessao.service';
import { SessaoService } from '../service/sessao.service';

@Component({
  selector: 'app-concessao',
  templateUrl: './concessao.component.html',
  styleUrls: ['./concessao.component.scss']
})
export class ConcessaoComponent implements OnInit {

  listaConcessao : Concessao[];

  constructor(public concessaoService : ConcessaoService,
              public dialog : MatDialog,
              public sessaoService : SessaoService) { }

  ngOnInit() {
    this.concessaoService
      .getConcessoes()
        .subscribe(
          dadosTemp => this.listaConcessao = dadosTemp
      );
  }

  verDados() : void{
  }

  listarProcessos(){
    this.concessaoService.getConcessoes()
    .subscribe(
        dadosTemp => this.listaConcessao = dadosTemp
      );
  }

  onStatusChange(concessao : Concessao){
    // if(concessao.concessaoStatus == 'CONCEDIDO'){
    //   concessao.ativo = false;
    //   this.update(concessao);
    // }else{
    //   concessao.ativo = true;
    //   this.update(concessao);
    // }
  }

  update(concessao){
    this.concessaoService.update(concessao)
    .subscribe(docResult => concessao = docResult);
  }

  exportDialog(): void {
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: 'CONCESSOES'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
