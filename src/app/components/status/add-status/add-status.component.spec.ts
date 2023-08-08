import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatusComponent } from './add-status.component';

describe('AddStatusComponent', () => {
  let component: AddStatusComponent;
  let fixture: ComponentFixture<AddStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
