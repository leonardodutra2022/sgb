import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_SGB, getHttpOptions } from '../config/API';
import { Aluno } from '../model/aluno';
import { ErrorClass } from '../model/error.class';
import { FrequenciaRegistro } from '../model/frequencia.registro';
import { Log } from '../model/log';
import { Page } from '../model/pageable/page';
import { PeriodoRegistroFrequencia } from '../model/periodo.registro.frequencia';
import { PeriodoRegistroFrequenciaProjeto } from '../model/periodo.registro.frequencia.projeto';
import { Projeto } from '../model/projeto';
import { LogService } from './log.service';
import { MessageToastrService } from './message-toastr.service';
import { SessaoService } from './sessao.service';

const URL = API_SGB + "/frequencia/registro";

@Injectable({
  providedIn: 'root'
})
export class FrequenciaRegistroService {

  idTemp : string = "";
  // listFrequenciaTemp : FrequenciaRegistro[] = [];
  titleToast = 'Registro de Frequência';

  constructor(private http : HttpClient, 
    private sessaoUsuario : SessaoService,
    private msgService: MessageToastrService,
    private logService: LogService) { }


    getFrequenciasRegistro() : Observable<FrequenciaRegistro[]>{
      return this.http.get<FrequenciaRegistro[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
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

    getFrequenciasRegistroByProjeto(idProjeto) : Observable<FrequenciaRegistro[]>{
      return this.http.get<FrequenciaRegistro[]>(URL + `/projeto/?id=${idProjeto}`, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
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
  
    getFrequenciasRegistroByAluno(alunoId) : Observable<FrequenciaRegistro[]>{
      return this.http.get<FrequenciaRegistro[]>(URL + `/aluno/?id=${alunoId}`, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
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

    existsRegistrosFrequenciaByAlunoAndFrequencia(projeto: Projeto, alunoId) : Observable<boolean>{
      return this.http.get<boolean>(URL + `/exists/?projetoId=${projeto.id}&alunoId=${alunoId}`, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
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
  
    getFrequenciaRegistroById(id : string) : Observable<FrequenciaRegistro>{
      return this.http.get<FrequenciaRegistro>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
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
  
    add (frequencica : FrequenciaRegistro) : Observable<FrequenciaRegistro>{
      if(this.getFrequenciaRegistroById(frequencica.id) != null){
            return this.http.post<FrequenciaRegistro>(URL, 
              frequencica, 
              getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
              .pipe(
                tap(
                  msg => {
                    this.msgService.sucess("c", this.titleToast);
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
    }
  
    update(frequencica : FrequenciaRegistro, assinarTudo: boolean = false) : Observable<FrequenciaRegistro> {
      return this.http.put<FrequenciaRegistro>(URL + "/" + frequencica.id + "?assinarTudo=" + assinarTudo, 
        frequencica, 
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
              this.log(err, "PUT");
            }
          )
       );
    }

    updateAll(mesRef: number, anoRef: number, aluno: Aluno, projeto: Projeto) : Observable<boolean> {
      return this.http.get<boolean>(URL + `/updateAll/?idAluno=${aluno.id}&idProjeto=${projeto.id}&mesRef=${mesRef}&anoRef=${anoRef}`, 
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
              this.log(err, "GET");
            }
          )
       );
    }

    hasPendenciasAssignedResponsavel(mesRef: number, anoRef: number, aluno: Aluno, projeto: Projeto) : Observable<boolean> {
      return this.http.get<boolean>(URL + `/hasRegistroNotAssignedResponsavel/?idAluno=${aluno.id}&idProjeto=${projeto.id}&mesRef=${mesRef}&anoRef=${anoRef}`, 
        getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
        .pipe(
          tap(
            msg => {
            }, err => {
              let erro: ErrorClass = new ErrorClass();
              erro.statusCode = err.status;
              erro.message = err.error.message;
              erro.errors = err.error.errors;
              this.msgService.error(erro);
              this.log(err, "GET");
            }
          )
       );
    }
  
    delete(frequencica : FrequenciaRegistro | string) : Observable<FrequenciaRegistro> {
       return this.http.delete<FrequenciaRegistro>(URL+"/"+frequencica, 
        getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
        .pipe(
          tap(
            msg => {
              this.msgService.sucess("d", this.titleToast);
            }, err => {
              let erro: ErrorClass = new ErrorClass();
              erro.statusCode = err.status;
              erro.message = err.error.message;
              erro.errors = err.error.errors;
              this.msgService.error(erro);
              this.log(err, "DEL");
            }
          )
        );
    }

    findByDataReferencia(dataRef: string) : Observable<FrequenciaRegistro[]> {
      return this.http.get<FrequenciaRegistro[]>(URL + '/frequencia/?dataRef=' + dataRef, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

    findByDataHojeByAlunoAndProjeto(aluno: Aluno, projeto: Projeto, diaRef: number, mesRef: number, anoRef: number) : Observable<FrequenciaRegistro> {
      return this.http.get<FrequenciaRegistro>(URL + `/diarioAluno/?projetoId=${projeto.id}&alunoId=${aluno.id}&diaRef=${diaRef}&mesRef=${mesRef}&anoRef=${anoRef}`, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

    getByMesAtualAndAlunoAndProjeto(mesRef: number, aluno: Aluno, projeto: Projeto, anoRef: number, numPage: number = 0) : Observable<Page<FrequenciaRegistro>> {
      return this.http.get<Page<FrequenciaRegistro>>(URL + `/mesAluno/?projetoId=${projeto.id}&alunoId=${aluno.id}&mesRef=${mesRef}&anoRef=${anoRef}&numPage=${numPage}`, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

    getRegistrosByProjetoAndAluno(projeto: Projeto, idAluno: any): Observable<FrequenciaRegistro[]> {
      return this.http.get<FrequenciaRegistro[]>(URL + `/frequencias/?idProjeto=${projeto.id}&alunoId=${idAluno}`, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

    getRegistrosByProjetoAndAlunoPeriodoRefPageable(projeto: Projeto, idAluno: any, mesRef, anoRef, numPage = 0): Observable<Page<FrequenciaRegistro>> {
      return this.http.get<Page<FrequenciaRegistro>>(URL + `/frequenciasPeriodo/?idProjeto=${projeto.id}&alunoId=${idAluno}&mesRef=${mesRef}&anoRef=${anoRef}&numPage=${numPage}`, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

    getRegistrosByProjetoAndAlunoPeriodoRef(projeto: Projeto, idAluno: any, mesRef, anoRef): Observable<FrequenciaRegistro[]> {
      return this.http.get<FrequenciaRegistro[]>(URL + `/frequenciasPeriodo/?idProjeto=${projeto.id}&alunoId=${idAluno}&mesRef=${mesRef}&anoRef=${anoRef}`, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

    getPeriodosAgrupadosByProjetoAndAluno(projeto: Projeto, idAluno: any): Observable<PeriodoRegistroFrequencia[]> {
      return this.http.get<PeriodoRegistroFrequencia[]>(URL + `/periodos/?projetoId=${projeto.id}&alunoId=${idAluno}`, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

    getPeriodosAgrupadosByProjeto(projeto: Projeto): Observable<PeriodoRegistroFrequenciaProjeto[]> {
      return this.http.get<PeriodoRegistroFrequenciaProjeto[]>(URL + `/periodosProjeto/?projetoId=${projeto.id}`, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

    getPeriodosAgrupadosByProjetos(): Observable<PeriodoRegistroFrequenciaProjeto[]> {
      return this.http.get<PeriodoRegistroFrequenciaProjeto[]>(URL + `/periodosAllProjetos`, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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
