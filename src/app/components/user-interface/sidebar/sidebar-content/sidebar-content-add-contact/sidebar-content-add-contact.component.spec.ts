import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarContentAddContactComponent } from './sidebar-content-add-contact.component';

describe('SidebarContentAddContactComponent', () => {
  let component: SidebarContentAddContactComponent;
  let fixture: ComponentFixture<SidebarContentAddContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarContentAddContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarContentAddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
