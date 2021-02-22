import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlusGalleryComponent } from './show-plus-gallery.component';

describe('ShowPlusGalleryComponent', () => {
  let component: ShowPlusGalleryComponent;
  let fixture: ComponentFixture<ShowPlusGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPlusGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPlusGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
