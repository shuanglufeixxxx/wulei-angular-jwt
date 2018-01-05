import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FasionShowComponent } from './fasion-show.component';

describe('FasionShowComponent', () => {
  let component: FasionShowComponent;
  let fixture: ComponentFixture<FasionShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FasionShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FasionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
