import { TestBed } from '@angular/core/testing';

import { ReporteClienteService } from './reporte-cliente.service';

describe('ReporteClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteClienteService = TestBed.get(ReporteClienteService);
    expect(service).toBeTruthy();
  });
});
