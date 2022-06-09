import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faSignature } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FilterSearch } from 'src/app/interface/filter.search';
import { Aluno } from 'src/app/model/aluno';
import { Periodo } from 'src/app/model/periodo';
import { PeriodoRegistroFrequenciaProjeto } from 'src/app/model/periodo.registro.frequencia.projeto';
import { Projeto } from 'src/app/model/projeto';
import { Usuario } from 'src/app/model/usuario';
import { AlunoService } from 'src/app/service/aluno.service';
import { FrequenciaRegistroService } from 'src/app/service/frequencia-registro.service';
import { FrequenciaService } from 'src/app/service/frequencia.service';
import { PeriodoService } from 'src/app/service/periodo.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { UserService } from 'src/app/service/user.service';
import { AlunoProjetoModalComponent } from '../aluno-projeto-modal/aluno.projeto.modal.component';
import { FrequenciasProjetoModalComponent } from '../../admin/frequencias-projeto-modal/frequencias-projeto-modal.component';
import { PeriodoFormModalComponent } from '../../admin/periodo-form-modal/periodo-form-modal.component';
import { FrequenciaAlunoRegistroComponent } from '../frequencia-aluno-registro/frequencia-aluno-registro.component';

interface Search {
  total: number;
  results: any[];
  tipo: string;
  query: string;
  viewTag? : boolean;
}

@Component({
  selector: 'app-frequencia-aluno-admin',
  templateUrl: './frequencia-aluno-admin.component.html',
  styleUrls: ['./frequencia-aluno-admin.component.scss']
})
export class FrequenciaAlunoAdminComponent implements OnInit {

  viewDetail : boolean = false;
  projetoView : Projeto = new Projeto();
  periodoView : Periodo = new Periodo();

  filtersSearch : FilterSearch = {alunoId: 0, periodoId: 0, projetoId: 0, responsavelId: 0}

  queryField = new FormControl();

  projetoQueryField = new FormControl();

  projetoFilteredOptions: Observable<string[]>;

  periodoQueryField = new FormControl();

  periodoFilteredOptions: Observable<string[]>;

  alunoQueryField = new FormControl();

  alunoFilteredOptions: Observable<string[]>;

  resultsSearch : Search = {total: 0, results: [], tipo: '', query: '', viewTag: false};

  projetoSearch : Search = {total: 0, results: [], tipo: '', query: '', viewTag: false};

  periodoSearch : Search = {total: 0, results: [], tipo: '', query: '', viewTag: false};

  alunoSearch : Search = {total: 0, results: [], tipo: '', query: '', viewTag: false};

  responsavelSearch : Search = {total: 0, results: [], tipo: '', query: '', viewTag: false};

  projetoSelectFilter : Projeto = new Projeto();

  periodoSelectFilter : Periodo = new Periodo();

  alunoSelectFilter : Aluno = new Aluno();

  projetosFilterFound : Projeto[] = [];

  projetos : Projeto[] = [];

  listaProjetosAluno: Projeto[] = [];

  periodos : Periodo[] = [];
  
  signIcon = faSignature;

  listaAlunosVinculadosTemp: Aluno[] = [];

  usuarioLogado: Usuario = new Usuario();

  aluno: Aluno = new Aluno();

  listaFrequenciasVinculadasTemp: PeriodoRegistroFrequenciaProjeto[] = [];

  matriculaSessaoAluno = '';

  viewMsgErro: boolean;

  viewMsg: boolean;

  constructor(
    public frequenciaService : FrequenciaService, 
    public sessaoService : SessaoService,
    public projetoService : ProjetoService,
    public periodoService : PeriodoService,
    public alunoService : AlunoService,
    public usuarioService : UserService,
    public dialog : MatDialog,
    public frequenciaRegistroService: FrequenciaRegistroService
    ) { }

  ngOnInit(): void {
    this.getAluno();
    this.getProjetos();
    this.inicializeListProjetos();
    this.getPeriodos();
    this.inicializeListPeriodos();
  }

  getAluno(){
    this.usuarioLogado = this.sessaoService.getUsuarioLogado();
    this.matriculaSessaoAluno = this.usuarioLogado.siape;
    this.alunoService.getAlunoByMatricula(this.matriculaSessaoAluno)
      .subscribe(
        aluno => 
          {
            if(aluno == null && typeof aluno == 'undefined'){
              this.aluno = new Aluno();
            }else{
              this.aluno = aluno;
              this.getProjetosByAluno();
            }
          }
      );
  }

  inicializeListPeriodos(){
    this.periodoFilteredOptions = this.periodoQueryField.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, "periodo"))
    );
  }

  inicializeListProjetos(){
    this.projetoFilteredOptions = this.projetoQueryField.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, "projeto"))
    );
  }

  getPeriodos(){
    this.periodoService
      .getPeriodos()
        .subscribe(
          list => {
            this.periodos = list;
          }
      );
  }

  getProjetosByAluno(){
      this.projetoService.getProjetoByAluno(this.aluno.id)
      .subscribe(
        list => 
          this.listaProjetosAluno = list
      );
  }


  getProjetos(){
    this.projetoService
      .getProjetos()
        .subscribe(
          list => this.projetos = list
      )
  }

  detail(proj : Projeto){
    this.projetoView = proj;

    if (this.viewDetail && proj.id != this.projetoView.id)
      this.viewDetail = false;
    else
      this.viewDetail = true;

    this.getAlunosVinculados(proj.id);

  }

  closeDetail(tipo: string) {
    this.filtersSearch.alunoId = this.aluno.id;
    this.viewDetail = false;
    switch(tipo) {
      case "geral":
        this.resultsSearch.viewTag = false;
        break;
      case "projeto":
        this.projetoSearch.viewTag = false;
        this.filtersSearch.projetoId = 0;
        this.getProjetosByFilters();
        break;
      case "periodo":
        this.periodoSearch.viewTag = false;
        this.filtersSearch.periodoId = 0;
        this.getProjetosByFilters();
        break;
    }
  }

  searchProjeto(query){
    this.projetoService
      .searchProjetos(query)
        .subscribe(
          result => {
            this.projetosFilterFound = result;
          }
        ).unsubscribe();
  }

  setProjetoFilter(p : Projeto) {
    this.filtersSearch.alunoId = this.aluno.id;
    this.projetoQueryField.setValue(p.titulo);
    this.projetoView = p;
    this.projetoSelectFilter = p;
    this.projetoSearch = {query: p.titulo, tipo: 'projeto', total: 1, viewTag: true, results: [p]};
    this.projetoQueryField.setValue('');
    this.filtersSearch.projetoId = p.id;
    this.getProjetosByFilters();
  }

  getProjetosByFilters(){
    this.projetoService
      .searchByFilters(this.filtersSearch)
        .subscribe(
          list => {
            this.listaProjetosAluno = list;
          }
      );
  }

  setPeriodoFilter(p : Periodo){
    this.filtersSearch.alunoId = this.aluno.id;
    this.periodoQueryField.setValue(p.periodoReferencia);
    this.periodoView = p;
    this.periodoSelectFilter = p;
    this.periodoSearch = {query: p.periodoReferencia, tipo: 'periodo', total: 1, viewTag: true, results: [p]};
    this.periodoQueryField.setValue('');
    this.filtersSearch.periodoId = p.id;
    this.getProjetosByFilters();

  }

  private _filter(value: string, tipoPesquisa: string): any[] {
    const filterValue = value;

    let list : any[] = [];

    switch(tipoPesquisa){
      case "periodo":
        list = this.periodos
          .filter(
            p => p.periodoReferencia.includes(filterValue)
          );
        break;
      case "projeto":
        list = this.projetos
          .filter(
            pr => pr.titulo.includes(filterValue)
          );
        break;
    }
    return list;
  }

  listDialog(){
    const dialogRef = this.dialog.open(AlunoProjetoModalComponent, 
      {
        data: {
          alunos: this.projetoView.aluno,
          projeto: this.projetoView
        }
      });
    dialogRef.afterClosed().subscribe(
      result => {
    }).unsubscribe();
  }

  getAlunosVinculados(projetoId) {
    this.projetoService
      .getAlunosByProjeto(projetoId)
        .subscribe(
          lista => {
            this.listaAlunosVinculadosTemp = lista;
          }
        ).unsubscribe();
  }
  
  openPeriodo(){
    const dialogRef = this.dialog.open(PeriodoFormModalComponent, {
      data: {
        res: null
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.periodoService
          .getPeriodos()
            .subscribe(
              list => {
                this.periodos = list;
                this.periodoFilteredOptions.subscribe(
                  res => {
                    let results = [];
                    for(let p of list){
                      results.push(p.periodoReferencia);
                    }
                    res = results;
                  }
               );
            }
        );
     })
  }

  assinar(projeto: Projeto){
    const dialogRef = this.dialog.open(FrequenciaAlunoRegistroComponent, {
      data: {
        aluno: this.aluno,
        projeto: projeto
      },
      maxWidth: "95%",
      maxHeight: "75%",
      position: {top: "2%"}
    });

    dialogRef.afterClosed().subscribe(
      result => {
     })
  }

  hideMsg(){
    this.viewMsgErro = false;
    this.viewMsg = false;
  }

  assinarDocumento(){
                          
  }

  listDialogFrequencias(p: Projeto){
    this.getFrequenciasVinculadas(p);
  }

  getFrequenciasVinculadas(projeto: Projeto){
    this.frequenciaRegistroService
      .getPeriodosAgrupadosByProjeto(projeto)
        .subscribe(
          dados => {
            this.listaFrequenciasVinculadasTemp = dados;

              const dialogRef = this.dialog.open(FrequenciasProjetoModalComponent, 
                {
                  data: {
                    projetoId: projeto.id,
                    frequenciasProjeto: dados,
                    projeto: projeto
                  },
                  maxWidth: "80%",
                  maxHeight: "50%",
                  position: {top: "3%"}
                });
              dialogRef.afterClosed().subscribe(
                result => {
              });
          }
      );
  }

}


