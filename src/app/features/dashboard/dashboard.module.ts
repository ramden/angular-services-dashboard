import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SectionGridComponent } from './section-grid/section-grid.component';
import { PingItemNormalComponent } from './item/ping-item-normal/ping-item-normal.component';
import { AddEditFormComponent } from '../../shared/add-edit-form/add-edit-form.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
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
