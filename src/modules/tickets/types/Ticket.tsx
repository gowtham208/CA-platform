export interface Ticket {
  id: string;
  title: string;
  clientId: string;
  serviceId: string;
  activityId: string;
  deadline: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'completed' | 'overdue';
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
}