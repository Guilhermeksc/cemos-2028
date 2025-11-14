import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App8DireitoConceitos } from './app8-direito-conceitos';

describe('App8DireitoConceitos', () => {
  let component: App8DireitoConceitos;
  let fixture: ComponentFixture<App8DireitoConceitos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App8DireitoConceitos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App8DireitoConceitos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
