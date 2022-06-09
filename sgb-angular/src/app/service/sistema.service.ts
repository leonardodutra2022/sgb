import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_SGB, API_SGB_PUBLIC, getHttpOptions } from '../config/API';
import { ErrorClass } from '../model/error.class';
import { Log } from '../model/log';
import { Sistema } from '../model/sistema';
import { LogService } from './log.service';
import { MessageToastrService } from './message-toastr.service';
import { SessaoService } from './sessao.service';

const URL = API_SGB_PUBLIC + "/sistema";
const URL_PRIVATE = API_SGB + "/sistema";

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  titleToast = "Sistema";

  constructor(private http : HttpClient, 
    private sessaoUsuario : SessaoService,
    private msgService: MessageToastrService,
    private logService: LogService) { }

  getSisInfo() : Observable<Sistema>{
    return this.http.get<Sistema>(URL)
    .pipe(
      tap(
        msg => {
        }, err => {
          let erro: ErrorClass = new ErrorClass();
          erro.statusCode = err.status;
          this.msgService.error(erro);
        }
      )
    );
  }

  update(sis : Sistema) : Observable<Sistema> {
    return this.http.put<Sistema>(URL_PRIVATE + "/" + sis.id, sis,
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("u", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            erro.recurso = this.titleToast;
            this.msgService.error(erro);
            this.log(err, "PUT");
          }
        )
     );
  }

  getSis() : Observable<Sistema>{
    return this.http.get<Sistema>(URL_PRIVATE, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
    .pipe(
      tap(
        msg => {}
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
