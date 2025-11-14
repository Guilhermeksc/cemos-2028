import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracaoDireitosHumanos } from './declaracao-direitos-humanos';

describe('DeclaracaoDireitosHumanos', () => {
  let component: DeclaracaoDireitosHumanos;
  let fixture: ComponentFixture<DeclaracaoDireitosHumanos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclaracaoDireitosHumanos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclaracaoDireitosHumanos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
