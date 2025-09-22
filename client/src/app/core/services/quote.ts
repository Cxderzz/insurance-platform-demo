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

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.apiUrl}/quotes`);
  }

  createQuote(quote: Omit<Quote, 'id' | 'createdAt'>): Observable<Quote> {
    return this.http.post<Quote>(`${this.apiUrl}/quotes`, quote);
  }
}
