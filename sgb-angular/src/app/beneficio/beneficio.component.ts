import { Component, OnInit } from '@angular/core';
import { Beneficio } from '../model/beneficio';
import { SessaoService } from '../service/sessao.service';
import { BeneficioService } from '../service/beneficio.service';
import { MatDialog } from '@angular/material/dialog';
import { ExportFileComponent } from '../export-file/export-file.component';

@Component({
  selector: 'app-beneficio',
  templateUrl: './beneficio.component.html',
  styleUrls: ['./beneficio.component.scss']
})
export class BeneficioComponent implements OnInit {

  listaBeneficios : Beneficio[];

  constructor(public beneficioService : BeneficioService, public sessaoService : SessaoService,
    public dialog : MatDialog) { }

  ngOnInit() {
    this.beneficioService.getBeneficios()
    .subscribe(dadosTemp => this.listaBeneficios = dadosTemp);

  }

  verDados() : void{
  }

  listarProcessos(){
    this.beneficioService.getBeneficios()
    .subscribe(
        dadosTemp => this.listaBeneficios = dadosTemp
      );
  }

  onStatusChange(ben : Beneficio){
    if(ben.permiteAcumulacao == true){
      ben.permiteAcumulacao = false;
      this.update(ben);
    }else{
      ben.permiteAcumulacao = true;
      this.update(ben);
    }
  }

  setListTempDocumentacao(){
    this.beneficioService.carregarLista(this.listaBeneficios);
  }

  update(doc){
    this.beneficioService.update(doc)
    .subscribe(docResult => doc = docResult);
  }

  exportDialog(): void {
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: 'BENEFICIOS'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
