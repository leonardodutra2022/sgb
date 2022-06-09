import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_SGB, getHttpOptions } from '../config/API';
import { SessaoService } from '../service/sessao.service';

const URL = API_SGB + "/frequencia/teste";

@Injectable({
  providedIn: 'root'
})
export class FrequenciaService {
 
  list : any[] = [];
  
  constructor(private http : HttpClient, 
              private sessaoUsuario: SessaoService) { }

  getFrequenciaMock() : Observable<any[]>{
    return this.http.get<any[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
  }

}
