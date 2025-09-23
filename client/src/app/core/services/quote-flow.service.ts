import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface QuoteFlowData {
  customerName: string;
  email: string;
  dateOfBirth: string;

  productType: string;
  coverageAmount: number;
  excess: number;

  premium?: number;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteFlowService {
  private quoteData: QuoteFlowData = {
    customerName: '',
    email: '',
    dateOfBirth: '',
    productType: '',
    coverageAmount: 0,
    excess: 0,
  };
  private quoteSubject = new BehaviorSubject<QuoteFlowData>(this.quoteData);

  public quote$ = this.quoteSubject.asObservable();

  public completedSteps: Set<string> = new Set();

  updatePersonalInfo(data: Partial<QuoteFlowData>) {
    this.quoteData = { ...this.quoteData, ...data };
    this.quoteSubject.next(this.quoteData);
    this.completedSteps.add('personal');
  }

  updateCoverageDetails(data: Partial<QuoteFlowData>) {
    this.quoteData = { ...this.quoteData, ...data };
    this.quoteSubject.next(this.quoteData);
    this.completedSteps.add('coverage');
  }

  canCalculatePremium(): boolean {
    return (
      this.completedSteps.has('personal') &&
      this.completedSteps.has('coverage') &&
      this.quoteData.customerName !== '' &&
      this.quoteData.productType !== '' &&
      this.quoteData.coverageAmount > 0 &&
      this.quoteData.excess >= 750 // minimum excess
    );
  }

  getCurrentData(): QuoteFlowData {
    return { ...this.quoteData };
  }

  resetQuote() {
    this.quoteData = {
      customerName: '',
      email: '',
      dateOfBirth: '',
      productType: '',
      coverageAmount: 0,
      excess: 0,
    };
    this.completedSteps.clear();
    this.quoteSubject.next(this.quoteData);
  }
}
