import { TestBed } from '@angular/core/testing';

import { ReporteProductoService } from './reporte-producto.service';

describe('ReporteProductoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteProductoService = TestBed.get(ReporteProductoService);
    expect(service).toBeTruthy();
  });
});
