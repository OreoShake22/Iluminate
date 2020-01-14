import { TestBed } from '@angular/core/testing';

import {rankingservice } from './ranking.service';

describe('rankingervice', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: rankingservice = TestBed.get(rankingservice);
    expect(service).toBeTruthy();
  });
});
