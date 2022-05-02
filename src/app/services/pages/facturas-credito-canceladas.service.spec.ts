import { TestBed } from '@angular/core/testing';

import { FacturasCreditoCanceladasService } from './facturas-credito-canceladas.service';

describe('FacturasCreditoCanceladasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacturasCreditoCanceladasService = TestBed.get(FacturasCreditoCanceladasService);
    expect(service).toBeTruthy();
  });
});
