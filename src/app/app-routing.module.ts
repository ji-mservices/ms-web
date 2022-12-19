import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AutenticacionGuardService } from './security/autenticacion-guard.service';

const routes: Routes = [
  { path:'', redirectTo:'mlogin', pathMatch: 'full' },
  { path: 'mlogin', loadChildren: './login/login.module#LoginModule' },
  { path: 'mestructura', loadChildren: './estructura/estructura.module#EstructuraModule', canActivate:[AutenticacionGuardService] }, 
  //{ path: 'mestructura', loadChildren: './estructura/estructura.module#EstructuraModule'},
  { path: '**', redirectTo: '' } // otherwise redirect to home

];

const config: ExtraOptions = { useHash: true};

@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
