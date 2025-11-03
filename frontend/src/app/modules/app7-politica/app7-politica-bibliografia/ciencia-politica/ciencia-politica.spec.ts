import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CienciaPolitica } from './ciencia-politica';

describe('CienciaPolitica', () => {
  let component: CienciaPolitica;
  let fixture: ComponentFixture<CienciaPolitica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CienciaPolitica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CienciaPolitica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
