import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipiosRi } from './principios-ri';

describe('PrincipiosRi', () => {
  let component: PrincipiosRi;
  let fixture: ComponentFixture<PrincipiosRi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipiosRi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipiosRi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
