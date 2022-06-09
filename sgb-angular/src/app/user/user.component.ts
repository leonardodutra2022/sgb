import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Usuario } from '../model/usuario';
import {Observable} from 'rxjs';
import { SessaoService } from '../service/sessao.service';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from './user-modal/user.modal.component';
import { ExportFileComponent } from '../export-file/export-file.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})


export class UserComponent implements OnInit {
  usuarioAtivo:boolean;
  listaUsuarios : Usuario[];
  listaUsuarios$: Observable<Usuario[]>;
  userTemp:Usuario;

  constructor(public userService : UserService, public sessaoService : SessaoService,
    public dialog : MatDialog) { }

  ngOnInit() {
    this.userService.getUsuarios()
    .subscribe(dadosTemp => this.listaUsuarios = dadosTemp);

  }

  verDados() : void{
  }

  openDeleteDialog(id) {
    const dialogRef = this.dialog.open(UserModalComponent);
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
        this.userService.delete(id).subscribe(_ => this.listarUsuarios());
       }
    });
  }

  listarUsuarios(){
    this.userService.getUsuarios()
    .subscribe(
        dadosTemp => this.listaUsuarios = dadosTemp
      );
  }

  onStatusChange(usuario : Usuario){
    let userTemp:Usuario;
    this.userService.update(usuario)
    .subscribe(userResult => userTemp = userResult);
  }

  setListTempUsers(){
    this.userService.carregarLista(this.listaUsuarios);
  }

  exportDialog(): void {
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: 'USUARIO'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
