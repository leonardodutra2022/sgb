import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aluno } from 'src/app/model/aluno';
import { Usuario } from 'src/app/model/usuario';
import { AlunoService } from 'src/app/service/aluno.service';
import { MessageToastrService } from 'src/app/service/message-toastr.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-aluno-view',
  templateUrl: './aluno-view.component.html',
  styleUrls: ['./aluno-view.component.scss']
})
export class AlunoViewComponent implements OnInit {

  edit = false;

  aluno: Aluno = new Aluno();

  usuario: Usuario = new Usuario();

  hasMatricula = true;

  editMatricula = false;

  constructor(public dialog : MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
              public usuarioService: UserService, public toarstService: MessageToastrService,
              public alunoService: AlunoService) { }

  ngOnInit(): void {
    this.init();
    this.carregarUsuario();
  }

  carregarUsuario(){
    if(!this.aluno.siape){
      this.toarstService.alertWarning("Matrícula não Existente! Contate o suporte para averiguar...");
      this.hasMatricula = false;
    }else{
      this.usuarioService
        .getUsuarioBySiape(this.aluno.siape)
          .subscribe(
            dados => {
              this.usuario = dados;
            }
        );
    }
  }

  init(){
    this.aluno = this.data.aluno;
    this.usuario.cursoResponsavel = this.aluno.cursoAtual;
    this.usuario.sexo = this.aluno.sexo;
    this.usuario.telefoneResponsavel = this.aluno.telefoneFixo;
  }

  update() {
    this.usuarioService
      .updateDados(this.usuario)
        .subscribe(
          res => {
            this.carregarAluno(this.aluno.siape);
          }
      );
  }

  setEdit() {
    this.edit = true;
  }

  carregarAluno(matricula){
    this.alunoService
      .getAlunoByMatricula(matricula)
        .subscribe(
          aluno => this.aluno = aluno
      );
  }

  setEditMatricula(){
    this.editMatricula = true;
  }
}
