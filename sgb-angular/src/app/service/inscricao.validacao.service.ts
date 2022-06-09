import { Injectable, EventEmitter } from '@angular/core';
import { API_SGB, getHttpOptions } from '../config/API';
import { InscricaoValidacao } from '../model/inscricao.validacao';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

const URL = API_SGB + "/inscricao/validacao";

@Injectable({
  providedIn: 'root'
})
export class InscricaoValidacaoService {

  idTemp : string = "";
  inscricaoValidacao : InscricaoValidacao = new InscricaoValidacao();
  public stepSaude : Subject<boolean> = new Subject<boolean>();
  public stepDadosPessoais : Subject<boolean> = new Subject<boolean>();
  public stepContatos : Subject<boolean> = new Subject<boolean>();
  public stepMoradia : Subject<boolean> = new Subject<boolean>();
  public stepSocio : Subject<boolean> = new Subject<boolean>();
  public stepFinancas : Subject<boolean> = new Subject<boolean>();
  public stepAuxilios : Subject<boolean> = new Subject<boolean>();
  public stepAcad : Subject<boolean> = new Subject<boolean>();
  reload$ = new EventEmitter<boolean>(false);

  constructor(private http : HttpClient, private sessaoUsuario : SessaoService) { }

  ngOnInit(){
  }

  getInscricoesValidadas() : Observable<InscricaoValidacao[]>{
    return this.http.get<InscricaoValidacao[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getInscricaoValidacaoById(id : string) : Observable<InscricaoValidacao>{
    return this.http.get<InscricaoValidacao>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getInscricaoValidacaoByInscricao(inscricao){
    return this.http.get<InscricaoValidacao>(URL + '/search?idInscricao=' + inscricao, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  add (iValida : InscricaoValidacao) : Observable<InscricaoValidacao>{
    if(typeof iValida !== null && typeof iValida !== 'undefined' && iValida.id !== ''){
          return this.http.post<InscricaoValidacao>(URL, iValida, 
            getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
          
    }
  }

  update(iValida : InscricaoValidacao) : Observable<InscricaoValidacao> {
    return this.http.put<InscricaoValidacao>(URL + "/" + iValida.id, iValida, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(_=>this.messages("Update feito com sucesso"))
      );
  }

  delete(iValida : InscricaoValidacao | string) : Observable<InscricaoValidacao> {
     return this.http.delete<InscricaoValidacao>(URL+"/"+iValida, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(_=>this.messages("Delete efetuado com sucesso"))
      );
  }

  private messages(msg : string){
  }

  carregarInscricaoValidacao(iValida:InscricaoValidacao){
    this.inscricaoValidacao = iValida;
  }

  checkInscricaoValidacao(iValida : InscricaoValidacao) : boolean{
    if(iValida.dadosPessoaisCompleto && iValida.dadosSaudeDeficienciaCompleto
       && iValida.dadosSocioEconCompleto && iValida.infoFinanceiroCompleto
       && iValida.dadosOutrosAuxiliosCompleto && iValida.dadosMoradiaTransporteCompleto
       && iValida.dadosContatosLogradouroCompleto && iValida.dadosAcadCompleto){
         return true;
       }else{
         return false;
       }
  }
}
