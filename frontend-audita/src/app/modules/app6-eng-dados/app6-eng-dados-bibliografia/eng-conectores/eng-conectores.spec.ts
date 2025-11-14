import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngConectores } from './eng-conectores';

describe('EngConectores', () => {
  let component: EngConectores;
  let fixture: ComponentFixture<EngConectores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngConectores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngConectores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
