import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';


const SITE_UFC = 'http://crateus.ufc.br';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  
  siteUfc = SITE_UFC;

  constructor(private auth : AuthService) {}

  ngOnInit() {
    this.auth.verifyManutencao();
  }

}
