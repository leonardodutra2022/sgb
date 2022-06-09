import { Injectable } from '@angular/core';
import { Entrevista } from '../model/entrevista';
import { Observable } from 'rxjs';
import { SessaoService } from './sessao.service';
import { HttpClient } from '@angular/common/http';
import { API_SGB, getHttpOptions } from '../config/API';
import { tap } from 'rxjs/operators';

const URL = API_SGB + "/processo/entrevista";

@Injectable({
  providedIn: 'root'
})
export class EntrevistaService {
 
  idTemp : string = "";
  listEntrevistasTemp : Entrevista[] = [];

  constructor(private http : HttpClient, private sessaoUsuario : SessaoService) { }

  ngOnInit(){
  }

  getEntrevistas() : Observable<Entrevista[]>{
    return this.http.get<Entrevista[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getEntrevistasById(id : string) : Observable<Entrevista>{
    return this.http.get<Entrevista>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getEntrevistaByInscricao(id) : Observable<Entrevista>{
    return this.http.get<Entrevista>(URL + '/searchByInscricao?inscricao=' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  add (entrevista : Entrevista) : Observable<Entrevista>{
    if(this.getEntrevistasById(entrevista.id) != null){
          return this.http.post<Entrevista>(URL, entrevista, 
            getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
          
    }
  }

  update(entrevista : Entrevista) : Observable<Entrevista> {
    return this.http.put<Entrevista>(URL + "/" + entrevista.id, entrevista, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(_=>this.messages("Update feito com sucesso"))
      );
  }

  delete(entrevista : Entrevista | string) : Observable<Entrevista> {
     return this.http.delete<Entrevista>(URL+"/"+entrevista, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(_=>this.messages("Delete efetuado com sucesso"))
      );
  }

  private messages(msg : string){
  }

  carregarLista(lista:Entrevista[]){
    this.listEntrevistasTemp = lista;
  }
}
