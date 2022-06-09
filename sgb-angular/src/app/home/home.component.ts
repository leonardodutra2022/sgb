import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { AuthService } from '../service/auth.service';
import { SessaoService } from '../service/sessao.service';
import { DadosAcesso } from '../config/API';
import { Subject} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginRecoverComponent } from '../cadastro/login-recover/login-recover.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dadosLogin: Usuario = new Usuario();
  dadosAcesso: DadosAcesso = new DadosAcesso();
  mostrarLogin: boolean = false;

  error$ = new Subject<Boolean>();
  erro : HttpErrorResponse;
  msgErro = '';
  codErro : number;

  constructor(private authService : AuthService, 
              private sessaoService : SessaoService,
              private rota : Router,
              private dialog : MatDialog) {}

  ngOnInit() {
    this.authService.verifyManutencao();
    this.authService.checkAuth();
    this.authService.mostrarTelaLogin
      .subscribe(
          mostrar => 
          {
            this.mostrarLogin = mostrar
          }
      );
  }

  efetuarLogin(){
    this.authService.fazerLogin(this.dadosAcesso)
      .subscribe(
          usuario => {
            this.sessaoService.setUsuarioLogado(usuario);
            this.authService.setUserAuth(usuario);
            this.authService.dadosUsuario.emit(usuario);
            this.authService.checkAuth();
        },
        error => {
          this.error$.next(true);
          this.erro = error;
          this.getMsgErro();
          if(this.getErroCode() == 401){
            this.authService.fazerLogoff();
          }
        }
      );
    }

    hideError(){
      this.error$.next(false);
    }

    private getErroCode() : number{
      return this.erro.status;
    }

    private getMsgErro(){
      switch(this.getErroCode()){
        case 401:
          this.msgErro = "Erro causado por acesso não autorizado, reveja seu acesso ou se os dados informados estão corretos!";
          this.codErro = this.getErroCode();
          break;
        case 404:
          this.msgErro = "Página não encontrada ou o item está indisponível!";
          this.codErro = this.getErroCode();
          break;
      }

    }

    novoLogin(){
      this.rota.navigate(['/novo-acesso']);
    }

    recoverPass(){
      const dialogRef = this.dialog.open(LoginRecoverComponent);
        dialogRef.afterClosed().subscribe(result => {
      });
    }
}
