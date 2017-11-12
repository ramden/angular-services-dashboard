import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PingItemNormalComponent } from './ping-item-normal.component';

describe('PingItemNormalComponent', () => {
  let component: PingItemNormalComponent;
  let fixture: ComponentFixture<PingItemNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingItemNormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingItemNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
