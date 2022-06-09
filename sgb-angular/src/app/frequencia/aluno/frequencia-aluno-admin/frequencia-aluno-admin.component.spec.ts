import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequenciaAlunoAdminComponent } from './frequencia-aluno-admin.component';

describe('FrequenciaAlunoAdminComponent', () => {
  let component: FrequenciaAlunoAdminComponent;
  let fixture: ComponentFixture<FrequenciaAlunoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequenciaAlunoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequenciaAlunoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
