import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sgm107 } from './sgm107';

describe('Sgm107', () => {
  let component: Sgm107;
  let fixture: ComponentFixture<Sgm107>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sgm107]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sgm107);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
