import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AsdPingStatus, AsdUrlPingItem} from '../../../../shared/AsdTypes';
import {ConfigurationService} from '../../../../shared/configuration.service';

@Component({
  selector: 'asd-ping-item-normal',
  templateUrl: './ping-item-normal.component.html',
  styleUrls: ['./ping-item-normal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PingItemNormalComponent implements OnInit {

  @Input() pingItem: AsdUrlPingItem;

  statusCompare = AsdPingStatus;

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() {
  }

  delete() {
    this.configurationService.deletePingItem(this.pingItem);
  }
}
