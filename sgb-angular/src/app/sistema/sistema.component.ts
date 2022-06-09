import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sistema } from '../model/sistema';
import { Usuario } from '../model/usuario';
import { SessaoService } from '../service/sessao.service';
import { SistemaService } from '../service/sistema.service';
import { UserService } from '../service/user.service';
import { LogComponent } from './log/log.component';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent implements OnInit {

  sistema: Sistema = new Sistema();
  usuario: Usuario = new Usuario();

  constructor(private sistemaService: SistemaService,
              public sessaoService: SessaoService,
              private usuarioService: UserService,
              public dialog : MatDialog) { }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.sistemaService
      .getSisInfo()
        .subscribe(
          dados => this.sistema = dados
      );
  }

  save(){
    this.sistemaService
      .update(this.sistema)
        .subscribe(
          res => {}
      );
  }

  viewLog(){
    const dialogRef = this.dialog.open(LogComponent);
    dialogRef.afterClosed().subscribe(
      result => {
    });
  }
}
