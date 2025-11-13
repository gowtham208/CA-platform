export interface Activity {
  id: string;
  name: string;
  serviceId: string;
  frequency?: 'monthly' | 'quarterly' | 'yearly';
  amount: number;
  deadline?: Date;
  financialYear?: string;
}
