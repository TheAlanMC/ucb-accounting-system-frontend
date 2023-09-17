import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsSectionComponent } from './attachments-section.component';

describe('AttachmentsSectionComponent', () => {
  let component: AttachmentsSectionComponent;
  let fixture: ComponentFixture<AttachmentsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttachmentsSectionComponent]
    });
    fixture = TestBed.createComponent(AttachmentsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
