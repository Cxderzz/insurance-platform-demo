import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteSummary } from './quote-summary';

describe('QuoteSummary', () => {
  let component: QuoteSummary;
  let fixture: ComponentFixture<QuoteSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
