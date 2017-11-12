import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AsdPingStatus, AsdUrlPingItem, AsdUrlPingStatusItem} from '../../../../shared/AsdTypes';

@Component({
  selector: 'asd-ping-item-normal',
  templateUrl: './ping-item-normal.component.html',
  styleUrls: ['./ping-item-normal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PingItemNormalComponent implements OnInit {

  @Input() pingItem: AsdUrlPingItem;
  @Input() status: AsdPingStatus;

  statusCompare = AsdPingStatus;

  constructor() { }

  ngOnInit() {
  }

}
