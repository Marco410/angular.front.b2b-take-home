export interface Totals {
  total_price: number;
  total_records: number;
  average_price: number;
}

export interface ResponseTotals {
  success: boolean;
  message: string;
  data: [Totals];
}
