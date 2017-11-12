import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfigurationService} from './configuration.service';
import {PingService} from './ping.service';
import {ConfigurationPersistorService} from './configuration-persistor.service';
import {HttpClientModule, } from '@angular/common/http';
import {PingSocketService} from './ping-socket.service';
import {AddEditFormComponent} from './add-edit-form/add-edit-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    AddEditFormComponent
  ],
  providers: [
    ConfigurationService,
    ConfigurationPersistorService,
    PingService,
    PingSocketService
  ],
  exports: [
    AddEditFormComponent
  ]
})
export class SharedModule { }
