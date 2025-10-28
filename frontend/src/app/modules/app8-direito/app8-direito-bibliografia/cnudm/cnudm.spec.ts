import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cnudm } from './cnudm';

describe('Cnudm', () => {
  let component: Cnudm;
  let fixture: ComponentFixture<Cnudm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cnudm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cnudm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
