import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntorpecentesPsicotropicos } from './entorpecentes-psicotropicos';

describe('EntorpecentesPsicotropicos', () => {
  let component: EntorpecentesPsicotropicos;
  let fixture: ComponentFixture<EntorpecentesPsicotropicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntorpecentesPsicotropicos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntorpecentesPsicotropicos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
