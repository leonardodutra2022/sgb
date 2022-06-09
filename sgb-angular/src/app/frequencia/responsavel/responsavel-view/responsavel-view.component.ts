import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/model/usuario';
import { MessageToastrService } from 'src/app/service/message-toastr.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-responsavel-view',
  templateUrl: './responsavel-view.component.html',
  styleUrls: ['./responsavel-view.component.scss']
})
export class ResponsavelViewComponent implements OnInit {

  usuario: Usuario = new Usuario();
  editMatricula = false;
  edit = false;

  constructor(public dialog : MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
              public usuarioService: UserService, public toarstService: MessageToastrService) { }

  ngOnInit(): void {
    this.usuario = this.data.responsavel;
  }

  setEdit() {
    this.edit = true;
  }

  setEditMatricula(){
    this.editMatricula = true;
  }

  update() {
    this.usuario.perfils = [];
    this.usuarioService
      .update(this.usuario)
        .subscribe(
          res => {
            // this.carregarAluno(this.aluno.siape);
          }
      );
  }
}
