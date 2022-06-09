import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Projeto } from 'src/app/model/projeto';
import { Usuario } from 'src/app/model/usuario';
import { ProjetoService } from 'src/app/service/projeto.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-projeto-form-modal',
  templateUrl: './projeto-form-modal.component.html',
  styleUrls: ['./projeto-form-modal.component.scss']
})
export class ProjetoFormModalComponent implements OnInit {

  projeto: Projeto = new Projeto();
  selecaoResponsavel: Usuario = new Usuario();
  responsaveis: Usuario[] = [];
  selecaoCargaHoraria: any = '';

  listHorarios = [{"horas": 24}, {"horas": 48}];

  constructor(private projetoService: ProjetoService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ProjetoFormModalComponent>,
              private usuarioService: UserService) { }

  ngOnInit(): void {
    this.carregarResponsaveis();
  }

  carregarResponsaveis() {
    this.usuarioService.getUsuariosResponsaveis().subscribe(
      list => this.responsaveis = list
    );
  }

  add() {
    this.selecaoResponsavel.perfils = [];
    this.projeto.totalHoras = this.selecaoCargaHoraria;
    this.projeto.responsavel = this.selecaoResponsavel;
    this.projetoService
      .add(this.projeto)
        .subscribe(
          res => {
            this.data.res = res;
        }
     );
  }

}
