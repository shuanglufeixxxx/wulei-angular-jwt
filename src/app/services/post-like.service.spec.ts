import { TestBed, inject } from '@angular/core/testing';

import { PostLikeService } from './post-like.service';

describe('PostLikeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostLikeService]
    });
  });

  it('should be created', inject([PostLikeService], (service: PostLikeService) => {
    expect(service).toBeTruthy();
  }));
});
