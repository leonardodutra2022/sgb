import { TestBed } from '@angular/core/testing';

import { LogradouroService } from './logradouro.service';

describe('LogradouroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogradouroService = TestBed.get(LogradouroService);
    expect(service).toBeTruthy();
  });
});
