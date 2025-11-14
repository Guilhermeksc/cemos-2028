import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Geopolitica } from './geopolitica';

describe('Geopolitica', () => {
  let component: Geopolitica;
  let fixture: ComponentFixture<Geopolitica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Geopolitica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Geopolitica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
