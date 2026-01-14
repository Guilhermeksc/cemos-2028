import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App2EstrategiaPensadores } from './app2-estrategia-pensadores';

describe('App2EstrategiaPensadores', () => {
  let component: App2EstrategiaPensadores;
  let fixture: ComponentFixture<App2EstrategiaPensadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App2EstrategiaPensadores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App2EstrategiaPensadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

