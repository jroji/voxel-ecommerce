import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { ProgressComponent } from './components/progress/progress.component';


@NgModule({
  declarations: [
    DetailComponent,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    DetailRoutingModule
  ]
})
export class DetailModule { }
