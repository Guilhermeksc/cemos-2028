import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetivosEstrategicos } from './objetivos-estrategicos';

describe('ObjetivosEstrategicos', () => {
  let component: ObjetivosEstrategicos;
  let fixture: ComponentFixture<ObjetivosEstrategicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjetivosEstrategicos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjetivosEstrategicos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

