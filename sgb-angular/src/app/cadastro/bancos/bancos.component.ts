import { Component, OnInit } from '@angular/core';
import { ExportFileComponent } from 'src/app/export-file/export-file.component';
import { MatDialog } from '@angular/material/dialog';
import { BancoService } from 'src/app/service/banco.service';
import { Banco } from 'src/app/model/banco';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.scss']
})
export class BancosComponent implements OnInit {

  lista : Banco[] = [];

  constructor(private service : BancoService,
              private dialog : MatDialog) { }

  ngOnInit() {
    this.loadList();
  }

  loadList(){
    this.service
      .getBancos()
        .subscribe(
          lista => this.lista = lista
      );
  }

  exportDialog(): void {
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: 'BANCOS'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
