import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarContentProfileComponent } from './sidebar-content-profile.component';

describe('SidebarContentProfileComponent', () => {
  let component: SidebarContentProfileComponent;
  let fixture: ComponentFixture<SidebarContentProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarContentProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarContentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
