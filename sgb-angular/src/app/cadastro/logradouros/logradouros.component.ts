import { Component, OnInit } from '@angular/core';
import { Logradouro } from 'src/app/model/logradouro';
import { LogradouroService } from 'src/app/service/logradouro.service';
import { MatDialog } from '@angular/material/dialog';
import { ExportFileComponent } from 'src/app/export-file/export-file.component';

@Component({
  selector: 'app-logradouros',
  templateUrl: './logradouros.component.html',
  styleUrls: ['./logradouros.component.scss']
})
export class LogradourosComponent implements OnInit {

  lista : Logradouro[] = [];

  constructor(private service : LogradouroService,
              private dialog : MatDialog) { }

  ngOnInit() {
    this.loadList();
  }

  loadList(){
    this.service
      .getLogradouros()
        .subscribe(
          lista => this.lista = lista
      );
  }

  exportDialog(): void {
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: 'LOGRADOUROS'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
