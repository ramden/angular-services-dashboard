import { Injectable } from '@angular/core';
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

@Injectable()
export class PingService {

  private pingItemsSubject: BehaviorSubject<Array<AsdUrlPingStatusItem>> = new BehaviorSubject([]);

  pingStatusItems$: Observable<Array<AsdUrlPingStatusItem>> = this.pingItemsSubject.asObservable();

  constructor(private configurationService: ConfigurationService,
              private http: HttpClient) {
    configurationService.pingConfigItemsList$.subscribe(result => {
      if (result) {
        this.pingItemsSubject.next(result.map(item => {
          return {
            pingItem: item,
            currentStatus: AsdPingStatus.offline
          };
        }));

        this.startPingProcess(result);
      }
    });
  }

  private startPingProcess(pingItems: Array<AsdUrlPingItem>) {

    const sourceObservable: Array<Observable<AsdUrlPingStatusItem>> = [];

    for (const pingItem of pingItems) {
      const obs: Observable<AsdUrlPingStatusItem> = interval(pingItem.pingIntervalSeconds * 1000).pipe(
        switchMap((value) => of(value)),
        mergeMap(() => {
          return this.http.get(pingItem.url);
        }),
        tap(console.log),
        catchError((err: Response) => {
          console.log(err);
          return Observable.throw(err);
        }),
        tap(console.log),
        /*
        map(result => {
          return {
            pingItem: pingItem,
            currentStatus: AsdPingStatus.offline
          };
        })
        */
      );

      sourceObservable.push(obs);

    }

    from(sourceObservable).pipe(
      mergeAll()
    ).subscribe(result => {
      console.log(result);
    });
  }
}
