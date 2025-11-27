import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Decreto7970 } from './decreto7970';

describe('Decreto7970', () => {
  let component: Decreto7970;
  let fixture: ComponentFixture<Decreto7970>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Decreto7970]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Decreto7970);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
