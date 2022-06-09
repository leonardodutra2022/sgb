import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getHttpOptions, API_SGB } from '../config/API';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { Documentacao } from '../model/documentacao';
import { ErrorClass } from '../model/error.class';
import { MessageToastrService } from './message-toastr.service';

const URL = API_SGB + "/documentacao";

@Injectable({
  providedIn: 'root'
})
export class DocumentacaoService {

  idTemp : string = "";
  listDocsTemp : Documentacao[] = [];
  titleToast = 'Documentação';

  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }

  getDocumentos() : Observable<Documentacao[]>{
    return this.http.get<Documentacao[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getDocumentosAtivos() : Observable<Documentacao[]>{
    return this.http.get<Documentacao[]>(URL + '/ativos', getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getDocumentosAtivosByAuxilio(beneficioId) : Observable<Documentacao[]>{
    return this.http.get<Documentacao[]>(URL + '/getByAuxilio?beneficio=' + beneficioId, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getGruposDocs() : Observable<String[]>{
    return this.http.get<String[]>(URL + '/grupos', getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getDocumentosById(id : string) : Observable<Documentacao>{
    return this.http.get<Documentacao>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getDocumentosByDocTipo() : Observable<Documentacao[]>{
    return this.http.get<Documentacao[]>(URL + '/getByDoc', getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  add (doc : Documentacao) : Observable<Documentacao>{
          return this.http.post<Documentacao>(URL, doc, 
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

  update(doc : Documentacao) : Observable<Documentacao> {
    return this.http.put<Documentacao>(URL + "/" + doc.id, doc, 
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

  delete(usuario : Documentacao | string) : Observable<Documentacao> {
     return this.http.delete<Documentacao>(URL+"/"+usuario, 
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

  carregarLista(lista:Documentacao[]){
    this.listDocsTemp = lista;
  }

}
