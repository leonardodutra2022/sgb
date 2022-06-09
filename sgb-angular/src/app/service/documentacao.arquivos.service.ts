import { Injectable } from '@angular/core';
import { API_SGB, getHttpOptions, API_SGB_PUBLIC} from '../config/API';
import { DocumentacaoArquivos } from '../model/documentacao.arquivos';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorClass } from '../model/error.class';
import { MessageToastrService } from './message-toastr.service';

const URL = API_SGB + "/documentacao/arquivos";
const URL_PUBLIC = API_SGB_PUBLIC + "/documentacao/arquivos";

@Injectable({
  providedIn: 'root'
})
export class DocumentacaoArquivosService {

  idTemp : string = "";
  listDocsTemp : DocumentacaoArquivos[] = [];
  titleToast = 'Arquivo';

  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }

  getDocumentos() : Observable<DocumentacaoArquivos[]>{
    return this.http.get<DocumentacaoArquivos[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getDocumentosPublico() : Observable<DocumentacaoArquivos[]>{
    return this.http.get<DocumentacaoArquivos[]>(URL_PUBLIC);
  }

  getDocumentosById(id : string) : Observable<DocumentacaoArquivos>{
    return this.http.get<DocumentacaoArquivos>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getDocumentosPublicoById(id : string) : Observable<DocumentacaoArquivos>{
    return this.http.get<DocumentacaoArquivos>(URL_PUBLIC + '/' + id);
  }

  getDocumentosByProcesso(processo) : Observable<DocumentacaoArquivos[]>{
    return this.http.get<DocumentacaoArquivos[]>(URL + '/getDocByProcesso?processo=' + processo, 
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

  getDocumentosPublicoByProcesso(processo) : Observable<DocumentacaoArquivos[]>{
    return this.http.get<DocumentacaoArquivos[]>(URL_PUBLIC + '/getDocByProcesso?processo=' + processo);
  }

  getDocsOficiais() : Observable<DocumentacaoArquivos[]>{
    return this.http.get<DocumentacaoArquivos[]>(URL + '/getDocsOficiais', 
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

  getDocsOficiaisPublico() : Observable<DocumentacaoArquivos[]>{
    return this.http.get<DocumentacaoArquivos[]>(URL_PUBLIC + '/getDocsOficiais');
  }

  getDocsOficiaisByProcesso(processo) : Observable<DocumentacaoArquivos[]>{
    return this.http.get<DocumentacaoArquivos[]>(URL + '/getDocsByProcesso?processo=' + processo, 
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

  getDocsOficiaisPublicoByProcesso(processo) : Observable<DocumentacaoArquivos[]>{
    return this.http.get<DocumentacaoArquivos[]>(URL_PUBLIC + '/getDocsByProcesso?processo=' + processo);
  }

  getArquivoByProcessoAndTipo(id:string, docTipo:string) : Observable<DocumentacaoArquivos[]>{
    return this.http.get<DocumentacaoArquivos[]>(URL + '/search?processoId=' + id + '&docTipo=' + docTipo, 
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

  getArquivoByProcessoAndTipos(id:string): Observable<DocumentacaoArquivos[]> {
    return this.http.get<DocumentacaoArquivos[]>(URL + '/searchByProcesso?processoId=' + id, 
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

  getArquivoPublicoByProcessoAndTipo(id:string, docTipo:string) : Observable<DocumentacaoArquivos[]>{
    return this.http.get<DocumentacaoArquivos[]>(URL_PUBLIC + '/search?processoId=' + id + '&docTipo=' + docTipo);
  }

  getArquivoByInscricaoAndTipo(inscricao, docTipo) : Observable<DocumentacaoArquivos>{
    return this.http.get<DocumentacaoArquivos>(URL + '/?inscricao=' + inscricao + '&docTipo=' + docTipo, 
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

  getArquivoById(id) : Observable<DocumentacaoArquivos>{
    return this.http.get<DocumentacaoArquivos>(URL + '/' + id, 
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

  add(doc : DocumentacaoArquivos) : Observable<DocumentacaoArquivos>{
          return this.http.post<DocumentacaoArquivos>(URL, doc, 
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

  update(doc : DocumentacaoArquivos) : Observable<DocumentacaoArquivos> {
    return this.http.put<DocumentacaoArquivos>(URL + "/" + doc.id, doc, 
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

  delete(id : number | string) : Observable<DocumentacaoArquivos> {
     return this.http.delete<DocumentacaoArquivos>(URL+"/"+id, 
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

  searchByName(name) : Observable<DocumentacaoArquivos[]>{
    return this.http.get<DocumentacaoArquivos[]>(URL + '/searchByName?fileName=' + name, 
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

  private messages(msg : string){
  }

  carregarLista(lista:DocumentacaoArquivos[]){
    this.listDocsTemp = lista;
  }

}
