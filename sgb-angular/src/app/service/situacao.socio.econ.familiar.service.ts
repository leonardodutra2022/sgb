import { Injectable } from '@angular/core';
import { API_SGB, getHttpOptions } from '../config/API';
import { SituacaoSocioEconFamiliar } from '../model/situacao.socio.econ.familiar';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { ErrorClass } from '../model/error.class';
import { MessageToastrService } from './message-toastr.service';

const URL = API_SGB + "/aluno/socioeconomico";

@Injectable({
  providedIn: 'root'
})
export class SituacaoSocioEconFamiliarService {

  idTemp : string = "";
  listSocioEconTemp : SituacaoSocioEconFamiliar[] = [];
  titleToast = 'Informações Sócioeconômicas';
  
  constructor(private http: HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }

  ngOnInit(){
    this.carregarListaCompleta();
  }
  
  getSocioEconomicos() : Observable<SituacaoSocioEconFamiliar[]>{
    return this.http.get<SituacaoSocioEconFamiliar[]>(URL, 
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

  getSocioEconById(id : string) : Observable<SituacaoSocioEconFamiliar>{
    return this.http.get<SituacaoSocioEconFamiliar>(URL + '/' + id, 
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

  getSocioEconByAluno(id) : Observable<SituacaoSocioEconFamiliar[]>{
    return this.http.get<SituacaoSocioEconFamiliar[]>(URL + '/search?aluno=' + id, 
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

  add (socioEcon : SituacaoSocioEconFamiliar) : Observable<SituacaoSocioEconFamiliar>{
    // usuario.ativo = true;
    return this.http.post<SituacaoSocioEconFamiliar>(URL, socioEcon, 
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
        }
      )
    );
  }

  update(socioEcon : SituacaoSocioEconFamiliar) : Observable<SituacaoSocioEconFamiliar> {
    return this.http.put<SituacaoSocioEconFamiliar>(URL + "/" + socioEcon.id, socioEcon, 
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

  delete(socioEcon : SituacaoSocioEconFamiliar | string) : Observable<SituacaoSocioEconFamiliar> {
     return this.http.delete<SituacaoSocioEconFamiliar>(URL+"/"+socioEcon, 
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

  carregarLista(lista:SituacaoSocioEconFamiliar[]){
    this.listSocioEconTemp = lista;
  }

  carregarListaCompleta(){
    this.getSocioEconomicos().subscribe(
      listTemp => this.listSocioEconTemp = listTemp
    );
  }

}
