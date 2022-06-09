import { Component, OnInit } from '@angular/core';
import { Documentacao } from 'src/app/model/documentacao';
import { DocumentacaoService } from 'src/app/service/documentacao.service';
import { DocumentacaoArquivosService } from 'src/app/service/documentacao.arquivos.service';
import { ArquivosService} from 'src/app/service/arquivos.service';
import { Subscription } from 'src/app/model/subscription';
import { DocumentacaoArquivos } from 'src/app/model/documentacao.arquivos';
import { Processos } from 'src/app/model/processos';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from 'src/app/user/user-modal/user.modal.component';
import { DomSanitizer } from '@angular/platform-browser';
import { API_SGB } from 'src/app/config/API';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SessaoService } from 'src/app/service/sessao.service';
import { ProcessosService } from 'src/app/service/processos.service';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { AlunoService } from 'src/app/service/aluno.service';
import { Aluno } from 'src/app/model/aluno';
import { Usuario } from 'src/app/model/usuario';
import { InformeUploadComponent } from 'src/app/mensagens/informe-upload/informe-upload.component';
import { UploadSucessModalComponent } from 'src/app/cadastro/upload-sucess-modal/upload-sucess-modal.component';
import { Subject } from 'rxjs';
import { ErrorModalComponent } from 'src/app/cadastro/error-modal/error-modal.component';
import { InscricaoValidacaoService } from 'src/app/service/inscricao.validacao.service';
import { InscricaoValidacao } from 'src/app/model/inscricao.validacao';

const URL_DOWNLOAD = API_SGB + "/download";

export interface CheckDoc {
  doc:string;
  status:boolean;
  obrigatorio: boolean;
}

class LoadingCheck {
  doc : string;
  st : string;
}

export interface GrupoDoc {
  titulo:string;
  descricao:string;
  subtitulo:string;
}

@Component({
  selector: 'app-subscription-documentacao',
  templateUrl: './subscription.documentacao.component.html',
  styleUrls: ['./subscription.documentacao.component.scss']
})
export class SubscriptionDocumentacaoComponent implements OnInit {

  link = '';
  docsLista : Documentacao[] = [];
  colsTable: string[] = ['documento', 'descricao', 'Upload', 'entrega'];
  inscricao:Subscription = new Subscription();
  inscricaoValidacao : InscricaoValidacao = new InscricaoValidacao();
  processo:Processos = new Processos();
  aluno : Aluno = new Aluno();
  docSelecao = '';
  docSelecionado : Documentacao = new Documentacao();
  documentoArquivo:DocumentacaoArquivos = new DocumentacaoArquivos();
  listaCheckDoc:CheckDoc[] = [];
  matriculaSessaoAluno = '';
  loadingDoc : LoadingCheck = new LoadingCheck();
  stUpload = '';

  formData = new FormData();
  docDescricao = '';
  fundamentacao : string = '';
  selecaoDoc = '';
  arquivo;
  arquivoNome = '';
  arquivoSize : number;
  arquivoExist : boolean = false;
  arquivoValid : boolean = false;
  searchChecked : boolean = false;
  loading : boolean = false;

  error$ = new Subject<Boolean>();
  erro : HttpErrorResponse;
  msgErro = '';
  codErro : number;
  viewMsgErro : boolean = false;

  totalDocObrigatorio : number = 0;
  totalDocObrigatorioCheck : number = 0;

  gruposDocs : GrupoDoc[] = [
    {titulo: "GERAL", descricao: "Documentação Geral", subtitulo: "Documentação comum a todos os candidatos"},
    {titulo: "DOCUMENTACAO_CANDIDATO", descricao: "Documentação do Candidato(a)", subtitulo: "Documentação exclusiva do candidato, como identificação e etc"},
    {titulo: "DOCUMENTACAO_NUCLEO_FAMILIAR", descricao: "Documentação do Núcleo Familiar", subtitulo: "Documentação de entes familiares que compôem o núcleo familiar"},
    {titulo: "OUTRAS_DOCUMENTACOES", descricao: "Outras Documentações", subtitulo: "Documentações diversas"}
  ];
  gruposDocsCustom : GrupoDoc[] = [];

  constructor(private docService: DocumentacaoService, private docArquivoService : ArquivosService,
              private documentacaoArquivoService : DocumentacaoArquivosService, private dialog : MatDialog,
              private sanitizer: DomSanitizer, private http: HttpClient, private sessaoService: SessaoService,
              private inscricaoService : SubscriptionService, private alunoService : AlunoService,
              private iValidaService : InscricaoValidacaoService) { }

  ngOnInit() {
    this.getAluno(); 
    // this.openInformeUploadDialog();
  }

  carregaListaCheckDoc() {
    if(typeof this.inscricao.id !== 'undefined' && this.inscricao !== null){
      for(let item of this.docsLista){
        this.documentacaoArquivoService.
        getArquivoByInscricaoAndTipo(this.inscricao.id, item.documento).
          subscribe(
            temp => {
              if(temp !== null && typeof temp.id !== 'undefined'){
                let itemList : CheckDoc = {doc: item.documento, status: true, obrigatorio: item.obrigatorio};
                this.listaCheckDoc.push(itemList);
              }else{
                let itemList : CheckDoc = {doc: item.documento, status: false, obrigatorio: item.obrigatorio};
                this.listaCheckDoc.push(itemList);
              }
              this.validaInscricaoCheckDoc();
            }            
        );
      }
    }
  }

  validaInscricaoCheckDoc(){
    this.totalDocObrigatorio = 0;
    this.totalDocObrigatorioCheck = 0;

    for(let i of this.docsLista){
      if(i.obrigatorio)
        this.totalDocObrigatorio++;
    }

    for(let y of this.listaCheckDoc){
      if(y.status && y.obrigatorio)
        this.totalDocObrigatorioCheck++;
    }

    if(this.totalDocObrigatorioCheck==this.totalDocObrigatorio){
      this.inscricaoValidacao.documentacaoCompleta = true;
        this.iValidaService
        .update(this.inscricaoValidacao)
          .subscribe(
            result => 
            {
              this.inscricaoValidacao = result
          }
      );

    }else{
      this.inscricaoValidacao.documentacaoCompleta = false;
      this.iValidaService
      .update(this.inscricaoValidacao)
        .subscribe(
          result => 
          {
            this.inscricaoValidacao = result
        }
      );
    }
  }

  setDocSelecao(doc){
    this.docSelecao = doc.documento;
    this.docSelecionado = doc;
  }

  carregarListaDocs(){
    this.docService
      .getDocumentosAtivosByAuxilio(this.processo.beneficio.id)
        .subscribe(
          list => {
            this.docsLista = list;
            this.carregaListaCheckDoc();
        }
    );
  }

  loadingUpload(doc) : boolean{
    let st : boolean = false;
    if(this.loadingDoc.doc == doc && this.loadingDoc.st == 'ENVIANDO'){
      st = true;
    }else{
      st = false;
    }
    return st;
  }

  inputFileChange(doc) {
    this.docDescricao = 'Entrega documental!';
    if (doc.target.files && doc.target.files[0]) {
      this.arquivo = doc.target.files[0];
      this.arquivoNome = doc.target.files[0].name;
      this.arquivoSize = doc.target.files[0].size;
      this.formData.delete('arquivo');
      this.formData.append('arquivo', this.arquivo);
      this.carregaListaCheckDoc(); 
    }
  }

  isSelected(doc) : boolean {
    if((doc.documento == this.docSelecao) && (this.arquivo != '' && typeof this.arquivo != 'undefined')){
      let checkArquivo : boolean = this.checkArquivo();
      if(checkArquivo){
        return true;
      }else{
        return false;
      }
    }
    return false;
  }
  
  hideMsg(){
    this.viewMsgErro = false;
    this.arquivo = '';
  }

  checkArquivo() : boolean {
    var pattern = /.pdf|.PDF$/g;

    if(!pattern.test(this.arquivoNome)){
      this.viewMsgErro = false;
      this.msgErro = "Formato não admitido, segue formato permitido: pdf.";
      this.codErro = 304;
      this.viewMsgErro = true;
      window.scroll(0,0);
      return false;
    }else if((this.arquivoSize/(1024*1024))>11){
      this.viewMsgErro = false;
      this.msgErro = "Tamanho do arquivo não admitido, pois excede 10MB, tente novamente.";
      this.codErro = 406;
      this.viewMsgErro = true;
      window.scroll(0,0);
      return false;
    }else if(!this.arquivoValid){
      this.viewMsgErro = false;
      this.msgErro = "Nome do arquivo com caracteres especiais, ou ainda, o arquivo para o qual está tentando enviar já foi enviado antes com este mesmo nome. Renomeie-o sem uso de caracteres especiais ou nome diferente antes de tentar novamente.";
      this.codErro = 304;
      this.viewMsgErro = true;
      window.scroll(0,0);
      return false;
    }else{
      return true;
    }
  }

  openErroArquivoFormato(){
    const dialogRef = this.dialog.open(ErrorModalComponent, 
      {
        data: {
          msgErro: this.msgErro,
          codErro: this.codErro
        }
      });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
        }
    });
  }

  openDeleteDialog(documento) {
    const dialogRef = this.dialog.open(UserModalComponent);
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
          this.documentacaoArquivoService.getArquivoByInscricaoAndTipo(this.inscricao.id, documento).subscribe(
            temp => {
              this.documentacaoArquivoService.delete(temp.id).subscribe(_ => {
                this.listaCheckDoc = []
                this.carregaListaCheckDoc()
              })
            }
          )
       }
    });
  }

  openInformeUploadDialog() {
    const dialogRef = this.dialog.open(InformeUploadComponent);
    dialogRef.afterClosed().subscribe(
      result => {
       if(result==true){
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

  carregarProcesso(){    
    if(ProcessosService.processoAtual != null || typeof ProcessosService.processoAtual != 'undefined'){
      this.processo = ProcessosService.processoAtual;
    }else{
      this.processo = new Processos();
    }
  }

  getInscricao(){
    this.inscricaoService
      .getInscricaoByProcessoAndMatriculaAluno(this.processo.id, this.aluno.siape)
        .subscribe(
          inscricao =>
            {
              if(inscricao != null){
                this.inscricao = inscricao;
                
              }else{
                this.inscricao = new Subscription();
              }
              this.carregarListaDocs();
              this.getInscricaoValidacao(inscricao.id);
            }
        );
  }

  getInscricaoValidacao(inscricaoId){
    this.iValidaService
      .getInscricaoValidacaoByInscricao(inscricaoId)
        .subscribe(
          dados => {
            this.inscricaoValidacao = dados;
           
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
              this.carregarProcesso();
              this.getInscricao();
              this.carregarGruposDocs();
            }
          }
      );
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

  checkUpload(){
    this.upload(this.formData, this.docSelecao);
  }

  upload(formData, docSelecao){
    this.loading = true;
    this.docArquivoService.upload(formData, this.inscricao.id, docSelecao, this.processo.id)
          .subscribe(
            resp => {
              this.openInfoUpload();
              this.loading = false;
            },
            error => {
              this.error$.next(true);
              this.erro = error;
              this.getMsgErro();
              this.loading = false;

              this.arquivo = null;
              this.formData.delete('arquivo');
              this.formData.append('arquivo', this.arquivo);

              if(this.arquivo == null){
                this.viewMsgErro = false;
                this.msgErro = "Arquivo não foi selecionado para envio, favor selecionar algum arquivo. Caso ainda não esteja conseguindo, atualize a página e tente novamente!";
                this.codErro = 304;
                this.viewMsgErro = true;
                window.scroll(0,0);
              }
          }
      );
  }

  openInfoUpload(){
    const dialogRef = this.dialog.open(UploadSucessModalComponent);
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
          this.selecaoDoc = '';
          this.fundamentacao = '';
          this.docSelecao = '';
          this.docSelecionado = null;
          this.formData.delete('arquivo');
          this.carregaListaCheckDoc();
       }
    });
  }

  private getMsgErro(){
    switch(this.getErroCode()){
      case 406:
        this.msgErro = "Erro causado por envio de arquivo excedendo o tamanho estipulado de 10MB no máximo";
        this.codErro = this.getErroCode();
        this.getModalErro();
        break;
      case 304:
        this.msgErro = "Erro causado por envio de arquivo cujo nome já foi submetido antes (renomeie o arquivo e tente novamente), ou o erro pode ter sido causado por formato não admitido, segue os formatos permitidos: pdf.";
        this.codErro = this.getErroCode();
        this.getModalErro();
        break;
        case 417:
          this.msgErro = "Erro desconhecido, sua solicitação não foi atendida, contate o suporte.";
          this.codErro = this.getErroCode();
          this.getModalErro();
          break;        
    }
  }

  private getErroCode() : number{
    return this.erro.status;
  }
  
  getModalErro(){
    const dialogRef = this.dialog.open(ErrorModalComponent, 
      {
        data: {
          msgErro: this.msgErro,
          codErro: this.codErro
        }
      });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
        }
    });
  }

  validate(){
    this.searchByNomeArquivo();
  }

  viewHelpDoc(doc) : boolean{
    if(doc.id == "50" || doc.id == "51" || doc.id == "52" || doc.id == "53" || doc.id == "54"){
      return true;
    }
    return false;
  }

  searchByNomeArquivo(){
    let pattern = /[?!/:'"><|\\*\]\[]/g;

    if(this.arquivoNome != ""){
      if((pattern.test(this.arquivoNome))){
        this.arquivoValid = true;
        this.searchChecked = true;
      }else{
        this.arquivoValid = true;
        this.documentacaoArquivoService
        .searchByName(this.arquivoNome)
          .subscribe(
            result => {
              if(result.length > 0){
                this.arquivoExist = false;
              }else{
                this.arquivoExist = false;
              }
            }
          )
        }
      }
   }
}
