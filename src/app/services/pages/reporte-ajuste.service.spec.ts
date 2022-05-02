import { TestBed } from '@angular/core/testing';

import { ReporteAjusteService } from './reporte-ajuste.service';

describe('ReporteAjusteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteAjusteService = TestBed.get(ReporteAjusteService);
    expect(service).toBeTruthy();
  });
});
