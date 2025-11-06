import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lei97 } from './lei-97';

describe('Lei97', () => {
  let component: Lei97;
  let fixture: ComponentFixture<Lei97>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lei97]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lei97);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
