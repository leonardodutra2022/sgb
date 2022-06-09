import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-versao-desatualizada',
  templateUrl: './versao-desatualizada.component.html',
  styleUrls: ['./versao-desatualizada.component.scss']
})
export class VersaoDesatualizadaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialog : MatDialog) { }

  ngOnInit(): void {
  }

}
