import { TestBed } from '@angular/core/testing';

import { InscricaoValidacaoService } from './inscricao.validacao.service';

describe('InscricaoValidacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InscricaoValidacaoService = TestBed.get(InscricaoValidacaoService);
    expect(service).toBeTruthy();
  });
});
