import {Routes, RouterModule} from '@angular/router';
import { UserComponent } from './user.component';
import { UserDetailComponent } from './user-detail/user.detail.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserFormComponent } from './user-form/user.form.component';
import { AuthGuard } from '../guards/auth.guard';
import { ExportFileComponent } from '../export-file/export-file.component';

const userRoutes : Routes = [
    {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: ExportFileComponent,
                data: {
                    value: 'USUARIO'
                }
            }
        ]
    },
    {
        path: 'users/add',
        component: UserFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/:id',
        component: UserDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/:id/edit',
        component: UserFormComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}