import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_SGB, getHttpOptions, API_SGB_PUBLIC } from '../config/API';
import { Usuario } from '../model/usuario';
import { SessaoService } from './sessao.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageToastrService } from './message-toastr.service';
import { ErrorClass } from '../model/error.class';
import { LogService } from './log.service';
import { Log } from '../model/log';

interface CredenciaisRandom {
  usuario: string;
  pass: string;
}

const URL = API_SGB + "/user";
const URL_PUBLIC = API_SGB_PUBLIC + "/usuario";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{


  idTemp : string = "";
  searchSiape: Usuario;
  listUsuariosTemp : Usuario[] = [];
  titleToast = "Usuário";
  titleUpdate = "Atualização de Informações de Sessão";
 
  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService,
              private logService: LogService) { 
  }

  ngOnInit(){
    this.carregarListaCompleta();
  }

  getUsuarios() : Observable<Usuario[]>{
    return this.http.get<Usuario[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
    .pipe(
      tap(
        msg => {
        }, err => {
          let erro: ErrorClass = new ErrorClass();
          erro.statusCode = err.status;
          erro.recurso = this.titleToast;
          this.msgService.error(erro);
          this.log(err, "GET");
        }
      )
    );
  }

  getUsuariosResponsaveis() : Observable<Usuario[]>{
    return this.http.get<Usuario[]>(URL + '/responsaveis', getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
    .pipe(
      tap(
        msg => {
        }, err => {
          let erro: ErrorClass = new ErrorClass();
          erro.statusCode = err.status;
          erro.recurso = this.titleToast;
          this.msgService.error(erro);
          this.log(err, "GET");
        }
      )
    );
  }

  getUsuariosById(id : string) : Observable<Usuario>{
    return this.http.get<Usuario>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
    .pipe(
      tap(
        msg => {
        }, err => {
          let erro: ErrorClass = new ErrorClass();
          erro.statusCode = err.status;
          erro.recurso = this.titleToast;
          this.msgService.error(erro);
          this.log(err, "GET");
        }
      )
    );
  }

  getUsuarioById(id : string) : Observable<Usuario>{
    return this.http.get<Usuario>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
    .pipe(
      tap(
        msg => {
        }, err => {
          let erro: ErrorClass = new ErrorClass();
          erro.statusCode = err.status;
          erro.recurso = this.titleToast;
          this.msgService.error(erro);
          this.log(err, "GET");
        }
      )
    );
  }

  getUsuarioBySiape(matricula : string) : Observable<Usuario>{
    return this.http.get<Usuario>(URL + '/getByMatricula?matricula=' + matricula, 
        getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
        .pipe(
          tap(
            msg => {
            }, err => {
              let erro: ErrorClass = new ErrorClass();
              erro.statusCode = err.status;
              erro.recurso = this.titleToast;
              this.msgService.error(erro);
              this.log(err, "GET");
            }
          )
        );
  }

  getUsuarioBySiapePublic(matricula : number) : Observable<Usuario>{
    return this.http.get<Usuario>(URL_PUBLIC + '/getByMatricula?matricula=' + matricula);
  }

  getUsuarioByEmailPublic(email : string) : Observable<Usuario>{
    return this.http.get<Usuario>(URL_PUBLIC + '/getByEmail?email=' + email);
  }

  recoverEmailPublic(email : string) : Observable<Usuario>{
    return this.http.get<Usuario>(URL_PUBLIC + '/recover?email=' + email);
  }

  getUsuarioByEmail(email : string) : Observable<Usuario>{
    return this.http.get<Usuario>(URL + '/getByEmail?email=' + email,  
        getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
        .pipe(
          tap(
            msg => {
            }, err => {
              let erro: ErrorClass = new ErrorClass();
              erro.statusCode = err.status;
              erro.recurso = this.titleToast;
              this.msgService.error(erro);
              this.log(err, "GET");
            }
          )
        );
  }

  getUsuarioByNomeUsuarioPublic(nomeUsuario : string) : Observable<Usuario>{
    return this.http.get<Usuario>(URL_PUBLIC + '/getByNomeUsuario?nomeUsuario=' + nomeUsuario);
  }

  searchUserByEmail(email) : boolean{
    for(let lu of this.listUsuariosTemp){
      if(lu.email == email){
        return true;
      }else{
        return false;
      }
    }
  }

  searchUserBySiape(siape) : boolean{
      for(let lu of this.listUsuariosTemp){
        if(lu.siape == siape){
          return true;
        }else{
          return false;
        }
      }
  }

  searchUserByNomeUsuario(nome) : boolean{
    for(let lu of this.listUsuariosTemp){
      if(lu.nomeUsuario == nome){
        return true;
      }else{
        return false;
      }
    }
  }

  add (usuario : Usuario) : Observable<Usuario>{
    usuario.ativo = true;
      return this.http.post<Usuario>(URL, usuario, 
        getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
          .pipe(
            tap(
              msg => {
                this.msgService.sucess("c", this.titleToast);
              }, err => {
                let erro: ErrorClass = new ErrorClass();
                erro.statusCode = err.status;
                this.msgService.error(erro);
                this.log(err, "POST");
              }
          )
      );
  }

  addPublic(usuario : Usuario) : Observable<Usuario>{
      return this.http.post<Usuario>(URL_PUBLIC, usuario)
        .pipe(
          tap(
            msg => {
              this.msgService.sucess("c", this.titleToast);
            }, err => {
              let erro: ErrorClass = new ErrorClass();
              erro.statusCode = err.status;
              this.msgService.error(erro);
              this.log(err, "POST");
            }
          )
        );
  }

  updatePublic(usuario : Usuario) : Observable<Usuario> {
    return this.http.put<Usuario>(URL_PUBLIC + "/" + usuario.id, usuario)
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("u", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
            this.log(err, "PUT");
          }
        )
     );
  }

  update(usuario : Usuario) : Observable<Usuario> {
    return this.http.put<Usuario>(URL + "/" + usuario.id, usuario, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("u", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
            this.log(err, "PUT");
          }
        )
      );
  }

  updateMatricula(usuario, matriculaNova){
    return this.http.get<Usuario>(URL + "/matricula?idUsuario=" + usuario.id + "&matricula=" + matriculaNova, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("u", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
            this.log(err, "GET");
          }
        )
      );
  }

  updateDados(usuario: Usuario){
    return this.http.get<Usuario>(URL + "/updateDados?idUsuario=" + usuario.id + "&matricula=" + usuario.siape
      + "&email=" + usuario.email + "&telefone="+ usuario.telefoneResponsavel + "&curso=" + usuario.cursoResponsavel
      + "&nome=" + usuario.nomeCompleto, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("u", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
            this.log(err, "GET");
          }
        )
      );
  }

  updateVersion(idUsuario: any, versionRecent: any) {
    return this.http.get<Usuario>(URL + "/versionUpdate?idUsuario=" + idUsuario + "&versionRecent=" + versionRecent, 
    getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
    .pipe(
      tap(
        msg => {
          this.msgService.sucess("u", this.titleUpdate);
        }, err => {
          let erro: ErrorClass = new ErrorClass();
          erro.statusCode = err.status;
          this.msgService.error(erro);
          this.log(err, "GET");
        }
      )
    );
  }

  delete(usuario : Usuario | string) : Observable<Usuario> {
     return this.http.delete<Usuario>(URL+"/"+usuario, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("d", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
            this.log(err, "DEL");
          }
        )
      );
  }

  private messages(msg : string){
  }

  testeA():boolean {
    return true;
  }

  carregarListaCompleta(){
    this.getUsuarios().subscribe(
      listTemp => this.listUsuariosTemp = listTemp
    );

  }

  carregarLista(lista:Usuario[]){
    this.listUsuariosTemp = lista;
  }

  gerarCredenciaisRandom(prefix: string): any{
    let lenghtUsuario = 20;
    let lenghtPass = 20;
    let maxSring= 36;

    let usuarioRandom = Math.random().toString(maxSring).substr(1, lenghtUsuario);
    let passRandom = Math.random().toString(maxSring).substr(1, lenghtPass);

    let usuario = `${prefix}_${usuarioRandom}`;
    let pass =  `${passRandom}`;
    
    let res: CredenciaisRandom = {usuario: usuario, pass: pass}

    return res;

  }

  log(err, metodo){
    let log = new Log();
    log.errorMessage = err.message;
    log.statusCode = err.status;
    log.metodo = metodo;
    log.idUsuario = this.sessaoUsuario.getUsuarioLogado().id;
    this.logService.add(log)
    .subscribe(
      res => {}
    );
  }

}
