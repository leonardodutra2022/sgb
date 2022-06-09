import { TestBed } from '@angular/core/testing';

import { LogradouroTipoService } from './logradouro.tipo.service';

describe('LogradouroTipoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogradouroTipoService = TestBed.get(LogradouroTipoService);
    expect(service).toBeTruthy();
  });
});
