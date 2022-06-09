import { Injectable } from '@angular/core';
import { API_SGB, getHttpOptions } from '../config/API';
import { Cidade } from '../model/cidade';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { Observable } from 'rxjs';

const URL = API_SGB + "/cidade";

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  listCidadesTemp : Cidade[] = [];

  constructor(private http : HttpClient, private sessaoUsuario : SessaoService) { }


  ngOnInit(){
  }

  getCidades() : Observable<Cidade[]>{
    return this.http.get<Cidade[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getCidadeById(id : string) : Observable<Cidade>{
    return this.http.get<Cidade>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getCidadeByUF(uf : string) : Observable<Cidade[]>{
    return this.http.get<Cidade[]>(URL + '/search?uf=' + uf, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }  

}
