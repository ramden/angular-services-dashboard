import {Injectable, OnDestroy} from '@angular/core';
import {ConfigurationService} from './configuration.service';
import {AsdPingStatus, AsdUrlPingItem, AsdUrlPingStatusItem} from './AsdTypes';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {catchError, combineLatest, flatMap, merge, mergeAll, mergeMap, switchMap, tap, toArray} from 'rxjs/operators';
import {from} from 'rxjs/observable/from';
import {Observable} from 'rxjs/Observable';
import {interval} from 'rxjs/observable/interval';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {Http, Jsonp, RequestOptionsArgs} from '@angular/http';
import {PingSocketService} from './ping-socket.service';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class PingService implements OnDestroy {
  private socketConnection: Subscription;

  private pingItemsSubject: BehaviorSubject<Array<AsdUrlPingStatusItem>> = new BehaviorSubject([]);

  pingStatusItems$: Observable<Array<AsdUrlPingStatusItem>> = this.pingItemsSubject.asObservable();
  private pingStatusItems: Array<AsdUrlPingStatusItem>;

  constructor(private configurationService: ConfigurationService,
              private pingSocketService: PingSocketService) {

    configurationService.pingConfigItemsList$.subscribe(configItemsList => {
      if (configItemsList) {
        this.pingStatusItems = configItemsList.map(item => {
          return {
            pingItem: item,
            currentStatus: AsdPingStatus.pending
          };
        });

        // Send initial array of items
        this.notifyObservers();

        this.startPingProcess(configItemsList);
      }
    });
  }

  private startPingProcess(pingItems: Array<AsdUrlPingItem>) {

    console.log('1');
    console.log(pingItems);
    this.pingSocketService.startPingForItems(pingItems);

    this.socketConnection = this.pingSocketService.getPingMessages().subscribe(pingMessage => {
      const foundItem = this.pingStatusItems.find(item => item.pingItem.url === pingMessage.url);

      if (foundItem) {
        foundItem.currentStatus = pingMessage.available ? AsdPingStatus.online : AsdPingStatus.offline;
        this.notifyObservers();
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
