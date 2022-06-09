import { Component, OnInit, Inject } from '@angular/core';
import { API_SGB, SERVIDOR_MISC } from '../config/API';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodoRegistroFrequenciaProjeto } from '../model/periodo.registro.frequencia.projeto';
import { Projeto } from '../model/projeto';
import { FrequenciaRegistroService } from '../service/frequencia-registro.service';
import { PdfComponent } from '../frequencia/pdf/pdf.component';
import { FrequenciaService } from '../service/frequencia.service';
import { ExportAluno } from '../model/export.aluno';
import { Aluno } from '../model/aluno';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { PeriodoRegistroFrequencia } from '../model/periodo.registro.frequencia';
import { PdfBuffer } from '../model/pdf.buffer';

const URL_SERVIDOR_MISC = SERVIDOR_MISC + "/frequencia";

interface Format{
  format:string;
  value:string;
}

class Style {
  width;
}

class CheckListExportPDF {
  index: number;
  aluno: Aluno;
  projeto: Projeto;
  periodoRef: string;
  mesRef: number;
  anoRef: number;
  checked: boolean;
  periodoRegistroFrequencia: PeriodoRegistroFrequencia;

  constructor(index: number, aluno: Aluno, projeto: Projeto, periodoRef: string, mesRef: number, anoRef: number, 
      periodoRegistroFrequencia: PeriodoRegistroFrequencia){
    this.index = index;
    this.aluno = aluno;
    this.projeto = projeto;
    this.periodoRef = periodoRef;
    this.mesRef = mesRef;
    this.anoRef = anoRef;
    this.periodoRegistroFrequencia = periodoRegistroFrequencia;
  }
}

class PeriodoAluno {
  projeto: Projeto;
  aluno: Aluno;
  periodosRefAssociados: string[];
}

@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.scss']
})
export class ExportFileComponent implements OnInit {

  formatSelect = '';

  listaFrequenciasPeriodo: PeriodoRegistroFrequenciaProjeto[] = [];

  periodoFrequencia: PeriodoRegistroFrequenciaProjeto | any;

  projetos: Projeto[] = [];

  pdfsBuffer: PdfBuffer[] = [];

  dadosExport: ExportAluno = new ExportAluno();

  percentual: Style = {width: "0%"};

  fatorPercentual = 0;

  progressoCount: number;

  generatingPdf: boolean;

  formats : Format[] = [
    {format: "CSV",  value: "csv"},
    {format: "Planilha do Excel",  value: "xls"},
    {format: "ZIP (PDFs gerados automaticamente e compactados)",  value: "zip"}
  ];
  zippingFiles: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialog : MatDialog,
              public frequenciaRegistroService: FrequenciaRegistroService,
              public frequenciaService: FrequenciaService) {}

  ngOnInit() {
    this.getPeriodosAgrupadosDisponiveis();
  }

  setPeriodoFrequencia(opt){
    this.periodoFrequencia = opt;
  }

  getPeriodosAgrupadosDisponiveis(){
    this.frequenciaRegistroService
      .getPeriodosAgrupadosByProjetos()
        .subscribe(
          dados => {
            this.listaFrequenciasPeriodo = dados
          }
      );
  }

  getArquivo(){
    switch(this.formatSelect){
      case "csv":
        this.getCsv();
        break;
      case "zip":
        this.getZip();
        break;
      case "xls":
        this.getXls();
        break;
    }
  }

  getXls() {
    let url = `${URL_SERVIDOR_MISC}/${this.formatSelect.toLowerCase()}/?mes_ref=${this.periodoFrequencia.mesRef}&ano_ref=${this.periodoFrequencia.anoRef}`
    let link = document.createElement("a");
    link.href=url
    link.target="_blank"
    link.click();
  }

  progressPDFs(){
    this.progressoCount += Number(this.fatorPercentual.toFixed(0));
    this.percentual = {width: `${this.progressoCount}%`};
  }

  getZip(){
    this.frequenciaService
      .pdfListaExport(this.periodoFrequencia)
        .subscribe(
          dados => {
            this.dadosExport = dados;
            this.fatorPercentual = (100/dados.totalArquivos);
            this.exportarPDFs();
          }
      );
  }

  getCsv(){
    let url = `${URL_SERVIDOR_MISC}/${this.formatSelect.toLowerCase()}/?mes_ref=${this.periodoFrequencia.mesRef}&ano_ref=${this.periodoFrequencia.anoRef}`
    let link = document.createElement("a");
    link.href=url
    link.target="_blank"
    link.click();
  }

  setFormat(format : string){
    this.formatSelect = format.toLowerCase();
  }

  exportarPDFs(){
    this.progressoCount = 0;
    this.percentual = {width: `${this.progressoCount}%`};
    this.generatingPdf = true;
    this.zippingFiles = false;
    let checkList: CheckListExportPDF[] = [];
    checkList = this.getCheckListExportPDF();

    for(let chk of checkList){
      const dialogRef = this.dialog.open(PdfComponent, {
        data: {
          allPdf: true,
          pdf: chk.index,
          aluno: chk.aluno,
          projeto: chk.projeto,
          registroFrequencia: chk.periodoRegistroFrequencia,
          downloadPdf: false
        },
        hasBackdrop: false
      });
      dialogRef.afterClosed().subscribe(
        result => {
          this.progressPDFs();
          let pdfBufferResult: PdfBuffer = result.pdfBuffer;
          this.pdfsBuffer.push(pdfBufferResult);
          this.getZipArquivo(this.pdfsBuffer);
        })
    }
  }

  getZipArquivo(arquivos: PdfBuffer[]){
    let zip = new JSZip();
    let data = new Date();
    let nomeArquivoDownload = `pdfs_${data.toISOString()}.zip`;
    for(let arquivo of arquivos){
      zip.file(arquivo.arquivoNome, arquivo.blob);
    }
    if(this.progressoCount > 95){ 
      this.zippingFiles = true;
      zip.generateAsync({type: "blob"}).then(function(arquivo) {
        FileSaver.saveAs(arquivo, nomeArquivoDownload);
      });
    }
}

  getCheckListExportPDF(){
    let checkList: CheckListExportPDF[] = [];
    let count = 1;

    for(let pa of this.dadosExport.periodosAluno){
      console.log("teste 1 ===> " + JSON.stringify(pa));
      for(let perAssoc of pa.periodosRefAssociados){
        let periodo = perAssoc.split("_");
        let mesRef = Number.parseInt(periodo[0]);
        let anoRef = Number.parseInt(periodo[1]);
        let periodoRegistroFrequencia: PeriodoRegistroFrequencia = new PeriodoRegistroFrequencia();
        periodoRegistroFrequencia.periodoRef = perAssoc;
        periodoRegistroFrequencia.anoRef = anoRef;
        periodoRegistroFrequencia.mesRef = mesRef;
        periodoRegistroFrequencia.projeto = pa.projeto;
        periodoRegistroFrequencia.aluno = pa.aluno;

        let itemCheckList = new CheckListExportPDF(count, pa.aluno, pa.projeto, perAssoc, mesRef, anoRef, periodoRegistroFrequencia);
        checkList.push(itemCheckList);
        count++;
      }
    }
    return checkList;
  }
}