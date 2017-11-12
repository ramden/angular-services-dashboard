import { Injectable } from '@angular/core';
import {ConfigurationPersistorService} from './configuration-persistor.service';
import {AsdUrlPingItem} from './AsdTypes';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ConfigurationService {

  private pingConfigItemsSubject: BehaviorSubject<Array<AsdUrlPingItem>> = new BehaviorSubject([]);

  pingConfigItemsList$: Observable<Array<AsdUrlPingItem>> = this.pingConfigItemsSubject.asObservable();

  constructor(private configurationPersistorService: ConfigurationPersistorService) {
    this.pingConfigItemsSubject.next( configurationPersistorService.getAllPingItems());
  }
}
