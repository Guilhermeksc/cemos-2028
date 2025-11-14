import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PactoSaoJose } from './pacto-sao-jose';

describe('PactoSaoJose', () => {
  let component: PactoSaoJose;
  let fixture: ComponentFixture<PactoSaoJose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PactoSaoJose]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PactoSaoJose);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
