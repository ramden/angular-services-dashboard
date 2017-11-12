import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfigurationService} from './configuration.service';
import {PingService} from './ping.service';
import {ConfigurationPersistorService} from './configuration-persistor.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, } from '@angular/common/http';
import {TimingInterceptor} from './TimingInterceptor';
import {JsonpModule} from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    JsonpModule
  ],
  declarations: [],
  providers: [
    ConfigurationService,
    ConfigurationPersistorService,
    PingService
  ]
})
export class SharedModule { }
