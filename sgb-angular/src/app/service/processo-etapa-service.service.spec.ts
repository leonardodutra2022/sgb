import { TestBed } from '@angular/core/testing';

import { ProcessoEtapaServiceService } from './processo-etapa-service.service';

describe('ProcessoEtapaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessoEtapaServiceService = TestBed.get(ProcessoEtapaServiceService);
    expect(service).toBeTruthy();
  });
});
