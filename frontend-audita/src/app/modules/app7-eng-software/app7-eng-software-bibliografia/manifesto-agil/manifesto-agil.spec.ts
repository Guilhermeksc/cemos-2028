import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestoAgil } from './manifesto-agil';

describe('ManifestoAgil', () => {
  let component: ManifestoAgil;
  let fixture: ComponentFixture<ManifestoAgil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifestoAgil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManifestoAgil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
