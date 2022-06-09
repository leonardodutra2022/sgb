import { Injectable } from '@angular/core';
import { API_SGB, getHttpOptions, getHttpOptionsDownload } from '../config/API';
import { SessaoService } from './sessao.service';
import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recurso } from '../model/recurso';
import { tap } from 'rxjs/operators';
import { MessageToastrService } from './message-toastr.service';
import { ErrorClass } from '../model/error.class';

const URL_UPLOAD = API_SGB + "/upload";


@Injectable({
  providedIn: 'root'
})
export class ArquivosService {

  titleToast = 'Upload';
  
  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }

  upload(arquivo, inscricao, docTipo, processo){
    return this.http.post(URL_UPLOAD + "?inscricao=" + inscricao + "&docTipo=" + docTipo + 
      "&processo=" + processo, arquivo, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("up", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
          }
        )
      );
  }

  uploadDocProcesso(arquivo, docTipo, processo, descricaoDoc){
    return this.http.post(URL_UPLOAD + "?docTipo=" + docTipo + 
      "&processo=" + processo + "&descricaoDoc=" + descricaoDoc, 
        arquivo, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
        .pipe(
          tap(
            msg => {
              this.msgService.sucess("up", this.titleToast);
            }, err => {
              let erro: ErrorClass = new ErrorClass();
              erro.statusCode = err.status;
              this.msgService.error(erro);
            }
          )
        );
  }

  uploadDocRecurso(arquivo, docTipo, inscricao, descricaoDoc, recurso, processo, fundamentacao){
    return this.http.post(URL_UPLOAD + "/recurso" + "?docTipo=" + docTipo + 
      "&inscricao=" + inscricao + "&descricaoDoc=" + descricaoDoc 
        + "&isRecurso=" + recurso + "&processo=" + processo
        + "&fundamentacao=" + fundamentacao, 
        arquivo, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
        .pipe(
          tap(
            msg => {
              this.msgService.sucess("up", this.titleToast);
            }, err => {
              let erro: ErrorClass = new ErrorClass();
              erro.statusCode = err.status;
              this.msgService.error(erro);
            }
          )
        );
  }

  uploadRecursoCheck(id) : Observable<Recurso> {
      return this.http.get<Recurso>(URL_UPLOAD + "/" + id,
        getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
        .pipe(
          tap(
            msg => {
              this.msgService.sucess("up", this.titleToast);
            }, err => {
              let erro: ErrorClass = new ErrorClass();
              erro.statusCode = err.status;
              this.msgService.error(erro);
            }
          )
        );
  }
}