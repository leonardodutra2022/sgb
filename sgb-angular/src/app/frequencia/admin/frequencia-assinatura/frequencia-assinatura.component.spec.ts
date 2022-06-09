import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequenciaAssinaturaComponent } from './frequencia-assinatura.component';

describe('FrequenciaAssinaturaComponent', () => {
  let component: FrequenciaAssinaturaComponent;
  let fixture: ComponentFixture<FrequenciaAssinaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequenciaAssinaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequenciaAssinaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
