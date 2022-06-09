import { Component, OnInit } from '@angular/core';
import { OrgaoExpedidor } from 'src/app/model/orgao.expedidor';
import { OrgaoExpedidorService } from 'src/app/service/orgao.expedidor.service';
import { MatDialog } from '@angular/material/dialog';
import { ExportFileComponent } from 'src/app/export-file/export-file.component';

@Component({
  selector: 'app-orgaos-expedidores',
  templateUrl: './orgaos-expedidores.component.html',
  styleUrls: ['./orgaos-expedidores.component.scss']
})
export class OrgaosExpedidoresComponent implements OnInit {

  lista : OrgaoExpedidor[] = [];

  constructor(private service : OrgaoExpedidorService,
              private dialog : MatDialog) { }

  ngOnInit() {
    this.loadList();
  }

  loadList(){
    this.service
      .getOrgaosExpedidores()
        .subscribe(
          lista => this.lista = lista
      );
  }

  exportDialog(): void {
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: 'ORGAOS_EXPEDIDORES'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
