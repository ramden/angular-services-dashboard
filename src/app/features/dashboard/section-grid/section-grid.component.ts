import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'asd-section-grid',
  templateUrl: './section-grid.component.html',
  styleUrls: ['./section-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SectionGridComponent implements OnInit {

  @Input() title: string;
  @Input() title_icon: string;
  @Input() title_icon_color: string;
  @Input() background: string;
  @Input() mode: string;

  constructor() { }

  ngOnInit() {
  }

}
