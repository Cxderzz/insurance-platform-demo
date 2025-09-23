import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageDetailsComponent } from './coverage-details';

describe('CoverageDetailsComponent', () => {
  let component: CoverageDetailsComponent;
  let fixture: ComponentFixture<CoverageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverageDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoverageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
