import {Injectable} from '@angular/core';
import {AsdPingStatus, AsdUrlPingItem} from './AsdTypes';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConfigurationPersistorService {
  private pingItems: Array<AsdUrlPingItem>;
  private pingConfigItemsSubject: BehaviorSubject<Array<AsdUrlPingItem>> = new BehaviorSubject([]);
  pingConfigItemsList$: Observable<Array<AsdUrlPingItem>> = this.pingConfigItemsSubject.asObservable();

  constructor() {
    this.pingConfigItemsSubject.next(this.getAllPingItems());
  }

  private getAllPingItems(): Array<AsdUrlPingItem> {
    // Temporary
    // this.pingItems = this.getAllDummyPingItems();
    this.pingItems = this.retreiveFromLocalStorage() || [];

    return Object.assign([], this.pingItems);
  }

  private getAllDummyPingItems(): Array<AsdUrlPingItem> {
    return [
      {
        url: 'http://www.google.com',
        title: 'Google Search Engine',
        description: 'Google Search Engine availability check',
        isFavorite: false,
        currentStatus: AsdPingStatus.pending
      },
      {
        url: 'http://nexus.nexus.192.168.10.200.nip.io',
        title: 'HServer Nexus',
        description: '',
        isFavorite: true,
        currentStatus: AsdPingStatus.pending
      },
      {
        url: 'http://fakenotexistingurl-jijoijo.com',
        title: 'Fake not existing',
        description: '',
        isFavorite: false,
        currentStatus: AsdPingStatus.pending
      }
    ];
  }

  addNewPingItem(pingItem: AsdUrlPingItem) {
    this.pingItems.push(pingItem);
    console.log(this.pingItems);
    this.notifyAll();
    this.persistToLocalStorage();
  }

  editPingItem(pingItem: AsdUrlPingItem) {

    let foundItem = this.pingItems.find(item => item.url === pingItem.url);

    if (foundItem) {
      foundItem = Object.assign({}, pingItem);
      this.notifyAll();
      this.persistToLocalStorage();
    }
  }

  editPingItemLocally(pingItem: AsdUrlPingItem) {
    let foundItem = this.pingItems.find(item => item.url === pingItem.url);

    if (foundItem) {
      foundItem = Object.assign({}, pingItem);
      this.persistToLocalStorage();
    }
  }

  deletePingItem(pingItem: AsdUrlPingItem) {
    const index = this.pingItems.indexOf(pingItem);
    this.pingItems.splice(index, 1);
    this.notifyAll();
    this.persistToLocalStorage();
  }

  private notifyAll() {
    this.pingConfigItemsSubject.next(Object.assign([], this.pingItems));
  }

  private persistToLocalStorage() {
    localStorage.setItem('asdItems', JSON.stringify(this.pingItems));
  }

  private retreiveFromLocalStorage(): Array<AsdUrlPingItem> {
    return JSON.parse(localStorage.getItem('asdItems'));
  }
}
