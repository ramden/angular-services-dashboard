import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PingService} from '../../shared/ping.service';
import {Observable} from 'rxjs/Observable';
import {AsdPingStatus, AsdUrlPingItem} from '../../shared/AsdTypes';
import {filter, mergeMap, share, tap, toArray} from 'rxjs/operators';
import {from} from 'rxjs/observable/from';

@Component({
  selector: 'asd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  pingItems$: Observable<Array<AsdUrlPingItem>>;
  pingItemsFavorite$: Observable<Array<AsdUrlPingItem>>;
  pingItemsOnline$: Observable<Array<AsdUrlPingItem>>;
  pingItemsOffline$: Observable<Array<AsdUrlPingItem>>;
  pingItemsPending$: Observable<Array<AsdUrlPingItem>>;

  constructor(private pingService: PingService) {
    this.pingItems$ = pingService.pingStatusItems$;

    this.pingItemsFavorite$ = pingService.pingStatusItems$.pipe(
      mergeMap(array => from(array).pipe(
        filter(item => item.isFavorite === true),
        toArray(),
        share()
      ))
    );

    this.pingItemsOnline$ = pingService.pingStatusItems$.pipe(
      mergeMap(array => from(array).pipe(
        filter(item => item.currentStatus === AsdPingStatus.online),
        toArray(),
        share()
      ))
    );

    this.pingItemsOffline$ = pingService.pingStatusItems$.pipe(
      mergeMap(array => from(array).pipe(
        filter(item => item.currentStatus === AsdPingStatus.offline),
        toArray(),
        share()
      ))
    );

    this.pingItemsPending$ = pingService.pingStatusItems$.pipe(
      mergeMap(array => from(array).pipe(
        filter(item => item.currentStatus === AsdPingStatus.pending),
        toArray(),
        share()
      ))
    );
  }

  ngOnInit() {
  }

}
