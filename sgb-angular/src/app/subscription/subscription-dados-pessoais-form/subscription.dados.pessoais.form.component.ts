import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { Subscription } from 'src/app/model/subscription';
import { Aluno } from 'src/app/model/aluno';
import { Processos } from 'src/app/model/processos';
import { Usuario } from 'src/app/model/usuario';
import { BancoService } from 'src/app/service/banco.service';
import { OrgaoExpedidorService } from 'src/app/service/orgao.expedidor.service';
import { Banco } from 'src/app/model/banco';
import { OrgaoExpedidor } from 'src/app/model/orgao.expedidor';
import { Logradouro } from 'src/app/model/logradouro';
import { LogradouroTipo } from 'src/app/model/logradouro.tipo';
import { EstadoService } from 'src/app/service/estado.service';
import { Estado } from 'src/app/model/estado';
import { Cidade } from 'src/app/model/cidade';
import { LogradouroTipoService } from 'src/app/service/logradouro.tipo.service';
import { CidadeService } from 'src/app/service/cidade.service';
import { AuthService } from 'src/app/service/auth.service';
import { AlunoService } from 'src/app/service/aluno.service';
import { ProcessosService } from 'src/app/service/processos.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';
import { InscricaoPendenciaService } from 'src/app/service/inscricao.pendencia.service.service';
import { InscricaoPendencia } from 'src/app/model/inscricao.pendencia';
import { UpdateModalComponent } from 'src/app/cadastro/update-modal/update-modal.component';
import { MatDialog } from '@angular/material/dialog';
import * as _moment from 'moment';
import { FormControl } from '@angular/forms';
import { format } from 'url';
import { UpdateCpfModalComponent } from 'src/app/cadastro/update-cpf-modal/update.cpf.modal.component';


const moment = _moment;

export interface Sexo {
  value: string;
  genero: string;
}

export interface EstadoCivil {
  value: string;
  estadoCivil: string;
}

export interface TipoEscolaEnsinoMedio {
  value: string;
  tipoEscola: string;
}

export interface TipoCasa {
  value: string;
  tipo: string;
}

@Component({
  selector: 'app-subscription-dados-pessoais-form',
  templateUrl: './subscription.dados.pessoais.form.component.html',
  styleUrls: ['./subscription.dados.pessoais.form.component.scss'],
  providers: [ProcessosService]
})
export class SubscriptionDadosPessoaisFormComponent implements OnInit {

  idTemp : string = '';
  idProcesso = '';
  selecaoSexo = '';
  selecaoEstadoCivil = '';
  selecaoTipoEscolaEM = '';

  selectBanco = '';
  selecaoBanco : Banco = new Banco();

  msgNuBank : boolean = false;
  
  selectOrgaoExp = '';
  selecaoOrgaoExpedidor : OrgaoExpedidor = new OrgaoExpedidor();

  inscricaoSelecionada: Subscription = new Subscription();
  aluno: Aluno = new Aluno();
  matriculaSessaoAluno = '';
  emailSessaoAluno = '';
  sexoSessaoAluno = '';
  // dataNascimentoEdit;
  nomeCompletoSessaoAluno = '';
  processoSelecionado:Processos = new Processos();
  listSexo : Sexo[] = [
    {value: "1", genero: 'Masculino'},
    {value: "0", genero: 'Feminino'}
  ];
  listEstadoCivil : EstadoCivil[] = [
    {value: 'SOLTEIRO', estadoCivil: 'Solteiro(a)'},
    {value: 'CASADO', estadoCivil: 'Casado(a)'},
    {value: 'VIUVO', estadoCivil: 'Viúvo(a)'},
    {value: 'DIVORCIADO', estadoCivil: 'Divorciado(a)'}
  ];
  listTipoEscolaEM : TipoEscolaEnsinoMedio[] = [
    {value: 'ESCOLA_PUBLICA', tipoEscola: 'Escola Pública'},
    {value: 'ESCOLA_PRIVADA', tipoEscola: 'Escola Particular'},
    {value: 'PARCIALMENTE_EM_AMBOS', tipoEscola: 'Parcialmente em ambas'}
  ];
  listBancos : Banco[] = [];
  listOrgaosExpedidores : OrgaoExpedidor[] = [];
  
  logradouroFamiliar : Logradouro = new Logradouro();
  tipoLogradouroFamiliarSelecionado : LogradouroTipo = new LogradouroTipo();
  selectTipoLogradouroFamiliar = '';
  selectUFFamiliar = '';
  selecaoUFFamiliar : Estado = new Estado();
  selectCidadeFamiliar = '';
  selecaoCidadeFamiliar : Cidade = new Cidade();
  selecaoTipoCasaFamiliar = '';

  listTipoCasa : TipoCasa[] = [
    {value:'CASA', tipo:'Casa'},
    {value:'APTO', tipo:'Apartamento'},
    {value:'COMODO', tipo:'Cômodo'}
  ];

  listTipoLog : LogradouroTipo[] = [];
  listEstados : Estado[] = [];
  listCidades : Cidade[] = [];
  inscricaoValidacao : InscricaoValidacao = new InscricaoValidacao();
  isExistValidacao : boolean = false;
  isModalForm : boolean = false;
  contaCorrenteValid : boolean = false;
  isUpdate : boolean = false;
  msgValidacao : string[] = [];

  fetching : boolean = false;

  dataNascimentoEdit = new FormControl();

  constructor(private rotas : ActivatedRoute, private router: Router, private alunoService : AlunoService,
    private subscriptionService : SubscriptionService, private authService : AuthService,
    private sessaoService : SessaoService, private bancoService : BancoService, 
    private orgaoExpService : OrgaoExpedidorService, private estadoService : EstadoService,
    private logradouroTipoService : LogradouroTipoService, private cidadeService : CidadeService,
    private inscricaoValidaService : InscricaoValidacaoService,
    private processoService : ProcessosService,
    private inscricaoPendenteService : InscricaoPendenciaService,
    private dialog : MatDialog) { }

  ngOnInit() {
    this.carregarDadosPessoais(); 
    this.carregarListas();
    this.msgValida();
  }

  msgValida(){
    if(!this.contaCorrenteValid){
      let msg = 'Informar dígito no campo Conta Corrente';
      this.msgValidacao.push(msg);
    }
  }

  setBanco(event){
    this.selectBanco = event;
    this.bancoService.getBancoById(event).subscribe(
      temp => {
        this.selecaoBanco = temp;
        if(event == "173"){
          this.msgNuBank = true;
        }
      }
    );    
  }

  hideMsgBank(){
    this.msgNuBank = false;
    this.selecaoBanco = null;
    this.selectBanco = '';
  }

  setOrgaoExpedidor(event){
    this.selectOrgaoExp = event;
    this.orgaoExpService.getOrgaoExpedidorById(event).subscribe(
      temp => {
        this.selecaoOrgaoExpedidor = temp
      }
    );
  }

  setCidade(event){
    this.selectCidadeFamiliar = event;
    this.cidadeService.getCidadeById(event).subscribe(
      temp => {
        this.selecaoCidadeFamiliar = temp
      }
    );
  }

  setTipoLogradouroFamiliar(event){
    this.selectTipoLogradouroFamiliar = event;
    this.logradouroTipoService.getLogradouroTipoById(event).subscribe(
      temp => {
        this.tipoLogradouroFamiliarSelecionado = temp
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
                this.processoSelecionado = dados;
                // this.isModalForm = true;
                this.getInscricao(dados);
              }
          );
    }else{
      this.processoSelecionado = ProcessosService.processoAtual;
      this.isModalForm = false;
      this.getInscricao(this.processoSelecionado);
    }
  }

  checkInscricaoStatus(){
    if(this.inscricaoValidaService.checkInscricaoValidacao(this.inscricaoValidacao)){
      this.inscricaoSelecionada.situacao = "INSCRITO";
    }else{
      this.inscricaoSelecionada.situacao = "NAO_INSCRITO";
    }
  }

  addInscricao(){
    this.aluno.estadoCivil = this.selecaoEstadoCivil;
    this.aluno.banco = this.selecaoBanco;
    this.aluno.tipoEscolaEnsinoMedio = this.selecaoTipoEscolaEM;
    this.aluno.sexo = this.selecaoSexo;
    this.aluno.orgaoExpedidorRG = this.selecaoOrgaoExpedidor;
    this.aluno.siape = this.matriculaSessaoAluno;

    this.logradouroFamiliar.cidade = this.selecaoCidadeFamiliar;
    this.logradouroFamiliar.uf = this.selecaoUFFamiliar;
    this.logradouroFamiliar.tipoRua = this.tipoLogradouroFamiliarSelecionado;
    this.logradouroFamiliar.tipoCasa = this.selecaoTipoCasaFamiliar;
    this.aluno.logradouroMoradiaFamilia = this.logradouroFamiliar;
    
    this.aluno.dataNascimento = this.dataNascimentoEdit.value;

    this.inscricaoSelecionada.aluno = this.aluno;
    this.inscricaoSelecionada.processo = this.processoSelecionado;

    this.fetching = true;

    this.alunoService.update(this.aluno)
      .subscribe(
         () => {
          this.subscriptionService.add(this.inscricaoSelecionada).subscribe(
            temp => 
              {
                this.inscricaoSelecionada = temp;
                this.addValidacao(this.inscricaoSelecionada);
                this.checkInscricaoStatus();
                this.toPageContatoInscricao();
              }
          );           
         }
      );
  }

  update(){
    this.aluno.estadoCivil = this.selecaoEstadoCivil;
    this.aluno.banco = this.selecaoBanco;
    this.aluno.tipoEscolaEnsinoMedio = this.selecaoTipoEscolaEM;
    this.aluno.sexo = this.selecaoSexo;
    this.aluno.orgaoExpedidorRG = this.selecaoOrgaoExpedidor;
    this.aluno.siape = this.matriculaSessaoAluno;

    this.logradouroFamiliar.cidade = this.selecaoCidadeFamiliar;
    this.logradouroFamiliar.uf = this.selecaoUFFamiliar;
    this.logradouroFamiliar.tipoRua = this.tipoLogradouroFamiliarSelecionado;
    this.logradouroFamiliar.tipoCasa = this.selecaoTipoCasaFamiliar;
    this.aluno.logradouroMoradiaFamilia = this.logradouroFamiliar;
    
    this.aluno.dataNascimento = this.dataNascimentoEdit.value;

    this.inscricaoSelecionada.aluno = this.aluno;
    this.inscricaoSelecionada.processo = this.processoSelecionado;

    this.fetching = true;

    this.alunoService.update(this.aluno)
      .subscribe(
         () => {
          this.subscriptionService.update(this.inscricaoSelecionada).subscribe(
            temp => 
              {
                this.inscricaoSelecionada = temp;
                this.updateValidacao(this.inscricaoSelecionada);
                this.checkInscricaoStatus();
                this.toPageContatoInscricao();
              }
          );           
         }
      );
  }

  toPageContatoInscricao(){
    this.router.navigate([`/processos/${this.processoSelecionado.id}/inscricao/contatos-enderecos`]);
  }

  addInscricaoPendente(){
    let pendencia : InscricaoPendencia = new InscricaoPendencia();
    
    this.aluno.estadoCivil = this.selecaoEstadoCivil;
    this.aluno.banco = this.selecaoBanco;
    this.aluno.tipoEscolaEnsinoMedio = this.selecaoTipoEscolaEM;
    this.aluno.sexo = this.selecaoSexo;
    this.aluno.orgaoExpedidorRG = this.selecaoOrgaoExpedidor;
    this.aluno.siape = this.matriculaSessaoAluno;

    this.logradouroFamiliar.cidade = this.selecaoCidadeFamiliar;
    this.logradouroFamiliar.uf = this.selecaoUFFamiliar;
    this.logradouroFamiliar.tipoRua = this.tipoLogradouroFamiliarSelecionado;
    this.logradouroFamiliar.tipoCasa = this.selecaoTipoCasaFamiliar;
    this.aluno.logradouroMoradiaFamilia = this.logradouroFamiliar;
    
    this.aluno.dataNascimento = this.dataNascimentoEdit.value;

    this.inscricaoSelecionada.aluno = this.aluno;
    this.inscricaoSelecionada.processo = this.processoSelecionado;
    
    this.checkInscricaoStatus();

    this.alunoService.update(this.aluno)
      .subscribe(
         () => {
            this.subscriptionService.add(this.inscricaoSelecionada).subscribe(
            temp => 
              {
                this.inscricaoSelecionada = temp;
                this.addValidacao(this.inscricaoSelecionada);
              }
          );
         }
      );



    this.inscricaoPendenteService
    .getPendenciasByInscricaoAndForm(this.inscricaoSelecionada.id, "INSCRICAO_DADOS_PESSOAIS")
      .subscribe(
        dados => {
          pendencia = dados;
          if(!dados.concluido){
            pendencia.concluido = true;
            this.inscricaoPendenteService
              .update(pendencia)
                .subscribe(
                  _ => {}
                );
          }
        }
      );

    this.updateSucess();
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

  inicializaInscricao(){
    this.inscricaoSelecionada.aluno = this.aluno;
    this.inscricaoSelecionada.processo = this.processoSelecionado;
    this.subscriptionService.add(this.inscricaoSelecionada).subscribe(
      temp => this.inscricaoSelecionada = temp
    );
  }

  checkInscricaoExistente() : boolean{
    let inscricaoTemp;
    let existeInscricao : boolean = false;

    if(typeof this.matriculaSessaoAluno !== null && typeof this.matriculaSessaoAluno !== 'undefined' && this.matriculaSessaoAluno !== ''
       && typeof this.processoSelecionado !== null && typeof this.processoSelecionado.id !== 'undefined' && 
        this.processoSelecionado.id !== ''){
          this.subscriptionService.getInscricaoByProcessoAndMatriculaAluno(this.processoSelecionado.id, 
            this.matriculaSessaoAluno).subscribe(
              temp => 
                { 
                  inscricaoTemp = temp;
                  if(temp !== null && typeof temp !== 'undefined') {
                    existeInscricao = true;
                  }else{
                    existeInscricao = false;
                    this.inicializaInscricao();
                  }
                }
       );
       
    }
    return existeInscricao;
  }

  carregarDadosPessoais() {
    this.getAluno();
  }

  carregarListas() {
    this.bancoService.getBancos().subscribe(
      temp => this.listBancos = temp
    );
    this.orgaoExpService.getOrgaosExpedidores().subscribe(
      temp => this.listOrgaosExpedidores = temp
    );
    this.estadoService.getEstados().subscribe(
      temp => this.listEstados = temp
    );
    this.logradouroTipoService.getLogradourosTipos().subscribe(
      temp => this.listTipoLog = temp
    );
  }

  carregarListaCidades(idUf){
    this.selectUFFamiliar = idUf;
    this.estadoService.getEstadoById(idUf).subscribe(
      estadoTemp => {
        this.selecaoUFFamiliar = estadoTemp
        this.cidadeService.getCidadeByUF(estadoTemp.sigla).subscribe(
          listTemp => this.listCidades = listTemp
        );
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
            if(aluno == null && typeof aluno == 'undefined'){
              this.aluno = new Aluno();
              this.setDadosUsuario(u);
            }else{
              this.aluno = aluno;
              this.setCombo();
              this.setLogradouroFamiliar();
              this.setOrgaoExp();
              this.setBancoDados();
              this.carregarProcesso();
              this.checkContaCorrente();
              this.checkCpfValidacao();
            }
          }
      );
  }

  checkCpfValidacao(){
    let pattern = /[0-9]{11}/g;
    if(this.isExistValidacao){
      if(pattern.test(this.aluno.cpf)){
        this.inscricaoValidacao.cpfValido = true;
      }else{
        this.inscricaoValidacao.cpfValido = false;
        let msg = "CPF com caracteres inválidos, por favor atualize-o!";
        this.msgValidacao.push(msg);
      }
    }else{
      this.inscricaoValidacao = new InscricaoValidacao();
      this.inscricaoValidacao.cpfValido = true;
    }
  }

  setCombo(){
    this.selecaoSexo = this.aluno.sexo;
    this.selecaoBanco = this.aluno.banco;
    this.selecaoEstadoCivil = this.aluno.estadoCivil;
    this.selecaoTipoEscolaEM = this.aluno.tipoEscolaEnsinoMedio;
    
    if(this.aluno.dataNascimento == null || typeof this.aluno.dataNascimento == 'undefined'){
      this.dataNascimentoEdit.setValue(null);
    }else{
      this.dataNascimentoEdit.setValue(new Date(this.aluno.dataNascimento));
    }
  }

  setDadosUsuario(dados){
    this.aluno.siape = dados.siape;
    this.aluno.email = dados.email;
    this.aluno.nomeCompleto = dados.nomeCompleto;
    this.aluno.sexo = dados.sexo;
  }

  setLogradouroFamiliar(){
    if(this.aluno.logradouroMoradiaFamilia != null && 
      typeof this.aluno.logradouroMoradiaFamilia != 'undefined'){
    
      this.logradouroFamiliar = this.aluno.logradouroMoradiaFamilia;
      this.selecaoTipoCasaFamiliar = this.logradouroFamiliar.tipoCasa;
      this.selecaoCidadeFamiliar = this.logradouroFamiliar.cidade;
      this.selectCidadeFamiliar = this.logradouroFamiliar.cidade.id;
      this.selectUFFamiliar = this.logradouroFamiliar.uf.id;
      this.tipoLogradouroFamiliarSelecionado = this.logradouroFamiliar.tipoRua;
      this.carregarListaCidades(this.selectUFFamiliar);
      }else{
        this.logradouroFamiliar = new Logradouro();
      }
  }

  setOrgaoExp(){
    if(this.aluno.orgaoExpedidorRG != null && typeof this.aluno.orgaoExpedidorRG != 'undefined'){
      this.selecaoOrgaoExpedidor = new OrgaoExpedidor();
      this.selecaoOrgaoExpedidor = this.aluno.orgaoExpedidorRG;
      this.selectOrgaoExp = this.aluno.orgaoExpedidorRG.id;
    }else{
      this.selecaoOrgaoExpedidor = new OrgaoExpedidor();
    }
  }

  setBancoDados(){
    if(this.aluno.banco != null && typeof this.aluno.banco != 'undefined'){
      this.selecaoBanco = new Banco();
      this.selecaoBanco = this.aluno.banco;
      this.selectBanco = this.aluno.banco.id
    }else{
      this.selecaoBanco = new Banco();
    }
  }
       
  

  getInscricao(dados){
    // this.checkInscricaoExistente();
    this.subscriptionService
      .getInscricaoByProcessoAndMatriculaAluno(dados.id, this.aluno.siape)
        .subscribe(
          inscricao =>
            {
              if(inscricao != null && typeof inscricao != 'undefined'){
                this.inscricaoSelecionada = inscricao;
                this.carregarValidacao(inscricao);
                this.isUpdate = true;
              }else{
                this.inscricaoSelecionada = new Subscription();
              }
            }
        );
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

  addValidacao(inscricao){
    if(this.isExistValidacao){
      this.inscricaoValidaService.update(this.inscricaoValidacao)
        .subscribe(
          _ => {
            this.inscricaoValidaService.stepDadosPessoais.next(true);
            this.inscricaoValidaService.reload$.next(true);
            this.checkInscricaoStatus();
          }
        );
    }else{
        this.inscricaoValidacao.inscricao = inscricao;
        this.inscricaoValidacao.dadosPessoaisCompleto = true;
        this.inscricaoValidaService.add(this.inscricaoValidacao)
        .subscribe(
          _ => {
            this.inscricaoValidaService.stepDadosPessoais.next(true);
            this.inscricaoValidaService.reload$.next(true);
            this.checkInscricaoStatus();
          }
        );
      }
   }

   updateValidacao(inscricao){
    if(this.isExistValidacao){
      this.inscricaoValidacao.dadosPessoaisCompleto = true;
      this.inscricaoValidaService.update(this.inscricaoValidacao)
        .subscribe(
          _ => {
            this.inscricaoValidaService.stepDadosPessoais.next(true);
            this.inscricaoValidaService.reload$.next(true);
          }
        );
    }else{
        this.inscricaoValidacao.inscricao = inscricao;
        this.inscricaoValidacao.dadosPessoaisCompleto = true;
        this.inscricaoValidaService.update(this.inscricaoValidacao)
        .subscribe(
          _ => {
            this.inscricaoValidaService.stepDadosPessoais.next(true);
            this.inscricaoValidaService.reload$.next(true);
          }
        );
      }
   }   

   checkContaCorrente(){
     let pattern = /[0-9]-[0-9xX]$/g;

     if(pattern.test(this.aluno.contaCorrente)){
       this.contaCorrenteValid = true;
       this.msgValidacao = [];
     }else{
      this.contaCorrenteValid = false;
      let msg = 'Informar dígito no campo Conta Corrente';
      this.msgValidacao = [];
      this.msgValidacao.push(msg);
     }
   }

   editEnable() {
     this.inscricaoValidacao.dadosPessoaisCompleto = false;
   }

   dbClick(){
     this.fetching = true;
   }

   editCpf(){
    const dialogRef = this.dialog.open(UpdateCpfModalComponent, {
      data: {
        aluno: this.aluno
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
