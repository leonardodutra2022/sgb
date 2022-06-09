import { Injectable } from '@angular/core';
import { API_SGB, getHttpOptions } from '../config/API';
import { SessaoService } from './sessao.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CampoCustom } from '../model/campo.custom';

const URL = API_SGB + "/export";

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http : HttpClient, private sessaoUsuario : SessaoService) { }

  getMetodos(lista) : Observable<String[]>{
    return this.http.get<String[]>(URL + "/cols?lista=" + lista, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getCamposMetodos(lista) : Observable<CampoCustom[]>{
    return this.http.get<CampoCustom[]>(URL + '/colsFields?lista=' + lista, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getCamposSaudeDeficiencia(inscricaoId) : Observable<CampoCustom[]>{
    return this.http.get<CampoCustom[]>(URL + '/customize/saude?id=' + inscricaoId, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }

  getCamposMoradiaTransporte(inscricaoId) : Observable<CampoCustom[]>{
    return this.http.get<CampoCustom[]>(URL + '/customize/moradia-transporte?id=' + inscricaoId, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }
  
  getCamposInfoBanco(inscricaoId) : Observable<CampoCustom[]>{
    return this.http.get<CampoCustom[]>(URL + '/customize/info-banco?id=' + inscricaoId, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()));
  }  
}
