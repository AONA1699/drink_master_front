import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartModalComponent } from './cart-modal/cart-modal.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from 'src/app/pipe/pipe.module';


@NgModule({
  declarations: [
    CartModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    PipeModule
  ]
})
export class ModalsModule { }
