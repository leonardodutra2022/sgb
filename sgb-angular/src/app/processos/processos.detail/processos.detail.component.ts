import { Component, OnInit } from '@angular/core';
import { Processos } from 'src/app/model/processos';
import { ProcessosService } from 'src/app/service/processos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessaoService } from 'src/app/service/sessao.service';

@Component({
  selector: 'app-processos-detail',
  templateUrl: './processos.detail.component.html',
  styleUrls: ['./processos.detail.component.scss']
})
export class ProcessosDetailComponent implements OnInit {

  processo : Processos = new Processos();
  id: string = '';
  nomeBeneficio = '';

  constructor(private processoService: ProcessosService, private router : Router, 
    private rota : ActivatedRoute, public sessaoService: SessaoService) { }

  ngOnInit() {
    this.getProcessoById();
  }

  getProcessoById(){
    this.id = this.rota.snapshot.paramMap.get('id');
    if(this.id != null) {
      this.processoService.getProcessosById(this.id).subscribe(processo => {
        this.processo = processo;
        // this.nomeBeneficio = processo.beneficios.nome;
      });
    }
  }

}
