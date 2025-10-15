import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App5InglesResumo } from './app5-ingles-resumo';

describe('App5InglesResumo', () => {
  let component: App5InglesResumo;
  let fixture: ComponentFixture<App5InglesResumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App5InglesResumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App5InglesResumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
