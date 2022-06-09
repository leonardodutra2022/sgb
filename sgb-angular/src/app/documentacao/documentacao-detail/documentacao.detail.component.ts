import { Component, OnInit } from '@angular/core';
import { Documentacao } from 'src/app/model/documentacao';
import { ActivatedRoute } from '@angular/router';
import { DocumentacaoService } from 'src/app/service/documentacao.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { Beneficio } from 'src/app/model/beneficio';

@Component({
  selector: 'app-documentacao-detail',
  templateUrl: './documentacao.detail.component.html',
  styleUrls: ['./documentacao.detail.component.scss']
})
export class DocumentacaoDetailComponent implements OnInit {

  doc : Documentacao = new Documentacao();
  id: string = '';
  beneficios : Beneficio[] = [];

  constructor(private documentacaoService: DocumentacaoService, 
    private rota : ActivatedRoute, public sessaoService: SessaoService) { }

  ngOnInit() {
    this.getProcessoById();
  }

  getProcessoById(){
    this.id = this.rota.snapshot.paramMap.get('id');
    if(this.id != null) {
      this.documentacaoService.getDocumentosById(this.id).subscribe(temp => 
        {
          this.doc = temp;
          this.beneficios = temp.beneficios;
        });
    }
  }

}
