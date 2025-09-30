import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteSummaryComponent } from './quote-summary';

describe('QuoteSummary', () => {
  let component: QuoteSummaryComponent;
  let fixture: ComponentFixture<QuoteSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
