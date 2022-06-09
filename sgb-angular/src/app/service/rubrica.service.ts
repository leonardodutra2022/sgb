import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_SGB, getHttpOptions } from '../config/API';
import { ErrorClass } from '../model/error.class';
import { Log } from '../model/log';
import { Rubrica } from '../model/rubrica';
import { LogService } from './log.service';
import { MessageToastrService } from './message-toastr.service';
import { SessaoService } from './sessao.service';

const URL : string = API_SGB + "/rubrica";

@Injectable({
  providedIn: 'root'
})
export class RubricaService {

  titleToast = 'Rúbrica';
  titleToast2 = 'Rubrica';

  constructor(private http : HttpClient, 
    private sessaoUsuario : SessaoService,
    private msgService: MessageToastrService,
    private logService: LogService) { }

  add(rub : Rubrica) : Observable<Rubrica> {
      return this.http.post<Rubrica>(URL, rub, 
        getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
        .pipe(
          tap(
            msg => {
              this.msgService.sucess("u", this.titleToast);
            }, err => {
              let erro: ErrorClass = new ErrorClass();
              erro.statusCode = err.status;
              erro.message = err.error.message;
              erro.errors = err.error.errors;
              this.msgService.error(erro);
              this.log(err, "POST");
            }
          )
       );
  }

  getRubrica(idUsuario : string) : Observable<Rubrica>{
    return this.http.get<Rubrica>(URL + '/' + idUsuario, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
    .pipe(
      tap(
        msg => {
        }, err => {
          let erro: ErrorClass = new ErrorClass();
          erro.statusCode = err.status;
          erro.message = err.error.message;
          erro.errors = err.error.errors;
          erro.recurso = this.titleToast;
          this.msgService.error(erro);
          this.log(err, "GET");
        }
      )
    );
  }

  getRubricaByAluno(idAluno : string) : Observable<Rubrica>{
    return this.http.get<Rubrica>(URL + '/?alunoId=' + idAluno, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
    .pipe(
      tap(
        msg => {
        }, err => {
          let erro: ErrorClass = new ErrorClass();
          erro.statusCode = err.status;
          erro.message = err.error.message;
          erro.errors = err.error.errors;
          erro.recurso = this.titleToast;
          this.msgService.error(erro);
          this.log(err, "GET");
        }
      )
    );
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
