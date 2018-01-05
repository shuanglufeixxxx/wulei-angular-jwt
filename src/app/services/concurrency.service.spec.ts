import { TestBed, inject } from '@angular/core/testing';

import { ConcurrencyService } from './concurrency.service';

describe('ConcurrencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConcurrencyService]
    });
  });

  it('should be created', inject([ConcurrencyService], (service: ConcurrencyService) => {
    expect(service).toBeTruthy();
  }));
});
