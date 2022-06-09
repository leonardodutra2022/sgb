import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Aluno } from 'src/app/model/aluno';
import { ErrorClass } from 'src/app/model/error.class';
import { Periodo } from 'src/app/model/periodo';
import { Projeto } from 'src/app/model/projeto';
import { Usuario } from 'src/app/model/usuario';
import { AlunoService } from 'src/app/service/aluno.service';
import { FrequenciaService } from 'src/app/service/frequencia.service';
import { PeriodoService } from 'src/app/service/periodo.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { UserService } from 'src/app/service/user.service';
import { MsgNotify } from 'src/app/utils/msg.notify';
import { AlunoFormModalComponent } from '../../aluno/aluno-form-modal/aluno-form-modal.component';
import { PeriodoFormModalComponent } from '../periodo-form-modal/periodo-form-modal.component';
import { ProjetoFormModalComponent } from '../projeto-form-modal/projeto-form-modal.component';
import { ResponsavelFormModalComponent } from '../../responsavel/responsavel-form-modal/responsavel-form-modal.component';

const msg = MsgNotify;

@Component({
  selector: 'app-frequencia-form',
  templateUrl: './frequencia-form.component.html',
  styleUrls: ['./frequencia-form.component.scss']
})
export class FrequenciaFormComponent implements OnInit {

  viewMsgErro: boolean = false;
  msgErro: string = '';

  viewMsg: boolean = false;
  msg: string = '';

  idTemp = '';

  idProjetoEdit = '';
  idAlunoEdit = '';
  idResponsavelEdit = '';

  selecaoProjeto: Projeto = new Projeto();
  selecaoAluno: Aluno = new Aluno();
  selecaoResponsavel: Usuario = new Usuario();

  listaProjetos: Projeto[] = [];
  listaPeriodos: Periodo[] = [];
  listaAlunos: Aluno[] = [];
  listaResponsaveis: Usuario[] = [];

  listAlunosTemp: Aluno[] = [];
  idsAlunos: number[] = [];
  responsaveis : Usuario[] = [];

  responsavelFilteredOptions: Observable<string[]>;
  responsavelQueryField = new FormControl();

  err = '';

  listHorarios = [{"horas": 24}, {"horas": 48}];

  selecaoCargaHoraria = 0;

  alunoQueryField = new FormControl();
  alunoFilteredOptions: Observable<string[]>;

  constructor(private projetoService: ProjetoService,
              private periodoService: PeriodoService,
              private alunoService: AlunoService,
              private usuarioService: UserService,
              private frequenciaService: FrequenciaService,
              private rotas : ActivatedRoute,
              public dialog : MatDialog,
              public sessaoService: SessaoService) { }

  ngOnInit(): void {
    this.carregarProjetoEdit();
    this.inicializeLists();
  }

  inicializeLists() {
    this.inicializeListAlunos();
    this.carregarAlunos();
    this.inicializeListResponsaveis();
    this.carregarResponsaveis();
  }

  carregarProjetoEdit(){
    this.idTemp = this.rotas.snapshot.paramMap.get('id');
    if (this.idTemp != null && this.idTemp != '' && typeof this.idTemp != 'undefined') {
      this.projetoService
        .getProjetoById(this.idTemp)
          .subscribe(
            dados => {
              this.selecaoProjeto = dados;
              this.selecaoResponsavel = dados.responsavel;
              this.selecaoCargaHoraria = dados.totalHoras;
              this.responsavelQueryField.setValue(dados.responsavel.nomeCompleto)
              this.setEdit(dados);
            }
        );
    }
  }

  setEdit(projeto: Projeto) {
    this.listAlunosTemp = projeto.aluno;
    this.idProjetoEdit = projeto.id;
    this.idResponsavelEdit = this.selecaoResponsavel.id;
  }

  carregarAlunos() {

    this.alunoService.getAlunos().subscribe(
      list =>
        this.listaAlunos = list
    );

  }

  inicializeListAlunos(){
    this.alunoFilteredOptions = this.alunoQueryField.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, "aluno"))
    );
  }

  inicializeListResponsaveis(){
    this.responsavelFilteredOptions = this.responsavelQueryField.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, "responsavel"))
    );
  }

  carregarResponsaveis() {
    this.usuarioService.getUsuariosResponsaveis().subscribe(
      list => this.listaResponsaveis = list
    );
  }

  hideMsg(){
    this.viewMsgErro = false;
    this.viewMsg = false;
  }

  changeAluno(aluno: Aluno){

    this.selecaoAluno = aluno;
    this.listAlunosTemp.push(aluno);
    this.idAlunoEdit = aluno.id
    // this.alunoService.getAlunosById(id)
    // .subscribe(
    //   temp => {
    //     this.selecaoAluno = temp;
    //     this.listAlunosTemp.push(temp);
    //   }
    // );
  }

  changeResponsavel(responsavel: Usuario){
    this.selecaoResponsavel = responsavel;
    this.selecaoProjeto.responsavel = responsavel;
    this.idResponsavelEdit = responsavel.id;
    // this.usuarioService.getUsuarioById(id)
    // .subscribe(
    //   temp => {
    //     this.selecaoResponsavel = temp;
    //     this.selecaoProjeto.responsavel = temp;
    //   }
    // );
  }

  deleteItemList(id){
    for(let a of this.listAlunosTemp){
      if(a.id == id){
        let index = this.listAlunosTemp.indexOf(a);
        this.listAlunosTemp.splice(index, 1);
      }
    }
  }

  gerar(){
    this.idsAlunos = [];
    for(let la of this.listAlunosTemp){
      this.idsAlunos.push(la.id);
    }


    this.selecaoProjeto.status = "ANDAMENTO";
    this.selecaoProjeto.responsavel.perfils = [];
    this.selecaoProjeto.totalHoras = this.selecaoCargaHoraria;

    this.projetoService
      .addMultiple(this.selecaoProjeto, this.idsAlunos)
        .subscribe(
          dados => {
            this.msg= msg.MSG_SUCCESS.info;
            this.viewMsg = true;
          }, erro => {
            let erroResponse: ErrorClass = erro.error;
            this.viewMsgErro = true;
            this.msgErro = erroResponse.message;
        }
      );
  }

  update(){
    this.selecaoProjeto.aluno = this.listAlunosTemp;
    this.selecaoProjeto.responsavel.perfils = [];

    this.projetoService
      .update(this.selecaoProjeto)
        .subscribe(
          dados => {
            this.msg= msg.MSG_SUCCESS.info;
            this.viewMsg = true;
          },erro => {
            let erroResponse: ErrorClass = erro.error;
            this.viewMsgErro = true;
            this.msgErro = erroResponse.message;
        }
     );
  }

  openResponsavel(){
    const dialogRef = this.dialog.open(ResponsavelFormModalComponent, {
      data: {
        res: null
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.usuarioService
          .getUsuariosResponsaveis()
            .subscribe(
              list => {
                this.responsaveis = list;
            }
        );
     })
  }

  openAluno(){
    const dialogRef = this.dialog.open(AlunoFormModalComponent, {
      data: {
        aluno: new Aluno()
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.alunoService
          .getAlunos()
            .subscribe(
              list => {
                this.listaAlunos = list;
            }
        );
     })
  }

  private _filter(value: string, tipoPesquisa: string): any[] {
    const filterValue = value;
    console.log(filterValue)

    let list : any[] = [];

    switch(tipoPesquisa){
      case "aluno":
        list = this.listaAlunos
          .filter(
            a => a.nomeCompleto.toUpperCase().includes(filterValue.toUpperCase()) || a.cpf.includes(filterValue.toUpperCase()) || a.siape.toString().includes(filterValue.toUpperCase())
          );
        break;
      case "responsavel":
        list = this.listaResponsaveis
          .filter(
            r => (r.nomeCompleto && r.nomeCompleto.toUpperCase().includes(filterValue.toUpperCase())) || (r.siape && r.siape.toString().toUpperCase().includes(filterValue.toUpperCase()))
          );
        break;
    }
    return list;
  }

}
