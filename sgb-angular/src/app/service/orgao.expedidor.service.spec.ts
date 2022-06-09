import { TestBed } from '@angular/core/testing';

import { OrgaoExpedidorService } from './orgao.expedidor.service';

describe('OrgaoExpedidorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrgaoExpedidorService = TestBed.get(OrgaoExpedidorService);
    expect(service).toBeTruthy();
  });
});
