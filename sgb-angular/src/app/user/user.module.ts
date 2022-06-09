import { NgModule } from "@angular/core";
import { UserComponent } from "./user.component";
import { UserDetailComponent } from "./user-detail/user.detail.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UserRoutingModule } from "./user.routing.module";
import { UserFormComponent } from './user-form/user.form.component';
import { UserModalComponent } from "./user-modal/user.modal.component";
import { ErrorModalComponent } from "../cadastro/error-modal/error-modal.component";
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        UserRoutingModule,
        MatDialogModule,
        MatFormFieldModule
    ],
    exports: [],
    declarations: [
        UserComponent,
        UserDetailComponent,
        UserFormComponent,
        UserModalComponent,
        ErrorModalComponent
    ],    
        entryComponents: [
           UserModalComponent,
           ErrorModalComponent
        ] 
    ,
    providers: [
        
    ]
})
export class UserModule {

}