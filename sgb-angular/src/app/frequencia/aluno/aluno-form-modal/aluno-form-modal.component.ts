import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aluno } from 'src/app/model/aluno';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'app-aluno-form-modal',
  templateUrl: './aluno-form-modal.component.html',
  styleUrls: ['./aluno-form-modal.component.scss']
})
export class AlunoFormModalComponent implements OnInit {

  aluno: Aluno = new Aluno();
  selecaoSexo = '';
  selecaoCurso = '';
  listSexo = [{"value": 0, "genero": "Feminino"},
              {"value": 1, "genero": "Masculino"}]

  listCursos = [
                {"curso": "Sistemas de Informação"},
                {"curso": "Ciências da Computação"},
                {"curso": "Engenharia Civil"},
                {"curso": "Engenharia de Minas"},
                {"curso": "Engenharia Ambiental"}
              ]

  constructor(public alunoService: AlunoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AlunoFormModalComponent>
    ) { }
 
  ngOnInit(): void {

  }

  addAluno(){
    this.aluno.sexo = this.selecaoSexo;
    this.aluno.cursoAtual = this.selecaoCurso;
    this.alunoService
      .addAluno(this.aluno)
        .subscribe(
          a => {}
      );
  }

}
