import { TestBed } from '@angular/core/testing';

import { ReporteArticuloService } from './reporte-articulo.service';

describe('ReporteArticuloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteArticuloService = TestBed.get(ReporteArticuloService);
    expect(service).toBeTruthy();
  });
});
