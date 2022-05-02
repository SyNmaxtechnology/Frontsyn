import { TestBed } from '@angular/core/testing';

import { ReporteProveedorService } from './reporte-proveedor.service';

describe('ReporteProveedorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteProveedorService = TestBed.get(ReporteProveedorService);
    expect(service).toBeTruthy();
  });
});
