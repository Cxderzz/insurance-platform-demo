import { TestBed } from '@angular/core/testing';

import { Quote } from './quote';

describe('Quote', () => {
  let service: Quote;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Quote);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
