import { TestBed } from '@angular/core/testing';

import { DocumentacaoArquivosService } from './documentacao.arquivos.service';

describe('Documentacao.ArquivosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentacaoArquivosService = TestBed.get(DocumentacaoArquivosService);
    expect(service).toBeTruthy();
  });
});
