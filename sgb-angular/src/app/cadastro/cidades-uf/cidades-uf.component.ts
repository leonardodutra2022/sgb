import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/model/estado';
import { Cidade } from 'src/app/model/cidade';
import { CidadeService } from 'src/app/service/cidade.service';
import { MatDialog } from '@angular/material/dialog';
import { EstadoService } from 'src/app/service/estado.service';
import { ExportFileComponent } from 'src/app/export-file/export-file.component';

@Component({
  selector: 'app-cidades-uf',
  templateUrl: './cidades-uf.component.html',
  styleUrls: ['./cidades-uf.component.scss']
})
export class CidadesUfComponent implements OnInit {

  uf : Estado[] = [];
  ufSelect = '';
  lista : Cidade[] = [];

  constructor(private service : CidadeService,
              private ufService : EstadoService,
              private dialog : MatDialog) { }

  ngOnInit() {
    this.loadList();
    this.loadUfs();
  }

  loadUfs(){
    this.ufService
      .getEstados()
        .subscribe(
          ufs => this.uf = ufs
        );
  }

  loadList(){
    this.service
      .getCidades()
        .subscribe(
          lista => this.lista = lista
      );
  }

  loadListByUf(item){
    this.service
      .getCidadeByUF(item)
        .subscribe(
          cidades => 
            {
              this.lista = [];
              this.lista = cidades;
            }
        );
  }

  exportDialog(): void {
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: 'CIDADES'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
