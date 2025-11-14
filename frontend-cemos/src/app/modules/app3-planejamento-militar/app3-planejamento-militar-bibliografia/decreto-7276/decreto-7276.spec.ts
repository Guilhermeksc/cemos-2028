import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Decreto7276 } from './decreto-7276';

describe('Decreto7276', () => {
  let component: Decreto7276;
  let fixture: ComponentFixture<Decreto7276>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Decreto7276]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Decreto7276);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
