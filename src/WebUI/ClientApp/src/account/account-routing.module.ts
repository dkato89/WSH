import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AccountComponent,
                children: [
                    { path: '', redirectTo: 'login', pathMatch: 'full' },
                    {
                        path: 'login',
                        loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
                    },
                    {
                        path: 'register',
                        loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule)
                    },
                    
                    { path: '**', redirectTo: 'login' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AccountRoutingModule {}
