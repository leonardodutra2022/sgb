import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/model/aluno';
import { AlunoService } from 'src/app/service/aluno.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BeneficioService } from 'src/app/service/beneficio.service';
import { Beneficio } from 'src/app/model/beneficio';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { DadosAcademicos } from 'src/app/model/dados.academicos';
import { DadosAcademicosService } from 'src/app/service/dados.academicos.service';
import { UserModalComponent } from 'src/app/user/user-modal/user.modal.component';
import { Concessao } from 'src/app/model/concessao';
import { ConcessaoService } from 'src/app/service/concessao.service';

interface ConcessaoStatus {
  status:string;
}

interface Curso {
  nome: string;
}

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno.form.component.html',
  styleUrls: ['./aluno.form.component.scss']
})
export class AlunoFormComponent implements OnInit {

  idTemp: string = '';
  idBenTemp: string = '';
  aluno: Aluno = new Aluno();
  selecaoAluno : string = '';
  selecaoConcessao : string = '';
  selecaoCurso : string = '';
  selecaoBeneficio : string = '';
  selecaoStatus : string = '';
  listBeneficios : Beneficio[] = [];
  listConcessoes : Concessao[] = [];
  listCursos : Curso[] = [
    {nome:'Outro Curso'},
    {nome:"Ciências da Computação"},
    {nome:"Engenharia Civil"},
    {nome:"Engenharia de Minas"},
    {nome:"Engenharia Ambiental"},
    {nome:"Sistemas de Informação"}
  ];
  listConcessaoStatus : ConcessaoStatus [] = [
    {status: "CONCEDIDO"},
    {status: "RENOVADO"},
    {status: "CANCELADO"}
  ];
  vinculosAcademicos : DadosAcademicos[] = [];
  dadosAcad : DadosAcademicos = new DadosAcademicos();
  dadosConcessao : Concessao = new Concessao();
  acad:DadosAcademicos = new DadosAcademicos();
  alunoTemp : Aluno = new Aluno();
  concessaoTemp : Concessao = new Concessao();
  concessao : Concessao = new Concessao();
  nomeAluno : string = '';
  isExistAluno : boolean = false;
  isExistConcessao : boolean = false;
  dataConcessaoEdit = '';
  dataConcessaoFinalEdit = '';


  grupoAcad = this.fb.group({

    acad: this.fb.group({
      id: [this.dadosAcad.id],
      matricula: [this.dadosAcad.matricula, Validators.nullValidator],
      curso: [this.dadosAcad.curso, Validators.nullValidator],
      periodoLetivo: [this.dadosAcad.periodoLetivo]
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });


  grupoBen = this.fb.group({

    ben: this.fb.group({
      id: [this.dadosConcessao.id],
      dataConcessao: [this.dadosConcessao.dataConcessao],
      dataConcessaoFinal: [this.dadosConcessao.dataConcessaoFinal],
      beneficio: [this.dadosConcessao.beneficio, Validators.required],
      concessaoStatus: [this.dadosConcessao.concessaoStatus, Validators.required]
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });



  constructor(private alunoService : AlunoService, private sessaoService : SessaoService,
    private dialog : MatDialog, private router : Router, private rotas : ActivatedRoute,
    private beneficioService: BeneficioService, private fb: FormBuilder, 
    private dadosAcadService : DadosAcademicosService, private concessaoService : ConcessaoService) { }

  ngOnInit() {
    this.carregarAluno();
    this.carregarBeneficios();
    this.carregarDadosAcad();
  }

  get aliases() {
    return this.grupoAcad.get('aliases') as FormArray;
  }

  get aliasesConcessao() {
    return this.grupoBen.get('aliases') as FormArray;
  }

  resetFormAcad(){
    this.grupoAcad.reset();
    this.idTemp = '';
  }

  resetFormBen(){
    this.grupoBen.reset();
    this.idBenTemp = '';
  }

  addAlias() {
    let acad = this.grupoAcad.value;
    this.salvarFormAcad(acad.acad);
    this.resetFormAcad();
  }

  addAliasBen() {
    let b = this.grupoBen.value;
    this.salvarFormBen(b.ben);
    this.resetFormBen();
  }


  atualizar() {
    if(this.idTemp !== null && this.idTemp !== '' && typeof this.idTemp !== 'undefined'){
      this.dadosAcad = this.grupoAcad.value.acad;
      this.dadosAcad.aluno = this.aluno;
      this.dadosAcadService.update(this.dadosAcad).subscribe(
        _ => {
          this.atualizarListAcad()
          this.resetFormAcad()
        }
      );
    }
  }


  atualizarConcessao() {
    if(this.idBenTemp !== null && this.idBenTemp !== '' && typeof this.idBenTemp !== 'undefined'){
      this.dadosConcessao = this.grupoBen.value.ben;
      this.dadosConcessao.aluno = this.aluno;
      this.concessaoService.update(this.dadosConcessao).subscribe(
        _ => {
          this.atualizarListaConcessao()
          this.resetFormBen()
        }
      );
    }
  }


  openDeleteDialog(id) {
    const dialogRef = this.dialog.open(UserModalComponent);
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
          this.dadosAcadService.delete(id).subscribe(_ => this.atualizarListAcad())
       }
    });
  }



  openDeleteDialogConcessao(id) {
    const dialogRef = this.dialog.open(UserModalComponent);
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
          this.concessaoService.delete(id).subscribe(_ => this.atualizarListaConcessao())
       }
    });
  }


  salvarFormAcad(dados : DadosAcademicos){

    if(!this.isExistAluno){
      let tempAluno = new Aluno();

      this.aluno.siape = "-";
      this.aluno.email = "@";
      this.aluno.siape = "-";
      this.aluno.anoConclusao = 0;
      this.aluno.percentualBolsa = 0;
      this.aluno.valorAssisMedica = 0;
      this.aluno.rendaFamiliar = 0;


      this.aluno.nomeCompleto = this.aluno.nomeCompleto;
      this.aluno.cpf = this.selecaoAluno;

      this.alunoService.addTemp(this.aluno)
      .subscribe(
        _ => 
        {
          this.aluno = _
          dados.aluno = this.aluno;
          this.dadosAcad = dados;
          this.dadosAcadService.add(this.dadosAcad).subscribe(
            temp => {
              this.dadosAcad = temp
              this.atualizarListAcad()
            }
          );

        }
      )

      dados.aluno = this.aluno;

    }else{

      dados.aluno = this.aluno;
      this.dadosAcad = dados;
      this.dadosAcadService.add(this.dadosAcad).subscribe(
        temp => {
          this.dadosAcad = temp
          this.atualizarListAcad()
        }
      );

    }


  }



  salvarFormBen(ben : Concessao){

    if(!this.isExistConcessao){
      let tempConcessao = new Concessao();

      this.dadosConcessao.aluno = this.aluno;
      this.dadosConcessao.beneficio = this.selecaoBeneficio;
      this.dadosConcessao.concessaoStatus = this.selecaoStatus;
      this.dadosConcessao.dataConcessao = this.dataConcessaoEdit;
      this.dadosConcessao.dataConcessaoFinal = this.dataConcessaoFinalEdit;

      this.concessaoService.add(this.dadosConcessao)
      .subscribe(
        _ => {
          this.atualizarListaConcessao()
        }
      )

    }else{

    }


  }

  atualizarListaConcessao() {
    this.concessaoService.getConcessoesByCpf(this.selecaoAluno)
      .subscribe(
        list => {
          this.listConcessoes = []
          this.listConcessoes = list
        }
      )
  }

  atualizarListAcad(){
    this.dadosAcadService.getAllDadosAcademicosByAlunoCpf(this.selecaoAluno).subscribe(
      list => {
        this.vinculosAcademicos = []
        this.vinculosAcademicos = list
      }
    );
  }

  edit(dados:DadosAcademicos) {
    this.idTemp = dados.id;
    this.grupoAcad.setValue({
      'acad': {
        'id': dados.id,
        'matricula': dados.matricula,
        'curso': dados.curso,
        'periodoLetivo':dados.periodoLetivo
      },
      'aliases':'0'
    });
    this.idTemp = dados.id;
    this.dadosAcad = dados;
  }


  editConcessao(dados:Concessao) {
    this.idBenTemp = dados.id;
    this.grupoBen.setValue({
      'ben': {
        'id': dados.id,
        'beneficio': dados.beneficio,
        'concessaoStatus': dados.concessaoStatus,
        'dataConcessao': dados.dataConcessao,
        'dataConcessaoFinal': dados.dataConcessaoFinal
      },
      'aliases':'0'
    });
    this.idBenTemp = dados.id;
    this.dadosConcessao = dados

    this.concessaoService.getConcessoesById(dados.id)
      .subscribe(
        temp => {
          this.selecaoBeneficio = temp.beneficio
          
        }
      );

  }


  update(aluno){
    this.alunoService.update(aluno)
    .subscribe(result => aluno = result);
  }

  carregarBeneficios(){
    this.beneficioService.getBeneficios()
      .subscribe(
        temp => this.listBeneficios = temp
      )
  }

  carregarConcessoes(cpf) {
    this.concessaoService.getConcessoesByCpf(cpf)
      .subscribe(
        temp => this.listConcessoes = temp
      )
  }

  carregarAluno() {
    this.idTemp = this.rotas.snapshot.paramMap.get('id');
    if (this.idTemp != null) {
      this.alunoService.getAlunosById(this.idTemp)
        .subscribe(temp => {
          this.aluno = temp;
          this.selecaoAluno = temp.cpf
          this.changeAluno(this.selecaoAluno)
        });
    }
  }

  carregarAlunoPorCpf(cpf){
    this.alunoService.getAlunoByCpf(cpf)
      .subscribe(
        temp => 
          {
            if(temp != null && typeof temp != undefined){
              this.aluno = temp
              this.isExistAluno = true;
            }else{
              this.setAluno(cpf)
              this.isExistAluno = false;
            }
          }
      )
  }

  carregarDadosAcad() {
    this.dadosAcadService.getAllDadosAcademicosByAlunoCpf(this.selecaoAluno)
      .subscribe(
        temp => this.vinculosAcademicos = temp
      )
  }

  add() {
    this.aluno.cpf = this.selecaoAluno;

    this.alunoService.add(this.aluno)
      .subscribe(
        () => this.retonar());
  }

  retonar(){
    this.router.navigate(['/cadastro/aluno']);
  }

  changeCurso(curso){
    this.selecaoCurso = curso
  }

  setAluno(cpf){
    let aluTemp = new Aluno();
    aluTemp.nomeCompleto = this.aluno.nomeCompleto;
    aluTemp.cpf = cpf;
  }

  changeAluno(cpf){
    
    this.selecaoAluno = cpf
    this.dadosAcadService.getAllDadosAcademicosByAlunoCpf(cpf)
      .subscribe(
        temp => 
          {
            this.vinculosAcademicos = []
            this.vinculosAcademicos = temp
            this.carregarAlunoPorCpf(cpf)
            this.carregarConcessoes(cpf)
            this.aluno = new Aluno();
          }
      )
  }

  changeNomeAluno(event){
    this.aluno.nomeCompleto = event;
    this.alunoTemp.nomeCompleto = event;
  }

  changeBeneficio(ben){
    this.selecaoBeneficio = ben
  }

  save() {
    this.alunoService.update(this.aluno)
      .subscribe(_ => this.retonar());
  }

}
