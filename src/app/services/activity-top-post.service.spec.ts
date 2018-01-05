import { TestBed, inject } from '@angular/core/testing';

import { ActivityTopPostService } from './activity-top-post.service';

describe('ActivityTopPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityTopPostService]
    });
  });

  it('should be created', inject([ActivityTopPostService], (service: ActivityTopPostService) => {
    expect(service).toBeTruthy();
  }));
});
