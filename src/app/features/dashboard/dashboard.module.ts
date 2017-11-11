import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SectionGridComponent } from './section-grid/section-grid.component';
import { PingItemNormalComponent } from './item/ping-item-normal/ping-item-normal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DashboardComponent,
    SectionGridComponent,
    PingItemNormalComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
