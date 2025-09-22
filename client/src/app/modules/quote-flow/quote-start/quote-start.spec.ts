import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteStart } from './quote-start';

describe('QuoteStart', () => {
  let component: QuoteStart;
  let fixture: ComponentFixture<QuoteStart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteStart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteStart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
