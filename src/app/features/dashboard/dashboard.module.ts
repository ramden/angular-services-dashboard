import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SectionGridComponent } from './section-grid/section-grid.component';
import { PingItemNormalComponent } from './item/ping-item-normal/ping-item-normal.component';
import { AddEditURLFormComponent } from '../../shared/add-edit-url-form/add-edit-url-form.component';
import {SharedModule} from '../../shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule
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
