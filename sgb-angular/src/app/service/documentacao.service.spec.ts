import { TestBed } from '@angular/core/testing';

import { DocumentacaoService } from './documentacao.service';

describe('DocumentacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentacaoService = TestBed.get(DocumentacaoService);
    expect(service).toBeTruthy();
  });
});
