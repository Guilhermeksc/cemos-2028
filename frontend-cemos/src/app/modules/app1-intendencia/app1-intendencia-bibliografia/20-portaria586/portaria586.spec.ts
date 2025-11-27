import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portaria586 } from './portaria586';

describe('Portaria586', () => {
  let component: Portaria586;
  let fixture: ComponentFixture<Portaria586>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portaria586]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Portaria586);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
