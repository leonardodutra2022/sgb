import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Sistema } from '../model/sistema';

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.scss']
})
export class ManutencaoComponent implements OnInit {

  infoSistema : Sistema = new Sistema();
  dataHoraManutencao : any;

  constructor(private auth : AuthService) { }

  ngOnInit() {
    this.auth.verifyManutencao();
    this.auth.getInfoSis()
      .subscribe(
        temp => 
          {
            this.infoSistema = temp;
            this.dataHoraManutencao = 
              new Date(temp.dataHora).toLocaleDateString() + " às " + 
                new Date(temp.dataHora).toLocaleTimeString();
          }
      );
  }

}
