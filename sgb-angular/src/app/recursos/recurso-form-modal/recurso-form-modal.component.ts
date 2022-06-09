import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UploadSucessModalComponent } from 'src/app/cadastro/upload-sucess-modal/upload-sucess-modal.component';
import { ProcessosService } from 'src/app/service/processos.service';
import { Recurso } from 'src/app/model/recurso';
import { Subscription } from 'src/app/model/subscription';
import { ArquivosService } from 'src/app/service/arquivos.service';
import { DOCUMENTOS_TIPOS } from 'src/app/model/documentos.tipos';
import { Processos } from 'src/app/model/processos';
import { RecursoService } from 'src/app/service/recurso.service';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorModalComponent } from 'src/app/cadastro/error-modal/error-modal.component';
import { Router } from '@angular/router';
import { InscricaoPendenciaService } from 'src/app/service/inscricao.pendencia.service.service';

@Component({
  selector: 'app-recurso-form-modal',
  templateUrl: './recurso-form-modal.component.html',
  styleUrls: ['./recurso-form-modal.component.scss']
})
export class RecursoFormModalComponent implements OnInit {

  inscricaoTemp;
  processoTemp;
  recursoTemp;
  inscricao : Subscription = new Subscription();
  recurso : Recurso = new Recurso();
  processo : Processos = new Processos();

  idTemp = '';
  docDescricao = '';
  fundamentacao : string = '';
  fundamentacaoValid : boolean = false;
  msgValid = '';
  viewMsgValid : boolean = false;
  pendenciaDocumental : boolean = false;
  selecaoDoc = '';
  arquivo;
  anexoName : any[] = [];
  listDocsTipo = DOCUMENTOS_TIPOS;
  loading : boolean = false;

  error$ = new Subject<Boolean>();
  erro : HttpErrorResponse;
  msgErro = '';
  codErro : number;

  formData = new FormData();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialog : MatDialog,
              private docArquivoService : ArquivosService,
              private recursoService : RecursoService,
              private inscricaoService : SubscriptionService,
              private processoService : ProcessosService,
              private sessaoService : SessaoService,
              private router : Router,
              private inscricaoPendenciaService : InscricaoPendenciaService) { }

  ngOnInit() {
    this.checkRecurso();
    this.getDadosInscricao();
    this.getDadosProcesso();
  }

  checkRecurso(){
    this.recurso = new Recurso();
    this.pendenciaDocumental = this.data.pendenciaDoc;
  }

  getDadosInscricao(){
    this.inscricaoTemp = this.data.inscricao.codInscricao;
    this.inscricaoService
      .getInscricoesById(this.inscricaoTemp)
        .subscribe(
          dados => this.inscricao = dados
        );
  }

  getDadosProcesso(){
    this.processoTemp = this.data.inscricao.codProcesso;
    this.processoService
      .getProcessosById(this.processoTemp)
        .subscribe(
          dados => this.processo = dados
        );
  }

  inputFileChange(doc) {
    if(this.pendenciaDocumental){
      this.docDescricao = 'PENDENCIA_OK';
    }else{
      this.docDescricao = 'Anexo referente a inclusão de recurso...';
    }
    
    if (doc.target.files && doc.target.files[0]) {
      
      this.arquivo = doc.target.files[0];
      this.formData.delete('arquivo');
      this.formData.append('arquivo', this.arquivo);
      this.validaArquivo();
    }
  }

  validaArquivo(){
    let pattern = /[?!/:'"><|\\*\]\[]/g;

    if(this.arquivo.name != ""){
      if((pattern.test(this.arquivo.name))){
        this.msgErro = "Nome do arquivo possui caracteres especiais ou incompatíveis com esta operação, renomeie para algo mais simples - como por exemplo: arquivo5050521.pdf - e tente enviar novamente.";
        this.codErro = 400;
        this.formData.delete('arquivo');
        this.arquivo = null;
        this.getModalErro();
      }
    }
  }

  setDocSelecao(){
  }

  checkUpload(){
      this.upload(this.formData, this.docDescricao, this.fundamentacao);
  }

  upload(formData, descricaoDoc, fundamentacao){
    this.loading = true;
    this.docArquivoService.uploadDocRecurso(formData, this.selecaoDoc, this.inscricao.id, 
        descricaoDoc, true, this.processo.id, this.fundamentacao)
          .subscribe(
            resp => {

              this.inscricaoPendenciaService
                .setConcluido(this.inscricao.id)
                  .subscribe(
                    _ => {}
                  );

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
            }
          );
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

  private getErroCode() : number{
    return this.erro.status;
  }

  openInfoUpload(){
    const dialogRef = this.dialog.open(UploadSucessModalComponent);
    dialogRef.afterClosed().subscribe(result => {
       if(result==true){
          this.selecaoDoc = '';
          this.fundamentacao = '';
          this.formData.delete('arquivo');
       }
    });
  }

  toPageInscricoes(){
    this.router.navigate(['/inscricoes']);
  }

  changeDocTipo(tipo){
    this.selecaoDoc = tipo
  }

  btnReturnList(){
    let b = document.getElementById('btnList');
    b.click();
  }

  hideMsg(){
    this.viewMsgValid = false;
  }

  validaFundamentacao(){
    var pattern = /[\/\\]/;
    if(pattern.test(this.fundamentacao)){
      this.msgValid = "Caractere inválido encontrado no campo FUNDAMENTAÇÃO, retire caracteres barra '/' ou barra invertida do texto.";
      this.viewMsgValid = true;
      this.fundamentacaoValid = false;
    }else{
      this.msgValid = "";
      this.viewMsgValid = false;
      this.fundamentacaoValid = true;
    }
  }
}
