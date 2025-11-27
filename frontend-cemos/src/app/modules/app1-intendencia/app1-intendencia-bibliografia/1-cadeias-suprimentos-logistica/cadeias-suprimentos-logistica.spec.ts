import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiasSuprimentosLogistica } from './cadeias-suprimentos-logistica';

describe('CadeiasSuprimentosLogistica', () => {
  let component: CadeiasSuprimentosLogistica;
  let fixture: ComponentFixture<CadeiasSuprimentosLogistica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadeiasSuprimentosLogistica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadeiasSuprimentosLogistica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
