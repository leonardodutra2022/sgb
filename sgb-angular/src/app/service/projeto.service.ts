import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_SGB, getHttpOptions } from '../config/API';
import { FilterSearch } from '../interface/filter.search';
import { Aluno } from '../model/aluno';
import { ErrorClass } from '../model/error.class';
import { Log } from '../model/log';
import { Page } from '../model/pageable/page';
import { Projeto } from '../model/projeto';
import { LogService } from './log.service';
import { MessageToastrService } from './message-toastr.service';
import { SessaoService } from './sessao.service';

const URL = API_SGB + "/projeto";

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {


  idTemp : string = "";
  listProjetosTemp : Projeto[] = [];
  titleToast = 'Projeto';

  constructor(private http : HttpClient,
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService,
              private logService: LogService) { }

  getProjetosPageable(numPage?) : Observable<Page<Projeto>>{
    return this.http.get<Page<Projeto>>(URL + `/page${numPage ? '?page=' + numPage : ''}`, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getProjetos() : Observable<Projeto[]>{
    return this.http.get<Projeto[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getProjetoById(id : string) : Observable<Projeto>{
    return this.http.get<Projeto>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  searchProjetos(query) : Observable<Projeto[]>{
    return this.http.get<Projeto[]>(URL + '/?query=' + query,
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

  add (projeto : Projeto) : Observable<Projeto>{
    if(this.getProjetoById(projeto.id) != null){
          return this.http.post<Projeto>(URL, projeto,
            getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
            .pipe(
              tap(
                msg => {
                  this.msgService.sucess("c", this.titleToast);
                }, err => {
                  let erro: ErrorClass = new ErrorClass();
                  erro.statusCode = err.status;
                  erro.recurso = this.titleToast;
                  this.msgService.error(erro);
                  this.log(err, "POST");
                }
              )
          );
      }
  }

  resendMail(project: Projeto):Observable<void> {
    return this.http.post<void>(URL+'/'+project.id+'/email', {},
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("v", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            erro.recurso = this.titleToast;
            this.msgService.error(erro);
            this.log(err, "POST");
          }
        )
    );
  }

  addMultiple(projeto : Projeto, ids: number[]) : Observable<Projeto>{
    if(ids.length > 0){
      return this.http.post<Projeto>(URL + "?alunosIds=" + ids, projeto,
        getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
        .pipe(
          tap(
            msg => {
              this.msgService.sucess("c", this.titleToast);
            }, err => {
              let erro: ErrorClass = new ErrorClass();
              erro.statusCode = err.status;
              this.msgService.error(erro);
              this.log(err, "POST");
            }
          )
      );
    }
  }

  update(projeto : Projeto) : Observable<Projeto> {
    return this.http.put<Projeto>(URL + "/" + projeto.id, projeto,
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

  searchByFilters(filters: FilterSearch) : Observable<Projeto[]>{
    return this.http.get<Projeto[]>(URL + `/searchFilter?projeto=${filters.projetoId}&periodo=${filters.periodoId}&aluno=${filters.alunoId}&responsavel=${filters.responsavelId}`,
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

  getProjetosByResponsavel(siape) : Observable<Projeto[]>{
    return this.http.get<Projeto[]>(URL + `/responsavel/?siape=${siape}`, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getProjetoByAluno(alunoId) : Observable<Projeto[]>{
    return this.http.get<Projeto[]>(URL + `/byAluno/?alunoId=${alunoId}`, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  delete(projeto : Projeto | string) : Observable<Projeto> {
     return this.http.delete<Projeto>(URL+"/"+projeto,
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("d", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            erro.recurso = this.titleToast;
            this.msgService.error(erro);
            this.log(err, "DEL");
          }
        )
      );
  }

  private messages(msg : string){
  }

  carregarLista(lista:Projeto[]){
    this.listProjetosTemp = lista;
  }

  getAlunosByProjeto(projetoId) : Observable<Aluno[]>{
    return this.http.get<Aluno[]>(URL + `/alunosByProjeto?projeto=${projetoId}`,
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
