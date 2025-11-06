import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrategiasMaritimas } from './estrategias-maritimas';

describe('EstrategiasMaritimas', () => {
  let component: EstrategiasMaritimas;
  let fixture: ComponentFixture<EstrategiasMaritimas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstrategiasMaritimas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstrategiasMaritimas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
