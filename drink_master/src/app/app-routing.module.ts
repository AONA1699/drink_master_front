import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Aquí definimos el lazy loading para el login module
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./routes/login/login.module').then(m => m.LoginModule) },
  // Otras rutas podrían ir aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 