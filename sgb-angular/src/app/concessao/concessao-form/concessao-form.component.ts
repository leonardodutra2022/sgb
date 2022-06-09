import { Component, OnInit } from '@angular/core';
import { Concessao } from 'src/app/model/concessao';
import { ConcessaoService } from 'src/app/service/concessao.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BeneficioService } from 'src/app/service/beneficio.service';
import { MatDialog } from '@angular/material/dialog';
import { Beneficio } from 'src/app/model/beneficio';
import { Aluno } from 'src/app/model/aluno';
import { Processos } from 'src/app/model/processos';
import { AlunoService } from 'src/app/service/aluno.service';
import { ProcessosService } from 'src/app/service/processos.service';
import * as _moment from 'moment';
import { FormControl } from '@angular/forms';

const moment = _moment;

interface ConcessaoStatus {
  status:string;
}

@Component({
  selector: 'app-concessao-form',
  templateUrl: './concessao-form.component.html',
  styleUrls: ['./concessao-form.component.scss']
})
export class ConcessaoFormComponent implements OnInit {

  idTemp: string = '';
  selecaoStConcessao = '';
  
  concessao: Concessao = new Concessao();

  selecaoProcesso = '';
  selecaoAluno = '';
  selecaoBeneficio = '';
  selecaoConcessao = '';

  concessaoValid : boolean = true;

  beneficios : Beneficio[] = [];
  processos : Processos[] = [];
  concessoes : Concessao[] = [];
  alunos : Aluno[] = [];

  dateConcessao = new FormControl();
  dateConcessaoEncerramento = new FormControl();

  listStConcessoes : ConcessaoStatus [] = [
    {status: "CONCEDIDO"},
    {status: "RENOVADO"},
    {status: "CANCELADO"}
  ];

  constructor(private concessaoService : ConcessaoService,
              private alunoService : AlunoService,
              private processoService : ProcessosService,
              private beneficioService : BeneficioService,
              private sessaoService : SessaoService,
              private dialog : MatDialog, 
              private router : Router, 
              private rotas : ActivatedRoute) { }

  ngOnInit() {
    this.carregarConcessao();
    this.carregarBeneficios();
    this.carregarProcessos();
    this.carregarAlunos();
  }

  carregarAlunos(){
    this.alunoService.getAlunos()
      .subscribe(
        list => this.alunos = list
    );
  }

  carregarProcessos(){
    this.processoService.getProcessos()
      .subscribe(
        list => this.processos = list
    );
  }

  carregarConcessao() {
    this.idTemp = this.rotas.snapshot.paramMap.get('id');
    if (this.idTemp != null) {
      this.concessaoService.getConcessoesById(this.idTemp)
        .subscribe(temp => {
          this.concessao = temp;
          this.selecaoConcessao = temp.id;
          this.selecaoStConcessao = temp.concessaoStatus;
          this.selecaoAluno = temp.aluno.id;
          this.selecaoBeneficio = temp.beneficio.id;
          this.selecaoProcesso = temp.processo.id;
      });
    }
  }

  carregarBeneficios(){
    this.beneficioService.getBeneficios()
      .subscribe(
        list => this.beneficios = list
    );
  }

  add() {
    this.concessao.concessaoStatus = this.selecaoStConcessao;
    this.concessao.dataConcessao = this.dateConcessao.value;
    this.concessao.dataConcessaoFinal = this.dateConcessaoEncerramento.value;
    
    this.concessaoService.add(this.concessao).subscribe(() => this.retonar());
  }

  retonar(){
    this.router.navigate(['/concessao']);
  }

  changeStatusConcessao(st) {
    this.selecaoStConcessao = st;
  }

  changeBeneficio(beneficio){
    this.beneficioService
      .getBeneficiosById(beneficio)
        .subscribe(
          dados => {
            this.concessao.beneficio = dados;
          }
        );
  }

  save() {
    this.concessao.concessaoStatus = this.selecaoStConcessao;
    this.concessao.dataConcessao = this.dateConcessao.value;
    this.concessao.dataConcessaoFinal = this.dateConcessaoEncerramento.value;
    
    this.concessaoService.update(this.concessao)
      .subscribe(
        _ => this.retonar()
    );
  }

  changeProcesso(p){
    this.processoService
      .getProcessosById(p)
        .subscribe(
          dados => {
            this.concessao.processo = dados;
          }
        );
  }

  changeAluno(a){
    this.alunoService
      .getAlunosById(a)
        .subscribe(
          dados => {
            this.concessao.aluno = dados;
          }
        );
  }
}
