import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuoteFlowService } from '../../../core/services/quote-flow.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coverage-details',
  templateUrl: './coverage-details.html',
  styleUrls: ['./coverage-details.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CoverageDetailsComponent implements OnInit {
  coverageForm: FormGroup;

  productTypes = [
    { value: 'auto', label: 'Auto Insurance' },
    { value: 'home', label: 'Home Insurance' },
    { value: 'life', label: 'Life Insurance' },
  ];

  excessOptions = [
    { value: 750, label: '$750' },
    { value: 1000, label: '$1000' },
    { value: 1200, label: '$1,200' },
    { value: 2500, label: '$2,500' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private quoteFlowService: QuoteFlowService
  ) {
    this.coverageForm = this.fb.group({
      productType: ['', Validators.required],
      coverageAmount: ['', [Validators.required, Validators.min(10000)]],
      excess: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Check if personal info step is completed
    if (!this.quoteFlowService.completedSteps.has('personal')) {
      this.router.navigate(['/quote/personal']);
      return;
    }

    // Pre-populate form
    const currentData = this.quoteFlowService.getCurrentData();
    this.coverageForm.patchValue({
      productType: currentData.productType,
      coverageAmount: currentData.coverageAmount,
      excess: currentData.excess,
    });
  }

  onSubmit() {
    if (this.coverageForm.valid) {
      this.quoteFlowService.updateCoverageDetails(this.coverageForm.value);
      this.router.navigate(['/quote/summary']);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.coverageForm.controls).forEach((key) => {
      const control = this.coverageForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.coverageForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.coverageForm.get(fieldName);
    if (field?.errors?.['required']) return `${fieldName} is required`;
    if (field?.errors?.['min']) return `Coverage amount must be at least $10,000`;
    return '';
  }

  goBack() {
    this.router.navigate(['/quote/personal']);
  }
}
