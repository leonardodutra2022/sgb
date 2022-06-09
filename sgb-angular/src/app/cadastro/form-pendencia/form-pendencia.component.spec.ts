import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPendenciaComponent } from './form-pendencia.component';

describe('FormPendenciaComponent', () => {
  let component: FormPendenciaComponent;
  let fixture: ComponentFixture<FormPendenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPendenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPendenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
