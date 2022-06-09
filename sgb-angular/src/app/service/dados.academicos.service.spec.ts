import { TestBed } from '@angular/core/testing';

import { DadosAcademicosService } from './dados.academicos.service';

describe('DadosAcademicosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DadosAcademicosService = TestBed.get(DadosAcademicosService);
    expect(service).toBeTruthy();
  });
});
