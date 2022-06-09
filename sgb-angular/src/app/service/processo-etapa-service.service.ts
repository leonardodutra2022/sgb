import { Injectable } from '@angular/core';
import { ProcessoEtapa } from '../model/processo.etapa';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { getHttpOptions, API_SGB } from '../config/API';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const URL = API_SGB + "/processo/etapa";

@Injectable({
  providedIn: 'root'
})
export class ProcessoEtapaServiceService {
 
  idTemp : string = "";
  listRecursosTemp : ProcessoEtapa[] = [];

  constructor(private http : HttpClient, private sessaoUsuario : SessaoService) { }
  

  getEtapasByProcesso(id) : Observable<ProcessoEtapa[]>{
    return this.http.get<ProcessoEtapa[]>(URL + '/processo?id=' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getEtapaById(id : string) : Observable<ProcessoEtapa>{
    return this.http.get<ProcessoEtapa>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  add (etapa : ProcessoEtapa) : Observable<ProcessoEtapa>{
    if(this.getEtapaById(etapa.id) != null){
          return this.http.post<ProcessoEtapa>(URL, etapa, 
            getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
          
    }
  }

  update(pe : ProcessoEtapa) : Observable<ProcessoEtapa> {
    return this.http.put<ProcessoEtapa>(URL + "/" + pe.id, pe, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(_=>this.messages("Update feito com sucesso"))
      );
  }

  delete(pe : ProcessoEtapa | string) : Observable<ProcessoEtapa> {
     return this.http.delete<ProcessoEtapa>(URL+"/"+pe, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(_=>this.messages("Delete efetuado com sucesso"))
      );
  }

  private messages(msg : string){
  }
}
