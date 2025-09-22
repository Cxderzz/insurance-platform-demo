import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuoteService, Quote } from './core/services/quote';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('insurance-app');
  quotes = signal<Quote[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    this.isLoading.set(true);
    this.error.set(null);

    this.quoteService.getQuotes().subscribe({
      next: (quotes) => {
        this.quotes.set(quotes);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(`Failed to load quotes: ${err.message}`);
        this.isLoading.set(false);
      },
    });
  }

  createTestQuote() {
    const testQuote = {
      customerName: 'Test Customer',
      productType: 'Test Insurance',
      premium: 999.99,
    };

    this.quoteService.createQuote(testQuote).subscribe({
      next: (newQuote) => {
        this.quotes.update((quotes) => [...quotes, newQuote]);
      },
      error: (err) => {
        this.error.set(`Failed to create quote: ${err.message}`);
      },
    });
  }
}
