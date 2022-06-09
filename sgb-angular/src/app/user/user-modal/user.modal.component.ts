import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user.modal.component.html',
  styleUrls: ['./user.modal.component.scss']
})
export class UserModalComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit() {
  }

}
