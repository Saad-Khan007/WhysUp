import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallListComponent } from './call-list.component';

describe('CallListComponent', () => {
  let component: CallListComponent;
  let fixture: ComponentFixture<CallListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
