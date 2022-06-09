import { Component, OnInit, Inject } from '@angular/core';
import { Aluno } from 'src/app/model/aluno';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlunoService } from 'src/app/service/aluno.service';
import { AuthService } from 'src/app/service/auth.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';

@Component({
  selector: 'app-update-cpf-modal',
  templateUrl: './update.cpf.modal.component.html',
  styleUrls: ['./update.cpf.modal.component.scss']
})
export class UpdateCpfModalComponent implements OnInit {

  aluno: Aluno = new Aluno();
  cpfAtual : string = '';
  cpfNova : string = '';
  cpfValidNovo : boolean = false;
  erro : string = '';
  erroView : boolean = false;
  iValidacao : InscricaoValidacao = new InscricaoValidacao();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private alunoService : AlunoService,
              private auth : AuthService,
              private dialog : MatDialog,
              private iValidService : InscricaoValidacaoService) { }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados(){
    this.aluno = this.data.aluno;
    this.cpfAtual = this.aluno.cpf;
    this.iValidacao = this.data.iValidacao;
  }

  atualizar(){
    this.aluno.cpf = this.cpfNova;
    this.alunoService.
      update(this.aluno).
        subscribe(
          u => {
            this.atualizarValidacao();
            this.auth.fazerLogoff(); 
            this.dialog.closeAll();
          }
      );
  }

  atualizarValidacao(){
    this.iValidacao.cpfValido = true;
    this.iValidService
      .update(this.iValidacao)
        .subscribe(
          resp => {
          }
      );
  }

  checkCpf(){
    let pattern = /[0-9]{11}/g;
    this.alunoService
      .getAlunoByCpf(this.cpfNova)
        .subscribe(
          resp => {
            if((resp == null || typeof resp == 'undefined') && pattern.test(this.cpfNova)){
              this.cpfValidNovo = true;
              this.erroView = false;
            }else{
              this.cpfValidNovo = false;
              if(this.cpfNova.length < 11){
                this.erroView = false;
                this.erro = "CPF encontra-se incompleto!";
                this.erroView = true;
              }else if((resp != null || typeof resp != 'undefined') && (pattern.test(this.cpfNova))){
                this.erroView = false;
                this.erro = "CPF já existente!";
                this.erroView = true;
              }else{
                this.erroView = false;
                this.erro = "CPF com caracteres inválidos ou com letras!";
                this.erroView = true;
              }
            }
          }
        );
  }

  hideMsg(){
    this.erroView = false;
  }
}
