import { Injectable } from '@angular/core';
import { API_SGB, getHttpOptions } from '../config/API';
import { Cronograma } from '../model/cronograma';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { tap } from 'rxjs/operators';
import { ErrorClass } from '../model/error.class';
import { MessageToastrService } from './message-toastr.service';

const URL = API_SGB + "/processo/cronograma";

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {

  idTemp : string = "";
  cronogramasTemp : Cronograma[] = [];
  titleToast = 'Cronograma';

  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }

  getCronogramas() : Observable<Cronograma[]>{
    return this.http.get<Cronograma[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getCronogramaById(id : string) : Observable<Cronograma>{
    return this.http.get<Cronograma>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getCronogramaByProcesso(id : string) : Observable<Cronograma[]>{
    return this.http.get<Cronograma[]>(URL + '/processo?id=' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  add(c : Cronograma) : Observable<Cronograma>{
    return this.http.post<Cronograma>(URL, c, 
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

  update(c : Cronograma) : Observable<Cronograma> {
    return this.http.put<Cronograma>(URL + "/" + c.id, c, 
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

  delete(c : Cronograma | string) : Observable<Cronograma> {
     return this.http.delete<Cronograma>(URL+"/"+c, 
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

  carregarLista(lista:Cronograma[]){
    this.cronogramasTemp = lista;
  }

}
