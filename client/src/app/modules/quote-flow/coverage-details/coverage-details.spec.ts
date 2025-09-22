import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageDetails } from './coverage-details';

describe('CoverageDetails', () => {
  let component: CoverageDetails;
  let fixture: ComponentFixture<CoverageDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverageDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverageDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
