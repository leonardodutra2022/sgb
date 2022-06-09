import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosDetailModalComponent } from './recursos-detail-modal.component';

describe('RecursosDetailModalComponent', () => {
  let component: RecursosDetailModalComponent;
  let fixture: ComponentFixture<RecursosDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
