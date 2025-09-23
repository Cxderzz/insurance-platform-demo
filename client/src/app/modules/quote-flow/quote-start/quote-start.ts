import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteFlowService } from '../../../core/services/quote-flow.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote-start',
  templateUrl: './quote-start.html',
  standalone: true,
  imports: [CommonModule],
})
export class QuoteStartComponent {
  constructor(private router: Router, private quoteFlowService: QuoteFlowService) {}

  startQuote() {
    // Reset any existing quote data
    this.quoteFlowService.resetQuote();
    // Navigate to first step
    this.router.navigate(['/quote/personal']);
  }
}
