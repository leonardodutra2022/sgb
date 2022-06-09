import { Injectable } from '@angular/core';
import { API_SGB, getHttpOptions } from '../config/API';
import { OrgaoExpedidor } from '../model/orgao.expedidor';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { Observable } from 'rxjs';

const URL = API_SGB + "/orgaoexpedidor";

@Injectable({
  providedIn: 'root'
})
export class OrgaoExpedidorService {

  listOrgaosExpTemp : OrgaoExpedidor[] = [];

  constructor(private http : HttpClient, private sessaoUsuario : SessaoService) { }


  ngOnInit(){
  }

  getOrgaosExpedidores() : Observable<OrgaoExpedidor[]>{
    return this.http.get<OrgaoExpedidor[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getOrgaoExpedidorById(id : string) : Observable<OrgaoExpedidor>{
    return this.http.get<OrgaoExpedidor>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getOrgaoExpedidorBySigla(sigla : string) : Observable<OrgaoExpedidor>{
    return this.http.get<OrgaoExpedidor>(URL + '/search?sigla=' + sigla, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }  

}
