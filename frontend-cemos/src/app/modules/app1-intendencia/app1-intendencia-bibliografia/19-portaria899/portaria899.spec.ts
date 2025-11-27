import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portaria899 } from './portaria899';

describe('Portaria899', () => {
  let component: Portaria899;
  let fixture: ComponentFixture<Portaria899>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portaria899]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Portaria899);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
