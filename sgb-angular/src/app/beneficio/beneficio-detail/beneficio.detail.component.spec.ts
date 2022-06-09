import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficioDetailComponent } from './beneficio.detail.component';

describe('BeneficioDetailComponent', () => {
  let component: BeneficioDetailComponent;
  let fixture: ComponentFixture<BeneficioDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficioDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
