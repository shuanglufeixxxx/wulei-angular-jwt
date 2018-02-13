import { TestBed, inject } from '@angular/core/testing';

import { DimensionService } from './dimension.service';

describe('DimensionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DimensionService]
    });
  });

  it('should be created', inject([DimensionService], (service: DimensionService) => {
    expect(service).toBeTruthy();
  }));
});
