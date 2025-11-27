import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sgm401 } from './sgm401';

describe('Sgm401', () => {
  let component: Sgm401;
  let fixture: ComponentFixture<Sgm401>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sgm401]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sgm401);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
