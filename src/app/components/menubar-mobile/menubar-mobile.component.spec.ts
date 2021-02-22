import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarMobileComponent } from './menubar-mobile.component';

describe('MenubarMobileComponent', () => {
  let component: MenubarMobileComponent;
  let fixture: ComponentFixture<MenubarMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubarMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
