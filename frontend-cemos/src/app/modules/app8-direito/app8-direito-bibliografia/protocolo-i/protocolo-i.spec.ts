import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloI } from './protocolo-i';

describe('ProtocoloI', () => {
  let component: ProtocoloI;
  let fixture: ComponentFixture<ProtocoloI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtocoloI]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocoloI);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
