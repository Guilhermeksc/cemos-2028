import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAbandono } from './check-abandono';

describe('CheckAbandono', () => {
  let component: CheckAbandono;
  let fixture: ComponentFixture<CheckAbandono>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckAbandono]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckAbandono);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
