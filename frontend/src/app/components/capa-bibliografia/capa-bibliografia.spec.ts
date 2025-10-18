import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaBibliografia } from './capa-bibliografia';

describe('CapaBibliografia', () => {
  let component: CapaBibliografia;
  let fixture: ComponentFixture<CapaBibliografia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapaBibliografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapaBibliografia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
