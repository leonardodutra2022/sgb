import { TestBed } from '@angular/core/testing';

import { SituacaoSocioEconFamiliarService } from './situacao.socio.econ.familiar.service';

describe('SituacaoSocioEconFamiliarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SituacaoSocioEconFamiliarService = TestBed.get(SituacaoSocioEconFamiliarService);
    expect(service).toBeTruthy();
  });
});
