import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from './sessao.service';
import { Beneficio } from '../model/beneficio';
import { getHttpOptions, API_SGB } from '../config/API';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorClass } from '../model/error.class';
import { MessageToastrService } from './message-toastr.service';

const URL = API_SGB + "/beneficio";

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {

  idTemp : string = "";
  listBeneficiosTemp : Beneficio[] = [];
  titleToast = 'Auxílio';

  constructor(private http : HttpClient, 
              private sessaoUsuario : SessaoService,
              private msgService: MessageToastrService) { }


  ngOnInit(){
  }

  getBeneficios() : Observable<Beneficio[]>{
    return this.http.get<Beneficio[]>(URL, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
    .pipe(
      tap(
        msg => {
        }, err => {
          let erro: ErrorClass = new ErrorClass();
          erro.statusCode = err.status;
          erro.recurso = this.titleToast;
          this.msgService.error(erro);
        }
      )
    );
  }

  getBeneficiosById(id : string) : Observable<Beneficio>{
    return this.http.get<Beneficio>(URL + '/' + id, getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
    .pipe(
      tap(
        msg => {
        }, err => {
          let erro: ErrorClass = new ErrorClass();
          erro.statusCode = err.status;
          erro.recurso = this.titleToast;
          this.msgService.error(erro);
        }
      )
    );
  }

  add (beneficio : Beneficio) : Observable<Beneficio>{
    if(this.getBeneficiosById(beneficio.id) != null){
          return this.http.post<Beneficio>(URL, beneficio, 
            getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
            .pipe(
              tap(
                msg => {
                  this.msgService.sucess("c", this.titleToast);
                }, err => {
                  let erro: ErrorClass = new ErrorClass();
                  erro.statusCode = err.status;
                  this.msgService.error(erro);
                }
              )
          );          
    }
  }

  update(beneficio : Beneficio) : Observable<Beneficio> {
    return this.http.put<Beneficio>(URL + "/" + beneficio.id, beneficio, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("u", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
          }
        )
     );
  }

  delete(beneficio : Beneficio | string) : Observable<Beneficio> {
     return this.http.delete<Beneficio>(URL+"/"+beneficio, 
      getHttpOptions(this.sessaoUsuario.getUsuarioLogado()))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("d", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
          }
        )
      );
  }

  private messages(msg : string){
  }

  carregarLista(lista:Beneficio[]){
    this.listBeneficiosTemp = lista;
  }

}
