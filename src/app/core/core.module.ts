import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame/frame.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {SharedModule} from '../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  declarations: [FrameComponent, PageNotFoundComponent],
  exports: [
    FrameComponent,
    PageNotFoundComponent
  ]
})
export class CoreModule { }
