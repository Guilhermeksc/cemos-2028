import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaMental } from './mapa-mental';

describe('MapaMental', () => {
  let component: MapaMental;
  let fixture: ComponentFixture<MapaMental>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaMental]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaMental);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
