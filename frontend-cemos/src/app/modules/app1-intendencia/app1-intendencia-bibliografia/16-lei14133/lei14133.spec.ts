import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lei14133 } from './lei14133';

describe('Lei14133', () => {
  let component: Lei14133;
  let fixture: ComponentFixture<Lei14133>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lei14133]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lei14133);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
