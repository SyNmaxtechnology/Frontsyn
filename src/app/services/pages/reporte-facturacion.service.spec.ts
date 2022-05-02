import { TestBed } from '@angular/core/testing';

import { ReporteFacturacionService } from './reporte-facturacion.service';

describe('ReporteFacturacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteFacturacionService = TestBed.get(ReporteFacturacionService);
    expect(service).toBeTruthy();
  });
});
