import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomiaMicroMacro } from './economia-micro-macro';

describe('EconomiaMicroMacro', () => {
  let component: EconomiaMicroMacro;
  let fixture: ComponentFixture<EconomiaMicroMacro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EconomiaMicroMacro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EconomiaMicroMacro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
