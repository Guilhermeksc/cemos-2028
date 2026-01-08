import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioEstudos } from './calendario-estudos';

describe('CalendarioEstudos', () => {
  let component: CalendarioEstudos;
  let fixture: ComponentFixture<CalendarioEstudos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioEstudos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioEstudos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
