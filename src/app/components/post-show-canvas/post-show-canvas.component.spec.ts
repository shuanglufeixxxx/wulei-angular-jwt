import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostShowCanvasComponent } from './post-show-canvas.component';

describe('PostShowCanvasComponent', () => {
  let component: PostShowCanvasComponent;
  let fixture: ComponentFixture<PostShowCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostShowCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostShowCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
