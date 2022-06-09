import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessaoService } from 'src/app/service/sessao.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user.detail.component.html',
  styleUrls: ['./user.detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  usuario : Usuario = new Usuario();
  id: string = '';

  constructor(private userService: UserService, private router : Router, 
    private rota : ActivatedRoute, public sessaoService: SessaoService) { }

  ngOnInit() {
    this.getUsuarioById();
  }

  getUsuarioById(){
    this.id = this.rota.snapshot.paramMap.get('id');
    if(this.id != null) {
      this.userService.getUsuariosById(this.id).subscribe(usuario => {
        this.usuario = usuario;
      });
    }
  }

}
