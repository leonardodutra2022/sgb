import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequenciaAlunoRegistroComponent } from './frequencia-aluno-registro.component';

describe('FrequenciaAlunoRegistroComponent', () => {
  let component: FrequenciaAlunoRegistroComponent;
  let fixture: ComponentFixture<FrequenciaAlunoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequenciaAlunoRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequenciaAlunoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
