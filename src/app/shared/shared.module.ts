import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfigurationService} from './configuration.service';
import {PingService} from './ping.service';
import {ConfigurationPersistorService} from './configuration-persistor.service';
import {HttpClientModule, } from '@angular/common/http';
import {PingSocketService} from './ping-socket.service';
import {AddEditURLFormComponent} from './add-edit-url-form/add-edit-url-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddEditURLFormComponent
  ],
  providers: [
    ConfigurationService,
    ConfigurationPersistorService,
    PingService,
    PingSocketService
  ],
  exports: [
    AddEditURLFormComponent
  ]
})
export class SharedModule { }
