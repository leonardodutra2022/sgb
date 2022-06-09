import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Aluno } from 'src/app/model/aluno';
import { FrequenciaService } from 'src/app/service/frequencia.service';

@Component({
  selector: 'app-pdf-validar',
  templateUrl: './pdf-validar.component.html',
  styleUrls: ['./pdf-validar.component.scss']
})
export class PdfValidarComponent implements OnInit {

  msgValidacao = "";
  validacao = false;
  aluno: Aluno = new Aluno();
  uuid: string = '';

  constructor(private frequenciaService: FrequenciaService,
              private rotas : ActivatedRoute,
              public dialog : MatDialog) { }

  ngOnInit(): void {
    this.initFrequencia();
    this.checkValidacaoPDF();
  }

  initFrequencia(){
    this.uuid = this.rotas.snapshot.paramMap.get('uuid');
  }

  checkValidacaoPDF(){
    // this.frequenciaService
    //   .validarPDF(this.uuid)
    //     .subscribe(
    //       valid => {
    //         this.validacao = valid;
    //      }
    //   );
  }

  viewPdf() {
      const dialogRef = this.dialog.open(PdfValidarComponent,
        {
          data: {
            // frequencia: this.frequencia,
            aluno: this.aluno
          }
        });
      dialogRef.afterClosed().subscribe(
        result => {
      })
    }

}
