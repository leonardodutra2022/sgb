import { TestBed } from '@angular/core/testing';

import { InscricaoPendenciaServiceService } from './inscricao.pendencia.service.service';

describe('InscricaoPendenciaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InscricaoPendenciaServiceService = TestBed.get(InscricaoPendenciaServiceService);
    expect(service).toBeTruthy();
  });
});
