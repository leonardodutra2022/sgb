import { Injectable } from '@angular/core';
import { API_SGB, getHttpOptions } from '../config/API';
import { DadosAcademicos } from '../model/dados.academicos';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorClass } from '../model/error.class';
import { MessageToastrService } from './message-toastr.service';

const URL = API_SGB + "/aluno/dadosacademicos";

@Injectable({
  providedIn: 'root'
})
export class DadosAcademicosService {

  idTemp : string = "";
  listDadosAcademicosTemp : DadosAcademicos[] = [];
  titleToast = 'Informações Acadêmicas';
  
  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }

  ngOnInit(){
    this.carregarListaCompleta();
  }
  
  getDadosAcademicos() : Observable<DadosAcademicos[]>{
    return this.http.get<DadosAcademicos[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getDadosAcademicosById(id : string) : Observable<DadosAcademicos>{
    return this.http.get<DadosAcademicos>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  getDadosAcademicosByAluno(id : string) : Observable<DadosAcademicos[]>{
    return this.http.get<DadosAcademicos[]>(URL + '/search?aluno=' + id, 
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

  getAllDadosAcademicosByAlunoCpf(cpf : string) : Observable<DadosAcademicos[]>{
    return this.http.get<DadosAcademicos[]>(URL + '/getAllByCpf?cpf=' + cpf, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
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

  add (dadosAcad : DadosAcademicos) : Observable<DadosAcademicos>{
    // usuario.ativo = true;
    return this.http.post<DadosAcademicos>(URL, dadosAcad, 
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

  update(dadosAcad : DadosAcademicos) : Observable<DadosAcademicos> {
    return this.http.put<DadosAcademicos>(URL + "/" + dadosAcad.id, dadosAcad, 
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

  delete(dadosAcad : DadosAcademicos | string) : Observable<DadosAcademicos> {
     return this.http.delete<DadosAcademicos>(URL+"/"+dadosAcad, 
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

  carregarLista(lista:DadosAcademicos[]){
    this.listDadosAcademicosTemp = lista;
  }

  carregarListaCompleta(){
    this.getDadosAcademicos().subscribe(
      listTemp => this.listDadosAcademicosTemp = listTemp
    );
  }
}
