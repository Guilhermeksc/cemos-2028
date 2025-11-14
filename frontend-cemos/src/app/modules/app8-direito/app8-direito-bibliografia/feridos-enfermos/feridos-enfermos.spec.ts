import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeridosEnfermos } from './feridos-enfermos';

describe('FeridosEnfermos', () => {
  let component: FeridosEnfermos;
  let fixture: ComponentFixture<FeridosEnfermos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeridosEnfermos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeridosEnfermos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
