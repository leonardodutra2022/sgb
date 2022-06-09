import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { Aluno } from 'src/app/model/aluno';
import { Subscription } from 'src/app/model/subscription';
import { LogradouroTipoService } from 'src/app/service/logradouro.tipo.service';
import { EstadoService } from 'src/app/service/estado.service';
import { CidadeService } from 'src/app/service/cidade.service';
import { LogradouroTipo } from 'src/app/model/logradouro.tipo';
import { Estado } from 'src/app/model/estado';
import { Cidade } from 'src/app/model/cidade';
import { Logradouro } from 'src/app/model/logradouro';
import { AlunoService } from 'src/app/service/aluno.service';
import { Usuario } from 'src/app/model/usuario';
import { Processos } from 'src/app/model/processos';
import { ProcessosService } from 'src/app/service/processos.service';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InscricaoPendenciaService } from 'src/app/service/inscricao.pendencia.service.service';
import { InscricaoPendencia } from 'src/app/model/inscricao.pendencia';
import { UpdateModalComponent } from 'src/app/cadastro/update-modal/update-modal.component';

export interface TipoCasa {
  value: string;
  tipo: string;
}

@Component({
  selector: 'app-subscription-contatos-enderecos-form',
  templateUrl: './subscription.contatos.enderecos.form.component.html',
  styleUrls: ['./subscription.contatos.enderecos.form.component.scss']
})
export class SubscriptionContatosEnderecosFormComponent implements OnInit {

  processoAtual : Processos = new Processos();

  idProcesso = '';
  isModalForm : boolean = false;

  selecaoTipoCasa = '';

  selectTipoLogradouro = '';
  selecaoTipoLogradouro : LogradouroTipo = new LogradouroTipo();

  selectUF = '';
  selecaoUF : Estado = new Estado();

  selectCidade = '';
  selecaoCidade : Cidade = new Cidade();

  inscricaoAtual: Subscription = new Subscription();
  aluno: Aluno = new Aluno();
  matriculaSessaoAluno = '';
  logradouro : Logradouro = new Logradouro();
  listTipoCasa : TipoCasa[] = [
    {value:'CASA', tipo:'Casa'},
    {value:'APTO', tipo:'Apartamento'},
    {value:'COMODO', tipo:'Cômodo'}
  ];
  listTipoLog : LogradouroTipo[] = [];
  listEstados : Estado[] = [];
  listCidades:Cidade[] = [];
  isExistValidacao : boolean = false;
  isUpdate : boolean = false;
  fetching : boolean = false;
  inscricaoValidacao : InscricaoValidacao = new InscricaoValidacao();

  constructor(
    private subscriptionService : SubscriptionService, 
    private alunoService : AlunoService, 
    private logradouroTipoService : LogradouroTipoService, 
    private sessaoService : SessaoService,
    private estadoService : EstadoService, 
    private cidadeService : CidadeService,
    private inscricaoValidaService : InscricaoValidacaoService,
    private rotas : ActivatedRoute,
    private processoService : ProcessosService,
    private dialog : MatDialog,
    private router : Router,
    private inscricaoPendenteService : InscricaoPendenciaService) { }

  ngOnInit() {
    this.carregarProcesso();
    this.carregarListas();
  }

  setTipoLogradouro(event){
    this.selectTipoLogradouro = event;
    this.logradouroTipoService.getLogradouroTipoById(event).subscribe(
      temp => {
        this.selecaoTipoLogradouro = temp
      }
    );
  }

  setCidade(event){
    this.selectCidade = event;
    this.cidadeService.getCidadeById(event).subscribe(
      temp => {
        this.selecaoCidade = temp
      }
    );
  }

  carregarContatosEnderecos() {
    this.setLogradouro();
    this.setLogradouroTipo();
    this.setEstado();
    this.setCidadeDados();
  }

  carregarListas(){
    this.estadoService.getEstados().subscribe(
      temp => this.listEstados = temp
    );
    this.logradouroTipoService.getLogradourosTipos().subscribe(
      temp => this.listTipoLog = temp
    );
  }

  carregarListaCidades(idUf){
    this.selectUF = idUf;
    this.estadoService.getEstadoById(idUf).subscribe(
      estadoTemp => {
        this.selecaoUF = estadoTemp
        this.cidadeService.getCidadeByUF(estadoTemp.sigla).subscribe(
          listTemp => this.listCidades = listTemp
        );
      }
    );
  }

  salvar() {
    let logradouroTemp : Logradouro = new Logradouro();
    this.aluno.uf = this.selecaoUF;
    this.aluno.cidade = this.selecaoCidade;


    if(this.aluno.logradouro != null && typeof this.aluno.logradouro != 'undefined'){
      if(this.aluno.logradouro.id == this.aluno.logradouroMoradiaFamilia.id){
        logradouroTemp = this.logradouro;
        this.logradouro = new Logradouro();

        this.logradouro.uf = this.selecaoUF;
        this.logradouro.tipoRua = this.selecaoTipoLogradouro;
        this.logradouro.cidade = this.selecaoCidade;
        this.logradouro.tipoCasa = this.selecaoTipoCasa;
        this.logradouro.nomeRua = logradouroTemp.nomeRua;
        this.logradouro.cep = logradouroTemp.cep;
        this.logradouro.bairro = logradouroTemp.bairro;
        this.logradouro.numCasa = logradouroTemp.numCasa;
        this.logradouro.complemento = logradouroTemp.complemento;
        this.logradouro.referencia = logradouroTemp.referencia;
      }else{
        this.logradouro.uf = this.selecaoUF;
        this.logradouro.tipoRua = this.selecaoTipoLogradouro;
        this.logradouro.cidade = this.selecaoCidade;
        this.logradouro.tipoCasa = this.selecaoTipoCasa;
      }
    }else{
      logradouroTemp = this.logradouro;
      this.logradouro = new Logradouro();

      this.logradouro.uf = this.selecaoUF;
      this.logradouro.tipoRua = this.selecaoTipoLogradouro;
      this.logradouro.cidade = this.selecaoCidade;
      this.logradouro.tipoCasa = this.selecaoTipoCasa;
      this.logradouro.nomeRua = logradouroTemp.nomeRua;
      this.logradouro.cep = logradouroTemp.cep;
      this.logradouro.bairro = logradouroTemp.bairro;
      this.logradouro.numCasa = logradouroTemp.numCasa;
      this.logradouro.complemento = logradouroTemp.complemento;
      this.logradouro.referencia = logradouroTemp.referencia;

      this.logradouro.uf = this.selecaoUF;
      this.logradouro.tipoRua = this.selecaoTipoLogradouro;
      this.logradouro.cidade = this.selecaoCidade;
      this.logradouro.tipoCasa = this.selecaoTipoCasa;
    }

    this.aluno.logradouro = this.logradouro;

    this.inscricaoAtual.aluno = this.aluno

    this.fetching = true;

    this.alunoService.update(this.aluno)
      .subscribe(
        dados => {
          this.checkInscricaoStatus();
          this.subscriptionService.update(this.inscricaoAtual).subscribe(
            temp => {
                this.inscricaoAtual = temp;
                this.addValidacao();
                this.router.navigate([`/processos/${this.processoAtual.id}/inscricao/moradia-transporte`]);
            }
          );
        }
    );
  }

  checkInscricaoStatus(){
    if(this.inscricaoValidaService.checkInscricaoValidacao(this.inscricaoValidacao)){
      this.inscricaoAtual.situacao = "INSCRITO";
    }else{
      this.inscricaoAtual.situacao = "NAO_INSCRITO";
    }
  }

  salvarPendente() {
    let pendencia : InscricaoPendencia = new InscricaoPendencia();
    let logradouroTemp : Logradouro = new Logradouro();

    this.aluno.uf = this.selecaoUF;
    this.aluno.cidade = this.selecaoCidade;


    if(this.aluno.logradouro.id == this.aluno.logradouroMoradiaFamilia.id){
      logradouroTemp = this.logradouro;
      this.logradouro = new Logradouro();

      this.logradouro.uf = this.selecaoUF;
      this.logradouro.tipoRua = this.selecaoTipoLogradouro;
      this.logradouro.cidade = this.selecaoCidade;
      this.logradouro.tipoCasa = this.selecaoTipoCasa;
      this.logradouro.nomeRua = logradouroTemp.nomeRua;
      this.logradouro.cep = logradouroTemp.cep;
      this.logradouro.bairro = logradouroTemp.bairro;
      this.logradouro.numCasa = logradouroTemp.numCasa;
      this.logradouro.complemento = logradouroTemp.complemento;
      this.logradouro.referencia = logradouroTemp.referencia;
    }else{
      this.logradouro.uf = this.selecaoUF;
      this.logradouro.tipoRua = this.selecaoTipoLogradouro;
      this.logradouro.cidade = this.selecaoCidade;
      this.logradouro.tipoCasa = this.selecaoTipoCasa;
    }

    
    this.aluno.logradouro = this.logradouro;

    this.inscricaoAtual.aluno = this.aluno
    
    this.fetching = true;

    this.alunoService.update(this.aluno)
      .subscribe(
        dados => {
          this.checkInscricaoStatus();
          this.subscriptionService.update(this.inscricaoAtual).subscribe(
            temp => {
                this.inscricaoAtual = temp;
                this.inscricaoPendenteService
                .getPendenciasByInscricaoAndForm(temp.id, "INSCRICAO_LOGRADOURO_CONTATO")
                  .subscribe(
                    dados => {
                      pendencia = dados;
                      if(!dados.concluido){
                        pendencia.concluido = true;
                        this.inscricaoPendenteService
                          .update(pendencia)
                            .subscribe(
                              _ => {
                                this.addValidacao();
                                this.updateSucess();
                              }
                            );
                         }
                      }
                  );
              }
          );
        }
    );
  }

  setLogradouroFamiliar() {
    this.logradouro = new Logradouro();
    this.logradouro = this.aluno.logradouroMoradiaFamilia;

    this.selectUF = this.aluno.logradouroMoradiaFamilia.uf.id;
    this.selectTipoLogradouro = this.aluno.logradouroMoradiaFamilia.tipoRua.id;
    this.selectCidade = this.aluno.logradouroMoradiaFamilia.cidade.id;
    this.selecaoTipoCasa = this.aluno.logradouroMoradiaFamilia.tipoCasa;

    this.aluno.logradouro = this.logradouro;

    this.setLogradouroTipo();
    this.carregarListaCidades(this.selectUF);
    this.setCidade(this.aluno.logradouroMoradiaFamilia.cidade.id);
    // this.setCidadeDados();
  }

  updateSucess(){
    const dialogRef = this.dialog.open(UpdateModalComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
          this.dialog.closeAll();
          this.dialog.afterAllClosed.subscribe(
            _ => 
              {
                this.router.navigate(['/inscricoes']);
              }
          );
        }
    });
  }

  onStatusChangeDecLogradouro(aluno : Aluno) {
    if(aluno.declaracaoLogradouroAtual == true){
      aluno.declaracaoLogradouroAtual = false;
    }else{
      aluno.declaracaoLogradouroAtual = true;
    }
  }

  getAluno(dados){
    let u : Usuario = new Usuario();
    u = this.sessaoService.getUsuarioLogado();
    this.matriculaSessaoAluno = u.siape;
    this.alunoService.getAlunoByMatricula(this.matriculaSessaoAluno)
      .subscribe(
        aluno => 
          {
            if(aluno == null && typeof aluno == 'undefined'){
              this.aluno = new Aluno();
            }else{
              this.aluno = aluno;
              this.getInscricao(dados);
              this.carregarContatosEnderecos();
            }
          }
      );
  }

  setLogradouro(){
    if(this.aluno.logradouro !== null && typeof this.aluno.logradouro !== 'undefined'){
      this.logradouro = this.aluno.logradouro;
      this.selecaoTipoCasa = this.logradouro.tipoCasa;
      this.selecaoTipoLogradouro = this.logradouro.tipoRua;
      this.selecaoCidade = this.aluno.cidade;
      this.selecaoUF = this.aluno.uf;
    }else{
      this.logradouro = new Logradouro()
    }
  }

  setLogradouroTipo(){
    if(this.aluno.logradouro !== null && typeof this.aluno.logradouro !== 'undefined'){
      this.selecaoTipoLogradouro = new LogradouroTipo();
      this.selecaoTipoLogradouro = this.aluno.logradouro.tipoRua;
      this.selectTipoLogradouro = this.aluno.logradouro.tipoRua.id
    }else{
      this.selecaoTipoLogradouro = new LogradouroTipo();
    }
  }

  setEstado(){
    if(this.aluno.uf !== null && typeof this.aluno.uf !== 'undefined'){
      this.selecaoUF = new Estado();
      this.selecaoUF = this.aluno.uf;
      this.selectUF = this.aluno.uf.id
      this.carregarListaCidades(this.selectUF);
    }else{
      this.selecaoUF = new Estado();
    }
  }

  setCidadeDados(){
    if(this.aluno.cidade !== null && typeof this.aluno.cidade !== 'undefined'){
      this.selecaoCidade = new Cidade();
      this.selecaoCidade = this.aluno.cidade;
      this.selectCidade = this.aluno.cidade.id
    }else{
      this.selecaoCidade = new Cidade();
    }
  }

  getInscricao(dados){
    this.subscriptionService
      .getInscricaoByProcessoAndMatriculaAluno(dados.id, this.aluno.siape)
        .subscribe(
          inscricao =>
            {
              if(inscricao != null){
                this.inscricaoAtual = inscricao;
                this.isUpdate = true;
                this.carregarValidacao(inscricao);
              }else{
                this.inscricaoAtual = new Subscription();
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
                this.processoAtual = dados;
                // this.isModalForm = true;
                this.getAluno(dados);
              }
          );
    }else{
      this.processoAtual = ProcessosService.processoAtual;
      this.isModalForm = false;
      this.getAluno(this.processoAtual);
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
    this.checkInscricaoStatus();
    if(this.isExistValidacao){
      this.inscricaoValidacao.dadosContatosLogradouroCompleto = true;
      this.inscricaoValidaService.update(this.inscricaoValidacao)
        .subscribe(
          _ => {
            this.inscricaoValidaService.stepContatos.next(true);
            this.checkInscricaoStatus();
          }
        );
    }
   }

  editEnable() {
    this.inscricaoValidacao.dadosContatosLogradouroCompleto = false;
  }

  dbClick(){
    this.fetching = true;
  }
}
