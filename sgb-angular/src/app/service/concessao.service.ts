import { Injectable } from '@angular/core';
import { API_SGB, getHttpOptions } from '../config/API';
import { Concessao } from '../model/concessao';
import { SessaoService } from './sessao.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ErrorClass } from '../model/error.class';
import { MessageToastrService } from './message-toastr.service';

const URL = API_SGB + "/beneficio/concessao";

@Injectable({
  providedIn: 'root'
})
export class ConcessaoService {

  idTemp : string = "";
  listConcessoesTemp : Concessao[] = [];
  titleToast = 'Concessão';

  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }

  getConcessoes() : Observable<Concessao[]>{
    return this.http.get<Concessao[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getConcessoesById(id : string) : Observable<Concessao>{
    return this.http.get<Concessao>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getConcessoesByCpf(cpf : string) : Observable<Concessao[]>{
    return this.http.get<Concessao[]>(URL + '/search?cpf=' + cpf, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getConcessoesByAlunoId(id) : Observable<Concessao[]>{
    return this.http.get<Concessao[]>(URL + '/aluno?id=' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getAllConcessoesByAlunoId(id) : Observable<Concessao[]>{
    return this.http.get<Concessao[]>(URL + '/by?alunoId=' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getConcessaoByAlunoAndProcesso(aluno, processo) : Observable<Concessao>{
    return this.http.get<Concessao>(URL + '/concessao?aluno=' + aluno + "&processo=" + processo, 
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

  add (concessao : Concessao) : Observable<Concessao>{
    if(this.getConcessoesById(concessao.id) != null){
          return this.http.post<Concessao>(URL, concessao, 
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

  update(concessao : Concessao) : Observable<Concessao> {
    return this.http.put<Concessao>(URL + "/" + concessao.id, concessao, 
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

  delete(concessao : Concessao | string) : Observable<Concessao> {
     return this.http.delete<Concessao>(URL+"/"+concessao, 
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

  carregarLista(lista:Concessao[]){
    this.listConcessoesTemp = lista;
  }

}
