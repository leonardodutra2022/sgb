import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoFormModalComponent } from './periodo-form-modal.component';

describe('PeriodoFormModalComponent', () => {
  let component: PeriodoFormModalComponent;
  let fixture: ComponentFixture<PeriodoFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodoFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
