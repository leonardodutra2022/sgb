import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogradouroTipo } from 'src/app/model/logradouro.tipo';
import { LogradouroTipoService } from 'src/app/service/logradouro.tipo.service';
import { ExportFileComponent } from 'src/app/export-file/export-file.component';

@Component({
  selector: 'app-logradouros-tipos',
  templateUrl: './logradouros-tipos.component.html',
  styleUrls: ['./logradouros-tipos.component.scss']
})
export class LogradourosTiposComponent implements OnInit {

  lista : LogradouroTipo[] = [];

  constructor(private service : LogradouroTipoService,
              private dialog : MatDialog) { }

  ngOnInit() {
    this.loadList();
  }

  loadList(){
    this.service
      .getLogradourosTipos()
        .subscribe(
          lista => this.lista = lista
      );
  }

  exportDialog(): void {
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: 'LOGRADOURO_TIPOS'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
