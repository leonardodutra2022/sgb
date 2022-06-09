import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-informe-rubrica',
  templateUrl: './informe-rubrica.component.html',
  styleUrls: ['./informe-rubrica.component.scss']
})
export class InformeRubricaComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  toPageCadRubrica(){
    this.router.navigate(['/frequencia/rubrica']);
  }

  adiarCadRubrica() {
    this.router.navigate(['/frequencia/admin/true']);
  }

}
