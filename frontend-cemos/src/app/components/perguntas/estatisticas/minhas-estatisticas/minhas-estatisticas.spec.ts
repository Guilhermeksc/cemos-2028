import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasEstatisticas } from './minhas-estatisticas';

describe('MinhasEstatisticas', () => {
  let component: MinhasEstatisticas;
  let fixture: ComponentFixture<MinhasEstatisticas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhasEstatisticas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasEstatisticas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
