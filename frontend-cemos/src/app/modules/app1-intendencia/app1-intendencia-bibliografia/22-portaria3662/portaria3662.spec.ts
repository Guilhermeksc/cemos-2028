import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portaria3662 } from './portaria3662';

describe('Portaria3662', () => {
  let component: Portaria3662;
  let fixture: ComponentFixture<Portaria3662>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portaria3662]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Portaria3662);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
