import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracaoDireitoTratados } from './declaracao-direito-tratados';

describe('DeclaracaoDireitoTratados', () => {
  let component: DeclaracaoDireitoTratados;
  let fixture: ComponentFixture<DeclaracaoDireitoTratados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclaracaoDireitoTratados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclaracaoDireitoTratados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
