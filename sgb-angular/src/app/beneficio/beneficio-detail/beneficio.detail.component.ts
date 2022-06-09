import { Component, OnInit } from '@angular/core';
import { Beneficio } from 'src/app/model/beneficio';
import { BeneficioService } from 'src/app/service/beneficio.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beneficio-detail',
  templateUrl: './beneficio.detail.component.html',
  styleUrls: ['./beneficio.detail.component.scss']
})
export class BeneficioDetailComponent implements OnInit {

  ben : Beneficio = new Beneficio();
  id: string = '';

  constructor(private beneficioService: BeneficioService, 
    private rota : ActivatedRoute, public sessaoService: SessaoService) { }

  ngOnInit() {
    this.getBeneficioById();
  }

  getBeneficioById(){
    this.id = this.rota.snapshot.paramMap.get('id');
    if(this.id != null) {
      this.beneficioService.getBeneficiosById(this.id).subscribe(temp => {
        this.ben = temp;
      });
    }
  }

}
