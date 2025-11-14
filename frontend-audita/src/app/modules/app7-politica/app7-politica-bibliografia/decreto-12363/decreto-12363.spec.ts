import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Decreto12363 } from './decreto-12363';

describe('Decreto12363', () => {
  let component: Decreto12363;
  let fixture: ComponentFixture<Decreto12363>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Decreto12363]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Decreto12363);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
