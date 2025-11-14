import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeiMobilizacaoNacional } from './lei-mobilizacao-nacional';

describe('LeiMobilizacaoNacional', () => {
  let component: LeiMobilizacaoNacional;
  let fixture: ComponentFixture<LeiMobilizacaoNacional>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeiMobilizacaoNacional]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeiMobilizacaoNacional);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
