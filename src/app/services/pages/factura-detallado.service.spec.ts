import { TestBed } from '@angular/core/testing';

import { FacturaDetalladoService } from './factura-detallado.service';

describe('FacturaDetalladoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacturaDetalladoService = TestBed.get(FacturaDetalladoService);
    expect(service).toBeTruthy();
  });
});
