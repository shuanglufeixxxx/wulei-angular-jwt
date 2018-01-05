import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyLifeComponent } from './daily-life.component';

describe('DailyLifeComponent', () => {
  let component: DailyLifeComponent;
  let fixture: ComponentFixture<DailyLifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyLifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
