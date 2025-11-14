import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaDasGuerras } from './historia-das-guerras';

describe('HistoriaDasGuerras', () => {
  let component: HistoriaDasGuerras;
  let fixture: ComponentFixture<HistoriaDasGuerras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriaDasGuerras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaDasGuerras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
