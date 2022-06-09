import { TestBed } from '@angular/core/testing';

import { BeneficioService } from './beneficio.service';

describe('BeneficioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeneficioService = TestBed.get(BeneficioService);
    expect(service).toBeTruthy();
  });
});
