import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuoteFlowService } from '../../../core/services/quote-flow.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PersonalInfoComponent implements OnInit {
  personalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private quoteFlowService: QuoteFlowService
  ) {
    this.personalForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // Pre-populate form with existing data
    const currentData = this.quoteFlowService.getCurrentData();
    this.personalForm.patchValue({
      customerName: currentData.customerName,
      email: currentData.email,
      dateOfBirth: currentData.dateOfBirth,
    });
  }

  onSubmit() {
    if (this.personalForm.valid) {
      this.quoteFlowService.updatePersonalInfo(this.personalForm.value);
      this.router.navigate(['/quote/coverage']);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.personalForm.controls).forEach((key) => {
      const control = this.personalForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.personalForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.personalForm.get(fieldName);
    if (field?.errors?.['required']) return `${fieldName} is required`;
    if (field?.errors?.['email']) return 'Please enter a valid email';
    if (field?.errors?.['minlength']) return `${fieldName} must be at least 2 characters`;
    return '';
  }

  goBack() {
    this.router.navigate(['/quote/start']);
  }
}
