import { Injectable, EventEmitter } from '@angular/core';
import { API_SGB, getHttpOptions, API_SGB_PUBLIC } from '../config/API';
import { SessaoService } from './sessao.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Processos } from '../model/processos';
import { tap } from 'rxjs/operators';
import { MessageToastrService } from './message-toastr.service';
import { ErrorClass } from '../model/error.class';

const URL = API_SGB + "/processo";
const URL_PUBLIC = API_SGB_PUBLIC + "/processo";

@Injectable({
  providedIn: 'root'
})
export class ProcessosService {

  idTemp : string = "";
  listProcessosTemp : Processos[] = [];
  static processoAtual = new Processos();
  titleToast = 'Processo';

  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }

  ngOnInit(){
  }

  getProcessos() : Observable<Processos[]>{
    return this.http.get<Processos[]>(URL_PUBLIC);
  }

  getProcessosAtivosInativos() : Observable<Processos[]> {
    return this.http.get<Processos[]>(URL,getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getProcessosPublicos() : Observable<Processos[]>{
    return this.http.get<Processos[]>(URL_PUBLIC);
  }

  getProcessosById(id : string) : Observable<Processos>{
    return this.http.get<Processos>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getProcessosPublicoById(id : string) : Observable<Processos>{
    return this.http.get<Processos>(URL_PUBLIC + '/' + id);
  }

  add (processo : Processos) : Observable<Processos>{
    if(this.getProcessosById(processo.id) != null){
          return this.http.post<Processos>(URL, processo, 
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

  update(processo : Processos) : Observable<Processos> {
    return this.http.put<Processos>(URL + "/" + processo.id, processo, 
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

  delete(processo : Processos | string) : Observable<Processos> {
     return this.http.delete<Processos>(URL+"/"+processo, 
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

  carregarLista(lista:Processos[]){
    this.listProcessosTemp = lista;
  }
}
