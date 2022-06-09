import { Injectable } from '@angular/core';
import { API_SGB, getHttpOptions } from '../config/API';
import { InscricaoPendencia } from '../model/inscricao.pendencia';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const URL = API_SGB + "/inscricao/pendencia";

@Injectable({
  providedIn: 'root'
})
export class InscricaoPendenciaService {

  idTemp : string = "";
  listInscricoesTemp : InscricaoPendencia[] = [];
  
  constructor(private http : HttpClient, private sessaoUsuario : SessaoService) { }
  
  ngOnInit(){
  }

  getPendencias() : Observable<InscricaoPendencia[]>{
    return this.http.get<InscricaoPendencia[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getPendenciaById(id : string) : Observable<InscricaoPendencia>{
    return this.http.get<InscricaoPendencia>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  add (inscricao : InscricaoPendencia) : Observable<InscricaoPendencia>{
    return this.http.post<InscricaoPendencia>(URL, inscricao, 
    getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));

  }

  update(inscricao : InscricaoPendencia) : Observable<InscricaoPendencia> {
    return this.http.put<InscricaoPendencia>(URL + "/" + inscricao.id, inscricao, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(_=>this.messages("Update feito com sucesso"))
      );
  }

  setConcluido(id) : Observable<InscricaoPendencia>{
    return this.http.get<InscricaoPendencia>(URL + "/inscricao?id=" + id, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(_=>this.messages("Update feito com sucesso"))
      );
  }

  delete(inscricao : InscricaoPendencia | string) : Observable<InscricaoPendencia> {
     return this.http.delete<InscricaoPendencia>(URL+"/"+inscricao, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(_=>this.messages("Delete efetuado com sucesso"))
      );
  }

  private messages(msg : string){
  }

  carregarLista(lista:InscricaoPendencia[]){
    this.listInscricoesTemp = lista;
  }

  carregarListaCompleta(){
    this.getPendencias().subscribe(
      listTemp => this.listInscricoesTemp = listTemp
    );

  }

  getPendenciasByInscricao(id) : Observable<InscricaoPendencia[]>{
    return this.http.get<InscricaoPendencia[]>(URL + '/search?idInscricao=' + id, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getPendenciasByInscricaoAndForm(id, form) : Observable<InscricaoPendencia>{
    return this.http.get<InscricaoPendencia>(URL + '/searchByForm?idInscricao=' + id + "&form=" + form, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

}
