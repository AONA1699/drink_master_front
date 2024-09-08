import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Aquí definimos el lazy loading para el login module
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./routes/login/login.module').then(m => m.LoginModule) },
  { path: 'dashboard', loadChildren: () => import('./routes/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'caja', loadChildren: () => import('./routes/caja/caja.module').then(m => m.CajaModule) },
  { path: 'inventario', loadChildren: () => import('./routes/inventario/inventario.module').then(m => m.InventarioModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 