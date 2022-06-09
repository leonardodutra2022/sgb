import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_SGB, getHttpOptions } from '../config/API';
import { ErrorClass } from '../model/error.class';
import { Log } from '../model/log';
import { LogService } from './log.service';
import { MessageToastrService } from './message-toastr.service';
import { SessaoService } from './sessao.service';

const URL : string = API_SGB + "/assinatura";

@Injectable({
  providedIn: 'root'
})
export class AssinaturaService {

  titleToast = 'Credencias Inválidas';
  titleToast2 = 'Credencias Verificadas';

  constructor(private http : HttpClient, 
    private sessaoUsuario : SessaoService,
    private msgService: MessageToastrService,
    private logService: LogService) { }

  checkCredenciaisCrypto(usuario: string, senha: string) : Observable<boolean>{
    return this.http.get<boolean>(URL + `/check/credenciais/?u=${usuario}&p=${senha}`, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
    .pipe(
      tap(
        msg => {
          this.msgService.sucess("v", this.titleToast2);
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

  
  checkCredenciais(usuario: string, senha: string) : Observable<boolean>{
    return this.http.get<boolean>(URL + `/check/?u=${usuario}&p=${senha}`, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
    .pipe(
      tap(
        msg => {
          this.msgService.sucess("v", this.titleToast2);
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
