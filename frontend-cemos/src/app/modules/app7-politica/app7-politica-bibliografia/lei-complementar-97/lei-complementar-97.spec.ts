import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeiComplementar97 } from './lei-complementar-97';

describe('LeiComplementar97', () => {
  let component: LeiComplementar97;
  let fixture: ComponentFixture<LeiComplementar97>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeiComplementar97]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeiComplementar97);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
