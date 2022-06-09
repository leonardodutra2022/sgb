import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login-recover',
  templateUrl: './login-recover.component.html',
  styleUrls: ['./login-recover.component.scss']
})
export class LoginRecoverComponent implements OnInit {

  email = '';
  sending : boolean = false;
  verifyEmail = false;

  constructor(private usuarioService : UserService,) { }

  ngOnInit() {
  }

  search(){
    this.sending = true;
    this.usuarioService.
      recoverEmailPublic(this.email).
        subscribe(
          resp => {
            this.sending = false;
            this.verifyEmail = true;
          }
        );
  }

}
