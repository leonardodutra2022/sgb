import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { Subscription } from 'src/app/model/subscription';
import { ActivatedRoute } from '@angular/router/';
import { Processos } from 'src/app/model/processos';
import { Aluno } from 'src/app/model/aluno';
import { OrgaoExpedidor } from 'src/app/model/orgao.expedidor';
import { Logradouro } from 'src/app/model/logradouro';
import { Cidade } from 'src/app/model/cidade';
import { Estado } from 'src/app/model/estado';
import { LogradouroTipo } from 'src/app/model/logradouro.tipo';
import { Banco } from 'src/app/model/banco';
import { SituacaoSocioEconFamiliar } from 'src/app/model/situacao.socio.econ.familiar';
import { SituacaoSocioEconFamiliarService } from 'src/app/service/situacao.socio.econ.familiar.service';
import { DadosAcademicos } from 'src/app/model/dados.academicos';
import { DadosAcademicosService } from 'src/app/service/dados.academicos.service';
import { Documentacao } from 'src/app/model/documentacao';
import { DocumentacaoArquivosService } from 'src/app/service/documentacao.arquivos.service';
import { DocumentacaoService } from 'src/app/service/documentacao.service';
import { API_SGB } from 'src/app/config/API';
import { MatDialog } from '@angular/material/dialog';
import { ParecerModalComponent } from 'src/app/cadastro/parecer-modal/parecer-modal.component';
import { Recurso } from 'src/app/model/recurso';
import { RecursoService } from 'src/app/service/recurso.service';
import { RecursosDetailModalComponent } from 'src/app/mensagens/recursos-detail-modal/recursos-detail-modal.component';
import { ParecerRecursoComponent } from 'src/app/recursos/parecer-recurso/parecer-recurso.component';
import { ConcessaoService } from 'src/app/service/concessao.service';
import { Concessao } from 'src/app/model/concessao';
import { BeneficioService } from 'src/app/service/beneficio.service';
import { ConcessaoExclusaoComponent } from 'src/app/mensagens/concessao-exclusao/concessao-exclusao.component';
import { ExportFileComponent } from 'src/app/export-file/export-file.component';
import { DetailModalComponent } from 'src/app/concessao/detail-modal/detail-modal.component';
import { Beneficio } from 'src/app/model/beneficio';
import { DocumentacaoArquivos } from 'src/app/model/documentacao.arquivos';
import { SessaoService } from 'src/app/service/sessao.service';
import { Entrevista } from 'src/app/model/entrevista';
import { EntrevistaService } from 'src/app/service/entrevista.service';

const URL_DOWNLOAD = API_SGB + "/download";

interface CheckDoc {
  doc:string;
  status:boolean;
  objArquivo: DocumentacaoArquivos;
}

interface Status {
  st : string;
}

export interface GrupoDoc {
  titulo:string;
  descricao:string;
  subtitulo:string;
}

@Component({
  
  selector: 'app-subscription-detail',
  templateUrl: './subscription.detail.component.html',
  styleUrls: ['./subscription.detail.component.scss']
})
export class SubscriptionDetailComponent implements OnInit {

  idInscricao : string = '';
  selecaoStatus : string = '';
  selecaoStatusFinal : string = '';
  selecaoParecerEntrevista : string = '';
  inscricao : Subscription = new Subscription();
  inscricaoOutra : Subscription = new Subscription();
  inscricoesAluno : Subscription[] = [];
  processo : Processos = new Processos();
  aluno : Aluno = new Aluno();
  viewBtnAnalise : boolean = false;

  link = '';
  colsTable: string[] = ['documento', 'descricao', 'Upload', 'entrega', 'validado', 'usuario'];

  logradouro : Logradouro = new Logradouro();
  logradouroFamilia : Logradouro = new Logradouro();
  cidade : Cidade = new Cidade();
  cidadeFamilia : Cidade = new Cidade();
  uf : Estado = new Estado();
  ufFamilia : Estado = new Estado();
  tipoLogradouro : LogradouroTipo = new LogradouroTipo();
  tipoLogradouroFamilia : LogradouroTipo = new LogradouroTipo();
  entrevista : Entrevista = new Entrevista();
  
  concessao : Concessao = new Concessao();
  existConcessao : boolean = false;
  existDecisaoPorAluno : boolean = false;
  viewMsg : boolean = false;
  rendaNucleoFamiliar : number = 0;
  totalMembrosFamilia : number = 0;
  rendaPerCapita : number = 0;

  orgaoExpedidor : OrgaoExpedidor = new OrgaoExpedidor();
  banco : Banco = new Banco();
  listaFamiliares : SituacaoSocioEconFamiliar[] = [];
  listaOutrosVinculosAcad : DadosAcademicos[] = [];
  docsLista : Documentacao[] = [];
  listaCheckDoc:CheckDoc[] = [];
  listStatus : Status[] = [
    {st:"DEFERIDO"},
    {st:'INDEFERIDO'}
  ];
  recursos : Recurso[] = [];
  beneficio : Beneficio = new Beneficio();

  dataEntrevistaEdit;

  gruposDocs : GrupoDoc[] = [
    {titulo: "GERAL", descricao: "Documentação Geral", subtitulo: "Documentação comum a todos os candidatos"},
    {titulo: "DOCUMENTACAO_CANDIDATO", descricao: "Documentação do Candidato(a)", subtitulo: "Documentação exclusiva do candidato, como identificação e etc"},
    {titulo: "DOCUMENTACAO_NUCLEO_FAMILIAR", descricao: "Documentação do Núcleo Familiar", subtitulo: "Documentação de entes familiares que compôem o núcleo familiar"},
    {titulo: "OUTRAS_DOCUMENTACOES", descricao: "Outras Documentações", subtitulo: "Documentações diversas"}
  ];
  gruposDocsCustom : GrupoDoc[] = [];

  constructor(private inscricaoService : SubscriptionService,
              private rota : ActivatedRoute, 
              private dialog : MatDialog, 
              private beneficioService : BeneficioService,
              private socioService : SituacaoSocioEconFamiliarService,
              private dadosAcadService : DadosAcademicosService,
              private documentacaoArquivoService : DocumentacaoArquivosService,
              private docService : DocumentacaoService,
              private recursoService : RecursoService,
              private concessaoService : ConcessaoService,
              private sessaoService : SessaoService,
              private entrevistaService : EntrevistaService) { }

  ngOnInit() {
    this.idInscricao = this.rota.snapshot.paramMap.get('id');
    this.inscricaoService.getInscricoesById(this.idInscricao)
      .subscribe(
        dados => {
          
          this.inscricao = dados;
          this.processo = dados.processo;
          this.aluno = dados.aluno;
          this.beneficio = this.processo.beneficio;
          this.orgaoExpedidor = this.aluno.orgaoExpedidorRG;

          this.logradouro = this.aluno.logradouro;
          this.cidade = this.logradouro.cidade;
          this.uf = this.logradouro.uf;
          this.tipoLogradouro = this.logradouro.tipoRua;

          this.logradouroFamilia = this.aluno.logradouroMoradiaFamilia;
          this.cidadeFamilia = this.logradouroFamilia.cidade;
          this.ufFamilia = this.logradouroFamilia.uf;
          this.tipoLogradouroFamilia = this.logradouroFamilia.tipoRua;          

          this.banco = this.aluno.banco;

          this.selecaoStatus = this.inscricao.situacao;
          this.selecaoStatusFinal = this.inscricao.situacaoFinal;

          this.getFamiliares();
          this.getOutrosVinculosAcad();
          this.carregarListaDocs();
          this.carregarListaRecursos(this.idInscricao);
          this.setViewBtnAnalise();
          this.getConcessao();
          this.carregarGruposDocs();
          this.checkOutraDecisao();
          this.getEntrevista();
        }
      );    
    // this.getInscricao();
  }

  carregarGruposDocs(){
    this.docService
      .getGruposDocs()
        .subscribe(
          lista => {
            for(let i of lista){
              for(let j of this.gruposDocs){
                if(i == j.titulo){
                  this.gruposDocsCustom.push(j);
                }
             }
          }
        }
      );
  }

  getEntrevista(){
    this.entrevistaService
      .getEntrevistaByInscricao(this.inscricao.id)
        .subscribe(
          dados => {
            if(dados)
              this.entrevista = dados;
            else
              this.entrevista = new Entrevista();
          }
        );
  }

  getConcessao(){
    this.concessaoService
      .getConcessaoByAlunoAndProcesso(this.aluno.id, this.processo.id)
        .subscribe(
          dados => {
            if(dados != null && typeof dados != 'undefined'){
              this.concessao = dados;
              this.existConcessao = true;
            }else{
              // this.concessao = new Concessao();
              this.existConcessao = false;
            }
          }
        );
  }

  setViewBtnAnalise(){
    if(this.inscricao.situacao == 'INSCRITO'){
      this.viewBtnAnalise = true;
    }else{
      this.viewBtnAnalise = false;
    }
  }

  getFamiliares(){
    this.socioService
      .getSocioEconByAluno(this.aluno.id)
        .subscribe(
          dados => {
            this.listaFamiliares = dados;
            this.totalMembrosFamilia = dados.length + 1;
            for(let f of dados){
              this.rendaNucleoFamiliar += f.rendaMensal;
            }
            this.calcRendaPerCapita();
          }
        );
  }

  calcRendaPerCapita(){
    this.rendaPerCapita = (this.rendaNucleoFamiliar + this.inscricao.rendaMensal + this.inscricao.rendaOutraAtividade + this.aluno.valorAssisMedica + this.inscricao.valorOutraBolsa)/this.totalMembrosFamilia;
  }

  getOutrosVinculosAcad() {
    this.dadosAcadService
      .getDadosAcademicosByAluno(this.aluno.id)
        .subscribe(
          dados => {
            this.listaOutrosVinculosAcad = dados;
          }
        );
  }

  checkGrupoInfo(grupo) : boolean{
    switch(grupo){
      case 1:
        return this.inscricao.dadosBasicosValidado;
      case 2:
        return this.inscricao.enderecoContatoValidado;
      case 3:
        return this.inscricao.dadosBancariosValidado;
      case 4:
        return this.inscricao.nucleoFamiliarValidado;
      case 5:
        return this.inscricao.auxBolsasValidado;
      case 6:
        return this.inscricao.infoFinanceirasValidado;
      case 7:
        return this.inscricao.moradiaValidado;
      case 8:
        return this.inscricao.transporteValidado;
      case 9:
        return this.inscricao.saudeDeficienciaValidado;
      case 10:
        return this.inscricao.infoAcadValidado;
      case 11:
        return this.inscricao.documentacaoValidado;        
    }
  }

  analisarGrupo(grupo){
    switch(grupo){
      case 1:
        this.inscricao.dadosBasicosValidado = true;
        break;
      case 2:
        this.inscricao.enderecoContatoValidado = true;
        break;
      case 3:
        this.inscricao.dadosBancariosValidado = true;
        break;
      case 4:
        this.inscricao.nucleoFamiliarValidado = true;
        break;
      case 5:
        this.inscricao.auxBolsasValidado = true;
        break;
      case 6:
        this.inscricao.infoFinanceirasValidado = true;
        break;
      case 7:
        this.inscricao.moradiaValidado = true;
        break;
      case 8:
        this.inscricao.transporteValidado = true;
        break;
      case 9:
        this.inscricao.saudeDeficienciaValidado = true;
        break;
      case 10:
        this.inscricao.infoAcadValidado = true;
        break;
      case 11:
        this.inscricao.documentacaoValidado = true;
        break;
    }
    this.inscricaoService
    .update(this.inscricao)
      .subscribe(
        resp =>{}
      );
  }

  uncheckGrupoInfo(grupo){
    switch(grupo){
      case 1:
        this.inscricao.dadosBasicosValidado = false;
        break;
      case 2:
        this.inscricao.enderecoContatoValidado = false;
        break;
      case 3:
        this.inscricao.dadosBancariosValidado = false;
        break;
      case 4:
        this.inscricao.nucleoFamiliarValidado = false;
        break;
      case 5:
        this.inscricao.auxBolsasValidado = false;
        break;
      case 6:
        this.inscricao.infoFinanceirasValidado = false;
        break;
      case 7:
        this.inscricao.moradiaValidado = false;
        break;
      case 8:
        this.inscricao.transporteValidado = false;
        break;
      case 9:
        this.inscricao.saudeDeficienciaValidado = false;
        break;
      case 10:
        this.inscricao.infoAcadValidado = false;
        break;
      case 11:
        this.inscricao.documentacaoValidado = false;
        break;        
    }
    this.inscricaoService
    .update(this.inscricao)
      .subscribe(
        resp =>{}
      );
  }

  carregaListaCheckDoc() {
    if(typeof this.inscricao.id !== 'undefined' && this.inscricao !== null){
      for(let item of this.docsLista){
        this.documentacaoArquivoService.
        getArquivoByInscricaoAndTipo(this.inscricao.id, item.documento).
          subscribe(
            temp => {
              if(temp !== null && typeof temp.id !== 'undefined'){
                let itemList : CheckDoc = {doc: item.documento, status: true, objArquivo: temp};
                this.listaCheckDoc.push(itemList);
              }else{
                let itemList : CheckDoc = {doc: item.documento, status: false, objArquivo: new DocumentacaoArquivos()};
                this.listaCheckDoc.push(itemList);
              }
            }
        );
      }
    }
  }

  carregarListaDocs(){
    this.docService.getDocumentosAtivosByAuxilio(this.beneficio.id).subscribe(
      list => {
        this.docsLista = list;
        this.carregaListaCheckDoc();
      }
    );
  }

  carregarListaRecursos(inscricao){
    this.recursoService.getRecursosByInscricao(inscricao).subscribe(
      list => {
        this.recursos = list;
        // this.carregaListaCheckDoc();
      }
    );
  }

  getArquivo(doc){
    this.documentacaoArquivoService.getArquivoByInscricaoAndTipo(this.inscricao.id, doc).subscribe(
      arquivoTemp => {
        this.link = URL_DOWNLOAD + "/" + arquivoTemp.id;
        let l = document.createElement("a");
        l.href = this.link;
        l.target = "_self";
        l.click();
      });
  }

  checkEntregaDoc(docTipo) : boolean {
    for(let lista of this.listaCheckDoc){
      if(lista.doc == docTipo && lista.status){
        return true;
      }
    }
    return false;
  }

  checDocValido(doc) : boolean{
    for(let lista of this.listaCheckDoc){
      if(lista.doc == doc.documento && lista.objArquivo.validado){
        return true;
      }
    }
    return false;
  }

  getUsuarioValidador(doc) : string{
    for(let lista of this.listaCheckDoc){
      if(lista.doc == doc.documento && lista.objArquivo.validado){
        return lista.objArquivo.nomeUsuarioValidador;
      }
    }
    return "";
  }

  validarDoc(doc){
    for(let lista of this.listaCheckDoc){
      if(lista.doc == doc.documento){
        lista.objArquivo.validado = true;
        lista.objArquivo.nomeUsuarioValidador = this.sessaoService.getUsuarioLogado().nomeUsuario;
        this.documentacaoArquivoService
          .update(lista.objArquivo)
            .subscribe(
              resp => {
              }
            );
        }
    }
  }

  invalidar(doc){
    for(let lista of this.listaCheckDoc){
      if(lista.doc == doc.documento){
        lista.objArquivo.validado = false;
        this.documentacaoArquivoService
          .update(lista.objArquivo)
            .subscribe(
              resp => {
              }
            );
        }
    }
  }

  setAnalise(){
    this.inscricao.situacao = 'EM_ANALISE';
    
    this.inscricaoService
      .update(this.inscricao).subscribe(
          temp => {
            this.setViewBtnAnalise();
          }
        );
  }

  setStatus(event){
    this.inscricao.situacao = event;
    this.selecaoStatus = event;

    if(event == "DEFERIDO")
      this.viewMsg = true;
    else
      this.viewMsg = false;
  }

  setStatusFinal(event){
    this.inscricao.situacaoFinal = event;
    this.selecaoStatusFinal = event;

    if(event == "DEFERIDO")
      this.viewMsg = true;
    else
      this.viewMsg = false;
  }

  salvarAnalise(){
    this.inscricaoService
      .update(this.inscricao)
        .subscribe(
          temp => {

            if(this.inscricao.situacao == 'DEFERIDO'){

              let idBeneficio : any = 2;
              this.beneficioService
                .getBeneficiosById(idBeneficio)
                  .subscribe(
                    dados => {
                      if(!this.existConcessao){

                        if(this.concessao != null && typeof this.concessao != 'undefined'){
                          this.concessao = new Concessao();                          
                        }

                        this.concessao.beneficio = dados;
                        this.concessao.aluno = this.inscricao.aluno;
                        this.concessao.processo = this.processo;
                        this.concessao.concessaoStatus = 'CONCEDIDO';
                        this.concessao.dataConcessao = new Date();
                        this.concessao.dataHora = Date.now();

                        this.concessaoService.
                        add(this.concessao)
                          .subscribe(
                            dados => {
                              this.concessao = dados;
                              this.existConcessao = true;
                              this.openSucessModal();
                            }
                          );
                      }else{
                        this.concessao.dataHora = Date.now();

                        this.concessaoService.
                        update(this.concessao)
                          .subscribe(
                            dados => {
                              this.concessao = dados;
                              this.openSucessModal();
                            }
                          );
                      }
                    }
              );
            }else if(this.inscricao.situacao == 'INDEFERIDO' && this.existConcessao){
              this.deleteConcessao();
            }else{
              this.openSucessModal();
            }
        }
      );
  }

  salvarAnaliseFinal(){
    this.inscricaoService
      .update(this.inscricao)
        .subscribe(
          temp => {

            if(this.inscricao.situacaoFinal == 'DEFERIDO'){

              let idBeneficio : any = 2;
              this.beneficioService
                .getBeneficiosById(idBeneficio)
                  .subscribe(
                    dados => {
                      if(!this.existConcessao){

                        if(this.concessao != null && typeof this.concessao != 'undefined'){
                          this.concessao = new Concessao();                          
                        }

                        this.concessao.beneficio = dados;
                        this.concessao.aluno = this.inscricao.aluno;
                        this.concessao.processo = this.processo;
                        this.concessao.concessaoStatus = 'CONCEDIDO';
                        this.concessao.dataConcessao = new Date();
                        this.concessao.dataHora = Date.now();

                        this.concessaoService.
                        add(this.concessao)
                          .subscribe(
                            dados => {
                              this.concessao = dados;
                              this.existConcessao = true;
                              this.openSucessModal();
                            }
                          );
                      }else{
                        this.concessao.dataHora = Date.now();

                        this.concessaoService.
                        update(this.concessao)
                          .subscribe(
                            dados => {
                              this.concessao = dados;
                              this.openSucessModal();
                            }
                          );
                      }
                    }
              );
            }else if(this.inscricao.situacaoFinal == 'INDEFERIDO' && this.existConcessao){
              this.deleteConcessao();
            }else{
              this.openSucessModal();
            }
        }
      );
  }

  deleteConcessao(){
    const dialogRef = this.dialog.open(ConcessaoExclusaoComponent);
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
        this.concessaoService
          .delete(this.concessao.id)
            .subscribe(
              _ => {
                this.openSucessModal();
                this.concessao = new Concessao();
                this.existConcessao = false;
              }
          );
       }
    });
  }

  openSucessModal(){
    const dialogRef = this.dialog.open(ParecerModalComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
        }
    });
  }

  existAnexo(recurso : Recurso) : boolean{
    if(recurso.docArquivo != null && typeof recurso.docArquivo != 'undefined')
      return true;

    return false;
  }

  getLink(recurso) : string{
    let link : string = '';
    link = API_SGB + '/download/' + recurso.id;
    return link;
  }

  openDetail(recurso){
    const dialogRef = this.dialog.open(RecursosDetailModalComponent, 
        {
          data: {
            recurso: recurso
          }
        });
    dialogRef.afterClosed().subscribe(
      result => {
    });
  }

  openParecerRecurso(recurso){
    const dialogRef = this.dialog.open(ParecerRecursoComponent, 
      {
        data: {
          recurso: recurso,
          inscricao: this.inscricao
        }
      });
    dialogRef.afterClosed().subscribe(
      result => {
    });
  }

  hideMsg(){
    this.viewMsg = false;
  }

  exportDialog(listaSelect){
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: listaSelect,
        inscricao: this.inscricao.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  outrasConcessoesDialog(){
    const dialogRef = this.dialog.open(DetailModalComponent, {
      data: {
        aluno: this.aluno.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  reusarDecisao(){
    this.selecaoStatus = this.inscricaoOutra.situacao;
    this.inscricao.analiseComissao = this.inscricaoOutra.analiseComissao;
    this.inscricao.situacao = this.inscricaoOutra.situacao;

    if(this.selecaoStatus == "DEFERIDO")
      this.viewMsg = true;
    else
      this.viewMsg = false;
  }

  checkOutraDecisao(){
    this.inscricaoService
      .getInscricoesAtivasByAluno(this.aluno.id)
        .subscribe(
          dados => {
            this.inscricoesAluno = dados;
            for(let i of this.inscricoesAluno){
              if(i.id != this.inscricao.id){
                if(i.situacao == 'DEFERIDO' || i.situacao == 'INDEFERIDO'){
                  this.inscricaoOutra = i;
                  this.existDecisaoPorAluno = true;
                }
              }
            }
          }
      );
  }

  viewEntrevista() : boolean{
    return this.processo.possuiEntrevista && this.inscricao.situacaoFinal == 'DEFERIDO';
  }

  changeParecerEntrevista(parecer){
    this.selecaoParecerEntrevista = parecer;
  }

  agendarEntrevista(){
    this.entrevista.data = this.dataEntrevistaEdit;
    this.entrevista.processo = this.processo;
    this.entrevista.inscricao = this.inscricao;
    this.entrevista.membroComissao = this.sessaoService.getUsuarioLogado().nomeUsuario;
    this.entrevista.dataRegistro = new Date();
    this.entrevistaService
      .add(this.entrevista)
        .subscribe(
          resp => {
            this.entrevista = resp;
          }
        );

  }

  salvarRelatorioEntrevista(){
    this.entrevista.parecerMembroComissao = this.selecaoParecerEntrevista;
    this.entrevistaService
      .update(this.entrevista)
        .subscribe(
          resp => {
            this.entrevista = resp;
          }
        );
  }
}
