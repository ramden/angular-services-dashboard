import { Injectable } from '@angular/core';
import {AsdUrlPingItem} from './AsdTypes';

@Injectable()
export class ConfigurationPersistorService {
  private pingItems: Array<AsdUrlPingItem>;

  constructor() { }

  getAllPingItems(): Array<AsdUrlPingItem> {
    // Temporary
    this.pingItems = this.getAllDummyPingItems();

    return this.pingItems;
  }

  private getAllDummyPingItems(): Array<AsdUrlPingItem> {
    return [


      {
      url: 'http://localhost:18983',
      title: 'Google Search Engine',
      description: 'Google Search Engine availability check',
      isFavorite: true,
      pingIntervalSeconds: 1
    },
      {
        url: 'http://nexus.nexus.192.168.10.200.nip.io/',
        title: 'HServer Nexus',
        description: '',
        isFavorite: false,
        pingIntervalSeconds: 1
      }
      ];
  }
}
