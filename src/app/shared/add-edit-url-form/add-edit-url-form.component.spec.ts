import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditURLFormComponent } from './add-edit-url-form.component';

describe('AddEditURLFormComponent', () => {
  let component: AddEditURLFormComponent;
  let fixture: ComponentFixture<AddEditURLFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditURLFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditURLFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
