import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App8DireitoResumo } from './app8-direito-resumo';

describe('App8DireitoResumo', () => {
  let component: App8DireitoResumo;
  let fixture: ComponentFixture<App8DireitoResumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App8DireitoResumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App8DireitoResumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
