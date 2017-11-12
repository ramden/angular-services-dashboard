import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {AsdSocketResponse, AsdUrlPingItem} from './AsdTypes';

@Injectable()
export class PingSocketService {
  private url = 'http://localhost:3000';
  private socket = null;

  startPingForItems(pingItems: Array<AsdUrlPingItem>) {
    if (pingItems) {
      if (!this.socket) {
        this.socket = io(this.url);
      }

      this.socket.emit('pingItems', pingItems);
    }
  }

  getPingMessages(): Observable<AsdSocketResponse> {
    const observable = new Observable<AsdSocketResponse>(observer => {
      if (!this.socket) {
        this.socket = io(this.url);
      }
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
