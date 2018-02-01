import { TestBed, inject } from '@angular/core/testing';

import { FeaturedPictureService } from './featured-picture.service';

describe('FeaturedPictureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturedPictureService]
    });
  });

  it('should be created', inject([FeaturedPictureService], (service: FeaturedPictureService) => {
    expect(service).toBeTruthy();
  }));
});
