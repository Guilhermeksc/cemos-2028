import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngArquitetura } from './eng-arquitetura';

describe('EngArquitetura', () => {
  let component: EngArquitetura;
  let fixture: ComponentFixture<EngArquitetura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngArquitetura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngArquitetura);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
