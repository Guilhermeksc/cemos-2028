import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratadoDeEstrategia } from './tratado-de-estrategia';

describe('TratadoDeEstrategia', () => {
  let component: TratadoDeEstrategia;
  let fixture: ComponentFixture<TratadoDeEstrategia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratadoDeEstrategia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratadoDeEstrategia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
