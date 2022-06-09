import { Component, OnInit } from '@angular/core';
import { Documentacao } from 'src/app/model/documentacao';
import { DocumentacaoService } from 'src/app/service/documentacao.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { BeneficioService } from 'src/app/service/beneficio.service';
import { Beneficio } from 'src/app/model/beneficio';
import { DOCUMENTOS_TIPOS } from 'src/app/model/documentos.tipos';
import { FormControl } from '@angular/forms';

export interface DocumentoTipo {
  tipo:string;
  descricao:string;
}

export interface CategoriaDoc {
  categoria:string;
  descricao:string;
}

export interface GrupoDoc {
  grupo:string;
  descricao:string;
}


@Component({
  selector: 'app-documentacao-form',
  templateUrl: './documentacao.form.component.html',
  styleUrls: ['./documentacao.form.component.scss']
})
export class DocumentacaoFormComponent implements OnInit {

  idTemp: string = '';
  doc: Documentacao = new Documentacao();
  selecaoDoc : string = '';
  selecaoCategoria : string = '';
  selecaoGrupo : string = '';
  selecaoBeneficios : Beneficio[] = []; 
  isDocGeral : boolean = true;
  docValid : boolean = false;
  listBeneficios : Beneficio[] = [];

  listDocsTipo = DOCUMENTOS_TIPOS;

  listDocsCategorias : CategoriaDoc[] = [
    {categoria: "GERAL", descricao: "Documentação comum a todos os benefícios"},
    {categoria: "ESPECIFICO", descricao: "Documentação específico a um benefício"}
  ];

  listGrupoDocs : GrupoDoc[] = [
    {grupo: "DOCUMENTACAO_CANDIDATO", descricao: "Documentação do Candidato(a)"},
    {grupo: "DOCUMENTACAO_NUCLEO_FAMILIAR", descricao: "Documentação do Núcleo Familiar"},
    {grupo: "OUTRAS_DOCUMENTACOES", descricao: "Outras Documentações"},
    {grupo: "GERAL", descricao: "Documentação Comum"},
  ];

  constructor(private documentacaoService : DocumentacaoService, private sessaoService : SessaoService,
    private dialog : MatDialog, private router : Router, private rotas : ActivatedRoute, 
    private beneficioService : BeneficioService) { }

  ngOnInit() {
    this.carregarDocumentacao();
    this.carregarBeneficios();
  }

  checkDoc(){
    let pattern = /[?!/:'"><|\\*]/g;

    if(pattern.test(this.doc.documento)){
      this.docValid = false;
    }else{
      this.docValid = true;
    }
  }

  onStatusChange(doc : Documentacao){
    if(doc.ativo == true){
      doc.ativo = false;
      this.updateStatus(doc);
    }else{
      doc.ativo = true;
      this.updateStatus(doc);
    }
  }

  onStatusChangeObrigatorio(doc : Documentacao){
    if(doc.obrigatorio == true){
      doc.obrigatorio = false;
    }else{
      doc.obrigatorio = true;
    }
  }

  updateStatus(doc){
    this.documentacaoService.update(doc)
    .subscribe(docResult => doc = docResult);
  }

  carregarDocumentacao() {
    this.idTemp = this.rotas.snapshot.paramMap.get('id');
    if (this.idTemp != null) {
      this.documentacaoService.getDocumentosById(this.idTemp)
        .subscribe(docTemp => {
          this.doc = docTemp;
          this.selecaoDoc = docTemp.documentoTipo;
          this.selecaoCategoria = docTemp.categoria;
          this.selecaoGrupo = this.doc.grupoDoc;
          this.selecaoBeneficios = docTemp.beneficios;
          if(docTemp.categoria == "ESPECIFICO"){
            this.isDocGeral = false;
          }else{
            this.isDocGeral = true;
          }
        });
    }
  }

  carregarBeneficios(){
    this.beneficioService.getBeneficios()
      .subscribe(
        list => this.listBeneficios = list
      );
  }

  add() {
    this.doc.documentoTipo = this.selecaoDoc;
    this.doc.categoria = this.selecaoCategoria;
    this.doc.beneficios = this.selecaoBeneficios;
    
    if(this.selecaoGrupo == "GERAL"){
      this.doc.grupoDoc = "GERAL";
    }else{
      this.doc.grupoDoc = this.selecaoGrupo;
    }

    this.documentacaoService.add(this.doc).subscribe(() => this.retonar());
  }

  retonar(){
    this.router.navigate(['/documentacao']);
  }

  changeDocTipo(tipo){
    this.selecaoDoc = tipo
  }

  changeDocGrupo(grupo){
    this.selecaoGrupo = grupo
  }

  changeDocCategoria(categoria) {
    this.selecaoCategoria = categoria
    if(categoria == "ESPECIFICO"){
      this.isDocGeral = false;
    }else{
      this.isDocGeral = true;
    }
  }

  changeBeneficio(beneficio){
    let b = [];
    b = beneficio;
    this.selecaoBeneficios = b;
  }

  save() {
    this.doc.documentoTipo = this.selecaoDoc;
    this.doc.categoria = this.selecaoCategoria;
    this.doc.beneficios = this.selecaoBeneficios;
    
    if(this.selecaoGrupo == "GERAL"){
      this.doc.grupoDoc = "GERAL";
    }else{
      this.doc.grupoDoc = this.selecaoGrupo;
    }

    this.documentacaoService.update(this.doc)
      .subscribe(_ => this.retonar());
  }
}
