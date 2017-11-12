import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PingService} from '../../shared/ping.service';
import {Observable} from 'rxjs/Observable';
import {AsdPingStatus, AsdUrlPingStatusItem} from '../../shared/AsdTypes';
import {filter, mergeMap, share, tap, toArray} from 'rxjs/operators';
import {from} from 'rxjs/observable/from';

@Component({
  selector: 'asd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  pingItems$: Observable<Array<AsdUrlPingStatusItem>>;
  pingItemsFavorite$: Observable<Array<AsdUrlPingStatusItem>>;
  pingItemsOnline$: Observable<Array<AsdUrlPingStatusItem>>;
  pingItemsOffline$: Observable<Array<AsdUrlPingStatusItem>>;
  pingItemsPending$: Observable<Array<AsdUrlPingStatusItem>>;

  constructor(private pingService: PingService) {
    this.pingItems$ = pingService.pingStatusItems$;

    this.pingItemsFavorite$ = pingService.pingStatusItems$.pipe(
      mergeMap(array => from(array).pipe(
        filter(item => item.pingItem.isFavorite === true),
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
