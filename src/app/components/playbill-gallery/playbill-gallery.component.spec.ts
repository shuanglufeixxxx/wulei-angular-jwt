import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybillGalleryComponent } from './playbill-gallery.component';

describe('PlaybillGalleryComponent', () => {
  let component: PlaybillGalleryComponent;
  let fixture: ComponentFixture<PlaybillGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybillGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybillGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
