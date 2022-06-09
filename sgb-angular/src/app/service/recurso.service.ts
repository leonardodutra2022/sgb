import { Injectable } from '@angular/core';
import { API_SGB, getHttpOptions } from '../config/API';
import { Recurso } from '../model/recurso';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorClass } from '../model/error.class';
import { MessageToastrService } from './message-toastr.service';

const URL = API_SGB + "/inscricao/recurso";

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  idTemp : string = "";
  listRecursosTemp : Recurso[] = [];
  titleToast = 'Recurso';

  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }

  ngOnInit(){
  }

  getRecursos() : Observable<Recurso[]>{
    return this.http.get<Recurso[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getRecursosById(id : string) : Observable<Recurso>{
    return this.http.get<Recurso>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getRecursosByInscricao(id){
    return this.http.get<Recurso[]>(URL + '/searchByInscricao?inscricao=' + id, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getRecursosByProcesso(id) : Observable<Recurso[]>{
    return this.http.get<Recurso[]>(URL + '/processo?id=' + id, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  add (recurso : Recurso) : Observable<Recurso>{
    if(this.getRecursosById(recurso.id) != null){
          return this.http.post<Recurso>(URL, recurso, 
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

  update(recurso : Recurso) : Observable<Recurso> {
    return this.http.put<Recurso>(URL + "/" + recurso.id, recurso, 
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

  delete(recurso : Recurso | string) : Observable<Recurso> {
     return this.http.delete<Recurso>(URL+"/"+recurso, 
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

  carregarLista(lista:Recurso[]){
    this.listRecursosTemp = lista;
  }

}
