import { TestBed } from '@angular/core/testing';

import { POSService } from './pos.service';

describe('POSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: POSService = TestBed.get(POSService);
    expect(service).toBeTruthy();
  });
});
