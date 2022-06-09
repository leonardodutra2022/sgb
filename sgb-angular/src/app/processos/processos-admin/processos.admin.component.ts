import { Component, OnInit } from '@angular/core';
import { Processos } from 'src/app/model/processos';
import { ProcessosService } from 'src/app/service/processos.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { ExportFileComponent } from 'src/app/export-file/export-file.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-processos-admin',
  templateUrl: './processos.admin.component.html',
  styleUrls: ['./processos.admin.component.scss']
})
export class ProcessosAdminComponent implements OnInit {

  listaProcessos : Processos[];

  constructor(public processoService : ProcessosService, 
              public sessaoService : SessaoService,
              public dialog : MatDialog
          ) {
  }

  ngOnInit() {
    this.processoService.getProcessosAtivosInativos()
      .subscribe(
        dadosTemp => 
          this.listaProcessos = dadosTemp
      );
  }

  listarProcessos(){
    this.processoService.getProcessosAtivosInativos()
    .subscribe(
        dadosTemp => this.listaProcessos = dadosTemp
      );
  }

  onStatusChange(processo : Processos){
    if(processo.ativo == true){
      processo.ativo = false;
      this.update(processo);
    }else{
      processo.ativo = true;
      this.update(processo);
    }
  }

  setListTempProcessos(){
    this.processoService.carregarLista(this.listaProcessos);
  }

  update(processo){
    this.processoService.update(processo)
    .subscribe(processoResult => processo = processoResult);
  }

  exportDialog(): void {
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: 'PROCESSOS'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
