import { Component, OnInit } from '@angular/core';
import { Documentacao } from '../model/documentacao';
import { DocumentacaoService } from '../service/documentacao.service';
import { MatDialog } from '@angular/material/dialog';
import { SessaoService } from '../service/sessao.service';
import { ExportFileComponent } from '../export-file/export-file.component';

export interface GrupoDoc {
  titulo:string;
  descricao:string;
  subtitulo:string;
}

@Component({
  selector: 'app-documentacao',
  templateUrl: './documentacao.component.html',
  styleUrls: ['./documentacao.component.scss']
})
export class DocumentacaoComponent implements OnInit {

  listaDocumentacao : Documentacao[];
  gruposDocs : GrupoDoc[] = [
    {titulo: "GERAL", descricao: "Documentação Geral", subtitulo: "Documentação comum a todos os candidatos"},
    {titulo: "DOCUMENTACAO_CANDIDATO", descricao: "Documentação do Candidato(a)", subtitulo: "Documentação exclusiva do candidato, como identificação e etc"},
    {titulo: "DOCUMENTACAO_NUCLEO_FAMILIAR", descricao: "Documentação do Núcleo Familiar", subtitulo: "Documentação de entes familiares que compôem o núcleo familiar"},
    {titulo: "OUTRAS_DOCUMENTACOES", descricao: "Outras Documentações", subtitulo: "Documentações diversas"}
  ];
  gruposDocsCustom : GrupoDoc[] = [];

  constructor(public documentacaoService : DocumentacaoService, 
    public sessaoService : SessaoService,
    public dialog : MatDialog) { }

  ngOnInit() {
    this.carregarDocs();
  }

  carregarGruposDocs(){
    this.documentacaoService
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

  carregarDocs(){
    this.documentacaoService
      .getDocumentos()
        .subscribe(
          dadosTemp => {
            this.listaDocumentacao = dadosTemp;
            this.carregarGruposDocs();
          }
      );
  }

  listarProcessos(){
    this.documentacaoService.getDocumentos()
    .subscribe(
        dadosTemp => this.listaDocumentacao = dadosTemp
      );
  }

  onStatusChange(doc : Documentacao){
    if(doc.ativo == true){
      doc.ativo = false;
      this.update(doc);
    }else{
      doc.ativo = true;
      this.update(doc);
    }
  }

  setListTempDocumentacao(){
    this.documentacaoService.carregarLista(this.listaDocumentacao);
  }

  update(doc){
    this.documentacaoService.update(doc)
    .subscribe(docResult => doc = docResult);
  }

  exportDialog(): void {
    const dialogRef = this.dialog.open(ExportFileComponent, {
      data: {
        lista: 'DOCUMENTACOES'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
