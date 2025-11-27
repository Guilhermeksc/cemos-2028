import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portaria280 } from './portaria280';

describe('Portaria280', () => {
  let component: Portaria280;
  let fixture: ComponentFixture<Portaria280>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portaria280]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Portaria280);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
