import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ModalsModule } from 'src/app/modal/cart/card.module';
import { PipeModule } from 'src/app/pipe/pipe.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PipeModule,
    ModalsModule
  ]
})
export class DashboardModule { }
