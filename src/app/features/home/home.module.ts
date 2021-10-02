import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardModule } from '@voxel-ui/card';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    HomeRoutingModule
  ],
})
export class HomeModule { }
