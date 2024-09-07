import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ThousandSeparatorPipe } from 'src/app/pipe/thousand-separator';


@NgModule({
  declarations: [
    DashboardComponent,
    ThousandSeparatorPipe  
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
