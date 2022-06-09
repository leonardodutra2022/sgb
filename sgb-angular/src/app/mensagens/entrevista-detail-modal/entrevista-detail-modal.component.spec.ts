import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrevistaDetailModalComponent } from './entrevista-detail-modal.component';

describe('EntrevistaDetailModalComponent', () => {
  let component: EntrevistaDetailModalComponent;
  let fixture: ComponentFixture<EntrevistaDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrevistaDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrevistaDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
