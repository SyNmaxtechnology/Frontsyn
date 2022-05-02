import { TestBed } from '@angular/core/testing';

import { ReporteFormaPagoService } from './reporte-forma-pago.service';

describe('ReporteFormaPagoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteFormaPagoService = TestBed.get(ReporteFormaPagoService);
    expect(service).toBeTruthy();
  });
});
