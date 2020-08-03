import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthModule} from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path : 'login',
    component: LoginComponent
  },
  {
    path: 'sensors',
    loadChildren: () => import('./sensors/sensors.module').then(m => m.SensorsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
