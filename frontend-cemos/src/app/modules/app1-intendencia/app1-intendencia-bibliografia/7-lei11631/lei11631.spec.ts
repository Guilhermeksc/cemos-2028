import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lei11631 } from './lei11631';

describe('Lei11631', () => {
  let component: Lei11631;
  let fixture: ComponentFixture<Lei11631>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lei11631]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lei11631);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
