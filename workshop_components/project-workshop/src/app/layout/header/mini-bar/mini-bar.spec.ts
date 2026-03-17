import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniBar } from './mini-bar';

describe('MiniBar', () => {
  let component: MiniBar;
  let fixture: ComponentFixture<MiniBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
