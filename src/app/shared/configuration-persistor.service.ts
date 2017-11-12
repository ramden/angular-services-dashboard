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
      url: 'http://www.google.com',
      title: 'Google Search Engine',
      description: 'Google Search Engine availability check',
      isFavorite: false,
    },
      {
        url: 'http://nexus.nexus.192.168.10.200.nip.io',
        title: 'HServer Nexus',
        description: '',
        isFavorite: true,
      },
      {
        url: 'http://fakenotexistingurl-jijoijo.com',
        title: 'Fake not existing',
        description: '',
        isFavorite: false,
      }
      ];
  }
}
