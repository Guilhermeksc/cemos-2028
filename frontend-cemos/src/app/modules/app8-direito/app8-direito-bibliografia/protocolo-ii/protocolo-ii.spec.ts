import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloII } from './protocolo-ii';

describe('ProtocoloII', () => {
  let component: ProtocoloII;
  let fixture: ComponentFixture<ProtocoloII>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtocoloII]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocoloII);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
