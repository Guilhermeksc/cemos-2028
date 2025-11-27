import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sgm601 } from './sgm601';

describe('Sgm601', () => {
  let component: Sgm601;
  let fixture: ComponentFixture<Sgm601>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sgm601]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sgm601);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
