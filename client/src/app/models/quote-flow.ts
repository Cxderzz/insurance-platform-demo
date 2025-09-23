export interface QuoteRequest {
  customerName: string;
  email: string;
  dateOfBrith: Date;

  productType: string;
  coverageAmount: number;
  excess: number;

  premium?: number;
  id?: number;
}
