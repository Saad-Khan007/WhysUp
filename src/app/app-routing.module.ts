import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./components/authentication/authentication.module').then(route => route.AuthenticationModule)
  },
  {
    path: 'ui',
    loadChildren: () => import('./components/user-interface/user-interface.module').then(route => route.UserInterfaceModule)
  },
  {
    path: '',
    redirectTo: 'ui/main',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'ui/main'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
