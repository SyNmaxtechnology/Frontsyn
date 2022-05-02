import { TestBed } from '@angular/core/testing';

import { EmisorService } from './emisor.service';

describe('EmisorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmisorService = TestBed.get(EmisorService);
    expect(service).toBeTruthy();
  });
});
