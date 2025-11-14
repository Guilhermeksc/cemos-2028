import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngGovernanca } from './eng-governanca';

describe('EngGovernanca', () => {
  let component: EngGovernanca;
  let fixture: ComponentFixture<EngGovernanca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngGovernanca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngGovernanca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
