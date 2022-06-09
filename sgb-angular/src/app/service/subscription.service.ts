import { Injectable } from '@angular/core';
import { API_SGB, getHttpOptions } from '../config/API';
import { Subscription } from '../model/subscription';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { tap } from 'rxjs/operators';
import { InscricaoDTO } from '../model/inscricaoDTO';
import { MessageToastrService } from './message-toastr.service';
import { ErrorClass } from '../model/error.class';

const URL = API_SGB + "/inscricao";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  idTemp : string = "";
  listInscricoesTemp : Subscription[] = [];
  static inscricaoAtual : Subscription = new Subscription();
  titleToast = "Inscrição";
  
  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }
  
  ngOnInit(){
    this.carregarListaCompleta();
  }

  getInscricoes() : Observable<Subscription[]>{
    return this.http.get<Subscription[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getInscricoesById(id : string) : Observable<Subscription>{
    return this.http.get<Subscription>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  add (inscricao : Subscription) : Observable<Subscription>{
    // usuario.ativo = true;
    return this.http.post<Subscription>(URL, inscricao, 
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

  update(inscricao : Subscription) : Observable<Subscription> {
    return this.http.put<Subscription>(URL + "/" + inscricao.id, inscricao, 
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

  delete(inscricao : Subscription | string) : Observable<Subscription> {
     return this.http.delete<Subscription>(URL+"/"+inscricao, 
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

  carregarLista(lista:Subscription[]){
    this.listInscricoesTemp = lista;
  }

  carregarListaCompleta(){
    this.getInscricoes().subscribe(
      listTemp => this.listInscricoesTemp = listTemp
    );

  }

  getInscricaoByProcessoAndMatriculaAluno(processoId, matricula){
    return this.http.get<Subscription>(URL + '/searchByProcesso?processo=' + processoId + 
      '&matricula=' + matricula, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getInscricoesCustomByProcesso(id) : Observable<InscricaoDTO[]>{
    return this.http.get<InscricaoDTO[]>(URL + '/custom?id=' + id, 
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

  getInscricoesByProcesso(id) : Observable<Subscription[]>{
    return this.http.get<Subscription[]>(URL + '/processo?id=' + id, 
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

  getInscricoesAtivasByAluno(alunoId) : Observable<Subscription[]>{
    return this.http.get<Subscription[]>(URL + '/aluno?id=' + alunoId, 
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

  getInscricoesByAluno(alunoId){
    return this.http.get<Subscription[]>(URL + '/searchByAluno?aluno=' + alunoId, 
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

  checkAbble(validade : number, siape : number) : Observable<Boolean>{
    return this.http.get<Boolean>(URL + '/abble?siape=' + siape + '&validade=' + validade, 
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

}
