import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App9EconomiaResumo } from './app9-economia-resumo';

describe('App9EconomiaResumo', () => {
  let component: App9EconomiaResumo;
  let fixture: ComponentFixture<App9EconomiaResumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App9EconomiaResumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App9EconomiaResumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
