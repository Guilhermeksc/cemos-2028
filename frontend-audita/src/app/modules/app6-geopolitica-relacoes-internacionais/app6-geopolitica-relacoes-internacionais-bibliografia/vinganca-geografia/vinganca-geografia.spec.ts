import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VingancaGeografia } from './vinganca-geografia';

describe('VingancaGeografia', () => {
  let component: VingancaGeografia;
  let fixture: ComponentFixture<VingancaGeografia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VingancaGeografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VingancaGeografia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
