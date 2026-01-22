export type Deposit = {
  id: number;
  reservation_id: number;
  guest_id: number;
  amount: number;
  currency?: string;
  status: 'pending' | 'held' | 'applied' | 'refunded' | 'forfeited' | 'received';
  payment_method?: string;
  transaction_id?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  held_at?: string;
  applied_at?: string;
  refunded_at?: string;
  forfeited_at?: string;
};

export type CreateDepositRequest = {
  reservation_id: number;
  guest_id: number;
  amount: number;
  currency?: string;
  payment_method?: string;
  transaction_id?: string;
  notes?: string;
};

export type HoldDepositRequest = {
  notes?: string;
};

export type RefundDepositRequest = {
  refund_amount?: number;
  reason?: string;
};

export type ApplyDepositRequest = {
  notes?: string;
};

export type ForfeitDepositRequest = {
  reason: string;
};

export type DepositResponse = {
  data: Deposit;
  message?: string;
};

export type DepositsResponse = {
  data: Deposit[];
  total_pages?: number;
  current_page?: number;
  total_count?: number;
};
