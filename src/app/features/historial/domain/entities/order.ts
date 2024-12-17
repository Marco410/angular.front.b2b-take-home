export interface Order {
  id: number;
  DeletedAt?: Date;
  branchId: number;
  createdAt: Date;
  date: string;
  loanId: number;
  merchantId: number;
  price: number;
  products?: string;
  sellsAgentID?: number;
  status: string;
  updatedAt: Date;
}

export interface ResponseOrder {
  success: boolean;
  message: string;
  data: [{ orders: Order[]; total: number }];
}

export interface OrderFilter {
  page: number;
  first_date: string;
  end_date: string;
  order_by?: string;
  direction?: string;
}
