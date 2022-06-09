import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_SGB, getHttpOptions } from '../config/API';
import { ErrorClass } from '../model/error.class';
import { Periodo } from '../model/periodo';
import { MessageToastrService } from './message-toastr.service';
import { SessaoService } from './sessao.service';

const URL = API_SGB + "/periodo";

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  idTemp : string = "";
  listPeriodosTemp : Periodo[] = [];
  titleToast = 'Período';
 
  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }

  getPeriodos() : Observable<Periodo[]>{
    return this.http.get<Periodo[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getPeriodoById(id : string) : Observable<Periodo>{
    return this.http.get<Periodo>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  searchPeriodos(query) : Observable<Periodo[]>{
    return this.http.get<Periodo[]>(URL + '/?query=' + query, 
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

  add (periodo : Periodo) : Observable<Periodo>{
    if(this.getPeriodoById(periodo.id) != null){
          return this.http.post<Periodo>(URL, periodo, 
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

  update(periodo : Periodo) : Observable<Periodo> {
    return this.http.put<Periodo>(URL + "/" + periodo.id, periodo, 
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

  delete(periodo : Periodo | string) : Observable<Periodo> {
     return this.http.delete<Periodo>(URL+"/"+periodo, 
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

  carregarLista(lista:Periodo[]){
    this.listPeriodosTemp = lista;
  }

}
