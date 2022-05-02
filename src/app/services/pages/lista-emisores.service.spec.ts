import { TestBed } from '@angular/core/testing';

import { ListaEmisoresService } from './lista-emisores.service';

describe('ListaEmisoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaEmisoresService = TestBed.get(ListaEmisoresService);
    expect(service).toBeTruthy();
  });
});
