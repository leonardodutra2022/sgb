import { TestBed } from '@angular/core/testing';

import { FrequenciaRegistroService } from './frequencia-registro.service';

describe('FrequenciaRegistroService', () => {
  let service: FrequenciaRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrequenciaRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
