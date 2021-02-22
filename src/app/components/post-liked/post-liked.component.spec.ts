import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLikedComponent } from './post-liked.component';

describe('PostLikedComponent', () => {
  let component: PostLikedComponent;
  let fixture: ComponentFixture<PostLikedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLikedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
