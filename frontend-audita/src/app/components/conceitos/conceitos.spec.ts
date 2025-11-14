import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConceitosComponent } from './conceitos';

describe('Conceitos', () => {
  let component: ConceitosComponent;
  let fixture: ComponentFixture<ConceitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceitosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
