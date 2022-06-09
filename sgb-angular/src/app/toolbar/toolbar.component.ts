import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';
import { SistemaService } from '../service/sistema.service';
import { Sistema } from '../model/sistema';
import { MatDialog } from '@angular/material/dialog';
import { VersaoDesatualizadaComponent } from '../mensagens/versao-desatualizada/versao-desatualizada.component';
import { AlunoViewComponent } from '../frequencia/aluno/aluno-view/aluno-view.component';
import { AlunoService } from '../service/aluno.service';

export const VERSAO = environment.versao;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

  versao = `${VERSAO}`;
  usuarioAuth : Usuario = new Usuario();
  menuButton: boolean = false;
  isActive: boolean = false;
  sistema: Sistema = new Sistema();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(
        result => 
          result.matches
        )
    );

  constructor(public breakpointObserver: BreakpointObserver, 
              public authService: AuthService, public alunoService: AlunoService,
              private sistemaService: SistemaService,
              public dialog : MatDialog) {}

  ngOnInit(){
    this.checkUsuario();
  }

  getSis(){
    this.sistemaService
      .getSisInfo()
        .subscribe(
          info => {
            this.sistema = info;
            if(this.sistema.versionRecent != this.versao){
              this.openModalVersaoDesatualizada();
            }
          }
      );
  }

  openModalVersaoDesatualizada() {
    const dialogRef = this.dialog.open(VersaoDesatualizadaComponent, {width: "30%"});
    dialogRef.afterClosed().subscribe(
      result => {
    }).unsubscribe();
  }

  efetuarLogoff(){
    this.authService.fazerLogoff();    
  }

  checkUsuario(){
    this.authService.dadosUsuario.subscribe(
      dados => 
        {
          this.usuarioAuth = dados;
          this.getSis();
          this.checkMenuBtn();
        }
    )
  }

  checkMenuBtn(){
    this.menuButton = true
  }

  viewAluno(siape){
    this.alunoService
      .getAlunoByMatricula(siape)
        .subscribe(
          res => {
            const dialogRef = this.dialog.open(AlunoViewComponent,
              {
                data: {
                  aluno: res
                }
              });
            dialogRef.afterClosed().subscribe(
              result => {
                // this.listarAlunosProjeto();
            })
          }
      );
  }
}
