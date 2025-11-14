import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeiDaGuerra } from './lei-da-guerra';

describe('LeiDaGuerra', () => {
  let component: LeiDaGuerra;
  let fixture: ComponentFixture<LeiDaGuerra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeiDaGuerra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeiDaGuerra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
