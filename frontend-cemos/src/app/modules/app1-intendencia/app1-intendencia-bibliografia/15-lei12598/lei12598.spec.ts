import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lei12598 } from './lei12598';

describe('Lei12598', () => {
  let component: Lei12598;
  let fixture: ComponentFixture<Lei12598>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lei12598]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lei12598);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
