import { HttpHeaders } from "@angular/common/http";
import {Usuario} from '../model/usuario';
import { environment } from "src/environments/environment";

const SERVIDOR : String = environment.servidor + ":" + environment.porta;
const SERVIDOR_MOCK : String = environment.servidor + ":" + environment.porta_mock;
export const SERVIDOR_MISC: String = environment.servidorMisc + ":" + environment.porta_misc;
export const API_SGB : String = SERVIDOR + "/api";
export const API_SGB_PUBLIC : String = SERVIDOR + "/public/api";
export const API_MOCK : String = SERVIDOR_MOCK + "/api";


export class DadosAcesso {
  nomeUsuario:string;
  senha:string;
  email:string;
}

export function getHttpOptions(usuario : Usuario) {
    return {
      headers: getHeaders(usuario),
      withCredentials: true
    };
  }

  export function getHttpOptionsDownload(usuario : Usuario) {
    return {
      headers: getHeadersDownload(usuario),
      withCredentials: true
    };
  }

  function getHeaders(usuario : Usuario) {
    return new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Basic " + btoa(usuario.nomeUsuario + ":" + usuario.senha)
    })
  }

  function getHeadersDownload(usuario : Usuario) {
    return new HttpHeaders({
      'Authorization': "Basic " + btoa(usuario.nomeUsuario + ":" + usuario.senha),
      'responseType':'blob',
      'Accept': 'application/octet-stream'
    })
  }
  