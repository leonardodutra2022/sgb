import { Injectable } from '@angular/core';
import { API_SGB, getHttpOptions } from '../config/API';
import { Logradouro } from '../model/logradouro';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorClass } from '../model/error.class';
import { MessageToastrService } from './message-toastr.service';

const URL = API_SGB + "/logradouro";

@Injectable({
  providedIn: 'root'
})
export class LogradouroService {

  idTemp : string = "";
  listLogradourosTemp : Logradouro[] = [];
  titleToast = 'Endereço';

  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }

  ngOnInit(){
  }

  getLogradouros() : Observable<Logradouro[]>{
    return this.http.get<Logradouro[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
    .pipe(
      tap(
        msg => {
        }, err => {
          let erro: ErrorClass = new ErrorClass();
          erro.statusCode = err.status;
          erro.recurso = this.titleToast;
          this.msgService.error(erro);
        }
      )
    );
  }

  getLogradouroById(id : string) : Observable<Logradouro>{
    if(id != null || id != undefined || id != '')
      return this.http.get<Logradouro>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            erro.recurso = this.titleToast;
            this.msgService.error(erro);
          }
        )
      );
  }

  add (logradouro : Logradouro) : Observable<Logradouro>{
    if(this.getLogradouroById(logradouro.id) != null){
          return this.http.post<Logradouro>(URL, logradouro, 
            getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
            .pipe(
              tap(
                msg => {
                  this.msgService.sucess("c", this.titleToast);
                }, err => {
                  let erro: ErrorClass = new ErrorClass();
                  erro.statusCode = err.status;
                  this.msgService.error(erro);
                }
              )
          );
          
    }
  }

  update(logradouro : Logradouro) : Observable<Logradouro> {
    return this.http.put<Logradouro>(URL + "/" + logradouro.id, logradouro, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("u", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
          }
        )
     );
  }

  delete(logradouro : Logradouro | string) : Observable<Logradouro> {
     return this.http.delete<Logradouro>(URL+"/"+logradouro, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("d", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
          }
        )
      );
  }

  private messages(msg : string){
  }

  carregarLista(lista:Logradouro[]){
    this.listLogradourosTemp = lista;
  }
}
