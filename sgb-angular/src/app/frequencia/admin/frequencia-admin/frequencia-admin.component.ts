import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FilterSearch } from 'src/app/interface/filter.search';
import { Aluno } from 'src/app/model/aluno';
import { ErrorClass } from 'src/app/model/error.class';
import { Page } from 'src/app/model/pageable/page';
import { Periodo } from 'src/app/model/periodo';
import { PeriodoRegistroFrequenciaProjeto } from 'src/app/model/periodo.registro.frequencia.projeto';
import { Projeto } from 'src/app/model/projeto';
import { Usuario } from 'src/app/model/usuario';
import { AlunoService } from 'src/app/service/aluno.service';
import { FrequenciaRegistroService } from 'src/app/service/frequencia-registro.service';
import { FrequenciaService } from 'src/app/service/frequencia.service';
import { PeriodoService } from 'src/app/service/periodo.service';
import { ProjetoService } from 'src/app/service/projeto.service';
import { RubricaService } from 'src/app/service/rubrica.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { UserService } from 'src/app/service/user.service';
import { AlunoFormModalComponent } from '../../aluno/aluno-form-modal/aluno-form-modal.component';
import { AlunoProjetoModalComponent } from '../../aluno/aluno-projeto-modal/aluno.projeto.modal.component';
import { FrequenciasProjetoModalComponent } from '../frequencias-projeto-modal/frequencias-projeto-modal.component';
import { PeriodoFormModalComponent } from '../periodo-form-modal/periodo-form-modal.component';
import { ProjetoFormModalComponent } from '../projeto-form-modal/projeto-form-modal.component';
import { ResponsavelFormModalComponent } from '../../responsavel/responsavel-form-modal/responsavel-form-modal.component';
import { ResponsavelViewComponent } from '../../responsavel/responsavel-view/responsavel-view.component';
import { ExportFileComponent } from 'src/app/export-file/export-file.component';

interface Search {
  total: number;
  results: any[];
  tipo: string;
  query: string;
  viewTag? : boolean;
}


@Component({
  selector: 'app-frequencia-admin',
  templateUrl: './frequencia-admin.component.html',
  styleUrls: ['./frequencia-admin.component.scss']
})
export class FrequenciaAdminComponent implements OnInit {

  viewDetail : boolean = false;
  projetoView : Projeto = new Projeto();
  periodoView : Periodo = new Periodo();
  alunoView : Aluno = new Aluno();
  responsavelView : Usuario = new Usuario();

  filtersFrequencia : FilterSearch = {alunoId: 0, periodoId: 0, projetoId: 0, responsavelId: 0}

  queryField = new FormControl();

  projetoQueryField = new FormControl();

  projetoFilteredOptions: Observable<string[]>;

  periodoQueryField = new FormControl();

  periodoFilteredOptions: Observable<string[]>;

  alunoQueryField = new FormControl();

  alunoFilteredOptions: Observable<string[]>;

  responsavelQueryField = new FormControl();

  responsavelFilteredOptions: Observable<string[]>;

  resultsSearch : Search = {total: 0, results: [], tipo: '', query: '', viewTag: false};

  projetoSearch : Search = {total: 0, results: [], tipo: '', query: '', viewTag: false};

  periodoSearch : Search = {total: 0, results: [], tipo: '', query: '', viewTag: false};

  alunoSearch : Search = {total: 0, results: [], tipo: '', query: '', viewTag: false};

  responsavelSearch : Search = {total: 0, results: [], tipo: '', query: '', viewTag: false};

  projetoSelectFilter : Projeto = new Projeto();

  periodoSelectFilter : Periodo = new Periodo();

  alunoSelectFilter : Aluno = new Aluno();

  responsavelSelectFilter : Usuario = new Usuario();

  projetosFilterFound : Projeto[] = [];

  periodos : Periodo[] = [];

  alunos : Aluno[] = [];

  responsaveis : Usuario[] = [];

  listaAlunosVinculadosTemp: Aluno[] = [];

  listaFrequenciasVinculadasTemp: PeriodoRegistroFrequenciaProjeto[] = [];

  listaProjetos : Projeto[] = [];

  viewMsgErro: boolean;

  viewMsg: boolean;

  msgErro: string = '';

  msg: string = '';

  usuarioLogado: Usuario = new Usuario();

  aluno: Aluno = new Aluno();

  projetoPageable: Page<Projeto> = new Page<Projeto>();

  matriculaSessaoAluno = '';

  constructor(
    public frequenciaService : FrequenciaService,
    public frequenciaRegistroService: FrequenciaRegistroService,
    public sessaoService : SessaoService,
    public projetoService : ProjetoService,
    public periodoService : PeriodoService,
    public alunoService : AlunoService,
    public usuarioService : UserService,
    public rubricaService: RubricaService,
    public dialog : MatDialog,
    private router : Router,
    private rotas : ActivatedRoute) { }

  ngOnInit(): void {
    this.getListaProjetos();
    this.inicializeListProjetos();
    this.getPeriodos();
    this.inicializeListPeriodos();
    this.getAlunos();
    this.inicializeListAlunos();
    this.getUsuarios();
    this.inicializeListResponsaveis();
  }

  verifyRubrica(usuario: Usuario) {
    let adiamento = this.rotas.snapshot.paramMap.get('value');

    this.rubricaService
      .getRubrica(usuario.id)
        .subscribe(
          res => {
            if(!res.hasRubrica && !adiamento){
              this.toPageInformeRubrica()
            }
          }
      );
  }

  private toPageInformeRubrica(){
    this.router.navigate(['informe-rubrica']);
  }

  inicializeListAlunos(){
    this.alunoFilteredOptions = this.alunoQueryField.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, "aluno"))
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

  inicializeListResponsaveis(){
    this.responsavelFilteredOptions = this.responsavelQueryField.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, "responsavel"))
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

  getListaProjetos(){
    let u = this.sessaoService.getUsuario();
    this.usuarioLogado = u;

    this.verifyRubrica(u);

    if(this.usuarioLogado.papel == "Docente" || this.usuarioLogado.papel == "Tecnico_Administrativo"){
      this.projetoService.getProjetosByResponsavel(this.usuarioLogado.siape)
      .subscribe(
        list => {
          this.listaProjetos = list;
          this.initListFilterProjetos(list);
        }

      );
    }else{
      this.projetoService.getProjetosPageable()
      .subscribe(
        res => {
          this.listaProjetos = res.content;
          this.projetoPageable = res;
          this.initListFilterProjetos(res.content);
        }
      );
    }
  }

  nextPage(){
    this.projetoService.getProjetosPageable(this.projetoPageable.number + 1)
    .subscribe(
      res => {
        this.listaProjetos = res.content;
        this.projetoPageable = res;
      }
    );
  }

  goPage(numPage){
    this.projetoService.getProjetosPageable(numPage)
    .subscribe(
      res => {
        this.listaProjetos = res.content;
        this.projetoPageable = res;
        this.setPageAtual(numPage, res);
      }
    );
  }

  setPageAtual(nextPage, pageable, init = false){
    if(!init){
      for(let i = 0; i < pageable.totalPages; i++){
        if(nextPage != i){
          document.getElementById(i.toString()).className = "item";
        }else{
          document.getElementById(i.toString()).className = "item page-atual";
        }
      }
    }
  }

  prevPage(){
    this.projetoService.getProjetosPageable(this.projetoPageable.number - 1)
    .subscribe(
      res => {
        this.listaProjetos = res.content;
        this.projetoPageable = res;
      }
    );
  }

  getAlunos(){
    this.alunoService.getAlunos()
    .subscribe(
      list =>
        this.alunos = list
    );
  }

  getUsuarios(){
    this.usuarioService.getUsuariosResponsaveis()
    .subscribe(
      list =>
        this.responsaveis = list
    );
  }

  getProjetosByFilters(){
    this.projetoService
      .searchByFilters(this.filtersFrequencia)
        .subscribe(
          list => {
            this.listaProjetos = list;
          }
      );
  }

  initListFilterProjetos(list){
    this.projetoFilteredOptions.subscribe(
      res => {
        let results = [];
        for(let p of list){
          results.push(p.titulo);
        }
        res = results;
      }
   );
  }

  detail(p : Projeto){
    this.projetoView = p;

    if (this.viewDetail && p.id != this.projetoView.id)
      this.viewDetail = false;
    else
      this.viewDetail = true;

    this.getFrequenciasVinculadas(p);
    this.getAlunosVinculados(p.id);

  }

  closeDetail(tipo: string) {
    this.viewDetail = false;
    switch(tipo) {
      case "geral":
        this.resultsSearch.viewTag = false;
        break;
      case "projeto":
        this.projetoSearch.viewTag = false;
        this.filtersFrequencia.projetoId = 0;
        this.getProjetosByFilters();
        break;
      case "periodo":
        this.periodoSearch.viewTag = false;
        this.filtersFrequencia.periodoId = 0;
        this.getProjetosByFilters();
        break;
      case "aluno":
        this.alunoSearch.viewTag = false;
        this.filtersFrequencia.alunoId = 0;
        this.getProjetosByFilters();
        break;
      case "responsavel":
        this.responsavelSearch.viewTag = false;
        this.filtersFrequencia.responsavelId = 0;
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

    this.projetoQueryField.setValue(p.titulo);
    this.projetoView = p;
    this.projetoSelectFilter = p;
    this.projetoSearch = {query: p.titulo, tipo: 'projeto', total: 1, viewTag: true, results: [p]};
    this.projetoQueryField.setValue('');
    this.filtersFrequencia.projetoId = p.id;
    this.getProjetosByFilters();

  }

  setPeriodoFilter(p : Periodo){

    this.periodoQueryField.setValue(p.periodoReferencia);
    this.periodoView = p;
    this.periodoSelectFilter = p;
    this.periodoSearch = {query: p.periodoReferencia, tipo: 'periodo', total: 1, viewTag: true, results: [p]};
    this.periodoQueryField.setValue('');
    this.filtersFrequencia.periodoId = p.id;
    this.getProjetosByFilters();

  }

  setAlunoFilter(a : Aluno){

    this.alunoQueryField.setValue(a.nomeCompleto);
    this.alunoView = a;
    this.alunoSelectFilter = a;
    this.alunoSearch = {query: a.nomeCompleto, tipo: 'aluno', total: 1, viewTag: true, results: [a]};
    this.alunoQueryField.setValue('');
    this.filtersFrequencia.alunoId = a.id;
    this.getProjetosByFilters();

  }

  setResponsavelFilter(r : Usuario) {
    this.responsavelQueryField.setValue(r.nomeCompleto);
    this.responsavelView = r;
    this.responsavelSelectFilter = r;
    this.responsavelSearch = {query: r.nomeCompleto, tipo: 'responsavel', total: 1, viewTag: true, results: [r]};
    this.responsavelQueryField.setValue('');
    this.filtersFrequencia.responsavelId = r.id;
    this.getProjetosByFilters();

  }

  private _filter(value: string, tipoPesquisa: string): any[] {
    const filterValue = value;

    let list : any[] = [];

    switch(tipoPesquisa){
      case "aluno":
        list = this.alunos
          .filter(
            a => a.nomeCompleto.toUpperCase().includes(filterValue.toUpperCase()) || a.cpf.includes(filterValue.toUpperCase()) || a.siape.toString().includes(filterValue.toUpperCase())
          );
        break;
      case "periodo":
        list = this.periodos
          .filter(
            p => p.periodoReferencia.includes(filterValue)
          );
        break;
      case "projeto":
        list = this.listaProjetos
          .filter(
            pr => pr.titulo.toUpperCase().includes(filterValue.toUpperCase())
          );
        break;
      case "responsavel":
        list = this.responsaveis
          .filter(
            r => (r.nomeCompleto && r.nomeCompleto.toUpperCase().includes(filterValue.toUpperCase())) || (r.siape && r.siape.toString().toUpperCase().includes(filterValue.toUpperCase()))
          );
        break;
    }
    return list;
  }

  listDialogResponsavel(responsavel: Usuario) {
    const dialogRef = this.dialog.open(ResponsavelViewComponent,
      {
        data: {
          responsavel: responsavel
        }
      });
    dialogRef.afterClosed().subscribe(
      result => {
    });
  }

  exportar(){
    const dialogRef = this.dialog.open(ExportFileComponent);
    dialogRef.afterClosed().subscribe(
      result => {
    }).unsubscribe();
  }

  listDialog(p : Projeto){
    const dialogRef = this.dialog.open(AlunoProjetoModalComponent,
      {
        data: {
          alunos: p.aluno,
          projeto: p
        },
        width: "30%",
        maxWidth: "75%",
        maxHeight: "50%",
        position: {top: "3%"}
      });
    dialogRef.afterClosed().subscribe(
      result => {
    }).unsubscribe();
  }

  listDialogFrequencias(p: Projeto){
    this.getFrequenciasVinculadas(p);
    const dialogRef = this.dialog.open(FrequenciasProjetoModalComponent,
      {
        data: {
          projetoId: p.id,
          frequenciasProjeto: this.listaFrequenciasVinculadasTemp,
          projeto: p
        },
        maxWidth: "80%",
        maxHeight: "50%",
        position: {top: "3%"}
      });
    dialogRef.afterClosed().subscribe(
      result => {
    }).unsubscribe();
  }

  getFrequenciasVinculadas(projeto: Projeto){
    this.frequenciaRegistroService
      .getPeriodosAgrupadosByProjeto(projeto)
        .subscribe(
          dados => {
            this.listaFrequenciasVinculadasTemp = dados
          }
      );
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

  openProjeto(){
    const dialogRef = this.dialog.open(ProjetoFormModalComponent,
      {
        data: {
          projeto: this.projetoView
        }
      });
    dialogRef.afterClosed().subscribe(
      result => {
        this.projetoService
          .getProjetos()
            .subscribe(
              list => {
                this.listaProjetos = list;
                this.projetoFilteredOptions.subscribe(
                  res => {
                    let results = [];
                    for(let p of list){
                      results.push(p.titulo);
                    }
                    res = results;
                  }
               );
            }
        );
    })
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
                this.responsavelFilteredOptions.subscribe(
                  res => {
                    let results = [];
                    for(let r of list){
                      if(r.nomeCompleto == null || r.nomeCompleto == ''){
                        results.push('Sem Nome');
                      }else{
                        results.push(r.nomeCompleto);
                      }
                    }
                    res = results;
                  }
               );
            }
        );
     })
  }

  openAluno(){
    const dialogRef = this.dialog.open(AlunoFormModalComponent, {
      data: {
        res: null
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.alunoService
          .getAlunos()
            .subscribe(
              list => {
                this.alunos = list;
                this.alunoFilteredOptions.subscribe(
                  res => {
                    let results = [];
                    for(let a of list){
                      if(a.nomeCompleto == null || a.nomeCompleto == ''){
                        results.push('Sem Nome');
                      }else{
                        results.push(a.nomeCompleto);
                      }
                    }
                    res = results;
                  }
               );
            }
        );
     })
  }

  hideMsg(){
    this.viewMsgErro = false;
    this.viewMsg = false;
  }

  resendEmail(project: Projeto){
    this.projetoService
    .resendMail(project)
      .subscribe(
        dados => {
          this.msg= "E-mails reenviado com sucesso!";
          this.viewMsg = true;
        }, erro => {
          let erroResponse: ErrorClass = erro.error;
          this.viewMsgErro = true;
          this.msgErro = erroResponse.message;
      }
    );
  }

  // getTotalFrequencias(idProjeto) {
  //   this.frequenciaService
  //     .getFrequenciasByProjeto(idProjeto)
  //       .subscribe(
  //         resp => {
  //           return resp.length
  //         }
  //     );
  // }
}
