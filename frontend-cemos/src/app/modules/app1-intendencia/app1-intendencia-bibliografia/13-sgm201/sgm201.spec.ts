import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sgm201 } from './sgm201';

describe('Sgm201', () => {
  let component: Sgm201;
  let fixture: ComponentFixture<Sgm201>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sgm201]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sgm201);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
