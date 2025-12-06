import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App9EconomiaConceitos } from './app9-economia-conceitos';

describe('App9EconomiaConceitos', () => {
  let component: App9EconomiaConceitos;
  let fixture: ComponentFixture<App9EconomiaConceitos>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App9EconomiaConceitos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App9EconomiaConceitos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
