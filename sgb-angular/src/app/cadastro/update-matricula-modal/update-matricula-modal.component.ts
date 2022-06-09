import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Aluno } from 'src/app/model/aluno';
import { Usuario } from 'src/app/model/usuario';
import { UserService } from 'src/app/service/user.service';
import { AlunoService } from 'src/app/service/aluno.service';
import { AuthService } from 'src/app/service/auth.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';

@Component({
  selector: 'app-update-matricula-modal',
  templateUrl: './update-matricula-modal.component.html',
  styleUrls: ['./update-matricula-modal.component.scss']
})
export class UpdateMatriculaModalComponent implements OnInit {

  aluno: Aluno = new Aluno();
  usuario: Usuario = new Usuario();
  iValidacao : InscricaoValidacao = new InscricaoValidacao();
  matriculaAtual : string = '';
  matriculaNova : string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private usuarioService : UserService, 
              private alunoService : AlunoService,
              private auth : AuthService,
              private dialog : MatDialog,
              private iValidaService : InscricaoValidacaoService) { }

  ngOnInit() {
    this.carregarDados();
    this.getUsuario();
  }

  carregarDados(){
    this.aluno = this.data.aluno;
    this.usuario = this.data.usuario;
    this.matriculaAtual = this.data.matricula;
    this.iValidacao = this.data.iValidacao;
  }

  getUsuario(){
    this.usuarioService.
      getUsuarioBySiape(this.matriculaAtual).
        subscribe(
          usuario => {
            this.usuario = usuario;
          }
      );
  }

  atualizar(){
    this.usuario.siape = this.matriculaNova;
    this.aluno.siape = this.matriculaNova;

    this.usuarioService.
      updateMatricula(this.usuario, this.matriculaNova).
        subscribe(
          u => {
            this.iValidacao.matriculaAtualizada = true;
            this.iValidaService.
              update(this.iValidacao).
                subscribe(
                  resp => {
                    this.auth.fazerLogoff(); 
                    this.dialog.closeAll();
                  }
                );
            }
      );
  }

}
