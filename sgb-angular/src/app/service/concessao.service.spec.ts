import { TestBed } from '@angular/core/testing';

import { ConcessaoService } from './concessao.service';

describe('ConcessaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConcessaoService = TestBed.get(ConcessaoService);
    expect(service).toBeTruthy();
  });
});
