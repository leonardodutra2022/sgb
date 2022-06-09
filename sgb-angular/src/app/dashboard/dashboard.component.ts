import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService,
              private router : Router) { 
  }

  ngOnInit() {

  }

  openConcessao(){
    this.router.navigate(['/concessao']);
  }

  openProcessos(){
    this.router.navigate(['/processos/admin']);
  }

  openDocumentacao(){
    this.router.navigate(['/documentacao']);
  }

  openCadBasicos(){
    this.router.navigate(['/cadastros-basicos']);
  }

  openFrequencia(){
    this.router.navigate(['/frequencia/aluno']);
  }

  openFrequenciaAdmin(){
    this.router.navigate(['/frequencia/admin']);
  }

  openRubrica(){
    this.router.navigate(['frequencia/rubrica']);
  }

  openAuxilio(){
    this.router.navigate(['cadastro/auxilio']);
  }
}
