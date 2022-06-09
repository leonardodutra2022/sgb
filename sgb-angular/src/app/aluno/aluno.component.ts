import { Component, OnInit } from '@angular/core';
import { Aluno } from '../model/aluno';
import { AlunoService } from '../service/aluno.service';
import { SessaoService } from '../service/sessao.service';
import { MatDialog } from '@angular/material/dialog';
import { ExportFileComponent } from '../export-file/export-file.component';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss']
})
export class AlunoComponent implements OnInit {

  listaAluno : Aluno[];

  constructor(public alunoService : AlunoService, public sessaoService : SessaoService,
    public dialog : MatDialog) { }

  ngOnInit() {
    this.alunoService.getAlunos()
    .subscribe(dadosTemp => this.listaAluno = dadosTemp);

  }

  verDados() : void{
  }

  listarAlunos(){
    this.alunoService.getAlunos()
    .subscribe(
        dadosTemp => this.listaAluno = dadosTemp
      );
  }

  setListTempAluno(){
    this.alunoService.carregarLista(this.listaAluno);
  }

  update(a){
    this.alunoService.update(a)
    .subscribe(result => a = result);
  }

  exportDialog(): void {
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: 'ALUNOS'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
