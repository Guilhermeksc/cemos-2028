import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreveHistoria } from './breve-historia';

describe('BreveHistoria', () => {
  let component: BreveHistoria;
  let fixture: ComponentFixture<BreveHistoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreveHistoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreveHistoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
