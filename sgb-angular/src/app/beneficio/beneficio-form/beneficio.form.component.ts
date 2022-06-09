import { Component, OnInit } from '@angular/core';
import { Beneficio } from 'src/app/model/beneficio';
import { BeneficioService } from 'src/app/service/beneficio.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

export interface BeneficioTipo {
  tipoBeneficio:string;
}

@Component({
  selector: 'app-beneficio-form',
  templateUrl: './beneficio.form.component.html',
  styleUrls: ['./beneficio.form.component.scss']
})
export class BeneficioFormComponent implements OnInit {

  idTemp: string = '';
  ben: Beneficio = new Beneficio();
  selecaoBeneficio : string = '';
  listBensTipo : BeneficioTipo[] = [
    {tipoBeneficio:"AUXILIO"},
    {tipoBeneficio:"BOLSA"}
  ];

  constructor(private beneficioService : BeneficioService, private sessaoService : SessaoService,
    private dialog : MatDialog, private router : Router, private rotas : ActivatedRoute) { }

  ngOnInit() {
    this.carregarBeneficio();
  }

  onStatusChange(ben : Beneficio){
    if(ben.permiteAcumulacao == true){
      ben.permiteAcumulacao = false;
      this.update(ben);
    }else{
      ben.permiteAcumulacao = true;
      this.update(ben);
    }
  }

  onStatusChangeAcumulacao(ben : Beneficio){
    if(ben.permiteAcumulacao == true){
      ben.permiteAcumulacao = false;
    }else{
      ben.permiteAcumulacao = true;
    }
  }

  update(ben){
    this.beneficioService.update(ben)
    .subscribe(result => ben = result);
  }

  carregarBeneficio() {
    this.idTemp = this.rotas.snapshot.paramMap.get('id');
    if (this.idTemp != null) {
      this.beneficioService.getBeneficiosById(this.idTemp)
        .subscribe(temp => {
          this.ben = temp;
          this.selecaoBeneficio = temp.tipoBeneficio
        });
    }
  }

  add() {
    this.ben.tipoBeneficio = this.selecaoBeneficio;
    this.beneficioService.add(this.ben).subscribe(() => this.retonar());
  }

  retonar(){
    this.router.navigate(['/cadastro/auxilio']);
  }

  changeBenTipo(tipo){
    this.selecaoBeneficio = tipo
  }

  save() {
    this.ben.tipoBeneficio = this.selecaoBeneficio;
    this.beneficioService.update(this.ben)
      .subscribe(_ => this.retonar());
  }

}
 