import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomiaBrasileira } from './economia-brasileira';

describe('EconomiaBrasileira', () => {
  let component: EconomiaBrasileira;
  let fixture: ComponentFixture<EconomiaBrasileira>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EconomiaBrasileira]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EconomiaBrasileira);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
