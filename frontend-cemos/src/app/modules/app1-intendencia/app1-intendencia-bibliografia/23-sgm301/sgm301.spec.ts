import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sgm301 } from './sgm301';

describe('Sgm301', () => {
  let component: Sgm301;
  let fixture: ComponentFixture<Sgm301>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sgm301]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sgm301);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
