import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { NavigationStart, NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  loading : boolean = true;

  constructor(private auth : AuthService,
              private router: Router){
                this.router.events.subscribe((routerEvent: Event) => {

                  if(routerEvent instanceof NavigationStart){
                    this.loading = true;
                  }

                  if(routerEvent instanceof NavigationEnd){
                    this.loading = false;
                  }

                });
              }

  ngOnInit(){
    this.auth.verifyManutencao();

  }
}
