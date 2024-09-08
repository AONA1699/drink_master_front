import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThousandSeparatorPipe } from 'src/app/pipe/thousand-separator';


@NgModule({
  declarations: [
    ThousandSeparatorPipe,
  ],
  exports: [
    ThousandSeparatorPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
