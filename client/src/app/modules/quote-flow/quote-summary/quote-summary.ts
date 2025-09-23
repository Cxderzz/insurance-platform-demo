import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteFlowService, QuoteFlowData } from '../../../core/services/quote-flow.service';
import { QuoteService } from '../../../core/services/quote';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote-summary',
  templateUrl: './quote-summary.html',
  styleUrls: ['./quote-summary.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class QuoteSummaryComponent implements OnInit {
  quoteData: QuoteFlowData | null = null;
  calculatedPremium: number = 0;
  isLoadingPremium = true;
  isSubmitting = false;
  premiumError: string | null = null;

  constructor(
    private router: Router,
    private quoteFlowService: QuoteFlowService,
    private quoteService: QuoteService
  ) {}

  async ngOnInit() {
    if (!this.quoteFlowService.completedSteps.has('coverage')) {
      this.router.navigate(['/quote/coverage']);
      return;
    }

    this.quoteData = this.quoteFlowService.getCurrentData();
    await this.loadPremiumCalculation();
  }

  private async loadPremiumCalculation() {
    if (!this.quoteData || !this.quoteFlowService.canCalculatePremium()) {
      this.premiumError = 'Missing required information for premium calculation';
      this.isLoadingPremium = false;
      return;
    }

    try {
      const request = {
        productType: this.quoteData.productType,
        coverageAmount: this.quoteData.coverageAmount,
        excess: this.quoteData.excess,
        dateOfBirth: this.quoteData.dateOfBirth,
      };

      const response = await this.quoteService.calculatePremium(request).toPromise();
      this.calculatedPremium = response?.premium || 0;
      this.premiumError = null;
    } catch (error) {
      console.error('Error calculating premium:', error);
      this.premiumError = 'Unable to calculate premium. Please try again.';
    } finally {
      this.isLoadingPremium = false;
    }
  }

  async submitQuote() {
    if (!this.quoteData || this.calculatedPremium <= 0) return;

    this.isSubmitting = true;

    try {
      const quote = {
        customerName: this.quoteData.customerName,
        productType: this.quoteData.productType,
        premium: this.calculatedPremium,
      };

      await this.quoteService.createQuote(quote).toPromise();

      alert('Quote submitted successfully!');
      this.quoteFlowService.resetQuote();
      this.router.navigate(['/quote/start']);
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Error submitting quote. Please try again.');
      this.isSubmitting = false;
    }
  }

  goBack() {
    this.router.navigate(['/quote/coverage']);
  }

  getProductTypeLabel(value: string): string {
    const productTypes: Record<string, string> = {
      auto: 'Auto Insurance',
      home: 'Home Insurance',
      life: 'Life Insurance',
    };
    return productTypes[value] || value;
  }
}
