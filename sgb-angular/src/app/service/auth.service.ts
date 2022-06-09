import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Observable, Subject} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { API_SGB, getHttpOptions, API_SGB_PUBLIC } from '../config/API';
import { SessaoService } from './sessao.service';
import { Router } from '@angular/router';
import { Sistema } from '../model/sistema';
import { MessageToastrService } from './message-toastr.service';
import { ErrorClass } from '../model/error.class';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { SistemaService } from './sistema.service';



interface PermissaoMenu {
  rota : string;
  auth : boolean;
  perfil : string;
}

const URL : string = API_SGB + "/login";
const URL_SIS : string = API_SGB_PUBLIC + "/sistema";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatus : boolean = false;

  private userAuth$ = new Subject<Usuario>();

  dadosUsuario = new EventEmitter<Usuario>();
  mostrarTelaLogin = new EventEmitter<boolean>(false);

  listaPermissoesMenu : PermissaoMenu[] = [];

  private isManutencao : boolean = false;
  static infoSis : Sistema = new Sistema();

  titleToast = 'Autenticação';

  sistema: Sistema = new Sistema();

  constructor(private http : HttpClient, 
              private sess : SessaoService,
              private router : Router,
              private msgService: MessageToastrService,
              private usuarioService: UserService,
              private sistemaService: SistemaService) 
              { }

  fazerLogin(dadosAcesso) : Observable<Usuario> {
      this.checkLogin(dadosAcesso);
      return this.http.get<Usuario>(URL, getHttpOptions(dadosAcesso))
      .pipe(
        tap(
          msg => {
            this.msgService.sucess("a", this.titleToast);
          }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
          }
        )
      );

  }

  fazerLogoff() {
    this.setAuthStatus(false);
    this.mostrarTelaLogin.emit(false);
    this.sess.unsetUsuarioLogado();
    this.setUserAuth(null);
    this.sess.toHomePage();
  }

  getUsuario() : Observable<Usuario> {
    return this.http.get<Usuario>(URL, {withCredentials: true});
  }

  usuarioEstaAutenticado() : boolean{
    return this.authStatus;
  }

  setAuthStatus(status : boolean){
    this.authStatus = status;
  }

  getUserAuth(){
    return this.userAuth$.asObservable();
  }

  setUserAuth(dados){
    this.userAuth$.next(dados);
  }

  checkLogin(dadosAcesso){
    if(!this.usuarioEstaAutenticado()){
      this.setAuthStatus(true);
      this.mostrarTelaLogin.emit(true);
      this.sess.setUsuarioLogado(dadosAcesso);
    }
  }

  checkAuth(){
    if(this.sess.sessaoAtiva() && !this.usuarioEstaAutenticado()){
      this.setAuthStatus(true);
      this.mostrarTelaLogin.emit(true);
      this.dadosUsuario.emit(this.sess.getUsuarioLogado());
      this.redirectPage();
    }else if(this.sess.sessaoAtiva() && this.usuarioEstaAutenticado()){
      this.mostrarTelaLogin.emit(true);
      this.redirectPage();
    }
  }

  redirectPage(){
    this.verifyManutencao();
    if(this.sess.getUsuarioLogado().papel == "Aluno"){
      this.sess.toHomeAluno();
    }else{
      this.updateSistema();
      this.sess.toDashboard();
    }
  }

  updateSistema(){
    let usuario = this.sess.getUsuarioLogado();
    this.sistemaService
      .getSisInfo()
        .subscribe(
          res => {
            if((res.versionRecent != usuario.versionUpdated) && res.forceClientUpdate){
              usuario.versionUpdated = res.versionRecent;
              this.save(usuario, res);
            }
        }
      );
  }

  checkPermissaoMenu(menu) : boolean{
    this.setListaPermissao();
    let authMenu : boolean = false;
    let u : Usuario = this.sess.getUsuarioLogado();
    
    if(u != null){
        for(let permissao of this.listaPermissoesMenu){
          switch(u.papel){
            case "Aluno":
              if(menu == permissao.rota && u.papel == permissao.perfil)
                authMenu = permissao.auth;
              break;
            case "Administrador do Sistema":
              if(menu == permissao.rota && u.papel == permissao.perfil)
                authMenu = permissao.auth;
              break;
            case "Membro":
              if(menu == permissao.rota && u.papel == permissao.perfil)
                authMenu = permissao.auth;
              break;
            case "Docente":
              if(menu == permissao.rota && u.papel == permissao.perfil)
                authMenu = permissao.auth;
              break;
            case "Tecnico_Administrativo":
              if(menu == permissao.rota && u.papel == permissao.perfil)
                authMenu = permissao.auth;
              break;
          }
        }
    }else{
      u = new Usuario();
    }
    return authMenu;
  }

  setListaPermissao(){
    this.listaPermissoesMenu = [
      {rota: "dashboard", auth: false, perfil: "Aluno"},
      {rota: "users", auth: false, perfil: "Aluno"},
      {rota: "processos/admin", auth: false, perfil: "Aluno"},
      {rota: "documentacao", auth: false, perfil: "Aluno"},
      {rota: "cadastro/auxilio", auth: false, perfil: "Aluno"},
      {rota: "cadastro/aluno", auth: false, perfil: "Aluno"},
      {rota: "processos", auth: true, perfil: "Aluno"},
      {rota: "concessoes", auth: false, perfil: "Aluno"},
      {rota: "minhas_inscricoes", auth: true, perfil: "Aluno"},
      {rota: "cadastros_basicos", auth: false, perfil: "Aluno"},
      {rota: "frequencia_aluno", auth: true, perfil: "Aluno"},
      {rota: "rubrica", auth: true, perfil: "Aluno"},
      

      {rota: "dashboard", auth: true, perfil: "Administrador do Sistema"},
      {rota: "users", auth: true, perfil: "Administrador do Sistema"},
      {rota: "processos/admin", auth: true, perfil: "Administrador do Sistema"},
      {rota: "documentacao", auth: true, perfil: "Administrador do Sistema"},
      {rota: "cadastro/auxilio", auth: true, perfil: "Administrador do Sistema"},
      {rota: "cadastro/aluno", auth: true, perfil: "Administrador do Sistema"},
      {rota: "processos", auth: true, perfil: "Administrador do Sistema"},
      {rota: "concessoes", auth: true, perfil: "Administrador do Sistema"},
      {rota: "minhas_inscricoes", auth: false, perfil: "Administrador do Sistema"},
      {rota: "cadastros_basicos", auth: true, perfil: "Administrador do Sistema"},
      {rota: "frequencia_admin", auth: true, perfil: "Administrador do Sistema"},
      {rota: "frequencia_validar_responsavel", auth: true, perfil: "Administrador do Sistema"},
      {rota: "rubrica", auth: true, perfil: "Administrador do Sistema"},
      {rota: "sistema", auth: true, perfil: "Administrador do Sistema"},
      
      
      {rota: "dashboard", auth: true, perfil: "Membro"},
      {rota: "users", auth: true, perfil: "Membro"},
      {rota: "processos/admin", auth: true, perfil: "Membro"},
      {rota: "documentacao", auth: true, perfil: "Membro"},
      {rota: "cadastro/auxilio", auth: true, perfil: "Membro"},
      {rota: "cadastro/aluno", auth: true, perfil: "Membro"},
      {rota: "processos", auth: true, perfil: "Membro"},
      {rota: "concessoes", auth: true, perfil: "Membro"},
      {rota: "minhas_inscricoes", auth: false, perfil: "Membro"},
      {rota: "cadastros_basicos", auth: true, perfil: "Membro"},
      {rota: "frequencia_admin", auth: true, perfil: "Membro"},
      {rota: "frequencia_validar_responsavel", auth: true, perfil: "Membro"},
      {rota: "ass_frequencia_resp", auth: true, perfil: "Membro"},
      {rota: "rubrica", auth: true, perfil: "Membro"},


      {rota: "dashboard", auth: true, perfil: "Tecnico_Administrativo"},
      {rota: "frequencia_admin", auth: true, perfil: "Tecnico_Administrativo"},
      {rota: "rubrica", auth: true, perfil: "Tecnico_Administrativo"},
      {rota: "ass_frequencia_resp", auth: true, perfil: "Tecnico_Administrativo"},

      {rota: "dashboard", auth: true, perfil: "Docente"},
      {rota: "frequencia_admin", auth: true, perfil: "Docente"},
      {rota: "rubrica", auth: true, perfil: "Docente"},
      {rota: "ass_frequencia_resp", auth: true, perfil: "Docente"},
    ];
  }

  verifyManutencao(){
    this.getInfoSis()
    .subscribe(
      info => 
        {
          this.sistema = info;
          if(info.manutencao){
            this.isManutencao = info.manutencao;
            AuthService.infoSis = info;
            this.fazerLogoff();
            this.redirectManutencao();
          }else if(!this.usuarioEstaAutenticado()){
              this.sess.toHomePage();
              if(info.manutencao){
                this.msgService.alertWarning("Sistema em Manutenção no Momento")
              }
            }
        }, err => {
            let erro: ErrorClass = new ErrorClass();
            erro.statusCode = err.status;
            this.msgService.error(erro);
        }
    );
  }

  private save(usuario, infoSis) {
    this.usuarioService
      .updateVersion(usuario.id, infoSis.versionRecent)
        .subscribe(
          res => {
            this.fazerLogoff();
          }
      );
  }

  private redirectManutencao(){
      this.toPageManutencao();
  }

  getInfoSis() : Observable<Sistema>{
    return this.http.get<Sistema>(URL_SIS);
  }

  private toPageManutencao(){
    this.router.navigate(['/manutencao']);
  }
}
