import { Injectable } from '@angular/core';
import { Banco } from '../model/banco';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { getHttpOptions, API_SGB } from '../config/API';
import { Observable } from 'rxjs';
import { ErrorClass } from '../model/error.class';
import { MessageToastrService } from './message-toastr.service';
import { tap } from 'rxjs/operators';

const URL = API_SGB + "/banco";

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  listBancosTemp : Banco[] = [];
  titleToast = 'Banco';

  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }

  ngOnInit(){
  }

  getBancos() : Observable<Banco[]>{
    return this.http.get<Banco[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getBancoById(id : string) : Observable<Banco>{
    return this.http.get<Banco>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getBancoByCod(cod : string) : Observable<Banco>{
    return this.http.get<Banco>(URL + '/search?cod=' + cod, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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