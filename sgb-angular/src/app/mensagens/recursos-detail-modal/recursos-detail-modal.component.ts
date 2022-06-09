import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { API_SGB } from 'src/app/config/API';
import { Recurso } from 'src/app/model/recurso';
import { DocumentacaoArquivos } from 'src/app/model/documentacao.arquivos';
import { Processos } from 'src/app/model/processos';

@Component({
  selector: 'app-recursos-detail-modal',
  templateUrl: './recursos-detail-modal.component.html',
  styleUrls: ['./recursos-detail-modal.component.scss']
})
export class RecursosDetailModalComponent implements OnInit {
 
  link = '';
  recurso : Recurso = new Recurso();
  anexo : DocumentacaoArquivos = new DocumentacaoArquivos();
  existAnexo : boolean = false;
  processo : Processos = new Processos();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.recurso = this.data.recurso;
    this.processo = this.recurso.processo;
    this.anexo = this.recurso.docArquivo;
    if(this.anexo != null && typeof this.anexo != 'undefined'){
      this.link = API_SGB + "/download/" + this.anexo.id;
      this.existAnexo = true;
    }else{
      this.existAnexo = false;
    }

  }

}
