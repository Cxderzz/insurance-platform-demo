import { Component, OnInit } from '@angular/core';
import { QuoteService, Quote } from '../../../core/services/quote';
@Component({
  selector: 'app-quote-start',
  imports: [],
  templateUrl: './quote-start.html',
  styleUrl: './quote-start.scss',
})
export class QuoteStartComponent implements OnInit {
  quotes: Quote[] = [];
  constructor(private quoteService: QuoteService) {}
  ngOnInit() {
    this.quoteService.getQuotes().subscribe((quotes) => {
      this.quotes = quotes;
    });
  }
  addTestQuote() {
    const testQuote: Quote = {
      customerName: 'Angular test user',
      productType: 'Car Insurance',
      premium: 800,
    };

    this.quoteService.createQuote(testQuote).subscribe(() => {
      this.ngOnInit();
    });
  }
}
