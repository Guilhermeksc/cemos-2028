import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngFluxos } from './eng-fluxos';

describe('EngFluxos', () => {
  let component: EngFluxos;
  let fixture: ComponentFixture<EngFluxos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngFluxos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngFluxos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
