import { TestBed } from '@angular/core/testing';

import { GalderakService } from './galderak.service';

describe('GalderakService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalderakService = TestBed.get(GalderakService);
    expect(service).toBeTruthy();
  });
});
