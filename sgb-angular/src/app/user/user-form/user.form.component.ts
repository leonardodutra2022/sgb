import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router } from '@angular/router/';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from 'src/app/cadastro/error-modal/error-modal.component';
import { SucessoModalComponent } from 'src/app/cadastro/sucesso-modal/sucesso-modal.component';
import { SessaoService } from 'src/app/service/sessao.service';

export interface PerfisUsuario {
  valuePerfil: string;
  perfil: string;
}

export interface Sexo {
  value: string;
  genero: string;
}

export interface PapelUsuario {
  value: string;
  papel: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user.form.component.html',
  styleUrls: ['./user.form.component.scss']
})
export class UserFormComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarioEdit : Usuario = new Usuario();
  idTemp : string = '';
  nomeUsuarioEdit : string = '';
  perfis: PerfilTemporario[] = [];
  selecaoPerfil = '';
  selecaoSexo = '';
  listaUsuarios : Usuario[] = [];
  msgView : boolean = false;
  emailValid : boolean = false;
  nomeUsuarioValid : boolean = false;
  matriculaValid : boolean = false;
  msgErro = '';

  perfilsList : PerfisUsuario[] = [
    {valuePerfil: 'Membro', perfil: 'Membro da Comissão'},
    {valuePerfil: 'Administrador', perfil: 'Administrador'}
  ];

  listSexo : Sexo[] = [
    {value: "1", genero: 'Masculino'},
    {value: "0", genero: 'Feminino'}
  ];


  constructor(private rotas : ActivatedRoute, 
    private router: Router, private sessaoService : SessaoService,
    private usuarioService : UserService,
    private dialog : MatDialog) { }

  ngOnInit() {
    this.carregarUsuario();
    this.carregarLista();
  }

  openErrorDialog() {
    const dialogRef = this.dialog.open(ErrorModalComponent);
    dialogRef.afterClosed().subscribe(
      result => {
       if(result == true){
       }
    });
  }

  openSucessoDialog() {
    const dialogRef = this.dialog.open(SucessoModalComponent);
    dialogRef.afterClosed().subscribe(
      result => {
       if(result==true){
         this.retonar();
       }
    });
  } 

  carregarLista(){
    this.usuarioService.getUsuarios().subscribe(
      lista => 
        {
          this.listaUsuarios = lista;
        }
    );
  }

  
  searchUserByEmail(){
    this.usuarioService.getUsuarioByEmail(this.usuario.email)
    .subscribe(
      result => {
      if(this.idTemp == null){
        if(result == null || typeof result == 'undefined'){
          this.emailValid = true;
        }else{
          this.msgView = false;
          this.msgErro = 'Já existe um cadastro para o E-mail informado!';
          this.msgView = true;
          this.emailValid = false;
        }
      }else{
        if(result == null || typeof result == 'undefined'){
          this.emailValid = true;
        }else if(result.email == this.usuarioEdit.email){
          this.emailValid = true;
        }else{
          this.msgView = false;
          this.msgErro = 'Já existe um cadastro para o E-mail informado!';
          this.msgView = true;
          this.emailValid = false;
        }
      }
    }
  );
  }

  searchUserBySiape(){
    this.usuarioService.getUsuarioBySiape(this.usuario.siape)
      .subscribe(
        usuario => 
          {
          if(this.idTemp == null){
              if(usuario == null || typeof usuario == 'undefined'){
                this.matriculaValid = true;
              }else{
                this.matriculaValid = false;
                this.msgView = false;
                this.msgErro = 'Já existe um cadastro para a Matrícula informada!';
                this.msgView = true;
              }              
          }else{
                if(usuario == null || typeof usuario == 'undefined'){
                  this.matriculaValid = true;
                }else if(usuario.siape == this.usuarioEdit.siape){
                  this.matriculaValid = true;
                }else{
                  this.matriculaValid = false;
                  this.msgView = false;
                  this.msgErro = 'Já existe um cadastro para a Matrícula informada!';
                  this.msgView = true;
            }
          }
        }
      )
  }

  searchUserByNomeUsuario(){
      this.usuarioService.getUsuarioByNomeUsuarioPublic(this.nomeUsuarioEdit)
        .subscribe(
          result => {
          if(this.idTemp == null){
            if(result == null || typeof result == 'undefined'){
              this.nomeUsuarioValid = true;
            }else{
              this.msgView = false;
              this.msgErro = 'Já existe um cadastro para o Nome de Usuário informado!';
              this.msgView = true;
              this.nomeUsuarioValid = false;
            }
          }else{
            if(result == null || typeof result == 'undefined'){
              this.nomeUsuarioValid = true;
            }else if(result.nomeUsuario == this.usuarioEdit.nomeUsuario){
              this.nomeUsuarioValid = true;
            }else{
              this.msgView = false;
              this.msgErro = 'Já existe um cadastro para o Nome de Usuário informado!';
              this.msgView = true;
              this.nomeUsuarioValid = false;
            }
          }
        }
      );
  }

  add(){
    this.usuario.sexo = this.selecaoSexo;
    this.usuario.papel = this.selecaoPerfil;
    this.usuario.nomeUsuario = this.nomeUsuarioEdit;

    this.usuarioService.add(this.usuario).subscribe(
      _ => 
        {
          this.openSucessoDialog();
        }
      );
  }

  checkEmail() : boolean{
    let regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if(regexEmail.test(this.usuario.email)){
      this.emailValid = true;
      this.msgView = false;
    }else{
      this.emailValid = false;
      this.msgView = false;
      this.msgErro = 'Seu e-mail não está com padrão correto! Corrija por favor.';
      this.msgView = true;
    }
    return this.emailValid;
  }

  carregarUsuario() {
    this.idTemp = this.rotas.snapshot.paramMap.get('id');
    if (this.idTemp != null) {
      this.usuarioService.getUsuariosById(this.idTemp)
        .subscribe(usuario => {
          this.usuario = usuario;
          this.selecaoPerfil = this.usuario.papel;
          this.selecaoSexo = this.usuario.sexo;
        });
    }
  }

  retonar(){
    this.router.navigate(['/users']);
  }

  save() {
    let usuarioTemp : Usuario = new Usuario();
    usuarioTemp.sexo = this.selecaoSexo;
    usuarioTemp.papel = this.selecaoPerfil;
    usuarioTemp.nomeUsuario = this.nomeUsuarioEdit;
    usuarioTemp.nomeCompleto = this.usuario.nomeCompleto;
    usuarioTemp.senha = this.usuario.senha;
    usuarioTemp.email = this.usuario.email;
    usuarioTemp.id = this.usuario.id;
    usuarioTemp.siape = this.usuario.siape;

    this.usuarioService.update(usuarioTemp)
      .subscribe(_ => this.retonar());
  }

  verificarPerfis(): boolean {
    this.usuario.perfis = [];
    for (let k of this.perfis) {
      if (k.checked) this.usuario.perfis.push(k.atributo);
    }
    if (this.usuario.perfis.length < 1) return false;
    return true;
  }

  hideMsg(){
    this.msgView = false;
  }
}




class PerfilTemporario {
  nome: string;
  atributo: string;
  checked: boolean;
}
