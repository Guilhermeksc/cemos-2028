import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngNuvem } from './eng-nuvem';

describe('EngNuvem', () => {
  let component: EngNuvem;
  let fixture: ComponentFixture<EngNuvem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngNuvem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngNuvem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
