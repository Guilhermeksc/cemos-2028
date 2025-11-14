import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeopoliticaModernidade } from './geopolitica-modernidade';

describe('GeopoliticaModernidade', () => {
  let component: GeopoliticaModernidade;
  let fixture: ComponentFixture<GeopoliticaModernidade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeopoliticaModernidade]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeopoliticaModernidade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
