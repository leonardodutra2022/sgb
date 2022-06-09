import { Component, OnInit, Inject } from '@angular/core';
import { Concessao } from 'src/app/model/concessao';
import { ConcessaoService } from 'src/app/service/concessao.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessaoService } from 'src/app/service/sessao.service';
import { ExportFileComponent } from 'src/app/export-file/export-file.component';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {

  listaConcessao : Concessao[];
  alunoId = '';

  constructor(private concessaoService : ConcessaoService,
              private dialog : MatDialog,
              private sessaoService : SessaoService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.alunoId = this.data.aluno;
    this.concessaoService
      .getAllConcessoesByAlunoId(this.alunoId)
        .subscribe(
          dadosTemp => this.listaConcessao = dadosTemp
      );
  }

  verDados() : void{
  }

  listarProcessos(){
    this.concessaoService.getAllConcessoesByAlunoId(this.alunoId)
    .subscribe(
        dadosTemp => this.listaConcessao = dadosTemp
      );
  }

  onStatusChange(concessao : Concessao){
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
