import { TestBed } from '@angular/core/testing';

import { ReporteExistenciaArticuloServiceService } from './reporte-existencia-articulo-service.service';

describe('ReporteExistenciaArticuloServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteExistenciaArticuloServiceService = TestBed.get(ReporteExistenciaArticuloServiceService);
    expect(service).toBeTruthy();
  });
});
