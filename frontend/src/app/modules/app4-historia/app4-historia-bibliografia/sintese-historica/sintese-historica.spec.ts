import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinteseHistorica } from './sintese-historica';

describe('SinteseHistorica', () => {
  let component: SinteseHistorica;
  let fixture: ComponentFixture<SinteseHistorica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinteseHistorica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinteseHistorica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
