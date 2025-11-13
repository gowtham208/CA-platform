import type { Service } from '../../services/types/Service';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  gstin?: string;
  pan?: string;
  address: string;
  services?: Service[];
  status: 'active' | 'inactive' | 'premium' | 'pending';
  assignedTo?: string;
  dateAdded: Date;
}