import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { API_SGB } from 'src/app/config/API';
import { Aluno } from 'src/app/model/aluno';
import { Projeto } from 'src/app/model/projeto';
import { MessageToastrService } from 'src/app/service/message-toastr.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { AlunoViewComponent } from '../aluno-view/aluno-view.component';

const URL = API_SGB;

@Component({
  selector: 'app-aluno-projeto-modal',
  templateUrl: './aluno.projeto.modal.component.html',
  styleUrls: ['./aluno.projeto.modal.component.scss']
})
export class AlunoProjetoModalComponent implements OnInit {

  dados: any = '';
  alunos: Aluno[] = [];
  projeto: Projeto = new Projeto();

  constructor(private iconRegistry: MatIconRegistry,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projetoService: ProjetoService,
    private sessaoService: SessaoService,
    public dialog : MatDialog,
    public toarstService: MessageToastrService) {}

  ngOnInit(): void {
    this.dados = this.data;
    this.alunos = this.data.alunos;
    this.projeto = this.data.projeto;
  }

  desvincularAluno(alu: Aluno){
    for(let a of this.alunos){
      if(a.id == alu.id){
        let index = this.alunos.indexOf(a)
        this.alunos.splice(index, 1);
      }
    }

    this.projeto.aluno = this.alunos;
    this.projeto.responsavel.perfils = [];

    this.projetoService
      .update(this.projeto)
        .subscribe(

        );
  }

  viewAluno(alu: Aluno){
    const dialogRef = this.dialog.open(AlunoViewComponent,
      {
        data: {
          aluno: alu
        }
      });
    dialogRef.afterClosed().subscribe(
      result => {
        this.listarAlunosProjeto();
    })
  }

  listarAlunosProjeto(){
    this.projetoService
      .getProjetoById(this.projeto.id)
        .subscribe(
          proj => {
            this.projeto = proj;
            this.alunos = [];
            this.alunos = proj.aluno;
          }
      );
  }
}
