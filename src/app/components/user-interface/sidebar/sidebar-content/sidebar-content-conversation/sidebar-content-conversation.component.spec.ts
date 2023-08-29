import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarContentConversationComponent } from './sidebar-content-conversation.component';

describe('SidebarContentConversationComponent', () => {
  let component: SidebarContentConversationComponent;
  let fixture: ComponentFixture<SidebarContentConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarContentConversationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarContentConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
