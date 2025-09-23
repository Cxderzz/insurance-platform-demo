import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Quote {
  id?: number;
  customerName: string;
  productType: string;
  premium: number;
  createdAt?: string;
}

export interface PremiumCalculationRequest {
  productType: string;
  coverageAmount: number;
  excess: number;
  dateOfBirth: string;
}

export interface PremiumCalculationResponse {
  premium: number;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private readonly apiUrl = environment.apiUrl + '/api/';
  private readonly quoteUrl = this.apiUrl + 'quotes';

  constructor(private http: HttpClient) {}

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.quoteUrl}`);
  }

  createQuote(quote: Omit<Quote, 'id' | 'createdAt'>): Observable<Quote> {
    return this.http.post<Quote>(`${this.quoteUrl}`, quote);
  }

  calculatePremium(request: PremiumCalculationRequest): Observable<PremiumCalculationResponse> {
    return this.http.post<PremiumCalculationResponse>(
      `${this.apiUrl}quotes/calculate-premium`,
      request
    );
  }
}
