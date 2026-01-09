import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarQuestoes } from './revisar-questoes';

describe('RevisarQuestoes', () => {
  let component: RevisarQuestoes;
  let fixture: ComponentFixture<RevisarQuestoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisarQuestoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisarQuestoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
