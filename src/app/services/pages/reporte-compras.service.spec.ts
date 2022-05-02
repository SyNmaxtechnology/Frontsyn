import { TestBed } from '@angular/core/testing';

import { ReporteComprasService } from './reporte-compras.service';

describe('ReporteComprasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteComprasService = TestBed.get(ReporteComprasService);
    expect(service).toBeTruthy();
  });
});
