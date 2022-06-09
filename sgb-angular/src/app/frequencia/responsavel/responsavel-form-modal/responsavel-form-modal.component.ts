import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorClass } from 'src/app/model/error.class';
import { Usuario } from 'src/app/model/usuario';
import { UserService } from 'src/app/service/user.service';

interface Sexo {
  value: number;
  genero: string;
}

class ClassificacaoUsuario {
  classificacao: string;
  papel: string;
  perfil: string;
}

@Component({
  selector: 'app-responsavel-form-modal',
  templateUrl: './responsavel-form-modal.component.html',
  styleUrls: ['./responsavel-form-modal.component.scss']
})
export class ResponsavelFormModalComponent implements OnInit {
  
  listSexo : Sexo[] = [
    {value: 1, genero: 'Masculino'},
    {value: 0, genero: 'Feminino'}
  ];

  classificacoes: ClassificacaoUsuario[] = [
    {classificacao: "Técnico Administrativo", perfil: "tae", papel: "Tecnico_Administrativo"},
    {classificacao: "Docente", perfil: "docente", papel: "Docente"},
    {classificacao: "Membro da Comissão", perfil: "membro_comissao", papel: "Membro"}
  ];

  responsavel: Usuario = new Usuario();

  selecaoSexo : number;

  selecaoClassificacao: ClassificacaoUsuario = new ClassificacaoUsuario();

  constructor(private usuarioService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ResponsavelFormModalComponent>
              ) { }

  ngOnInit(): void {
  }

  add() {
    this.setResponsavel();
    this.usuarioService
      .add(this.responsavel)
        .subscribe(
          res => {
            this.data.res = res;
        }
     );
  }

  setResponsavel() {
    let classifSet = this.selecaoClassificacao.papel;
    this.responsavel.papel = classifSet;
    this.responsavel.sexo = this.selecaoSexo;
    this.responsavel.acessoInscricaoTemp = false;

    let credenciaisGerada = this.setCredenciaisRandom(classifSet.toLowerCase());

    this.responsavel.nomeUsuario = credenciaisGerada.usuario;
    this.responsavel.senha = credenciaisGerada.pass;
  }

  setCredenciaisRandom(prefix: string) : any{
    let credenciais: any = this.usuarioService.gerarCredenciaisRandom(prefix);
    return credenciais;
  }

}
