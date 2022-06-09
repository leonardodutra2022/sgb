import { Injectable } from '@angular/core';
import { LogradouroTipo } from '../model/logradouro.tipo';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { Observable } from 'rxjs';
import { getHttpOptions, API_SGB } from '../config/API';

const URL = API_SGB + "/logradouro/tipo";

@Injectable({
  providedIn: 'root'
})
export class LogradouroTipoService {
  
  listLogradourosTipoTemp : LogradouroTipo[] = [];

  constructor(private http : HttpClient, private sessaoUsuario : SessaoService) { }

  ngOnInit(){
  }

  getLogradourosTipos() : Observable<LogradouroTipo[]>{
    return this.http.get<LogradouroTipo[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getLogradouroTipoById(id : string) : Observable<LogradouroTipo>{
    return this.http.get<LogradouroTipo>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getLogradouroTipoByAbreviatura(abreviatura : string) : Observable<LogradouroTipo>{
    return this.http.get<LogradouroTipo>(URL + '/search?abreviatura=' + abreviatura, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }  
}