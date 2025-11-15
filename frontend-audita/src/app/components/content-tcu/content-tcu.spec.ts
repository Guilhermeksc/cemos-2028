import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTcu } from './content-tcu';

describe('ContentTcu', () => {
  let component: ContentTcu;
  let fixture: ComponentFixture<ContentTcu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentTcu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentTcu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
