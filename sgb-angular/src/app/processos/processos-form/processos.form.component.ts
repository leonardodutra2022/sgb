import { Component, OnInit } from '@angular/core';
import { Beneficio } from 'src/app/model/beneficio';
import { Processos } from 'src/app/model/processos';
import { ProcessosService } from 'src/app/service/processos.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BeneficioService } from 'src/app/service/beneficio.service';
import { Documentacao } from 'src/app/model/documentacao';
import { DocumentacaoArquivosService } from 'src/app/service/documentacao.arquivos.service';
import { DocumentacaoService } from 'src/app/service/documentacao.service';
import { ArquivosService } from 'src/app/service/arquivos.service';
import { UserModalComponent } from 'src/app/user/user-modal/user.modal.component';
import { MatDialog } from '@angular/material/dialog';
import { API_SGB } from 'src/app/config/API';
import { DOCUMENTOS_TIPOS } from 'src/app/model/documentos.tipos';
import { UploadSucessModalComponent } from 'src/app/cadastro/upload-sucess-modal/upload-sucess-modal.component';
import * as _moment from 'moment';
import { FormControl } from '@angular/forms';
import { CronogramaService } from 'src/app/service/cronograma.service';
import { Cronograma } from 'src/app/model/cronograma';
import { ExportFileComponent } from 'src/app/export-file/export-file.component';

const URL_DOWNLOAD = API_SGB + "/download";
const moment = _moment;


export interface CheckDoc {
  id:string;
  doc:string;
  descricao:string;
  status:boolean;
  data;
}

export interface Vaga {
  name:string;
  value:boolean;
}

export interface Etapa {
  name:string;
  value:string;
}

@Component({
  selector: 'app-processos-form',
  templateUrl: './processos.form.component.html',
  styleUrls: ['./processos.form.component.scss']
})
export class ProcessosFormComponent implements OnInit {

  link = '';
  idTemp : string = '';
  idBeneficioEdit = '';
  processo: Processos = new Processos();
  selecaoBeneficio:Beneficio = new Beneficio();
  listaBeneficios : Beneficio[];
  listaCheckDoc:CheckDoc[] = [];
  dataAberturaEdit;
  dataEncerramentoEdit;
  selecaoDoc = '';
  listDocsTipo = DOCUMENTOS_TIPOS;

  step = 1;

  docDescricao = '';
  docSelecao = '';
  docSelecionado : Documentacao = new Documentacao();

  viewMsgErro : boolean = false;
  msgErro = '';
  codErro : number;
  arquivoSize;
  arquivoNome = '';
  arquivoExist : boolean = false;
  arquivoValid : boolean = false;
  viewVagas : boolean = false;
  cronograma : Cronograma[] = [];
  cronogramaItem : Cronograma = new Cronograma();
  etapaSelecao = '';
  dateIni = new FormControl(moment([2019, 1, 1]));
  dateFim = new FormControl(moment([2019, 1, 1]));
  cronoEdit : boolean = false;
  
  colsTable: string[] = ['documento', 'descricao', 'Data', 'Upload'];
  cronoTable : string[] = ['Data Inicial', 'Data Final', 'Descricao', 'Acoes'];
  vagas : Vaga[] = [
    {name: "Informar número de vagas", value: true},
    {name: "Indefinido", value: false}
  ];
  etapas : Etapa[] = [
    {name: "Abertura do Processo", value: "ANDAMENTO"},
    {name: "Análise Documental", value: "ANALISE_DOCUMENTAL"},
    {name: "Análise de Recursos", value: "RECURSO_ANALISE"},
    {name: "Conclusão do Processo", value: "CONCLUIDO"},
    {name: "Inscrições", value: "INSCRICOES_ABERTAS"},
    {name: "Interposição de Recurso", value: "RECURSO"},
    {name: "Resultado Final", value: "RESULTADO_FINAL"},
    {name: "Resultado Parcial", value: "RESULTADO_PARCIAL"},
    {name: "Suspenso", value: "SUSPENSO"},
    {name: "Visita Domiciliar", value: "VISITA"}
  ];

  constructor(private processosService : ProcessosService, private beneficioService : BeneficioService, 
              private sessaoService : SessaoService, private documentacaoArquivoService : DocumentacaoArquivosService,
              private router : Router, private rotas : ActivatedRoute, private docService : DocumentacaoService,
              private docArquivoService : ArquivosService, private dialog : MatDialog,
              private cronoService : CronogramaService)
              { }

  ngOnInit() {
    this.carregarProcesso();
    this.beneficioService.getBeneficios().subscribe(
      lista => 
        this.listaBeneficios = lista
    );
    
  }

  setDadosProcesso(){
        this.processo.beneficio = this.selecaoBeneficio;
        this.processo.ativo = true;
        this.processo.ano = new Date().getFullYear();
        this.processo.dataAbertura = this.dataAberturaEdit;
        this.processo.dataEncerramento = this.dataEncerramentoEdit;
        this.processo.statusProcesso = "ANDAMENTO";
  }

  add() {
    this.setDadosProcesso();
    this.processosService.add(this.processo)
      .subscribe(
        _ => this.retonar()
      );
  }

  edit(crono : Cronograma){
    this.cronoEdit = true;
    this.cronogramaItem = crono;
    this.etapaSelecao = this.cronogramaItem.st;
    this.dateIni.setValue(null);
    this.dateFim.setValue(null);
  }

  updateItemCronograma(){
    this.cronogramaItem.dataInicio = this.dateIni.value;
    this.cronogramaItem.dataFim = this.dateFim.value;
    this.cronogramaItem.st = this.etapaSelecao;
    this.cronogramaItem.dataHora = Date.now();
    this.cronoService.update(this.cronogramaItem)
      .subscribe(
        _ => {
          this.cronogramaItem = new Cronograma();
          this.dateIni.setValue(null);
          this.dateFim.setValue(null);
          this.etapaSelecao = '';
          this.cronoEdit = false;
          this.carregarCronograma(this.processo.id);
        }
      );
  }

  addItemCronograma(){
    this.cronogramaItem.dataInicio = this.dateIni.value;
    this.cronogramaItem.dataFim = this.dateFim.value;
    this.cronogramaItem.st = this.etapaSelecao;
    this.cronogramaItem.dataHora = Date.now();
    this.cronogramaItem.processo = this.processo;
    this.cronoService.add(this.cronogramaItem)
      .subscribe(
        resp => {
          this.carregarCronograma(this.processo.id);
          this.cronogramaItem = new Cronograma();
          this.dateIni.setValue(null);
          this.dateFim.setValue(null);
          this.etapaSelecao = '';
        }
      )
  }

  retonar(){
    this.router.navigate(['/processos/admin']);
  }

  changeBeneficio(id){
    this.beneficioService.getBeneficiosById(id)
    .subscribe(
      temp => this.selecaoBeneficio = temp
    );
  }

  save() {
    this.processo.dataAbertura = this.dataAberturaEdit;
    this.processo.dataEncerramento = this.dataEncerramentoEdit;
    this.processo.beneficio = this.selecaoBeneficio;
    this.processosService.update(this.processo)
      .subscribe(
        _ => this.retonar()
      );
  }

  carregarCronograma(idProcesso){
    this.cronoService.getCronogramaByProcesso(idProcesso)
      .subscribe(
        c => {
          this.cronograma = c;
        }
      )
  }

  carregarProcesso() {
    this.idTemp = this.rotas.snapshot.paramMap.get('id');
    if (this.idTemp != null) {
      this.processosService.getProcessosById(this.idTemp)
        .subscribe(
          processoTemp => {
            this.processo = processoTemp;
            this.idBeneficioEdit = processoTemp.beneficio.id; 
            this.selecaoBeneficio = processoTemp.beneficio;

            if(this.processo.dataAbertura !=null){
              this.dataAberturaEdit = new Date(this.processo.dataAbertura);
            }
            
            if(this.processo.dataEncerramento != null){
              this.dataEncerramentoEdit = new Date(this.processo.dataEncerramento);
            }
            this.carregaListaCheckDoc();
            this.checkVagas();
            this.carregarCronograma(processoTemp.id);
        });
        
    }
  }

  checkVagas(){
    if(this.processo.vagas > 0){
      this.viewVagas = true;
    }
  }

  carregaListaCheckDoc() {
    if(typeof this.processo.id !== 'undefined' && this.processo !== null){
        this.documentacaoArquivoService.
          getArquivoByProcessoAndTipos(this.processo.id).
            subscribe(
              temp => {
                let listTemp : CheckDoc[] = [];
                for(let ds of temp){
                  if(ds !== null && typeof ds.id !== 'undefined'){
                    let itemList : CheckDoc = {id: ds.id, doc: ds.docTipo, status: true, descricao: ds.descricao, data: ds.dataPostagem};
                    listTemp.push(itemList);
                  }else{
                    let itemList : CheckDoc = {id: ds.id, doc: ds.docTipo, status: false, descricao: ds.descricao, data: ds.dataPostagem};
                    listTemp.push(itemList);
                  }
                }
                this.listaCheckDoc = [];
                this.listaCheckDoc = listTemp;
              }
        );
    }
  }

  inputFileChange(doc) {
    if (doc.target.files && doc.target.files[0]) {
      const arquivo = doc.target.files[0];
      const formData = new FormData();
      formData.delete('arquivo');
      formData.append('arquivo', arquivo);
      this.arquivoSize = doc.target.files[0].size;
      this.arquivoNome = doc.target.files[0].name;

      if(this.idTemp == null){
        this.addProcessoParcial(formData);
      }else{
        this.checkUpload(formData, this.docDescricao);
      }
    }
  }
 
  searchByNomeArquivo(formData,descricaoDoc){
    let pattern = /[?!/:'"><|\\*\]\[]/g;

    if((pattern.test(this.arquivoNome))){
      this.viewMsgErro = false;
      this.msgErro = "Nome do arquivo possui caracteres especiais ou incompatíveis com esta operação, renomeie para algo mais simples e tente novamente.";
      this.codErro = 400;
      this.viewMsgErro = true;
      this.arquivoValid = false;
      this.scroolToTop();
    }else{
      this.documentacaoArquivoService
      .searchByName(this.arquivoNome)
        .subscribe(
          result => {
            if(result.length > 0){
              this.arquivoExist = true;
            }else{
              this.arquivoExist = false;
            }
            this.checkArquivo(formData,descricaoDoc);
          }
        )
    }
  }

  scroolToTop(){
    window.scroll(0,0);
  }

  checkArquivo(formData,descricaoDoc){
    let pattern = /.pdf|.PDF$/g;
    if(this.arquivoExist){
      this.msgErro = 'Erro ao enviar este arquivo, pois já consta registro com esse mesmo nome do arquivo!';
      this.codErro = 400;
      this.viewMsgErro = true;
      this.arquivoValid = false;
      this.scroolToTop();
    }else if((this.arquivoSize/(1024*1024))>5){
      this.viewMsgErro = false;
      this.msgErro = "Tamanho do arquivo não admitido, pois excede 5MB, tente novamente.";
      this.codErro = 406;
      this.viewMsgErro = true;
      this.arquivoValid = false;
      this.scroolToTop();
    }else if(!pattern.test(this.arquivoNome)){
      this.viewMsgErro = false;
      this.msgErro = "Formato não admitido, segue formato permitido: pdf.";
      this.codErro = 304;
      this.viewMsgErro = true;
      this.arquivoValid = false;
      this.scroolToTop();
    }else{
      this.arquivoValid = true;
      if(this.arquivoValid){
        this.docArquivoService.uploadDocProcesso(formData, this.selecaoDoc, this.processo.id, descricaoDoc)
        .subscribe(
          resp => {
            this.carregaListaCheckDoc();
            this.openInfoUpload();
          }
        );
      }else{
        this.scroolToTop();
      }
    }
  }

  checkUpload(formData, descricaoDoc){
    this.searchByNomeArquivo(formData, descricaoDoc);
  }

  openInfoUpload(){
    const dialogRef = this.dialog.open(UploadSucessModalComponent);
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
       }
    });
  }

  addProcessoParcial(formData){
    this.setDadosProcesso();
    this.processosService
      .add(this.processo)
        .subscribe(
          processoNovo => {
            this.processo = processoNovo;
            this.checkUpload(formData, this.docDescricao);
            this.retonar();
          }
        );
  }

  openDeleteCronoDialog(id){
    const dialogRef = this.dialog.open(UserModalComponent);
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
              this.cronoService.delete(id).subscribe(_ => {
                this.cronograma = []
                this.carregarCronograma(this.processo.id);
              })
          }
    });
  }

  openDeleteDialog(id) {
    const dialogRef = this.dialog.open(UserModalComponent);
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
          this.documentacaoArquivoService.delete(id).subscribe(
            _ => {
                this.listaCheckDoc = []
                this.carregaListaCheckDoc()
            })
         }
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

  getArquivo(id){
    this.documentacaoArquivoService.getArquivoById(id).subscribe(
      arquivoTemp => {
        this.link = URL_DOWNLOAD + "/" + arquivoTemp.id;
        let l = document.createElement("a");
        l.href = this.link;
        l.target = "_self";
        l.click();
      });
  }

  changeDocTipo(tipo){
    this.selecaoDoc = tipo
  } 

  hideMsg(){
    this.viewMsgErro = false;
  }

  changeVaga(dados){
    if(!dados)
      this.processo.vagas = 0;
  }

  exportDialog(): void {
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: 'CRONOGRAMA'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
