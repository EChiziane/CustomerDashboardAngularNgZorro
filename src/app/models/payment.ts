export interface Payment {
  id: string;
  amount: number;
  referenceMonth: string;
  paymentMethod: string;
  confirmed: boolean;
  createdAt: string;
}
