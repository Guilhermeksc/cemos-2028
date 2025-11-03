import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Decreto12481 } from './decreto-12481';

describe('Decreto12481', () => {
  let component: Decreto12481;
  let fixture: ComponentFixture<Decreto12481>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Decreto12481]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Decreto12481);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
