import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { Subscription } from 'src/app/model/subscription';
import { Beneficio } from 'src/app/model/beneficio';
import { BeneficioService } from 'src/app/service/beneficio.service';
import { Usuario } from 'src/app/model/usuario';
import { SessaoService } from 'src/app/service/sessao.service';
import { Processos } from 'src/app/model/processos';
import { Aluno } from 'src/app/model/aluno';
import { AlunoService } from 'src/app/service/aluno.service';
import { ProcessosService } from 'src/app/service/processos.service';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { Router, ActivatedRoute } from '@angular/router';
import { ConcessaoService } from 'src/app/service/concessao.service';
import { Concessao } from 'src/app/model/concessao';

@Component({
  selector: 'app-subscription-outros-auxilios-form',
  templateUrl: './subscription.outros.auxilios.form.component.html',
  styleUrls: ['./subscription.outros.auxilios.form.component.scss']
})
export class SubscriptionOutrosAuxiliosFormComponent implements OnInit {

  inscricao:Subscription = new Subscription();
  selecaoBeneficio : Beneficio[] = [];
  listBeneficios : Beneficio[] = [];
  processo : Processos = new Processos();
  aluno : Aluno = new Aluno();
  inscricaoValidacao : InscricaoValidacao = new InscricaoValidacao();
  matriculaSessaoAluno = '';
  idProcesso = '';
  isExistValidacao : boolean = false;
  isModalForm : boolean = false;
  isUpdate : boolean = false;
  concessoes : Concessao[] = [];

  auxMoradiaExist : boolean = false;
  auxEmergencialExist : boolean = false;
  auxBiaExist : boolean = false;
  isencaoRuExist : boolean = false;
  fetching : boolean = false;

  constructor(private inscricaoService : SubscriptionService,
              private beneficioService : BeneficioService,
              private sessaoService : SessaoService,
              private alunoService : AlunoService,
              private inscricaoValidaService : InscricaoValidacaoService,
              private router : Router, 
              private processoService : ProcessosService,
              private rotas : ActivatedRoute,
              private concessaoService : ConcessaoService) { }

  ngOnInit() {    
    this.getAluno();
  }

  carregarConcessoes(id){
    this.concessaoService.
      getConcessoesByAlunoId(id).
        subscribe(
          lista => {
            this.concessoes = [];
            this.concessoes = lista;
            this.checkAuxExistentes();
          }
      );
  }

  checkAuxExistentes(){
    for(let c of this.concessoes){
      switch(c.beneficio.id){
        case 1:
          this.inscricao.auxMoradiaPrae = true;
          this.auxMoradiaExist = true;
          break;
        case 2:
          this.inscricao.auxEmergPrae = true;
          this.auxEmergencialExist = true;
          break;
        case 3:
          this.inscricao.bolsaIniAcadPrae = true;
          this.auxBiaExist = true;
          break;
        case 5:
          this.inscricao.isencaoRUPrae = true;
          this.isencaoRuExist = true;
          break;
      }
    }
  }

  add(){
    this.inscricao.beneficios = this.selecaoBeneficio;

    this.fetching = true;

    this.inscricaoService.update(this.inscricao).subscribe(
      temp => 
        {
          this.inscricao = temp;
          this.addValidacao();
          this.checkInscricaoStatus();
          this.router.navigate([`/processos/${this.processo.id}/inscricao/info-acad`]);
        }
    );
  }

  changeBeneficio(dados) {
    this.selecaoBeneficio = dados;
  }

  carregarBeneficios(){
    this.beneficioService.getBeneficios()
      .subscribe(
        list => 
        {
          this.listBeneficios = list;
          
        }
      );
  }

  carregarListaSelecaoBeneficios(){
    this.selecaoBeneficio = [];
    this.selecaoBeneficio = this.inscricao.beneficios;
  }

  getInscricao(dados){
    this.inscricaoService
      .getInscricaoByProcessoAndMatriculaAluno(dados.id, this.aluno.siape)
        .subscribe(
          inscricao =>
            {
              if(inscricao != null && typeof inscricao != 'undefined'){
                this.inscricao = inscricao;
                this.carregarValidacao(inscricao);
                this.carregarListaSelecaoBeneficios();
                this.carregarConcessoes(inscricao.aluno.id);
                this.checkAuxExistentes();
                this.isUpdate = true;
              }else{
                this.inscricao = new Subscription();
              }
            }
        );
  }

  getAluno(){
    let u : Usuario = new Usuario();
    u = this.sessaoService.getUsuarioLogado();
    this.matriculaSessaoAluno = u.siape;
    this.alunoService.getAlunoByMatricula(this.matriculaSessaoAluno)
      .subscribe(
        aluno => 
          {
            if(aluno == null){
              this.aluno = new Aluno();
            }else{
              this.aluno = aluno;
              this.carregarBeneficios();
              this.carregarProcesso();
              this.carregarConcessoes(aluno.id);
            }
          }
      );
  }

  carregarProcesso(){
    this.idProcesso = this.rotas.snapshot.paramMap.get('id');
    if(this.idProcesso != null && this.idProcesso != "" && typeof this.idProcesso != 'undefined'){
      this.processoService
        .getProcessosById(this.idProcesso)
          .subscribe(
            dados => 
              {
                this.processo = dados;
                // this.isModalForm = true;
                this.getInscricao(dados);
              }
          );
    }else{
      this.processo = ProcessosService.processoAtual;
      this.isModalForm = false;
      this.getInscricao(this.processo);
    }
  }

  carregarValidacao(inscricao){
    this.inscricaoValidaService.getInscricaoValidacaoByInscricao(inscricao.id)
      .subscribe(
        dados => {
          if(dados != null && typeof dados != 'undefined'){
            this.isExistValidacao = true;
            this.inscricaoValidacao = dados;
          }else{
            this.isExistValidacao = false;
            this.inscricaoValidacao = new InscricaoValidacao();
          }
        }
      );
  }

  addValidacao(){
    this.inscricaoValidacao.dadosOutrosAuxiliosCompleto = true;
    if(this.isExistValidacao){
      this.inscricaoValidaService.update(this.inscricaoValidacao)
        .subscribe(
          _ => {
            this.inscricaoValidaService.stepAuxilios.next(true);
            this.inscricaoValidaService.reload$.next(true);
            this.checkInscricaoStatus();
          }
        );
      }
   }

   checkInscricaoStatus(){
    if(this.inscricaoValidaService.checkInscricaoValidacao(this.inscricaoValidacao)){
      this.inscricao.situacao = "INSCRITO";
    }else{
      this.inscricao.situacao = "NAO_INSCRITO";
    }
  }

  editEnable() {
    this.inscricaoValidacao.dadosOutrosAuxiliosCompleto = false;
  }

  dbClick(){
    this.fetching = true;
  }
}
