import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakesMenuComponent } from './shakes-menu.component';

describe('ShakesMenuComponent', () => {
  let component: ShakesMenuComponent;
  let fixture: ComponentFixture<ShakesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
