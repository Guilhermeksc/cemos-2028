import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovasGeopoliticas } from './novas-geopoliticas';

describe('NovasGeopoliticas', () => {
  let component: NovasGeopoliticas;
  let fixture: ComponentFixture<NovasGeopoliticas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovasGeopoliticas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovasGeopoliticas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
