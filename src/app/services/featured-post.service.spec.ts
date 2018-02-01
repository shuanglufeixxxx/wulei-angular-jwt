import { TestBed, inject } from '@angular/core/testing';

import { FeaturedPostService } from './featured-post.service';

describe('FeaturedPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturedPostService]
    });
  });

  it('should be created', inject([FeaturedPostService], (service: FeaturedPostService) => {
    expect(service).toBeTruthy();
  }));
});
