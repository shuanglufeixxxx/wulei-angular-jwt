import { TestBed, inject } from '@angular/core/testing';

import { PostPreviewService } from './post-preview.service';

describe('PostPreviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostPreviewService]
    });
  });

  it('should be created', inject([PostPreviewService], (service: PostPreviewService) => {
    expect(service).toBeTruthy();
  }));
});
