import { TestBed } from '@angular/core/testing';

import { RecepcionesService } from './recepciones.service';

describe('RecepcionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecepcionesService = TestBed.get(RecepcionesService);
    expect(service).toBeTruthy();
  });
});
