import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Md40M02 } from './md-40-m-02';

describe('Md40M02', () => {
  let component: Md40M02;
  let fixture: ComponentFixture<Md40M02>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Md40M02]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Md40M02);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
