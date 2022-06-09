import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  constructor(private router : Router) { }

  setUsuarioLogado(usuario : Usuario){
    localStorage.setItem(btoa('usuarioSGB'), btoa(JSON.stringify(usuario)));
  }

  unsetUsuarioLogado(){
    localStorage.removeItem(btoa('usuarioSGB'));
  }

  sessaoAtiva() : boolean {
    if(this.getUsuarioLogado() == null)
      return false;
    else
      return true;
  }

  private getUsuarioStorage(): Usuario {
    let usuarioSessaoStorage = localStorage.getItem(btoa('usuarioSGB'));
    if (usuarioSessaoStorage == null) return null;
    else return JSON.parse(atob(usuarioSessaoStorage));
  }

  getUsuarioLogado(): Usuario {
    let user = this.getUsuarioStorage();
    if (user == null) {
      return null;
    }
    else {
      return user;
    }
  }

  getMatriculaUsuarioLogado() : string{
    let usuarioTemp:Usuario = this.getUsuarioLogado();
    return usuarioTemp.siape;
  }

  getUsuario() : Usuario{
    let usuarioTemp:Usuario = this.getUsuarioLogado();
    return usuarioTemp;;
  }

  verificarPerfil(perfil: string): boolean {
    let i: number;
    let usuarioLogado: Usuario = this.getUsuarioLogado();
    if (usuarioLogado == null) return false;
    let usuarioPerfis: any[] = this.getUsuarioLogado().perfis;
    for (i = 0; i < usuarioPerfis.length; i++)
      if (usuarioPerfis[i].atributo == perfil) return true;
    return false;
  }

  verificarPermissao(permissao: string): boolean {
    let i: number;
    let usuarioTemp: Usuario = this.getUsuarioLogado();
    if (usuarioTemp == null) return false;
    let usuarioPermissoes: string[] = this.getUsuarioLogado().permissoes;
    for (i = 0; i < usuarioPermissoes.length; i++)
      if (usuarioPermissoes[i] == permissao) return true;
    return false;
  }



  toHomePage(){
    this.router.navigate(['/']);
  }

  toDashboard(){
    this.router.navigate(['/dashboard']);
  }

  toHomeAluno(){
    this.router.navigate(['/processos']);
  }

  toPageNotFound(){
    this.router.navigate(['not-found']);
  }

  toPageUnauthorized(){
    this.router.navigate(['unauthorized']);
  }

  goTestPage(){
    this.router.navigate(["api/user"]);
  }
}
