import { Injectable } from '@angular/core';
import { Aluno } from '../model/aluno';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { Observable, pipe } from 'rxjs';
import { getHttpOptions, API_SGB, API_SGB_PUBLIC } from '../config/API';
import { tap } from 'rxjs/operators';
import { ErrorClass } from '../model/error.class';
import { MessageToastrService } from './message-toastr.service';
import { LogService } from './log.service';
import { Log } from '../model/log';

const URL = API_SGB + "/aluno";
const URL_PUBLIC = API_SGB_PUBLIC + "/aluno";

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  idTemp : string = "";
  searchSiape: Aluno;
  listAlunosTemp : Aluno[] = [];
  titleToast = 'Aluno';
  
  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService,
              private logService: LogService) { }
  
  ngOnInit(){
    this.carregarListaCompleta();
  } 

  getAlunos() : Observable<Aluno[]>{
    return this.http.get<Aluno[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getAlunosGeral() : Observable<Aluno[]>{
    return this.http.get<Aluno[]>(URL + "/type?geral=true", getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getAlunosById(id : string) : Observable<Aluno>{
    if(id != null || id != undefined || id != '')
      return this.http.get<Aluno>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getAlunoByCpfPublic(cpf : string) : Observable<Aluno>{
    if(cpf != null || cpf != undefined || cpf != '')
      return this.http.get<Aluno>(URL_PUBLIC + '/search?cpf=' + cpf);
  }

  getAlunoByMatricula(matricula : string) : Observable<Aluno>{
    return this.http.get<Aluno>(URL + '/search?matricula=' + matricula, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getAlunoByCpf(cpf : string) : Observable<Aluno>{
    return this.http.get<Aluno>(URL + '/getByCpf?cpf=' + cpf, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  searchAlunoByEmail(email) : boolean{
    for(let lu of this.listAlunosTemp){
      if(lu.email == email){
        return true;
      }else{
        return false;
      }
    }
  }

  searchAlunoBySiape(siape) : boolean{
      for(let lu of this.listAlunosTemp){
        if(lu.siape == siape){
          return true;
        }else{
          return false;
        }
      }
  }

  add (aluno : Aluno) : Observable<Aluno>{
    // aluno.ativo = true;
    
    if(this.searchAlunoBySiape(aluno.siape) || 
        this.searchAlunoByEmail(aluno.email)){
            
          return this.http.post<Aluno>(URL, aluno, 
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

  addAluno(aluno : Aluno) : Observable<Aluno>{
    return this.http.post<Aluno>(URL, aluno, 
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
        )
  }

  addPublic (aluno : Aluno) : Observable<Aluno>{
      return this.http.post<Aluno>(URL_PUBLIC, aluno);
  }

  addTemp (aluno : Aluno) : Observable<Aluno>{
    return this.http.post<Aluno>(URL, aluno, 
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

  updatePublic(aluno : Aluno) : Observable<Aluno> {
    return this.http.put<Aluno>(URL_PUBLIC + "/" + aluno.id, aluno)
    .pipe(
      tap(
        msg => {
          this.msgService.sucess("u", this.titleToast);
        }, err => {
          let erro: ErrorClass = new ErrorClass();
          erro.statusCode = err.status;
          this.msgService.error(erro);
          this.log(err, "PUT");
        }
      )
   );
  }

  update(aluno : Aluno) : Observable<Aluno> {
    return this.http.put<Aluno>(URL + "/" + aluno.id, aluno, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("u", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
            this.log(err, "PUT");
          }
        )
     );
  }

  delete(aluno : Aluno | string) : Observable<Aluno> {
     return this.http.delete<Aluno>(URL+"/"+aluno, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("d", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
            this.log(err, "DEL");
          }
        )
      );
  }

  private messages(msg : string){
  }

  carregarLista(lista:Aluno[]){
    this.listAlunosTemp = lista;
  }

  carregarListaCompleta(){
    this.getAlunos().subscribe(
      listTemp => this.listAlunosTemp = listTemp
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
