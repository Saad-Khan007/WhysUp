import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./components/authentication/authentication.module').then(route => route.AuthenticationModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./components/user/user.module').then(route => route.UserModule)
  },
  {
    path: '',
    redirectTo: 'user/profile',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'user/profile'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
