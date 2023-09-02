import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarContentStatusComponent } from './sidebar-content-status.component';

describe('SidebarContentStatusComponent', () => {
  let component: SidebarContentStatusComponent;
  let fixture: ComponentFixture<SidebarContentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarContentStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarContentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
