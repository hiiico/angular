import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newtheme } from './new-theme';

describe('Newtheme', () => {
  let component: Newtheme;
  let fixture: ComponentFixture<Newtheme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newtheme]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newtheme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
