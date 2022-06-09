import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_SGB, getHttpOptions } from '../config/API';
import { ErrorClass } from '../model/error.class';
import { ExportAluno } from '../model/export.aluno';
import { Projeto } from '../model/projeto';
import { MessageToastrService } from './message-toastr.service';
import { SessaoService } from './sessao.service';

const URL = API_SGB + "/frequencia";

@Injectable({
  providedIn: 'root'
})
export class FrequenciaService {

  idTemp : string = "";
  titleToast = 'Frequência';

  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }

  verifyRubricas(projeto: Projeto, usuarioAlunoId): Observable<boolean>{
    return this.http.get<boolean>(URL + `/verifyRubricas/?projetoId=${projeto.id}&alunoId=${usuarioAlunoId}`, 
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

  validarPDF(projeto: Projeto, alunoId, periodoRef): Observable<boolean>{
    return this.http.get<boolean>(URL + `/pdf/validar/?projetoId=${projeto.id}&alunoId=${alunoId}&periodoRef=${periodoRef}`, 
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

  pdfListaExport(opcao: any): Observable<ExportAluno>{
    return this.http.get<ExportAluno>(URL + `/pdf/listaExport/?opcao=${opcao == 'all' ? opcao : opcao.periodoRef}`, 
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

  getFrequenciaPDF(projeto: Projeto, idAluno, mesRef: number, anoRef: number) : Observable<any[]>{
    return this.http.get<any[]>(URL + `/pdf/?projetoId=${projeto.id}&aluno=${idAluno}&mesRef=${mesRef}&anoRef=${anoRef}`, 
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

  getBlocoAssPDF(projeto: Projeto, idAluno, periodoRef) : Observable<any[]>{
    return this.http.get<any[]>(URL + `/pdf/ass/?projetoId=${projeto.id}&aluno=${idAluno}&periodoRef=${periodoRef}`, 
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

}
