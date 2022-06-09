import { Injectable } from '@angular/core';
import { Estado } from '../model/estado';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { Observable } from 'rxjs';
import { getHttpOptions, API_SGB } from '../config/API';

const URL = API_SGB + "/estado";

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  listCidadesTemp : Estado[] = [];

  constructor(private http : HttpClient, private sessaoUsuario : SessaoService) { }


  ngOnInit(){
  }

  getEstados() : Observable<Estado[]>{
    return this.http.get<Estado[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getEstadoById(id : string) : Observable<Estado>{
    return this.http.get<Estado>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getEstadoByUf(uf : string) : Observable<Estado>{
    return this.http.get<Estado>(URL + '/search?sigla=' + uf, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }  
}
