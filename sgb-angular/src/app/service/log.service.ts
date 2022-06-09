import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_SGB, getHttpOptions } from '../config/API';
import { ErrorClass } from '../model/error.class';
import { Log } from '../model/log';
import { Page } from '../model/pageable/page';
import { MessageToastrService } from './message-toastr.service';
import { SessaoService } from './sessao.service';

const URL = API_SGB + "/log";

@Injectable({
  providedIn: 'root'
})
export class LogService {

  titleToast = "Logs do Sistema";

  constructor(private http : HttpClient, 
    private sessaoUsuario : SessaoService,
    private msgService: MessageToastrService) { 
  }

  add (log : Log) : Observable<Log>{
      return this.http.post<Log>(URL, log, 
        getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
          .pipe(
            tap(
              msg => {}
          )
      );
  }

  getProjetosPageable(numPage?) : Observable<Page<Log>>{
    return this.http.get<Page<Log>>(URL + `/${numPage ? '?page=' + numPage : ''}`, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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
}
