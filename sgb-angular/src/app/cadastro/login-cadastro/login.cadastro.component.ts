import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/model/aluno';
import { AlunoService } from 'src/app/service/aluno.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { Usuario } from 'src/app/model/usuario';
import { UserService } from 'src/app/service/user.service';
import { SucessoModalComponent } from '../sucesso-modal/sucesso-modal.component';
import { Router } from '@angular/router';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { Mensagem } from 'src/app/model/mensagem';

interface Sexo {
  value: string;
  genero: string;
}

@Component({
  selector: 'app-login-cadastro',
  templateUrl: './login.cadastro.component.html',
  styleUrls: ['./login.cadastro.component.scss']
})
export class LoginCadastroComponent implements OnInit {

  aluno: Aluno = new Aluno();
  alunoEdit : Aluno = new Aluno();
  usuario : Usuario = new Usuario();
  usuarioEdit : Usuario = new Usuario();
  selecaoAluno : string = '';
  isExistAluno : boolean = false;
  isExistUsuario : boolean = false;
  isUpdate : boolean = false;
  cpfReadOnly : boolean = false;
  selecaoSexo : string= '';
  senhaConfirm = '';
  nomeUsuarioEdit = '';
  msg = '';
  msgErro = '';
  msgView : boolean = false;
  emailValid : boolean = false;
  matriculaValid : boolean = false;
  nomeUsuarioValid : boolean = false;
  senhaValid : boolean = false;
  matriculaRead : boolean = false;
  msgViewErro : boolean = false;

  alunoExistente : boolean = false;
  cpfValid : boolean = false;


  listSexo : Sexo[] = [
    {value: "1", genero: 'Masculino'},
    {value: "0", genero: 'Feminino'}
  ];


  constructor(private alunoService : AlunoService, 
              private dialog : MatDialog, 
              private usuarioService : UserService,
              private router : Router
              ) { }

  ngOnInit() {
    this.carregarAluno();
  }

  openInfoDialog() {
    let msg : Mensagem = new Mensagem();
    msg.info = true;
    msg.mensagem = "Complete alguns dados restantes!";
    msg.titulo = "Cadastro Pré-Existente!";

    const dialogRef = this.dialog.open(InfoModalComponent,{
      disableClose: true,
      data: {
        mensagem : msg
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
       if(result==true){
         this.carregarAluno();
       }
    });
  }

  openSucessoDialog() {
    const dialogRef = this.dialog.open(SucessoModalComponent,{disableClose: true});
    dialogRef.afterClosed().subscribe(
      result => {
       if(result==true){
         this.router.navigate(['/']);
       }
    });
  }

  openAtualizacaoDialog() {
    const dialogRef = this.dialog.open(UpdateModalComponent,{disableClose: true});
    dialogRef.afterClosed().subscribe(
      result => {
       if(result==true){
         this.router.navigate(['/']);
       }
    });
  }

  carregarAluno() {
    if(!this.isExistAluno){
    }
  }

  checkCpf(){
    let pattern = /[0-9]{11}/g;

    if(pattern.test(this.selecaoAluno)){
      this.cpfValid = true;
    }else{
      this.msgViewErro = false;
      this.msgErro = 'CPF inválido, redigite novamente!';
      this.selecaoAluno = '';
      this.msgViewErro = true;
    }
  }

  getAlunoPorCpf(){
    this.checkCpf();
    this.alunoService.getAlunoByCpfPublic(this.selecaoAluno)
      .subscribe(
        temp => 
          {
            if(temp == null || typeof temp == 'undefined'){
              this.isExistAluno = false;
              this.isUpdate = false;
              this.aluno = new Aluno();
              this.aluno.cpf = this.selecaoAluno;
            }else{
              this.aluno = temp;
              this.isExistAluno = true;
              this.selecaoSexo = temp.sexo;
              this.setCamposRead();
              this.searchSiape();
            }
          }
      )
  }

  registrar() {
    this.setAluno();
    if(this.isExistAluno && this.isExistUsuario){
      this.saveAluno();
      this.saveUsuario();
      this.openAtualizacaoDialog();
    }else if(!this.isExistAluno && !this.isExistUsuario){
      this.add();
      this.openSucessoDialog();
    }else if(this.isExistAluno && !this.isExistUsuario){
      this.addUsuario();
      this.saveAluno();
      this.openAtualizacaoDialog();
    }
  }

  add(){
    this.setUsuario();
    this.usuarioService.addPublic(this.usuario).subscribe(
      _ => {
        this.msg = 'Informações para o novo usuário cadastradas!';
        this.msgView = true;

        this.alunoService.addPublic(this.aluno)
          .subscribe(
            _ => {}
          );
       }
    );
  }

  saveUsuario() {
    this.usuarioService.
      getUsuarioBySiapePublic(this.aluno.siape).
        subscribe(
          res => {
            let usuarioTemp : Usuario = new Usuario();
            usuarioTemp.id = res.id;
            usuarioTemp.email = this.aluno.email;
            usuarioTemp.nomeCompleto = this.aluno.nomeCompleto;
            usuarioTemp.papel = "Aluno";
            usuarioTemp.siape = this.aluno.siape;
            usuarioTemp.sexo = this.selecaoSexo;
            usuarioTemp.senha = this.usuario.senha;
            usuarioTemp.nomeUsuario = this.nomeUsuarioEdit;

            this.usuarioService.updatePublic(usuarioTemp).subscribe(
              _ => 
              {
                this.msg = 'Usuario Cadastro atualizado!';
                this.msgView = true;
              }
          );
       }
    );
  }

  saveAluno() {
    this.aluno.sexo = this.selecaoSexo;
    this.alunoService.updatePublic(this.aluno)
      .subscribe(
        _ => {}
      );
  }

  addUsuario(){
    this.setUsuario();
    this.usuarioService.addPublic(this.usuario).subscribe(
      _ => {
        this.msg = 'Informações para o novo usuário cadastradas!';
        this.msgView = true;
      }
    );
  }

  addAluno(){
    this.alunoService.addPublic(this.aluno)
    .subscribe(
      _ => {}
      );
  }

  setUsuario(){
    this.usuario.perfis = [];
    this.usuario.papel = "Aluno";
    this.usuario.email = this.aluno.email;
    this.usuario.nomeCompleto = this.aluno.nomeCompleto;
    this.usuario.sexo = this.selecaoSexo;
    this.usuario.siape = this.aluno.siape;
    this.usuario.nomeUsuario = this.nomeUsuarioEdit;
  }

  retonar(){
    // this.router.navigate(['/cadastro/aluno']);
  }

  setAluno(){
    this.aluno.sexo = this.selecaoSexo;
  }

  changeAluno(){
    this.getAlunoPorCpf();
  }

  searchSiape(){
    this.usuarioService.getUsuarioBySiapePublic(this.aluno.siape)
      .subscribe(
        usuario => 
          {
            if(usuario == null || typeof usuario == 'undefined'){
              this.isExistUsuario = false;
              this.matriculaValid = true;
              this.isUpdate = false;
              this.openInfoDialog();
              this.usuario = new Usuario();
            }else if(usuario != null || typeof usuario != 'undefined' && this.aluno.email == "@"){
              this.isExistUsuario = true;
              this.matriculaValid = true;
              this.emailValid = false;
              this.isUpdate = false;
              this.matriculaRead = true;
              this.openInfoDialog();
              // this.usuario = usuario;
              this.usuarioEdit = usuario;
            }else{
              this.usuario = usuario;
              this.usuarioEdit = usuario;
              this.alunoEdit = this.aluno;
              this.isExistUsuario = true;
              this.matriculaRead = true;

              this.isUpdate = true;
              this.matriculaValid = true;
              this.setCamposRead();
            }
          }
      );
  }

  verifySiape(){
    var pattern = /[^0-9]/g;

    if(!pattern.test(this.aluno.siape)){
      this.matriculaValid = true;
      this.msgViewErro = false;
    }else{
      this.matriculaValid = false;
      this.msgViewErro = true;
      this.msgErro = "Informe apenas números para Matrícula";
    }
  }

  checkSiape(){
    this.usuarioService.getUsuarioBySiapePublic(this.aluno.siape)
      .subscribe(
        usuario => 
          {
          if(!this.isUpdate){
              if(usuario == null || typeof usuario == 'undefined'){
                this.matriculaValid = true;
              }else if((usuario.siape == this.usuarioEdit.siape) && (this.isExistAluno)){
                this.matriculaValid = true;
              }else{
                this.matriculaValid = false;
                this.msgViewErro = false;
                this.msgErro = 'Já existe um cadastro para a Matrícula informada!';
                this.msgViewErro = true;
              }              
          }else{
              if(usuario == null || typeof usuario == 'undefined'){
                this.matriculaValid = true;
              }else if((usuario.siape == this.usuarioEdit.siape) && (this.isExistAluno)){
                this.matriculaValid = true;
              }else{
                this.matriculaValid = false;
                this.msgViewErro = false;
                this.msgErro = 'Já existe um cadastro para a Matrícula informada!';
                this.msgViewErro = true;
            }
          }
        }
      )
  }

  confirmPassword() : boolean {
    return this.usuario.senha == this.senhaConfirm;
  }

  hideMsg(){
    this.msgView = false;
    this.msgViewErro = false;
  }

  searchUserByEmail(){
      this.usuarioService.getUsuarioByEmailPublic(this.aluno.email)
        .subscribe(
          result => {
          if(!this.isUpdate){
            if(result == null || typeof result == 'undefined'){
              this.emailValid = true;
            }else{
              this.msgViewErro = false;
              this.msgErro = 'Já existe um cadastro para o E-mail informado!';
              this.msgViewErro = true;
              this.emailValid = false;
            }
          }else{
            if(result == null || typeof result == 'undefined'){
              this.emailValid = true;
            }else if(result.email == this.usuarioEdit.email){
              this.emailValid = true;
            }else{
              this.msgViewErro = false;
              this.msgErro = 'Já existe um cadastro para o E-mail informado!';
              this.msgViewErro = true;
              this.emailValid = false;
            }
          }
        }
      );
  }

  searchUserByNomeUsuario(){
      this.validNomeUsuarioAndSenha();

      if(this.nomeUsuarioValid){
        this.usuarioService.getUsuarioByNomeUsuarioPublic(this.nomeUsuarioEdit)
        .subscribe(
          result => {
          if(!this.isUpdate){
            if(result == null || typeof result == 'undefined'){
              this.nomeUsuarioValid = true;
            }else{
              this.msgViewErro = false;
              this.msgErro = 'Já existe um cadastro para o Nome de Usuário informado!';
              this.msgViewErro = true;
              this.nomeUsuarioValid = false;
            }
          }else{
            if(result == null || typeof result == 'undefined'){
              this.nomeUsuarioValid = true;
            }else if(result.nomeUsuario == this.usuarioEdit.nomeUsuario){
              this.nomeUsuarioValid = true;
            }else{
              this.msgViewErro = false;
              this.msgErro = 'Já existe um cadastro para o Nome de Usuário informado!';
              this.msgViewErro = true;
              this.nomeUsuarioValid = false;
            }
          }
        }
      );
    }
  }

  checkEmail() : boolean{
    let regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if(regexEmail.test(this.aluno.email)){
      this.emailValid = true;
      this.msgViewErro = false;
      this.searchUserByEmail();
    }else{
      this.emailValid = false;
      this.msgViewErro = false;
      this.msgErro = 'Seu e-mail não está com padrão correto! Corrija por favor.';
      this.msgViewErro = true;
    }
    return this.emailValid;
  }

  checkPassword(){
    this.validNomeUsuarioAndSenha();

    if(!(this.confirmPassword())){
      this.msgViewErro = false;
      this.msgErro = 'Senha fornecida não confere!';
      this.msgViewErro = true;
      this.senhaValid = false;
    }else{
      this.senhaValid = true;
      this.msgViewErro = false;
    }
  } 

  setCamposRead(){
    this.cpfReadOnly = true;
  }

  validNomeUsuarioAndSenha(){
    let pattern = /[?!/:'"><|\\*]/g;
    let pattern2 = /[\\]/g;
    let pattern3 = /[/:,;[]/g;
    let pattern4 = /[\]]/g;

    if(pattern.test(this.nomeUsuarioEdit)
        || pattern2.test(this.nomeUsuarioEdit)
        || pattern3.test(this.nomeUsuarioEdit)
        || pattern4.test(this.nomeUsuarioEdit)){
      this.nomeUsuarioValid = false;
    }else{
      this.nomeUsuarioValid = true;
    }

    if(pattern.test(this.usuario.senha)
        || pattern2.test(this.usuario.senha)
        || pattern3.test(this.usuario.senha)
        || pattern4.test(this.usuario.senha)){
      this.senhaValid = false;
    }else{
      this.senhaValid = true;
    }

    if(!this.nomeUsuarioValid || !this.senhaValid){
      this.msgViewErro = false;
      this.msgErro = 'Caracteres Inválidos no Nome de Usuário e/ou na Senha fornecida, por favor altere retirando tais caracteres!';
      this.msgViewErro = true;
    }else{
      this.msgViewErro = false;
    }
  }
}