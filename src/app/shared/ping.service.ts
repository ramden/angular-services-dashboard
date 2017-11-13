import {Injectable, OnDestroy} from '@angular/core';
import {ConfigurationService} from './configuration.service';
import {AsdPingStatus, AsdUrlPingItem} from './AsdTypes';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {PingSocketService} from './ping-socket.service';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class PingService implements OnDestroy {
  private socketConnection: Subscription;
  private pingStatusItems: Array<AsdUrlPingItem>;

  private pingItemsSubject: BehaviorSubject<Array<AsdUrlPingItem>> = new BehaviorSubject([]);
  pingStatusItems$: Observable<Array<AsdUrlPingItem>> = this.pingItemsSubject.asObservable();

  constructor(private configurationService: ConfigurationService,
              private pingSocketService: PingSocketService) {

    configurationService.pingConfigItemsList$.subscribe(configItemsList => {
      if (configItemsList) {
        this.pingStatusItems = configItemsList;

        // Send initial array of items
        this.notifyObservers();

        this.startPingProcess(configItemsList);
      }
    });
  }

  private startPingProcess(pingItems: Array<AsdUrlPingItem>) {
    this.pingSocketService.startPingForItems(pingItems);

    this.socketConnection = this.pingSocketService.getPingMessages().subscribe(pingMessage => {
      const foundItem = this.pingStatusItems.find(item => item.url === pingMessage.url);

      if (foundItem) {
        foundItem.currentStatus = pingMessage.available ? AsdPingStatus.online : AsdPingStatus.offline;
        this.notifyObservers();
        this.configurationService.editPingItemLocally(foundItem);
      }
    });
  }

  ngOnDestroy() {
    this.socketConnection.unsubscribe();
  }

  private notifyObservers() {
    this.pingItemsSubject.next(Object.assign([], this.pingStatusItems));
  }
}
