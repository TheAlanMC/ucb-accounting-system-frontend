import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarProfileComponent } from './sidebar-profile.component';

describe('SidebarComponent', () => {
  let component: SidebarProfileComponent;
  let fixture: ComponentFixture<SidebarProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarProfileComponent]
    });
    fixture = TestBed.createComponent(SidebarProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
